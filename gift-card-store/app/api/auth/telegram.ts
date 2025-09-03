import type { NextApiRequest, NextApiResponse } from "next";
import { AuthDataValidator } from "@telegram-auth/server";
import { urlStrToAuthDataMap } from "@telegram-auth/server/utils";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const validator = new AuthDataValidator({
  botToken: process.env.TELEGRAM_BOT_TOKEN,
});
console.log("Using bot token:", process.env.TELEGRAM_BOT_TOKEN);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.method === "GET" ? req.query : req.body;

    // data validation
    const user = await validator.validate(data); // throws if invalid

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      })
    );

    if (req.method === "GET") {
      return res.redirect("/dashboard");
    }

    return res.status(200).json({ ok: true, user });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: "Invalid Telegram auth" });
  }
}
