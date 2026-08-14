// // // // // // // import { useState } from "react";
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import { Rocket, LogIn, Store } from "lucide-react";

// // // // // // // import backgroundLanding from "../../assets/backgroundlanding.png";
// // // // // // // import nalasoparaImg from "../../assets/nalasopara.png";
// // // // // // // import vasaiImg from "../../assets/vasai.png";
// // // // // // // import virarImg from "../../assets/virar1.png";
// // // // // // // import vendorIdCard from "../../assets/vendorid1.png";
// // // // // // // import corpLogo from "../../assets/logovvcmc.jpg";
// // // // // // // import mayorImg from "../../assets/ajivsir7.jpeg";
// // // // // // // import deputyMayorImg from "../../assets/dcm.jpg";
// // // // // // // import commissionerImg from "../../assets/commissioner.jpg";
// // // // // // // import addlCommissionerImg from "../../assets/cm1.png";

// // // // // // // // ── Brand tokens ──
// // // // // // // const TEAL = "#084449"; // primary
// // // // // // // const GOLD = "#D98219"; // accent
// // // // // // // const CREAM = "#FEFCF8"; // background

// // // // // // // const OFFICIALS = [
// // // // // // //   {
// // // // // // //     name: "Shri. Ajeev Patil",
// // // // // // //     designation: ["Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// // // // // // //     photo: mayorImg,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     name: "Marshal Lopes",
// // // // // // //     designation: ["Deputy Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// // // // // // //     photo: deputyMayorImg,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     name: "Shri. Prithviraj B.P. (IAS)",
// // // // // // //     designation: ["Commissioner,", "Vasai-Virar City", "Municipal Corporation"],
// // // // // // //     photo: commissionerImg,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     name: "Shri. Vijay Patil",
// // // // // // //     designation: ["Additional Commissioner,", "Vasai-Virar City Municipal", "Corporation"],
// // // // // // //     photo: addlCommissionerImg,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     name: "Shri. Sunil Pawar",
// // // // // // //     designation: ["Joint Commissioner,", "Vasai-Virar City Municipal", "Corporation"],
// // // // // // //     photo: null, // photo not available yet — shows initials instead
// // // // // // //   },
// // // // // // // ];

// // // // // // // /* ── Language switcher — top right pill ── */
// // // // // // // function LanguageSwitcher() {
// // // // // // //   const [lang, setLang] = useState("mr");
// // // // // // //   return (
// // // // // // //     <div
// // // // // // //       className="inline-flex items-center gap-1 rounded-full border bg-white/95 p-1.5 shadow-md backdrop-blur-sm"
// // // // // // //       style={{ borderColor: GOLD }}
// // // // // // //     >
// // // // // // //       <button
// // // // // // //         type="button"
// // // // // // //         onClick={() => setLang("mr")}
// // // // // // //         className="rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200"
// // // // // // //         style={lang === "mr" ? { backgroundColor: TEAL, color: "#fff" } : { color: TEAL }}
// // // // // // //       >
// // // // // // //         मराठी
// // // // // // //       </button>
// // // // // // //       <button
// // // // // // //         type="button"
// // // // // // //         onClick={() => setLang("en")}
// // // // // // //         className="rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200"
// // // // // // //         style={lang === "en" ? { backgroundColor: TEAL, color: "#fff" } : { color: TEAL }}
// // // // // // //       >
// // // // // // //         English
// // // // // // //       </button>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // /* ── Main heading ── */
// // // // // // // function BrandHeader() {
// // // // // // //   return (
// // // // // // //     <div className="text-center">
// // // // // // //       <h1
// // // // // // //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
// // // // // // //         style={{ color: TEAL }}
// // // // // // //       >
// // // // // // //         Vasai Virar City
// // // // // // //       </h1>
// // // // // // //       <h2
// // // // // // //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3rem]"
// // // // // // //         style={{ color: GOLD }}
// // // // // // //       >
// // // // // // //         Municipal Corporation
// // // // // // //       </h2>
// // // // // // //       <div className="mt-3 flex items-center justify-center gap-2">
// // // // // // //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// // // // // // //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// // // // // // //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// // // // // // //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // /* ── System banner ── */
// // // // // // // function SystemBanner() {
// // // // // // //   return (
// // // // // // //     <div className="flex items-center justify-center gap-3">
// // // // // // //       <span className="hidden text-2xl sm:inline" style={{ color: GOLD }}>
// // // // // // //         🌿
// // // // // // //       </span>
// // // // // // //       <div
// // // // // // //         className="flex w-full max-w-[560px] items-center justify-center gap-3 rounded-full border-2 px-7 py-3 shadow-lg sm:px-8"
// // // // // // //         style={{ backgroundColor: TEAL, borderColor: GOLD }}
// // // // // // //       >
// // // // // // //         <Store className="shrink-0 text-white" size={22} />
// // // // // // //         <span className="whitespace-nowrap text-base font-bold text-white sm:text-lg">
// // // // // // //           Street Vendors Management System
// // // // // // //         </span>
// // // // // // //       </div>
// // // // // // //       <span className="hidden text-2xl sm:inline" style={{ color: GOLD }}>
// // // // // // //         🌿
// // // // // // //       </span>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // /* ── Action buttons ── */
// // // // // // // function ActionButtons() {
// // // // // // //   const navigate = useNavigate();
// // // // // // //   return (
// // // // // // //     <div className="flex flex-wrap items-center justify-center gap-4">
// // // // // // //       <button
// // // // // // //         type="button"
// // // // // // //         onClick={() => navigate("/vendors/register")}
// // // // // // //         className="flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-bold text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:text-base"
// // // // // // //         style={{ backgroundColor: TEAL }}
// // // // // // //       >
// // // // // // //         <Rocket size={18} /> New Registration
// // // // // // //       </button>
// // // // // // //       <button
// // // // // // //         type="button"
// // // // // // //         onClick={() => navigate("/login")}
// // // // // // //         className="flex h-12 items-center gap-2 rounded-xl border-2 px-6 text-sm font-bold shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md sm:text-base"
// // // // // // //         style={{ backgroundColor: CREAM, borderColor: GOLD, color: GOLD }}
// // // // // // //       >
// // // // // // //         <LogIn size={18} /> Login
// // // // // // //       </button>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // /* ── Diamond-shaped location image ── */
// // // // // // // function LocationImage({ src, alt, size = 190 }) {
// // // // // // //   return (
// // // // // // //     <div style={{ width: size, height: size }}>
// // // // // // //       <div
// // // // // // //         className="h-full w-full rotate-45 overflow-hidden rounded-2xl border-4 shadow-lg"
// // // // // // //         style={{ borderColor: TEAL }}
// // // // // // //       >
// // // // // // //         <img
// // // // // // //           src={src}
// // // // // // //           alt={alt}
// // // // // // //           className="h-full w-full -rotate-45 object-cover"
// // // // // // //           style={{ transform: "scale(1.18) rotate(-45deg)" }}
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // /* ── One official's circular profile ── */
// // // // // // // function OfficialProfile({ name, designation, photo }) {
// // // // // // //   const initials = name
// // // // // // //     .replace("Shri.", "")
// // // // // // //     .trim()
// // // // // // //     .split(" ")
// // // // // // //     .map((w) => w[0])
// // // // // // //     .slice(0, 2)
// // // // // // //     .join("");

// // // // // // //   return (
// // // // // // //     <div className="flex w-[110px] flex-col items-center text-center sm:w-[135px]">
// // // // // // //       <div
// // // // // // //         className="h-[90px] w-[90px] shrink-0 overflow-hidden rounded-full border-[3px] shadow-md sm:h-[105px] sm:w-[105px]"
// // // // // // //         style={{ borderColor: GOLD }}
// // // // // // //       >
// // // // // // //         {photo ? (
// // // // // // //           <img src={photo} alt={name} className="h-full w-full object-cover" />
// // // // // // //         ) : (
// // // // // // //           <div
// // // // // // //             className="flex h-full w-full items-center justify-center text-lg font-bold"
// // // // // // //             style={{ backgroundColor: "#F3E6D0", color: TEAL }}
// // // // // // //           >
// // // // // // //             {initials}
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //       <p className="mt-2 text-[13px] font-extrabold leading-tight" style={{ color: TEAL }}>
// // // // // // //         {name}
// // // // // // //       </p>
// // // // // // //       {designation.map((line, i) => (
// // // // // // //         <p key={i} className="text-[10.5px] font-bold leading-tight" style={{ color: GOLD }}>
// // // // // // //           {line}
// // // // // // //         </p>
// // // // // // //       ))}
// // // // // // //       {!photo && <p className="mt-1 text-[9px] font-medium italic text-ink-400">Photo needed</p>}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // /* ================= MAIN LANDING PAGE ================= */
// // // // // // // export default function Branding() {
// // // // // // //   return (
// // // // // // //     <div
// // // // // // //       className="relative h-screen overflow-hidden bg-cover bg-center"
// // // // // // //       style={{ backgroundColor: CREAM, backgroundImage: `url(${backgroundLanding})` }}
// // // // // // //     >
// // // // // // //       {/* Layer 1 — Identity card watermark (behind everything) */}
// // // // // // //       <img
// // // // // // //         src={vendorIdCard}
// // // // // // //         alt=""
// // // // // // //         aria-hidden="true"
// // // // // // //         className="pointer-events-none absolute right-[6%] top-1/2 z-0 hidden w-[360px] -translate-y-1/2 rotate-6 opacity-[0.07] lg:block xl:w-[420px]"
// // // // // // //       />

