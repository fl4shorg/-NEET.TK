
import React from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="w-full border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
