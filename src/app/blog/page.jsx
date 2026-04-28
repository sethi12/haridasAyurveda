import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata = {
  title: "Ayurveda Blog | Haridas Ayurveda",
  description:
    "Explore Ayurvedic wisdom, herbal remedies, and natural healing insights from Haridas Ayurveda.",
};

async function getBlogs() {
  try {
    const res = await fetch(`${BASE_URL}/api/blog`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden pb-20">
        <div className="fixed top-2 left-8 z-50">
    <Link
      href="/"
      className="group flex items-center gap-3 bg-white/40 backdrop-blur-md border border-white/40 px-5 py-2.5 rounded-2xl text-[#113B14] transition-all hover:bg-white/60 hover:shadow-lg hover:shadow-[#1B5E20]/5 active:scale-95"
    >
      <span className="text-lg transition-transform group-hover:-translate-x-1">
        ←
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
        Home
      </span>
    </Link>
  </div>

      {/* --- BACKGROUND ELEMENTS (The "Glass" needs light to play with) --- */}
      <div className="fixed top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#1B5E20]/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-amber-200/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <header className="py-20 text-center space-y-4">
          <motion_div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1B5E20] bg-[#1B5E20]/5 px-4 py-2 rounded-full border border-[#1B5E20]/10">
              The Sacred Journal
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mt-6 text-[#113B14]">
              Ayurvedic Wisdom
            </h1>
            <p className="max-w-xl mx-auto text-[#6B7D5E] text-sm md:text-base mt-4 leading-relaxed italic">
              "Healing is a matter of time, but it is sometimes also a matter of opportunity."
            </p>
          </motion_div>
        </header>

        {/* GRID SECTION */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`} className="group">
              <div className="relative h-full bg-white/40 backdrop-blur-md border border-white/60 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:bg-white/70 hover:shadow-[0_20px_50px_rgba(27,94,32,0.1)] hover:-translate-y-2">
                
                {/* IMAGE CONTAINER */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={blog.image || "/placeholder.jpg"}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Floating Category Tag */}
                  <div className="absolute top-5 left-5">
                    <span className="bg-[#1B5E20]/80 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* CONTENT AREA */}
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#A8B8AA] uppercase tracking-widest">
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="w-1 h-1 rounded-full bg-[#1B5E20]/30" />
                    <span>{blog.readingTime || '5'} min read</span>
                  </div>

                  <h2 className="font-serif font-bold text-2xl text-[#113B14] leading-snug group-hover:text-[#1B5E20] transition-colors">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-[#6B7D5E] line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <div className="pt-4 flex items-center text-[#1B5E20] font-bold text-[11px] uppercase tracking-widest group-hover:gap-3 transition-all">
                    Read Wisdom
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* EMPTY STATE */}
        {blogs.length === 0 && (
          <div className="text-center py-20 bg-white/20 backdrop-blur-sm rounded-[3rem] border border-dashed border-[#1B5E20]/20">
            <p className="text-[#6B7D5E] font-serif italic text-lg">The journal is currently quiet. Check back soon for new insights.</p>
          </div>
        )}
      </div>
    </div>
  );
}