// // // // // // //       {/* Layer 2 — Location images (left Nalasopara, right Vasai + Virar) */}
// // // // // // //       <div
// // // // // // //         className="pointer-events-none absolute z-10 hidden lg:block"
// // // // // // //         style={{ left: "11%", top: "34%" }}
// // // // // // //       >
// // // // // // //         <LocationImage src={nalasoparaImg} alt="Nalasopara" size={185} />
// // // // // // //       </div>
// // // // // // //       <div
// // // // // // //         className="pointer-events-none absolute z-10 hidden flex-col gap-8 lg:flex"
// // // // // // //         style={{ right: "6%", top: "16%" }}
// // // // // // //       >
// // // // // // //         <LocationImage src={vasaiImg} alt="Vasai" size={165} />
// // // // // // //         <LocationImage src={virarImg} alt="Virar" size={165} />
// // // // // // //       </div>

// // // // // // //       {/* Layer 3 — Main content */}
// // // // // // //       <div className="relative z-20 flex h-full flex-col overflow-y-auto px-5 py-4 sm:px-8 lg:overflow-hidden lg:px-10">
// // // // // // //         {/* Header row — logo top-left, language switcher top-right */}
// // // // // // //         <div className="flex items-center justify-between">
// // // // // // //           <img
// // // // // // //             src={corpLogo}
// // // // // // //             alt="Vasai Virar City Municipal Corporation"
// // // // // // //             className="h-14 w-14 shrink-0 rounded-full border-2 object-cover shadow-md sm:h-16 sm:w-16"
// // // // // // //             style={{ borderColor: GOLD }}
// // // // // // //           />
// // // // // // //           <LanguageSwitcher />
// // // // // // //         </div>

// // // // // // //         {/* Hero content */}
// // // // // // //         <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 py-2">
// // // // // // //           <BrandHeader />
// // // // // // //           <SystemBanner />

// // // // // // //           <p
// // // // // // //             className="max-w-[620px] text-center text-sm font-medium leading-relaxed sm:text-base"
// // // // // // //             style={{ color: TEAL }}
// // // // // // //           >
// // // // // // //             A comprehensive digital platform for registration, survey, certificate issuance,
// // // // // // //             grievance redressal and welfare of street vendors.
// // // // // // //           </p>

// // // // // // //           <ActionButtons />

// // // // // // //           {/* Mobile / tablet — location images stacked below content */}
// // // // // // //           <div className="mt-2 flex flex-wrap items-center justify-center gap-4 lg:hidden">
// // // // // // //             <LocationImage src={nalasoparaImg} alt="Nalasopara" size={125} />
// // // // // // //             <LocationImage src={vasaiImg} alt="Vasai" size={125} />
// // // // // // //             <LocationImage src={virarImg} alt="Virar" size={125} />
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Officials */}
// // // // // // //         <div className="mt-2 shrink-0 border-t pt-4 pb-1" style={{ borderColor: "rgba(217,130,25,0.25)" }}>
// // // // // // //           <div className="grid grid-cols-2 items-start justify-items-center gap-y-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-6">
// // // // // // //             {OFFICIALS.map((o) => (
// // // // // // //               <OfficialProfile key={o.name} {...o} />
// // // // // // //             ))}
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }




// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import { LogIn, Store } from "lucide-react";

// // // // // // import backgroundLanding from "../../assets/backgroundlanding.png";
// // // // // // import nalasoparaImg from "../../assets/nalasopara.png";
// // // // // // import vasaiImg from "../../assets/vasai.png";
// // // // // // import virarImg from "../../assets/virar1.png";
// // // // // // import vendorIdCard from "../../assets/vendorid1.png";
// // // // // // import corpLogo from "../../assets/logovvcmc.jpg";
// // // // // // import mayorImg from "../../assets/ajivsir7.jpeg";
// // // // // // import deputyMayorImg from "../../assets/dcm.jpg";
// // // // // // import commissionerImg from "../../assets/commissioner.jpg";

// // // // // // // ── Brand tokens ──
// // // // // // const TEAL = "#084449"; // primary
// // // // // // const GOLD = "#D98219"; // accent
// // // // // // const CREAM = "#FEFCF8"; // background

// // // // // // const OFFICIALS = [
// // // // // //   {
// // // // // //     name: "Shri. Ajeev Patil",
// // // // // //     designation: ["Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// // // // // //     photo: mayorImg,
// // // // // //   },
// // // // // //   {
// // // // // //     name: "Marshal Lopes",
// // // // // //     designation: ["Deputy Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// // // // // //     photo: deputyMayorImg,
// // // // // //   },
// // // // // //   {
// // // // // //     name: "Shri. Prithviraj B.P. (IAS)",
// // // // // //     designation: ["Commissioner,", "Vasai-Virar City", "Municipal Corporation"],
// // // // // //     photo: commissionerImg,
// // // // // //   },
// // // // // // ];

// // // // // // /* ── Main heading ── */
// // // // // // function BrandHeader() {
// // // // // //   return (
// // // // // //     <div className="text-center">
// // // // // //       <h1
// // // // // //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
// // // // // //         style={{ color: TEAL }}
// // // // // //       >
// // // // // //         Vasai Virar City
// // // // // //       </h1>
// // // // // //       <h2
// // // // // //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3rem]"
// // // // // //         style={{ color: GOLD }}
// // // // // //       >
// // // // // //         Municipal Corporation
// // // // // //       </h2>
// // // // // //       <div className="mt-3 flex items-center justify-center gap-2">
// // // // // //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// // // // // //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// // // // // //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// // // // // //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // /* ── System banner ── */
// // // // // // function SystemBanner() {
// // // // // //   return (
// // // // // //     <div className="flex items-center justify-center">
// // // // // //       <div
// // // // // //         className="flex w-full max-w-[560px] items-center justify-center gap-3 rounded-full border-2 px-7 py-3 shadow-lg sm:px-8"
// // // // // //         style={{ backgroundColor: TEAL, borderColor: GOLD }}
// // // // // //       >
// // // // // //         <Store className="shrink-0 text-white" size={22} />
// // // // // //         <span className="whitespace-nowrap text-base font-bold text-white sm:text-lg">
// // // // // //           Street Vendors Management System
// // // // // //         </span>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // /* ── Action button (Login only) ── */
// // // // // // function ActionButtons() {
// // // // // //   const navigate = useNavigate();
// // // // // //   return (
// // // // // //     <div className="flex items-center justify-center">
// // // // // //       <button
// // // // // //         type="button"
// // // // // //         onClick={() => navigate("/login")}
// // // // // //         className="flex h-12 items-center gap-2 rounded-xl border-2 px-8 text-sm font-bold shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md sm:text-base"
// // // // // //         style={{ backgroundColor: CREAM, borderColor: GOLD, color: GOLD }}
// // // // // //       >
// // // // // //         <LogIn size={18} /> Login
// // // // // //       </button>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // /* ── Diamond-shaped location image — clip-path based, image NEVER rotated
// // // // // //      so the sign's text always stays perfectly upright/straight. ── */
// // // // // // const DIAMOND_CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

// // // // // // function LocationImage({ src, alt, size = 190 }) {
// // // // // //   return (
// // // // // //     <div className="relative shrink-0" style={{ width: size, height: size }}>
// // // // // //       <div
// // // // // //         className="h-full w-full overflow-hidden shadow-lg"
// // // // // //         style={{ clipPath: DIAMOND_CLIP }}
// // // // // //       >
// // // // // //         <img src={src} alt={alt} className="h-full w-full object-cover" />
// // // // // //       </div>
// // // // // //       {/* Diamond outline drawn separately so the border traces the diamond edges cleanly */}
// // // // // //       <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
// // // // // //         <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke={TEAL} strokeWidth="4" strokeLinejoin="round" />
// // // // // //       </svg>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // /* ── One official's circular profile ── */
// // // // // // function OfficialProfile({ name, designation, photo }) {
// // // // // //   return (
// // // // // //     <div className="flex w-[130px] flex-col items-center text-center sm:w-[155px]">
// // // // // //       <div
// // // // // //         className="h-[105px] w-[105px] shrink-0 overflow-hidden rounded-full border-4 shadow-md sm:h-[120px] sm:w-[120px]"
// // // // // //         style={{ borderColor: GOLD }}
// // // // // //       >
// // // // // //         <img src={photo} alt={name} className="h-full w-full object-cover object-top" />
// // // // // //       </div>
// // // // // //       <p className="mt-2.5 text-sm font-extrabold leading-tight sm:text-[15px]" style={{ color: TEAL }}>
// // // // // //         {name}
// // // // // //       </p>
// // // // // //       {designation.map((line, i) => (
// // // // // //         <p key={i} className="text-[11px] font-bold leading-tight sm:text-xs" style={{ color: GOLD }}>
// // // // // //           {line}
// // // // // //         </p>
// // // // // //       ))}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // /* ================= MAIN LANDING PAGE ================= */
// // // // // // export default function Branding() {
// // // // // //   return (
// // // // // //     <div
// // // // // //       className="relative h-screen overflow-hidden bg-cover bg-center"
// // // // // //       style={{ backgroundColor: CREAM, backgroundImage: `url(${backgroundLanding})` }}
// // // // // //     >
// // // // // //       {/* Layer 1 — Identity card watermark (behind everything, fully visible but faded) */}
// // // // // //       <img
// // // // // //         src={vendorIdCard}
// // // // // //         alt=""
// // // // // //         aria-hidden="true"
// // // // // //         className="pointer-events-none absolute right-4 top-1/2 z-0 hidden w-[320px] -translate-y-1/2 rotate-6 opacity-[0.13] sm:right-8 lg:block xl:w-[380px]"
// // // // // //       />

// // // // // //       {/* Layer 2 — Location images (left Nalasopara, right Vasai + Virar) */}
// // // // // //       <div
// // // // // //         className="pointer-events-none absolute z-10 hidden lg:block"
// // // // // //         style={{ left: "11%", top: "34%" }}
// // // // // //       >
// // // // // //         <LocationImage src={nalasoparaImg} alt="Nalasopara" size={185} />
// // // // // //       </div>
// // // // // //       <div
// // // // // //         className="pointer-events-none absolute z-10 hidden flex-col gap-8 lg:flex"
// // // // // //         style={{ right: "6%", top: "26%" }}
// // // // // //       >
// // // // // //         <LocationImage src={vasaiImg} alt="Vasai" size={165} />
// // // // // //         <LocationImage src={virarImg} alt="Virar" size={165} />
// // // // // //       </div>

