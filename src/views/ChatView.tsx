import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  RotateCcw, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  Info,
  X,
  Mic,
  MicOff,
  Volume2
} from 'lucide-react';
import { ChatMessage, Scheme } from '../types/index.ts';
import { SCHEMES } from '../data/schemesData.ts';
import { LanguageCode, TRANSLATIONS, LOCALIZED_SCHEMES } from '../i18n/translations.ts';
import { SpeakButton } from '../components/SpeakButton.tsx';
import { listenSpeech, stopSpeaking } from '../utils/speech.ts';

interface ChatViewProps {
  schemeContextId?: string | null;
  currentLang: LanguageCode;
  onClearSchemeContext: () => void;
  onViewScheme: (schemeId: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  schemeContextId,
  currentLang,
  onClearSchemeContext,
  onViewScheme,
}) => {
  const focusedScheme = schemeContextId ? SCHEMES.find((s) => s.id === schemeContextId) : null;
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.kn;
  const localizedScheme = focusedScheme ? (LOCALIZED_SCHEMES[currentLang]?.[focusedScheme.id] || focusedScheme) : null;

  const getInitialGreeting = (): string => {
    if (currentLang === 'kn') {
      return focusedScheme
        ? `ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಅಧಿಕಾರ್ AI ಸಾರ್ವಜನಿಕ ಸೇವಾ ಸಹಾಯಕ. ನೀವು **${localizedScheme?.name || focusedScheme.name}** ಬಗ್ಗೆ ತಿಳಿದುಕೊಳ್ಳಲು ಬಯಸಿದ್ದೀರಿ. ಈ ಯೋಜನೆಯ ಅರ್ಹತೆ, ಅಗತ್ಯ ದಾಖಲೆಗಳು ಅಥವಾ ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನದ ಬಗ್ಗೆ ಏನು ತಿಳಿಯಬೇಕು?`
        : `ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಅಧಿಕಾರ್ AI ಸಾರ್ವಜನಿಕ ಸೇವಾ ಸಹಾಯಕ. ನೀವು ಭಾರತ ಸರ್ಕಾರದ ಯಾವುದೇ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು, ಅರ್ಹತಾ ನಿಯಮಗಳು, ಬೇಕಾಗುವ ದಾಖಲೆಗಳು ಅಥವಾ ಆರ್‌ಟಿಐ ನಾಗರಿಕ ಹಕ್ಕುಗಳ ಬಗ್ಗೆ ಕನ್ನಡದಲ್ಲೇ ಕೇಳಿ ತಿಳಿಯಬಹುದು.\n\nನಿಮಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`;
    } else if (currentLang === 'hi') {
      return focusedScheme
        ? `नमस्ते! मैं आपका अधिकारAI सहायक हूं। आप **${localizedScheme?.name || focusedScheme.name}** के बारे में जानना चाहते हैं। मैं आपकी क्या मदद कर सकता हूं?`
        : `नमस्ते! मैं आपका अधिकारAI लोक सेवा सहायक हूं। आप सरकारी योजनाओं, पात्रता, दस्तावेज़ों या अपने अधिकारों के बारे में कोई भी प्रश्न पूछ सकते हैं।\n\nमैं आपकी किस प्रकार सहायता कर सकता हूं?`;
    } else if (currentLang === 'ta') {
      return `வணக்கம்! நான் உங்கள் அதிகார் AI பொது சேவை உதவியாளர். அரசு திட்டங்கள், தகுதிகள் மற்றும் உரிமைகள் குறித்து எளிய தமிழில் கேளுங்கள். நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?`;
    } else if (currentLang === 'te') {
      return `నమస్కారం! నేను మీ అధికార్ AI ప్రజా సేవా సహాయకుడిని. ప్రభుత్వ పథకాలు, అర్హతలు మరియు హక్కుల గురించి తెలుసుకోవడానికి నన్ను అడగండి. మీకు నేను ఎలా సహాయపడగలను?`;
    } else if (currentLang === 'bn') {
      return `নমস্কার! আমি আপনার অধিকারAI জনসেবা সহকারী। সরকারি প্রকল্প, যোগ্যতা এবং অধিকার সম্পর্কে বাংলায় প্রশ্ন জিজ্ঞাসা করুন।`;
    }
    return `Namaste! I am your AdhikarAI Public Service Assistant. You can ask me anything about government welfare schemes, eligibility rules, document requirements, or your citizen rights.\n\nHow can I help you today?`;
  };

  const getSuggestedQuestions = (): string[] => {
    if (currentLang === 'kn') {
      return [
        'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಯೋಜನೆಯಡಿ ₹5 ಲಕ್ಷ ಚಿಕಿತ್ಸೆ ಯಾರಿಗೆ ಸಿಗುತ್ತದೆ?',
        'ಪಿಎಂ-ಕಿಸಾನ್ ₹6,000 ಪಡೆಯಲು ಯಾವ ಭೂ ದಾಖಲೆಗಳು ಬೇಕು?',
        'ಸಣ್ಣ ಅಂಗಡಿ ಅಥವಾ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ಮುದ್ರಾ ಸಾಲ ಪಡೆಯುವುದು ಹೇಗೆ?',
        'ಆದಾಯ ಪ್ರಮಾಣಪತ್ರದಲ್ಲಿ ತಪ್ಪು ಇದ್ದರೆ ಹೇಗೆ ಸರಿಪಡಿಸುವುದು?',
      ];
    } else if (currentLang === 'hi') {
      return [
        'आयुष्मान भारत कार्ड बनवाने के लिए कौन से दस्तावेज़ चाहिए?',
        'पीएम किसान सम्मान निधि ₹6000 के लिए कौन पात्र है?',
        'मुद्रा लोन के तहत बिना गारंटी कितना लोन मिल सकता है?',
        'राशन कार्ड में नाम जुड़वाने के लिए क्या करना होगा?',
      ];
    } else if (currentLang === 'ta') {
      return [
        'ஆயுஷ்மான் அட்டை பெற என்ன ஆவணங்கள் தேவை?',
        'விவசாயிகளுக்கு ₹6000 உதவித்தொகை பெறுவது எப்படி?',
        'முத்ரா கடன் பெற பிணை தேவையா?',
      ];
    } else if (currentLang === 'te') {
      return [
        'ఆయుష్మాన్ భారత్ ₹5 లక్షల ఉచిత వైద్యం ఎవరికి వర్తిస్తుంది?',
        'పీఎం కిసాన్ నిధుల కోసం ఎలాంటి పత్రాలు కావాలి?',
        'చిన్న వ్యాపారాల కోసం ముద్రా రుణం ఎలా పొందాలి?',
      ];
    } else if (currentLang === 'bn') {
      return [
        'আয়ুষ্মান ভারত প্রকল্পে ₹৫ লক্ষ চিকিৎসার সুবিধা কীভাবে পাওয়া যাবে?',
        'প্রধানমন্ত্রী কিষাণ প্রকল্পে আবেদনের নিয়ম কী?',
      ];
    }
    return [
      'Which government schemes offer health coverage up to ₹5 Lakh?',
      'What schemes can I apply for if I run a small shop or street cart?',
      'How can I get an income certificate and how long is it valid?',
    ];
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: getInitialGreeting(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: getSuggestedQuestions(),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [stopRecognition, setStopRecognition] = useState<(() => void) | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update greeting when language changes if only initial message is present
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'init-1') {
      setMessages([
        {
          id: 'init-1',
          role: 'assistant',
          content: getInitialGreeting(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedQuestions: getSuggestedQuestions(),
        },
      ]);
    }
  }, [currentLang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleVoiceInput = () => {
    if (isListening) {
      if (stopRecognition) stopRecognition();
      setIsListening(false);
      setStopRecognition(null);
    } else {
      stopSpeaking();
      setIsListening(true);
      const stopFn = listenSpeech(
        currentLang,
        (transcript) => {
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        },
        (err) => {
          console.warn('Speech recognition warning:', err);
          setIsListening(false);
        }
      );
      setStopRecognition(() => stopFn);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    if (isListening && stopRecognition) {
      stopRecognition();
      setIsListening(false);
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const payloadMessages = [...messages, userMessage].map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          schemeContextId: schemeContextId || undefined,
          language: currentLang,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Error communicating with AI Assistant');
      }

      const assistantMsg: ChatMessage = {
        id: `assist-${Date.now()}`,
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: data.suggestedQuestions || [],
        relatedSchemes: data.relatedSchemes || [],
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: currentLang === 'kn'
          ? `ಕ್ಷಮಿಸಿ, ಪ್ರಶ್ನೆಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುವಲ್ಲಿ ದೋಷ ಉಂಟಾಗಿದೆ: ${err.message || 'ದಯವಿಟ್ಟು ಮರುಪ್ರಯತ್ನಿಸಿ.'}`
          : `I encountered an issue processing your query: ${err.message || 'Please check your connection and try again.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    stopSpeaking();
    setMessages([
      {
        id: 'init-reset',
        role: 'assistant',
        content: getInitialGreeting(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: getSuggestedQuestions(),
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 space-y-4">
      {/* Top Banner / Scheme Context Info */}
      {focusedScheme ? (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-center justify-between text-xs text-teal-900">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-700 shrink-0" />
            <div>
              <span className="font-semibold">Context: </span>
              <span className="font-bold">{localizedScheme?.name || focusedScheme.name}</span>
            </div>
          </div>
          <button
            onClick={onClearSchemeContext}
            className="flex items-center gap-1 font-semibold text-teal-800 hover:text-teal-950 px-2 py-1 rounded hover:bg-teal-100"
          >
            <span>{t.close}</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : null}

      {/* Main Chat Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[75vh] overflow-hidden">
        {/* Chat Header with Voice Indicator */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-800 text-teal-200 flex items-center justify-center border border-teal-600">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>AdhikarAI {t.navChat}</span>
                <span className="text-[10px] font-bold bg-teal-900 text-teal-300 px-2 py-0.5 rounded-full border border-teal-700">
                  {currentLang.toUpperCase()} · 🎙️ {t.voiceAssistant}
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                {t.featAssistantDesc}
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-teal-700 text-white'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-2 max-w-[85%] sm:max-w-[80%]">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white rounded-tr-xs'
                      : msg.isError
                      ? 'bg-rose-50 text-rose-900 border border-rose-200 rounded-tl-xs'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-xs'
                  }`}
                >
                  {/* Clean text formatting */}
                  <div className="whitespace-pre-line space-y-2">
                    {msg.content}
                  </div>

                  {/* Message timestamp and voice reader */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    {msg.role === 'assistant' && !msg.isError && (
                      <div className="flex items-center gap-3">
                        {/* Voice Reader for Assistant Response */}
                        <SpeakButton
                          text={msg.content}
                          lang={currentLang}
                          label={t.readAloud}
                        />

                        <button
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors"
                          title="Copy"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Related Scheme Cards from Answer */}
                {msg.relatedSchemes && msg.relatedSchemes.length > 0 && (
                  <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl p-3 space-y-2">
                    <span className="text-[11px] font-bold text-teal-900 uppercase tracking-wide block">
                      {t.navSchemes}
                    </span>
                    <div className="space-y-1.5">
                      {msg.relatedSchemes.map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-teal-100 text-xs"
                        >
                          <span className="font-semibold text-slate-900 line-clamp-1">{s.name}</span>
                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            <button
                              onClick={() => onViewScheme(s.id)}
                              className="text-teal-700 font-bold hover:underline"
                            >
                              {t.viewDetails}
                            </button>
                            <a
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-500 hover:text-slate-800"
                              title="Official government portal"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Follow-up Questions */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(q)}
                          className="px-2.5 py-1 text-xs bg-white text-slate-700 border border-slate-200 rounded-lg hover:border-teal-400 hover:text-teal-800 transition-colors text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex gap-3 max-w-3xl mr-auto">
              <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs text-slate-500 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-teal-600 animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-teal-600 animate-pulse delay-150" />
                <span className="ml-1">
                  {currentLang === 'kn'
                    ? 'ಅಧಿಕಾರ್ AI ಮಾಹಿತಿಯನ್ನು ಹುಡುಕುತ್ತಿದೆ...'
                    : 'AdhikarAI is searching official welfare guidelines...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with Microphone Voice Input */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            {/* Microphone Voice Input Button */}
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-3 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 shrink-0 ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse shadow-md'
                  : 'bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200'
              }`}
              title={isListening ? t.stopVoice : `${t.speakNow} (${currentLang.toUpperCase()})`}
              aria-label="Voice input microphone"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-teal-700" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? t.listening : t.chatPlaceholder}
              className="flex-1 px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-3 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-200 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>{t.send}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {isListening && (
            <div className="mt-2 text-center text-xs text-rose-700 font-semibold animate-pulse flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              <span>{t.listening}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
