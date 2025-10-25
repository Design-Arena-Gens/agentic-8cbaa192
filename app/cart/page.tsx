"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/store/cart';

export default function CartPage() {
  const { items, removeItem } = useCart();
  const subtotal = items.reduce((sum, i)=> sum + i.unitPriceCents * i.quantity, 0);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
      {items.length === 0 ? (
        <div className="mt-6">
          <p>Your cart is empty.</p>
          <Link href="/catalog" className="btn btn-primary mt-4">Browse cakes</Link>
        </div>
      ) : (
        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <ul className="lg:col-span-2 space-y-4">
            {items.map((i, idx)=> (
              <li key={idx} className="card p-4 flex gap-4">
                <div className="relative w-28 h-28 rounded overflow-hidden">
                  <Image src={i.image} alt={i.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-gray-900">{i.name}</div>
                      <div className="text-sm text-gray-600">Size {i.size} · {i.frosting.replace('-', ' ')}</div>
                      {i.message && <div className="text-sm text-gray-600">Message: “{i.message}”</div>}
                      <div className="text-sm text-gray-600">Qty: {i.quantity}</div>
                    </div>
                    <div className="text-rose-600 font-bold">${((i.unitPriceCents*i.quantity)/100).toFixed(2)}</div>
                  </div>
                  <button className="mt-2 text-sm text-rose-600 underline" onClick={()=>removeItem(i.slug, i.size, i.frosting)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="card p-6 h-fit">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold">${(subtotal/100).toFixed(2)}</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">Taxes and shipping calculated at checkout.</div>
            <Link href="/checkout" className="btn btn-primary w-full mt-4 text-center">Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
