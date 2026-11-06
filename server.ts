import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { SCHEMES } from './src/data/schemesData.ts';
import { CITIZEN_RIGHTS } from './src/data/rightsData.ts';
import { EligibilityProfile, EligibilityMatchResult } from './src/types/index.ts';
import {
  initSqliteDb,
  recordUserLogin,
  saveUserProfile,
  getUserProfile,
  getSqliteDatabaseSummary,
  printDatabaseStateToTerminal,
} from './src/db/sqlite.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize Gemini SDK with User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for reliable Gemini generation across all routes
async function generateWithFallback(params: { contents: any; config?: any }) {
  try {
    return await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: params.contents,
      config: params.config,
    });
  } catch (err: any) {
    console.warn('Fallback to gemini-3.8-flash due to:', err?.message || err);
    return await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: params.contents,
      config: params.config,
    });
  }
}

// API Routes

// 0. SQLite Database Authentication & Profile Persistence
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { name, email, password, action = 'login' } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, message: 'Valid email is required' });
    }
    const displayName = (name && typeof name === 'string' && name.trim()) ? name.trim() : email.split('@')[0];
    const user = await recordUserLogin({
      name: displayName,
      email,
      password: password || '',
      action: action === 'register' ? 'register' : 'login',
    });

    // Check if user already has a saved profile in SQLite
    const existingDbProfile = await getUserProfile(email);

    res.json({
      success: true,
      message: `User ${action === 'register' ? 'registered' : 'logged in'} and pushed to SQLite database.`,
      user,
      profile: existingDbProfile ? {
        name: existingDbProfile.name,
        email: existingDbProfile.email,
        age: existingDbProfile.age,
        annualIncome: existingDbProfile.annual_income,
        state: existingDbProfile.state,
        caste: existingDbProfile.caste,
        gender: existingDbProfile.gender,
        occupation: existingDbProfile.occupation,
        ownsLand: Boolean(existingDbProfile.owns_land),
        landAcres: existingDbProfile.land_acres,
        isStudent: Boolean(existingDbProfile.is_student),
        hasCompletedProfile: Boolean(existingDbProfile.has_completed_profile),
      } : null,
    });
  } catch (error: any) {
    console.error('Error recording login in SQLite:', error);
    res.status(500).json({ success: false, message: error?.message || 'Failed to record login in SQLite' });
  }
});

app.post('/api/profile/setup', async (req: Request, res: Response) => {
  try {
    const profileData = req.body;
    if (!profileData || !profileData.email) {
      return res.status(400).json({ success: false, message: 'Profile data and email are required' });
    }

    const saved = await saveUserProfile({
      name: profileData.name || 'Citizen',
      email: profileData.email,
      age: Number(profileData.age) || 25,
      annualIncome: Number(profileData.annualIncome) || 0,
      state: profileData.state || 'Delhi',
      caste: profileData.caste || 'General',
      gender: profileData.gender || 'Female',
      occupation: profileData.occupation || 'Self-Employed',
      ownsLand: Boolean(profileData.ownsLand),
      landAcres: Number(profileData.landAcres) || 0,
      isStudent: Boolean(profileData.isStudent),
      hasCompletedProfile: true,
    });

    res.json({
      success: true,
      message: 'Citizen profile successfully saved and pushed to SQLite database.',
      data: {
        name: saved.name,
        email: saved.email,
        age: saved.age,
        annualIncome: saved.annual_income,
        state: saved.state,
        caste: saved.caste,
        gender: saved.gender,
        occupation: saved.occupation,
        ownsLand: Boolean(saved.owns_land),
        landAcres: saved.land_acres,
        isStudent: Boolean(saved.is_student),
        hasCompletedProfile: true,
      },
    });
  } catch (error: any) {
    console.error('Error saving profile in SQLite:', error);
    res.status(500).json({ success: false, message: error?.message || 'Failed to save profile to SQLite' });
  }
});

