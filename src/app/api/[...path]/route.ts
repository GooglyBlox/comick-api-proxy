import { NextRequest, NextResponse } from "next/server";

const COMICK_API_BASE = "https://api.comick.dev";

async function proxyRequest(request: NextRequest, path: string[]) {
  try {
    const url = new URL(request.url);
    const apiPath = path.join("/");
    const targetUrl = `${COMICK_API_BASE}/${apiPath}${url.search}`;

    const headers: Record<string, string> = {
      "User-Agent": "ComickProxy/1.0",
    };

    if (request.headers.get("authorization")) {
      headers.authorization = request.headers.get("authorization") as string;
    }

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? await request.text()
          : undefined,
    });

    const data = await response.text();
    const contentType =
      response.headers.get("content-type") || "application/json";

    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request to Comick API" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxyRequest(request, params.path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxyRequest(request, params.path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxyRequest(request, params.path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxyRequest(request, params.path);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
