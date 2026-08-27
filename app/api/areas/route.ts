import { NextResponse } from "next/server";
import { API_URL } from "@/lib/config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  try {
    const res = await fetch(`${API_URL}/areas?${searchParams.toString()}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch areas" }, { status: 500 });
  }
}
