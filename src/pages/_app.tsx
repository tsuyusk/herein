import '@/styles/globals.css'
import 'react-modern-drawer/dist/index.css';
import type { AppProps } from 'next/app'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { RootProvider } from '@/hooks';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootProvider>
      <Component {...pageProps} />
    </RootProvider>
  )
}
