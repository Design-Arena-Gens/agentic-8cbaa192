import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Minimal validation
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: 'No items' }, { status: 400 });
    }
    const totalCents = body.items.reduce((s: number, i: any)=> s + (i.unitPriceCents*i.quantity), 0);

    // If STRIPE_SECRET_KEY is present, you could create an actual PaymentIntent here.
    // For now, simulate success.
    const orderId = `ord_${Math.random().toString(36).slice(2,10)}`;

    return NextResponse.json({ clientSecret: 'simulated', orderId, totalCents }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
