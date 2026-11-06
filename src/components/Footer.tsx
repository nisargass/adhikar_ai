import React from 'react';
import { Scale, Phone, ExternalLink, ShieldCheck, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-teal-800 text-white flex items-center justify-center border border-teal-600">
                <Scale className="w-5 h-5 text-teal-200" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Adhikar<span className="text-teal-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An AI-powered public-service accessibility platform helping citizens understand their constitutional rights, discover government welfare schemes, prepare necessary documentation, and navigate civic bureaucracy in simple language.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Document Storage · Privacy Guaranteed</span>
            </div>
          </div>

          {/* Quick Platform Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Citizen Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('schemes')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Explore Government Schemes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chat')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  AdhikarAI Rights Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('document-doctor')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Document Doctor (Document Inspection)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('eligibility')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Smart Eligibility Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rights')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Citizen Legal Rights Guide (RTI, RTE, Consumer)
                </button>
              </li>
            </ul>
          </div>

          {/* National Official Portals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>National Portal of India</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://beneficiary.nha.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Ayushman Bharat (PM-JAY)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>PM-KISAN Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://rtionline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Central RTI Online Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* 24x7 Citizen Emergency Helplines */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>National Citizen Helplines</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between border-b border-slate-900 pb-1">
                <span>Ayushman Bharat (Health)</span>
                <span className="font-mono text-teal-300 font-semibold">14555</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1">
                <span>PM-KISAN Helpdesk</span>
                <span className="font-mono text-teal-300 font-semibold">155261</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1">
                <span>National Consumer Helpline</span>
                <span className="font-mono text-teal-300 font-semibold">1915</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1">
                <span>Elder Line (Senior Citizens)</span>
                <span className="font-mono text-teal-300 font-semibold">14567</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1">
                <span>Women in Distress</span>
                <span className="font-mono text-teal-300 font-semibold">181</span>
              </div>
              <div className="flex justify-between">
                <span>Childline</span>
                <span className="font-mono text-teal-300 font-semibold">1098</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 text-xs text-slate-400 mb-8 leading-relaxed">
          <p className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-amber-400" />
            <span>Public Service Notice & Informational Disclaimer</span>
          </p>
          <p>
            AdhikarAI is an independent, non-governmental civic-tech research and public service accessibility tool. It is not affiliated with, endorsed by, or operated as an official body of the Government of India or any State Government. All scheme summaries, criteria, and documentation checklists are compiled from public government notifications and official ministry guidelines. AI-assisted analysis and chatbot responses are purely informational aids to help citizens prepare their paperwork; they do not constitute official administrative decisions or guarantees of benefit approval. Citizens should verify current requirements on the respective official government portals or at their local Common Service Center (CSC).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-900 gap-3">
          <p>© {new Date().getFullYear()} AdhikarAI Civic Technology Initiative. Open Access Public Resource.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('rights')} className="hover:text-slate-300">
              Constitutional Rights
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('schemes')} className="hover:text-slate-300">
              Schemes Directory
            </button>
            <span>·</span>
            <a
              href="https://pgportal.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 flex items-center gap-1"
            >
              <span>CPGRAMS Grievance Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
