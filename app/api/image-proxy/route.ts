// Verifique se o seu arquivo está exatamente assim:
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) return new NextResponse("URL missing", { status: 400 });

  try {
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error("Falha ao buscar imagem externa");

    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (e) {
    return new NextResponse("Proxy Error", { status: 500 });
  }
}