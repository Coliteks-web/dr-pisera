import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { eventName } = await req.json();

    if (!eventName) {
      return NextResponse.json({ error: 'Missing eventName' }, { status: 400 });
    }

    const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    const token = process.env.FB_TOKEN;

    if (!pixelId || !token) {
      return NextResponse.json({ error: 'Missing Pixel ID or Access Token' }, { status: 500 });
    }

    const payload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: req.headers.get('referer') || '',
      user_data: {}, // Możesz dodać np. hashed email/phone dla większej skuteczności
    };

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [payload] }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error || 'Unknown error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, fb: data }, { status: 200 });
  } catch (error) {
    console.error('Meta API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
