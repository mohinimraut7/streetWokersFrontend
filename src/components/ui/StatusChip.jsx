import clsx from "clsx";

const MAP = {
  "pending survey": ["bg-warning-100", "text-warning-500"],
  "under survey": ["bg-info-100", "text-info-500"],
  "pending approval": ["bg-warning-100", "text-warning-500"],
  pending: ["bg-warning-100", "text-warning-500"],
  approved: ["bg-success-100", "text-success-500"],
  completed: ["bg-success-100", "text-success-500"],
  rejected: ["bg-danger-100", "text-danger-500"],
  forwarded: ["bg-info-100", "text-info-500"],
  "sent back": ["bg-accent-100", "text-accent-700"],
  current: ["bg-brand-100", "text-brand-700"],
  draft: ["bg-ink-100", "text-ink-500"],
};

export default function StatusChip({ status, className, dot = true }) {
  const key = String(status ?? "").toLowerCase();
  const [bg, text] = MAP[key] ?? ["bg-ink-100", "text-ink-500"];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        bg,
        text,
        className
      )}
    >
      {dot && <span className={clsx("h-1.5 w-1.5 rounded-full", text.replace("text-", "bg-"))} />}
      {status}
    </span>
  );
}
