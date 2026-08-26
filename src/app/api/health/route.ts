import { NextResponse } from "next/server";
import {
  getSupabaseEnvFlags,
  isSupabaseConfigured,
} from "@/config/env";

export function GET() {
  const flags = getSupabaseEnvFlags();

  return NextResponse.json({
    ok: true,
    supabase: isSupabaseConfigured(),
    hasUrl: flags.hasUrl,
    hasAnon: flags.hasAnon,
    hasServiceRole: flags.hasServiceRole,
    adminDbReady: flags.hasUrl && flags.hasAnon && flags.hasServiceRole,
  });
}
