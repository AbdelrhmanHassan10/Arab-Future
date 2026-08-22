import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { Unit } from "@/lib/units";

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.units);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const db = getDB();
    
    // Create new unit
    const newUnit: Unit = {
      ...data,
      id: `U-${Date.now().toString().slice(-4)}`
    };
    
    db.units.push(newUnit);
    saveDB(db);
    
    return NextResponse.json({ success: true, unit: newUnit });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create unit" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const db = getDB();
    
    const index = db.units.findIndex((u) => u.id === data.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Unit not found" }, { status: 404 });
    }
    
    db.units[index] = { ...db.units[index], ...data };
    saveDB(db);
    
    return NextResponse.json({ success: true, unit: db.units[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update unit" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    
    const db = getDB();
    db.units = db.units.filter((u) => u.id !== id);
    saveDB(db);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete unit" }, { status: 500 });
  }
}
