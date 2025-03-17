"use client";

import React, { useActionState } from "react";
import { login } from "../app/admin/actions";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { ArrowRight, Mail, RectangleEllipsis, CircleX } from "lucide-react";

const initialState = {
	message: "",
};

const LoginForm = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => {
	const [state, formAction] = useActionState(login, initialState);

	return (
		<div className={cn("flex flex-col gap-2 items-center justify-center min-h-screen", className)} {...props}>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Bejelentkezés</CardTitle>
					<CardDescription>Jelentkezzen be az igék szerkesztéséhez!</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={formAction} className="flex flex-col gap-2">
						{state.message && (
							<Alert variant="destructive">
								<div className="flex items-center justify-center gap-2 ">
									<CircleX size={8} aria-hidden="true" className="w-5 h-5" />
									<AlertTitle className="flex items-center mb-0">Hibás email cím vagy jelszó</AlertTitle>
								</div>
							</Alert>

						)}
						<div className="relative mb-2">
							<Input
								id="email"
								type="email"
								name="email"
								className="peer ps-9"
								placeholder="Email"
							/>
							<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
								<Mail size={16} strokeWidth={2} aria-hidden="true" />
							</div>
						</div>
						<div className="relative mb-2">
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
						<SubmitButton />
					</form>
				</CardContent>
			</Card>
		</div >
	);
};

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} className="group w-full" type="submit">
			Bejelentkezés
			<ArrowRight className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5" size={16} strokeWidth={2} aria-hidden="true" />
		</Button>
	);
}

export default LoginForm;
