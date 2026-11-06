import React, { useState } from 'react';
import { 
  Upload, 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  RotateCcw, 
  FileText, 
  ArrowRight,
  Info,
  Clock,
  Printer,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { DocumentAnalysisResult } from '../types/index.ts';

interface DocumentDoctorViewProps {
  onViewScheme: (schemeId: string) => void;
}

export const DocumentDoctorView: React.FC<DocumentDoctorViewProps> = ({ onViewScheme }) => {
  // Phase state: 1 = Selection/Upload, 2 = Processing, 3 = Diagnostic Results
  const [phase, setPhase] = useState<1 | 2 | 3>(1);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [textContent, setTextContent] = useState('');
  const [documentCategory, setDocumentCategory] = useState('Income Certificate');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DocumentAnalysisResult | null>(null);

  // Realistic sample public documents for instant testing
  const sampleDocuments = [
    {
      title: 'State Income Certificate (Valid)',
      category: 'Income Certificate',
      summary: 'Uttar Pradesh e-District Income Certificate issued on 12-June-2024. Declared annual family income ₹48,000.',
      text: `GOVERNMENT OF UTTAR PRADESH - REVENUE DEPARTMENT
e-District Portal Certificate No: ED/2024/7829104
CERTIFICATE OF INCOME (आय प्रमाण पत्र)
This is to certify that Shri Rajesh Kumar, S/o Shri Ram Prasad, Resident of Village: Madanpur, Tehsil: Sadar, District: Gorakhpur, Uttar Pradesh.
Declared Annual Family Income: Rs. 48,000/- (Rupees Forty Eight Thousand Only).
Issuing Authority: Tehsildar, Sadar, Gorakhpur.
Date of Issue: 12-06-2024.
Validity: 3 Financial Years from date of issue (Valid up to 31-03-2027).
Verification URL: edistrict.up.gov.in (Digitally signed by Tehsildar with official QR barcode).`,
    },
    {
      title: 'Central OBC Certificate (Expired / Old)',
      category: 'Caste / Category Certificate',
      summary: 'Central OBC Certificate issued in 2020. Warning: Non-Creamy Layer income status is over 3 years old.',
      text: `FORM OF CERTIFICATE TO BE PRODUCED BY OTHER BACKWARD CLASSES
Certificate No: OBC/DIST/2020/4192
This is to certify that Smt. Sunita Verma, Daughter of Shri Ramesh Verma, Resident of Ward No. 4, Bilaspur, Chhattisgarh.
Belongs to the Kurmi community recognized as a Backward Class under Government of India Resolution No. 12011/68/93-BCC(C).
This is also to certify that she does not belong to the Creamy Layer.
Date of Issue: 18-08-2020.
Issuing Authority: Sub-Divisional Officer (Civil), Bilaspur.
Seal: Office of the Sub-Divisional Magistrate.`,
    },
    {
      title: 'PM-KISAN Land Record (Khatauni Extract)',
      category: 'Land Record',
      summary: 'Bhulekh record extract with joint family ownership and name variation.',
      text: `STATE REVENUE BOARD - COMPUTERIZED ROHTAK KHATAUNI EXTRACT
Fasli Year: 1431 (2023-2024)
Khata Number: 00142 | Khasra Number: 312/1, 312/2
Total Area: 0.8500 Hectare (approx 2.1 Acres cultivable land)
Shareholders (खातेदार):
1. Harish Chand S/o Late Mohan Lal (1/2 share - 0.4250 Hec)
2. Suresh Chand S/o Late Mohan Lal (1/2 share - 0.4250 Hec)
Note on Aadhaar linkage: Name on Aadhaar is 'Harish Chandra' whereas Land record states 'Harish Chand'.
Lekhpal Remark: Land is clear of institutional mortgages. Verification date: 05-01-2024.`,
    },
    {
      title: 'Bank Passbook & NPCI Seeding Statement',
      category: 'Bank Passbook',
      summary: 'State Bank of India passbook copy with DBT / Aadhaar seeding confirmation.',
      text: `STATE BANK OF INDIA - BRANCH: KANPUR MAIN (00128)
Savings Account No: 39820192812
Account Holder: Rameshwar Prasad
Aadhaar Number Linked: XXXX-XXXX-4819
NPCI Direct Benefit Transfer (DBT) Status: ACTIVE / ENABLED
Date of Account Opening: 14-02-2018
Last Transaction Date: 02-10-2024
Customer Care: 1800-425-3800`,
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit. Please upload a smaller document.');
        return;
      }
      setSelectedFile(file);
      setTextContent('');
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample: typeof sampleDocuments[0]) => {
    setSelectedFile(null);
    setFilePreview(null);
    setTextContent(sample.text);
    setDocumentCategory(sample.category);
    setError(null);
  };

  const handleClearSelection = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setTextContent('');
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile && !textContent.trim()) {
      setError('Please select or upload a document to begin inspection.');
      return;
    }

    setPhase(2);
    setLoading(true);
    setError(null);

    try {
      let bodyPayload: any = {
        documentCategory,
      };

      if (filePreview && selectedFile) {
        bodyPayload.imageBase64 = filePreview;
        bodyPayload.mimeType = selectedFile.type;
      } else {
        bodyPayload.textContent = textContent;
      }

      const res = await fetch('/api/document-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to inspect document.');
      }

      setResult(data.data);
      setPhase(3);
    } catch (err: any) {
      console.error('Document Doctor inspection error:', err);
      setError(err?.message || 'Error occurred while inspecting document. Please try again.');
      setPhase(1);
    } finally {
      setLoading(false);
    }
  };

  const handleResetWorkflow = () => {
    setPhase(1);
    setSelectedFile(null);
    setFilePreview(null);
    setTextContent('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
          <span>Three-Phase Inspection Workflow</span>
          <span>·</span>
          <span>Zero Document Storage</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
          <span>Document Doctor</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
            Pre-Application Auditor
          </span>
        </h1>
        <p className="text-slate-600 text-sm mt-1 leading-relaxed">
          More than 40% of government scheme applications get rejected due to avoidable paperwork flaws—expired income certificates, unverified digital signatures, name spelling discrepancies, or unlinked bank accounts. Document Doctor reviews your certificates before you submit.
        </p>
      </div>

      {/* Progress Steps Indicator */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
        <div
          className={`p-3 rounded-xl border transition-all ${
            phase === 1
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : phase > 1
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-white text-slate-400 border-slate-200'
          }`}
        >
          Phase 1: Select or Upload
        </div>
        <div
          className={`p-3 rounded-xl border transition-all ${
            phase === 2
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : phase > 2
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-white text-slate-400 border-slate-200'
          }`}
        >
          Phase 2: Deep AI Audit
        </div>
        <div
          className={`p-3 rounded-xl border transition-all ${
            phase === 3
              ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
              : 'bg-white text-slate-400 border-slate-200'
          }`}
        >
          Phase 3: Diagnostic Report & Fixes
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block">Inspection Notice</span>
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-rose-500 hover:text-rose-700 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* PHASE 1: SELECTION AND UPLOAD */}
      {phase === 1 && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Document Category Picker */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              1. Document Type Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                'Income Certificate',
                'Caste / Category Certificate',
                'Land Record (Khatauni)',
                'Aadhaar / Identity Proof',
                'Bank Passbook / NPCI',
                'Ration Card / PDS',
                'Domicile / Residence',
                'Student Marksheet',
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setDocumentCategory(cat)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                    documentCategory === cat
                      ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Box or Paste/Sample */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Area */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Option A: Upload Certificate Image / Scan
                </h3>
                <p className="text-xs text-slate-500">
                  Accepts PNG, JPG, or PDF scans (up to 10MB).
                </p>
              </div>

              <label className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-teal-50/20">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-xs font-bold text-slate-800">
                  Click to select file or drag & drop
                </span>
                <span className="text-[11px] text-slate-400 mt-1">
                  Photos taken from mobile phones are supported
                </span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {selectedFile && (
                <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-teal-700 shrink-0" />
                    <span className="font-semibold text-teal-950 truncate">{selectedFile.name}</span>
                    <span className="text-slate-500">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button
                    onClick={handleClearSelection}
                    className="text-rose-600 hover:text-rose-800 font-bold ml-2 shrink-0"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Realistic Samples */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Option B: Test with Realistic Sample Documents
                </h3>
                <p className="text-xs text-slate-500">
                  Try one-click samples modeled after genuine Indian public service formats.
                </p>
              </div>

              <div className="space-y-2">
                {sampleDocuments.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(s)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-left hover:border-teal-400 hover:bg-slate-50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 group-hover:text-teal-700">
                        {s.title}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {s.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {s.summary}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Preview / Text confirmation */}
          {(filePreview || textContent) && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Active Document Content for Inspection
                </span>
                <button
                  onClick={handleClearSelection}
                  className="text-xs text-slate-500 hover:text-rose-600"
                >
                  Clear Selection
                </button>
              </div>

              {filePreview && (
                <div className="max-h-60 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center p-2">
                  <img
                    src={filePreview}
                    alt="Document Scan Preview"
                    className="max-h-56 object-contain rounded"
                  />
                </div>
              )}

              {textContent && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {textContent}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleAnalyze}
                  className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-md flex items-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Run Document Doctor Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Privacy Guarantee Box */}
          <div className="bg-slate-100 p-4 rounded-xl text-xs text-slate-600 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Citizen Privacy Commitment</span>
              <span>
                Document Doctor extracts data in temporary volatile memory to inspect eligibility and identify errors. We do not store, log, or sell your documents or identity cards.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: PROCESSING STATE */}
      {phase === 2 && (
        <div className="py-16 text-center space-y-6 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs animate-in fade-in duration-150">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto shadow-sm">
            <Sparkles className="w-7 h-7 animate-spin" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900">
              Inspecting Document with Document Doctor
            </h3>
            <p className="text-xs text-slate-500">
              Checking validity period, issuing department seals, name spelling consistency, and scheme eligibility parameters...
            </p>
          </div>

          <div className="max-w-xs mx-auto space-y-2 text-left text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Scanning document structure & QR seal</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Parsing holder metadata & income stated</span>
            </div>
            <div className="flex items-center gap-2 text-teal-700 font-semibold animate-pulse">
              <Clock className="w-4 h-4" />
              <span>Checking against official scheme rules...</span>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: DIAGNOSTIC AUDIT REPORT */}
      {phase === 3 && result && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Status Card */}
          <div
            className={`p-6 rounded-2xl border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              result.overallStatus === 'Verified & Ready'
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                : result.overallStatus === 'Needs Attention'
                ? 'bg-amber-50/70 border-amber-300 text-amber-950'
                : 'bg-rose-50/70 border-rose-300 text-rose-950'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider opacity-75">
                  Audit Verdict
                </span>
                <span className="text-xs font-medium">· Confidence: {result.confidence}</span>
              </div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {result.overallStatus === 'Verified & Ready' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : result.overallStatus === 'Needs Attention' ? (
                  <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                )}
                <span>{result.overallStatus}</span>
              </h2>
              <p className="text-xs sm:text-sm max-w-xl opacity-90 leading-relaxed">
                {result.plainLanguageSummary}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-white/80 hover:bg-white text-slate-800 border border-slate-300 shadow-2xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save</span>
              </button>
              <button
                onClick={handleResetWorkflow}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-2xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Audit</span>
              </button>
            </div>
          </div>

          {/* Extracted Metadata Grid */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              1. Extracted Document Identity
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Document Type</span>
                <span className="font-bold text-slate-900">{result.documentType}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Holder Name</span>
                <span className="font-bold text-slate-900">{result.extractedInfo.holderName || 'Not Detected'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Certificate / ID No.</span>
                <span className="font-mono font-bold text-slate-900">{result.extractedInfo.idNumberMasked || 'Not Specified'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Issuing Authority</span>
                <span className="font-bold text-slate-900">{result.extractedInfo.issuingAuthority || 'Local Authority'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Issue Date</span>
                <span className="font-bold text-slate-900">{result.extractedInfo.issueDate || 'Undated'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Validity Status</span>
                <span className="font-bold text-teal-800">{result.extractedInfo.validityOrExpiry || 'Standard Scheme Period'}</span>
              </div>
            </div>

            {result.extractedInfo.incomeOrCategoryStated && (
              <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl text-xs text-teal-950 flex items-center justify-between">
                <span>Declared Income or Category on Certificate:</span>
                <span className="font-bold text-teal-900">{result.extractedInfo.incomeOrCategoryStated}</span>
              </div>
            )}
          </div>

          {/* Verification Checklist Items */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              2. Technical & Compliance Verification Checks
            </h3>

            <div className="space-y-2.5">
              {result.verificationChecks.map((check, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border text-xs flex items-start gap-3 bg-slate-50 border-slate-200"
                >
                  {check.status === 'passed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : check.status === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-slate-900">{check.name}</span>
                      <span
                        className={`text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded ${
                          check.status === 'passed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : check.status === 'warning'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {check.status}
                      </span>
                    </div>
                    <p className="text-slate-600">{check.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detected Issues & How to Fix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Issues */}
            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-200/80 space-y-3">
              <h4 className="font-bold text-amber-950 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Detected Risks or Potential Rejection Points</span>
              </h4>
              {result.detectedIssues.length === 0 ? (
                <p className="text-xs text-emerald-800 font-medium">
                  ✓ No critical defects or rejection triggers detected in this document.
                </p>
              ) : (
                <ul className="space-y-2 text-xs text-slate-800">
                  {result.detectedIssues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-700 font-bold">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recommended Fixes */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700" />
                <span>Recommended Citizen Action Plan</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {result.recommendedFixes.map((fix, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Matched Government Schemes */}
          {result.eligibleSchemes && result.eligibleSchemes.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                3. High-Value Government Schemes Requiring This Document
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.eligibleSchemes.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 mb-1">{s.name}</h4>
                      <p className="text-[11px] text-slate-600">{s.relevance}</p>
                    </div>
                    <button
                      onClick={() => onViewScheme(s.id)}
                      className="mt-3 text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 self-start"
                    >
                      <span>View Scheme Details & Checklist</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Disclaimer */}
          <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-500">
            <span className="font-bold text-slate-700 block mb-0.5">Official Verification Reminder:</span>
            {result.disclaimer || 'AdhikarAI Document Doctor provides advisory pre-screening. Acceptance of any certificate is subject to official verification by the concerned department or authority.'}
          </div>
        </div>
      )}
    </div>
  );
};