app.get('/api/profile', async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, message: 'Email query parameter is required' });
    }
    const profile = await getUserProfile(email);
    if (!profile) {
      return res.json({ success: true, profile: null });
    }
    res.json({
      success: true,
      profile: {
        name: profile.name,
        email: profile.email,
        age: profile.age,
        annualIncome: profile.annual_income,
        state: profile.state,
        caste: profile.caste,
        gender: profile.gender,
        occupation: profile.occupation,
        ownsLand: Boolean(profile.owns_land),
        landAcres: profile.land_acres,
        isStudent: Boolean(profile.is_student),
        hasCompletedProfile: Boolean(profile.has_completed_profile),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message || 'Failed to get profile from SQLite' });
  }
});

app.get('/api/db/summary', async (_req: Request, res: Response) => {
  try {
    const summary = await getSqliteDatabaseSummary();
    res.json({ success: true, ...summary });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message || 'Failed to fetch SQLite database summary' });
  }
});

// 1. Schemes listing and search
app.get('/api/schemes', (req: Request, res: Response) => {
  try {
    const { search, category, beneficiary } = req.query;
    let filtered = [...SCHEMES];

    if (search && typeof search === 'string') {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.hindiName && s.hindiName.toLowerCase().includes(q)) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.targetBeneficiaries.some((b) => b.toLowerCase().includes(q))
      );
    }

    if (category && typeof category === 'string' && category !== 'All') {
      filtered = filtered.filter((s) => s.category === category);
    }

    if (beneficiary && typeof beneficiary === 'string' && beneficiary !== 'All') {
      const bLower = beneficiary.toLowerCase();
      filtered = filtered.filter((s) =>
        s.targetBeneficiaries.some((tb) => tb.toLowerCase().includes(bLower))
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message || 'Failed to fetch schemes' });
  }
});

// 2. Single scheme details
app.get('/api/schemes/:id', (req: Request, res: Response) => {
  const scheme = SCHEMES.find((s) => s.id === req.params.id);
  if (!scheme) {
    return res.status(404).json({ success: false, message: 'Scheme not found' });
  }
  res.json({ success: true, data: scheme });
});

// 3. Citizen Rights listing
app.get('/api/rights', (req: Request, res: Response) => {
  res.json({ success: true, count: CITIZEN_RIGHTS.length, data: CITIZEN_RIGHTS });
});

