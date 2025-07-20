// app/api/fb-event/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { eventName, eventId, email, phone, clientUserAgent } = await req.json();

  const FB_TOKEN = process.env.FB_TOKEN;
  const PIXEL_ID = process.env.FB_PIXEL_ID;

  if (!FB_TOKEN || !PIXEL_ID) {
    return NextResponse.json({ error: "Missing FB_TOKEN or FB_PIXEL_ID" }, { status: 500 });
  }

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
          client_user_agent: clientUserAgent,
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

// Prosty SHA256 hash – Facebook wymaga hashowania email/telefonu
import crypto from "crypto";
function hash(value: string) {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}
