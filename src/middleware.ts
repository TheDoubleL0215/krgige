import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { decrypt } from "./lib/session";
import { NextResponse } from "next/server";
import { format } from "date-fns";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/admin"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Redirect `/` and `/ige` to `/ige/<today's date>`
    if (path === "/" || path === "/ige") {
        const currentDate = format(new Date(), "MM-dd");
        const response = NextResponse.redirect(new URL(`/ige/${currentDate}`, req.url));

        // Ensure that this redirect is not cached
        response.headers.set("Cache-Control", "no-store");

        return response;
    }

    // Check if the route is protected or public
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // Only handle session for protected and public routes
    if (isProtectedRoute || isPublicRoute) {
        const cookie = (await cookies()).get("session")?.value;

        // If cookie exists, decrypt it; otherwise, handle redirects accordingly
        let session = null;

        if (cookie) {
            try {
                session = await decrypt(cookie);
            } catch (error) {
                console.error("Error decrypting session:", error);
            }
        }

        // Redirect to login page if session doesn't exist for protected routes
        if (isProtectedRoute && !session?.userId) {
            return NextResponse.redirect(new URL("/admin", req.url));
        }

        // Redirect to dashboard if user is already logged in on public route
        if (isPublicRoute && session?.userId) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }

    // Default pass-through for other routes
    return NextResponse.next();
}
