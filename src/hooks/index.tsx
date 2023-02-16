import React from "react"
import { CartProvider } from "./cart";

interface RootProviderProps {
  children: React.ReactElement;
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
