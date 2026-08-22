import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/config/env";

export function GET() {
  return NextResponse.json({
    ok: true,
    supabase: isSupabaseConfigured,
  });
}
