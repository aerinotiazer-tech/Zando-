import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("❌ [Supabase Auth exchangeCodeForSession Error]:", error);
    }
  }

  // URL to redirect to after sign-in process completes
  return NextResponse.redirect(new URL(next, request.url));
}
