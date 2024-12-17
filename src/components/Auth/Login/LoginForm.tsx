import { signIn } from 'i/server/auth';
import Link from 'next/link';

export function LoginForm({ newUser, setNewUser }: { newUser: boolean; setNewUser: (newUser: boolean) => void }) {
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const result = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email: formData.get('email') as string, password: formData.get('password') as string }),
    });
    console.log('HELLLOOOOO', await result.json());
  }

  return (
    <form onSubmit={handleLogin} className="flex w-full flex-col gap-4 rounded-md bg-white p-4 shadow-lg">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="text-sm text-gray-500">Login to your account</p>
      <FormInput label="Email" type="email" name="email" placeholder="Email" />
      <FormInput label="Password" type="password" name="password" placeholder="Password" />
      <button type="submit" className="rounded-full bg-blue-500 p-2 px-4 text-white">
        Login
      </button>
      <p className="w-full text-center text-sm text-gray-500">
        Don't have an account? <button onClick={() => setNewUser(false)}>Register</button>
      </p>
    </form>
  );
}

function FormInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="text-sm font-bold">
        {label}
      </label>
      <input id={label} {...props} className="rounded-full border border-gray-300 p-2 px-4" />
    </div>
  );
}
