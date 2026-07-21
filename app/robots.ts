import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Khu quan tri khong bao gio duoc index.
      disallow: ["/admin", "/admin/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
