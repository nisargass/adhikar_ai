import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ExternalLink, 
  FileText, 
  MessageSquare, 
  AlertCircle,
  Building,
  X,
  Volume2
} from 'lucide-react';
import { Scheme, SchemeCategory } from '../types/index.ts';
import { SCHEMES } from '../data/schemesData.ts';
import { SchemeDetailModal } from '../components/SchemeDetailModal.tsx';
import { LanguageCode, TRANSLATIONS, LOCALIZED_SCHEMES } from '../i18n/translations.ts';
import { SpeakButton } from '../components/SpeakButton.tsx';

interface SchemesViewProps {
  initialSearchQuery?: string;
  currentLang: LanguageCode;
  onAskAboutScheme: (schemeId: string) => void;
}

export const SchemesView: React.FC<SchemesViewProps> = ({
  initialSearchQuery = '',
  currentLang,
  onAskAboutScheme,
}) => {
  const [schemes, setSchemes] = useState<Scheme[]>(SCHEMES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<string>('All');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.kn;
  const localizedMap = LOCALIZED_SCHEMES[currentLang] || LOCALIZED_SCHEMES.kn;

  const categories: { key: SchemeCategory | 'All'; label: string }[] = [
    { key: 'All', label: t.catAll },
    { key: 'Healthcare', label: t.catHealthcare },
    { key: 'Agriculture & Farmers', label: t.catAgriculture },
    { key: 'Housing & Urban', label: t.catHousing },
    { key: 'Women & Child Development', label: t.catWomenChild },
    { key: 'Education & Scholarships', label: t.catEducation },
    { key: 'Employment & Entrepreneurship', label: t.catEmployment },
    { key: 'Social Security & Pensions', label: t.catSocialSecurity },
  ];

  const beneficiaries = [
    'All',
    'Farmers',
    'Students',
    'Women',
    'Low-income households',
    'Artisans',
    'Street vendors',
    'Senior citizens',
  ];

  // Fetch schemes from actual backend API endpoint
  const fetchSchemes = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (selectedBeneficiary !== 'All') params.append('beneficiary', selectedBeneficiary);

      const res = await fetch(`/api/schemes?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Server returned status: ${res.status}`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setSchemes(data.data);
      } else {
        filterClientSide();
      }
    } catch (err: any) {
      console.warn('API error fetching schemes, falling back to local dataset:', err);
      filterClientSide();
    } finally {
      setLoading(false);
    }
  };

  const filterClientSide = () => {
    let list = [...SCHEMES];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter((s) => {
        const loc = localizedMap[s.id];
        return (
          s.name.toLowerCase().includes(q) ||
          (loc && loc.name.toLowerCase().includes(q)) ||
          (loc && loc.shortDescription.toLowerCase().includes(q)) ||
          (s.hindiName && s.hindiName.toLowerCase().includes(q)) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.targetBeneficiaries.some((b) => b.toLowerCase().includes(q))
        );
      });
    }
    if (selectedCategory !== 'All') {
      list = list.filter((s) => s.category === selectedCategory);
    }
    if (selectedBeneficiary !== 'All') {
      const bLower = selectedBeneficiary.toLowerCase();
      list = list.filter((s) =>
        s.targetBeneficiaries.some((tb) => tb.toLowerCase().includes(bLower))
      );
    }
    setSchemes(list);
  };

  useEffect(() => {
    fetchSchemes();
  }, [selectedCategory, selectedBeneficiary]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSchemes();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedBeneficiary('All');
    setSchemes(SCHEMES);
  };

  return (
    <div className="space-y-8 py-4 sm:py-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
              <span>{t.navPortalTag}</span>
              <span>·</span>
              <span>{t.navSchemes}</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {currentLang === 'kn' ? 'ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳ ಕೋಶ' : currentLang === 'hi' ? 'सरकारी कल्याणकारी योजनाएं' : currentLang === 'ta' ? 'அரசு நலத்திட்டங்கள்' : currentLang === 'te' ? 'ప్రభుత్వ సంక్షేమ పథకాలు' : currentLang === 'bn' ? 'সরকারি কল্যাণ প্রকল্পসমূহ' : 'Government Schemes Directory'}
              </h1>
              <SpeakButton
                text={`${currentLang === 'kn' ? 'ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳ ಕೋಶ' : 'Government Schemes Directory'}. ${t.featSchemesDesc}`}
                lang={currentLang}
                size="md"
              />
            </div>
            <p className="text-slate-600 text-sm mt-1">
              {t.featSchemesDesc}
            </p>
          </div>
          <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0 self-start md:self-auto font-medium">
            {schemes.length} {currentLang === 'kn' ? 'ಖಚಿತಪಡಿಸಿದ ಯೋಜನೆಗಳು' : currentLang === 'hi' ? 'सत्यापित योजनाएं' : currentLang === 'ta' ? 'உறுதிப்படுத்தப்பட்ட திட்டங்கள்' : currentLang === 'te' ? 'ధృవీకరించబడిన పథకాలు' : currentLang === 'bn' ? 'যাচাইকৃত প্রকল্প' : 'verified schemes'}
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    fetchSchemes();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-2xs shrink-0"
            >
              {t.btnFindSchemes}
            </button>
          </form>

          {/* Category Tabs */}
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-2">{t.category}</div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    selectedCategory === cat.key
                      ? 'bg-teal-700 text-white font-semibold shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Beneficiary Filter */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="font-semibold text-slate-500">{t.filterByBeneficiary}</span>
            {beneficiaries.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBeneficiary(b)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedBeneficiary === b
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {b}
              </button>
            ))}
            {(searchTerm || selectedCategory !== 'All' || selectedBeneficiary !== 'All') && (
              <button
                onClick={clearFilters}
                className="text-teal-700 hover:underline font-semibold ml-2"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scheme Listing Grid */}
      {loading ? (
        <div className="text-center py-16 space-y-3">
          <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Loading...</p>
        </div>
      ) : schemes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto space-y-4">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-slate-900">No matching schemes found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query, or clear filters to see all available national schemes.
            </p>
          </div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => {
            const localized = localizedMap[scheme.id];
            const title = localized?.name || scheme.name;
            const shortDesc = localized?.shortDescription || scheme.shortDescription;
            const benefit = localized?.benefitHighlight || scheme.benefits.financialAmount || scheme.benefits.summary;

            return (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3">
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-teal-800">{scheme.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{scheme.level}</span>
                    </div>
                    {/* Audio read button on each card */}
                    <SpeakButton
                      text={`${title}. ${shortDesc}. ${benefit}.`}
                      lang={currentLang}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                      {title}
                    </h3>
                    {currentLang === 'en' && scheme.hindiName && (
                      <p className="text-xs text-slate-500 font-medium">{scheme.hindiName}</p>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="line-clamp-1">{scheme.department}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {shortDesc}
                  </p>

                  {/* Key Benefit Highlight Box */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">
                      {t.benefits}
                    </span>
                    <span className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5">
                      {benefit}
                    </span>
                  </div>

                  {/* Beneficiary tags */}
                  <div className="text-xs text-slate-500 pt-1">
                    <span className="font-medium text-slate-700">{t.filterByBeneficiary} </span>
                    <span>{scheme.targetBeneficiaries.slice(0, 2).join(', ')}</span>
                    {scheme.targetBeneficiaries.length > 2 && (
                      <span> +{scheme.targetBeneficiaries.length - 2} more</span>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedScheme(scheme)}
                    className="flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800 p-1 rounded"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t.viewDetails}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onAskAboutScheme(scheme.id)}
                      className="p-2 text-slate-600 hover:text-teal-700 hover:bg-white rounded-lg border border-slate-200 transition-colors"
                      title={t.askAI}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-600 hover:text-teal-700 hover:bg-white rounded-lg border border-slate-200 transition-colors"
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
      )}

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <SchemeDetailModal
          scheme={selectedScheme}
          currentLang={currentLang}
          onClose={() => setSelectedScheme(null)}
          onAskAboutScheme={(id) => {
            setSelectedScheme(null);
            onAskAboutScheme(id);
          }}
        />
      )}
    </div>
  );
};
