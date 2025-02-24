import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    const { url } = usePage();

    return (
        <div className=" min-h-screen flex items-center justify-center w-full bg-gray-200 dark:bg-black">
            <div className="flex gap-x-20 items-end  pt-6 sm:justify-center sm:pt-0 dark:bg-black">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="dark:fill-white fill-black" />
                    </Link>
                </div>
                <div className="flex flex-col gap-y-3 items-center justify-end">
                    {" "}
                    <a
                        href={route("google.login")}
                        className="dark:bg-white bg-black text-white font-bold dark:text-black p-3 rounded-3xl flex gap-x-3 items-center"
                    >
                        <img
                            src="googlelogo.svg"
                            className="h-5 w-5"
                            alt="google"
                        />{" "}
                        {url === "/register"
                            ? "Sign up With Google"
                            : "Login With Google"}{" "}
                    </a>
                    <div className="flex items-center gap-4 w-[90%]">
                        <div className="flex-1 border border-t border-muted-foreground" />
                        <h3 className="text-white">OR</h3>
                        <div className="flex-1 border border-t border-muted-foreground" />
                    </div>
                    <div className=" w-full overflow-hidden border-black dark:border-white border-2 px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
