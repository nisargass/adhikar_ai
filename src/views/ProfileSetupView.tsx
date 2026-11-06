import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Database,
  Loader2
} from 'lucide-react';
import { UserProfile } from '../types/index.ts';

interface ProfileSetupViewProps {
  userInitial: { name: string; email: string };
  existingProfile?: UserProfile | null;
  onProfileComplete: (profile: UserProfile) => void;
}

export const ProfileSetupView: React.FC<ProfileSetupViewProps> = ({
  userInitial,
  existingProfile,
  onProfileComplete,
}) => {
  const [age, setAge] = useState<number>(existingProfile?.age ?? 24);
  const [annualIncome, setAnnualIncome] = useState<number>(existingProfile?.annualIncome ?? 180000);
  const [state, setState] = useState<string>(existingProfile?.state ?? 'Uttar Pradesh');
  const [caste, setCaste] = useState<'General' | 'OBC' | 'SC' | 'ST' | 'EWS'>(existingProfile?.caste ?? 'OBC');
  const [gender, setGender] = useState<'Female' | 'Male' | 'Other'>(existingProfile?.gender ?? 'Female');
  const [occupation, setOccupation] = useState<string>(existingProfile?.occupation ?? 'Student');
  const [ownsLand, setOwnsLand] = useState<boolean>(existingProfile?.ownsLand ?? false);
  const [landAcres, setLandAcres] = useState<number>(existingProfile?.landAcres ?? 0);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [sqliteSuccess, setSqliteSuccess] = useState<boolean>(false);

  const indianStatesAndUTs = [
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 
    'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 
    'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 
    'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const occupationOptions = [
    { label: 'Student (School / College / Polytechnic)', value: 'Student' },
    { label: 'Farmer / Cultivable Landholder', value: 'Farmer' },
    { label: 'Traditional Artisan / Craftsperson (Vishwakarma)', value: 'Artisan / Craftsperson' },
    { label: 'Street Vendor / Hawker / Small Shopkeeper', value: 'Street Vendor / Retailer' },
    { label: 'Unorganized Worker / Daily Wage Earner / Laborer', value: 'Unorganized Worker' },
    { label: 'Self-Employed / Micro-Entrepreneur', value: 'Micro-Entrepreneur' },
    { label: 'Salaried Employee / Private Service', value: 'Salaried Employee' },
    { label: 'Homemaker / Looking for Work', value: 'Homemaker' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!age || age < 1 || age > 110) {
      setError('Please provide a valid age between 1 and 110.');
      return;
    }

    const updatedProfile: UserProfile = {
      name: userInitial.name,
      email: userInitial.email,
      age: Number(age),
      annualIncome: Number(annualIncome),
      state,
      caste,
      gender,
      occupation,
      ownsLand: occupation.toLowerCase().includes('farmer') ? ownsLand : false,
      landAcres: ownsLand ? Number(landAcres) : 0,
      isStudent: occupation.toLowerCase().includes('student'),
      hasCompletedProfile: true,
    };

    setIsSubmitting(true);
    setError(null);

    try {
      // Push citizen profile setup details to SQLite database
      const response = await fetch('/api/profile/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to save profile to SQLite');
      }

      setSqliteSuccess(true);

      setTimeout(() => {
        onProfileComplete(result.data || updatedProfile);
      }, 400);
    } catch (err: any) {
      console.warn('API error saving profile to SQLite, using local fallback:', err);
      onProfileComplete(updatedProfile);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-10 space-y-6">
      {/* Step Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Step 2 of 2: Citizen Eligibility Profile</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Personalize Your Scheme Access
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Welcome, <span className="font-semibold text-slate-900">{userInitial.name}</span>! Provide your demographic and livelihood parameters below. We match you directly with government schemes tailored specifically for you.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Main Profile Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Age */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
              1. Age (Years) <span className="text-rose-600">*</span>
            </label>
            <input
              type="number"
              min="1"
              max="110"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
              required
            />
            <span className="text-[11px] text-slate-400 mt-1 block">e.g. 18 for scholarships, 60+ for pensions</span>
          </div>

          {/* Gender */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
              2. Gender <span className="text-rose-600">*</span>
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
            >
              <option value="Female">Female (महिला)</option>
              <option value="Male">Male (पुरुष)</option>
              <option value="Other">Other (अन्य)</option>
            </select>
            <span className="text-[11px] text-slate-400 mt-1 block">Enables women-exclusive programs</span>
          </div>

          {/* Caste / Social Category */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
              3. Caste / Category <span className="text-rose-600">*</span>
            </label>
            <select
              value={caste}
              onChange={(e) => setCaste(e.target.value as any)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
            >
              <option value="General">General / Unreserved</option>
              <option value="OBC">OBC (Other Backward Class)</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="EWS">EWS (Economically Weaker Section)</option>
            </select>
            <span className="text-[11px] text-slate-400 mt-1 block">Matches reservation & fee waivers</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* State */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
              4. State / Union Territory <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
              >
                {indianStatesAndUTs.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Filters state-specific welfare initiatives</span>
          </div>

          {/* Occupation */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
              5. Occupation / Livelihood <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={occupation}
                onChange={(e) => {
                  const val = e.target.value;
                  setOccupation(val);
                  if (val === 'Farmer') {
                    setOwnsLand(true);
                    if (landAcres === 0) setLandAcres(1.5);
                  }
                }}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
              >
                {occupationOptions.map((occ) => (
                  <option key={occ.value} value={occ.value}>{occ.label}</option>
                ))}
              </select>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Determines sector subsidies and grants</span>
          </div>
        </div>

        {/* Farmer Land details if farmer */}
        {occupation === 'Farmer' && (
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                Agricultural Land Details (PM-KISAN Requirement)
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-emerald-900">
                <input
                  type="checkbox"
                  checked={ownsLand}
                  onChange={(e) => setOwnsLand(e.target.checked)}
                  className="rounded text-teal-700"
                />
                <span>Owns Cultivable Land in Own Name</span>
              </label>
            </div>
            {ownsLand && (
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-700">Total Cultivable Land:</span>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="50"
                  value={landAcres}
                  onChange={(e) => setLandAcres(parseFloat(e.target.value) || 0)}
                  className="w-24 px-2.5 py-1.5 bg-white border border-emerald-300 rounded-lg text-slate-900 font-bold"
                />
                <span className="text-slate-600">Acres (Small/Marginal farmer under 5 acres)</span>
              </div>
            )}
          </div>
        )}

        {/* Income */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              6. Annual Household Income (INR) <span className="text-rose-600">*</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Declared Income:</span>
              <span className="text-base font-mono font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200">
                ₹{annualIncome.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <input
            type="range"
            min="20000"
            max="1200000"
            step="10000"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(parseInt(e.target.value, 10))}
            className="w-full accent-teal-700 cursor-pointer"
          />

          {/* Quick Bracket Buttons */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-slate-400 self-center mr-1">Quick Select:</span>
            {[
              { label: 'BPL (< ₹50k)', val: 48000 },
              { label: 'Low Income (₹1.5 Lakh)', val: 150000 },
              { label: 'EWS Ceiling (₹2.5 Lakh)', val: 250000 },
              { label: 'Middle (₹5 Lakh)', val: 500000 },
            ].map((b) => (
              <button
                key={b.val}
                type="button"
                onClick={() => setAnnualIncome(b.val)}
                className={`px-2.5 py-1 rounded-md border transition-colors ${
                  annualIncome === b.val
                    ? 'bg-teal-700 text-white font-semibold border-teal-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Final Submit Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Database className="w-4 h-4 text-teal-600 shrink-0" />
            <span>
              Persisting to SQLite database (<code className="font-mono text-slate-700">adhikarai.sqlite</code>) & printing to terminal
            </span>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-60 text-white font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Writing to SQLite...</span>
              </>
            ) : sqliteSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Saved to SQLite! Opening Home...</span>
              </>
            ) : (
              <>
                <span>Save Profile & Open Home Page</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
