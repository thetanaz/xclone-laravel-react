import { router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    return (
        <button
            className="rounded-full w-10 h-10 flex items-center self-center justify-center hover:bg-zinc-800"
            onClick={() => {
                if (window.history.length > 1) window.history.back();
                else router.visit("/home");
            }}
        >
            <ArrowLeft size={20} />
        </button>
    );
}
