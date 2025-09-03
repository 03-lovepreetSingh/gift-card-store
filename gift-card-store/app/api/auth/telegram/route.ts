import { NextResponse } from "next/server";
import { AuthDataValidator } from "@telegram-auth/server";

export async function POST(req: Request) {
  const body = await req.json();

  const validator = new AuthDataValidator({
    botToken: process.env.BOT_TOKEN!,
  });

  try {
    const user = await validator.validate(body);
    // ✅ Save in DB, issue JWT or session cookie here
    console.log("Authenticated user:", user);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid Telegram auth" },
      { status: 401 }
    );
  }
}
