import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const onlyAdmin = ["/admin"];

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
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
      // Jika saya tidak admin dan saya berada dihalaman yang hanya admin yang bisa akses, maka berikan response forbidden.
      if (token.role !== "admin" && onlyAdmin.includes(pathName)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    // Jika otentikasi berhasil atau path tidak membutuhkan otentikasi, jalankan middleware yang diberikan.
    return middleware(req, next);
  };
}
