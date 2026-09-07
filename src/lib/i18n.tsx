import React, { createContext, useContext, useState } from 'react';
import { LanguageCode } from '@/types';

export interface Translations {
  appName: string;
  appTagline: string;
  reportAnIssue: string;
  cityOperations: string;
  overview: string;
  allReports: string;
  aiPriorityQueue: string;
  hotspotsAndTwin: string;
  impactDashboard: string;
  liveMap: string;
  workflows: string;
  evidenceVault: string;
  askCopilot: string;
  judgeMode: string;
  runDemo: string;
  demoMode: string;
  realAwsMode: string;
  urgentAction: string;
  civicImpactScore: string;
  priorityModelLabel: string;
  whyPrioritized: string;
  recommendedAction: string;
  responsibleDepartment: string;
  slaStatus: string;
  onTrack: string;
  atRisk: string;
  overdue: string;
  target: string;
  elapsed: string;
  remaining: string;
  possibleDuplicate: string;
  mergeReports: string;
  viewSeparately: string;
  masterIncident: string;
  beforeAfterProof: string;
  resolutionEvidence: string;
  verifiedEvidence: string;
  todayCivicBrief: string;
  insufficientData: string;
  emergingHotspot: string;
  rootCauseInsight: string;
  civicHealthScore: string;
  filterReports: string;
  searchPlaceholder: string;
  // Categories
  cat_road_damage: string;
  cat_streetlights: string;
  cat_garbage_overflow: string;
  cat_water_leak: string;
  cat_public_hazard: string;
  cat_infrastructure: string;
  cat_other: string;
}

const en: Translations = {
  appName: 'CivicFix AI',
  appTagline: 'The city that listens.',
  reportAnIssue: 'Report an Issue',
  cityOperations: 'City Operations',
  overview: 'Executive Overview',
  allReports: 'Reports Registry',
  aiPriorityQueue: 'AI Priority Queue',
  hotspotsAndTwin: 'Hotspots & Digital Twin',
  impactDashboard: 'Impact & ROI',
  liveMap: 'Geospatial Map',
  workflows: 'AWS State Machines',
  evidenceVault: 'Evidence Intelligence',
  askCopilot: 'Ask Copilot',
  judgeMode: 'Judge Mode',
  runDemo: 'Run Demo Flow',
  demoMode: 'Demo Mode (Offline)',
  realAwsMode: 'Real AWS Cloud',
  urgentAction: 'URGENT ACTION',
  civicImpactScore: 'Civic Impact Score',
  priorityModelLabel: 'CivicFix AI Priority Model',
  whyPrioritized: 'Why this is prioritized',
  recommendedAction: 'Recommended Action',
  responsibleDepartment: 'Responsible Department',
  slaStatus: 'SLA Status',
  onTrack: 'On Track',
  atRisk: 'At Risk',
  overdue: 'Overdue',
  target: 'Target',
  elapsed: 'Elapsed',
  remaining: 'Remaining',
  possibleDuplicate: 'POSSIBLE DUPLICATE',
  mergeReports: 'Merge Reports',
  viewSeparately: 'View Separately',
  masterIncident: 'MASTER INCIDENT',
  beforeAfterProof: 'Before / After Proof',
  resolutionEvidence: 'Resolution Evidence',
  verifiedEvidence: 'Verified Evidence',
  todayCivicBrief: "TODAY'S CIVIC BRIEF",
  insufficientData: 'Insufficient data for prediction',
  emergingHotspot: 'POSSIBLE EMERGING HOTSPOT',
  rootCauseInsight: 'ROOT CAUSE INSIGHT',
  civicHealthScore: 'Civic Health Score',
  filterReports: 'Filter Reports',
  searchPlaceholder: 'Search reports, addresses, or IDs...',
  cat_road_damage: 'Road Damage',
  cat_streetlights: 'Streetlights & Electrical',
  cat_garbage_overflow: 'Sanitation & Waste',
  cat_water_leak: 'Water & Sewer Leak',
  cat_public_hazard: 'Public Hazard',
  cat_infrastructure: 'Infrastructure & Bridges',
  cat_other: 'Other Issue',
};

