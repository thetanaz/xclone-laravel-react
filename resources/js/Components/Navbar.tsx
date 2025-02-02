import { Bell, Feather, House, Mail, User } from "lucide-react";
import NavigationItem from "./NavigationItem";
import ApplicationLogo from "./ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar({
    setIsPostOpen,
}: {
    setIsPostOpen: (value: boolean) => void;
}) {
    const { auth } = usePage().props;
    return (
        <nav className="mt-5 flex items-center flex-col flex-1">
            <ul className="flex flex-col items-center lg:items-start lg:px-3 gap-y-2">
                <Link href="/home" className="lg:mr-auto lg:ml-2 mb-8">
                    <ApplicationLogo
                        className="fill-white hover:fill-blue-600"
                        width={30}
                        height={30}
                    />
                </Link>

                <NavigationItem href="/home" icon={House}>
                    Home
                </NavigationItem>
                <NavigationItem href={`/${auth.user.username}`} icon={User}>
                    Profile
                </NavigationItem>
                <NavigationItem href="/messages" icon={Mail}>
                    Messages
                </NavigationItem>
                <NavigationItem href="/notifications" icon={Bell}>
                    Notifications
                </NavigationItem>

                <li>
                    <button
                        onClick={() => setIsPostOpen(true)}
                        className="w-[3rem] mt-2 h-[3rem] lg:w-[12rem] lg:h-[3rem] lg:rounded-3xl bg-black dark:bg-white dark:hover:bg-blue-600 hover:bg-blue-600 rounded-full text-xl font-bold flex items-center justify-center"
                    >
                        <span className="hidden lg:inline text-white dark:text-black">
                            Post
                        </span>
                        <Feather
                            className="lg:hidden text-black m-auto"
                            size={20}
                        />
                    </button>
                </li>
            </ul>
        </nav>
    );
}
