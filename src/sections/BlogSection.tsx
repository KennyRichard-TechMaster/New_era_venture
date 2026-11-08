import { useEffect, useRef, useState } from "react";
import { supabase, BlogPost } from "../lib/supabase";
import { Calendar, User, Clock } from "lucide-react";

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function readTime(content: string) {
  const words = content.split(" ").length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const titleRef = useScrollReveal();
  const gridRef = useScrollReveal();

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        if (data) setPosts(data);
      });
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <section id="blog" className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-reveal text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Insights & Stories
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Blog
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Thoughts on technology, design, education, and building things that
            matter — from the minds behind New Era Ventures.
          </p>
        </div>

        <div
          ref={gridRef}
          className="scroll-reveal grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {posts.map((post, i) => (
            <article
              key={post.id}
              className="group bg-gray-800/50 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => setSelected(post)}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <User size={11} />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Clock size={11} />
                      {readTime(post.content)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={11} />
                      {post.published_at ? formatDate(post.published_at) : ""}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Post modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-gray-900 border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
              <img
                src={selected.image_url}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-900/80 text-white rounded-full flex items-center justify-center hover:bg-gray-800 text-xl"
              >
                ×
              </button>
              <span className="absolute bottom-4 left-6 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full">
                {selected.category}
              </span>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-black text-white mb-3">
                {selected.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <User size={13} /> {selected.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {selected.published_at
                    ? formatDate(selected.published_at)
                    : ""}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} /> {readTime(selected.content)}
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {selected.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
