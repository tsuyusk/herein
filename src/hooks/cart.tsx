import { ProductModel } from '@/@types/models';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface CartItem extends ProductModel {
  quantity: number;
}

interface CartContextType {
  totalPrice: number;
  amountOfItems: number;
  items: CartItem[];
  addItem: (item: ProductModel) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
}

const CART_STORAGE_KEY = '@herein/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

interface CartProviderProps {
  children: React.ReactElement;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedItems = localStorage.getItem(CART_STORAGE_KEY);
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item: ProductModel) => {
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      const updatedItems = items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      setItems(updatedItems);
    } else {
      setItems([...items, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (item: CartItem) => {    
    setItems(state => {
      const newState = [...state];

      if (item.quantity === 1) {
        return newState.filter((i) => i.id !== item.id);
      } else {
        const itemIndex = newState.findIndex((i) => i.id === item.id);

        newState[itemIndex] = { ...item, quantity: item.quantity - 1 };

        return newState;
      }
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const amountOfItems = useMemo(() => {
    return items.reduce((acc, cur) => acc + cur.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
  }, [items]);

  const contextValue: CartContextType = {
    items,
    addItem,
    removeItem,
    clearCart,
    amountOfItems,
    totalPrice,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};