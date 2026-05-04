import { useState, useEffect } from 'react';
import { supabase, BlogPost } from '../../lib/supabase';
import { X, Plus, CreditCard as Edit2, Trash2 } from 'lucide-react';

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    author: '',
    category: '',
    published: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
    if (data) setPosts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, '-');
      const payload = { ...form, slug, published_at: new Date().toISOString() };

      if (editing) {
        await supabase.from('blog_posts').update(payload).eq('id', editing.id);
      } else {
        await supabase.from('blog_posts').insert([payload]);
      }
      await fetchPosts();
      setShowForm(false);
      setEditing(null);
      setForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image_url: '',
        author: '',
        category: '',
        published: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this post?')) {
      await supabase.from('blog_posts').delete().eq('id', id);
      await fetchPosts();
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image_url: post.image_url,
      author: post.author,
      category: post.category,
      published: post.published,
    });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black">Blog Posts</h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({
              title: '',
              slug: '',
              excerpt: '',
              content: '',
              image_url: '',
              author: 'New Era Ventures',
              category: 'General',
              published: false,
            });
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          <Plus size={18} />
          New Post
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-gray-900 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">{editing ? 'Edit Post' : 'New Post'}</h3>
            <button onClick={() => setShowForm(false)} className="p-1 hover:bg-white/10 rounded">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
            />

            <div className="grid sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Slug (auto-generated if empty)"
                value={form.slug}
                onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
              <input
                type="text"
                placeholder="Author"
                value={form.author}
                onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
            </div>

            <textarea
              placeholder="Excerpt (short summary)"
              value={form.excerpt}
              onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 resize-none"
            />

            <textarea
              placeholder="Full content"
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              rows={8}
              className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 resize-none"
            />

            <input
              type="url"
              placeholder="Image URL (Pexels recommended)"
              value={form.image_url}
              onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
                className="w-4 h-4 rounded"
              />
              <span className="text-white">Publish this post</span>
            </label>

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
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-gray-900 border border-white/10 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold">{post.title}</h3>
                  {post.published ? (
                    <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">Published</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-gray-700 text-gray-400 rounded">Draft</span>
                  )}
                </div>
                <p className="text-sm text-gray-400">{post.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                >
                  <Edit2 size={18} className="text-cyan-400" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                >
                  <Trash2 size={18} className="text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
