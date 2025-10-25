import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="container grid md:grid-cols-2 gap-8 items-center py-12 md:py-20">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Celebrate with Cakes that Spark Joy
          </h1>
          <p className="mt-4 text-gray-600">
            From birthdays to weddings, our hand-crafted cakes make every moment sweeter.
          </p>
          <div className="mt-6 flex gap-3">
            <Link className="btn btn-primary" href="/catalog">Browse catalog</Link>
            <Link className="btn btn-secondary" href="#testimonials">See testimonials</Link>
          </div>
        </div>
        <div className="relative aspect-video md:aspect-square w-full overflow-hidden rounded-2xl shadow-soft">
          <Image
            src="https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=1600&auto=format&fit=crop"
            alt="Assortment of pastel cakes"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Features */}
      <section className="container py-10 grid sm:grid-cols-3 gap-6">
        {[
          { title: 'Fresh & Local', desc: 'Baked daily with premium ingredients.' },
          { title: 'Customizable', desc: 'Choose size, frosting, flavors, and more.' },
          { title: 'Fast Delivery', desc: 'Same-day options within the city.' },
        ].map((f) => (
          <div key={f.title} className="card p-6" role="article" aria-label={f.title}>
            <div className="text-lg font-semibold text-gray-800">{f.title}</div>
            <p className="text-gray-600 mt-1">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container py-16">
        <h2 className="text-2xl font-bold text-gray-900">What our customers say</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            {
              quote: 'The red velvet cake was the star of our party! Beautiful and delicious.',
              name: 'Sophia',
            },
            {
              quote: 'Super smooth ordering and the customized message looked perfect.',
              name: 'Liam',
            },
            {
              quote: 'Moist, flavorful, and stunning designs. Highly recommend!',
              name: 'Ava',
            },
          ].map((t) => (
            <figure key={t.name} className="card p-6" aria-label={`Testimonial by ${t.name}`}>
              <blockquote className="text-gray-700">“{t.quote}”</blockquote>
              <figcaption className="mt-3 text-sm text-gray-500">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
