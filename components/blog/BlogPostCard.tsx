import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import type { BlogPost } from '@/data/blogPosts';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{post.title}</h3>
      <p className="mb-4 text-sm text-muted">{post.dek}</p>
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read post: ${post.title}`}
        className="rounded text-sm font-medium text-accent-text hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Read post <span aria-hidden="true">→</span>
      </Link>
    </Card>
  );
}
