import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://simsar.acwad.tech/public/api";

export async function proxyRequest(request: Request, { params }: { params: { path: string[] } }) {
  const token = cookies().get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const endpointPath = params.path.join('/');
  const { searchParams } = new URL(request.url);
  const url = `${API_URL}/admin/${endpointPath}?${searchParams.toString()}`;

  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  const options: RequestInit & { duplex?: 'half' } = {
    method: request.method,
    headers,
    cache: "no-store",
    duplex: 'half',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    if (contentType?.includes("multipart/form-data")) {
      options.body = await request.arrayBuffer();
    } else {
      const textBody = await request.text();
      if (textBody) {
        options.body = textBody;
      }
    }
  }

  try {
    const res = await fetch(url, options);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Backend returned ${res.status} for ${url}:`, errorText.substring(0, 1000));
      try {
        require('fs').writeFileSync('d:/projects/Arab-Future/last_backend_error.html', errorText);
      } catch(e) {}
      
      try {
        const json = JSON.parse(errorText);
        return NextResponse.json(json, { status: res.status });
      } catch {
        return NextResponse.json({ error: "Backend Error", details: errorText }, { status: res.status });
      }
    }

    if (res.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const resContentType = res.headers.get("content-type");
    if (resContentType && resContentType.includes("application/json")) {
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    }

    return new NextResponse(await res.text(), { status: res.status });
  } catch (error: any) {
    console.error("Proxy Error Exception:", error);
    return NextResponse.json({ error: "Server Error", details: error?.message || String(error) }, { status: 500 });
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
export const PATCH = proxyRequest;
