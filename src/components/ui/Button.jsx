import { forwardRef } from "react";
import clsx from "clsx";

const variants = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-[var(--shadow-brand)] disabled:bg-ink-100 disabled:text-ink-300 disabled:shadow-none",
  outline:
    "bg-white text-ink-700 border border-ink-100 hover:border-brand-300 hover:text-brand-700",
  ghost: "bg-transparent text-ink-500 hover:bg-ink-50 hover:text-ink-900",
  danger: "bg-danger-500 text-white hover:bg-red-600",
  success: "bg-success-500 text-white hover:bg-emerald-600",
  accent: "bg-accent-400 text-white hover:bg-accent-500",
};

const sizes = {
  sm: "text-sm px-3.5 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-[15px] px-6 py-3",
};

const Button = forwardRef(
  (
    { variant = "primary", size = "md", className, icon: Icon, iconPosition = "left", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon className="shrink-0 text-[1.05em]" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="shrink-0 text-[1.05em]" />}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
