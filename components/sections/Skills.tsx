import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { Tag } from '@/components/ui/Tag';
import { skillCategories } from '@/data/skills';

export function Skills() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <FadeIn>
        <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-accent-from">Skills</h2>
        <p className="mb-12 max-w-prose text-2xl font-semibold text-foreground sm:text-3xl">
          Tools I use to ship WordPress products and frontend interfaces.
        </p>
      </FadeIn>
      <div className="grid gap-6 sm:grid-cols-3">
        {skillCategories.map((category, index) => (
          <FadeIn key={category.title} delay={index * 0.1}>
            <Card>
              <h3 className="mb-4 text-sm font-semibold text-foreground">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
