import { Avatar } from "@/Components/Avatar";
import PostTopBar from "@/Components/PostTopBar";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Post } from "@/types/types";
import { format } from "date-fns";
import { Heart, MessageCircleReply, Repeat2 } from "lucide-react";

const PostPage = ({ auth, post }: PageProps & { post: Post }) => {
    const formattedDate = format(
        new Date(post.created_at),
        "h:mm a · MMM d, yyyy"
    );
    return (
        <MainLayout auth={auth}>
            <PostTopBar />
            <div className="min-w-0 flex flex-col min-h-screen overflow-y-auto p-4   border-r border-r-zinc-800">
                <div className="flex gap-2 ">
                    <Avatar avatar={post.user.avatar || null} />
                    <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-center">
                            <div className="flex flex-col items-start  gap-x-1 ">
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
                        </div>
                    </div>
                </div>
                <p className=" text-lg break-words mt-2">{post.content}</p>
                {post.gif && (
                    <img
                        src={post.gif}
                        alt="gif"
                        className="rounded-md mx-auto mt-4 w-full border border-zinc-800"
                    />
                )}
                <p className="my-2 text-zinc-600">{formattedDate}</p>
                <div className="border-b border-b-zinc-800" />
                <div className="my-3 text-black dark:text-zinc-400 flex items-center justify-around ">
                    <button className="rounded-full hover:bg-blue-600/50 p-1">
                        <MessageCircleReply size={20} />
                    </button>
                    <button className="rounded-full hover:bg-green-600/50 p-1">
                        <Repeat2 size={20} />
                    </button>
                    <button className="rounded-full  hover:bg-red-600/50 p-1">
                        <Heart size={20} />
                    </button>
                </div>
                <div className="border-b border-b-zinc-800" />
            </div>
        </MainLayout>
    );
};
export default PostPage;
