import { Avatar } from "@/Components/Avatar";
import CreatePost from "@/Components/CreatePost";
import HomeTopBar from "@/Components/HomeTopBar";
import MainLayout from "@/Layouts/MainLayout";
import { createTweets } from "@/lib/generateTweets";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircleReply, Repeat2 } from "lucide-react";
import { useState } from "react";

type User = {
    id: number;
    username: string;
    avatar: string | null;
    name: string;
};

type Post = {
    id: number;
    content: string;
    gif?: string | null;
    images?: string[] | null;
    user_id: number;
    parent_id?: number | null;
    created_at: string;
    updated_at: string;
    user: User;
};

const Home = ({ auth, posts }: PageProps & { posts: Post[] }) => {
    const tweets = createTweets();
    const [selectedTab, setSelectedTab] = useState<"following" | "forYou">(
        "forYou"
    );

    console.log(posts);
    return (
        <MainLayout auth={auth}>
            <Head title="Home" />
            <div className="flex flex-col w-full border-r border-r-zinc-800">
                <div className="sticky top-0 bg-background z-10">
                    <HomeTopBar
                        selected={selectedTab}
                        onSelect={setSelectedTab}
                    />
                </div>
                <CreatePost avatar={auth.user.avatar} />
                <div className="overflow-y-auto flex-1">
                    {" "}
                    {/* Scrollable tweet container */}
                    {posts.map((tweet) => (
                        <div
                            className="p-4 border-b border-zinc-800 hover:bg-zinc-200 cursor-pointer dark:hover:bg-zinc-900 transition-colors"
                            key={tweet.id}
                        >
                            <div className="flex gap-2">
                                <Avatar avatar={tweet.user.avatar || null} />
                                <div className="flex flex-col flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold">
                                            {tweet.user.name}
                                        </span>
                                        <span className="text-zinc-500 text-sm">
                                            @
                                            {tweet.user.username
                                                .toLowerCase()
                                                .replace(/\s+/g, "")}
                                        </span>
                                        <span className="text-zinc-500 text-sm">
                                            •
                                            {formatDistanceToNow(
                                                tweet.created_at
                                            )}
                                        </span>
                                    </div>
                                    <p className="mt-1">{tweet.content}</p>
                                </div>
                            </div>
                            {tweet.gif && (
                                <img
                                    src={tweet.gif}
                                    alt="gif"
                                    className="rounded-md mx-auto mt-2 w-full border border-zinc-800"
                                />
                            )}
                            <div className="mt-2 flex items-center pt-2 h-3 justify-around">
                                <MessageCircleReply size={18} />
                                <Repeat2 size={18} />
                                <Heart size={18} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};
export default Home;
