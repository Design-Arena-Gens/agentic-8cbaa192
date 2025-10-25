"use client";
import { useEffect, useMemo, useState } from 'react';
import { cakes as seedCakes } from '@/lib/data';

export default function AdminPage() {
  const [cakes, setCakes] = useState(seedCakes);
  const [query, setQuery] = useState('');

  useEffect(()=>{
    // Placeholder for future data loading via API
  },[]);

  const filtered = useMemo(()=> cakes.filter(c => c.name.toLowerCase().includes(query.toLowerCase())), [cakes, query]);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="font-semibold">Inventory</div>
          <div className="text-2xl mt-2">{cakes.length}</div>
        </div>
        <div className="card p-4">
          <div className="font-semibold">Orders</div>
          <div className="text-2xl mt-2">0</div>
        </div>
        <div className="card p-4">
          <div className="font-semibold">Customers</div>
          <div className="text-2xl mt-2">0</div>
        </div>
      </div>

      <div className="mt-8 card p-6">
        <div className="flex items-center justify-between gap-4">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search cakes" className="w-full rounded-md border border-gray-300 bg-white py-2 px-3" />
          <button className="btn btn-primary">Add cake</button>
        </div>
        <table className="mt-4 w-full text-left text-sm">
          <thead>
            <tr className="text-gray-600">
              <th className="py-2">Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Flavor</th>
              <th className="py-2">Stock</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-t">
                <td className="py-2">{c.name}</td>
                <td className="py-2">${(c.priceCents/100).toFixed(2)}</td>
                <td className="py-2 capitalize">{c.flavor.replace('-', ' ')}</td>
                <td className="py-2">{c.inStock ? 'In stock' : 'Out'}</td>
                <td className="py-2 text-right">
                  <button className="text-rose-600 underline mr-3">Edit</button>
                  <button className="text-gray-600 underline">Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
