import { ProductModel } from "@/@types/models";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Product from "@/components/Product";
import SEO from "@/components/SEO";
import { products as productsData } from "@/pages/api/data";
import { GET_ALL_PRODUCTS } from "@/apollo/queries/services/shopify";
import { client } from "@/apollo/client";
import { getAllProducts } from "@/services/shopify";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Carousel } from 'react-responsive-carousel';

interface HomeProps {
  products: ProductModel[];
}

export default function Home({ products }: HomeProps) {
  const router = useRouter();

  const handleGoToProductDescription = useCallback((handle: string) => {
    router.push(`/products/${handle}`);
  }, [router]);

  return (
    <>
      <SEO shouldExcludeTitleSuffix />

      <div>
        <Header activeIndex={0} />

        <main className="flex justify-center rounded-lg w-full my-9">
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

              <div className="grid w-full auto-rows-auto grid-cols-[repeat(auto-fit,_140px)] justify-center md:justify-start gap-2 md:grid-cols-[repeat(auto-fill,240px)] md:gap-8">
                {products.map(product => (
                  <Product
                    key={product.id}
                    product={product}
                    onClick={handleGoToProductDescription}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const products = await getAllProducts();

  return {
    props: { products },
  }
};
