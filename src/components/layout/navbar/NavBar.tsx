'use client';
import React, { useState, useRef, useEffect } from 'react';
import SearchPopup from '../../SearchPopop';
import Menu from '../../Menu';
import CartSidebar from '../../CartSidebar';
import LoginButton from '../../LogInButton';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import NavPill from './nav-pill';
import AccountPill from './account-pill';

const NavBar = () => {
  return (
    <nav className="fixed top-8 z-10 flex w-full items-center justify-between gap-2 px-8">
      {/* <div>
        <Menu />
      </div>
      <div className="flex flex-row items-center gap-2">
        <SearchPopup />
        <CartSidebar />
        <LoginButton />
      </div> */}
      <h1 className="text-3xl font-bold text-white">EStore</h1>
      <NavPill />
      <AccountPill />
    </nav>
  );
};

export default NavBar;
