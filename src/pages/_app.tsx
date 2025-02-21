import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PT_Sans } from 'next/font/google'

export const ptSans = PT_Sans({ subsets: ['cyrillic-ext'], weight: ['400', '700'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
