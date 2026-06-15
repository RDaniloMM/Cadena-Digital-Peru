export type ProgressBarProps = {
  current: number;
  total: number;
  label?: string;
};

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(current, total));
  const percent = total > 0 ? Math.round((clamped / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-lumia-muted">
        <span>{label ?? `Paso ${clamped} de ${total}`}</span>
        <span aria-hidden="true">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={label ?? `Paso ${clamped} de ${total}`}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={total}
        className="h-2 w-full overflow-hidden rounded-full bg-lumia-primary/10"
      >
        <div
          className="h-full rounded-full bg-lumia-primary transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
