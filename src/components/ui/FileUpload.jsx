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


// import { useRef } from "react";
// import clsx from "clsx";
// import { FiUpload, FiX, FiFile } from "react-icons/fi";

// export default function FileUpload({ label, required, hint, value, onChange, error }) {
//   const inputRef = useRef(null);

//   const handleFile = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     // IMPORTANT: keep the raw File object too (`file`) — it's what actually needs to be
//     // sent to the backend. `name`/`url`/`type` are only for the on-screen preview.
//     onChange({ name: file.name, url, type: file.type, file });
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


// import { useRef, useState } from "react";
// import clsx from "clsx";
// import { FiUpload, FiX, FiFile, FiLoader } from "react-icons/fi";

// // ── Client-side image compression ──
// // Vendors/officers upload straight from a phone camera, which routinely produces
// // 3-10MB photos at 3000-4000px wide. That's what was making Register/Edit submit feel
// // slow — the file has to travel over the vendor's/officer's own network before it even
// // reaches our server. Resizing to a sane max dimension and re-encoding as a moderate-
// // quality JPEG in-browser (via <canvas>) cuts that size by roughly 10-20x for a typical
// // camera photo, with no visible quality loss for an ID/address-proof document — before
// // a single byte goes over the network. PDFs can't be compressed this way client-side, so
// // those just get a size cap instead (see MAX_PDF_SIZE_BYTES below).
// const MAX_IMAGE_DIMENSION = 1600; // px, longer side — plenty for a legible document scan/photo
// const IMAGE_QUALITY = 0.75; // JPEG quality (0-1) — visually near-lossless for this use case
// const MAX_PDF_SIZE_MB = 5;
// const MAX_PDF_SIZE_BYTES = MAX_PDF_SIZE_MB * 1024 * 1024;

// function compressImageFile(file) {
//   return new Promise((resolve) => {
//     const objectUrl = URL.createObjectURL(file);
//     const img = new Image();

//     img.onload = () => {
//       let { width, height } = img;
//       const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(width, height));
//       width = Math.round(width * scale);
//       height = Math.round(height * scale);

//       const canvas = document.createElement("canvas");
//       canvas.width = width;
//       canvas.height = height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, width, height);
//       URL.revokeObjectURL(objectUrl);

//       canvas.toBlob(
//         (blob) => {
//           if (!blob) {
//             resolve(file); // compression failed for some reason — fall back to the original
//             return;
//           }
//           // Re-encoding as JPEG regardless of original format (png/webp/jpeg) — documents
//           // don't need transparency, and JPEG gives the best size/quality trade-off here.
//           const compressedName = file.name.replace(/\.\w+$/, "") + ".jpg";
//           resolve(new File([blob], compressedName, { type: "image/jpeg", lastModified: Date.now() }));
//         },
//         "image/jpeg",
//         IMAGE_QUALITY
//       );
//     };

//     img.onerror = () => {
//       URL.revokeObjectURL(objectUrl);
//       resolve(file); // fall back to the original file if it can't be decoded as an image
//     };

//     img.src = objectUrl;
//   });
// }

// export default function FileUpload({ label, required, hint, value, onChange, error }) {
//   const inputRef = useRef(null);
//   const [sizeError, setSizeError] = useState("");
//   const [compressing, setCompressing] = useState(false);

//   const handleFile = async (e) => {
//     const file = e.target.files?.[0];
//     e.target.value = ""; // reset immediately so picking the same file again still fires onChange
//     if (!file) return;

//     setSizeError("");

//     let finalFile = file;
//     if (file.type.startsWith("image/")) {
//       setCompressing(true);
//       finalFile = await compressImageFile(file);
//       setCompressing(false);
//     } else if (file.size > MAX_PDF_SIZE_BYTES) {
//       // PDFs pass through as-is (no client-side compression), so a hard size cap still applies
//       setSizeError(`This file is ${(file.size / (1024 * 1024)).toFixed(1)}MB — please choose one under ${MAX_PDF_SIZE_MB}MB.`);
//       return;
//     }

