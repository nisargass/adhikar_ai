export type LanguageCode = 'en' | 'hi' | 'kn' | 'ta' | 'te' | 'bn';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  speechLocale: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', speechLocale: 'kn-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', speechLocale: 'hi-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', speechLocale: 'ta-IN' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', speechLocale: 'te-IN' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা', speechLocale: 'bn-IN' },
  { code: 'en', label: 'English', nativeLabel: 'English', speechLocale: 'en-IN' },
];

export interface TranslationStrings {
  // Navigation
  navHome: string;
  navSchemes: string;
  navChat: string;
  navDocDoctor: string;
  navEligibility: string;
  navRights: string;
  navLogin: string;
  navProfile: string;
  navSignOut: string;
  navPortalTag: string;
  navCivicTag: string;
  voiceAssistant: string;
  readAloud: string;
  stopVoice: string;
  listening: string;
  speakNow: string;

  // Home Hero
  heroTag: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  btnFindSchemes: string;
  btnExploreSchemes: string;
  btnAskAssistant: string;
  popularSearches: string;

  // Citizen Journey
  journeyTitle: string;
  journeyHeading: string;
  journeySubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Features
  featHeading: string;
  featDesc: string;
  featSchemesTitle: string;
  featSchemesDesc: string;
  featDocDoctorTitle: string;
  featDocDoctorDesc: string;
  featAssistantTitle: string;
  featAssistantDesc: string;

  // Dedicated Home
  welcomeCitizen: string;
  tailoredView: string;
  dedicatedSchemesTitle: string;
  dedicatedSchemesSubtitle: string;
  editProfile: string;
  checkAllSchemes: string;
  annualIncome: string;

  // Categories
  catHealthcare: string;
  catAgriculture: string;
  catHousing: string;
  catWomenChild: string;
  catEducation: string;
  catEmployment: string;
  catSocialSecurity: string;
  catAll: string;

