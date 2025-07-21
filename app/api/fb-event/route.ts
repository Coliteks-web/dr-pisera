// app/api/fb-event/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { eventName, eventId, email, phone } = await req.json();

  const FB_TOKEN = process.env.FB_TOKEN;
  const PIXEL_ID = process.env.FB_PIXEL_ID;

  if (!FB_TOKEN || !PIXEL_ID) {
    return NextResponse.json({ error: "Missing FB_TOKEN or FB_PIXEL_ID" }, { status: 500 });
  }

  const ip = req.headers.get("x-forwarded-for") || "0.0.0.0";
  const userAgent = req.headers.get("user-agent") || "";

  const cookies = req.cookies;
  const fbc = cookies.get('_fbc')?.value;
  const fbp = cookies.get('_fbp')?.value;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId || undefined,
        action_source: "website",
        user_data: {
          em: email ? [hash(email)] : undefined,
          ph: phone ? [hash(phone)] : undefined,
          ip_address: ip,
          client_user_agent: userAgent,
          fbp,
          fbc,
        },
      },
    ],
  };

  const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${FB_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return NextResponse.json(data);
}

function hash(value: string) {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}
