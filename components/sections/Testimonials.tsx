import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { Section } from '@/components/ui/Section';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <Section eyebrow="Testimonials" title="What clients, teammates, and the community say.">
      {lead && (
        <FadeIn>
          <figure className="mb-10 border-l-2 border-accent pl-6">
            <blockquote className="font-serif text-2xl italic text-foreground sm:text-3xl">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted">
              <span className="font-semibold text-foreground">{lead.name}</span> — <span>{lead.role}</span>
            </figcaption>
          </figure>
        </FadeIn>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        {rest.map((testimonial, index) => (
          <FadeIn key={`${testimonial.name}-${testimonial.role}`} delay={index * 0.1}>
            <Card>
              <p className="mb-4 text-sm text-muted">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
              <p className="text-xs text-muted">{testimonial.role}</p>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
