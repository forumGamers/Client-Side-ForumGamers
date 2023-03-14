import Encryption from "@/helper/encryption";
import { NextApiRequest, NextApiResponse } from "next";
const { encrypt, validateChar } = Encryption;
const key = process.env.KEY as string;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { access } = req.headers;

    if (access !== key) return res.status(401).json({ message: "Unathorize" });

    for (const key in req.body) {
      if (
        (!key.toLowerCase().includes("password") ||
          key.toLowerCase() === "access") &&
        validateChar(req.body[key])
      )
        return res
          .status(400)
          .json({ message: `${key} tidak boleh mengandung symbol` });
    }

    let data: any = {};

    for (const key in req.body) {
      data[key] = encrypt(req.body[key]);
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
