import React, { useState } from 'react';
import { 
  UserCheck, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Building, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { EligibilityProfile, EligibilityMatchResult } from '../types/index.ts';

interface EligibilityViewProps {
  onViewScheme: (schemeId: string) => void;
  onAskAboutScheme: (schemeId: string) => void;
}

export const EligibilityView: React.FC<EligibilityViewProps> = ({
  onViewScheme,
  onAskAboutScheme,
}) => {
  const [profile, setProfile] = useState<EligibilityProfile>({
    age: 26,
    gender: 'Female',
    occupation: 'Small Business / Artisan',
    annualIncome: 180000,
    category: 'OBC',
    state: 'Uttar Pradesh',
    ownsLand: false,
    landAcres: 0,
    isStudent: false,
    hasDisabledFamilyMember: false,
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<EligibilityMatchResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 
    'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const occupations = [
    'Farmer / Agricultural Landholder',
    'Small Business / Shopkeeper / Trader',
    'Traditional Artisan / Craftsperson (Vishwakarma)',
    'Street Vendor / Hawker',
    'Unorganized Worker / Daily Wage Earner',
    'Student (School / College / Polytechnic)',
    'Salaried Employee / Private Service',
    'Homemaker / Unemployed',
  ];

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/eligibility-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to check eligibility');
      }

      setResults(data.data);
    } catch (err: any) {
      console.error('Eligibility check error:', err);
      setError(err?.message || 'Failed to process eligibility. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
    setProfile({
      age: 26,
      gender: 'Female',
      occupation: 'Small Business / Artisan',
      annualIncome: 180000,
      category: 'OBC',
      state: 'Uttar Pradesh',
      ownsLand: false,
      landAcres: 0,
      isStudent: false,
      hasDisabledFamilyMember: false,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
          <span>Rule-Based Citizen Evaluator</span>
          <span>·</span>
          <span>Instant Scheme Matching</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Smart Scheme Eligibility Checker
        </h1>
        <p className="text-slate-600 text-sm mt-1 leading-relaxed">
          Provide your basic demographic, occupation, and income details below. We evaluate your profile against statutory eligibility criteria across all national and state welfare programs.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Profile Form */}
      {!results ? (
        <form onSubmit={handleCheck} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Age */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                Age (Years)
              </label>
              <input
                type="number"
                min="0"
                max="110"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                Gender
              </label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                State of Residence
              </label>
              <select
                value={profile.state}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {indianStates.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Occupation */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                Primary Occupation / Livelihood
              </label>
              <select
                value={profile.occupation}
                onChange={(e) => {
                  const val = e.target.value;
                  setProfile({
                    ...profile,
                    occupation: val,
                    isStudent: val.toLowerCase().includes('student'),
                    ownsLand: val.toLowerCase().includes('farmer') ? true : profile.ownsLand,
                  });
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {occupations.map((occ) => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>

            {/* Social Category */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                Social Category
              </label>
              <select
                value={profile.category}
                onChange={(e) => setProfile({ ...profile, category: e.target.value as any })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="General">General</option>
                <option value="OBC">Other Backward Class (OBC)</option>
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
                <option value="EWS">Economically Weaker Section (EWS)</option>
              </select>
            </div>
          </div>

          {/* Annual Household Income */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Annual Family Income (INR)
              </label>
              <span className="text-sm font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                ₹{profile.annualIncome.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="20000"
              max="1500000"
              step="10000"
              value={profile.annualIncome}
              onChange={(e) => setProfile({ ...profile, annualIncome: parseInt(e.target.value, 10) })}
              className="w-full accent-teal-700 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>₹20,000 (BPL)</span>
              <span>₹2.5 Lakh (EWS limit)</span>
              <span>₹6 Lakh (PMAY ceiling)</span>
              <span>₹15 Lakh+</span>
            </div>
          </div>

          {/* Land and Special Conditions */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                id="ownsLand"
                checked={profile.ownsLand}
                onChange={(e) => setProfile({ ...profile, ownsLand: e.target.checked, landAcres: e.target.checked ? (profile.landAcres || 1.5) : 0 })}
                className="w-4 h-4 text-teal-700 rounded border-slate-300 focus:ring-teal-500 cursor-pointer"
              />
              <label htmlFor="ownsLand" className="text-xs text-slate-800 font-medium cursor-pointer">
                Owns Agricultural / Cultivable Land
              </label>
            </div>

            {profile.ownsLand && (
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-600 font-medium shrink-0">Land Area (Acres):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="50"
                  value={profile.landAcres}
                  onChange={(e) => setProfile({ ...profile, landAcres: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating Profile...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Find My Schemes</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Results View */
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 text-white p-5 rounded-2xl">
            <div>
              <span className="text-xs text-teal-300 font-semibold uppercase tracking-wider block">
                Evaluation Complete
              </span>
              <h2 className="text-xl font-bold mt-0.5">
                Matched Schemes for Your Profile
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Age: {profile.age} · Category: {profile.category} · Income: ₹{profile.annualIncome.toLocaleString('en-IN')} · Occupation: {profile.occupation}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="space-y-4">
            {results.map((item) => (
              <div
                key={item.scheme.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition-shadow space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-teal-800">{item.scheme.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.scheme.department}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.scheme.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {item.scheme.shortDescription}
                    </p>
                  </div>

                  {/* Match Score Badge */}
                  <div className="shrink-0 text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Eligible'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : item.status === 'Likely Eligible'
                          ? 'bg-teal-50 text-teal-900 border border-teal-300'
                          : 'bg-amber-50 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {item.matchScore}% Match · {item.status}
                    </span>
                  </div>
                </div>

                {/* Reasons Qualified */}
                {item.reasons.length > 0 && (
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs text-emerald-950 space-y-1">
                    <span className="font-bold flex items-center gap-1 text-emerald-900">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Why You Qualify:</span>
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-1">
                      {item.reasons.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Unmet conditions */}
                {item.unmetOrMissingCriteria.length > 0 && (
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs text-amber-950 space-y-1">
                    <span className="font-bold flex items-center gap-1 text-amber-900">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Criteria to Verify:</span>
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-1">
                      {item.unmetOrMissingCriteria.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="text-slate-500">
                    Benefit: <span className="font-bold text-slate-900">{item.scheme.benefits.financialAmount || 'Public Welfare'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onAskAboutScheme(item.scheme.id)}
                      className="font-bold text-slate-700 hover:text-slate-950"
                    >
                      Ask AI
                    </button>
                    <button
                      onClick={() => onViewScheme(item.scheme.id)}
                      className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg flex items-center gap-1"
                    >
                      <span>View Checklist & Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
