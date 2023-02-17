import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useCart } from './cart';

interface CheckoutContextType {
  step: number;
  formData: object;
  advanceStep: (data?: object) => void;
}
const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }

  return context;
};

interface CheckoutProviderProps {
  children: React.ReactElement;
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ children }) => {
  const { amountOfItems } = useCart();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const advanceStep = useCallback((data: object = {}) => {
    if (step === 0 && amountOfItems === 0) {
      return;
    }

    setStep(state => state + 1);
    setFormData(state => ({...data, ...state }));
  }, [amountOfItems, step]);

  const contextValue: CheckoutContextType = {
    advanceStep,
    step,
    formData,
  };

  return <CheckoutContext.Provider value={contextValue}>{children}</CheckoutContext.Provider>;
};