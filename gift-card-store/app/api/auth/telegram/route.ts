import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams);

  const { hash, ...authData } = params;
  if (!hash) {
    return NextResponse.json({ error: "Missing hash" }, { status: 400 });
  }

  // Step 1: Rebuild the check string
  const dataCheckArr = Object.keys(authData)
    .sort()
    .map((key) => `${key}=${authData[key]}`);
  const dataCheckString = dataCheckArr.join("\n");

  // Step 2: Compute secret key from BOT_TOKEN
  const secretKey = crypto
    .createHash("sha256")
    .update(process.env.BOT_TOKEN!)
    .digest("hex"); // returns string

  const computedHash = crypto
    .createHmac("sha256", secretKey) // string is valid
    .update(dataCheckString)
    .digest("hex");

  // Step 3: Compare
  if (computedHash !== hash) {
    return NextResponse.json(
      { error: "Data is NOT from Telegram" },
      { status: 403 }
    );
  }

  // Step 4: Expiry check
  const authDate = parseInt(authData.auth_date, 10);
  if (Date.now() / 1000 - authDate > 86400) {
    return NextResponse.json({ error: "Data is outdated" }, { status: 403 });
  }

  // ✅ Valid user
  // Instead of setcookie (like PHP), issue a JWT or session
  return NextResponse.json({ user: authData });
}
