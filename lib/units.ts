export type UnitStatus = "available" | "reserved" | "sold";
export type UnitType = "apartment" | "villa" | "shop" | "office" | "land";
export type FinishingLevel = "none" | "half" | "full" | "luxury";
export type PaymentMethod = "cash" | "installment" | "both";

export interface Unit {
  id?: number;
  unit_code: string;
  title: string;
  type: string;
  status: string;
  address?: string;
  area_id?: number;
  area?: { id: number, name: string };
  price: number;
  space_sqm: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  finishing: string;
  payment_system: string;
  down_payment?: number;
  installment_years?: number;
  main_image: string;
  main_image_url?: string;
  images: string[];
  description: string;
  features?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  amenities?: any[];
  created_at?: string;
}