const BASE_URL =
  process.env.API_BASE_URL || "https://haridasayurvedaserver.onrender.com";

const SITE_URL = "https://www.haridasayurveda.com";

export default async function sitemap() {
  try {
    const res = await fetch(`${BASE_URL}/api/blog`, {
      cache: "no-store",
    });

    const data = await res.json();

    const blogs = Array.isArray(data)
      ? data
      : data.data || [];

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
        lastModified: new Date(),
      })),
    ];
  } catch (err) {
    console.error("Sitemap error:", err);

    return [
      {
        url: `${SITE_URL}`,
        lastModified: new Date(),
      },
    ];
  }
}