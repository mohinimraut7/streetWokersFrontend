// import { useRef } from "react";
// import clsx from "clsx";
// import { FiUpload, FiX, FiFile } from "react-icons/fi";

// export default function FileUpload({ label, required, hint, value, onChange, error }) {
//   const inputRef = useRef(null);

//   const handleFile = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     onChange({ name: file.name, url, type: file.type });
//     e.target.value = "";
//   };

//   return (
//     <div>
//       <span className="mb-1.5 flex items-center gap-1 text-[13px] font-semibold text-ink-700">
//         {label}
//         {required && <span className="text-danger-500">*</span>}
//       </span>

//       <div
//         className={clsx(
//           "relative flex flex-col overflow-hidden rounded-2xl border-2 border-dashed bg-ink-50/40 transition-colors",
//           error ? "border-danger-300" : "border-ink-100 hover:border-brand-300"
//         )}
//       >
//         {value ? (
//           <>
//             <button
//               type="button"
//               onClick={() => onChange(null)}
//               className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-ink-500 shadow-sm hover:bg-white hover:text-danger-500"
//             >
//               <FiX size={14} />
//             </button>
//             <div className="flex h-28 items-center justify-center bg-white">
//               {value.type?.startsWith("image/") ? (
//                 <img src={value.url} alt={value.name} className="h-full w-full object-cover" />
//               ) : (
//                 <div className="flex flex-col items-center gap-1 text-ink-400">
//                   <FiFile size={26} />
//                   <span className="max-w-[90%] truncate text-[11px]">{value.name}</span>
//                 </div>
//               )}
//             </div>
//             <button
//               type="button"
//               onClick={() => inputRef.current?.click()}
//               className="border-t border-ink-100 bg-white py-2 text-center text-xs font-semibold text-brand-600 hover:bg-brand-50"
//             >
//               Change File
//             </button>
//           </>
//         ) : (
//           <button
//             type="button"
//             onClick={() => inputRef.current?.click()}
//             className="flex h-28 flex-col items-center justify-center gap-1.5 text-ink-400 hover:text-brand-600"
//           >
//             <FiUpload size={20} />
//             <span className="text-xs font-medium">Click to upload</span>
//           </button>
//         )}
//         <input ref={inputRef} type="file" className="hidden" accept="image/*,.pdf" onChange={handleFile} />
//       </div>
//       {hint && <span className="mt-1 block text-[11px] text-ink-500">{hint}</span>}
//       {error && <span className="mt-1 block text-[11px] font-medium text-danger-500">{error}</span>}
//     </div>
//   );
// }


import { useRef } from "react";
import clsx from "clsx";
import { FiUpload, FiX, FiFile } from "react-icons/fi";

export default function FileUpload({ label, required, hint, value, onChange, error }) {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    // IMPORTANT: keep the raw File object too (`file`) — it's what actually needs to be
    // sent to the backend. `name`/`url`/`type` are only for the on-screen preview.
    onChange({ name: file.name, url, type: file.type, file });
    e.target.value = "";
  };

  return (
    <div>
      <span className="mb-1.5 flex items-center gap-1 text-[13px] font-semibold text-ink-700">
        {label}
        {required && <span className="text-danger-500">*</span>}
      </span>

      <div
        className={clsx(
          "relative flex flex-col overflow-hidden rounded-2xl border-2 border-dashed bg-ink-50/40 transition-colors",
          error ? "border-danger-300" : "border-ink-100 hover:border-brand-300"
        )}
      >
        {value ? (
          <>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-ink-500 shadow-sm hover:bg-white hover:text-danger-500"
            >
              <FiX size={14} />
            </button>
            <div className="flex h-28 items-center justify-center bg-white">
              {value.type?.startsWith("image/") ? (
                <img src={value.url} alt={value.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-1 text-ink-400">
                  <FiFile size={26} />
                  <span className="max-w-[90%] truncate text-[11px]">{value.name}</span>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="border-t border-ink-100 bg-white py-2 text-center text-xs font-semibold text-brand-600 hover:bg-brand-50"
            >
              Change File
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-28 flex-col items-center justify-center gap-1.5 text-ink-400 hover:text-brand-600"
          >
            <FiUpload size={20} />
            <span className="text-xs font-medium">Click to upload</span>
          </button>
        )}
        <input ref={inputRef} type="file" className="hidden" accept="image/*,.pdf" onChange={handleFile} />
      </div>
      {hint && <span className="mt-1 block text-[11px] text-ink-500">{hint}</span>}
      {error && <span className="mt-1 block text-[11px] font-medium text-danger-500">{error}</span>}
    </div>
  );
}
