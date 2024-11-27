import React from 'react';
import Search from "../../public/icons/search";
import Hamburger from "../components/hamburger";

const NavBar = () => {
  return (
    <nav className="absolute top-8 w-full flex justify-between px-8">
      <div>
        <Hamburger size={50} />
      </div>
      <div>
        <Search size={50} />
      </div>
    </nav>
  );
};

export default NavBar;