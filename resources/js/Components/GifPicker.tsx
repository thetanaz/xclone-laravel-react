import axios from "axios";
import { useEffect, useState } from "react";

type GifPickerProps = {
    isGifPickerOpen: boolean;
    gifPickerRef: React.RefObject<HTMLDivElement>;
    setSelectedGif: (gif: any) => void;
    setData: (key: string, value: any) => void;
    setIsGifPickerOpen: (isOpen: boolean) => void;
};

export default function GifPicker({
    isGifPickerOpen,
    gifPickerRef,
    setSelectedGif,
    setData,
    setIsGifPickerOpen,
}: GifPickerProps) {
    const [gifs, setGifs] = useState<any[]>([]);
    const [gifSearch, setGifSearch] = useState("");
    const fetchGifs = async (searchTerm = "", offset = 0) => {
        try {
            const endpoint = searchTerm ? "/gifs/search" : "/gifs/trending";
            const response = await axios.get(endpoint, {
                params: { q: searchTerm, offset },
            });
            setGifs((prev) =>
                offset === 0
                    ? response.data.data
                    : [...prev, ...response.data.data]
            );
        } catch (error) {
            console.error("Error fetching GIFs:", error);
        }
    };

    useEffect(() => {
        if (isGifPickerOpen) fetchGifs();
    }, [isGifPickerOpen]);
    return (
        <div
            className="absolute z-10 bg-white dark:bg-black p-2 rounded-lg shadow-lg mt-2"
            ref={gifPickerRef}
            style={{ width: "400px" }}
        >
            <div className="mb-2">
                <input
                    type="text"
                    placeholder="Search GIFs..."
                    className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
                    value={gifSearch}
                    onChange={(e) => {
                        setGifSearch(e.target.value);
                        fetchGifs(e.target.value);
                    }}
                />
            </div>
            <div className="grid grid-cols-2 gap-2 h-64 overflow-y-auto">
                {gifs.map((gif) => (
                    <div
                        key={gif.id}
                        className="cursor-pointer relative aspect-square"
                        onClick={() => {
                            setSelectedGif(gif);
                            setData("gif", gif.images.fixed_height.url);
                            setIsGifPickerOpen(false);
                        }}
                    >
                        <img
                            src={gif.images.fixed_height.url}
                            alt={gif.title}
                            className="w-full h-full object-cover rounded"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
