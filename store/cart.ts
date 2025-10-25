"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/lib/types';

export type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, size: CartItem['size'], frosting: CartItem['frosting']) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existingIndex = get().items.findIndex(
          (i) => i.slug === item.slug && i.size === item.size && i.frosting === item.frosting && i.message === item.message
        );
        if (existingIndex >= 0) {
          const updated = [...get().items];
          updated[existingIndex] = { ...updated[existingIndex], quantity: updated[existingIndex].quantity + item.quantity };
          set({ items: updated });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      removeItem: (slug, size, frosting) => set({ items: get().items.filter(i => !(i.slug === slug && i.size === size && i.frosting === frosting)) }),
      clear: () => set({ items: [] })
    }),
    { name: 'cart-storage' }
  )
);
