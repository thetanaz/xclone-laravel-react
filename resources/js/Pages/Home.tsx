import CreatePost from "@/Components/CreatePost";
import HomeTopBar from "@/Components/HomeTopBar";
import MainLayout from "@/Layouts/MainLayout";
import { createTweets } from "@/lib/generateTweets";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Heart, MessageCircleReply, Repeat2 } from "lucide-react";
import { useState } from "react";

const Home = ({ auth }: PageProps) => {
    const tweets = createTweets();
    const [selectedTab, setSelectedTab] = useState<"following" | "forYou">(
        "forYou"
    );
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
                <CreatePost />
                <div className="overflow-y-auto flex-1 divide-y divide-zinc-800 ">
                    {" "}
                    {/* Scrollable tweet container */}
                    {tweets.map((tweet) => (
                        <div
                            className="p-4 border-b border-zinc-800 hover:bg-zinc-200 cursor-pointer dark:hover:bg-zinc-900 transition-colors"
                            key={tweet.id}
                        >
                            <div className="flex gap-3">
                                <img
                                    src={tweet.avatar}
                                    className="w-12 h-12 rounded-full"
                                    alt="Avatar"
                                />
                                <div className="flex flex-col flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold">
                                            {tweet.name}
                                        </span>
                                        <span className="text-zinc-500 text-sm">
                                            @
                                            {tweet.name
                                                .toLowerCase()
                                                .replace(/\s+/g, "")}
                                        </span>
                                        <span className="text-zinc-500 text-sm">
                                            •{tweet.created_at.toUTCString()}
                                        </span>
                                    </div>
                                    <p className="mt-1">{tweet.content}</p>
                                </div>
                            </div>
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
