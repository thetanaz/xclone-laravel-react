import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";

const Messages = ({ auth }: PageProps) => {
    return (
        <MainLayout auth={auth}>
            {" "}
            <div>Messages</div>
        </MainLayout>
    );
};
export default Messages;
