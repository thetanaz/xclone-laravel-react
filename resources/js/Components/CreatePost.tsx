import { useTheme } from "@/context/ThemeContext";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { LoaderCircle, Smile, X } from "lucide-react";
import { FormEvent, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Avatar } from "./Avatar";
import DisplaySelectedGif from "./DisplaySelectedGif";
import GifPicker from "./GifPicker";
import { cn } from "@/lib/utils";

type CreatePostProps = {
    avatar: string | undefined;
    isFloating?: boolean;
    setIsPostOpen?: (value: boolean) => void;
};

export default function CreatePost({
    avatar,
    isFloating,
    setIsPostOpen,
}: CreatePostProps) {
    const { theme } = useTheme();
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [isGifPickerOpen, setIsGifPickerOpen] = useState(false);
    const [selectedGif, setSelectedGif] = useState<any>(null);
    const [gifs, setGifs] = useState<any[]>([]);
    const [gifSearch, setGifSearch] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);
    const gifPickerRef = useRef<HTMLDivElement>(null);
    const smileRef = useRef<HTMLDivElement>(null);
    const gifTriggerRef = useRef<HTMLDivElement>(null);

    const LazyPicker = lazy(async () => {
        const { default: Picker } = await import("@emoji-mart/react");
        const { default: data } = await import("@emoji-mart/data");
        return {
            default: (props: any) => <Picker data={data} {...props} />,
        };
    });

    const {
        data: formData,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        content: "",
        gif: null as string | null,
        images: null as string | null,
    });

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [formData.content, selectedGif]);

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

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const targets = [
                pickerRef.current,
                smileRef.current,
                gifPickerRef.current,
                gifTriggerRef.current,
            ];

            if (
                !targets.some((target) =>
                    target?.contains(event.target as Node)
                )
            ) {
                setIsPickerOpen(false);
                setIsGifPickerOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/posts/store", formData);

            reset();
            setSelectedGif(null);
            if (setIsPostOpen) {
                setIsPostOpen(false);
            }
            router.reload({ only: ["posts"] }); // Reset the form if needed
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle validation errors from Laravel (422 status)
                if (error.response?.status === 422) {
                    console.error(
                        "Validation errors:",
                        error.response.data.errors
                    );
                } else {
                    console.error("Error creating post:", error.message);
                }
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    return (
        <div
            className={cn(
                "w-full relative border-b border-zinc-800 bg-white dark:bg-black flex flex-col",
                isFloating && "min-h-[220px] rounded-xl gap-y-10"
            )}
        >
            {isFloating && (
                <button
                    onClick={() => setIsPostOpen!(false)}
                    className="absolute top-2 right-2 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-700 p-1"
                >
                    <X />
                </button>
            )}
            <form className="w-full" onSubmit={handleSubmit}>
                <div className={cn("flex mt-3 ml-2")}>
                    <Avatar avatar={avatar || null} />
                    <textarea
                        ref={textareaRef}
                        name="content"
                        value={formData.content}
                        onChange={(e) => setData("content", e.target.value)}
                        className={cn(
                            "w-full border-none focus:outline-none focus:ring-0 dark:bg-black resize-none text-black dark:text-white overflow-hidden",
                            isFloating && "mr-5"
                        )}
                        placeholder="What's happening?"
                        rows={isFloating ? 5 : 1}
                    />
                </div>

                {selectedGif && (
                    <DisplaySelectedGif
                        selectedGif={selectedGif}
                        setSelectedGif={setSelectedGif}
                        setData={setData}
                    />
                )}

                <div className="flex items-center mx-2 my-2 ml-12">
                    <div
                        ref={smileRef}
                        onClick={() => {
                            setIsPickerOpen((prev) => !prev);
                            setIsGifPickerOpen(false);
                        }}
                    >
                        <Smile
                            className="text-blue-600 cursor-pointer"
                            size={20}
                        />
                    </div>

                    <div
                        ref={gifTriggerRef}
                        onClick={() => {
                            setIsGifPickerOpen((prev) => !prev);
                            setIsPickerOpen(false);
                        }}
                        className="ml-2 text-blue-600 self-center text-xs cursor-pointer font-bold px-2 py-1 border border-blue-600 rounded"
                    >
                        <span>GIF</span>
                    </div>

                    <button
                        type="submit"
                        className="ml-auto rounded-3xl mr-2 dark:bg-white border border-black dark:text-black py-2 px-5 font-bold"
                        disabled={processing}
                    >
                        {processing ? "Posting..." : "Post"}
                    </button>
                </div>

                {isPickerOpen && (
                    <div
                        className="absolute z-10 w-[350px] h-[430px] bg-zinc-800 rounded-lg"
                        ref={pickerRef}
                    >
                        <Suspense
                            fallback={
                                <div className="p-2 flex items-center justify-center m-auto w-full h-full text-gray-500">
                                    <LoaderCircle className="animate-spin" />
                                </div>
                            }
                        >
                            <LazyPicker
                                theme={theme}
                                background={"black"}
                                onEmojiSelect={(emoji: any) =>
                                    setData(
                                        "content",
                                        formData.content + emoji.native
                                    )
                                }
                            />
                        </Suspense>
                    </div>
                )}

                {isGifPickerOpen && (
                    <GifPicker
                        isGifPickerOpen={isGifPickerOpen}
                        gifPickerRef={gifPickerRef}
                        setData={setData}
                        setIsGifPickerOpen={setIsGifPickerOpen}
                        setSelectedGif={setSelectedGif}
                    />
                )}
            </form>
        </div>
    );
}
