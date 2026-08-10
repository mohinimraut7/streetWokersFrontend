// // import { useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { FiLock, FiPhone, FiLogIn } from "react-icons/fi";
// // import Card from "../../../components/ui/Card";
// // import Button from "../../../components/ui/Button";
// // import { Input } from "../../../components/ui/Field";
// // import { useAuth } from "../hooks/useAuth";

// // export default function Login() {
// //   const { login } = useAuth();
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [mobile, setMobile] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const [submitting, setSubmitting] = useState(false);

// //   const from = location.state?.from?.pathname || "/vendors/register";

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setSubmitting(true);
// //     const result = login({ mobile, password });
// //     setSubmitting(false);
// //     if (result.success) {
// //       navigate(from, { replace: true });
// //     } else {
// //       setError(result.message || "Invalid mobile number or password.");
// //     }
// //   };

// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-surface px-4">
// //       <div className="w-full max-w-md">
// //         <div className="mb-6 flex flex-col items-center text-center">
// //           <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-xl font-extrabold text-white shadow-[var(--shadow-brand)]">
// //             SV
// //           </div>
// //           <h1 className="font-display text-xl font-bold text-ink-900">Street Vendors Management</h1>
// //           <p className="mt-1 text-sm text-ink-500">Sign in to continue to the officer dashboard</p>
// //         </div>

// //         <Card>
// //           <form onSubmit={handleSubmit} className="space-y-5">
// //             <Input
// //               label="Mobile Number"
// //               required
// //               icon={FiPhone}
// //               placeholder="Enter registered mobile number"
// //               maxLength={10}
// //               value={mobile}
// //               onChange={(e) => setMobile(e.target.value)}
// //             />
// //             <Input
// //               type="password"
// //               label="Password"
// //               required
// //               icon={FiLock}
// //               placeholder="Enter password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //             />

// //             {error && (
// //               <p className="rounded-xl bg-danger-100 px-3.5 py-2.5 text-xs font-semibold text-danger-500">
// //                 {error}
// //               </p>
// //             )}

// //             <Button type="submit" className="w-full" icon={FiLogIn} disabled={submitting}>
// //               {submitting ? "Signing in..." : "Sign In"}
// //             </Button>

// //             <p className="rounded-xl bg-ink-50 px-3.5 py-2.5 text-center text-[11px] text-ink-500">
// //               Demo credentials &mdash; Mobile: <span className="id-mono font-semibold">9999999999</span>,
// //               Password: <span className="id-mono font-semibold">admin123</span>
// //             </p>
// //           </form>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }















// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   FiLock,
//   FiPhone,
//   FiLogIn,
//   FiGlobe,
//   FiChevronDown,
//   FiEye,
//   FiEyeOff,
//   FiShield,
//   FiZap,
//   FiBarChart2,
//   FiHeadphones,
//   FiInfo,
// } from "react-icons/fi";
// import logo from "../../../assets/logovvcmc.jpg";

// import { useAuth } from "../hooks/useAuth";
// import loginBg from "../../../assets/login.png";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const from = location.state?.from?.pathname || "/vendors/register";

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setError("");
//     setSubmitting(true);

//     const result = login({
//       mobile,
//       password,
//     });

//     setSubmitting(false);

//     if (result.success) {
//       navigate(from, { replace: true });
//     } else {
//       setError(result.message || "Invalid mobile number or password.");
//     }
//   };

//   return (
//     <div
//       className="relative min-h-screen overflow-hidden bg-slate-950 bg-cover bg-center"
//       style={{
//         backgroundImage: `url(${loginBg})`,
//       }}
//     >
//       {/* Background overlay
//       <div className="absolute inset-0 bg-slate-950/40" />
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-950/30 via-transparent to-cyan-950/40" />
//       <div className="absolute inset-0 backdrop-blur-[1px]" /> */}

//       {/* Soft White Background Overlay */}
// <div className="absolute inset-0 bg-white/20" />

// {/* Very subtle teal atmosphere */}
// <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#0EA5A8]/15" />

// {/* Very light blur */}
// <div className="absolute inset-0 backdrop-blur-[0.5px]" />

//       {/* Main content */}
//       <div className="relative z-10 flex min-h-screen flex-col px-5 py-5 sm:px-8 lg:px-10">

//         {/* ================= HEADER ================= */}
//         <header className="flex items-start justify-between">
//           <div className="flex items-center gap-2.5">
//             <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/90 shadow-lg backdrop-blur-md">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-2 ring-white/70">
//                 <img
//                   src={logo}
//                   alt="Municipal Corporation"
//                   className="h-full w-full object-contain p-1"
//                 />
//               </div>
//             </div>

//             <div className="relative inline-block">
//   {/* Soft white glow behind branding */}
//   <div
//     className="
//       pointer-events-none
//       absolute
//       -inset-x-8
//       -inset-y-7
//       -z-10
//       rounded-3xl
//       bg-white/100
//       blur-2xl
//     "
//   />

//   <div className="text-[#102B50]">
//     <h1
//       className="
//         text-sm
//         font-bold
//         tracking-tight
//         drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]
//         sm:text-base
//       "
//     >
//       Vasai Virar City Municipal Corporation
//     </h1>

//     <p
//       className="
//         text-[11px]
//         font-medium
//         text-white
//         drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]
//         sm:text-xs
//       "
//     >
//       Smart City, Better Tomorrow
//     </p>
//   </div>
// </div>
//           </div>

          
//         </header>

//         {/* ================= MAIN ================= */}
//         <main className="mx-auto flex w-full max-w-[1450px] flex-1 items-center">
//           <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_0.85fr] xl:gap-14">

//             {/* ================= LEFT SIDE ================= */}
//             <section className="hidden lg:block">
//   <div className="relative max-w-lg pl-4 xl:pl-8">

//     {/* Soft glow behind text for legibility against the photo */}
//     <div className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-[40px] bg-gradient-to-br from-white/95 via-white/100 to-transparent blur-3xl" />

//     <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
//       Smart Governance Platform
//     </p>

//     <h2 className="text-3xl font-black leading-[1.08] tracking-tight text-[#102B50] drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)] xl:text-5xl">
//       Street Vendors
//       <br />
//       <span className="text-[#0EA5A8] drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]">
//         Management System
//       </span>
//     </h2>

//     <div className="mt-3 h-1 w-12 rounded-full bg-[#0EA5A8]" />

//     <p className="mt-3 max-w-md text-base font-medium leading-relaxed text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
//       Empowering Vendors.
//       <br />
//       Building Better, Smarter Cities.
//     </p>
//   </div>

