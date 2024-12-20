export function FormInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={label} className="text-sm font-bold">
                {label}
            </label>
            <input id={label} {...props} className="rounded-full border border-gray-300 p-2 px-4" />
        </div>
    );
}