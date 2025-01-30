// components/Avatar.tsx
import { cn } from "@/lib/utils";
import { UserRound } from "lucide-react";

export function Avatar({
    avatar,
    size,
}: {
    avatar: string | null;
    size?: "normal" | "large";
}) {
    return (
        <div
            className={cn(
                "rounded-full",
                size === "normal" || size === undefined
                    ? "w-[3rem] h-[3rem]"
                    : "w-[100px] h-[100px]"
            )}
        >
            {avatar ? (
                <img
                    className="rounded-full w-full h-full object-cover"
                    src={avatar}
                    alt="User avatar"
                />
            ) : (
                <UserRound
                    className={cn(
                        "bg-blue-600 text-white p-2 rounded-full",
                        size === "normal" || size === undefined
                            ? "w-[3rem] h-[3rem]"
                            : "w-[100px] h-[100px]"
                    )}
                />
            )}
        </div>
    );
}
