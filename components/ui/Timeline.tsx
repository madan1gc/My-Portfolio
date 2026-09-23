export interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative border-l border-dashed border-border pl-6">
      {items.map((item) => (
        <li key={`${item.title}-${item.period}`} className="relative mb-10 last:mb-0">
          <span className="absolute -left-[29px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent-strong" />
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <span className="text-sm text-muted">{item.period}</span>
          </div>
          <p className="mb-3 text-sm text-muted">{item.subtitle}</p>
          <ul className="space-y-2">
            {item.description.map((line) => (
              <li key={line} className="flex gap-2 text-sm text-muted">
                <span className="text-accent-text">—</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
