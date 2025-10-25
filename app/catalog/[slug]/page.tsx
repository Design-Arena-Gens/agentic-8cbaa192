import { cakes } from '@/lib/data';
import { notFound } from 'next/navigation';
import { CakeDetailClient } from '@/components/product/CakeDetailClient';

export default function CakeDetailPage({ params }: { params: { slug: string } }) {
  const cake = cakes.find(c=>c.slug===params.slug);
  if (!cake) notFound();
  return <CakeDetailClient cake={cake} />;
}