//   {/* Feature Cards - pinned lower, small */}
//   <div className="mt-45 flex gap-3 pl-4 xl:pl-8">
//     <FeatureCard
//       icon={FiShield}
//       title="Secure & Trusted"
//       description="Your data is safe with top-notch security"
//     />
//     <FeatureCard
//       icon={FiZap}
//       title="Easy & Efficient"
//       description="Simplified process for vendors and officers"
//     />
//     <FeatureCard
//       icon={FiBarChart2}
//       title="Transparent System"
//       description="Track applications and updates with transparency"
//     />
//   </div>
// </section>

//             {/* ================= LOGIN CARD ================= */}
//             <section className="flex justify-center lg:justify">
//               <div className="relative w-full max-w-[440px]">

//                 {/* Glow */}
//                 <div className="absolute -inset-1.5 rounded-[28px] bg-cyan-300/20 blur-xl" />

//                 {/* Glass Card */}
//                 <div className="relative overflow-hidden rounded-[26px] border border-white/60 bg-white/25 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-6">

                  

//                   <div className="relative">

//                     {/* SV Logo */}
//                     {/* <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#11B8B2] to-[#078D96] text-lg font-black text-white shadow-[0_8px_20px_rgba(14,165,168,0.35)]">
//                       SV
//                     </div> */}

//                     {/* Heading */}
//                     <h2 className="text-xl font-black tracking-tight text-[#102B50]">
//                       Welcome Back! 👋
//                     </h2>
//                     <p className="mt-1 text-xs font-medium text-slate-700">
//                       Sign in to continue to the officer dashboard
//                     </p>

//                     {/* Form */}
//                     <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">

//                       {/* Mobile */}
//                       <div>
//                         <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
//                           Mobile Number
//                           <span className="ml-1 text-red-500">*</span>
//                         </label>

//                         <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
//                           <FiPhone className="mr-2.5 text-[#6380A2]" size={16} />
//                           <input
//                             type="tel"
//                             value={mobile}
//                             maxLength={10}
//                             onChange={(e) =>
//                               setMobile(e.target.value.replace(/\D/g, ""))
//                             }
//                             placeholder="Enter registered mobile number"
//                             className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
//                             required
//                           />
//                         </div>
//                       </div>

//                       {/* Password */}
//                       <div>
//                         <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
//                           Password
//                           <span className="ml-1 text-red-500">*</span>
//                         </label>

//                         <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
//                           <FiLock className="mr-2.5 text-[#6380A2]" size={16} />
//                           <input
//                             type={showPassword ? "text" : "password"}
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Enter password"
//                             className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
//                             required
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="ml-2 text-slate-500 transition hover:text-[#0EA5A8]"
//                           >
//                             {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
//                           </button>
//                         </div>

//                         <div className="mt-1.5 flex justify-end">
//                           <button
//                             type="button"
//                             className="text-xs font-semibold text-[#008F99] transition hover:text-[#006E76]"
//                           >
//                             Forgot Password?
//                           </button>
//                         </div>
//                       </div>

//                       {/* Error */}
//                       {error && (
//                         <div className="rounded-xl border border-red-200 bg-red-50/80 px-3.5 py-2.5 text-xs font-semibold text-red-600">
//                           {error}
//                         </div>
//                       )}

//                       {/* Login Button */}
//                       <button
//                         type="submit"
//                         disabled={submitting}
//                         className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,165,168,0.30)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,165,168,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
//                       >
//                         <FiLogIn size={16} />
//                         {submitting ? "Signing in..." : "Sign In"}
//                       </button>

                

                  
//                       {/* Demo Credentials */}
//                       <div className="flex items-start gap-4 rounded-xl border border-white/50 bg-white/20 px-3.5 py-2.5 text-[11px] text-slate-700 backdrop-blur-md">
//                         <FiInfo className="mt-0.5 shrink-0 text-[#0EA5A8]" size={14} />
//                         <p>
//                           <span className="font-bold">Demo credentials</span>
//                           <br />
//                           Mobile: <span className="font-bold">9999999999</span>
//                           {"  |  "}
//                           Password: <span className="font-bold">admin123</span>
//                         </p>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </main>

//         {/* ================= FOOTER ================= */}
//         <footer className="relative z-20 flex flex-wrap justify-center gap-4 pb-1 pt-2 text-[11px] font-medium text-white/90 lg:justify-end lg:pr-5">
//           <button className="flex items-center gap-1.5 hover:text-white">
//             <FiHeadphones size={13} />
//             Help & Support
//           </button>
//           <span className="text-white/40">|</span>
//           <button className="hover:text-white">Privacy Policy</button>
//         </footer>
//       </div>
//     </div>
//   );
// }

// /* ================= FEATURE CARD ================= */

// function FeatureCard({ icon: Icon, title, description }) {
//   return (
//     <div className="w-[135px] rounded-xl border border-white/30 bg-black/20 p-3 text-white shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-black/30">
//       <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
//         <Icon size={14} />
//       </div>
//       <h3 className="text-[11px] font-bold">{title}</h3>
//       <p className="mt-1 text-[9px] leading-3 text-white/75">{description}</p>
//     </div>
//   );
// }




// =======================================


// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   FiLock,
//   FiPhone,
//   FiUser,
//   FiLogIn,
//   FiEye,
//   FiEyeOff,
//   FiShield,
//   FiZap,
//   FiBarChart2,
//   FiHeadphones,
//   FiInfo,
//   FiChevronDown,
// } from "react-icons/fi";
// import logo from "../../../assets/logovvcmc.jpg";

// import { useAuth } from "../hooks/useAuth";
// import { STAFF_ROLES } from "../services/authService";
// import loginBg from "../../../assets/login.png";

// const TABS = { OTP: "otp", PASSWORD: "password" };

// export default function Login() {
//   const { sendOtp, verifyOtp, loginWithPassword, otpSent, resetOtpFlow } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [activeTab, setActiveTab] = useState(TABS.OTP);

//   // ── OTP tab state (Vendor / Citizen) ──
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [fullName, setFullName] = useState("");

//   // ── Password tab state (Staff) ──
//   const [role, setRole] = useState(STAFF_ROLES[0].value);
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const from = location.state?.from?.pathname || "/";

//   const switchTab = (tab) => {
//     setActiveTab(tab);
//     setError("");
//     resetOtpFlow();
//   };

//   // ── OTP: Step 1 — Send OTP ──
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     const result = await sendOtp(mobile);
//     setSubmitting(false);
//     if (!result.success) setError(result.message || "Failed to send OTP.");
//   };

//   // ── OTP: Step 2 — Verify OTP + Login (auto-registers on first login) ──
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     const result = await verifyOtp({ mobileNo: mobile, otp, fullName });
//     setSubmitting(false);
//     if (result.success) {
//       navigate(from, { replace: true });
//     } else {
//       setError(result.message || "Invalid OTP.");
//     }
//   };

