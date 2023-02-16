import { ProductModel } from '@/@types/models';
import { parsePrice } from '@/utils/parsePrice';
import React, { useCallback } from 'react';

interface ProductProps {
  product: ProductModel;
  onClick?: (id: string) => void;
}

const Product: React.FC<ProductProps> = ({ product, onClick }) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(product.id);
    }
  }, [onClick, product]);

  return (
    <button onClick={handleClick} className="flex flex-col text-left bg-transparent border-0 shadow-lg rounded-md scale-100 transition-all duration-500 p-2 hover:scale-105">
      <div className="pointer-events-auto w-full h-full">
        <img 
          className="w-full h-60 object-center object-cover rounded-md"
          src={product.images[0]}
          alt={product.title}
        />
      
        <div className="p-2 flex flex-col justify-between">
          <h1 className="text-md max-w-[70%] text-gray-600">{product.title}</h1>

          <p className="text-gray-400 my-4 text-sm w-[calc(240px-16px)] h-24 text-ellipsis whitespace-wrap overflow-x-hidden">
            {product.description}
          </p>

          <h2 className="text-green-400 text-xl">{parsePrice(product.price)}</h2>
        </div>
      </div>
    </button>
  );
}

export default Product;