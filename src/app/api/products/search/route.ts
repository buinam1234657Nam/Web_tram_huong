import { NextRequest, NextResponse } from "next/server";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { toSummary } from "@/data/catalog/products";

const MAX_LIMIT = 60;

/**
 * GET /api/products/search?q=vòng&limit=4
 * An empty query returns bestsellers (the search overlay's idle state).
 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  const limit = Math.min(
    Number(req.nextUrl.searchParams.get("limit")) || MAX_LIMIT,
    MAX_LIMIT,
  );

  const matches = q
    ? await catalogRepository.searchProducts(q)
    : await catalogRepository.getBestsellers(limit);

  return NextResponse.json({
    total: matches.length,
    products: matches.slice(0, limit).map(toSummary),
  });
}
