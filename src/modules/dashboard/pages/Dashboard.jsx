// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
//   FiCheckCircle,
//   FiXCircle,
//   FiTrendingUp,
//   FiDollarSign,
//   FiRefreshCw,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// function formatCurrency(n) {
//   return `₹${Number(n || 0).toLocaleString("en-IN")}`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// // Ward-wise revenue - horizontal gradient bars, sorted highest first.
// function WardRevenueChart({ data }) {
//   const max = Math.max(...data.map((d) => d.amount), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No successful payments yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.ward} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.ward}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.amount / max) * 100, 3)}%`,
//                 background: "linear-gradient(90deg, #16C47F 0%, #0EA5A8 100%)",
//               }}
//             />
//           </div>
//           <span className="w-24 shrink-0 text-right text-xs font-bold text-ink-900">
//             {formatCurrency(d.amount)}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Generic horizontal count bar chart (used for ward-wise renewals).
// function CountBarChart({ data, gradientFrom = "#0EA5A8", gradientTo = "#16C47F" }) {
//   const max = Math.max(...data.map((d) => d.count), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No data yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.label} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.label}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.count / max) * 100, 4)}%`,
//                 background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
//               }}
//             />
//           </div>
//           <span className="w-10 shrink-0 text-right text-xs font-bold text-ink-900">{d.count}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Semi-circle gauge for payment success rate.
// function SuccessGauge({ pct, label = "Payment Success Rate" }) {
//   const size = 200;
//   const cx = size / 2;
//   const cy = size / 2 + 10;
//   const r = 76;
//   const thickness = 18;
//   const circumference = Math.PI * r; // half circle length
//   const filled = (Math.min(Math.max(pct, 0), 100) / 100) * circumference;
//   const color = pct >= 75 ? "#16C47F" : pct >= 45 ? "#F59E0B" : "#EF4444";

//   return (
//     <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`}>
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke="#EEF2F1"
//         strokeWidth={thickness}
//         strokeLinecap="round"
//       />
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke={color}
//         strokeWidth={thickness}
//         strokeLinecap="round"
//         strokeDasharray={`${filled} ${circumference}`}
//       />
//       <text x={cx} y={cy - 6} textAnchor="middle" fontSize="28" fontWeight="800" fill="#0F172A">
//         {pct}%
//       </text>
//       <text x={cx} y={cy + 16} textAnchor="middle" fontSize="11" fill="#94A3B8">
//         {label}
//       </text>
//     </svg>
//   );
// }

// const ZONE_PALETTE = ["#16C47F", "#0EA5A8", "#F59E0B", "#3B82F6", "#8B5CF6", "#EF4444", "#EC4899", "#14B8A6"];

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );


// const revenue = useMemo(() => {
//     const vendorById = new Map(vendors.map((v) => [v.id, v]));
//     const byWard = {};
//     const byZone = {};
//     let totalRevenue = 0;
//     let successCount = 0;
//     let failedCount = 0;
//     let pendingCount = 0;

//     applications.forEach((a) => {
//       const amount = Number(a.amount ?? a.paymentAmount ?? 0);
//       const rawStatus = (a.paymentStatus ?? a.status ?? "").toString().toLowerCase();
//       const vendor = vendorById.get(a.vendorId);
//       const ward = vendor?.address?.ward || "Unassigned";
//       const zone = vendor?.address?.zone || "Unassigned";

//       if (rawStatus === "success" || rawStatus === "paid" || rawStatus === "completed") {
//         successCount += 1;
//         totalRevenue += amount;
//         byWard[ward] = (byWard[ward] || 0) + amount;
//         byZone[zone] = (byZone[zone] || 0) + amount;
//       } else if (rawStatus === "failed") {
//         failedCount += 1;
//       } else if (rawStatus) {
//         pendingCount += 1;
//       }
//     });

//     let wardData = Object.entries(byWard)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([ward, amount]) => ({ ward, amount }));

//     let zoneData = Object.entries(byZone)
//       .sort((a, b) => b[1] - a[1])
//       .map(([zone, amount], i) => ({ label: zone, value: amount, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once amount/paymentStatus fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((ward, i) => ({
//         ward,
//         amount: [42000, 35500, 28000, 21000, 15500, 9800][i] ?? 5000,
//       }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [58000, 41000, 27000, 18500, 11000][i] ?? 5000,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }

//     let displayTotalRevenue = totalRevenue;
//     let displaySuccessCount = successCount;
//     let displayFailedCount = failedCount;
//     let displayPendingCount = pendingCount;

//     if (usingFallback && totalRevenue === 0 && successCount === 0 && failedCount === 0 && pendingCount === 0) {
//       displayTotalRevenue = wardData.reduce((sum, w) => sum + w.amount, 0);
//       displaySuccessCount = 34;
//       displayFailedCount = 6;
//       displayPendingCount = 4;
//     }
//     // --- END FALLBACK ---

//     const totalPayments = displaySuccessCount + displayFailedCount + displayPendingCount;
//     const successRate = totalPayments ? Math.round((displaySuccessCount / totalPayments) * 100) : 0;

//     return {
//       totalRevenue: displayTotalRevenue,
//       successCount: displaySuccessCount,
//       failedCount: displayFailedCount,
//       pendingCount: displayPendingCount,
//       totalPayments,
//       successRate,
//       wardData,
//       zoneData,
//       usingFallback,
//     };
//   }, [applications, vendors]);


//   const renewals = useMemo(() => {
//     const wardCounts = {};
//     const zoneCounts = {};
//     let renewedCount = 0;
//     let paidCount = 0;
//     let unpaidCount = 0;

//     vendors.forEach((v) => {
//       const isRenewed = v.renewalStatus === "Renewed" || v.isRenewed === true;
//       if (!isRenewed) return;
//       renewedCount += 1;
//       const ward = v.address?.ward || "Unassigned";
//       const zone = v.address?.zone || "Unassigned";
//       wardCounts[ward] = (wardCounts[ward] || 0) + 1;
//       zoneCounts[zone] = (zoneCounts[zone] || 0) + 1;
//       if (v.renewalPaid) paidCount += 1;
//       else unpaidCount += 1;
//     });

//     const notRenewedCount = Math.max(vendors.length - renewedCount, 0);

//     let wardData = Object.entries(wardCounts)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([label, count]) => ({ label, count }));

//     let zoneData = Object.entries(zoneCounts)
//       .sort((a, b) => b[1] - a[1])
//       .map(([label, value], i) => ({ label, value, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once real renewal fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((label, i) => ({ label, count: [6, 5, 4, 3, 2, 1][i] ?? 1 }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [8, 6, 4, 3, 2][i] ?? 1,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }
//     const paymentTotal = paidCount + unpaidCount;
//     const paymentSegments =
//       paymentTotal > 0
//         ? [
//             { label: "Paid", value: paidCount, color: "#16C47F" },
//             { label: "Unpaid", value: unpaidCount, color: "#EF4444" },
//           ]
//         : (() => {
//             usingFallback = true;
//             return [
//               { label: "Paid", value: 7, color: "#16C47F" },
//               { label: "Unpaid", value: 3, color: "#EF4444" },
//             ];
//           })();
//     // --- END FALLBACK ---

//     const paymentRate = paymentTotal > 0 ? Math.round((paidCount / paymentTotal) * 100) : 70;

//     return {
//       renewedCount: usingFallback && renewedCount === 0 ? 24 : renewedCount,
//       notRenewedCount: usingFallback && renewedCount === 0 ? Math.max(vendors.length - 24, 0) : notRenewedCount,
//       wardData,
//       zoneData,
//       paymentSegments,
//       paymentRate,
//       usingFallback,
//     };
//   }, [vendors]);

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row — Application Status card removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessType}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>
//       </div>

//       {/* REMOVED (29-10 request): Revenue Analytics — disabled via {false && ...}, not deleted */}
//       {false && (
//       <>
//       {/* ======================= Revenue Analytics ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Revenue Analytics</h2>
//             <p className="text-sm text-ink-500">Payment collections broken down by ward, zone, and outcome.</p>
//           </div>
//           {revenue.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — payment fields not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           <KpiCard icon={FiDollarSign} tone="success" label="Total Revenue" value={formatCurrency(revenue.totalRevenue)} />
//           <KpiCard icon={FiCheckCircle} tone="brand" label="Successful Payments" value={revenue.successCount} />
//           <KpiCard icon={FiXCircle} tone="danger" label="Failed Payments" value={revenue.failedCount} />
//           <KpiCard icon={FiTrendingUp} tone="accent" label="Pending Payments" value={revenue.pendingCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <div className="mb-4 flex items-center justify-between">
//               <h3 className="font-display text-base font-bold text-ink-900">Revenue by Ward</h3>
//               <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//                 Top {revenue.wardData.length || 0}
//               </span>
//             </div>
//             <WardRevenueChart data={revenue.wardData} />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Revenue by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart
//                 segments={revenue.zoneData.map((z) => ({ label: z.label, value: z.value, color: z.color }))}
//                 size={160}
//                 thickness={22}
//               />
//               <div className="w-full space-y-2">
//                 {revenue.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{formatCurrency(z.value)}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <SuccessGauge pct={revenue.successRate} />
//             <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
//               <div>
//                 <p className="text-sm font-bold text-success-500">{revenue.successCount}</p>
//                 <p className="text-[10px] text-ink-400">Success</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-danger-500">{revenue.failedCount}</p>
//                 <p className="text-[10px] text-ink-400">Failed</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-warning-500">{revenue.pendingCount}</p>
//                 <p className="text-[10px] text-ink-400">Pending</p>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//       </>
//       )}
//       {/* end Revenue Analytics — removed from dashboard (29-10 request) */}

//       {/* REMOVED (29-10 request): Vendor Renewals — disabled via {false && ...}, not deleted */}
//       {false && (
//       <>
//       {/* ======================= Vendor Renewals ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Vendor Renewals</h2>
//             <p className="text-sm text-ink-500">
//               Renewed vendors broken down by ward, zone, and renewal payment status.
//             </p>
//           </div>
//           {renewals.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — renewal tracking not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//           <KpiCard icon={FiRefreshCw} tone="success" label="Vendors Renewed" value={renewals.renewedCount} />
//           <KpiCard icon={FiClock} tone="warning" label="Not Yet Renewed" value={renewals.notRenewedCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Ward</h3>
//             <CountBarChart data={renewals.wardData} gradientFrom="#0EA5A8" gradientTo="#16C47F" />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart segments={renewals.zoneData} size={160} thickness={22} />
//               <div className="w-full space-y-2">
//                 {renewals.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{z.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <h3 className="mb-2 self-start font-display text-base font-bold text-ink-900">Renewal Payments</h3>
//             <DonutChart segments={renewals.paymentSegments} size={150} thickness={20} />
//             <div className="mt-4 w-full space-y-2">
//               {renewals.paymentSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>
//       </>
//       )}
//       {/* end Vendor Renewals — removed from dashboard (29-10 request) */}

//       {/* Quick Actions + Banner — Workflow Overview removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }



// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';
// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessCategory}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>
//         {/* ***** */}

//         {/* <Card
//           padded={false}
          
//         >
        
//           <img src={vendorgadi} alt="" className="relative z-0 mt-auto w-full opacity-90" />
//         </Card> */}
//         <Card
//   padded={false}
//   className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
// >
//   {/* Background image, fills the whole card */}
//   <img
//     src={vendorgadi}
//     alt="Street vendor with cart"
//     className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//   />

//   {/* Gradient overlay for legible text */}
//   <div
//     aria-hidden="true"
//     className="absolute inset-0"
//     style={{
//       background:
//         "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//     }}
//   />

//   {/* Decorative gold ring accent */}
//   <div
//     aria-hidden="true"
//     className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//   />

//   {/* Badge */}
//   <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//     <FiShield size={11} className="text-[#E9CE8B]" />
//     VVCMC Initiative
//   </span>

//   {/* Text */}
//   <div className="relative z-10 p-5 pt-3">
//     <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//     <p className="mt-1.5 text-[12.5px] text-white/85">
//       Building stronger communities through transparent &amp; efficient management.
//     </p>
//   </div>
// </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }
























// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessCategory}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }












// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
//   FiCheckCircle,
//   FiXCircle,
//   FiTrendingUp,
//   FiDollarSign,
//   FiRefreshCw,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// function formatCurrency(n) {
//   return `₹${Number(n || 0).toLocaleString("en-IN")}`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// // Ward-wise revenue - horizontal gradient bars, sorted highest first.
// function WardRevenueChart({ data }) {
//   const max = Math.max(...data.map((d) => d.amount), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No successful payments yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.ward} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.ward}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.amount / max) * 100, 3)}%`,
//                 background: "linear-gradient(90deg, #16C47F 0%, #0EA5A8 100%)",
//               }}
//             />
//           </div>
//           <span className="w-24 shrink-0 text-right text-xs font-bold text-ink-900">
//             {formatCurrency(d.amount)}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Generic horizontal count bar chart (used for ward-wise renewals).
// function CountBarChart({ data, gradientFrom = "#0EA5A8", gradientTo = "#16C47F" }) {
//   const max = Math.max(...data.map((d) => d.count), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No data yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.label} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.label}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.count / max) * 100, 4)}%`,
//                 background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
//               }}
//             />
//           </div>
//           <span className="w-10 shrink-0 text-right text-xs font-bold text-ink-900">{d.count}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Semi-circle gauge for payment success rate.
// function SuccessGauge({ pct, label = "Payment Success Rate" }) {
//   const size = 200;
//   const cx = size / 2;
//   const cy = size / 2 + 10;
//   const r = 76;
//   const thickness = 18;
//   const circumference = Math.PI * r; // half circle length
//   const filled = (Math.min(Math.max(pct, 0), 100) / 100) * circumference;
//   const color = pct >= 75 ? "#16C47F" : pct >= 45 ? "#F59E0B" : "#EF4444";

//   return (
//     <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`}>
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke="#EEF2F1"
//         strokeWidth={thickness}
//         strokeLinecap="round"
//       />
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke={color}
//         strokeWidth={thickness}
//         strokeLinecap="round"
//         strokeDasharray={`${filled} ${circumference}`}
//       />
//       <text x={cx} y={cy - 6} textAnchor="middle" fontSize="28" fontWeight="800" fill="#0F172A">
//         {pct}%
//       </text>
//       <text x={cx} y={cy + 16} textAnchor="middle" fontSize="11" fill="#94A3B8">
//         {label}
//       </text>
//     </svg>
//   );
// }

// const ZONE_PALETTE = ["#16C47F", "#0EA5A8", "#F59E0B", "#3B82F6", "#8B5CF6", "#EF4444", "#EC4899", "#14B8A6"];

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );


// const revenue = useMemo(() => {
//     const vendorById = new Map(vendors.map((v) => [v.id, v]));
//     const byWard = {};
//     const byZone = {};
//     let totalRevenue = 0;
//     let successCount = 0;
//     let failedCount = 0;
//     let pendingCount = 0;

//     applications.forEach((a) => {
//       const amount = Number(a.amount ?? a.paymentAmount ?? 0);
//       const rawStatus = (a.paymentStatus ?? a.status ?? "").toString().toLowerCase();
//       const vendor = vendorById.get(a.vendorId);
//       const ward = vendor?.address?.ward || "Unassigned";
//       const zone = vendor?.address?.zone || "Unassigned";

//       if (rawStatus === "success" || rawStatus === "paid" || rawStatus === "completed") {
//         successCount += 1;
//         totalRevenue += amount;
//         byWard[ward] = (byWard[ward] || 0) + amount;
//         byZone[zone] = (byZone[zone] || 0) + amount;
//       } else if (rawStatus === "failed") {
//         failedCount += 1;
//       } else if (rawStatus) {
//         pendingCount += 1;
//       }
//     });

//     let wardData = Object.entries(byWard)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([ward, amount]) => ({ ward, amount }));

//     let zoneData = Object.entries(byZone)
//       .sort((a, b) => b[1] - a[1])
//       .map(([zone, amount], i) => ({ label: zone, value: amount, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once amount/paymentStatus fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((ward, i) => ({
//         ward,
//         amount: [42000, 35500, 28000, 21000, 15500, 9800][i] ?? 5000,
//       }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [58000, 41000, 27000, 18500, 11000][i] ?? 5000,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }

//     let displayTotalRevenue = totalRevenue;
//     let displaySuccessCount = successCount;
//     let displayFailedCount = failedCount;
//     let displayPendingCount = pendingCount;

//     if (usingFallback && totalRevenue === 0 && successCount === 0 && failedCount === 0 && pendingCount === 0) {
//       displayTotalRevenue = wardData.reduce((sum, w) => sum + w.amount, 0);
//       displaySuccessCount = 34;
//       displayFailedCount = 6;
//       displayPendingCount = 4;
//     }
//     // --- END FALLBACK ---

//     const totalPayments = displaySuccessCount + displayFailedCount + displayPendingCount;
//     const successRate = totalPayments ? Math.round((displaySuccessCount / totalPayments) * 100) : 0;

//     return {
//       totalRevenue: displayTotalRevenue,
//       successCount: displaySuccessCount,
//       failedCount: displayFailedCount,
//       pendingCount: displayPendingCount,
//       totalPayments,
//       successRate,
//       wardData,
//       zoneData,
//       usingFallback,
//     };
//   }, [applications, vendors]);


