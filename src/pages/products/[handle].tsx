import React, { useCallback } from 'react';
import { ProductModel } from '@/@types/models';
import { MdShoppingCart, MdLocalShipping, MdShield, MdArrowUpward } from 'react-icons/md';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { GetStaticPropsContext } from 'next';
import { Carousel } from 'react-responsive-carousel';
import { parsePrice } from '@/utils/parsePrice';
import { useCart } from '@/hooks/cart';
import Footer from '@/components/Footer';
import { getAllProducts, getProductByHandle } from '@/services/shopify';

interface ProductDetailProps {
  product: ProductModel;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { addItem, getCheckoutLink } = useCart();

  const handlePurchase = useCallback(async () => {
    const url = await getCheckoutLink(product);

    if (!url) {
      return;
    }

    window.location.replace(url);
  }, [getCheckoutLink, product]);

  return (
    <>
      <SEO title={product.title} />

      <div>
        <Header />

        <main className="flex justify-center my-9 px-8 rounded-lg w-full pb-12">
          <div className="max-w-6xl w-full flex-col md:flex-row flex justify-between">
            <div className="flex flex-col w-full md:w-[60%]">
              <div className="flex justify-center p-4 bg-white rounded-lg shadow-lg">
                <div className="w-full md:w-[360px]">
                  <Carousel width="100%" infiniteLoop>
                    {product.images.map(image => (
                      <div key={image}>
                        <img src={image} alt={product.title} width={360} />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white rounded-lg text-gray-600 shadow-lg">
                <h1 className="text-3xl mb-8 text-gray-700">Descrição</h1>

                <p className="">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="w-full md:w-[40%] mt-12 md:mt-0 md:ml-12 bg-white rounded-lg p-4 h-fit shadow-lg">
              <h1 className="text-3xl text-gray-700">{product.title}</h1>

              <h2 className="my-4 text-xl text-green-600">Preço: <span>{parsePrice(product.price)}</span></h2>

              <div className="flex flex-col md:flex-row">
                <button onClick={() => addItem(product)} className="bg-white px-3 py-2 flex items-center text-primary rounded-md shadow-lg border-primary border-2 transition-all duration-500 hover:text-white hover:bg-primary">
                  <MdShoppingCart className="mr-1" />
                  Adicionar ao Carrinho
                </button>

                <button onClick={handlePurchase} className="bg-primary px-3 py-2 flex items-center text-white rounded-md shadow-lg border-primary border-2 transition-all duration-500 brightness-100 hover:brightness-75 mt-4 md:mt-0 md:ml-4">
                  <MdArrowUpward className="mr-1" />
                  Comprar
                </button>
              </div>

              <div className="bg-gray-600 p-4 w-full mt-8 rounded-lg">
                <div className="flex items-start text-white">
                  <MdLocalShipping className="mr-1" />
                  <p className="text-xs">
                    <span className="text-blue-400 text-base">Frete Gratis</span>. Enviado pelos Correios.
                  </p>
                </div>

                <div className="flex items-start text-white mt-2">
                  <MdLocalShipping className="mr-1" />
                  <p className="text-xs">
                    <span className="text-blue-400 text-base">Frete Power</span> Até 9 dias apartir do seu pagamento 

                    <h2 className="text-green-400">+12R$</h2>
                  </p>
                </div>

                <div className="flex items-start text-white mt-2">
                  <MdShield className="mr-1" />

                  <p className="text-xs">
                    <span className="text-blue-400 text-base">Compra Gratuita.</span> Saia satisfeito ou devolvemos o dinheiro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const products = await getAllProducts();

  const paths = products
    .filter((item) => item.handle)
    .map((item) => ({
      params: { handle: String(item.handle) },
    }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const handle = context.params?.handle;

  if (!handle || typeof handle !== 'string') {
    throw new Error('Invalid HANDLE')
  }

  const product = await getProductByHandle(handle);

  return {
    props: { product },
  }
}

export default ProductDetail;
