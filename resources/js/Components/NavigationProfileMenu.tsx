import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { EllipsisVertical, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

type NavigationProfileProps = {
    username: string;
    avatar: string | undefined;
    name: string;
};

const NavigationProfileMenu = ({
    username,
    avatar,
    name,
}: NavigationProfileProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative">
            {isOpen && (
                <div
                    ref={menuRef}
                    className="absolute bottom-full space-y-2 left-0 lg:left-1/2 lg:-translate-x-1/2 mb-2 w-[200px] bg-black border border-zinc-800 rounded-xl shadow-lg p-2"
                >
                    <ThemeToggle />
                    <Button
                        variant={"destructive"}
                        className="w-full text-left p-3 hover:bg-zinc-900 rounded-lg"
                        onClick={() => {
                            setIsOpen(false);
                            router.post("logout");
                        }}
                    >
                        Log Out
                    </Button>
                </div>
            )}
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="flex mx-auto hover:bg-zinc-800  rounded-3xl justify-center lg:gap-x-2 items-center mt-auto mb-5 w-[3rem] lg:w-auto"
            >
                {avatar ? (
                    <img
                        className="rounded-full w-[3rem]"
                        src={avatar}
                        alt="avatar"
                    />
                ) : (
                    <UserRound
                        className="bg-blue-600 w-[3rem] rounded-full"
                        size={"fill"}
                    />
                )}
                <div className="flex flex-col text-start">
                    <h2 className="font-bold hidden lg:inline">{name}</h2>
                    <p className="text-muted-foreground hidden lg:inline">
                        @{username}
                    </p>
                </div>
                <EllipsisVertical className="hidden lg:inline" />
            </button>
        </div>
    );
};

export default NavigationProfileMenu;
