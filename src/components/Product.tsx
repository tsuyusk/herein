import { ProductModel } from '@/@types/models';
import { parsePrice } from '@/utils/parsePrice';
import React, { useCallback } from 'react';

interface ProductProps {
  product: ProductModel;
  className?: string;
  additionalTextOnPrice?: string;
  onClick?: (id: string) => void;
}

const Product: React.FC<ProductProps> = ({ product, additionalTextOnPrice, className = '', onClick }) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(product.handle);
    }
  }, [onClick, product]);

  return (
    <button onClick={handleClick} className={"flex flex-col justify-between h-full text-left bg-transparent border-0 shadow-lg rounded-md scale-100 transition-all duration-500 p-2 hover:scale-105 " + className}>
      <div className="pointer-events-auto w-full h-full">
        <img 
          className="w-full h-40 md:h-60 object-center object-cover rounded-md"
          src={product.images[0]}
          alt={product.title}
        />
      
        <div className="p-2 flex flex-col">
          <h1 className="text-md max-w-full text-gray-600">{product.title}</h1>

          <h2 className="text-green-400 text-xl mt-auto">
            {parsePrice(product.price)} {' '}
            <span className="text-gray-400 font-normal text-sm">{additionalTextOnPrice}</span>
          </h2>
        </div>
      </div>
    </button>
  );
}

export default Product;