// // pages/api/auth/telegram.js
// import { AuthDataValidator } from "@telegram-auth/server";
// import { urlStrToAuthDataMap } from "@telegram-auth/server/utils";
// import jwt from "jsonwebtoken";
// import { serialize } from "cookie";

// const validator = new AuthDataValidator({
//   botToken: "8245344399:AAH-Ndgged5zoc2uF1F8fWZ7-hxx3Jd8ldw",
// });
// console.log("Using bot token:", process.env.TELEGRAM_BOT_TOKEN);
// export default async function handler(req, res) {
//   try {
//     const data = req.method === "GET" ? req.query : req.body;
//     const user = await validator.validate(data); // throws on invalid
//     // replay check...
//     // set cookie like earlier
//     const token = jwt.sign({ id: user.id, username: user.username }, "sadada", {
//       expiresIn: "7d",
//     });
//     res.setHeader(
//       "Set-Cookie",
//       serialize("token", token, {
//         httpOnly: true,
//         path: "/",
//         maxAge: 7 * 24 * 60 * 60,
//       })
//     );
//     if (req.method === "GET") return res.redirect("/dashboard");
//     return res.status(200).json({ ok: true, user });
//   } catch (err) {
//     console.error(err);
//     return res.status(403).json({ error: "Invalid Telegram auth" });
//   }
// }