//   // ── Password login (Staff) ──
//   const handlePasswordLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     const result = await loginWithPassword({ userName, password, expectedRole: role });
//     setSubmitting(false);
//     if (result.success) {
//       navigate(from, { replace: true });
//     } else {
//       setError(result.message || "Invalid username or password.");
//     }
//   };

//   return (
//     <div
//       className="relative min-h-screen overflow-hidden bg-slate-950 bg-cover bg-center"
//       style={{ backgroundImage: `url(${loginBg})` }}
//     >
//       {/* Soft White Background Overlay */}
//       <div className="absolute inset-0 bg-white/20" />
//       <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#0EA5A8]/15" />
//       <div className="absolute inset-0 backdrop-blur-[0.5px]" />

//       {/* Main content */}
//       <div className="relative z-10 flex min-h-screen flex-col px-5 py-5 sm:px-8 lg:px-10">

//         {/* ================= HEADER ================= */}
//         <header className="flex items-start justify-between">
//           <div className="flex items-center gap-2.5">
//             <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/90 shadow-lg backdrop-blur-md">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-2 ring-white/70">
//                 <img src={logo} alt="Municipal Corporation" className="h-full w-full object-contain p-1" />
//               </div>
//             </div>

//             <div className="relative inline-block">
//               <div className="pointer-events-none absolute -inset-x-8 -inset-y-7 -z-10 rounded-3xl bg-white/100 blur-2xl" />
//               <div className="text-[#102B50]">
//                 <h1 className="text-sm font-bold tracking-tight drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)] sm:text-base">
//                   Vasai Virar City Municipal Corporation
//                 </h1>
//                 <p className="text-[11px] font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] sm:text-xs">
//                   Smart City, Better Tomorrow
//                 </p>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* ================= MAIN ================= */}
//         <main className="mx-auto flex w-full max-w-[1450px] flex-1 items-center">
//           <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_0.85fr] xl:gap-14">

//             {/* ================= LEFT SIDE ================= */}
//             <section className="hidden lg:block">
//               <div className="relative max-w-lg pl-4 xl:pl-8">
//                 <div className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-[40px] bg-gradient-to-br from-white/95 via-white/100 to-transparent blur-3xl" />
//                 <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
//                   Smart Governance Platform
//                 </p>
//                 <h2 className="text-3xl font-black leading-[1.08] tracking-tight text-[#102B50] drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)] xl:text-5xl">
//                   Street Vendors
//                   <br />
//                   <span className="text-[#0EA5A8] drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]">
//                     Management System
//                   </span>
//                 </h2>
//                 <div className="mt-3 h-1 w-12 rounded-full bg-[#0EA5A8]" />
//                 <p className="mt-3 max-w-md text-base font-medium leading-relaxed text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
//                   Empowering Vendors.
//                   <br />
//                   Building Better, Smarter Cities.
//                 </p>
//               </div>

//               <div className="mt-45 flex gap-3 pl-4 xl:pl-8">
//                 <FeatureCard icon={FiShield} title="Secure & Trusted" description="Your data is safe with top-notch security" />
//                 <FeatureCard icon={FiZap} title="Easy & Efficient" description="Simplified process for vendors and officers" />
//                 <FeatureCard icon={FiBarChart2} title="Transparent System" description="Track applications and updates with transparency" />
//               </div>
//             </section>

//             {/* ================= LOGIN CARD ================= */}
//             <section className="flex justify-center lg:justify">
//               <div className="relative w-full max-w-[440px]">
//                 <div className="absolute -inset-1.5 rounded-[28px] bg-cyan-300/20 blur-xl" />

//                 <div className="relative overflow-hidden rounded-[26px] border border-white/60 bg-white/25 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-6">
//                   <div className="relative">
//                     <h2 className="text-xl font-black tracking-tight text-[#102B50]">Welcome Back! 👋</h2>
//                     <p className="mt-1 text-xs font-medium text-slate-700">
//                       Sign in to continue to your dashboard
//                     </p>

//                     {/* ── Tabs: OTP Login / Password Login ── */}
//                     <div className="mt-4 flex rounded-xl border border-white/60 bg-white/40 p-1 backdrop-blur-md">
//                       <button
//                         type="button"
//                         onClick={() => switchTab(TABS.OTP)}
//                         className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
//                           activeTab === TABS.OTP
//                             ? "bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-white shadow"
//                             : "text-[#102B50] hover:bg-white/40"
//                         }`}
//                       >
//                         OTP Login
//                         <span className="block text-[9px] font-medium opacity-80">Vendor / Citizen</span>
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => switchTab(TABS.PASSWORD)}
//                         className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
//                           activeTab === TABS.PASSWORD
//                             ? "bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-white shadow"
//                             : "text-[#102B50] hover:bg-white/40"
//                         }`}
//                       >
//                         Password Login
//                         <span className="block text-[9px] font-medium opacity-80">Officer / Admin</span>
//                       </button>
//                     </div>

//                     {/* ══════════════ OTP LOGIN FORM ══════════════ */}
//                     {activeTab === TABS.OTP && (
//                       <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="mt-5 space-y-3.5">
//                         <div>
//                           <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
//                             Mobile Number<span className="ml-1 text-red-500">*</span>
//                           </label>
//                           <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
//                             <FiPhone className="mr-2.5 text-[#6380A2]" size={16} />
//                             <input
//                               type="tel"
//                               value={mobile}
//                               maxLength={10}
//                               disabled={otpSent}
//                               onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
//                               placeholder="Enter your mobile number"
//                               className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500 disabled:opacity-60"
//                               required
//                             />
//                           </div>
//                         </div>

//                         {otpSent && (
//                           <>
//                             <div>
//                               <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
//                                 OTP<span className="ml-1 text-red-500">*</span>
//                               </label>
//                               <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
//                                 <FiLock className="mr-2.5 text-[#6380A2]" size={16} />
//                                 <input
//                                   type="text"
//                                   value={otp}
//                                   maxLength={6}
//                                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//                                   placeholder="Enter the 6-digit OTP"
//                                   className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
//                                   required
//                                   autoFocus
//                                 />
//                               </div>
//                             </div>

//                             {/* Full name — only needed for a brand-new (first-time) vendor account */}
//                             <div>
//                               <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
//                                 Full Name <span className="font-normal text-slate-500">(only if this is your first login)</span>
//                               </label>
//                               <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
//                                 <FiUser className="mr-2.5 text-[#6380A2]" size={16} />
//                                 <input
//                                   type="text"
//                                   value={fullName}
//                                   onChange={(e) => setFullName(e.target.value)}
//                                   placeholder="Your full name"
//                                   className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
//                                 />
//                               </div>
//                             </div>
//                           </>
//                         )}

//                         {error && (
//                           <div className="rounded-xl border border-red-200 bg-red-50/80 px-3.5 py-2.5 text-xs font-semibold text-red-600">
//                             {error}
//                           </div>
//                         )}