// // // // // //       {/* Layer 3 — Main content */}
// // // // // //       <div className="relative z-20 flex h-full flex-col overflow-y-auto px-5 py-4 sm:px-8 lg:overflow-hidden lg:px-10">
// // // // // //         {/* Header row — logo top-left */}
// // // // // //         <div className="flex items-center">
// // // // // //           <img
// // // // // //             src={corpLogo}
// // // // // //             alt="Vasai Virar City Municipal Corporation"
// // // // // //             className="h-24 w-24 shrink-0 rounded-full object-cover shadow-lg sm:h-28 sm:w-28"
// // // // // //           />
// // // // // //         </div>

// // // // // //         {/* Hero content */}
// // // // // //         <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 py-2">
// // // // // //           <BrandHeader />
// // // // // //           <SystemBanner />

// // // // // //           <p
// // // // // //             className="max-w-[620px] text-center text-sm font-medium leading-relaxed sm:text-base"
// // // // // //             style={{ color: TEAL }}
// // // // // //           >
// // // // // //             A comprehensive digital platform for registration, survey, certificate issuance,
// // // // // //             grievance redressal and welfare of street vendors.
// // // // // //           </p>

// // // // // //           <ActionButtons />

// // // // // //           {/* Mobile / tablet — location images stacked below content */}
// // // // // //           <div className="mt-2 flex flex-wrap items-center justify-center gap-4 lg:hidden">
// // // // // //             <LocationImage src={nalasoparaImg} alt="Nalasopara" size={125} />
// // // // // //             <LocationImage src={vasaiImg} alt="Vasai" size={125} />
// // // // // //             <LocationImage src={virarImg} alt="Virar" size={125} />
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Officials */}
// // // // // //         <div className="mt-2 shrink-0 border-t pt-4 pb-1" style={{ borderColor: "rgba(217,130,25,0.25)" }}>
// // // // // //           <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-4">
// // // // // //             {OFFICIALS.map((o) => (
// // // // // //               <OfficialProfile key={o.name} {...o} />
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // import { useNavigate } from "react-router-dom";
// // // // // import { LogIn, Store } from "lucide-react";

// // // // // import backgroundLanding from "../../assets/backgroundlanding.png";
// // // // // import nalasoparaImg from "../../assets/nalasopara.png";
// // // // // import vasaiImg from "../../assets/vasai.png";
// // // // // import virarImg from "../../assets/virar1.png";
// // // // // import vendorIdCard from "../../assets/vendorid1.png";
// // // // // import corpLogo from "../../assets/logovvcmc.jpg";
// // // // // import mayorImg from "../../assets/ajivsir7.jpeg";
// // // // // import deputyMayorImg from "../../assets/dcm.jpg";
// // // // // import commissionerImg from "../../assets/commissioner.jpg";

// // // // // // ── Brand tokens ──
// // // // // const TEAL = "#084449"; // primary
// // // // // const GOLD = "#D98219"; // accent
// // // // // const CREAM = "#FEFCF8"; // background

// // // // // const OFFICIALS = [
// // // // //   {
// // // // //     name: "Shri. Ajeev Patil",
// // // // //     designation: ["Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// // // // //     photo: mayorImg,
// // // // //   },
// // // // //   {
// // // // //     name: "Marshal Lopes",
// // // // //     designation: ["Deputy Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// // // // //     photo: deputyMayorImg,
// // // // //   },
// // // // //   {
// // // // //     name: "Shri. Prithviraj B.P. (IAS)",
// // // // //     designation: ["Commissioner,", "Vasai-Virar City", "Municipal Corporation"],
// // // // //     photo: commissionerImg,
// // // // //   },
// // // // // ];

// // // // // /* ── Main heading ── */
// // // // // function BrandHeader() {
// // // // //   return (
// // // // //     <div className="text-center">
// // // // //       <h1
// // // // //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
// // // // //         style={{ color: TEAL }}
// // // // //       >
// // // // //         Vasai Virar City
// // // // //       </h1>
// // // // //       <h2
// // // // //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3rem]"
// // // // //         style={{ color: GOLD }}
// // // // //       >
// // // // //         Municipal Corporation
// // // // //       </h2>
// // // // //       <div className="mt-3 flex items-center justify-center gap-2">
// // // // //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// // // // //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// // // // //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// // // // //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* ── System banner ── */
// // // // // function SystemBanner() {
// // // // //   return (
// // // // //     <div className="flex items-center justify-center">
// // // // //       <div
// // // // //         className="flex w-full max-w-[560px] items-center justify-center gap-3 rounded-full border-2 px-7 py-3 shadow-lg sm:px-8"
// // // // //         style={{ backgroundColor: TEAL, borderColor: GOLD }}
// // // // //       >
// // // // //         <Store className="shrink-0 text-white" size={22} />
// // // // //         <span className="whitespace-nowrap text-base font-bold text-white sm:text-lg">
// // // // //           Street Vendors Management System
// // // // //         </span>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* ── Action button (Login only) ── */
// // // // // function ActionButtons() {
// // // // //   const navigate = useNavigate();
// // // // //   return (
// // // // //     <div className="flex items-center justify-center">
// // // // //       <button
// // // // //         type="button"
// // // // //         onClick={() => navigate("/login")}
// // // // //         className="flex h-12 items-center gap-2 rounded-xl border-2 px-8 text-sm font-bold shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md sm:text-base"
// // // // //         style={{ backgroundColor: CREAM, borderColor: GOLD, color: GOLD }}
// // // // //       >
// // // // //         <LogIn size={18} /> Login
// // // // //       </button>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* ── Diamond-shaped location image — clip-path based, image NEVER rotated
// // // // //      so the sign's text always stays perfectly upright/straight. ── */
// // // // // const DIAMOND_CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

// // // // // function LocationImage({ src, alt, size = 190 }) {
// // // // //   return (
// // // // //     <div className="relative shrink-0" style={{ width: size, height: size }}>
// // // // //       <div
// // // // //         className="h-full w-full overflow-hidden shadow-lg"
// // // // //         style={{ clipPath: DIAMOND_CLIP }}
// // // // //       >
// // // // //         <img src={src} alt={alt} className="h-full w-full object-cover" />
// // // // //       </div>
// // // // //       {/* Diamond outline drawn separately so the border traces the diamond edges cleanly */}
// // // // //       <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
// // // // //         <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke={TEAL} strokeWidth="4" strokeLinejoin="round" />
// // // // //       </svg>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* ── One official's circular profile ── */
// // // // // function OfficialProfile({ name, designation, photo }) {
// // // // //   return (
// // // // //     <div className="flex w-[150px] flex-col items-center text-center sm:w-[175px]">
// // // // //       <div
// // // // //         className="h-[125px] w-[125px] shrink-0 overflow-hidden rounded-full border-4 shadow-md sm:h-[145px] sm:w-[145px]"
// // // // //         style={{ borderColor: GOLD }}
// // // // //       >
// // // // //         <img src={photo} alt={name} className="h-full w-full object-cover object-top" />
// // // // //       </div>
// // // // //       <p className="mt-3 text-base font-extrabold leading-tight sm:text-lg" style={{ color: TEAL }}>
// // // // //         {name}
// // // // //       </p>
// // // // //       {designation.map((line, i) => (
// // // // //         <p key={i} className="text-xs font-bold leading-tight sm:text-sm" style={{ color: GOLD }}>
// // // // //           {line}
// // // // //         </p>
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* ================= MAIN LANDING PAGE ================= */
// // // // // export default function Branding() {
// // // // //   return (
// // // // //     <div
// // // // //       className="relative h-screen overflow-hidden bg-cover bg-center"
// // // // //       style={{ backgroundColor: CREAM, backgroundImage: `url(${backgroundLanding})` }}
// // // // //     >
// // // // //       {/* Layer 1 — Identity card watermark (behind everything, fully visible but faded) */}
// // // // //       <img
// // // // //         src={vendorIdCard}
// // // // //         alt=""
// // // // //         aria-hidden="true"
// // // // //         className="pointer-events-none absolute right-4 top-1/2 z-0 hidden w-[320px] -translate-y-1/2 rotate-6 opacity-[0.13] sm:right-8 lg:block xl:w-[380px]"
// // // // //       />

// // // // //       {/* Layer 2 — Location images (left Nalasopara, right Vasai + Virar) */}
// // // // //       <div
// // // // //         className="pointer-events-none absolute z-10 hidden lg:block"
// // // // //         style={{ left: "11%", top: "34%" }}
// // // // //       >
// // // // //         <LocationImage src={nalasoparaImg} alt="Nalasopara" size={185} />
// // // // //       </div>
// // // // //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ right: "26%", top: "72%" }}>
// // // // //         <LocationImage src={vasaiImg} alt="Vasai" size={155} />
// // // // //       </div>
// // // // //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ right: "6%", top: "48%" }}>
// // // // //         <LocationImage src={virarImg} alt="Virar" size={165} />
// // // // //       </div>

// // // // //       {/* Layer 3 — Main content */}
// // // // //       <div className="relative z-20 flex h-full flex-col overflow-y-auto px-5 py-4 sm:px-8 lg:overflow-hidden lg:px-10">
// // // // //         {/* Header row — logo top-left */}
// // // // //         <div className="flex items-center">
// // // // //           <img
// // // // //             src={corpLogo}
// // // // //             alt="Vasai Virar City Municipal Corporation"
// // // // //             className="h-24 w-24 shrink-0 rounded-full object-cover shadow-lg sm:h-28 sm:w-28"
// // // // //           />
// // // // //         </div>