// 4. Smart Eligibility Evaluator
app.post('/api/eligibility-check', (req: Request, res: Response) => {
  try {
    const profile: EligibilityProfile = req.body;
    if (!profile || typeof profile.age !== 'number') {
      return res.status(400).json({ success: false, message: 'Invalid profile data provided' });
    }

    const results: EligibilityMatchResult[] = SCHEMES.map((scheme) => {
      let score = 50;
      const reasons: string[] = [];
      const unmet: string[] = [];

      // Age check
      if (scheme.eligibility.minAge !== undefined) {
        if (profile.age >= scheme.eligibility.minAge) {
          score += 15;
          reasons.push(`Satisfies minimum age requirement of ${scheme.eligibility.minAge} years.`);
        } else {
          score -= 30;
          unmet.push(`Requires age of at least ${scheme.eligibility.minAge} years (current: ${profile.age}).`);
        }
      }

      if (scheme.eligibility.maxAge !== undefined) {
        if (profile.age <= scheme.eligibility.maxAge) {
          score += 15;
          reasons.push(`Under maximum age ceiling of ${scheme.eligibility.maxAge} years.`);
        } else {
          score -= 30;
          unmet.push(`Exceeds maximum age limit of ${scheme.eligibility.maxAge} years (current: ${profile.age}).`);
        }
      }

      // Gender check
      if (scheme.eligibility.gender && scheme.eligibility.gender !== 'All') {
        if (profile.gender === scheme.eligibility.gender) {
          score += 20;
          reasons.push(`Targeted specifically for ${scheme.eligibility.gender.toLowerCase()} beneficiaries.`);
        } else {
          score -= 50;
          unmet.push(`Exclusive to ${scheme.eligibility.gender} beneficiaries.`);
        }
      }

      // Income check
      if (scheme.eligibility.maxAnnualIncome !== undefined) {
        if (profile.annualIncome <= scheme.eligibility.maxAnnualIncome) {
          score += 20;
          reasons.push(`Annual income (₹${profile.annualIncome.toLocaleString('en-IN')}) is within the ceiling of ₹${scheme.eligibility.maxAnnualIncome.toLocaleString('en-IN')}.`);
        } else {
          score -= 35;
          unmet.push(`Annual income exceeds scheme limit of ₹${scheme.eligibility.maxAnnualIncome.toLocaleString('en-IN')}.`);
        }
      }

      // Occupation & Land
      const occLower = profile.occupation.toLowerCase();
      if (scheme.id === 'pm-kisan-samman-nidhi') {
        if (profile.ownsLand && (occLower.includes('farmer') || occLower.includes('agri') || profile.landAcres > 0)) {
          score += 35;
          reasons.push(`Owns cultivable land (${profile.landAcres} acres) and engaged in agriculture.`);
        } else {
          score -= 40;
          unmet.push('Requires ownership of cultivable agricultural land in applicant’s name.');
        }
      }

      if (scheme.id === 'pm-vishwakarma-yojana') {
        if (['artisan', 'carpenter', 'tailor', 'blacksmith', 'potter', 'craft', 'cobbler', 'mason'].some((k) => occLower.includes(k))) {
          score += 40;
          reasons.push(`Occupation matches eligible traditional artisan/craft trade.`);
        }
      }

      if (scheme.id === 'pm-svanidhi-scheme') {
        if (occLower.includes('vendor') || occLower.includes('hawker') || occLower.includes('street') || occLower.includes('shop')) {
          score += 40;
          reasons.push(`Matches eligible street vending/hawking profile.`);
        }
      }

      if (scheme.id === 'post-matric-scholarship-sc-st-obc') {
        if (profile.isStudent && (profile.category === 'SC' || profile.category === 'ST' || profile.category === 'OBC' || profile.category === 'EWS')) {
          score += 40;
          reasons.push(`Enrolled as student and belongs to ${profile.category} category eligible for fee waiver.`);
        } else if (!profile.isStudent) {
          score -= 40;
          unmet.push('Requires active enrollment in post-matric / college / diploma course.');
        }
      }

      // Clamp score
      score = Math.max(10, Math.min(98, score));
      let status: 'Eligible' | 'Likely Eligible' | 'Check Conditions' = 'Check Conditions';
      if (score >= 80 && unmet.length === 0) {
        status = 'Eligible';
      } else if (score >= 60 && unmet.length <= 1) {
        status = 'Likely Eligible';
      }

      return {
        scheme,
        matchScore: score,
        status,
        reasons,
        unmetOrMissingCriteria: unmet,
      };
    });

    results.sort((a, b) => b.matchScore - a.matchScore);
    res.json({ success: true, count: results.length, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message || 'Eligibility check failed' });
  }
});

