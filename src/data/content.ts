// ============================================================================
// SİTE İÇERİĞİ — Tek dosyadan yönetim
// ============================================================================
// İleride EN/DE çevirisi için:
//   - Bu dosyayı content.tr.ts olarak yeniden adlandır
//   - content.en.ts ve content.de.ts oluştur
//   - astro.config.mjs içindeki i18n bloğunu aç
// ============================================================================

export const site = {
  name: "Veysel Murat Gorken",
  shortName: "VMG",
  title: "Veysel Murat Gorken — AI Engineer",
  description:
    "AI Engineer. 5M+ kullanıcıya dokunan üretim ML & GenAI sistemleri. Dortmund, Almanya — Avrupa geneli için açığım.",
  url: "https://vmgorken.dev",
  email: "gorkenvm@gmail.com",
  phone: "+49 151 253 20930",
  location: "Dortmund, Almanya",
  locationFull: "Dortmund, Almanya · Avrupa geneline açık",
  linkedin: "https://linkedin.com/in/vmgorken",
  github: "https://github.com/gorkenvm",
  cvUrl: "/cv/VMGorken_CV.pdf",
};

export const hero = {
  tag: "AI Engineer · GenAI & MLOps",
  name: "Veysel Murat",
  surname: "Gorken",
  title: "Üretim ortamında çalışan AI sistemleri kuruyorum.",
  bio: "Şehir ölçeğinde ML ve LLM hatları tasarladım — ulaşım, finans ve kamu hizmetlerinde 5M+ vatandaşa dokundu. Şu an Dortmund'dayım, Almanya ve Avrupa geneli için açığım.",
  chips: [
    "Python",
    "LLM / RAG",
    "LangChain · LangGraph",
    "FastAPI",
    "AWS · Bedrock",
    "Databricks · PySpark",
    "Docker",
    "PostgreSQL",
  ],
  ctas: {
    primary: { label: "İletişime Geç", href: "#contact" },
    secondary: { label: "CV İndir (PDF)", href: "/cv/VMGorken_CV.pdf" },
    tertiary: { label: "GitHub", href: "https://github.com/gorkenvm" },
  },
};

// Animated counters için sayısal vurgular
export const metrics = [
  {
    value: 5,
    suffix: "M+",
    label: "Vatandaşa dokunan sistemler",
    detail: "Ulaşım, finans, kamu hizmetleri — İzmir BB altyapısı",
  },
  {
    value: 93,
    suffix: "%",
    label: "F1 skoru",
    detail: "Hybrid ML + LLM Agent pipeline (LightGBM + RAG + BERT)",
  },
  {
    value: 10,
    suffix: "×",
    label: "Birim işleme kapasitesi",
    detail: "Manuel iş gücüne kıyasla artış",
  },
  {
    value: 3.65,
    suffix: "%",
    label: "WER düşüşü",
    decimals: 2,
    detail: "Whisper Large v3 Turbo · LoRA fine-tune · Türkçe ASR",
  },
  {
    value: 40,
    suffix: "%",
    label: "Manuel denetim süresi azaldı",
    detail: "500+ Oracle tablosu için NL→SQL hattı",
  },
  {
    value: 4,
    suffix: "+ yıl",
    label: "Üretim AI deneyimi",
    detail: "Veri Bilimi → AI Engineering",
  },
];

// İş tecrübesi / eğitim — timeline panel
export const timeline = [
  {
    date: "2026 — devam",
    role: "Aktif İş Arayışı",
    org: "Dortmund, Almanya · taşınmaya açık",
    type: "now",
  },
  {
    date: "2022 — 2025",
    role: "Veri Bilimci (AI Engineer)",
    org: "İzmir İnovasyon ve Teknoloji A.Ş.",
    type: "work",
    highlights: [
      "Hybrid ML + LLM Agent hattı — 93% F1",
      "Whisper LoRA fine-tune — Türkçe ASR'da 3.65% WER düşüşü",
      "Şehir ölçeğinde 5M+ kullanıcıya hizmet eden Big Data altyapısı",
    ],
  },
  {
    date: "2022 — 2024",
    role: "Veri Bilimi Mentörü",
    org: "Miuul · Uzaktan",
    type: "work",
  },
  {
    date: "2021 — 2022",
    role: "Python Eğitmeni",
    org: "Kodland · Uzaktan",
    type: "work",
  },
  {
    date: "2017 — 2019",
    role: "M.Sc. Mühendislik Yönetimi",
    org: "İstanbul Medeniyet Üniversitesi",
    type: "edu",
  },
  {
    date: "2015 — 2016",
    role: "Erasmus Değişim",
    org: "University of Pécs, Macaristan",
    type: "edu",
  },
  {
    date: "2011 — 2016",
    role: "B.Sc. Biyomedikal Mühendisliği",
    org: "Işık Üniversitesi, İstanbul",
    type: "edu",
  },
];

