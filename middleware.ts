import { NextResponse, NextRequest } from "next/server";
import { supabaseGetUser } from "@/app/_utils/supabase";

export async function middleware(req: NextRequest) {
  const [data, error] = await supabaseGetUser();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
  const user = data["data"]["user"];
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized, login required" },
      { status: 401 }
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
