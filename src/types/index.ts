export type SchemeCategory =
  | 'Healthcare'
  | 'Agriculture & Farmers'
  | 'Housing & Urban'
  | 'Women & Child Development'
  | 'Education & Scholarships'
  | 'Employment & Entrepreneurship'
  | 'Social Security & Pensions';

export interface RequiredDocument {
  name: string;
  isMandatory: boolean;
  purpose: string;
  whereToGet: string;
}

export interface Scheme {
  id: string;
  name: string;
  hindiName?: string;
  shortDescription: string;
  category: SchemeCategory;
  department: string;
  level: 'Central Government' | 'State Government';
  targetBeneficiaries: string[];
  eligibility: {
    minAge?: number;
    maxAge?: number;
    maxAnnualIncome?: number;
    occupation?: string[];
    gender?: 'All' | 'Female' | 'Male' | 'Other';
    landholdingLimitAcre?: number;
    criteriaSummary: string[];
    exclusions: string[];
  };
  benefits: {
    summary: string;
    financialAmount?: string;
    details: string[];
  };
  requiredDocuments: RequiredDocument[];
  applicationProcess: {
    mode: 'Online' | 'Offline' | 'Online & Offline (CSC)';
    steps: string[];
    offlineOffices?: string[];
  };
  officialUrl: string;
  helpline?: string;
  faqs?: { question: string; answer: string }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedQuestions?: string[];
  relatedSchemes?: { id: string; name: string; url: string }[];
  isError?: boolean;
}

export interface DocumentVerificationItem {
  name: string;
  status: 'passed' | 'warning' | 'error';
  details: string;
}

export interface DocumentAnalysisResult {
  documentType: string;
  confidence: 'High' | 'Medium' | 'Low';
  overallStatus: 'Verified & Ready' | 'Needs Attention' | 'Action Required';
  extractedInfo: {
    holderName?: string;
    idNumberMasked?: string;
    issuingAuthority?: string;
    issueDate?: string;
    validityOrExpiry?: string;
    incomeOrCategoryStated?: string;
    stateOrDistrict?: string;
    otherDetails?: Record<string, string>;
  };
  verificationChecks: DocumentVerificationItem[];
  detectedIssues: string[];
  plainLanguageSummary: string;
  recommendedFixes: string[];
  eligibleSchemes: { id: string; name: string; relevance: string }[];
  disclaimer: string;
}

export interface CitizenRight {
  id: string;
  title: string;
  actName: string;
  summary: string;
  category: 'Fundamental Rights' | 'Transparency & RTI' | 'Labor & Workers' | 'Women & Family' | 'Consumer Protection' | 'Senior Citizens';
  keyProtections: string[];
  howToExercise: string[];
  grievancePortal: {
    name: string;
    url: string;
    helpline?: string;
  };
}

export interface EligibilityProfile {
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  occupation: string;
  annualIncome: number;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  state: string;
  ownsLand: boolean;
  landAcres: number;
  isStudent: boolean;
  hasDisabledFamilyMember: boolean;
}

export interface EligibilityMatchResult {
  scheme: Scheme;
  matchScore: number; // 0 - 100
  status: 'Eligible' | 'Likely Eligible' | 'Check Conditions';
  reasons: string[];
  unmetOrMissingCriteria: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  age?: number;
  annualIncome?: number;
  state?: string;
  caste?: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  gender?: 'Female' | 'Male' | 'Other';
  occupation?: string;
  ownsLand?: boolean;
  landAcres?: number;
  isStudent?: boolean;
  hasCompletedProfile: boolean;
}

