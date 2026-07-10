import { NextResponse } from "next/server";
import { buildWeeklyScorecard } from "@/application/buildWeeklyScorecard";

export async function GET() {
  const data = buildWeeklyScorecard();
  return NextResponse.json(data);
}