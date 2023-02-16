import Header from '@/components/Header';
import SEO from '@/components/SEO';
import React from 'react';

const Cart: React.FC = () => {
  return (
    <>
      <SEO />

      <div className="pb-4">
        <Header />

        <main className="flex justify-center my-9 rounded-lg w-full">
          <div className="max-w-6xl w-full flex justify-between items-center">

            <h1 className="relative text-2xl font-bold mt-6 mb-8 w-fit after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-[110%] after:bg-primary">Seu carrinho</h1>
            
          </div>
        </main>
      </div>
    </>
  );
}

export default Cart;