"use client";
import { createClient } from "utils/supabase/client";
import React, { useEffect, useState } from "react";

const UserGreetText = () => {
    const [user, setUser] = useState<any>(null);
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
    if (user !== null) {
        return (
            <p >
                hello&nbsp;
                <code className="font-mono font-bold">{user.name ?? "user"}!</code>
            </p>
        );
    }
    return (
        <p >
            Get started editing&nbsp;
            <code className="font-mono font-bold">app/page.tsx</code>
        </p>
    );
};

export default UserGreetText;