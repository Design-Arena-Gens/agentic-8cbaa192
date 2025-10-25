"use client";
import * as React from 'react';

type Option = { label: string; value: string };

export function Select({ label, options, value, onChange, name }: {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  name?: string;
}) {
  const id = React.useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        id={id}
        name={name}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-rose-400 focus:outline-none focus:ring-rose-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
