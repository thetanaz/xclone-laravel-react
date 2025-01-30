import { formatNumberToK } from "@/lib/utils";
import { router, usePage } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

type TopBar = {
    postCount: string;
    name: string;
};
export default function UserTopBar({ postCount, name }: TopBar) {
    return (
        <div className="w-full backdrop-blur-sm sticky p-1 top-0 border-r border-r-zinc-800 z-20">
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
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p>{formatNumberToK(postCount)} posts</p>
                </div>
            </div>
        </div>
    );
}
