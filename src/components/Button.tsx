export default function Button({ children, onClick, className = '', variant = 'default' }: {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    variant?: 'default' | 'outline'
}) {
    const baseStyle = "px-4 py-2 rounded-none focus:outline-none transition-colors duration-200"
    const variantStyle = variant === 'default'
        ? "bg-black text-white hover:bg-neutral-800"
        : "bg-white/80 text-black border border-neutral-200 hover:bg-neutral-100"

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variantStyle} ${className}`}
        >
            {children}
        </button>
    )
}