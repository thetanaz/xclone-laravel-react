import SingleUserPost from "@/Components/SingleUserPost";
import UserTopBar from "@/Components/UserTopBar";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Post, User } from "@/types/types";

type UserPageProps = PageProps & {
    user: User;
    posts: Post[];
    postCount: string;
};

const UserPage = ({ auth, user, posts, postCount }: UserPageProps) => {
    return (
        <MainLayout auth={auth}>
            <UserTopBar postCount={postCount} name={user.name} />
            <div className="flex flex-col overflow-y-auto flex-1 min-h-screen border-r border-r-zinc-800">
                <div className="relative ">
                    <img
                        src="https://placehold.co/900x400"
                        className="max-h-[250px]"
                        alt="banner"
                    />
                    <img
                        className="absolute rounded-full w-[100px] h-[100px] left-5 bottom-[-40px]"
                        src={user.avatar || undefined}
                        alt="avatar"
                    />
                </div>
                <div className="relative w-full border-b border-b-zinc-800 p-4">
                    <div className="absolute top-4 right-4 flex gap-x-2">
                        <button className="border border-black dark:border-white p-2 rounded-3xl hover:bg-zinc-300 dark:hover:bg-zinc-800">
                            Edit Profile
                        </button>
                    </div>

                    <div className="flex flex-col pt-5">
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <h3 className="text-zinc-500 mb-2">
                            @{user.username.toLowerCase().replace(/\s+/g, "")}
                        </h3>
                        <p>
                            This is where the users description would be. Yep
                            that's it. This is where the users description would
                            be. Yep that's it. This is where the users
                            description would be. Yep that's it.
                        </p>
                        <div className="flex gap-x-3 my-2">
                            <p>
                                533{" "}
                                <span className="text-zinc-500">following</span>
                            </p>
                            <p>
                                2666{" "}
                                <span className="text-zinc-500">followers</span>
                            </p>
                        </div>
                    </div>
                </div>

                {posts.map((post) => {
                    return <SingleUserPost user={user} post={post} />;
                })}
            </div>
        </MainLayout>
    );
};
export default UserPage;
