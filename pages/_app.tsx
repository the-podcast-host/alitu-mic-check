import type { AppProps } from 'next/app';
import '@fontsource-variable/montserrat/index.css';

export default function MicCheck({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