//     const url = URL.createObjectURL(finalFile);
//     // IMPORTANT: keep the raw File object too (`file`) — it's what actually needs to be
//     // sent to the backend. `name`/`url`/`type` are only for the on-screen preview.
//     onChange({ name: finalFile.name, url, type: finalFile.type, file: finalFile });
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
//               disabled={compressing}
//               className="border-t border-ink-100 bg-white py-2 text-center text-xs font-semibold text-brand-600 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {compressing ? (
//                 <span className="inline-flex items-center gap-1.5">
//                   <FiLoader size={12} className="animate-spin" /> Compressing...
//                 </span>
//               ) : (
//                 "Change File"
//               )}
//             </button>
//           </>
//         ) : (
//           <button
//             type="button"
//             onClick={() => inputRef.current?.click()}
//             disabled={compressing}
//             className="flex h-28 flex-col items-center justify-center gap-1.5 text-ink-400 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {compressing ? (
//               <>
//                 <FiLoader size={20} className="animate-spin" />
//                 <span className="text-xs font-medium">Compressing...</span>
//               </>
//             ) : (
//               <>
//                 <FiUpload size={20} />
//                 <span className="text-xs font-medium">Click to upload</span>
//               </>
//             )}
//           </button>
//         )}
//         <input ref={inputRef} type="file" className="hidden" accept="image/*,.pdf" onChange={handleFile} />
//       </div>
//       {hint && <span className="mt-1 block text-[11px] text-ink-500">{hint}</span>}
//       {error && <span className="mt-1 block text-[11px] font-medium text-danger-500">{error}</span>}
//       {sizeError && <span className="mt-1 block text-[11px] font-medium text-danger-500">{sizeError}</span>}
//     </div>
//   );
// }



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


// import { useRef, useState } from "react";
// import clsx from "clsx";
// import { FiUpload, FiX, FiFile, FiLoader } from "react-icons/fi";

// // ── Client-side image compression ──
// // Vendors/officers upload straight from a phone camera, which routinely produces
// // 3-10MB photos at 3000-4000px wide. That's what was making Register/Edit submit feel
// // slow — the file has to travel over the vendor's/officer's own network before it even
// // reaches our server. Resizing to a sane max dimension and re-encoding as a moderate-
// // quality JPEG in-browser (via <canvas>) cuts that size by roughly 10-20x for a typical
// // camera photo, with no visible quality loss for an ID/address-proof document — before
// // a single byte goes over the network. PDFs can't be compressed this way client-side, so
// // those just get a size cap instead (see MAX_PDF_SIZE_BYTES below).
// const MAX_IMAGE_DIMENSION = 1600; // px, longer side — plenty for a legible document scan/photo
// const IMAGE_QUALITY = 0.75; // JPEG quality (0-1) — visually near-lossless for this use case
// const MAX_PDF_SIZE_MB = 5;
// const MAX_PDF_SIZE_BYTES = MAX_PDF_SIZE_MB * 1024 * 1024;

// function compressImageFile(file) {
//   return new Promise((resolve) => {
//     const objectUrl = URL.createObjectURL(file);
//     const img = new Image();

//     img.onload = () => {
//       let { width, height } = img;
//       const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(width, height));
//       width = Math.round(width * scale);
//       height = Math.round(height * scale);

//       const canvas = document.createElement("canvas");
//       canvas.width = width;
//       canvas.height = height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, width, height);
//       URL.revokeObjectURL(objectUrl);

//       canvas.toBlob(
//         (blob) => {
//           if (!blob) {
//             resolve(file); // compression failed for some reason — fall back to the original
//             return;
//           }
//           // Re-encoding as JPEG regardless of original format (png/webp/jpeg) — documents
//           // don't need transparency, and JPEG gives the best size/quality trade-off here.
//           const compressedName = file.name.replace(/\.\w+$/, "") + ".jpg";
//           resolve(new File([blob], compressedName, { type: "image/jpeg", lastModified: Date.now() }));
//         },
//         "image/jpeg",
//         IMAGE_QUALITY
//       );
//     };

//     img.onerror = () => {
//       URL.revokeObjectURL(objectUrl);
//       resolve(file); // fall back to the original file if it can't be decoded as an image
//     };

//     img.src = objectUrl;
//   });
// }

// export default function FileUpload({ label, required, hint, value, onChange, error }) {
//   const inputRef = useRef(null);
//   const [sizeError, setSizeError] = useState("");
//   const [compressing, setCompressing] = useState(false);

//   const handleFile = async (e) => {
//     const file = e.target.files?.[0];
//     e.target.value = ""; // reset immediately so picking the same file again still fires onChange
//     if (!file) return;

//     setSizeError("");

