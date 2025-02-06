import { ShoppingBag, User } from 'lucide-react';
import LangDropdown from './lang-dropdown';

export default function AccountPill() {
  return (
    <div
      id="account-pill"
      className="relative flex w-auto flex-row items-center rounded-full border border-white bg-smoke/50 font-bold text-white"
    >
      <LangDropdown />
      <div className="bg-transparent px-3 py-2 transition-colors duration-300 ease-in-out hover:bg-white/50">
        <User />
      </div>
      <div className="rounded-r-full bg-transparent px-2 py-2 pr-4 transition-colors duration-300 ease-in-out hover:bg-white/50">
        <ShoppingBag />
      </div>
    </div>
  );
}
