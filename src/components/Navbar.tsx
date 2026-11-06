import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  MessageSquare, 
  FileCheck2, 
  Scale, 
  UserCheck, 
  Menu, 
  X, 
  ExternalLink, 
  Type, 
  User, 
  LogOut, 
  Edit3,
  Globe,
  Radio
} from 'lucide-react';
import { UserProfile } from '../types/index.ts';
import { LanguageCode, TRANSLATIONS, SUPPORTED_LANGUAGES } from '../i18n/translations.ts';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  textSize: 'normal' | 'large' | 'xlarge';
  setTextSize: (size: 'normal' | 'large' | 'xlarge') => void;
  currentUser?: UserProfile | null;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onOpenLogin?: () => void;
  onOpenProfile?: () => void;
  onLogOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  textSize,
  setTextSize,
  currentUser,
  currentLang,
  onSelectLang,
  onOpenLogin,
  onOpenProfile,
  onLogOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.kn;

  const navItems = [
    { id: 'home', label: t.navHome, icon: Building2 },
    { id: 'schemes', label: t.navSchemes, icon: Search },
    { id: 'chat', label: t.navChat, icon: MessageSquare },
    { id: 'document-doctor', label: t.navDocDoctor, icon: FileCheck2 },
    { id: 'eligibility', label: t.navEligibility, icon: UserCheck },
    { id: 'rights', label: t.navRights, icon: Scale },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Top Civic Notice Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium text-slate-200">{t.navPortalTag}</span>
            <span className="hidden md:inline text-slate-400">· {t.navCivicTag}</span>
          </div>
          
          <div className="flex items-center gap-3 text-xs">
            {/* Language Selector Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
                title="Select language"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                    {l.nativeLabel} ({l.label})
                  </option>
                ))}
              </select>
            </div>

            {/* Text Scaler */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">
              <Type className="w-3.5 h-3.5 text-slate-400" />
              <button
                onClick={() => setTextSize('normal')}
                className={`px-1 rounded font-medium ${textSize === 'normal' ? 'bg-teal-600 text-white' : 'hover:text-white'}`}
                title="Normal text"
              >
                A
              </button>
              <button
                onClick={() => setTextSize('large')}
                className={`px-1 rounded font-semibold text-xs ${textSize === 'large' ? 'bg-teal-600 text-white' : 'hover:text-white'}`}
                title="Large text"
              >
                A+
              </button>
              <button
                onClick={() => setTextSize('xlarge')}
                className={`px-1 rounded font-bold text-sm ${textSize === 'xlarge' ? 'bg-teal-600 text-white' : 'hover:text-white'}`}
                title="Extra large text"
              >
                A++
              </button>
            </div>

            <a 
              href="https://india.gov.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden lg:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <span>india.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-teal-800 flex items-center justify-center text-white shadow-sm border border-slate-700">
              <Scale className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  Adhikar<span className="text-teal-700">AI</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded border border-teal-200">
                  {currentLang.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal leading-none hidden sm:block">
                {t.heroHeadlineHighlight}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                    isActive
                      ? 'bg-slate-100 text-slate-950 font-bold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile / Login Button & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            {currentUser ? (
              /* Logged In User Dropdown */
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-white text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
                  title="Your Citizen Profile"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {currentUser.name.charAt(0) || 'U'}
                  </div>
                  <span className="max-w-[90px] truncate hidden sm:inline">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs animate-in fade-in duration-150">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <span className="font-bold text-slate-900 block truncate">{currentUser.name}</span>
                      <span className="text-[11px] text-slate-500 truncate block">{currentUser.email}</span>
                      {currentUser.hasCompletedProfile && (
                        <div className="mt-1 text-[10px] text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 inline-block font-semibold">
                          {currentUser.caste} · {currentUser.occupation}
                        </div>
                      )}
                    </div>
                    <div className="py-1 space-y-0.5">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onOpenProfile) onOpenProfile();
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-teal-700" />
                        <span>{t.editProfile}</span>
                      </button>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleNavClick('home');
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium"
                      >
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.navHome}</span>
                      </button>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onLogOut) onLogOut();
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-700 font-medium flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t.navSignOut}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Sign In / Register Button */
              <button
                onClick={() => {
                  if (onOpenLogin) onOpenLogin();
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-2xs"
              >
                <User className="w-3.5 h-3.5 text-teal-300" />
                <span>{t.navLogin}</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {/* Mobile Language Switcher */}
          <div className="p-3 mb-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-teal-700" />
              <span>ಭಾಷೆ / Language:</span>
            </span>
            <select
              value={currentLang}
              onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
              className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeLabel}
                </option>
              ))}
            </select>
          </div>

          {currentUser && (
            <div className="p-3 mb-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 block">{currentUser.name}</span>
                <span className="text-[11px] text-slate-500">{currentUser.occupation} in {currentUser.state}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenProfile) onOpenProfile();
                }}
                className="text-teal-700 font-semibold"
              >
                {t.editProfile}
              </button>
            </div>
          )}

          <div className="py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider px-3">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-900 font-semibold border-l-4 border-teal-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {!currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenLogin) onOpenLogin();
                }}
                className="w-full py-2.5 px-3 bg-teal-700 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>{t.navLogin}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onLogOut) onLogOut();
                }}
                className="w-full py-2 px-3 bg-slate-100 text-rose-700 font-semibold rounded-lg text-xs flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>{t.navSignOut}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
