import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { MdShoppingCart, MdMenu, MdClose } from 'react-icons/md';
import Drawer from 'react-modern-drawer';
import { useCart } from '@/hooks/cart';

interface FooterProps {
}

const Footer: React.FC<FooterProps> = ({ }) => {

  return (
    <footer className="flex justify-center w-100 py-24 bg-gray-800 w-full mt-auto">
      <div className="max-w-6xl w-full flex justify-between items-center px-8">
        <div className="flex flex-col items-center text-white">
          <p className="w-full text-center">
            Preços e condições de pagamento exclusivos para compras neste site oficial. Evite comprar produtos mais baratos ou de outras lojas, pois você pode estar sendo enganado(a) por um golpista. Caso você mesmo compre os mesmos produtos em outras lojas, <strong>não nos responsabilizamos por quaisquer problemas.</strong>
          </p>

          <div className="flex flex-col items-center my-8">
            <p>Nós aceitamos</p>

            <div className="flex space-x-4 mt-4">
              <img src="/assets/payment-methods/amex.svg" alt="Amex" />
              <img src="/assets/payment-methods/boleto.svg" alt="Boleto" />
              <img src="/assets/payment-methods/elo.svg" alt="Elo" />
              <img src="/assets/payment-methods/hypercard.svg" alt="Hypercard" />
              <img src="/assets/payment-methods/mastercard.svg" alt="Mastercard" />
              <img src="/assets/payment-methods/visa.svg" alt="Visa" />
            </div>
          </div>

          <p>© Herein | CNPJ: 44.653.342/0001-86. Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;