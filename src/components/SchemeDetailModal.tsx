import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  HelpCircle, 
  MapPin, 
  Phone,
  ShieldCheck,
  Building
} from 'lucide-react';
import { Scheme } from '../types/index.ts';
import { LanguageCode, TRANSLATIONS, LOCALIZED_SCHEMES } from '../i18n/translations.ts';
import { SpeakButton } from './SpeakButton.tsx';

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  currentLang?: LanguageCode;
  onClose: () => void;
  onAskAboutScheme: (schemeId: string) => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  currentLang = 'kn',
  onClose,
  onAskAboutScheme,
}) => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  if (!scheme) return null;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.kn;
  const localized = LOCALIZED_SCHEMES[currentLang]?.[scheme.id];
  const schemeTitle = localized?.name || scheme.name;
  const schemeDesc = localized?.shortDescription || scheme.shortDescription;
  const schemeBenefit = localized?.benefitHighlight || scheme.benefits.financialAmount || scheme.benefits.summary;

  const toggleDoc = (docName: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docName]: !prev[docName],
    }));
  };

  const totalDocs = scheme.requiredDocuments.length;
  const readyDocs = scheme.requiredDocuments.filter((d) => checkedDocs[d.name]).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="scheme-modal-title"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between border-b border-slate-800">
          <div className="space-y-1.5 pr-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="font-semibold text-teal-400">{scheme.category}</span>
              <span aria-hidden="true">·</span>
              <span>{scheme.level}</span>
              <span aria-hidden="true">·</span>
              <span>{scheme.department}</span>
            </div>
            <div className="flex items-center gap-3">
              <h2 id="scheme-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                {schemeTitle}
              </h2>
              <SpeakButton
                text={`${schemeTitle}. ${schemeDesc}. ${schemeBenefit}.`}
                lang={currentLang}
                size="sm"
              />
            </div>
            {scheme.hindiName && currentLang === 'en' && (
              <p className="text-sm text-slate-300 font-medium">{scheme.hindiName}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">
          {/* Quick Stats Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-xs text-slate-500 block">{t.benefits}</span>
              <span className="text-sm font-bold text-slate-900">
                {schemeBenefit}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Application Mode</span>
              <span className="text-sm font-bold text-slate-900">
                {scheme.applicationProcess.mode}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Official Helpline</span>
              <span className="text-sm font-mono font-bold text-teal-700">
                {scheme.helpline || 'Check Official Portal'}
              </span>
            </div>
          </div>

          {/* Overview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900">
                {currentLang === 'kn' ? 'ಯೋಜನೆಯ ವಿವರಣೆ' : currentLang === 'hi' ? 'योजना विवरण' : currentLang === 'ta' ? 'திட்ட விவரம்' : currentLang === 'te' ? 'పథకం వివరాలు' : currentLang === 'bn' ? 'প্রকল্পের বিবরণ' : 'Scheme Overview'}
              </h3>
              <SpeakButton text={schemeDesc} lang={currentLang} size="sm" />
            </div>
            <p className="text-slate-700 leading-relaxed text-sm bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              {schemeDesc}
            </p>
          </div>

          {/* Target Beneficiaries */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {currentLang === 'kn' ? 'ಫಲಾನುಭವಿಗಳು' : currentLang === 'hi' ? 'लक्षित लाभार्थी' : currentLang === 'ta' ? 'பயனாளிகள்' : currentLang === 'te' ? 'లబ్ధిదారులు' : currentLang === 'bn' ? 'উপকারভোগী' : 'Target Beneficiaries'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {scheme.targetBeneficiaries.map((b, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-800 rounded-md border border-slate-200"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Eligibility & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/70">
              <h4 className="font-bold text-emerald-900 flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{t.eligibilityCriteria}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-800">
                {scheme.eligibility.criteriaSummary.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/70">
              <h4 className="font-bold text-amber-900 flex items-center gap-1.5 mb-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Exclusions (Who Cannot Apply)</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-800">
                {scheme.eligibility.exclusions.map((ex, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">•</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Benefits */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{t.benefits}</h3>
            <p className="text-xs text-slate-600 mb-3 font-medium">{scheme.benefits.summary}</p>
            <div className="space-y-2">
              {scheme.benefits.details.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents Interactive Checklist */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-200 gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-700" />
                  <span>{t.requiredDocuments}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Tick off documents you have to verify application readiness.
                </p>
              </div>
              <div className="text-xs font-semibold px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-slate-700 shrink-0">
                Status: {readyDocs}/{totalDocs} Ready
              </div>
            </div>

            <div className="space-y-3">
              {scheme.requiredDocuments.map((doc, idx) => {
                const isChecked = !!checkedDocs[doc.name];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleDoc(doc.name)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleDoc(doc.name)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500 cursor-pointer"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold ${isChecked ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'}`}>
                          {doc.name}
                        </span>
                        {doc.isMandatory && (
                          <span className="text-[10px] uppercase font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                            {t.mandatory}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 mb-1">Purpose: {doc.purpose}</p>
                      <p className="text-slate-500 italic flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>Where to get: {doc.whereToGet}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How to Apply */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3">{t.howToApply}</h3>
            <ol className="space-y-3">
              {scheme.applicationProcess.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
            {scheme.applicationProcess.offlineOffices && (
              <div className="mt-3 p-3 bg-slate-100 rounded-lg text-xs text-slate-700 flex items-start gap-2">
                <Building className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">In-person Application Centers: </span>
                  {scheme.applicationProcess.offlineOffices.join(' · ')}
                </div>
              </div>
            )}
          </div>

          {/* FAQs */}
          {scheme.faqs && scheme.faqs.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-teal-700" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="space-y-2">
                {scheme.faqs.map((faq, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <p className="font-semibold text-slate-900 mb-1">Q: {faq.question}</p>
                    <p className="text-slate-700">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Verify official rules at the issuing ministry portal before submitting.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onAskAboutScheme(scheme.id);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              <MessageSquare className="w-3.5 h-3.5 text-teal-300" />
              <span>{t.askAI}</span>
            </button>
            <a
              href={scheme.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-teal-700 text-white hover:bg-teal-800 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              <span>{t.officialPortal}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
