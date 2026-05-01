import { useState, useEffect } from 'react';
import { supabase, Product } from '../../lib/supabase';
import { X, Plus, CreditCard as Edit2, Trash2 } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    image_url: '',
    price: '',
    category: '',
    features: '',
    demo_url: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('display_order');
    if (data) setProducts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        features: form.features
          .split('\n')
          .map((f) => f.trim())
          .filter((f) => f),
      };

      if (editing) {
        await supabase.from('products').update(payload).eq('id', editing.id);
      } else {
        await supabase.from('products').insert([payload]);
      }
      await fetchProducts();
      setShowForm(false);
      setEditing(null);
      setForm({
        name: '',
        description: '',
        image_url: '',
        price: '',
        category: '',
        features: '',
        demo_url: '',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product?')) {
      await supabase.from('products').delete().eq('id', id);
      await fetchProducts();
    }
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name,
      description: product.description,
      image_url: product.image_url,
      price: product.price,
      category: product.category,
      features: product.features?.join('\n') || '',
      demo_url: product.demo_url,
    });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black">Products</h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({
              name: '',
              description: '',
              image_url: '',
              price: '',
              category: '',
              features: '',
              demo_url: '',
            });
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-gray-900 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">{editing ? 'Edit Product' : 'Add Product'}</h3>
            <button onClick={() => setShowForm(false)} className="p-1 hover:bg-white/10 rounded">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
              <input
                type="text"
                placeholder="Price (e.g., From $99/mo)"
                value={form.price}
                onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
              <input
                type="url"
                placeholder="Demo/CTA URL"
                value={form.demo_url}
                onChange={(e) => setForm((p) => ({ ...p, demo_url: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
            </div>

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 resize-none"
            />

            <textarea
              placeholder="Features (one per line)"
              value={form.features}
              onChange={(e) => setForm((p) => ({ ...p, features: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 resize-none"
            />

            <input
              type="url"
              placeholder="Image URL (Pexels recommended)"
              value={form.image_url}
              onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
            />

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 bg-gray-900 border border-white/10 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}
              <div>
                <p className="font-bold">{product.name}</p>
                <p className="text-sm text-gray-400">{product.category}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="p-2 hover:bg-white/10 rounded transition-colors"
              >
                <Edit2 size={18} className="text-cyan-400" />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="p-2 hover:bg-white/10 rounded transition-colors"
              >
                <Trash2 size={18} className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