//   const renewals = useMemo(() => {
//     const wardCounts = {};
//     const zoneCounts = {};
//     let renewedCount = 0;
//     let paidCount = 0;
//     let unpaidCount = 0;

//     vendors.forEach((v) => {
//       const isRenewed = v.renewalStatus === "Renewed" || v.isRenewed === true;
//       if (!isRenewed) return;
//       renewedCount += 1;
//       const ward = v.address?.ward || "Unassigned";
//       const zone = v.address?.zone || "Unassigned";
//       wardCounts[ward] = (wardCounts[ward] || 0) + 1;
//       zoneCounts[zone] = (zoneCounts[zone] || 0) + 1;
//       if (v.renewalPaid) paidCount += 1;
//       else unpaidCount += 1;
//     });

//     const notRenewedCount = Math.max(vendors.length - renewedCount, 0);

//     let wardData = Object.entries(wardCounts)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([label, count]) => ({ label, count }));

//     let zoneData = Object.entries(zoneCounts)
//       .sort((a, b) => b[1] - a[1])
//       .map(([label, value], i) => ({ label, value, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once real renewal fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((label, i) => ({ label, count: [6, 5, 4, 3, 2, 1][i] ?? 1 }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [8, 6, 4, 3, 2][i] ?? 1,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }
//     const paymentTotal = paidCount + unpaidCount;
//     const paymentSegments =
//       paymentTotal > 0
//         ? [
//             { label: "Paid", value: paidCount, color: "#16C47F" },
//             { label: "Unpaid", value: unpaidCount, color: "#EF4444" },
//           ]
//         : (() => {
//             usingFallback = true;
//             return [
//               { label: "Paid", value: 7, color: "#16C47F" },
//               { label: "Unpaid", value: 3, color: "#EF4444" },
//             ];
//           })();
//     // --- END FALLBACK ---

//     const paymentRate = paymentTotal > 0 ? Math.round((paidCount / paymentTotal) * 100) : 70;

//     return {
//       renewedCount: usingFallback && renewedCount === 0 ? 24 : renewedCount,
//       notRenewedCount: usingFallback && renewedCount === 0 ? Math.max(vendors.length - 24, 0) : notRenewedCount,
//       wardData,
//       zoneData,
//       paymentSegments,
//       paymentRate,
//       usingFallback,
//     };
//   }, [vendors]);

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row — Application Status card removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessCategory}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>
//       </div>

//       {/* ======================= Revenue Analytics ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Revenue Analytics</h2>
//             <p className="text-sm text-ink-500">Payment collections broken down by ward, zone, and outcome.</p>
//           </div>
//           {revenue.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — payment fields not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           <KpiCard icon={FiDollarSign} tone="success" label="Total Revenue" value={formatCurrency(revenue.totalRevenue)} />
//           <KpiCard icon={FiCheckCircle} tone="brand" label="Successful Payments" value={revenue.successCount} />
//           <KpiCard icon={FiXCircle} tone="danger" label="Failed Payments" value={revenue.failedCount} />
//           <KpiCard icon={FiTrendingUp} tone="accent" label="Pending Payments" value={revenue.pendingCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <div className="mb-4 flex items-center justify-between">
//               <h3 className="font-display text-base font-bold text-ink-900">Revenue by Ward</h3>
//               <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//                 Top {revenue.wardData.length || 0}
//               </span>
//             </div>
//             <WardRevenueChart data={revenue.wardData} />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Revenue by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart
//                 segments={revenue.zoneData.map((z) => ({ label: z.label, value: z.value, color: z.color }))}
//                 size={160}
//                 thickness={22}
//               />
//               <div className="w-full space-y-2">
//                 {revenue.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{formatCurrency(z.value)}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <SuccessGauge pct={revenue.successRate} />
//             <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
//               <div>
//                 <p className="text-sm font-bold text-success-500">{revenue.successCount}</p>
//                 <p className="text-[10px] text-ink-400">Success</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-danger-500">{revenue.failedCount}</p>
//                 <p className="text-[10px] text-ink-400">Failed</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-warning-500">{revenue.pendingCount}</p>
//                 <p className="text-[10px] text-ink-400">Pending</p>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* ======================= Vendor Renewals ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Vendor Renewals</h2>
//             <p className="text-sm text-ink-500">
//               Renewed vendors broken down by ward, zone, and renewal payment status.
//             </p>
//           </div>
//           {renewals.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — renewal tracking not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//           <KpiCard icon={FiRefreshCw} tone="success" label="Vendors Renewed" value={renewals.renewedCount} />
//           <KpiCard icon={FiClock} tone="warning" label="Not Yet Renewed" value={renewals.notRenewedCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Ward</h3>
//             <CountBarChart data={renewals.wardData} gradientFrom="#0EA5A8" gradientTo="#16C47F" />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart segments={renewals.zoneData} size={160} thickness={22} />
//               <div className="w-full space-y-2">
//                 {renewals.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{z.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <h3 className="mb-2 self-start font-display text-base font-bold text-ink-900">Renewal Payments</h3>
//             <DonutChart segments={renewals.paymentSegments} size={150} thickness={20} />
//             <div className="mt-4 w-full space-y-2">
//               {renewals.paymentSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* Quick Actions + Banner — Workflow Overview removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }





// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';
// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessType}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>
//         {/* ***** */}

//         {/* <Card
//           padded={false}
          
//         >
        
//           <img src={vendorgadi} alt="" className="relative z-0 mt-auto w-full opacity-90" />
//         </Card> */}
//         <Card
//   padded={false}
//   className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
// >
//   {/* Background image, fills the whole card */}
//   <img
//     src={vendorgadi}
//     alt="Street vendor with cart"
//     className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//   />

//   {/* Gradient overlay for legible text */}
//   <div
//     aria-hidden="true"
//     className="absolute inset-0"
//     style={{
//       background:
//         "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//     }}
//   />

//   {/* Decorative gold ring accent */}
//   <div
//     aria-hidden="true"
//     className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//   />

//   {/* Badge */}
//   <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//     <FiShield size={11} className="text-[#E9CE8B]" />
//     VVCMC Initiative
//   </span>

//   {/* Text */}
//   <div className="relative z-10 p-5 pt-3">
//     <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//     <p className="mt-1.5 text-[12.5px] text-white/85">
//       Building stronger communities through transparent &amp; efficient management.
//     </p>
//   </div>
// </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }
























// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessType}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }












// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
//   FiCheckCircle,
//   FiXCircle,
//   FiTrendingUp,
//   FiDollarSign,
//   FiRefreshCw,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// function formatCurrency(n) {
//   return `₹${Number(n || 0).toLocaleString("en-IN")}`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// // Ward-wise revenue - horizontal gradient bars, sorted highest first.
// function WardRevenueChart({ data }) {
//   const max = Math.max(...data.map((d) => d.amount), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No successful payments yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.ward} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.ward}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.amount / max) * 100, 3)}%`,
//                 background: "linear-gradient(90deg, #16C47F 0%, #0EA5A8 100%)",
//               }}
//             />
//           </div>
//           <span className="w-24 shrink-0 text-right text-xs font-bold text-ink-900">
//             {formatCurrency(d.amount)}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Generic horizontal count bar chart (used for ward-wise renewals).
// function CountBarChart({ data, gradientFrom = "#0EA5A8", gradientTo = "#16C47F" }) {
//   const max = Math.max(...data.map((d) => d.count), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No data yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.label} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.label}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.count / max) * 100, 4)}%`,
//                 background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
//               }}
//             />
//           </div>
//           <span className="w-10 shrink-0 text-right text-xs font-bold text-ink-900">{d.count}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Semi-circle gauge for payment success rate.
// function SuccessGauge({ pct, label = "Payment Success Rate" }) {
//   const size = 200;
//   const cx = size / 2;
//   const cy = size / 2 + 10;
//   const r = 76;
//   const thickness = 18;
//   const circumference = Math.PI * r; // half circle length
//   const filled = (Math.min(Math.max(pct, 0), 100) / 100) * circumference;
//   const color = pct >= 75 ? "#16C47F" : pct >= 45 ? "#F59E0B" : "#EF4444";

//   return (
//     <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`}>
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke="#EEF2F1"
//         strokeWidth={thickness}
//         strokeLinecap="round"
//       />
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke={color}
//         strokeWidth={thickness}
//         strokeLinecap="round"
//         strokeDasharray={`${filled} ${circumference}`}
//       />
//       <text x={cx} y={cy - 6} textAnchor="middle" fontSize="28" fontWeight="800" fill="#0F172A">
//         {pct}%
//       </text>
//       <text x={cx} y={cy + 16} textAnchor="middle" fontSize="11" fill="#94A3B8">
//         {label}
//       </text>
//     </svg>
//   );
// }

// const ZONE_PALETTE = ["#16C47F", "#0EA5A8", "#F59E0B", "#3B82F6", "#8B5CF6", "#EF4444", "#EC4899", "#14B8A6"];

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );


// const revenue = useMemo(() => {
//     const vendorById = new Map(vendors.map((v) => [v.id, v]));
//     const byWard = {};
//     const byZone = {};
//     let totalRevenue = 0;
//     let successCount = 0;
//     let failedCount = 0;
//     let pendingCount = 0;

//     applications.forEach((a) => {
//       const amount = Number(a.amount ?? a.paymentAmount ?? 0);
//       const rawStatus = (a.paymentStatus ?? a.status ?? "").toString().toLowerCase();
//       const vendor = vendorById.get(a.vendorId);
//       const ward = vendor?.address?.ward || "Unassigned";
//       const zone = vendor?.address?.zone || "Unassigned";

//       if (rawStatus === "success" || rawStatus === "paid" || rawStatus === "completed") {
//         successCount += 1;
//         totalRevenue += amount;
//         byWard[ward] = (byWard[ward] || 0) + amount;
//         byZone[zone] = (byZone[zone] || 0) + amount;
//       } else if (rawStatus === "failed") {
//         failedCount += 1;
//       } else if (rawStatus) {
//         pendingCount += 1;
//       }
//     });

//     let wardData = Object.entries(byWard)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([ward, amount]) => ({ ward, amount }));

//     let zoneData = Object.entries(byZone)
//       .sort((a, b) => b[1] - a[1])
//       .map(([zone, amount], i) => ({ label: zone, value: amount, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once amount/paymentStatus fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((ward, i) => ({
//         ward,
//         amount: [42000, 35500, 28000, 21000, 15500, 9800][i] ?? 5000,
//       }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [58000, 41000, 27000, 18500, 11000][i] ?? 5000,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }

//     let displayTotalRevenue = totalRevenue;
//     let displaySuccessCount = successCount;
//     let displayFailedCount = failedCount;
//     let displayPendingCount = pendingCount;

//     if (usingFallback && totalRevenue === 0 && successCount === 0 && failedCount === 0 && pendingCount === 0) {
//       displayTotalRevenue = wardData.reduce((sum, w) => sum + w.amount, 0);
//       displaySuccessCount = 34;
//       displayFailedCount = 6;
//       displayPendingCount = 4;
//     }
//     // --- END FALLBACK ---

//     const totalPayments = displaySuccessCount + displayFailedCount + displayPendingCount;
//     const successRate = totalPayments ? Math.round((displaySuccessCount / totalPayments) * 100) : 0;

//     return {
//       totalRevenue: displayTotalRevenue,
//       successCount: displaySuccessCount,
//       failedCount: displayFailedCount,
//       pendingCount: displayPendingCount,
//       totalPayments,
//       successRate,
//       wardData,
//       zoneData,
//       usingFallback,
//     };
//   }, [applications, vendors]);


//   const renewals = useMemo(() => {
//     const wardCounts = {};
//     const zoneCounts = {};
//     let renewedCount = 0;
//     let paidCount = 0;
//     let unpaidCount = 0;

//     vendors.forEach((v) => {
//       const isRenewed = v.renewalStatus === "Renewed" || v.isRenewed === true;
//       if (!isRenewed) return;
//       renewedCount += 1;
//       const ward = v.address?.ward || "Unassigned";
//       const zone = v.address?.zone || "Unassigned";
//       wardCounts[ward] = (wardCounts[ward] || 0) + 1;
//       zoneCounts[zone] = (zoneCounts[zone] || 0) + 1;
//       if (v.renewalPaid) paidCount += 1;
//       else unpaidCount += 1;
//     });

//     const notRenewedCount = Math.max(vendors.length - renewedCount, 0);

//     let wardData = Object.entries(wardCounts)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([label, count]) => ({ label, count }));

//     let zoneData = Object.entries(zoneCounts)
//       .sort((a, b) => b[1] - a[1])
//       .map(([label, value], i) => ({ label, value, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once real renewal fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((label, i) => ({ label, count: [6, 5, 4, 3, 2, 1][i] ?? 1 }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [8, 6, 4, 3, 2][i] ?? 1,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }
//     const paymentTotal = paidCount + unpaidCount;
//     const paymentSegments =
//       paymentTotal > 0
//         ? [
//             { label: "Paid", value: paidCount, color: "#16C47F" },
//             { label: "Unpaid", value: unpaidCount, color: "#EF4444" },
//           ]
//         : (() => {
//             usingFallback = true;
//             return [
//               { label: "Paid", value: 7, color: "#16C47F" },
//               { label: "Unpaid", value: 3, color: "#EF4444" },
//             ];
//           })();
//     // --- END FALLBACK ---

//     const paymentRate = paymentTotal > 0 ? Math.round((paidCount / paymentTotal) * 100) : 70;

//     return {
//       renewedCount: usingFallback && renewedCount === 0 ? 24 : renewedCount,
//       notRenewedCount: usingFallback && renewedCount === 0 ? Math.max(vendors.length - 24, 0) : notRenewedCount,
//       wardData,
//       zoneData,
//       paymentSegments,
//       paymentRate,
//       usingFallback,
//     };
//   }, [vendors]);

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row — Application Status card removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessType}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>
//       </div>

//       {/* ======================= Revenue Analytics ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Revenue Analytics</h2>
//             <p className="text-sm text-ink-500">Payment collections broken down by ward, zone, and outcome.</p>
//           </div>
//           {revenue.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — payment fields not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           <KpiCard icon={FiDollarSign} tone="success" label="Total Revenue" value={formatCurrency(revenue.totalRevenue)} />
//           <KpiCard icon={FiCheckCircle} tone="brand" label="Successful Payments" value={revenue.successCount} />
//           <KpiCard icon={FiXCircle} tone="danger" label="Failed Payments" value={revenue.failedCount} />
//           <KpiCard icon={FiTrendingUp} tone="accent" label="Pending Payments" value={revenue.pendingCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <div className="mb-4 flex items-center justify-between">
//               <h3 className="font-display text-base font-bold text-ink-900">Revenue by Ward</h3>
//               <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//                 Top {revenue.wardData.length || 0}
//               </span>
//             </div>
//             <WardRevenueChart data={revenue.wardData} />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Revenue by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart
//                 segments={revenue.zoneData.map((z) => ({ label: z.label, value: z.value, color: z.color }))}
//                 size={160}
//                 thickness={22}
//               />
//               <div className="w-full space-y-2">
//                 {revenue.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{formatCurrency(z.value)}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <SuccessGauge pct={revenue.successRate} />
//             <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
//               <div>
//                 <p className="text-sm font-bold text-success-500">{revenue.successCount}</p>
//                 <p className="text-[10px] text-ink-400">Success</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-danger-500">{revenue.failedCount}</p>
//                 <p className="text-[10px] text-ink-400">Failed</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-warning-500">{revenue.pendingCount}</p>
//                 <p className="text-[10px] text-ink-400">Pending</p>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* ======================= Vendor Renewals ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Vendor Renewals</h2>
//             <p className="text-sm text-ink-500">
//               Renewed vendors broken down by ward, zone, and renewal payment status.
//             </p>
//           </div>
//           {renewals.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — renewal tracking not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//           <KpiCard icon={FiRefreshCw} tone="success" label="Vendors Renewed" value={renewals.renewedCount} />
//           <KpiCard icon={FiClock} tone="warning" label="Not Yet Renewed" value={renewals.notRenewedCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Ward</h3>
//             <CountBarChart data={renewals.wardData} gradientFrom="#0EA5A8" gradientTo="#16C47F" />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart segments={renewals.zoneData} size={160} thickness={22} />
//               <div className="w-full space-y-2">
//                 {renewals.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{z.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <h3 className="mb-2 self-start font-display text-base font-bold text-ink-900">Renewal Payments</h3>
//             <DonutChart segments={renewals.paymentSegments} size={150} thickness={20} />
//             <div className="mt-4 w-full space-y-2">
//               {renewals.paymentSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* Quick Actions + Banner — Workflow Overview removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }


// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';
// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessCategory}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>
//         {/* ***** */}

//         {/* <Card
//           padded={false}
          
//         >
        
//           <img src={vendorgadi} alt="" className="relative z-0 mt-auto w-full opacity-90" />
//         </Card> */}
//         <Card
//   padded={false}
//   className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
// >
//   {/* Background image, fills the whole card */}
//   <img
//     src={vendorgadi}
//     alt="Street vendor with cart"
//     className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//   />

//   {/* Gradient overlay for legible text */}
//   <div
//     aria-hidden="true"
//     className="absolute inset-0"
//     style={{
//       background:
//         "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//     }}
//   />

