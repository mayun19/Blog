import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GeistSans } from "geist/font/sans";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = "https://gorest.co.in/public/v2/";
  return (
    <main className={GeistSans.className}>
      <Component {...pageProps} />
    </main>
  );
}
