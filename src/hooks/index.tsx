import React from "react"
import { CartProvider } from "./cart";
import { CheckoutProvider } from "./checkout";

interface RootProviderProps {
  children: React.ReactElement;
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <CartProvider>
      <CheckoutProvider>
        {children}
      </CheckoutProvider>
    </CartProvider>
  );
}
