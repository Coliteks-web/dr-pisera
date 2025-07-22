import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { eventName } = await req.json();
    if (!eventName) {
      return NextResponse.json({ error: 'Missing eventName' }, { status: 400 });
    }

    const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    const token = process.env.FB_TOKEN; // ✅ Zmienna środowiskowa z Vercel

    if (!pixelId || !token) {
      return NextResponse.json({ error: 'Missing pixelId or token' }, { status: 500 });
    }

    const payload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: req.headers.get('referer') || '',
      user_data: {}, // Możesz dodać hashed email, phone, itp.
    };

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [payload] }),
      }
    );

    const fbRes = await response.json();
    if (!response.ok) {
      return NextResponse.json(fbRes, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
