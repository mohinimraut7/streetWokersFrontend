import clsx from "clsx";
import { FiCheck } from "react-icons/fi";

export default function StepIndicator({ steps, current }) {
  return (
    <div className="flex items-start">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < current;
        const isActive = stepNum === current;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={clsx(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  isDone && "bg-brand-500 text-white",
                  isActive && "bg-brand-500 text-white ring-4 ring-brand-100",
                  !isDone && !isActive && "bg-ink-50 text-ink-400"
                )}
              >
                {isDone ? <FiCheck /> : stepNum}
              </div>
              <span
                className={clsx(
                  "whitespace-nowrap text-[13px] font-semibold",
                  isActive ? "text-brand-700" : isDone ? "text-ink-700" : "text-ink-400"
                )}
              >
                {label}
              </span>
            </div>
            {stepNum !== steps.length && (
              <div
                className={clsx(
                  "mx-3 mb-6 h-[2px] flex-1 rounded-full",
                  isDone ? "bg-brand-500" : "bg-ink-100"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
