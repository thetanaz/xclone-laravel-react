import React from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CreateUsername = () => {
    const { data, setData, post, processing, errors } = useForm({
        username: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/auth/createUsername");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Choose Your Username
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="text"
                                placeholder="Enter username"
                                value={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                className={
                                    errors.username ? "border-red-500" : ""
                                }
                            />
                            {errors.username && (
                                <Alert variant="destructive">
                                    <AlertDescription>
                                        {errors.username}
                                    </AlertDescription>
                                </Alert>
                            )}
                            <p className="text-sm text-gray-500">
                                Username must be 3-30 characters long and can
                                include letters, numbers, and symbols.
                            </p>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            {processing ? "Creating..." : "Create Username"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateUsername;
