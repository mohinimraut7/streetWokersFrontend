


// import { useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import {
//   FiLock,
//   FiPhone,
//   FiUser,
//   FiLogIn,
//   FiEye,
//   FiEyeOff,
//   FiShield,
//   FiInfo,
//   FiChevronDown,
//   FiCheckCircle,
//   FiArrowLeft,
// } from "react-icons/fi";
// import { Store } from "lucide-react";

// import { useAuth } from "../hooks/useAuth";
// import { LOGIN_ROLES, checkMobile } from "../services/authService";
// import OtpInput from "../components/ui/OtpInput";

// // ── Exactly the same assets as Branding.jsx ──
// import backgroundLanding from "../../../assets/backgroundlanding.png";
// import corpLogo from "../../../assets/logovvcmc.jpg";
// import mayorImg from "../../../assets/ajivsir7.jpeg";
// import deputyMayorImg from "../../../assets/dcm.jpg";
// import commissionerImg from "../../../assets/commissioner.jpg";
// // logovvcmc.jpg

// // ── Brand tokens — identical to Branding.jsx ──
// const TEAL = "#084449"; // primary
// const GOLD = "#D98219"; // accent
// const CREAM = "#FEFCF8"; // background

// // ── Shared finishing tokens ──
// // NOTE: only visual/spacing tokens were tuned here (larger touch targets,
// // airier spacing, plain card with no colored top border) to match the
// // reference layout. No logic, handlers, or state below this point changed.
// const INPUT_WRAP =
//   "flex h-12 items-center rounded-xl border border-slate-200 bg-white px-4 shadow-[inset_0_1px_2px_rgba(15,23,42,0.05)] transition-all duration-200 hover:border-slate-300 focus-within:border-[#0EA5A8] focus-within:shadow-[0_0_0_4px_rgba(14,165,168,0.12)]";

// const PRIMARY_BUTTON =
//   "flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0B5852] to-[#084449] text-sm font-bold text-white shadow-[0_8px_20px_rgba(8,68,73,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(8,68,73,0.42)] active:translate-y-0 active:shadow-[0_6px_14px_rgba(8,68,73,0.32)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_20px_rgba(8,68,73,0.30)]";

// const TEAL_LINK = "text-sm font-semibold text-[#008F99] underline decoration-1 underline-offset-2 hover:text-[#006E76]";
// const GOLD_LINK = "text-sm font-semibold";

// const OFFICIALS = [
//   {
//     name: "Shri. Ajeev Patil",
//     designation: ["Mayor,", "Vasai-Virar City", "Municipal Corporation"],
//     photo: mayorImg,
//   },
//   {
//     name: "Shri. Marshal Lopes",
//     designation: ["Deputy Mayor,", "Vasai-Virar City", "Municipal Corporation"],
//     photo: deputyMayorImg,
//   },
//   {
//     name: "Shri. Prithviraj B.P. (IAS)",
//     designation: ["Commissioner,", "Vasai-Virar City", "Municipal Corporation"],
//     photo: commissionerImg,
//   },
// ];

// /* ── Main heading — identical to Branding.jsx ── */
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

// /* ── System banner — identical to Branding.jsx, just a touch more depth ── */
// function SystemBanner() {
//   return (
//     <div className="flex items-center justify-center">
//       <div
//         className="flex w-full max-w-[560px] items-center justify-center gap-3 rounded-full border-2 px-7 py-3 shadow-[0_10px_28px_-8px_rgba(8,68,73,0.45)] sm:px-8"
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

// /* ── Diamond-shaped location image — identical to Branding.jsx.
//      `imageless`: renders just a faint outline diamond (no photo inside),
//      used for the purely decorative background diamonds per the reference
//      design — the photo/label diamonds elsewhere are untouched. ── */
// const DIAMOND_CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

// function LocationImage({ src, alt, size = 190, objectPosition = "center", imageless = false }) {
//   if (imageless) {
//     return (
//       <div className="relative shrink-0" style={{ width: size, height: size }}>
//         <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
//           <polygon
//             points="50,4 96,50 50,96 4,50"
//             fill="none"
//             stroke={TEAL}
//             strokeWidth="2.5"
//             strokeLinejoin="round"
//             opacity="0.3"
//           />
//         </svg>
//       </div>
//     );
//   }

//   return (
//     <div className="relative shrink-0" style={{ width: size, height: size }}>
//       <div className="h-full w-full overflow-hidden shadow-lg" style={{ clipPath: DIAMOND_CLIP }}>
//         <img src={src} alt={alt} className="h-full w-full object-cover" style={{ objectPosition }} />
//       </div>
//       <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
//         <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke={TEAL} strokeWidth="4" strokeLinejoin="round" />
//       </svg>
//     </div>
//   );
// }

// /* ── One official's circular profile — identical to Branding.jsx ── */
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

// // mobileStage: "entry" (typing mobile) -> "checked" (we now know if it's a new or existing user)
// const MOBILE_STAGE = { ENTRY: "entry", CHECKED: "checked" };

// export default function Login() {
//   const { sendOtp, verifyOtp, loginWithPassword, loginWithIdentifier, registerVendor, sendRegistrationOtp, otpSent, resetOtpFlow } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ── Single "Login as" dropdown drives everything ──
//   const [loginRole, setLoginRole] = useState("vendor");
//   const isOtpRole = loginRole === "vendor";

//   // ── Vendor: OTP vs Password vs Register toggle ──
//   const [vendorLoginMode, setVendorLoginMode] = useState("otp"); // "otp" | "password" | "register"
//   const [identifier, setIdentifier] = useState(""); // mobile / username (login)
//   const [regFullName, setRegFullName] = useState("");
//   const [regUserName, setRegUserName] = useState("");
//   const [regMobile, setRegMobile] = useState("");
//   const [regPassword, setRegPassword] = useState("");
//   const [regOtpSent, setRegOtpSent] = useState(false);
//   const [regOtp, setRegOtp] = useState("");
//   const [sendingRegOtp, setSendingRegOtp] = useState(false);

//   // ── Staff: Username/Password (default, unchanged) vs OTP vs Mobile+Password ──
//   const [staffLoginMode, setStaffLoginMode] = useState("password"); // "password" | "otp" | "mobile"

//   // ── OTP state (Vendor) ──
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [mobileStage, setMobileStage] = useState(MOBILE_STAGE.ENTRY);
//   const [checkingMobile, setCheckingMobile] = useState(false);

//   // ── Password state (Staff) ──
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const from = location.state?.from?.pathname || "/";

//   const resetOtpTab = () => {
//     setMobileStage(MOBILE_STAGE.ENTRY);
//     setOtp("");
//     setMobile("");
//   };

//   const resetPasswordTab = () => {
//     setUserName("");
//     setPassword("");
//   };

//   const resetVendorPasswordTab = () => {
//     setIdentifier("");
//     setPassword("");
//   };

//   const resetVendorRegisterTab = () => {
//     setRegFullName("");
//     setRegUserName("");
//     setRegMobile("");
//     setRegPassword("");
//     setRegOtpSent(false);
//     setRegOtp("");
//   };

