import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!url || !anon) {
    return response;
  }

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isPortal = path.startsWith("/portal");
  const isAuthPage = path === "/login" || path === "/signup";

  if (isPortal && !user) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = "/login";
    redirect.searchParams.set("next", path);
    return NextResponse.redirect(redirect);
  }

  if (isAuthPage && user) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = "/portal";
    redirect.searchParams.delete("next");
    return NextResponse.redirect(redirect);
  }

  return response;
}
