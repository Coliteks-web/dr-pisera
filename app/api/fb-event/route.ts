import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const FB_TOKEN = process.env.FB_TOKEN;
  const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  if (!FB_TOKEN || !PIXEL_ID) {
    console.error('❌ Missing credentials', { FB_TOKEN, PIXEL_ID });
    return new Response('Missing credentials', { status: 400 });
  }

  let body;
  try {
    body = await req.json();
  } catch (err) {
    console.error('❌ Invalid JSON in request body', err);
    return new Response('Invalid JSON', { status: 400 });
  }

  const eventName = body?.eventName || 'PageView';

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: req.headers.get('referer') || '',
        user_data: {
          client_user_agent: req.headers.get('user-agent') || '',
        },
      },
    ],
  };

  console.log('➡️ Sending payload to Meta:', JSON.stringify(payload, null, 2));

  const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${FB_TOKEN}`;

  const fbRes = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const fbData = await fbRes.json();

  if (!fbRes.ok) {
    console.error('❌ Meta API returned error:', fbData);
    return new Response(JSON.stringify(fbData), { status: 500 });
  }

  console.log('✅ Meta API success:', fbData);
  return new Response(JSON.stringify(fbData), { status: 200 });
}
