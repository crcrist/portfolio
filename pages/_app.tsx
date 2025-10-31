import "../styles/globals.css";
import type { AppProps } from "next/app";
import SEOHead from "../components/SEOHead";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEOHead />
      <Component {...pageProps} />
    </>
  );
}
