import CreatePost from "@/Components/CreatePost";
import HomeTopBar from "@/Components/HomeTopBar";
import SinglePost from "@/Components/SinglePost";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Post } from "@/types/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const Home = ({ auth, posts }: PageProps & { posts: Post[] }) => {
    const [selectedTab, setSelectedTab] = useState<"following" | "forYou">(
        "forYou"
    );

    return (
        <MainLayout auth={auth}>
            <Head title="Home" />
            <div className="flex flex-col min-h-screen w-full border-r border-r-zinc-800">
                <div className="sticky top-0 bg-background z-10">
                    <HomeTopBar
                        selected={selectedTab}
                        onSelect={setSelectedTab}
                    />
                </div>
                <CreatePost avatar={auth.user.avatar} />
                <div className="overflow-y-auto flex-1">
                    {" "}
                    {posts.map((post) => (
                        <SinglePost post={post} key={post.id} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};
export default Home;