//     let finalFile = file;
//     if (file.type.startsWith("image/")) {
//       setCompressing(true);
//       finalFile = await compressImageFile(file);
//       setCompressing(false);
//       // ── Temporary console log so the actual before/after size is easy to verify in
//       // DevTools (Console tab) without having to inspect the network request payload.
//       // Safe to remove later — purely informational, doesn't affect functionality. ──
//       console.log(
//         `[FileUpload] "${file.name}": ${(file.size / 1024).toFixed(0)} KB → ${(finalFile.size / 1024).toFixed(0)} KB ` +
//           `(${(file.size / finalFile.size).toFixed(1)}x smaller)`
//       );
//     } else if (file.size > MAX_PDF_SIZE_BYTES) {
//       // PDFs pass through as-is (no client-side compression), so a hard size cap still applies
//       setSizeError(`This file is ${(file.size / (1024 * 1024)).toFixed(1)}MB — please choose one under ${MAX_PDF_SIZE_MB}MB.`);
//       return;
//     }

//     const url = URL.createObjectURL(finalFile);
//     // IMPORTANT: keep the raw File object too (`file`) — it's what actually needs to be
//     // sent to the backend. `name`/`url`/`type` are only for the on-screen preview.
//     onChange({ name: finalFile.name, url, type: finalFile.type, file: finalFile });
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
//               disabled={compressing}
//               className="border-t border-ink-100 bg-white py-2 text-center text-xs font-semibold text-brand-600 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {compressing ? (
//                 <span className="inline-flex items-center gap-1.5">
//                   <FiLoader size={12} className="animate-spin" /> Compressing...
//                 </span>
//               ) : (
//                 "Change File"
//               )}
//             </button>
//           </>
//         ) : (
//           <button
//             type="button"
//             onClick={() => inputRef.current?.click()}
//             disabled={compressing}
//             className="flex h-28 flex-col items-center justify-center gap-1.5 text-ink-400 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {compressing ? (
//               <>
//                 <FiLoader size={20} className="animate-spin" />
//                 <span className="text-xs font-medium">Compressing...</span>
//               </>
//             ) : (
//               <>
//                 <FiUpload size={20} />
//                 <span className="text-xs font-medium">Click to upload</span>
//               </>
//             )}
//           </button>
//         )}
//         <input ref={inputRef} type="file" className="hidden" accept="image/*,.pdf" onChange={handleFile} />
//       </div>
//       {hint && <span className="mt-1 block text-[11px] text-ink-500">{hint}</span>}
//       {error && <span className="mt-1 block text-[11px] font-medium text-danger-500">{error}</span>}
//       {sizeError && <span className="mt-1 block text-[11px] font-medium text-danger-500">{sizeError}</span>}
//     </div>
//   );
// }




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


// import { useRef, useState } from "react";
// import clsx from "clsx";
// import { FiUpload, FiX, FiFile, FiLoader } from "react-icons/fi";

// // ── Client-side image compression ──
// // Vendors/officers upload straight from a phone camera, which routinely produces
// // 3-10MB photos at 3000-4000px wide. That's what was making Register/Edit submit feel
// // slow — the file has to travel over the vendor's/officer's own network before it even
// // reaches our server. Resizing to a sane max dimension and re-encoding as a moderate-
// // quality JPEG in-browser (via <canvas>) cuts that size by roughly 10-20x for a typical
// // camera photo, with no visible quality loss for an ID/address-proof document — before
// // a single byte goes over the network. PDFs can't be compressed this way client-side, so
// // those just get a size cap instead (see MAX_PDF_SIZE_BYTES below).
// const MAX_IMAGE_DIMENSION = 1600; // px, longer side — plenty for a legible document scan/photo
// const IMAGE_QUALITY = 0.75; // JPEG quality (0-1) — visually near-lossless for this use case
// const MAX_PDF_SIZE_MB = 5;
// const MAX_PDF_SIZE_BYTES = MAX_PDF_SIZE_MB * 1024 * 1024;

// function compressImageFile(file) {
//   return new Promise((resolve) => {
//     const objectUrl = URL.createObjectURL(file);
//     const img = new Image();

//     img.onload = () => {
//       let { width, height } = img;
//       const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(width, height));
//       width = Math.round(width * scale);
//       height = Math.round(height * scale);

//       const canvas = document.createElement("canvas");
//       canvas.width = width;
//       canvas.height = height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, width, height);
//       URL.revokeObjectURL(objectUrl);

//       canvas.toBlob(
//         (blob) => {
//           if (!blob) {
//             resolve(file); // compression failed for some reason — fall back to the original
//             return;
//           }
//           // Re-encoding as JPEG regardless of original format (png/webp/jpeg) — documents
//           // don't need transparency, and JPEG gives the best size/quality trade-off here.
//           const compressedName = file.name.replace(/\.\w+$/, "") + ".jpg";
//           resolve(new File([blob], compressedName, { type: "image/jpeg", lastModified: Date.now() }));
//         },
//         "image/jpeg",
//         IMAGE_QUALITY
//       );
//     };

