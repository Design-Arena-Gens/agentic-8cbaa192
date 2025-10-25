"use client";
import Image from 'next/image';
import { useCart } from '@/store/cart';
import { useMemo, useState } from 'react';
import type { Cake } from '@/lib/types';

export function CakeDetailClient({ cake }: { cake: Cake }) {
  const [size, setSize] = useState(cake.options.sizes[0].value);
  const [frosting, setFrosting] = useState(cake.options.frostings[0].value);
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const add = useCart(s=>s.addItem);

  const priceCents = useMemo(()=>{
    const sizeDelta = cake.options.sizes.find(s=>s.value===size)?.priceDeltaCents ?? 0;
    const frostingDelta = cake.options.frostings.find(f=>f.value===frosting)?.priceDeltaCents ?? 0;
    return cake.priceCents + sizeDelta + frostingDelta;
  }, [cake, size, frosting]);

  return (
    <div className="container py-10 grid lg:grid-cols-2 gap-8">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <Image src={cake.images[0]} alt={cake.name} fill className="object-cover" />
        </div>
        {cake.images[1] && (
          <div className="relative aspect-video overflow-hidden rounded-xl mt-4">
            <Image src={cake.images[1]} alt={`${cake.name} alternate view`} fill className="object-cover" />
          </div>
        )}
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{cake.name}</h1>
        <p className="mt-2 text-gray-600">{cake.description}</p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Size</label>
            <select className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3" value={size} onChange={e=>setSize(e.target.value as any)}>
              {cake.options.sizes.map(s=> (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Frosting</label>
            <select className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3" value={frosting} onChange={e=>setFrosting(e.target.value as any)}>
              {cake.options.frostings.map(f=> (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Custom message (optional)</label>
            <input
              type="text"
              placeholder="Happy Birthday, Maya!"
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3"
              maxLength={40}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input type="number" min={1} value={quantity} onChange={(e)=>setQuantity(Math.max(1, parseInt(e.target.value)||1))} className="mt-1 w-28 rounded-md border border-gray-300 bg-white py-2 px-3" />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-2xl font-extrabold text-rose-600">${(priceCents/100).toFixed(2)}</div>
          <button
            className="btn btn-primary"
            onClick={()=> add({
              cakeId: cake.id,
              name: cake.name,
              slug: cake.slug,
              unitPriceCents: priceCents,
              quantity,
              size,
              frosting,
              message: message || undefined,
              image: cake.images[0]
            })}
            aria-label="Add to cart"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