const hi: Translations = {
  appName: 'CivicFix AI',
  appTagline: 'वह शहर जो नागरिकों की सुनता है।',
  reportAnIssue: 'समस्या दर्ज करें',
  cityOperations: 'सिटी ऑपरेशन्स',
  overview: 'कार्यकारी अवलोकन',
  allReports: 'शिकायत पंजिका',
  aiPriorityQueue: 'एआई प्राथमिकता कतार',
  hotspotsAndTwin: 'हॉटस्पॉट व डिजिटल ट्विन',
  impactDashboard: 'नागरिक प्रभाव व आरओआई',
  liveMap: 'भू-स्थानिक मानचित्र',
  workflows: 'एडब्ल्यूएस वर्कफ़्लो',
  evidenceVault: 'साक्ष्य इंटेलिजेंस',
  askCopilot: 'कोपायलट से पूछें',
  judgeMode: 'जज मोड',
  runDemo: 'डेमो चलाएं',
  demoMode: 'डेमो मोड (ऑफ़लाइन)',
  realAwsMode: 'रियल एडब्ल्यूएस क्लाउड',
  urgentAction: 'तत्काल कार्रवाई आवश्यक',
  civicImpactScore: 'नागरिक प्रभाव स्कोर',
  priorityModelLabel: 'सिविकफिक्स एआई प्राथमिकता मॉडल',
  whyPrioritized: 'इसे प्राथमिकता क्यों दी गई?',
  recommendedAction: 'अनुशंसित कार्रवाई',
  responsibleDepartment: 'उत्तरदायी विभाग',
  slaStatus: 'एसएलए स्थिति',
  onTrack: 'समय पर',
  atRisk: 'जोखिम में',
  overdue: 'समय सीमा समाप्त',
  target: 'लक्ष्य',
  elapsed: 'बीता समय',
  remaining: 'शेष समय',
  possibleDuplicate: 'संभावित डुप्लिकेट रिपोर्ट',
  mergeReports: 'रिपोर्ट्स का विलय करें',
  viewSeparately: 'अलग से देखें',
  masterIncident: 'मास्टर घटना',
  beforeAfterProof: 'पहले / बाद का सत्यापन',
  resolutionEvidence: 'समाधान साक्ष्य',
  verifiedEvidence: 'सत्यापित साक्ष्य',
  todayCivicBrief: 'आज का नागरिक सारांश',
  insufficientData: 'पूर्वानुमान हेतु अपर्याप्त डेटा',
  emergingHotspot: 'संभावित उभरता हॉटस्पॉट',
  rootCauseInsight: 'मूल कारण अंतर्दृष्टि',
  civicHealthScore: 'नागरिक स्वास्थ्य स्कोर',
  filterReports: 'रिपोर्ट फ़िल्टर करें',
  searchPlaceholder: 'रिपोर्ट, पता या आईडी खोजें...',
  cat_road_damage: 'सड़क क्षति',
  cat_streetlights: 'स्ट्रीट लाइट व विद्युत',
  cat_garbage_overflow: 'कचरा व स्वच्छता',
  cat_water_leak: 'पानी का रिसाव व सीवर',
  cat_public_hazard: 'सार्वजनिक खतरा',
  cat_infrastructure: 'बुनियादी ढांचा व पुल',
  cat_other: 'अन्य समस्या',
};