//   const handleRoleChange = (e) => {
//     setLoginRole(e.target.value);
//     setError("");
//     resetOtpFlow();
//     resetOtpTab();
//     resetPasswordTab();
//     resetVendorPasswordTab();
//     resetVendorRegisterTab();
//     setVendorLoginMode("otp");
//     setStaffLoginMode("password");
//   };

//   // ── OTP: Step 1 — Check whether this mobile number is registered ──
//   const handleCheckMobile = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!/^\d{10}$/.test(mobile)) {
//       setError("Please enter a valid 10-digit mobile number.");
//       return;
//     }
//     setCheckingMobile(true);
//     const result = await checkMobile(mobile);
//     setCheckingMobile(false);
//     if (!result.success) {
//       setError(result.message || "Could not verify this number. Please try again.");
//       return;
//     }

//     if (!result.exists) {
//       if (isOtpRole) {
//         // ── Vendor — send straight to the full one-time Register form (name, username,
//         //    mobile, password) instead of a partial OTP-only signup that only asks for a name. ──
//         resetVendorRegisterTab();
//         setRegMobile(mobile);
//         setVendorLoginMode("register");
//       } else {
//         // ── Staff — no self-registration; accounts are created by the Super Admin only. ──
//         setError("No account found for this mobile number. Please contact your administrator.");
//       }
//       return;
//     }

//     setMobileStage(MOBILE_STAGE.CHECKED);
//   };

//   // ── OTP: Step 2 — Send OTP (mobile is already a registered account at this point) ──
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     const result = await sendOtp(mobile);
//     setSubmitting(false);
//     if (!result.success) setError(result.message || "Failed to send OTP.");
//   };

//   // ── OTP: Step 3 — Verify OTP + Login (this mobile is always an already-registered account,
//   //    since new numbers get routed to the full Register form at Step 1 for vendors, or
//   //    rejected outright for staff) ──
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     const result = await verifyOtp({ mobileNo: mobile, otp, expectedRole: isOtpRole ? undefined : loginRole });
//     setSubmitting(false);
//     if (result.success) {
//       navigate(from, { replace: true });
//     } else {
//       setError(result.message || "Invalid OTP.");
//     }
//   };

//   const handleChangeMobile = () => {
//     resetOtpFlow();
//     resetOtpTab();
//     setError("");
//   };

//   // ── Vendor: Password login (mobile / application no. / username) ──
//   const handleVendorPasswordLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     const result = await loginWithIdentifier({ identifier, password });
//     setSubmitting(false);
//     if (result.success) {
//       navigate(from, { replace: true });
//     } else {
//       setError(result.message || "Invalid login. Please try again.");
//     }
//   };

//   const toggleVendorLoginMode = (mode) => {
//     setError("");
//     resetOtpFlow();
//     resetOtpTab();
//     resetVendorPasswordTab();
//     resetVendorRegisterTab();
//     setVendorLoginMode(mode);
//   };

//   const toggleStaffLoginMode = (mode) => {
//     setError("");
//     resetOtpFlow();
//     resetOtpTab();
//     resetPasswordTab();
//     resetVendorPasswordTab(); // shared identifier/password fields, also used for staff mobile-login
//     setStaffLoginMode(mode);
//   };

//   // ── Staff: Mobile Number + Password login (same account as username/password — just a
//   //    different identifier) ──
//   const handleStaffMobileLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     const result = await loginWithIdentifier({ identifier, password, expectedRole: loginRole });
//     setSubmitting(false);
//     if (result.success) {
//       navigate(from, { replace: true });
//     } else {
//       setError(result.message || "Invalid login. Please try again.");
//     }
//   };

//   // ── Vendor: Register Step 1 — send an OTP to verify the mobile number belongs to them ──
//   const handleSendRegistrationOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!regFullName.trim() || !/^\d{10}$/.test(regMobile) || !regPassword) {
//       setError("Please fill in all fields with a valid 10-digit mobile number.");
//       return;
//     }
//     setSendingRegOtp(true);
//     const result = await sendRegistrationOtp(regMobile);
//     setSendingRegOtp(false);
//     if (!result.success) {
//       setError(result.message || "Failed to send OTP.");
//       return;
//     }
//     setRegOtpSent(true);
//   };

//   // ── Vendor: Register Step 2 — verify the OTP and create/update the account ──
//   const handleVendorRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     const result = await registerVendor({
//       fullName: regFullName,
//       userName: regUserName,
//       mobileNumber: regMobile,
//       password: regPassword,
//       otp: regOtp,
//     });
//     setSubmitting(false);
//     if (result.success) {
//       navigate(from, { replace: true });
//     } else {
//       setError(result.message || "Registration failed. Please try again.");
//     }
//   };

//   const handleChangeRegDetails = () => {
//     setRegOtpSent(false);
//     setRegOtp("");
//     setError("");
//   };

//   // ── Password login (Staff) ──
//   const handlePasswordLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     const result = await loginWithPassword({ userName, password, expectedRole: loginRole });
//     setSubmitting(false);
//     if (result.success) {
//       navigate(from, { replace: true });
//     } else {
//       setError(result.message || "Invalid username or password.");
//     }
//   };

//   // Both vendor and staff can use the same OTP stage-1/2/3 UI below — this just decides
//   // whether either of them currently has OTP mode active.
//   const showOtpFlow = (isOtpRole && vendorLoginMode === "otp") || (!isOtpRole && staffLoginMode === "otp");

//   return (
//     <div
//       className="relative min-h-screen overflow-x-hidden bg-cover bg-center lg:h-screen lg:overflow-hidden"
//       style={{ backgroundColor: CREAM, backgroundImage: `url(${backgroundLanding})` }}
//     >

//       {/* Layer 2 — Location images — decorative outline diamonds only (no
//           photos). This is the neat look you want kept — exactly 3, equal
//           spacing, no photos. */}
//       <div className="pointer-events-none absolute z-10 hidden opacity-20 lg:block" style={{ left: "11%", top: "25%" }}>
//         <LocationImage size={165} imageless />
//       </div>
//       <div className="pointer-events-none absolute z-10 hidden opacity-20 lg:block" style={{ left: "10%", top: "69%" }}>
//         <LocationImage size={155} imageless />
//       </div>
//       <div className="pointer-events-none absolute z-10 hidden opacity-20 lg:block" style={{ left: "3%", top: "47%" }}>
//         <LocationImage size={165} imageless />
//       </div>

//       {/* Layer 3 — Main content — identical structure to Branding.jsx */}
//       <div className="relative z-20 flex min-h-screen flex-col px-5 py-4 sm:px-8 lg:px-10">
//         {/* Header row — logo top-left, identical to Branding.jsx */}
//         <div className="flex items-center">
//           <img
//             src={corpLogo}
//             alt="Vasai Virar City Municipal Corporation"
//             className="h-24 w-24 shrink-0 rounded-full object-cover shadow-lg sm:h-28 sm:w-28"
//           />
//         </div>

//         {/* Branding content — centered at the top of the page */}
//         <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-start gap-3 py-0 text-center lg:-translate-x-8 lg:-translate-y-5">
//           <BrandHeader />
//           <SystemBanner />

