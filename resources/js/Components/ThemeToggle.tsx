import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg w-full bg-primary text-primary-foreground hover:bg-primary/80 dark:bg-dark-primary dark:text-dark-primary-foreground"
        >
            {theme === "light" ? (
                <span className="flex mx-auto justify-center">
                    <Moon /> Dark
                </span>
            ) : (
                <span className="flex mx-auto justify-center">
                    <Sun /> Light
                </span>
            )}
        </button>
    );
}
