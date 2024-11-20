import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { decrypt } from "./lib/session";
import { NextResponse } from 'next/server';


const protectedRoutes = ["/dashboard"];
const publcRoutes = ["/admin"];


export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publcRoutes.includes(path);

    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();

}