//   {/* Decorative gold ring accent */}
//   <div
//     aria-hidden="true"
//     className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//   />

//   {/* Badge */}
//   <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//     <FiShield size={11} className="text-[#E9CE8B]" />
//     VVCMC Initiative
//   </span>

//   {/* Text */}
//   <div className="relative z-10 p-5 pt-3">
//     <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//     <p className="mt-1.5 text-[12.5px] text-white/85">
//       Building stronger communities through transparent &amp; efficient management.
//     </p>
//   </div>
// </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }
























// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessCategory}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }












// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
//   FiCheckCircle,
//   FiXCircle,
//   FiTrendingUp,
//   FiDollarSign,
//   FiRefreshCw,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// function formatCurrency(n) {
//   return `₹${Number(n || 0).toLocaleString("en-IN")}`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// // Ward-wise revenue - horizontal gradient bars, sorted highest first.
// function WardRevenueChart({ data }) {
//   const max = Math.max(...data.map((d) => d.amount), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No successful payments yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.ward} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.ward}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.amount / max) * 100, 3)}%`,
//                 background: "linear-gradient(90deg, #16C47F 0%, #0EA5A8 100%)",
//               }}
//             />
//           </div>
//           <span className="w-24 shrink-0 text-right text-xs font-bold text-ink-900">
//             {formatCurrency(d.amount)}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Generic horizontal count bar chart (used for ward-wise renewals).
// function CountBarChart({ data, gradientFrom = "#0EA5A8", gradientTo = "#16C47F" }) {
//   const max = Math.max(...data.map((d) => d.count), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No data yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.label} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.label}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.count / max) * 100, 4)}%`,
//                 background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
//               }}
//             />
//           </div>
//           <span className="w-10 shrink-0 text-right text-xs font-bold text-ink-900">{d.count}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Semi-circle gauge for payment success rate.
// function SuccessGauge({ pct, label = "Payment Success Rate" }) {
//   const size = 200;
//   const cx = size / 2;
//   const cy = size / 2 + 10;
//   const r = 76;
//   const thickness = 18;
//   const circumference = Math.PI * r; // half circle length
//   const filled = (Math.min(Math.max(pct, 0), 100) / 100) * circumference;
//   const color = pct >= 75 ? "#16C47F" : pct >= 45 ? "#F59E0B" : "#EF4444";

//   return (
//     <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`}>
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke="#EEF2F1"
//         strokeWidth={thickness}
//         strokeLinecap="round"
//       />
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke={color}
//         strokeWidth={thickness}
//         strokeLinecap="round"
//         strokeDasharray={`${filled} ${circumference}`}
//       />
//       <text x={cx} y={cy - 6} textAnchor="middle" fontSize="28" fontWeight="800" fill="#0F172A">
//         {pct}%
//       </text>
//       <text x={cx} y={cy + 16} textAnchor="middle" fontSize="11" fill="#94A3B8">
//         {label}
//       </text>
//     </svg>
//   );
// }

// const ZONE_PALETTE = ["#16C47F", "#0EA5A8", "#F59E0B", "#3B82F6", "#8B5CF6", "#EF4444", "#EC4899", "#14B8A6"];

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );


// const revenue = useMemo(() => {
//     const vendorById = new Map(vendors.map((v) => [v.id, v]));
//     const byWard = {};
//     const byZone = {};
//     let totalRevenue = 0;
//     let successCount = 0;
//     let failedCount = 0;
//     let pendingCount = 0;

//     applications.forEach((a) => {
//       const amount = Number(a.amount ?? a.paymentAmount ?? 0);
//       const rawStatus = (a.paymentStatus ?? a.status ?? "").toString().toLowerCase();
//       const vendor = vendorById.get(a.vendorId);
//       const ward = vendor?.address?.ward || "Unassigned";
//       const zone = vendor?.address?.zone || "Unassigned";

//       if (rawStatus === "success" || rawStatus === "paid" || rawStatus === "completed") {
//         successCount += 1;
//         totalRevenue += amount;
//         byWard[ward] = (byWard[ward] || 0) + amount;
//         byZone[zone] = (byZone[zone] || 0) + amount;
//       } else if (rawStatus === "failed") {
//         failedCount += 1;
//       } else if (rawStatus) {
//         pendingCount += 1;
//       }
//     });

//     let wardData = Object.entries(byWard)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([ward, amount]) => ({ ward, amount }));

//     let zoneData = Object.entries(byZone)
//       .sort((a, b) => b[1] - a[1])
//       .map(([zone, amount], i) => ({ label: zone, value: amount, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once amount/paymentStatus fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((ward, i) => ({
//         ward,
//         amount: [42000, 35500, 28000, 21000, 15500, 9800][i] ?? 5000,
//       }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [58000, 41000, 27000, 18500, 11000][i] ?? 5000,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }

//     let displayTotalRevenue = totalRevenue;
//     let displaySuccessCount = successCount;
//     let displayFailedCount = failedCount;
//     let displayPendingCount = pendingCount;

//     if (usingFallback && totalRevenue === 0 && successCount === 0 && failedCount === 0 && pendingCount === 0) {
//       displayTotalRevenue = wardData.reduce((sum, w) => sum + w.amount, 0);
//       displaySuccessCount = 34;
//       displayFailedCount = 6;
//       displayPendingCount = 4;
//     }
//     // --- END FALLBACK ---

//     const totalPayments = displaySuccessCount + displayFailedCount + displayPendingCount;
//     const successRate = totalPayments ? Math.round((displaySuccessCount / totalPayments) * 100) : 0;

//     return {
//       totalRevenue: displayTotalRevenue,
//       successCount: displaySuccessCount,
//       failedCount: displayFailedCount,
//       pendingCount: displayPendingCount,
//       totalPayments,
//       successRate,
//       wardData,
//       zoneData,
//       usingFallback,
//     };
//   }, [applications, vendors]);


//   const renewals = useMemo(() => {
//     const wardCounts = {};
//     const zoneCounts = {};
//     let renewedCount = 0;
//     let paidCount = 0;
//     let unpaidCount = 0;

//     vendors.forEach((v) => {
//       const isRenewed = v.renewalStatus === "Renewed" || v.isRenewed === true;
//       if (!isRenewed) return;
//       renewedCount += 1;
//       const ward = v.address?.ward || "Unassigned";
//       const zone = v.address?.zone || "Unassigned";
//       wardCounts[ward] = (wardCounts[ward] || 0) + 1;
//       zoneCounts[zone] = (zoneCounts[zone] || 0) + 1;
//       if (v.renewalPaid) paidCount += 1;
//       else unpaidCount += 1;
//     });

//     const notRenewedCount = Math.max(vendors.length - renewedCount, 0);

//     let wardData = Object.entries(wardCounts)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([label, count]) => ({ label, count }));

//     let zoneData = Object.entries(zoneCounts)
//       .sort((a, b) => b[1] - a[1])
//       .map(([label, value], i) => ({ label, value, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once real renewal fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((label, i) => ({ label, count: [6, 5, 4, 3, 2, 1][i] ?? 1 }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [8, 6, 4, 3, 2][i] ?? 1,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }
//     const paymentTotal = paidCount + unpaidCount;
//     const paymentSegments =
//       paymentTotal > 0
//         ? [
//             { label: "Paid", value: paidCount, color: "#16C47F" },
//             { label: "Unpaid", value: unpaidCount, color: "#EF4444" },
//           ]
//         : (() => {
//             usingFallback = true;
//             return [
//               { label: "Paid", value: 7, color: "#16C47F" },
//               { label: "Unpaid", value: 3, color: "#EF4444" },
//             ];
//           })();
//     // --- END FALLBACK ---

//     const paymentRate = paymentTotal > 0 ? Math.round((paidCount / paymentTotal) * 100) : 70;

//     return {
//       renewedCount: usingFallback && renewedCount === 0 ? 24 : renewedCount,
//       notRenewedCount: usingFallback && renewedCount === 0 ? Math.max(vendors.length - 24, 0) : notRenewedCount,
//       wardData,
//       zoneData,
//       paymentSegments,
//       paymentRate,
//       usingFallback,
//     };
//   }, [vendors]);

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row — Application Status card removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessCategory}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>
//       </div>

//       {/* ======================= Revenue Analytics ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Revenue Analytics</h2>
//             <p className="text-sm text-ink-500">Payment collections broken down by ward, zone, and outcome.</p>
//           </div>
//           {revenue.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — payment fields not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           <KpiCard icon={FiDollarSign} tone="success" label="Total Revenue" value={formatCurrency(revenue.totalRevenue)} />
//           <KpiCard icon={FiCheckCircle} tone="brand" label="Successful Payments" value={revenue.successCount} />
//           <KpiCard icon={FiXCircle} tone="danger" label="Failed Payments" value={revenue.failedCount} />
//           <KpiCard icon={FiTrendingUp} tone="accent" label="Pending Payments" value={revenue.pendingCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <div className="mb-4 flex items-center justify-between">
//               <h3 className="font-display text-base font-bold text-ink-900">Revenue by Ward</h3>
//               <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//                 Top {revenue.wardData.length || 0}
//               </span>
//             </div>
//             <WardRevenueChart data={revenue.wardData} />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Revenue by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart
//                 segments={revenue.zoneData.map((z) => ({ label: z.label, value: z.value, color: z.color }))}
//                 size={160}
//                 thickness={22}
//               />
//               <div className="w-full space-y-2">
//                 {revenue.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{formatCurrency(z.value)}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <SuccessGauge pct={revenue.successRate} />
//             <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
//               <div>
//                 <p className="text-sm font-bold text-success-500">{revenue.successCount}</p>
//                 <p className="text-[10px] text-ink-400">Success</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-danger-500">{revenue.failedCount}</p>
//                 <p className="text-[10px] text-ink-400">Failed</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-warning-500">{revenue.pendingCount}</p>
//                 <p className="text-[10px] text-ink-400">Pending</p>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* ======================= Vendor Renewals ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Vendor Renewals</h2>
//             <p className="text-sm text-ink-500">
//               Renewed vendors broken down by ward, zone, and renewal payment status.
//             </p>
//           </div>
//           {renewals.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — renewal tracking not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//           <KpiCard icon={FiRefreshCw} tone="success" label="Vendors Renewed" value={renewals.renewedCount} />
//           <KpiCard icon={FiClock} tone="warning" label="Not Yet Renewed" value={renewals.notRenewedCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Ward</h3>
//             <CountBarChart data={renewals.wardData} gradientFrom="#0EA5A8" gradientTo="#16C47F" />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart segments={renewals.zoneData} size={160} thickness={22} />
//               <div className="w-full space-y-2">
//                 {renewals.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{z.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <h3 className="mb-2 self-start font-display text-base font-bold text-ink-900">Renewal Payments</h3>
//             <DonutChart segments={renewals.paymentSegments} size={150} thickness={20} />
//             <div className="mt-4 w-full space-y-2">
//               {renewals.paymentSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* Quick Actions + Banner — Workflow Overview removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }





// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';
// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessType}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>
//         {/* ***** */}

//         {/* <Card
//           padded={false}
          
//         >
        
//           <img src={vendorgadi} alt="" className="relative z-0 mt-auto w-full opacity-90" />
//         </Card> */}
//         <Card
//   padded={false}
//   className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
// >
//   {/* Background image, fills the whole card */}
//   <img
//     src={vendorgadi}
//     alt="Street vendor with cart"
//     className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//   />

//   {/* Gradient overlay for legible text */}
//   <div
//     aria-hidden="true"
//     className="absolute inset-0"
//     style={{
//       background:
//         "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//     }}
//   />

//   {/* Decorative gold ring accent */}
//   <div
//     aria-hidden="true"
//     className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//   />

//   {/* Badge */}
//   <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//     <FiShield size={11} className="text-[#E9CE8B]" />
//     VVCMC Initiative
//   </span>

//   {/* Text */}
//   <div className="relative z-10 p-5 pt-3">
//     <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//     <p className="mt-1.5 text-[12.5px] text-white/85">
//       Building stronger communities through transparent &amp; efficient management.
//     </p>
//   </div>
// </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }
























// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessType}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }












// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
//   FiLoader,
//   FiAlertCircle,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { fetchVendorApplications } from "../../../services/vendorApplicationService";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // ── Backend's real workflow status → the simpler display buckets used across the app ──
// // (same bucketing as VendorList.jsx, so the numbers stay consistent across pages)
// const STATUS_DISPLAY_MAP = {
//   Draft: "Draft",
//   Submitted: "Pending Survey",
//   "Sent Back to Vendor": "Sent Back",
//   "Forwarded to Survey Officer": "Under Survey",
//   "Sent Back to Counter Officer": "Sent Back",
//   "Survey Approved": "Under Survey",
//   "Forwarded to A.M.C.": "Pending Approval",
//   "A.M.C. Approved": "Approved",
//   Rejected: "Rejected",
//   "Payment Pending": "Approved",
//   "Payment Done": "Approved",
//   "Certificate Issued": "Approved",
// };
// const displayStatus = (backendStatus) => STATUS_DISPLAY_MAP[backendStatus] || backendStatus;

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();

