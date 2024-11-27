import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { decrypt } from "./lib/session";
import { NextResponse } from "next/server";
import { format } from "date-fns";
import { updateSession } from "@/utils/supabase/middleware";

// Define route lists
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


    // Handle session for protected and public routes
    if (isProtectedRoute || isPublicRoute) {
        const updatedSessionResponse = await updateSession(req);
        return updatedSessionResponse; // If `updateSession` handles the response, return it
    }

    // Default pass-through for other routes
    return NextResponse.next();
}

// Middleware configuration to include custom matcher
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