// 5. AI Rights & Scheme Assistant (RAG Chatbot)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, schemeContextId, language = 'kn' } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, message: 'Messages array is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'GEMINI_API_KEY is not configured on the server. Please check Settings > Secrets.',
      });
    }

    const langNames: Record<string, string> = {
      kn: 'Kannada (ಕನ್ನಡ)',
      hi: 'Hindi (हिन्दी)',
      ta: 'Tamil (தமிழ்)',
      te: 'Telugu (తెలుగు)',
      bn: 'Bengali (বাংলা)',
      en: 'English',
    };
    const targetLangName = langNames[language] || 'Kannada (ಕನ್ನಡ)';

    let schemeContext = '';
    let referencedScheme: any = null;
    if (schemeContextId) {
      referencedScheme = SCHEMES.find((s) => s.id === schemeContextId);
      if (referencedScheme) {
        schemeContext = `\nCURRENT USER CONTEXT - FOCUSED SCHEME:\n${JSON.stringify(referencedScheme, null, 2)}\n`;
      }
    }

    // Prepare schemes and rights knowledge base
    const knowledgeSummary = SCHEMES.map(
      (s) =>
        `- ${s.name} (${s.id}) [${s.category}]: ${s.shortDescription}. Benefits: ${s.benefits.summary}. Eligibility: ${s.eligibility.criteriaSummary.join('; ')}. Official portal: ${s.officialUrl}`
    ).join('\n');

    const rightsSummary = CITIZEN_RIGHTS.map(
      (r) =>
        `- ${r.title} (${r.actName}): ${r.summary}. Key Protections: ${r.keyProtections.join('; ')}. Portal: ${r.grievancePortal.url}`
    ).join('\n');

    const systemInstruction = `You are AdhikarAI, an authoritative, empathetic, and clear-spoken public service accessibility assistant for Indian citizens.
Your job is to make government schemes, citizen legal rights, documentation requirements, and grievance mechanisms crystal clear to everyday people (students, rural farmers, women, small shopkeepers, low-income families).

GROUND RULES:
1. Always ground your facts in authentic government rules and procedures.
2. When mentioning schemes, mention the authentic name and official portal link (e.g. pmkisan.gov.in, beneficiary.nha.gov.in, scholarships.gov.in, etc.).
3. Avoid dense legalese; use simple, numbered, actionable steps.
4. If asked about required documents, provide an exact, itemized checklist with where to obtain each document.
5. Clarify that while you provide verified guidance, final approval depends on official government authorities.
6. Provide 2-3 relevant follow-up questions at the end that the citizen might ask next.

LANGUAGE REQUIREMENT (CRITICAL):
The citizen has selected ${targetLangName}. You MUST respond entirely in ${targetLangName} script.
Ensure the language is simple, everyday spoken regional language that is natural to hear through the voice assistant.

KNOWLEDGE BASE OF SCHEMES:
${knowledgeSummary}

KNOWLEDGE BASE OF CITIZEN RIGHTS:
${rightsSummary}
${schemeContext}
`;

    // Format chat history for generateContent
    const lastUserMessage = messages[messages.length - 1].content;
    const pastConversation = messages
      .slice(0, -1)
      .map((m: any) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const promptText = pastConversation
      ? `Conversation history:\n${pastConversation}\n\nUser: ${lastUserMessage}`
      : lastUserMessage;

    const response = await generateWithFallback({
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const replyText = response.text || 'I apologize, but I could not formulate a response. Please try again.';

    // Extract mentioned schemes for clickable cards
    const mentionedSchemes = SCHEMES.filter(
      (s) =>
        replyText.toLowerCase().includes(s.name.toLowerCase()) ||
        replyText.toLowerCase().includes(s.id.toLowerCase()) ||
        (s.hindiName && replyText.includes(s.hindiName)) ||
        (referencedScheme && s.id === referencedScheme.id)
    ).map((s) => ({
      id: s.id,
      name: s.name,
      url: s.officialUrl,
    }));

    // Extract suggested follow-ups
    const suggested: string[] = [];
    const followUpRegex = /(?:follow-up|you might also ask|next questions|related questions)[\s\S]*?(?:(?:\d+\.|\-|\*)\s+([^\n\r]+))/gi;
    let match;
    while ((match = followUpRegex.exec(replyText)) !== null && suggested.length < 3) {
      if (match[1] && match[1].trim().length > 10) {
        suggested.push(match[1].replace(/[*_?"']/g, '').trim());
      }
    }

    if (suggested.length === 0) {
      suggested.push('What documents do I need to prepare before applying?');
      suggested.push('Where is the nearest CSC or office to submit this?');
      suggested.push('What are the main reasons applications get rejected?');
    }

    res.json({
      success: true,
      message: replyText,
      relatedSchemes: mentionedSchemes.slice(0, 3),
      suggestedQuestions: suggested.slice(0, 3),
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: error?.message || 'Error processing your question with AI Assistant',
    });
  }
});

// 6. Document Doctor API
app.post('/api/document-doctor', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType, textContent, documentCategory } = req.body;

    if (!imageBase64 && !textContent) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either a document image or text description.',
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    const systemInstruction = `You are AdhikarAI Document Doctor, an AI specialist evaluating citizen documents for Indian government scheme applications.
Your duty:
1. Identify the document type (e.g., Aadhaar Card, Income Certificate, Caste Certificate, Land Record / Khatauni, Bank Passbook, Ration Card, Domicile Certificate).
2. Extract visible metadata safely (mask sensitive numbers: show only last 4 digits for Aadhaar/Bank account).
3. Check for common government application failure reasons:
   - Expiry or old financial year (e.g., Income certificates are typically valid for only 3 financial years or 1 year in some states).
   - Missing official seals, QR codes, or digital signature remarks.
   - Name spelling discrepancy risks.
   - Incomplete family list or address clarity.
   - Blurred / illegible sections.
4. Explain all issues in simple everyday language and give exact steps to resolve (e.g. visit e-District portal or Tehsil).
5. Suggest 2-3 government schemes where this document is crucial.
Respond strictly in JSON adhering to the specified schema.`;

    let contents: any;

    if (imageBase64 && mimeType) {
      const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');
      contents = {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: cleanBase64,
            },
          },
          {
            text: `Analyze this Indian public document (Category hint: ${documentCategory || 'Unspecified'}). Perform document verification check against official eligibility standards.`,
          },
        ],
      };
    } else {
      contents = `Analyze this Indian public document record:\n\n${textContent}\n\nCategory hint: ${documentCategory || 'General'}`;
    }

    const response = await generateWithFallback({
      contents,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            documentType: { type: Type.STRING },
            confidence: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
            overallStatus: {
              type: Type.STRING,
              enum: ['Verified & Ready', 'Needs Attention', 'Action Required'],
            },
            extractedInfo: {
              type: Type.OBJECT,
              properties: {
                holderName: { type: Type.STRING },
                idNumberMasked: { type: Type.STRING },
                issuingAuthority: { type: Type.STRING },
                issueDate: { type: Type.STRING },
                validityOrExpiry: { type: Type.STRING },
                incomeOrCategoryStated: { type: Type.STRING },
                stateOrDistrict: { type: Type.STRING },
              },
            },
            verificationChecks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  status: { type: Type.STRING, enum: ['passed', 'warning', 'error'] },
                  details: { type: Type.STRING },
                },
                required: ['name', 'status', 'details'],
              },
            },
            detectedIssues: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            plainLanguageSummary: { type: Type.STRING },
            recommendedFixes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            eligibleSchemes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  relevance: { type: Type.STRING },
                },
                required: ['id', 'name', 'relevance'],
              },
            },
            disclaimer: { type: Type.STRING },
          },
          required: [
            'documentType',
            'confidence',
            'overallStatus',
            'verificationChecks',
            'detectedIssues',
            'plainLanguageSummary',
            'recommendedFixes',
            'eligibleSchemes',
            'disclaimer',
          ],
        },
      },
    });

    const jsonText = response.text?.trim() || '{}';
    const parsed = JSON.parse(jsonText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Document Doctor error:', error);
    res.status(500).json({
      success: false,
      message: error?.message || 'Failed to inspect document with Document Doctor',
    });
  }
});

// 7. Multilingual Voice Assistant TTS Endpoint (Gemini 3.8 Flash Lite TTS)
app.post('/api/tts', async (req: Request, res: Response) => {
  try {
    const { text, language } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ success: false, message: 'Text is required for TTS' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, message: 'GEMINI_API_KEY is not configured' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [{ text: text.slice(0, 500) }],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error('No audio returned by TTS model');
    }

    res.json({
      success: true,
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
    });
  } catch (error: any) {
    console.error('TTS generation error:', error);
    res.status(500).json({
      success: false,
      message: error?.message || 'Error generating voice audio',
    });
  }
});

// Full-stack Vite / Static Setup
async function startServer() {
  // Initialize SQLite database, ensure schema and print initial snapshot to terminal
  try {
    await initSqliteDb();
  } catch (dbErr) {
    console.error('⚠️ Could not initialize SQLite database on startup:', dbErr);
  }

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AdhikarAI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