// // // // //         {/* Hero content */}
// // // // //         <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 py-2">
// // // // //           <BrandHeader />
// // // // //           <SystemBanner />

// // // // //           <p
// // // // //             className="max-w-[620px] text-center text-sm font-medium leading-relaxed sm:text-base"
// // // // //             style={{ color: TEAL }}
// // // // //           >
// // // // //             A comprehensive digital platform for registration, survey, certificate issuance,
// // // // //             grievance redressal and welfare of street vendors.
// // // // //           </p>

// // // // //           <ActionButtons />

// // // // //           {/* Mobile / tablet — location images stacked below content */}
// // // // //           <div className="mt-2 flex flex-wrap items-center justify-center gap-4 lg:hidden">
// // // // //             <LocationImage src={nalasoparaImg} alt="Nalasopara" size={125} />
// // // // //             <LocationImage src={vasaiImg} alt="Vasai" size={125} />
// // // // //             <LocationImage src={virarImg} alt="Virar" size={125} />
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Officials */}
// // // // //         <div className="mt-2 shrink-0 border-t pt-4 pb-1" style={{ borderColor: "rgba(217,130,25,0.25)" }}>
// // // // //           <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-4">
// // // // //             {OFFICIALS.map((o) => (
// // // // //               <OfficialProfile key={o.name} {...o} />
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }



// // // // import { useNavigate } from "react-router-dom";
// // // // import { LogIn, Store } from "lucide-react";

// // // // import backgroundLanding from "../../assets/backgroundlanding.png";
// // // // import nalasoparaImg from "../../assets/nalasopara.png";
// // // // import vasaiImg from "../../assets/vasai.png";
// // // // import virarImg from "../../assets/virar1.png";
// // // // import vendorIdCard from "../../assets/vendorid1.png";
// // // // import corpLogo from "../../assets/logovvcmc.jpg";
// // // // import mayorImg from "../../assets/ajivsir7.jpeg";
// // // // import deputyMayorImg from "../../assets/dcm.jpg";
// // // // import commissionerImg from "../../assets/commissioner.jpg";

// // // // // ── Brand tokens ──
// // // // const TEAL = "#084449"; // primary
// // // // const GOLD = "#D98219"; // accent
// // // // const CREAM = "#FEFCF8"; // background

// // // // const OFFICIALS = [
// // // //   {
// // // //     name: "Shri. Ajeev Patil",
// // // //     designation: ["Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// // // //     photo: mayorImg,
// // // //   },
// // // //   {
// // // //     name: "Marshal Lopes",
// // // //     designation: ["Deputy Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// // // //     photo: deputyMayorImg,
// // // //   },
// // // //   {
// // // //     name: "Shri. Prithviraj B.P. (IAS)",
// // // //     designation: ["Commissioner,", "Vasai-Virar City", "Municipal Corporation"],
// // // //     photo: commissionerImg,
// // // //   },
// // // // ];

// // // // /* ── Main heading ── */
// // // // function BrandHeader() {
// // // //   return (
// // // //     <div className="text-center">
// // // //       <h1
// // // //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
// // // //         style={{ color: TEAL }}
// // // //       >
// // // //         Vasai Virar City
// // // //       </h1>
// // // //       <h2
// // // //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3rem]"
// // // //         style={{ color: GOLD }}
// // // //       >
// // // //         Municipal Corporation
// // // //       </h2>
// // // //       <div className="mt-3 flex items-center justify-center gap-2">
// // // //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// // // //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// // // //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// // // //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ── System banner ── */
// // // // function SystemBanner() {
// // // //   return (
// // // //     <div className="flex items-center justify-center">
// // // //       <div
// // // //         className="flex w-full max-w-[560px] items-center justify-center gap-3 rounded-full border-2 px-7 py-3 shadow-lg sm:px-8"
// // // //         style={{ backgroundColor: TEAL, borderColor: GOLD }}
// // // //       >
// // // //         <Store className="shrink-0 text-white" size={22} />
// // // //         <span className="whitespace-nowrap text-base font-bold text-white sm:text-lg">
// // // //           Street Vendors Management System
// // // //         </span>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ── Action button (Login only) ── */
// // // // function ActionButtons() {
// // // //   const navigate = useNavigate();
// // // //   return (
// // // //     <div className="flex items-center justify-center">
// // // //       <button
// // // //         type="button"
// // // //         onClick={() => navigate("/login")}
// // // //         className="flex h-12 items-center gap-2 rounded-xl border-2 px-8 text-sm font-bold shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md sm:text-base"
// // // //         style={{ backgroundColor: CREAM, borderColor: GOLD, color: GOLD }}
// // // //       >
// // // //         <LogIn size={18} /> Login
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ── Diamond-shaped location image — clip-path based, image NEVER rotated
// // // //      so the sign's text always stays perfectly upright/straight. ── */
// // // // const DIAMOND_CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

// // // // function LocationImage({ src, alt, size = 190 }) {
// // // //   return (
// // // //     <div className="relative shrink-0" style={{ width: size, height: size }}>
// // // //       <div
// // // //         className="h-full w-full overflow-hidden shadow-lg"
// // // //         style={{ clipPath: DIAMOND_CLIP }}
// // // //       >
// // // //         <img src={src} alt={alt} className="h-full w-full object-cover" />
// // // //       </div>
// // // //       {/* Diamond outline drawn separately so the border traces the diamond edges cleanly */}
// // // //       <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
// // // //         <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke={TEAL} strokeWidth="4" strokeLinejoin="round" />
// // // //       </svg>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ── One official's circular profile ── */
// // // // function OfficialProfile({ name, designation, photo }) {
// // // //   return (
// // // //     <div className="flex w-[150px] flex-col items-center text-center sm:w-[175px]">
// // // //       <div
// // // //         className="h-[125px] w-[125px] shrink-0 overflow-hidden rounded-full border-4 shadow-md sm:h-[145px] sm:w-[145px]"
// // // //         style={{ borderColor: GOLD }}
// // // //       >
// // // //         <img src={photo} alt={name} className="h-full w-full object-cover object-top" />
// // // //       </div>
// // // //       <p className="mt-3 text-base font-extrabold leading-tight sm:text-lg" style={{ color: TEAL }}>
// // // //         {name}
// // // //       </p>
// // // //       {designation.map((line, i) => (
// // // //         <p key={i} className="text-xs font-bold leading-tight sm:text-sm" style={{ color: GOLD }}>
// // // //           {line}
// // // //         </p>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ================= MAIN LANDING PAGE ================= */
// // // // export default function Branding() {
// // // //   return (
// // // //     <div
// // // //       className="relative h-screen overflow-hidden bg-cover bg-center"
// // // //       style={{ backgroundColor: CREAM, backgroundImage: `url(${backgroundLanding})` }}
// // // //     >
// // // //       {/* Layer 1 — Identity card watermark (behind everything, fully visible but faded) */}
// // // //       <img
// // // //         src={vendorIdCard}
// // // //         alt=""
// // // //         aria-hidden="true"
// // // //         className="pointer-events-none absolute right-4 top-1/2 z-0 hidden w-[320px] -translate-y-1/2 rotate-6 opacity-[0.13] sm:right-8 lg:block xl:w-[380px]"
// // // //       />

// // // //       {/* Layer 2 — Location images (left Nalasopara, right Vasai + Virar) */}
// // // //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ left: "11%", top: "34%" }}>
// // // //         <LocationImage src={nalasoparaImg} alt="Nalasopara" size={185} />
// // // //       </div>
// // // //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ left: "9%", top: "64%" }}>
// // // //         <LocationImage src={vasaiImg} alt="Vasai" size={155} />
// // // //       </div>
// // // //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ right: "6%", top: "48%" }}>
// // // //         <LocationImage src={virarImg} alt="Virar" size={165} />
// // // //       </div>

// // // //       {/* Layer 3 — Main content */}
// // // //       <div className="relative z-20 flex h-full flex-col overflow-y-auto px-5 py-4 sm:px-8 lg:overflow-hidden lg:px-10">
// // // //         {/* Header row — logo top-left */}
// // // //         <div className="flex items-center">
// // // //           <img
// // // //             src={corpLogo}
// // // //             alt="Vasai Virar City Municipal Corporation"
// // // //             className="h-24 w-24 shrink-0 rounded-full object-cover shadow-lg sm:h-28 sm:w-28"
// // // //           />
// // // //         </div>

// // // //         {/* Hero content */}
// // // //         <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 py-2">
// // // //           <BrandHeader />
// // // //           <SystemBanner />

// // // //           <p
// // // //             className="max-w-[620px] text-center text-sm font-medium leading-relaxed sm:text-base"
// // // //             style={{ color: TEAL }}
// // // //           >
// // // //             A comprehensive digital platform for registration, survey, certificate issuance,
// // // //             grievance redressal and welfare of street vendors.
// // // //           </p>

// // // //           <ActionButtons />

// // // //           {/* Mobile / tablet — location images stacked below content */}
// // // //           <div className="mt-2 flex flex-wrap items-center justify-center gap-4 lg:hidden">
// // // //             <LocationImage src={nalasoparaImg} alt="Nalasopara" size={125} />
// // // //             <LocationImage src={vasaiImg} alt="Vasai" size={125} />
// // // //             <LocationImage src={virarImg} alt="Virar" size={125} />
// // // //           </div>
// // // //         </div>

// // // //         {/* Officials */}
// // // //         <div className="mt-2 shrink-0 border-t pt-4 pb-1" style={{ borderColor: "rgba(217,130,25,0.25)" }}>
// // // //           <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-4">
// // // //             {OFFICIALS.map((o) => (
// // // //               <OfficialProfile key={o.name} {...o} />
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useNavigate } from "react-router-dom";
// // // import { LogIn, Store } from "lucide-react";

