import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { Testimonials } from '@/components/sections/Testimonials';
import { Trust } from '@/components/sections/Trust';
import { profile } from '@/data/profile';

function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: 'https://madangc.example',
    sameAs: [profile.github, profile.linkedin, profile.wordpressOrg],
  };

  return (
    // eslint-disable-next-line react/no-danger
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <Trust />
      {/* Phase 2 will insert a "Featured Projects" section here. */}
      <Skills />
      <Experience />
      {/* Phase 3 will insert an Open Source/Community highlight strip here. */}
      <Testimonials />
      {/* Phase 4 will insert a "Latest from the blog" preview here. */}
      <Contact />
    </>
  );
}
