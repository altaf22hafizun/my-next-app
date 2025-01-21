import AppSheel from "@/components/layouts/AppSheel";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";
import { Session } from "inspector/promises";
import type { AppProps } from "next/app";

// Fungsi komponen utama untuk aplikasi Next.js

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // Di sini kita menerima dua properti:
  // 1. `Component`: Komponen halaman yang akan dirender.
  // 2. `pageProps`: Data yang diteruskan ke halaman, yang berisi berbagai properti.
  //    - Kita melakukan destrukturisasi `pageProps` untuk memisahkan `session` dan sisa properti lainnya.
  return (
    // Menggunakan SessionProvider untuk menyediakan data sesi (login) ke seluruh aplikasi
    <SessionProvider session={session}>
      <AppSheel>
        {/* { ...pageProps } meneruskan semua data yang ada dalam pageProps ke komponen halaman */}
        <Component {...pageProps} />
        {/* pageProps yang lainnya (selain session) akan diteruskan ke halaman yang sedang dirender */}
      </AppSheel>
    </SessionProvider>
  );
}
