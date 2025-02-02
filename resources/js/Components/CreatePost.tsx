import { useTheme } from "@/context/ThemeContext";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { LoaderCircle, Smile } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Avatar } from "./Avatar";
import DisplaySelectedGif from "./DisplaySelectedGif";
import GifPicker from "./GifPicker";

export default function CreatePost({ avatar }: { avatar: string | undefined }) {
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

    // ... your other code

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/posts/store", formData);

            console.log("Post created:", response.data);
            reset();
            setSelectedGif(null);
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
        <div className="w-full relative border-b border-zinc-800 dark:bg-black flex flex-col">
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex mt-3 ml-2">
                    <Avatar avatar={avatar || null} />
                    <textarea
                        ref={textareaRef}
                        name="content"
                        value={formData.content}
                        onChange={(e) => setData("content", e.target.value)}
                        className="w-full border-none focus:outline-none focus:ring-0 dark:bg-black resize-none text-black dark:text-white overflow-hidden"
                        placeholder="What's happening?"
                        rows={1}
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
                        className="ml-auto rounded-3xl mr-2 dark:bg-white dark:text-black py-2 px-5 font-bold"
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
