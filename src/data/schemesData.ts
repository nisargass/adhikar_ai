import { Scheme } from '../types/index.ts';

export const SCHEMES: Scheme[] = [
  {
    id: 'pm-jay-ayushman-bharat',
    name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    hindiName: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
    shortDescription: 'World’s largest government-funded health assurance scheme providing cashless hospitalisation coverage up to ₹5 lakh per family per year.',
    category: 'Healthcare',
    department: 'National Health Authority (Ministry of Health & Family Welfare)',
    level: 'Central Government',
    targetBeneficiaries: [
      'Low-income households',
      'Rural families categorized under SECC 2011',
      'Occupational categories of urban workers families',
      'Senior citizens aged 70+ (expanded coverage)'
    ],
    eligibility: {
      criteriaSummary: [
        'Households listed in Socio-Economic Caste Census (SECC) 2011 database or NFSA ration card holders.',
        'Recently extended to all senior citizens aged 70 years and above irrespective of income.',
        'No restriction on family size, age, or gender.',
        'Pre-existing conditions covered from day one.'
      ],
      exclusions: [
        'Families with government employees or high-tax brackets unless covered under state-specific extensions.',
        'Families owning motorized vehicles, fishing boats, or large landholdings (as per SECC deprivation criteria).'
      ]
    },
    benefits: {
      summary: 'Up to ₹5,00,000 per family per year for secondary and tertiary hospitalisation care across 29,000+ empaneled public and private hospitals nationwide.',
      financialAmount: '₹5,00,000 / year / family',
      details: [
        'Cashless and paperless access to treatment at the point of service.',
        'Covers 1,949 medical and surgical procedures across 27 specialties.',
        'Covers 3 days of pre-hospitalisation and 15 days of post-hospitalisation expenses including medicines and diagnostics.',
        'No co-payment or application fees required.'
      ]
    },
    requiredDocuments: [
      {
        name: 'Aadhaar Card',
        isMandatory: true,
        purpose: 'Identity verification and biometric authentication',
        whereToGet: 'UIDAI Aadhaar Enrolment Center / e-Aadhaar online'
      },
      {
        name: 'Ration Card (NFSA / State)',
        isMandatory: true,
        purpose: 'Family unit verification and SECC database link',
        whereToGet: 'District Food and Civil Supplies Office / e-PDS portal'
      },
      {
        name: 'Active Mobile Number',
        isMandatory: true,
        purpose: 'OTP generation for Ayushman Card issuance',
        whereToGet: 'Telecom provider'
      }
    ],
    applicationProcess: {
      mode: 'Online & Offline (CSC)',
      steps: [
        'Visit beneficiary.nha.gov.in or download the Ayushman App.',
        'Log in using mobile number and Aadhaar OTP to check eligibility.',
        'If eligible, complete e-KYC by capturing a photo and verifying biometric/OTP details.',
        'Download the official plastic/digital Ayushman Card instantly.',
        'Alternatively, visit any empaneled hospital (Pradhan Mantri Arogya Mitra desk) or nearest Common Service Center (CSC).'
      ],
      offlineOffices: [
        'Pradhan Mantri Arogya Mitra Helpdesk at any Government/Empaneled Private Hospital',
        'Common Service Center (CSC) / Digital Seva Kendra'
      ]
    },
    officialUrl: 'https://beneficiary.nha.gov.in',
    helpline: '14555 / 1800-111-565',
    faqs: [
      {
        question: 'Do I need to pay any premium or fee to get the Ayushman Card?',
        answer: 'No. The Ayushman Card and its benefits are 100% free of charge for eligible citizens.'
      },
      {
        question: 'Can I use this card in another state?',
        answer: 'Yes. PM-JAY is portable nationwide; you can receive treatment in any empaneled hospital in any Indian state.'
      }
    ]
  },
  {
    id: 'pm-kisan-samman-nidhi',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    hindiName: 'प्रधानमंत्री किसान सम्मान निधि',
    shortDescription: 'Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families across India.',
    category: 'Agriculture & Farmers',
    department: 'Department of Agriculture and Farmers Welfare',
    level: 'Central Government',
    targetBeneficiaries: [
      'Small and marginal farmer families',
      'Cultivable landholder farmers'
    ],
    eligibility: {
      occupation: ['Farmer', 'Agricultural Landholder'],
      criteriaSummary: [
        'All landholding farmer families with cultivable landholding in their names.',
        'Applicable to both small/marginal and other landholding categories.',
        'Must complete mandatory e-KYC and have bank account linked with Aadhaar and NPCI DBT.'
      ],
      exclusions: [
        'Institutional landholders.',
        'Farmer families holding constitutional posts, former/present ministers, MPs/MLAs, mayors, or district panchayat chairpersons.',
        'Serving or retired officers and employees of central/state government departments and PSUs (excluding multi-tasking staff / Class IV).',
        'Persons who paid income tax in the last assessment year.',
        'Professionals like doctors, engineers, lawyers, and chartered accountants.'
      ]
    },
    benefits: {
      summary: 'Direct benefit transfer of ₹6,000 per financial year directly credited to the verified Aadhaar-seeded bank account in three four-monthly installments of ₹2,000 each.',
      financialAmount: '₹6,000 / year',
      details: [
        'Direct Bank Transfer (DBT) directly into farmer’s Aadhaar-linked bank account.',
        'Three 4-monthly installments: April–July, August–November, and December–March.',
        'Financial aid for purchasing seeds, fertilizers, farm inputs, and domestic needs.'
      ]
    },
    requiredDocuments: [
      {
        name: 'Aadhaar Card',
        isMandatory: true,
        purpose: 'Identity and mandatory e-KYC',
        whereToGet: 'UIDAI'
      },
      {
        name: 'Land Ownership Document (Khatauni / RoR / 7/12 extract)',
        isMandatory: true,
        purpose: 'Proof of cultivable landholding in applicant’s name',
        whereToGet: 'Revenue Department / Bhulekh web portal of state'
      },
      {
        name: 'Bank Passbook / Account Details with NPCI seeding',
        isMandatory: true,
        purpose: 'Direct Benefit Transfer (DBT)',
        whereToGet: 'Applicant’s bank branch'
      }
    ],
    applicationProcess: {
      mode: 'Online & Offline (CSC)',
      steps: [
        'Visit the PM-KISAN official portal (pmkisan.gov.in).',
        'Click on "New Farmer Registration" under Farmers Corner.',
        'Select Rural or Urban Farmer Registration and enter Aadhaar Number & Mobile Number.',
        'Fill land details (Khata / Khasra number, land transfer date) and upload land record copy.',
        'Submit for verification by District Nodal Officer / Patwari / Lekhpal.',
        'Complete OTP-based e-KYC or biometric e-KYC at CSC.'
      ],
      offlineOffices: [
        'Village Patwari / Lekhpal Office',
        'Block Agriculture Officer / Krishi Vigyan Kendra',
        'Common Service Center (CSC)'
      ]
    },
    officialUrl: 'https://pmkisan.gov.in',
    helpline: '155261 / 011-24300606',
    faqs: [
      {
        question: 'What should I do if my PM-KISAN installment is stopped?',
        answer: 'Common reasons include pending e-KYC, land record seeding mismatch, or NPCI bank account unlinking. Visit pmkisan.gov.in to verify "Know Your Status" and visit your bank to verify Aadhaar DBT seeding.'
      }
    ]
  },
  {
    id: 'pm-awas-yojana-urban-gramin',
    name: 'Pradhan Mantri Awas Yojana (PMAY - Urban & Gramin)',
    hindiName: 'प्रधानमंत्री आवास योजना (शहरी एवं ग्रामीण)',
    shortDescription: 'Credit-linked subsidy and direct financial assistance to build pucca houses with water, sanitation, and electricity connections for homeless and kutcha-house dwellers.',
    category: 'Housing & Urban',
    department: 'Ministry of Housing and Urban Affairs & Ministry of Rural Development',
    level: 'Central Government',
    targetBeneficiaries: [
      'Economically Weaker Section (EWS)',
      'Low Income Group (LIG)',
      'Rural homeless families living in kutcha or dilapidated houses',
      'Female-headed households and SC/ST communities'
    ],
    eligibility: {
      maxAnnualIncome: 600000,
      criteriaSummary: [
        'The beneficiary family should not own a pucca house in their name anywhere in India.',
        'For PMAY-G (Gramin): Households identified through SECC 2011 and Awas+ surveys.',
        'For PMAY-U: EWS (annual income up to ₹3 lakh) or LIG (annual income ₹3–6 lakh).',
        'Houses must ideally be registered in the name of the female head or joint ownership.'
      ],
      exclusions: [
        'Families already owning a pucca house in India.',
        'Families having received government housing aid under earlier schemes (Indira Awas Yojana).'
      ]
    },
    benefits: {
      summary: 'Direct financial assistance up to ₹1,20,000 (plains) to ₹1,30,000 (hilly/difficult areas) for PMAY-G, plus 90 days MGNREGA wages and ₹12,000 Swachh Bharat toilet grant. Up to ₹2.67 lakh interest subsidy under PMAY-U.',
      financialAmount: '₹1,20,000 to ₹2,67,000',
      details: [
        'PMAY-Gramin: ₹1.2 lakh (plain areas) and ₹1.3 lakh (hilly/NE states) directly transferred in 3-4 installments based on geo-tagged construction stages.',
        'Additional ₹12,000 for toilet construction under Swachh Bharat Mission-Gramin.',
        '90-95 days of unskilled labor wages under MGNREGA (worth approx. ₹20,000+).',
        'Mandatory provision of LPG connection (Ujjwala), electricity (Saubhagya), and tap water connection.'
      ]
    },
    requiredDocuments: [
      {
        name: 'Aadhaar Card of all family members',
        isMandatory: true,
        purpose: 'De-duplication and beneficiary verification',
        whereToGet: 'UIDAI'
      },
      {
        name: 'Bank Account Passbook (Aadhaar linked)',
        isMandatory: true,
        purpose: 'Direct stage-wise grant transfers',
        whereToGet: 'Bank'
      },
      {
        name: 'Income Certificate / BPL Certificate / Job Card',
        isMandatory: true,
        purpose: 'EWS/LIG or rural deprivation proof',
        whereToGet: 'Tehsildar / Gram Panchayat'
      },
      {
        name: 'Land / Plot Ownership document or Allotment letter',
        isMandatory: true,
        purpose: 'Verification of construction site',
        whereToGet: 'Revenue Office / Gram Panchayat'
      }
    ],
    applicationProcess: {
      mode: 'Online & Offline (CSC)',
      steps: [
        'For PMAY-G: Names are enlisted via Gram Sabha and Awas+ app through Panchayat Secretary / Village Pradhan.',
        'For PMAY-U: Apply online on pmaymis.gov.in under Citizen Assessment or via nearby CSC.',
        'Geo-tagging team inspects site before start, at plinth level, lintel level, and completion.',
        'Installments released directly to Aadhaar-seeded bank account upon geo-tag approval.'
      ],
      offlineOffices: [
        'Gram Panchayat Office / Block Development Office (BDO)',
        'Municipal Corporation / Urban Local Body (ULB) Housing Cell'
      ]
    },
    officialUrl: 'https://pmaymis.gov.in',
    helpline: '1800-11-6446 (PMAY-U) / 1800-11-6446 (PMAY-G)',
    faqs: [
      {
        question: 'Is having a bank account mandatory for receiving PMAY money?',
        answer: 'Yes. All payments are strictly made through Direct Benefit Transfer (DBT) into the beneficiary’s verified bank account.'
      }
    ]
  },
  {
    id: 'sukanya-samriddhi-yojana',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    hindiName: 'सुकन्या समृद्धि योजना',
    shortDescription: 'Government-backed savings scheme for the girl child offering one of the highest interest rates (8.2% p.a.), sovereign guarantee, and triple tax exemption (EEE).',
    category: 'Women & Child Development',
    department: 'Department of Posts & Ministry of Finance',
    level: 'Central Government',
    targetBeneficiaries: [
      'Girl children under 10 years of age',
      'Parents and legal guardians'
    ],
    eligibility: {
      minAge: 0,
      maxAge: 10,
      gender: 'Female',
      criteriaSummary: [
        'Account can be opened by natural or legal guardian for a girl child from birth up to 10 years of age.',
        'Maximum 2 accounts per family (allowed 3 in case of twin/triplet girl births).',
        'Account matures 21 years from the date of opening or on marriage after attaining 18 years.'
      ],
      exclusions: [
        'Girl child aged above 10 years at the time of account opening.',
        'Non-Resident Indians (NRIs) cannot open fresh SSY accounts.'
      ]
    },
    benefits: {
      summary: 'High sovereign-guaranteed interest rate (currently 8.2% p.a. compounded yearly), minimum deposit ₹250/year up to ₹1,50,000/year, and complete tax exemption on deposit, interest, and maturity under Section 80C.',
      financialAmount: '8.2% annual compounded return',
      details: [
        'Triple Tax Exemption (EEE): Contributions, interest earned, and maturity payouts are completely tax-free.',
        'Partial withdrawal up to 50% allowed after age 18 for higher education fees.',
        'Deposits required only for the first 15 years; account earns interest until 21 years.',
        'Can be easily transferred to any Post Office or authorized commercial bank anywhere in India.'
      ]
    },
    requiredDocuments: [
      {
        name: 'Birth Certificate of the Girl Child',
        isMandatory: true,
        purpose: 'Age and relationship proof',
        whereToGet: 'Municipal Corporation / Registrar of Births & Deaths'
      },
      {
        name: 'Aadhaar Card & PAN Card of Parent / Guardian',
        isMandatory: true,
        purpose: 'Guardian KYC verification',
        whereToGet: 'UIDAI / NSDL'
      },
      {
        name: 'Proof of Address (Electricity bill / Passport / Voter ID)',
        isMandatory: true,
        purpose: 'Residential proof',
        whereToGet: 'Utility authority / Election Commission'
      },
      {
        name: 'Passport size photographs of child and guardian',
        isMandatory: true,
        purpose: 'Passbook and account records',
        whereToGet: 'Studio'
      }
    ],
    applicationProcess: {
      mode: 'Offline',
      steps: [
        'Collect SSY Account Opening Form from any India Post Post Office or authorized Public/Private Bank branch (SBI, PNB, BoB, etc.).',
        'Fill in details of the girl child and parent/guardian.',
        'Attach copy of girl child’s birth certificate and guardian KYC documents.',
        'Deposit initial amount (minimum ₹250 in cash/cheque).',
        'Post office or bank will issue an SSY passbook with account number.'
      ],
      offlineOffices: [
        'Any Head Post Office or Sub-Post Office across India',
        'Authorized Commercial Banks (SBI, PNB, Canara, BoB, HDFC, ICICI, etc.)'
      ]
    },
    officialUrl: 'https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx',
    helpline: '1800-266-6868 (India Post)',
    faqs: [
      {
        question: 'What is the minimum annual deposit to keep the SSY account active?',
        answer: 'You must deposit at least ₹250 every financial year. Failure to do so attracts a nominal ₹50 default penalty plus minimum deposit.'
      }
    ]
  },
  {
    id: 'pm-mudra-yojana',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    hindiName: 'प्रधानमंत्री मुद्रा योजना',
    shortDescription: 'Collateral-free business loans up to ₹10 lakh (recently expanded up to ₹20 lakh under Tarun Plus) for non-farm micro and small enterprises.',
    category: 'Employment & Entrepreneurship',
    department: 'Department of Financial Services (Ministry of Finance)',
    level: 'Central Government',
    targetBeneficiaries: [
      'Micro-entrepreneurs',
      'Small shopkeepers, traders, and fruit/vegetable vendors',
      'Artisans, craftspersons, and small manufacturing units',
      'Self-employed youth and women entrepreneurs'
    ],
    eligibility: {
      minAge: 18,
      criteriaSummary: [
        'Any Indian citizen with a business plan for a non-farm sector income generating activity.',
        'Businesses in manufacturing, processing, trading, or service sectors.',
        'No default track record with any bank or financial institution.'
      ],
      exclusions: [
        'Large corporate entities or agriculture crop farming (allied agriculture like dairy/poultry is allowed).'
      ]
    },
    benefits: {
      summary: 'Collateral-free institutional loans divided into three categories: Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5,00,000), and Tarun (₹5,00,001 to ₹10,00,000 / ₹20,00,000).',
      financialAmount: 'Up to ₹10,00,000 - ₹20,00,000',
      details: [
        'Zero collateral or third-party guarantee required.',
        'Zero processing charges for Shishu and Kishore loans.',
        'MUDRA Debit Card provided for convenient working capital withdrawal.',
        'Repayment tenure up to 5 to 7 years with affordable interest rates.'
      ]
    },
    requiredDocuments: [
      {
        name: 'Aadhaar Card / Voter ID / Passport',
        isMandatory: true,
        purpose: 'Identity and citizenship proof',
        whereToGet: 'Government issuance'
      },
      {
        name: 'Proof of Business Address and Registration / Udyam Certificate',
        isMandatory: true,
        purpose: 'Verification of business existence',
        whereToGet: 'udyamregistration.gov.in (free online)'
      },
      {
        name: 'Bank Account Statements for last 6 months',
        isMandatory: true,
        purpose: 'Financial track record analysis',
        whereToGet: 'Bank'
      },
      {
        name: 'Project Report / Quotation for machinery or inventory',
        isMandatory: false,
        purpose: 'Justification of loan amount requested',
        whereToGet: 'Self-prepared or equipment vendor'
      }
    ],
    applicationProcess: {
      mode: 'Online & Offline (CSC)',
      steps: [
        'Visit udyamimitra.in portal or any bank branch (Commercial, RRB, Small Finance Bank, or MFI).',
        'Select the loan tier: Shishu, Kishore, or Tarun.',
        'Fill loan application form with business details and required loan amount.',
        'Upload KYC, Udyam registration, and bank statements.',
        'Upon sanction, the loan is disbursed and MUDRA Card issued.'
      ],
      offlineOffices: [
        'Any Commercial Bank / Regional Rural Bank / Small Finance Bank branch',
        'District Industries Centre (DIC)'
      ]
    },
    officialUrl: 'https://www.mudra.org.in',
    helpline: '1800-180-1111 / 1800-11-0001',
    faqs: [
      {
        question: 'Do I need to pledge land or gold to get a Mudra loan?',
        answer: 'No! As per RBI and Government of India directives, banks are strictly prohibited from asking for collateral security for MUDRA loans.'
      }
    ]
  },
  {
    id: 'pm-vishwakarma-yojana',
    name: 'PM Vishwakarma Yojana',
    hindiName: 'पीएम विश्वकर्मा योजना',
    shortDescription: 'Holistic support for traditional artisans and craftspeople including formal recognition (PM Vishwakarma Certificate & ID), ₹15,000 toolkit grant, and 5% subsidized collateral-free loans.',
    category: 'Employment & Entrepreneurship',
    department: 'Ministry of Micro, Small and Medium Enterprises',
    level: 'Central Government',
    targetBeneficiaries: [
      'Artisans and craftspeople working in 18 traditional trades',
      'Carpenters (Suthar), Blacksmiths (Lohar), Potters (Kumhaar), Sculptors (Moortikar), Cobblers (Charmakar), Masons (Rajmistri), Tailors (Darzi), Basket weavers, etc.'
    ],
    eligibility: {
      minAge: 18,
      criteriaSummary: [
        'An artisan or craftsperson working with hands and tools in one of the 18 specified traditional family-based trades.',
        'Only one member of the family is eligible for benefits.',
        'Should not have availed loans under similar credit schemes (PMEGP, PM SVANidhi, Mudra) in the past 5 years.'
      ],
      exclusions: [
        'Persons in regular government service and their immediate family members.'
      ]
    },
    benefits: {
      summary: 'PM Vishwakarma Certificate & ID Card, 5–7 days basic skill training with ₹500/day stipend, ₹15,000 modern toolkit grant voucher, and collateral-free enterprise credit up to ₹3 lakh at 5% interest.',
      financialAmount: '₹15,000 toolkit grant + ₹3,00,000 low-interest loan',
      details: [
        'Formal recognition as a Vishwakarma with digital ID card.',
        'Skill upgradation with ₹500 daily stipend during training.',
        '₹15,000 e-voucher / digital grant to purchase modern equipment and toolkits.',
        'Enterprise Development Loan: Tranche 1 up to ₹1,00,000 (18 months tenure) and Tranche 2 up to ₹2,00,000 (30 months tenure) at concessional 5% interest rate.',
        'Incentives for digital transactions (₹1 per transaction up to 100 transactions/month).'
      ]
    },
    requiredDocuments: [
      {
        name: 'Aadhaar Card',
        isMandatory: true,
        purpose: 'Biometric verification at CSC',
        whereToGet: 'UIDAI'
      },
      {
        name: 'Mobile Number linked with Aadhaar',
        isMandatory: true,
        purpose: 'OTP authentication',
        whereToGet: 'Telecom provider'
      },
      {
        name: 'Bank Passbook / Details',
        isMandatory: true,
        purpose: 'Direct stipend and toolkit grant credit',
        whereToGet: 'Bank'
      },
      {
        name: 'Ration Card (if available)',
        isMandatory: false,
        purpose: 'Family verification',
        whereToGet: 'Food & Civil Supplies Dept'
      }
    ],
    applicationProcess: {
      mode: 'Online & Offline (CSC)',
      steps: [
        'Visit nearest Common Service Center (CSC) with Aadhaar and bank details.',
        'CSC operator performs Aadhaar biometric authentication on pmvishwakarma.gov.in.',
        'Select your traditional trade from the 18 eligible categories.',
        'Stage 1 verification by Gram Panchayat / Urban Local Body executive.',
        'Stage 2 verification by District Implementation Committee.',
        'Download PM Vishwakarma Certificate and attend training at designated ITI/skill center.'
      ],
      offlineOffices: [
        'Common Service Center (CSC)',
        'Gram Panchayat Head / Gram Pradhan',
        'District Industries Centre (DIC)'
      ]
    },
    officialUrl: 'https://pmvishwakarma.gov.in',
    helpline: '1800-267-7777 / 011-23061500',
    faqs: [
      {
        question: 'Which trades are covered under PM Vishwakarma?',
        answer: '18 traditional trades including Carpenter, Boat Maker, Armorer, Blacksmith, Hammer & Tool Kit Maker, Locksmith, Sculptor, Goldsmith, Potter, Cobbler, Mason, Basket/Mat/Broom Maker, Doll & Toy Maker, Barber, Garland Maker, Washerman, Tailor, and Fishing Net Maker.'
      }
    ]
  },
  {
    id: 'post-matric-scholarship-sc-st-obc',
    name: 'Post-Matric Scholarship Scheme for SC / ST / OBC / EBC Students',
    hindiName: 'अनुसूचित जाति/जनजाति/अन्य पिछड़ा वर्ग हेतु पोस्ट-मैट्रिक छात्रवृत्ति',
    shortDescription: 'Centrally sponsored scholarship providing full compulsory tuition fees and monthly maintenance allowance for students pursuing post-Class 10 education.',
    category: 'Education & Scholarships',
    department: 'Ministry of Social Justice & Empowerment and Ministry of Tribal Affairs',
    level: 'Central Government',
    targetBeneficiaries: [
      'SC / ST / OBC / EBC students',
      'Students enrolled in Class 11, 12, ITI, Polytechnic, Diploma, Undergraduate, and Postgraduate programs'
    ],
    eligibility: {
      maxAnnualIncome: 250000,
      criteriaSummary: [
        'Student must belong to Scheduled Caste (SC), Scheduled Tribe (ST), or eligible OBC/EBC category.',
        'Total annual family income from all sources must not exceed ₹2,50,000 per annum.',
        'Student must have passed Class 10 / Matriculation or subsequent qualifying examination.',
        'Must be studying in a recognized government or accredited private institution.'
      ],
      exclusions: [
        'Students receiving full scholarship/stipend from other central or state government schemes.',
        'More than two boys from the same parents (rule relaxed for girls).'
      ]
    },
    benefits: {
      summary: '100% reimbursement of compulsory non-refundable college/university tuition fees plus monthly maintenance allowance up to ₹13,500/year for hostellers and ₹7,000/year for day scholars.',
      financialAmount: 'Full Tuition Fee + ₹4,000 to ₹13,500/yr allowance',
      details: [
        'Complete waiver/reimbursement of institutional tuition, library, examination, and laboratory fees.',
        'Maintenance allowance paid directly to student’s Aadhaar-linked bank account via DBT.',
        'Special allowances for study tours, thesis typing, and disability allowances for students with benchmark disabilities.'
      ]
    },
    requiredDocuments: [
      {
        name: 'Caste Certificate issued by competent authority',
        isMandatory: true,
        purpose: 'Social category verification',
        whereToGet: 'Tehsildar / Sub-Divisional Magistrate (SDM) / State e-District portal'
      },
      {
        name: 'Income Certificate (current financial year)',
        isMandatory: true,
        purpose: 'Verification of family income ceiling (≤ ₹2.5 Lakh)',
        whereToGet: 'Revenue Department / Revenue Inspector / Tehsildar'
      },
      {
        name: 'Aadhaar Card of Student',
        isMandatory: true,
        purpose: 'Aadhaar-based biometric or OTP authentication',
        whereToGet: 'UIDAI'
      },
      {
        name: 'Marksheet of previous qualifying examination (Class 10 / 12)',
        isMandatory: true,
        purpose: 'Academic qualification verification',
        whereToGet: 'School / Education Board'
      },
      {
        name: 'Current Institution Fee Receipt & Bonafide Certificate',
        isMandatory: true,
        purpose: 'Proof of admission and actual payable fee verification',
        whereToGet: 'College / Institute Administration'
      }
    ],
    applicationProcess: {
      mode: 'Online',
      steps: [
        'Visit National Scholarship Portal (scholarships.gov.in) or state scholarship portal.',
        'Register for One-Time Registration (OTR) using Aadhaar and mobile number.',
        'Fill academic, institutional, and bank account details.',
        'Upload caste certificate, income certificate, and fee receipts.',
        'Submit application online; college/institute nodal officer verifies the application.',
        'District Welfare Officer approves the scholarship and DBT transfer is credited.'
      ],
      offlineOffices: [
        'College / University Scholarship Nodal Desk',
        'District Social Welfare Office (Samaj Kalyan Vibhag)'
      ]
    },
    officialUrl: 'https://scholarships.gov.in',
    helpline: '0120-6619540',
    faqs: [
      {
        question: 'Does my bank account need to be in my name or can I use my father’s account?',
        answer: 'The bank account MUST be strictly in the student’s own name and seeded with Aadhaar on the NPCI mapper for DBT transfer.'
      }
    ]
  },
  {
    id: 'pm-ujjwala-yojana',
    name: 'Pradhan Mantri Ujjwala Yojana (PMUY 2.0)',
    hindiName: 'प्रधानमंत्री उज्ज्वला योजना 2.0',
    shortDescription: 'Free LPG gas connection with zero deposit, free first refill, and stove for adult women from poor and underprivileged households.',
    category: 'Women & Child Development',
    department: 'Ministry of Petroleum and Natural Gas',
    level: 'Central Government',
    targetBeneficiaries: [
      'Adult women of BPL and economically weak households',
      'SC/ST households, PMAY beneficiaries, Antyodaya Anna Yojana (AAY) families, and forest dwellers'
    ],
    eligibility: {
      minAge: 18,
      gender: 'Female',
      criteriaSummary: [
        'Applicant must be an adult woman aged 18 years or older.',
        'There should not be any other existing LPG connection in the same household.',
        'Belonging to eligible categories: SC/ST, PMAY (Gramin), AAY, Most Backward Classes, Tea Garden tribes, Forest dwellers, or poor household as per 14-point declaration.'
      ],
      exclusions: [
        'Households already having an active LPG connection from any OMC (Indane, Bharat Gas, HP Gas).'
      ]
    },
    benefits: {
      summary: 'Deposit-free LPG connection, free domestic gas stove (chulha), and free first 14.2 kg LPG cylinder refill, plus targeted ₹300 per cylinder subsidy on up to 12 refills a year.',
      financialAmount: 'Free connection (worth ₹1,600) + ₹300/cylinder subsidy',
      details: [
        'Zero security deposit for cylinder and pressure regulator.',
        'Free first LPG cylinder refill.',
        'Free ISI-certified hotplate / stove.',
        'Subsidized refill prices with direct ₹300/cylinder subsidy transferred directly to bank account.'
      ]
    },
    requiredDocuments: [
      {
        name: 'Aadhaar Card of the woman applicant and adult family members',
        isMandatory: true,
        purpose: 'Identity and address proof',
        whereToGet: 'UIDAI'
      },
      {
        name: 'Ration Card / Family Composition Certificate',
        isMandatory: true,
        purpose: 'Family composition and proof of no prior connection',
        whereToGet: 'Food & Civil Supplies Department'
      },
      {
        name: 'Bank Account Passbook (Aadhaar linked)',
        isMandatory: true,
        purpose: 'DBT subsidy transfer',
        whereToGet: 'Bank'
      },
      {
        name: 'Self-declaration for migrant families (if living away from home address)',
        isMandatory: false,
        purpose: 'Address verification for migrants under Ujjwala 2.0 without local ration card',
        whereToGet: 'Downloadable form on pmuy.gov.in'
      }
    ],
    applicationProcess: {
      mode: 'Online & Offline (CSC)',
      steps: [
        'Apply online on pmuy.gov.in or directly visit nearest LPG distributor (Indane, Bharat Gas, or HP Gas).',
        'Fill in Ujjwala 2.0 application form with applicant woman details.',
        'Attach Aadhaar copies of all adult family members and bank passbook.',
        'Distributor conducts de-duplication check across all oil marketing companies.',
        'LPG connection is issued and safety demonstration provided.'
      ],
      offlineOffices: [
        'Nearest LPG Gas Agency Distributor (Indane / BharatGas / HP Gas)',
        'Common Service Center (CSC)'
      ]
    },
    officialUrl: 'https://pmuy.gov.in',
    helpline: '1800-266-6696 / 1906 (Emergency)',
    faqs: [
      {
        question: 'Can migrant workers get Ujjwala 2.0 without a local address proof?',
        answer: 'Yes! Under Ujjwala 2.0, migrant families only need to submit a simple self-declaration of address; no proof of local residence is mandated.'
      }
    ]
  },
  {
    id: 'atal-pension-yojana',
    name: 'Atal Pension Yojana (APY)',
    hindiName: 'अटल पेंशन योजना',
    shortDescription: 'Government-guaranteed pension scheme for workers in the unorganized sector providing ₹1,000 to ₹5,000 monthly pension from age 60.',
    category: 'Social Security & Pensions',
    department: 'Pension Fund Regulatory and Development Authority (PFRDA)',
    level: 'Central Government',
    targetBeneficiaries: [
      'Unorganized sector workers',
      'Domestic workers, drivers, agricultural laborers, daily wage earners, gig workers',
      'Indian citizens aged 18 to 40'
    ],
    eligibility: {
      minAge: 18,
      maxAge: 40,
      criteriaSummary: [
        'Any Indian citizen between 18 and 40 years of age.',
        'Must have a savings bank account or post office savings bank account.',
        'Should not be an income taxpayer (rule effective from October 1, 2022).'
      ],
      exclusions: [
        'Any citizen who is or has been an income tax payer under the Income-tax Act, 1961.'
      ]
    },
    benefits: {
      summary: 'Guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month starting at age 60 till death, with spouse pension continuation and return of corpus to nominee.',
      financialAmount: '₹1,000 to ₹5,000 / month lifetime pension',
      details: [
        '100% sovereign government guarantee on the minimum pension amount.',
        'After subscriber’s death, same pension amount continues to the spouse for life.',
        'After spouse’s demise, the entire accumulated pension wealth (up to ₹8.5 lakh) is paid to the nominee.',
        'Low monthly contributions (e.g. ₹42/month at age 18 for ₹1,000 pension, or ₹210/month for ₹5,000 pension).'
      ]
    },
    requiredDocuments: [
      {
        name: 'Aadhaar Card',
        isMandatory: true,
        purpose: 'Identity and KYC',
        whereToGet: 'UIDAI'
      },
      {
        name: 'Active Savings Bank Account with Auto-Debit mandate',
        isMandatory: true,
        purpose: 'Automatic deduction of monthly/quarterly contribution',
        whereToGet: 'Bank or Post Office'
      },
      {
        name: 'Active Mobile Number',
        isMandatory: true,
        purpose: 'Transaction SMS and PRAN activation',
        whereToGet: 'Telecom provider'
      }
    ],
    applicationProcess: {
      mode: 'Online & Offline (CSC)',
      steps: [
        'Visit your bank branch where you hold a savings account or log in to Netbanking / Mobile Banking app.',
        'Fill in the APY registration form with nominee details and choose desired monthly pension (₹1,000 to ₹5,000).',
        'Enable auto-debit facility for monthly/quarterly contribution.',
        'Permanent Retirement Account Number (PRAN) card is generated instantly.'
      ],
      offlineOffices: [
        'Any Commercial Bank / Regional Rural Bank / Cooperative Bank branch',
        'Post Office Savings Bank counter'
      ]
    },
    officialUrl: 'https://npscra.nsdl.co.in/scheme-details.php',
    helpline: '1800-110-069',
    faqs: [
      {
        question: 'What happens if I stop paying contributions in between?',
        answer: 'You can regularize the account by paying overdue contributions along with a very nominal late fee (₹1 to ₹10 per month). The account remains active.'
      }
    ]
  },
  {
    id: 'mgnrega-job-card',
    name: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    hindiName: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (मनरेगा)',
    shortDescription: 'Legal guarantee of at least 100 days of wage employment in a financial year to every rural household whose adult members volunteer to do unskilled manual work.',
    category: 'Employment & Entrepreneurship',
    department: 'Ministry of Rural Development',
    level: 'Central Government',
    targetBeneficiaries: [
      'Rural households willing to do manual unskilled work',
      'Small and marginal farmers during agricultural lean seasons',
      'Rural women (at least one-third of beneficiaries mandated to be women)'
    ],
    eligibility: {
      minAge: 18,
      criteriaSummary: [
        'Must be a citizen of India residing in rural areas.',
        'All adult members of a rural household can register.',
        'Must be willing to do unskilled manual labor.'
      ],
      exclusions: [
        'Urban residents (except where state urban employment guarantee schemes exist).'
      ]
    },
    benefits: {
      summary: 'Statutory guarantee of 100 days wage employment per household per year within 5 km of village. If work is not provided within 15 days of demand, statutory Unemployment Allowance must be paid.',
      financialAmount: 'Daily notified state wage (₹234 - ₹374/day)',
      details: [
        'Guaranteed work within 15 days of submitting application; otherwise unemployment allowance is mandatory under law.',
        'Equal wages for men and women.',
        'Worksite facilities including drinking water, shade, crèche facility for children, and first-aid kits.',
        'Wages directly deposited into worker’s Aadhaar-based bank/post office account within 15 days of muster roll closure.'
      ]
    },
    requiredDocuments: [
      {
        name: 'Aadhaar Card of all adult applicants',
        isMandatory: true,
        purpose: 'Identity and ABPS (Aadhaar-based Payment System)',
        whereToGet: 'UIDAI'
      },
      {
        name: 'Proof of Rural Residence (Ration Card / Voter ID)',
        isMandatory: true,
        purpose: 'Verification of residence in Gram Panchayat jurisdiction',
        whereToGet: 'Food Department / Election Commission'
      },
      {
        name: 'Bank or Post Office Passbook',
        isMandatory: true,
        purpose: 'Wage direct payment',
        whereToGet: 'Bank or Post Office'
      },
      {
        name: 'Passport size photographs of household members',
        isMandatory: true,
        purpose: 'Pasting on MGNREGA Job Card',
        whereToGet: 'Studio'
      }
    ],
    applicationProcess: {
      mode: 'Offline',
      steps: [
        'Submit written or oral application for Job Card to Gram Panchayat / Program Officer.',
        'Panchayat verifies residence and enters household details into NREGASoft.',
        'Job Card issued free of cost within 15 days of application.',
        'Submit written work demand application (Form 4) specifying dates needed.',
        'Gram Panchayat assigns work on village ponds, roads, afforestation, or land leveling.'
      ],
      offlineOffices: [
        'Gram Panchayat Bhawan / Panchayat Secretary',
        'Block Development Office (BDO) / Program Officer'
      ]
    },
    officialUrl: 'https://nrega.nic.in',
    helpline: '1800-111-555',
    faqs: [
      {
        question: 'Do I have to pay any fee for the MGNREGA Job Card?',
        answer: 'No. The Job Card is issued completely free of cost. Gram Panchayats are strictly prohibited from demanding any charges.'
      }
    ]
  },
  {
    id: 'pm-svanidhi-scheme',
    name: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)',
    hindiName: 'पीएम स्वनिधि योजना (स्ट्रीट वेंडर्स)',
    shortDescription: 'Collateral-free working capital micro-loans starting from ₹10,000 to ₹50,000 with 7% interest subsidy and cashback for street vendors and hawkers.',
    category: 'Employment & Entrepreneurship',
    department: 'Ministry of Housing and Urban Affairs',
    level: 'Central Government',
    targetBeneficiaries: [
      'Street vendors, roadside hawkers, thelewala, rehri-patri shopkeepers',
      'Vendors vending in urban, peri-urban, and rural areas'
    ],
    eligibility: {
      criteriaSummary: [
        'Street vendors in possession of Certificate of Vending / Identity Card issued by Urban Local Bodies (ULBs).',
        'Vendors identified in survey but not issued certificate, or vendors who left during COVID and returned.',
        'Vendors of peri-urban / rural areas vending in geographical limits of ULBs with recommendation letter (LoR).'
      ],
      exclusions: [
        'Non-vendors or vendors engaged in non-vending activities.'
      ]
    },
    benefits: {
      summary: 'Tranche 1 loan up to ₹10,000 (1 year tenure). On timely repayment, eligible for Tranche 2 loan up to ₹20,000, and Tranche 3 loan up to ₹50,000. Interest subsidy of 7% p.a. credited directly.',
      financialAmount: '₹10,000 to ₹50,000 collateral-free',
      details: [
        'No collateral required.',
        '7% interest subsidy credited directly to bank account on early/timely repayment.',
        'Digital transaction cashback up to ₹100 per month (₹1,200/year).',
        'No prepayment penalty.'
      ]
    },
    requiredDocuments: [
      {
        name: 'Aadhaar Card',
        isMandatory: true,
        purpose: 'Identity and KYC',
        whereToGet: 'UIDAI'
      },
      {
        name: 'Certificate of Vending (CoV) / Vendor ID Card / Letter of Recommendation (LoR)',
        isMandatory: true,
        purpose: 'Proof of vending status',
        whereToGet: 'Town Vending Committee (TVC) / Municipal Corporation'
      },
      {
        name: 'Bank Account Passbook (Aadhaar linked)',
        isMandatory: true,
        purpose: 'Direct loan disbursal and subsidy deposit',
        whereToGet: 'Bank'
      }
    ],
    applicationProcess: {
      mode: 'Online & Offline (CSC)',
      steps: [
        'Visit pmsvanidhi.mohua.gov.in or download the PM SVANidhi App.',
        'Log in with Aadhaar-linked mobile number.',
        'Verify Certificate of Vending (CoV) or request Letter of Recommendation (LoR) from Town Vending Committee.',
        'Select preferred lending institution (Bank / MFI / NBFC).',
        'Submit application; loan is disbursed within 7 to 14 days directly into bank account.'
      ],
      offlineOffices: [
        'Urban Local Body (Municipality / Nagar Nigam) Vending Cell',
        'Common Service Center (CSC)'
      ]
    },
    officialUrl: 'https://pmsvanidhi.mohua.gov.in',
    helpline: '1800-11-1979',
    faqs: [
      {
        question: 'What if I do not have a vending certificate yet?',
        answer: 'You can apply for a Letter of Recommendation (LoR) online on the PM SVANidhi portal or through your Municipal Corporation/Nagar Palika Town Vending Committee.'
      }
    ]
  }
];
