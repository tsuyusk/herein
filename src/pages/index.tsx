import { ProductModel } from "@/@types/models";
import Header from "@/components/Header";
import Product from "@/components/Product";
import SEO from "@/components/SEO";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Carousel } from 'react-responsive-carousel';

interface HomeProps {
  products: ProductModel[];
}

export default function Home({ products }: HomeProps) {
  const router = useRouter();

  const handleGoToProductdescription = useCallback((id: string) => {
    router.push(`/products/${id}`);
  }, [router]);

  return (
    <>
      <SEO />

      <div className="pb-4">
        <Header />

        <main className="flex justify-center my-9 rounded-lg w-full">
          <div className="max-w-6xl w-full flex justify-between items-center">
            <div className="flex flex-col items-center md:items-stretch w-full">
              <div className="w-full">
                <Carousel className="h-96" showThumbs={false} swipeable infiniteLoop>
                  <div>
                    <img
                      className="h-96 pointer-events-none"
                      src="https://images.unsplash.com/photo-1674694773940-9c892c8616e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                      alt="Banner"
                    />  
                  </div>
                  <div>
                    <img
                      className="h-96 pointer-events-none"
                      src="https://images.unsplash.com/photo-1674694773940-9c892c8616e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                      alt="Banner"
                    />  
                  </div>
                </Carousel>
              </div>

              <h1 className="relative text-2xl font-bold mt-6 mb-8 w-fit after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-[110%] after:bg-primary">Nossos Produtos</h1>

              <div className="grid auto-rows-auto grid-cols-[repeat(auto-fill,240px)] gap-8">
                {products.map(product => (
                  <Product
                    key={product.id}
                    product={product}
                    onClick={handleGoToProductdescription}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const responses = await Promise.all([fetch("https://fakestoreapi.com/products/category/men's clothing"), fetch("https://fakestoreapi.com/products/category/women's clothing")]);

  let data = await Promise.all(responses.map(response => response.json()));

  data = [...data[0], ...data[1]]

  const products: ProductModel[] = data.map((product: any) => ({
    id: product.id,
    images: [product.image],
    price: product.price,
    title: product.title,
    description: product.description,
  }));

  return {
    props: { products },
  }
};