//                         <button
//                           type="submit"
//                           disabled={submitting}
//                           className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,165,168,0.30)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,165,168,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
//                         >
//                           <FiLogIn size={16} />
//                           {submitting ? "Please wait..." : otpSent ? "Verify & Login" : "Send OTP"}
//                         </button>

//                         {otpSent && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               resetOtpFlow();
//                               setOtp("");
//                             }}
//                             className="w-full text-center text-xs font-semibold text-[#008F99] hover:text-[#006E76]"
//                           >
//                             Change mobile number / Resend OTP
//                           </button>
//                         )}
//                       </form>
//                     )}

//                     {/* ══════════════ PASSWORD LOGIN FORM (Staff) ══════════════ */}
//                     {activeTab === TABS.PASSWORD && (
//                       <form onSubmit={handlePasswordLogin} className="mt-5 space-y-3.5">
//                         <div>
//                           <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
//                             Login as<span className="ml-1 text-red-500">*</span>
//                           </label>
//                           <div className="relative flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
//                             <FiShield className="mr-2.5 text-[#6380A2]" size={16} />
//                             <select
//                               value={role}
//                               onChange={(e) => setRole(e.target.value)}
//                               className="w-full appearance-none bg-transparent text-xs font-semibold text-[#102B50] outline-none"
//                             >
//                               {STAFF_ROLES.map((r) => (
//                                 <option key={r.value} value={r.value}>
//                                   {r.label}
//                                 </option>
//                               ))}
//                             </select>
//                             <FiChevronDown className="pointer-events-none text-[#6380A2]" size={14} />
//                           </div>
//                         </div>

//                         <div>
//                           <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
//                             Username<span className="ml-1 text-red-500">*</span>
//                           </label>
//                           <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
//                             <FiUser className="mr-2.5 text-[#6380A2]" size={16} />
//                             <input
//                               type="text"
//                               value={userName}
//                               onChange={(e) => setUserName(e.target.value)}
//                               placeholder="Enter your username"
//                               className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
//                               required
//                             />
//                           </div>
//                         </div>

//                         <div>
//                           <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
//                             Password<span className="ml-1 text-red-500">*</span>
//                           </label>
//                           <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
//                             <FiLock className="mr-2.5 text-[#6380A2]" size={16} />
//                             <input
//                               type={showPassword ? "text" : "password"}
//                               value={password}
//                               onChange={(e) => setPassword(e.target.value)}
//                               placeholder="Enter password"
//                               className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
//                               required
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowPassword(!showPassword)}
//                               className="ml-2 text-slate-500 transition hover:text-[#0EA5A8]"
//                             >
//                               {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
//                             </button>
//                           </div>
//                           <div className="mt-1.5 flex justify-end">
//                             <button type="button" className="text-xs font-semibold text-[#008F99] transition hover:text-[#006E76]">
//                               Forgot Password?
//                             </button>
//                           </div>
//                         </div>

//                         {error && (
//                           <div className="rounded-xl border border-red-200 bg-red-50/80 px-3.5 py-2.5 text-xs font-semibold text-red-600">
//                             {error}
//                           </div>
//                         )}

//                         <button
//                           type="submit"
//                           disabled={submitting}
//                           className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,165,168,0.30)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,165,168,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
//                         >
//                           <FiLogIn size={16} />
//                           {submitting ? "Signing in..." : "Sign In"}
//                         </button>

//                         <div className="flex items-start gap-4 rounded-xl border border-white/50 bg-white/20 px-3.5 py-2.5 text-[11px] text-slate-700 backdrop-blur-md">
//                           <FiInfo className="mt-0.5 shrink-0 text-[#0EA5A8]" size={14} />
//                           <p>
//                             <span className="font-bold">Demo credentials</span>
//                             <br />
//                             Username: <span className="font-bold">superadmin</span>
//                             {"  |  "}
//                             Password: <span className="font-bold">Admin@123</span>
//                           </p>
//                         </div>
//                       </form>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </main>

//         {/* ================= FOOTER ================= */}
//         <footer className="relative z-20 flex flex-wrap justify-center gap-4 pb-1 pt-2 text-[11px] font-medium text-white/90 lg:justify-end lg:pr-5">
//           <button className="flex items-center gap-1.5 hover:text-white">
//             <FiHeadphones size={13} />
//             Help & Support
//           </button>
//           <span className="text-white/40">|</span>
//           <button className="hover:text-white">Privacy Policy</button>
//         </footer>
//       </div>
//     </div>
//   );
// }

// /* ================= FEATURE CARD ================= */
// function FeatureCard({ icon: Icon, title, description }) {
//   return (
//     <div className="w-[135px] rounded-xl border border-white/30 bg-black/20 p-3 text-white shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-black/30">
//       <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
//         <Icon size={14} />
//       </div>
//       <h3 className="text-[11px] font-bold">{title}</h3>
//       <p className="mt-1 text-[9px] leading-3 text-white/75">{description}</p>
//     </div>
//   );
// }


// ================================================================

// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   FiLock,
//   FiPhone,
//   FiUser,
//   FiLogIn,
//   FiEye,
//   FiEyeOff,
//   FiShield,
//   FiZap,
//   FiBarChart2,
//   FiHeadphones,
//   FiInfo,
//   FiChevronDown,
//   FiCheckCircle,
//   FiUserPlus,
//   FiArrowLeft,
// } from "react-icons/fi";
// import logo from "../../../assets/logovvcmc.jpg";

// import { useAuth } from "../hooks/useAuth";
// import { STAFF_ROLES, checkMobile } from "../services/authService";
// import OtpInput from "../components/ui/Otpinput";
// import loginBg from "../../../assets/login.png";

// const TABS = { OTP: "otp", PASSWORD: "password" };
// // mobileStage: "entry" (typing mobile) -> "checked" (we now know if it's a new or existing user)
// const MOBILE_STAGE = { ENTRY: "entry", CHECKED: "checked" };

// export default function Login() {
//   const { sendOtp, verifyOtp, loginWithPassword, otpSent, resetOtpFlow } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [activeTab, setActiveTab] = useState(TABS.OTP);

//   // ── OTP tab state (Vendor / Citizen) ──
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [mobileStage, setMobileStage] = useState(MOBILE_STAGE.ENTRY);
//   const [isNewUser, setIsNewUser] = useState(false);
//   const [checkingMobile, setCheckingMobile] = useState(false);

//   // ── Password tab state (Staff) ──
//   const [role, setRole] = useState(STAFF_ROLES[0].value);
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const from = location.state?.from?.pathname || "/";

//   const switchTab = (tab) => {
//     setActiveTab(tab);
//     setError("");
//     resetOtpFlow();
//     resetOtpTab();
//   };