  // Common UI
  viewDetails: string;
  askAI: string;
  officialPortal: string;
  mandatory: string;
  requiredDocuments: string;
  eligibilityCriteria: string;
  benefits: string;
  howToApply: string;
  close: string;
  filterByBeneficiary: string;
  category: string;
  send: string;
  chatPlaceholder: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationStrings> = {
  kn: {
    navHome: 'ಮುಖಪುಟ',
    navSchemes: 'ಯೋಜನೆಗಳು',
    navChat: 'AI ಸಹಾಯಕ',
    navDocDoctor: 'ದಾಖಲೆ ಪರಿಶೀಲನೆ',
    navEligibility: 'ಅರ್ಹತಾ ಪರೀಕ್ಷೆ',
    navRights: 'ನಾಗರಿಕ ಹಕ್ಕುಗಳು',
    navLogin: 'ಲಾಗಿನ್ / ನೋಂದಣಿ',
    navProfile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
    navSignOut: 'ಲಾಗ್‌ಔಟ್',
    navPortalTag: 'ಅಧಿಕಾರ್ AI ಸಾರ್ವಜನಿಕ ಸೇವಾ ಪೋರ್ಟಲ್',
    navCivicTag: 'ನಾಗರಿಕ AI',
    voiceAssistant: 'ಧ್ವನಿ ಸಹಾಯಕ',
    readAloud: 'ಓದಿ ಕೇಳಿ',
    stopVoice: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    listening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ... ಮಾತನಾಡಿ',
    speakNow: 'ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ',

    heroTag: 'ಸ್ವತಂತ್ರ ನಾಗರಿಕ ಸೇವಾ ತಂತ್ರಜ್ಞಾನ',
    heroHeadline: 'ನಿಮ್ಮ ಹಕ್ಕುಗಳು. ನಿಮ್ಮ ಸೌಲಭ್ಯಗಳು.',
    heroHeadlineHighlight: 'ಸರಳವಾಗಿ ಅರ್ಥವಾಗುವಂತೆ.',
    heroSubtitle: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ, ಅರ್ಹತೆಗಳನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ, ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ ಮತ್ತು AI ಸಹಾಯದಿಂದ ಸ್ಪಷ್ಟ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.',
    searchPlaceholder: 'ಯೋಜನೆ ಹೆಸರು, ರೈತ, ವಿದ್ಯಾರ್ಥಿ, ಆಸ್ಪತ್ರೆ, ವಸತಿ ಯೋಜನೆ ಹುಡುಕಿ...',
    btnFindSchemes: 'ಯೋಜನೆ ಹುಡುಕಿ',
    btnExploreSchemes: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    btnAskAssistant: 'ಅಧಿಕಾರ್ AI ಕೇಳಿ',
    popularSearches: 'ಜನಪ್ರಿಯ ಹುಡುಕಾಟಗಳು:',

    journeyTitle: 'ನಾಗರಿಕ ಪ್ರಯಾಣ',
    journeyHeading: 'ಗೊಂದಲದಿಂದ ಸೌಲಭ್ಯ ಪಡೆಯುವವರೆಗೆ 4 ಹಂತಗಳು',
    journeySubtitle: 'ನಿಮ್ಮ ಸಾರ್ವಜನಿಕ ಹಕ್ಕುಗಳು ಮತ್ತು ಸೌಲಭ್ಯಗಳನ್ನು ಸುಲಭವಾಗಿ ಪಡೆಯಲು ಮಾರ್ಗದರ್ಶನ.',
    step1Title: '01. ಅನ್ವೇಷಿಸಿ',
    step1Desc: 'ನಿಮ್ಮ ಕುಟುಂಬ, ಉದ್ಯೋಗ, ಮತ್ತು ವರ್ಗಕ್ಕೆ ಸೂಕ್ತವಾದ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ.',
    step2Title: '02. ಅರ್ಹತೆ ತಿಳಿಯಿರಿ',
    step2Desc: 'ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಆದಾಯ ಮಿತಿ, ವಯಸ್ಸು ಮತ್ತು ಅರ್ಹತಾ ಷರತ್ತುಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
    step3Title: '03. ದಾಖಲೆ ಸಿದ್ಧತೆ',
    step3Desc: 'ಡಾಕ್ಯುಮೆಂಟ್ ಡಾಕ್ಟರ್ ಬಳಸಿ ಆದಾಯ, ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಖತೌನಿ ದೋಷಗಳನ್ನು ಸರಿಪಡಿಸಿ.',
    step4Title: '04. ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    step4Desc: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಅಥವಾ ಹತ್ತಿರದ ಗ್ರಾಮ ಒನ್ / ಸಿಎಸ್‌ಸಿ ಕೇಂದ್ರದಲ್ಲಿ ಯಾವುದೇ ದಲ್ಲಾಳಿ ಇಲ್ಲದೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',

    featHeading: 'ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ',
    featDesc: 'ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ನೀತಿಗಳ ಮೇಲೆ ಆಧಾರಿತವಾಗಿವೆ.',
    featSchemesTitle: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಕೈಪಿಡಿ',
    featSchemesDesc: 'ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಸರ್ಕಾರಗಳ ಪ್ರಮುಖ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳ ಅಧಿಕೃತ ಮಾಹಿತಿ ಮತ್ತು ಪೋರ್ಟಲ್ ಲಿಂಕ್‌ಗಳು.',
    featDocDoctorTitle: 'ದಾಖಲೆ ಪರೀಕ್ಷಕ (ಡಾಕ್ಯುಮೆಂಟ್ ಡಾಕ್ಟರ್)',
    featDocDoctorDesc: 'ಅರ್ಜಿ ತಿರಸ್ಕಾರವಾಗುವುದನ್ನು ತಪ್ಪಿಸಲು ಪ್ರಮಾಣಪತ್ರಗಳ ಮುಕ್ತಾಯ ದಿನಾಂಕ ಮತ್ತು ಹೆಸರಿನ ಕಾಗುಣಿತ ಪರಿಶೀಲಿಸಿ.',
    featAssistantTitle: 'ಕನ್ನಡ AI ಹಕ್ಕುಗಳ ಸಹಾಯಕ',
    featAssistantDesc: 'ಯೋಜನೆಗಳ ಬಗ್ಗೆ, ನಿಯಮಗಳ ಬಗ್ಗೆ ಮತ್ತು ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನವನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ ಅಥವಾ ಕೇಳಿ ತಿಳಿಯಿರಿ.',

    welcomeCitizen: 'ಸ್ವಾಗತ',
    tailoredView: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ಗೆ ಮೀಸಲಾದ ಯೋಜನೆಗಳು',
    dedicatedSchemesTitle: 'ನಿಮಗಾಗಿ ಮೀಸಲಾದ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    dedicatedSchemesSubtitle: 'ನಿಮ್ಮ ವಯಸ್ಸು, ಜಾತಿ ವರ್ಗ, ಉದ್ಯೋಗ ಮತ್ತು ಆದಾಯಕ್ಕೆ ಸಂಪೂರ್ಣವಾಗಿ ಹೊಂದಿಕೆಯಾಗುವ ಯೋಜನೆಗಳು.',
    editProfile: 'ಪ್ರೊಫೈಲ್ ಬದಲಾಯಿಸಿ',
    checkAllSchemes: 'ಎಲ್ಲಾ ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    annualIncome: 'ವಾರ್ಷಿಕ ಆದಾಯ',

    catHealthcare: 'ಆರೋಗ್ಯ ಸೇವೆ',
    catAgriculture: 'ಕೃಷಿ ಮತ್ತು ರೈತರು',
    catHousing: 'ವಸತಿ ಯೋಜನೆ',
    catWomenChild: 'ಮಹಿಳೆ ಮತ್ತು ಮಕ್ಕಳು',
    catEducation: 'ಶಿಕ್ಷಣ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ',
    catEmployment: 'ಉದ್ಯೋಗ ಮತ್ತು ಸಣ್ಣ ವ್ಯಾಪಾರ',
    catSocialSecurity: 'ಸಾಮಾಜಿಕ ಭದ್ರತೆ ಮತ್ತು ಪಿಂಚಣಿ',
    catAll: 'ಎಲ್ಲಾ ಯೋಜನೆಗಳು',

    viewDetails: 'ವಿವರ ಮತ್ತು ದಾಖಲೆ ಪರಿಶೀಲನೆ',
    askAI: 'AI ಸಹಾಯಕನನ್ನು ಕೇಳಿ',
    officialPortal: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್',
    mandatory: 'ಕಡ್ಡಾಯ',
    requiredDocuments: 'ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳ ಪಟ್ಟಿ',
    eligibilityCriteria: 'ಅರ್ಹತಾ ಷರತ್ತುಗಳು',
    benefits: 'ಸಿಗುವ ಸೌಲಭ್ಯಗಳು',
    howToApply: 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನ',
    close: 'ಮುಚ್ಚಿ',
    filterByBeneficiary: 'ಫಲಾನುಭವಿಗಳ ಪ್ರಕಾರ:',
    category: 'ವರ್ಗ:',
    send: 'ಕಳುಹಿಸಿ',
    chatPlaceholder: 'ಯೋಜನೆಯ ನಿಯಮಗಳು, ಬೇಕಾದ ದಾಖಲೆಗಳು ಅಥವಾ ಹಕ್ಕುಗಳ ಬಗ್ಗೆ ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ...',
  },
  hi: {
    navHome: 'होम',
    navSchemes: 'सरकारी योजनाएं',
    navChat: 'AI सहायक',
    navDocDoctor: 'दस्तावेज़ डॉक्टर',
    navEligibility: 'पात्रता जांच',
    navRights: 'नागरिक अधिकार',
    navLogin: 'लॉग इन / पंजीकरण',
    navProfile: 'मेरी प्रोफाइल',
    navSignOut: 'लॉग आउट',
    navPortalTag: 'अधिकारAI लोक सेवा पोर्टल',
    navCivicTag: 'नागरिक AI',
    voiceAssistant: 'आवाज़ सहायक',
    readAloud: 'बोलकर सुनाएं',
    stopVoice: 'आवाज़ रोकें',
    listening: 'सुन रहा है... बोलिए',
    speakNow: 'माइक दबाकर बोलें',

    heroTag: 'स्वतंत्र नागरिक सेवा तकनीक',
    heroHeadline: 'आपके अधिकार. आपकी योजनाएं.',
    heroHeadlineHighlight: 'सरल भाषा में समझें.',
    heroSubtitle: 'सरकारी योजनाओं को खोजें, पात्रता समझें, आवश्यक दस्तावेज़ तैयार करें और AI की मदद से स्पष्ट मार्गदर्शन प्राप्त करें।',
    searchPlaceholder: 'योजना का नाम, किसान, छात्र, अस्पताल, पेंशन खोजें...',
    btnFindSchemes: 'योजना खोजें',
    btnExploreSchemes: 'सरकारी योजनाएं देखें',
    btnAskAssistant: 'अधिकारAI से पूछें',
    popularSearches: 'लोकप्रिय खोजें:',

    journeyTitle: 'नागरिक यात्रा',
    journeyHeading: 'भ्रम से योजना का लाभ पाने तक 4 आसान कदम',
    journeySubtitle: 'सरकारी सुविधाओं और अधिकारों को पाने का सीधा रास्ता।',
    step1Title: '01. खोजें',
    step1Desc: 'अपने परिवार, व्यवसाय और वर्ग के अनुसार उपयुक्त योजनाएं खोजें।',
    step2Title: '02. पात्रता जानें',
    step2Desc: 'आय सीमा, आयु और शर्तों को सरल हिंदी में समझें।',
    step3Title: '03. दस्तावेज़ तैयार करें',
    step3Desc: 'डॉक्यूमेंट डॉक्टर से आय, जाति प्रमाण पत्र और खतौनी में गलतियां जांचें।',
    step4Title: '04. आवेदन करें',
    step4Desc: 'आधिकारिक पोर्टल या नजदीकी सीएससी केंद्र पर बिना बिचौलियों के आवेदन करें।',

    featHeading: 'आम नागरिकों के लिए निर्मित',
    featDesc: 'पूरी तरह से आधिकारिक सरकारी नियमों पर आधारित।',
    featSchemesTitle: 'सरकारी योजना निर्देशिका',
    featSchemesDesc: 'केंद्र और राज्य सरकार की प्रमुख योजनाओं की सत्यापित जानकारी।',
    featDocDoctorTitle: 'दस्तावेज़ डॉक्टर (दस्तावेज़ जांच)',
    featDocDoctorDesc: 'आवेदन खारिज होने से बचने के लिए प्रमाण पत्र की वैधता और नाम की स्पेलिंग जांचें।',
    featAssistantTitle: 'हिंदी AI सहायक',
    featAssistantDesc: 'योजनाओं, आरक्षण और अधिकारों के बारे में आसान हिंदी में सवाल पूछें।',

    welcomeCitizen: 'स्वागत है',
    tailoredView: 'आपकी प्रोफाइल के लिए समर्पित योजनाएं',
    dedicatedSchemesTitle: 'आपके लिए चुनिंदा सरकारी योजनाएं',
    dedicatedSchemesSubtitle: 'आपकी उम्र, जाति वर्ग, व्यवसाय और आय के अनुसार सर्वाधिक उपयुक्त योजनाएं।',
    editProfile: 'प्रोफाइल बदलें',
    checkAllSchemes: 'सभी योजनाएं देखें',
    annualIncome: 'वार्षिक आय',

    catHealthcare: 'स्वास्थ्य सेवा',
    catAgriculture: 'कृषि और किसान',
    catHousing: 'आवास योजना',
    catWomenChild: 'महिला एवं बाल विकास',
    catEducation: 'शिक्षा एवं छात्रवृत्ति',
    catEmployment: 'रोजगार एवं लघु उद्योग',
    catSocialSecurity: 'सामाजिक सुरक्षा एवं पेंशन',
    catAll: 'सभी योजनाएं',

    viewDetails: 'विवरण एवं चेकलिस्ट देखें',
    askAI: 'AI से पूछें',
    officialPortal: 'आधिकारिक पोर्टल',
    mandatory: 'अनिवार्य',
    requiredDocuments: 'आवश्यक दस्तावेज़ चेकलिस्ट',
    eligibilityCriteria: 'पात्रता की शर्तें',
    benefits: 'मिलने वाले लाभ',
    howToApply: 'आवेदन करने की प्रक्रिया',
    close: 'बंद करें',
    filterByBeneficiary: 'लाभार्थी अनुसार:',
    category: 'श्रेणी:',
    send: 'भेजें',
    chatPlaceholder: 'योजना के नियम, आवश्यक दस्तावेज़ या अपने अधिकारों के बारे में हिंदी में पूछें...',
  },
  ta: {
    navHome: 'முகப்பு',
    navSchemes: 'திட்டங்கள்',
    navChat: 'AI உதவியாளர்',
    navDocDoctor: 'சான்றிதழ் சரிபார்ப்பு',
    navEligibility: 'தகுதி சோதனை',
    navRights: 'குடிமக்கள் உரிமைகள்',
    navLogin: 'உள்நுழைவு / பதிவு',
    navProfile: 'என் சுயவிவரம்',
    navSignOut: 'வெளியேறு',
    navPortalTag: 'அதிகார் AI மக்கள் சேவை போர்ட்டல்',
    navCivicTag: 'குடிமக்கள் AI',
    voiceAssistant: 'குரல் உதவியாளர்',
    readAloud: 'கேட்கவும்',
    stopVoice: 'நிறுத்து',
    listening: 'கேட்கிறது... பேசுங்கள்',
    speakNow: 'பேச மைக் அழுத்தவும்',

    heroTag: 'சுயாதீன மக்கள் நல தொழில்நுட்பம்',
    heroHeadline: 'உங்கள் உரிமைகள். உங்கள் நலத்திட்டங்கள்.',
    heroHeadlineHighlight: 'எளிய தமிழில் புரிந்து கொள்ளுங்கள்.',
    heroSubtitle: 'அரசு திட்டங்களை கண்டறியுங்கள், தகுதிகளை புரிந்து கொள்ளுங்கள், சான்றிதழ்களை சரிபார்த்து AI வழிகாட்டுதலைப் பெறுங்கள்.',
    searchPlaceholder: 'திட்டத்தின் பெயர், விவசாயி, மாணவர், மருத்துவமனை தேடவும்...',
    btnFindSchemes: 'திட்டம் தேடு',
    btnExploreSchemes: 'அரசு திட்டங்கள்',
    btnAskAssistant: 'அதிகார் AI-யிடம் கேளுங்கள்',
    popularSearches: 'பிரபலமான தேடல்கள்:',

    journeyTitle: 'குடிமக்கள் பயணம்',
    journeyHeading: 'குழப்பம் நீங்கி நலத்திட்டம் பெற 4 எளிய படிகள்',
    journeySubtitle: 'உங்கள் பொது உரிமைகளையும் நலன்களையும் பெற தெளிவான வழிகாட்டி.',
    step1Title: '01. கண்டறிதல்',
    step1Desc: 'உங்கள் குடும்பம், தொழில் மற்றும் பிரிவுக்கு ஏற்ற திட்டங்களை தேடுங்கள்.',
    step2Title: '02. தகுதி அறிதல்',
    step2Desc: 'வருமான வரம்பு, வயது மற்றும் தகுதிகளை எளிய தமிழில் அறிந்து கொள்ளுங்கள்.',
    step3Title: '03. சான்றிதழ் தயாரிப்பு',
    step3Desc: 'வருமான மற்றும் சாதி சான்றிதழ் பிழைகளை முன்கூட்டியே சரிபார்க்கவும்.',
    step4Title: '04. விண்ணப்பித்தல்',
    step4Desc: 'அதிகாரப்பூர்வ அரசு தளம் அல்லது இ-சேவை மையம் மூலம் இடைத்தரகர் இன்றி விண்ணப்பிக்கவும்.',

    featHeading: 'ஒவ்வொரு குடிமகனுக்காகவும் உருவாக்கப்பட்டது',
    featDesc: 'அனைத்து தகவல்களும் அதிகாரப்பூர்வ அரசு அறிவிப்புகளை அடிப்படையாகக் கொண்டவை.',
    featSchemesTitle: 'அரசு திட்டங்கள் கையேடு',
    featSchemesDesc: 'மத்திய மற்றும் மாநில அரசுகளின் முக்கிய நலத்திட்ட தகவல்கள்.',
    featDocDoctorTitle: 'சான்றிதழ் மருத்துவர் (டாக்டர்)',
    featDocDoctorDesc: 'விண்ணப்பம் நிராகரிக்கப்படாமல் இருக்க சான்றிதழ் செல்லுபடியாகும் காலம் மற்றும் பெயரை சரிபார்க்கவும்.',
    featAssistantTitle: 'தமிழ் AI உதவியாளர்',
    featAssistantDesc: 'திட்டங்கள் மற்றும் சட்ட உரிமைகள் குறித்து தமிழில் பேசி அல்லது தட்டச்சு செய்து அறியவும்.',

    welcomeCitizen: 'வணக்கம்',
    tailoredView: 'உங்கள் சுயவிவரத்திற்கான திட்டங்கள்',
    dedicatedSchemesTitle: 'உங்களுக்காக தேர்ந்தெடுக்கப்பட்ட திட்டங்கள்',
    dedicatedSchemesSubtitle: 'உங்கள் வயது, பிரிவு, தொழில் மற்றும் வருமானத்திற்கு பொருந்தக்கூடிய நலத்திட்டங்கள்.',
    editProfile: 'சுயவிவரம் திருத்து',
    checkAllSchemes: 'அனைத்து திட்டங்களையும் காண்க',
    annualIncome: 'ஆண்டு வருமானம்',

    catHealthcare: 'சுகாதாரம்',
    catAgriculture: 'விவசாயம் & உழவர்கள்',
    catHousing: 'வீட்டு வசதி',
    catWomenChild: 'பெண்கள் & குழந்தைகள்',
    catEducation: 'கல்வி & உதவித்தொகை',
    catEmployment: 'தொழில் & சிறு வணிகம்',
    catSocialSecurity: 'சமூக பாதுகாப்பு & ஓய்வூதியம்',
    catAll: 'அனைத்து திட்டங்கள்',

    viewDetails: 'முழு விவரம் & பட்டியல்',
    askAI: 'AI-யிடம் கேளுங்கள்',
    officialPortal: 'அரசு தளம்',
    mandatory: 'கட்டாயம்',
    requiredDocuments: 'தேவையான ஆவணங்கள்',
    eligibilityCriteria: 'தகுதி வரம்புகள்',
    benefits: 'கிடைக்கும் நன்மைகள்',
    howToApply: 'விண்ணப்பிக்கும் முறை',
    close: 'மூடு',
    filterByBeneficiary: 'பயனாளிகள்:',
    category: 'பிரிவு:',
    send: 'அனுப்பு',
    chatPlaceholder: 'திட்டங்கள் அல்லது உரிமைகள் குறித்து தமிழில் கேட்கவும்...',
  },
  te: {
    navHome: 'హోమ్',
    navSchemes: 'పథకాలు',
    navChat: 'AI సహాయకుడు',
    navDocDoctor: 'డాక్యుమెంట్ డాక్టర్',
    navEligibility: 'అర్హత పరీక్ష',
    navRights: 'పౌర హక్కులు',
    navLogin: 'లాగిన్ / రిజిస్ట్రేషన్',
    navProfile: 'నా ప్రొఫైల్',
    navSignOut: 'లాగ్ అవుట్',
    navPortalTag: 'అధికార్ AI ప్రజా సేవా పోర్టల్',
    navCivicTag: 'పౌర AI',
    voiceAssistant: 'వాయిస్ అసిస్టెంట్',
    readAloud: 'చదివి వినిపించు',
    stopVoice: 'వాయిస్ ఆపు',
    listening: 'వింటోంది... మాట్లాడండి',
    speakNow: 'మాట్లాడటానికి మైక్ నొక్కండి',

    heroTag: 'స్వతంత్ర ప్రజా సేవ సాంకేతికత',
    heroHeadline: 'మీ హక్కులు. మీ సంక్షేమ పథకాలు.',
    heroHeadlineHighlight: 'సులువైన భాషలో అర్థం చేసుకోండి.',
    heroSubtitle: 'ప్రభుత్వ పథకాలను శోధించండి, అర్హతలను తెలుసుకోండి, పత్రాలను సిద్ధం చేయండి మరియు AI సహాయంతో సరైన మార్గదర్శకత్వం పొందండి.',
    searchPlaceholder: 'పథకం పేరు, రైతు, విద్యార్థి, ఆసుపత్రి, రుణం వెతకండి...',
    btnFindSchemes: 'పథకం వెతకండి',
    btnExploreSchemes: 'ప్రభుత్వ పథకాలు',
    btnAskAssistant: 'అధికార్ AIని అడగండి',
    popularSearches: 'ప్రముఖ శోధనలు:',

    journeyTitle: 'పౌరుల ప్రయాణం',
    journeyHeading: 'సందేహం నుండి పథకం ప్రయోజనం పొందే వరకు 4 దశలు',
    journeySubtitle: 'ప్రజా ప్రయోజనాలు పొందడానికి సులువైన మార్గం.',
    step1Title: '01. శోధించండి',
    step1Desc: 'మీ కుటుంబం, వృత్తి మరియు వర్గానికి తగిన పథకాలను కనుగొనండి.',
    step2Title: '02. అర్హత తెలుసుకోండి',
    step2Desc: 'ఆదాయ పరిమితి, వయస్సు నిబంధనలను సులభంగా అర్థం చేసుకోండి.',
    step3Title: '03. పత్రాల తనిఖీ',
    step3Desc: 'ఆదాయ, కుల ధృవీకరణ పత్రాలు మరియు పాస్‌బుక్ తప్పులను సరిదిద్దండి.',
    step4Title: '04. దరఖాస్తు చేసుకోండి',
    step4Desc: 'అధికారిక వెబ్‌సైట్ లేదా సమీప మీ-సేవ కేంద్రంలో దళారులు లేకుండా దరఖాస్తు చేయండి.',

    featHeading: 'ప్రతి పౌరుడి కోసం ప్రత్యేకంగా రూపొందించబడింది',
    featDesc: 'అన్ని వివరాలు అధికారిక ప్రభుత్వ నిబంధనల ఆధారంగా రూపొందించబడ్డాయి.',
    featSchemesTitle: 'ప్రభుత్వ పథకాల డైరెక్టరీ',
    featSchemesDesc: 'కేంద్ర మరియు రాష్ట్ర ప్రభుత్వాల పథకాల అధికారిక సమాచారం.',
    featDocDoctorTitle: 'డాక్యుమెంట్ డాక్టర్',
    featDocDoctorDesc: 'ధృవీకరణ పత్రాల చెల్లుబాటు మరియు పేర్ల స్పెల్లింగ్ ముందే తనిఖీ చేయండి.',
    featAssistantTitle: 'తెలుగు AI అసిస్టెంట్',
    featAssistantDesc: 'పథకాలు, హక్కుల గురించి తెలుగులో అడిగి సమాధానాలు తెలుసుకోండి.',

    welcomeCitizen: 'స్వాగతం',
    tailoredView: 'మీ ప్రొఫైల్ కోసం ప్రత్యేక పథకాలు',
    dedicatedSchemesTitle: 'మీ కోసం ఎంపిక చేసిన ప్రభుత్వ పథకాలు',
    dedicatedSchemesSubtitle: 'మీ వయస్సు, కుల వర్గం, వృత్తి మరియు ఆదాయానికి సరిగ్గా సరిపోయే సంక్షేమ పథకాలు.',
    editProfile: 'ప్రొఫైల్ సవరించండి',
    checkAllSchemes: 'అన్ని పథకాలను చూడండి',
    annualIncome: 'వార్షిక ఆదాయం',

    catHealthcare: 'ఆరోగ్య రక్షణ',
    catAgriculture: 'వ్యవసాయం & రైతులు',
    catHousing: 'గృహ నిర్మాణం',
    catWomenChild: 'మహిళలు & శిశు సంక్షేమం',
    catEducation: 'విద్య & స్కాలర్‌షిప్‌లు',
    catEmployment: 'ఉపాధి & చిన్న వ్యాపారాలు',
    catSocialSecurity: 'సామాజిక భద్రత & పెన్షన్',
    catAll: 'అన్ని పథకాలు',

    viewDetails: 'వివరాలు & చెక్‌లిస్ట్',
    askAI: 'AI ని అడగండి',
    officialPortal: 'అధికారిక పోర్టల్',
    mandatory: 'తప్పనిసరి',
    requiredDocuments: 'కావలసిన పత్రాలు',
    eligibilityCriteria: 'అర్హత నిబంధనలు',
    benefits: 'లభించే ప్రయోజనాలు',
    howToApply: 'దరఖాస్తు విధానం',
    close: 'మూసివేయి',
    filterByBeneficiary: 'లబ్ధిదారులు:',
    category: 'వర్గం:',
    send: 'పంపు',
    chatPlaceholder: 'పథకాల నిబంధనలు లేదా హక్కుల గురించి తెలుగులో అడగండి...',
  },
  bn: {
    navHome: 'হোম',
    navSchemes: 'সরকারি প্রকল্প',
    navChat: 'AI সহকারী',
    navDocDoctor: 'ডকুমেন্ট ডাক্তার',
    navEligibility: 'যোগ্যতা যাচাই',
    navRights: 'নাগরিক অধিকার',
    navLogin: 'লগ ইন / নিবন্ধন',
    navProfile: 'আমার প্রোফাইল',
    navSignOut: 'লগ আউট',
    navPortalTag: 'অধিকারAI নাগরিক সেবা পোর্টাল',
    navCivicTag: 'নাগরিক AI',
    voiceAssistant: 'ভয়েস সহকারী',
    readAloud: 'পড়ে শোনান',
    stopVoice: 'আওয়াজ বন্ধ করুন',
    listening: 'শুনছি... বলুন',
    speakNow: 'বলতে মাইক টিপুন',

    heroTag: 'স্বাধীন জনসেবা প্রযুক্তি',
    heroHeadline: 'আপনার অধিকার. আপনার প্রকল্প.',
    heroHeadlineHighlight: 'সহজ ভাষায় বুঝে নিন.',
    heroSubtitle: 'সরকারি প্রকল্প খুঁজুন, যোগ্যতা জানুন, প্রয়োজনীয় নথিপত্র প্রস্তুত করুন এবং AI সহায়তায় সঠিক নির্দেশ পান।',
    searchPlaceholder: 'প্রকল্পের নাম, কৃষক, ছাত্র, হাসপাতাল, ঋণ খুঁজুন...',
    btnFindSchemes: 'প্রকল্প খুঁজুন',
    btnExploreSchemes: 'সরকারি প্রকল্পসমূহ',
    btnAskAssistant: 'অধিকারAI কে জিজ্ঞাসা করুন',
    popularSearches: 'জনপ্রিয় অনুসন্ধান:',

    journeyTitle: 'নাগরিকের যাত্রা',
    journeyHeading: 'দ্বিধা থেকে প্রকল্পের সুবিধা পাওয়ার ৪টি সহজ ধাপ',
    journeySubtitle: 'আপনার অধিকার ও সরকারি সুবিধা পাওয়ার স্পষ্ট রূপরেখা।',
    step1Title: '০১. খুঁজুন',
    step1Desc: 'আপনার পরিবার, পেশা ও শ্রেণির জন্য উপযুক্ত প্রকল্প খুঁজুন।',
    step2Title: '০২. যোগ্যতা জানুন',
    step2Desc: 'সহজ ভাষায় বয়সের সীমা ও আয়ের শর্তাবলী জেনে নিন।',
    step3Title: '০৩. নথিপত্র প্রস্তুতি',
    step3Desc: 'ডকুমেন্ট ডাক্তারের মাধ্যমে আয় ও জাতিগত সনদের ভুলত্রুটি যাচাই করুন।',
    step4Title: '০৪. আবেদন করুন',
    step4Desc: 'সরকারি পোর্টাল বা নিকটস্থ সিএসসি কেন্দ্র থেকে কোনো মধ্যস্থতাকারী ছাড়াই আবেদন করুন।',

    featHeading: 'সাধারণ নাগরিকদের জন্য নির্মিত',
    featDesc: 'সরকারি বিজ্ঞপ্তির ওপর ভিত্তি করে নির্ভরযোগ্য তথ্য।',
    featSchemesTitle: 'সরকারি প্রকল্পের তালিকা',
    featSchemesDesc: 'কেন্দ্রীয় ও রাজ্য সরকারের প্রধান জনকল্যাণমূলক প্রকল্পের তথ্য।',
    featDocDoctorTitle: 'ডকুমেন্ট ডাক্তার (নথিপত্র যাচাই)',
    featDocDoctorDesc: 'আবেদন বাতিল হওয়া এড়াতে সার্টিফিকেটের মেয়াদ ও বানানের মিল যাচাই করুন।',
    featAssistantTitle: 'বাংলা AI সহকারী',
    featAssistantDesc: 'প্রকল্প ও নাগরিক অধিকার সম্পর্কে বাংলায় প্রশ্ন করে জেনে নিন।',

    welcomeCitizen: 'স্বাগতম',
    tailoredView: 'আপনার প্রোফাইলের জন্য নির্ধারিত প্রকল্প',
    dedicatedSchemesTitle: 'আপনার জন্য নির্বাচিত সরকারি প্রকল্পসমূহ',
    dedicatedSchemesSubtitle: 'আপনার বয়স, জাতিগত বিভাগ, পেশা এবং পারিবারিক আয়ের সাথে সামঞ্জস্যপূর্ণ প্রকল্প।',
    editProfile: 'প্রোফাইল সংশোধন',
    checkAllSchemes: 'সকল প্রকল্প দেখুন',
    annualIncome: 'বার্ষিক আয়',

    catHealthcare: 'স্বাস্থ্য পরিষেবা',
    catAgriculture: 'কৃষি ও কৃষক',
    catHousing: 'আবাসন যোজনা',
    catWomenChild: 'নারী ও শিশু বিকাশ',
    catEducation: 'শিক্ষা ও বৃত্তি',
    catEmployment: 'কর্মসংস্থান ও ক্ষুদ্র ব্যবসা',
    catSocialSecurity: 'সামাজিক সুরক্ষা ও পেনশন',
    catAll: 'সকল প্রকল্প',

    viewDetails: 'বিস্তারিত ও চেকলিস্ট',
    askAI: 'AI কে জিজ্ঞাসা করুন',
    officialPortal: 'অফিসিয়াল পোর্টাল',
    mandatory: 'বাধ্যতামূলক',
    requiredDocuments: 'প্রয়োজনীয় নথিপত্র',
    eligibilityCriteria: 'যোগ্যতার মাপকাঠি',
    benefits: 'প্রাপ্য সুবিধাসমূহ',
    howToApply: 'আবেদনের পদ্ধতি',
    close: 'বন্ধ করুন',
    filterByBeneficiary: 'সুবিধাভোগী:',
    category: 'বিভাগ:',
    send: 'পাঠান',
    chatPlaceholder: 'প্রকল্পের নিয়মাবলী বা অধিকার সম্পর্কে বাংলায় জিজ্ঞাসা করুন...',
  },
  en: {
    navHome: 'Home',
    navSchemes: 'Explore Schemes',
    navChat: 'AI Assistant',
    navDocDoctor: 'Document Doctor',
    navEligibility: 'Eligibility Checker',
    navRights: 'Citizen Rights',
    navLogin: 'Log In / Register',
    navProfile: 'My Profile',
    navSignOut: 'Sign Out',
    navPortalTag: 'AdhikarAI Public Service Portal',
    navCivicTag: 'Civic AI',
    voiceAssistant: 'Voice Assistant',
    readAloud: 'Read Aloud',
    stopVoice: 'Stop Reading',
    listening: 'Listening... please speak',
    speakNow: 'Click mic to speak',

    heroTag: 'Independent Civic Technology Initiative',
    heroHeadline: 'Your Rights. Your Benefits.',
    heroHeadlineHighlight: 'Made Understandable.',
    heroSubtitle: 'Discover government schemes, understand eligibility, prepare documents, and get clear guidance with AI-powered assistance.',
    searchPlaceholder: 'Search scheme name, benefit, farmer, student, hospital...',
    btnFindSchemes: 'Find Schemes',
    btnExploreSchemes: 'Explore Government Schemes',
    btnAskAssistant: 'Ask AdhikarAI',
    popularSearches: 'Popular searches:',

    journeyTitle: 'The Citizen Journey',
    journeyHeading: 'From Confusion to Received Benefits in 4 Steps',
    journeySubtitle: 'AdhikarAI guides you at every phase of accessing your public entitlements.',
    step1Title: '01. Discover',
    step1Desc: 'Find applicable schemes for your family, occupation, category, or livelihood through intelligent search and filters.',
    step2Title: '02. Understand Eligibility',
    step2Desc: 'Check clear, plain-language income limits, land rules, and age criteria without wading through dense government gazettes.',
    step3Title: '03. Prepare Documents',
    step3Desc: 'Use Document Doctor to inspect your certificates for expiry, spelling mismatches, and missing seals before applying.',
    step4Title: '04. Follow Next Steps',
    step4Desc: 'Apply with step-by-step guidance on official state/central portals or nearest CSC centers, with no agent commissions.',

    featHeading: 'Engineered for Everyday Citizens',
    featDesc: 'All tools operate on verified government policies with complete privacy.',
    featSchemesTitle: 'Government Scheme Directory',
    featSchemesDesc: 'Explore 10+ major central and state welfare initiatives with transparent criteria and direct links.',
    featDocDoctorTitle: 'Document Doctor',
    featDocDoctorDesc: 'Inspect Income Certificates, Caste Proofs, Land Khatauni, or Passbooks before submission.',
    featAssistantTitle: 'AI Rights Assistant',
    featAssistantDesc: 'Ask questions in everyday conversational language about schemes, reservations, and RTIs.',

    welcomeCitizen: 'Welcome',
    tailoredView: 'Tailored View',
    dedicatedSchemesTitle: 'Schemes You Are Eligible For',
    dedicatedSchemesSubtitle: 'Matched strictly against your age, category, occupation, and income limit.',
    editProfile: 'Edit Profile',
    checkAllSchemes: 'Explore all available central & state schemes in directory',
    annualIncome: 'Annual Income',

    catHealthcare: 'Healthcare',
    catAgriculture: 'Agriculture & Farmers',
    catHousing: 'Housing & Urban',
    catWomenChild: 'Women & Child Development',
    catEducation: 'Education & Scholarships',
    catEmployment: 'Employment & Entrepreneurship',
    catSocialSecurity: 'Social Security & Pensions',
    catAll: 'All Schemes',

    viewDetails: 'View Details & Checklist',
    askAI: 'Ask AI',
    officialPortal: 'Official Portal',
    mandatory: 'Mandatory',
    requiredDocuments: 'Required Documents Checklist',
    eligibilityCriteria: 'Eligibility Criteria',
    benefits: 'Key Scheme Benefits',
    howToApply: 'How to Apply (Step-by-Step)',
    close: 'Close',
    filterByBeneficiary: 'Filter by Beneficiary:',
    category: 'Category:',
    send: 'Send',
    chatPlaceholder: 'Ask about scheme rules, required certificates, income limits, or rights...',
  },
};

// Localized Scheme Titles and Descriptions in Kannada, Hindi, Tamil, Telugu, Bengali
export interface LocalizedSchemeInfo {
  name: string;
  shortDescription: string;
  benefitHighlight: string;
}

export const LOCALIZED_SCHEMES: Record<LanguageCode, Record<string, LocalizedSchemeInfo>> = {
  kn: {
    'pm-jay-ayushman-bharat': {
      name: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ - ಪ್ರಧಾನ ಮಂತ್ರಿ ಜನ ಆರೋಗ್ಯ ಯೋಜನೆ (PM-JAY)',
      shortDescription: 'ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೆ ಪ್ರತಿ ವರ್ಷ ₹5 ಲಕ್ಷದವರೆಗೆ ಉಚಿತ ಮತ್ತು ನಗದುರಹಿತ ಆಸ್ಪತ್ರೆ ಚಿಕಿತ್ಸೆ ನೀಡುವ ವಿಶ್ವದ ಅತಿದೊಡ್ಡ ಆರೋಗ್ಯ ವಿಮೆ ಯೋಜನೆ.',
      benefitHighlight: '₹5,00,000 / ವರ್ಷ / ಕುಟುಂಬಕ್ಕೆ ಉಚಿತ ಆಸ್ಪತ್ರೆ ಚಿಕಿತ್ಸೆ',
    },
    'pm-kisan-samman-nidhi': {
      name: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (PM-KISAN)',
      shortDescription: 'ಭಾರತದ ಎಲ್ಲಾ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬಗಳಿಗೆ ವರ್ಷಕ್ಕೆ ₹6,000 ನೇರ ಆದಾಯ ಸಹಾಯ (₹2,000 ರಂತೆ 3 ಕಂತುಗಳಲ್ಲಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರ ಜಮೆ).',
      benefitHighlight: '₹6,000 / ವರ್ಷ ರೈತರ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರ ಜಮೆ',
    },
    'pm-awas-yojana-urban-gramin': {
      name: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಆವಾಸ್ ಯೋಜನೆ (PMAY - ಗ್ರಾಮೀಣ ಮತ್ತು ನಗರ)',
      shortDescription: 'ಸ್ವಂತ ಪಕ್ಕಾ ಮನೆ ಇಲ್ಲದ ಬಡ ಕುಟುಂಬಗಳಿಗೆ ಮನೆ ನಿರ್ಮಿಸಲು ₹1.20 ಲಕ್ಷದಿಂದ ₹2.67 ಲಕ್ಷದವರೆಗೆ ಸರ್ಕಾರದ ನೇರ ಧನಸಹಾಯ ಮತ್ತು ಸಬ್ಸಿಡಿ.',
      benefitHighlight: '₹1,20,000 ರಿಂದ ₹2,67,000 ಮನೆ ನಿರ್ಮಾಣ ಧನಸಹಾಯ',
    },
    'sukanya-samriddhi-yojana': {
      name: 'ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ ಯೋಜನೆ (SSY)',
      shortDescription: 'ಹೆಣ್ಣು ಮಕ್ಕಳ ಉನ್ನತ ಶಿಕ್ಷಣ ಮತ್ತು ಭವಿಷ್ಯಕ್ಕಾಗಿ ಅತಿ ಹೆಚ್ಚು ಬಡ್ಡಿ (8.2% ವಾರ್ಷಿಕ) ಮತ್ತು ಸಂಪೂರ್ಣ ತೆರಿಗೆ ವಿನಾಯಿತಿ ನೀಡುವ ಸರ್ಕಾರಿ ಉಳಿತಾಯ ಯೋಜನೆ.',
      benefitHighlight: '8.2% ವಾರ್ಷಿಕ ಬಡ್ಡಿ + ಸಂಪೂರ್ಣ ತೆರಿಗೆ ಮುಕ್ತ',
    },
    'pm-mudra-yojana': {
      name: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಮುದ್ರಾ ಯೋಜನೆ (PMMY)',
      shortDescription: 'ಸಣ್ಣ ವ್ಯಾಪಾರಿಗಳು ಮತ್ತು ಸ್ವಯಂ ಉದ್ಯೋಗಿಗಳಿಗೆ ಯಾವುದೇ ಆಸ್ತಿ ಅಡಮಾನವಿಲ್ಲದೆ (Collateral-Free) ₹10 ಲಕ್ಷದಿಂದ ₹20 ಲಕ್ಷದವರೆಗೆ ಬ್ಯಾಂಕ್ ಸಾಲ.',
      benefitHighlight: 'ಯಾವುದೇ ಅಡಮಾನವಿಲ್ಲದೆ ₹10,00,000 ವರೆಗೆ ಸಾಲ',
    },
    'pm-vishwakarma-yojana': {
      name: 'ಪಿಎಂ ವಿಶ್ವಕರ್ಮ ಯೋಜನೆ',
      shortDescription: 'ಬಡಗಿ, ಕಮ್ಮಾರ, ದರ್ಜಿ, ಕುಂಬಾರ ಸೇರಿದಂತೆ 18 ಸಾಂಪ್ರದಾಯಿಕ ಕುಶಲಕರ್ಮಿಗಳಿಗೆ ₹15,000 ಟೂಲ್‌ಕಿಟ್ ಅನುದಾನ ಮತ್ತು ಕೇವಲ 5% ಬಡ್ಡಿಯಲ್ಲಿ ಸಾಲ.',
      benefitHighlight: '₹15,000 ಉಚಿತ ಟೂಲ್‌ಕಿಟ್ + ₹3 ಲಕ್ಷ ಕಡಿಮೆ ಬಡ್ಡಿ ಸಾಲ',
    },
    'post-matric-scholarship-sc-st-obc': {
      name: 'ಎಸ್.ಸಿ / ಎಸ್.ಟಿ / ಒಬಿಸಿ ವಿದ್ಯಾರ್ಥಿಗಳ ಪೋಸ್ಟ್-ಮೆಟ್ರಿಕ್ ಸ್ಕಾಲರ್‌ಶಿಪ್',
      shortDescription: '10ನೇ ತರಗತಿ ನಂತರ ಪಿಯುಸಿ, ಐಟಿಐ, ಡಿಪ್ಲೊಮಾ, ಪದವಿ ಕಲಿಯುವ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಂಪೂರ್ಣ ಕಾಲೇಜು ಶುಲ್ಕ ಮರುಪಾವತಿ ಮತ್ತು ಮಾಸಿಕ ಭತ್ಯೆ.',
      benefitHighlight: '100% ಕಾಲೇಜು ಶುಲ್ಕ ಮನ್ನಾ + ಮಾಸಿಕ ನಿರ್ವಹಣಾ ಭತ್ಯೆ',
    },
    'pm-ujjwala-yojana': {
      name: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಉಜ್ವಲ ಯೋಜನೆ 2.0 (PMUY)',
      shortDescription: 'ಬಡ ಕುಟುಂಬಗಳ ವಯಸ್ಕ ಮಹಿಳೆಯರಿಗೆ ಉಚಿತ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ, ಉಚಿತ ಗ್ಯಾಸ್ ಸ್ಟವ್ ಮತ್ತು ಮೊದಲ ಸಿಲಿಂಡರ್ ಉಚಿತ ಮರುಪೂರಣ.',
      benefitHighlight: 'ಉಚಿತ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ + ₹300 ಸಬ್ಸಿಡಿ ಪ್ರತಿ ಸಿಲಿಂಡರ್‌ಗೆ',
    },
    'atal-pension-yojana': {
      name: 'ಅಟಲ್ ಪಿಂಚಣಿ ಯೋಜನೆ (APY)',
      shortDescription: 'ಅಸಂಘಟಿತ ವಲಯದ ಕಾರ್ಮಿಕರು ಮತ್ತು ಸಣ್ಣ ಉದ್ಯೋಗಿಗಳಿಗೆ 60 ವರ್ಷ ತುಂಬಿದ ನಂತರ ತಿಂಗಳಿಗೆ ₹1,000 ರಿಂದ ₹5,000 ಜೀವಮಾನ ಖಾತರಿ ಪಿಂಚಣಿ.',
      benefitHighlight: 'ತಿಂಗಳಿಗೆ ₹1,000 ರಿಂದ ₹5,000 ಖಾತರಿ ಪಿಂಚಣಿ',
    },
    'mgnrega-job-card': {
      name: 'ಮಹಾತ್ಮ ಗಾಂಧಿ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತರಿ ಯೋಜನೆ (ಮನರೇಗಾ)',
      shortDescription: 'ಗ್ರಾಮೀಣ ಕುಟುಂಬಗಳಿಗೆ ವರ್ಷದಲ್ಲಿ ಕನಿಷ್ಠ 100 ದಿನಗಳ ಖಾತರಿ ಕೂಲಿ ಕೆಲಸ ಮತ್ತು ನೇರ ಕೂಲಿ ಹಣ ಪಾವತಿ.',
      benefitHighlight: 'ವರ್ಷಕ್ಕೆ 100 ದಿನಗಳ ಖಾತರಿ ಕೆಲಸ + ದಿನಗೂಲಿ',
    },
    'pm-svanidhi-scheme': {
      name: 'ಪಿಎಂ ಸ್ವನಿಧಿ ಯೋಜನೆ (ಬೀದಿ ಬದಿ ವ್ಯಾಪಾರಿಗಳು)',
      shortDescription: 'ಬೀದಿ ಬದಿ ವ್ಯಾಪಾರಿಗಳು ಮತ್ತು ತಳ್ಳುವ ಗಾಡಿ ವ್ಯಾಪಾರಿಗಳಿಗೆ ₹10,000 ದಿಂದ ₹50,000 ವರೆಗೆ ಸುಲಭ ಬಡ್ಡಿಯ ಕಾರ್ಯನಿರತ ಬಂಡವಾಳ ಸಾಲ.',
      benefitHighlight: '₹10,000 ರಿಂದ ₹50,000 ಸಾಲ + 7% ಬಡ್ಡಿ ಸಬ್ಸಿಡಿ',
    },
  },
  hi: {
    'pm-jay-ayushman-bharat': {
      name: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (PM-JAY)',
      shortDescription: 'प्रति परिवार प्रति वर्ष ₹5 लाख तक का कैशलेस और मुफ्त अस्पताल इलाज प्रदान करने वाली विश्व की सबसे बड़ी स्वास्थ्य आश्वासन योजना।',
      benefitHighlight: '₹5,00,000 / वर्ष मुफ्त अस्पताल इलाज',
    },
    'pm-kisan-samman-nidhi': {
      name: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
      shortDescription: 'सभी भूमिधारक किसान परिवारों को ₹6,000 प्रति वर्ष की सीधी आय सहायता (₹2,000 की 3 किस्तों में बैंक खाते में)।',
      benefitHighlight: '₹6,000 / वर्ष बैंक खाते में सीधे',
    },
    'pm-awas-yojana-urban-gramin': {
      name: 'प्रधानमंत्री आवास योजना (PMAY - शहरी एवं ग्रामीण)',
      shortDescription: 'कच्चे या बेघर परिवारों को पक्का मकान बनाने के लिए ₹1.20 लाख से ₹2.67 लाख तक की सीधी सरकारी वित्तीय सहायता।',
      benefitHighlight: '₹1.2 लाख से ₹2.67 लाख मकान सहायता',
    },
    'sukanya-samriddhi-yojana': {
      name: 'सुकन्या समृद्धि योजना (SSY)',
      shortDescription: 'बेटियों के भविष्य और पढ़ाई के लिए सर्वोच्च ब्याज दर (8.2% वार्षिक) और पूर्ण कर-मुक्त बचत योजना।',
      benefitHighlight: '8.2% वार्षिक ब्याज + पूर्ण टैक्स छूट',
    },
    'pm-mudra-yojana': {
      name: 'प्रधानमंत्री मुद्रा योजना (PMMY)',
      shortDescription: 'छोटे कारोबारियों और स्वरोजगार के लिए बिना किसी गारंटी (कोलैटरल-फ्री) ₹10 लाख से ₹20 लाख तक का सस्ता व्यावसायिक ऋण।',
      benefitHighlight: 'बिना गारंटी ₹10,00,000 तक का लोन',
    },
    'pm-vishwakarma-yojana': {
      name: 'पीएम विश्वकर्मा योजना',
      shortDescription: 'बढ़ई, लोहार, दर्जी, कुम्हार सहित 18 पारंपरिक कारीगरों को ₹15,000 टूलकिट अनुदान और 5% रियायती ब्याज पर ऋण।',
      benefitHighlight: '₹15,000 टूलकिट + ₹3 लाख कम ब्याज ऋण',
    },
    'post-matric-scholarship-sc-st-obc': {
      name: 'पोस्ट-मैट्रिक छात्रवृत्ति योजना (SC / ST / OBC / EWS)',
      shortDescription: '10वीं के बाद कॉलेज, आईटीआई, डिप्लोमा या डिग्री करने वाले छात्रों को पूरी कॉलेज फीस वापसी और मासिक भत्ता।',
      benefitHighlight: '100% ट्यूशन फीस माफी + मासिक भत्ता',
    },
    'pm-ujjwala-yojana': {
      name: 'प्रधानमंत्री उज्ज्वला योजना 2.0 (PMUY)',
      shortDescription: 'गरीब परिवारों की वयस्क महिलाओं के लिए मुफ्त एलपीजी गैस कनेक्शन, चूल्हा और पहला भरा हुआ सिलेंडर।',
      benefitHighlight: 'मुफ्त गैस कनेक्शन + ₹300 सब्सिडी/सिलेंडर',
    },
    'atal-pension-yojana': {
      name: 'अटल पेंशन योजना (APY)',
      shortDescription: 'असंगठित क्षेत्र के कामगारों को 60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 प्रति माह की आजीवन सरकारी गारंटीड पेंशन।',
      benefitHighlight: '₹1,000 से ₹5,000 प्रति माह गारंटीड पेंशन',
    },
    'mgnrega-job-card': {
      name: 'महात्मा गांधी ग्रामीण रोजगार गारंटी (मनरेगा)',
      shortDescription: 'ग्रामीण परिवारों को साल में कम से कम 100 दिनों के अकुशल शारीरिक काम की कानूनी गारंटी।',
      benefitHighlight: 'साल में 100 दिन का पक्का रोजगार',
    },
    'pm-svanidhi-scheme': {
      name: 'पीएम स्वनिधि योजना (स्ट्रीट वेंडर्स)',
      shortDescription: 'रेहड़ी-पटरी, ठेले वाले दुकानदारों को ₹10,000 से ₹50,000 तक का बिना गारंटी का कार्यशील पूंजी ऋण।',
      benefitHighlight: '₹10,000 से ₹50,000 लोन + 7% ब्याज सब्सिडी',
    },
  },
  ta: {
    'pm-jay-ayushman-bharat': {
      name: 'ஆயுஷ்மான் பாரத் - பிரதம மந்திரி ஜன் ஆரோக்கிய திட்டம் (PM-JAY)',
      shortDescription: 'ஆண்டுக்கு ஒரு குடும்பத்திற்கு ₹5 லட்சம் வரை கட்டணமில்லா மருத்துவமனை சிகிச்சை வழங்கும் உலகின் மிகப்பெரிய மருத்துவ காப்பீட்டுத் திட்டம்.',
      benefitHighlight: 'ஆண்டுக்கு ₹5,00,000 கட்டணமில்லா மருத்துவ காப்பீடு',
    },
    'pm-kisan-samman-nidhi': {
      name: 'பிரதம மந்திரி கிசான் சம்மான் நிதி (PM-KISAN)',
      shortDescription: 'விவசாய நிலம் வைத்துள்ள விவசாய குடும்பங்களுக்கு ஆண்டுக்கு ₹6,000 நேரடி உதவித்தொகை (3 தவணைகளாக ₹2,000 வீதம் வங்கி கணக்கில்).',
      benefitHighlight: 'ஆண்டுக்கு ₹6,000 நேரடியாக வங்கிக் கணக்கில்',
    },
    'pm-awas-yojana-urban-gramin': {
      name: 'பிரதம மந்திரி ஆவாஸ் திட்டம் (PMAY - வீட்டு வசதி)',
      shortDescription: 'சொந்த கான்கிரீட் வீடு இல்லாத குடும்பங்களுக்கு வீடு கட்ட ₹1.20 லட்சம் முதல் ₹2.67 லட்சம் வரை அரசு நிதி உதவி.',
      benefitHighlight: '₹1,20,000 முதல் ₹2,67,000 வரை வீடு கட்ட நிதி உதவி',
    },
    'sukanya-samriddhi-yojana': {
      name: 'செல்வமகள் சேமிப்புத் திட்டம் (SSY)',
      shortDescription: 'பெண் குழந்தைகளின் கல்வி மற்றும் எதிர்காலத்திற்காக அதிக வட்டி (8.2%) மற்றும் முழு வரி விலக்கு அளிக்கும் அரசு திட்டம்.',
      benefitHighlight: '8.2% ஆண்டு வட்டி + முழு வரி விலக்கு',
    },
    'pm-mudra-yojana': {
      name: 'பிரதம மந்திரி முத்ரா கடன் திட்டம் (PMMY)',
      shortDescription: 'சிறு வணிகர்கள் மற்றும் சுயதொழில் செய்பவர்களுக்கு பிணையில்லாமல் ₹10 லட்சம் முதல் ₹20 லட்சம் வரை குறைந்த வட்டி கடன்.',
      benefitHighlight: 'பிணையில்லாமல் ₹10,00,000 வரை தொழில் கடன்',
    },
    'pm-vishwakarma-yojana': {
      name: 'பிஎம் விஸ்வகர்மா திட்டம்',
      shortDescription: 'தச்சர், கொல்லர், தையல்காரர் உள்ளிட்ட 18 பாரம்பரிய கைவினை கலைஞர்களுக்கு ₹15,000 இலவச கருவி மானியம் மற்றும் 5% வட்டியில் கடன்.',
      benefitHighlight: '₹15,000 கருவி மானியம் + ₹3 லட்சம் குறைந்த வட்டிக் கடன்',
    },
    'post-matric-scholarship-sc-st-obc': {
      name: 'பத்தாம் வகுப்புக்கு பிந்தைய கல்வி உதவித்தொகை (SC / ST / OBC)',
      shortDescription: '10-ஆம் வகுப்பு முடித்து கல்லூரி, ஐடிஐ, பட்டப்படிப்பு பயிலும் மாணவர்களுக்கு 100% கல்விக் கட்டண விலக்கு மற்றும் உதவித்தொகை.',
      benefitHighlight: '100% கல்லூரிக் கட்டண விலக்கு + மாதாந்திர உதவித்தொகை',
    },
    'pm-ujjwala-yojana': {
      name: 'பிரதம மந்திரி உஜ்வாலா திட்டம் 2.0 (PMUY)',
      shortDescription: 'ஏழை குடும்பத்துப் பெண்களுக்கு இலவச எரிவாயு இணைப்பு, அடுப்பு மற்றும் முதல் சிலிண்டர் இலவசம்.',
      benefitHighlight: 'இலவச கேஸ் இணைப்பு + ₹300 மானியம்/சிலிண்டர்',
    },
    'atal-pension-yojana': {
      name: 'அடல் பென்ஷன் திட்டம் (APY)',
      shortDescription: 'அமைப்புசாரா தொழிலாளர்களுக்கு 60 வயதுக்கு பின் மாதம் ₹1,000 முதல் ₹5,000 வரை உத்தரவாத வாழ்நாள் ஓய்வூதியம்.',
      benefitHighlight: 'மாதம் ₹1,000 முதல் ₹5,000 வரை உத்தரவாத ஓய்வூதியம்',
    },
    'mgnrega-job-card': {
      name: 'மகாத்மா காந்தி தேசிய ஊரக வேலை உறுதி திட்டம் (100 நாள் வேலை)',
      shortDescription: 'கிராமப்புற குடும்பங்களுக்கு ஆண்டுக்கு 100 நாட்கள் உத்தரவாத வேலை மற்றும் நேரடி கூலி.',
      benefitHighlight: 'ஆண்டுக்கு 100 நாள் உத்தரவாத வேலை + தினசரி கூலி',
    },
    'pm-svanidhi-scheme': {
      name: 'பிஎம் ஸ்வநிதி திட்டம் (தெருவோர வியாபாரிகள்)',
      shortDescription: 'தெருவோர வியாபாரிகளுக்கு பிணையில்லாமல் ₹10,000 முதல் ₹50,000 வரை குறைந்த வட்டி மூலதனக் கடன்.',
      benefitHighlight: '₹10,000 முதல் ₹50,000 கடன் + 7% வட்டி மானியம்',
    },
  },
  te: {
    'pm-jay-ayushman-bharat': {
      name: 'ఆయుష్మాన్ భారత్ - ప్రధాన మంత్రి జన్ ఆరోగ్య యోజన (PM-JAY)',
      shortDescription: 'ప్రతి కుటుంబానికి ఏడాదికి ₹5 లక్షల వరకు ఉచిత మరియు నగదు రహిత ఆసుపత్రి చికిత్స అందించే ప్రపంచంలోనే అతిపెద్ద ఆరోగ్య భరోసా పథకం.',
      benefitHighlight: 'ఏడాదికి ₹5,00,000 ఉచిత ఆసుపత్రి చికిత్స',
    },
    'pm-kisan-samman-nidhi': {
      name: 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి (PM-KISAN)',
      shortDescription: 'రైతు కుటుంబాలకు ఏడాదికి ₹6,000 ప్రత్యక్ష ఆదాయ సహాయం (₹2,000 చొప్పున 3 విడతల్లో నేరుగా బ్యాంకు ఖాతాలో).',
      benefitHighlight: 'ఏడాదికి ₹6,000 నేరుగా బ్యాంకు ఖాతాలో',
    },
    'pm-awas-yojana-urban-gramin': {
      name: 'ప్రధాన మంత్రి ఆవాస్ యోజన (PMAY - గృహ నిర్మాణం)',
      shortDescription: 'సొంత పక్కా ఇల్లు లేని పేద కుటుంబాలకు ఇల్లు నిర్మించుకోవడానికి ₹1.20 లక్షల నుండి ₹2.67 లక్షల వరకు ప్రభుత్వ ఆర్థిక సహాయం.',
      benefitHighlight: '₹1.20 లక్షల నుండి ₹2.67 లక్షల ఇల్లు నిర్మాణ సహాయం',
    },
    'sukanya-samriddhi-yojana': {
      name: 'సుకున్య సమృద్ధి యోజన (SSY)',
      shortDescription: 'ఆడపిల్లల ఉన్నత విద్య మరియు భవిష్యత్తు కోసం అత్యధిక వడ్డీ రేటు (8.2%) మరియు పూర్తి పన్ను మినహాయింపు గల పొదుపు పథకం.',
      benefitHighlight: '8.2% వార్షిక వడ్డీ + పూర్తి పన్ను మినహాయింపు',
    },
    'pm-mudra-yojana': {
      name: 'ప్రధాన మంత్రి ముద్రా యోజన (PMMY)',
      shortDescription: 'చిన్న వ్యాపారులు మరియు స్వయం ఉపాధి కోసం ఎటువంటి పూచీకత్తు లేకుండా ₹10 లక్షల నుండి ₹20 లక్షల వరకు వ్యాపార రుణం.',
      benefitHighlight: 'పూచీకత్తు లేకుండా ₹10,00,000 వరకు రుణం',
    },
    'pm-vishwakarma-yojana': {
      name: 'పీఎం విశ్వకర్మ యోజన',
      shortDescription: 'వడ్రంగి, కమ్మరి, దర్జీ సహా 18 రకాల సాంప్రదాయ చేతివృత్తుల కళాకారులకు ₹15,000 ఉచిత టూల్‌కిట్ గ్రాంట్ మరియు 5% వడ్డీతో రుణం.',
      benefitHighlight: '₹15,000 టూల్‌కిట్ + ₹3 లక్షల తక్కువ వడ్డీ రుణం',
    },
    'post-matric-scholarship-sc-st-obc': {
      name: 'పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ పథకం (SC / ST / OBC / EWS)',
      shortDescription: '10వ తరగతి తదుపరి కాలేజీ, ఐటీఐ, డిగ్రీ చదివే విద్యార్థులకు 100% ఫీజు రీయింబర్స్‌మెంట్ మరియు నెలవారీ ఉపకార వేతనం.',
      benefitHighlight: '100% ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ + ఉపకార వేతనం',
    },
    'pm-ujjwala-yojana': {
      name: 'ప్రధాన మంత్రి ఉజ్వల యోజన 2.0 (PMUY)',
      shortDescription: 'పేద కుటుంబాల మహిళలకు ఉచిత ఎల్‌పీజీ గ్యాస్ కనెక్షన్, స్టవ్ మరియు మొదటి సిలిండర్ ఉచితం.',
      benefitHighlight: 'ఉచిత గ్యాస్ కనెక్షన్ + ₹300 సబ్సిడీ/సిలిండర్',
    },
    'atal-pension-yojana': {
      name: 'అటల్ పెన్షన్ యోజన (APY)',
      shortDescription: 'అసంఘటిత రంగ కార్మికులకు 60 ఏళ్ల వయస్సు తర్వాత నెలకు ₹1,000 నుండి ₹5,000 వరకు ప్రభుత్వ గ్యారెంటీ జీవితకాల పెన్షన్.',
      benefitHighlight: 'నెలకు ₹1,000 నుండి ₹5,000 గ్యారెంటీ పెన్షన్',
    },
    'mgnrega-job-card': {
      name: 'మహాత్మా గాంధీ జాతీయ గ్రామీణ ఉపాధి హామీ పథకం',
      shortDescription: 'గ్రామీణ కుటుంబాలకు సంవత్సరంలో కనీసం 100 రోజుల పాటు హామీతో కూడిన ఉపాధి మరియు వేతనాలు.',
      benefitHighlight: 'ఏడాదికి 100 రోజుల హామీ ఉపాధి + వేతనం',
    },
    'pm-svanidhi-scheme': {
      name: 'పీఎం స్వనిధి పథకం (స్ట్రీట్ వెండర్స్)',
      shortDescription: 'వీధి వ్యాపారులకు ఎటువంటి పూచీకత్తు లేకుండా ₹10,000 నుండి ₹50,000 వరకు తక్కువ వడ్డీ పెట్టుబడి రుణం.',
      benefitHighlight: '₹10,000 నుండి ₹50,000 రుణం + 7% వడ్డీ సబ్సిడీ',
    },
  },
  bn: {
    'pm-jay-ayushman-bharat': {
      name: 'আয়ুষ্মান ভারত - প্রধানমন্ত্রী জন আরোগ্য যোজনা (PM-JAY)',
      shortDescription: 'প্রতিটি পরিবারকে বছরে ₹৫ লক্ষ টাকা পর্যন্ত বিনামূল্যে ও ক্যাশলেস হাসপাতালে চিকিৎসার সুবিধা প্রদানকারী প্রকল্প।',
      benefitHighlight: 'প্রতি বছর ₹৫,০০,০০০ পর্যন্ত বিনামূল্যে চিকিৎসা',
    },
    'pm-kisan-samman-nidhi': {
      name: 'প্রধানমন্ত্রী কিষাণ সম্মান নিধি (PM-KISAN)',
      shortDescription: 'সকল কৃষিজমির মালিক কৃষক পরিবারকে বছরে ₹৬,০০০ টাকার আর্থিক সাহায্য (₹২,০০০ করে ৩ কিস্তিতে সরাসরি ব্যাংক অ্যাকাউন্টে)।',
      benefitHighlight: 'বছরে ₹৬,০০০ সরাসরি ব্যাংক অ্যাকাউন্টে',
    },
    'pm-awas-yojana-urban-gramin': {
      name: 'প্রধানমন্ত্রী আবাস যোজনা (PMAY - গৃহ নির্মাণ)',
      shortDescription: 'পাকা বাড়িহীন পরিবারের জন্য পাকা ঘর তৈরিতে ₹১.২ লক্ষ থেকে ₹২.৬৭ লক্ষ টাকা পর্যন্ত সরাসরি সরকারি অনুদান।',
      benefitHighlight: 'ঘর তৈরিতে ₹১,২০,০০০ থেকে ₹২,৬৭,০০০ অনুদান',
    },
    'sukanya-samriddhi-yojana': {
      name: 'সুকন্যা সমৃদ্ধি যোজনা (SSY)',
      shortDescription: 'কন্যা সন্তানের পড়াশোনা ও ভবিষ্যতের জন্য সর্বোচ্চ সুদ (৮.২%) ও সম্পূর্ণ আয়কর ছাড়যুক্ত সরকারি সঞ্চয় প্রকল্প।',
      benefitHighlight: '৮.২% বার্ষিক সুদ + সম্পূর্ণ করমুক্ত',
    },
    'pm-mudra-yojana': {
      name: 'প্রধানমন্ত্রী মুদ্রা যোজনা (PMMY)',
      shortDescription: 'ক্ষুদ্র ব্যবসায়ী ও স্বনিযুক্তদের জন্য কোনো জামানত ছাড়াই ₹১০ লক্ষ থেকে ₹২০ লক্ষ টাকা পর্যন্ত সহজ ঋণ।',
      benefitHighlight: 'জামানত ছাড়া ₹১০,০০,০০০ পর্যন্ত ঋণ',
    },
    'pm-vishwakarma-yojana': {
      name: 'পিএম বিশ্বকর্মা যোজনা',
      shortDescription: 'ছুতোর, কামার, দর্জি সহ ১৮টি ঐতিহ্যবাহী পেশার কারিগরদের ₹১৫,০০০ ফ্রি টুলকিট অনুদান ও ৫% সুদে ঋণ।',
      benefitHighlight: '₹১৫,০০০ ফ্রি টুলকিট + ₹৩ লক্ষ কম সুদে ঋণ',
    },
    'post-matric-scholarship-sc-st-obc': {
      name: 'পোস্ট-ম্যাট্রিক স্কলারশিপ (SC / ST / OBC / EWS)',
      shortDescription: 'মাধ্যমিকের পর কলেজ, আইটিআই বা উচ্চশিক্ষার শিক্ষার্থীদের সম্পূর্ণ টিউশন ফি মওকুফ ও মাসিক ভাতা।',
      benefitHighlight: '১০০% কলেজ ফি মওকুফ + মাসিক রক্ষণাবেক্ষণ ভাতা',
    },
    'pm-ujjwala-yojana': {
      name: 'প্রধানমন্ত্রী উজ্জ্বলা যোজনা ২.০ (PMUY)',
      shortDescription: 'দরিদ্র পরিবারের প্রাপ্তবয়স্ক নারীদের জন্য বিনামূল্যে এলপিজি গ্যাস সংযোগ, ওভেন ও প্রথম সিলিন্ডার রিফিল।',
      benefitHighlight: 'বিনামূল্যে গ্যাস সংযোগ + ₹৩০০ ভর্তুকি/সিলিন্ডার',
    },
    'atal-pension-yojana': {
      name: 'অটল পেনশন যোজনা (APY)',
      shortDescription: 'অসংগঠিত ক্ষেত্রের কর্মীদের ৬০ বছর বয়সের পর আজীবন মাসিক ₹১,০০০ থেকে ₹৫,০০০ নিশ্চিত পেনশন।',
      benefitHighlight: 'মাসিক ₹১,০০০ থেকে ₹৫,০০০ নিশ্চিত পেনশন',
    },
    'mgnrega-job-card': {
      name: 'মহাত্মা গান্ধী গ্রামীণ কর্মসংস্থান নিশ্চয়তা প্রকল্প (১০০ দিনের কাজ)',
      shortDescription: 'গ্রামীণ পরিবারের জন্য বছরে অন্তত ১০০ দিনের কাজের আইনি নিশ্চয়তা ও সরাসরি মজুরি।',
      benefitHighlight: 'বছরে ১০০ দিনের নিশ্চিত কাজ + মজুরি',
    },
    'pm-svanidhi-scheme': {
      name: 'পিএম স্বনিধি যোজনা (হকার ও পথব্যবসায়ী)',
      shortDescription: 'পথব্যবসায়ীদের জন্য কোনো জামানত ছাড়া ₹১০,০০০ থেকে ₹৫০,০০০ টাকা পর্যন্ত সহজ চলতি মূলধন ঋণ।',
      benefitHighlight: '₹১০,০০০ থেকে ₹৫০,০০০ ঋণ + ৭% সুদ ভর্তুকি',
    },
  },
  en: {
    'pm-jay-ayushman-bharat': {
      name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
      shortDescription: 'World’s largest government-funded health assurance scheme providing cashless hospitalisation coverage up to ₹5 lakh per family per year.',
      benefitHighlight: '₹5,00,000 / year / family cashless hospital care',
    },
    'pm-kisan-samman-nidhi': {
      name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      shortDescription: 'Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families across India.',
      benefitHighlight: '₹6,000 / year direct transfer to farmer bank account',
    },
    'pm-awas-yojana-urban-gramin': {
      name: 'Pradhan Mantri Awas Yojana (PMAY - Urban & Gramin)',
      shortDescription: 'Financial assistance up to ₹1,20,000 to ₹2,67,000 to construct pucca houses with water, sanitation, and electricity connections.',
      benefitHighlight: '₹1,20,000 to ₹2,67,000 financial housing grant',
    },
    'sukanya-samriddhi-yojana': {
      name: 'Sukanya Samriddhi Yojana (SSY)',
      shortDescription: 'Government-backed savings scheme for the girl child offering one of the highest interest rates (8.2% p.a.) and triple tax exemption (EEE).',
      benefitHighlight: '8.2% annual return + Triple tax exemption (EEE)',
    },
    'pm-mudra-yojana': {
      name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
      shortDescription: 'Collateral-free business loans up to ₹10 lakh (expanded up to ₹20 lakh) for non-farm micro and small enterprises.',
      benefitHighlight: 'Up to ₹10,00,000 collateral-free business credit',
    },
    'pm-vishwakarma-yojana': {
      name: 'PM Vishwakarma Yojana',
      shortDescription: 'Holistic support for 18 traditional artisan trades with ₹15,000 modern toolkit grant and 5% subsidized collateral-free loans.',
      benefitHighlight: '₹15,000 toolkit voucher + ₹3,00,000 5% interest loan',
    },
    'post-matric-scholarship-sc-st-obc': {
      name: 'Post-Matric Scholarship Scheme for SC / ST / OBC Students',
      shortDescription: 'Centrally sponsored scholarship providing 100% reimbursement of college tuition fees plus monthly maintenance allowance.',
      benefitHighlight: '100% compulsory tuition fee waiver + monthly stipend',
    },
    'pm-ujjwala-yojana': {
      name: 'Pradhan Mantri Ujjwala Yojana (PMUY 2.0)',
      shortDescription: 'Deposit-free LPG gas connection, stove, and free first cylinder refill for adult women from poor households.',
      benefitHighlight: 'Deposit-free LPG connection + ₹300 refill subsidy',
    },
    'atal-pension-yojana': {
      name: 'Atal Pension Yojana (APY)',
      shortDescription: 'Government-guaranteed pension scheme for workers in the unorganized sector providing ₹1,000 to ₹5,000 monthly pension from age 60.',
      benefitHighlight: '₹1,000 to ₹5,000 / month lifetime guaranteed pension',
    },
    'mgnrega-job-card': {
      name: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
      shortDescription: 'Legal guarantee of at least 100 days of wage employment in a financial year to every rural household for manual unskilled work.',
      benefitHighlight: '100 days statutory wage employment guaranteed',
    },
    'pm-svanidhi-scheme': {
      name: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)',
      shortDescription: 'Collateral-free working capital micro-loans starting from ₹10,000 to ₹50,000 with 7% interest subsidy for street vendors.',
      benefitHighlight: '₹10,000 to ₹50,000 loan + 7% interest subsidy',
    },
  },
};
