import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams);

  const hash = params.hash;
  if (!hash) {
    return NextResponse.json({ error: "Missing hash" }, { status: 400 });
  }

  // Step 1: remove hash, build data string
  const { hash: _h, ...authData } = params;
  const dataCheckString = Object.keys(authData)
    .sort()
    .map((key) => `${key}=${authData[key]}`)
    .join("\n");
  console.log("Using bot token:", process.env.BOT_TOKEN);
  // Step 2: compute secret key
  const secretKey = crypto
    .createHash("sha256")
    .update(process.env.BOT_TOKEN!)
    .digest("hex");

  const checkHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  // Step 3: compare
  if (checkHash !== hash) {
    return NextResponse.json({ error: "Invalid hash" }, { status: 400 });
  }

  // Step 4: check expiry
  const authDate = parseInt(authData.auth_date, 10);
  if (Date.now() / 1000 - authDate > 86400) {
    return NextResponse.json(
      { error: "Auth data is outdated" },
      { status: 400 }
    );
  }

  // ✅ Verified Telegram user
  const user = {
    id: authData.id,
    first_name: authData.first_name,
    last_name: authData.last_name,
    username: authData.username,
    photo_url: authData.photo_url,
  };

  // TODO: save in DB or issue JWT/cookie
  return NextResponse.json({ success: true, user });
}
