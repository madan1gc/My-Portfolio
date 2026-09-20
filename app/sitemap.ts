import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://madangc.example';
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified },
    { url: `${baseUrl}/work`, lastModified },
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified,
    })),
    { url: `${baseUrl}/open-source`, lastModified },
    { url: `${baseUrl}/community`, lastModified },
    { url: `${baseUrl}/blog`, lastModified },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified,
    })),
  ];
}
