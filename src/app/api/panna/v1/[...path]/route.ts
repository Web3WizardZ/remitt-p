import { NextRequest, NextResponse } from "next/server";

const UPSTREAM = "https://panna-app.lisk.com"; // production base (no /v1)

async function proxy(req: NextRequest, pathParts: string[]) {
  const incomingUrl = new URL(req.url);
  const upstreamUrl = new URL(`/v1/${pathParts.join("/")}`, UPSTREAM);
  upstreamUrl.search = incomingUrl.search;

  const headers = new Headers(req.headers);
  headers.delete("host");

  const body =
    req.method === "GET" || req.method === "HEAD"
      ? undefined
      : await req.arrayBuffer();

  const upstreamRes = await fetch(upstreamUrl, {
    method: req.method,
    headers,
    body,
    redirect: "manual",
  });

  const resHeaders = new Headers(upstreamRes.headers);
  resHeaders.delete("content-encoding");
  resHeaders.delete("content-length");

  const resBody = await upstreamRes.arrayBuffer();
  return new NextResponse(resBody, {
    status: upstreamRes.status,
    headers: resHeaders,
  });
}

export async function GET(req: NextRequest, ctx: { params: { path: string[] } }) {
  return proxy(req, ctx.params.path ?? []);
}
export async function POST(req: NextRequest, ctx: { params: { path: string[] } }) {
  return proxy(req, ctx.params.path ?? []);
}
export async function PUT(req: NextRequest, ctx: { params: { path: string[] } }) {
  return proxy(req, ctx.params.path ?? []);
}
export async function PATCH(req: NextRequest, ctx: { params: { path: string[] } }) {
  return proxy(req, ctx.params.path ?? []);
}
export async function DELETE(req: NextRequest, ctx: { params: { path: string[] } }) {
  return proxy(req, ctx.params.path ?? []);
}
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