//   const resetOtpTab = () => {
//     setMobileStage(MOBILE_STAGE.ENTRY);
//     setIsNewUser(false);
//     setFullName("");
//     setOtp("");
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
//     setIsNewUser(!result.exists);
//     setMobileStage(MOBILE_STAGE.CHECKED);
//   };

//   // ── OTP: Step 2 — Send OTP (only after mobile is checked; requires name if new) ──
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (isNewUser && !fullName.trim()) {
//       setError("Please enter your full name to create your account.");
//       return;
//     }
//     setSubmitting(true);
//     const result = await sendOtp(mobile);
//     setSubmitting(false);
//     if (!result.success) setError(result.message || "Failed to send OTP.");
//   };

//   // ── OTP: Step 3 — Verify OTP + Login (mobile + fullName sent silently in the payload) ──
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     const result = await verifyOtp({ mobileNo: mobile, otp, fullName });
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

//   // ── Password login (Staff) ──
//   const handlePasswordLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     const result = await loginWithPassword({ userName, password, expectedRole: role });
//     setSubmitting(false);
//     if (result.success) {
//       navigate(from, { replace: true });
//     } else {
//       setError(result.message || "Invalid username or password.");
//     }
//   };

//   return (
//     <div
//       className="relative min-h-screen overflow-hidden bg-slate-950 bg-cover bg-center"
//       style={{ backgroundImage: `url(${loginBg})` }}
//     >
//       {/* Soft White Background Overlay */}
//       <div className="absolute inset-0 bg-white/20" />
//       <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#0EA5A8]/15" />
//       <div className="absolute inset-0 backdrop-blur-[0.5px]" />

//       {/* Main content */}
//       <div className="relative z-10 flex min-h-screen flex-col px-5 py-5 sm:px-8 lg:px-10">

//         {/* ================= HEADER ================= */}
//         <header className="flex items-start justify-between">
//           <div className="flex items-center gap-2.5">
//             <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/90 shadow-lg backdrop-blur-md">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-2 ring-white/70">
//                 <img src={logo} alt="Municipal Corporation" className="h-full w-full object-contain p-1" />
//               </div>
//             </div>

//             <div className="relative inline-block">
//               <div className="pointer-events-none absolute -inset-x-8 -inset-y-7 -z-10 rounded-3xl bg-white/100 blur-2xl" />
//               <div className="text-[#102B50]">
//                 <h1 className="text-sm font-bold tracking-tight drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)] sm:text-base">
//                   Vasai Virar City Municipal Corporation
//                 </h1>
//                 <p className="text-[11px] font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] sm:text-xs">
//                   Smart City, Better Tomorrow
//                 </p>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* ================= MAIN ================= */}
//         <main className="mx-auto flex w-full max-w-[1450px] flex-1 items-center">
//           <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_0.85fr] xl:gap-14">

//             {/* ================= LEFT SIDE ================= */}
//             <section className="hidden lg:block">
//               <div className="relative max-w-lg pl-4 xl:pl-8">
//                 <div className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-[40px] bg-gradient-to-br from-white/95 via-white/100 to-transparent blur-3xl" />
//                 <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
//                   Smart Governance Platform
//                 </p>
//                 <h2 className="text-3xl font-black leading-[1.08] tracking-tight text-[#102B50] drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)] xl:text-5xl">
//                   Street Vendors
//                   <br />
//                   <span className="text-[#0EA5A8] drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]">
//                     Management System
//                   </span>
//                 </h2>
//                 <div className="mt-3 h-1 w-12 rounded-full bg-[#0EA5A8]" />
//                 <p className="mt-3 max-w-md text-base font-medium leading-relaxed text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
//                   Empowering Vendors.
//                   <br />
//                   Building Better, Smarter Cities.
//                 </p>
//               </div>

//               <div className="mt-45 flex gap-3 pl-4 xl:pl-8">
//                 <FeatureCard icon={FiShield} title="Secure & Trusted" description="Your data is safe with top-notch security" />
//                 <FeatureCard icon={FiZap} title="Easy & Efficient" description="Simplified process for vendors and officers" />
//                 <FeatureCard icon={FiBarChart2} title="Transparent System" description="Track applications and updates with transparency" />
//               </div>
//             </section>

//             {/* ================= LOGIN CARD ================= */}
//             <section className="flex justify-center lg:justify">
//               <div className="relative w-full max-w-[440px]">
//                 <div className="absolute -inset-1.5 rounded-[28px] bg-cyan-300/20 blur-xl" />

//                 <div className="relative overflow-hidden rounded-[26px] border border-white/60 bg-white/25 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-6">
//                   <div className="relative">
//                     <h2 className="text-xl font-black tracking-tight text-[#102B50]">Welcome Back! 👋</h2>
//                     <p className="mt-1 text-xs font-medium text-slate-700">
//                       Sign in to continue to your dashboard
//                     </p>

//                     {/* ── Tabs: OTP Login / Password Login ── */}
//                     <div className="mt-4 flex rounded-xl border border-white/60 bg-white/40 p-1 backdrop-blur-md">
//                       <button
//                         type="button"
//                         onClick={() => switchTab(TABS.OTP)}
//                         className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
//                           activeTab === TABS.OTP
//                             ? "bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-white shadow"
//                             : "text-[#102B50] hover:bg-white/40"
//                         }`}
//                       >
//                         OTP Login
//                         <span className="block text-[9px] font-medium opacity-80">Vendor / Citizen</span>
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => switchTab(TABS.PASSWORD)}
//                         className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
//                           activeTab === TABS.PASSWORD
//                             ? "bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-white shadow"
//                             : "text-[#102B50] hover:bg-white/40"
//                         }`}
//                       >
//                         Password Login
//                         <span className="block text-[9px] font-medium opacity-80">Officer / Admin</span>
//                       </button>
//                     </div>

//                     {/* ══════════════ OTP STAGE 1 — Mobile entry, check registration ══════════════ */}
//                     {activeTab === TABS.OTP && mobileStage === MOBILE_STAGE.ENTRY && (
//                       <form onSubmit={handleCheckMobile} className="mt-5 space-y-3.5">
//                         <div>
//                           <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
//                             Mobile Number<span className="ml-1 text-red-500">*</span>
//                           </label>
//                           <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
//                             <FiPhone className="mr-2.5 text-[#6380A2]" size={16} />
//                             <input
//                               type="tel"
//                               value={mobile}
//                               maxLength={10}
//                               onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
//                               placeholder="Enter your mobile number"
//                               className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
//                               required
//                               autoFocus
//                             />
//                           </div>
//                         </div>

//                         {error && (
//                           <div className="rounded-xl border border-red-200 bg-red-50/80 px-3.5 py-2.5 text-xs font-semibold text-red-600">
//                             {error}
//                           </div>
//                         )}

