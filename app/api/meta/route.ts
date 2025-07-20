import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const token = process.env.META_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'Brak tokenu Meta' }, { status: 500 });
  }

  const payload = await req.json();

  const response = await fetch(
    'https://graph.facebook.com/v18.0/1109474984377538/events',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [payload],
        access_token: token,
      }),
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
