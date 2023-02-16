import { ProductModel } from '@/@types/models';
import { MdShoppingCart, MdArrowRightAlt } from 'react-icons/md';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { GetStaticPropsContext } from 'next';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';

interface ProductDetailProps {
  product: ProductModel;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {

  return (
    <>
      <SEO />

      <div>
        <Header />

        <main className="flex justify-center my-9 px-8 rounded-lg w-full">
          <div className="max-w-6xl w-full flex-col md:flex-row flex justify-between">
            <div className="flex flex-col w-full md:w-[60%]">
              <div className="flex justify-center p-4 bg-white rounded-lg shadow-lg">
                <div className="w-full md:w-[360px]">
                  <Carousel width="100%">
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

                <p className="mb-4">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni voluptatibus earum doloribus labore minima doloremque, maiores voluptates nisi voluptas dolorem, libero quam ipsa fugiat facere sed tempore accusamus. Officia, sint!
                </p>

                <ul className="list-disc ml-8">
                  <li>Lorem ipsum dolor sit amet consectetur</li>
                  <li>Lorem ipsum dolor sit amet consectetur</li>
                  <li>Lorem ipsum dolor sit amet consectetur</li>
                  <li>Lorem ipsum dolor sit amet consectetur</li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-[40%] mt-12 md:mt-0 md:ml-12 bg-white rounded-lg p-4 h-fit shadow-lg">
              <h1 className="text-3xl text-gray-700">Calça Jogger {'"'}All Black{'"'} Nova Coleção</h1>

              <h2 className="my-4 text-xl text-green-600">Preço: <span>R$ 98,00</span></h2>

              <div className="flex flex-col md:flex-row">
                <button className="bg-primary px-3 py-2 flex items-center text-white rounded-md shadow-lg border-black border-2 transition-all duration-500 brightness-100 hover:brightness-125">
                  <MdArrowRightAlt className="mr-1" />
                  Comprar
                </button>

                <button className="bg-white px-3 py-2 flex items-center text-primary rounded-md shadow-lg border-primary mt-4 md:mt-0 md:ml-4 border-2 transition-all duration-500 brightness-100 hover:brightness-75">
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
  const responses = await Promise.all([fetch("https://fakestoreapi.com/products/category/men's clothing"), fetch("https://fakestoreapi.com/products/category/women's clothing")]);

  let data = await Promise.all(responses.map(response => response.json()));

  data = [...data[0], ...data[1]] as any

  const paths = data
    .filter(item => item.id)
    .map(item => ({
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

  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  const data = await response.json() as any;

  const product: ProductModel = {
    id: data.id,
    images: [data.image],
    price: data.price,
    title: data.title,
    description: data.description,
  };

  return {
    props: { product },
  }
}

export default ProductDetail;
