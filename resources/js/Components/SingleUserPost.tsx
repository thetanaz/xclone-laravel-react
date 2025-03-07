import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { Avatar } from "./Avatar";
import { Post, User } from "@/types/types";
import { Heart, MessageCircleReply, Repeat2 } from "lucide-react";
import { MouseEvent, useState } from "react";
import { Link } from "@inertiajs/react";

export default function SingleUserPost({
    post,
    user,
}: {
    post: Post;
    user: User;
}) {
    const [displayReplyBox, setDisplayReplyBox] = useState(false);
    console.log(displayReplyBox);
    return (
        <Link
            href={`/posts/${post.id}`}
            className="block p-4 border-b border-zinc-800 hover:bg-zinc-200 cursor-pointer dark:hover:bg-zinc-900 transition-colors"
            key={post.id}
        >
            <div className="flex gap-2">
                <Avatar avatar={user.avatar || null} />
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center ">
                        <div className="flex flex-col items-start sm:items-center gap-x-1 sm:gap-2 sm:flex-row">
                            {" "}
                            <span className="font-bold text-sm sm:text-base">
                                {user.name}
                            </span>
                            <span className="text-zinc-500 text-sm">
                                @
                                {user.username
                                    .toLowerCase()
                                    .replace(/\s+/g, "")}
                            </span>
                        </div>

                        <span className="text-zinc-500 ml-1 text-sm self-start sm:self-center">
                            {" "}
                            • {formatDistanceToNowStrict(post.created_at)}
                        </span>
                    </div>
                    <p className=" break-words">{post.content}</p>
                </div>
            </div>
            {post.gif && (
                <img
                    src={post.gif}
                    alt="gif"
                    className="rounded-md mx-auto mt-4 w-full border border-zinc-800"
                />
            )}
            <div className="mt-3 mb-1 text-zinc-400 flex items-center pt-2 h-3 justify-around">
                <button
                    onClick={(e: MouseEvent) => {
                        e.preventDefault();

                        setDisplayReplyBox(true);
                    }}
                >
                    <MessageCircleReply size={20} />
                </button>
                <Repeat2 size={20} />
                <Heart size={20} />
            </div>
        </Link>
    );
}
