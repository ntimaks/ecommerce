
import { FormInput } from "i/components/FormIput";
import { signup } from "i/lib/auth-actions";

export function RegisterForm() {
    return (
        <form className="flex w-full flex-col gap-4 rounded-md bg-white p-4 shadow-lg">
            <h1 className="text-2xl font-bold">Register</h1>
            <p className="text-sm text-gray-500">Create an account</p>
            <div className="grid grid-cols-2 gap-4">

                <FormInput label="First Name" placeholder="Max" id="first-name" name="first-name" required />
                <FormInput label="Last Name" placeholder="Robinson" id="last-name" name="last-name" required />


            </div>
            <FormInput label="Email" type="email" name="email" placeholder="Email" required />
            <FormInput label="Password" type="password" name="password" placeholder="Password" required />
            <button type="submit" formAction={signup} className="rounded-full bg-blue-500 p-2 px-4 text-white">
                Create an account
            </button>
            <p className="w-full text-center text-sm text-gray-500">
                Already have an account? <a href="/login">Log In</a>
            </p>

        </form>
    );
}
;

