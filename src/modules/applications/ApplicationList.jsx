



// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiSearch, FiEye, FiClock, FiLoader, FiAlertCircle, FiCreditCard } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import StatusChip from "../../components/ui/StatusChip";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import { fetchVendorApplications, bulkGenerateIdCards } from "../../services/vendorApplicationService";
// import { useAuth } from "../auth/hooks/useAuth";

// const STATUS_FILTERS = ["All", "Pending Approval", "Sent Back", "Approved", "Rejected"];

// // Backend's real workflow status → the simpler display buckets this page's filter chips use
// const STATUS_DISPLAY_MAP = {
//   Draft: "Draft",
//   Submitted: "Draft",
//   "Sent Back to Vendor": "Draft",
//   "Forwarded to Survey Officer": "Draft",
//   "Sent Back to Counter Officer": "Sent Back",
//   "Survey Approved": "Pending Approval",
//   "Forwarded to A.M.C.": "Pending Approval",
//   "A.M.C. Approved": "Approved",
//   Rejected: "Rejected",
//   "Payment Pending": "Approved",
//   "Payment Done": "Approved",
//   "Certificate Issued": "Approved",
// };
// const displayStatus = (backendStatus) => STATUS_DISPLAY_MAP[backendStatus] || backendStatus;

// export default function ApplicationList() {
//   const { user } = useAuth();
//   // ── Generate/View Vendor ID is A.M.C.-only (29-10 request) — counter_officer,
//   //    survey_officer must NOT be able to generate it, or even see the bulk controls. ──
//   const canGenerateSmartCard = user?.role === "A.M.C." || user?.role === "super_admin";
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");

//   // ── Bulk ID Card generation — for applications already "A.M.C. Approved" ──
//   const [selected, setSelected] = useState([]); // array of applicationNo
//   const [bulkSubmitting, setBulkSubmitting] = useState(false);
//   const [bulkResult, setBulkResult] = useState(null); // { message, generatedCount, skippedCount }
//   const [bulkError, setBulkError] = useState("");

//   const loadApplications = () => {
//     setLoading(true);
//     setError("");
//     fetchVendorApplications({ limit: 100 }).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load applications.");
//         return;
//       }
//       // Only applications that have actually reached the A.M.C. stage (or beyond) belong in this module
//       const relevant = (result.data || []).filter((a) =>
//         ["Forwarded to A.M.C.", "Sent Back to Counter Officer", "A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(a.status)
//       );
//       setApplications(relevant);
//     });
//   };

//   useEffect(() => {
//     loadApplications();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // ── Approved applications eligible for ID Card generation ──
//   const approvedNos = useMemo(
//     () =>
//       canGenerateSmartCard
//         ? applications.filter((a) => ["A.M.C. Approved", "Payment Pending"].includes(a.status)).map((a) => a.applicationNo)
//         : [],
//     [applications, canGenerateSmartCard]
//   );

//   const toggleSelected = (applicationNo) => {
//     setSelected((prev) =>
//       prev.includes(applicationNo) ? prev.filter((n) => n !== applicationNo) : [...prev, applicationNo]
//     );
//   };

//   const toggleSelectAllApproved = () => {
//     setSelected((prev) => (prev.length === approvedNos.length ? [] : approvedNos));
//   };

//   const handleBulkGenerate = async () => {
//     if (selected.length === 0) return;
//     setBulkError("");
//     setBulkResult(null);
//     setBulkSubmitting(true);
//     const result = await bulkGenerateIdCards(selected);
//     setBulkSubmitting(false);
//     if (!result.success) {
//       setBulkError(result.message || "Bulk ID card generation failed.");
//       return;
//     }
//     setBulkResult(result);
//     setSelected([]);
//     loadApplications();
//   };

//   const filtered = useMemo(
//     () =>
//       applications.filter((a) => {
//         const name = a.personal?.fullName || "";
//         const appNo = a.applicationNo || "";
//         const matchesQuery =
//           !query || name.toLowerCase().includes(query.toLowerCase()) || appNo.toLowerCase().includes(query.toLowerCase());
//         const matchesStatus = status === "All" || displayStatus(a.status) === status;
//         return matchesQuery && matchesStatus;
//       }),
//     [applications, query, status]
//   );

