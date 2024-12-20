"use client";

import { signInWithGoogle } from "i/lib/auth-actions";

export function SignInWithGoogleButton() {
    return (
        <button type="button" className="rounded-full bg-blue-500 p-2 px-4 text-white" onClick={() => signInWithGoogle()}>
            Login with Google
        </button>
    )
}