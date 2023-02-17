import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { MdShoppingCart, MdMenu, MdClose } from 'react-icons/md';
import Drawer from 'react-modern-drawer';
import { useCart } from '@/hooks/cart';

interface HeaderProps {
  activeIndex?: number;
}

const Header: React.FC<HeaderProps> = ({ activeIndex = -1 }) => {
  const { amountOfItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = useCallback(() => {
    setIsOpen(state => !state);
  }, []);

  return (
    <header className="flex justify-center w-100 py-6 bg-gray-800">
      <div className="max-w-6xl w-full flex justify-between items-center px-8">
        <Link href="/" className="after:hidden brightness-100 transition duration-500 hover:brightness-75">
          <img className="w-10 h-10" src="/assets/logo4.png" alt="Logo" />
        </Link>
  
        <nav className="flex align-center justify-center flex-wrap text-white">
          <div className="hidden md:visible md:flex">
            <Link href="/cart" className="relative bg-transparent border-0 mr-8 brightness-100 transition-all duration-500 hover:brightness-75">
              <MdShoppingCart size={24} />

              <span className="absolute -left-2 -bottom-2">{amountOfItems}</span>
            </Link>

            <Link data-active={String(activeIndex === 0)} href="/">Home</Link>
            <span className="mx-3">/</span>
            <Link data-active={String(activeIndex === 1)} href="/categorias/camisas-e-calcas">Camisas e calças</Link>
            <span className="mx-3">/</span>
            <Link data-active={String(activeIndex === 2)} href="/categorias/tenis">Tênis</Link>
            <span className="mx-3">/</span>
            <Link data-active={String(activeIndex === 3)} href="/categorias/acessorios">Acessorios</Link>
          </div>

          <button className="bg-transparent border-0 md:hidden" onClick={toggleDrawer}>
            <MdMenu size={24} />
          </button>

          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="right"
          >
            <div className="bg-gray-800 h-full items-center flex flex-col py-8">
              <button className="bg-transparent border-0" onClick={toggleDrawer}>
                <MdClose size={24} />
              </button>

              <Link href="/cart" className="relative bg-transparent border-0 mr-8 brightness-100 transition-all duration-500 hover:brightness-75">
                <MdShoppingCart size={24} />

                <span className="absolute -left-2 -bottom-2">{amountOfItems}</span>
              </Link>

              <Link data-active={String(activeIndex === 0)} className="mt-4" href="/">Home</Link>
              <Link data-active={String(activeIndex === 1)} className="mt-4" href="/categorias/camisas-e-calcas">Camisas e calças</Link>
              <Link data-active={String(activeIndex === 2)} className="mt-4" href="/categorias/tenis">Tênis</Link>
              <Link data-active={String(activeIndex === 3)} className="mt-4" href="/categorias/acessorios">Acessorios</Link>

            </div>
          </Drawer>
        </nav>
      </div>
    </header>
  );
}

export default Header;