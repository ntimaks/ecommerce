import { login } from 'i/lib/auth-actions';
import { signIn } from 'i/server/auth';
import Link from 'next/link';
import { SignInWithGoogleButton } from './SignInWithGoogleButton';
import { FormInput } from 'i/components/FormIput';

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
      <button type="submit" formAction={login} className="rounded-full bg-blue-500 p-2 px-4 text-white">
        Login
      </button>
      <SignInWithGoogleButton />
      <p className="w-full text-center text-sm text-gray-500">
        Don't have an account? <Link href="/register" onClick={() => setNewUser(false)}>Register</Link>
      </p>
    </form>
  );
}


