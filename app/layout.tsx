import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pastel Patisserie',
  description: 'Delightful cakes for every occasion',
  metadataBase: new URL('https://agentic-8cbaa192.vercel.app')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${openSans.className} min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-rose-100">
          <div className="container flex items-center justify-between h-16">
            <Link href="/" className="text-rose-500 font-bold text-xl" aria-label="Pastel Patisserie home">
              Pastel Patisserie
            </Link>
            <nav aria-label="Main navigation" className="flex items-center gap-6">
              <Link className="hover:underline" href="/catalog">Catalog</Link>
              <Link className="hover:underline" href="/account">Account</Link>
              <Link className="relative" href="/cart" aria-label="Shopping cart">
                <ShoppingCart aria-hidden className="w-6 h-6 text-rose-500" />
                <span className="sr-only">Cart</span>
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-rose-100 bg-white">
          <div className="container py-10 grid gap-6 md:grid-cols-3 text-sm text-gray-600">
            <div>
              <div className="font-semibold text-gray-800 mb-2">About</div>
              <p>Hand-crafted cakes with love. Made fresh daily.</p>
            </div>
            <div>
              <div className="font-semibold text-gray-800 mb-2">Contact</div>
              <p>hello@pastelpatisserie.example</p>
            </div>
            <div>
              <div className="font-semibold text-gray-800 mb-2">Follow</div>
              <p>Instagram · Pinterest</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