// // // import backgroundLanding from "../../assets/backgroundlanding.png";
// // // import nalasoparaImg from "../../assets/nalasopara.png";
// // // import vasaiImg from "../../assets/vasai.png";
// // // import virarImg from "../../assets/virar1.png";
// // // import vendorIdCard from "../../assets/vendorid1.png";
// // // import corpLogo from "../../assets/logovvcmc.jpg";
// // // import mayorImg from "../../assets/ajivsir7.jpeg";
// // // import deputyMayorImg from "../../assets/dcm.jpg";
// // // import commissionerImg from "../../assets/commissioner.jpg";

// // // // ── Brand tokens ──
// // // const TEAL = "#084449"; // primary
// // // const GOLD = "#D98219"; // accent
// // // const CREAM = "#FEFCF8"; // background

// // // const OFFICIALS = [
// // //   {
// // //     name: "Shri. Ajeev Patil",
// // //     designation: ["Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// // //     photo: mayorImg,
// // //   },
// // //   {
// // //     name: "Marshal Lopes",
// // //     designation: ["Deputy Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// // //     photo: deputyMayorImg,
// // //   },
// // //   {
// // //     name: "Shri. Prithviraj B.P. (IAS)",
// // //     designation: ["Commissioner,", "Vasai-Virar City", "Municipal Corporation"],
// // //     photo: commissionerImg,
// // //   },
// // // ];

// // // /* ── Main heading ── */
// // // function BrandHeader() {
// // //   return (
// // //     <div className="text-center">
// // //       <h1
// // //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
// // //         style={{ color: TEAL }}
// // //       >
// // //         Vasai Virar City
// // //       </h1>
// // //       <h2
// // //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3rem]"
// // //         style={{ color: GOLD }}
// // //       >
// // //         Municipal Corporation
// // //       </h2>
// // //       <div className="mt-3 flex items-center justify-center gap-2">
// // //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// // //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// // //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// // //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ── System banner ── */
// // // function SystemBanner() {
// // //   return (
// // //     <div className="flex items-center justify-center">
// // //       <div
// // //         className="flex w-full max-w-[560px] items-center justify-center gap-3 rounded-full border-2 px-7 py-3 shadow-lg sm:px-8"
// // //         style={{ backgroundColor: TEAL, borderColor: GOLD }}
// // //       >
// // //         <Store className="shrink-0 text-white" size={22} />
// // //         <span className="whitespace-nowrap text-base font-bold text-white sm:text-lg">
// // //           Street Vendors Management System
// // //         </span>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ── Action button (Login only) ── */
// // // function ActionButtons() {
// // //   const navigate = useNavigate();
// // //   return (
// // //     <div className="flex items-center justify-center">
// // //       <button
// // //         type="button"
// // //         onClick={() => navigate("/login")}
// // //         className="flex h-12 items-center gap-2 rounded-xl border-2 px-8 text-sm font-bold shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md sm:text-base"
// // //         style={{ backgroundColor: CREAM, borderColor: GOLD, color: GOLD }}
// // //       >
// // //         <LogIn size={18} /> Login
// // //       </button>
// // //     </div>
// // //   );
// // // }

// // // /* ── Diamond-shaped location image — clip-path based, image NEVER rotated
// // //      so the sign's text always stays perfectly upright/straight. ── */
// // // const DIAMOND_CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

// // // function LocationImage({ src, alt, size = 190, objectPosition = "center" }) {
// // //   return (
// // //     <div className="relative shrink-0" style={{ width: size, height: size }}>
// // //       <div
// // //         className="h-full w-full overflow-hidden shadow-lg"
// // //         style={{ clipPath: DIAMOND_CLIP }}
// // //       >
// // //         <img
// // //           src={src}
// // //           alt={alt}
// // //           className="h-full w-full object-cover"
// // //           style={{ objectPosition }}
// // //         />
// // //       </div>
// // //       {/* Diamond outline drawn separately so the border traces the diamond edges cleanly */}
// // //       <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
// // //         <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke={TEAL} strokeWidth="4" strokeLinejoin="round" />
// // //       </svg>
// // //     </div>
// // //   );
// // // }

// // // /* ── One official's circular profile ── */
// // // function OfficialProfile({ name, designation, photo }) {
// // //   return (
// // //     <div className="flex w-[150px] flex-col items-center text-center sm:w-[175px]">
// // //       <div
// // //         className="h-[125px] w-[125px] shrink-0 overflow-hidden rounded-full border-4 shadow-md sm:h-[145px] sm:w-[145px]"
// // //         style={{ borderColor: GOLD }}
// // //       >
// // //         <img src={photo} alt={name} className="h-full w-full object-cover object-top" />
// // //       </div>
// // //       <p className="mt-3 text-base font-extrabold leading-tight sm:text-lg" style={{ color: TEAL }}>
// // //         {name}
// // //       </p>
// // //       {designation.map((line, i) => (
// // //         <p key={i} className="text-xs font-bold leading-tight sm:text-sm" style={{ color: GOLD }}>
// // //           {line}
// // //         </p>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // /* ================= MAIN LANDING PAGE ================= */
// // // export default function Branding() {
// // //   return (
// // //     <div
// // //       className="relative h-screen overflow-hidden bg-cover bg-center"
// // //       style={{ backgroundColor: CREAM, backgroundImage: `url(${backgroundLanding})` }}
// // //     >
// // //       {/* Layer 1 — Identity card watermark (behind everything, fully visible but faded) */}
// // //       <img
// // //         src={vendorIdCard}
// // //         alt=""
// // //         aria-hidden="true"
// // //         className="pointer-events-none absolute right-4 top-1/2 z-0 hidden w-[320px] -translate-y-1/2 rotate-6 opacity-[0.13] sm:right-8 lg:block xl:w-[380px]"
// // //       />

// // //       {/* Layer 2 — Location images (left Nalasopara, right Vasai + Virar) */}
// // //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ left: "11%", top: "34%" }}>
// // //         <LocationImage src={nalasoparaImg} alt="Nalasopara" size={210} objectPosition="center 42%" />
// // //       </div>
// // //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ left: "9%", top: "64%" }}>
// // //         <LocationImage src={vasaiImg} alt="Vasai" size={155} />
// // //       </div>
// // //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ right: "6%", top: "48%" }}>
// // //         <LocationImage src={virarImg} alt="Virar" size={165} />
// // //       </div>

// // //       {/* Layer 3 — Main content */}
// // //       <div className="relative z-20 flex h-full flex-col overflow-y-auto px-5 py-4 sm:px-8 lg:overflow-hidden lg:px-10">
// // //         {/* Header row — logo top-left */}
// // //         <div className="flex items-center">
// // //           <img
// // //             src={corpLogo}
// // //             alt="Vasai Virar City Municipal Corporation"
// // //             className="h-24 w-24 shrink-0 rounded-full object-cover shadow-lg sm:h-28 sm:w-28"
// // //           />
// // //         </div>

// // //         {/* Hero content */}
// // //         <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 py-2">
// // //           <BrandHeader />
// // //           <SystemBanner />

// // //           <p
// // //             className="max-w-[620px] text-center text-sm font-medium leading-relaxed sm:text-base"
// // //             style={{ color: TEAL }}
// // //           >
// // //             A comprehensive digital platform for registration, survey, certificate issuance,
// // //             grievance redressal and welfare of street vendors.
// // //           </p>

// // //           <ActionButtons />

// // //           {/* Mobile / tablet — location images stacked below content */}
// // //           <div className="mt-2 flex flex-wrap items-center justify-center gap-4 lg:hidden">
// // //             <LocationImage src={nalasoparaImg} alt="Nalasopara" size={125} objectPosition="center 42%" />
// // //             <LocationImage src={vasaiImg} alt="Vasai" size={125} />
// // //             <LocationImage src={virarImg} alt="Virar" size={125} />
// // //           </div>
// // //         </div>

// // //         {/* Officials */}
// // //         <div className="mt-2 shrink-0 border-t pt-4 pb-1" style={{ borderColor: "rgba(217,130,25,0.25)" }}>
// // //           <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-4">
// // //             {OFFICIALS.map((o) => (
// // //               <OfficialProfile key={o.name} {...o} />
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // import { useNavigate } from "react-router-dom";
// // // import { LogIn, Store } from "lucide-react";

// // // import backgroundLanding from "../../assets/backgroundlanding.png";
// // // import nalasoparaImg from "../../assets/nalasopara.png";
// // // import vasaiImg from "../../assets/vasai.png";
// // // import virarImg from "../../assets/virar1.png";
// // // import vendorIdCard from "../../assets/vendorid1.png";
// // // import corpLogo from "../../assets/logovvcmc.jpg";
// // // import mayorImg from "../../assets/ajivsir7.jpeg";
// // // import deputyMayorImg from "../../assets/dcm.jpg";
// // // import commissionerImg from "../../assets/commissioner.jpg";

// // // // ── Brand tokens ──
// // // const TEAL = "#084449"; // primary
// // // const GOLD = "#D98219"; // accent
// // // const CREAM = "#FEFCF8"; // background

// // // const OFFICIALS = [
// // //   {
// // //     name: "Shri. Ajeev Patil",
// // //     designation: ["Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// // //     photo: mayorImg,
// // //   },
// // //   {
// // //     name: "Marshal Lopes",
// // //     designation: ["Deputy Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// // //     photo: deputyMayorImg,
// // //   },
// // //   {
// // //     name: "Shri. Prithviraj B.P. (IAS)",
// // //     designation: ["Commissioner,", "Vasai-Virar City", "Municipal Corporation"],
// // //     photo: commissionerImg,
// // //   },
// // // ];

