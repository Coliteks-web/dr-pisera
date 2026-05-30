import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const pixelId = process.env.META_PIXEL_ID!;
  const token = process.env.META_ACCESS_TOKEN!;

  await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: [
        {
          event_name: body.event,
          event_time: Math.floor(Date.now() / 1000),
          event_id: body.eventId,
          action_source: 'website',
          event_source_url: body.url,
          custom_data: body.data || {},
        },
      ],
      access_token: token,
    }),
  });

  return NextResponse.json({ ok: true });
}