import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(request: NextRequest) {
  // Jika selain link yang dibatasi seperti profile dan product maka akan silahkan dibuka aja
  const res = NextResponse.next();
  return res;
}

// Menambahkan middleware untuk membatasi link dengan otentikasi ke rute tertentu ('/profile' dan '/product').
// Middleware akan mengintersep request ke rute-rute ini dan menerapkan logika otentikasi.
export default withAuth(mainMiddleware, ["/profile", "/admin"]);
