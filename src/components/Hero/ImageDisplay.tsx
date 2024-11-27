import { motion } from 'framer-motion';
import Image, { type ImageProps } from 'next/image';

export default function ImageDisplay({
  src,
  alt,
  className,
  priority,
}: ImageProps & { className?: string; priority?: boolean }) {
  return (
    <div key={src as string} className="relative h-screen w-screen">
      <Image src={src} alt={alt} fill className={className} priority={priority} />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-black/10 backdrop-blur-md"
      ></motion.div>
      <div id="interlaced"></div>
      <div id="glare"></div>
    </div>
  );
}
