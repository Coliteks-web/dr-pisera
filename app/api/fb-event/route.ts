import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const FB_TOKEN = process.env.META_ACCESS_TOKEN;
  const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  if (!FB_TOKEN || !PIXEL_ID) {
    return new Response('Missing credentials', { status: 400 });
  }

  const body = await req.json();
  const { eventName = 'PageView' } = body;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: req.headers.get('referer') || '',
        user_data: {},
      },
    ],
  };

  const fbRes = await fetch(
    `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${FB_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );

  const fbData = await fbRes.json();

  if (!fbRes.ok) {
    return new Response(JSON.stringify(fbData), { status: 500 });
  }

  return new Response(JSON.stringify(fbData), { status: 200 });
}