//   // ── Real, role/ward-filtered data ──
//   // The backend (`GET /api/applications/getAll`) automatically scopes results to the
//   // logged-in officer's own ward for counter_officer / survey_officer / A.M.C., and to
//   // everything for super_admin — this component never needs to know or send the ward itself.
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     // First call just to learn the real total, then fetch everything in one go —
//     // same pattern VendorList.jsx already uses.
//     fetchVendorApplications({ limit: 1 }).then((countResult) => {
//       if (cancelled) return;
//       if (!countResult.success) {
//         setLoading(false);
//         setError(countResult.message || "Could not load dashboard data.");
//         return;
//       }
//       const dynamicLimit = countResult.total || 1;
//       fetchVendorApplications({ limit: dynamicLimit }).then((result) => {
//         if (cancelled) return;
//         setLoading(false);
//         if (!result.success) {
//           setError(result.message || "Could not load dashboard data.");
//           return;
//         }
//         setApplications(result.data || []);
//       });
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const stats = useMemo(() => {
//     const totalApplications = applications.length;
//     let approved = 0;
//     let rejected = 0;
//     let smartCardsDisbursed = 0;
//     let paymentsToday = 0;
//     const todayStr = new Date().toISOString().slice(0, 10);

//     applications.forEach((a) => {
//       const bucket = displayStatus(a.status);
//       if (bucket === "Approved") approved += 1;
//       else if (bucket === "Rejected") rejected += 1;

//       if (a.certificate?.certificateNo) smartCardsDisbursed += 1;

//       const paidDate = a.payment?.paidDate ? String(a.payment.paidDate).slice(0, 10) : null;
//       if (a.payment?.status === "Paid" && paidDate === todayStr) paymentsToday += 1;
//     });

//     const pending = Math.max(totalApplications - approved - rejected, 0);

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [applications]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = applications.filter((a) => a.createdAt && a.createdAt.slice(0, 10) === key).length;
//       counts.push({ label, value });
//     }
//     return counts;
//   }, [applications]);

//   const recentApplications = useMemo(
//     () =>
//       [...applications]
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//         .slice(0, 4),
//     [applications]
//   );

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//       </div>

//       {loading ? (
//         <Card className="flex items-center justify-center gap-2 py-16 text-sm text-ink-400">
//           <FiLoader className="animate-spin" size={16} />
//           Loading dashboard...
//         </Card>
//       ) : error ? (
//         <Card className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-danger-500">
//           <FiAlertCircle size={16} />
//           {error}
//         </Card>
//       ) : (
//         <>
//           {/* KPI cards */}
//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//             <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//             <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//             <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//             <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//             <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//             <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//           </div>

//           {/* Overview row */}
//           <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_1fr]">
//             <Card>
//               <div className="mb-4 flex items-center justify-between">
//                 <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//                 <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//                   Last 6 Days
//                 </span>
//               </div>
//               <ApplicationTrendChart points={trendPoints} />
//             </Card>

//             <Card padded={false} className="overflow-hidden">
//               <div className="flex items-center justify-between border-b border-ink-100 p-5">
//                 <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//                 <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//                   View All
//                 </Link>
//               </div>
//               <div className="divide-y divide-ink-50">
//                 {recentApplications.map((a) => (
//                   <Link
//                     key={a._id || a.applicationNo}
//                     to={`/vendors/profile/${a.applicationNo}`}
//                     className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//                   >
//                     <Avatar src={a.documents?.photo || undefined} name={a.personal?.fullName} size={36} />
//                     <div className="min-w-0 flex-1">
//                       <p className="truncate text-[13px] font-semibold text-ink-900">{a.personal?.fullName}</p>
//                       <p className="truncate text-xs text-ink-500">{a.business?.businessType}</p>
//                     </div>
//                     <div className="shrink-0 text-right">
//                       <StatusChip status={displayStatus(a.status)} />
//                       <p className="mt-1 text-[10px] text-ink-400">{timeAgo(a.createdAt)}</p>
//                     </div>
//                   </Link>
//                 ))}
//                 {recentApplications.length === 0 && (
//                   <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//                 )}
//               </div>
//             </Card>
//           </div>

//           {/* Quick Actions + Banner */}
//           <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
//             <Card>
//               <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//               <div className="grid grid-cols-3 gap-3">
//                 {QUICK_ACTIONS.map((a) => {
//                   const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//                   return (
//                     <Link
//                       key={a.label}
//                       to={a.to}
//                       className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                     >
//                       <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                         <a.icon size={18} />
//                       </div>
//                       <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </Card>

//             <Card
//               padded={false}
//               className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//             >
//               <img
//                 src={vendorgadi}
//                 alt="Street vendor with cart"
//                 className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//               />
//               <div
//                 aria-hidden="true"
//                 className="absolute inset-0"
//                 style={{
//                   background:
//                     "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//                 }}
//               />
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//               />
//               <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//                 <FiShield size={11} className="text-[#E9CE8B]" />
//                 VVCMC Initiative
//               </span>
//               <div className="relative z-10 p-5 pt-3">
//                 <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//                 <p className="mt-1.5 text-[12.5px] text-white/85">
//                   Building stronger communities through transparent &amp; efficient management.
//                 </p>
//               </div>
//             </Card>
//           </div>

//           {/* Footer stats bar */}
//           <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//             <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//             <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//             <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//             <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//             <div className="flex items-center gap-2.5">
//               <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//               <div>
//                 <p className="text-[11px] text-ink-400">System Status</p>
//                 <p className="text-sm font-semibold text-ink-900">Healthy</p>
//               </div>
//             </div>
//             <FooterStat
//               icon={FiClock}
//               label="Last Backup"
//               value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//             />
//           </Card>
//         </>
//       )}
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }


// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';
// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessCategory}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>
//         {/* ***** */}

//         {/* <Card
//           padded={false}
          
//         >
        
//           <img src={vendorgadi} alt="" className="relative z-0 mt-auto w-full opacity-90" />
//         </Card> */}
//         <Card
//   padded={false}
//   className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
// >
//   {/* Background image, fills the whole card */}
//   <img
//     src={vendorgadi}
//     alt="Street vendor with cart"
//     className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//   />

//   {/* Gradient overlay for legible text */}
//   <div
//     aria-hidden="true"
//     className="absolute inset-0"
//     style={{
//       background:
//         "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//     }}
//   />

//   {/* Decorative gold ring accent */}
//   <div
//     aria-hidden="true"
//     className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//   />

//   {/* Badge */}
//   <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//     <FiShield size={11} className="text-[#E9CE8B]" />
//     VVCMC Initiative
//   </span>

//   {/* Text */}
//   <div className="relative z-10 p-5 pt-3">
//     <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//     <p className="mt-1.5 text-[12.5px] text-white/85">
//       Building stronger communities through transparent &amp; efficient management.
//     </p>
//   </div>
// </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }
























// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessCategory}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }












// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
//   FiCheckCircle,
//   FiXCircle,
//   FiTrendingUp,
//   FiDollarSign,
//   FiRefreshCw,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// function formatCurrency(n) {
//   return `₹${Number(n || 0).toLocaleString("en-IN")}`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// // Ward-wise revenue - horizontal gradient bars, sorted highest first.
// function WardRevenueChart({ data }) {
//   const max = Math.max(...data.map((d) => d.amount), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No successful payments yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.ward} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.ward}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.amount / max) * 100, 3)}%`,
//                 background: "linear-gradient(90deg, #16C47F 0%, #0EA5A8 100%)",
//               }}
//             />
//           </div>
//           <span className="w-24 shrink-0 text-right text-xs font-bold text-ink-900">
//             {formatCurrency(d.amount)}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Generic horizontal count bar chart (used for ward-wise renewals).
// function CountBarChart({ data, gradientFrom = "#0EA5A8", gradientTo = "#16C47F" }) {
//   const max = Math.max(...data.map((d) => d.count), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No data yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.label} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.label}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.count / max) * 100, 4)}%`,
//                 background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
//               }}
//             />
//           </div>
//           <span className="w-10 shrink-0 text-right text-xs font-bold text-ink-900">{d.count}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Semi-circle gauge for payment success rate.
// function SuccessGauge({ pct, label = "Payment Success Rate" }) {
//   const size = 200;
//   const cx = size / 2;
//   const cy = size / 2 + 10;
//   const r = 76;
//   const thickness = 18;
//   const circumference = Math.PI * r; // half circle length
//   const filled = (Math.min(Math.max(pct, 0), 100) / 100) * circumference;
//   const color = pct >= 75 ? "#16C47F" : pct >= 45 ? "#F59E0B" : "#EF4444";

//   return (
//     <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`}>
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke="#EEF2F1"
//         strokeWidth={thickness}
//         strokeLinecap="round"
//       />
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke={color}
//         strokeWidth={thickness}
//         strokeLinecap="round"
//         strokeDasharray={`${filled} ${circumference}`}
//       />
//       <text x={cx} y={cy - 6} textAnchor="middle" fontSize="28" fontWeight="800" fill="#0F172A">
//         {pct}%
//       </text>
//       <text x={cx} y={cy + 16} textAnchor="middle" fontSize="11" fill="#94A3B8">
//         {label}
//       </text>
//     </svg>
//   );
// }

// const ZONE_PALETTE = ["#16C47F", "#0EA5A8", "#F59E0B", "#3B82F6", "#8B5CF6", "#EF4444", "#EC4899", "#14B8A6"];

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );


// const revenue = useMemo(() => {
//     const vendorById = new Map(vendors.map((v) => [v.id, v]));
//     const byWard = {};
//     const byZone = {};
//     let totalRevenue = 0;
//     let successCount = 0;
//     let failedCount = 0;
//     let pendingCount = 0;

//     applications.forEach((a) => {
//       const amount = Number(a.amount ?? a.paymentAmount ?? 0);
//       const rawStatus = (a.paymentStatus ?? a.status ?? "").toString().toLowerCase();
//       const vendor = vendorById.get(a.vendorId);
//       const ward = vendor?.address?.ward || "Unassigned";
//       const zone = vendor?.address?.zone || "Unassigned";

//       if (rawStatus === "success" || rawStatus === "paid" || rawStatus === "completed") {
//         successCount += 1;
//         totalRevenue += amount;
//         byWard[ward] = (byWard[ward] || 0) + amount;
//         byZone[zone] = (byZone[zone] || 0) + amount;
//       } else if (rawStatus === "failed") {
//         failedCount += 1;
//       } else if (rawStatus) {
//         pendingCount += 1;
//       }
//     });

//     let wardData = Object.entries(byWard)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([ward, amount]) => ({ ward, amount }));

//     let zoneData = Object.entries(byZone)
//       .sort((a, b) => b[1] - a[1])
//       .map(([zone, amount], i) => ({ label: zone, value: amount, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once amount/paymentStatus fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((ward, i) => ({
//         ward,
//         amount: [42000, 35500, 28000, 21000, 15500, 9800][i] ?? 5000,
//       }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [58000, 41000, 27000, 18500, 11000][i] ?? 5000,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }

//     let displayTotalRevenue = totalRevenue;
//     let displaySuccessCount = successCount;
//     let displayFailedCount = failedCount;
//     let displayPendingCount = pendingCount;

//     if (usingFallback && totalRevenue === 0 && successCount === 0 && failedCount === 0 && pendingCount === 0) {
//       displayTotalRevenue = wardData.reduce((sum, w) => sum + w.amount, 0);
//       displaySuccessCount = 34;
//       displayFailedCount = 6;
//       displayPendingCount = 4;
//     }
//     // --- END FALLBACK ---

//     const totalPayments = displaySuccessCount + displayFailedCount + displayPendingCount;
//     const successRate = totalPayments ? Math.round((displaySuccessCount / totalPayments) * 100) : 0;

//     return {
//       totalRevenue: displayTotalRevenue,
//       successCount: displaySuccessCount,
//       failedCount: displayFailedCount,
//       pendingCount: displayPendingCount,
//       totalPayments,
//       successRate,
//       wardData,
//       zoneData,
//       usingFallback,
//     };
//   }, [applications, vendors]);


//   const renewals = useMemo(() => {
//     const wardCounts = {};
//     const zoneCounts = {};
//     let renewedCount = 0;
//     let paidCount = 0;
//     let unpaidCount = 0;

//     vendors.forEach((v) => {
//       const isRenewed = v.renewalStatus === "Renewed" || v.isRenewed === true;
//       if (!isRenewed) return;
//       renewedCount += 1;
//       const ward = v.address?.ward || "Unassigned";
//       const zone = v.address?.zone || "Unassigned";
//       wardCounts[ward] = (wardCounts[ward] || 0) + 1;
//       zoneCounts[zone] = (zoneCounts[zone] || 0) + 1;
//       if (v.renewalPaid) paidCount += 1;
//       else unpaidCount += 1;
//     });

//     const notRenewedCount = Math.max(vendors.length - renewedCount, 0);

//     let wardData = Object.entries(wardCounts)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([label, count]) => ({ label, count }));

//     let zoneData = Object.entries(zoneCounts)
//       .sort((a, b) => b[1] - a[1])
//       .map(([label, value], i) => ({ label, value, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once real renewal fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((label, i) => ({ label, count: [6, 5, 4, 3, 2, 1][i] ?? 1 }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [8, 6, 4, 3, 2][i] ?? 1,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }
//     const paymentTotal = paidCount + unpaidCount;
//     const paymentSegments =
//       paymentTotal > 0
//         ? [
//             { label: "Paid", value: paidCount, color: "#16C47F" },
//             { label: "Unpaid", value: unpaidCount, color: "#EF4444" },
//           ]
//         : (() => {
//             usingFallback = true;
//             return [
//               { label: "Paid", value: 7, color: "#16C47F" },
//               { label: "Unpaid", value: 3, color: "#EF4444" },
//             ];
//           })();
//     // --- END FALLBACK ---

//     const paymentRate = paymentTotal > 0 ? Math.round((paidCount / paymentTotal) * 100) : 70;

//     return {
//       renewedCount: usingFallback && renewedCount === 0 ? 24 : renewedCount,
//       notRenewedCount: usingFallback && renewedCount === 0 ? Math.max(vendors.length - 24, 0) : notRenewedCount,
//       wardData,
//       zoneData,
//       paymentSegments,
//       paymentRate,
//       usingFallback,
//     };
//   }, [vendors]);

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row — Application Status card removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessCategory}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>
//       </div>

//       {/* ======================= Revenue Analytics ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Revenue Analytics</h2>
//             <p className="text-sm text-ink-500">Payment collections broken down by ward, zone, and outcome.</p>
//           </div>
//           {revenue.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — payment fields not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           <KpiCard icon={FiDollarSign} tone="success" label="Total Revenue" value={formatCurrency(revenue.totalRevenue)} />
//           <KpiCard icon={FiCheckCircle} tone="brand" label="Successful Payments" value={revenue.successCount} />
//           <KpiCard icon={FiXCircle} tone="danger" label="Failed Payments" value={revenue.failedCount} />
//           <KpiCard icon={FiTrendingUp} tone="accent" label="Pending Payments" value={revenue.pendingCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <div className="mb-4 flex items-center justify-between">
//               <h3 className="font-display text-base font-bold text-ink-900">Revenue by Ward</h3>
//               <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//                 Top {revenue.wardData.length || 0}
//               </span>
//             </div>
//             <WardRevenueChart data={revenue.wardData} />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Revenue by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart
//                 segments={revenue.zoneData.map((z) => ({ label: z.label, value: z.value, color: z.color }))}
//                 size={160}
//                 thickness={22}
//               />
//               <div className="w-full space-y-2">
//                 {revenue.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{formatCurrency(z.value)}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <SuccessGauge pct={revenue.successRate} />
//             <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
//               <div>
//                 <p className="text-sm font-bold text-success-500">{revenue.successCount}</p>
//                 <p className="text-[10px] text-ink-400">Success</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-danger-500">{revenue.failedCount}</p>
//                 <p className="text-[10px] text-ink-400">Failed</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-warning-500">{revenue.pendingCount}</p>
//                 <p className="text-[10px] text-ink-400">Pending</p>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* ======================= Vendor Renewals ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Vendor Renewals</h2>
//             <p className="text-sm text-ink-500">
//               Renewed vendors broken down by ward, zone, and renewal payment status.
//             </p>
//           </div>
//           {renewals.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — renewal tracking not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//           <KpiCard icon={FiRefreshCw} tone="success" label="Vendors Renewed" value={renewals.renewedCount} />
//           <KpiCard icon={FiClock} tone="warning" label="Not Yet Renewed" value={renewals.notRenewedCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Ward</h3>
//             <CountBarChart data={renewals.wardData} gradientFrom="#0EA5A8" gradientTo="#16C47F" />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart segments={renewals.zoneData} size={160} thickness={22} />
//               <div className="w-full space-y-2">
//                 {renewals.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{z.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <h3 className="mb-2 self-start font-display text-base font-bold text-ink-900">Renewal Payments</h3>
//             <DonutChart segments={renewals.paymentSegments} size={150} thickness={20} />
//             <div className="mt-4 w-full space-y-2">
//               {renewals.paymentSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* Quick Actions + Banner — Workflow Overview removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }





// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';
// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessType}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>
//         {/* ***** */}

//         {/* <Card
//           padded={false}
          
//         >
        
//           <img src={vendorgadi} alt="" className="relative z-0 mt-auto w-full opacity-90" />
//         </Card> */}
//         <Card
//   padded={false}
//   className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
// >
//   {/* Background image, fills the whole card */}
//   <img
//     src={vendorgadi}
//     alt="Street vendor with cart"
//     className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//   />

//   {/* Gradient overlay for legible text */}
//   <div
//     aria-hidden="true"
//     className="absolute inset-0"
//     style={{
//       background:
//         "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//     }}
//   />

//   {/* Decorative gold ring accent */}
//   <div
//     aria-hidden="true"
//     className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//   />

//   {/* Badge */}
//   <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//     <FiShield size={11} className="text-[#E9CE8B]" />
//     VVCMC Initiative
//   </span>

//   {/* Text */}
//   <div className="relative z-10 p-5 pt-3">
//     <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//     <p className="mt-1.5 text-[12.5px] text-white/85">
//       Building stronger communities through transparent &amp; efficient management.
//     </p>
//   </div>
// </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }
























// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessType}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }












// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
//   FiCheckCircle,
//   FiXCircle,
//   FiTrendingUp,
//   FiDollarSign,
//   FiRefreshCw,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// function formatCurrency(n) {
//   return `₹${Number(n || 0).toLocaleString("en-IN")}`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// // Ward-wise revenue - horizontal gradient bars, sorted highest first.
// function WardRevenueChart({ data }) {
//   const max = Math.max(...data.map((d) => d.amount), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No successful payments yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.ward} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.ward}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.amount / max) * 100, 3)}%`,
//                 background: "linear-gradient(90deg, #16C47F 0%, #0EA5A8 100%)",
//               }}
//             />
//           </div>
//           <span className="w-24 shrink-0 text-right text-xs font-bold text-ink-900">
//             {formatCurrency(d.amount)}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Generic horizontal count bar chart (used for ward-wise renewals).
// function CountBarChart({ data, gradientFrom = "#0EA5A8", gradientTo = "#16C47F" }) {
//   const max = Math.max(...data.map((d) => d.count), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No data yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.label} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.label}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.count / max) * 100, 4)}%`,
//                 background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
//               }}
//             />
//           </div>
//           <span className="w-10 shrink-0 text-right text-xs font-bold text-ink-900">{d.count}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Semi-circle gauge for payment success rate.
// function SuccessGauge({ pct, label = "Payment Success Rate" }) {
//   const size = 200;
//   const cx = size / 2;
//   const cy = size / 2 + 10;
//   const r = 76;
//   const thickness = 18;
//   const circumference = Math.PI * r; // half circle length
//   const filled = (Math.min(Math.max(pct, 0), 100) / 100) * circumference;
//   const color = pct >= 75 ? "#16C47F" : pct >= 45 ? "#F59E0B" : "#EF4444";

//   return (
//     <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`}>
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke="#EEF2F1"
//         strokeWidth={thickness}
//         strokeLinecap="round"
//       />
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke={color}
//         strokeWidth={thickness}
//         strokeLinecap="round"
//         strokeDasharray={`${filled} ${circumference}`}
//       />
//       <text x={cx} y={cy - 6} textAnchor="middle" fontSize="28" fontWeight="800" fill="#0F172A">
//         {pct}%
//       </text>
//       <text x={cx} y={cy + 16} textAnchor="middle" fontSize="11" fill="#94A3B8">
//         {label}
//       </text>
//     </svg>
//   );
// }

// const ZONE_PALETTE = ["#16C47F", "#0EA5A8", "#F59E0B", "#3B82F6", "#8B5CF6", "#EF4444", "#EC4899", "#14B8A6"];

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );


// const revenue = useMemo(() => {
//     const vendorById = new Map(vendors.map((v) => [v.id, v]));
//     const byWard = {};
//     const byZone = {};
//     let totalRevenue = 0;
//     let successCount = 0;
//     let failedCount = 0;
//     let pendingCount = 0;

//     applications.forEach((a) => {
//       const amount = Number(a.amount ?? a.paymentAmount ?? 0);
//       const rawStatus = (a.paymentStatus ?? a.status ?? "").toString().toLowerCase();
//       const vendor = vendorById.get(a.vendorId);
//       const ward = vendor?.address?.ward || "Unassigned";
//       const zone = vendor?.address?.zone || "Unassigned";