//           <p
//             className="max-w-[620px] text-center text-sm font-medium leading-relaxed sm:text-base"
//             style={{ color: TEAL }}
//           >
//             A comprehensive digital platform for registration, survey, certificate issuance,
//             grievance redressal and welfare of street vendors.
//           </p>
//         </div>

//         {/* ═══════════════════════════════════════════════════════════════
//             LOGIN FORM — every field, handler, and piece of logic below is
//             unchanged from the existing implementation. Shifted to the right
//             side on desktop (absolutely positioned, vertically centered);
//             normal centered flow on mobile/tablet.
//             ═══════════════════════════════════════════════════════════ */}
//         <div className="mx-auto mt-6 w-full max-w-[440px] lg:absolute lg:right-10 lg:top-1/2 lg:mx-0 lg:mt-0 lg:-translate-y-1/2 xl:right-16">
//           <div className="rounded-3xl bg-white p-7 shadow-[0_24px_60px_-15px_rgba(8,68,73,0.22),0_2px_8px_rgba(8,68,73,0.06)] sm:p-8">
//             <h2 className="text-2xl font-black tracking-tight" style={{ color: TEAL }}>
//               Welcome Back!
//             </h2>
//             <p className="mt-1.5 text-sm font-medium text-slate-500">Sign in to continue to your dashboard</p>

//             {/* ── Single "Login as" dropdown — drives OTP vs Password flow ── */}
//             <div className="mt-6">
//               <label className="mb-2 block text-sm font-bold text-[#102B50]">
//                 Login as<span className="ml-1 text-red-500">*</span>
//               </label>
//               <div className={INPUT_WRAP}>
//                 <FiShield className="mr-2.5 text-[#6380A2]" size={17} />
//                 <select
//                   value={loginRole}
//                   onChange={handleRoleChange}
//                   className="w-full appearance-none bg-transparent text-sm font-semibold text-[#102B50] outline-none"
//                 >
//                   {LOGIN_ROLES.map((r) => (
//                     <option key={r.value} value={r.value}>
//                       {r.label}
//                     </option>
//                   ))}
//                 </select>
//                 <FiChevronDown className="pointer-events-none text-[#6380A2]" size={15} />
//               </div>
//             </div>