// // // /* ── Main heading ── */
// // // function BrandHeader() {
// // //   return (
// // //     <div className="text-center">
// // //       <h1
// // //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
// // //         style={{ color: TEAL }}
// // //       >
// // //         Vasai Virar City
// // //       </h1>
// // //       <h2
// // //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3rem]"
// // //         style={{ color: GOLD }}
// // //       >
// // //         Municipal Corporation
// // //       </h2>
// // //       <div className="mt-3 flex items-center justify-center gap-2">
// // //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// // //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// // //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// // //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ── System banner ── */
// // // function SystemBanner() {
// // //   return (
// // //     <div className="flex items-center justify-center">
// // //       <div
// // //         className="flex w-full max-w-[560px] items-center justify-center gap-3 rounded-full border-2 px-7 py-3 shadow-lg sm:px-8"
// // //         style={{ backgroundColor: TEAL, borderColor: GOLD }}
// // //       >
// // //         <Store className="shrink-0 text-white" size={22} />
// // //         <span className="whitespace-nowrap text-base font-bold text-white sm:text-lg">
// // //           Street Vendors Management System
// // //         </span>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ── Action button (Login only) ── */
// // // function ActionButtons() {
// // //   const navigate = useNavigate();
// // //   return (
// // //     <div className="flex items-center justify-center">
// // //       <button
// // //         type="button"
// // //         onClick={() => navigate("/login")}
// // //         className="flex h-12 items-center gap-2 rounded-xl border-2 px-8 text-sm font-bold shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md sm:text-base"
// // //         style={{ backgroundColor: CREAM, borderColor: GOLD, color: GOLD }}
// // //       >
// // //         <LogIn size={18} /> Login
// // //       </button>
// // //     </div>
// // //   );
// // // }

// // // /* ── Diamond-shaped location image — clip-path based, image NEVER rotated
// // //      so the sign's text always stays perfectly upright/straight. ── */
// // // const DIAMOND_CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

// // // function LocationImage({ src, alt, size = 190, objectPosition = "center" }) {
// // //   return (
// // //     <div className="relative shrink-0" style={{ width: size, height: size }}>
// // //       <div
// // //         className="h-full w-full overflow-hidden shadow-lg"
// // //         style={{ clipPath: DIAMOND_CLIP }}
// // //       >
// // //         <img
// // //           src={src}
// // //           alt={alt}
// // //           className="h-full w-full object-cover"
// // //           style={{ objectPosition }}
// // //         />
// // //       </div>
// // //       {/* Diamond outline drawn separately so the border traces the diamond edges cleanly */}
// // //       <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
// // //         <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke={TEAL} strokeWidth="4" strokeLinejoin="round" />
// // //       </svg>
// // //     </div>
// // //   );
// // // }

// // // /* ── One official's circular profile ── */
// // // function OfficialProfile({ name, designation, photo }) {
// // //   return (
// // //     <div className="flex w-[150px] flex-col items-center text-center sm:w-[175px]">
// // //       <div
// // //         className="h-[125px] w-[125px] shrink-0 overflow-hidden rounded-full border-4 shadow-md sm:h-[145px] sm:w-[145px]"
// // //         style={{ borderColor: GOLD }}
// // //       >
// // //         <img src={photo} alt={name} className="h-full w-full object-cover object-top" />
// // //       </div>
// // //       <p className="mt-3 text-base font-extrabold leading-tight sm:text-lg" style={{ color: TEAL }}>
// // //         {name}
// // //       </p>
// // //       {designation.map((line, i) => (
// // //         <p key={i} className="text-xs font-bold leading-tight sm:text-sm" style={{ color: GOLD }}>
// // //           {line}
// // //         </p>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // /* ================= MAIN LANDING PAGE ================= */
// // // export default function Branding() {
// // //   return (
// // //     <div
// // //       className="relative h-screen overflow-hidden bg-cover bg-center"
// // //       style={{ backgroundColor: CREAM, backgroundImage: `url(${backgroundLanding})` }}
// // //     >
// // //       {/* Layer 1 — Identity card watermark (behind everything, fully visible but faded) */}
// // //       <img
// // //         src={vendorIdCard}
// // //         alt=""
// // //         aria-hidden="true"
// // //         className="pointer-events-none absolute right-4 top-1/2 z-0 hidden w-[320px] -translate-y-1/2 rotate-6 opacity-[0.13] sm:right-8 lg:block xl:w-[380px]"
// // //       />

// // //       {/* Layer 2 — Location images (left Nalasopara, right Vasai + Virar) */}
// // //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ left: "11%", top: "34%" }}>
// // //         <LocationImage src={nalasoparaImg} alt="Nalasopara" size={165} objectPosition="88% 14%" />
// // //       </div>
// // //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ left: "9%", top: "64%" }}>
// // //         <LocationImage src={vasaiImg} alt="Vasai" size={155} />
// // //       </div>
// // //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ right: "6%", top: "48%" }}>
// // //         <LocationImage src={virarImg} alt="Virar" size={165} />
// // //       </div>

// // //       {/* Layer 3 — Main content */}
// // //       <div className="relative z-20 flex h-full flex-col overflow-y-auto px-5 py-4 sm:px-8 lg:overflow-hidden lg:px-10">
// // //         {/* Header row — logo top-left */}
// // //         <div className="flex items-center">
// // //           <img
// // //             src={corpLogo}
// // //             alt="Vasai Virar City Municipal Corporation"
// // //             className="h-24 w-24 shrink-0 rounded-full object-cover shadow-lg sm:h-28 sm:w-28"
// // //           />
// // //         </div>

// // //         {/* Hero content */}
// // //         <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 py-2">
// // //           <BrandHeader />
// // //           <SystemBanner />

// // //           <p
// // //             className="max-w-[620px] text-center text-sm font-medium leading-relaxed sm:text-base"
// // //             style={{ color: TEAL }}
// // //           >
// // //             A comprehensive digital platform for registration, survey, certificate issuance,
// // //             grievance redressal and welfare of street vendors.
// // //           </p>

// // //           <ActionButtons />

// // //           {/* Mobile / tablet — location images stacked below content */}
// // //           <div className="mt-2 flex flex-wrap items-center justify-center gap-4 lg:hidden">
// // //             <LocationImage src={nalasoparaImg} alt="Nalasopara" size={125} objectPosition="62% 14%" />
// // //             <LocationImage src={vasaiImg} alt="Vasai" size={125} />
// // //             <LocationImage src={virarImg} alt="Virar" size={125} />
// // //           </div>
// // //         </div>

// // //         {/* Officials */}
// // //         <div className="mt-2 shrink-0 border-t pt-4 pb-1" style={{ borderColor: "rgba(217,130,25,0.25)" }}>
// // //           <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-4">
// // //             {OFFICIALS.map((o) => (
// // //               <OfficialProfile key={o.name} {...o} />
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // import { useNavigate } from "react-router-dom";
// // import { LogIn, Store } from "lucide-react";

// // import backgroundLanding from "../../assets/backgroundlanding.png";
// // import nalasoparaImg from "../../assets/nalasopara.png";
// // import vasaiImg from "../../assets/vasai.png";
// // import virarImg from "../../assets/virar1.png";
// // import vendorIdCard from "../../assets/vendorid1.png";
// // import corpLogo from "../../assets/logovvcmc.jpg";
// // import mayorImg from "../../assets/ajivsir7.jpeg";
// // import deputyMayorImg from "../../assets/dcm.jpg";
// // import commissionerImg from "../../assets/commissioner.jpg";

// // // ── Brand tokens ──
// // const TEAL = "#084449"; // primary
// // const GOLD = "#D98219"; // accent
// // const CREAM = "#FEFCF8"; // background

// // const OFFICIALS = [
// //   {
// //     name: "Shri. Ajeev Patil",
// //     designation: ["Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// //     photo: mayorImg,
// //   },
// //   {
// //     name: "Marshal Lopes",
// //     designation: ["Deputy Mayor,", "Vasai-Virar City", "Municipal Corporation"],
// //     photo: deputyMayorImg,
// //   },
// //   {
// //     name: "Shri. Prithviraj B.P. (IAS)",
// //     designation: ["Commissioner,", "Vasai-Virar City", "Municipal Corporation"],
// //     photo: commissionerImg,
// //   },
// // ];

// // /* ── Main heading ── */
// // function BrandHeader() {
// //   return (
// //     <div className="text-center">
// //       <h1
// //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
// //         style={{ color: TEAL }}
// //       >
// //         Vasai Virar City
// //       </h1>
// //       <h2
// //         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3rem]"
// //         style={{ color: GOLD }}
// //       >
// //         Municipal Corporation
// //       </h2>
// //       <div className="mt-3 flex items-center justify-center gap-2">
// //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// //         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
// //         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
// //       </div>
// //     </div>
// //   );
// // }

// // /* ── System banner ── */
// // function SystemBanner() {
// //   return (
// //     <div className="flex items-center justify-center">
// //       <div
// //         className="flex w-full max-w-[560px] items-center justify-center gap-3 rounded-full border-2 px-7 py-3 shadow-lg sm:px-8"
// //         style={{ backgroundColor: TEAL, borderColor: GOLD }}
// //       >
// //         <Store className="shrink-0 text-white" size={22} />
// //         <span className="whitespace-nowrap text-base font-bold text-white sm:text-lg">
// //           Street Vendors Management System
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ── Action button (Login only) ── */
// // function ActionButtons() {
// //   const navigate = useNavigate();
// //   return (
// //     <div className="flex items-center justify-center">
// //       <button
// //         type="button"
// //         onClick={() => navigate("/login")}
// //         className="flex h-12 items-center gap-2 rounded-xl border-2 px-8 text-sm font-bold shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md sm:text-base"
// //         style={{ backgroundColor: CREAM, borderColor: GOLD, color: GOLD }}
// //       >
// //         <LogIn size={18} /> Login
// //       </button>
// //     </div>
// //   );
// // }

