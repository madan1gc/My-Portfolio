import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://madangc.example';
  return [{ url: baseUrl, lastModified: new Date() }];
}
