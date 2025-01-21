import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    // Mendapatkan path URL dari request.
    const pathName = req.nextUrl.pathname;
    // Memeriksa apakah path yang diminta membutuhkan otentikasi.
    if (requireAuth.includes(pathName)) {
      // Mengambil token JWT dari request untuk memverifikasi otentikasi.
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      // Jika token tidak ada, artinya pengguna tidak terautentikasi, redirect ke halaman utama.
      if (!token) {
        const url = new URL("/", req.url);
        return NextResponse.redirect(url);
      }
    }
    // Jika otentikasi berhasil atau path tidak membutuhkan otentikasi, jalankan middleware yang diberikan.
    return middleware(req, next);
  };
}
