export interface BlockResource {
  id: string;
  title: string;
  sourceType: 'egyptian' | 'usmle';
  institutionOrPlatform: string;
  category: 'past_papers' | 'mcq_bank' | 'anki_deck' | 'ospe_cases' | 'high_yield_summary';
  descriptionAr: string;
  descriptionEn: string;
  tags: string[];
  externalUrl?: string;
  highYieldNotes: string;
}

export interface PhaseTaskTemplate {
  id: string;
  phaseNumber: 1 | 2 | 3 | 4;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  highYieldTipAr: string;
  relativeStartPct: number; // e.g. 0% of interval
  relativeEndPct: number;   // e.g. 40% of interval
  suggestedDaysWeight: number; // proportional weight
}

export interface MedicalBlock {
  id: string;
  code: string;
  titleAr: string;
  titleEn: string;
  systemNameAr: string;
  systemNameEn: string;
  badgeColor: string;
  summaryAr: string;
  summaryEn: string;
  typicalDurationWeeks: number;
  coreSubjects: string[];
  highYieldTopics: string[];
  egyptianResources: BlockResource[];
  usmleResources: BlockResource[];
  tasks: PhaseTaskTemplate[];
}

export const MEDICAL_BLOCKS: MedicalBlock[] = [
  {
    id: 'cvs',
    code: 'CVS',
    titleAr: 'جهاز القلب والأوعية الدموية',
    titleEn: 'Cardiovascular System',
    systemNameAr: 'كارديو - باطنة وجراحة وقلب',
    systemNameEn: 'Cardiology & Vascular Medicine',
    badgeColor: 'rose',
    summaryAr: 'يشمل فسيولوجيا الدورة الدموية، ضغط الدم، أمراض الصمامات، قصور الشرايين التاجية، وفشل عضلة القلب مع أدوية الكارديو ورسم القلب (ECG).',
    summaryEn: 'Covers cardiac electrophysiology, hemodynamics, valvular lesions, acute coronary syndromes, heart failure, and cardiovascular pharmacology.',
    typicalDurationWeeks: 5,
    coreSubjects: ['Physiology (Hemodynamics & ECG)', 'Pathology (Infarction, Atherosclerosis)', 'Pharmacology (Antihypertensives, Antiarrhythmics)', 'Histology & Anatomy of Great Vessels'],
    highYieldTopics: [
      'ECG Interpretation & Axis Deviation',
      'Heart Murmurs (Systolic vs Diastolic timing)',
      'Heart Failure (NYHA Classes & GDMT Regimen)',
      'Acute Coronary Syndrome (STEMI vs NSTEMI vs Unstable Angina)',
      'Antiarrhythmic Drugs (Vaughan Williams Classification)',
      'Hypertensive Urgencies & Emergencies'
    ],
    egyptianResources: [
      {
        id: 'cvs-kasr-mcq',
        title: 'بنك أسئلة قصر العيني التراكمي (Kasr Al-Ainy CVS Past MCQs)',
        sourceType: 'egyptian',
        institutionOrPlatform: 'قصر العيني - جامعة القاهرة',
        category: 'mcq_bank',
        descriptionAr: 'تجميعة امتحانات الموديول للسنوات الخمس الماضية مع الإجابات النموذجية وأسئلة الراوندات الإكلينيكية.',
        descriptionEn: 'Official past block examination papers with faculty answer keys and clinical round MCQs.',
        tags: ['Kasr Al-Ainy', 'Past Papers', 'MCQ'],
        externalUrl: 'https://med.cu.edu.eg',
        highYieldNotes: 'ركز على أسئلة Endocarditis و Valvular lesions تتكرر سنوياً في أسئلة الفاينال.'
      },
      {
        id: 'cvs-ain-shams-ospe',
        title: 'أطلس أسئلة العملي والـ OSPE - طب عين شمس',
        sourceType: 'egyptian',
        institutionOrPlatform: 'كلية الطب - جامعة عين شمس',
        category: 'ospe_cases',
        descriptionAr: 'صور عينات الباثولوجي (Gross & Microscopic)، شرائح الهستولوجي، وخرائط أصوات القلب السريرية.',
        descriptionEn: 'Gross pathology specimens, histology slides, and heart sound phonograms for practical OSPE.',
        tags: ['Ain Shams', 'OSPE', 'Practical'],
        highYieldNotes: 'مهم جداً لمحطة الـ Auscultation وتفرقة ما بين Mitral Stenosis و Aortic Stenosis.'
      },
      {
        id: 'cvs-mansoura-compendium',
        title: 'ملخصات وبنك أسئلة موديول المنصورة المانشستري (Mansoura-Manchester CVS)',
        sourceType: 'egyptian',
        institutionOrPlatform: 'جامعة المنصورة',
        category: 'high_yield_summary',
        descriptionAr: 'حالات مبنية على حل المشكلات (PBL Clinical Cases) مع مناقشة التشخيص التفريقي لألم الصدر وضيق التنفس.',
        descriptionEn: 'Problem-based learning cases covering differential diagnosis of chest pain and dyspnea.',
        tags: ['Mansoura', 'PBL Cases', 'Differential Diagnosis'],
        highYieldNotes: 'مناسب للتدريب على أسئلة Case-based vignettes في الامتحانات الحديثة.'
      }
    ],
    usmleResources: [
      {
        id: 'cvs-anking-v12',
        title: 'AnKing Step 1: Cardiovascular System (v12 Deck)',
        sourceType: 'usmle',
        institutionOrPlatform: 'AnkiWeb & AnkiHub',
        category: 'anki_deck',
        descriptionAr: 'كروت فلاش كاردز مجهزة بالتكرار المتباعد تغطي كامل شبتر الكارديو في First Aid مع رسومات Sketchy و Pathoma.',
        descriptionEn: 'Comprehensive spaced-repetition card deck tagged by First Aid, Pathoma, and Sketchy Pharm.',
        tags: ['#AK_Step1_v12::!FirstAid::04_CVS', 'SketchyPharm', 'Pathoma'],
        externalUrl: 'https://ankihub.net',
        highYieldNotes: 'راجع على الأقل 40 كارت جديد يومياً مع مراجعة المتبقي في الفجر لتثبيت الذاكرة طويلة المدى.'
      },
      {
        id: 'cvs-uworld-high-yield',
        title: 'UWorld Step 1 CVS High-Yield Clinical Vignettes',
        sourceType: 'usmle',
        institutionOrPlatform: 'UWorld / Amboss',
        category: 'mcq_bank',
        descriptionAr: 'أقوى بنك سيناريوهات إكلينيكية لربط أدوية الضغط وفسيولوجيا الضغط الشرياني بحالات واقعية.',
        descriptionEn: 'Gold-standard clinical case vignettes linking physiological pressure-volume loops to pathology.',
        tags: ['PV Loops', 'Wiggers Diagram', 'Clinical Vignettes'],
        highYieldNotes: 'احرص على إتقان رسمة Wiggers Diagram ومنحنيات Pressure-Volume Loops.'
      }
    ],
    tasks: [
      {
        id: 'cvs-task-1',
        phaseNumber: 1,
        titleAr: 'تأسيس فسيولوجيا الضغط والدورة الدموية ورسم القلب',
        titleEn: 'Hemodynamics, Wiggers Diagram & Baseline ECG',
        descriptionAr: 'فهم عميق لـ Cardiac Cycle، حساب الـ Cardiac Output، ومعرفة القواعد الذهبية لقراءة رسم القلب (ECG 12-Leads).',
        highYieldTipAr: 'لا تحفظ منحنى Wiggers غيباً؛ افهم لحظات فتح وغلق الصمامات الأورطية والميترالية.',
        relativeStartPct: 0,
        relativeEndPct: 35,
        suggestedDaysWeight: 0.35
      },
      {
        id: 'cvs-task-2',
        phaseNumber: 2,
        titleAr: 'دراسة باثولوجيا وأدوية الكارديو وفلاش كاردز Anki',
        titleEn: 'Pathoma CVS & Sketchy Pharm Spaced Cards',
        descriptionAr: 'مذاكرة Atherosclerosis، احتشاء عضلة القلب (MI)، وتصنيف أدوية الضغط واللانظميات مع تفعيل مراجعة Anki اليومية.',
        highYieldTipAr: 'اربط أعراض فشل القلب الأيمن باحتقان الكبد والوريد الوداجي، وفشل الأيسر باحتقان الرئة.',
        relativeStartPct: 35,
        relativeEndPct: 65,
        suggestedDaysWeight: 0.30
      },
      {
        id: 'cvs-task-3',
        phaseNumber: 3,
        titleAr: 'حل بنوك أسئلة قصر العيني وعين شمس + حالات USMLE',
        titleEn: 'Egyptian Past Exam MCQs & Clinical Vignettes',
        descriptionAr: 'حل ما لا يقل عن 250 سؤال اختيار من متعدد من امتحانات السنوات السابقة للجامعات المصرية مع تدوين أسباب الخطأ.',
        highYieldTipAr: 'قراءة السيناريو الإكلينيكي تبدأ من السطر الأخير لتحديد المطلوب بدقة قبل تشتت الانتباه.',
        relativeStartPct: 65,
        relativeEndPct: 85,
        suggestedDaysWeight: 0.20
      },
      {
        id: 'cvs-task-4',
        phaseNumber: 4,
        titleAr: 'المحاكاة الشاملة ومراجعة كشكول الأخطاء (Mistake Notebook)',
        titleEn: 'Mock Timed Exam & High-Yield Rapid Review',
        descriptionAr: 'امتحان تجريبي كامل بالوقت الفعلي، مراجعة صور الـ OSPE وأسئلة الأصوات، وقراءة سريعة لملخص الكارديو.',
        highYieldTipAr: 'راجع جدول مقارنة Murmurs والمناورات السريرية (Valsalva, Handgrip, Squatting) ليلة الامتحان.',
        relativeStartPct: 85,
        relativeEndPct: 100,
        suggestedDaysWeight: 0.15
      }
    ]
  },
  {
    id: 'respiratory',
    code: 'RESP',
    titleAr: 'الجهاز التنفسي',
    titleEn: 'Respiratory System',
    systemNameAr: 'صدرية وجهاز تنفسي',
    systemNameEn: 'Pulmonology & Thoracic Medicine',
    badgeColor: 'sky',
    summaryAr: 'يشمل ميكانيكا التنفس، اختبارات وظائف الرئة (PFTs)، الربو، السدة الرئوية (COPD)، التليف، وسرطان الرئة مع غازات الدم (ABG).',
    summaryEn: 'Focuses on pulmonary mechanics, gas exchange, acid-base arterial blood gas (ABG) analysis, COPD, asthma, and pneumonia.',
    typicalDurationWeeks: 4,
    coreSubjects: ['Pulmonary Mechanics & Ventilation/Perfusion', 'Infectious Pneumonia & Tuberculosis', 'Obstructive vs Restrictive Lung Diseases', 'Pulmonary Pharmacology'],
    highYieldTopics: [
      'PFT Interpretation (FEV1/FVC ratios)',
      'Arterial Blood Gas (ABG) Acid-Base Disorders',
      'Obstructive (Asthma, COPD) vs Restrictive Patterns',
      'Tuberculosis (Primary vs Secondary & Anti-TB Drugs)',
      'Community-Acquired vs Hospital Pneumonia (Atypical bugs)',
      'Chest X-Ray Patterns (Consolidation, Pleural Effusion, Pneumothorax)'
    ],
    egyptianResources: [
      {
        id: 'resp-kasr-papers',
        title: 'تجميعة امتحانات الصدرية لجامعات مصر (Egyptian Faculties Chest Compendium)',
        sourceType: 'egyptian',
        institutionOrPlatform: 'قصر العيني والمنصورة',
        category: 'past_papers',
        descriptionAr: 'أسئلة مقالية قصيرة و MCQs على أمراض الدرن (TB)، الخراج الرئوي، وتجمع السوائل البلورية.',
        descriptionEn: 'Short essay prompts and MCQs focusing on TB, lung abscess, and pleural effusions.',
        tags: ['Kasr Al-Ainy', 'Mansoura', 'Endemic TB'],
        highYieldNotes: 'الدرن الرئوي (Tuberculosis) من الأسئلة المفضلة في الامتحانات المصرية الشفوية والتحريرية.'
      },
      {
        id: 'resp-alex-xray-ospe',
        title: 'أطلس الأشعة المقطعية وأشعة الصدر - طب الإسكندرية',
        sourceType: 'egyptian',
        institutionOrPlatform: 'كلية الطب - جامعة الإسكندرية',
        category: 'ospe_cases',
        descriptionAr: 'علامات أشعة الصدر الأساسية (Silhouette sign, Air bronchogram, Pneumothorax deep sulcus sign).',
        descriptionEn: 'Key CXR and CT findings essential for clinical OSCE and station exams.',
        tags: ['Alexandria', 'CXR Radiology', 'OSPE'],
        highYieldNotes: 'محطة الأشعة مضمونة الدرجات إذا تدربت على منهجية Systematic CXR Reading.'
      }
    ],
    usmleResources: [
      {
        id: 'resp-anki-fa',
        title: 'AnKing Step 1: Respiratory System Chapter',
        sourceType: 'usmle',
        institutionOrPlatform: 'AnkiHub',
        category: 'anki_deck',
        descriptionAr: 'كروت التكرار المتباعد لفسيولوجيا التهوية والتروية (V/Q Mismatch) وأدوية الربو والمضادات الحيوية.',
        descriptionEn: 'Flashcards drilling V/Q mismatch calculations, asthma inhalers, and lung pathology.',
        tags: ['#AK_Step1_v12::!FirstAid::16_Respiratory', 'Pathoma Chapter 9'],
        externalUrl: 'https://ankihub.net',
        highYieldNotes: 'ركز على معادلة A-a gradient و V/Q changes من قمة الرئة لقاعدتها.'
      },
      {
        id: 'resp-amboss-abg',
        title: 'Amboss Acid-Base & ABG Masterclass',
        sourceType: 'usmle',
        institutionOrPlatform: 'Amboss',
        category: 'high_yield_summary',
        descriptionAr: 'شرح تفاعلي تفصيلي لحساب Anion Gap والتعويض التنفسي والأيضي (Winter formula).',
        descriptionEn: 'Interactive algorithm for diagnosing complex mixed acid-base disorders.',
        tags: ['ABG Analysis', 'Winter Formula', 'Anion Gap'],
        highYieldNotes: 'قاعدة ذهبية: احسب Anion Gap دائماً قبل البدء بتفسير الـ Bicarbonate.'
      }
    ],
    tasks: [
      {
        id: 'resp-task-1',
        phaseNumber: 1,
        titleAr: 'إتقان فسيولوجيا التنفس وغازات الدم الشرياني (ABG)',
        titleEn: 'Pulmonary Mechanics, Gas Exchange & ABG Math',
        descriptionAr: 'دراسة حجوم الرئة (Spirometry)، منحنى تفكك الأكسجين (O2-Hb Curve)، وطريقة قراءة غازات الدم في 3 خطوات.',
        highYieldTipAr: 'انتبه للعوامل التي تزيح منحنى تفكك الهيموجلوبين لليمين (CADET face right: CO2, Acidity, 2,3-DPG, Exercise, Temp).',
        relativeStartPct: 0,
        relativeEndPct: 35,
        suggestedDaysWeight: 0.35
      },
      {
        id: 'resp-task-2',
        phaseNumber: 2,
        titleAr: 'أمراض الرئة الانسدادية والمقيدة والميكروبيولوجي مع Anki',
        titleEn: 'COPD, Asthma, Restrictive Pathoma & Micro Decks',
        descriptionAr: 'المقارنة الحاسمة بين Asthma و COPD، أورام الرئة (Small cell vs Non-small cell)، ومضادات الدرن (RIPE).',
        highYieldTipAr: 'احفظ الأعراض الجانبية لأدوية الدرن: Rifampin (orange secretions), Isoniazid (neuropathy/B6), Pyrazinamide (gout), Ethambutol (optic neuritis).',
        relativeStartPct: 35,
        relativeEndPct: 65,
        suggestedDaysWeight: 0.30
      },
      {
        id: 'resp-task-3',
        phaseNumber: 3,
        titleAr: 'حل بنوك أسئلة الجامعات المصرية وسيناريوهات USMLE',
        titleEn: 'Past Papers + Clinical Case Solving',
        descriptionAr: 'حل امتحانات الصدرية التراكمية، ومراجعة 150 سؤال سريري على حالات السل والجلطة الرئوية (PE).',
        highYieldTipAr: 'علامة Hampton hump و Westermark sign في أشعة الجلطة الرئوية تتكرر في أسئلة التميز.',
        relativeStartPct: 65,
        relativeEndPct: 85,
        suggestedDaysWeight: 0.20
      },
      {
        id: 'resp-task-4',
        phaseNumber: 4,
        titleAr: 'أشعة الصدر (CXR Stations) والامتحان التجريبي الشامل',
        titleEn: 'Radiology Spotting, High-Yield Review & Timed Exam',
        descriptionAr: 'التدريب على محطات الـ OSPE لصور الأشعة، مراجعة كشكول الأخطاء وحل نموذج امتحان كامل في زمن محدد.',
        highYieldTipAr: 'تأكد من قراءة بيانات الفيلم والاتجاه (PA vs AP view) قبل كتابة أي تشخيص في محطة العملي.',
        relativeStartPct: 85,
        relativeEndPct: 100,
        suggestedDaysWeight: 0.15
      }
    ]
  },
  {
    id: 'git',
    code: 'GIT',
    titleAr: 'الجهاز الهضمي والتغذية',
    titleEn: 'Gastrointestinal System & Nutrition',
    systemNameAr: 'جهاز هضمي وكبد وتغذية',
    systemNameEn: 'Gastroenterology, Hepatology & Nutrition',
    badgeColor: 'amber',
    summaryAr: 'يشمل حركة الجهاز الهضمي، أمراض الكبد وفيروسات الكبد الوبائي (HCV/HBV)، البنكرياس، القولون التقرحي، وسرطانات الجهاز الهضمي.',
    summaryEn: 'Covers GI motility, viral hepatitis, cirrhosis, portal hypertension, inflammatory bowel diseases, and GI malignancies.',
    typicalDurationWeeks: 5,
    coreSubjects: ['Gastrointestinal Physiology & Secretions', 'Hepatology (Cirrhosis, Jaundice, Viral Hepatitis)', 'Pathology of IBD & Malignancies', 'GI Pharmacology & Antibiotics'],
    highYieldTopics: [
      'Differential Diagnosis of Jaundice (Pre-hepatic, Hepatic, Post-hepatic)',
      'Hepatitis B Serology Panel Interpretation',
      'Ulcerative Colitis vs Crohn Disease Comparison',
      'Cirrhosis Complications (Ascites, SBP, Varices, Encephalopathy)',
      'Peptic Ulcer Disease & H. Pylori Regimens',
      'Acute Pancreatitis (Ranson Criteria & Complications)'
    ],
    egyptianResources: [
      {
        id: 'git-kasr-hepatology',
        title: 'بروتوكول أمراض الكبد المصرية وتجميعة الأسئلة (Egyptian Hepatology Master)',
        sourceType: 'egyptian',
        institutionOrPlatform: 'قصر العيني والجمعية المصرية للكبد',
        category: 'past_papers',
        descriptionAr: 'تجميعة مركزة على تشخيص ومضاعفات تليف الكبد الناتج عن البلهارسيا وفيروس سي (HCV) ودوالي المريء.',
        descriptionEn: 'Focus on bilharzial periportal fibrosis, HCV sequelae, and portal hypertension management.',
        tags: ['Kasr Al-Ainy', 'Hepatology', 'Bilharzia & HCV'],
        highYieldNotes: 'بند أساسي في جميع كليات الطب المصرية؛ إتقان مضاعفات تليف الكبد يمثل ربع درجات البلوك.'
      },
      {
        id: 'git-ain-shams-pathology',
        title: 'أطلس باثولوجي الجهاز الهضمي - طب عين شمس',
        sourceType: 'egyptian',
        institutionOrPlatform: 'جامعة عين شمس',
        category: 'ospe_cases',
        descriptionAr: 'صور ومجسمات سرطان المعدة، زوائد القولون (Polyps)، وحصوات المرارة لالختبارات العملية.',
        descriptionEn: 'High-definition gross and microscopic images of colon polyps and stomach carcinoma.',
        tags: ['Ain Shams', 'Pathology OSPE', 'Colon Polyps'],
        highYieldNotes: 'تأكد من معرفة الفارق العياني والمجهري بين Crohn و Ulcerative Colitis.'
      }
    ],
    usmleResources: [
      {
        id: 'git-anking-deck',
        title: 'AnKing Step 1: Gastrointestinal System Deck',
        sourceType: 'usmle',
        institutionOrPlatform: 'AnkiHub',
        category: 'anki_deck',
        descriptionAr: 'كروت التكرار المتباعد لكل هرمونات الجهاز الهضمي (Gastrin, CCK, Secretin) وسيرولوجيا فيروس B.',
        descriptionEn: 'Anki deck drilling GI regulatory hormones and hepatitis B diagnostic serologies.',
        tags: ['#AK_Step1_v12::!FirstAid::08_GIT', 'Pathoma GIT'],
        externalUrl: 'https://ankihub.net',
        highYieldNotes: 'مراجعة دورية لجدول HBsAg, HBsAb, HBcAb IgM/IgG تضمن عدم الخطأ في أسئلة السيرولوجي.'
      },
      {
        id: 'git-uworld-cases',
        title: 'UWorld Step 1 GI Clinical Question Set',
        sourceType: 'usmle',
        institutionOrPlatform: 'UWorld',
        category: 'mcq_bank',
        descriptionAr: 'أسئلة سريرية تغطي حالات انسداد الأمعاء، متلازمة زولينجر-إليسون، وسرطان القولون الوراثي (Lynch & FAP).',
        descriptionEn: 'High-yield vignettes covering acute abdomen, malabsorption, and genetic syndromes.',
        tags: ['Lynch Syndrome', 'FAP', 'Acute Abdomen'],
        highYieldNotes: 'انتبه لقاعدة 2s في Meckel Diverticulum (2 inches long, 2 feet from ileocecal valve, 2% population).'
      }
    ],
    tasks: [
      {
        id: 'git-task-1',
        phaseNumber: 1,
        titleAr: 'تأسيس فسيولوجيا الهضم، الإفرازات وهرمونات الجهاز الهضمي',
        titleEn: 'GI Motility, Secretions & Regulatory Peptides',
        descriptionAr: 'دراسة وظائف الخلايا الجدارية (Parietal cells)، امتصاص الدهون، وأيض البيليروبين في الكبد.',
        highYieldTipAr: 'افهم دورة البيليروبين (Enterohepatic circulation) لتستنتج نوع اليرقان بسهولة.',
        relativeStartPct: 0,
        relativeEndPct: 35,
        suggestedDaysWeight: 0.35
      },
      {
        id: 'git-task-2',
        phaseNumber: 2,
        titleAr: 'أمراض الكبد، الأورام، والتهاب الأمعاء المناعي مع فلاش كاردز',
        titleEn: 'Hepatology, IBD, Malignancies & Anki Flashcards',
        descriptionAr: 'مذاكرة الفيروسات الكبدية، تليف الكبد، الفارق بين Crohn و UC، وأدوية علاج القرحة ومضادات الإسهال.',
        highYieldTipAr: 'Crohn: Skip lesions, transmural, noncaseating granulomas. UC: Continuous, mucosal, pseudopolyps.',
        relativeStartPct: 35,
        relativeEndPct: 65,
        suggestedDaysWeight: 0.30
      },
      {
        id: 'git-task-3',
        phaseNumber: 3,
        titleAr: 'حل بنوك أسئلة الجامعات المصرية وسيناريوهات USMLE',
        titleEn: 'Egyptian Faculty MCQs & Clinical Vignettes',
        descriptionAr: 'حل 250 سؤال MCQ من امتحانات السنوات السابقة، مع التركيز على حالات النزيف المعوي العلوي والسفلي.',
        highYieldTipAr: 'عند قراءة سؤال نزيف هضمي، الخطوة الأولى دائماً هي الإنعاش الدوري (IV fluids & stabilization) قبل المنظار.',
        relativeStartPct: 65,
        relativeEndPct: 85,
        suggestedDaysWeight: 0.20
      },
      {
        id: 'git-task-4',
        phaseNumber: 4,
        titleAr: 'المحاكاة النهائية، شرائح الباثولوجي وكشكول الأخطاء',
        titleEn: 'Histology/Pathology Spots & Timed Simulation',
        descriptionAr: 'مراجعة علامات أشعة الصبغة (Barium swallow & enema)، صور العينات، وحل امتحان كامل بوقت زمني محدد.',
        highYieldTipAr: 'علامة Bird-beak appearance في المريء تدل على Achalasia، وعلامة String sign تدل على Crohn أو Pyloric Stenosis.',
        relativeStartPct: 85,
        relativeEndPct: 100,
        suggestedDaysWeight: 0.15
      }
    ]
  },
  {
    id: 'cns',
    code: 'CNS',
    titleAr: 'الجهاز العصبي المركزي والحواس',
    titleEn: 'Central Nervous System & Special Senses',
    systemNameAr: 'مخ وأعصاب، عيون، وأنف وأذن',
    systemNameEn: 'Neurology, Neurosurgery & Special Senses',
    badgeColor: 'purple',
    summaryAr: 'يشمل تشريح مسارات الحبل الشوكي والمخ، السكتات الدماغية، الصرع، التصلب المتعدد (MS)، وأمراض التنكس العصبي مع أدوية الأعصاب.',
    summaryEn: 'Covers neuroanatomy tracts, stroke syndromes, epilepsy, multiple sclerosis, neurodegenerative disorders, and psychopharmacology.',
    typicalDurationWeeks: 6,
    coreSubjects: ['Neuroanatomy (Spinal Tracts & Cranial Nerves)', 'Neurovascular Syndromes & Stroke', 'Neuropathology & Demyelination', 'Neuropharmacology & Anesthetics'],
    highYieldTopics: [
      'Stroke Localization (MCA, ACA, PCA, Vertebrobasilar syndromes)',
      'Spinal Cord Lesions (Brown-Séquard, Syringomyelia, Tabes Dorsalis)',
      'Cranial Nerve Palsies (CN III, IV, VI, VII Bell vs UMN palsy)',
      'Multiple Sclerosis vs Guillain-Barré Syndrome',
      'Antiepileptic Drugs (Mechanism of Action & Teratogenicity)',
      'Visual Field Defects (Hemianopia, Quadrantanopia)'
    ],
    egyptianResources: [
      {
        id: 'cns-kasr-cases',
        title: 'بنك حالات قصر العيني العصبية الإكلينيكية (Kasr CNS Cases & MCQs)',
        sourceType: 'egyptian',
        institutionOrPlatform: 'قصر العيني - جامعة القاهرة',
        category: 'mcq_bank',
        descriptionAr: 'تجميعة سيناريوهات الفحص العصبي (Reflexes, Babinski sign, Cranial nerves examination) مع أسئلة الامتحانات.',
        descriptionEn: 'Clinical examination findings, reflex scoring, and localizing stroke syndromes.',
        tags: ['Kasr Al-Ainy', 'Neuro Examination', 'Stroke Vignettes'],
        highYieldNotes: 'الأسئلة تركز على تحديد موضع الإصابة (Lesion Localization) بدقة قبل السؤال عن الدواء.'
      },
      {
        id: 'cns-mansoura-neuroanatomy',
        title: 'دليل تشريح الأعصاب ومقاطع المخ - طب المنصورة',
        sourceType: 'egyptian',
        institutionOrPlatform: 'جامعة المنصورة',
        category: 'ospe_cases',
        descriptionAr: 'مقاطع جذع المخ (Midbrain, Pons, Medulla) وتحديد أماكن الأنوية والألياف العصبية للامتحان العملي.',
        descriptionEn: 'Brainstem cross-sections identifying cranial nerve nuclei and lemniscal pathways.',
        tags: ['Mansoura', 'Brainstem Cuts', 'OSPE'],
        highYieldNotes: 'احفظ قاعدة الأربعة في جذع المخ (Rule of 4 of the brainstem) لحل أي مقطع في ثوانٍ.'
      }
    ],
    usmleResources: [
      {
        id: 'cns-anking-v12',
        title: 'AnKing Step 1: Neurology & Special Senses Deck',
        sourceType: 'usmle',
        institutionOrPlatform: 'AnkiHub',
        category: 'anki_deck',
        descriptionAr: 'أقوى دك لمراجعة مسارات الحبل الشوكي وأدوية الصرع والتخدير مع صور توضيحية عالية الجودة.',
        descriptionEn: 'Comprehensive deck covering spinal pathways, intracranial hemorrhages, and neuro-pharmacology.',
        tags: ['#AK_Step1_v12::!FirstAid::14_Neurology', 'Pathoma CNS'],
        externalUrl: 'https://ankihub.net',
        highYieldNotes: 'كرر كروت العصب السابع (Bell palsy vs UMN facial palsy) ومسارات الإبصار يومياً.'
      },
      {
        id: 'cns-uworld-strokes',
        title: 'UWorld Stroke & Intracranial Hemorrhage Master Bank',
        sourceType: 'usmle',
        institutionOrPlatform: 'UWorld',
        category: 'mcq_bank',
        descriptionAr: 'سيناريوهات سريرية للمقارنة بين نزيف فوق الجافية (Epidural)، تحت الجافية (Subdural)، ونزيف تحت العنكبوتية (SAH).',
        descriptionEn: 'Vignettes contrasting epidural, subdural, and subarachnoid hemorrhages with CT correlates.',
        tags: ['Epidural', 'Subdural', 'SAH', 'CT Brain'],
        highYieldNotes: 'عدسة محدبة الوجهين = Epidural (Middle meningeal a.), هلالية تعبر الدروز = Subdural (Bridging veins).'
      }
    ],
    tasks: [
      {
        id: 'cns-task-1',
        phaseNumber: 1,
        titleAr: 'تأسيس تشريح الأعصاب، مسارات الحبل الشوكي والأعصاب القحفية',
        titleEn: 'Spinal Tracts, Cranial Nerves & Brainstem Rule of 4',
        descriptionAr: 'رسم المسارات الحسية (Dorsal column, Spinothalamic) والحركية (Corticospinal) وفهم وظائف الـ 12 عصب قحفي.',
        highYieldTipAr: 'تذكر أن الإحساس باللمس الدقيق والاهتزاز يعبر في النخاع المستطيل، بينما الألم والحرارة يعبران فور دخولهما الحبل الشوكي.',
        relativeStartPct: 0,
        relativeEndPct: 35,
        suggestedDaysWeight: 0.35
      },
      {
        id: 'cns-task-2',
        phaseNumber: 2,
        titleAr: 'السكتات الدماغية، أمراض التحلل العصبي وأدوية الصرع مع Anki',
        titleEn: 'Strokes, Parkinson, Alzheimer & Anticonvulsants',
        descriptionAr: 'دراسة متلازمات الشرايين المخية، نزيف المخ، أدوية الصرع والشلل الرعاش مع تشغيل المراجعة اليومية على Anki.',
        highYieldTipAr: 'احفظ أن دواء Valproate يسبب Neural tube defects ويمنع في الحمل، بينما Ethosuximide مخصص لنوبات الغياب (Absence seizures).',
        relativeStartPct: 35,
        relativeEndPct: 65,
        suggestedDaysWeight: 0.30
      },
      {
        id: 'cns-task-3',
        phaseNumber: 3,
        titleAr: 'حل بنوك أسئلة قصر العيني وعين شمس + حالات USMLE السريرية',
        titleEn: 'Egyptian Faculty Past Papers & USMLE Vignettes',
        descriptionAr: 'حل 300 سؤال تشخيص عصبي وتحديد مكان الإصابة مع التركيز على متلازمة Brown-Séquard وانضغاط الأعصاب.',
        highYieldTipAr: 'في أسئلة متلازمة براون-سيكوار: فقد الحركة والاهتزاز في نفس جهة الإصابة، وفقد الألم والحرارة في الجهة المقابلة.',
        relativeStartPct: 65,
        relativeEndPct: 85,
        suggestedDaysWeight: 0.20
      },
      {
        id: 'cns-task-4',
        phaseNumber: 4,
        titleAr: 'المحاكاة الشاملة، صور مقاطع الأشعة (CT/MRI) وكشكول الأخطاء',
        titleEn: 'Neuro-radiology, Brain Cross-sections & Final Mock',
        descriptionAr: 'التدريب على مقاطع المخ والأشعة، مراجعة عيوب مجال الرؤية، وحل نموذج امتحان نهائي بوقت محدد.',
        highYieldTipAr: 'ورم الغدة النخامية يضغط على التصالب البصري ويسبب Bitemporal hemianopia.',
        relativeStartPct: 85,
        relativeEndPct: 100,
        suggestedDaysWeight: 0.15
      }
    ]
  },
  {
    id: 'renal',
    code: 'RENAL',
    titleAr: 'الجهاز البولي والكلى',
    titleEn: 'Renal & Urinary System',
    systemNameAr: 'كلى ومسالك بولية وتوازن أملاح',
    systemNameEn: 'Nephrology & Urology',
    badgeColor: 'emerald',
    summaryAr: 'يشمل فسيولوجيا النفرون، حساب تصفية الكلى (GFR)، متلازمات التهاب الكبيبات (Nephrotic vs Nephritic)، الفشل الكلوي الحاد والمزمن، ومدرات البول.',
    summaryEn: 'Focuses on nephron physiology, GFR clearance, glomerulonephritis syndromes, acute kidney injury (AKI), acid-base, and diuretics.',
    typicalDurationWeeks: 4,
    coreSubjects: ['Renal Tubular Physiology & Clearance', 'Glomerular Pathology (Nephrotic vs Nephritic)', 'Acute Kidney Injury & Chronic Kidney Disease', 'Diuretics & Electrolyte Disorders'],
    highYieldTopics: [
      'Nephrotic vs Nephritic Syndromes (Biopsy findings & Immunofluorescence)',
      'Diuretics Site of Action & Electrolyte Effects (Loop, Thiazide, K-sparing)',
      'Acute Kidney Injury Classification (Prerenal, Intrinsic, Postrenal)',
      'Renal Tubular Acidosis (Type 1, Type 2, Type 4 comparison)',
      'Secondary Hypertension (Renal artery stenosis & Fibromuscular dysplasia)',
      'Kidney Stones (Calcium oxalate, Struvite, Uric acid, Cystine)'
    ],
    egyptianResources: [
      {
        id: 'renal-kasr-papers',
        title: 'بنك أسئلة الكلى والمسالك - قصر العيني وأسيوط',
        sourceType: 'egyptian',
        institutionOrPlatform: 'قصر العيني وجامعة أسيوط',
        category: 'past_papers',
        descriptionAr: 'تجميعة لأسئلة التهاب الكبيبات الحاد والمزمن وحصوات المسالك البولية مع أسئلة العملي.',
        descriptionEn: 'Curated past questions on glomerulopathies, stone management, and urinary OSPE.',
        tags: ['Kasr Al-Ainy', 'Assiut', 'Nephrology MCQs'],
        highYieldNotes: 'سؤال التفرقة بين Nephrotic و Nephritic يتكرر في كل دور امتحاني دون استثناء.'
      },
      {
        id: 'renal-mansoura-urology',
        title: 'أطلس مركز غنيم لجراحة الكلى والمسالك - طب المنصورة',
        sourceType: 'egyptian',
        institutionOrPlatform: 'مركز الكلى والمسالك الدولية - المنصورة',
        category: 'ospe_cases',
        descriptionAr: 'صور عينات حصوات الكلى، أورام الكلى (RCC)، وصور الأشعة بالصبغة (IVU/CT Urography).',
        descriptionEn: 'Renal calculi specimens, clear cell carcinoma histology, and IVU contrast imaging.',
        tags: ['Mansoura Urology', 'Renal Stones', 'OSPE'],
        highYieldNotes: 'حصوات Struvite المرتبطة بميكروب Proteus (Staghorn calculus) من أكثر الأسئلة العملية شيوعاً.'
      }
    ],
    usmleResources: [
      {
        id: 'renal-anking-fa',
        title: 'AnKing Step 1: Renal System Deck',
        sourceType: 'usmle',
        institutionOrPlatform: 'AnkiHub',
        category: 'anki_deck',
        descriptionAr: 'كروت التكرار المتباعد لفسيولوجيا الأنابيب الكلوية وصور المجهر الإلكتروني (Electron Microscopy) لمرض الكلى.',
        descriptionEn: 'Spaced repetition deck drilling nephron transporters, EM spikes, and humps.',
        tags: ['#AK_Step1_v12::!FirstAid::15_Renal', 'Pathoma Renal'],
        externalUrl: 'https://ankihub.net',
        highYieldNotes: 'تأكد من حفظ صور الـ EM: Subepithelial humps في PSGN، و Spike and dome في Membranous.'
      },
      {
        id: 'renal-uworld-electrolytes',
        title: 'UWorld Fluid & Electrolyte Disorders Question Bank',
        sourceType: 'usmle',
        institutionOrPlatform: 'UWorld',
        category: 'mcq_bank',
        descriptionAr: 'أسئلة سريرية لضبط مستويات الصوديوم والبوتاسيوم وتجنب مضاعفات التصحيح السريع (Osmotic Demyelination).',
        descriptionEn: 'Vignettes drilling hyponatremia workups, hyperkalemia ECG changes, and safe correction.',
        tags: ['Hyponatremia', 'Hyperkalemia', 'Diuretics'],
        highYieldNotes: 'تصحيح الصوديوم البطيء: Low to high your pons will die, High to low your brain will blow.'
      }
    ],
    tasks: [
      {
        id: 'renal-task-1',
        phaseNumber: 1,
        titleAr: 'تأسيس فسيولوجيا النفرون ومدرات البول وتصفية الكلى',
        titleEn: 'Nephron Transport, Clearance Equations & Diuretics',
        descriptionAr: 'فهم انتقال الأيونات في كل جزء من النفرون ومواقع عمل مدرات البول (Furosemide, Thiazides, Spironolactone).',
        highYieldTipAr: 'احفظ أن مدرات Loop تسبب الكالسيوم يضيع في البول (Loops lose calcium)، بينما Thiazides تحافظ على الكالسيوم.',
        relativeStartPct: 0,
        relativeEndPct: 35,
        suggestedDaysWeight: 0.35
      },
      {
        id: 'renal-task-2',
        phaseNumber: 2,
        titleAr: 'باثولوجيا الكبيبات (Nephrotic vs Nephritic) مع Anki',
        titleEn: 'Glomerulonephritis, AKI, Pathology & Anki Flashcards',
        descriptionAr: 'مذاكرة الفروق الدقيقة بين أمراض الكبيبات وصور المجهر الضوئي والفلورسنت مع تفعيل كروت Anki يومياً.',
        highYieldTipAr: 'مرض Minimal change disease يتميز بـ Effacement of foot processes ويستجيب بنسبة ممتازة للكورتيزون.',
        relativeStartPct: 35,
        relativeEndPct: 65,
        suggestedDaysWeight: 0.30
      },
      {
        id: 'renal-task-3',
        phaseNumber: 3,
        titleAr: 'حل بنوك أسئلة قصر العيني وعين شمس + حالات USMLE السريرية',
        titleEn: 'Egyptian Past Exam MCQs & Clinical Vignettes',
        descriptionAr: 'حل 200 سؤال سريري على حالات الفشل الكلوي الحاد والمزمن واضطرابات الأملاح ونظام رينين أنجيوتنسين.',
        highYieldTipAr: 'في الفشل الكلوي قبل الكلوي (Prerenal AKI) تكون نسبة BUN/Cr أكثر من 20 و FeNa أقل من 1%.',
        relativeStartPct: 65,
        relativeEndPct: 85,
        suggestedDaysWeight: 0.20
      },
      {
        id: 'renal-task-4',
        phaseNumber: 4,
        titleAr: 'أطلس العينات (OSPE) والامتحان التجريبي الشامل وكشكول الأخطاء',
        titleEn: 'Urine Microscopy Casts, Biopsy Spotting & Timed Exam',
        descriptionAr: 'مراجعة أشكال رواسب البول (RBC casts, WBC casts, Muddy brown granular casts)، وامتحان تجريبي كامل.',
        highYieldTipAr: 'Muddy brown granular casts = Acute Tubular Necrosis (ATN)، بينما RBC casts = Glomerulonephritis.',
        relativeStartPct: 85,
        relativeEndPct: 100,
        suggestedDaysWeight: 0.15
      }
    ]
  },
  {
    id: 'endocrine-repro',
    code: 'ENDO-REPRO',
    titleAr: 'الغدد الصماء والتناسل',
    titleEn: 'Endocrine & Reproductive System',
    systemNameAr: 'غدد صماء وتكاثر ونساء وتوليد',
    systemNameEn: 'Endocrinology & Reproductive Biology',
    badgeColor: 'teal',
    summaryAr: 'يشمل هرمونات النخامية، الغدة الدرقية، الغدة الكظرية، السكري، هرمونات الدورة الشهرية، الحمل، وأورام الجهاز التناسلي.',
    summaryEn: 'Covers pituitary axes, thyroid pathology, adrenal cortex disorders, diabetes regimens, menstrual cycle, pregnancy physiology, and reproductive cancers.',
    typicalDurationWeeks: 5,
    coreSubjects: ['Hypothalamic-Pituitary Axes & Feedback', 'Thyroid & Adrenal Pathology', 'Diabetes Mellitus & Insulin Regimens', 'Reproductive Physiology & Gynecologic Pathology'],
    highYieldTopics: [
      'Cushing Syndrome Diagnostic Workup (Low-dose vs High-dose Dexamethasone)',
      'Thyroid Nodules, Graves Disease & Thyroiditis',
      'Congenital Adrenal Hyperplasia (21 vs 11-beta vs 17-alpha hydroxylase)',
      'Diabetes Mellitus (DKA vs HHS management & Oral agents)',
      'Polycystic Ovarian Syndrome (PCOS diagnosis & LH/FSH ratios)',
      'Ovarian & Uterine Tumors (Teratoma, Serous/Mucinous, Endometrial CA)'
    ],
    egyptianResources: [
      {
        id: 'endo-kasr-cases',
        title: 'تجميعة الغدد والنساء والتوليد - قصر العيني وعين شمس',
        sourceType: 'egyptian',
        institutionOrPlatform: 'قصر العيني وعين شمس',
        category: 'past_papers',
        descriptionAr: 'أسئلة السنوات السابقة عن مضاعفات السكري، أورام الثدي، وأمراض الغدة الدرقية مع إجابات أعضاء هيئة التدريس.',
        descriptionEn: 'Endocrine past exams with comprehensive faculty answer explanations.',
        tags: ['Kasr Al-Ainy', 'Ain Shams', 'Endocrine & OBGYN'],
        highYieldNotes: 'حالات DKA و Cushing workup من أكثر الأسئلة المقالية القصيرة وروداً في الامتحانات.'
      },
      {
        id: 'repro-alex-histopathology',
        title: 'أطلس باثولوجي أمراض النساء والثدي - طب الإسكندرية',
        sourceType: 'egyptian',
        institutionOrPlatform: 'جامعة الإسكندرية',
        category: 'ospe_cases',
        descriptionAr: 'شرائح هستولوجية لأورام الثدي (Invasive Ductal Carcinoma) وتكيس المبايض للامتحان العملي.',
        descriptionEn: 'High-yield pathology slides of breast and gynecologic lesions.',
        tags: ['Alexandria', 'Breast Pathology', 'OSPE'],
        highYieldNotes: 'علامة Call-Exner bodies في ورم Granulosa cell tumor تتكرر في محطات العملي والنظري.'
      }
    ],
    usmleResources: [
      {
        id: 'endo-repro-anking',
        title: 'AnKing Step 1: Endocrine & Reproductive Decks',
        sourceType: 'usmle',
        institutionOrPlatform: 'AnkiHub',
        category: 'anki_deck',
        descriptionAr: 'كروت مراجعة التكرار المتباعد لهرمونات الاستيرويد ومسارات الغدد مع رسومات توضيحية.',
        descriptionEn: 'Spaced repetition cards for steroidogenesis pathways and menstrual feedback loops.',
        tags: ['#AK_Step1_v12::!FirstAid::07_Endocrine', 'Reproductive Deck'],
        externalUrl: 'https://ankihub.net',
        highYieldNotes: 'احفظ مخطط CAH بدقة؛ إذا كان الرقم يبدأ بـ 1 (11 و 17) فإنه يسبب ارتفاع الضغط، وإذا كان ينتهي بـ 1 (21 و 11) يسبب Virilization.'
      },
      {
        id: 'endo-uworld-algorithms',
        title: 'UWorld Endocrine Diagnostic Pathways',
        sourceType: 'usmle',
        institutionOrPlatform: 'UWorld',
        category: 'mcq_bank',
        descriptionAr: 'خوارزميات تشخيصية تفاعلية للغدة الدرقية، الكظرية، وأورام الغدة النخامية المتعددة (MEN 1, 2A, 2B).',
        descriptionEn: 'High-yield vignettes detailing workups for hypercalcemia, adrenal insufficiency, and MEN syndromes.',
        tags: ['MEN Syndromes', 'Hypercalcemia', 'Adrenal Insufficiency'],
        highYieldNotes: 'متلازمات MEN: جميعها تشمل ورم الغدد الجار درقية ما عدا MEN 2B.'
      }
    ],
    tasks: [
      {
        id: 'endo-task-1',
        phaseNumber: 1,
        titleAr: 'تأسيس محاور الغدد الصماء وهرمونات الاستيرويد والتناسل',
        titleEn: 'HPA Axes, Steroidogenesis & Menstrual Hormone Cycles',
        descriptionAr: 'فهم آليات التغذية الراجعة (Negative feedback) ومسارات تصنيع الهرمونات من الكوليسترول.',
        highYieldTipAr: 'الهرمونات الببتيدية تعمل عن طريق مستقبلات الغشاء الخلوي و cAMP، بينما هرمونات الاستيرويد والدرقية تخترق النواة.',
        relativeStartPct: 0,
        relativeEndPct: 35,
        suggestedDaysWeight: 0.35
      },
      {
        id: 'endo-task-2',
        phaseNumber: 2,
        titleAr: 'أمراض الغدة الدرقية، السكري، أورام التناسل وفلاش كاردز Anki',
        titleEn: 'Thyroid, Diabetes, Gynecologic Pathology & Anki Cards',
        descriptionAr: 'مذاكرة Graves, Hashimoto, DKA vs HHS, أدوية الأنسولين والسكر الفموية مع مراجعة كروت Anki يومياً.',
        highYieldTipAr: 'أدوية SGLT-2 inhibitors تمنع امتصاص السكر في الكلى وتفيد مرضى فشل القلب لكنها تزيد فرصة التهابات المسالك الفطرية.',
        relativeStartPct: 35,
        relativeEndPct: 65,
        suggestedDaysWeight: 0.30
      },
      {
        id: 'endo-task-3',
        phaseNumber: 3,
        titleAr: 'حل بنوك أسئلة قصر العيني وعين شمس + حالات USMLE السريرية',
        titleEn: 'Egyptian Faculty Past Papers & USMLE Vignettes',
        descriptionAr: 'حل 250 سؤال سريري على حالات Cushing, Addison, Pheochromocytoma ومتلازمة تكيس المبايض.',
        highYieldTipAr: 'في حالات ورم القواتم (Pheochromocytoma) يجب إعطاء Alpha-blocker أولاً (مثل Phenoxybenzamine) قبل إعطاء Beta-blocker منعاً لارتفاع الضغط القاتل.',
        relativeStartPct: 65,
        relativeEndPct: 85,
        suggestedDaysWeight: 0.20
      },
      {
        id: 'endo-task-4',
        phaseNumber: 4,
        titleAr: 'المحاكاة النهائية، شرائح الباثولوجي وكشكول الأخطاء',
        titleEn: 'Endocrine/Repro Spotting, Mistake Review & Final Mock',
        descriptionAr: 'مراجعة علامات السونار وأورام الثدي، مراجعة كشكول الأخطاء وحل نموذج امتحان كامل بوقت زمني محدد.',
        highYieldTipAr: 'خلايا Orphan Annie eyes و Psammoma bodies علامة مميزة لسرطان الغدة الدرقية الحليمي (Papillary Thyroid Carcinoma).',
        relativeStartPct: 85,
        relativeEndPct: 100,
        suggestedDaysWeight: 0.15
      }
    ]
  },
  {
    id: 'musculoskeletal',
    code: 'MSK',
    titleAr: 'الجهاز العضلي الهيكلي والجلدية',
    titleEn: 'Musculoskeletal & Integumentary System',
    systemNameAr: 'عظام وروماتيزم وجلدية',
    systemNameEn: 'Orthopedics, Rheumatology & Dermatology',
    badgeColor: 'orange',
    summaryAr: 'يشمل تشريح الضفيرة العضدية، كسور العظام، أمراض المفاصل الروماتيزمية (RA, SLE, Gout)، وأمراض الجلد الفقاعية الشائعة.',
    summaryEn: 'Covers brachial plexus anatomy, bone fractures, autoimmune rheumatology (SLE, RA, Scleroderma), and blistering skin disorders.',
    typicalDurationWeeks: 4,
    coreSubjects: ['Brachial Plexus & Upper/Lower Limb Nerves', 'Rheumatology & Autoantibodies', 'Bone Pathology (Osteoporosis, Osteomalacia, Tumors)', 'Dermatology & Blistering Diseases'],
    highYieldTopics: [
      'Brachial Plexus Injuries (Erb Duchenne vs Klumpke Palsy)',
      'Upper Limb Peripheral Nerve Lesions (Radial, Median, Ulnar nerve drops)',
      'Rheumatoid Arthritis vs Osteoarthritis vs Gout vs Pseudogout',
      'Systemic Lupus Erythematosus (Diagnostic criteria & Autoantibody profile)',
      'Pemphigus Vulgaris vs Bullous Pemphigoid (Nikolsky sign & Desmoglein)',
      'Bone Tumors (Osteosarcoma, Ewing Sarcoma, Giant Cell Tumor)'
    ],
    egyptianResources: [
      {
        id: 'msk-kasr-ortho',
        title: 'بنك أسئلة جراحة العظام والروماتيزم - قصر العيني والمنصورة',
        sourceType: 'egyptian',
        institutionOrPlatform: 'قصر العيني والمنصورة',
        category: 'past_papers',
        descriptionAr: 'تجميعة أسئلة كسور عظمة العضد (Humerus fractures) وتحديد العصب المصاب بدقة.',
        descriptionEn: 'Essential past questions linking fracture sites to associated nerve and vascular damage.',
        tags: ['Kasr Al-Ainy', 'Mansoura', 'Orthopedics & Fractures'],
        highYieldNotes: 'كسور عظمة العضد (ARM): Surgical neck = Axillary n., Midshaft = Radial n., Supracondylar = Median n.'
      },
      {
        id: 'derm-ain-shams-cases',
        title: 'أطلس الأمراض الجلدية السريرية - طب عين شمس',
        sourceType: 'egyptian',
        institutionOrPlatform: 'جامعة عين شمس',
        category: 'ospe_cases',
        descriptionAr: 'صور سريرية لأمراض الصدفية، الحزاز، الذئبة الحمراء، وأورام الجلد (Melanoma, Basal cell CA).',
        descriptionEn: 'Clinical atlas of skin lesions and high-yield dermatology spotters.',
        tags: ['Ain Shams', 'Dermatology OSPE', 'Autoimmune Skin'],
        highYieldNotes: 'تذكر قاعدة ABCDE لفحص الشامات المشتبه بها في تشخيص Melanoma.'
      }
    ],
    usmleResources: [
      {
        id: 'msk-anking-v12',
        title: 'AnKing Step 1: Musculoskeletal & Skin Chapter',
        sourceType: 'usmle',
        institutionOrPlatform: 'AnkiHub',
        category: 'anki_deck',
        descriptionAr: 'كروت التكرار المتباعد لأجسام المناعة الذاتية (ANA, Anti-dsDNA, Anti-Smith, Anti-Ro/La).',
        descriptionEn: 'Spaced repetition cards drilling autoantibodies, nerve muscle tests, and skin layers.',
        tags: ['#AK_Step1_v12::!FirstAid::13_MSK', 'Pathoma Skin'],
        externalUrl: 'https://ankihub.net',
        highYieldNotes: 'Anti-Smith و Anti-dsDNA أكثر الأجسام المناعية نوعية للذئبة الحمراء (SLE).'
      },
      {
        id: 'msk-uworld-joints',
        title: 'UWorld Joint Fluid & Rheumatology Vignettes',
        sourceType: 'usmle',
        institutionOrPlatform: 'UWorld',
        category: 'mcq_bank',
        descriptionAr: 'سيناريوهات سريرية لتحليل سائل المفصل والتفرقة بين النقرس (Negative birefringent) والنقرس الكاذب.',
        descriptionEn: 'Vignettes distinguishing crystal arthropathies, septic arthritis, and Lyme disease.',
        tags: ['Gout vs Pseudogout', 'Synovial Fluid', 'SLE Criteria'],
        highYieldNotes: 'النقرس: بلورات إبرية سالبة الانكسار للضوء الأصفر موازية للمحور (Needle-shaped & negatively birefringent).'
      }
    ],
    tasks: [
      {
        id: 'msk-task-1',
        phaseNumber: 1,
        titleAr: 'تأسيس تشريح الأعصاب الطرفية والضفيرة العضدية والكسور',
        titleEn: 'Brachial Plexus, Peripheral Nerves & Fractures',
        descriptionAr: 'رسم الضفيرة العضدية وتحديد مسار أعصاب اليد (Radial, Median, Ulnar) وتشريح مفصل الركبة (ACL, Meniscus).',
        highYieldTipAr: 'إصابة عصب Radial تسبب Wrist drop، وإصابة Median تسبب Hand of benediction أو Ape hand، وإصابة Ulnar تسبب Claw hand.',
        relativeStartPct: 0,
        relativeEndPct: 35,
        suggestedDaysWeight: 0.35
      },
      {
        id: 'msk-task-2',
        phaseNumber: 2,
        titleAr: 'أمراض الروماتيزم، الأجسام المضادة وأمراض الجلد مع Anki',
        titleEn: 'Rheumatology, Autoantibodies, Dermatology & Anki',
        descriptionAr: 'دراسة الذئبة الحمراء، الروماتويد، النقرس، والفرق بين Pemphigus و Bullous pemphigoid مع كروت Anki يومياً.',
        highYieldTipAr: 'Pemphigus vulgaris: تصيب الغشاء المخاطي، وتتميز بظاهرة Nikolsky إيجابية وانفصال فوق الطبقة القاعدية.',
        relativeStartPct: 35,
        relativeEndPct: 65,
        suggestedDaysWeight: 0.30
      },
      {
        id: 'msk-task-3',
        phaseNumber: 3,
        titleAr: 'حل بنوك أسئلة قصر العيني وعين شمس + حالات USMLE السريرية',
        titleEn: 'Egyptian Faculty Past Papers & USMLE Vignettes',
        descriptionAr: 'حل 200 سؤال سريري على أورام العظام وإصابات الملاعب والتهابات المفاصل الصديدية.',
        highYieldTipAr: 'ورم Osteosarcoma يتميز بمظهر Codman triangle و Sunburst appearance على الأشعة السينية.',
        relativeStartPct: 65,
        relativeEndPct: 85,
        suggestedDaysWeight: 0.20
      },
      {
        id: 'msk-task-4',
        phaseNumber: 4,
        titleAr: 'المحاكاة النهائية، شرائح الأشعة والمفاصل وكشكول الأخطاء',
        titleEn: 'X-ray Spotting, Joint Fluid Review & Final Timed Mock',
        descriptionAr: 'مراجعة صور كسور العظام وأشعة المفاصل، مراجعة كشكول الأخطاء وحل امتحان تجريبي شامل في زمن محدد.',
        highYieldTipAr: 'في التهاب المفاصل الصديدي (Septic arthritis) عدد خلايا الدم البيضاء في سائل المفصل يتجاوز 50,000.',
        relativeStartPct: 85,
        relativeEndPct: 100,
        suggestedDaysWeight: 0.15
      }
    ]
  },
  {
    id: 'hematology-immune',
    code: 'HEMA-IMM',
    titleAr: 'أمراض الدم والمناعة',
    titleEn: 'Hematology & Immunology',
    systemNameAr: 'أمراض دم، ليمفاوية، ومناعة طبية',
    systemNameEn: 'Hematology, Oncology & Immunology',
    badgeColor: 'red',
    summaryAr: 'يشمل فقر الدم (Anemia) بأنواعه، اضطرابات تجلط الدم (PT/PTT)، اللوكيميا، الليمفوما، وأمراض نقص المناعة الأولية ونقل الدم.',
    summaryEn: 'Covers anemias, bleeding disorders (coagulation cascades), leukemias, lymphomas, immunodeficiencies, and transfusion medicine.',
    typicalDurationWeeks: 4,
    coreSubjects: ['Microcytic, Normocytic & Macrocytic Anemias', 'Hemostasis & Coagulation Cascade', 'Leukemias & Lymphomas Pathology', 'Primary Immunodeficiency Syndromes'],
    highYieldTopics: [
      'Microcytic Anemia Workup (Iron Deficiency vs Thalassemia vs Sideroblastic)',
      'Coagulation Cascade & Drug Monitoring (Heparin/PTT vs Warfarin/PT/INR vs DOACs)',
      'Leukemia Classification (AML Auer rods vs ALL vs CML Philadelphia vs CLL smudge cells)',
      'Hodgkin Lymphoma (Reed-Sternberg cells) vs Non-Hodgkin Lymphomas',
      'Platelet Disorders (ITP vs TTP pentad vs HUS vs DIC)',
      'Primary Immunodeficiencies (SCID vs X-linked Agammaglobulinemia vs CGD)'
    ],
    egyptianResources: [
      {
        id: 'hema-kasr-papers',
        title: 'بنك أسئلة أمراض الدم وأورام الأطفال - قصر العيني (57357 Compendium)',
        sourceType: 'egyptian',
        institutionOrPlatform: 'قصر العيني ومستشفى 57357',
        category: 'past_papers',
        descriptionAr: 'تجميعة شاملة لحالات أنيميا البحر المتوسط (Thalassemia)، الفوال (G6PD)، واللوكيميا الشائعة في مصر.',
        descriptionEn: 'High-yield past papers on thalassemia syndromes, sickle cell, and childhood leukemias.',
        tags: ['Kasr Al-Ainy', '57357', 'Thalassemia & Anemias'],
        highYieldNotes: 'أنيميا الفوال (G6PD deficiency) وأنيميا البحر المتوسط من الأسئلة الحتمية في امتحانات الجامعات المصرية.'
      },
      {
        id: 'hema-mansoura-smears',
        title: 'أطلس مسحات الدم المجهرية ونخاع العظم - طب المنصورة',
        sourceType: 'egyptian',
        institutionOrPlatform: 'جامعة المنصورة',
        category: 'ospe_cases',
        descriptionAr: 'صور مجهرية لـ Target cells, Tear drop cells, Auer rods, و Reed-Sternberg cells لمحطات العملي.',
        descriptionEn: 'Blood smears and bone marrow aspirates essential for practical hematology exams.',
        tags: ['Mansoura', 'Blood Smears', 'OSPE'],
        highYieldNotes: 'خلايا Auer rods علامة قاطعة لتشخيص Acute Myeloid Leukemia (AML).'
      }
    ],
    usmleResources: [
      {
        id: 'hema-anking-v12',
        title: 'AnKing Step 1: Hematology & Oncology Chapter',
        sourceType: 'usmle',
        institutionOrPlatform: 'AnkiHub',
        category: 'anki_deck',
        descriptionAr: 'كروت التكرار المتباعد لتغيرات الجينات والانتقالات الصبغية (t(9;22), t(15;17), t(8;14)).',
        descriptionEn: 'High-yield deck drilling chromosomal translocations, chemo drugs, and bleeding labs.',
        tags: ['#AK_Step1_v12::!FirstAid::09_Hematology', 'Pathoma Chapters 4, 5, 6'],
        externalUrl: 'https://ankihub.net',
        highYieldNotes: 't(15;17) تدل على Acute Promyelocytic Leukemia (APL) وعلاجها هو All-trans retinoic acid (ATRA).'
      },
      {
        id: 'hema-uworld-bleeding',
        title: 'UWorld Hemostasis & Coagulation Vignettes',
        sourceType: 'usmle',
        institutionOrPlatform: 'UWorld',
        category: 'mcq_bank',
        descriptionAr: 'أسئلة سريرية للمقارنة بين أمراض الصفائح الدموية وأمراض عوامل التجلط (Hemophilia vs vWD).',
        descriptionEn: 'Vignettes distinguishing primary vs secondary hemostasis defects with clinical labs.',
        tags: ['Coagulation Cascade', 'Hemophilia A/B', 'vWD & ITP'],
        highYieldNotes: 'مرض فون فيلبراند (vWD) يسبب زيادة في زمن النزيف (Bleeding time) وقد يرفع PTT لأن vWF يحمل Factor VIII.'
      }
    ],
    tasks: [
      {
        id: 'hema-task-1',
        phaseNumber: 1,
        titleAr: 'تأسيس فقر الدم (Anemia) وشلال التجلط وتفسير التحاليل',
        titleEn: 'Anemia Algorithms, Coagulation Cascade & Labs',
        descriptionAr: 'فهم خوارزمية MCV، فحص الحديد (Ferritin, TIBC, Iron)، واختبارات التجلط (PT, PTT, Bleeding time).',
        highYieldTipAr: 'في أنيميا نقص الحديد: Ferritin ينخفض، TIBC يرتفع، بينما في Anemia of chronic disease: Ferritin يرتفع، TIBC ينخفض.',
        relativeStartPct: 0,
        relativeEndPct: 35,
        suggestedDaysWeight: 0.35
      },
      {
        id: 'hema-task-2',
        phaseNumber: 2,
        titleAr: 'أورام الدم (اللوكيميا والليمفوما) والمناعة مع فلاش كاردز Anki',
        titleEn: 'Leukemias, Lymphomas, Immunodeficiency & Anki',
        descriptionAr: 'مذاكرة AML, CML, ALL, CLL، أورام الليمفوما، الطفرات الوراثية وأدوية العلاج الكيماوي مع التكرار المتباعد.',
        highYieldTipAr: 'طفرة Philadelphia chromosome t(9;22) تنتج بروتين BCR-ABL tyrosine kinase ويتم تثبيطه بدواء Imatinib.',
        relativeStartPct: 35,
        relativeEndPct: 65,
        suggestedDaysWeight: 0.30
      },
      {
        id: 'hema-task-3',
        phaseNumber: 3,
        titleAr: 'حل بنوك أسئلة قصر العيني وعين شمس + حالات USMLE السريرية',
        titleEn: 'Egyptian Faculty Past Papers & USMLE Vignettes',
        descriptionAr: 'حل 250 سؤال سريري على حالات التخثر المنتشر (DIC)، متلازمة TTP/HUS ونقل الدم ومضاعفاته.',
        highYieldTipAr: 'خماسية TTP: Thrombocytopenia, Microangiopathic hemolytic anemia, Neurologic symptoms, Renal failure, Fever.',
        relativeStartPct: 65,
        relativeEndPct: 85,
        suggestedDaysWeight: 0.20
      },
      {
        id: 'hema-task-4',
        phaseNumber: 4,
        titleAr: 'المحاكاة الشاملة، مسحات الدم المجهرية وكشكول الأخطاء',
        titleEn: 'Blood Smear Stations, Rapid High-Yield Review & Mock',
        descriptionAr: 'التدريب العملي على التعرف على خلايا مسحات الدم (Blood films)، مراجعة كشكول الأخطاء وحل امتحان تجريبي.',
        highYieldTipAr: 'خلايا Reed-Sternberg تشبه عيون البومة (Owl eyes) وتتميز بـ CD15 و CD30 إيجابية.',
        relativeStartPct: 85,
        relativeEndPct: 100,
        suggestedDaysWeight: 0.15
      }
    ]
  }
];

export interface PlannerStoredState {
  selectedBlockId: string;
  targetExamDate: string; // ISO date string YYYY-MM-DD
  dailyHours: number;
  completedTaskIds: string[];
  activeTab: 'schedule' | 'egyptian-resources' | 'usmle-resources';
  lastSavedAt: string;
}

export const DEFAULT_PLANNER_STORAGE_KEY = 'medrise_block_planner_state';
