import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  FileCheck2, 
  MessageSquare, 
  Scale, 
  UserCheck, 
  ShieldCheck, 
  Building, 
  CheckCircle2, 
  Sparkles,
  Users,
  Compass,
  FileText,
  User,
  Edit3,
  BadgeCheck,
  TrendingUp,
  MapPin,
  ExternalLink,
  Volume2
} from 'lucide-react';
import { SchemeCategory, UserProfile, Scheme } from '../types/index.ts';
import { SCHEMES } from '../data/schemesData.ts';
import { LanguageCode, TRANSLATIONS, LOCALIZED_SCHEMES } from '../i18n/translations.ts';
import { SpeakButton } from '../components/SpeakButton.tsx';

interface HomeViewProps {
  onNavigate: (tab: string, query?: string) => void;
  currentUser?: UserProfile | null;
  currentLang: LanguageCode;
  onEditProfile?: () => void;
  onAskAboutScheme?: (schemeId: string) => void;
  onViewScheme?: (schemeId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  onNavigate,
  currentUser,
  currentLang,
  onEditProfile,
  onAskAboutScheme,
  onViewScheme,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.kn;
  const localizedMap = LOCALIZED_SCHEMES[currentLang] || LOCALIZED_SCHEMES.kn;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('schemes', searchQuery.trim());
    } else {
      onNavigate('schemes');
    }
  };

  const categories: { name: SchemeCategory; icon: string; count: number; desc: string; label: string }[] = [
    { name: 'Healthcare', icon: '🩺', count: 1, desc: 'Ayushman Bharat', label: t.catHealthcare },
    { name: 'Agriculture & Farmers', icon: '🌾', count: 1, desc: 'PM-KISAN', label: t.catAgriculture },
    { name: 'Housing & Urban', icon: '🏠', count: 1, desc: 'PMAY', label: t.catHousing },
    { name: 'Women & Child Development', icon: '🌸', count: 2, desc: 'Sukanya Samriddhi & Ujjwala', label: t.catWomenChild },
    { name: 'Education & Scholarships', icon: '🎓', count: 1, desc: 'NSP Scholarship', label: t.catEducation },
    { name: 'Employment & Entrepreneurship', icon: '💼', count: 4, desc: 'Mudra & Vishwakarma', label: t.catEmployment },
    { name: 'Social Security & Pensions', icon: '🛡️', count: 1, desc: 'Atal Pension Yojana', label: t.catSocialSecurity },
  ];

  // Compute personalized dedicated schemes based on citizen profile
  const getPersonalizedSchemes = (): { scheme: Scheme; matchReason: string; matchBadge: string }[] => {
    if (!currentUser || !currentUser.hasCompletedProfile) return [];

    const matched: { scheme: Scheme; matchReason: string; matchBadge: string; priority: number }[] = [];
    const age = currentUser.age ?? 25;
    const income = currentUser.annualIncome ?? 200000;
    const occ = (currentUser.occupation ?? '').toLowerCase();
    const gender = currentUser.gender ?? 'Female';
    const caste = currentUser.caste ?? 'OBC';
    const state = currentUser.state ?? 'India';

    SCHEMES.forEach((scheme) => {
      let match = false;
      let reason = '';
      let badge = 'Recommended';
      let priority = 10;

      // 1. Occupation specific
      if (scheme.id === 'pm-kisan-samman-nidhi' && (occ.includes('farmer') || currentUser.ownsLand)) {
        match = true;
        reason = currentLang === 'kn' 
          ? `${state} ರಾಜ್ಯದ ನಿಮ್ಮ ಕೃಷಿ ಭೂಮಿ ಪ್ರೊಫೈಲ್‌ಗೆ ಸಂಪೂರ್ಣವಾಗಿ ಸರಿಹೊಂದುತ್ತದೆ.` 
          : `Directly matches your landholder farmer profile in ${state}.`;
        badge = currentLang === 'kn' ? '100% ಹೊಂದಾಣಿಕೆ · ರೈತ ಆದಾಯ' : '100% Fit · Farmer Direct Income';
        priority = 100;
      } else if (scheme.id === 'pm-vishwakarma-yojana' && (occ.includes('artisan') || occ.includes('craft') || occ.includes('carpenter') || occ.includes('tailor'))) {
        match = true;
        reason = currentLang === 'kn'
          ? `ನಿಮ್ಮ ಸಾಂಪ್ರದಾಯಿಕ ಕುಶಲಕರ್ಮಿ ಮತ್ತು ಕುಲಕಸುಬು ವೃತ್ತಿಗೆ ನೇರವಾಗಿ ರೂಪಿಸಲಾಗಿದೆ.`
          : `Directly tailored for your traditional craft & trade in ${state}.`;
        badge = currentLang === 'kn' ? '₹15,000 ಟೂಲ್‌ಕಿಟ್ + 5% ಸಾಲ' : '₹15,000 Toolkit + 5% Credit';
        priority = 98;
      } else if (scheme.id === 'pm-svanidhi-scheme' && (occ.includes('vendor') || occ.includes('hawker') || occ.includes('retailer') || occ.includes('shop'))) {
        match = true;
        reason = currentLang === 'kn'
          ? `ಬೀದಿ ಬದಿ ಮತ್ತು ಸಣ್ಣ ವ್ಯಾಪಾರಕ್ಕೆ ₹50,000 ವರೆಗೆ ಬಂಡವಾಳ ಸಾಲ ಒದಗಿಸುತ್ತದೆ.`
          : `Provides working capital loans up to ₹50,000 for your vending activities.`;
        badge = currentLang === 'kn' ? 'ಅಡಮಾನವಿಲ್ಲದ ಕಿರುಸಾಲ' : 'Collateral-Free Micro Credit';
        priority = 95;
      } else if (scheme.id === 'post-matric-scholarship-sc-st-obc' && (occ.includes('student') || currentUser.isStudent)) {
        if (caste === 'SC' || caste === 'ST' || caste === 'OBC' || caste === 'EWS') {
          match = true;
          reason = currentLang === 'kn'
            ? `ವಾರ್ಷಿಕ ಆದಾಯ ₹2.5 ಲಕ್ಷದೊಳಗಿರುವ ${caste} ವಿದ್ಯಾರ್ಥಿಯಾಗಿ ಸಂಪೂರ್ಣ ಶುಲ್ಕ ವಿನಾಯಿತಿ ಪಡೆಯಬಹುದು.`
            : `You qualify as a ${caste} student with family income under ₹2.5 Lakh.`;
          badge = currentLang === 'kn' ? '100% ಕಾಲೇಜು ಶುಲ್ಕ ಮನ್ನಾ' : '100% Tuition Fee Waiver';
          priority = 96;
        }
      }

      // 2. Gender specific
      if (scheme.id === 'pm-ujjwala-yojana' && gender === 'Female' && income <= 300000) {
        match = true;
        reason = currentLang === 'kn'
          ? `ಆದಾಯ ಮಿತಿಯೊಳಗಿನ ಮಹಿಳಾ ಫಲಾನುಭವಿಗಳಿಗೆ ಉಚಿತ ಗ್ಯಾಸ್ ಸೌಲಭ್ಯ.`
          : `Adult woman beneficiary with family income within welfare parameters.`;
        badge = currentLang === 'kn' ? 'ಉಚಿತ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ + ಸಿಲಿಂಡರ್' : 'Free LPG Connection + Refill';
        priority = 85;
      } else if (scheme.id === 'sukanya-samriddhi-yojana' && gender === 'Female' && age <= 18) {
        match = true;
        reason = currentLang === 'kn'
          ? `ಹೆಣ್ಣು ಮಗುವಿನ ಶಿಕ್ಷಣಕ್ಕಾಗಿ 8.2% ವಾರ್ಷಿಕ ಬಡ್ಡಿಯ ತೆರಿಗೆ ಮುಕ್ತ ಉಳಿತಾಯ.`
          : `High-interest sovereign savings (8.2% p.a.) tax-free investment.`;
        badge = '8.2% Sovereign Return';
        priority = 80;
      }

      // 3. Universal health & housing for low/moderate income
      if (scheme.id === 'pm-jay-ayushman-bharat' && income <= 500000) {
        match = true;
        reason = currentLang === 'kn'
          ? `ನಿಮ್ಮ ವಾರ್ಷಿಕ ಆದಾಯ (₹${income.toLocaleString('en-IN')}) ₹5 ಲಕ್ಷದ ಆಯುಷ್ಮಾನ್ ಉಚಿತ ಚಿಕಿತ್ಸೆಗೆ ಅರ್ಹತೆ ನೀಡುತ್ತದೆ.`
          : `Your declared annual income (₹${income.toLocaleString('en-IN')}) qualifies your household for ₹5 Lakh hospitalization assurance.`;
        badge = currentLang === 'kn' ? '₹5,00,000 ಉಚಿತ ಚಿಕಿತ್ಸೆ' : '₹5,00,000 Free Health Cover';
        priority = 90;
      } else if (scheme.id === 'pm-awas-yojana-urban-gramin' && income <= 600000) {
        match = true;
        reason = currentLang === 'kn'
          ? `${state} ರಾಜ್ಯದಲ್ಲಿ ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಾಣಕ್ಕೆ ಸರ್ಕಾರಿ ಧನಸಹಾಯ.`
          : `Within EWS/LIG income ceiling (₹${income.toLocaleString('en-IN')}) for pucca house financial aid in ${state}.`;
        badge = currentLang === 'kn' ? 'ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಾಣ ಧನಸಹಾಯ' : 'Financial Grant for Pucca House';
        priority = 75;
      }

      // 4. Pension & Social security for age 18-40
      if (scheme.id === 'atal-pension-yojana' && age >= 18 && age <= 40 && income <= 400000) {
        match = true;
        reason = currentLang === 'kn'
          ? `${age} ವಯಸ್ಸಿನ ನಿಮಗೆ 60 ವರ್ಷದ ನಂತರ ಜೀವಮಾನ ಸರ್ಕಾರದ ಖಾತರಿ ಪಿಂಚಣಿ ಸಿಗುತ್ತದೆ.`
          : `Age ${age} falls in the prime contribution window for guaranteed government lifetime pension.`;
        badge = currentLang === 'kn' ? 'ಖಾತರಿ ಮಾಸಿಕ ಪಿಂಚಣಿ' : 'Guaranteed Monthly Pension';
        priority = 70;
      }

      // 5. Mudra loan for non-farm enterprises
      if (scheme.id === 'pm-mudra-yojana' && !occ.includes('farmer') && age >= 18) {
        match = true;
        reason = currentLang === 'kn'
          ? `ಯಾವುದೇ ಆಸ್ತಿ ಅಡಮಾನವಿಲ್ಲದೆ ₹10 ಲಕ್ಷದವರೆಗೆ ಬ್ಯಾಂಕ್ ಸಾಲ.`
          : `Collateral-free institutional loan up to ₹10 Lakh for your enterprise in ${state}.`;
        badge = currentLang === 'kn' ? 'ಅಡಮಾನವಿಲ್ಲದ ವ್ಯಾಪಾರ ಸಾಲ' : 'Zero-Collateral Business Loan';
        priority = 65;
      }

      if (match) {
        matched.push({ scheme, matchReason: reason, matchBadge: badge, priority });
      }
    });

    matched.sort((a, b) => b.priority - a.priority);
    return matched;
  };

  const dedicatedSchemes = getPersonalizedSchemes();

  return (
    <div className="space-y-12 py-4 sm:py-8">
      {/* Personalized Citizen Profile Bar (if profile is setup) */}
      {currentUser && currentUser.hasCompletedProfile ? (
        <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs uppercase font-bold text-teal-300 tracking-wider">
                  {t.tailoredView}
                </span>
                <span className="text-[11px] bg-teal-900/80 text-teal-200 px-2 py-0.5 rounded-md border border-teal-700">
                  {currentLang.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold">
                  {t.welcomeCitizen}, {currentUser.name}
                </h2>
                <SpeakButton
                  text={`${t.welcomeCitizen} ${currentUser.name}. ${currentUser.age} ವಯಸ್ಸು, ${currentUser.occupation}, ${currentUser.state}.`}
                  lang={currentLang}
                  iconOnly={true}
                />
              </div>
              {/* Profile Details Tag Strip */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 pt-1">
                <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                  🎂 {currentUser.age} {currentLang === 'kn' ? 'ವರ್ಷ' : 'Years'}
                </span>
                <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                  👤 {currentUser.gender}
                </span>
                <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700 font-semibold text-teal-300">
                  💼 {currentUser.occupation}
                </span>
                <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                  📍 {currentUser.state}
                </span>
                <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                  🏷️ {currentUser.caste}
                </span>
                <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700 font-mono text-emerald-300">
                  💰 {t.annualIncome}: ₹{(currentUser.annualIncome ?? 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
              <button
                onClick={onEditProfile}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5 text-teal-400" />
                <span>{t.editProfile}</span>
              </button>
              <button
                onClick={() => onNavigate('document-doctor')}
                className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>{t.navDocDoctor}</span>
              </button>
            </div>
          </div>
        </section>
      ) : (
        /* Invitation to Set Up Profile if Guest */
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-teal-950">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-teal-900 block">
                {currentLang === 'kn' 
                  ? 'ನಿಮ್ಮ ಅರ್ಹತೆಯ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಪಡೆಯಲು ಪ್ರೊಫೈಲ್ ರಚಿಸಿ' 
                  : 'Unlock Your Dedicated Government Schemes Feed'}
              </span>
              <p className="text-teal-800 mt-0.5">
                {currentLang === 'kn'
                  ? 'ನಿಮ್ಮ ವಯಸ್ಸು, ಆದಾಯ, ಜಾತಿ ಮತ್ತು ಉದ್ಯೋಗವನ್ನು ನಮೂದಿಸಿ, ನಿಮಗಾಗಿ ಮೀಸಲಾದ ಯೋಜನೆಗಳನ್ನು ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಪಡೆಯಿರಿ.'
                  : 'Sign in and enter your age, income, state, caste, and occupation to receive an instant dedicated welfare catalog.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('login')}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-2xs shrink-0 self-start sm:self-auto flex items-center gap-1.5"
          >
            <span>{t.navLogin}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* DEDICATED SCHEMES SECTION (IF PROFILE IS ACTIVE) */}
      {currentUser && currentUser.hasCompletedProfile && dedicatedSchemes.length > 0 && (
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider">
                <BadgeCheck className="w-4 h-4 text-teal-600" />
                <span>{t.dedicatedSchemesTitle}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {t.dedicatedSchemesTitle} ({currentUser.name})
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              {t.dedicatedSchemesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dedicatedSchemes.slice(0, 6).map(({ scheme, matchReason, matchBadge }) => {
              const loc = localizedMap[scheme.id] || {
                name: scheme.name,
                shortDescription: scheme.shortDescription,
                benefitHighlight: scheme.benefits.financialAmount || scheme.benefits.summary,
              };

              return (
                <div
                  key={scheme.id}
                  className="bg-white rounded-2xl border-2 border-teal-200/80 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between overflow-hidden relative"
                >
                  {/* Top Bar with Match Highlight and Speak Button */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200">
                      {matchBadge}
                    </span>
                    <SpeakButton
                      text={`${loc.name}. ${loc.benefitHighlight}. ${loc.shortDescription}`}
                      lang={currentLang}
                      label={t.readAloud}
                    />
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="font-semibold text-teal-900">{scheme.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{scheme.department}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {loc.name}
                    </h3>

                    {/* Why it matches this specific citizen */}
                    <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{matchReason}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {loc.shortDescription}
                    </p>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block">
                        {t.benefits}
                      </span>
                      <span className="font-bold text-slate-900">
                        {loc.benefitHighlight}
                      </span>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onViewScheme ? onViewScheme(scheme.id) : onNavigate('schemes', scheme.name)}
                      className="flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 p-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{t.viewDetails}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onAskAboutScheme ? onAskAboutScheme(scheme.id) : onNavigate('chat')}
                        className="px-2.5 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors flex items-center gap-1"
                        title="Ask AI if you meet criteria"
                      >
                        <MessageSquare className="w-3 h-3 text-teal-700" />
                        <span>{t.askAI}</span>
                      </button>
                      <a
                        href={scheme.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                        title={t.officialPortal}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('schemes')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-teal-700 underline underline-offset-4"
            >
              <span>{t.checkAllSchemes}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 md:p-14 shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-teal-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span>{t.heroTag}</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              {t.heroHeadline}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-400">
                {t.heroHeadlineHighlight}
              </span>
            </h1>

            {/* Read Aloud Button for Hero */}
            <div className="flex justify-center pt-1">
              <SpeakButton
                text={`${t.heroHeadline} ${t.heroHeadlineHighlight}. ${t.heroSubtitle}`}
                lang={currentLang}
                label={t.readAloud}
              />
            </div>
          </div>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg p-1.5 focus-within:ring-2 focus-within:ring-teal-400">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>{t.btnFindSchemes}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
              <span>{t.popularSearches}</span>
              <button
                type="button"
                onClick={() => onNavigate('schemes', 'Ayushman')}
                className="hover:text-white underline decoration-slate-600 underline-offset-2"
              >
                Ayushman
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onNavigate('schemes', 'Kisan')}
                className="hover:text-white underline decoration-slate-600 underline-offset-2"
              >
                PM-KISAN
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onNavigate('schemes', 'Mudra')}
                className="hover:text-white underline decoration-slate-600 underline-offset-2"
              >
                Mudra
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onNavigate('schemes', 'Sukanya')}
                className="hover:text-white underline decoration-slate-600 underline-offset-2"
              >
                Sukanya
              </button>
            </div>
          </form>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('schemes')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>{t.btnExploreSchemes}</span>
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-teal-400" />
              <span>{t.btnAskAssistant}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4-Step Citizen Journey */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs uppercase font-bold text-teal-700 tracking-wider">{t.journeyTitle}</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t.journeyHeading}
          </h2>
          <p className="text-slate-600 text-sm">
            {t.journeySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 font-bold flex items-center justify-center text-sm mb-4">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">{t.step1Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step1Desc}
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 font-bold flex items-center justify-center text-sm mb-4">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">{t.step2Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step2Desc}
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-800 font-bold flex items-center justify-center text-sm mb-4">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">{t.step3Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step3Desc}
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center text-sm mb-4">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">{t.step4Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.step4Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Core Features Cards */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs uppercase font-bold text-teal-700 tracking-wider">{t.featHeading}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {t.featHeading}
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            {t.featDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center border border-teal-200">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.featSchemesTitle}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.featSchemesDesc}
              </p>
            </div>
            <button
              onClick={() => onNavigate('schemes')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
            >
              <span>{t.btnExploreSchemes}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center border border-indigo-200">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.featDocDoctorTitle}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.featDocDoctorDesc}
              </p>
            </div>
            <button
              onClick={() => onNavigate('document-doctor')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-800"
            >
              <span>{t.navDocDoctor}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.featAssistantTitle}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.featAssistantDesc}
              </p>
            </div>
            <button
              onClick={() => onNavigate('chat')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              <span>{t.btnAskAssistant}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Welfare Sectors Browse */}
      <section className="space-y-6">
        <div>
          <span className="text-xs uppercase font-bold text-teal-700 tracking-wider">{t.category}</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">{t.navSchemes}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate('schemes', cat.name)}
              className="p-4 bg-white rounded-xl border border-slate-200 text-left hover:border-teal-400 hover:shadow-xs transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition-colors">
                {cat.label}
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1 leading-relaxed">
                {cat.desc}
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
