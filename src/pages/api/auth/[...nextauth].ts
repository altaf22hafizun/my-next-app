import { signIn } from "@/utils/firebase/service";
import { compare } from "bcrypt";
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
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Fungsi yang dipanggil saat melakukan autentikasi
        const { email, password } = credentials as { email: string; password: string };
        // Membuat objek user dengan data yang diberikan
        const user: any = await signIn({ email });
        // Jika pengguna ditemukan, kembalikan objek user
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          } else {
            return null;
          }
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
        // Menambahkan data user (email dan fullname role) ke dalam token JWT
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
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
      if ("role" in token) {
        // Menambahkan data role dari token ke session
        session.user.role = token.role;
      }
      // Mengembalikan session yang sudah diperbarui
      return session;
    },
  },

  pages: {
    // Mengatur halaman yang akan diarahkan ke pengguna
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
