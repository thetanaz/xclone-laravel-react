// components/Avatar.tsx
import { UserRound } from "lucide-react"; // Ensure correct import

export function Avatar({ avatar }: { avatar: string | null }) {
    return (
        <div className="rounded-full w-[3rem] h-[3rem]">
            {avatar ? (
                <img
                    className="rounded-full w-full h-auto"
                    src={avatar}
                    alt="User avatar"
                />
            ) : (
                <UserRound className="bg-blue-600 text-white p-2 rounded-full w-[3rem] h-[3rem]" />
            )}
        </div>
    );
}
