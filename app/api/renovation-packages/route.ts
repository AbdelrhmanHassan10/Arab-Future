import { NextResponse } from "next/server";
import { API_URL } from "@/lib/config";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  try {
    const res = await fetch(`${API_URL}/plans?${searchParams.toString()}`, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch renovation packages" }, { status: 500 });
  }
}
