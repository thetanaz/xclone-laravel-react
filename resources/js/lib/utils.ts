import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatNumberToK = (num: string | number) => {
    const numericValue = typeof num === "string" ? Number(num) : num; // Convert to number if it's a string
    if (numericValue >= 1000) {
        const formattedNum = (numericValue / 1000).toFixed(1); // Divide by 1000 and keep one decimal place
        return `${formattedNum}k`;
    }
    return numericValue.toString();
};
