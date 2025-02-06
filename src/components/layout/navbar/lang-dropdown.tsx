import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from 'i/lib/utils';

export default function LangDropdown() {
  const langs = ['EN', 'FR', 'ES', 'DE'];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(langs[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="lang-dropdown"
        className="rounded-l-full bg-transparent px-2 py-2 pl-4 transition-colors duration-300 ease-in-out hover:bg-white/50"
      >
        <div className="flex flex-row items-center gap-2 bg-transparent transition-colors duration-300 ease-in-out">
          {selectedLang}
          <ChevronDown
            className={`${isOpen ? 'rotate-180' : ''} size-4 transition-transform duration-300 ease-in-out`}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-smoke/50 absolute top-full z-10 ml-1 mt-2 flex w-fit flex-col gap-2 overflow-hidden rounded-md border border-white"
          >
            <ul className="flex w-full flex-col">
              {langs.map((lang) => (
                <li
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setIsOpen(false);
                  }}
                  className={cn(
                    selectedLang === lang && 'bg-lime/70 text-black',
                    'px-6 py-1 first:rounded-t-md last:rounded-b-md hover:bg-white/15',
                    'cursor-pointer transition-colors duration-300 ease-in-out'
                  )}
                >
                  {lang}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
