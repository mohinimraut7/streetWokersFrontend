import { forwardRef } from "react";
import clsx from "clsx";

export function FieldWrap({ label, required, error, hint, children, className }) {
  return (
    <label className={clsx("block", className)}>
      {label && (
        <span className="mb-1.5 flex items-center gap-1 text-[13px] font-semibold text-ink-700">
          {label}
          {required && <span className="text-danger-500">*</span>}
        </span>
      )}
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-ink-500">{hint}</span>}
      {error && <span className="mt-1 block text-xs font-medium text-danger-500">{error}</span>}
    </label>
  );
}

const baseControl =
  "w-full rounded-[var(--radius-control)] border bg-white px-3.5 py-2.5 text-[14px] text-ink-900 placeholder:text-ink-300 transition-colors focus:outline-none focus:ring-4";

export const Input = forwardRef(
  ({ label, required, error, hint, className, icon: Icon, ...props }, ref) => (
    <FieldWrap label={label} required={required} error={error} hint={hint}>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
        )}
        <input
          ref={ref}
          className={clsx(
            baseControl,
            Icon && "pl-10",
            error
              ? "border-danger-500 focus:border-danger-500 focus:ring-danger-100"
              : "border-ink-100 focus:border-brand-400 focus:ring-brand-100",
            className
          )}
          {...props}
        />
      </div>
    </FieldWrap>
  )
);
Input.displayName = "Input";

export const Select = forwardRef(
  ({ label, required, error, hint, className, options = [], placeholder = "Select option", ...props }, ref) => (
    <FieldWrap label={label} required={required} error={error} hint={hint}>
      <select
        ref={ref}
        className={clsx(
          baseControl,
          "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2364748B%22 stroke-width=%222.5%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-no-repeat bg-[right_0.9rem_center] pr-9",
          error
            ? "border-danger-500 focus:border-danger-500 focus:ring-danger-100"
            : "border-ink-100 focus:border-brand-400 focus:ring-brand-100",
          className
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </FieldWrap>
  )
);
Select.displayName = "Select";

export const Textarea = forwardRef(
  ({ label, required, error, hint, className, ...props }, ref) => (
    <FieldWrap label={label} required={required} error={error} hint={hint}>
      <textarea
        ref={ref}
        rows={3}
        className={clsx(
          baseControl,
          "resize-none",
          error
            ? "border-danger-500 focus:border-danger-500 focus:ring-danger-100"
            : "border-ink-100 focus:border-brand-400 focus:ring-brand-100",
          className
        )}
        {...props}
      />
    </FieldWrap>
  )
);
Textarea.displayName = "Textarea";
