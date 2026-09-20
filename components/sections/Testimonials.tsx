import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { Section } from '@/components/ui/Section';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  return (
    <Section eyebrow="Testimonials" title="What clients, teammates, and the community say.">
      <div className="grid gap-6 sm:grid-cols-3">
        {testimonials.map((testimonial, index) => (
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
