import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomeView } from './views/HomeView.tsx';
import { SchemesView } from './views/SchemesView.tsx';
import { ChatView } from './views/ChatView.tsx';
import { DocumentDoctorView } from './views/DocumentDoctorView.tsx';
import { EligibilityView } from './views/EligibilityView.tsx';
import { RightsView } from './views/RightsView.tsx';
import { LoginView } from './views/LoginView.tsx';
import { ProfileSetupView } from './views/ProfileSetupView.tsx';
import { SchemeDetailModal } from './components/SchemeDetailModal.tsx';
import { SCHEMES } from './data/schemesData.ts';
import { Scheme, UserProfile } from './types/index.ts';
import { LanguageCode } from './i18n/translations.ts';

const STORAGE_KEY = 'adhikarai_user_profile';
const LANG_STORAGE_KEY = 'adhikarai_language';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [schemeContextId, setSchemeContextId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalScheme, setModalScheme] = useState<Scheme | null>(null);

  // Selected Language (Kannada default for demonstration of multilingual requirement, persisted)
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved && ['kn', 'hi', 'ta', 'te', 'bn', 'en'].includes(saved)) {
        return saved as LanguageCode;
      }
    } catch {
      // ignore
    }
    return 'kn';
  });

  const handleSelectLang = (lang: LanguageCode) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
  };

  // User Authentication & Profile State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Temporary credentials held between Login step and Profile Setup step
  const [pendingCredentials, setPendingCredentials] = useState<{ name: string; email: string }>({
    name: '',
    email: '',
  });

  const handleNavigate = (tab: string, query?: string) => {
    setActiveTab(tab);
    if (query !== undefined) {
      setSearchQuery(query);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync user profile from SQLite backend on initial mount if available
  useEffect(() => {
    if (currentUser?.email) {
      fetch(`/api/profile?email=${encodeURIComponent(currentUser.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.success && data?.profile) {
            setCurrentUser(data.profile);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(data.profile));
            } catch {}
          }
        })
        .catch(() => {});
    }
  }, []);

  // Step 1 Complete: User logged in/registered with Name, Email, Password
  // Now navigate to Step 2: Profile Setup (or Dedicated Home if profile exists in SQLite)
  const handleLoginSuccess = (name: string, email: string, existingProfile?: UserProfile | null) => {
    setPendingCredentials({ name, email });
    if (existingProfile && existingProfile.hasCompletedProfile) {
      setCurrentUser(existingProfile);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existingProfile));
      } catch (e) {
        console.warn('Could not save to localStorage', e);
      }
      setActiveTab('home');
    } else {
      setActiveTab('profile-setup');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 Complete: User filled age, income, state, caste, gender, occupation
  // Now save profile and open Dedicated Home Page
  const handleProfileComplete = (profile: UserProfile) => {
    setCurrentUser(profile);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogOut = () => {
    if (confirm('Are you sure you want to sign out? Your saved profile will be reset.')) {
      setCurrentUser(null);
      localStorage.removeItem(STORAGE_KEY);
      setActiveTab('home');
    }
  };

  const handleAskAboutScheme = (schemeId: string) => {
    setSchemeContextId(schemeId);
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewScheme = (schemeId: string) => {
    const s = SCHEMES.find((item) => item.id === schemeId);
    if (s) {
      setModalScheme(s);
    } else {
      setActiveTab('schemes');
    }
  };

  const handleAskAIWithCustomQuery = (query: string) => {
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Text scaling class for accessibility
  const textSizeClass =
    textSize === 'large'
      ? 'text-[1.075rem] leading-relaxed'
      : textSize === 'xlarge'
      ? 'text-[1.175rem] leading-loose'
      : 'text-[0.95rem]';

  return (
    <div className={`min-h-screen flex flex-col bg-stone-50/50 text-slate-800 ${textSizeClass}`}>
      {/* Top Accessible Civic Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        textSize={textSize}
        setTextSize={setTextSize}
        currentUser={currentUser}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        onOpenLogin={() => handleNavigate('login')}
        onOpenProfile={() => {
          if (currentUser) {
            setPendingCredentials({ name: currentUser.name, email: currentUser.email });
          }
          handleNavigate('profile-setup');
        }}
        onLogOut={handleLogOut}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
        {/* Step 1: Login / Registration Page */}
        {activeTab === 'login' && (
          <LoginView
            onLoginSuccess={handleLoginSuccess}
            onSkipToGuest={() => handleNavigate('home')}
          />
        )}

        {/* Step 2: Profile Setup Page (Age, Income, State, Caste, Gender, Occupation) */}
        {activeTab === 'profile-setup' && (
          <ProfileSetupView
            userInitial={pendingCredentials.name ? pendingCredentials : {
              name: currentUser?.name || 'Citizen',
              email: currentUser?.email || 'citizen@adhikar.ai'
            }}
            existingProfile={currentUser}
            onProfileComplete={handleProfileComplete}
          />
        )}

        {/* Step 3: Dedicated Home Page based on Citizen Profile */}
        {activeTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            currentUser={currentUser}
            currentLang={currentLang}
            onEditProfile={() => {
              if (currentUser) {
                setPendingCredentials({ name: currentUser.name, email: currentUser.email });
              }
              handleNavigate('profile-setup');
            }}
            onAskAboutScheme={handleAskAboutScheme}
            onViewScheme={handleViewScheme}
          />
        )}

        {activeTab === 'schemes' && (
          <SchemesView
            initialSearchQuery={searchQuery}
            currentLang={currentLang}
            onAskAboutScheme={handleAskAboutScheme}
          />
        )}

        {activeTab === 'chat' && (
          <ChatView
            schemeContextId={schemeContextId}
            currentLang={currentLang}
            onClearSchemeContext={() => setSchemeContextId(null)}
            onViewScheme={handleViewScheme}
          />
        )}

        {activeTab === 'document-doctor' && (
          <DocumentDoctorView onViewScheme={handleViewScheme} />
        )}

        {activeTab === 'eligibility' && (
          <EligibilityView
            onViewScheme={handleViewScheme}
            onAskAboutScheme={handleAskAboutScheme}
          />
        )}

        {activeTab === 'rights' && (
          <RightsView onAskAI={handleAskAIWithCustomQuery} />
        )}
      </main>

      {/* Global Scheme Modal */}
      {modalScheme && (
        <SchemeDetailModal
          scheme={modalScheme}
          currentLang={currentLang}
          onClose={() => setModalScheme(null)}
          onAskAboutScheme={(id) => {
            setModalScheme(null);
            handleAskAboutScheme(id);
          }}
        />
      )}

      {/* Standard Civic Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
