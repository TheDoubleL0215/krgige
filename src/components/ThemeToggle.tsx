import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	// Load the theme from localStorage on mount
	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") as "light" | "dark";
		if (storedTheme) {
			setTheme(storedTheme);
			document.documentElement.classList.toggle("dark", storedTheme === "dark");
		}
	}, []);

	// Function to toggle the theme
	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	return (
		<button onClick={toggleTheme} className="w-12 h-12 rounded-md border flex items-center justify-center">
			{theme === "light" ? <Moon /> : <Sun />}
		</button>


	);
}
