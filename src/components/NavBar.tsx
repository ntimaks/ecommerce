import React from 'react';
import Hamburger from "../components/hamburger";
import SearchPopup from './SearchPopop';
import Menu from './Menu';

const NavBar = () => {
  return (
    <nav className="absolute top-8 w-full flex justify-between px-8">
      <div>
        <Menu />
      </div>
      <div>
        <SearchPopup />
      </div>
    </nav>
  );
};

export default NavBar;