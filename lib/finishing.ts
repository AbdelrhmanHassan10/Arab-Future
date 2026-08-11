export interface FinishingPackage {
  id: string;
  name: string;
  description: string;
  pricePerMeter?: number;
  features: string[];
  materials: string[];
  duration: string;
}

export interface FinishingProject {
  id: string;
  title: string;
  location: string;
  type: string;
  area: number;
  style: string;
  duration: string;
  status: "in-progress" | "completed";
  description: string;
  image: string;
  images: string[];
  beforeAfter?: { before: string; after: string }[];
  materialsUsed: string[];
  servicesProvided: string[];
  clientReview?: { name: string; text: string; rating: number };
}

export const finishingPackages: FinishingPackage[] = [
  {
    id: "economy",
    name: "الباقة الاقتصادية",
    description: "تشطيب عملي واقتصادي يناسب الميزانيات المحدودة مع الحفاظ على الجودة الأساسية.",
    pricePerMeter: 1500,
    features: [
      "تأسيس كهرباء وسباكة أساسي",
      "محارة ودهانات بلاستيك",
      "أرضيات سيراميك فرز ثاني",
      "أطقم حمامات أساسية",
    ],
    materials: ["أسلاك السويدي", "مواسير الشريف", "دهانات سايبس"],
    duration: "45 - 60 يوم",
  },
  {
    id: "medium",
    name: "الباقة المتوسطة (سوبر لوكس)",
    description: "التوازن المثالي بين الجودة والتكلفة، خامات ممتازة وتشطيب راقي.",
    pricePerMeter: 3000,
    features: [
      "تأسيس كهرباء وسباكة معتمد",
      "ديكورات جبس بورد (ريسبشن)",
      "أرضيات بورسلين للريسبشن وسيراميك للغرف",
      "أطقم حمامات ديورافيت أو إيديال",
      "دهانات جوتن أو يوتن",
    ],
    materials: ["أسلاك السويدي", "مواسير باننجر", "بورسلين كليوباترا"],
    duration: "60 - 90 يوم",
  },
  {
    id: "luxury",
    name: "الباقة الفاخرة (ألترا سوبر لوكس)",
    description: "رفاهية بلا حدود، تصميمات حصرية وخامات مستوردة لأصحاب الذوق الرفيع.",
    features: [
      "تصميم 3D قبل التنفيذ",
      "سمارت هوم (تأسيس كامل)",
      "أرضيات رخام مستورد أو HDF",
      "ديكورات بانوهات بديل رخام وخشب",
      "تأسيس تكييفات مركزي أو كونسيلد",
    ],
    materials: ["رخام إسباني", "خلاطات جروهي", "قطاعات ألوميتال چامبو"],
    duration: "يحدد بعد المعاينة",
  },
];

export const finishingProjects: FinishingProject[] = [
  {
    id: "fp-01",
    title: "تشطيب فيلا كلاسيك",
    location: "بني سويف الجديدة - الحي الأول",
    type: "فيلا",
    area: 350,
    style: "نيو كلاسيك",
    duration: "4 شهور",
    status: "completed",
    description: "تم استلام الفيلا على الطوب الأحمر، وتم تنفيذ كافة أعمال التأسيس والتشطيب وفقاً للتصميم 3D المعتمد من العميل. تم التركيز على المساحات المفتوحة والإضاءة الطبيعية.",
    image: "/projects/project-11.png",
    images: ["/projects/project-11.png", "/projects/project-12.png", "/projects/project-13.png"],
    materialsUsed: ["رخام إمبيرادور", "دهانات جوتن", "أبواب أرو"],
    servicesProvided: ["تصميم داخلي", "كهرباء", "سباكة", "جبس بورد", "ديكورات"],
    clientReview: {
      name: "أ/ محمد عبدالله",
      text: "التزام تام بالمواعيد ودقة في التنفيذ. النتيجة طلعت أحسن من التصميم كمان.",
      rating: 5
    }
  },
  {
    id: "fp-02",
    title: "تشطيب شقة مودرن",
    location: "مدينة بني سويف - مقبل",
    type: "شقة",
    area: 180,
    style: "مودرن",
    duration: "شهران ونصف",
    status: "completed",
    description: "شقة عصرية بألوان محايدة (أبيض ورمادي)، مع استخدام بديل الخشب والرخام لإعطاء لمسة فخامة للريسبشن.",
    image: "/projects/project-19.png",
    images: ["/projects/project-19.png", "/projects/project-20.png", "/projects/project-21.png"],
    materialsUsed: ["بورسلين هندي", "بديل خشب كوري", "إضاءات بروفايل ليد"],
    servicesProvided: ["تشطيب كامل", "أسقف معلقة", "إضاءة"],
  }
];