//       if (rawStatus === "success" || rawStatus === "paid" || rawStatus === "completed") {
//         successCount += 1;
//         totalRevenue += amount;
//         byWard[ward] = (byWard[ward] || 0) + amount;
//         byZone[zone] = (byZone[zone] || 0) + amount;
//       } else if (rawStatus === "failed") {
//         failedCount += 1;
//       } else if (rawStatus) {
//         pendingCount += 1;
//       }
//     });

//     let wardData = Object.entries(byWard)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([ward, amount]) => ({ ward, amount }));

//     let zoneData = Object.entries(byZone)
//       .sort((a, b) => b[1] - a[1])
//       .map(([zone, amount], i) => ({ label: zone, value: amount, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once amount/paymentStatus fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((ward, i) => ({
//         ward,
//         amount: [42000, 35500, 28000, 21000, 15500, 9800][i] ?? 5000,
//       }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [58000, 41000, 27000, 18500, 11000][i] ?? 5000,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }

//     let displayTotalRevenue = totalRevenue;
//     let displaySuccessCount = successCount;
//     let displayFailedCount = failedCount;
//     let displayPendingCount = pendingCount;

//     if (usingFallback && totalRevenue === 0 && successCount === 0 && failedCount === 0 && pendingCount === 0) {
//       displayTotalRevenue = wardData.reduce((sum, w) => sum + w.amount, 0);
//       displaySuccessCount = 34;
//       displayFailedCount = 6;
//       displayPendingCount = 4;
//     }
//     // --- END FALLBACK ---

//     const totalPayments = displaySuccessCount + displayFailedCount + displayPendingCount;
//     const successRate = totalPayments ? Math.round((displaySuccessCount / totalPayments) * 100) : 0;

//     return {
//       totalRevenue: displayTotalRevenue,
//       successCount: displaySuccessCount,
//       failedCount: displayFailedCount,
//       pendingCount: displayPendingCount,
//       totalPayments,
//       successRate,
//       wardData,
//       zoneData,
//       usingFallback,
//     };
//   }, [applications, vendors]);


//   const renewals = useMemo(() => {
//     const wardCounts = {};
//     const zoneCounts = {};
//     let renewedCount = 0;
//     let paidCount = 0;
//     let unpaidCount = 0;

//     vendors.forEach((v) => {
//       const isRenewed = v.renewalStatus === "Renewed" || v.isRenewed === true;
//       if (!isRenewed) return;
//       renewedCount += 1;
//       const ward = v.address?.ward || "Unassigned";
//       const zone = v.address?.zone || "Unassigned";
//       wardCounts[ward] = (wardCounts[ward] || 0) + 1;
//       zoneCounts[zone] = (zoneCounts[zone] || 0) + 1;
//       if (v.renewalPaid) paidCount += 1;
//       else unpaidCount += 1;
//     });

//     const notRenewedCount = Math.max(vendors.length - renewedCount, 0);

//     let wardData = Object.entries(wardCounts)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([label, count]) => ({ label, count }));

//     let zoneData = Object.entries(zoneCounts)
//       .sort((a, b) => b[1] - a[1])
//       .map(([label, value], i) => ({ label, value, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once real renewal fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((label, i) => ({ label, count: [6, 5, 4, 3, 2, 1][i] ?? 1 }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [8, 6, 4, 3, 2][i] ?? 1,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }
//     const paymentTotal = paidCount + unpaidCount;
//     const paymentSegments =
//       paymentTotal > 0
//         ? [
//             { label: "Paid", value: paidCount, color: "#16C47F" },
//             { label: "Unpaid", value: unpaidCount, color: "#EF4444" },
//           ]
//         : (() => {
//             usingFallback = true;
//             return [
//               { label: "Paid", value: 7, color: "#16C47F" },
//               { label: "Unpaid", value: 3, color: "#EF4444" },
//             ];
//           })();
//     // --- END FALLBACK ---

//     const paymentRate = paymentTotal > 0 ? Math.round((paidCount / paymentTotal) * 100) : 70;

//     return {
//       renewedCount: usingFallback && renewedCount === 0 ? 24 : renewedCount,
//       notRenewedCount: usingFallback && renewedCount === 0 ? Math.max(vendors.length - 24, 0) : notRenewedCount,
//       wardData,
//       zoneData,
//       paymentSegments,
//       paymentRate,
//       usingFallback,
//     };
//   }, [vendors]);

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row — Application Status card removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessType}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>
//       </div>

//       {/* ======================= Revenue Analytics ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Revenue Analytics</h2>
//             <p className="text-sm text-ink-500">Payment collections broken down by ward, zone, and outcome.</p>
//           </div>
//           {revenue.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — payment fields not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           <KpiCard icon={FiDollarSign} tone="success" label="Total Revenue" value={formatCurrency(revenue.totalRevenue)} />
//           <KpiCard icon={FiCheckCircle} tone="brand" label="Successful Payments" value={revenue.successCount} />
//           <KpiCard icon={FiXCircle} tone="danger" label="Failed Payments" value={revenue.failedCount} />
//           <KpiCard icon={FiTrendingUp} tone="accent" label="Pending Payments" value={revenue.pendingCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <div className="mb-4 flex items-center justify-between">
//               <h3 className="font-display text-base font-bold text-ink-900">Revenue by Ward</h3>
//               <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//                 Top {revenue.wardData.length || 0}
//               </span>
//             </div>
//             <WardRevenueChart data={revenue.wardData} />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Revenue by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart
//                 segments={revenue.zoneData.map((z) => ({ label: z.label, value: z.value, color: z.color }))}
//                 size={160}
//                 thickness={22}
//               />
//               <div className="w-full space-y-2">
//                 {revenue.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{formatCurrency(z.value)}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <SuccessGauge pct={revenue.successRate} />
//             <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
//               <div>
//                 <p className="text-sm font-bold text-success-500">{revenue.successCount}</p>
//                 <p className="text-[10px] text-ink-400">Success</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-danger-500">{revenue.failedCount}</p>
//                 <p className="text-[10px] text-ink-400">Failed</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-warning-500">{revenue.pendingCount}</p>
//                 <p className="text-[10px] text-ink-400">Pending</p>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* ======================= Vendor Renewals ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Vendor Renewals</h2>
//             <p className="text-sm text-ink-500">
//               Renewed vendors broken down by ward, zone, and renewal payment status.
//             </p>
//           </div>
//           {renewals.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — renewal tracking not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//           <KpiCard icon={FiRefreshCw} tone="success" label="Vendors Renewed" value={renewals.renewedCount} />
//           <KpiCard icon={FiClock} tone="warning" label="Not Yet Renewed" value={renewals.notRenewedCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Ward</h3>
//             <CountBarChart data={renewals.wardData} gradientFrom="#0EA5A8" gradientTo="#16C47F" />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart segments={renewals.zoneData} size={160} thickness={22} />
//               <div className="w-full space-y-2">
//                 {renewals.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{z.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <h3 className="mb-2 self-start font-display text-base font-bold text-ink-900">Renewal Payments</h3>
//             <DonutChart segments={renewals.paymentSegments} size={150} thickness={20} />
//             <div className="mt-4 w-full space-y-2">
//               {renewals.paymentSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* Quick Actions + Banner — Workflow Overview removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }


// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';
// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessCategory}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>
//         {/* ***** */}

//         {/* <Card
//           padded={false}
          
//         >
        
//           <img src={vendorgadi} alt="" className="relative z-0 mt-auto w-full opacity-90" />
//         </Card> */}
//         <Card
//   padded={false}
//   className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
// >
//   {/* Background image, fills the whole card */}
//   <img
//     src={vendorgadi}
//     alt="Street vendor with cart"
//     className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//   />

//   {/* Gradient overlay for legible text */}
//   <div
//     aria-hidden="true"
//     className="absolute inset-0"
//     style={{
//       background:
//         "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//     }}
//   />

//   {/* Decorative gold ring accent */}
//   <div
//     aria-hidden="true"
//     className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//   />

//   {/* Badge */}
//   <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//     <FiShield size={11} className="text-[#E9CE8B]" />
//     VVCMC Initiative
//   </span>

//   {/* Text */}
//   <div className="relative z-10 p-5 pt-3">
//     <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//     <p className="mt-1.5 text-[12.5px] text-white/85">
//       Building stronger communities through transparent &amp; efficient management.
//     </p>
//   </div>
// </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }
























// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessCategory}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }












// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
//   FiCheckCircle,
//   FiXCircle,
//   FiTrendingUp,
//   FiDollarSign,
//   FiRefreshCw,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// function formatCurrency(n) {
//   return `₹${Number(n || 0).toLocaleString("en-IN")}`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// // Ward-wise revenue - horizontal gradient bars, sorted highest first.
// function WardRevenueChart({ data }) {
//   const max = Math.max(...data.map((d) => d.amount), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No successful payments yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.ward} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.ward}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.amount / max) * 100, 3)}%`,
//                 background: "linear-gradient(90deg, #16C47F 0%, #0EA5A8 100%)",
//               }}
//             />
//           </div>
//           <span className="w-24 shrink-0 text-right text-xs font-bold text-ink-900">
//             {formatCurrency(d.amount)}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Generic horizontal count bar chart (used for ward-wise renewals).
// function CountBarChart({ data, gradientFrom = "#0EA5A8", gradientTo = "#16C47F" }) {
//   const max = Math.max(...data.map((d) => d.count), 1);
//   if (data.length === 0) {
//     return <p className="py-8 text-center text-sm text-ink-400">No data yet.</p>;
//   }
//   return (
//     <div className="space-y-3">
//       {data.map((d) => (
//         <div key={d.label} className="flex items-center gap-3">
//           <span className="w-20 shrink-0 truncate text-xs font-semibold text-ink-600">{d.label}</span>
//           <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink-100">
//             <div
//               className="h-full rounded-full transition-all"
//               style={{
//                 width: `${Math.max((d.count / max) * 100, 4)}%`,
//                 background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
//               }}
//             />
//           </div>
//           <span className="w-10 shrink-0 text-right text-xs font-bold text-ink-900">{d.count}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Semi-circle gauge for payment success rate.
// function SuccessGauge({ pct, label = "Payment Success Rate" }) {
//   const size = 200;
//   const cx = size / 2;
//   const cy = size / 2 + 10;
//   const r = 76;
//   const thickness = 18;
//   const circumference = Math.PI * r; // half circle length
//   const filled = (Math.min(Math.max(pct, 0), 100) / 100) * circumference;
//   const color = pct >= 75 ? "#16C47F" : pct >= 45 ? "#F59E0B" : "#EF4444";

//   return (
//     <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`}>
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke="#EEF2F1"
//         strokeWidth={thickness}
//         strokeLinecap="round"
//       />
//       <path
//         d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
//         fill="none"
//         stroke={color}
//         strokeWidth={thickness}
//         strokeLinecap="round"
//         strokeDasharray={`${filled} ${circumference}`}
//       />
//       <text x={cx} y={cy - 6} textAnchor="middle" fontSize="28" fontWeight="800" fill="#0F172A">
//         {pct}%
//       </text>
//       <text x={cx} y={cy + 16} textAnchor="middle" fontSize="11" fill="#94A3B8">
//         {label}
//       </text>
//     </svg>
//   );
// }

// const ZONE_PALETTE = ["#16C47F", "#0EA5A8", "#F59E0B", "#3B82F6", "#8B5CF6", "#EF4444", "#EC4899", "#14B8A6"];

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );


// const revenue = useMemo(() => {
//     const vendorById = new Map(vendors.map((v) => [v.id, v]));
//     const byWard = {};
//     const byZone = {};
//     let totalRevenue = 0;
//     let successCount = 0;
//     let failedCount = 0;
//     let pendingCount = 0;

//     applications.forEach((a) => {
//       const amount = Number(a.amount ?? a.paymentAmount ?? 0);
//       const rawStatus = (a.paymentStatus ?? a.status ?? "").toString().toLowerCase();
//       const vendor = vendorById.get(a.vendorId);
//       const ward = vendor?.address?.ward || "Unassigned";
//       const zone = vendor?.address?.zone || "Unassigned";

//       if (rawStatus === "success" || rawStatus === "paid" || rawStatus === "completed") {
//         successCount += 1;
//         totalRevenue += amount;
//         byWard[ward] = (byWard[ward] || 0) + amount;
//         byZone[zone] = (byZone[zone] || 0) + amount;
//       } else if (rawStatus === "failed") {
//         failedCount += 1;
//       } else if (rawStatus) {
//         pendingCount += 1;
//       }
//     });

//     let wardData = Object.entries(byWard)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([ward, amount]) => ({ ward, amount }));

//     let zoneData = Object.entries(byZone)
//       .sort((a, b) => b[1] - a[1])
//       .map(([zone, amount], i) => ({ label: zone, value: amount, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once amount/paymentStatus fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((ward, i) => ({
//         ward,
//         amount: [42000, 35500, 28000, 21000, 15500, 9800][i] ?? 5000,
//       }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [58000, 41000, 27000, 18500, 11000][i] ?? 5000,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }

//     let displayTotalRevenue = totalRevenue;
//     let displaySuccessCount = successCount;
//     let displayFailedCount = failedCount;
//     let displayPendingCount = pendingCount;

//     if (usingFallback && totalRevenue === 0 && successCount === 0 && failedCount === 0 && pendingCount === 0) {
//       displayTotalRevenue = wardData.reduce((sum, w) => sum + w.amount, 0);
//       displaySuccessCount = 34;
//       displayFailedCount = 6;
//       displayPendingCount = 4;
//     }
//     // --- END FALLBACK ---

//     const totalPayments = displaySuccessCount + displayFailedCount + displayPendingCount;
//     const successRate = totalPayments ? Math.round((displaySuccessCount / totalPayments) * 100) : 0;

//     return {
//       totalRevenue: displayTotalRevenue,
//       successCount: displaySuccessCount,
//       failedCount: displayFailedCount,
//       pendingCount: displayPendingCount,
//       totalPayments,
//       successRate,
//       wardData,
//       zoneData,
//       usingFallback,
//     };
//   }, [applications, vendors]);


//   const renewals = useMemo(() => {
//     const wardCounts = {};
//     const zoneCounts = {};
//     let renewedCount = 0;
//     let paidCount = 0;
//     let unpaidCount = 0;

//     vendors.forEach((v) => {
//       const isRenewed = v.renewalStatus === "Renewed" || v.isRenewed === true;
//       if (!isRenewed) return;
//       renewedCount += 1;
//       const ward = v.address?.ward || "Unassigned";
//       const zone = v.address?.zone || "Unassigned";
//       wardCounts[ward] = (wardCounts[ward] || 0) + 1;
//       zoneCounts[zone] = (zoneCounts[zone] || 0) + 1;
//       if (v.renewalPaid) paidCount += 1;
//       else unpaidCount += 1;
//     });

//     const notRenewedCount = Math.max(vendors.length - renewedCount, 0);

//     let wardData = Object.entries(wardCounts)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 8)
//       .map(([label, count]) => ({ label, count }));

//     let zoneData = Object.entries(zoneCounts)
//       .sort((a, b) => b[1] - a[1])
//       .map(([label, value], i) => ({ label, value, color: ZONE_PALETTE[i % ZONE_PALETTE.length] }));

//     let usingFallback = false;

//     // --- FALLBACK DEMO DATA (remove once real renewal fields exist) ---
//     if (wardData.length === 0) {
//       usingFallback = true;
//       wardData = WARD_OPTIONS.slice(0, 6).map((label, i) => ({ label, count: [6, 5, 4, 3, 2, 1][i] ?? 1 }));
//     }
//     if (zoneData.length === 0) {
//       usingFallback = true;
//       zoneData = ZONE_OPTIONS.slice(0, 5).map((label, i) => ({
//         label,
//         value: [8, 6, 4, 3, 2][i] ?? 1,
//         color: ZONE_PALETTE[i % ZONE_PALETTE.length],
//       }));
//     }
//     const paymentTotal = paidCount + unpaidCount;
//     const paymentSegments =
//       paymentTotal > 0
//         ? [
//             { label: "Paid", value: paidCount, color: "#16C47F" },
//             { label: "Unpaid", value: unpaidCount, color: "#EF4444" },
//           ]
//         : (() => {
//             usingFallback = true;
//             return [
//               { label: "Paid", value: 7, color: "#16C47F" },
//               { label: "Unpaid", value: 3, color: "#EF4444" },
//             ];
//           })();
//     // --- END FALLBACK ---

//     const paymentRate = paymentTotal > 0 ? Math.round((paidCount / paymentTotal) * 100) : 70;

//     return {
//       renewedCount: usingFallback && renewedCount === 0 ? 24 : renewedCount,
//       notRenewedCount: usingFallback && renewedCount === 0 ? Math.max(vendors.length - 24, 0) : notRenewedCount,
//       wardData,
//       zoneData,
//       paymentSegments,
//       paymentRate,
//       usingFallback,
//     };
//   }, [vendors]);

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row — Application Status card removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessCategory}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>
//       </div>

