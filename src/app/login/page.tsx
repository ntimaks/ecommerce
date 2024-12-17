'use client';

import { LoginForm } from 'i/components/Auth/Login/LoginForm';
import { useState } from 'react';

export default function Page() {
  const [newUser, setNewUser] = useState(true);
  return (
    <section id="login" className="min-w-screen flex min-h-screen items-center justify-center">
      <div className="container flex flex-row gap-4 p-4 shadow-2xl">
        {newUser ? <LoginForm newUser={newUser} setNewUser={setNewUser} /> : <div>Register</div>}
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-md bg-white p-4 shadow-lg">
          <p className="text-2xl font-bold">Welcome to Aorist</p>
          <p className="text-sm text-gray-500">Aorist is a platform for creating and managing your own AI agents.</p>
        </div>
      </div>
    </section>
  );
}
