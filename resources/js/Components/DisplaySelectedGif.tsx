import { Gif } from "@giphy/react-components";
import { type SetStateAction } from "react";

interface Props {
    selectedGif: any;
    setSelectedGif: (value: SetStateAction<any>) => void;
    setData: (key: string, value: any) => void;
}

export default function DisplaySelectedGif({
    selectedGif,
    setSelectedGif,
    setData,
}: Props) {
    return (
        <div className="relative w-[320px] mx-auto flex items-center justify-center mb-2">
            <button
                type="button"
                className="absolute top-2 right-2 bg-gray-800/75 rounded-full w-6 h-6 flex items-center justify-center text-white hover:bg-gray-700/75 z-10"
                onClick={() => {
                    setSelectedGif(null);
                    setData("gif", null);
                }}
            >
                ×
            </button>
            <Gif
                gif={selectedGif}
                width={320}
                className="rounded-3xl pointer-events-none"
            />
        </div>
    );
}