const odia: Translations = {
  appName: 'CivicFix AI',
  appTagline: 'ଏହି ସହର ନାଗରିକଙ୍କ ସ୍ୱର ଶୁଣେ।',
  reportAnIssue: 'ସମସ୍ୟା ରିପୋର୍ଟ କରନ୍ତୁ',
  cityOperations: 'ସହର ପରିଚାଳନା',
  overview: 'ମୁଖ୍ୟ ବିବରଣୀ',
  allReports: 'ରିପୋର୍ଟ ତାଲିକା',
  aiPriorityQueue: 'ଏଆଇ ପ୍ରାଥମିକତା ଧାଡ଼ି',
  hotspotsAndTwin: 'ହଟସ୍ପଟ୍ ଓ ଡିଜିଟାଲ୍ ଟ୍ୱିନ୍',
  impactDashboard: 'ପ୍ରଭାବ ଓ ସଫଳତା',
  liveMap: 'ମାନଚିତ୍ର',
  workflows: 'ଏଡବ୍ଲୁଏସ୍ ୱାର୍କଫ୍ଲୋ',
  evidenceVault: 'ପ୍ରମାଣ ଭଣ୍ଡାର',
  askCopilot: 'କୋପାଇଲଟ୍ କୁ ପଚାରନ୍ତୁ',
  judgeMode: 'ଜଜ୍ ମୋଡ୍',
  runDemo: 'ଡେମୋ ଚଲାନ୍ତୁ',
  demoMode: 'ଡେମୋ ମୋଡ୍ (ଅଫ୍‌ଲାଇନ୍)',
  realAwsMode: 'ରିଅଲ୍ ଏଡବ୍ଲୁଏସ୍ କ୍ଲାଉଡ୍',
  urgentAction: 'ଜରୁରୀ ପଦକ୍ଷେପ',
  civicImpactScore: 'ନାଗରିକ ପ୍ରଭାବ ସ୍କୋର',
  priorityModelLabel: 'ସିଭିକ୍‌ଫିକ୍ସ ଏଆଇ ପ୍ରାଥମିକତା ମଡେଲ୍',
  whyPrioritized: 'ଏହା କାହିଁକି ପ୍ରାଥମିକ?',
  recommendedAction: 'ପରାମର୍ଶିତ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ',
  responsibleDepartment: 'ଦାୟିତ୍ୱପ୍ରାପ୍ତ ବିଭାଗ',
  slaStatus: 'ଏସ୍‌ଏଲ୍‌ଏ ସ୍ଥିତି',
  onTrack: 'ସମୟାନୁସାରୀ',
  atRisk: 'ସଂକଟରେ',
  overdue: 'ସମୟ ଅତିକ୍ରାନ୍ତ',
  target: 'ଲକ୍ଷ୍ୟ',
  elapsed: 'ଅତିବାହିତ',
  remaining: 'ଅବଶିଷ୍ଟ',
  possibleDuplicate: 'ସମ୍ଭାବ୍ୟ ନକଲ ରିପୋର୍ଟ',
  mergeReports: 'ମିଶ୍ରଣ କରନ୍ତୁ',
  viewSeparately: 'ପୃଥକ ଭାବରେ ଦେଖନ୍ତୁ',
  masterIncident: 'ମାଷ୍ଟର ଘଟଣା',
  beforeAfterProof: 'ପୂର୍ବ / ପର ପ୍ରମାଣ',
  resolutionEvidence: 'ସମାଧାନ ପ୍ରମାଣ',
  verifiedEvidence: 'ସତ୍ୟାପିତ ପ୍ରମାଣ',
  todayCivicBrief: 'ଆଜିର ନାଗରିକ ସାରାଂଶ',
  insufficientData: 'ପୂର୍ବାନୁମାନ ପାଇଁ ଯଥେଷ୍ଟ ତଥ୍ୟ ନାହିଁ',
  emergingHotspot: 'ଉଦୀୟମାନ ହଟସ୍ପଟ୍',
  rootCauseInsight: 'ମୂଳ କାରଣ ବିଶ୍ଳେଷଣ',
  civicHealthScore: 'ନାଗରିକ ସ୍ୱାସ୍ଥ୍ୟ ସ୍କୋର',
  filterReports: 'ଫିଲ୍ଟର୍ କରନ୍ତୁ',
  searchPlaceholder: 'ରିପୋର୍ଟ, ଠିକଣା ବା ଆଇଡି ଖୋଜନ୍ତୁ...',
  cat_road_damage: 'ରାସ୍ତା କ୍ଷତି',
  cat_streetlights: 'ଷ୍ଟ୍ରିଟ୍ ଲାଇଟ୍ ଓ ବିଦ୍ୟୁତ',
  cat_garbage_overflow: 'ଅଳିଆ ଓ ସ୍ୱଚ୍ଛତା',
  cat_water_leak: 'ପାଣି ନିଷ୍କାସନ ଓ ଲିକ୍',
  cat_public_hazard: 'ସାଧାରଣ ବିପଦ',
  cat_infrastructure: 'ଭିତ୍ତିଭୂମି ଓ ପୋଲ',
  cat_other: 'ଅନ୍ୟାନ୍ୟ ସମସ୍ୟା',
};

const dictionaries: Record<LanguageCode, Translations> = {
  en,
  hi,
  or: odia,
};

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {},
  t: en,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('civicfix_lang') as LanguageCode;
    return saved && ['en', 'hi', 'or'].includes(saved) ? saved : 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('civicfix_lang', lang);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: dictionaries[language] }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
