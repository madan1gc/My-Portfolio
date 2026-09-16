interface StatTileProps {
  label: string;
  value: string;
}

export function StatTile({ label, value }: StatTileProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-2xl font-semibold text-foreground sm:text-3xl">{value}</span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
