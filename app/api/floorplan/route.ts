import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {
  const imagePath = "C:\\Users\\AT\\.gemini\\antigravity-ide\\brain\\42e36a48-249a-4d7a-a3e3-3631e7c1ded1\\dark_floor_plan_1786450204620.png";
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('Image not found', { status: 404 });
  }
}
