import { ProductModel } from '@/@types/models';
import { MdShoppingCart, MdArrowRightAlt } from 'react-icons/md';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { products } from '@/pages/api/data';
import { GetStaticPropsContext } from 'next';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { parsePrice } from '@/utils/parsePrice';

interface ProductDetailProps {
  product: ProductModel;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {

  return (
    <>
      <SEO />

      <div>
        <Header />

        <main className="flex justify-center my-9 px-8 rounded-lg w-full pb-12">
          <div className="max-w-6xl w-full flex-col md:flex-row flex justify-between">
            <div className="flex flex-col w-full md:w-[60%]">
              <div className="flex justify-center p-4 bg-white rounded-lg shadow-lg">
                <div className="w-full md:w-[360px]">
                  <Carousel width="100%" infiniteLoop>
                    <div>
                      <img src={product.images[0]} alt={product.title} width={360} />
                    </div>

                    <div>
                      <img src={product.images[0]} alt={product.title} width={360} />
                    </div>
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
                <button className="bg-white px-3 py-2 flex items-center text-primary rounded-md shadow-lg border-primary border-2 transition-all duration-500 hover:text-white hover:bg-primary">
                  <MdShoppingCart className="mr-1" />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const paths = products
    .filter((item) => item.id)
    .map((item) => ({
      params: { id: String(item.id) },
    }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params?.id;

  if (!id || typeof id !== 'string') {
    throw new Error('Invalid ID')
  }

  const foundProduct = products.find(item => String(item.id) === id);

  if (!foundProduct) {
    throw new Error('Product invalid');
  }

  const product: ProductModel = {
    id: String(foundProduct.id),
    images: [foundProduct.image],
    price: foundProduct.price,
    title: foundProduct.title,
    description: foundProduct.description,
  };

  return {
    props: { product },
  }
}

export default ProductDetail;
