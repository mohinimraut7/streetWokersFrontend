import clsx from "clsx";

function initials(name = "") {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Avatar({ src, name, size = 40, className }) {
  const style = { width: size, height: size };
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={style}
        className={clsx("shrink-0 rounded-full object-cover ring-2 ring-white", className)}
      />
    );
  }
  return (
    <div
      style={style}
      className={clsx(
        "flex shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700 ring-2 ring-white",
        className
      )}
    >
      <span style={{ fontSize: size * 0.38 }}>{initials(name) || "?"}</span>
    </div>
  );
}

export function IdBadge({ children, className }) {
  return (
    <span
      className={clsx(
        "id-mono inline-flex items-center rounded-lg bg-ink-50 px-2 py-1 text-[12px] font-semibold text-ink-700",
        className
      )}
    >
      {children}
    </span>
  );
}
