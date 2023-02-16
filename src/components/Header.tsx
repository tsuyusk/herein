import React from 'react';
import Link from 'next/link';
import { MdShoppingCart } from 'react-icons/md';

const Header: React.FC = () => {
  return (
    <header className="flex justify-center w-100 py-6 bg-gray-800">
      <div className="max-w-6xl w-full flex justify-between items-center px-8">
        <Link href="/" className="after:hidden brightness-100 transition duration-500 hover:brightness-75">
          <img className="w-10 h-10" src="/assets/logo4.png" alt="Logo" />
        </Link>
  
        <nav className="flex align-center justify-center flex-wrap text-white">
          <button className="bg-transparent border-0 mr-4 brightness-100 transition-all duration-500 hover:brightness-75">
            <MdShoppingCart size={24} />
          </button>
            

          <div className="hidden md:visible md:flex">
            <Link className="text-primary after:bg-primary" href="/main.html">Home</Link>
            <span className="mx-3">/</span>
            <Link href="/camisas">Camisas e calças</Link>
            <span className="mx-3">/</span>
            <Link href="/tenis">Tênis</Link>
            <span className="mx-3">/</span>
            <Link href="/acessorios">Acessorios</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;