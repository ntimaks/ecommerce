'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    label: 'Home',
    href: '/home',
  },
  {
    label: 'Store',
    href: '/store',
  },
  {
    label: 'Sale',
    href: '#',
  },
  {
    label: 'About',
    href: '#',
  },
];
export default function NavPill() {
  const navPillButtons = [
    {
      label: 'Home',
      href: '/home',
    },
    {
      label: 'Store',
      href: '/store',
    },
    {
      label: 'Sale',
      href: '#',
    },
    {
      label: 'About',
      href: '#',
    },
    {
      label: 'Search',
      href: '#',
    },
  ];
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState<string>(
    navPillButtons.find((button) => button.href === pathname)?.label ?? 'Home'
  );
  const [activeWidth, setActiveWidth] = useState<number>(0);
  const [activeOffset, setActiveOffset] = useState<number>(0);
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = navPillButtons.findIndex((button) => button.label === activeButton);
    const activeButtonElement = buttonRefs.current[activeIndex];

    if (activeButtonElement) {
      const updateDimensions = () => {
        setActiveWidth(activeButtonElement.offsetWidth);
        setActiveOffset(activeButtonElement.offsetLeft);
      };

      // Initial update
      updateDimensions();

      // Create a ResizeObserver to update dimensions on resize
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(activeButtonElement);

      // Cleanup observer on unmount or when activeButton changes
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [activeButton, buttonRefs]);

  return (
    <motion.div
      animate={{ width: 'auto' }}
      id="nav-pill"
      className="relative flex w-auto flex-row items-center rounded-full border border-white bg-smoke/50"
    >
      <div
        className="absolute h-full rounded-full bg-lime/70 transition-all duration-300 ease-in-out"
        style={{ width: activeWidth, transform: `translateX(${activeOffset}px)` }}
      />
      {navPillButtons.map((button, index) => (
        <NavPillButton
          key={button.label}
          text={button.label}
          href={button.href}
          isActive={button.label === activeButton}
          onClick={() => setActiveButton(button.label)}
          ref={(el) => (buttonRefs.current[index] = el)}
        />
      ))}
    </motion.div>
  );
}

function NavPillButton({
  text,
  href,
  isActive,
  onClick,
  ref,
}: {
  text: string;
  isActive: boolean;
  href: string;
  onClick: () => void;
  ref: (el: HTMLAnchorElement | null) => void;
}) {
  if (text !== 'Search') {
    return (
      <a
        href={href}
        ref={ref}
        className={`nav-text-shadow relative z-10 flex items-center justify-center rounded-full border border-transparent bg-transparent px-4 py-2 font-bold transition-all duration-300 ease-in-out hover:border-white ${
          isActive ? 'text-black' : 'text-white hover:bg-smoke/50'
        }`}
        onClick={onClick}
      >
        {text}
      </a>
    );
  } else {
    return (
      <a
        href="#"
        ref={ref}
        className={`relative z-10 flex items-center justify-center gap-2 rounded-full border border-transparent bg-transparent px-4 py-2 font-bold transition-all duration-300 ease-in-out hover:border-white ${
          isActive ? 'text-black' : 'text-white hover:bg-smoke/50'
        }`}
        onClick={onClick}
      >
        <AnimatePresence>
          {!isActive && (
            <motion.p
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="nav-text-shadow"
            >
              {text}
            </motion.p>
          )}
        </AnimatePresence>
        <Search className="size-4" />
        <AnimatePresence>
          {isActive && (
            <motion.input
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              type="text"
              className="border-b border-black bg-inherit focus:outline-none"
            />
          )}
        </AnimatePresence>
      </a>
    );
  }
}
