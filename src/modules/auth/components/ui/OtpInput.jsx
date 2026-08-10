import { useRef } from "react";

// 6 separate boxes, auto-advances on type, auto-back on backspace, supports pasting a full code.
export default function OtpInput({ value, onChange, length = 6 }) {
  const inputsRef = useRef([]);
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  const setDigit = (index, digit) => {
    const next = [...digits];
    next[index] = digit;
    onChange(next.join(""));
  };

  const handleChange = (e, index) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    setDigit(index, digit);
    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (pasted) {
      e.preventDefault();
      onChange(pasted.padEnd(length, "").slice(0, length));
      const lastIndex = Math.min(pasted.length, length) - 1;
      inputsRef.current[lastIndex]?.focus();
    }
  };

  return (
    <div className="flex justify-between gap-2">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="h-12 w-11 rounded-xl border border-white/70 bg-white/50 text-center text-lg font-bold text-[#102B50] shadow-inner backdrop-blur-xl outline-none transition focus:border-[#0EA5A8] focus:ring-4 focus:ring-[#0EA5A8]/10"
        />
      ))}
    </div>
  );
}