//   const pendingCount = applications.filter((a) => a.status === "Forwarded to A.M.C.").length;

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Application Approval</h1>
//           <p className="text-sm text-ink-500">{applications.length} applications in the workflow</p>
//         </div>
//         <Link to="/applications/pending">
//           <Button icon={FiClock} variant="accent">
//             Pending Approval ({pendingCount})
//           </Button>
//         </Link>
//       </div>

//       {approvedNos.length > 0 && (
//         <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <p className="text-sm font-bold text-ink-900">Bulk ID Card Generation</p>
//             <p className="text-xs text-ink-500">
//               Select A.M.C. Approved applications below and generate their ID Cards together — no payment required.
//               {selected.length > 0 && <span className="font-semibold text-brand-600"> {selected.length} selected.</span>}
//             </p>
//             {bulkError && <p className="mt-1 text-xs font-medium text-danger-500">{bulkError}</p>}
//             {bulkResult && (
//               <p className="mt-1 text-xs font-medium text-success-600">
//                 {bulkResult.generatedCount} ID card(s) generated, {bulkResult.skippedCount} skipped.
//               </p>
//             )}
//           </div>
//           <Button
//             icon={FiCreditCard}
//             variant="success"
//             onClick={handleBulkGenerate}
//             disabled={selected.length === 0 || bulkSubmitting}
//           >
//             {bulkSubmitting ? "Generating..." : `Generate ID Cards (${selected.length})`}
//           </Button>
//         </Card>
//       )}

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search vendor, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => setStatus(s)}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s ? "bg-brand-500 text-white" : "bg-ink-50 text-ink-500 hover:bg-ink-100"
//                 }`}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm text-ink-400">
//             <FiLoader className="animate-spin" size={16} />
//             Loading applications...
//           </div>
//         ) : error ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
//             <FiAlertCircle size={16} />
//             {error}
//           </div>
//         ) : (
//           <div className="scrollbar-thin overflow-x-auto">
//             <table className="w-full min-w-[720px] text-left text-sm">
//               <thead>
//                 <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                   <th className="w-8 px-5 py-3">
//                     {approvedNos.length > 0 && (
//                       <input
//                         type="checkbox"
//                         checked={selected.length === approvedNos.length && approvedNos.length > 0}
//                         onChange={toggleSelectAllApproved}
//                         title="Select all approved"
//                       />
//                     )}
//                   </th>
//                   <th className="px-5 py-3 font-semibold">Vendor</th>
//                   <th className="px-5 py-3 font-semibold">Application No.</th>
//                   <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                   <th className="px-5 py-3 font-semibold">Stage</th>
//                   <th className="px-5 py-3 font-semibold">Status</th>
//                   <th className="px-5 py-3 text-right font-semibold">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((a) => (
//                   <tr key={a._id || a.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                     <td className="px-5 py-3.5">
//                       {canGenerateSmartCard && ["A.M.C. Approved", "Payment Pending"].includes(a.status) && (
//                         <input
//                           type="checkbox"
//                           checked={selected.includes(a.applicationNo)}
//                           onChange={() => toggleSelected(a.applicationNo)}
//                         />
//                       )}
//                     </td>
//                     <td className="px-5 py-3.5">
//                       <div className="flex items-center gap-3">
//                         <Avatar src={a.documents?.photo || undefined} name={a.personal?.fullName} size={32} />
//                         <span className="font-semibold text-ink-900">{a.personal?.fullName}</span>
//                       </div>
//                     </td>
//                     <td className="px-5 py-3.5">
//                       <IdBadge>{a.applicationNo}</IdBadge>
//                     </td>
//                     <td className="px-5 py-3.5 text-ink-700">
//                       {a.address?.ward} &middot; {a.address?.zone}
//                     </td>
//                     <td className="px-5 py-3.5 text-ink-700">{a.status}</td>
//                     <td className="px-5 py-3.5">
//                       <StatusChip status={displayStatus(a.status)} />
//                     </td>
//                     <td className="px-5 py-3.5 text-right">
//                       <Link
//                         to={`/applications/${a.applicationNo}`}
//                         className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                       >
//                         <FiEye size={16} />
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//                 {filtered.length === 0 && (
//                   <tr>
//                     <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
//                       No applications yet. Applications appear here once a Survey Officer recommends
//                       "Approve" and forwards them to A.M.C.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// }






// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiSearch, FiEye, FiClock, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import StatusChip from "../../components/ui/StatusChip";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import { fetchVendorApplications } from "../../services/vendorApplicationService";

// const STATUS_FILTERS = ["All", "Pending Approval", "Sent Back", "Approved", "Rejected"];

// // Backend's real workflow status → the simpler display buckets this page's filter chips use
// const STATUS_DISPLAY_MAP = {
//   Draft: "Draft",
//   Submitted: "Draft",
//   "Sent Back to Vendor": "Draft",
//   "Forwarded to Survey Officer": "Draft",
//   "Sent Back to Counter Officer": "Sent Back",
//   "Survey Approved": "Pending Approval",
//   "Forwarded to A.M.C.": "Pending Approval",
//   "A.M.C. Approved": "Approved",
//   Rejected: "Rejected",
//   "Payment Pending": "Approved",
//   "Payment Done": "Approved",
//   "Certificate Issued": "Approved",
// };
// const displayStatus = (backendStatus) => STATUS_DISPLAY_MAP[backendStatus] || backendStatus;

// export default function ApplicationList() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     fetchVendorApplications({ limit: 100 }).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load applications.");
//         return;
//       }
//       // Only applications that have actually reached the A.M.C. stage (or beyond) belong in this module
//       const relevant = (result.data || []).filter((a) =>
//         ["Forwarded to A.M.C.", "Sent Back to Counter Officer", "A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(a.status)
//       );
//       setApplications(relevant);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const filtered = useMemo(
//     () =>
//       applications.filter((a) => {
//         const name = a.personal?.fullName || "";
//         const appNo = a.applicationNo || "";
//         const matchesQuery =
//           !query || name.toLowerCase().includes(query.toLowerCase()) || appNo.toLowerCase().includes(query.toLowerCase());
//         const matchesStatus = status === "All" || displayStatus(a.status) === status;
//         return matchesQuery && matchesStatus;
//       }),
//     [applications, query, status]
//   );

//   const pendingCount = applications.filter((a) => a.status === "Forwarded to A.M.C.").length;

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Application Approval</h1>
//           <p className="text-sm text-ink-500">{applications.length} applications in the workflow</p>
//         </div>
//         <Link to="/applications/pending">
//           <Button icon={FiClock} variant="accent">
//             Pending Approval ({pendingCount})
//           </Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search vendor, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => setStatus(s)}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s ? "bg-brand-500 text-white" : "bg-ink-50 text-ink-500 hover:bg-ink-100"
//                 }`}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm text-ink-400">
//             <FiLoader className="animate-spin" size={16} />
//             Loading applications...
//           </div>
//         ) : error ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
//             <FiAlertCircle size={16} />
//             {error}
//           </div>
//         ) : (
//           <div className="scrollbar-thin overflow-x-auto">
//             <table className="w-full min-w-[720px] text-left text-sm">
//               <thead>
//                 <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                   <th className="px-5 py-3 font-semibold">Vendor</th>
//                   <th className="px-5 py-3 font-semibold">Application No.</th>
//                   <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                   <th className="px-5 py-3 font-semibold">Stage</th>
//                   <th className="px-5 py-3 font-semibold">Status</th>
//                   <th className="px-5 py-3 text-right font-semibold">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((a) => (
//                   <tr key={a._id || a.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                     <td className="px-5 py-3.5">
//                       <div className="flex items-center gap-3">
//                         <Avatar src={a.documents?.photo || undefined} name={a.personal?.fullName} size={32} />
//                         <span className="font-semibold text-ink-900">{a.personal?.fullName}</span>
//                       </div>
//                     </td>
//                     <td className="px-5 py-3.5">
//                       <IdBadge>{a.applicationNo}</IdBadge>
//                     </td>
//                     <td className="px-5 py-3.5 text-ink-700">
//                       {a.address?.ward} &middot; {a.address?.zone}
//                     </td>
//                     <td className="px-5 py-3.5 text-ink-700">{a.status}</td>
//                     <td className="px-5 py-3.5">
//                       <StatusChip status={displayStatus(a.status)} />
//                     </td>
//                     <td className="px-5 py-3.5 text-right">
//                       <Link
//                         to={`/applications/${a.applicationNo}`}
//                         className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                       >
//                         <FiEye size={16} />
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//                 {filtered.length === 0 && (
//                   <tr>
//                     <td colSpan={6} className="px-5 py-12 text-center text-sm text-ink-400">
//                       No applications yet. Applications appear here once a Survey Officer recommends
//                       "Approve" and forwards them to A.M.C.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// }




// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiSearch, FiEye, FiClock, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import StatusChip from "../../components/ui/StatusChip";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import { fetchVendorApplications } from "../../services/vendorApplicationService";

// const STATUS_FILTERS = ["All", "Pending Approval", "Sent Back", "Approved", "Rejected"];

// // Backend's real workflow status → the simpler display buckets this page's filter chips use
// const STATUS_DISPLAY_MAP = {
//   Draft: "Draft",
//   Submitted: "Draft",
//   "Sent Back to Vendor": "Draft",
//   "Forwarded to Survey Officer": "Draft",
//   "Sent Back to Counter Officer": "Sent Back",
//   "Survey Approved": "Pending Approval",
//   "Forwarded to A.M.C.": "Pending Approval",
//   "A.M.C. Approved": "Approved",
//   Rejected: "Rejected",
//   "Payment Pending": "Approved",
//   "Payment Done": "Approved",
//   "Certificate Issued": "Approved",
// };
// const displayStatus = (backendStatus) => STATUS_DISPLAY_MAP[backendStatus] || backendStatus;

// export default function ApplicationList() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     fetchVendorApplications({ limit: 100 }).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load applications.");
//         return;
//       }
//       // Only applications that have actually reached the A.M.C. stage (or beyond) belong in this module
//       const relevant = (result.data || []).filter((a) =>
//         ["Forwarded to A.M.C.", "Sent Back to Counter Officer", "A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(a.status)
//       );
//       setApplications(relevant);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const filtered = useMemo(
//     () =>
//       applications.filter((a) => {
//         const name = a.personal?.fullName || "";
//         const appNo = a.applicationNo || "";
//         const matchesQuery =
//           !query || name.toLowerCase().includes(query.toLowerCase()) || appNo.toLowerCase().includes(query.toLowerCase());
//         const matchesStatus = status === "All" || displayStatus(a.status) === status;
//         return matchesQuery && matchesStatus;
//       }),
//     [applications, query, status]
//   );

//   const pendingCount = applications.filter((a) => a.status === "Forwarded to A.M.C.").length;

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Application Approval</h1>
//           <p className="text-sm text-ink-500">{applications.length} applications in the workflow</p>
//         </div>
//         <Link to="/applications/pending">
//           <Button icon={FiClock} variant="accent">
//             Pending Approval ({pendingCount})
//           </Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search vendor, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => setStatus(s)}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s ? "bg-brand-500 text-white" : "bg-ink-50 text-ink-500 hover:bg-ink-100"
//                 }`}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm text-ink-400">
//             <FiLoader className="animate-spin" size={16} />
//             Loading applications...
//           </div>
//         ) : error ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
//             <FiAlertCircle size={16} />
//             {error}
//           </div>
//         ) : (
//           <div className="scrollbar-thin overflow-x-auto">
//             <table className="w-full min-w-[720px] text-left text-sm">
//               <thead>
//                 <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                   <th className="px-5 py-3 font-semibold">Vendor</th>
//                   <th className="px-5 py-3 font-semibold">Application No.</th>
//                   <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                   <th className="px-5 py-3 font-semibold">Stage</th>
//                   <th className="px-5 py-3 font-semibold">Status</th>
//                   <th className="px-5 py-3 text-right font-semibold">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((a) => (
//                   <tr key={a._id || a.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                     <td className="px-5 py-3.5">
//                       <div className="flex items-center gap-3">
//                         <Avatar src={a.documents?.photo || undefined} name={a.personal?.fullName} size={32} />
//                         <span className="font-semibold text-ink-900">{a.personal?.fullName}</span>
//                       </div>
//                     </td>
//                     <td className="px-5 py-3.5">
//                       <IdBadge>{a.applicationNo}</IdBadge>
//                     </td>
//                     <td className="px-5 py-3.5 text-ink-700">
//                       {a.address?.ward} &middot; {a.address?.zone}
//                     </td>
//                     <td className="px-5 py-3.5 text-ink-700">{a.status}</td>
//                     <td className="px-5 py-3.5">
//                       <StatusChip status={displayStatus(a.status)} />
//                     </td>
//                     <td className="px-5 py-3.5 text-right">
//                       <Link
//                         to={`/applications/${a.applicationNo}`}
//                         className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                       >
//                         <FiEye size={16} />
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//                 {filtered.length === 0 && (
//                   <tr>
//                     <td colSpan={6} className="px-5 py-12 text-center text-sm text-ink-400">
//                       No applications yet. Applications appear here once a Survey Officer recommends
//                       "Approve" and forwards them to A.M.C.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// }



