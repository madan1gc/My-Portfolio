import type { Metadata } from 'next';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { Section } from '@/components/ui/Section';
import { blogPosts } from '@/data/blogPosts';

export const metadata: Metadata = {
  title: 'Blog — Madan G.C',
  description: 'Notes on WordPress, frontend development, and the community.',
};

export default function BlogPage() {
  return (
    <Section
      as="h1"
      eyebrow="Blog"
      title="Notes on WordPress, frontend development, and the community."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