//     img.onerror = () => {
//       URL.revokeObjectURL(objectUrl);
//       resolve(file); // fall back to the original file if it can't be decoded as an image
//     };

//     img.src = objectUrl;
//   });
// }

// export default function FileUpload({ label, required, hint, value, onChange, error }) {
//   const inputRef = useRef(null);
//   const [sizeError, setSizeError] = useState("");
//   const [compressing, setCompressing] = useState(false);

//   const handleFile = async (e) => {
//     const file = e.target.files?.[0];
//     e.target.value = ""; // reset immediately so picking the same file again still fires onChange
//     if (!file) return;

//     setSizeError("");

//     let finalFile = file;
//     if (file.type.startsWith("image/")) {
//       setCompressing(true);
//       finalFile = await compressImageFile(file);
//       setCompressing(false);
//       // ── Temporary console log so the actual before/after size is easy to verify in
//       // DevTools (Console tab) without having to inspect the network request payload.
//       // Safe to remove later — purely informational, doesn't affect functionality. ──
//       console.log(
//         `[FileUpload] "${file.name}": ${(file.size / 1024).toFixed(0)} KB → ${(finalFile.size / 1024).toFixed(0)} KB ` +
//           `(${(file.size / finalFile.size).toFixed(1)}x smaller)`
//       );

//       // ── Safety net: compressImageFile() falls back to the ORIGINAL file if the browser
//       // couldn't decode it as an image (rare — e.g. a corrupted file). Without this check,
//       // that large original would silently be accepted here and the person wouldn't find
//       // out it's too big until they finish all 5 steps and hit Submit, only to get a
//       // backend error. Catching it right here, at the moment they pick the file, is much
//       // clearer — same message and same spot as the PDF size error below. ──
//       if (finalFile.size > MAX_PDF_SIZE_BYTES) {
//         setSizeError(
//           `This photo is ${(finalFile.size / (1024 * 1024)).toFixed(1)}MB and couldn't be compressed — please choose a smaller photo (under ${MAX_PDF_SIZE_MB}MB) or try taking a new one.`
//         );
//         return;
//       }
//     } else if (file.size > MAX_PDF_SIZE_BYTES) {
//       // PDFs pass through as-is (no client-side compression), so a hard size cap still applies
//       setSizeError(`This file is ${(file.size / (1024 * 1024)).toFixed(1)}MB — please choose one under ${MAX_PDF_SIZE_MB}MB.`);
//       return;
//     }

//     const url = URL.createObjectURL(finalFile);
//     // IMPORTANT: keep the raw File object too (`file`) — it's what actually needs to be
//     // sent to the backend. `name`/`url`/`type` are only for the on-screen preview.
//     onChange({ name: finalFile.name, url, type: finalFile.type, file: finalFile });
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
//               disabled={compressing}
//               className="border-t border-ink-100 bg-white py-2 text-center text-xs font-semibold text-brand-600 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {compressing ? (
//                 <span className="inline-flex items-center gap-1.5">
//                   <FiLoader size={12} className="animate-spin" /> Compressing...
//                 </span>
//               ) : (
//                 "Change File"
//               )}
//             </button>
//           </>
//         ) : (
//           <button
//             type="button"
//             onClick={() => inputRef.current?.click()}
//             disabled={compressing}
//             className="flex h-28 flex-col items-center justify-center gap-1.5 text-ink-400 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {compressing ? (
//               <>
//                 <FiLoader size={20} className="animate-spin" />
//                 <span className="text-xs font-medium">Compressing...</span>
//               </>
//             ) : (
//               <>
//                 <FiUpload size={20} />
//                 <span className="text-xs font-medium">Click to upload</span>
//               </>
//             )}
//           </button>
//         )}
//         <input ref={inputRef} type="file" className="hidden" accept="image/*,.pdf" onChange={handleFile} />
//       </div>
//       {hint && <span className="mt-1 block text-[11px] text-ink-500">{hint}</span>}
//       {error && <span className="mt-1 block text-[11px] font-medium text-danger-500">{error}</span>}
//       {sizeError && <span className="mt-1 block text-[11px] font-medium text-danger-500">{sizeError}</span>}
//     </div>
//   );
// }




import { useRef, useState } from "react";
import clsx from "clsx";
import { FiUpload, FiX, FiFile, FiLoader, FiAlertCircle } from "react-icons/fi";

