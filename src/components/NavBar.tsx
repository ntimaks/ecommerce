import React from 'react';
import SearchPopup from './SearchPopop';
import Menu from './Menu';
import CartSidebar from './CartSidebar';
const NavBar = () => {
  return (
    <nav className="fixed top-8 z-10 flex w-full justify-between px-8">
      <div>
        <Menu />
      </div>
      <div className="flex flex-row items-center gap-2">
        <SearchPopup />
        <CartSidebar />
      </div>
    </nav>
  );
};

export default NavBar;
