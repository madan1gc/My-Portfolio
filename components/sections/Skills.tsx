import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { Section } from '@/components/ui/Section';
import { Tag } from '@/components/ui/Tag';
import { skillCategories } from '@/data/skills';

export function Skills() {
  return (
    <Section eyebrow="Skills" title="Tools I use to ship WordPress products and frontend interfaces.">
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
    </Section>
  );
}
