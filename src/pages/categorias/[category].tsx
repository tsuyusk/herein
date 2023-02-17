import { ProductModel, CategoryModel } from '@/@types/models';
import Header from '@/components/Header';
import Product from '@/components/Product';
import SEO from '@/components/SEO';
import { parseProducts } from '@/utils/parseProducts';
import { pickFromObject } from '@/utils/pickFromObject';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { categories, products as productsData } from '../api/data';

interface CategoryProps {
  products: ProductModel[]
  category: CategoryModel
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
        <Header activeIndex={pickFromObject(possibleCategoriesIndexes, category.slug)} />

        <main className="flex justify-center my-9 rounded-lg w-full">
          <div className="max-w-6xl w-full flex justify-between items-center">
            <div className="flex flex-col w-full">
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
      </div>
    </>
  );
}


export async function getStaticPaths() {
  const paths = categories
    .map(item => ({
      params: { category: String(item.slug) },
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


  const category = categories.find(item => String(item.slug) === paramCategory);

  if (!category) {
    throw new Error('Invalid ID')
  }

  const products = parseProducts(productsData.filter(item => item.category === category.slug));

  return {
    props: {
      products,
      category,
    },
  }
}

export default Category;