// import { useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { FiSearch, FiEye, FiClock } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import StatusChip from "../../components/ui/StatusChip";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import { selectAllApplications } from "../../features/applications/applicationsSlice";

// const STATUS_FILTERS = ["All", "Pending Approval", "Sent Back", "Approved", "Rejected"];

// export default function ApplicationList() {
//   const applications = useSelector(selectAllApplications);
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");

//   const filtered = useMemo(
//     () =>
//       applications.filter((a) => {
//         const matchesQuery =
//           !query ||
//           a.vendorName.toLowerCase().includes(query.toLowerCase()) ||
//           a.applicationNo.toLowerCase().includes(query.toLowerCase());
//         const matchesStatus = status === "All" || a.status === status;
//         return matchesQuery && matchesStatus;
//       }),
//     [applications, query, status]
//   );

//   const pendingCount = applications.filter(
//     (a) => a.currentStage === "Counter Employee" || a.currentStage === "Approval Authority"
//   ).length;

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Application Approval</h1>
//           <p className="text-sm text-ink-500">{applications.length} applications in the workflow</p>
//         </div>
//         <Link to="/applications/pending">
//           <Button icon={FiClock} variant="accent">
//             Pending Approval ({pendingCount})
//           </Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search vendor, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => setStatus(s)}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s ? "bg-brand-500 text-white" : "bg-ink-50 text-ink-500 hover:bg-ink-100"
//                 }`}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="scrollbar-thin overflow-x-auto">
//           <table className="w-full min-w-[720px] text-left text-sm">
//             <thead>
//               <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                 <th className="px-5 py-3 font-semibold">Vendor</th>
//                 <th className="px-5 py-3 font-semibold">Application No.</th>
//                 <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                 <th className="px-5 py-3 font-semibold">Stage</th>
//                 <th className="px-5 py-3 font-semibold">Status</th>
//                 <th className="px-5 py-3 text-right font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((a) => (
//                 <tr key={a.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                   <td className="px-5 py-3.5">
//                     <div className="flex items-center gap-3">
//                       <Avatar name={a.vendorName} size={32} />
//                       <span className="font-semibold text-ink-900">{a.vendorName}</span>
//                     </div>
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <IdBadge>{a.applicationNo}</IdBadge>
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-700">
//                     {a.ward} &middot; {a.zone}
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-700">{a.currentStage}</td>
//                   <td className="px-5 py-3.5">
//                     <StatusChip status={a.status} />
//                   </td>
//                   <td className="px-5 py-3.5 text-right">
//                     <Link
//                       to={`/applications/${a.id}`}
//                       className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                     >
//                       <FiEye size={16} />
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//               {filtered.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="px-5 py-12 text-center text-sm text-ink-400">
//                     No applications yet. Applications are created automatically once a survey
//                     recommends "Approve".
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </Card>
//     </div>
//   );
// }





import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiEye, FiClock, FiLoader, FiAlertCircle, FiCreditCard } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import StatusChip from "../../components/ui/StatusChip";
import Avatar from "../../components/ui/Avatar";
import { IdBadge } from "../../components/ui/Avatar";
import { fetchVendorApplications, bulkGenerateIdCards } from "../../services/vendorApplicationService";
import { useAuth } from "../auth/hooks/useAuth";

const STATUS_FILTERS = ["All", "Pending Approval", "Sent Back", "Approved", "Rejected"];

