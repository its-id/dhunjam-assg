import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from '@next/font/google'

const poppins: any = Poppins({
  subsets: ["latin-ext"],
  weight: ['400', '600'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp
