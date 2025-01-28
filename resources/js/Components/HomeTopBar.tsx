import { useState } from "react";

export default function HomeTopBar({
    selected,
    onSelect,
}: {
    selected: "following" | "forYou";
    onSelect: (tab: "following" | "forYou") => void;
}) {
    return (
        <div className="w-full grid grid-cols-2 border-b border-b-muted-foreground">
            {/* For You Tab */}
            <div
                className="relative w-full flex flex-col items-center justify-center col-span-1 h-14 hover:bg-zinc-200 hover:dark:bg-zinc-900 cursor-pointer"
                onClick={() => onSelect("forYou")}
            >
                <button
                    className={
                        selected === "forYou"
                            ? "focus:outline-none font-extrabold"
                            : "focus:outline-none"
                    }
                >
                    For you
                </button>
                <div
                    className={`absolute bottom-0 left-0 right-0 h-[3px] transition-opacity ${
                        selected === "forYou"
                            ? "bg-blue-600 opacity-100"
                            : "bg-transparent opacity-0"
                    }`}
                />
            </div>

            {/* Following Tab */}
            <div
                className="relative w-full flex flex-col items-center justify-center col-span-1 h-14 hover:bg-zinc-200 hover:dark:bg-zinc-900 cursor-pointer"
                onClick={() => onSelect("following")}
            >
                <button
                    className={
                        selected === "following"
                            ? "focus:outline-none font-extrabold"
                            : "focus:outline-none"
                    }
                >
                    Following
                </button>
                <div
                    className={`absolute bottom-0 left-0 right-0 h-[3px] transition-opacity ${
                        selected === "following"
                            ? "bg-blue-600 opacity-100"
                            : "bg-transparent opacity-0"
                    }`}
                />
            </div>
        </div>
    );
}
