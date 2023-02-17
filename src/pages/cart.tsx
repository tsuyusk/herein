import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Product from '@/components/Product';
import SEO from '@/components/SEO';
import { useCart } from '@/hooks/cart';
import { useCheckout } from '@/hooks/checkout';
import { parsePrice } from '@/utils/parsePrice';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { MdArrowLeft, MdArrowUpward } from 'react-icons/md';

const Cart: React.FC = () => {
  const { advanceStep } = useCheckout();
  const { items, addItem, removeItem, totalPrice } = useCart();
  const router = useRouter();

  const handleGoToProductDescription = useCallback((id: string) => {
    router.push(`/products/${id}`);
  }, [router]);

  const handleGoToCheckout = useCallback(() => {
    advanceStep()

    router.push('/pagamento/contato');
  }, [router, advanceStep]);

  return (
    <>
      <SEO title="Seu Carrinho" />

      <div className="h-full">
        <Header />

        <main className="flex justify-center my-9 rounded-lg w-full">
          <div className="max-w-6xl w-full flex justify-between items-center">
            <div className="flex flex-col md:flex-row w-full justify-between px-8 md:px-0 min-h-[30vw]">
              <div className="flex flex-col items-center md:items-stretch w-full md:w-[60%]">
                <h1 className="relative text-2xl font-bold mt-6 mb-8 w-fit after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-[110%] after:bg-primary">Seu carrinho</h1>

                {items.length === 0 && (
                  <div className="flex flex-col items-center md:items-stretch w-full">
                    <h2 className="text-gray-600 text-lg">Seu carrinho está vazio ):</h2>

                    <button onClick={() => router.push('/')} className="bg-white mt-4 px-3 w-fit py-2 flex items-center text-primary rounded-md shadow-lg border-primary border-2 transition-all duration-500 hover:text-white hover:bg-primary">
                      <MdArrowLeft className="mr-1" />
                      Ver Produtos
                    </button>
                  </div>
                )}
                <div className="grid w-full auto-rows-auto grid-cols-[repeat(2,_140px)] justify-center md:justify-start gap-2 md:grid-cols-[repeat(3,240px)] md:gap-8">
                  {items.map(product => (
                    <div key={product.id} className="flex flex-col">
                      <Product
                        product={product}
                        additionalTextOnPrice={`${product.quantity}x`}
                        onClick={() => handleGoToProductDescription(product.id)}
                        className="hover:scale-100 brightness-100 hover:brightness-[90%] shadow-none bg-white rounded-tr-md rounded-tl-md"
                      />

                      <div className="flex">
                        <button onClick={() => addItem(product)} className="flex-1 py-2 bg-white rounded-bl-md brightness-100 hover:brightness-[90%] transition-all duration-500">
                          +
                        </button>
                        <button onClick={() => removeItem(product)} className="flex-1 py-2 bg-white rounded-br-md brightness-100 hover:brightness-[90%] transition-all duration-500">
                          -
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {items.length !== 0 && (
                <div className="flex flex-col h-fit p-4 bg-white w-full md:w-[30%] rounded-lg shadow-lg mt-8 md:mt-0">
                  <h1 className="relative text-2xl font-bold mt-6 w-fit after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-[110%] after:bg-primary">Preço Total</h1>

                  <h2 className="text-green-400 text-xl my-8">
                    {parsePrice(totalPrice)}
                  </h2>

                  <button onClick={handleGoToCheckout} className="bg-white px-3 w-fit py-2 flex items-center text-primary rounded-md shadow-lg border-primary border-2 transition-all duration-500 hover:text-white hover:bg-primary">
                    <MdArrowUpward className="mr-1" />
                    Comprar
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Cart;