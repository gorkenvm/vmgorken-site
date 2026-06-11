export const site = {
  name: "Veysel Murat Gorken",
  shortName: "VMG",
  title: "Veysel Murat Gorken — AI Engineer",
  description:
    "AI Engineer. Production ML & GenAI systems serving 5M+ users. Dortmund, Germany — open to relocation within Germany.",
  url: "https://vmgorken.com",
  email: "gorkenvm@gmail.com",
  phone: "+49 151 253 20930",
  location: "Dortmund, Germany",
  locationFull: "Dortmund, Germany · Open to relocation within Germany",
  linkedin: "https://linkedin.com/in/vmgorken",
  github: "https://github.com/gorkenvm",
  cvUrlEN: "/cv/VMGorken_CV_EN.pdf",
  cvUrlDE: "/cv/VMGorken_CV_DE.pdf",
};

export const hero = {
  tag: "AI Engineer · GenAI & MLOps",
  name: "Veysel Murat",
  surname: "Gorken",
  title: "I build AI systems that run in production.",
  bio: "I've designed city-scale ML and LLM pipelines — touching 5M+ citizens across transportation, finance, and public services. Currently in Dortmund, open to Germany and across Europe.",
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
    cvEN: { label: "Download CV (EN)", href: "/cv/VMGorken_CV_EN.pdf" },
    cvDE: { label: "Download CV (DE)", href: "/cv/VMGorken_CV_DE.pdf" },
  },
};

export const metrics = [
  {
    value: 5,
    suffix: "M+",
    label: "Citizens reached",
    detail: "Transport, finance, public services — İzmir Metropolitan infrastructure",
  },
  {
    value: 93,
    suffix: "%",
    label: "F1 score",
    detail: "Hybrid ML + LLM Agent pipeline (LightGBM + RAG + BERT)",
  },
  {
    value: 10,
    suffix: "×",
    label: "Processing capacity",
    detail: "Individual throughput increase vs. manual workforce",
  },
  {
    value: 3.65,
    suffix: "%",
    label: "WER reduction",
    decimals: 2,
    detail: "Whisper Large v3 Turbo · LoRA fine-tune · Turkish ASR",
  },
  {
    value: 40,
    suffix: "%",
    label: "Manual audit time reduced",
    detail: "NL→SQL pipeline for 500+ Oracle tables",
  },
  {
    value: 4,
    suffix: "+ yrs",
    label: "Production AI experience",
    detail: "Data Science → AI Engineering",
  },
];

export const timeline = [
  {
    date: "2026 — present",
    role: "Active Job Search",
    org: "Dortmund, Germany · open to relocation within Germany",
    type: "now",
  },
  {
    date: "2022 — 2025",
    role: "Data Scientist (AI Engineer)",
    org: "İzmir İnovasyon ve Teknoloji A.Ş.",
    type: "work",
    highlights: [
      "Hybrid ML + LLM Agent pipeline — 93% F1",
      "Whisper LoRA fine-tune — 3.65% WER reduction on Turkish ASR",
      "City-scale Big Data infrastructure serving 5M+ users",
    ],
  },
  {
    date: "2022 — 2024",
    role: "Data Science Mentor",
    org: "Miuul · Remote",
    type: "work",
  },
  {
    date: "2021 — 2022",
    role: "Python Instructor",
    org: "Kodland · Remote",
    type: "work",
  },
  {
    date: "2017 — 2019",
    role: "M.Sc. Engineering Management",
    org: "Istanbul Medeniyet University",
    type: "edu",
  },
  {
    date: "2015 — 2016",
    role: "Erasmus Exchange",
    org: "University of Pécs, Hungary",
    type: "edu",
  },
  {
    date: "2011 — 2016",
    role: "B.Sc. Biomedical Engineering",
    org: "Işık University, Istanbul",
    type: "edu",
  },
];

export const projects: {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  impact: string;
  github: string;
  accent: string;
}[] = [];

export const skillGroups = [
  {
    title: "Generative AI & LLMs",
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
    title: "Machine & Deep Learning",
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
    title: "MLOps & Deployment",
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
    title: "Languages & Databases",
    items: [
      "Python (Advanced)",
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
  { name: "Turkish", level: "Native", percent: 100 },
  { name: "English", level: "Fluent (C1)", percent: 80 },
  { name: "German", level: "Intermediate (B1 — actively improving)", percent: 55 },
];

export const jobTrackerMock = [
  {
    company: "Mercedes-Benz Tech Innovation",
    role: "Senior AI Engineer",
    location: "Stuttgart",
    status: "Interview",
    applied: "2026-05-02",
    statusColor: "blue",
  },
  {
    company: "SAP",
    role: "ML Engineer — Generative AI",
    location: "Walldorf",
    status: "Technical Task",
    applied: "2026-04-28",
    statusColor: "purple",
  },
  {
    company: "Bosch",
    role: "AI / MLOps Engineer",
    location: "Berlin",
    status: "Applied",
    applied: "2026-05-10",
    statusColor: "gray",
  },
  {
    company: "DeepL",
    role: "Research Engineer, LLM",
    location: "Köln",
    status: "Positive Feedback",
    applied: "2026-04-15",
    statusColor: "green",
  },
  {
    company: "Helsing",
    role: "Senior ML Engineer",
    location: "München",
    status: "Pending",
    applied: "2026-05-05",
    statusColor: "yellow",
  },
  {
    company: "Aleph Alpha",
    role: "AI Engineer — Foundation Models",
    location: "Heidelberg",
    status: "Interview",
    applied: "2026-04-22",
    statusColor: "blue",
  },
];

export const contact = {
  title: "Let's work together",
  subtitle:
    "If you have a position in production AI systems, GenAI pipelines, or MLOps architecture — let's talk.",
  ctas: [
    { label: "gorkenvm@gmail.com", href: "mailto:gorkenvm@gmail.com", icon: "mail" },
    { label: "linkedin.com/in/vmgorken", href: "https://linkedin.com/in/vmgorken", icon: "linkedin" },
    { label: "github.com/gorkenvm", href: "https://github.com/gorkenvm", icon: "github" },
  ],
};
