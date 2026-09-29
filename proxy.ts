import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/env";

const sessionHeaders = ["cache-control", "expires", "pragma"];

export async function proxy(request: NextRequest) {
  const { url, publishableKey } = getSupabaseConfig();
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
        Object.entries(headers).forEach(([name, value]) => {
          supabaseResponse.headers.set(name, value);
        });
      },
    },
  });

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    const loginResponse = NextResponse.redirect(new URL("/teacher/login", request.url));
    supabaseResponse.cookies.getAll().forEach((cookie) => loginResponse.cookies.set(cookie));
    sessionHeaders.forEach((name) => {
      const value = supabaseResponse.headers.get(name);
      if (value) loginResponse.headers.set(name, value);
    });
    return loginResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/teacher/dashboard/:path*"],
};