import { useState } from "react";
import { FiPlus, FiMinus, FiMapPin, FiCrosshair } from "react-icons/fi";

export default function MapPlaceholder({ latitude, longitude, onLocate }) {
  const [mode, setMode] = useState("Map");

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink-700">Vendor Location</span>
        <div className="flex overflow-hidden rounded-lg border border-ink-100 text-xs font-semibold">
          {["Map", "Satellite"].map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 transition-colors ${
                mode === m ? "bg-brand-500 text-white" : "bg-white text-ink-500 hover:bg-ink-50"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`relative h-56 w-full overflow-hidden rounded-2xl border border-ink-100 ${
          mode === "Map"
            ? "bg-[linear-gradient(0deg,rgba(14,165,168,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,168,0.06)_1px,transparent_1px)] bg-[length:22px_22px] bg-brand-50/40"
            : "bg-[linear-gradient(135deg,#0B4F52_0%,#0EA5A8_45%,#38BEC0_100%)]"
        }`}
      >
        {/* faux roads */}
        <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 220" preserveAspectRatio="none">
          <path d="M0 60 H400" stroke={mode === "Map" ? "#94A3B8" : "#ffffff"} strokeWidth="3" />
          <path d="M0 150 H400" stroke={mode === "Map" ? "#94A3B8" : "#ffffff"} strokeWidth="2" />
          <path d="M120 0 V220" stroke={mode === "Map" ? "#94A3B8" : "#ffffff"} strokeWidth="3" />
          <path d="M280 0 V220" stroke={mode === "Map" ? "#94A3B8" : "#ffffff"} strokeWidth="2" />
        </svg>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
          <FiMapPin className="drop-shadow-md" size={30} fill="#F4A85B" color="#B4611D" />
        </div>

        <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink-700 shadow-sm">
          {latitude && longitude ? `${latitude}, ${longitude}` : "Location not set"}
        </div>

        <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-lg border border-white/40 shadow-sm">
          <button type="button" className="flex h-7 w-7 items-center justify-center bg-white/90 text-ink-600 hover:bg-white">
            <FiPlus size={13} />
          </button>
          <button type="button" className="flex h-7 w-7 items-center justify-center bg-white/90 text-ink-600 hover:bg-white">
            <FiMinus size={13} />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onLocate}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-50 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-100"
      >
        <FiCrosshair size={15} /> Get Current Location
      </button>
    </div>
  );
}
