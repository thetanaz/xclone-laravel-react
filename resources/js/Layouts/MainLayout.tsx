import CreatePost from "@/Components/CreatePost";
import Navbar from "@/Components/Navbar";
import NavigationProfileMenu from "@/Components/NavigationProfileMenu";
import { PageProps } from "@/types";
import { ReactNode, useEffect, useState } from "react";

const MainLayout = ({
    children,
    auth,
}: PageProps & {
    children: ReactNode;
}) => {
    const [isPostOpen, setIsPostOpen] = useState(false);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsPostOpen(false);
            }
        };

        if (isPostOpen) {
            window.addEventListener("keydown", handleEscape);
        }

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isPostOpen]);

    return (
        <div className="h-screen w-full">
            {isPostOpen && (
                <div
                    onClick={(e) => {
                        // Close modal only if click is directly on the overlay
                        if (e.target === e.currentTarget) {
                            setIsPostOpen(false);
                        }
                    }}
                    className="w-screen absolute z-20 h-screen flex items-center justify-center m-auto bg-zinc-950/80"
                >
                    <div className="w-[400px] border-black dark:border-white border rounded-xl  sm:w-[500px] absolute top-1/3 mx-auto flex items-center justify-center">
                        {" "}
                        <CreatePost
                            avatar={auth.user.avatar}
                            isFloating={true}
                            setIsPostOpen={setIsPostOpen}
                        />
                    </div>
                </div>
            )}
            <div className="grid lg:grid-cols-4 grid-cols-5 w-full lg:w-[1024px] overflow-hidden  m-auto h-screen ">
                <header className="col-span-1 sticky top-0 h-screen flex flex-col  w-full border-r border-zinc-800 lg:px-3">
                    <Navbar setIsPostOpen={setIsPostOpen} />
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
        </div>
    );
};

export default MainLayout;
