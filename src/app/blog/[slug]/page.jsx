import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

async function getBlog(slug) {
  const res = await fetch(`${BASE_URL}/api/blog/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Blog Not Found" };
  return { title: `${blog.title} | Haridas Ayurveda`, description: blog.excerpt };
}

export default async function BlogDetails({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return notFound();

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-20">
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: blog.title,
      description: blog.excerpt,
      image: blog.image,
      author: {
        "@type": "Organization",
        name: blog.author,
      },
      publisher: {
        "@type": "Organization",
        name: "Haridas Ayurveda",
      },
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt,
    }),

    
  }}
/>
      {/* --- FULL SCREEN HERO SECTION --- */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover scale-105" // Subtle zoom for depth
          />
        ) : (
          <div className="w-full h-full bg-[#1B5E20]/10 flex items-center justify-center text-8xl">🌿</div>
        )}
        
        {/* Deep Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-black/20 to-transparent" />
        
        {/* Floating Title Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 z-20">
          <div className="max-w-5xl mx-auto">
            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
              {blog.category}
            </span>
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-white drop-shadow-2xl leading-[1.1]">
              {blog.title}
            </h1>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION (The Overlapping Glass Sheet) --- */}
      <section className="relative z-30 -mt-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/60 backdrop-blur-3xl border border-white rounded-[3rem] shadow-2xl shadow-[#1B5E20]/5 overflow-hidden">
            
            {/* Meta Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-8 border-b border-[#1B5E20]/5 bg-white/40">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200">
                  <span className="text-xl">🕉️</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#1B5E20] uppercase tracking-tighter">Written By</p>
                  <p className="text-sm font-serif font-bold text-[#113B14]">{blog.author || "Haridas Ayurveda"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-[#A8B8AA] uppercase">Read Time</p>
                    <p className="text-xs font-bold text-[#113B14]">{blog.readingTime || "5"} Minutes</p>
                 </div>
                 {/* <div className="text-right">
                    <p className="text-[10px] font-bold text-[#A8B8AA] uppercase">Published</p>
                    <p className="text-xs font-bold text-[#113B14]">
                      {new Date(blog.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                 </div> */}
              </div>
            </div>

            {/* THE BODY */}
            <div className="p-8 md:p-20">
              {/* Aesthetic Intro/Excerpt */}
              <div className="relative mb-16">
                 <span className="absolute -top-10 -left-4 text-8xl text-amber-200/40 font-serif">“</span>
                 <p className="text-2xl md:text-3xl font-serif text-[#6B7D5E] leading-relaxed italic relative z-10">
                   {blog.excerpt}
                 </p>
              </div>

              {/* Tiptap Content with Advanced Prose styling */}
              <div
                className="prose prose-xl max-w-none  text-black
                prose-headings:font-serif prose-headings:text-[#113B14] 
                prose-p:text-[#2C3B2E] prose-p:leading-[1.8]
                prose-strong:text-[#1B5E20] prose-strong:font-bold
                prose-img:rounded-[2rem] prose-img:shadow-2xl
                prose-blockquote:border-l-4 prose-blockquote:border-[#1B5E20] prose-blockquote:bg-amber-50/30 prose-blockquote:rounded-r-2xl
                prose-li:marker:text-[#1B5E20]"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags Section */}
              {blog.tags && (
                <div className="mt-20 pt-10 border-t border-[#1B5E20]/5 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="bg-[#FDFBF7] border border-[#EDE4D4] text-[#6B7D5E] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-[#1B5E20] transition-colors cursor-default">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER NAVIGATION --- */}
      <nav className="max-w-5xl mx-auto px-6 mt-16 flex justify-between items-center">
        <a href="/blog" className="group flex items-center gap-4 text-[#1B5E20] font-bold text-xs uppercase tracking-[0.2em]">
          <div className="w-10 h-10 rounded-full border border-[#1B5E20]/20 flex items-center justify-center group-hover:bg-[#1B5E20] group-hover:text-white transition-all">
            ←
          </div>
          Return to Journal
        </a>
        
        <div className="flex gap-4">
           {/* Simple Social Share placeholders */}
           <button className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:scale-110 transition-transform">𝕏</button>
           <button className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:scale-110 transition-transform">f</button>
        </div>
      </nav>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-100 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-green-50 blur-[100px] rounded-full" />
      </div>
    </main>
  );
}
