import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.requests);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const db = getDB();
    
    const newRequest = {
      ...data,
      id: Date.now(),
      time: new Date().toISOString(),
      status: "جديد"
    };
    
    db.requests.unshift(newRequest);
    saveDB(db);
    
    return NextResponse.json({ success: true, request: newRequest });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create request" }, { status: 500 });
  }
}