//       {/* ======================= Revenue Analytics ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Revenue Analytics</h2>
//             <p className="text-sm text-ink-500">Payment collections broken down by ward, zone, and outcome.</p>
//           </div>
//           {revenue.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — payment fields not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           <KpiCard icon={FiDollarSign} tone="success" label="Total Revenue" value={formatCurrency(revenue.totalRevenue)} />
//           <KpiCard icon={FiCheckCircle} tone="brand" label="Successful Payments" value={revenue.successCount} />
//           <KpiCard icon={FiXCircle} tone="danger" label="Failed Payments" value={revenue.failedCount} />
//           <KpiCard icon={FiTrendingUp} tone="accent" label="Pending Payments" value={revenue.pendingCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <div className="mb-4 flex items-center justify-between">
//               <h3 className="font-display text-base font-bold text-ink-900">Revenue by Ward</h3>
//               <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//                 Top {revenue.wardData.length || 0}
//               </span>
//             </div>
//             <WardRevenueChart data={revenue.wardData} />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Revenue by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart
//                 segments={revenue.zoneData.map((z) => ({ label: z.label, value: z.value, color: z.color }))}
//                 size={160}
//                 thickness={22}
//               />
//               <div className="w-full space-y-2">
//                 {revenue.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{formatCurrency(z.value)}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <SuccessGauge pct={revenue.successRate} />
//             <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
//               <div>
//                 <p className="text-sm font-bold text-success-500">{revenue.successCount}</p>
//                 <p className="text-[10px] text-ink-400">Success</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-danger-500">{revenue.failedCount}</p>
//                 <p className="text-[10px] text-ink-400">Failed</p>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-warning-500">{revenue.pendingCount}</p>
//                 <p className="text-[10px] text-ink-400">Pending</p>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* ======================= Vendor Renewals ======================= */}
//       <div>
//         <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-display text-lg font-bold text-ink-900">Vendor Renewals</h2>
//             <p className="text-sm text-ink-500">
//               Renewed vendors broken down by ward, zone, and renewal payment status.
//             </p>
//           </div>
//           {renewals.usingFallback && (
//             <span className="w-fit rounded-full bg-warning-100 px-3 py-1 text-[11px] font-semibold text-warning-600">
//               Demo data — renewal tracking not yet connected
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//           <KpiCard icon={FiRefreshCw} tone="success" label="Vendors Renewed" value={renewals.renewedCount} />
//           <KpiCard icon={FiClock} tone="warning" label="Not Yet Renewed" value={renewals.notRenewedCount} />
//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-[1.3fr_1fr_1fr]">
//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Ward</h3>
//             <CountBarChart data={renewals.wardData} gradientFrom="#0EA5A8" gradientTo="#16C47F" />
//           </Card>

//           <Card>
//             <h3 className="mb-4 font-display text-base font-bold text-ink-900">Renewals by Zone</h3>
//             <div className="flex flex-col items-center gap-4">
//               <DonutChart segments={renewals.zoneData} size={160} thickness={22} />
//               <div className="w-full space-y-2">
//                 {renewals.zoneData.map((z) => (
//                   <div key={z.label} className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-2 text-ink-600">
//                       <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
//                       {z.label}
//                     </span>
//                     <span className="font-semibold text-ink-800">{z.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           <Card className="flex flex-col items-center justify-center">
//             <h3 className="mb-2 self-start font-display text-base font-bold text-ink-900">Renewal Payments</h3>
//             <DonutChart segments={renewals.paymentSegments} size={150} thickness={20} />
//             <div className="mt-4 w-full space-y-2">
//               {renewals.paymentSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* Quick Actions + Banner — Workflow Overview removed */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }





// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';
// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessType}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>
//         {/* ***** */}

//         {/* <Card
//           padded={false}
          
//         >
        
//           <img src={vendorgadi} alt="" className="relative z-0 mt-auto w-full opacity-90" />
//         </Card> */}
//         <Card
//   padded={false}
//   className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
// >
//   {/* Background image, fills the whole card */}
//   <img
//     src={vendorgadi}
//     alt="Street vendor with cart"
//     className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//   />

//   {/* Gradient overlay for legible text */}
//   <div
//     aria-hidden="true"
//     className="absolute inset-0"
//     style={{
//       background:
//         "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//     }}
//   />

//   {/* Decorative gold ring accent */}
//   <div
//     aria-hidden="true"
//     className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//   />

//   {/* Badge */}
//   <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//     <FiShield size={11} className="text-[#E9CE8B]" />
//     VVCMC Initiative
//   </span>

//   {/* Text */}
//   <div className="relative z-10 p-5 pt-3">
//     <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//     <p className="mt-1.5 text-[12.5px] text-white/85">
//       Building stronger communities through transparent &amp; efficient management.
//     </p>
//   </div>
// </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }
























// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   FiDownload,
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllApplications } from "../../../features/applications/applicationsSlice";
// import { selectAllCertificates } from "../../../features/certificates/certificatesSlice";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import heroArt from "../../../assets/hero.png";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // Small hand-rolled SVG donut chart.
// function DonutChart({ segments, size = 180, thickness = 26 }) {
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   const radius = (size - thickness) / 2;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
//         {segments.map((s, i) => {
//           const value = s.value / total;
//           const dash = value * circumference;
//           const circle = (
//             <circle
//               key={i}
//               cx={size / 2}
//               cy={size / 2}
//               r={radius}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={thickness}
//               strokeDasharray={`${dash} ${circumference - dash}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="butt"
//             />
//           );
//           offset += dash;
//           return circle;
//         })}
//       </g>
//       <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A">
//         {total}
//       </text>
//       <text x="50%" y="60%" textAnchor="middle" fontSize="11" fill="#94A3B8">
//         Total
//       </text>
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();
//   const vendors = useSelector(selectAllVendors);
//   const applications = useSelector(selectAllApplications);
//   const certificates = useSelector(selectAllCertificates);

//   const stats = useMemo(() => {
//     const totalApplications = vendors.length;
//     const approved = vendors.filter((v) => v.status === "Approved").length;
//     const rejected = vendors.filter((v) => v.status === "Rejected").length;
//     const pending = vendors.filter((v) => v.status !== "Approved" && v.status !== "Rejected").length;

//     const todayStr = new Date().toISOString().slice(0, 10);
//     const paymentsToday = applications
//       .filter((a) => a.paidAt && a.paidAt.slice(0, 10) === todayStr)
//       .length;

//     const smartCardsDisbursed = certificates.length;

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [vendors, applications, certificates]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = vendors.filter((v) => v.registrationDate === key).length;
//       counts.push({ label, value });
//     }
//     // Ensure the chart never looks completely flat on a fresh dummy dataset.
//     if (counts.every((c) => c.value === 0)) {
//       return counts.map((c, i) => ({ ...c, value: [1, 2, 1, 3, 2, 3][i] ?? 1 }));
//     }
//     return counts;
//   }, [vendors]);

//   const recentVendors = useMemo(
//     () =>
//       [...vendors]
//         .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
//         .slice(0, 4),
//     [vendors]
//   );

//   const statusSegments = useMemo(() => {
//     const pendingSurvey = vendors.filter((v) => v.status === "Pending Survey").length;
//     const underReview = vendors.filter(
//       (v) => v.status === "Pending" || v.status === "Pending" || v.status === "Sent Back"
//     ).length;
//     return [
//       { label: "Pending", value: pendingSurvey, color: "#F59E0B" },
//       { label: "Under Review", value: underReview, color: "#3B82F6" },
//       { label: "Approved", value: stats.approved, color: "#16C47F" },
//       { label: "Rejected", value: stats.rejected, color: "#EF4444" },
//     ];
//   }, [vendors, stats.approved, stats.rejected]);

//   const workflowSteps = useMemo(() => {
//     const applied = vendors.length;
//     const fieldInspection = vendors.filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//       .length;
//     const counterReview = vendors.filter((v) => v.status === "Pending Approval").length;
//     const approved = stats.approved;
//     return [
//       { label: "Applied", value: applied, icon: FiShield, tone: "brand" },
//       { label: "Field Inspection", value: fieldInspection, icon: FiMapPin, tone: "warning" },
//       { label: "Counter Review", value: counterReview, icon: FiUsers, tone: "accent" },
//       { label: "Approved", value: approved, icon: FiAward, tone: "success" },
//     ];
//   }, [vendors, stats.approved]);

//   const progressPct = vendors.length
//     ? Math.round((stats.approved / vendors.length) * 100)
//     : 0;

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//         <Button icon={FiDownload} onClick={() => window.print()}>
//           Export Report
//         </Button>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//         <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//         <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//         <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//         <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} />
//         <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//       </div>

//       {/* Overview row */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.4fr_1.1fr_1fr]">
//         <Card>
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//             <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//               Last 6 Days
//             </span>
//           </div>
//           <ApplicationTrendChart points={trendPoints} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center justify-between border-b border-ink-100 p-5">
//             <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//             <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//               View All
//             </Link>
//           </div>
//           <div className="divide-y divide-ink-50">
//             {recentVendors.map((v) => (
//               <Link
//                 key={v.id}
//                 to={`/vendors/profile/${v.id}`}
//                 className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//               >
//                 <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={36} />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-ink-900">{v.personal.fullName}</p>
//                   <p className="truncate text-xs text-ink-500">{v.business.businessType}</p>
//                 </div>
//                 <div className="shrink-0 text-right">
//                   <StatusChip status={v.status} />
//                   <p className="mt-1 text-[10px] text-ink-400">{timeAgo(v.registrationDate)}</p>
//                 </div>
//               </Link>
//             ))}
//             {recentVendors.length === 0 && (
//               <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-4 font-display text-base font-bold text-ink-900">Application Status</h2>
//           <div className="flex flex-col items-center gap-4">
//             <DonutChart segments={statusSegments} />
//             <div className="w-full space-y-2">
//               {statusSegments.map((s) => (
//                 <div key={s.label} className="flex items-center justify-between text-xs">
//                   <span className="flex items-center gap-2 text-ink-600">
//                     <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
//                     {s.label}
//                   </span>
//                   <span className="font-semibold text-ink-800">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Workflow + Quick Actions + Banner */}
//       <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.1fr_1.3fr_1fr]">
//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Workflow Overview</h2>
//           <div className="flex items-start justify-between gap-1">
//             {workflowSteps.map((step, i) => {
//               const [bg, text] = KPI_TONES[step.tone] || KPI_TONES.brand;
//               return (
//                 <div key={step.label} className="flex flex-1 flex-col items-center text-center">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${text}`}>
//                     <step.icon size={18} />
//                   </div>
//                   <p className="mt-2 text-[11px] font-medium text-ink-500">{step.label}</p>
//                   <p className="text-sm font-bold text-ink-900">{step.value}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-6">
//             <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
//               <div className="h-full rounded-full bg-success-500" style={{ width: `${progressPct}%` }} />
//             </div>
//             <p className="mt-1.5 text-right text-xs font-semibold text-ink-500">{progressPct}%</p>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {QUICK_ACTIONS.map((a) => {
//               const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//               return (
//                 <Link
//                   key={a.label}
//                   to={a.to}
//                   className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                 >
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                     <a.icon size={18} />
//                   </div>
//                   <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </Card>

//         <Card
//           padded={false}
//           className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//         >
//           {/* Background image, fills the whole card */}
//           <img
//             src={vendorgadi}
//             alt="Street vendor with cart"
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//           />

//           {/* Gradient overlay for legible text */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//             }}
//           />

//           {/* Decorative gold ring accent */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//           />

//           {/* Badge */}
//           <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//             <FiShield size={11} className="text-[#E9CE8B]" />
//             VVCMC Initiative
//           </span>

//           {/* Text */}
//           <div className="relative z-10 p-5 pt-3">
//             <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//             <p className="mt-1.5 text-[12.5px] text-white/85">
//               Building stronger communities through transparent &amp; efficient management.
//             </p>
//           </div>
//         </Card>
//       </div>

//       {/* Footer stats bar */}
//       <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//         <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//         <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//         <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//         <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//         <div className="flex items-center gap-2.5">
//           <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//           <div>
//             <p className="text-[11px] text-ink-400">System Status</p>
//             <p className="text-sm font-semibold text-ink-900">Healthy</p>
//           </div>
//         </div>
//         <FooterStat
//           icon={FiClock}
//           label="Last Backup"
//           value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//         />
//       </Card>
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }












// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
//   FiLoader,
//   FiAlertCircle,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { fetchVendorApplications } from "../../../services/vendorApplicationService";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // ── Backend's real workflow status → the simpler display buckets used across the app ──
// // (same bucketing as VendorList.jsx, so the numbers stay consistent across pages)
// const STATUS_DISPLAY_MAP = {
//   Draft: "Draft",
//   Submitted: "Pending Survey",
//   "Sent Back to Vendor": "Sent Back",
//   "Forwarded to Survey Officer": "Under Survey",
//   "Sent Back to Counter Officer": "Sent Back",
//   "Survey Approved": "Under Survey",
//   "Forwarded to A.M.C.": "Pending Approval",
//   "A.M.C. Approved": "Approved",
//   Rejected: "Rejected",
//   "Payment Pending": "Approved",
//   "Payment Done": "Approved",
//   "Certificate Issued": "Approved",
// };
// const displayStatus = (backendStatus) => STATUS_DISPLAY_MAP[backendStatus] || backendStatus;

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   // { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();