//                         <button
//                           type="submit"
//                           disabled={checkingMobile}
//                           className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,165,168,0.30)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,165,168,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
//                         >
//                           <FiLogIn size={16} />
//                           {checkingMobile ? "Checking..." : "Continue"}
//                         </button>
//                       </form>
//                     )}

//                     {/* ══════════════ OTP STAGE 2 — Registered / New-user banner, then Send OTP ══════════════ */}
//                     {activeTab === TABS.OTP && mobileStage === MOBILE_STAGE.CHECKED && !otpSent && (
//                       <form onSubmit={handleSendOtp} className="mt-5 space-y-3.5">
//                         <button
//                           type="button"
//                           onClick={handleChangeMobile}
//                           className="flex items-center gap-1 text-xs font-semibold text-[#008F99] hover:text-[#006E76]"
//                         >
//                           <FiArrowLeft size={13} /> {mobile}
//                         </button>

//                         {isNewUser ? (
//                           <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/80 px-3.5 py-2.5 text-xs font-medium text-amber-800">
//                             <FiUserPlus className="mt-0.5 shrink-0" size={15} />
//                             <span>
//                               This mobile number isn't registered yet. Enter your name below to create your
//                               account and continue.
//                             </span>
//                           </div>
//                         ) : (
//                           <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3.5 py-2.5 text-xs font-medium text-emerald-800">
//                             <FiCheckCircle className="mt-0.5 shrink-0" size={15} />
//                             <span>Welcome back! We'll send a one-time password to verify it's you.</span>
//                           </div>
//                         )}

//                         {isNewUser && (
//                           <div>
//                             <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
//                               Full Name<span className="ml-1 text-red-500">*</span>
//                             </label>
//                             <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
//                               <FiUser className="mr-2.5 text-[#6380A2]" size={16} />
//                               <input
//                                 type="text"
//                                 value={fullName}
//                                 onChange={(e) => setFullName(e.target.value)}
//                                 placeholder="Your full name"
//                                 className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
//                                 required
//                                 autoFocus
//                               />
//                             </div>
//                           </div>
//                         )}

//                         {error && (
//                           <div className="rounded-xl border border-red-200 bg-red-50/80 px-3.5 py-2.5 text-xs font-semibold text-red-600">
//                             {error}
//                           </div>
//                         )}

//                         <button
//                           type="submit"
//                           disabled={submitting}
//                           className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,165,168,0.30)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,165,168,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
//                         >
//                           <FiLogIn size={16} />
//                           {submitting ? "Sending OTP..." : isNewUser ? "Register & Send OTP" : "Send OTP"}
//                         </button>
//                       </form>
//                     )}

//                     {/* ══════════════ OTP STAGE 3 — Verify — 6-box OTP only ══════════════ */}
//                     {activeTab === TABS.OTP && otpSent && (
//                       <form onSubmit={handleVerifyOtp} className="mt-5 space-y-3.5">
//                         <p className="text-center text-xs font-medium text-slate-700">
//                           Enter the 6-digit OTP sent to{" "}
//                           <span className="font-bold text-[#102B50]">{mobile}</span>
//                         </p>

//                         <OtpInput value={otp} onChange={setOtp} length={6} />

//                         {error && (
//                           <div className="rounded-xl border border-red-200 bg-red-50/80 px-3.5 py-2.5 text-xs font-semibold text-red-600">
//                             {error}
//                           </div>
//                         )}

//                         <button
//                           type="submit"
//                           disabled={submitting || otp.length !== 6}
//                           className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,165,168,0.30)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,165,168,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
//                         >
//                           <FiLogIn size={16} />
//                           {submitting ? "Verifying..." : "Verify & Login"}
//                         </button>

//                         <button
//                           type="button"
//                           onClick={handleChangeMobile}
//                           className="w-full text-center text-xs font-semibold text-[#008F99] hover:text-[#006E76]"
//                         >
//                           Change mobile number / Resend OTP
//                         </button>
//                       </form>
//                     )}

//                     {/* ══════════════ PASSWORD LOGIN FORM (Staff) ══════════════ */}
//                     {activeTab === TABS.PASSWORD && (
//                       <form onSubmit={handlePasswordLogin} className="mt-5 space-y-3.5">
//                         <div>
//                           <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
//                             Login as<span className="ml-1 text-red-500">*</span>
//                           </label>
//                           <div className="relative flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
//                             <FiShield className="mr-2.5 text-[#6380A2]" size={16} />
//                             <select
//                               value={role}
//                               onChange={(e) => setRole(e.target.value)}
//                               className="w-full appearance-none bg-transparent text-xs font-semibold text-[#102B50] outline-none"
//                             >
//                               {STAFF_ROLES.map((r) => (
//                                 <option key={r.value} value={r.value}>
//                                   {r.label}
//                                 </option>
//                               ))}
//                             </select>
//                             <FiChevronDown className="pointer-events-none text-[#6380A2]" size={14} />
//                           </div>
//                         </div>

//                         <div>
//                           <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
//                             Username<span className="ml-1 text-red-500">*</span>
//                           </label>
//                           <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
//                             <FiUser className="mr-2.5 text-[#6380A2]" size={16} />
//                             <input
//                               type="text"
//                               value={userName}
//                               onChange={(e) => setUserName(e.target.value)}
//                               placeholder="Enter your username"
//                               className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
//                               required
//                             />
//                           </div>
//                         </div>

//                         <div>
//                           <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
//                             Password<span className="ml-1 text-red-500">*</span>
//                           </label>
//                           <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
//                             <FiLock className="mr-2.5 text-[#6380A2]" size={16} />
//                             <input
//                               type={showPassword ? "text" : "password"}
//                               value={password}
//                               onChange={(e) => setPassword(e.target.value)}
//                               placeholder="Enter password"
//                               className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
//                               required
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowPassword(!showPassword)}
//                               className="ml-2 text-slate-500 transition hover:text-[#0EA5A8]"
//                             >
//                               {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
//                             </button>
//                           </div>
//                           <div className="mt-1.5 flex justify-end">
//                             <button type="button" className="text-xs font-semibold text-[#008F99] transition hover:text-[#006E76]">
//                               Forgot Password?
//                             </button>
//                           </div>
//                         </div>

//                         {error && (
//                           <div className="rounded-xl border border-red-200 bg-red-50/80 px-3.5 py-2.5 text-xs font-semibold text-red-600">
//                             {error}
//                           </div>
//                         )}

//                         <button
//                           type="submit"
//                           disabled={submitting}
//                           className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,165,168,0.30)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,165,168,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
//                         >
//                           <FiLogIn size={16} />
//                           {submitting ? "Signing in..." : "Sign In"}
//                         </button>

