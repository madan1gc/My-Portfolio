import Link from 'next/link';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { Section } from '@/components/ui/Section';
import { blogPosts } from '@/data/blogPosts';

export function BlogPreview() {
  const latest = blogPosts.slice(0, 3);

  return (
    <Section eyebrow="From the Blog" title="Notes on WordPress and frontend development.">
      <div className="grid gap-6 sm:grid-cols-3">
        {latest.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/blog"
          className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all posts <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
