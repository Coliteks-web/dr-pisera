import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const token = process.env.META_ACCESS_TOKEN;
    const pixelId = process.env.META_PIXEL_ID;

    if (!token) {
      return NextResponse.json(
        { error: "Brak META_ACCESS_TOKEN" },
        { status: 500 }
      );
    }

    if (!pixelId) {
      return NextResponse.json(
        { error: "Brak META_PIXEL_ID" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const headersList = await headers();

    const userAgent =
      headersList.get("user-agent") || "";

    const forwardedFor =
      headersList.get("x-forwarded-for") || "";

    const ip = forwardedFor.split(",")[0];

    const payload = {
      event_name: body.event_name || "PageView",

      event_time: Math.floor(Date.now() / 1000),

      action_source: "website",

      event_source_url: body.url,

      user_data: {
        client_ip_address: ip,
        client_user_agent: userAgent,

        fbp: body.fbp || undefined,
        fbc: body.fbc || undefined,
      },
    };

    const response = await fetch(
      `https://graph.facebook.com/v23.0/${pixelId}/events`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          data: [payload],
          access_token: token,
        }),
      }
    );

    const data = await response.json();

    console.log("META RESPONSE:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Meta API error" },
      { status: 500 }
    );
  }
}