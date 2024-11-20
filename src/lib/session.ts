import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string) {
    const session = await encrypt({ userId });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Detect development mode to toggle `secure`
    const isDev = process.env.NODE_ENV !== "production";

    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: !isDev, // Use secure cookies only in production
        path: "/",
        expires: expiresAt,    // Make the cookie accessible throughout the app
        // No `expires` or `maxAge` for session cookies
    });
}


export async function deleteSession() {
    (await cookies()).delete("session");
}

type SessionPayload = {
    userId: string;
};

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.log("Failed to verify session", error);
    }
}