import { motion } from "framer-motion";


export default function Hamburger({ size }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size ?? '48'}
      viewBox="0 -960 960 960"
      width={size ?? '48'}
      fill="white"
    >
      <path d="M99-205v-92h763v92H99Zm0-229v-91h763v91H99Zm0-229v-92h763v92H99Z" />
    </svg>
  );
}
