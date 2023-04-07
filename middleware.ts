// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  console.log("middleware");
  if (req.nextUrl.pathname.startsWith("/api/entries/")) {
    console.log(req.nextUrl.pathname);
    const id = req.nextUrl.pathname.split("/api/entries/")[1];
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkMongoIDRegExp.test(id)) {
      const url = req.nextUrl.clone();
      url.pathname = "/api/bad-request";
      url.search = `?message=${id} is not a valid MongoID`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/entries/:path*"]
};
