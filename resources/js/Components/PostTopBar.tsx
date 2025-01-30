import { formatNumberToK } from "@/lib/utils";
import { router, usePage } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

type TopBar = {
    postCount: string;
    name: string;
};
export default function PostTopBar() {
    return (
        <div className="w-full backdrop-blur-sm sticky p-2 top-0 border-r border-r-zinc-800  z-20">
            <div className="flex gap-x-4">
                <button
                    className="rounded-full w-10 h-10 flex items-center self-center justify-center hover:bg-zinc-800"
                    onClick={() => {
                        if (window.history.length > 1) window.history.back();
                        else router.visit("/home");
                    }}
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex flex-col justify-center">
                    <h2 className="font-bold text-2xl">Post</h2>
                </div>
            </div>
        </div>
    );
}
