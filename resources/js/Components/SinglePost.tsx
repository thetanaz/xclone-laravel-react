import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { Avatar } from "./Avatar";
import { Post } from "@/types/types";
import { Heart, MessageCircleReply, Repeat2 } from "lucide-react";
import { MouseEvent, useState } from "react";
import { Link, router } from "@inertiajs/react";
import axios from "axios";

export default function SinglePost({ post }: { post: Post }) {
    const [displayReplyBox, setDisplayReplyBox] = useState(false);
    const [isLiked, setIsLiked] = useState(post.liked_by_user);
    const [likesCount, setLikesCount] = useState(post.likes_count);

    const handleLikeToggle = async (e: MouseEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/posts/${post.id}/like`);

            setIsLiked((prev) => !prev);
            setLikesCount(response.data.likes_count);
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };
    return (
        <Link
            href={`/posts/${post.id}`}
            className="block p-4 border-b border-zinc-800 hover:bg-zinc-200 cursor-pointer dark:hover:bg-zinc-900 transition-colors"
            key={post.id}
        >
            <div className="flex gap-2">
                <div
                    onClick={(e: MouseEvent) => {
                        e.preventDefault();
                        router.visit(`/${post.user.username}`);
                    }}
                >
                    <Avatar avatar={post.user.avatar || null} />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center ">
                        <div className="flex flex-col items-start sm:items-center gap-x-1 sm:gap-2 sm:flex-row">
                            {" "}
                            <span className="font-bold text-sm sm:text-base">
                                {post.user.name}
                            </span>
                            <span className="text-zinc-500 text-sm">
                                @
                                {post.user.username
                                    .toLowerCase()
                                    .replace(/\s+/g, "")}
                            </span>
                        </div>

                        <span className="text-zinc-500 ml-1 text-sm self-start sm:self-center">
                            {" "}
                            • {formatDistanceToNowStrict(post.created_at)}
                        </span>
                    </div>
                    <p className=" break-words">{post.content} test22</p>
                </div>
            </div>
            {post.gif && (
                <img
                    src={post.gif}
                    alt="gif"
                    className="rounded-md mx-auto mt-4 w-full border border-zinc-800"
                />
            )}
            <div className="mt-3 mb-1 text-black dark:text-zinc-400 flex items-center pt-2 h-3 justify-around">
                <button
                    onClick={(e: MouseEvent) => {
                        e.preventDefault();

                        setDisplayReplyBox(true);
                    }}
                >
                    <MessageCircleReply size={20} />
                </button>
                <Repeat2 size={20} />
                <button onClick={handleLikeToggle}>
                    <Heart
                        size={20}
                        className={isLiked ? " fill-red-600" : " fill-none"}
                    />
                </button>
            </div>
        </Link>
    );
}