// // /* ── Diamond-shaped location image — clip-path based, image NEVER rotated
// //      so the sign's text always stays perfectly upright/straight. ── */
// // const DIAMOND_CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

// // function LocationImage({ src, alt, size = 190, objectPosition = "center" }) {
// //   return (
// //     <div className="relative shrink-0" style={{ width: size, height: size }}>
// //       <div
// //         className="h-full w-full overflow-hidden shadow-lg"
// //         style={{ clipPath: DIAMOND_CLIP }}
// //       >
// //         <img
// //           src={src}
// //           alt={alt}
// //           className="h-full w-full object-cover"
// //           style={{ objectPosition }}
// //         />
// //       </div>
// //       {/* Diamond outline drawn separately so the border traces the diamond edges cleanly */}
// //       <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
// //         <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke={TEAL} strokeWidth="4" strokeLinejoin="round" />
// //       </svg>
// //     </div>
// //   );
// // }

// // /* ── One official's circular profile ── */
// // function OfficialProfile({ name, designation, photo }) {
// //   return (
// //     <div className="flex w-[150px] flex-col items-center text-center sm:w-[175px]">
// //       <div
// //         className="h-[125px] w-[125px] shrink-0 overflow-hidden rounded-full border-4 shadow-md sm:h-[145px] sm:w-[145px]"
// //         style={{ borderColor: GOLD }}
// //       >
// //         <img src={photo} alt={name} className="h-full w-full object-cover object-top" />
// //       </div>
// //       <p className="mt-3 text-base font-extrabold leading-tight sm:text-lg" style={{ color: TEAL }}>
// //         {name}
// //       </p>
// //       {designation.map((line, i) => (
// //         <p key={i} className="text-xs font-bold leading-tight sm:text-sm" style={{ color: GOLD }}>
// //           {line}
// //         </p>
// //       ))}
// //     </div>
// //   );
// // }

// // /* ================= MAIN LANDING PAGE ================= */
// // export default function Branding() {
// //   return (
// //     <div
// //       className="relative h-screen overflow-hidden bg-cover bg-center"
// //       style={{ backgroundColor: CREAM, backgroundImage: `url(${backgroundLanding})` }}
// //     >
// //       {/* Layer 1 — Identity card watermark (behind everything, fully visible but faded) */}
// //       <img
// //         src={vendorIdCard}
// //         alt=""
// //         aria-hidden="true"
// //         className="pointer-events-none absolute right-4 top-1/2 z-0 hidden w-[320px] -translate-y-1/2 rotate-6 opacity-[0.13] sm:right-8 lg:block xl:w-[380px]"
// //       />

// //       {/* Layer 2 — Location images (left Nalasopara, right Vasai + Virar) */}
// //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ left: "11%", top: "34%" }}>
// //         <LocationImage src={nalasoparaImg} alt="Nalasopara" size={165} objectPosition="62% 14%" />
// //       </div>
// //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ left: "9%", top: "64%" }}>
// //         <LocationImage src={vasaiImg} alt="Vasai" size={155} />
// //       </div>
// //       <div className="pointer-events-none absolute z-10 hidden lg:block" style={{ right: "6%", top: "48%" }}>
// //         <LocationImage src={virarImg} alt="Virar" size={165} />
// //       </div>

// //       {/* Layer 3 — Main content */}
// //       <div className="relative z-20 flex h-full flex-col overflow-y-auto px-5 py-4 sm:px-8 lg:overflow-hidden lg:px-10">
// //         {/* Header row — logo top-left */}
// //         <div className="flex items-center">
// //           <img
// //             src={corpLogo}
// //             alt="Vasai Virar City Municipal Corporation"
// //             className="h-24 w-24 shrink-0 rounded-full object-cover shadow-lg sm:h-28 sm:w-28"
// //           />
// //         </div>

// //         {/* Hero content */}
// //         <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 py-2">
// //           <BrandHeader />
// //           <SystemBanner />

// //           <p
// //             className="max-w-[620px] text-center text-sm font-medium leading-relaxed sm:text-base"
// //             style={{ color: TEAL }}
// //           >
// //             A comprehensive digital platform for registration, survey, certificate issuance,
// //             grievance redressal and welfare of street vendors.
// //           </p>

// //           <ActionButtons />

// //           {/* Mobile / tablet — location images stacked below content */}
// //           <div className="mt-2 flex flex-wrap items-center justify-center gap-4 lg:hidden">
// //             <LocationImage src={nalasoparaImg} alt="Nalasopara" size={125} objectPosition="62% 14%" />
// //             <LocationImage src={vasaiImg} alt="Vasai" size={125} />
// //             <LocationImage src={virarImg} alt="Virar" size={125} />
// //           </div>
// //         </div>

// //         {/* Officials */}
// //         <div className="mt-2 shrink-0 border-t pt-4 pb-1" style={{ borderColor: "rgba(217,130,25,0.25)" }}>
// //           <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-4">
// //             {OFFICIALS.map((o) => (
// //               <OfficialProfile key={o.name} {...o} />
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// import { useNavigate } from "react-router-dom";
// import { LogIn, Store } from "lucide-react";

// import backgroundLanding from "../../assets/backgroundlanding.png";
// import nalasoparaImg from "../../assets/nalasopara.png";
// import vasaiImg from "../../assets/vasai.png";
// import virarImg from "../../assets/virar1.png";
// import vendorIdCard from "../../assets/vendorid1.png";
// import corpLogo from "../../assets/logovvcmc.jpg";
// import mayorImg from "../../assets/ajivsir7.jpeg";
// import deputyMayorImg from "../../assets/dcm.jpg";
// import commissionerImg from "../../assets/commissioner.jpg";

// // ── Brand tokens ──
// const TEAL = "#084449"; // primary
// const GOLD = "#D98219"; // accent
// const CREAM = "#FEFCF8"; // background

// const OFFICIALS = [
//   {
//     name: "Shri. Ajeev Patil",
//     designation: ["Mayor,", "Vasai-Virar City", "Municipal Corporation"],
//     photo: mayorImg,
//   },
//   {
//     name: "Marshal Lopes",
//     designation: ["Deputy Mayor,", "Vasai-Virar City", "Municipal Corporation"],
//     photo: deputyMayorImg,
//   },
//   {
//     name: "Shri. Prithviraj B.P. (IAS)",
//     designation: ["Commissioner,", "Vasai-Virar City", "Municipal Corporation"],
//     photo: commissionerImg,
//   },
// ];

// /* ── Main heading ── */
// function BrandHeader() {
//   return (
//     <div className="text-center">
//       <h1
//         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
//         style={{ color: TEAL }}
//       >
//         Vasai Virar City
//       </h1>
//       <h2
//         className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3rem]"
//         style={{ color: GOLD }}
//       >
//         Municipal Corporation
//       </h2>
//       <div className="mt-3 flex items-center justify-center gap-2">
//         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
//         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
//         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
//         <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
//       </div>
//     </div>
//   );
// }

// /* ── System banner ── */
// function SystemBanner() {
//   return (
//     <div className="flex items-center justify-center">
//       <div
//         className="flex w-full max-w-[560px] items-center justify-center gap-3 rounded-full border-2 px-7 py-3 shadow-lg sm:px-8"
//         style={{ backgroundColor: TEAL, borderColor: GOLD }}
//       >
//         <Store className="shrink-0 text-white" size={22} />
//         <span className="whitespace-nowrap text-base font-bold text-white sm:text-lg">
//           Street Vendors Management System
//         </span>
//       </div>
//     </div>
//   );
// }

// /* ── Action button (Login only) ── */
// function ActionButtons() {
//   const navigate = useNavigate();
//   return (
//     <div className="flex items-center justify-center">
//       <button
//         type="button"
//         onClick={() => navigate("/login")}
//         className="flex h-12 items-center gap-2 rounded-xl border-2 px-8 text-sm font-bold shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md sm:text-base"
//         style={{ backgroundColor: CREAM, borderColor: GOLD, color: GOLD }}
//       >
//         <LogIn size={18} /> Login
//       </button>
//     </div>
//   );
// }

// /* ── Diamond-shaped location image — clip-path based, image NEVER rotated
//      so the sign's text always stays perfectly upright/straight. ── */
// const DIAMOND_CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

// function LocationImage({ src, alt, size = 190, objectPosition = "center" }) {
//   return (
//     <div className="relative shrink-0" style={{ width: size, height: size }}>
//       <div
//         className="h-full w-full overflow-hidden shadow-lg"
//         style={{ clipPath: DIAMOND_CLIP }}
//       >
//         <img
//           src={src}
//           alt={alt}
//           className="h-full w-full object-cover"
//           style={{ objectPosition }}
//         />
//       </div>
//       {/* Diamond outline drawn separately so the border traces the diamond edges cleanly */}
//       <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
//         <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke={TEAL} strokeWidth="4" strokeLinejoin="round" />
//       </svg>
//     </div>
//   );
// }

// /* ── One official's circular profile ── */
// function OfficialProfile({ name, designation, photo }) {
//   return (
//     <div className="flex w-[150px] flex-col items-center text-center sm:w-[175px]">
//       <div
//         className="h-[125px] w-[125px] shrink-0 overflow-hidden rounded-full border-4 shadow-md sm:h-[145px] sm:w-[145px]"
//         style={{ borderColor: GOLD }}
//       >
//         <img src={photo} alt={name} className="h-full w-full object-cover object-top" />
//       </div>
//       <p className="mt-3 text-base font-extrabold leading-tight sm:text-lg" style={{ color: TEAL }}>
//         {name}
//       </p>
//       {designation.map((line, i) => (
//         <p key={i} className="text-xs font-bold leading-tight sm:text-sm" style={{ color: GOLD }}>
//           {line}
//         </p>
//       ))}
//     </div>
//   );
// }

