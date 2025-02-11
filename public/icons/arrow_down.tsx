export default function ArrowDown({ size, color, className }: { size?: number; color?: string; className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size ?? '9'}
            viewBox="0 0 15 9"
            width={size ?? '15'}
            fill={color ?? '#DEDBD5'}
            className={className}
        >
            <path d="M7.5 8.25L0 0.75H15L7.5 8.25Z" />
        </svg>
    );
}