//             {/* ══════════════ VENDOR — toggle between OTP / Password / Register ══════════════ */}
//             {isOtpRole && (
//               <div className="mt-4 flex flex-wrap items-center justify-end gap-x-4 gap-y-1.5">
//                 {vendorLoginMode !== "otp" && (
//                   <button
//                     type="button"
//                     onClick={() => toggleVendorLoginMode("otp")}
//                     className={TEAL_LINK}
//                   >
//                     Login with OTP
//                   </button>
//                 )}
//                 {vendorLoginMode !== "password" && (
//                   <button
//                     type="button"
//                     onClick={() => toggleVendorLoginMode("password")}
//                     className={TEAL_LINK}
//                   >
//                     Login with Password
//                   </button>
//                 )}
//                 {vendorLoginMode !== "register" && (
//                   <button
//                     type="button"
//                     onClick={() => toggleVendorLoginMode("register")}
//                     className={GOLD_LINK}
//                     style={{ color: GOLD }}
//                   >
//                     New vendor? Register
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* ══════════════ VENDOR — REGISTER STEP 1 — details, then Send OTP ══════════════ */}
//             {isOtpRole && vendorLoginMode === "register" && !regOtpSent && (
//               <form onSubmit={handleSendRegistrationOtp} className="mt-5 space-y-4">
//                 <div>
//                   <label className="mb-2 block text-sm font-bold text-[#102B50]">
//                     Full Name<span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <div className={INPUT_WRAP}>
//                     <FiUser className="mr-2.5 text-[#6380A2]" size={17} />
//                     <input
//                       type="text"
//                       value={regFullName}
//                       onChange={(e) => setRegFullName(e.target.value)}
//                       placeholder="Enter your full name"
//                       className="w-full bg-transparent text-sm font-medium text-[#102B50] outline-none placeholder:text-slate-400"
//                       required
//                       autoFocus
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-bold text-[#102B50]">
//                     Username <span className="font-normal text-slate-500">(optional)</span>
//                   </label>
//                   <div className={INPUT_WRAP}>
//                     <FiUser className="mr-2.5 text-[#6380A2]" size={17} />
//                     <input
//                       type="text"
//                       value={regUserName}
//                       onChange={(e) => setRegUserName(e.target.value)}
//                       placeholder="Leave blank to use your mobile number"
//                       className="w-full bg-transparent text-sm font-medium text-[#102B50] outline-none placeholder:text-slate-400"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-bold text-[#102B50]">
//                     Mobile Number<span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <div className={INPUT_WRAP}>
//                     <FiPhone className="mr-2.5 text-[#6380A2]" size={17} />
//                     <input
//                       type="tel"
//                       value={regMobile}
//                       onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
//                       placeholder="10-digit mobile number"
//                       className="w-full bg-transparent text-sm font-medium text-[#102B50] outline-none placeholder:text-slate-400"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-bold text-[#102B50]">
//                     Password<span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <div className={INPUT_WRAP}>
//                     <FiLock className="mr-2.5 text-[#6380A2]" size={17} />
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       value={regPassword}
//                       onChange={(e) => setRegPassword(e.target.value)}
//                       placeholder="Choose a password"
//                       className="w-full bg-transparent text-sm font-medium text-[#102B50] outline-none placeholder:text-slate-400"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="ml-2 text-slate-500 transition hover:text-[#0EA5A8]"
//                     >
//                       {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
//                     </button>
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
//                     {error}
//                   </div>
//                 )}

//                 <button type="submit" disabled={sendingRegOtp} className={PRIMARY_BUTTON}>
//                   <FiLogIn size={17} />
//                   {sendingRegOtp ? "Sending OTP..." : "Send OTP to Verify"}
//                 </button>

//                 <p className="pt-1 text-center text-xs font-medium text-slate-500">
//                   If a Counter Officer already registered you, this will just set your
//                   username and password on that existing account — nothing is duplicated.
//                 </p>
//               </form>
//             )}

//             {/* ══════════════ VENDOR — REGISTER STEP 2 — verify OTP, then create account ══════════════ */}
//             {isOtpRole && vendorLoginMode === "register" && regOtpSent && (
//               <form onSubmit={handleVendorRegister} className="mt-5 space-y-4">
//                 <button
//                   type="button"
//                   onClick={handleChangeRegDetails}
//                   className="flex items-center gap-1 text-sm font-semibold text-[#008F99] hover:text-[#006E76]"
//                 >
//                   <FiArrowLeft size={14} /> {regMobile}
//                 </button>

//                 <p className="text-center text-sm font-medium text-slate-600">
//                   Enter the 6-digit OTP sent to{" "}
//                   <span className="font-bold text-[#102B50]">{regMobile}</span>
//                 </p>

//                 <OtpInput value={regOtp} onChange={setRegOtp} length={6} />

//                 {error && (
//                   <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
//                     {error}
//                   </div>
//                 )}

//                 <button type="submit" disabled={submitting || regOtp.length !== 6} className={PRIMARY_BUTTON}>
//                   <FiLogIn size={17} />
//                   {submitting ? "Verifying..." : "Verify & Register"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleSendRegistrationOtp}
//                   disabled={sendingRegOtp}
//                   className="w-full text-center text-sm font-semibold text-[#008F99] hover:text-[#006E76]"
//                 >
//                   {sendingRegOtp ? "Resending..." : "Resend OTP"}
//                 </button>
//               </form>
//             )}

//             {/* ══════════════ VENDOR — PASSWORD LOGIN — mobile / username ══════════════ */}
//             {isOtpRole && vendorLoginMode === "password" && (
//               <form onSubmit={handleVendorPasswordLogin} className="mt-5 space-y-4">
//                 <div>
//                   <label className="mb-2 block text-sm font-bold text-[#102B50]">
//                     Mobile Number / Username<span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <div className={INPUT_WRAP}>
//                     <FiUser className="mr-2.5 text-[#6380A2]" size={17} />
//                     <input
//                       type="text"
//                       value={identifier}
//                       onChange={(e) => setIdentifier(e.target.value)}
//                       placeholder="Mobile number or username"
//                       className="w-full bg-transparent text-sm font-medium text-[#102B50] outline-none placeholder:text-slate-400"
//                       required
//                       autoFocus
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-bold text-[#102B50]">
//                     Password<span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <div className={INPUT_WRAP}>
//                     <FiLock className="mr-2.5 text-[#6380A2]" size={17} />
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter password"
//                       className="w-full bg-transparent text-sm font-medium text-[#102B50] outline-none placeholder:text-slate-400"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="ml-2 text-slate-500 transition hover:text-[#0EA5A8]"
//                     >
//                       {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
//                     </button>
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
//                     {error}
//                   </div>
//                 )}

//                 <button type="submit" disabled={submitting} className={PRIMARY_BUTTON}>
//                   <FiLogIn size={17} />
//                   {submitting ? "Signing in..." : "Sign In"}
//                 </button>

//                 <p className="pt-1 text-center text-xs font-medium text-slate-500">
//                   New here? If your registration was filled by a Counter Officer, your default
//                   password is your mobile number.
//                 </p>
//               </form>
//             )}

//             {/* ══════════════ VENDOR — OTP STAGE 1 — Mobile entry, check registration ══════════════ */}
//             {showOtpFlow && mobileStage === MOBILE_STAGE.ENTRY && (
//               <form onSubmit={handleCheckMobile} className="mt-5 space-y-4">
//                 <div>
//                   <label className="mb-2 block text-sm font-bold text-[#102B50]">
//                     Mobile Number<span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <div className={INPUT_WRAP}>
//                     <FiPhone className="mr-2.5 text-[#6380A2]" size={17} />
//                     <input
//                       type="tel"
//                       value={mobile}
//                       maxLength={10}
//                       onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
//                       placeholder="Enter your mobile number"
//                       className="w-full bg-transparent text-sm font-medium text-[#102B50] outline-none placeholder:text-slate-400"
//                       required
//                       autoFocus
//                     />
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
//                     {error}
//                   </div>
//                 )}

//                 <button type="submit" disabled={checkingMobile} className={PRIMARY_BUTTON}>
//                   <FiLogIn size={17} />
//                   {checkingMobile ? "Checking..." : "Continue"}
//                 </button>

//                 <p className="pt-1 text-center text-xs font-medium text-slate-500">
//                   New vendor? Just enter your mobile number above — we'll set up your account automatically.
//                 </p>
//               </form>
//             )}

//             {/* ══════════════ VENDOR — OTP STAGE 2 — Registered / New-user banner, then Send OTP ══════════════ */}
//             {showOtpFlow && mobileStage === MOBILE_STAGE.CHECKED && !otpSent && (
//               <form onSubmit={handleSendOtp} className="mt-5 space-y-4">
//                 <button
//                   type="button"
//                   onClick={handleChangeMobile}
//                   className="flex items-center gap-1 text-sm font-semibold text-[#008F99] hover:text-[#006E76]"
//                 >
//                   <FiArrowLeft size={14} /> {mobile}
//                 </button>

//                 <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
//                   <FiCheckCircle className="mt-0.5 shrink-0" size={16} />
//                   <span>Welcome back! We'll send a one-time password to verify it's you.</span>
//                 </div>

//                 {error && (
//                   <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
//                     {error}
//                   </div>
//                 )}

//                 <button type="submit" disabled={submitting} className={PRIMARY_BUTTON}>
//                   <FiLogIn size={17} />
//                   {submitting ? "Sending OTP..." : "Send OTP"}
//                 </button>
//               </form>
//             )}

//             {/* ══════════════ VENDOR — OTP STAGE 3 — Verify — 6-box OTP only ══════════════ */}
//             {showOtpFlow && otpSent && (
//               <form onSubmit={handleVerifyOtp} className="mt-5 space-y-4">
//                 <p className="text-center text-sm font-medium text-slate-600">
//                   Enter the 6-digit OTP sent to{" "}
//                   <span className="font-bold text-[#102B50]">{mobile}</span>
//                 </p>

//                 <OtpInput value={otp} onChange={setOtp} length={6} />

//                 {error && (
//                   <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
//                     {error}
//                   </div>
//                 )}

//                 <button type="submit" disabled={submitting || otp.length !== 6} className={PRIMARY_BUTTON}>
//                   <FiLogIn size={17} />
//                   {submitting ? "Verifying..." : "Verify & Login"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleChangeMobile}
//                   className="w-full text-center text-sm font-semibold text-[#008F99] hover:text-[#006E76]"
//                 >
//                   Change mobile number / Resend OTP
//                 </button>
//               </form>
//             )}

//             {/* ══════════════ STAFF — toggle between Username/Password, OTP, Mobile+Password ══════════════ */}
//             {!isOtpRole && (
//               <div className="mt-4 flex flex-wrap items-center justify-end gap-x-4 gap-y-1.5">
//                 {staffLoginMode !== "password" && (
//                   <button
//                     type="button"
//                     onClick={() => toggleStaffLoginMode("password")}
//                     className={TEAL_LINK}
//                   >
//                     Login with Username
//                   </button>
//                 )}
//                 {staffLoginMode !== "otp" && (
//                   <button
//                     type="button"
//                     onClick={() => toggleStaffLoginMode("otp")}
//                     className={TEAL_LINK}
//                   >
//                     Login with OTP
//                   </button>
//                 )}
//                 {staffLoginMode !== "mobile" && (
//                   <button
//                     type="button"
//                     onClick={() => toggleStaffLoginMode("mobile")}
//                     className={TEAL_LINK}
//                   >
//                     Login with Mobile
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* ══════════════ STAFF — MOBILE NUMBER + PASSWORD LOGIN ══════════════ */}
//             {!isOtpRole && staffLoginMode === "mobile" && (
//               <form onSubmit={handleStaffMobileLogin} className="mt-5 space-y-4">
//                 <div>
//                   <label className="mb-2 block text-sm font-bold text-[#102B50]">
//                     Mobile Number<span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <div className={INPUT_WRAP}>
//                     <FiPhone className="mr-2.5 text-[#6380A2]" size={17} />
//                     <input
//                       type="tel"
//                       value={identifier}
//                       onChange={(e) => setIdentifier(e.target.value.replace(/\D/g, "").slice(0, 10))}
//                       placeholder="10-digit mobile number"
//                       className="w-full bg-transparent text-sm font-medium text-[#102B50] outline-none placeholder:text-slate-400"
//                       required
//                       autoFocus
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-bold text-[#102B50]">
//                     Password<span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <div className={INPUT_WRAP}>
//                     <FiLock className="mr-2.5 text-[#6380A2]" size={17} />
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter password"
//                       className="w-full bg-transparent text-sm font-medium text-[#102B50] outline-none placeholder:text-slate-400"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="ml-2 text-slate-500 transition hover:text-[#0EA5A8]"
//                     >
//                       {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
//                     </button>
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
//                     {error}
//                   </div>
//                 )}

//                 <button type="submit" disabled={submitting} className={PRIMARY_BUTTON}>
//                   <FiLogIn size={17} />
//                   {submitting ? "Signing in..." : "Sign In"}
//                 </button>
//               </form>
//             )}

//             {/* ══════════════ STAFF — PASSWORD LOGIN FORM (default, unchanged) ══════════════ */}
//             {!isOtpRole && staffLoginMode === "password" && (
//               <form onSubmit={handlePasswordLogin} className="mt-5 space-y-4">
//                 <div>
//                   <label className="mb-2 block text-sm font-bold text-[#102B50]">
//                     Username<span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <div className={INPUT_WRAP}>
//                     <FiUser className="mr-2.5 text-[#6380A2]" size={17} />
//                     <input
//                       type="text"
//                       value={userName}
//                       onChange={(e) => setUserName(e.target.value)}
//                       placeholder="Enter your username"
//                       className="w-full bg-transparent text-sm font-medium text-[#102B50] outline-none placeholder:text-slate-400"
//                       required
//                       autoFocus
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-bold text-[#102B50]">
//                     Password<span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <div className={INPUT_WRAP}>
//                     <FiLock className="mr-2.5 text-[#6380A2]" size={17} />
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter password"
//                       className="w-full bg-transparent text-sm font-medium text-[#102B50] outline-none placeholder:text-slate-400"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="ml-2 text-slate-500 transition hover:text-[#0EA5A8]"
//                     >
//                       {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
//                     </button>
//                   </div>
//                   <div className="mt-2 flex justify-end">
//                     <button type="button" className="text-sm font-semibold text-[#008F99] transition hover:text-[#006E76]">
//                       Forgot Password?
//                     </button>
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
//                     {error}
//                   </div>
//                 )}

//                 <button type="submit" disabled={submitting} className={PRIMARY_BUTTON}>
//                   <FiLogIn size={17} />
//                   {submitting ? "Signing in..." : "Sign In"}
//                 </button>

//                 {/* ── Register link — changes based on which role is selected ── */}
//                 {loginRole === "super_admin" ? (
//                   <div className="pt-1 text-center text-xs font-medium text-slate-500">
//                     Need to add a new officer?{" "}
//                     <Link to="/register-officer" className="font-bold text-[#008F99] hover:text-[#006E76]">
//                       Register Officer
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
//                     <FiInfo className="mt-0.5 shrink-0 text-[#0EA5A8]" size={15} />
//                     <p>Don't have an account yet? Contact your Super Admin to get registered.</p>
//                   </div>
//                 )}
//               </form>
//             )}
//           </div>
//         </div>

//           {/* Mobile / tablet — decorative outline diamonds, same as desktop */}
//           <div className="mt-2 flex flex-wrap items-center justify-center gap-4 lg:hidden">
//             <LocationImage size={125} imageless />
//             <LocationImage size={125} imageless />
//             <LocationImage size={125} imageless />
//           </div>

//         {/* Officials — identical to Branding.jsx */}
//         <div className="mt-0 shrink-0 border-t pt-3 pb-3" style={{ borderColor: "rgba(217,130,25,0.25)" }}>
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


import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  FiLock,
  FiPhone,
  FiUser,
  FiLogIn,
  FiEye,
  FiEyeOff,
  FiShield,
  FiInfo,
  FiChevronDown,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";
import { Store } from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { LOGIN_ROLES, checkMobile } from "../services/authService";
import OtpInput from "../components/ui/OtpInput";

// ── Exactly the same assets as Branding.jsx ──
import backgroundLanding from "../../../assets/backgroundlanding.png";
import corpLogo from "../../../assets/logovvcmc.jpg";
import mayorImg from "../../../assets/ajivsir7.jpeg";
import deputyMayorImg from "../../../assets/dcm.jpg";
import commissionerImg from "../../../assets/commissioner.jpg";
// logovvcmc.jpg

// ── Brand tokens — identical to Branding.jsx ──
const TEAL = "#084449"; // primary
const GOLD = "#D98219"; // accent
const CREAM = "#FEFCF8"; // background

// ── Shared finishing tokens (visual polish only — no layout/size change) ──
// Input wrapper: same height/padding/border-color as before, just a softer
// inset shadow at rest, a gentle hover border, and a smoother focus glow
// (replacing the flatter ring) for a more premium, tactile feel.
const INPUT_WRAP =
  "flex h-11 items-center rounded-xl border border-slate-200 bg-white px-3.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.05)] transition-all duration-200 hover:border-slate-300 focus-within:border-[#0EA5A8] focus-within:shadow-[0_0_0_4px_rgba(14,165,168,0.12)]";

// Primary button: same size/text as before. Color switched from the lighter
// cyan gradient to a solid deep-teal (matches TEAL brand token / reference
// image) so it reads as the primary brand action, with a gentle hover lift
// and a real "pressed" state on click.
const PRIMARY_BUTTON =
  "flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0B5852] to-[#084449] text-sm font-bold text-white shadow-[0_8px_20px_rgba(8,68,73,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(8,68,73,0.42)] active:translate-y-0 active:shadow-[0_6px_14px_rgba(8,68,73,0.32)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_20px_rgba(8,68,73,0.30)]";

// Small text links: teal for "switch login mode" actions, gold for the
// "Register" action — same distinction the reference image uses so New
// vendor? Register reads as a visually separate call-to-action.
const TEAL_LINK = "text-xs font-semibold text-[#008F99] underline decoration-1 underline-offset-2 hover:text-[#006E76]";
const GOLD_LINK = "text-xs font-semibold";

const OFFICIALS = [
  {
    name: "Shri. Ajeev Patil",
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

/* ── Main heading — identical to Branding.jsx ── */
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

/* ── System banner — identical to Branding.jsx, just a touch more depth ── */
function SystemBanner() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="flex w-full max-w-[560px] items-center justify-center gap-3 rounded-full border-2 px-7 py-3 shadow-[0_10px_28px_-8px_rgba(8,68,73,0.45)] sm:px-8"
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

/* ── One official's circular profile — identical to Branding.jsx ── */
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

// mobileStage: "entry" (typing mobile) -> "checked" (we now know if it's a new or existing user)
const MOBILE_STAGE = { ENTRY: "entry", CHECKED: "checked" };

export default function Login() {
  const { sendOtp, verifyOtp, loginWithPassword, loginWithIdentifier, registerVendor, sendRegistrationOtp, otpSent, resetOtpFlow } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ── Single "Login as" dropdown drives everything ──
  const [loginRole, setLoginRole] = useState("vendor");
  const isOtpRole = loginRole === "vendor";

  // ── Vendor: OTP vs Password vs Register toggle ──
  const [vendorLoginMode, setVendorLoginMode] = useState("otp"); // "otp" | "password" | "register"
  const [identifier, setIdentifier] = useState(""); // mobile / username (login)
  const [regFullName, setRegFullName] = useState("");
  const [regUserName, setRegUserName] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regOtp, setRegOtp] = useState("");
  const [sendingRegOtp, setSendingRegOtp] = useState(false);

  // ── Staff: Username/Password (default, unchanged) vs OTP vs Mobile+Password ──
  const [staffLoginMode, setStaffLoginMode] = useState("password"); // "password" | "otp" | "mobile"

  // ── OTP state (Vendor) ──
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [mobileStage, setMobileStage] = useState(MOBILE_STAGE.ENTRY);
  const [checkingMobile, setCheckingMobile] = useState(false);

  // ── Password state (Staff) ──
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const resetOtpTab = () => {
    setMobileStage(MOBILE_STAGE.ENTRY);
    setOtp("");
    setMobile("");
  };

  const resetPasswordTab = () => {
    setUserName("");
    setPassword("");
  };

  const resetVendorPasswordTab = () => {
    setIdentifier("");
    setPassword("");
  };

  const resetVendorRegisterTab = () => {
    setRegFullName("");
    setRegUserName("");
    setRegMobile("");
    setRegPassword("");
    setRegOtpSent(false);
    setRegOtp("");
  };

  const handleRoleChange = (e) => {
    setLoginRole(e.target.value);
    setError("");
    resetOtpFlow();
    resetOtpTab();
    resetPasswordTab();
    resetVendorPasswordTab();
    resetVendorRegisterTab();
    setVendorLoginMode("otp");
    setStaffLoginMode("password");
  };

  // ── OTP: Step 1 — Check whether this mobile number is registered ──
  const handleCheckMobile = async (e) => {
    e.preventDefault();
    setError("");
    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setCheckingMobile(true);
    const result = await checkMobile(mobile);
    setCheckingMobile(false);
    if (!result.success) {
      setError(result.message || "Could not verify this number. Please try again.");
      return;
    }

    if (!result.exists) {
      if (isOtpRole) {
        // ── Vendor — send straight to the full one-time Register form (name, username,
        //    mobile, password) instead of a partial OTP-only signup that only asks for a name. ──
        resetVendorRegisterTab();
        setRegMobile(mobile);
        setVendorLoginMode("register");
      } else {
        // ── Staff — no self-registration; accounts are created by the Super Admin only. ──
        setError("No account found for this mobile number. Please contact your administrator.");
      }
      return;
    }

    setMobileStage(MOBILE_STAGE.CHECKED);
  };

  // ── OTP: Step 2 — Send OTP (mobile is already a registered account at this point) ──
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await sendOtp(mobile);
    setSubmitting(false);
    if (!result.success) setError(result.message || "Failed to send OTP.");
  };

  // ── OTP: Step 3 — Verify OTP + Login (this mobile is always an already-registered account,
  //    since new numbers get routed to the full Register form at Step 1 for vendors, or
  //    rejected outright for staff) ──
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await verifyOtp({ mobileNo: mobile, otp, expectedRole: isOtpRole ? undefined : loginRole });
    setSubmitting(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message || "Invalid OTP.");
    }
  };

  const handleChangeMobile = () => {
    resetOtpFlow();
    resetOtpTab();
    setError("");
  };

  // ── Vendor: Password login (mobile / application no. / username) ──
  const handleVendorPasswordLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await loginWithIdentifier({ identifier, password });
    setSubmitting(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message || "Invalid login. Please try again.");
    }
  };

  const toggleVendorLoginMode = (mode) => {
    setError("");
    resetOtpFlow();
    resetOtpTab();
    resetVendorPasswordTab();
    resetVendorRegisterTab();
    setVendorLoginMode(mode);
  };

  const toggleStaffLoginMode = (mode) => {
    setError("");
    resetOtpFlow();
    resetOtpTab();
    resetPasswordTab();
    resetVendorPasswordTab(); // shared identifier/password fields, also used for staff mobile-login
    setStaffLoginMode(mode);
  };

  // ── Staff: Mobile Number + Password login (same account as username/password — just a
  //    different identifier) ──
  const handleStaffMobileLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await loginWithIdentifier({ identifier, password, expectedRole: loginRole });
    setSubmitting(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message || "Invalid login. Please try again.");
    }
  };

  // ── Vendor: Register Step 1 — send an OTP to verify the mobile number belongs to them ──
  const handleSendRegistrationOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (!regFullName.trim() || !/^\d{10}$/.test(regMobile) || !regPassword) {
      setError("Please fill in all fields with a valid 10-digit mobile number.");
      return;
    }
    setSendingRegOtp(true);
    const result = await sendRegistrationOtp(regMobile);
    setSendingRegOtp(false);
    if (!result.success) {
      setError(result.message || "Failed to send OTP.");
      return;
    }
    setRegOtpSent(true);
  };

  // ── Vendor: Register Step 2 — verify the OTP and create/update the account ──
  const handleVendorRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await registerVendor({
      fullName: regFullName,
      userName: regUserName,
      mobileNumber: regMobile,
      password: regPassword,
      otp: regOtp,
    });
    setSubmitting(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message || "Registration failed. Please try again.");
    }
  };

  const handleChangeRegDetails = () => {
    setRegOtpSent(false);
    setRegOtp("");
    setError("");
  };

  // ── Password login (Staff) ──
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await loginWithPassword({ userName, password, expectedRole: loginRole });
    setSubmitting(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message || "Invalid username or password.");
    }
  };

  // Both vendor and staff can use the same OTP stage-1/2/3 UI below — this just decides
  // whether either of them currently has OTP mode active.
  const showOtpFlow = (isOtpRole && vendorLoginMode === "otp") || (!isOtpRole && staffLoginMode === "otp");

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-cover bg-center lg:h-screen lg:overflow-hidden"
      style={{ backgroundColor: CREAM, backgroundImage: `url(${backgroundLanding})` }}
    >

      {/* Layer 3 — Main content — identical structure to Branding.jsx */}
      <div className="relative z-20 flex min-h-screen flex-col px-5 py-4 sm:px-8 lg:px-10">
        {/* Header row — logo top-left, identical to Branding.jsx */}
        <div className="flex items-center pb-2">
          <img
            src={corpLogo}
            alt="Vasai Virar City Municipal Corporation"
            className="h-28 w-28 shrink-0 rounded-full object-cover shadow-lg sm:h-32 sm:w-32"
          />
        </div>

        {/* Branding content — centered at the top of the page */}
        <div className="relative mx-auto mt-4 flex w-full max-w-4xl flex-1 flex-col items-center justify-start gap-3 py-0 text-center lg:mx-0 lg:max-w-none lg:pr-[460px] lg:-translate-y-5 xl:pr-[520px]">
          <BrandHeader />
          <SystemBanner />

          <p
            className="max-w-[680px] text-center text-sm font-medium leading-relaxed sm:text-base"
            style={{ color: TEAL }}
          >
            A comprehensive digital platform for registration, survey, certificate issuance,
            grievance redressal and welfare of street vendors.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            LOGIN FORM — every field, handler, and piece of logic below is
            unchanged from the existing implementation. Shifted to the right
            side on desktop (absolutely positioned, vertically centered);
            normal centered flow on mobile/tablet.
            ═══════════════════════════════════════════════════════════ */}
        <div className="mx-auto mt-6 w-full max-w-[420px] lg:absolute lg:right-10 lg:top-1/2 lg:mx-0 lg:mt-0 lg:-translate-y-1/2 xl:right-16">
          <div
            className="rounded-2xl border-2 bg-white p-5 shadow-[0_24px_60px_-15px_rgba(8,68,73,0.22),0_2px_8px_rgba(8,68,73,0.06)] sm:p-6"
            style={{ borderColor: GOLD }}
          >
            <h2 className="text-lg font-black tracking-tight" style={{ color: TEAL }}>
              Welcome Back! 
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-700">Sign in to continue to your dashboard</p>

            {/* ── Single "Login as" dropdown — drives OTP vs Password flow ── */}
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                Login as<span className="ml-1 text-red-500">*</span>
              </label>
              <div className={INPUT_WRAP}>
                <FiShield className="mr-2.5 text-[#6380A2]" size={16} />
                <select
                  value={loginRole}
                  onChange={handleRoleChange}
                  className="w-full appearance-none bg-transparent text-xs font-semibold text-[#102B50] outline-none"
                >
                  {LOGIN_ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none text-[#6380A2]" size={14} />
              </div>
            </div>

            {/* ══════════════ VENDOR — toggle between OTP / Password / Register ══════════════ */}
            {isOtpRole && (
              <div className="mt-3 flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
                {vendorLoginMode !== "otp" && (
                  <button
                    type="button"
                    onClick={() => toggleVendorLoginMode("otp")}
                    className={TEAL_LINK}
                  >
                    Login with OTP
                  </button>
                )}
                {vendorLoginMode !== "password" && (
                  <button
                    type="button"
                    onClick={() => toggleVendorLoginMode("password")}
                    className={TEAL_LINK}
                  >
                    Login with Password
                  </button>
                )}
                {vendorLoginMode !== "register" && (
                  <button
                    type="button"
                    onClick={() => toggleVendorLoginMode("register")}
                    className={GOLD_LINK}
                    style={{ color: GOLD }}
                  >
                    New vendor? Register
                  </button>
                )}
              </div>
            )}

            {/* ══════════════ VENDOR — REGISTER STEP 1 — details, then Send OTP ══════════════ */}
            {isOtpRole && vendorLoginMode === "register" && !regOtpSent && (
              <form onSubmit={handleSendRegistrationOtp} className="mt-3.5 space-y-3.5">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                    Full Name<span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className={INPUT_WRAP}>
                    <FiUser className="mr-2.5 text-[#6380A2]" size={16} />
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-400"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                    Username <span className="font-normal text-slate-500">(optional)</span>
                  </label>
                  <div className={INPUT_WRAP}>
                    <FiUser className="mr-2.5 text-[#6380A2]" size={16} />
                    <input
                      type="text"
                      value={regUserName}
                      onChange={(e) => setRegUserName(e.target.value)}
                      placeholder="Leave blank to use your mobile number"
                      className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                    Mobile Number<span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className={INPUT_WRAP}>
                    <FiPhone className="mr-2.5 text-[#6380A2]" size={16} />
                    <input
                      type="tel"
                      value={regMobile}
                      onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10-digit mobile number"
                      className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                    Password<span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className={INPUT_WRAP}>
                    <FiLock className="mr-2.5 text-[#6380A2]" size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Choose a password"
                      className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-slate-500 transition hover:text-[#0EA5A8]"
                    >
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={sendingRegOtp} className={PRIMARY_BUTTON}>
                  <FiLogIn size={16} />
                  {sendingRegOtp ? "Sending OTP..." : "Send OTP to Verify"}
                </button>

                <p className="pt-1 text-center text-[11px] font-medium text-slate-600">
                  If a Counter Officer already registered you, this will just set your
                  username and password on that existing account — nothing is duplicated.
                </p>
              </form>
            )}

            {/* ══════════════ VENDOR — REGISTER STEP 2 — verify OTP, then create account ══════════════ */}
            {isOtpRole && vendorLoginMode === "register" && regOtpSent && (
              <form onSubmit={handleVendorRegister} className="mt-3.5 space-y-3.5">
                <button
                  type="button"
                  onClick={handleChangeRegDetails}
                  className="flex items-center gap-1 text-xs font-semibold text-[#008F99] hover:text-[#006E76]"
                >
                  <FiArrowLeft size={13} /> {regMobile}
                </button>

                <p className="text-center text-xs font-medium text-slate-700">
                  Enter the 6-digit OTP sent to{" "}
                  <span className="font-bold text-[#102B50]">{regMobile}</span>
                </p>

                <OtpInput value={regOtp} onChange={setRegOtp} length={6} />

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={submitting || regOtp.length !== 6} className={PRIMARY_BUTTON}>
                  <FiLogIn size={16} />
                  {submitting ? "Verifying..." : "Verify & Register"}
                </button>

                <button
                  type="button"
                  onClick={handleSendRegistrationOtp}
                  disabled={sendingRegOtp}
                  className="w-full text-center text-xs font-semibold text-[#008F99] hover:text-[#006E76]"
                >
                  {sendingRegOtp ? "Resending..." : "Resend OTP"}
                </button>
              </form>
            )}

            {/* ══════════════ VENDOR — PASSWORD LOGIN — mobile / username ══════════════ */}
            {isOtpRole && vendorLoginMode === "password" && (
              <form onSubmit={handleVendorPasswordLogin} className="mt-3.5 space-y-3.5">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                    Mobile Number / Username<span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className={INPUT_WRAP}>
                    <FiUser className="mr-2.5 text-[#6380A2]" size={16} />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="Mobile number or username"
                      className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-400"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                    Password<span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className={INPUT_WRAP}>
                    <FiLock className="mr-2.5 text-[#6380A2]" size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-slate-500 transition hover:text-[#0EA5A8]"
                    >
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={submitting} className={PRIMARY_BUTTON}>
                  <FiLogIn size={16} />
                  {submitting ? "Signing in..." : "Sign In"}
                </button>

                <p className="pt-1 text-center text-[11px] font-medium text-slate-600">
                  New here? If your registration was filled by a Counter Officer, your default
                  password is your mobile number.
                </p>
              </form>
            )}

            {/* ══════════════ VENDOR — OTP STAGE 1 — Mobile entry, check registration ══════════════ */}
            {showOtpFlow && mobileStage === MOBILE_STAGE.ENTRY && (
              <form onSubmit={handleCheckMobile} className="mt-3.5 space-y-3.5">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                    Mobile Number<span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className={INPUT_WRAP}>
                    <FiPhone className="mr-2.5 text-[#6380A2]" size={16} />
                    <input
                      type="tel"
                      value={mobile}
                      maxLength={10}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter your mobile number"
                      className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-400"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={checkingMobile} className={PRIMARY_BUTTON}>
                  <FiLogIn size={16} />
                  {checkingMobile ? "Checking..." : "Continue"}
                </button>

                <p className="pt-1 text-center text-[11px] font-medium text-slate-600">
                  New vendor? Just enter your mobile number above — we'll set up your account automatically.
                </p>
              </form>
            )}

            {/* ══════════════ VENDOR — OTP STAGE 2 — Registered / New-user banner, then Send OTP ══════════════ */}
            {showOtpFlow && mobileStage === MOBILE_STAGE.CHECKED && !otpSent && (
              <form onSubmit={handleSendOtp} className="mt-3.5 space-y-3.5">
                <button
                  type="button"
                  onClick={handleChangeMobile}
                  className="flex items-center gap-1 text-xs font-semibold text-[#008F99] hover:text-[#006E76]"
                >
                  <FiArrowLeft size={13} /> {mobile}
                </button>

                <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-medium text-emerald-800">
                  <FiCheckCircle className="mt-0.5 shrink-0" size={15} />
                  <span>Welcome back! We'll send a one-time password to verify it's you.</span>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={submitting} className={PRIMARY_BUTTON}>
                  <FiLogIn size={16} />
                  {submitting ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            )}

            {/* ══════════════ VENDOR — OTP STAGE 3 — Verify — 6-box OTP only ══════════════ */}
            {showOtpFlow && otpSent && (
              <form onSubmit={handleVerifyOtp} className="mt-3.5 space-y-3.5">
                <p className="text-center text-xs font-medium text-slate-700">
                  Enter the 6-digit OTP sent to{" "}
                  <span className="font-bold text-[#102B50]">{mobile}</span>
                </p>

                <OtpInput value={otp} onChange={setOtp} length={6} />

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={submitting || otp.length !== 6} className={PRIMARY_BUTTON}>
                  <FiLogIn size={16} />
                  {submitting ? "Verifying..." : "Verify & Login"}
                </button>

                <button
                  type="button"
                  onClick={handleChangeMobile}
                  className="w-full text-center text-xs font-semibold text-[#008F99] hover:text-[#006E76]"
                >
                  Change mobile number / Resend OTP
                </button>
              </form>
            )}

            {/* ══════════════ STAFF — toggle between Username/Password, OTP, Mobile+Password ══════════════ */}
            {!isOtpRole && (
              <div className="mt-3 flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
                {staffLoginMode !== "password" && (
                  <button
                    type="button"
                    onClick={() => toggleStaffLoginMode("password")}
                    className={TEAL_LINK}
                  >
                    Login with Username
                  </button>
                )}
                {staffLoginMode !== "otp" && (
                  <button
                    type="button"
                    onClick={() => toggleStaffLoginMode("otp")}
                    className={TEAL_LINK}
                  >
                    Login with OTP
                  </button>
                )}
                {staffLoginMode !== "mobile" && (
                  <button
                    type="button"
                    onClick={() => toggleStaffLoginMode("mobile")}
                    className={TEAL_LINK}
                  >
                    Login with Mobile
                  </button>
                )}
              </div>
            )}

            {/* ══════════════ STAFF — MOBILE NUMBER + PASSWORD LOGIN ══════════════ */}
            {!isOtpRole && staffLoginMode === "mobile" && (
              <form onSubmit={handleStaffMobileLogin} className="mt-3.5 space-y-3.5">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                    Mobile Number<span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className={INPUT_WRAP}>
                    <FiPhone className="mr-2.5 text-[#6380A2]" size={16} />
                    <input
                      type="tel"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10-digit mobile number"
                      className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-400"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                    Password<span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className={INPUT_WRAP}>
                    <FiLock className="mr-2.5 text-[#6380A2]" size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-slate-500 transition hover:text-[#0EA5A8]"
                    >
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={submitting} className={PRIMARY_BUTTON}>
                  <FiLogIn size={16} />
                  {submitting ? "Signing in..." : "Sign In"}
                </button>
              </form>
            )}

            {/* ══════════════ STAFF — PASSWORD LOGIN FORM (default, unchanged) ══════════════ */}
            {!isOtpRole && staffLoginMode === "password" && (
              <form onSubmit={handlePasswordLogin} className="mt-3.5 space-y-3.5">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                    Username<span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className={INPUT_WRAP}>
                    <FiUser className="mr-2.5 text-[#6380A2]" size={16} />
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-400"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                    Password<span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className={INPUT_WRAP}>
                    <FiLock className="mr-2.5 text-[#6380A2]" size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-slate-500 transition hover:text-[#0EA5A8]"
                    >
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                  <div className="mt-1.5 flex justify-end">
                    <button type="button" className="text-xs font-semibold text-[#008F99] transition hover:text-[#006E76]">
                      Forgot Password?
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={submitting} className={PRIMARY_BUTTON}>
                  <FiLogIn size={16} />
                  {submitting ? "Signing in..." : "Sign In"}
                </button>

                {/* ── Register link — changes based on which role is selected ── */}
                {loginRole === "super_admin" ? (
                  <div className="pt-1 text-center text-[11px] font-medium text-slate-600">
                    Need to add a new officer?{" "}
                    <Link to="/register-officer" className="font-bold text-[#008F99] hover:text-[#006E76]">
                      Register Officer
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[11px] text-slate-700">
                    <FiInfo className="mt-0.5 shrink-0 text-[#0EA5A8]" size={14} />
                    <p>Don't have an account yet? Contact your Super Admin to get registered.</p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Officials — identical to Branding.jsx */}
        <div className="mt-0 shrink-0 border-t pt-3 pb-3" style={{ borderColor: "rgba(217,130,25,0.25)" }}>
                  {/* <div className="mx-auto flex max-w-4xl flex-wrap items-start justify-between gap-x-6 gap-y-4 sm:justify-center sm:gap-x-14 lg:mx-0 lg:max-w-none lg:justify-start lg:gap-x-28 lg:pr-[460px] xl:pr-[520px] xl:gap-x-32"> */}
          
          <div className="mx-auto flex max-w-4xl flex-wrap items-start justify-between gap-x-6 gap-y-4 sm:justify-center sm:gap-x-14 lg:mx-0 lg:max-w-none lg:justify-start lg:gap-x-28 lg:pr-[460px] xl:pr-[520px] xl:gap-x-32" style={{ marginLeft: "90px" }}>
            {OFFICIALS.map((o) => (
              <OfficialProfile key={o.name} {...o} />
            ))}
          
            </div>
        
        </div>
      </div>
    </div>
  );
}