// ── Client-side image compression ──
// Vendors/officers upload straight from a phone camera, which routinely produces
// 3-10MB photos at 3000-4000px wide. Resizing to a sane max dimension and re-encoding as
// a moderate-quality JPEG in-browser (via <canvas>) cuts that size by roughly 10-20x for a
// typical camera photo, with no visible quality loss for an ID/address-proof document.
// However: the ORIGINAL file selected is still capped at MAX_FILE_SIZE_MB regardless of
// whether it could be compressed — an original that's already over this cap is rejected
// immediately, before compression is even attempted, rather than silently compressing a
// very large file down. This applies to images and PDFs alike.
const MAX_IMAGE_DIMENSION = 1600; // px, longer side — plenty for a legible document scan/photo
const IMAGE_QUALITY = 0.75; // JPEG quality (0-1) — visually near-lossless for this use case
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

function compressImageFile(file) {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;
      const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(width, height));
      width = Math.round(width * scale);
      height = Math.round(height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(objectUrl);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file); // compression failed for some reason — fall back to the original
            return;
          }
          // Re-encoding as JPEG regardless of original format (png/webp/jpeg) — documents
          // don't need transparency, and JPEG gives the best size/quality trade-off here.
          const compressedName = file.name.replace(/\.\w+$/, "") + ".jpg";
          resolve(new File([blob], compressedName, { type: "image/jpeg", lastModified: Date.now() }));
        },
        "image/jpeg",
        IMAGE_QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file); // fall back to the original file if it can't be decoded as an image
    };

    img.src = objectUrl;
  });
}

export default function FileUpload({ label, required, hint, value, onChange, error }) {
  const inputRef = useRef(null);
  const [sizeError, setSizeError] = useState("");
  const [compressing, setCompressing] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset immediately so picking the same file again still fires onChange
    if (!file) return;

    setSizeError("");

    // ── Reject an oversized ORIGINAL immediately — before attempting compression at all.
    // This applies to both images and PDFs: a person shouldn't be able to pick a 40MB photo
    // and have it silently compressed down; over the cap means "choose a different file",
    // full stop. ──
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setSizeError(`This file is ${(file.size / (1024 * 1024)).toFixed(1)}MB — please choose one under ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    let finalFile = file;
    if (file.type.startsWith("image/")) {
      setCompressing(true);
      finalFile = await compressImageFile(file);
      setCompressing(false);
      // ── Temporary console log so the actual before/after size is easy to verify in
      // DevTools (Console tab) without having to inspect the network request payload.
      // Safe to remove later — purely informational, doesn't affect functionality. ──
      console.log(
        `[FileUpload] "${file.name}": ${(file.size / 1024).toFixed(0)} KB → ${(finalFile.size / 1024).toFixed(0)} KB ` +
          `(${(file.size / finalFile.size).toFixed(1)}x smaller)`
      );
    }

    const url = URL.createObjectURL(finalFile);
    // IMPORTANT: keep the raw File object too (`file`) — it's what actually needs to be
    // sent to the backend. `name`/`url`/`type` are only for the on-screen preview.
    onChange({ name: finalFile.name, url, type: finalFile.type, file: finalFile });
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
          error || sizeError ? "border-danger-300" : "border-ink-100 hover:border-brand-300"
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
              disabled={compressing}
              className="border-t border-ink-100 bg-white py-2 text-center text-xs font-semibold text-brand-600 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {compressing ? (
                <span className="inline-flex items-center gap-1.5">
                  <FiLoader size={12} className="animate-spin" /> Compressing...
                </span>
              ) : (
                "Change File"
              )}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={compressing}
            className="flex h-28 flex-col items-center justify-center gap-1.5 text-ink-400 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {compressing ? (
              <>
                <FiLoader size={20} className="animate-spin" />
                <span className="text-xs font-medium">Compressing...</span>
              </>
            ) : (
              <>
                <FiUpload size={20} />
                <span className="text-xs font-medium">Click to upload</span>
              </>
            )}
          </button>
        )}
        <input ref={inputRef} type="file" className="hidden" accept="image/*,.pdf" onChange={handleFile} />
      </div>
      {hint && <span className="mt-1 block text-[11px] text-ink-500">{hint}</span>}
      {error && <span className="mt-1 block text-[11px] font-medium text-danger-500">{error}</span>}
      {sizeError && (
        <div className="mt-1.5 flex items-start gap-1.5 rounded-lg border border-danger-200 bg-danger-50 px-2.5 py-2">
          <FiAlertCircle size={13} className="mt-0.5 shrink-0 text-danger-500" />
          <span className="text-[11.5px] font-medium leading-snug text-danger-600">{sizeError}</span>
        </div>
      )}
    </div>
  );
}