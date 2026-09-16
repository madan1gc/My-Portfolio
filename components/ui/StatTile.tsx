interface StatTileProps {
  label: string;
  value: string;
}

export function StatTile({ label, value }: StatTileProps) {
  return (
    <div className="flex flex-col gap-1">
      <dd className="text-2xl font-semibold text-foreground sm:text-3xl">{value}</dd>
      <dt className="text-sm text-muted">{label}</dt>
    </div>
  );
}
