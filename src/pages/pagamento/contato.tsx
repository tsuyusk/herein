import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { useCheckout } from '@/hooks/checkout';
import { useRouter } from 'next/router';
import React from 'react';

const Contact: React.FC = () => {
  const { step } = useCheckout();
  const router = useRouter();

  if (step !== 1) {
    if (typeof window !== 'undefined') {
      router.push('/');
    }

    return null;
  }

  return (
    <>
      <SEO title="Contato da Compra" />

      <div className="h-full">
        <Header />
        
        <main className="flex justify-center my-9 rounded-lg w-full">
          <div className="max-w-6xl w-full flex justify-between items-center">
            <div className="min-h-[30vw]">
              <h1 className="relative text-2xl font-bold mt-6 mb-8 w-fit after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-[110%] after:bg-primary">Como podemos te contatar ?</h1>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Contact;