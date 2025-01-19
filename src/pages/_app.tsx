import AppSheel from "@/components/layouts/AppSheel";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppSheel>
      <Component {...pageProps} />
    </AppSheel>
  );
}