// /* ================= MAIN LANDING PAGE ================= */
// export default function Branding() {
//   return (
//     <div
//       className="relative h-screen overflow-hidden bg-cover bg-center"
//       style={{ backgroundColor: CREAM, backgroundImage: `url(${backgroundLanding})` }}
//     >
//       {/* Layer 1 — Identity card watermark (behind everything, fully visible but faded) */}
//       <img
//         src={vendorIdCard}
//         alt=""
//         aria-hidden="true"
//         className="pointer-events-none absolute right-4 top-1/2 z-0 hidden w-[320px] -translate-y-1/2 rotate-6 opacity-[0.13] sm:right-8 lg:block xl:w-[380px]"
//       />

//       {/* Layer 2 — Location images (faded to watermark level, same treatment as the
//           identity card, so visual focus stays on the officials section) */}
//       <div className="pointer-events-none absolute z-10 hidden opacity-10 lg:block" style={{ left: "11%", top: "34%" }}>
//         <LocationImage src={nalasoparaImg} alt="Nalasopara" size={165} objectPosition="62% 14%" />
//       </div>
//       <div className="pointer-events-none absolute z-10 hidden opacity-10 lg:block" style={{ left: "9%", top: "64%" }}>
//         <LocationImage src={vasaiImg} alt="Vasai" size={155} />
//       </div>
//       <div className="pointer-events-none absolute z-10 hidden opacity-10 lg:block" style={{ right: "6%", top: "48%" }}>
//         <LocationImage src={virarImg} alt="Virar" size={165} />
//       </div>

//       {/* Layer 3 — Main content */}
//       <div className="relative z-20 flex h-full flex-col overflow-y-auto px-5 py-4 sm:px-8 lg:overflow-hidden lg:px-10">
//         {/* Header row — logo top-left */}
//         <div className="flex items-center">
//           <img
//             src={corpLogo}
//             alt="Vasai Virar City Municipal Corporation"
//             className="h-24 w-24 shrink-0 rounded-full object-cover shadow-lg sm:h-28 sm:w-28"
//           />
//         </div>

//         {/* Hero content */}
//         <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 py-2">
//           <BrandHeader />
//           <SystemBanner />

//           <p
//             className="max-w-[620px] text-center text-sm font-medium leading-relaxed sm:text-base"
//             style={{ color: TEAL }}
//           >
//             A comprehensive digital platform for registration, survey, certificate issuance,
//             grievance redressal and welfare of street vendors.
//           </p>

//           <ActionButtons />

//           {/* Mobile / tablet — location images stacked below content */}
//           <div className="mt-2 flex flex-wrap items-center justify-center gap-4 lg:hidden">
//             <LocationImage src={nalasoparaImg} alt="Nalasopara" size={125} objectPosition="62% 14%" />
//             <LocationImage src={vasaiImg} alt="Vasai" size={125} />
//             <LocationImage src={virarImg} alt="Virar" size={125} />
//           </div>
//         </div>

//         {/* Officials */}
//         <div className="mt-2 shrink-0 border-t pt-4 pb-1" style={{ borderColor: "rgba(217,130,25,0.25)" }}>
//           <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-4">
//             {OFFICIALS.map((o) => (
//               <OfficialProfile key={o.name} {...o} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";
import { LogIn, Store } from "lucide-react";

import backgroundLanding from "../../assets/backgroundlanding.png";
import nalasoparaImg from "../../assets/nalasopara.png";
import vasaiImg from "../../assets/vasai.png";
import virarImg from "../../assets/virar1.png";
import vendorIdCard from "../../assets/vendorid1.png";
import corpLogo from "../../assets/logovvcmc.jpg";
import mayorImg from "../../assets/ajivsir7.jpeg";
import deputyMayorImg from "../../assets/dcm.jpg";
import commissionerImg from "../../assets/commissioner.jpg";

// ── Brand tokens ──
const TEAL = "#084449"; // primary
const GOLD = "#D98219"; // accent
const CREAM = "#FEFCF8"; // background

const OFFICIALS = [
  {
    name: "Shri. Ajiv Patil",
    designation: ["Mayor,", "Vasai-Virar City", "Municipal Corporation"],
    photo: mayorImg,
  },
  {
    name: "Shri. Marshal Lopes",
    designation: ["Deputy Mayor,", "Vasai-Virar City", "Municipal Corporation"],
    photo: deputyMayorImg,
  },
  {
    name: "Shri. Prithviraj B.P. (IAS)",
    designation: ["Commissioner,", "Vasai-Virar City", "Municipal Corporation"],
    photo: commissionerImg,
  },
];


/* ── Main heading ── */
function BrandHeader() {
  return (
    <div className="text-center">
      <h1
        className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
        style={{ color: TEAL }}
      >
        Vasai Virar City
      </h1>
      <h2
        className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3rem]"
        style={{ color: GOLD }}
      >
        Municipal Corporation
      </h2>
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
        <span className="h-px w-14" style={{ backgroundColor: GOLD }} />
      </div>
    </div>
  );
}

/* ── System banner ── */
function SystemBanner() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="flex w-full max-w-[560px] items-center justify-center gap-3 rounded-full border-2 px-7 py-3 shadow-lg sm:px-8"
        style={{ backgroundColor: TEAL, borderColor: GOLD }}
      >
        <Store className="shrink-0 text-white" size={22} />
        <span className="whitespace-nowrap text-base font-bold text-white sm:text-lg">
          Street Vendors Management System
        </span>
      </div>
    </div>
  );
}

/* ── Action button (Login only) ── */
function ActionButtons() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="flex h-12 items-center gap-2 rounded-xl border-2 px-8 text-sm font-bold shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md sm:text-base"
        style={{ backgroundColor: CREAM, borderColor: GOLD, color: GOLD }}
      >
        <LogIn size={18} /> Login
      </button>
    </div>
  );
}

/* ── Diamond-shaped location image — clip-path based, image NEVER rotated
     so the sign's text always stays perfectly upright/straight. ── */
const DIAMOND_CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

function LocationImage({ src, alt, size = 190, objectPosition = "center" }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="h-full w-full overflow-hidden shadow-lg"
        style={{ clipPath: DIAMOND_CLIP }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
      </div>
      {/* Diamond outline drawn separately so the border traces the diamond edges cleanly */}
      <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
        <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke={TEAL} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── One official's circular profile ── */
function OfficialProfile({ name, designation, photo }) {
  return (
    <div className="flex w-[150px] flex-col items-center text-center sm:w-[175px]">
      <div
        className="h-[125px] w-[125px] shrink-0 overflow-hidden rounded-full border-4 shadow-md sm:h-[145px] sm:w-[145px]"
        style={{ borderColor: GOLD }}
      >
        <img src={photo} alt={name} className="h-full w-full object-cover object-top" />
      </div>
      <p className="mt-3 text-base font-extrabold leading-tight sm:text-lg" style={{ color: TEAL }}>
        {name}
      </p>
      {designation.map((line, i) => (
        <p key={i} className="text-xs font-bold leading-tight sm:text-sm" style={{ color: GOLD }}>
          {line}
        </p>
      ))}
    </div>
  );
}

/* ================= MAIN LANDING PAGE ================= */
export default function Branding() {
  return (
    <div
      className="relative h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundColor: CREAM, backgroundImage: `url(${backgroundLanding})` }}
    >
      {/* Layer 1 — Identity card watermark (behind everything, fully visible but faded) */}
      <img
        src={vendorIdCard}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 z-0 hidden w-[320px] -translate-y-1/2 rotate-6 opacity-[0.13] sm:right-8 lg:block xl:w-[380px]"
      />

      {/* Layer 2 — Location images (faded to watermark level, same treatment as the
          identity card, so visual focus stays on the officials section) */}
      <div className="pointer-events-none absolute z-10 hidden opacity-20 lg:block" style={{ left: "11%", top: "34%" }}>
        <LocationImage src={nalasoparaImg} alt="Nalasopara" size={165} objectPosition="88% 14%" />
      </div>
      <div className="pointer-events-none absolute z-10 hidden opacity-20 lg:block" style={{ left: "9%", top: "64%" }}>
        <LocationImage src={vasaiImg} alt="Vasai" size={155} />
      </div>
      <div className="pointer-events-none absolute z-10 hidden opacity-20 lg:block" style={{ right: "6%", top: "48%" }}>
        <LocationImage src={virarImg} alt="Virar" size={165} />
      </div>

      {/* Layer 3 — Main content */}
      <div className="relative z-20 flex h-full flex-col overflow-y-auto px-5 py-4 sm:px-8 lg:overflow-hidden lg:px-10">
        {/* Header row — logo top-left */}
        <div className="flex items-center">
          <img
            src={corpLogo}
            alt="Vasai Virar City Municipal Corporation"
            className="h-24 w-24 shrink-0 rounded-full object-cover shadow-lg sm:h-28 sm:w-28"
          />
        </div>

        {/* Hero content */}
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 py-2">
          <BrandHeader />
          <SystemBanner />

          <p
            className="max-w-[620px] text-center text-sm font-medium leading-relaxed sm:text-base"
            style={{ color: TEAL }}
          >
            A comprehensive digital platform for registration, survey, certificate issuance,
            grievance redressal and welfare of street vendors.
          </p>

          <ActionButtons />

          {/* Mobile / tablet — location images stacked below content */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 lg:hidden">
            <LocationImage src={nalasoparaImg} alt="Nalasopara" size={125} objectPosition="99% 0%" />
            <LocationImage src={vasaiImg} alt="Vasai" size={125} />
            <LocationImage src={virarImg} alt="Virar" size={125} />
          </div>
        </div>

        {/* Officials */}
        <div className="mt-2 shrink-0 border-t pt-4 pb-1" style={{ borderColor: "rgba(217,130,25,0.25)" }}>
          <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-4">
            {OFFICIALS.map((o) => (
              <OfficialProfile key={o.name} {...o} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}