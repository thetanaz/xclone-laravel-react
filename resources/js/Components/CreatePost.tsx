import { useState, useRef, useEffect } from "react";

export default function CreatePost() {
    const [inputValue, setInputValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize logic
    useEffect(() => {
        if (textareaRef.current) {
            // Reset height to get accurate scrollHeight
            textareaRef.current.style.height = "auto";
            // Set new height based on content
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputValue]);

    return (
        <div className="w-full flex">
            <form className="w-full">
                <textarea
                    ref={textareaRef}
                    name="postContent"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full resize-none text-white dark:text-black overflow-hidden"
                    placeholder="What's happening?"
                    rows={1} // Start with single row
                />
            </form>
        </div>
    );
}
