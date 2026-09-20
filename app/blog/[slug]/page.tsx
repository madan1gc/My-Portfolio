import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { blogPosts, getBlogPostBySlug, type BlogPost } from '@/data/blogPosts';
import { profile } from '@/data/profile';

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return {};
  }
  return {
    title: `${post.title} — Madan G.C`,
    description: post.dek,
  };
}

function BlogPostingJsonLd({ post }: { post: BlogPost }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.dek,
    author: {
      '@type': 'Person',
      name: profile.name,
    },
  };

  return (
    // eslint-disable-next-line react/no-danger
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <BlogPostingJsonLd post={post} />
      <h1 className="mb-4 text-4xl font-semibold text-foreground sm:text-5xl">{post.title}</h1>
      <p className="mb-8 max-w-prose text-lg text-muted">{post.dek}</p>
      <div className="space-y-4">
        {post.body.map((paragraph, index) => (
          <p key={`${post.slug}-${index}`} className="text-muted">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-12">
        <Button href="/blog" variant="ghost">
          ← Back to blog
        </Button>
      </div>
    </article>
  );
}