//   // ── Real, role/ward-filtered data ──
//   // The backend (`GET /api/applications/getAll`) automatically scopes results to the
//   // logged-in officer's own ward for counter_officer / survey_officer / A.M.C., and to
//   // everything for super_admin — this component never needs to know or send the ward itself.
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     // First call just to learn the real total, then fetch everything in one go —
//     // same pattern VendorList.jsx already uses.
//     fetchVendorApplications({ limit: 1 }).then((countResult) => {
//       if (cancelled) return;
//       if (!countResult.success) {
//         setLoading(false);
//         setError(countResult.message || "Could not load dashboard data.");
//         return;
//       }
//       const dynamicLimit = countResult.total || 1;
//       fetchVendorApplications({ limit: dynamicLimit }).then((result) => {
//         if (cancelled) return;
//         setLoading(false);
//         if (!result.success) {
//           setError(result.message || "Could not load dashboard data.");
//           return;
//         }
//         setApplications(result.data || []);
//       });
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const stats = useMemo(() => {
//     const totalApplications = applications.length;
//     let approved = 0;
//     let rejected = 0;
//     let smartCardsDisbursed = 0;
//     let paymentsToday = 0;
//     const todayStr = new Date().toISOString().slice(0, 10);

//     applications.forEach((a) => {
//       const bucket = displayStatus(a.status);
//       if (bucket === "Approved") approved += 1;
//       else if (bucket === "Rejected") rejected += 1;

//       if (a.certificate?.certificateNo) smartCardsDisbursed += 1;

//       const paidDate = a.payment?.paidDate ? String(a.payment.paidDate).slice(0, 10) : null;
//       if (a.payment?.status === "Paid" && paidDate === todayStr) paymentsToday += 1;
//     });

//     const pending = Math.max(totalApplications - approved - rejected, 0);

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [applications]);

//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = applications.filter((a) => a.createdAt && a.createdAt.slice(0, 10) === key).length;
//       counts.push({ label, value });
//     }
//     return counts;
//   }, [applications]);

//   const recentApplications = useMemo(
//     () =>
//       [...applications]
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//         .slice(0, 4),
//     [applications]
//   );

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//       </div>

//       {loading ? (
//         <Card className="flex items-center justify-center gap-2 py-16 text-sm text-ink-400">
//           <FiLoader className="animate-spin" size={16} />
//           Loading dashboard...
//         </Card>
//       ) : error ? (
//         <Card className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-danger-500">
//           <FiAlertCircle size={16} />
//           {error}
//         </Card>
//       ) : (
//         <>
//           {/* KPI cards */}
//           {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"> */}
//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
//             <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//             <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//             <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//             <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//             {/* <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} /> */}
//             <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//           </div>

//           {/* Overview row */}
//           <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_1fr]">
//             <Card>
//               <div className="mb-4 flex items-center justify-between">
//                 <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//                 <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//                   Last 6 Days
//                 </span>
//               </div>
//               <ApplicationTrendChart points={trendPoints} />
//             </Card>

//             <Card padded={false} className="overflow-hidden">
//               <div className="flex items-center justify-between border-b border-ink-100 p-5">
//                 <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//                 <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//                   View All
//                 </Link>
//               </div>
//               <div className="divide-y divide-ink-50">
//                 {recentApplications.map((a) => (
//                   <Link
//                     key={a._id || a.applicationNo}
//                     to={`/vendors/profile/${a.applicationNo}`}
//                     className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50"
//                   >
//                     <Avatar src={a.documents?.photo || undefined} name={a.personal?.fullName} size={36} />
//                     <div className="min-w-0 flex-1">
//                       <p className="truncate text-[13px] font-semibold text-ink-900">{a.personal?.fullName}</p>
//                       <p className="truncate text-xs text-ink-500">{a.business?.businessType}</p>
//                     </div>
//                     <div className="shrink-0 text-right">
//                       <StatusChip status={displayStatus(a.status)} />
//                       <p className="mt-1 text-[10px] text-ink-400">{timeAgo(a.createdAt)}</p>
//                     </div>
//                   </Link>
//                 ))}
//                 {recentApplications.length === 0 && (
//                   <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//                 )}
//               </div>
//             </Card>
//           </div>

//           {/* Quick Actions + Banner */}
//           <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
//             <Card>
//               <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//               <div className="grid grid-cols-3 gap-3">
//                 {QUICK_ACTIONS.map((a) => {
//                   const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//                   return (
//                     <Link
//                       key={a.label}
//                       to={a.to}
//                       className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                     >
//                       <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                         <a.icon size={18} />
//                       </div>
//                       <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </Card>

//             <Card
//               padded={false}
//               className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//             >
//               <img
//                 src={vendorgadi}
//                 alt="Street vendor with cart"
//                 className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//               />
//               <div
//                 aria-hidden="true"
//                 className="absolute inset-0"
//                 style={{
//                   background:
//                     "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//                 }}
//               />
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//               />
//               <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//                 <FiShield size={11} className="text-[#E9CE8B]" />
//                 VVCMC Initiative
//               </span>
//               <div className="relative z-10 p-5 pt-3">
//                 <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//                 <p className="mt-1.5 text-[12.5px] text-white/85">
//                   Building stronger communities through transparent &amp; efficient management.
//                 </p>
//               </div>
//             </Card>
//           </div>

//           {/* Footer stats bar */}
//           <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//             <FooterStat icon={FiMapPin} label="Total Zones" value={ZONE_OPTIONS.length} />
//             <FooterStat icon={FiMapPin} label="Total Wards" value={WARD_OPTIONS.length} />
//             <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//             <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//             <div className="flex items-center gap-2.5">
//               <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//               <div>
//                 <p className="text-[11px] text-ink-400">System Status</p>
//                 <p className="text-sm font-semibold text-ink-900">Healthy</p>
//               </div>
//             </div>
//             <FooterStat
//               icon={FiClock}
//               label="Last Backup"
//               value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//             />
//           </Card>
//         </>
//       )}
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">{value}</p>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useMemo, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FiUserPlus,
//   FiFilePlus,
//   FiCalendar,
//   FiCreditCard,
//   FiAward,
//   FiBarChart2,
//   FiShield,
//   FiMapPin,
//   FiUsers,
//   FiClock,
//   FiLoader,
//   FiAlertCircle,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { fetchVendorApplications } from "../../../services/vendorApplicationService";
// import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
// import vendorgadi from '../../../assets/vendorgadi.png';

// function timeAgo(dateStr) {
//   if (!dateStr) return "-";
//   const diffMs = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// }

// // ── Backend's real workflow status → the simpler display buckets used across the app ──
// // (same bucketing as VendorList.jsx, so the numbers stay consistent across pages)
// const STATUS_DISPLAY_MAP = {
//   Draft: "Draft",
//   Submitted: "Pending Survey",
//   "Sent Back to Vendor": "Sent Back",
//   "Forwarded to Survey Officer": "Under Survey",
//   "Sent Back to Counter Officer": "Sent Back",
//   "Survey Approved": "Under Survey",
//   "Forwarded to A.M.C.": "Pending Approval",
//   "A.M.C. Approved": "Approved",
//   Rejected: "Rejected",
//   "Payment Pending": "Approved",
//   "Payment Done": "Approved",
//   "Certificate Issued": "Approved",
// };
// const displayStatus = (backendStatus) => STATUS_DISPLAY_MAP[backendStatus] || backendStatus;

// // ── Static placeholder numbers shown right after the brief spinner, while the real
// // dashboard data is still being fetched in the background. As soon as the fetch
// // completes, the KPI/footer numbers animate (count up/down) from these placeholders
// // to the real values via <AnimatedNumber />, and Recent Applications swaps to real rows. ──
// const STATIC_STATS = {
//   totalApplications: 1441,
//   approved: 1,
//   rejected: 0,
//   pending: 1,
//   paymentsToday: 0,
//   smartCardsDisbursed: 0,
// };
// const STATIC_ZONES = 5;
// const STATIC_WARDS = 9;

// // Dummy trend values for the "Application Overview" chart, shown until the real
// // per-day counts are computed from fetched applications. Labels are real (last 6
// // days from today) so only the chart's shape/curve is a placeholder, not the dates.
// const STATIC_TREND_VALUES = [8, 14, 10, 18, 13, 20];

// // Placeholder rows for "Recent Applications" shown until the real list arrives —
// // same row shape/markup as a real row, just non-clickable dummy content.
// const STATIC_RECENT_APPLICATIONS = Array.from({ length: 5 }, (_, i) => ({
//   _id: `static-${i}`,
//   applicationNo: "—",
//   personal: { fullName: "Loading vendor…" },
//   business: { businessType: "—" },
//   status: "Submitted",
//   createdAt: null,
//   __static: true,
// }));

// // Small hand-rolled SVG line chart - no extra chart library needed.
// function ApplicationTrendChart({ points }) {
//   const width = 640;
//   const height = 220;
//   const padding = 28;
//   const max = Math.max(...points.map((p) => p.value), 1);

//   const coords = points.map((p, i) => {
//     const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
//     const y = height - padding - (p.value / max) * (height - padding * 2);
//     return { x, y, ...p };
//   });

//   const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
//   const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
//     height - padding
//   } Z`;

//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
//       <defs>
//         <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
//           <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       {[0.25, 0.5, 0.75, 1].map((f) => (
//         <line
//           key={f}
//           x1={padding}
//           x2={width - padding}
//           y1={height - padding - f * (height - padding * 2)}
//           y2={height - padding - f * (height - padding * 2)}
//           stroke="#EEF2F1"
//           strokeWidth="1"
//         />
//       ))}
//       <path d={areaPath} fill="url(#trendFill)" />
//       <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
//       {coords.map((c, i) => (
//         <g key={i}>
//           <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
//           <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
//             {c.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// // ── Animated counter: whenever `value` changes, counts smoothly from the previous
// // number to the new one instead of just popping the digit in (used so KPI/footer
// // numbers visibly "animate" from static → real once the fetch resolves). Non-numeric
// // values (dates, strings) render as-is with no animation. ──
// function AnimatedNumber({ value, duration = 700 }) {
//   const isNumeric = typeof value === "number" && !Number.isNaN(value);
//   const [display, setDisplay] = useState(isNumeric ? value : 0);
//   const prevValue = useRef(isNumeric ? value : 0);

//   useEffect(() => {
//     if (!isNumeric) return;
//     const from = prevValue.current;
//     const to = value;
//     if (from === to) return;

//     let startTime = null;
//     let rafId;

//     const step = (timestamp) => {
//       if (startTime === null) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / duration, 1);
//       const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
//       const current = Math.round(from + (to - from) * eased);
//       setDisplay(current);
//       if (progress < 1) {
//         rafId = requestAnimationFrame(step);
//       } else {
//         prevValue.current = to;
//       }
//     };

//     rafId = requestAnimationFrame(step);
//     return () => cancelAnimationFrame(rafId);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [value, duration, isNumeric]);

//   if (!isNumeric) return <>{value}</>;
//   return <>{display}</>;
// }

// const KPI_TONES = {
//   brand: ["bg-brand-100", "text-brand-600"],
//   warning: ["bg-warning-100", "text-warning-500"],
//   success: ["bg-success-100", "text-success-500"],
//   danger: ["bg-danger-100", "text-danger-500"],
//   accent: ["bg-accent-100", "text-accent-700"],
//   info: ["bg-info-100", "text-info-500"],
// };

// function KpiCard({ icon: Icon, tone, label, value, trend }) {
//   const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
//   return (
//     <Card className="flex items-start gap-4">
//       <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-medium text-ink-500">{label}</p>
//         <p className="font-display text-2xl font-bold text-ink-900">
//           <AnimatedNumber value={value} />
//         </p>
//         {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
//       </div>
//     </Card>
//   );
// }

// const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
//   { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
//   // { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
//   { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
//   { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
// ];

// export default function Dashboard() {
//   const { user } = useAuth();

//   // ── Real, role/ward-filtered data ──
//   // The backend (`GET /api/applications/getAll`) automatically scopes results to the
//   // logged-in officer's own ward for counter_officer / survey_officer / A.M.C., and to
//   // everything for super_admin — this component never needs to know or send the ward itself.
//   const [applications, setApplications] = useState([]);
//   const [dataLoaded, setDataLoaded] = useState(false); // true once the fetch attempt finishes (success or fail)
//   const [error, setError] = useState("");
//   const [showSpinner, setShowSpinner] = useState(true); // brief spinner shown for a fixed short window on mount only

//   // Brief spinner — shown for a fixed short window (milliseconds) on mount, independent
//   // of the actual network fetch. After this window we show static placeholders (if the
//   // fetch hasn't finished yet) or real data (if it already has) — the spinner never
//   // waits on the network, so it's never stuck showing "Loading..." for a long time.
//   useEffect(() => {
//     const t = setTimeout(() => setShowSpinner(false), 400);
//     return () => clearTimeout(t);
//   }, []);

//   useEffect(() => {
//     let cancelled = false;
//     setDataLoaded(false);
//     setError("");
//     // First call just to learn the real total, then fetch everything in one go —
//     // same pattern VendorList.jsx already uses.
//     fetchVendorApplications({ limit: 1 }).then((countResult) => {
//       if (cancelled) return;
//       if (!countResult.success) {
//         setDataLoaded(true);
//         setError(countResult.message || "Could not load dashboard data.");
//         return;
//       }
//       const dynamicLimit = countResult.total || 1;
//       fetchVendorApplications({ limit: dynamicLimit }).then((result) => {
//         if (cancelled) return;
//         setDataLoaded(true);
//         if (!result.success) {
//           setError(result.message || "Could not load dashboard data.");
//           return;
//         }
//         setApplications(result.data || []);
//       });
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const computedStats = useMemo(() => {
//     const totalApplications = applications.length;
//     let approved = 0;
//     let rejected = 0;
//     let smartCardsDisbursed = 0;
//     let paymentsToday = 0;
//     const todayStr = new Date().toISOString().slice(0, 10);

//     applications.forEach((a) => {
//       const bucket = displayStatus(a.status);
//       if (bucket === "Approved") approved += 1;
//       else if (bucket === "Rejected") rejected += 1;

//       if (a.certificate?.certificateNo) smartCardsDisbursed += 1;

//       const paidDate = a.payment?.paidDate ? String(a.payment.paidDate).slice(0, 10) : null;
//       if (a.payment?.status === "Paid" && paidDate === todayStr) paymentsToday += 1;
//     });

//     const pending = Math.max(totalApplications - approved - rejected, 0);

//     return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
//   }, [applications]);

//   // Static placeholders until the fetch resolves, then the real computed numbers —
//   // KpiCard/FooterStat animate the transition via <AnimatedNumber />.
//   const stats = dataLoaded ? computedStats : STATIC_STATS;

//   // Dummy trend values until the fetch resolves, then the real per-day counts —
//   // date labels are always real (last 6 days from today).
//   const trendPoints = useMemo(() => {
//     const days = 6;
//     const counts = [];
//     for (let i = days - 1; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = d.toISOString().slice(0, 10);
//       const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//       const value = dataLoaded
//         ? applications.filter((a) => a.createdAt && a.createdAt.slice(0, 10) === key).length
//         : STATIC_TREND_VALUES[days - 1 - i];
//       counts.push({ label, value });
//     }
//     return counts;
//   }, [applications, dataLoaded]);

//   // Static placeholder rows until fetch resolves, then real first-5 recent applications.
//   const recentApplications = useMemo(() => {
//     if (!dataLoaded) return STATIC_RECENT_APPLICATIONS;
//     return [...applications]
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       .slice(0, 5);
//   }, [applications, dataLoaded]);

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
//           <p className="text-sm text-ink-500">
//             Welcome back, {user?.name || "Officer"}! Here's what's happening today.
//           </p>
//         </div>
//       </div>

//       {showSpinner ? (
//         <Card className="flex items-center justify-center gap-2 py-16 text-sm text-ink-400">
//           <FiLoader className="animate-spin" size={16} />
//           Loading dashboard...
//         </Card>
//       ) : (
//         <>
//           {/* Non-blocking error banner — dashboard still renders with placeholder/real
//               data below, instead of replacing the whole page with an error screen. */}
//           {error && (
//             <div className="flex items-center gap-2 rounded-xl border border-danger-200 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-600">
//               <FiAlertCircle size={16} />
//               {error}
//             </div>
//           )}

//           {/* KPI cards */}
//           {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"> */}
//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
//             <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
//             <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
//             <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
//             <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
//             {/* <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} /> */}
//             <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
//           </div>

//           {/* Overview row */}
//           <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_1fr]">
//             <Card>
//               <div className="mb-4 flex items-center justify-between">
//                 <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
//                 <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
//                   Last 6 Days
//                 </span>
//               </div>
//               <ApplicationTrendChart points={trendPoints} />
//             </Card>

//             <Card padded={false} className="overflow-hidden">
//               <div className="flex items-center justify-between border-b border-ink-100 p-5">
//                 <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
//                 <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
//                   View All
//                 </Link>
//               </div>
//               <div className="divide-y divide-ink-50">
//                 {recentApplications.length === 0 ? (
//                   <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
//                 ) : (
//                   recentApplications.map((a) => (
//                     <Link
//                       key={a._id || a.applicationNo}
//                       to={a.__static ? "#" : `/vendors/profile/${a.applicationNo}`}
//                       onClick={(e) => a.__static && e.preventDefault()}
//                       className={`flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50 ${
//                         a.__static ? "opacity-60" : ""
//                       }`}
//                     >
//                       <Avatar src={a.documents?.photo || undefined} name={a.personal?.fullName} size={36} />
//                       <div className="min-w-0 flex-1">
//                         <p className="truncate text-[13px] font-semibold text-ink-900">{a.personal?.fullName}</p>
//                         <p className="truncate text-xs text-ink-500">{a.business?.businessType}</p>
//                       </div>
//                       <div className="shrink-0 text-right">
//                         <StatusChip status={displayStatus(a.status)} />
//                         <p className="mt-1 text-[10px] text-ink-400">{a.__static ? "" : timeAgo(a.createdAt)}</p>
//                       </div>
//                     </Link>
//                   ))
//                 )}
//               </div>
//             </Card>
//           </div>

//           {/* Quick Actions + Banner */}
//           <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
//             <Card>
//               <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
//               <div className="grid grid-cols-3 gap-3">
//                 {QUICK_ACTIONS.map((a) => {
//                   const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
//                   return (
//                     <Link
//                       key={a.label}
//                       to={a.to}
//                       className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
//                     >
//                       <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
//                         <a.icon size={18} />
//                       </div>
//                       <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </Card>

//             <Card
//               padded={false}
//               className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
//             >
//               <img
//                 src={vendorgadi}
//                 alt="Street vendor with cart"
//                 className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//               />
//               <div
//                 aria-hidden="true"
//                 className="absolute inset-0"
//                 style={{
//                   background:
//                     "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
//                 }}
//               />
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
//               />
//               <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//                 <FiShield size={11} className="text-[#E9CE8B]" />
//                 VVCMC Initiative
//               </span>
//               <div className="relative z-10 p-5 pt-3">
//                 <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
//                 <p className="mt-1.5 text-[12.5px] text-white/85">
//                   Building stronger communities through transparent &amp; efficient management.
//                 </p>
//               </div>
//             </Card>
//           </div>

//           {/* Footer stats bar */}
//           <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
//             <FooterStat icon={FiMapPin} label="Total Zones" value={dataLoaded ? ZONE_OPTIONS.length : STATIC_ZONES} />
//             <FooterStat icon={FiMapPin} label="Total Wards" value={dataLoaded ? WARD_OPTIONS.length : STATIC_WARDS} />
//             <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
//             <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
//             <div className="flex items-center gap-2.5">
//               <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
//               <div>
//                 <p className="text-[11px] text-ink-400">System Status</p>
//                 <p className="text-sm font-semibold text-ink-900">Healthy</p>
//               </div>
//             </div>
//             <FooterStat
//               icon={FiClock}
//               label="Last Backup"
//               value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//             />
//           </Card>
//         </>
//       )}
//     </div>
//   );
// }

// function FooterStat({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
//         <Icon size={14} />
//       </div>
//       <div>
//         <p className="text-[11px] text-ink-400">{label}</p>
//         <p className="text-sm font-semibold text-ink-900">
//           <AnimatedNumber value={value} />
//         </p>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // OLD CODE — kept commented out per project policy (never delete, only comment).
// // This was the earlier version where `loading` was tied directly to the network
// // fetch, so the spinner (and then full-page error screen) stayed up for however
// // long the API took, and the chart's trendPoints always computed from `applications`
// // directly (showing a flat/zero line while loading, since applications was empty).
// // Replaced above with: a fixed ~400ms spinner window (via `showSpinner`), then
// // static placeholder numbers/rows/chart-values (via `dataLoaded`), with real data
// // swapping in (and KPI/footer numbers animating) once the fetch resolves.
// // ─────────────────────────────────────────────────────────────────────────────
// //
// // const [loading, setLoading] = useState(true);
// //
// // useEffect(() => {
// //   let cancelled = false;
// //   setLoading(true);
// //   setError("");
// //   fetchVendorApplications({ limit: 1 }).then((countResult) => {
// //     if (cancelled) return;
// //     if (!countResult.success) {
// //       setLoading(false);
// //       setError(countResult.message || "Could not load dashboard data.");
// //       return;
// //     }
// //     const dynamicLimit = countResult.total || 1;
// //     fetchVendorApplications({ limit: dynamicLimit }).then((result) => {
// //       if (cancelled) return;
// //       setLoading(false);
// //       if (!result.success) {
// //         setError(result.message || "Could not load dashboard data.");
// //         return;
// //       }
// //       setApplications(result.data || []);
// //     });
// //   });
// //   return () => {
// //     cancelled = true;
// //   };
// // }, []);
// //
// // {loading ? (
// //   <Card className="flex items-center justify-center gap-2 py-16 text-sm text-ink-400">
// //     <FiLoader className="animate-spin" size={16} />
// //     Loading dashboard...
// //   </Card>
// // ) : error ? (
// //   <Card className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-danger-500">
// //     <FiAlertCircle size={16} />
// //     {error}
// //   </Card>
// // ) : (
// //   <>
// //     {/* ...same KPI/overview/quick-actions/footer JSX as above... */}
// //   </>
// // )}
// //
// // // old trendPoints — always computed from `applications` (flat/empty while loading):
// // const trendPoints = useMemo(() => {
// //   const days = 6;
// //   const counts = [];
// //   for (let i = days - 1; i >= 0; i--) {
// //     const d = new Date();
// //     d.setDate(d.getDate() - i);
// //     const key = d.toISOString().slice(0, 10);
// //     const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
// //     const value = applications.filter((a) => a.createdAt && a.createdAt.slice(0, 10) === key).length;
// //     counts.push({ label, value });
// //   }
// //   return counts;
// // }, [applications]);
// //
// // // old recentApplications only took first 4 and had no static placeholder:
// // const recentApplications = useMemo(
// //   () =>
// //     [...applications]
// //       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
// //       .slice(0, 4),
// //   [applications]
// // );




import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUserPlus,
  FiFilePlus,
  FiCalendar,
  FiCreditCard,
  FiAward,
  FiBarChart2,
  FiShield,
  FiMapPin,
  FiUsers,
  FiClock,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Avatar from "../../../components/ui/Avatar";
import StatusChip from "../../../components/ui/StatusChip";
import { useAuth } from "../../auth/hooks/useAuth";
import { fetchVendorApplications } from "../../../services/vendorApplicationService";
import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
import vendorgadi from '../../../assets/vendorgadi.png';

function timeAgo(dateStr) {
  if (!dateStr) return "-";
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

// ── Backend's real workflow status → the simpler display buckets used across the app ──
// (same bucketing as VendorList.jsx, so the numbers stay consistent across pages)
const STATUS_DISPLAY_MAP = {
  Draft: "Draft",
  Submitted: "Pending Survey",
  "Sent Back to Vendor": "Sent Back",
  "Forwarded to Survey Officer": "Under Survey",
  "Sent Back to Counter Officer": "Sent Back",
  "Survey Approved": "Under Survey",
  "Forwarded to A.M.C.": "Pending Approval",
  "A.M.C. Approved": "Approved",
  Rejected: "Rejected",
  "Payment Pending": "Approved",
  "Payment Done": "Approved",
  "Certificate Issued": "Approved",
};
const displayStatus = (backendStatus) => STATUS_DISPLAY_MAP[backendStatus] || backendStatus;

// ── Static placeholder numbers shown right after the brief spinner, while the real
// dashboard data is still being fetched in the background. As soon as the fetch
// completes, the KPI/footer numbers animate (count up/down) from these placeholders
// to the real values via <AnimatedNumber />, and Recent Applications swaps to real rows. ──
const STATIC_STATS = {
  totalApplications: 1441,
  approved: 1,
  rejected: 0,
  pending: 1,
  paymentsToday: 0,
  smartCardsDisbursed: 0,
};
const STATIC_ZONES = 5;
const STATIC_WARDS = 9;

// Dummy trend values for the "Application Overview" chart, shown until the real
// per-day counts are computed from fetched applications. Labels are real (last 6
// days from today) so only the chart's shape/curve is a placeholder, not the dates.
const STATIC_TREND_VALUES = [8, 14, 10, 18, 13, 20];

// Placeholder rows for "Recent Applications" shown until the real list arrives —
// same row shape/markup as a real row, just non-clickable dummy content.
const STATIC_RECENT_APPLICATIONS = Array.from({ length: 5 }, (_, i) => ({
  _id: `static-${i}`,
  applicationNo: "—",
  personal: { fullName: "Loading vendor…" },
  business: { businessType: "—" },
  status: "Submitted",
  createdAt: null,
  __static: true,
}));

// Small hand-rolled SVG line chart - no extra chart library needed.
function ApplicationTrendChart({ points }) {
  const width = 640;
  const height = 220;
  const padding = 28;
  const max = Math.max(...points.map((p) => p.value), 1);

  const coords = points.map((p, i) => {
    const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
    const y = height - padding - (p.value / max) * (height - padding * 2);
    return { x, y, ...p };
  });

  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
    height - padding
  } Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={padding}
          x2={width - padding}
          y1={height - padding - f * (height - padding * 2)}
          y2={height - padding - f * (height - padding * 2)}
          stroke="#EEF2F1"
          strokeWidth="1"
        />
      ))}
      <path d={areaPath} fill="url(#trendFill)" />
      <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
      {coords.map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
          <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── Animated counter: whenever `value` changes, counts smoothly from the previous
// number to the new one instead of just popping the digit in (used so KPI/footer
// numbers visibly "animate" from static → real once the fetch resolves). Non-numeric
// values (dates, strings) render as-is with no animation. ──
function AnimatedNumber({ value, duration = 700 }) {
  const isNumeric = typeof value === "number" && !Number.isNaN(value);
  const [display, setDisplay] = useState(isNumeric ? value : 0);
  const prevValue = useRef(isNumeric ? value : 0);

  useEffect(() => {
    if (!isNumeric) return;
    const from = prevValue.current;
    const to = value;
    if (from === to) return;

    let startTime = null;
    let rafId;

    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(from + (to - from) * eased);
      setDisplay(current);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        prevValue.current = to;
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, isNumeric]);

  if (!isNumeric) return <>{value}</>;
  return <>{display}</>;
}

const KPI_TONES = {
  brand: ["bg-brand-100", "text-brand-600"],
  warning: ["bg-warning-100", "text-warning-500"],
  success: ["bg-success-100", "text-success-500"],
  danger: ["bg-danger-100", "text-danger-500"],
  accent: ["bg-accent-100", "text-accent-700"],
  info: ["bg-info-100", "text-info-500"],
};

function KpiCard({ icon: Icon, tone, label, value, trend }) {
  const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
  return (
    <Card className="flex items-start gap-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-ink-500">{label}</p>
        <p className="font-display text-2xl font-bold text-ink-900">
          <AnimatedNumber value={value} />
        </p>
        {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
      </div>
    </Card>
  );
}

const QUICK_ACTIONS = [
  { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
  { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
  { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
  // { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
  { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
  { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
];

export default function Dashboard() {
  const { user } = useAuth();

  // ── Real, role/ward-filtered data ──
  // The backend (`GET /api/applications/getAll`) automatically scopes results to the
  // logged-in officer's own ward for counter_officer / survey_officer / A.M.C., and to
  // everything for super_admin — this component never needs to know or send the ward itself.
  const [applications, setApplications] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // true once the FULL (stats) fetch attempt finishes
  const [error, setError] = useState("");
  const [showSpinner, setShowSpinner] = useState(true); // brief spinner shown for a fixed short window on mount only

  // ── Recent Applications gets its own small, fast fetch — independent of the big
  // stats fetch below (which fetches ALL 1000+ applications and can be slow). This
  // way Recent Applications can swap to real data quickly even while the full stats
  // fetch is still running in the background. ──
  const [recentApps, setRecentApps] = useState([]);
  const [recentLoaded, setRecentLoaded] = useState(false);

  // Brief spinner — shown for a fixed short window (milliseconds) on mount, independent
  // of the actual network fetch. After this window we show static placeholders (if the
  // fetch hasn't finished yet) or real data (if it already has) — the spinner never
  // waits on the network, so it's never stuck showing "Loading..." for a long time.
  useEffect(() => {
    const t = setTimeout(() => setShowSpinner(false), 400);
    return () => clearTimeout(t);
  }, []);

  // Fast fetch for Recent Applications — small limit, sorted client-side by newest.
  useEffect(() => {
    let cancelled = false;
    setRecentLoaded(false);
    fetchVendorApplications({ limit: 20 }).then((result) => {
      if (cancelled) return;
      setRecentLoaded(true);
      if (result.success) {
        const top5 = [...(result.data || [])]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setRecentApps(top5);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setDataLoaded(false);
    setError("");
    // First call just to learn the real total, then fetch everything in one go —
    // same pattern VendorList.jsx already uses.
    fetchVendorApplications({ limit: 1 }).then((countResult) => {
      if (cancelled) return;
      if (!countResult.success) {
        setDataLoaded(true);
        setError(countResult.message || "Could not load dashboard data.");
        return;
      }
      const dynamicLimit = countResult.total || 1;
      fetchVendorApplications({ limit: dynamicLimit }).then((result) => {
        if (cancelled) return;
        setDataLoaded(true);
        if (!result.success) {
          setError(result.message || "Could not load dashboard data.");
          return;
        }
        setApplications(result.data || []);
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const computedStats = useMemo(() => {
    const totalApplications = applications.length;
    let approved = 0;
    let rejected = 0;
    let smartCardsDisbursed = 0;
    let paymentsToday = 0;
    const todayStr = new Date().toISOString().slice(0, 10);

    applications.forEach((a) => {
      const bucket = displayStatus(a.status);
      if (bucket === "Approved") approved += 1;
      else if (bucket === "Rejected") rejected += 1;

      if (a.certificate?.certificateNo) smartCardsDisbursed += 1;

      const paidDate = a.payment?.paidDate ? String(a.payment.paidDate).slice(0, 10) : null;
      if (a.payment?.status === "Paid" && paidDate === todayStr) paymentsToday += 1;
    });

    const pending = Math.max(totalApplications - approved - rejected, 0);

    return { totalApplications, approved, rejected, pending, paymentsToday, smartCardsDisbursed };
  }, [applications]);

  // Static placeholders until the fetch resolves, then the real computed numbers —
  // KpiCard/FooterStat animate the transition via <AnimatedNumber />.
  const stats = dataLoaded ? computedStats : STATIC_STATS;

  // Dummy trend values until the fetch resolves, then the real per-day counts —
  // date labels are always real (last 6 days from today).
  const trendPoints = useMemo(() => {
    const days = 6;
    const counts = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
      const value = dataLoaded
        ? applications.filter((a) => a.createdAt && a.createdAt.slice(0, 10) === key).length
        : STATIC_TREND_VALUES[days - 1 - i];
      counts.push({ label, value });
    }
    return counts;
  }, [applications, dataLoaded]);

  // Static placeholder rows until the FAST recent-fetch resolves, then real latest-5
  // applications — this no longer waits on the big stats fetch.
  const recentApplications = useMemo(() => {
    if (!recentLoaded) return STATIC_RECENT_APPLICATIONS;
    return recentApps;
  }, [recentApps, recentLoaded]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
          <p className="text-sm text-ink-500">
            Welcome back, {user?.name || "Officer"}! Here's what's happening today.
          </p>
        </div>
      </div>

      {showSpinner ? (
        <Card className="flex items-center justify-center gap-2 py-16 text-sm text-ink-400">
          <FiLoader className="animate-spin" size={16} />
          Loading dashboard...
        </Card>
      ) : (
        <>
          {/* Non-blocking error banner — dashboard still renders with placeholder/real
              data below, instead of replacing the whole page with an error screen. */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-danger-200 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-600">
              <FiAlertCircle size={16} />
              {error}
            </div>
          )}

          {/* KPI cards */}
          {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"> */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
            <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
            <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
            <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
            {/* <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} /> */}
            <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
          </div>

          {/* Overview row */}
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_1fr]">
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
                <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
                  Last 6 Days
                </span>
              </div>
              <ApplicationTrendChart points={trendPoints} />
            </Card>

            <Card padded={false} className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-ink-100 p-5">
                <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
                <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                  View All
                </Link>
              </div>
              <div className="divide-y divide-ink-50">
                {recentApplications.length === 0 ? (
                  <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
                ) : (
                  recentApplications.map((a) => (
                    <Link
                      key={a._id || a.applicationNo}
                      to={a.__static ? "#" : `/vendors/profile/${a.applicationNo}`}
                      onClick={(e) => a.__static && e.preventDefault()}
                      className={`flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50 ${
                        a.__static ? "opacity-60" : ""
                      }`}
                    >
                      <Avatar src={a.documents?.photo || undefined} name={a.personal?.fullName} size={36} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold text-ink-900">{a.personal?.fullName}</p>
                        <p className="truncate text-xs text-ink-500">{a.business?.businessType}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <StatusChip status={displayStatus(a.status)} />
                        <p className="mt-1 text-[10px] text-ink-400">{a.__static ? "" : timeAgo(a.createdAt)}</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Quick Actions + Banner */}
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
              <div className="grid grid-cols-3 gap-3">
                {QUICK_ACTIONS.map((a) => {
                  const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
                  return (
                    <Link
                      key={a.label}
                      to={a.to}
                      className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
                        <a.icon size={18} />
                      </div>
                      <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
                    </Link>
                  );
                })}
              </div>
            </Card>

            <Card
              padded={false}
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
            >
              <img
                src={vendorgadi}
                alt="Street vendor with cart"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
              />
              <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                <FiShield size={11} className="text-[#E9CE8B]" />
                VVCMC Initiative
              </span>
              <div className="relative z-10 p-5 pt-3">
                <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
                <p className="mt-1.5 text-[12.5px] text-white/85">
                  Building stronger communities through transparent &amp; efficient management.
                </p>
              </div>
            </Card>
          </div>

          {/* Footer stats bar */}
          <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <FooterStat icon={FiMapPin} label="Total Zones" value={dataLoaded ? ZONE_OPTIONS.length : STATIC_ZONES} />
            <FooterStat icon={FiMapPin} label="Total Wards" value={dataLoaded ? WARD_OPTIONS.length : STATIC_WARDS} />
            <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
            <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
              <div>
                <p className="text-[11px] text-ink-400">System Status</p>
                <p className="text-sm font-semibold text-ink-900">Healthy</p>
              </div>
            </div>
            <FooterStat
              icon={FiClock}
              label="Last Backup"
              value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            />
          </Card>
        </>
      )}
    </div>
  );
}

function FooterStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
        <Icon size={14} />
      </div>
      <div>
        <p className="text-[11px] text-ink-400">{label}</p>
        <p className="text-sm font-semibold text-ink-900">
          <AnimatedNumber value={value} />
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OLD CODE — kept commented out per project policy (never delete, only comment).
// This was the earlier version where Recent Applications was derived from the
// SAME big `applications` state as the KPI stats (fetched with `dynamicLimit`,
// i.e. all ~1441 records). That meant Recent Applications stayed on placeholders
// until the entire heavy fetch resolved, even though it only ever needed the
// latest 5. Replaced above with a separate, small `fetchVendorApplications({ limit: 20 })`
// call (`recentApps`/`recentLoaded`) so Recent Applications can swap to real data
// quickly, independent of how long the full stats fetch takes.
// ─────────────────────────────────────────────────────────────────────────────
//
// const [loading, setLoading] = useState(true);
//
// useEffect(() => {
//   let cancelled = false;
//   setLoading(true);
//   setError("");
//   fetchVendorApplications({ limit: 1 }).then((countResult) => {
//     if (cancelled) return;
//     if (!countResult.success) {
//       setLoading(false);
//       setError(countResult.message || "Could not load dashboard data.");
//       return;
//     }
//     const dynamicLimit = countResult.total || 1;
//     fetchVendorApplications({ limit: dynamicLimit }).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load dashboard data.");
//         return;
//       }
//       setApplications(result.data || []);
//     });
//   });
//   return () => {
//     cancelled = true;
//   };
// }, []);
//
// {loading ? (
//   <Card className="flex items-center justify-center gap-2 py-16 text-sm text-ink-400">
//     <FiLoader className="animate-spin" size={16} />
//     Loading dashboard...
//   </Card>
// ) : error ? (
//   <Card className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-danger-500">
//     <FiAlertCircle size={16} />
//     {error}
//   </Card>
// ) : (
//   <>
//     {/* ...same KPI/overview/quick-actions/footer JSX as above... */}
//   </>
// )}
//
// // old trendPoints — always computed from `applications` (flat/empty while loading):
// const trendPoints = useMemo(() => {
//   const days = 6;
//   const counts = [];
//   for (let i = days - 1; i >= 0; i--) {
//     const d = new Date();
//     d.setDate(d.getDate() - i);
//     const key = d.toISOString().slice(0, 10);
//     const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//     const value = applications.filter((a) => a.createdAt && a.createdAt.slice(0, 10) === key).length;
//     counts.push({ label, value });
//   }
//   return counts;
// }, [applications]);
//
// // old recentApplications — derived from the big `applications`/`dataLoaded`:
// const recentApplications = useMemo(() => {
//   if (!dataLoaded) return STATIC_RECENT_APPLICATIONS;
//   return [...applications]
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 5);
// }, [applications, dataLoaded]);
//
// // old recentApplications (even older) only took first 4 and had no static placeholder:
// const recentApplications = useMemo(
//   () =>
//     [...applications]
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       .slice(0, 4),
//   [applications]
// );