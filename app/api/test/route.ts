import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch("https://simsar.acwad.tech/public/api/units/BS-1035");
    const data = await res.json();
    return NextResponse.json({
      keys: Object.keys(data.data),
      amenities: data.data.amenities,
      features: data.data.features
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
