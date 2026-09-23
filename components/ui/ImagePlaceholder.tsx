interface ImagePlaceholderProps {
  label: string;
}

export function ImagePlaceholder({ label }: ImagePlaceholderProps) {
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-border bg-surface">
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted">Screenshot coming soon</p>
      </div>
    </div>
  );
}
