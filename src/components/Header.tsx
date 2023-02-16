import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="flex justify-center w-100 py-6 bg-gray-800 rounded-br-md rounded-bl-md">
      <div className="max-w-6xl w-full flex justify-between items-center">
        <Link href="/" className="after:hidden brightness-100 transition duration-500 hover:brightness-75">
          <img className="w-10 h-10" src="/assets/logo4.png" alt="Logo" />
        </Link>
  
        <nav className="flex align-center justify-center flex-wrap text-white">
          <Link className="text-primary after:bg-primary" data-active="true" href="/main.html">Home</Link>
          <span className="mx-3">/</span>
          <Link href="/camisas">Camisas e calças</Link>
          <span className="mx-3">/</span>
          <Link href="/tenis">Tênis</Link>
          <span className="mx-3">/</span>
          <Link href="/acessorios">Acessorios</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;