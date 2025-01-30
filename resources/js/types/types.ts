export type User = {
    id: number;
    username: string;
    avatar: string | null;
    name: string;
    banner: string | null;
};

export type Post = {
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
