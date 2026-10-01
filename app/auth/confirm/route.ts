import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function redirectToLogin(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL("/teacher/login?recovery=invalid", request.nextUrl.origin),
  );
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function redirectToPasswordUpdate(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL("/teacher/update-password", request.nextUrl.origin),
  );
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type");
  const hasCode = Boolean(code);
  const hasRecoveryToken = Boolean(tokenHash) && type === "recovery";

  if (!hasCode && !hasRecoveryToken) {
    return redirectToLogin(request);
  }

  try {
    const supabase = await createClient();
    const { error } = hasCode
      ? await supabase.auth.exchangeCodeForSession(code!)
      : await supabase.auth.verifyOtp({ type: "recovery", token_hash: tokenHash! });

    if (error) {
      return redirectToLogin(request);
    }

    return redirectToPasswordUpdate(request);
  } catch {
    return redirectToLogin(request);
  }
}
