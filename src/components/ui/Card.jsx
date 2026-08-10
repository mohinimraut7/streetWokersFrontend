import clsx from "clsx";

export default function Card({ children, className, padded = true, ...props }) {
  return (
    <div
      className={clsx(
        "rounded-[var(--radius-card)] border border-ink-100/70 bg-card shadow-[var(--shadow-soft)]",
        padded && "p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
