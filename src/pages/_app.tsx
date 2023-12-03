import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';

import { Poppins } from '@next/font/google'
import { AppProvider } from '../context/AppContext';

const poppins: any = Poppins({
  subsets: ["latin-ext"],
  weight: ['400', '600'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <NextNProgress />
      <main
        className={`${poppins.className} container max-w-7xl m-auto w-screen h-screen`}
      >
        <Component {...pageProps} />
      </main>
    </AppProvider>
  );
}

export default MyApp
