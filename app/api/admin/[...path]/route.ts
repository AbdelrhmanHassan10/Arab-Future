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
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      options.body = formData;
      // MUST remove Content-Type so fetch can auto-generate the new boundary for the outgoing request
      delete (options.headers as any)['Content-Type'];
      delete (options.headers as any)['content-type'];
    } else {
      options.body = await request.text();
    }
  }

  try {
    const res = await fetch(url, options);
    
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
    console.error("Proxy Error:", error);
    return NextResponse.json({ error: "Server Error", details: error?.message || String(error) }, { status: 500 });
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
export const PATCH = proxyRequest;
