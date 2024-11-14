
'use client';
import { useState } from 'react';
import Link from 'next/link';
//Navbar
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  return (
    <nav className="w-full flex justify-between items-center p-4 bg-gray-800 text-white relative">
      <div className="logo">
        <h2 className="text-2xl ">Finsta</h2>
      </div>

      {/*  Menu Button  */}
      <div className="sm:hidden flex items-center z-10">
        <button onClick={toggleMenu} className="text-white text-2xl">
          ☰
        </button>
      </div>

      {/* Desktop Menu  */}
      <ul className="hidden sm:flex space-x-6">
        <li><Link href="/users" className="hover:underline">Users</Link></li>
        <li><Link href="/content" className="hover:underline">Content</Link></li>
        <li><Link href="/analytics" className="hover:underline">Analytics</Link></li>
        <li><Link href="/insights" className="hover:underline">Visualize</Link></li>
      </ul>

   
      <div className={`sm:hidden w-full bg-gray-800 text-white text-center ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="space-y-4 py-4">
          <li><Link href="/users" className="hover:underline">Users</Link></li>
          <li><Link href="/content" className="hover:underline">Content</Link></li>
          <li><Link href="/analytics" className="hover:underline">Analytics</Link></li>
          <li><Link href="/insights" className="hover:underline">Visualize</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
