import { useEffect, useRef, useState } from 'react';
import { supabase, Product } from '../lib/supabase';
import { Check, ArrowRight } from 'lucide-react';

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const titleRef = useScrollReveal();
  const gridRef = useScrollReveal();

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .order('display_order')
      .then(({ data }) => { if (data) setProducts(data); });
  }, []);

  return (
    <section id="products" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-reveal text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            What We've Built
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Products
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Beyond client work, we build our own products — tools and platforms designed to
            solve real problems for real people.
          </p>
        </div>

        <div ref={gridRef} className="scroll-reveal grid sm:grid-cols-2 gap-8">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="group relative bg-gray-800/50 border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent" />
                {product.category && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full backdrop-blur-sm">
                    {product.category}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  {product.price && (
                    <span className="text-cyan-400 font-bold text-sm whitespace-nowrap ml-4">
                      {product.price}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {product.description}
                </p>

                {product.features && product.features.length > 0 && (
                  <ul className="space-y-1.5 mb-5">
                    {product.features.slice(0, 4).map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check size={14} className="text-cyan-400 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5"
                >
                  Get Access <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
