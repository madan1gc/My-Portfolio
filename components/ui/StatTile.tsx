interface StatTileProps {
  label: string;
  value: string;
}

export function StatTile({ label, value }: StatTileProps) {
  const hasTrailingPlus = value.endsWith('+');
  const base = hasTrailingPlus ? value.slice(0, -1) : value;

  return (
    <div className="flex flex-col gap-1">
      <dd className="text-2xl font-semibold text-foreground sm:text-3xl">
        {base}
        {hasTrailingPlus && <span className="text-accent-text">+</span>}
      </dd>
      <dt className="text-sm text-muted">{label}</dt>
    </div>
  );
}
