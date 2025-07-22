import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventName = body.eventName;

    if (!eventName) {
      return NextResponse.json({ error: 'Missing eventName' }, { status: 400 });
    }

    const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    const accessToken = process.env.FB_TOKEN;

    if (!pixelId || !accessToken) {
      return NextResponse.json({ error: 'Missing Pixel ID or Access Token' }, { status: 500 });
    }

    const res = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
          },
        ],
        access_token: accessToken,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      console.error('Meta API Error:', json);
      return NextResponse.json({ error: json }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Unexpected Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