//                         <div className="flex items-start gap-4 rounded-xl border border-white/50 bg-white/20 px-3.5 py-2.5 text-[11px] text-slate-700 backdrop-blur-md">
//                           <FiInfo className="mt-0.5 shrink-0 text-[#0EA5A8]" size={14} />
//                           <p>
//                             <span className="font-bold">Demo credentials</span>
//                             <br />
//                             Username: <span className="font-bold">superadmin</span>
//                             {"  |  "}
//                             Password: <span className="font-bold">Admin@123</span>
//                           </p>
//                         </div>
//                       </form>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </main>

//         {/* ================= FOOTER ================= */}
//         <footer className="relative z-20 flex flex-wrap justify-center gap-4 pb-1 pt-2 text-[11px] font-medium text-white/90 lg:justify-end lg:pr-5">
//           <button className="flex items-center gap-1.5 hover:text-white">
//             <FiHeadphones size={13} />
//             Help & Support
//           </button>
//           <span className="text-white/40">|</span>
//           <button className="hover:text-white">Privacy Policy</button>
//         </footer>
//       </div>
//     </div>
//   );
// }

// /* ================= FEATURE CARD ================= */
// function FeatureCard({ icon: Icon, title, description }) {
//   return (
//     <div className="w-[135px] rounded-xl border border-white/30 bg-black/20 p-3 text-white shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-black/30">
//       <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
//         <Icon size={14} />
//       </div>
//       <h3 className="text-[11px] font-bold">{title}</h3>
//       <p className="mt-1 text-[9px] leading-3 text-white/75">{description}</p>
//     </div>
//   );
// }

// ================================================

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
  FiZap,
  FiBarChart2,
  FiHeadphones,
  FiInfo,
  FiChevronDown,
  FiCheckCircle,
  FiUserPlus,
  FiArrowLeft,
} from "react-icons/fi";
import logo from "../../../assets/logovvcmc.jpg";

import { useAuth } from "../hooks/useAuth";
import { LOGIN_ROLES, checkMobile } from "../services/authService";
import OtpInput from "../components/ui/OtpInput";
import loginBg from "../../../assets/login.png";

// mobileStage: "entry" (typing mobile) -> "checked" (we now know if it's a new or existing user)
const MOBILE_STAGE = { ENTRY: "entry", CHECKED: "checked" };

