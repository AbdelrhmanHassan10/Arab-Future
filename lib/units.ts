export type UnitStatus = "available" | "reserved" | "sold";
export type UnitType = "apartment" | "villa" | "shop" | "office" | "land";
export type FinishingLevel = "none" | "half" | "full" | "luxury";
export type PaymentMethod = "cash" | "installment" | "both";

export interface Unit {
  id: string; // e.g. BS-1024
  title: string;
  type: UnitType;
  status: UnitStatus;
  location: string;
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  floor?: number;
  finishing: FinishingLevel;
  payment: PaymentMethod;
  downPayment?: number;
  installmentYears?: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  featured: boolean;
  createdAt: string;
}

export const unitsData: Unit[] = [
  {
    id: "BS-1024",
    title: "شقة فاخرة للبيع في قلب بني سويف الجديدة",
    type: "apartment",
    status: "available",
    location: "بني سويف الجديدة، الحي الأول",
    price: 2500000,
    area: 180,
    rooms: 3,
    bathrooms: 2,
    floor: 3,
    finishing: "luxury",
    payment: "both",
    downPayment: 1000000,
    installmentYears: 3,
    image: "/projects/project-1.png",
    images: ["/projects/project-1.png", "/projects/project-1.png", "/projects/project-1.png", "/projects/project-1.png"],
    description: "شقة بتشطيبات الترا سوبر لوكس جاهزة للسكن الفوري، تتميز بموقع استراتيجي بالقرب من الخدمات ومول المدينة.",
    amenities: ["غاز طبيعي", "عداد كهرباء", "إنترنت", "أمن", "مصعد"],
    featured: true,
    createdAt: "2024-05-10T10:00:00Z",
  },
  {
    id: "BS-1025",
    title: "فيلا مستقلة بتصميم عصري",
    type: "villa",
    status: "reserved",
    location: "مدينة بني سويف، حي الأزهري",
    price: 7500000,
    area: 450,
    rooms: 5,
    bathrooms: 4,
    finishing: "full",
    payment: "installment",
    downPayment: 2000000,
    installmentYears: 5,
    image: "/projects/project-2.png",
    images: ["/projects/project-2.png", "/projects/project-2.png", "/projects/project-2.png", "/projects/project-2.png"],
    description: "فيلا مستقلة مع حديقة خاصة وجراج يتسع لسيارتين، تشطيبات راقية تناسب العائلات الكبيرة.",
    amenities: ["حديقة خاصة", "جراج", "غرفة خادمة", "كاميرات مراقبة"],
    featured: true,
    createdAt: "2024-05-12T11:00:00Z",
  },
  {
    id: "BS-1026",
    title: "محل تجاري بموقع حيوي",
    type: "shop",
    status: "sold",
    location: "بني سويف، شارع عبد السلام عارف",
    price: 4000000,
    area: 80,
    rooms: 1,
    bathrooms: 1,
    floor: 0,
    finishing: "half",
    payment: "cash",
    image: "/projects/project-3.png",
    images: ["/projects/project-3.png", "/projects/project-3.png", "/projects/project-3.png"],
    description: "محل تجاري في أكثر الشوارع حيوية في بني سويف، واجهة زجاجية، يصلح لجميع الأنشطة التجارية.",
    amenities: ["عداد كهرباء تجاري", "واجهة زجاجية", "أمن"],
    featured: true,
    createdAt: "2024-04-20T09:00:00Z",
  },
  {
    id: "BS-1027",
    title: "شقة نصف تشطيب مساحة كبيرة",
    type: "apartment",
    status: "available",
    location: "بني سويف الجديدة، الحي الثاني",
    price: 1800000,
    area: 200,
    rooms: 4,
    bathrooms: 3,
    floor: 2,
    finishing: "half",
    payment: "both",
    downPayment: 800000,
    installmentYears: 2,
    image: "/projects/project-4.png",
    images: ["/projects/project-4.png", "/projects/project-4.png", "/projects/project-4.png"],
    description: "شقة مميزة مساحة 200 متر، تقسيم رائع، واجهة بحرية تطل على حديقة.",
    amenities: ["إطلالة مميزة", "بلكونة", "مصعد", "إنترنت"],
    featured: false,
    createdAt: "2024-05-15T14:30:00Z",
  }
];