// Featured projects
export const projects = [
  {
    slug: "project-1",
    name: "Proje 1",
    tagline: "Yakında",
    description: "Bu proje yakında eklenecek.",
    stack: [],
    impact: "",
    github: "https://github.com/gorkenvm",
    accent: "blue",
  },
  {
    slug: "project-2",
    name: "Proje 2",
    tagline: "Yakında",
    description: "Bu proje yakında eklenecek.",
    stack: [],
    impact: "",
    github: "https://github.com/gorkenvm",
    accent: "purple",
  },
  {
    slug: "project-3",
    name: "Proje 3",
    tagline: "Yakında",
    description: "Bu proje yakında eklenecek.",
    stack: [],
    impact: "",
    github: "https://github.com/gorkenvm",
    accent: "green",
  },
];

// Skills — kategoriler
export const skillGroups = [
  {
    title: "Üretken AI & LLM",
    items: [
      "LangChain",
      "LangGraph",
      "crewAI",
      "RAG / Agentic Workflows",
      "LLM Fine-tuning (LoRA)",
      "Vector DB · Weaviate · Pinecone",
      "Hugging Face",
      "Prompt Engineering",
      "Knowledge Graph",
    ],
  },
  {
    title: "Makine & Derin Öğrenme",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "XGBoost · LightGBM · CatBoost",
      "BERT · Whisper",
      "NLP · CV · Time Series",
      "A/B Testing",
    ],
  },
  {
    title: "MLOps & Deploy",
    items: [
      "Docker",
      "MLflow",
      "CI/CD — Jenkins · GitHub Actions",
      "FastAPI · Flask",
      "Terraform",
      "Git",
    ],
  },
  {
    title: "Cloud & Data Engineering",
    items: [
      "AWS — S3, Lambda, Glue, Athena, SageMaker, Bedrock",
      "GCP",
      "Apache Spark · Hadoop",
      "Databricks",
      "Kafka",
    ],
  },
  {
    title: "Diller & Veritabanları",
    items: [
      "Python (ileri)",
      "SQL — PostgreSQL · Oracle · MS SQL · BigQuery",
      "MongoDB",
      "Bash",
    ],
  },
  {
    title: "Business Intelligence",
    items: ["Power BI", "Tableau", "Grafana", "Qlik"],
  },
];

export const languages = [
  { name: "Türkçe", level: "Anadil", percent: 100 },
  { name: "İngilizce", level: "Akıcı (B2)", percent: 75 },
  { name: "Almanca", level: "Orta (B1 — aktif geliştiriyor)", percent: 55 },
];

// Mock JobTracker data — projede gömülü mini demo için
export const jobTrackerMock = [
  {
    company: "Mercedes-Benz Tech Innovation",
    role: "Senior AI Engineer",
    location: "Stuttgart",
    status: "Mülakat",
    applied: "2026-05-02",
    statusColor: "blue",
  },
  {
    company: "SAP",
    role: "ML Engineer — Generative AI",
    location: "Walldorf",
    status: "Teknik Görev",
    applied: "2026-04-28",
    statusColor: "purple",
  },
  {
    company: "Bosch",
    role: "AI / MLOps Engineer",
    location: "Berlin",
    status: "Başvuruldu",
    applied: "2026-05-10",
    statusColor: "gray",
  },
  {
    company: "DeepL",
    role: "Research Engineer, LLM",
    location: "Köln",
    status: "Olumlu Geri Bildirim",
    applied: "2026-04-15",
    statusColor: "green",
  },
  {
    company: "Helsing",
    role: "Senior ML Engineer",
    location: "Münih",
    status: "Beklemede",
    applied: "2026-05-05",
    statusColor: "yellow",
  },
  {
    company: "Aleph Alpha",
    role: "AI Engineer — Foundation Models",
    location: "Heidelberg",
    status: "Mülakat",
    applied: "2026-04-22",
    statusColor: "blue",
  },
];

export const contact = {
  title: "Beraber çalışalım mı?",
  subtitle:
    "Üretim AI sistemleri, GenAI hatları ya da MLOps mimarisi için bir pozisyonunuz varsa — sohbet edelim.",
  ctas: [
    { label: "gorkenvm@gmail.com", href: "mailto:gorkenvm@gmail.com", icon: "mail" },
    { label: "linkedin.com/in/vmgorken", href: "https://linkedin.com/in/vmgorken", icon: "linkedin" },
    { label: "github.com/gorkenvm", href: "https://github.com/gorkenvm", icon: "github" },
    { label: "+49 151 253 20930", href: "tel:+4915125320930", icon: "phone" },
  ],
};