export default function Login() {
  const { sendOtp, verifyOtp, loginWithPassword, otpSent, resetOtpFlow } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ── Single "Login as" dropdown drives everything ──
  const [loginRole, setLoginRole] = useState("vendor");
  const isOtpRole = loginRole === "vendor";

  // ── OTP state (Vendor) ──
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobileStage, setMobileStage] = useState(MOBILE_STAGE.ENTRY);
  const [isNewUser, setIsNewUser] = useState(false);
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
    setIsNewUser(false);
    setFullName("");
    setOtp("");
    setMobile("");
  };

  const resetPasswordTab = () => {
    setUserName("");
    setPassword("");
  };

  const handleRoleChange = (e) => {
    setLoginRole(e.target.value);
    setError("");
    resetOtpFlow();
    resetOtpTab();
    resetPasswordTab();
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
    setIsNewUser(!result.exists);
    setMobileStage(MOBILE_STAGE.CHECKED);
  };

  // ── OTP: Step 2 — Send OTP (only after mobile is checked; requires name if new) ──
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (isNewUser && !fullName.trim()) {
      setError("Please enter your full name to create your account.");
      return;
    }
    setSubmitting(true);
    const result = await sendOtp(mobile);
    setSubmitting(false);
    if (!result.success) setError(result.message || "Failed to send OTP.");
  };

  // ── OTP: Step 3 — Verify OTP + Login (mobile + fullName sent silently in the payload) ──
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await verifyOtp({ mobileNo: mobile, otp, fullName });
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

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-slate-950 bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Soft White Background Overlay */}
      <div className="absolute inset-0 bg-white/20" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#0EA5A8]/15" />
      <div className="absolute inset-0 backdrop-blur-[0.5px]" />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col px-5 py-5 sm:px-8 lg:px-10">

        {/* ================= HEADER ================= */}
        <header className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/90 shadow-lg backdrop-blur-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-2 ring-white/70">
                <img src={logo} alt="Municipal Corporation" className="h-full w-full object-contain p-1" />
              </div>
            </div>

            <div className="relative inline-block">
              <div className="pointer-events-none absolute -inset-x-8 -inset-y-7 -z-10 rounded-3xl bg-white/100 blur-2xl" />
              <div className="text-[#102B50]">
                <h1 className="text-sm font-bold tracking-tight drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)] sm:text-base">
                  Vasai Virar City Municipal Corporation
                </h1>
                <p className="text-[11px] font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] sm:text-xs">
                  Smart City, Better Tomorrow
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ================= MAIN ================= */}
        <main className="mx-auto flex w-full max-w-[1450px] flex-1 items-center">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_0.85fr] xl:gap-14">

            {/* ================= LEFT SIDE ================= */}
            <section className="hidden lg:block">
              <div className="relative max-w-lg pl-4 xl:pl-8">
                <div className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-[40px] bg-gradient-to-br from-white/95 via-white/100 to-transparent blur-3xl" />
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                  Smart Governance Platform
                </p>
                <h2 className="text-3xl font-black leading-[1.08] tracking-tight text-[#102B50] drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)] xl:text-5xl">
                  Street Vendors
                  <br />
                  <span className="text-[#0EA5A8] drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]">
                    Management System
                  </span>
                </h2>
                <div className="mt-3 h-1 w-12 rounded-full bg-[#0EA5A8]" />
                <p className="mt-3 max-w-md text-base font-medium leading-relaxed text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
                  Empowering Vendors.
                  <br />
                  Building Better, Smarter Cities.
                </p>
              </div>

              <div className="mt-45 flex gap-3 pl-4 xl:pl-8">
                <FeatureCard icon={FiShield} title="Secure & Trusted" description="Your data is safe with top-notch security" />
                <FeatureCard icon={FiZap} title="Easy & Efficient" description="Simplified process for vendors and officers" />
                <FeatureCard icon={FiBarChart2} title="Transparent System" description="Track applications and updates with transparency" />
              </div>
            </section>

            {/* ================= LOGIN CARD ================= */}
            <section className="flex justify-center lg:justify">
              <div className="relative w-full max-w-[440px]">
                <div className="absolute -inset-1.5 rounded-[28px] bg-cyan-300/20 blur-xl" />

                <div className="relative overflow-hidden rounded-[26px] border border-white/60 bg-white/25 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-6">
                  <div className="relative">
                    <h2 className="text-xl font-black tracking-tight text-[#102B50]">Welcome Back! 👋</h2>
                    <p className="mt-1 text-xs font-medium text-slate-700">
                      Sign in to continue to your dashboard
                    </p>

                    {/* ── Single "Login as" dropdown — drives OTP vs Password flow ── */}
                    <div className="mt-4">
                      <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                        Login as<span className="ml-1 text-red-500">*</span>
                      </label>
                      <div className="relative flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
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

                    {/* ══════════════ VENDOR — OTP STAGE 1 — Mobile entry, check registration ══════════════ */}
                    {isOtpRole && mobileStage === MOBILE_STAGE.ENTRY && (
                      <form onSubmit={handleCheckMobile} className="mt-3.5 space-y-3.5">
                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                            Mobile Number<span className="ml-1 text-red-500">*</span>
                          </label>
                          <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
                            <FiPhone className="mr-2.5 text-[#6380A2]" size={16} />
                            <input
                              type="tel"
                              value={mobile}
                              maxLength={10}
                              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                              placeholder="Enter your mobile number"
                              className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
                              required
                              autoFocus
                            />
                          </div>
                        </div>

                        {error && (
                          <div className="rounded-xl border border-red-200 bg-red-50/80 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                            {error}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={checkingMobile}
                          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,165,168,0.30)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,165,168,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <FiLogIn size={16} />
                          {checkingMobile ? "Checking..." : "Continue"}
                        </button>

                        <p className="pt-1 text-center text-[11px] font-medium text-slate-700">
                          New vendor? Just enter your mobile number above — we'll set up your account automatically.
                        </p>
                      </form>
                    )}

                    {/* ══════════════ VENDOR — OTP STAGE 2 — Registered / New-user banner, then Send OTP ══════════════ */}
                    {isOtpRole && mobileStage === MOBILE_STAGE.CHECKED && !otpSent && (
                      <form onSubmit={handleSendOtp} className="mt-3.5 space-y-3.5">
                        <button
                          type="button"
                          onClick={handleChangeMobile}
                          className="flex items-center gap-1 text-xs font-semibold text-[#008F99] hover:text-[#006E76]"
                        >
                          <FiArrowLeft size={13} /> {mobile}
                        </button>

                        {isNewUser ? (
                          <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/80 px-3.5 py-2.5 text-xs font-medium text-amber-800">
                            <FiUserPlus className="mt-0.5 shrink-0" size={15} />
                            <span>
                              This mobile number isn't registered yet. Enter your name below to create your
                              account and continue.
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3.5 py-2.5 text-xs font-medium text-emerald-800">
                            <FiCheckCircle className="mt-0.5 shrink-0" size={15} />
                            <span>Welcome back! We'll send a one-time password to verify it's you.</span>
                          </div>
                        )}

                        {isNewUser && (
                          <div>
                            <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                              Full Name<span className="ml-1 text-red-500">*</span>
                            </label>
                            <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
                              <FiUser className="mr-2.5 text-[#6380A2]" size={16} />
                              <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Your full name"
                                className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
                                required
                                autoFocus
                              />
                            </div>
                          </div>
                        )}

                        {error && (
                          <div className="rounded-xl border border-red-200 bg-red-50/80 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                            {error}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,165,168,0.30)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,165,168,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <FiLogIn size={16} />
                          {submitting ? "Sending OTP..." : isNewUser ? "Register & Send OTP" : "Send OTP"}
                        </button>
                      </form>
                    )}

                    {/* ══════════════ VENDOR — OTP STAGE 3 — Verify — 6-box OTP only ══════════════ */}
                    {isOtpRole && otpSent && (
                      <form onSubmit={handleVerifyOtp} className="mt-3.5 space-y-3.5">
                        <p className="text-center text-xs font-medium text-slate-700">
                          Enter the 6-digit OTP sent to{" "}
                          <span className="font-bold text-[#102B50]">{mobile}</span>
                        </p>

                        <OtpInput value={otp} onChange={setOtp} length={6} />

                        {error && (
                          <div className="rounded-xl border border-red-200 bg-red-50/80 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                            {error}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={submitting || otp.length !== 6}
                          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,165,168,0.30)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,165,168,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
                        >
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

                    {/* ══════════════ STAFF — PASSWORD LOGIN FORM ══════════════ */}
                    {!isOtpRole && (
                      <form onSubmit={handlePasswordLogin} className="mt-3.5 space-y-3.5">
                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                            Username<span className="ml-1 text-red-500">*</span>
                          </label>
                          <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
                            <FiUser className="mr-2.5 text-[#6380A2]" size={16} />
                            <input
                              type="text"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="Enter your username"
                              className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
                              required
                              autoFocus
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-[#102B50]">
                            Password<span className="ml-1 text-red-500">*</span>
                          </label>
                          <div className="flex h-11 items-center rounded-xl border border-white/70 bg-white/50 px-3.5 shadow-inner backdrop-blur-xl transition focus-within:border-[#0EA5A8] focus-within:ring-4 focus-within:ring-[#0EA5A8]/10">
                            <FiLock className="mr-2.5 text-[#6380A2]" size={16} />
                            <input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter password"
                              className="w-full bg-transparent text-xs font-medium text-[#102B50] outline-none placeholder:text-slate-500"
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
                          <div className="rounded-xl border border-red-200 bg-red-50/80 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                            {error}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16B6B1] to-[#0A9BA3] text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,165,168,0.30)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,165,168,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <FiLogIn size={16} />
                          {submitting ? "Signing in..." : "Sign In"}
                        </button>

                        {/* ── Register link — changes based on which role is selected ── */}
                        {loginRole === "super_admin" ? (
                          <div className="pt-1 text-center text-[11px] font-medium text-slate-700">
                            Need to add a new officer?{" "}
                            <Link to="/register-officer" className="font-bold text-[#008F99] hover:text-[#006E76]">
                              Register Officer
                            </Link>
                          </div>
                        ) : (
                          <div className="flex items-start gap-2.5 rounded-xl border border-white/50 bg-white/20 px-3.5 py-2.5 text-[11px] text-slate-700 backdrop-blur-md">
                            <FiInfo className="mt-0.5 shrink-0 text-[#0EA5A8]" size={14} />
                            <p>Don't have an account yet? Contact your Super Admin to get registered.</p>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* ================= FOOTER ================= */}
        <footer className="relative z-20 flex flex-wrap justify-center gap-4 pb-1 pt-2 text-[11px] font-medium text-white/90 lg:justify-end lg:pr-5">
          <button className="flex items-center gap-1.5 hover:text-white">
            <FiHeadphones size={13} />
            Help & Support
          </button>
          <span className="text-white/40">|</span>
          <button className="hover:text-white">Privacy Policy</button>
        </footer>
      </div>
    </div>
  );
}

/* ================= FEATURE CARD ================= */
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="w-[135px] rounded-xl border border-white/30 bg-black/20 p-3 text-white shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-black/30">
      <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
        <Icon size={14} />
      </div>
      <h3 className="text-[11px] font-bold">{title}</h3>
      <p className="mt-1 text-[9px] leading-3 text-white/75">{description}</p>
    </div>
  );
}