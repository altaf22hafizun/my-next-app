// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from "@/utils/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  message: string;
};

// Karna kita butuh await maka asycn function
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    // Ini contoh tidak distracturing langsung
    // await signUp(req.body, (result: { status: boolean; message: string; }) => {
    //     if (result.status === true) {
    //         res.status(200).json({ status: true, message: "Berhasil mendaftar" });
    //     }
    // });
    // Ini contoh distracturing langsung
    await signUp(req.body, ({ status, message }: { status: boolean; message: string }) => {
      if (status) {
        res.status(200).json({ status, message });
      } else {
        res.status(400).json({ status, message });
      }
    });
  } else {
    res.status(405).json({ status: false, message: "Method not allowed" });
  }
}
