import React, { useState } from 'react';
import { 
  Scale, 
  ExternalLink, 
  Phone, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { CITIZEN_RIGHTS } from '../data/rightsData.ts';
import { CitizenRight } from '../types/index.ts';

interface RightsViewProps {
  onAskAI: (query: string) => void;
}

export const RightsView: React.FC<RightsViewProps> = ({ onAskAI }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeRight, setActiveRight] = useState<CitizenRight | null>(CITIZEN_RIGHTS[0]);

  const categories = [
    'All',
    'Transparency & RTI',
    'Fundamental Rights',
    'Consumer Protection',
    'Labor & Workers',
    'Women & Family',
    'Senior Citizens',
  ];

  const filteredRights = selectedCategory === 'All' 
    ? CITIZEN_RIGHTS 
    : CITIZEN_RIGHTS.filter((r) => r.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
          <span>Constitutional & Statutory Literacy</span>
          <span>·</span>
          <span>Enforceable Protections</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Citizen Legal Rights & Grievance Portals
        </h1>
        <p className="text-slate-600 text-sm mt-1 leading-relaxed">
          Public services are not favors—they are statutory citizen entitlements. Learn how to legally demand delayed services, inspect public records, report corrupt demands, and file free electronic consumer disputes.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Dual-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List of Rights */}
        <div className="lg:col-span-5 space-y-2">
          {filteredRights.map((right) => (
            <button
              key={right.id}
              onClick={() => setActiveRight(right)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activeRight?.id === right.id
                  ? 'bg-teal-50/80 border-teal-500 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wide">
                  {right.category}
                </span>
                <ChevronRight className={`w-4 h-4 ${activeRight?.id === right.id ? 'text-teal-700' : 'text-slate-400'}`} />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mt-0.5">
                {right.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                {right.actName}
              </p>
            </button>
          ))}
        </div>

        {/* Right Detail Pane */}
        {activeRight && (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-1">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                {activeRight.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {activeRight.title}
              </h2>
              <p className="text-xs font-mono text-slate-500">{activeRight.actName}</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {activeRight.summary}
            </p>

            {/* Key Protections */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Statutory Protections Guaranteed by Law</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {activeRight.keyProtections.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Exercise */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-700" />
                <span>How to Exercise This Right (Step-by-Step)</span>
              </h4>
              <ol className="space-y-2.5 text-xs text-slate-700">
                {activeRight.howToExercise.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Official Grievance Portal Box */}
            <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-teal-900 font-bold block">
                  Official Portal / Redressal Authority:
                </span>
                <span className="text-teal-950 font-medium">{activeRight.grievancePortal.name}</span>
                {activeRight.grievancePortal.helpline && (
                  <div className="text-slate-600 mt-0.5 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-teal-700" />
                    <span>Toll-Free Helpline: {activeRight.grievancePortal.helpline}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activeRight.grievancePortal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Ask AI CTA */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onAskAI(`How can I enforce my ${activeRight.title} if a government officer denies service?`)}
                className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1"
              >
                <span>Ask AdhikarAI questions about {activeRight.title}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Central Public Grievance Portal Callout */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
            Universal Grievance Redressal
          </span>
          <h3 className="text-lg sm:text-xl font-bold">
            CPGRAMS (Centralised Public Grievance Redress and Monitoring System)
          </h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            If any Central Ministry or Department fails to deliver benefits, delays your application without reason, or denies statutory service, you can register an online grievance directly monitored by the Prime Minister’s Office.
          </p>
        </div>
        <a
          href="https://pgportal.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0"
        >
          <span>Lodge Grievance on pgportal.gov.in</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
