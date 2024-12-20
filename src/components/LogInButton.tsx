"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "utils/supabase/client";
import { signout } from "i/lib/auth-actions";
import Button from "./Button";

const LoginButton = () => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const supabase = createClient();
    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);
    if (user) {
        return (
            <Button
                onClick={() => {
                    signout();
                    setUser(null);
                }}
            >
                Log out
            </Button>
        );
    }
    return (
        <Button
            variant="outline"
            onClick={() => {
                router.push("/login");
            }}
        >
            Login
        </Button>
    );
};

export default LoginButton;