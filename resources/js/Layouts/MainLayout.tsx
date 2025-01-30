import Navbar from "@/Components/Navbar";
import NavigationProfileMenu from "@/Components/NavigationProfileMenu";
import { PageProps } from "@/types";
import { ReactNode } from "react";

const MainLayout = ({
    children,
    auth,
}: PageProps & {
    children: ReactNode;
}) => {
    return (
        <div className="grid lg:grid-cols-4 grid-cols-5 w-full lg:w-[1024px] overflow-hidden  m-auto h-screen ">
            <header className="col-span-1 sticky top-0 h-screen flex flex-col  w-full border-r border-zinc-800 lg:px-3">
                <Navbar />
                <NavigationProfileMenu
                    avatar={auth.user.avatar}
                    name={auth.user.name}
                    username={auth.user.username}
                />
            </header>
            <main className="col-span-4 lg:col-span-2   relative min-h-screen">
                <div className="h-screen overflow-y-auto">{children}</div>
            </main>
        </div>
    );
};

export default MainLayout;
