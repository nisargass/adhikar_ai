import { CitizenRight } from '../types/index.ts';

export const CITIZEN_RIGHTS: CitizenRight[] = [
  {
    id: 'right-to-information-rti',
    title: 'Right to Information (RTI)',
    actName: 'Right to Information Act, 2005',
    summary: 'Empowers every Indian citizen to question public authorities, demand government files, inspect public works, and obtain certified copies of official documents.',
    category: 'Transparency & RTI',
    keyProtections: [
      'Mandatory response within 30 days of application (or within 48 hours if it concerns a person’s life or liberty).',
      'No need to give reasons for seeking information, only contact address required.',
      'Affordable standard fee of only ₹10 (free for citizens below poverty line).',
      'Penalties of ₹250/day (up to ₹25,000) on Public Information Officers (PIOs) for unreasonable delay, destruction, or refusal of information.'
    ],
    howToExercise: [
      'Draft a simple query specifying the government department and exact information needed.',
      'File online via rtionline.gov.in (for Central ministries) or state RTI portals.',
      'Or submit physical application on plain paper to the Public Information Officer (PIO) with a ₹10 Postal Order / Court Fee stamp.',
      'If no response is received in 30 days or info is unsatisfactory, file a First Appeal to the First Appellate Authority within 30 days.'
    ],
    grievancePortal: {
      name: 'Central RTI Online Portal',
      url: 'https://rtionline.gov.in',
      helpline: '011-24660000'
    }
  },
  {
    id: 'right-to-education-rte',
    title: 'Right to Free & Compulsory Education (RTE)',
    actName: 'Right of Children to Free and Compulsory Education Act, 2009',
    summary: 'Guarantees free and compulsory elementary education to every child aged 6 to 14 years in neighborhood schools.',
    category: 'Fundamental Rights',
    keyProtections: [
      'Zero tuition fees, admission fees, or capitation fees allowed in elementary education.',
      'Mandatory 25% reservation of seats in entry-level classes (Nursery / Class 1) of all unaided private schools for children from Economically Weaker Sections (EWS) and disadvantaged groups.',
      'Prohibition of screening procedures, interviews of child/parents, or denial of admission for lack of birth certificate.',
      'Strict ban on physical punishment, mental harassment, and private tuition by school teachers.'
    ],
    howToExercise: [
      'Check your state’s RTE 25% admission portal (e.g. rte25.upsdc.gov.in, rte.maharashtra.gov.in) during admission window (typically Jan–March).',
      'Provide basic documents: Child birth certificate or self-declaration, Aadhaar, and family Income/Caste Certificate.',
      'Lottery system allocates private school seats without any screening or fees.',
      'If any school demands donation or denies admission, lodge complaint with the District Basic Education Officer (BSA) or NCPCR.'
    ],
    grievancePortal: {
      name: 'National Commission for Protection of Child Rights (e-BaalNidan)',
      url: 'https://ebaalnidan.nic.in',
      helpline: '1098 (Childline)'
    }
  },
  {
    id: 'consumer-protection-rights',
    title: 'Consumer Rights & Redressal',
    actName: 'Consumer Protection Act, 2019',
    summary: 'Protects consumers from unfair trade practices, defective goods, deficient services, misleading advertisements, and overcharging.',
    category: 'Consumer Protection',
    keyProtections: [
      'Right to safety against hazardous goods and services.',
      'Right to be informed about quality, quantity, potency, purity, standard, and price.',
      'Right to seek redressal against unfair trade practices and product liability claims.',
      'Can file consumer complaints online from home without hiring a lawyer using e-Daakhil.'
    ],
    howToExercise: [
      'Preserve purchase bills, invoices, receipts, and communication proof with the seller/service provider.',
      'Send a formal written notice / complaint to customer support giving 15-30 days to resolve.',
      'Call National Consumer Helpline 1915 or register complaint on consumerhelpline.gov.in.',
      'If unresolved, file an electronic complaint on e-Daakhil (edaakhil.nic.in) before District Consumer Commission (for claims up to ₹50 lakh).'
    ],
    grievancePortal: {
      name: 'National Consumer Helpline & e-Daakhil',
      url: 'https://consumerhelpline.gov.in',
      helpline: '1915 / 1800-11-4000'
    }
  },
  {
    id: 'unorganized-workers-rights',
    title: 'Unorganized & Gig Workers Social Security Rights',
    actName: 'Code on Social Security & e-Shram Initiative',
    summary: 'Recognizes informal workers, domestic workers, gig and platform workers, street vendors, and construction laborers for universal social security.',
    category: 'Labor & Workers',
    keyProtections: [
      'Registration on e-Shram portal with a 12-digit Universal Account Number (UAN) valid across India.',
      'Accidental insurance coverage under PMSBY (₹2 lakh for accidental death/permanent disability).',
      'Portability of social security benefits across states during seasonal migration.',
      'Statutory minimum wage protection under the Code on Wages.'
    ],
    howToExercise: [
      'Visit eshram.gov.in with Aadhaar and Aadhaar-linked mobile number.',
      'Complete self-registration with occupation, education, and bank account details.',
      'Download e-Shram UAN Card instantly free of cost.',
      'Use e-Shram card to link with Pradhan Mantri Shram Yogi Maan-dhan (PM-SYM) pension and state welfare boards.'
    ],
    grievancePortal: {
      name: 'e-Shram Grievance Portal (Ministry of Labour & Employment)',
      url: 'https://eshram.gov.in',
      helpline: '14434'
    }
  },
  {
    id: 'women-workplace-maternity-rights',
    title: 'Maternity Benefits & Workplace Rights for Women',
    actName: 'Maternity Benefit (Amendment) Act & POSH Act, 2013',
    summary: 'Provides 26 weeks paid maternity leave and guarantees safety against sexual harassment in all public and private workplaces.',
    category: 'Women & Family',
    keyProtections: [
      '26 weeks (6 months) fully paid maternity leave for female employees for up to two surviving children.',
      'Employer cannot terminate, dismiss, or alter terms of employment during maternity leave.',
      'Mandatory crèche facility in every establishment with 50 or more employees.',
      'Mandatory Internal Complaints Committee (ICC) in all workplaces with 10+ employees to handle sexual harassment complaints within 90 days.'
    ],
    howToExercise: [
      'Submit written maternity notice to employer 7 weeks before expected delivery date.',
      'For workplace safety or harassment grievances, file complaint with the Internal Committee (IC) or Local Committee (LC).',
      'Complaints can also be filed digitally on the SHe-Box portal (shebox.wcd.gov.in).'
    ],
    grievancePortal: {
      name: 'Ministry of Women & Child Development (SHe-Box)',
      url: 'https://shebox.wcd.gov.in',
      helpline: '181 (Women Helpline)'
    }
  },
  {
    id: 'senior-citizens-rights',
    title: 'Rights & Maintenance of Senior Citizens',
    actName: 'Maintenance and Welfare of Parents and Senior Citizens Act, 2007',
    summary: 'Legal right for parents and senior citizens (aged 60+) to claim monthly maintenance from children or legal heirs, and protection against eviction or property fraud.',
    category: 'Senior Citizens',
    keyProtections: [
      'Parents and grandparents can claim monthly maintenance up to ₹10,000 from adult children or relatives who inherit their property.',
      'Fast-track Maintenance Tribunals headed by Sub-Divisional Magistrates (SDMs) must resolve cases within 90 days.',
      'Property gifted or transferred to children on condition of care can be declared VOID if children neglect basic physical needs.',
      'Abandonment of senior citizens is a cognizable criminal offense punishable with imprisonment up to 3 months or fine.'
    ],
    howToExercise: [
      'Approach the local Sub-Divisional Magistrate (SDM) / Maintenance Tribunal with an application on plain paper.',
      'No advocate is strictly required; Tribunal officers provide assistance.',
      'Call National Helpline for Senior Citizens (Elder Line - 14567) for counseling, legal guidance, and rescue.'
    ],
    grievancePortal: {
      name: 'Elder Line (Ministry of Social Justice & Empowerment)',
      url: 'https://elderline.dosje.gov.in',
      helpline: '14567'
    }
  }
];
