import { ProductModel } from '@/@types/models';
import { createContext, useContext, useState } from 'react';

interface CartItem extends ProductModel {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: ProductModel) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

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

  const removeItem = (id: string) => {
    const updatedItems = items.filter((i) => i.id !== id);
    setItems(updatedItems);
  };

  const clearCart = () => {
    setItems([]);
  };

  const contextValue: CartContextType = {
    items,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
