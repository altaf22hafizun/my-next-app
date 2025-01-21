import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    // Menggunakan strategi JWT untuk sesi autentikasi
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // Mendefinisikan provider untuk autentikasi menggunakan kredensial
    CredentialsProvider({
      // Jenis provider adalah kredensial (username dan password)
      type: "credentials",
      // Nama provider untuk autentikasi
      name: "Credentials",
      credentials: {
        // Inputannya apa aja
        fullname: { label: "Fullname", type: "fullname" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Fungsi yang dipanggil saat melakukan autentikasi
        const { email, password, fullname } = credentials as { email: string; password: string; fullname: string };
        // Membuat objek user dengan data yang diberikan
        const user: any = {
          id: 1,
          email: email,
          password: password,
          fullname: fullname,
        };
        // Jika pengguna ditemukan, kembalikan objek user
        if (user) {
          return user;
        } else {
          // Jika tidak ada pengguna, kembalikan null
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt({ token, account, profile, user }: any) {
      // Callback ini dijalankan setelah autentikasi berhasil dan menghasilkan JWT token
      if (account?.provider === "credentials") {
        // Menambahkan data user (email dan fullname) ke dalam token JWT
        token.email = user.email;
        token.fullname = user.fullname;
      }
      // Mengembalikan token JWT yang sudah diupdate
      return token;
    },

    async session({ session, token }: any) {
      // Callback ini dijalankan ketika sesi dimulai
      if ("email" in token) {
        // Menambahkan data email dari token ke session
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        // Menambahkan data fullname dari token ke session
        session.user.fullname = token.fullname;
      }
      // Mengembalikan session yang sudah diperbarui
      return session;
    },
  },
};

export default NextAuth(authOptions);
