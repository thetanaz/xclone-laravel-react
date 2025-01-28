import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { LucideIcon } from "lucide-react";

interface NavigationItemProps {
    icon: LucideIcon;
    href: string;
    children: React.ReactNode;
}

export default function NavigationItem({
    icon: Icon,
    href,
    children,
}: NavigationItemProps) {
    const { url } = usePage();
    console.log(url, href);
    return (
        <li>
            <Link
                href={href}
                className="flex w-full gap-x-5 text-xl items-center rounded-3xl dark:hover:bg-zinc-800 hover:bg-zinc-200 p-3"
            >
                <Icon
                    className={
                        url === href ? "text-blue-600" : "dark:text-white"
                    }
                    size={32}
                />
                <span
                    className={
                        url === href
                            ? "font-extrabold hidden lg:inline"
                            : "font-normal hidden lg:inline"
                    }
                >
                    {children}
                </span>
            </Link>
        </li>
    );
}
