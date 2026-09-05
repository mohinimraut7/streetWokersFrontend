// import clsx from "clsx";

// function initials(name = "") {
//   return name
//     .split(" ")
//     .map((p) => p[0])
//     .filter(Boolean)
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();
// }

// export default function Avatar({ src, name, size = 40, className }) {
//   const style = { width: size, height: size };
//   if (src) {
//     return (
//       <img
//         src={src}
//         alt={name}
//         style={style}
//         className={clsx("shrink-0 rounded-full object-cover ring-2 ring-white", className)}
//       />
//     );
//   }
//   return (
//     <div
//       style={style}
//       className={clsx(
//         "flex shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700 ring-2 ring-white",
//         className
//       )}
//     >
//       <span style={{ fontSize: size * 0.38 }}>{initials(name) || "?"}</span>
//     </div>
//   );
// }

// export function IdBadge({ children, className }) {
//   return (
//     <span
//       className={clsx(
//         "id-mono inline-flex items-center rounded-lg bg-ink-50 px-2 py-1 text-[12px] font-semibold text-ink-700",
//         className
//       )}
//     >
//       {children}
//     </span>
//   );
// }


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

// ── Cloudinary on-the-fly thumbnail ──
// Vendor documents are uploaded/stored at up to 1000x1000px (see uploadVendorApplication.js).
// That's fine for the full document view, but every table/list on this site (Vendor List,
// Survey, Approval, Dashboard "Recent Applications", etc.) was rendering that same full-size
// image just to show a 34-40px round avatar — 10+ rows of that adds up to real, unnecessary
// bandwidth and is a big part of why these pages feel slow to load. Cloudinary lets us request
// a resized/optimized version by inserting a transformation segment into the URL itself, with
// no backend change needed — Cloudinary generates and caches the small version on first request.
function toThumbnailUrl(src, size) {
  if (!src || typeof src !== "string") return src;
  const marker = "/upload/";
  const idx = src.indexOf(marker);
  if (idx === -1) return src; // not a Cloudinary URL (or already transformed) — leave as-is
  // 2x size for retina screens, square crop centered on the face when detected, auto quality/format
  const px = Math.round(size * 2);
  const transform = `w_${px},h_${px},c_fill,g_face,q_auto,f_auto`;
  return src.slice(0, idx + marker.length) + transform + "/" + src.slice(idx + marker.length);
}

export default function Avatar({ src, name, size = 40, className }) {
  const style = { width: size, height: size };
  if (src) {
    return (
      <img
        src={toThumbnailUrl(src, size)}
        alt={name}
        style={style}
        loading="lazy"
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
