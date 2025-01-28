import { Head } from "@inertiajs/react";

export default function NotFound() {
    return (
        <div className="container">
            <Head title="404 - Page Not Found" />
            <h1>404 - Page Not Found</h1>
            <p>The page you requested could not be found.</p>
        </div>
    );
}
