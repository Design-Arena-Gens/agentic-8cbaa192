"use client";
import { useEffect, useState } from 'react';
import { getCurrentUser, signIn, signOut } from '@/lib/auth';
import { loadAddresses } from '@/lib/storage';

function getOrders() {
  if (typeof window === 'undefined') return [] as any[];
  return JSON.parse(localStorage.getItem('orders') || '[]');
}

export default function AccountPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const user = getCurrentUser();
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(()=>{ setOrders(getOrders()); },[]);
  useEffect(()=>{ setAddresses(loadAddresses(user?.email)); },[user?.email]);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-gray-900">Your Account</h1>
      {user ? (
        <div className="mt-3 flex items-center justify-between">
          <div className="text-gray-700">Signed in as <span className="font-medium">{user.email}</span></div>
          <button className="btn btn-secondary" onClick={()=>{ signOut(); location.reload(); }}>Sign out</button>
        </div>
      ) : (
        <div className="mt-4 card p-4">
          <div className="font-medium text-gray-900">Sign in</div>
          <div className="mt-2 flex gap-2">
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 rounded-md border border-gray-300 bg-white py-2 px-3" />
            <button className="btn btn-primary" onClick={()=>{ if(email) { signIn(email); location.reload(); } }}>Sign in</button>
          </div>
          <div className="text-xs text-gray-500 mt-2">No password required in demo. Email identifies your session.</div>
        </div>
      )}

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900">Order history</h2>
        {orders.length === 0 ? (
          <p className="mt-2 text-gray-600">No orders yet.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {orders
              .filter(o => !user?.email || !o.userEmail || o.userEmail === user.email)
              .map((o) => (
              <li key={o.id} className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Order {o.id}</div>
                    <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="font-semibold">${(o.totalCents/100).toFixed(2)}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900">Saved addresses</h2>
        {user ? (
          addresses.length === 0 ? (
            <p className="mt-2 text-gray-600">No saved addresses.</p>
          ) : (
            <ul className="mt-3 space-y-3 text-sm">
              {addresses.map((a, idx)=> (
                <li key={idx} className="card p-4">
                  <div className="font-medium">{a.fullName}</div>
                  <div>{a.line1}{a.line2 ? `, ${a.line2}` : ''}</div>
                  <div>{a.city}, {a.state} {a.postalCode}</div>
                  <div>{a.country}</div>
                </li>
              ))}
            </ul>
          )
        ) : (
          <p className="mt-2 text-gray-600">Sign in to view saved addresses.</p>
        )}
      </section>
    </div>
  );
}
