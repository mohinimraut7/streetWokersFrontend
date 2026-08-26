// import { useRef } from "react";
// import { FiCamera, FiX } from "react-icons/fi";

// export default function PhotoUploadGrid({ label, required, photos, onChange, max = 6 }) {
//   const inputRef = useRef(null);

//   const handleFiles = (e) => {
//     const files = Array.from(e.target.files || []);
//     const mapped = files.slice(0, max - photos.length).map((file) => ({
//       name: file.name,
//       url: URL.createObjectURL(file),
//     }));
//     onChange([...photos, ...mapped]);
//     e.target.value = "";
//   };

//   const remove = (idx) => onChange(photos.filter((_, i) => i !== idx));

//   return (
//     <div>
//       <span className="mb-1.5 flex items-center gap-1 text-[13px] font-semibold text-ink-700">
//         {label}
//         {required && <span className="text-danger-500">*</span>}
//       </span>
//       <div className="flex flex-wrap gap-3">
//         {photos.map((p, idx) => (
//           <div key={idx} className="group relative h-20 w-20 overflow-hidden rounded-xl border border-ink-100">
//             <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
//             <button
//               type="button"
//               onClick={() => remove(idx)}
//               className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-ink-500 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:text-danger-500"
//             >
//               <FiX size={12} />
//             </button>
//           </div>
//         ))}
//         {photos.length < max && (
//           <button
//             type="button"
//             onClick={() => inputRef.current?.click()}
//             className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-ink-100 text-ink-400 hover:border-brand-300 hover:text-brand-600"
//           >
//             <FiCamera size={18} />
//             <span className="text-[10px] font-semibold">Upload</span>
//           </button>
//         )}
//       </div>
//       <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
//     </div>
//   );
// }




import { useRef } from "react";
import { FiCamera, FiX } from "react-icons/fi";

export default function PhotoUploadGrid({ label, required, photos, onChange, max = 6 }) {
  const inputRef = useRef(null);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const mapped = files.slice(0, max - photos.length).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }));
    onChange([...photos, ...mapped]);
    e.target.value = "";
  };

  const remove = (idx) => onChange(photos.filter((_, i) => i !== idx));

  return (
    <div>
      <span className="mb-1.5 flex items-center gap-1 text-[13px] font-semibold text-ink-700">
        {label}
        {required && <span className="text-danger-500">*</span>}
      </span>
      <div className="flex flex-wrap gap-3">
        {photos.map((p, idx) => (
          <div key={idx} className="group relative h-20 w-20 overflow-hidden rounded-xl border border-ink-100">
            <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => remove(idx)}
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-ink-500 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:text-danger-500"
            >
              <FiX size={12} />
            </button>
          </div>
        ))}
        {photos.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-ink-100 text-ink-400 hover:border-brand-300 hover:text-brand-600"
          >
            <FiCamera size={18} />
            <span className="text-[10px] font-semibold">Upload</span>
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
    </div>
  );
}
