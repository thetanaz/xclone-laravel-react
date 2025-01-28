import ApplicationLogo from "@/Components/ApplicationLogo";
import NavigationItem from "@/Components/NavigationItem";
import NavigationProfileMenu from "@/Components/NavigationProfileMenu";
import HomeTopBar from "@/Components/HomeTopBar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import {
    Bell,
    EllipsisVertical,
    Feather,
    House,
    Mail,
    User,
} from "lucide-react";
import { ReactNode } from "react";

const MainLayout = ({
    children,
    auth,
}: PageProps & {
    children: ReactNode;
}) => {
    const { url } = usePage();

    return (
        <div className="grid lg:grid-cols-4 grid-cols-5 w-full lg:w-[1024px]  m-auto h-screen ">
            <header className="col-span-1 sticky top-0 h-screen flex flex-col  w-full border-r border-zinc-800 lg:px-3">
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
                        <NavigationItem href="/profile" icon={User}>
                            Profile
                        </NavigationItem>
                        <NavigationItem href="/messages" icon={Mail}>
                            Messages
                        </NavigationItem>
                        <NavigationItem href="/notifications" icon={Bell}>
                            Notifications
                        </NavigationItem>

                        <li>
                            <button className="w-[3rem] mt-2 h-[3rem] lg:w-[12rem] lg:h-[3rem] lg:rounded-3xl bg-black dark:bg-white dark:hover:bg-blue-600 hover:bg-blue-600 rounded-full text-xl font-bold flex items-center justify-center">
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
                <NavigationProfileMenu
                    avatar={auth.user.avatar}
                    name={auth.user.name}
                    username={auth.user.username}
                />
            </header>
            <main className="col-span-4 lg:col-span-2 relative h-screen">
                <div className="h-screen overflow-y-auto">{children}</div>
            </main>
        </div>
    );
};

export default MainLayout;
