"use client";
import { useEffect, useState } from 'react';
import { useCart } from '@/store/cart';
import { z } from 'zod';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { loadAddresses, saveAddress } from '@/lib/storage';

const addressSchema = z.object({
  fullName: z.string().min(2),
  line1: z.string().min(3),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().regex(/^[0-9A-Za-z -]{4,10}$/),
  country: z.string().min(2),
});

type AddressForm = z.infer<typeof addressSchema>;

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const subtotal = items.reduce((sum, i)=> sum + i.unitPriceCents * i.quantity, 0);
  const [address, setAddress] = useState<AddressForm>({ fullName:'', line1:'', line2:'', city:'', state:'', postalCode:'', country:'' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState<AddressForm[]>([]);
  const user = getCurrentUser();

  useEffect(()=>{
    setSaved(loadAddresses(user?.email));
  },[user?.email]);

  const handlePay = async () => {
    setError(null);
    const parsed = addressSchema.safeParse(address);
    if (!parsed.success) {
      setError('Please check your address details.');
      return;
    }
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      if (!res.ok) throw new Error('Checkout failed');
      const data = await res.json();
      // Persist order locally
      const order = {
        id: data.orderId,
        items,
        totalCents: data.totalCents,
        createdAt: new Date().toISOString(),
        shippingAddress: address,
        status: 'processing',
        userEmail: user?.email || null
      };
      const existing = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([order, ...existing]));
      if (user?.email) saveAddress(user.email, address);
      setSuccess('Payment successful! Order confirmed.');
      clear();
    } catch (e) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10 grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 card p-6">
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        {user ? (
          <div className="mt-1 text-sm text-gray-600">Ordering as <span className="font-medium">{user.email}</span></div>
        ) : (
          <div className="mt-1 text-sm text-gray-600">You can checkout as guest or <Link className="underline text-rose-600" href="/account">sign in</Link>.</div>
        )}
        <div className="grid sm:grid-cols-2 gap-4 mt-4" aria-label="Shipping address form">
          {(['fullName','line1','line2','city','state','postalCode','country'] as (keyof AddressForm)[]).map((k)=> (
            <div key={k} className={k==='line2' ? 'sm:col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-700">{k.replace(/([A-Z])/g,' $1')}</label>
              <input
                className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3"
                value={address[k] as string}
                onChange={(e)=> setAddress(a=> ({...a, [k]: e.target.value}))}
              />
            </div>
          ))}
        </div>
        {saved.length > 0 && (
          <div className="mt-3">
            <button
              className="text-sm underline text-rose-600"
              onClick={()=> setAddress(saved[0])}
            >Use saved address</button>
          </div>
        )}
        {error && <div role="alert" className="mt-4 text-sm text-red-600">{error}</div>}
        {success && <div role="status" className="mt-4 text-sm text-green-700">{success}</div>}
        <button className="btn btn-primary mt-6" onClick={handlePay} disabled={loading}>
          {loading ? 'Processing…' : 'Pay now'}
        </button>
        <Link href="/cart" className="ml-4 text-sm underline text-rose-600">Back to cart</Link>
      </div>
      <div className="card p-6 h-fit">
        <div className="font-semibold text-gray-900">Order summary</div>
        <ul className="mt-3 space-y-2 text-sm">
          {items.map((i, idx)=> (
            <li key={idx} className="flex justify-between">
              <span>{i.name} × {i.quantity}</span>
              <span>${((i.unitPriceCents*i.quantity)/100).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t pt-3">
          <span className="text-gray-700">Subtotal</span>
          <span className="font-semibold">${(subtotal/100).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
