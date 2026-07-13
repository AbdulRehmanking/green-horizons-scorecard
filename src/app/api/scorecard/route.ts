import { NextRequest, NextResponse } from "next/server";
import { getWeeklyScorecard } from "../../../domain/services/scorecardService";
import { getAllWeekStarts } from "../../../lib/dateUtils";

const MIN_DATE = "2026-03-02";
const MAX_DATE = "2026-07-05";

function validateDate(dateStr: string): { valid: boolean; error?: string } {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return { valid: false, error: `Invalid date format: "${dateStr}". Expected YYYY-MM-DD` };
  }
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return { valid: false, error: `Invalid date: "${dateStr}"` };
  }
  return { valid: true };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');
    
    if (startDate) {
      const result = validateDate(startDate);
      if (!result.valid) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
    }
    
    if (endDate) {
      const result = validateDate(endDate);
      if (!result.valid) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
    }
    
    if (startDate && endDate && startDate > endDate) {
      return NextResponse.json(
        { error: `start date "${startDate}" is after end date "${endDate}"` },
        { status: 400 }
      );
    }
    
    const allWeeks = getAllWeekStarts();
    const minDate = allWeeks[0];
    const maxDate = allWeeks[allWeeks.length - 1];
    
    if (startDate && startDate < minDate) {
      return NextResponse.json(
        { error: `start date "${startDate}" is before the season start (${minDate})` },
        { status: 400 }
      );
    }
    
    if (endDate && endDate > maxDate) {
      return NextResponse.json(
        { error: `end date "${endDate}" is after the season end (${maxDate})` },
        { status: 400 }
      );
    }
    
    const data = getWeeklyScorecard(startDate || undefined, endDate || undefined);
    
    return NextResponse.json({
      success: true,
      data,
      meta: {
        count: data.length,
        startDate: startDate || minDate,
        endDate: endDate || maxDate,
        seasonStart: minDate,
        seasonEnd: maxDate,
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}