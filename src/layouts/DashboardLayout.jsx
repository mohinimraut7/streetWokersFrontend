

// import { useMemo, useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import clsx from "clsx";
// import {
//   FiGrid,
//   FiUserPlus,
//   FiMapPin,
//   FiCheckSquare,
//   FiCreditCard,
//   FiMenu,
//   FiSearch,
//   FiBell,
//   FiLogOut,
//   FiX,
//   FiUpload,
// } from "react-icons/fi";
// import { useAuth } from "../modules/auth/hooks/useAuth";
// // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// import logo from "../assets/logovvcmc.jpg";

// // Same routes/labels/icons as your original sidebar - unchanged.
// const NAV = [
//   { to: "/", label: "Dashboard", icon: FiGrid },
//   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
//   { to: "/vendors/bulk-import", label: "Import Excel", icon: FiUpload },
//   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
//   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
//   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// ];

// // ── Which nav items each role is allowed to see (by label) ──
// // super_admin (or any role not listed here) sees everything.
// const ROLE_NAV_LABELS = {
//   vendor: ["Vendor Registration"],
//   citizen: ["Vendor Registration"],
//   counter_officer: ["Vendor Registration", "Import Excel"],
//   survey_officer: ["Dashboard", "Vendor Survey"],
//   "A.M.C.": ["Application Approval", "Smart Card"],
// };

// function getNavForRole(role) {
//   const allowedLabels = ROLE_NAV_LABELS[role];
//   if (!allowedLabels) return NAV; // super_admin / unrecognized role → full nav, unchanged behavior
//   return NAV.filter((item) => allowedLabels.includes(item.label));
// }

// // ── Human-readable label for each role stored in the backend ──
// const ROLE_LABELS = {
//   vendor: "Vendor",
//   citizen: "Citizen",
//   counter_officer: "Counter Officer",
//   survey_officer: "Survey Officer",
//   "A.M.C.": "A.M.C.",
//   super_admin: "Super Admin",
// };

// function getRoleLabel(role) {
//   return ROLE_LABELS[role] || role || "";
// }

// // Ward A / Ward B ... -> shown as-is; if no ward (super_admin/vendor/citizen), fall back to office name.
// function getSubtitle(user) {
//   if (!user) return "";
//   const parts = [getRoleLabel(user.role)];
//   if (user.ward) parts.push(user.ward);
//   else if (user.office) parts.push(user.office);
//   return parts.filter(Boolean).join(" • ");
// }

// function getInitials(fullName) {
//   return (
//     fullName
//       ?.trim()
//       .split(/\s+/)
//       .map((p) => p[0])
//       .slice(0, 2)
//       .join("")
//       .toUpperCase() || "U"
//   );
// }

// // function BackgroundBlobs() {
// //   return (
// //     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
// //       <div className="absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-lime-500/50 to-amber-100/40 blur-3xl" />
// //       <div className="absolute right-[-10%] top-[-10%] h-[380px] w-[380px] rounded-full bg-gradient-to-br from-sky-200/50 to-cyan-100/40 blur-3xl" />
// //       <div className="absolute bottom-[-15%] left-[20%] h-[360px] w-[360px] rounded-full bg-gradient-to-br from-emerald-100/40 to-teal-100/30 blur-3xl" />
// //     </div>
// //   );
// // }


// function BackgroundBlobs() {
//   return (
//     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
//       <div className="absolute -left-40 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-lime-300/40 to-amber-100/30 blur-3xl" />
//       <div className="absolute right-[-18%] top-[-15%] h-[560px] w-[560px] rounded-full bg-gradient-to-br from-sky-200/40 to-cyan-100/30 blur-3xl" />
//       <div className="absolute bottom-[-25%] left-[10%] h-[540px] w-[540px] rounded-full bg-gradient-to-br from-emerald-200/35 to-teal-100/25 blur-3xl" />
//       <div className="absolute left-[30%] top-[25%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-100/30 to-lime-200/25 blur-3xl" />
//       <div className="absolute right-[5%] bottom-[5%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-100/30 to-sky-200/25 blur-3xl" />
//       <div className="absolute right-[25%] top-[50%] h-[480px] w-[480px] rounded-full bg-gradient-to-br from-teal-100/30 to-emerald-100/25 blur-3xl" />
//       <div className="absolute left-[55%] bottom-[30%] h-[460px] w-[460px] rounded-full bg-gradient-to-br from-emerald-200/25 to-sky-100/20 blur-3xl" />
//       <div className="absolute left-[5%] top-[55%] h-[440px] w-[440px] rounded-full bg-gradient-to-br from-amber-100/25 to-lime-200/20 blur-3xl" />
//     </div>
//   );
// }



// export default function DashboardLayout() {
//   const [open, setOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   const displayName = user?.fullName || "User";
//   const displaySubtitle = getSubtitle(user);
//   const initials = getInitials(user?.fullName);
//   const navItems = useMemo(() => getNavForRole(user?.role), [user?.role]);

//   return (
//     <div className="relative flex min-h-screen bg-surface">
//       <BackgroundBlobs />

//       {open && (
//         <div
//           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar — premium floating enterprise style */}
//       <aside
//         className={clsx(
//           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
//           "transition-transform duration-300 ease-out",
//           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
//           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
//           open ? "translate-x-0" : "-translate-x-full"
//         )}
//         style={{
//           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
//         }}
//       >
//         {/* subtle glass texture overlay */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 opacity-[0.07]"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
//           }}
//         />

//         {/* Mobile close button */}
//         <button
//           onClick={() => setOpen(false)}
//           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
//           aria-label="Close menu"
//         >
//           <FiX size={18} />
//         </button>

//         {/* Brand — logo alone on top (centered), name below it, Street Vendors below that */}
//         <div className="relative flex flex-col items-center gap-3 px-5 pb-5 pt-7 text-center">
//           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
//             <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
//           </div>
//           <div className="min-w-0 leading-tight">
//             <p className="text-[15px] font-extrabold leading-snug text-white">
//               Vasai Virar City Municipal Corporation
//             </p>
//             <p className="mt-1.5 text-[13px] font-semibold text-[#E9CE8B]">Street Vendors Management System</p>
//           </div>
//           <div aria-hidden="true" className="mt-1 flex items-center gap-1.5">
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//             <span className="h-1 w-1 rounded-full bg-[#E9CE8B]/50" />
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//           </div>
//         </div>

//         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

