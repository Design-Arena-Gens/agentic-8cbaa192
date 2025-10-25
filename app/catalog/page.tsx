"use client";
import Image from 'next/image';
import Link from 'next/link';
import { cakes } from '@/lib/data';
import { useMemo, useState } from 'react';

export default function CatalogPage() {
  const [flavor, setFlavor] = useState<string>('all');
  const [occasion, setOccasion] = useState<string>('all');
  const [sort, setSort] = useState<string>('popular');
  const [priceMax, setPriceMax] = useState<number>(20000);

  const filtered = useMemo(() => {
    let list = [...cakes];
    if (flavor !== 'all') list = list.filter(c => c.flavor === flavor);
    if (occasion !== 'all') list = list.filter(c => c.occasion === occasion);
    list = list.filter(c => c.priceCents <= priceMax);
    if (sort === 'price-asc') list.sort((a,b)=>a.priceCents-b.priceCents);
    if (sort === 'price-desc') list.sort((a,b)=>b.priceCents-a.priceCents);
    return list;
  }, [flavor, occasion, sort, priceMax]);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-gray-900">Cake Catalog</h1>
      <form className="mt-6 grid md:grid-cols-4 gap-4" aria-label="Catalog filters">
        <div>
          <label className="block text-sm font-medium text-gray-700">Flavor</label>
          <select className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3" value={flavor} onChange={e=>setFlavor(e.target.value)}>
            <option value="all">All</option>
            <option value="vanilla">Vanilla</option>
            <option value="chocolate">Chocolate</option>
            <option value="red-velvet">Red Velvet</option>
            <option value="strawberry">Strawberry</option>
            <option value="lemon">Lemon</option>
            <option value="carrot">Carrot</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Occasion</label>
          <select className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3" value={occasion} onChange={e=>setOccasion(e.target.value)}>
            <option value="all">All</option>
            <option value="birthday">Birthday</option>
            <option value="wedding">Wedding</option>
            <option value="baby-shower">Baby Shower</option>
            <option value="anniversary">Anniversary</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sort by</label>
          <select className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3" value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="popular">Most popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max price (${(priceMax/100).toFixed(0)})</label>
          <input aria-label="Max price" type="range" min={1000} max={20000} step={500} value={priceMax} onChange={e=>setPriceMax(Number(e.target.value))} className="w-full" />
        </div>
      </form>

      <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Products">
        {filtered.map((cake)=> (
          <li key={cake.id} className="card overflow-hidden">
            <Link href={`/catalog/${cake.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400">
              <div className="relative aspect-square">
                <Image src={cake.images[0]} alt={cake.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{cake.name}</h3>
                  <span className="text-rose-600 font-bold">${(cake.priceCents/100).toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 capitalize">{cake.flavor.replace('-', ' ')} · {cake.occasion.replace('-', ' ')}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
