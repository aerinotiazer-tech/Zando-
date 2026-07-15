import { createClient } from "@supabase/supabase-js";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // Return user back with active session set
      return NextResponse.redirect(redirectTo);
    } else {
      console.error("❌ [Supabase Auth verifyOtp Error]:", error);
    }
  }

  // Redirect to home with a query parameter informing about the error
  return NextResponse.redirect(new URL("/?error=auth-confirmation-failed", request.url));
}