//         {/* Navigation */}
//         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
//           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
//             Main Menu
//           </p>
//           {navItems.map(({ to, label, icon: Icon }) => (
//             <NavLink
//               key={to + label}
//               to={to}
//               end={to === "/"}
//               onClick={() => setOpen(false)}
//               className={({ isActive }) =>
//                 clsx(
//                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
//                   "transition-all duration-300 ease-out",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
//                   isActive
//                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
//                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
//                 )
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   {isActive && (
//                     <span
//                       aria-hidden="true"
//                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
//                     />
//                   )}
//                   <Icon
//                     size={22}
//                     className={clsx(
//                       "shrink-0 transition-colors duration-300",
//                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
//                     )}
//                   />
//                   <span className="truncate">{label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* User profile card */}
//         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
//           <div className="flex items-center gap-3">
//             <div className="relative shrink-0">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
//                 {initials}
//               </div>
//               <span
//                 aria-hidden="true"
//                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
//               />
//             </div>
//             <div className="min-w-0 flex-1 leading-tight">
//               <p className="truncate text-[13px] font-semibold text-white">{displayName}</p>
//               <p className="truncate text-[11px] text-white/60">{displaySubtitle}</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
//               title="Logout"
//               aria-label="Logout"
//             >
//               <FiLogOut size={16} />
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="relative z-10 flex min-w-0 flex-1 flex-col">
//         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
//           <button
//             onClick={() => setOpen(true)}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
//           >
//             <FiMenu />
//           </button>

//           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
//             <FiSearch className="shrink-0" />
//             <input
//               placeholder="Search vendor, application..."
//               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
//             />
//           </div>

//           <div className="ml-auto flex items-center gap-3">
//             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
//               <FiBell size={18} />
//               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
//             </button>
//             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
//                 {initials}
//               </div>
//               <div className="leading-tight">
//                 <p className="text-[13px] font-semibold text-ink-900">{displayName}</p>
//                 <p className="text-[11px] text-ink-500">{displaySubtitle}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
//               title="Logout"
//             >
//               <FiLogOut size={17} />
//             </button>
//           </div>
//         </header>

//         <main className="flex-1 p-5 sm:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// ==============================


// import { useMemo, useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import clsx from "clsx";
// import {
//   FiGrid,
//   FiUserPlus,
//   FiMapPin,
//   FiCheckSquare,
//   FiCreditCard,
//   FiMenu,
//   FiSearch,
//   FiBell,
//   FiLogOut,
//   FiX,
//   FiUpload,
// } from "react-icons/fi";
// import { useAuth } from "../modules/auth/hooks/useAuth";
// // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// import logo from "../assets/logovvcmc.jpg";

// // Same routes/labels/icons as your original sidebar - unchanged.
// const NAV = [
//   { to: "/", label: "Dashboard", icon: FiGrid },
//   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
//   { to: "/vendors/bulk-import", label: "Import Excel", icon: FiUpload },
//   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
//   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
//   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// ];

// // ── Which nav items each role is allowed to see (by label) ──
// // super_admin (or any role not listed here) sees everything.
// const ROLE_NAV_LABELS = {
//   vendor: ["Vendor Registration"],
//   citizen: ["Vendor Registration"],
//   counter_officer: ["Vendor Registration", "Import Excel"],
//   survey_officer: ["Dashboard", "Vendor Survey"],
//   "A.M.C.": ["Application Approval", "Smart Card"],
// };

// function getNavForRole(role) {
//   const allowedLabels = ROLE_NAV_LABELS[role];
//   if (!allowedLabels) return NAV; // super_admin / unrecognized role → full nav, unchanged behavior
//   return NAV.filter((item) => allowedLabels.includes(item.label));
// }

// // ── Human-readable label for each role stored in the backend ──
// const ROLE_LABELS = {
//   vendor: "Vendor",
//   citizen: "Citizen",
//   counter_officer: "Counter Officer",
//   survey_officer: "Survey Officer",
//   "A.M.C.": "A.M.C.",
//   super_admin: "Super Admin",
// };

// function getRoleLabel(role) {
//   return ROLE_LABELS[role] || role || "";
// }

// // Ward A / Ward B ... -> shown as-is; if no ward (super_admin/vendor/citizen), fall back to office name.
// function getSubtitle(user) {
//   if (!user) return "";
//   const parts = [getRoleLabel(user.role)];
//   if (user.ward) parts.push(user.ward);
//   else if (user.office) parts.push(user.office);
//   return parts.filter(Boolean).join(" • ");
// }

// function getInitials(fullName) {
//   return (
//     fullName
//       ?.trim()
//       .split(/\s+/)
//       .map((p) => p[0])
//       .slice(0, 2)
//       .join("")
//       .toUpperCase() || "U"
//   );
// }

// // function BackgroundBlobs() {
// //   return (
// //     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
// //       <div className="absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-lime-500/50 to-amber-100/40 blur-3xl" />
// //       <div className="absolute right-[-10%] top-[-10%] h-[380px] w-[380px] rounded-full bg-gradient-to-br from-sky-200/50 to-cyan-100/40 blur-3xl" />
// //       <div className="absolute bottom-[-15%] left-[20%] h-[360px] w-[360px] rounded-full bg-gradient-to-br from-emerald-100/40 to-teal-100/30 blur-3xl" />
// //     </div>
// //   );
// // }


// function BackgroundBlobs() {
//   return (
//     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
//       <div className="absolute -left-40 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-lime-300/40 to-amber-100/30 blur-3xl" />
//       <div className="absolute right-[-18%] top-[-15%] h-[560px] w-[560px] rounded-full bg-gradient-to-br from-sky-200/40 to-cyan-100/30 blur-3xl" />
//       <div className="absolute bottom-[-25%] left-[10%] h-[540px] w-[540px] rounded-full bg-gradient-to-br from-emerald-200/35 to-teal-100/25 blur-3xl" />
//       <div className="absolute left-[30%] top-[25%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-100/30 to-lime-200/25 blur-3xl" />
//       <div className="absolute right-[5%] bottom-[5%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-100/30 to-sky-200/25 blur-3xl" />
//       <div className="absolute right-[25%] top-[50%] h-[480px] w-[480px] rounded-full bg-gradient-to-br from-teal-100/30 to-emerald-100/25 blur-3xl" />
//       <div className="absolute left-[55%] bottom-[30%] h-[460px] w-[460px] rounded-full bg-gradient-to-br from-emerald-200/25 to-sky-100/20 blur-3xl" />
//       <div className="absolute left-[5%] top-[55%] h-[440px] w-[440px] rounded-full bg-gradient-to-br from-amber-100/25 to-lime-200/20 blur-3xl" />
//     </div>
//   );
// }



// export default function DashboardLayout() {
//   const [open, setOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   const displayName = user?.fullName || "User";
//   const displaySubtitle = getSubtitle(user);
//   const initials = getInitials(user?.fullName);
//   const navItems = useMemo(() => getNavForRole(user?.role), [user?.role]);

//   return (
//     <div className="relative flex min-h-screen bg-surface">
//       <BackgroundBlobs />

//       {open && (
//         <div
//           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar — premium floating enterprise style */}
//       <aside
//         className={clsx(
//           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
//           "transition-transform duration-300 ease-out",
//           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
//           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
//           open ? "translate-x-0" : "-translate-x-full"
//         )}
//         style={{
//           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
//         }}
//       >
//         {/* subtle glass texture overlay */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 opacity-[0.07]"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
//           }}
//         />

//         {/* Mobile close button */}
//         <button
//           onClick={() => setOpen(false)}
//           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
//           aria-label="Close menu"
//         >
//           <FiX size={18} />
//         </button>

//         {/* Brand — logo alone on top (centered), name below it, Street Vendors below that */}
//         <div className="relative flex flex-col items-center gap-3 px-5 pb-5 pt-7 text-center">
//           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
//             <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
//           </div>
//           <div className="min-w-0 leading-tight">
//             <p className="text-[15px] font-extrabold leading-snug text-white">
//               Vasai Virar City Municipal Corporation
//             </p>
//             <p className="mt-1.5 text-[13px] font-semibold text-[#E9CE8B]">Street Vendors Management System</p>
//           </div>
//           <div aria-hidden="true" className="mt-1 flex items-center gap-1.5">
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//             <span className="h-1 w-1 rounded-full bg-[#E9CE8B]/50" />
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//           </div>
//         </div>

//         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

//         {/* Navigation */}
//         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
//           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
//             Main Menu
//           </p>
//           {navItems.map(({ to, label, icon: Icon }) => (
//             <NavLink
//               key={to + label}
//               to={to}
//               end={to === "/"}
//               onClick={() => setOpen(false)}
//               className={({ isActive }) =>
//                 clsx(
//                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
//                   "transition-all duration-300 ease-out",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
//                   isActive
//                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
//                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
//                 )
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   {isActive && (
//                     <span
//                       aria-hidden="true"
//                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
//                     />
//                   )}
//                   <Icon
//                     size={22}
//                     className={clsx(
//                       "shrink-0 transition-colors duration-300",
//                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
//                     )}
//                   />
//                   <span className="truncate">{label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* User profile card */}
//         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
//           <div className="flex items-center gap-3">
//             <div className="relative shrink-0">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
//                 {initials}
//               </div>
//               <span
//                 aria-hidden="true"
//                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
//               />
//             </div>
//             <div className="min-w-0 flex-1 leading-tight">
//               <p className="truncate text-[13px] font-semibold text-white">{displayName}</p>
//               <p className="truncate text-[11px] text-white/60">{displaySubtitle}</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
//               title="Logout"
//               aria-label="Logout"
//             >
//               <FiLogOut size={16} />
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="relative z-10 flex min-w-0 flex-1 flex-col">
//         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
//           <button
//             onClick={() => setOpen(true)}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
//           >
//             <FiMenu />
//           </button>

//           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
//             <FiSearch className="shrink-0" />
//             <input
//               placeholder="Search vendor, application..."
//               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
//             />
//           </div>

//           <div className="ml-auto flex items-center gap-3">
//             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
//               <FiBell size={18} />
//               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
//             </button>
//             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
//                 {initials}
//               </div>
//               <div className="leading-tight">
//                 <p className="text-[13px] font-semibold text-ink-900">{displayName}</p>
//                 <p className="text-[11px] text-ink-500">{displaySubtitle}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
//               title="Logout"
//             >
//               <FiLogOut size={17} />
//             </button>
//           </div>
//         </header>

//         <main className="flex-1 p-5 sm:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// ==============================


// // // // // import { useState } from "react";
// // // // // import { NavLink, Outlet, useNavigate } from "react-router-dom";
// // // // // import clsx from "clsx";
// // // // // import {
// // // // //   FiUserPlus,
// // // // //   FiMapPin,
// // // // //   FiCheckSquare,
// // // // //   FiCreditCard,
// // // // //   FiMenu,
// // // // //   FiSearch,
// // // // //   FiBell,
// // // // //   FiLogOut,
// // // // // } from "react-icons/fi";
// // // // // import { useAuth } from "../modules/auth/hooks/useAuth";
// // // // // // import logo from "../../../assets/logovvcmc.jpeg";
// // // // // import logo from "../assets/logovvcmc.jpeg";


// // // // // const NAV = [
// // // // //   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
// // // // //   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
// // // // //   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
// // // // //   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// // // // // ];

// // // // // export default function DashboardLayout() {
// // // // //   const [open, setOpen] = useState(false);
// // // // //   const { user, logout } = useAuth();
// // // // //   const navigate = useNavigate();

// // // // //   const handleLogout = () => {
// // // // //     logout();
// // // // //     navigate("/login", { replace: true });
// // // // //   };

// // // // //   return (
// // // // //     <div className="flex min-h-screen bg-surface">
// // // // //       {open && (
// // // // //         <div className="fixed inset-0 z-30 bg-ink-900/40 lg:hidden" onClick={() => setOpen(false)} />
// // // // //       )}

// // // // //       {/* Sidebar */}
// // // // //       <aside
// // // // //         className={clsx(
// // // // //           "sidebar-gradient fixed inset-y-0 left-0 z-40 flex w-[264px] shrink-0 flex-col transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
// // // // //           open ? "translate-x-0" : "-translate-x-full"
// // // // //         )}
// // // // //       >
// // // // //         <div className="flex items-center gap-3 px-6 py-6">
// // // // //           {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg font-extrabold text-white ring-1 ring-white/15">
// // // // //             SV
// // // // //           </div> */}
// // // // //           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm overflow-hidden">
// // // // //   <img
// // // // //     src={logo}
// // // // //     alt="Logo"
// // // // //     className="h-10 w-10 object-contain"
// // // // //   />
// // // // // </div>
// // // // //           <div className="leading-tight">
// // // // //              <p className="font-display text-[15px] font-bold text-white">Vasai Virar City Municipal Corporation</p>
// // // // //              <p className="font-display text-[15px] font-bold text-white">Street Vendors</p>
// // // // //             <p className="text-[11px] font-medium text-brand-200/80">Management System</p>
// // // // //             {/* {/* <p className="font-display text-[15px] font-bold text-white">Street Vendors</p> */}
// // // // //             {/* <p className="text-[11px] font-medium text-brand-200/80">Management System</p> */} 
// // // // //           </div>
// // // // //         </div>

// // // // //         <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
// // // // //           {NAV.map(({ to, label, icon: Icon }) => (
// // // // //             <NavLink
// // // // //               key={to}
// // // // //               to={to}
// // // // //               onClick={() => setOpen(false)}
// // // // //               className={({ isActive }) =>
// // // // //                 clsx(
// // // // //                   "flex items-center gap-3 rounded-xl px-4 py-3 text-[13.5px] font-semibold transition-colors",
// // // // //                   isActive
// // // // //                     ? "bg-white text-brand-800 shadow-[var(--shadow-soft)]"
// // // // //                     : "text-brand-100/85 hover:bg-white/10 hover:text-white"
// // // // //                 )
// // // // //               }
// // // // //             >
// // // // //               <Icon className="shrink-0 text-[17px]" />
// // // // //               <span className="truncate">{label}</span>
// // // // //             </NavLink>
// // // // //           ))}
// // // // //         </nav>
// // // // //       </aside>

// // // // //       {/* Main */}
// // // // //       <div className="flex min-w-0 flex-1 flex-col">
// // // // //         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
// // // // //           <button
// // // // //             onClick={() => setOpen(true)}
// // // // //             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
// // // // //           >
// // // // //             <FiMenu />
// // // // //           </button>

// // // // //           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
// // // // //             <FiSearch className="shrink-0" />
// // // // //             <input
// // // // //               placeholder="Search vendor, application..."
// // // // //               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
// // // // //             />
// // // // //           </div>

// // // // //           <div className="ml-auto flex items-center gap-3">
// // // // //             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
// // // // //               <FiBell size={18} />
// // // // //               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
// // // // //             </button>
// // // // //             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
// // // // //               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
// // // // //                 {user?.name
// // // // //                   ?.split(" ")
// // // // //                   .map((p) => p[0])
// // // // //                   .slice(0, 2)
// // // // //                   .join("") || "SO"}
// // // // //               </div>
// // // // //               <div className="leading-tight">
// // // // //                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
// // // // //                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
// // // // //               </div>
// // // // //             </div>
// // // // //             <button
// // // // //               onClick={handleLogout}
// // // // //               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
// // // // //               title="Logout"
// // // // //             >
// // // // //               <FiLogOut size={17} />
// // // // //             </button>
// // // // //           </div>
// // // // //         </header>

// // // // //         <main className="flex-1 p-5 sm:p-8">
// // // // //           <Outlet />
// // // // //         </main>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // // --------------------------------

// // // // // import { useState } from "react";
// // // // // import { NavLink, Outlet, useNavigate } from "react-router-dom";
// // // // // import clsx from "clsx";
// // // // // import {
// // // // //   FiUserPlus,
// // // // //   FiMapPin,
// // // // //   FiCheckSquare,
// // // // //   FiMenu,
// // // // //   FiSearch,
// // // // //   FiBell,
// // // // //   FiLogOut,
// // // // //   FiFileText,
// // // // //   FiClock,
// // // // //   FiX,
// // // // // } from "react-icons/fi";
// // // // // import { useAuth } from "../modules/auth/hooks/useAuth";
// // // // // import { ROLES } from "../lib/roles";
// // // // // // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// // // // // import logo from "../assets/logo.png";

// // // // // // Same routes/labels as before, grouped per role so each user only sees what
// // // // // // they're allowed to act on (matches the RoleRoute guards in App.jsx).
// // // // // const NAV_BY_ROLE = {
// // // // //   [ROLES.CITIZEN]: [
// // // // //     { to: "/citizen/my-applications", label: "My Applications", icon: FiFileText },
// // // // //     { to: "/vendors/register", label: "Vendor Registration", icon: FiUserPlus },
// // // // //   ],
// // // // //   [ROLES.COUNTER_EMPLOYEE]: [
// // // // //     { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
// // // // //     { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
// // // // //     { to: "/applications/pending", label: "Pending Approval", icon: FiClock },
// // // // //   ],
// // // // //   [ROLES.FIELD_INSPECTOR]: [
// // // // //     { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
// // // // //     { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
// // // // //   ],
// // // // // };

// // // // // export default function DashboardLayout() {
// // // // //   const [open, setOpen] = useState(false);
// // // // //   const { user, logout } = useAuth();
// // // // //   const navigate = useNavigate();
// // // // //   const NAV = NAV_BY_ROLE[user?.role] || [];

// // // // //   const handleLogout = () => {
// // // // //     logout();
// // // // //     navigate("/login", { replace: true });
// // // // //   };

// // // // //   const initials =
// // // // //     user?.name
// // // // //       ?.split(" ")
// // // // //       .map((p) => p[0])
// // // // //       .slice(0, 2)
// // // // //       .join("") || "SV";

// // // // //   return (
// // // // //     <div className="flex min-h-screen bg-surface">
// // // // //       {open && (
// // // // //         <div
// // // // //           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
// // // // //           onClick={() => setOpen(false)}
// // // // //         />
// // // // //       )}

// // // // //       {/* Sidebar — premium floating enterprise style */}
// // // // //       <aside
// // // // //         className={clsx(
// // // // //           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
// // // // //           "transition-transform duration-300 ease-out",
// // // // //           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
// // // // //           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
// // // // //           open ? "translate-x-0" : "-translate-x-full"
// // // // //         )}
// // // // //         style={{
// // // // //           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
// // // // //         }}
// // // // //       >
// // // // //         {/* subtle glass texture overlay */}
// // // // //         <div
// // // // //           aria-hidden="true"
// // // // //           className="pointer-events-none absolute inset-0 opacity-[0.07]"
// // // // //           style={{
// // // // //             backgroundImage:
// // // // //               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
// // // // //           }}
// // // // //         />

// // // // //         {/* Mobile close button */}
// // // // //         <button
// // // // //           onClick={() => setOpen(false)}
// // // // //           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
// // // // //           aria-label="Close menu"
// // // // //         >
// // // // //           <FiX size={18} />
// // // // //         </button>

// // // // //         {/* Brand */}
// // // // //         <div className="relative flex items-center gap-3 px-5 pb-5 pt-6">
// // // // //           <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
// // // // //             <img src={logo} alt="Municipal Corporation Logo" className="h-11 w-11 object-contain" />
// // // // //           </div>
// // // // //           <div className="min-w-0 leading-tight">
// // // // //             <p className="truncate text-[18px] font-bold text-white">Street Vendors</p>
// // // // //             <p className="text-[13px] text-white/70">Management System</p>
// // // // //             <p className="mt-0.5 truncate text-[11px] font-medium text-white/45">
// // // // //               Vasai Virar City Municipal Corporation
// // // // //             </p>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

// // // // //         {/* Navigation */}
// // // // //         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
// // // // //           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
// // // // //             Main Menu
// // // // //           </p>
// // // // //           {NAV.map(({ to, label, icon: Icon }) => (
// // // // //             <NavLink
// // // // //               key={to + label}
// // // // //               to={to}
// // // // //               onClick={() => setOpen(false)}
// // // // //               className={({ isActive }) =>
// // // // //                 clsx(
// // // // //                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
// // // // //                   "transition-all duration-300 ease-out",
// // // // //                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
// // // // //                   isActive
// // // // //                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
// // // // //                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
// // // // //                 )
// // // // //               }
// // // // //             >
// // // // //               {({ isActive }) => (
// // // // //                 <>
// // // // //                   {isActive && (
// // // // //                     <span
// // // // //                       aria-hidden="true"
// // // // //                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
// // // // //                     />
// // // // //                   )}
// // // // //                   <Icon
// // // // //                     size={22}
// // // // //                     className={clsx(
// // // // //                       "shrink-0 transition-colors duration-300",
// // // // //                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
// // // // //                     )}
// // // // //                   />
// // // // //                   <span className="truncate">{label}</span>
// // // // //                 </>
// // // // //               )}
// // // // //             </NavLink>
// // // // //           ))}
// // // // //         </nav>

// // // // //         {/* User profile card */}
// // // // //         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
// // // // //           <div className="flex items-center gap-3">
// // // // //             <div className="relative shrink-0">
// // // // //               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
// // // // //                 {initials}
// // // // //               </div>
// // // // //               <span
// // // // //                 aria-hidden="true"
// // // // //                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
// // // // //               />
// // // // //             </div>
// // // // //             <div className="min-w-0 flex-1 leading-tight">
// // // // //               <p className="truncate text-[13px] font-semibold text-white">{user?.name || "User"}</p>
// // // // //               <p className="truncate text-[11px] text-white/60">{user?.role || "Officer"}</p>
// // // // //               <p className="truncate text-[10px] text-white/40">{user?.ward || ""}</p>
// // // // //             </div>
// // // // //             <button
// // // // //               onClick={handleLogout}
// // // // //               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
// // // // //               title="Logout"
// // // // //               aria-label="Logout"
// // // // //             >
// // // // //               <FiLogOut size={16} />
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </aside>

// // // // //       {/* Main */}
// // // // //       <div className="flex min-w-0 flex-1 flex-col">
// // // // //         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
// // // // //           <button
// // // // //             onClick={() => setOpen(true)}
// // // // //             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
// // // // //           >
// // // // //             <FiMenu />
// // // // //           </button>

// // // // //           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
// // // // //             <FiSearch className="shrink-0" />
// // // // //             <input
// // // // //               placeholder="Search vendor, application..."
// // // // //               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
// // // // //             />
// // // // //           </div>

// // // // //           <div className="ml-auto flex items-center gap-3">
// // // // //             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
// // // // //               <FiBell size={18} />
// // // // //               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
// // // // //             </button>
// // // // //             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
// // // // //               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
// // // // //                 {user?.name
// // // // //                   ?.split(" ")
// // // // //                   .map((p) => p[0])
// // // // //                   .slice(0, 2)
// // // // //                   .join("") || "SO"}
// // // // //               </div>
// // // // //               <div className="leading-tight">
// // // // //                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
// // // // //                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
// // // // //               </div>
// // // // //             </div>
// // // // //             <button
// // // // //               onClick={handleLogout}
// // // // //               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
// // // // //               title="Logout"
// // // // //             >
// // // // //               <FiLogOut size={17} />
// // // // //             </button>
// // // // //           </div>
// // // // //         </header>

// // // // //         <main className="flex-1 p-5 sm:p-8">
// // // // //           <Outlet />
// // // // //         </main>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // // -------------------

// // // // import { useState } from "react";
// // // // import { NavLink, Outlet, useNavigate } from "react-router-dom";
// // // // import clsx from "clsx";
// // // // import {
// // // //   FiGrid,       
// // // //   FiUserPlus,
// // // //   FiMapPin,
// // // //   FiCheckSquare,
// // // //   FiCreditCard,
// // // //   FiMenu,
// // // //   FiSearch,
// // // //   FiBell,
// // // //   FiLogOut,
// // // //   FiX,
// // // // } from "react-icons/fi";
// // // // import { useAuth } from "../modules/auth/hooks/useAuth";
// // // // // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// // // // import logo from "../assets/logovvcmc.jpg";

// // // // // Same routes/labels/icons as your original sidebar - unchanged.
// // // // const NAV = [
// // // //     { to: "/", label: "Dashboard", icon: FiGrid },   // ← नवीन, सगळ्यात वर

// // // //   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
// // // //   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
// // // //   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
// // // //   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// // // // ];

// // // // export default function DashboardLayout() {
// // // //   const [open, setOpen] = useState(false);
// // // //   const { user, logout } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const handleLogout = () => {
// // // //     logout();
// // // //     navigate("/login", { replace: true });
// // // //   };

// // // //   const initials =
// // // //     user?.name
// // // //       ?.split(" ")
// // // //       .map((p) => p[0])
// // // //       .slice(0, 2)
// // // //       .join("") || "SV";

// // // //   return (
// // // //     <div className="flex min-h-screen bg-surface">
// // // //       {open && (
// // // //         <div
// // // //           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
// // // //           onClick={() => setOpen(false)}
// // // //         />
// // // //       )}

// // // //       {/* Sidebar — premium floating enterprise style */}
// // // //       <aside
// // // //         className={clsx(
// // // //           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
// // // //           "transition-transform duration-300 ease-out",
// // // //           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
// // // //           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
// // // //           open ? "translate-x-0" : "-translate-x-full"
// // // //         )}
// // // //         style={{
// // // //           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
// // // //         }}
// // // //       >
// // // //         {/* subtle glass texture overlay */}
// // // //         <div
// // // //           aria-hidden="true"
// // // //           className="pointer-events-none absolute inset-0 opacity-[0.07]"
// // // //           style={{
// // // //             backgroundImage:
// // // //               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
// // // //           }}
// // // //         />

// // // //         {/* Mobile close button */}
// // // //         <button
// // // //           onClick={() => setOpen(false)}
// // // //           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
// // // //           aria-label="Close menu"
// // // //         >
// // // //           <FiX size={18} />
// // // //         </button>

// // // //         {/* Brand */}
// // // //         <div className="relative flex items-center gap-3 px-5 pb-5 pt-6">
// // // //           <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
// // // //             <img src={logo} alt="Municipal Corporation Logo" className="h-11 w-11 object-contain" />
// // // //           </div>
// // // //           <div className="min-w-0 leading-tight">
// // // //             <p className="truncate text-[18px] font-bold text-white">Street Vendors</p>
// // // //             <p className="text-[13px] text-white/70">Management System</p>
// // // //             <p className="mt-0.5 truncate text-[11px] font-medium text-white/45">
// // // //               Vasai Virar City Municipal Corporation
// // // //             </p>
// // // //           </div>
// // // //         </div>

// // // //         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

// // // //         {/* Navigation */}
// // // //         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
// // // //           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
// // // //             Main Menu
// // // //           </p>
// // // //           {NAV.map(({ to, label, icon: Icon }) => (
// // // //             <NavLink
// // // //               key={to + label}
// // // //               to={to}
// // // //               onClick={() => setOpen(false)}
// // // //               className={({ isActive }) =>
// // // //                 clsx(
// // // //                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
// // // //                   "transition-all duration-300 ease-out",
// // // //                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
// // // //                   isActive
// // // //                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
// // // //                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
// // // //                 )
// // // //               }
// // // //             >
// // // //               {({ isActive }) => (
// // // //                 <>
// // // //                   {isActive && (
// // // //                     <span
// // // //                       aria-hidden="true"
// // // //                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
// // // //                     />
// // // //                   )}
// // // //                   <Icon
// // // //                     size={22}
// // // //                     className={clsx(
// // // //                       "shrink-0 transition-colors duration-300",
// // // //                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
// // // //                     )}
// // // //                   />
// // // //                   <span className="truncate">{label}</span>
// // // //                 </>
// // // //               )}
// // // //             </NavLink>
// // // //           ))}
// // // //         </nav>

// // // //         {/* User profile card */}
// // // //         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
// // // //           <div className="flex items-center gap-3">
// // // //             <div className="relative shrink-0">
// // // //               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
// // // //                 {initials}
// // // //               </div>
// // // //               <span
// // // //                 aria-hidden="true"
// // // //                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
// // // //               />
// // // //             </div>
// // // //             <div className="min-w-0 flex-1 leading-tight">
// // // //               <p className="truncate text-[13px] font-semibold text-white">{user?.name || "Survey Officer"}</p>
// // // //               <p className="truncate text-[11px] text-white/60">{user?.ward || "Ward 12 Office"}</p>
// // // //             </div>
// // // //             <button
// // // //               onClick={handleLogout}
// // // //               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
// // // //               title="Logout"
// // // //               aria-label="Logout"
// // // //             >
// // // //               <FiLogOut size={16} />
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </aside>

// // // //       {/* Main */}
// // // //       <div className="flex min-w-0 flex-1 flex-col">
// // // //         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
// // // //           <button
// // // //             onClick={() => setOpen(true)}
// // // //             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
// // // //           >
// // // //             <FiMenu />
// // // //           </button>

// // // //           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
// // // //             <FiSearch className="shrink-0" />
// // // //             <input
// // // //               placeholder="Search vendor, application..."
// // // //               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
// // // //             />
// // // //           </div>

// // // //           <div className="ml-auto flex items-center gap-3">
// // // //             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
// // // //               <FiBell size={18} />
// // // //               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
// // // //             </button>
// // // //             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
// // // //               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
// // // //                 {user?.name
// // // //                   ?.split(" ")
// // // //                   .map((p) => p[0])
// // // //                   .slice(0, 2)
// // // //                   .join("") || "SO"}
// // // //               </div>
// // // //               <div className="leading-tight">
// // // //                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
// // // //                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
// // // //               </div>
// // // //             </div>
// // // //             <button
// // // //               onClick={handleLogout}
// // // //               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
// // // //               title="Logout"
// // // //             >
// // // //               <FiLogOut size={17} />
// // // //             </button>
// // // //           </div>
// // // //         </header>

// // // //         <main className="flex-1 p-5 sm:p-8">
// // // //           <Outlet />
// // // //         </main>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useState } from "react";
// // // import { NavLink, Outlet, useNavigate } from "react-router-dom";
// // // import clsx from "clsx";
// // // import {
// // //   FiGrid,
// // //   FiUserPlus,
// // //   FiMapPin,
// // //   FiCheckSquare,
// // //   FiCreditCard,
// // //   FiMenu,
// // //   FiSearch,
// // //   FiBell,
// // //   FiLogOut,
// // //   FiX,
// // // } from "react-icons/fi";
// // // import { useAuth } from "../modules/auth/hooks/useAuth";
// // // // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// // // import logo from "../assets/logovvcmc.jpg";

// // // // Same routes/labels/icons as your original sidebar - unchanged.
// // // const NAV = [
// // //   { to: "/", label: "Dashboard", icon: FiGrid },
// // //   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
// // //   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
// // //   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
// // //   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// // // ];

// // // export default function DashboardLayout() {
// // //   const [open, setOpen] = useState(false);
// // //   const { user, logout } = useAuth();
// // //   const navigate = useNavigate();

// // //   const handleLogout = () => {
// // //     logout();
// // //     navigate("/login", { replace: true });
// // //   };

// // //   const initials =
// // //     user?.name
// // //       ?.split(" ")
// // //       .map((p) => p[0])
// // //       .slice(0, 2)
// // //       .join("") || "SV";

// // //   return (
// // //     <div className="flex min-h-screen bg-surface">
// // //       {open && (
// // //         <div
// // //           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
// // //           onClick={() => setOpen(false)}
// // //         />
// // //       )}

// // //       {/* Sidebar — premium floating enterprise style */}
// // //       <aside
// // //         className={clsx(
// // //           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
// // //           "transition-transform duration-300 ease-out",
// // //           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
// // //           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
// // //           open ? "translate-x-0" : "-translate-x-full"
// // //         )}
// // //         style={{
// // //           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
// // //         }}
// // //       >
// // //         {/* subtle glass texture overlay */}
// // //         <div
// // //           aria-hidden="true"
// // //           className="pointer-events-none absolute inset-0 opacity-[0.07]"
// // //           style={{
// // //             backgroundImage:
// // //               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
// // //           }}
// // //         />

// // //         {/* Mobile close button */}
// // //         <button
// // //           onClick={() => setOpen(false)}
// // //           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
// // //           aria-label="Close menu"
// // //         >
// // //           <FiX size={18} />
// // //         </button>

// // //         {/* Brand — Corporation name first (bold, larger), logo bigger, Street Vendors below */}
// // //         <div className="relative flex items-center gap-3 px-5 pb-5 pt-6">
// // //           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
// // //             <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
// // //           </div>
// // //           <div className="min-w-0 leading-tight">
// // //             <p className="text-[15px] font-extrabold leading-snug text-white">
// // //               Vasai Virar City Municipal Corporation
// // //             </p>
// // //             <p className="mt-1.5 text-[13px] font-semibold text-white/85">Street Vendors</p>
// // //             <p className="text-[11px] text-white/60">Management System</p>
// // //           </div>
// // //         </div>

// // //         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

// // //         {/* Navigation */}
// // //         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
// // //           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
// // //             Main Menu
// // //           </p>
// // //           {NAV.map(({ to, label, icon: Icon }) => (
// // //             <NavLink
// // //               key={to + label}
// // //               to={to}
// // //               end={to === "/"}
// // //               onClick={() => setOpen(false)}
// // //               className={({ isActive }) =>
// // //                 clsx(
// // //                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
// // //                   "transition-all duration-300 ease-out",
// // //                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
// // //                   isActive
// // //                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
// // //                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
// // //                 )
// // //               }
// // //             >
// // //               {({ isActive }) => (
// // //                 <>
// // //                   {isActive && (
// // //                     <span
// // //                       aria-hidden="true"
// // //                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
// // //                     />
// // //                   )}
// // //                   <Icon
// // //                     size={22}
// // //                     className={clsx(
// // //                       "shrink-0 transition-colors duration-300",
// // //                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
// // //                     )}
// // //                   />
// // //                   <span className="truncate">{label}</span>
// // //                 </>
// // //               )}
// // //             </NavLink>
// // //           ))}
// // //         </nav>

// // //         {/* User profile card */}
// // //         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
// // //           <div className="flex items-center gap-3">
// // //             <div className="relative shrink-0">
// // //               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
// // //                 {initials}
// // //               </div>
// // //               <span
// // //                 aria-hidden="true"
// // //                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
// // //               />
// // //             </div>
// // //             <div className="min-w-0 flex-1 leading-tight">
// // //               <p className="truncate text-[13px] font-semibold text-white">{user?.name || "Survey Officer"}</p>
// // //               <p className="truncate text-[11px] text-white/60">{user?.ward || "Ward 12 Office"}</p>
// // //             </div>
// // //             <button
// // //               onClick={handleLogout}
// // //               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
// // //               title="Logout"
// // //               aria-label="Logout"
// // //             >
// // //               <FiLogOut size={16} />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </aside>

// // //       {/* Main */}
// // //       <div className="flex min-w-0 flex-1 flex-col">
// // //         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
// // //           <button
// // //             onClick={() => setOpen(true)}
// // //             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
// // //           >
// // //             <FiMenu />
// // //           </button>

// // //           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
// // //             <FiSearch className="shrink-0" />
// // //             <input
// // //               placeholder="Search vendor, application..."
// // //               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
// // //             />
// // //           </div>

// // //           <div className="ml-auto flex items-center gap-3">
// // //             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
// // //               <FiBell size={18} />
// // //               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
// // //             </button>
// // //             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
// // //               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
// // //                 {user?.name
// // //                   ?.split(" ")
// // //                   .map((p) => p[0])
// // //                   .slice(0, 2)
// // //                   .join("") || "SO"}
// // //               </div>
// // //               <div className="leading-tight">
// // //                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
// // //                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
// // //               </div>
// // //             </div>
// // //             <button
// // //               onClick={handleLogout}
// // //               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
// // //               title="Logout"
// // //             >
// // //               <FiLogOut size={17} />
// // //             </button>
// // //           </div>
// // //         </header>

// // //         <main className="flex-1 p-5 sm:p-8">
// // //           <Outlet />
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // import { useState } from "react";
// // import { NavLink, Outlet, useNavigate } from "react-router-dom";
// // import clsx from "clsx";
// // import {
// //   FiGrid,
// //   FiUserPlus,
// //   FiMapPin,
// //   FiCheckSquare,
// //   FiCreditCard,
// //   FiMenu,
// //   FiSearch,
// //   FiBell,
// //   FiLogOut,
// //   FiX,
// // } from "react-icons/fi";
// // import { useAuth } from "../modules/auth/hooks/useAuth";
// // // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// // import logo from "../assets/logovvcmc.jpg";

// // // Same routes/labels/icons as your original sidebar - unchanged.
// // const NAV = [
// //   { to: "/", label: "Dashboard", icon: FiGrid },
// //   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
// //   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
// //   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
// //   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// // ];

// // export default function DashboardLayout() {
// //   const [open, setOpen] = useState(false);
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/login", { replace: true });
// //   };

// //   const initials =
// //     user?.name
// //       ?.split(" ")
// //       .map((p) => p[0])
// //       .slice(0, 2)
// //       .join("") || "SV";

// //   return (
// //     <div className="flex min-h-screen bg-surface">
// //       {open && (
// //         <div
// //           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
// //           onClick={() => setOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar — premium floating enterprise style */}
// //       <aside
// //         className={clsx(
// //           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
// //           "transition-transform duration-300 ease-out",
// //           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
// //           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
// //           open ? "translate-x-0" : "-translate-x-full"
// //         )}
// //         style={{
// //           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
// //         }}
// //       >
// //         {/* subtle glass texture overlay */}
// //         <div
// //           aria-hidden="true"
// //           className="pointer-events-none absolute inset-0 opacity-[0.07]"
// //           style={{
// //             backgroundImage:
// //               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
// //           }}
// //         />

// //         {/* Mobile close button */}
// //         <button
// //           onClick={() => setOpen(false)}
// //           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
// //           aria-label="Close menu"
// //         >
// //           <FiX size={18} />
// //         </button>

// //         {/* Brand — logo alone on top (centered), name below it, Street Vendors below that */}
// //         <div className="relative flex flex-col items-center gap-3 px-5 pb-5 pt-7 text-center">
// //           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
// //             <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
// //           </div>
// //           <div className="min-w-0 leading-tight">
// //             <p className="text-[15px] font-extrabold leading-snug text-white">
// //               Vasai Virar City Municipal Corporation
// //             </p>
// //             <p className="mt-1.5 text-[13px] font-semibold text-white/85">Street Vendors Management System</p>
// //           </div>
// //         </div>

// //         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

// //         {/* Navigation */}
// //         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
// //           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
// //             Main Menu
// //           </p>
// //           {NAV.map(({ to, label, icon: Icon }) => (
// //             <NavLink
// //               key={to + label}
// //               to={to}
// //               end={to === "/"}
// //               onClick={() => setOpen(false)}
// //               className={({ isActive }) =>
// //                 clsx(
// //                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
// //                   "transition-all duration-300 ease-out",
// //                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
// //                   isActive
// //                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
// //                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
// //                 )
// //               }
// //             >
// //               {({ isActive }) => (
// //                 <>
// //                   {isActive && (
// //                     <span
// //                       aria-hidden="true"
// //                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
// //                     />
// //                   )}
// //                   <Icon
// //                     size={22}
// //                     className={clsx(
// //                       "shrink-0 transition-colors duration-300",
// //                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
// //                     )}
// //                   />
// //                   <span className="truncate">{label}</span>
// //                 </>
// //               )}
// //             </NavLink>
// //           ))}
// //         </nav>

// //         {/* User profile card */}
// //         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
// //           <div className="flex items-center gap-3">
// //             <div className="relative shrink-0">
// //               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
// //                 {initials}
// //               </div>
// //               <span
// //                 aria-hidden="true"
// //                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
// //               />
// //             </div>
// //             <div className="min-w-0 flex-1 leading-tight">
// //               <p className="truncate text-[13px] font-semibold text-white">{user?.name || "Survey Officer"}</p>
// //               <p className="truncate text-[11px] text-white/60">{user?.ward || "Ward 12 Office"}</p>
// //             </div>
// //             <button
// //               onClick={handleLogout}
// //               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
// //               title="Logout"
// //               aria-label="Logout"
// //             >
// //               <FiLogOut size={16} />
// //             </button>
// //           </div>
// //         </div>
// //       </aside>

// //       {/* Main */}
// //       <div className="flex min-w-0 flex-1 flex-col">
// //         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
// //           <button
// //             onClick={() => setOpen(true)}
// //             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
// //           >
// //             <FiMenu />
// //           </button>

// //           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
// //             <FiSearch className="shrink-0" />
// //             <input
// //               placeholder="Search vendor, application..."
// //               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
// //             />
// //           </div>

// //           <div className="ml-auto flex items-center gap-3">
// //             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
// //               <FiBell size={18} />
// //               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
// //             </button>
// //             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
// //               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
// //                 {user?.name
// //                   ?.split(" ")
// //                   .map((p) => p[0])
// //                   .slice(0, 2)
// //                   .join("") || "SO"}
// //               </div>
// //               <div className="leading-tight">
// //                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
// //                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
// //               </div>
// //             </div>
// //             <button
// //               onClick={handleLogout}
// //               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
// //               title="Logout"
// //             >
// //               <FiLogOut size={17} />
// //             </button>
// //           </div>
// //         </header>

// //         <main className="flex-1 p-5 sm:p-8">
// //           <Outlet />
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }



// import { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import clsx from "clsx";
// import {
//   FiGrid,
//   FiUserPlus,
//   FiMapPin,
//   FiCheckSquare,
//   FiCreditCard,
//   FiMenu,
//   FiSearch,
//   FiBell,
//   FiLogOut,
//   FiX,
// } from "react-icons/fi";
// import { useAuth } from "../modules/auth/hooks/useAuth";
// // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// import logo from "../assets/logovvcmc.jpg";

// // Same routes/labels/icons as your original sidebar - unchanged.
// const NAV = [
//   { to: "/", label: "Dashboard", icon: FiGrid },
//   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
//   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
//   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
//   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// ];

// export default function DashboardLayout() {
//   const [open, setOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   const initials =
//     user?.name
//       ?.split(" ")
//       .map((p) => p[0])
//       .slice(0, 2)
//       .join("") || "SV";

//   return (
//     <div className="flex min-h-screen bg-surface">
//       {open && (
//         <div
//           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar — premium floating enterprise style */}
//       <aside
//         className={clsx(
//           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
//           "transition-transform duration-300 ease-out",
//           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
//           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
//           open ? "translate-x-0" : "-translate-x-full"
//         )}
//         style={{
//           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
//         }}
//       >
//         {/* subtle glass texture overlay */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 opacity-[0.07]"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
//           }}
//         />

//         {/* Mobile close button */}
//         <button
//           onClick={() => setOpen(false)}
//           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
//           aria-label="Close menu"
//         >
//           <FiX size={18} />
//         </button>

//         {/* Brand — logo alone on top (centered), name below it, Street Vendors below that */}
//         <div className="relative flex flex-col items-center gap-3 px-5 pb-5 pt-7 text-center">
//           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
//             <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
//           </div>
//           <div className="min-w-0 leading-tight">
//             <p className="text-[15px] font-extrabold leading-snug text-white">
//               Vasai Virar City Municipal Corporation
//             </p>
//             <p className="mt-1.5 text-[13px] font-semibold text-[#E9CE8B]">Street Vendors Management System</p>
//           </div>
//           <div aria-hidden="true" className="mt-1 flex items-center gap-1.5">
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//             <span className="h-1 w-1 rounded-full bg-[#E9CE8B]" />
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//           </div>
//         </div>

//         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

//         {/* Navigation */}
//         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
//           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
//             Main Menu
//           </p>
//           {NAV.map(({ to, label, icon: Icon }) => (
//             <NavLink
//               key={to + label}
//               to={to}
//               end={to === "/"}
//               onClick={() => setOpen(false)}
//               className={({ isActive }) =>
//                 clsx(
//                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
//                   "transition-all duration-300 ease-out",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
//                   isActive
//                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
//                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
//                 )
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   {isActive && (
//                     <span
//                       aria-hidden="true"
//                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
//                     />
//                   )}
//                   <Icon
//                     size={22}
//                     className={clsx(
//                       "shrink-0 transition-colors duration-300",
//                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
//                     )}
//                   />
//                   <span className="truncate">{label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* User profile card */}
//         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
//           <div className="flex items-center gap-3">
//             <div className="relative shrink-0">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
//                 {initials}
//               </div>
//               <span
//                 aria-hidden="true"
//                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
//               />
//             </div>
//             <div className="min-w-0 flex-1 leading-tight">
//               <p className="truncate text-[13px] font-semibold text-white">{user?.name || "Survey Officer"}</p>
//               <p className="truncate text-[11px] text-white/60">{user?.ward || "Ward 12 Office"}</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
//               title="Logout"
//               aria-label="Logout"
//             >
//               <FiLogOut size={16} />
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="flex min-w-0 flex-1 flex-col">
//         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
//           <button
//             onClick={() => setOpen(true)}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
//           >
//             <FiMenu />
//           </button>

//           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
//             <FiSearch className="shrink-0" />
//             <input
//               placeholder="Search vendor, application..."
//               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
//             />
//           </div>

//           <div className="ml-auto flex items-center gap-3">
//             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
//               <FiBell size={18} />
//               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
//             </button>
//             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
//                 {user?.name
//                   ?.split(" ")
//                   .map((p) => p[0])
//                   .slice(0, 2)
//                   .join("") || "SO"}
//               </div>
//               <div className="leading-tight">
//                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
//                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
//               title="Logout"
//             >
//               <FiLogOut size={17} />
//             </button>
//           </div>
//         </header>

//         <main className="flex-1 p-5 sm:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }





















// import { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import clsx from "clsx";
// import {
//   FiGrid,
//   FiUserPlus,
//   FiMapPin,
//   FiCheckSquare,
//   FiCreditCard,
//   FiMenu,
//   FiSearch,
//   FiBell,
//   FiLogOut,
//   FiX,
// } from "react-icons/fi";
// import { useAuth } from "../modules/auth/hooks/useAuth";
// // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// import logo from "../assets/logovvcmc.jpg";

// // Same routes/labels/icons as your original sidebar - unchanged.
// const NAV = [
//   { to: "/", label: "Dashboard", icon: FiGrid },
//   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
//   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
//   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
//   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// ];


// // function BackgroundBlobs() {
// //   return (
// //     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
// //       <div className="absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-lime-500/50 to-amber-100/40 blur-3xl" />
// //       <div className="absolute right-[-10%] top-[-10%] h-[380px] w-[380px] rounded-full bg-gradient-to-br from-sky-200/50 to-cyan-100/40 blur-3xl" />
// //       <div className="absolute bottom-[-15%] left-[20%] h-[360px] w-[360px] rounded-full bg-gradient-to-br from-emerald-100/40 to-teal-100/30 blur-3xl" />
// //     </div>
// //   );
// // }


// function BackgroundBlobs() {
//   return (
//     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
//       <div className="absolute -left-40 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-lime-300/40 to-amber-100/30 blur-3xl" />
//       <div className="absolute right-[-18%] top-[-15%] h-[560px] w-[560px] rounded-full bg-gradient-to-br from-sky-200/40 to-cyan-100/30 blur-3xl" />
//       <div className="absolute bottom-[-25%] left-[10%] h-[540px] w-[540px] rounded-full bg-gradient-to-br from-emerald-200/35 to-teal-100/25 blur-3xl" />
//       <div className="absolute left-[30%] top-[25%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-100/30 to-lime-200/25 blur-3xl" />
//       <div className="absolute right-[5%] bottom-[5%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-100/30 to-sky-200/25 blur-3xl" />
//       <div className="absolute right-[25%] top-[50%] h-[480px] w-[480px] rounded-full bg-gradient-to-br from-teal-100/30 to-emerald-100/25 blur-3xl" />
//       <div className="absolute left-[55%] bottom-[30%] h-[460px] w-[460px] rounded-full bg-gradient-to-br from-emerald-200/25 to-sky-100/20 blur-3xl" />
//       <div className="absolute left-[5%] top-[55%] h-[440px] w-[440px] rounded-full bg-gradient-to-br from-amber-100/25 to-lime-200/20 blur-3xl" />
//     </div>
//   );
// }



// export default function DashboardLayout() {
//   const [open, setOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   const initials =
//     user?.name
//       ?.split(" ")
//       .map((p) => p[0])
//       .slice(0, 2)
//       .join("") || "SV";

//   return (
//     <div className="relative flex min-h-screen bg-surface">
//       <BackgroundBlobs />

//       {open && (
//         <div
//           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar — premium floating enterprise style */}
//       <aside
//         className={clsx(
//           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
//           "transition-transform duration-300 ease-out",
//           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
//           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
//           open ? "translate-x-0" : "-translate-x-full"
//         )}
//         style={{
//           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
//         }}
//       >
//         {/* subtle glass texture overlay */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 opacity-[0.07]"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
//           }}
//         />

//         {/* Mobile close button */}
//         <button
//           onClick={() => setOpen(false)}
//           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
//           aria-label="Close menu"
//         >
//           <FiX size={18} />
//         </button>

//         {/* Brand — logo alone on top (centered), name below it, Street Vendors below that */}
//         <div className="relative flex flex-col items-center gap-3 px-5 pb-5 pt-7 text-center">
//           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
//             <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
//           </div>
//           <div className="min-w-0 leading-tight">
//             <p className="text-[15px] font-extrabold leading-snug text-white">
//               Vasai Virar City Municipal Corporation
//             </p>
//             <p className="mt-1.5 text-[13px] font-semibold text-[#E9CE8B]">Street Vendors Management System</p>
//           </div>
//           <div aria-hidden="true" className="mt-1 flex items-center gap-1.5">
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//             <span className="h-1 w-1 rounded-full bg-[#E9CE8B]" />
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//           </div>
//         </div>

//         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

//         {/* Navigation */}
//         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
//           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
//             Main Menu
//           </p>
//           {NAV.map(({ to, label, icon: Icon }) => (
//             <NavLink
//               key={to + label}
//               to={to}
//               end={to === "/"}
//               onClick={() => setOpen(false)}
//               className={({ isActive }) =>
//                 clsx(
//                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
//                   "transition-all duration-300 ease-out",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
//                   isActive
//                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
//                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
//                 )
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   {isActive && (
//                     <span
//                       aria-hidden="true"
//                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
//                     />
//                   )}
//                   <Icon
//                     size={22}
//                     className={clsx(
//                       "shrink-0 transition-colors duration-300",
//                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
//                     )}
//                   />
//                   <span className="truncate">{label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* User profile card */}
//         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
//           <div className="flex items-center gap-3">
//             <div className="relative shrink-0">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
//                 {initials}
//               </div>
//               <span
//                 aria-hidden="true"
//                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
//               />
//             </div>
//             <div className="min-w-0 flex-1 leading-tight">
//               <p className="truncate text-[13px] font-semibold text-white">{user?.name || "Survey Officer"}</p>
//               <p className="truncate text-[11px] text-white/60">{user?.ward || "Ward 12 Office"}</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
//               title="Logout"
//               aria-label="Logout"
//             >
//               <FiLogOut size={16} />
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="relative z-10 flex min-w-0 flex-1 flex-col">
//         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
//           <button
//             onClick={() => setOpen(true)}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
//           >
//             <FiMenu />
//           </button>

//           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
//             <FiSearch className="shrink-0" />
//             <input
//               placeholder="Search vendor, application..."
//               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
//             />
//           </div>

//           <div className="ml-auto flex items-center gap-3">
//             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
//               <FiBell size={18} />
//               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
//             </button>
//             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
//                 {user?.name
//                   ?.split(" ")
//                   .map((p) => p[0])
//                   .slice(0, 2)
//                   .join("") || "SO"}
//               </div>
//               <div className="leading-tight">
//                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
//                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
//               title="Logout"
//             >
//               <FiLogOut size={17} />
//             </button>
//           </div>
//         </header>

//         <main className="flex-1 p-5 sm:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
// ==================================================

// import { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import clsx from "clsx";
// import {
//   FiGrid,
//   FiUserPlus,
//   FiMapPin,
//   FiCheckSquare,
//   FiCreditCard,
//   FiMenu,
//   FiSearch,
//   FiBell,
//   FiLogOut,
//   FiX,
// } from "react-icons/fi";
// import { useAuth } from "../modules/auth/hooks/useAuth";
// // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// import logo from "../assets/logovvcmc.jpg";

// // Same routes/labels/icons as your original sidebar - unchanged.
// const NAV = [
//   { to: "/", label: "Dashboard", icon: FiGrid },
//   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
//   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
//   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
//   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// ];

// // ── Human-readable label for each role stored in the backend ──
// const ROLE_LABELS = {
//   vendor: "Vendor",
//   citizen: "Citizen",
//   counter_officer: "Counter Officer",
//   survey_officer: "Survey Officer",
//   "A.M.C.": "A.M.C.",
//   super_admin: "Super Admin",
// };

// function getRoleLabel(role) {
//   return ROLE_LABELS[role] || role || "";
// }

// // Ward A / Ward B ... -> shown as-is; if no ward (super_admin/vendor/citizen), fall back to office name.
// function getSubtitle(user) {
//   if (!user) return "";
//   const parts = [getRoleLabel(user.role)];
//   if (user.ward) parts.push(user.ward);
//   else if (user.office) parts.push(user.office);
//   return parts.filter(Boolean).join(" • ");
// }

// function getInitials(fullName) {
//   return (
//     fullName
//       ?.trim()
//       .split(/\s+/)
//       .map((p) => p[0])
//       .slice(0, 2)
//       .join("")
//       .toUpperCase() || "U"
//   );
// }

// // function BackgroundBlobs() {
// //   return (
// //     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
// //       <div className="absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-lime-500/50 to-amber-100/40 blur-3xl" />
// //       <div className="absolute right-[-10%] top-[-10%] h-[380px] w-[380px] rounded-full bg-gradient-to-br from-sky-200/50 to-cyan-100/40 blur-3xl" />
// //       <div className="absolute bottom-[-15%] left-[20%] h-[360px] w-[360px] rounded-full bg-gradient-to-br from-emerald-100/40 to-teal-100/30 blur-3xl" />
// //     </div>
// //   );
// // }


// function BackgroundBlobs() {
//   return (
//     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
//       <div className="absolute -left-40 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-lime-300/40 to-amber-100/30 blur-3xl" />
//       <div className="absolute right-[-18%] top-[-15%] h-[560px] w-[560px] rounded-full bg-gradient-to-br from-sky-200/40 to-cyan-100/30 blur-3xl" />
//       <div className="absolute bottom-[-25%] left-[10%] h-[540px] w-[540px] rounded-full bg-gradient-to-br from-emerald-200/35 to-teal-100/25 blur-3xl" />
//       <div className="absolute left-[30%] top-[25%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-100/30 to-lime-200/25 blur-3xl" />
//       <div className="absolute right-[5%] bottom-[5%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-100/30 to-sky-200/25 blur-3xl" />
//       <div className="absolute right-[25%] top-[50%] h-[480px] w-[480px] rounded-full bg-gradient-to-br from-teal-100/30 to-emerald-100/25 blur-3xl" />
//       <div className="absolute left-[55%] bottom-[30%] h-[460px] w-[460px] rounded-full bg-gradient-to-br from-emerald-200/25 to-sky-100/20 blur-3xl" />
//       <div className="absolute left-[5%] top-[55%] h-[440px] w-[440px] rounded-full bg-gradient-to-br from-amber-100/25 to-lime-200/20 blur-3xl" />
//     </div>
//   );
// }



// export default function DashboardLayout() {
//   const [open, setOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   const displayName = user?.fullName || "User";
//   const displaySubtitle = getSubtitle(user);
//   const initials = getInitials(user?.fullName);

//   return (
//     <div className="relative flex min-h-screen bg-surface">
//       <BackgroundBlobs />

//       {open && (
//         <div
//           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar — premium floating enterprise style */}
//       <aside
//         className={clsx(
//           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
//           "transition-transform duration-300 ease-out",
//           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
//           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
//           open ? "translate-x-0" : "-translate-x-full"
//         )}
//         style={{
//           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
//         }}
//       >
//         {/* subtle glass texture overlay */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 opacity-[0.07]"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
//           }}
//         />

//         {/* Mobile close button */}
//         <button
//           onClick={() => setOpen(false)}
//           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
//           aria-label="Close menu"
//         >
//           <FiX size={18} />
//         </button>

//         {/* Brand — logo alone on top (centered), name below it, Street Vendors below that */}
//         <div className="relative flex flex-col items-center gap-3 px-5 pb-5 pt-7 text-center">
//           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
//             <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
//           </div>
//           <div className="min-w-0 leading-tight">
//             <p className="text-[15px] font-extrabold leading-snug text-white">
//               Vasai Virar City Municipal Corporation
//             </p>
//             <p className="mt-1.5 text-[13px] font-semibold text-[#E9CE8B]">Street Vendors Management System</p>
//           </div>
//           <div aria-hidden="true" className="mt-1 flex items-center gap-1.5">
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//             <span className="h-1 w-1 rounded-full bg-[#E9CE8B]" />
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//           </div>
//         </div>

//         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

//         {/* Navigation */}
//         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
//           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
//             Main Menu
//           </p>
//           {NAV.map(({ to, label, icon: Icon }) => (
//             <NavLink
//               key={to + label}
//               to={to}
//               end={to === "/"}
//               onClick={() => setOpen(false)}
//               className={({ isActive }) =>
//                 clsx(
//                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
//                   "transition-all duration-300 ease-out",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
//                   isActive
//                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
//                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
//                 )
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   {isActive && (
//                     <span
//                       aria-hidden="true"
//                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
//                     />
//                   )}
//                   <Icon
//                     size={22}
//                     className={clsx(
//                       "shrink-0 transition-colors duration-300",
//                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
//                     )}
//                   />
//                   <span className="truncate">{label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* User profile card */}
//         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
//           <div className="flex items-center gap-3">
//             <div className="relative shrink-0">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
//                 {initials}
//               </div>
//               <span
//                 aria-hidden="true"
//                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
//               />
//             </div>
//             <div className="min-w-0 flex-1 leading-tight">
//               <p className="truncate text-[13px] font-semibold text-white">{displayName}</p>
//               <p className="truncate text-[11px] text-white/60">{displaySubtitle}</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
//               title="Logout"
//               aria-label="Logout"
//             >
//               <FiLogOut size={16} />
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="relative z-10 flex min-w-0 flex-1 flex-col">
//         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
//           <button
//             onClick={() => setOpen(true)}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
//           >
//             <FiMenu />
//           </button>

//           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
//             <FiSearch className="shrink-0" />
//             <input
//               placeholder="Search vendor, application..."
//               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
//             />
//           </div>

//           <div className="ml-auto flex items-center gap-3">
//             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
//               <FiBell size={18} />
//               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
//             </button>
//             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
//                 {initials}
//               </div>
//               <div className="leading-tight">
//                 <p className="text-[13px] font-semibold text-ink-900">{displayName}</p>
//                 <p className="text-[11px] text-ink-500">{displaySubtitle}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
//               title="Logout"
//             >
//               <FiLogOut size={17} />
//             </button>
//           </div>
//         </header>

//         <main className="flex-1 p-5 sm:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// =======================================================

// import { useMemo, useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import clsx from "clsx";
// import {
//   FiGrid,
//   FiUserPlus,
//   FiMapPin,
//   FiCheckSquare,
//   FiCreditCard,
//   FiMenu,
//   FiSearch,
//   FiBell,
//   FiLogOut,
//   FiX,
// } from "react-icons/fi";
// import { useAuth } from "../modules/auth/hooks/useAuth";
// // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// import logo from "../assets/logovvcmc.jpg";

// // Same routes/labels/icons as your original sidebar - unchanged.
// const NAV = [
//   { to: "/", label: "Dashboard", icon: FiGrid },
//   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
//   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
//   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
//   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// ];

// // ── Which nav items each role is allowed to see (by label) ──
// // super_admin (or any role not listed here) sees everything.
// const ROLE_NAV_LABELS = {
//   vendor: ["Vendor Registration"],
//   citizen: ["Vendor Registration"],
//   counter_officer: ["Vendor Registration"],
//   survey_officer: ["Dashboard", "Vendor Survey"],
//   "A.M.C.": ["Application Approval", "Smart Card"],
// };

// function getNavForRole(role) {
//   const allowedLabels = ROLE_NAV_LABELS[role];
//   if (!allowedLabels) return NAV; // super_admin / unrecognized role → full nav, unchanged behavior
//   return NAV.filter((item) => allowedLabels.includes(item.label));
// }

// // ── Human-readable label for each role stored in the backend ──
// const ROLE_LABELS = {
//   vendor: "Vendor",
//   citizen: "Citizen",
//   counter_officer: "Counter Officer",
//   survey_officer: "Survey Officer",
//   "A.M.C.": "A.M.C.",
//   super_admin: "Super Admin",
// };

// function getRoleLabel(role) {
//   return ROLE_LABELS[role] || role || "";
// }

// // Ward A / Ward B ... -> shown as-is; if no ward (super_admin/vendor/citizen), fall back to office name.
// function getSubtitle(user) {
//   if (!user) return "";
//   const parts = [getRoleLabel(user.role)];
//   if (user.ward) parts.push(user.ward);
//   else if (user.office) parts.push(user.office);
//   return parts.filter(Boolean).join(" • ");
// }

// function getInitials(fullName) {
//   return (
//     fullName
//       ?.trim()
//       .split(/\s+/)
//       .map((p) => p[0])
//       .slice(0, 2)
//       .join("")
//       .toUpperCase() || "U"
//   );
// }

// // function BackgroundBlobs() {
// //   return (
// //     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
// //       <div className="absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-lime-500/50 to-amber-100/40 blur-3xl" />
// //       <div className="absolute right-[-10%] top-[-10%] h-[380px] w-[380px] rounded-full bg-gradient-to-br from-sky-200/50 to-cyan-100/40 blur-3xl" />
// //       <div className="absolute bottom-[-15%] left-[20%] h-[360px] w-[360px] rounded-full bg-gradient-to-br from-emerald-100/40 to-teal-100/30 blur-3xl" />
// //     </div>
// //   );
// // }


// function BackgroundBlobs() {
//   return (
//     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
//       <div className="absolute -left-40 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-lime-300/40 to-amber-100/30 blur-3xl" />
//       <div className="absolute right-[-18%] top-[-15%] h-[560px] w-[560px] rounded-full bg-gradient-to-br from-sky-200/40 to-cyan-100/30 blur-3xl" />
//       <div className="absolute bottom-[-25%] left-[10%] h-[540px] w-[540px] rounded-full bg-gradient-to-br from-emerald-200/35 to-teal-100/25 blur-3xl" />
//       <div className="absolute left-[30%] top-[25%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-100/30 to-lime-200/25 blur-3xl" />
//       <div className="absolute right-[5%] bottom-[5%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-100/30 to-sky-200/25 blur-3xl" />
//       <div className="absolute right-[25%] top-[50%] h-[480px] w-[480px] rounded-full bg-gradient-to-br from-teal-100/30 to-emerald-100/25 blur-3xl" />
//       <div className="absolute left-[55%] bottom-[30%] h-[460px] w-[460px] rounded-full bg-gradient-to-br from-emerald-200/25 to-sky-100/20 blur-3xl" />
//       <div className="absolute left-[5%] top-[55%] h-[440px] w-[440px] rounded-full bg-gradient-to-br from-amber-100/25 to-lime-200/20 blur-3xl" />
//     </div>
//   );
// }



// export default function DashboardLayout() {
//   const [open, setOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   const displayName = user?.fullName || "User";
//   const displaySubtitle = getSubtitle(user);
//   const initials = getInitials(user?.fullName);
//   const navItems = useMemo(() => getNavForRole(user?.role), [user?.role]);

//   return (
//     <div className="relative flex min-h-screen bg-surface">
//       <BackgroundBlobs />

//       {open && (
//         <div
//           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar — premium floating enterprise style */}
//       <aside
//         className={clsx(
//           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
//           "transition-transform duration-300 ease-out",
//           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
//           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
//           open ? "translate-x-0" : "-translate-x-full"
//         )}
//         style={{
//           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
//         }}
//       >
//         {/* subtle glass texture overlay */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 opacity-[0.07]"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
//           }}
//         />

//         {/* Mobile close button */}
//         <button
//           onClick={() => setOpen(false)}
//           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
//           aria-label="Close menu"
//         >
//           <FiX size={18} />
//         </button>

//         {/* Brand — logo alone on top (centered), name below it, Street Vendors below that */}
//         <div className="relative flex flex-col items-center gap-3 px-5 pb-5 pt-7 text-center">
//           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
//             <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
//           </div>
//           <div className="min-w-0 leading-tight">
//             <p className="text-[15px] font-extrabold leading-snug text-white">
//               Vasai Virar City Municipal Corporation
//             </p>
//             <p className="mt-1.5 text-[13px] font-semibold text-[#E9CE8B]">Street Vendors Management System</p>
//           </div>
//           <div aria-hidden="true" className="mt-1 flex items-center gap-1.5">
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//             <span className="h-1 w-1 rounded-full bg-[#E9CE8B]/50" />
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//           </div>
//         </div>

//         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

//         {/* Navigation */}
//         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
//           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
//             Main Menu
//           </p>
//           {navItems.map(({ to, label, icon: Icon }) => (
//             <NavLink
//               key={to + label}
//               to={to}
//               end={to === "/"}
//               onClick={() => setOpen(false)}
//               className={({ isActive }) =>
//                 clsx(
//                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
//                   "transition-all duration-300 ease-out",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
//                   isActive
//                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
//                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
//                 )
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   {isActive && (
//                     <span
//                       aria-hidden="true"
//                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
//                     />
//                   )}
//                   <Icon
//                     size={22}
//                     className={clsx(
//                       "shrink-0 transition-colors duration-300",
//                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
//                     )}
//                   />
//                   <span className="truncate">{label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* User profile card */}
//         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
//           <div className="flex items-center gap-3">
//             <div className="relative shrink-0">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
//                 {initials}
//               </div>
//               <span
//                 aria-hidden="true"
//                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
//               />
//             </div>
//             <div className="min-w-0 flex-1 leading-tight">
//               <p className="truncate text-[13px] font-semibold text-white">{displayName}</p>
//               <p className="truncate text-[11px] text-white/60">{displaySubtitle}</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
//               title="Logout"
//               aria-label="Logout"
//             >
//               <FiLogOut size={16} />
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="relative z-10 flex min-w-0 flex-1 flex-col">
//         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
//           <button
//             onClick={() => setOpen(true)}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
//           >
//             <FiMenu />
//           </button>

//           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
//             <FiSearch className="shrink-0" />
//             <input
//               placeholder="Search vendor, application..."
//               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
//             />
//           </div>

//           <div className="ml-auto flex items-center gap-3">
//             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
//               <FiBell size={18} />
//               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
//             </button>
//             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
//                 {initials}
//               </div>
//               <div className="leading-tight">
//                 <p className="text-[13px] font-semibold text-ink-900">{displayName}</p>
//                 <p className="text-[11px] text-ink-500">{displaySubtitle}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
//               title="Logout"
//             >
//               <FiLogOut size={17} />
//             </button>
//           </div>
//         </header>

//         <main className="flex-1 p-5 sm:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }




// // // // // import { useState } from "react";
// // // // // import { NavLink, Outlet, useNavigate } from "react-router-dom";
// // // // // import clsx from "clsx";
// // // // // import {
// // // // //   FiUserPlus,
// // // // //   FiMapPin,
// // // // //   FiCheckSquare,
// // // // //   FiCreditCard,
// // // // //   FiMenu,
// // // // //   FiSearch,
// // // // //   FiBell,
// // // // //   FiLogOut,
// // // // // } from "react-icons/fi";
// // // // // import { useAuth } from "../modules/auth/hooks/useAuth";
// // // // // // import logo from "../../../assets/logovvcmc.jpeg";
// // // // // import logo from "../assets/logovvcmc.jpeg";


// // // // // const NAV = [
// // // // //   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
// // // // //   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
// // // // //   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
// // // // //   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// // // // // ];

// // // // // export default function DashboardLayout() {
// // // // //   const [open, setOpen] = useState(false);
// // // // //   const { user, logout } = useAuth();
// // // // //   const navigate = useNavigate();

// // // // //   const handleLogout = () => {
// // // // //     logout();
// // // // //     navigate("/login", { replace: true });
// // // // //   };

// // // // //   return (
// // // // //     <div className="flex min-h-screen bg-surface">
// // // // //       {open && (
// // // // //         <div className="fixed inset-0 z-30 bg-ink-900/40 lg:hidden" onClick={() => setOpen(false)} />
// // // // //       )}

// // // // //       {/* Sidebar */}
// // // // //       <aside
// // // // //         className={clsx(
// // // // //           "sidebar-gradient fixed inset-y-0 left-0 z-40 flex w-[264px] shrink-0 flex-col transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
// // // // //           open ? "translate-x-0" : "-translate-x-full"
// // // // //         )}
// // // // //       >
// // // // //         <div className="flex items-center gap-3 px-6 py-6">
// // // // //           {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg font-extrabold text-white ring-1 ring-white/15">
// // // // //             SV
// // // // //           </div> */}
// // // // //           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm overflow-hidden">
// // // // //   <img
// // // // //     src={logo}
// // // // //     alt="Logo"
// // // // //     className="h-10 w-10 object-contain"
// // // // //   />
// // // // // </div>
// // // // //           <div className="leading-tight">
// // // // //              <p className="font-display text-[15px] font-bold text-white">Vasai Virar City Municipal Corporation</p>
// // // // //              <p className="font-display text-[15px] font-bold text-white">Street Vendors</p>
// // // // //             <p className="text-[11px] font-medium text-brand-200/80">Management System</p>
// // // // //             {/* {/* <p className="font-display text-[15px] font-bold text-white">Street Vendors</p> */}
// // // // //             {/* <p className="text-[11px] font-medium text-brand-200/80">Management System</p> */} 
// // // // //           </div>
// // // // //         </div>

// // // // //         <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
// // // // //           {NAV.map(({ to, label, icon: Icon }) => (
// // // // //             <NavLink
// // // // //               key={to}
// // // // //               to={to}
// // // // //               onClick={() => setOpen(false)}
// // // // //               className={({ isActive }) =>
// // // // //                 clsx(
// // // // //                   "flex items-center gap-3 rounded-xl px-4 py-3 text-[13.5px] font-semibold transition-colors",
// // // // //                   isActive
// // // // //                     ? "bg-white text-brand-800 shadow-[var(--shadow-soft)]"
// // // // //                     : "text-brand-100/85 hover:bg-white/10 hover:text-white"
// // // // //                 )
// // // // //               }
// // // // //             >
// // // // //               <Icon className="shrink-0 text-[17px]" />
// // // // //               <span className="truncate">{label}</span>
// // // // //             </NavLink>
// // // // //           ))}
// // // // //         </nav>
// // // // //       </aside>

// // // // //       {/* Main */}
// // // // //       <div className="flex min-w-0 flex-1 flex-col">
// // // // //         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
// // // // //           <button
// // // // //             onClick={() => setOpen(true)}
// // // // //             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
// // // // //           >
// // // // //             <FiMenu />
// // // // //           </button>

// // // // //           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
// // // // //             <FiSearch className="shrink-0" />
// // // // //             <input
// // // // //               placeholder="Search vendor, application..."
// // // // //               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
// // // // //             />
// // // // //           </div>

// // // // //           <div className="ml-auto flex items-center gap-3">
// // // // //             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
// // // // //               <FiBell size={18} />
// // // // //               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
// // // // //             </button>
// // // // //             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
// // // // //               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
// // // // //                 {user?.name
// // // // //                   ?.split(" ")
// // // // //                   .map((p) => p[0])
// // // // //                   .slice(0, 2)
// // // // //                   .join("") || "SO"}
// // // // //               </div>
// // // // //               <div className="leading-tight">
// // // // //                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
// // // // //                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
// // // // //               </div>
// // // // //             </div>
// // // // //             <button
// // // // //               onClick={handleLogout}
// // // // //               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
// // // // //               title="Logout"
// // // // //             >
// // // // //               <FiLogOut size={17} />
// // // // //             </button>
// // // // //           </div>
// // // // //         </header>

// // // // //         <main className="flex-1 p-5 sm:p-8">
// // // // //           <Outlet />
// // // // //         </main>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // // --------------------------------

// // // // // import { useState } from "react";
// // // // // import { NavLink, Outlet, useNavigate } from "react-router-dom";
// // // // // import clsx from "clsx";
// // // // // import {
// // // // //   FiUserPlus,
// // // // //   FiMapPin,
// // // // //   FiCheckSquare,
// // // // //   FiMenu,
// // // // //   FiSearch,
// // // // //   FiBell,
// // // // //   FiLogOut,
// // // // //   FiFileText,
// // // // //   FiClock,
// // // // //   FiX,
// // // // // } from "react-icons/fi";
// // // // // import { useAuth } from "../modules/auth/hooks/useAuth";
// // // // // import { ROLES } from "../lib/roles";
// // // // // // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// // // // // import logo from "../assets/logo.png";

// // // // // // Same routes/labels as before, grouped per role so each user only sees what
// // // // // // they're allowed to act on (matches the RoleRoute guards in App.jsx).
// // // // // const NAV_BY_ROLE = {
// // // // //   [ROLES.CITIZEN]: [
// // // // //     { to: "/citizen/my-applications", label: "My Applications", icon: FiFileText },
// // // // //     { to: "/vendors/register", label: "Vendor Registration", icon: FiUserPlus },
// // // // //   ],
// // // // //   [ROLES.COUNTER_EMPLOYEE]: [
// // // // //     { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
// // // // //     { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
// // // // //     { to: "/applications/pending", label: "Pending Approval", icon: FiClock },
// // // // //   ],
// // // // //   [ROLES.FIELD_INSPECTOR]: [
// // // // //     { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
// // // // //     { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
// // // // //   ],
// // // // // };

// // // // // export default function DashboardLayout() {
// // // // //   const [open, setOpen] = useState(false);
// // // // //   const { user, logout } = useAuth();
// // // // //   const navigate = useNavigate();
// // // // //   const NAV = NAV_BY_ROLE[user?.role] || [];

// // // // //   const handleLogout = () => {
// // // // //     logout();
// // // // //     navigate("/login", { replace: true });
// // // // //   };

// // // // //   const initials =
// // // // //     user?.name
// // // // //       ?.split(" ")
// // // // //       .map((p) => p[0])
// // // // //       .slice(0, 2)
// // // // //       .join("") || "SV";

// // // // //   return (
// // // // //     <div className="flex min-h-screen bg-surface">
// // // // //       {open && (
// // // // //         <div
// // // // //           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
// // // // //           onClick={() => setOpen(false)}
// // // // //         />
// // // // //       )}

// // // // //       {/* Sidebar — premium floating enterprise style */}
// // // // //       <aside
// // // // //         className={clsx(
// // // // //           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
// // // // //           "transition-transform duration-300 ease-out",
// // // // //           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
// // // // //           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
// // // // //           open ? "translate-x-0" : "-translate-x-full"
// // // // //         )}
// // // // //         style={{
// // // // //           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
// // // // //         }}
// // // // //       >
// // // // //         {/* subtle glass texture overlay */}
// // // // //         <div
// // // // //           aria-hidden="true"
// // // // //           className="pointer-events-none absolute inset-0 opacity-[0.07]"
// // // // //           style={{
// // // // //             backgroundImage:
// // // // //               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
// // // // //           }}
// // // // //         />

// // // // //         {/* Mobile close button */}
// // // // //         <button
// // // // //           onClick={() => setOpen(false)}
// // // // //           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
// // // // //           aria-label="Close menu"
// // // // //         >
// // // // //           <FiX size={18} />
// // // // //         </button>

// // // // //         {/* Brand */}
// // // // //         <div className="relative flex items-center gap-3 px-5 pb-5 pt-6">
// // // // //           <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
// // // // //             <img src={logo} alt="Municipal Corporation Logo" className="h-11 w-11 object-contain" />
// // // // //           </div>
// // // // //           <div className="min-w-0 leading-tight">
// // // // //             <p className="truncate text-[18px] font-bold text-white">Street Vendors</p>
// // // // //             <p className="text-[13px] text-white/70">Management System</p>
// // // // //             <p className="mt-0.5 truncate text-[11px] font-medium text-white/45">
// // // // //               Vasai Virar City Municipal Corporation
// // // // //             </p>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

// // // // //         {/* Navigation */}
// // // // //         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
// // // // //           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
// // // // //             Main Menu
// // // // //           </p>
// // // // //           {NAV.map(({ to, label, icon: Icon }) => (
// // // // //             <NavLink
// // // // //               key={to + label}
// // // // //               to={to}
// // // // //               onClick={() => setOpen(false)}
// // // // //               className={({ isActive }) =>
// // // // //                 clsx(
// // // // //                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
// // // // //                   "transition-all duration-300 ease-out",
// // // // //                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
// // // // //                   isActive
// // // // //                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
// // // // //                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
// // // // //                 )
// // // // //               }
// // // // //             >
// // // // //               {({ isActive }) => (
// // // // //                 <>
// // // // //                   {isActive && (
// // // // //                     <span
// // // // //                       aria-hidden="true"
// // // // //                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
// // // // //                     />
// // // // //                   )}
// // // // //                   <Icon
// // // // //                     size={22}
// // // // //                     className={clsx(
// // // // //                       "shrink-0 transition-colors duration-300",
// // // // //                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
// // // // //                     )}
// // // // //                   />
// // // // //                   <span className="truncate">{label}</span>
// // // // //                 </>
// // // // //               )}
// // // // //             </NavLink>
// // // // //           ))}
// // // // //         </nav>

// // // // //         {/* User profile card */}
// // // // //         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
// // // // //           <div className="flex items-center gap-3">
// // // // //             <div className="relative shrink-0">
// // // // //               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
// // // // //                 {initials}
// // // // //               </div>
// // // // //               <span
// // // // //                 aria-hidden="true"
// // // // //                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
// // // // //               />
// // // // //             </div>
// // // // //             <div className="min-w-0 flex-1 leading-tight">
// // // // //               <p className="truncate text-[13px] font-semibold text-white">{user?.name || "User"}</p>
// // // // //               <p className="truncate text-[11px] text-white/60">{user?.role || "Officer"}</p>
// // // // //               <p className="truncate text-[10px] text-white/40">{user?.ward || ""}</p>
// // // // //             </div>
// // // // //             <button
// // // // //               onClick={handleLogout}
// // // // //               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
// // // // //               title="Logout"
// // // // //               aria-label="Logout"
// // // // //             >
// // // // //               <FiLogOut size={16} />
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </aside>

// // // // //       {/* Main */}
// // // // //       <div className="flex min-w-0 flex-1 flex-col">
// // // // //         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
// // // // //           <button
// // // // //             onClick={() => setOpen(true)}
// // // // //             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
// // // // //           >
// // // // //             <FiMenu />
// // // // //           </button>

// // // // //           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
// // // // //             <FiSearch className="shrink-0" />
// // // // //             <input
// // // // //               placeholder="Search vendor, application..."
// // // // //               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
// // // // //             />
// // // // //           </div>

// // // // //           <div className="ml-auto flex items-center gap-3">
// // // // //             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
// // // // //               <FiBell size={18} />
// // // // //               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
// // // // //             </button>
// // // // //             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
// // // // //               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
// // // // //                 {user?.name
// // // // //                   ?.split(" ")
// // // // //                   .map((p) => p[0])
// // // // //                   .slice(0, 2)
// // // // //                   .join("") || "SO"}
// // // // //               </div>
// // // // //               <div className="leading-tight">
// // // // //                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
// // // // //                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
// // // // //               </div>
// // // // //             </div>
// // // // //             <button
// // // // //               onClick={handleLogout}
// // // // //               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
// // // // //               title="Logout"
// // // // //             >
// // // // //               <FiLogOut size={17} />
// // // // //             </button>
// // // // //           </div>
// // // // //         </header>

// // // // //         <main className="flex-1 p-5 sm:p-8">
// // // // //           <Outlet />
// // // // //         </main>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // // -------------------

// // // // import { useState } from "react";
// // // // import { NavLink, Outlet, useNavigate } from "react-router-dom";
// // // // import clsx from "clsx";
// // // // import {
// // // //   FiGrid,       
// // // //   FiUserPlus,
// // // //   FiMapPin,
// // // //   FiCheckSquare,
// // // //   FiCreditCard,
// // // //   FiMenu,
// // // //   FiSearch,
// // // //   FiBell,
// // // //   FiLogOut,
// // // //   FiX,
// // // // } from "react-icons/fi";
// // // // import { useAuth } from "../modules/auth/hooks/useAuth";
// // // // // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// // // // import logo from "../assets/logovvcmc.jpg";

// // // // // Same routes/labels/icons as your original sidebar - unchanged.
// // // // const NAV = [
// // // //     { to: "/", label: "Dashboard", icon: FiGrid },   // ← नवीन, सगळ्यात वर

// // // //   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
// // // //   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
// // // //   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
// // // //   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// // // // ];

// // // // export default function DashboardLayout() {
// // // //   const [open, setOpen] = useState(false);
// // // //   const { user, logout } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const handleLogout = () => {
// // // //     logout();
// // // //     navigate("/login", { replace: true });
// // // //   };

// // // //   const initials =
// // // //     user?.name
// // // //       ?.split(" ")
// // // //       .map((p) => p[0])
// // // //       .slice(0, 2)
// // // //       .join("") || "SV";

// // // //   return (
// // // //     <div className="flex min-h-screen bg-surface">
// // // //       {open && (
// // // //         <div
// // // //           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
// // // //           onClick={() => setOpen(false)}
// // // //         />
// // // //       )}

// // // //       {/* Sidebar — premium floating enterprise style */}
// // // //       <aside
// // // //         className={clsx(
// // // //           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
// // // //           "transition-transform duration-300 ease-out",
// // // //           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
// // // //           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
// // // //           open ? "translate-x-0" : "-translate-x-full"
// // // //         )}
// // // //         style={{
// // // //           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
// // // //         }}
// // // //       >
// // // //         {/* subtle glass texture overlay */}
// // // //         <div
// // // //           aria-hidden="true"
// // // //           className="pointer-events-none absolute inset-0 opacity-[0.07]"
// // // //           style={{
// // // //             backgroundImage:
// // // //               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
// // // //           }}
// // // //         />

// // // //         {/* Mobile close button */}
// // // //         <button
// // // //           onClick={() => setOpen(false)}
// // // //           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
// // // //           aria-label="Close menu"
// // // //         >
// // // //           <FiX size={18} />
// // // //         </button>

// // // //         {/* Brand */}
// // // //         <div className="relative flex items-center gap-3 px-5 pb-5 pt-6">
// // // //           <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
// // // //             <img src={logo} alt="Municipal Corporation Logo" className="h-11 w-11 object-contain" />
// // // //           </div>
// // // //           <div className="min-w-0 leading-tight">
// // // //             <p className="truncate text-[18px] font-bold text-white">Street Vendors</p>
// // // //             <p className="text-[13px] text-white/70">Management System</p>
// // // //             <p className="mt-0.5 truncate text-[11px] font-medium text-white/45">
// // // //               Vasai Virar City Municipal Corporation
// // // //             </p>
// // // //           </div>
// // // //         </div>

// // // //         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

// // // //         {/* Navigation */}
// // // //         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
// // // //           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
// // // //             Main Menu
// // // //           </p>
// // // //           {NAV.map(({ to, label, icon: Icon }) => (
// // // //             <NavLink
// // // //               key={to + label}
// // // //               to={to}
// // // //               onClick={() => setOpen(false)}
// // // //               className={({ isActive }) =>
// // // //                 clsx(
// // // //                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
// // // //                   "transition-all duration-300 ease-out",
// // // //                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
// // // //                   isActive
// // // //                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
// // // //                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
// // // //                 )
// // // //               }
// // // //             >
// // // //               {({ isActive }) => (
// // // //                 <>
// // // //                   {isActive && (
// // // //                     <span
// // // //                       aria-hidden="true"
// // // //                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
// // // //                     />
// // // //                   )}
// // // //                   <Icon
// // // //                     size={22}
// // // //                     className={clsx(
// // // //                       "shrink-0 transition-colors duration-300",
// // // //                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
// // // //                     )}
// // // //                   />
// // // //                   <span className="truncate">{label}</span>
// // // //                 </>
// // // //               )}
// // // //             </NavLink>
// // // //           ))}
// // // //         </nav>

// // // //         {/* User profile card */}
// // // //         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
// // // //           <div className="flex items-center gap-3">
// // // //             <div className="relative shrink-0">
// // // //               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
// // // //                 {initials}
// // // //               </div>
// // // //               <span
// // // //                 aria-hidden="true"
// // // //                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
// // // //               />
// // // //             </div>
// // // //             <div className="min-w-0 flex-1 leading-tight">
// // // //               <p className="truncate text-[13px] font-semibold text-white">{user?.name || "Survey Officer"}</p>
// // // //               <p className="truncate text-[11px] text-white/60">{user?.ward || "Ward 12 Office"}</p>
// // // //             </div>
// // // //             <button
// // // //               onClick={handleLogout}
// // // //               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
// // // //               title="Logout"
// // // //               aria-label="Logout"
// // // //             >
// // // //               <FiLogOut size={16} />
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </aside>

// // // //       {/* Main */}
// // // //       <div className="flex min-w-0 flex-1 flex-col">
// // // //         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
// // // //           <button
// // // //             onClick={() => setOpen(true)}
// // // //             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
// // // //           >
// // // //             <FiMenu />
// // // //           </button>

// // // //           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
// // // //             <FiSearch className="shrink-0" />
// // // //             <input
// // // //               placeholder="Search vendor, application..."
// // // //               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
// // // //             />
// // // //           </div>

// // // //           <div className="ml-auto flex items-center gap-3">
// // // //             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
// // // //               <FiBell size={18} />
// // // //               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
// // // //             </button>
// // // //             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
// // // //               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
// // // //                 {user?.name
// // // //                   ?.split(" ")
// // // //                   .map((p) => p[0])
// // // //                   .slice(0, 2)
// // // //                   .join("") || "SO"}
// // // //               </div>
// // // //               <div className="leading-tight">
// // // //                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
// // // //                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
// // // //               </div>
// // // //             </div>
// // // //             <button
// // // //               onClick={handleLogout}
// // // //               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
// // // //               title="Logout"
// // // //             >
// // // //               <FiLogOut size={17} />
// // // //             </button>
// // // //           </div>
// // // //         </header>

// // // //         <main className="flex-1 p-5 sm:p-8">
// // // //           <Outlet />
// // // //         </main>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useState } from "react";
// // // import { NavLink, Outlet, useNavigate } from "react-router-dom";
// // // import clsx from "clsx";
// // // import {
// // //   FiGrid,
// // //   FiUserPlus,
// // //   FiMapPin,
// // //   FiCheckSquare,
// // //   FiCreditCard,
// // //   FiMenu,
// // //   FiSearch,
// // //   FiBell,
// // //   FiLogOut,
// // //   FiX,
// // // } from "react-icons/fi";
// // // import { useAuth } from "../modules/auth/hooks/useAuth";
// // // // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// // // import logo from "../assets/logovvcmc.jpg";

// // // // Same routes/labels/icons as your original sidebar - unchanged.
// // // const NAV = [
// // //   { to: "/", label: "Dashboard", icon: FiGrid },
// // //   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
// // //   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
// // //   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
// // //   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// // // ];

// // // export default function DashboardLayout() {
// // //   const [open, setOpen] = useState(false);
// // //   const { user, logout } = useAuth();
// // //   const navigate = useNavigate();

// // //   const handleLogout = () => {
// // //     logout();
// // //     navigate("/login", { replace: true });
// // //   };

// // //   const initials =
// // //     user?.name
// // //       ?.split(" ")
// // //       .map((p) => p[0])
// // //       .slice(0, 2)
// // //       .join("") || "SV";

// // //   return (
// // //     <div className="flex min-h-screen bg-surface">
// // //       {open && (
// // //         <div
// // //           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
// // //           onClick={() => setOpen(false)}
// // //         />
// // //       )}

// // //       {/* Sidebar — premium floating enterprise style */}
// // //       <aside
// // //         className={clsx(
// // //           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
// // //           "transition-transform duration-300 ease-out",
// // //           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
// // //           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
// // //           open ? "translate-x-0" : "-translate-x-full"
// // //         )}
// // //         style={{
// // //           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
// // //         }}
// // //       >
// // //         {/* subtle glass texture overlay */}
// // //         <div
// // //           aria-hidden="true"
// // //           className="pointer-events-none absolute inset-0 opacity-[0.07]"
// // //           style={{
// // //             backgroundImage:
// // //               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
// // //           }}
// // //         />

// // //         {/* Mobile close button */}
// // //         <button
// // //           onClick={() => setOpen(false)}
// // //           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
// // //           aria-label="Close menu"
// // //         >
// // //           <FiX size={18} />
// // //         </button>

// // //         {/* Brand — Corporation name first (bold, larger), logo bigger, Street Vendors below */}
// // //         <div className="relative flex items-center gap-3 px-5 pb-5 pt-6">
// // //           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
// // //             <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
// // //           </div>
// // //           <div className="min-w-0 leading-tight">
// // //             <p className="text-[15px] font-extrabold leading-snug text-white">
// // //               Vasai Virar City Municipal Corporation
// // //             </p>
// // //             <p className="mt-1.5 text-[13px] font-semibold text-white/85">Street Vendors</p>
// // //             <p className="text-[11px] text-white/60">Management System</p>
// // //           </div>
// // //         </div>

// // //         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

// // //         {/* Navigation */}
// // //         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
// // //           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
// // //             Main Menu
// // //           </p>
// // //           {NAV.map(({ to, label, icon: Icon }) => (
// // //             <NavLink
// // //               key={to + label}
// // //               to={to}
// // //               end={to === "/"}
// // //               onClick={() => setOpen(false)}
// // //               className={({ isActive }) =>
// // //                 clsx(
// // //                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
// // //                   "transition-all duration-300 ease-out",
// // //                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
// // //                   isActive
// // //                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
// // //                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
// // //                 )
// // //               }
// // //             >
// // //               {({ isActive }) => (
// // //                 <>
// // //                   {isActive && (
// // //                     <span
// // //                       aria-hidden="true"
// // //                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
// // //                     />
// // //                   )}
// // //                   <Icon
// // //                     size={22}
// // //                     className={clsx(
// // //                       "shrink-0 transition-colors duration-300",
// // //                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
// // //                     )}
// // //                   />
// // //                   <span className="truncate">{label}</span>
// // //                 </>
// // //               )}
// // //             </NavLink>
// // //           ))}
// // //         </nav>

// // //         {/* User profile card */}
// // //         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
// // //           <div className="flex items-center gap-3">
// // //             <div className="relative shrink-0">
// // //               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
// // //                 {initials}
// // //               </div>
// // //               <span
// // //                 aria-hidden="true"
// // //                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
// // //               />
// // //             </div>
// // //             <div className="min-w-0 flex-1 leading-tight">
// // //               <p className="truncate text-[13px] font-semibold text-white">{user?.name || "Survey Officer"}</p>
// // //               <p className="truncate text-[11px] text-white/60">{user?.ward || "Ward 12 Office"}</p>
// // //             </div>
// // //             <button
// // //               onClick={handleLogout}
// // //               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
// // //               title="Logout"
// // //               aria-label="Logout"
// // //             >
// // //               <FiLogOut size={16} />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </aside>

// // //       {/* Main */}
// // //       <div className="flex min-w-0 flex-1 flex-col">
// // //         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
// // //           <button
// // //             onClick={() => setOpen(true)}
// // //             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
// // //           >
// // //             <FiMenu />
// // //           </button>

// // //           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
// // //             <FiSearch className="shrink-0" />
// // //             <input
// // //               placeholder="Search vendor, application..."
// // //               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
// // //             />
// // //           </div>

// // //           <div className="ml-auto flex items-center gap-3">
// // //             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
// // //               <FiBell size={18} />
// // //               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
// // //             </button>
// // //             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
// // //               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
// // //                 {user?.name
// // //                   ?.split(" ")
// // //                   .map((p) => p[0])
// // //                   .slice(0, 2)
// // //                   .join("") || "SO"}
// // //               </div>
// // //               <div className="leading-tight">
// // //                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
// // //                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
// // //               </div>
// // //             </div>
// // //             <button
// // //               onClick={handleLogout}
// // //               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
// // //               title="Logout"
// // //             >
// // //               <FiLogOut size={17} />
// // //             </button>
// // //           </div>
// // //         </header>

// // //         <main className="flex-1 p-5 sm:p-8">
// // //           <Outlet />
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // import { useState } from "react";
// // import { NavLink, Outlet, useNavigate } from "react-router-dom";
// // import clsx from "clsx";
// // import {
// //   FiGrid,
// //   FiUserPlus,
// //   FiMapPin,
// //   FiCheckSquare,
// //   FiCreditCard,
// //   FiMenu,
// //   FiSearch,
// //   FiBell,
// //   FiLogOut,
// //   FiX,
// // } from "react-icons/fi";
// // import { useAuth } from "../modules/auth/hooks/useAuth";
// // // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// // import logo from "../assets/logovvcmc.jpg";

// // // Same routes/labels/icons as your original sidebar - unchanged.
// // const NAV = [
// //   { to: "/", label: "Dashboard", icon: FiGrid },
// //   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
// //   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
// //   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
// //   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// // ];

// // export default function DashboardLayout() {
// //   const [open, setOpen] = useState(false);
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/login", { replace: true });
// //   };

// //   const initials =
// //     user?.name
// //       ?.split(" ")
// //       .map((p) => p[0])
// //       .slice(0, 2)
// //       .join("") || "SV";

// //   return (
// //     <div className="flex min-h-screen bg-surface">
// //       {open && (
// //         <div
// //           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
// //           onClick={() => setOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar — premium floating enterprise style */}
// //       <aside
// //         className={clsx(
// //           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
// //           "transition-transform duration-300 ease-out",
// //           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
// //           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
// //           open ? "translate-x-0" : "-translate-x-full"
// //         )}
// //         style={{
// //           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
// //         }}
// //       >
// //         {/* subtle glass texture overlay */}
// //         <div
// //           aria-hidden="true"
// //           className="pointer-events-none absolute inset-0 opacity-[0.07]"
// //           style={{
// //             backgroundImage:
// //               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
// //           }}
// //         />

// //         {/* Mobile close button */}
// //         <button
// //           onClick={() => setOpen(false)}
// //           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
// //           aria-label="Close menu"
// //         >
// //           <FiX size={18} />
// //         </button>

// //         {/* Brand — logo alone on top (centered), name below it, Street Vendors below that */}
// //         <div className="relative flex flex-col items-center gap-3 px-5 pb-5 pt-7 text-center">
// //           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
// //             <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
// //           </div>
// //           <div className="min-w-0 leading-tight">
// //             <p className="text-[15px] font-extrabold leading-snug text-white">
// //               Vasai Virar City Municipal Corporation
// //             </p>
// //             <p className="mt-1.5 text-[13px] font-semibold text-white/85">Street Vendors Management System</p>
// //           </div>
// //         </div>

// //         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

// //         {/* Navigation */}
// //         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
// //           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
// //             Main Menu
// //           </p>
// //           {NAV.map(({ to, label, icon: Icon }) => (
// //             <NavLink
// //               key={to + label}
// //               to={to}
// //               end={to === "/"}
// //               onClick={() => setOpen(false)}
// //               className={({ isActive }) =>
// //                 clsx(
// //                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
// //                   "transition-all duration-300 ease-out",
// //                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
// //                   isActive
// //                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
// //                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
// //                 )
// //               }
// //             >
// //               {({ isActive }) => (
// //                 <>
// //                   {isActive && (
// //                     <span
// //                       aria-hidden="true"
// //                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
// //                     />
// //                   )}
// //                   <Icon
// //                     size={22}
// //                     className={clsx(
// //                       "shrink-0 transition-colors duration-300",
// //                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
// //                     )}
// //                   />
// //                   <span className="truncate">{label}</span>
// //                 </>
// //               )}
// //             </NavLink>
// //           ))}
// //         </nav>

// //         {/* User profile card */}
// //         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
// //           <div className="flex items-center gap-3">
// //             <div className="relative shrink-0">
// //               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
// //                 {initials}
// //               </div>
// //               <span
// //                 aria-hidden="true"
// //                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
// //               />
// //             </div>
// //             <div className="min-w-0 flex-1 leading-tight">
// //               <p className="truncate text-[13px] font-semibold text-white">{user?.name || "Survey Officer"}</p>
// //               <p className="truncate text-[11px] text-white/60">{user?.ward || "Ward 12 Office"}</p>
// //             </div>
// //             <button
// //               onClick={handleLogout}
// //               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
// //               title="Logout"
// //               aria-label="Logout"
// //             >
// //               <FiLogOut size={16} />
// //             </button>
// //           </div>
// //         </div>
// //       </aside>

// //       {/* Main */}
// //       <div className="flex min-w-0 flex-1 flex-col">
// //         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
// //           <button
// //             onClick={() => setOpen(true)}
// //             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
// //           >
// //             <FiMenu />
// //           </button>

// //           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
// //             <FiSearch className="shrink-0" />
// //             <input
// //               placeholder="Search vendor, application..."
// //               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
// //             />
// //           </div>

// //           <div className="ml-auto flex items-center gap-3">
// //             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
// //               <FiBell size={18} />
// //               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
// //             </button>
// //             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
// //               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
// //                 {user?.name
// //                   ?.split(" ")
// //                   .map((p) => p[0])
// //                   .slice(0, 2)
// //                   .join("") || "SO"}
// //               </div>
// //               <div className="leading-tight">
// //                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
// //                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
// //               </div>
// //             </div>
// //             <button
// //               onClick={handleLogout}
// //               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
// //               title="Logout"
// //             >
// //               <FiLogOut size={17} />
// //             </button>
// //           </div>
// //         </header>

// //         <main className="flex-1 p-5 sm:p-8">
// //           <Outlet />
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }



// import { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import clsx from "clsx";
// import {
//   FiGrid,
//   FiUserPlus,
//   FiMapPin,
//   FiCheckSquare,
//   FiCreditCard,
//   FiMenu,
//   FiSearch,
//   FiBell,
//   FiLogOut,
//   FiX,
// } from "react-icons/fi";
// import { useAuth } from "../modules/auth/hooks/useAuth";
// // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// import logo from "../assets/logovvcmc.jpg";

// // Same routes/labels/icons as your original sidebar - unchanged.
// const NAV = [
//   { to: "/", label: "Dashboard", icon: FiGrid },
//   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
//   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
//   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
//   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// ];

// export default function DashboardLayout() {
//   const [open, setOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   const initials =
//     user?.name
//       ?.split(" ")
//       .map((p) => p[0])
//       .slice(0, 2)
//       .join("") || "SV";

//   return (
//     <div className="flex min-h-screen bg-surface">
//       {open && (
//         <div
//           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar — premium floating enterprise style */}
//       <aside
//         className={clsx(
//           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
//           "transition-transform duration-300 ease-out",
//           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
//           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
//           open ? "translate-x-0" : "-translate-x-full"
//         )}
//         style={{
//           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
//         }}
//       >
//         {/* subtle glass texture overlay */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 opacity-[0.07]"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
//           }}
//         />

//         {/* Mobile close button */}
//         <button
//           onClick={() => setOpen(false)}
//           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
//           aria-label="Close menu"
//         >
//           <FiX size={18} />
//         </button>

//         {/* Brand — logo alone on top (centered), name below it, Street Vendors below that */}
//         <div className="relative flex flex-col items-center gap-3 px-5 pb-5 pt-7 text-center">
//           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
//             <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
//           </div>
//           <div className="min-w-0 leading-tight">
//             <p className="text-[15px] font-extrabold leading-snug text-white">
//               Vasai Virar City Municipal Corporation
//             </p>
//             <p className="mt-1.5 text-[13px] font-semibold text-[#E9CE8B]">Street Vendors Management System</p>
//           </div>
//           <div aria-hidden="true" className="mt-1 flex items-center gap-1.5">
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//             <span className="h-1 w-1 rounded-full bg-[#E9CE8B]" />
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//           </div>
//         </div>

//         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

//         {/* Navigation */}
//         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
//           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
//             Main Menu
//           </p>
//           {NAV.map(({ to, label, icon: Icon }) => (
//             <NavLink
//               key={to + label}
//               to={to}
//               end={to === "/"}
//               onClick={() => setOpen(false)}
//               className={({ isActive }) =>
//                 clsx(
//                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
//                   "transition-all duration-300 ease-out",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
//                   isActive
//                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
//                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
//                 )
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   {isActive && (
//                     <span
//                       aria-hidden="true"
//                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
//                     />
//                   )}
//                   <Icon
//                     size={22}
//                     className={clsx(
//                       "shrink-0 transition-colors duration-300",
//                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
//                     )}
//                   />
//                   <span className="truncate">{label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* User profile card */}
//         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
//           <div className="flex items-center gap-3">
//             <div className="relative shrink-0">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
//                 {initials}
//               </div>
//               <span
//                 aria-hidden="true"
//                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
//               />
//             </div>
//             <div className="min-w-0 flex-1 leading-tight">
//               <p className="truncate text-[13px] font-semibold text-white">{user?.name || "Survey Officer"}</p>
//               <p className="truncate text-[11px] text-white/60">{user?.ward || "Ward 12 Office"}</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
//               title="Logout"
//               aria-label="Logout"
//             >
//               <FiLogOut size={16} />
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="flex min-w-0 flex-1 flex-col">
//         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
//           <button
//             onClick={() => setOpen(true)}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
//           >
//             <FiMenu />
//           </button>

//           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
//             <FiSearch className="shrink-0" />
//             <input
//               placeholder="Search vendor, application..."
//               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
//             />
//           </div>

//           <div className="ml-auto flex items-center gap-3">
//             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
//               <FiBell size={18} />
//               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
//             </button>
//             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
//                 {user?.name
//                   ?.split(" ")
//                   .map((p) => p[0])
//                   .slice(0, 2)
//                   .join("") || "SO"}
//               </div>
//               <div className="leading-tight">
//                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
//                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
//               title="Logout"
//             >
//               <FiLogOut size={17} />
//             </button>
//           </div>
//         </header>

//         <main className="flex-1 p-5 sm:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }





















// import { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import clsx from "clsx";
// import {
//   FiGrid,
//   FiUserPlus,
//   FiMapPin,
//   FiCheckSquare,
//   FiCreditCard,
//   FiMenu,
//   FiSearch,
//   FiBell,
//   FiLogOut,
//   FiX,
// } from "react-icons/fi";
// import { useAuth } from "../modules/auth/hooks/useAuth";
// // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// import logo from "../assets/logovvcmc.jpg";

// // Same routes/labels/icons as your original sidebar - unchanged.
// const NAV = [
//   { to: "/", label: "Dashboard", icon: FiGrid },
//   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
//   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
//   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
//   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// ];


// // function BackgroundBlobs() {
// //   return (
// //     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
// //       <div className="absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-lime-500/50 to-amber-100/40 blur-3xl" />
// //       <div className="absolute right-[-10%] top-[-10%] h-[380px] w-[380px] rounded-full bg-gradient-to-br from-sky-200/50 to-cyan-100/40 blur-3xl" />
// //       <div className="absolute bottom-[-15%] left-[20%] h-[360px] w-[360px] rounded-full bg-gradient-to-br from-emerald-100/40 to-teal-100/30 blur-3xl" />
// //     </div>
// //   );
// // }


// function BackgroundBlobs() {
//   return (
//     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
//       <div className="absolute -left-40 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-lime-300/40 to-amber-100/30 blur-3xl" />
//       <div className="absolute right-[-18%] top-[-15%] h-[560px] w-[560px] rounded-full bg-gradient-to-br from-sky-200/40 to-cyan-100/30 blur-3xl" />
//       <div className="absolute bottom-[-25%] left-[10%] h-[540px] w-[540px] rounded-full bg-gradient-to-br from-emerald-200/35 to-teal-100/25 blur-3xl" />
//       <div className="absolute left-[30%] top-[25%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-100/30 to-lime-200/25 blur-3xl" />
//       <div className="absolute right-[5%] bottom-[5%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-100/30 to-sky-200/25 blur-3xl" />
//       <div className="absolute right-[25%] top-[50%] h-[480px] w-[480px] rounded-full bg-gradient-to-br from-teal-100/30 to-emerald-100/25 blur-3xl" />
//       <div className="absolute left-[55%] bottom-[30%] h-[460px] w-[460px] rounded-full bg-gradient-to-br from-emerald-200/25 to-sky-100/20 blur-3xl" />
//       <div className="absolute left-[5%] top-[55%] h-[440px] w-[440px] rounded-full bg-gradient-to-br from-amber-100/25 to-lime-200/20 blur-3xl" />
//     </div>
//   );
// }



// export default function DashboardLayout() {
//   const [open, setOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   const initials =
//     user?.name
//       ?.split(" ")
//       .map((p) => p[0])
//       .slice(0, 2)
//       .join("") || "SV";

//   return (
//     <div className="relative flex min-h-screen bg-surface">
//       <BackgroundBlobs />

//       {open && (
//         <div
//           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar — premium floating enterprise style */}
//       <aside
//         className={clsx(
//           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
//           "transition-transform duration-300 ease-out",
//           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
//           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
//           open ? "translate-x-0" : "-translate-x-full"
//         )}
//         style={{
//           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
//         }}
//       >
//         {/* subtle glass texture overlay */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 opacity-[0.07]"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
//           }}
//         />

//         {/* Mobile close button */}
//         <button
//           onClick={() => setOpen(false)}
//           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
//           aria-label="Close menu"
//         >
//           <FiX size={18} />
//         </button>

//         {/* Brand — logo alone on top (centered), name below it, Street Vendors below that */}
//         <div className="relative flex flex-col items-center gap-3 px-5 pb-5 pt-7 text-center">
//           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
//             <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
//           </div>
//           <div className="min-w-0 leading-tight">
//             <p className="text-[15px] font-extrabold leading-snug text-white">
//               Vasai Virar City Municipal Corporation
//             </p>
//             <p className="mt-1.5 text-[13px] font-semibold text-[#E9CE8B]">Street Vendors Management System</p>
//           </div>
//           <div aria-hidden="true" className="mt-1 flex items-center gap-1.5">
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//             <span className="h-1 w-1 rounded-full bg-[#E9CE8B]" />
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//           </div>
//         </div>

//         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

//         {/* Navigation */}
//         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
//           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
//             Main Menu
//           </p>
//           {NAV.map(({ to, label, icon: Icon }) => (
//             <NavLink
//               key={to + label}
//               to={to}
//               end={to === "/"}
//               onClick={() => setOpen(false)}
//               className={({ isActive }) =>
//                 clsx(
//                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
//                   "transition-all duration-300 ease-out",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
//                   isActive
//                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
//                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
//                 )
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   {isActive && (
//                     <span
//                       aria-hidden="true"
//                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
//                     />
//                   )}
//                   <Icon
//                     size={22}
//                     className={clsx(
//                       "shrink-0 transition-colors duration-300",
//                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
//                     )}
//                   />
//                   <span className="truncate">{label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* User profile card */}
//         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
//           <div className="flex items-center gap-3">
//             <div className="relative shrink-0">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
//                 {initials}
//               </div>
//               <span
//                 aria-hidden="true"
//                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
//               />
//             </div>
//             <div className="min-w-0 flex-1 leading-tight">
//               <p className="truncate text-[13px] font-semibold text-white">{user?.name || "Survey Officer"}</p>
//               <p className="truncate text-[11px] text-white/60">{user?.ward || "Ward 12 Office"}</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
//               title="Logout"
//               aria-label="Logout"
//             >
//               <FiLogOut size={16} />
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="relative z-10 flex min-w-0 flex-1 flex-col">
//         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
//           <button
//             onClick={() => setOpen(true)}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
//           >
//             <FiMenu />
//           </button>

//           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
//             <FiSearch className="shrink-0" />
//             <input
//               placeholder="Search vendor, application..."
//               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
//             />
//           </div>

//           <div className="ml-auto flex items-center gap-3">
//             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
//               <FiBell size={18} />
//               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
//             </button>
//             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
//                 {user?.name
//                   ?.split(" ")
//                   .map((p) => p[0])
//                   .slice(0, 2)
//                   .join("") || "SO"}
//               </div>
//               <div className="leading-tight">
//                 <p className="text-[13px] font-semibold text-ink-900">{user?.name || "Survey Officer"}</p>
//                 <p className="text-[11px] text-ink-500">{user?.ward || "Ward 12 Office"}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
//               title="Logout"
//             >
//               <FiLogOut size={17} />
//             </button>
//           </div>
//         </header>

//         <main className="flex-1 p-5 sm:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
// ==================================================

// import { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import clsx from "clsx";
// import {
//   FiGrid,
//   FiUserPlus,
//   FiMapPin,
//   FiCheckSquare,
//   FiCreditCard,
//   FiMenu,
//   FiSearch,
//   FiBell,
//   FiLogOut,
//   FiX,
// } from "react-icons/fi";
// import { useAuth } from "../modules/auth/hooks/useAuth";
// // If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
// import logo from "../assets/logovvcmc.jpg";

// // Same routes/labels/icons as your original sidebar - unchanged.
// const NAV = [
//   { to: "/", label: "Dashboard", icon: FiGrid },
//   { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
//   { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
//   { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
//   { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
// ];

// // ── Human-readable label for each role stored in the backend ──
// const ROLE_LABELS = {
//   vendor: "Vendor",
//   citizen: "Citizen",
//   counter_officer: "Counter Officer",
//   survey_officer: "Survey Officer",
//   "A.M.C.": "A.M.C.",
//   super_admin: "Super Admin",
// };

// function getRoleLabel(role) {
//   return ROLE_LABELS[role] || role || "";
// }

// // Ward A / Ward B ... -> shown as-is; if no ward (super_admin/vendor/citizen), fall back to office name.
// function getSubtitle(user) {
//   if (!user) return "";
//   const parts = [getRoleLabel(user.role)];
//   if (user.ward) parts.push(user.ward);
//   else if (user.office) parts.push(user.office);
//   return parts.filter(Boolean).join(" • ");
// }

// function getInitials(fullName) {
//   return (
//     fullName
//       ?.trim()
//       .split(/\s+/)
//       .map((p) => p[0])
//       .slice(0, 2)
//       .join("")
//       .toUpperCase() || "U"
//   );
// }

// // function BackgroundBlobs() {
// //   return (
// //     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
// //       <div className="absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-lime-500/50 to-amber-100/40 blur-3xl" />
// //       <div className="absolute right-[-10%] top-[-10%] h-[380px] w-[380px] rounded-full bg-gradient-to-br from-sky-200/50 to-cyan-100/40 blur-3xl" />
// //       <div className="absolute bottom-[-15%] left-[20%] h-[360px] w-[360px] rounded-full bg-gradient-to-br from-emerald-100/40 to-teal-100/30 blur-3xl" />
// //     </div>
// //   );
// // }


// function BackgroundBlobs() {
//   return (
//     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
//       <div className="absolute -left-40 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-lime-300/40 to-amber-100/30 blur-3xl" />
//       <div className="absolute right-[-18%] top-[-15%] h-[560px] w-[560px] rounded-full bg-gradient-to-br from-sky-200/40 to-cyan-100/30 blur-3xl" />
//       <div className="absolute bottom-[-25%] left-[10%] h-[540px] w-[540px] rounded-full bg-gradient-to-br from-emerald-200/35 to-teal-100/25 blur-3xl" />
//       <div className="absolute left-[30%] top-[25%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-100/30 to-lime-200/25 blur-3xl" />
//       <div className="absolute right-[5%] bottom-[5%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-100/30 to-sky-200/25 blur-3xl" />
//       <div className="absolute right-[25%] top-[50%] h-[480px] w-[480px] rounded-full bg-gradient-to-br from-teal-100/30 to-emerald-100/25 blur-3xl" />
//       <div className="absolute left-[55%] bottom-[30%] h-[460px] w-[460px] rounded-full bg-gradient-to-br from-emerald-200/25 to-sky-100/20 blur-3xl" />
//       <div className="absolute left-[5%] top-[55%] h-[440px] w-[440px] rounded-full bg-gradient-to-br from-amber-100/25 to-lime-200/20 blur-3xl" />
//     </div>
//   );
// }



// export default function DashboardLayout() {
//   const [open, setOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   const displayName = user?.fullName || "User";
//   const displaySubtitle = getSubtitle(user);
//   const initials = getInitials(user?.fullName);

//   return (
//     <div className="relative flex min-h-screen bg-surface">
//       <BackgroundBlobs />

//       {open && (
//         <div
//           className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar — premium floating enterprise style */}
//       <aside
//         className={clsx(
//           "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
//           "transition-transform duration-300 ease-out",
//           "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
//           "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
//           open ? "translate-x-0" : "-translate-x-full"
//         )}
//         style={{
//           background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
//         }}
//       >
//         {/* subtle glass texture overlay */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 opacity-[0.07]"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
//           }}
//         />

//         {/* Mobile close button */}
//         <button
//           onClick={() => setOpen(false)}
//           className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
//           aria-label="Close menu"
//         >
//           <FiX size={18} />
//         </button>

//         {/* Brand — logo alone on top (centered), name below it, Street Vendors below that */}
//         <div className="relative flex flex-col items-center gap-3 px-5 pb-5 pt-7 text-center">
//           <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
//             <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
//           </div>
//           <div className="min-w-0 leading-tight">
//             <p className="text-[15px] font-extrabold leading-snug text-white">
//               Vasai Virar City Municipal Corporation
//             </p>
//             <p className="mt-1.5 text-[13px] font-semibold text-[#E9CE8B]">Street Vendors Management System</p>
//           </div>
//           <div aria-hidden="true" className="mt-1 flex items-center gap-1.5">
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//             <span className="h-1 w-1 rounded-full bg-[#E9CE8B]" />
//             <span className="h-px w-6 bg-[#E9CE8B]/50" />
//           </div>
//         </div>

//         <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

//         {/* Navigation */}
//         <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
//           <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
//             Main Menu
//           </p>
//           {NAV.map(({ to, label, icon: Icon }) => (
//             <NavLink
//               key={to + label}
//               to={to}
//               end={to === "/"}
//               onClick={() => setOpen(false)}
//               className={({ isActive }) =>
//                 clsx(
//                   "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
//                   "transition-all duration-300 ease-out",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
//                   isActive
//                     ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
//                     : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
//                 )
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   {isActive && (
//                     <span
//                       aria-hidden="true"
//                       className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
//                     />
//                   )}
//                   <Icon
//                     size={22}
//                     className={clsx(
//                       "shrink-0 transition-colors duration-300",
//                       isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
//                     )}
//                   />
//                   <span className="truncate">{label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* User profile card */}
//         <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
//           <div className="flex items-center gap-3">
//             <div className="relative shrink-0">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
//                 {initials}
//               </div>
//               <span
//                 aria-hidden="true"
//                 className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
//               />
//             </div>
//             <div className="min-w-0 flex-1 leading-tight">
//               <p className="truncate text-[13px] font-semibold text-white">{displayName}</p>
//               <p className="truncate text-[11px] text-white/60">{displaySubtitle}</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
//               title="Logout"
//               aria-label="Logout"
//             >
//               <FiLogOut size={16} />
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="relative z-10 flex min-w-0 flex-1 flex-col">
//         <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
//           <button
//             onClick={() => setOpen(true)}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
//           >
//             <FiMenu />
//           </button>

//           <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
//             <FiSearch className="shrink-0" />
//             <input
//               placeholder="Search vendor, application..."
//               className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
//             />
//           </div>

//           <div className="ml-auto flex items-center gap-3">
//             <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
//               <FiBell size={18} />
//               <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
//             </button>
//             <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
//                 {initials}
//               </div>
//               <div className="leading-tight">
//                 <p className="text-[13px] font-semibold text-ink-900">{displayName}</p>
//                 <p className="text-[11px] text-ink-500">{displaySubtitle}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
//               title="Logout"
//             >
//               <FiLogOut size={17} />
//             </button>
//           </div>
//         </header>

//         <main className="flex-1 p-5 sm:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// =======================================================

import { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  FiGrid,
  FiUserPlus,
  FiMapPin,
  FiMap,
  FiCheckSquare,
  FiCreditCard,
  FiMenu,
  FiSearch,
  FiBell,
  FiLogOut,
  FiX,
  FiUpload,
} from "react-icons/fi";
import { useAuth } from "../modules/auth/hooks/useAuth";
// If you keep your logo at src/assets/logovvcmc.jpeg, just swap this import path.
import logo from "../assets/logovvcmc.jpg";

// Same routes/labels/icons as your original sidebar - unchanged.
const NAV = [
  { to: "/", label: "Dashboard", icon: FiGrid },
  { to: "/vendors/list", label: "Vendor Registration", icon: FiUserPlus },
  // { to: "/vendors/bulk-import", label: "Import Excel", icon: FiUpload },
  { to: "/survey", label: "Vendor Survey", icon: FiMapPin },
  { to: "/applications", label: "Application Approval", icon: FiCheckSquare },
  { to: "/vendors/list", label: "Smart Card", icon: FiCreditCard },
  { to: "/survey/map", label: "Survey Map", icon: FiMap },
];

// ── Which nav items each role is allowed to see (by label) ──
// super_admin (or any role not listed here) sees everything.
const ROLE_NAV_LABELS = {
  vendor: ["Vendor Registration"],
  citizen: ["Vendor Registration"],
  counter_officer: ["Dashboard", "Vendor Registration", "Import Excel"],
  survey_officer: ["Dashboard", "Vendor Survey"],
  "A.M.C.": ["Dashboard", "Application Approval", "Smart Card", "Survey Map"],
};

function getNavForRole(role) {
  const allowedLabels = ROLE_NAV_LABELS[role];
  if (!allowedLabels) return NAV; // super_admin / unrecognized role → full nav, unchanged behavior
  return NAV.filter((item) => allowedLabels.includes(item.label));
}

// ── Human-readable label for each role stored in the backend ──
const ROLE_LABELS = {
  vendor: "Vendor",
  citizen: "Citizen",
  counter_officer: "Counter Officer",
  survey_officer: "Survey Officer",
  "A.M.C.": "A.M.C.",
  super_admin: "Super Admin",
};

function getRoleLabel(role) {
  return ROLE_LABELS[role] || role || "";
}

// Ward A / Ward B ... -> shown as-is; if no ward (super_admin/vendor/citizen), fall back to office name.
function getSubtitle(user) {
  if (!user) return "";
  const parts = [getRoleLabel(user.role)];
  if (user.ward) parts.push(user.ward);
  else if (user.office) parts.push(user.office);
  return parts.filter(Boolean).join(" • ");
}

function getInitials(fullName) {
  return (
    fullName
      ?.trim()
      .split(/\s+/)
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U"
  );
}

// function BackgroundBlobs() {
//   return (
//     <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
//       <div className="absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-lime-500/50 to-amber-100/40 blur-3xl" />
//       <div className="absolute right-[-10%] top-[-10%] h-[380px] w-[380px] rounded-full bg-gradient-to-br from-sky-200/50 to-cyan-100/40 blur-3xl" />
//       <div className="absolute bottom-[-15%] left-[20%] h-[360px] w-[360px] rounded-full bg-gradient-to-br from-emerald-100/40 to-teal-100/30 blur-3xl" />
//     </div>
//   );
// }


function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-40 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-lime-300/40 to-amber-100/30 blur-3xl" />
      <div className="absolute right-[-18%] top-[-15%] h-[560px] w-[560px] rounded-full bg-gradient-to-br from-sky-200/40 to-cyan-100/30 blur-3xl" />
      <div className="absolute bottom-[-25%] left-[10%] h-[540px] w-[540px] rounded-full bg-gradient-to-br from-emerald-200/35 to-teal-100/25 blur-3xl" />
      <div className="absolute left-[30%] top-[25%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-100/30 to-lime-200/25 blur-3xl" />
      <div className="absolute right-[5%] bottom-[5%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-100/30 to-sky-200/25 blur-3xl" />
      <div className="absolute right-[25%] top-[50%] h-[480px] w-[480px] rounded-full bg-gradient-to-br from-teal-100/30 to-emerald-100/25 blur-3xl" />
      <div className="absolute left-[55%] bottom-[30%] h-[460px] w-[460px] rounded-full bg-gradient-to-br from-emerald-200/25 to-sky-100/20 blur-3xl" />
      <div className="absolute left-[5%] top-[55%] h-[440px] w-[440px] rounded-full bg-gradient-to-br from-amber-100/25 to-lime-200/20 blur-3xl" />
    </div>
  );
}



export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const displayName = user?.fullName || "User";
  const displaySubtitle = getSubtitle(user);
  const initials = getInitials(user?.fullName);
  const navItems = useMemo(() => getNavForRole(user?.role), [user?.role]);

  return (
    <div className="relative flex min-h-screen bg-surface">
      <BackgroundBlobs />

      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar — premium floating enterprise style */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 flex w-[250px] shrink-0 flex-col overflow-hidden",
          "transition-transform duration-300 ease-out",
          "lg:sticky lg:top-4 lg:my-4 lg:ml-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0",
          "lg:rounded-[24px] lg:shadow-[0_20px_50px_-14px_rgba(6,46,52,0.5)]",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          background: "linear-gradient(180deg, #0B4D52 0%, #08464B 50%, #062E34 100%)",
        }}
      >
        {/* subtle glass texture overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 8%, #ffffff 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ffffff 0%, transparent 35%)",
          }}
        />

        {/* Mobile close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <FiX size={18} />
        </button>

        {/* Brand — logo alone on top (centered), name below it, Street Vendors below that */}
        <div className="relative flex flex-col items-center gap-3 px-5 pb-5 pt-7 text-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-white/20">
            <img src={logo} alt="Municipal Corporation Logo" className="h-[52px] w-[52px] object-contain" />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="text-[15px] font-extrabold leading-snug text-white">
              Vasai Virar City Municipal Corporation
            </p>
            <p className="mt-1.5 text-[13px] font-semibold text-[#E9CE8B]">Street Vendors Management System</p>
          </div>
          <div aria-hidden="true" className="mt-1 flex items-center gap-1.5">
            <span className="h-px w-6 bg-[#E9CE8B]/50" />
            <span className="h-1 w-1 rounded-full bg-[#E9CE8B]/50" />
            <span className="h-px w-6 bg-[#E9CE8B]/50" />
          </div>
        </div>

        <div aria-hidden="true" className="relative mx-5 h-px bg-white/10" />

        {/* Navigation */}
        <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
            Main Menu
          </p>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to + label}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                clsx(
                  "group relative flex h-[52px] items-center gap-3.5 rounded-2xl px-4 text-[15px] font-medium",
                  "transition-all duration-300 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08464B]",
                  isActive
                    ? "bg-white text-ink-900 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]"
                    : "text-white/70 hover:translate-x-1 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#16C47F]"
                    />
                  )}
                  <Icon
                    size={22}
                    className={clsx(
                      "shrink-0 transition-colors duration-300",
                      isActive ? "text-[#16C47F]" : "text-white/60 group-hover:text-white"
                    )}
                  />
                  <span className="truncate">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User profile card */}
        <div className="relative mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/20">
                {initials}
              </div>
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#08464B] bg-[#16C47F]"
              />
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[13px] font-semibold text-white">{displayName}</p>
              <p className="truncate text-[11px] text-white/60">{displaySubtitle}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C47F]"
              title="Logout"
              aria-label="Logout"
            >
              <FiLogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 bg-white/85 px-5 py-4 backdrop-blur-md sm:px-8">
          <button
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 lg:hidden"
          >
            <FiMenu />
          </button>

          <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2 text-ink-400 md:flex md:w-64">
            <FiSearch className="shrink-0" />
            <input
              placeholder="Search vendor, application..."
              className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50">
              <FiBell size={18} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" />
            </button>
            <div className="hidden items-center gap-2.5 border-l border-ink-100 pl-4 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 ring-2 ring-white">
                {initials}
              </div>
              <div className="leading-tight">
                <p className="text-[13px] font-semibold text-ink-900">{displayName}</p>
                <p className="text-[11px] text-ink-500">{displaySubtitle}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-100 hover:text-danger-500"
              title="Logout"
            >
              <FiLogOut size={17} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}