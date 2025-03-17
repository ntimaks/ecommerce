export default function Arrow({ size, color, className }: { size?: number; color?: string; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size ?? '17'}
      viewBox="0 0 17 17"
      width={size ?? '17'}
      fill={color ?? '#DEDBD5'}
      className={className}
    >
      <path d="M12.675 9.5H0.5V7.5H12.675L7.075 1.9L8.5 0.5L16.5 8.5L8.5 16.5L7.075 15.1L12.675 9.5Z" />
    </svg>
  );
}