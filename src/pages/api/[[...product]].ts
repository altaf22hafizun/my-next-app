// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData, retrieveDataById } from "@/utils/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  // data,status,message adalah object
  status: boolean;
  message: string;
  data: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.query.product![1]) {
    const data = await retrieveDataById("products", req.query.product![1]);
    res.status(200).json({ status: true, message: "success", data });
  } else {
    const data = await retrieveData("products");
    res.status(200).json({ status: true, message: "success", data });
  }
}
