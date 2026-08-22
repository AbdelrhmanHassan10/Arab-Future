import fs from "fs";
import path from "path";
import { unitsData as initialUnits, Unit } from "./units";
import { finishingProjects as initialFinishing } from "./finishing";

const DB_PATH = path.join(process.cwd(), "data.json");

export interface Database {
  units: Unit[];
  finishing: typeof initialFinishing;
  requests: any[];
}

export function getDB(): Database {
  if (!fs.existsSync(DB_PATH)) {
    const defaultData: Database = {
      units: initialUnits,
      finishing: initialFinishing,
      requests: [
        { id: 1, name: "أحمد محمود", type: "طلب معاينة شقة", time: new Date().toISOString(), status: "جديد", phone: "01000000000" },
        { id: 2, name: "سارة حسن", type: "استفسار عن باقة تشطيب", time: new Date().toISOString(), status: "قيد المراجعة", phone: "01111111111" }
      ]
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2), "utf-8");
    return defaultData;
  }
  
  try {
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading DB:", error);
    return { units: initialUnits, finishing: initialFinishing, requests: [] };
  }
}

export function saveDB(data: Database) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}
