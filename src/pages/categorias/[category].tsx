import { ProductModel, CategoryModel, Collection } from '@/@types/models';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Product from '@/components/Product';
import SEO from '@/components/SEO';
import { getAllCollectionsNames, getCollectionWithProductsByHandle } from '@/services/shopify';
import { pickFromObject } from '@/utils/pickFromObject';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

interface CategoryProps {
  products: ProductModel[]
  category: Collection
}

const possibleCategoriesIndexes = {
  'camisas-e-calcas': 1,
  'tenis': 2,
  'acessorios': 3,
}

const Category: React.FC<CategoryProps> = ({ category, products }) => {
  const router = useRouter();

  const handleGoToProductDescription = useCallback((id: string) => {
    router.push(`/products/${id}`);
  }, [router]);

  return (
    <>
      <SEO title={category.title} />

      <div>
        <Header activeIndex={pickFromObject(possibleCategoriesIndexes, category.handle)} />

        <main className="flex justify-center my-9 rounded-lg w-full">
          <div className="max-w-6xl w-full flex justify-between items-center">
            <div className="flex flex-col items-center md:items-stretch w-full">
              <h1 className="relative text-2xl font-bold mt-6 mb-8 w-fit after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-[110%] after:bg-primary">{category.title}</h1>

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
  );
}


export async function getStaticPaths() {
  const collections = await getAllCollectionsNames();

  const paths = collections
    .map(item => ({
      params: { category: String(item.handle) },
    }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const paramCategory = context.params?.category;
  
  if (!paramCategory || typeof paramCategory !== 'string') {
    throw new Error('Invalid ID')
  }

  const category = await getCollectionWithProductsByHandle(paramCategory);

  return {
    props: {
      products: category.products,
      category: category,
    },
    revalidate: 10
  }
}

export default Category;