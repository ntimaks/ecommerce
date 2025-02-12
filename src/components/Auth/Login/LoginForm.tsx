import { login } from 'i/lib/auth-actions';
import { signIn } from 'i/server/auth';
import Link from 'next/link';
import { SignInWithGoogleButton } from './SignInWithGoogleButton';
import { FormInput } from 'i/components/FormIput';

export function LoginForm({ newUser, setNewUser }: { newUser: boolean; setNewUser: (newUser: boolean) => void }) {
  return (
    <form className="flex w-full flex-col gap-4 rounded-md bg-white p-4 shadow-lg">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="text-sm text-gray-500">Login to your account</p>
      <FormInput label="Email" type="email" name="email" placeholder="Email" />
      <FormInput label="Password" type="password" name="password" placeholder="Password" />
      <button type="submit" formAction={login} className="rounded-full bg-blue-500 p-2 px-4 text-white">
        Login
      </button>
      <SignInWithGoogleButton />
      <p className="w-full text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link href="/register" onClick={() => setNewUser(false)}>
          Register
        </Link>
      </p>
    </form>
  );
}