// Backend's real workflow status → the simpler display buckets this page's filter chips use
const STATUS_DISPLAY_MAP = {
  Draft: "Draft",
  Submitted: "Draft",
  "Sent Back to Vendor": "Draft",
  "Forwarded to Survey Officer": "Draft",
  "Sent Back to Counter Officer": "Sent Back",
  "Survey Approved": "Pending Approval",
  "Forwarded to A.M.C.": "Pending Approval",
  "A.M.C. Approved": "Approved",
  Rejected: "Rejected",
  "Payment Pending": "Approved",
  "Payment Done": "Approved",
  "Certificate Issued": "Approved",
};
const displayStatus = (backendStatus) => STATUS_DISPLAY_MAP[backendStatus] || backendStatus;

export default function ApplicationList() {
  const { user } = useAuth();
  // ── Generate/View Vendor ID is A.M.C.-only (29-10 request) — counter_officer,
  //    survey_officer must NOT be able to generate it, or even see the bulk controls. ──
  const canGenerateSmartCard = user?.role === "A.M.C." || user?.role === "super_admin";
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  // ── Bulk ID Card generation — for applications already "A.M.C. Approved" ──
  const [selected, setSelected] = useState([]); // array of applicationNo
  const [bulkSubmitting, setBulkSubmitting] = useState(false);
  const [bulkResult, setBulkResult] = useState(null); // { message, generatedCount, skippedCount }
  const [bulkError, setBulkError] = useState("");

  // const loadApplications = () => {
  //   setLoading(true);
  //   setError("");
  //   fetchVendorApplications({ limit: 100 }).then((result) => {
  //     setLoading(false);


  //   const loadApplications = () => {
  //   setLoading(true);
  //   setError("");
  //   fetchVendorApplications({ limit: 1 }).then((countResult) => {
  //     if (!countResult.success) {
  //       setLoading(false);
  //       setError(countResult.message || "Could not load vendor applications.");
  //       return;
  //     }
  //     const dynamicLimit = countResult.total || 1;
  //     fetchVendorApplications({ limit: dynamicLimit }).then((result) => {
  //       setLoading(false);
  //     if (!result.success) {
  //       setError(result.message || "Could not load applications.");
  //       return;
  //     }
  //     // Only applications that have actually reached the A.M.C. stage (or beyond) belong in this module
  //     const relevant = (result.data || []).filter((a) =>
  //       ["Forwarded to A.M.C.", "Sent Back to Counter Officer", "A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(a.status)
  //     );
  //     setApplications(relevant);
  //   });
  // };


    const loadApplications = () => {
    setLoading(true);
    setError("");
    fetchVendorApplications({ limit: 1 }).then((countResult) => {
      if (!countResult.success) {
        setLoading(false);
        setError(countResult.message || "Could not load vendor applications.");
        return;
      }
      const dynamicLimit = countResult.total || 1;
      fetchVendorApplications({ limit: dynamicLimit }).then((result) => {
        setLoading(false);
        if (!result.success) {
          setError(result.message || "Could not load applications.");
          return;
        }
        // Only applications that have actually reached the A.M.C. stage (or beyond) belong in this module
        const relevant = (result.data || []).filter((a) =>
          ["Forwarded to A.M.C.", "Sent Back to Counter Officer", "A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(a.status)
        );
        setApplications(relevant);
      });
    });
  };

  useEffect(() => {
    loadApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Approved applications eligible for ID Card generation ──
  const approvedNos = useMemo(
    () =>
      canGenerateSmartCard
        ? applications.filter((a) => ["A.M.C. Approved", "Payment Pending"].includes(a.status)).map((a) => a.applicationNo)
        : [],
    [applications, canGenerateSmartCard]
  );

  const toggleSelected = (applicationNo) => {
    setSelected((prev) =>
      prev.includes(applicationNo) ? prev.filter((n) => n !== applicationNo) : [...prev, applicationNo]
    );
  };

  const toggleSelectAllApproved = () => {
    setSelected((prev) => (prev.length === approvedNos.length ? [] : approvedNos));
  };

  const handleBulkGenerate = async () => {
    if (selected.length === 0) return;
    setBulkError("");
    setBulkResult(null);
    setBulkSubmitting(true);
    const result = await bulkGenerateIdCards(selected);
    setBulkSubmitting(false);
    if (!result.success) {
      setBulkError(result.message || "Bulk ID card generation failed.");
      return;
    }
    setBulkResult(result);
    setSelected([]);
    loadApplications();
  };

  const filtered = useMemo(
    () =>
      applications.filter((a) => {
        const name = a.personal?.fullName || "";
        const appNo = a.applicationNo || "";
        const matchesQuery =
          !query || name.toLowerCase().includes(query.toLowerCase()) || appNo.toLowerCase().includes(query.toLowerCase());
        const matchesStatus = status === "All" || displayStatus(a.status) === status;
        return matchesQuery && matchesStatus;
      }),
    [applications, query, status]
  );

  const pendingCount = applications.filter((a) => a.status === "Forwarded to A.M.C.").length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-ink-900">Application Approval</h1>
          <p className="text-sm text-ink-500">{applications.length} applications in the workflow</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canGenerateSmartCard && (
            <Link to="/smart-card/bulk">
              <Button icon={FiCreditCard} variant="outline">
                Bulk Print / Download
              </Button>
            </Link>
          )}
          <Link to="/applications/pending">
            <Button icon={FiClock} variant="accent">
              Pending Approval ({pendingCount})
            </Button>
          </Link>
        </div>
      </div>

      {approvedNos.length > 0 && (
        <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-ink-900">Bulk ID Card Generation</p>
            <p className="text-xs text-ink-500">
              Select A.M.C. Approved applications below and generate their ID Cards together — no payment required.
              {selected.length > 0 && <span className="font-semibold text-brand-600"> {selected.length} selected.</span>}
            </p>
            {bulkError && <p className="mt-1 text-xs font-medium text-danger-500">{bulkError}</p>}
            {bulkResult && (
              <p className="mt-1 text-xs font-medium text-success-600">
                {bulkResult.generatedCount} ID card(s) generated, {bulkResult.skippedCount} skipped.
              </p>
            )}
          </div>
          <Button
            icon={FiCreditCard}
            variant="success"
            onClick={handleBulkGenerate}
            disabled={selected.length === 0 || bulkSubmitting}
          >
            {bulkSubmitting ? "Generating..." : `Generate ID Cards (${selected.length})`}
          </Button>
        </Card>
      )}

      <Card padded={false} className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-72">
            <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search vendor, application no."
              className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  status === s ? "bg-brand-500 text-white" : "bg-ink-50 text-ink-500 hover:bg-ink-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm text-ink-400">
            <FiLoader className="animate-spin" size={16} />
            Loading applications...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
            <FiAlertCircle size={16} />
            {error}
          </div>
        ) : (
          <div className="scrollbar-thin overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
                  <th className="w-8 px-5 py-3">
                    {approvedNos.length > 0 && (
                      <input
                        type="checkbox"
                        checked={selected.length === approvedNos.length && approvedNos.length > 0}
                        onChange={toggleSelectAllApproved}
                        title="Select all approved"
                      />
                    )}
                  </th>
                  <th className="px-5 py-3 font-semibold">Vendor</th>
                  <th className="px-5 py-3 font-semibold">Application No.</th>
                  <th className="px-5 py-3 font-semibold">Ward / Zone</th>
                  <th className="px-5 py-3 font-semibold">Stage</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a._id || a.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
                    <td className="px-5 py-3.5">
                      {canGenerateSmartCard && ["A.M.C. Approved", "Payment Pending"].includes(a.status) && (
                        <input
                          type="checkbox"
                          checked={selected.includes(a.applicationNo)}
                          onChange={() => toggleSelected(a.applicationNo)}
                        />
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar src={a.documents?.photo || undefined} name={a.personal?.fullName} size={32} />
                        <span className="font-semibold text-ink-900">{a.personal?.fullName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <IdBadge>{a.applicationNo}</IdBadge>
                    </td>
                    <td className="px-5 py-3.5 text-ink-700">
                      {a.address?.ward} &middot; {a.address?.zone}
                    </td>
                    <td className="px-5 py-3.5 text-ink-700">{a.status}</td>
                    <td className="px-5 py-3.5">
                      <StatusChip status={displayStatus(a.status)} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        to={`/applications/${a.applicationNo}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
                      >
                        <FiEye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
                      No applications yet. Applications appear here once a Survey Officer recommends
                      "Approve" and forwards them to A.M.C.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}