const BASE_URL =
  process.env.API_BASE_URL || "https://your-backend.onrender.com";

const SITE_URL = "https://www.haridasayurveda.com";

// 🔥 Safe date handler
const getSafeDate = (date) => {
  try {
    if (!date) return new Date();

    if (date?._seconds) {
      return new Date(date._seconds * 1000);
    }

    const parsed = new Date(date);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  } catch {
    return new Date();
  }
};

export default async function sitemap() {
  try {
    const res = await fetch(`${BASE_URL}/api/blog`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch blogs");

    const data = await res.json();
    const blogs = data.data || [];

    return [
      {
        url: `${SITE_URL}/`,
        lastModified: new Date(),
      },
      {
        url: `${SITE_URL}/blog`,
        lastModified: new Date(),
      },
      ...blogs.map((blog) => ({
        url: `${SITE_URL}/blog/${blog.slug}`,
        lastModified: getSafeDate(blog.updatedAt || blog.createdAt),
      })),
    ];
  } catch (error) {
    console.error("Sitemap error:", error);

    return [
      {
        url: `${SITE_URL}`,
        lastModified: new Date(),
      },
    ];
  }
}