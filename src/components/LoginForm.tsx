"use client";

import React, { useActionState } from "react";
import { login } from "../app/admin/actions";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, CircleUserRound, RectangleEllipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const LoginForm = () => {

    return (
        <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Bejelentkezés
                </h2>
                <form action={login} className="flex flex-col">
                    {/* Username Error */}
                    <div className="relative mb-4">
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            className="peer ps-9"
                            placeholder="Email"
                        />
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                            <CircleUserRound size={16} strokeWidth={2} aria-hidden="true" />
                        </div>
                    </div>


                    <div className="relative mb-4">
                        <Label htmlFor="password" className="sr-only">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            className="peer ps-9"
                            placeholder="Jelszó"
                            type="password"
                        />
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                            <RectangleEllipsis size={16} strokeWidth={2} aria-hidden="true" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <SubmitButton />
                </form>
            </div>
        </main>
    );
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} className="group w-full" type="submit">
            Bejelentkezés
            <ArrowRight
                className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
            />
        </Button>
    );
}

export default LoginForm;