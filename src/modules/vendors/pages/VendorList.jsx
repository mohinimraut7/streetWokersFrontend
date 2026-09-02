// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiPlus, FiSearch, FiEye, FiChevronLeft, FiChevronRight, FiLoader, FiAlertCircle,FiTrash2} from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { deleteVendorApplication, fetchVendorApplications } from "../../../services/vendorApplicationService";
// import { useAuth } from "../../auth/hooks/useAuth";




// const PAGE_SIZE = 6;
// const STATUS_FILTERS = ["All", "Pending Survey", "Under Survey", "Pending Approval", "Approved", "Rejected"];

// // ── Backend's real workflow status → the simpler display buckets this page's filter chips use ──
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

// // export default function VendorList() {
// //   const [applications, setApplications] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [query, setQuery] = useState("");
// //   const [status, setStatus] = useState("All");
// //   const [page, setPage] = useState(1);

// export default function VendorList() {
//   const { user } = useAuth();
//   const canDelete = user?.role === "counter_officer" || user?.role === "super_admin";
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);
//   const [deletingNo, setDeletingNo] = useState(null);

//   const handleDelete = async (applicationNo, name) => {
//     if (!window.confirm(`Delete ${name}'s registration (${applicationNo})? This cannot be undone.`)) return;
//     setDeletingNo(applicationNo);
//     const result = await deleteVendorApplication(applicationNo);
//     setDeletingNo(null);
//     if (!result.success) {
//       alert(result.message || "Could not delete this application.");
//       return;
//     }
//     setApplications((prev) => prev.filter((v) => v.applicationNo !== applicationNo));
//   };

//   // useEffect(() => {
//   //   let cancelled = false;
//   //   setLoading(true);
//   //   setError("");
//   //   fetchVendorApplications({ limit: 100 }).then((result) => {
//   //     if (cancelled) return;
//   //     setLoading(false);
//   //     if (!result.success) {
//   //       setError(result.message || "Could not load vendor applications.");
//   //       return;
//   //     }
//   //     setApplications(result.data || []);
//   //   });
//   //   return () => {
//   //     cancelled = true;
//   //   };
//   // }, []);

  
//     useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     fetchVendorApplications({ limit: 1 }).then((countResult) => {
//       if (cancelled) return;
//       if (!countResult.success) {
//         setLoading(false);
//         setError(countResult.message || "Could not load vendor applications.");
//         return;
//       }
//       const dynamicLimit = countResult.total || 1;
//       fetchVendorApplications({ limit: dynamicLimit }).then((result) => {
//         if (cancelled) return;
//         setLoading(false);
//         if (!result.success) {
//           setError(result.message || "Could not load vendor applications.");
//           return;
//         }
//         setApplications(result.data || []);
//       });
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);
  
  
  
//   const filtered = useMemo(() => {
//     return applications.filter((v) => {
//       const name = v.personal?.fullName || "";
//       const vendorId = v.vendorId || "";
//       const appNo = v.applicationNo || "";
//       const matchesQuery =
//         !query ||
//         name.toLowerCase().includes(query.toLowerCase()) ||
//         vendorId.toLowerCase().includes(query.toLowerCase()) ||
//         appNo.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = status === "All" || displayStatus(v.status) === status;
//       return matchesQuery && matchesStatus;
//     });
//   }, [applications, query, status]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);


//   // Returns a compact list of page numbers with "..." for gaps, e.g. [1, "...", 27, 28, 29, "...", 267]
// function getPageNumbers(current, total, siblingCount = 1) {
//   const totalNumbers = siblingCount * 2 + 5; // first, last, current, 2 dots, siblings
//   if (total <= totalNumbers) {
//     return Array.from({ length: total }, (_, i) => i + 1);
//   }

//   const leftSibling = Math.max(current - siblingCount, 1);
//   const rightSibling = Math.min(current + siblingCount, total);

//   const showLeftDots = leftSibling > 2;
//   const showRightDots = rightSibling < total - 1;

//   const pages = [];

//   if (!showLeftDots && showRightDots) {
//     const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => i + 1);
//     pages.push(...leftRange, "...", total);
//   } else if (showLeftDots && !showRightDots) {
//     const rightRange = Array.from(
//       { length: 3 + siblingCount * 2 },
//       (_, i) => total - (3 + siblingCount * 2) + i + 1
//     );
//     pages.push(1, "...", ...rightRange);
//   } else {
//     const middleRange = Array.from(
//       { length: rightSibling - leftSibling + 1 },
//       (_, i) => leftSibling + i
//     );
//     pages.push(1, "...", ...middleRange, "...", total);
//   }

//   return pages;
// }

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Registered Vendors</h1>
//           <p className="text-sm text-ink-500">{filtered.length} vendors found</p>
//         </div>
//         <Link to="/vendors/register">
//           <Button icon={FiPlus}>New Registration</Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search name, vendor ID, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => {
//                   setStatus(s);
//                   setPage(1);
//                 }}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s
//                     ? "bg-brand-500 text-white"
//                     : "bg-ink-50 text-ink-500 hover:bg-ink-100"
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
//             Loading vendor applications...
//           </div>
//         ) : error ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
//             <FiAlertCircle size={16} />
//             {error}
//           </div>
//         ) : (
//           <>
//             <div className="scrollbar-thin overflow-x-auto">
//               <table className="w-full min-w-[720px] text-left text-sm">
//                 <thead>
//                   <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                     <th className="px-5 py-3 font-semibold">Vendor</th>
//                     <th className="px-5 py-3 font-semibold">Vendor ID</th>
//                     <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                     <th className="px-5 py-3 font-semibold">Category</th>
//                     <th className="px-5 py-3 font-semibold">Status</th>
//                     <th className="px-5 py-3 font-semibold">Registered</th>
//                     <th className="px-5 py-3 text-right font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pageItems.map((v) => (
//                     <tr key={v._id || v.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                       <td className="px-5 py-3.5">
//                         <div className="flex items-center gap-3">
//                           <Avatar src={v.documents?.photo || undefined} name={v.personal?.fullName} size={34} />
//                           <div>
//                             <p className="font-semibold text-ink-900">{v.personal?.fullName}</p>
//                             <p className="text-xs text-ink-500">{v.personal?.mobile}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-5 py-3.5">
//                         <IdBadge>{v.vendorId}</IdBadge>
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">
//                         {v.address?.ward} &middot; {v.address?.zone}
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">{v.business?.businessType}</td>
//                       <td className="px-5 py-3.5">
//                         <StatusChip status={displayStatus(v.status)} />
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-500">{v.createdAt?.slice(0, 10)}</td>
//                       <td className="px-5 py-3.5 text-right">
//                         <Link
//                           to={`/vendors/profile/${v.applicationNo}`}
//                           className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                         >
//                           <FiEye size={16} />
//                         </Link>
//                       </td>

//                       {/* <td className="px-5 py-3.5 text-right">
//                         <div className="inline-flex items-center gap-1">
//                           <Link
//                             to={`/vendors/profile/${v.applicationNo}`}
//                             className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                           >
//                             <FiEye size={16} />
//                           </Link>
//                           {canDelete && (
//                             <button
//                               type="button"
//                               onClick={() => handleDelete(v.applicationNo, v.personal?.fullName || "this vendor")}
//                               disabled={deletingNo === v.applicationNo}
//                               className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-50 hover:text-danger-500 disabled:opacity-50"
//                             >
//                               {deletingNo === v.applicationNo ? (
//                                 <FiLoader size={16} className="animate-spin" />
//                               ) : (
//                                 <FiTrash2 size={16} />
//                               )}
//                             </button>
//                           )}
//                         </div>
//                       </td> */}
//                     </tr>
//                   ))}
//                   {pageItems.length === 0 && (
//                     <tr>
//                       <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
//                         No vendors match your search.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//               <p className="text-xs text-ink-500">
//                 Page {page} of {totalPages}
//               </p>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronLeft size={15} />
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                       p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronRight size={15} />
//                 </button>
//               </div>
//             </div> */}


//                         <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//               <p className="text-xs text-ink-500">
//                 Page {page} of {totalPages}
//               </p>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronLeft size={15} />
//                 </button>

//                 {getPageNumbers(page, totalPages).map((p, idx) =>
//                   p === "..." ? (
//                     <span key={`dots-${idx}`} className="px-1 text-xs text-ink-400">
//                       …
//                     </span>
//                   ) : (
//                     <button
//                       key={p}
//                       onClick={() => setPage(p)}
//                       className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                         p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                       }`}
//                     >
//                       {p}
//                     </button>
//                   )
//                 )}

//                 <button
//                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronRight size={15} />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </Card>
//     </div>
//   );
// }






// import { useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { FiPlus, FiSearch, FiEye, FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";

// const PAGE_SIZE = 6;
// const STATUS_FILTERS = ["All", "Pending Survey", "Under Survey", "Pending Approval", "Approved", "Rejected"];

// export default function VendorList() {
//   const vendors = useSelector(selectAllVendors);
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);

//   const filtered = useMemo(() => {
//     return vendors.filter((v) => {
//       const matchesQuery =
//         !query ||
//         v.personal.fullName.toLowerCase().includes(query.toLowerCase()) ||
//         v.vendorId.toLowerCase().includes(query.toLowerCase()) ||
//         v.applicationNo.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = status === "All" || v.status === status;
//       return matchesQuery && matchesStatus;
//     });
//   }, [vendors, query, status]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Registered Vendors</h1>
//           <p className="text-sm text-ink-500">{filtered.length} vendors found</p>
//         </div>
//         <Link to="/vendors/register">
//           <Button icon={FiPlus}>New Registration</Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search name, vendor ID, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => {
//                   setStatus(s);
//                   setPage(1);
//                 }}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s
//                     ? "bg-brand-500 text-white"
//                     : "bg-ink-50 text-ink-500 hover:bg-ink-100"
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
//                 <th className="px-5 py-3 font-semibold">Vendor ID</th>
//                 <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                 <th className="px-5 py-3 font-semibold">Category</th>
//                 <th className="px-5 py-3 font-semibold">Status</th>
//                 <th className="px-5 py-3 font-semibold">Registered</th>
//                 <th className="px-5 py-3 text-right font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pageItems.map((v) => (
//                 <tr key={v.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                   <td className="px-5 py-3.5">
//                     <div className="flex items-center gap-3">
//                       <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={34} />
//                       <div>
//                         <p className="font-semibold text-ink-900">{v.personal.fullName}</p>
//                         <p className="text-xs text-ink-500">{v.personal.mobile}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <IdBadge>{v.vendorId}</IdBadge>
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-700">
//                     {v.address.ward} &middot; {v.address.zone}
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-700">{v.business.businessCategory}</td>
//                   <td className="px-5 py-3.5">
//                     <StatusChip status={v.status} />
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-500">{v.registrationDate}</td>
//                   <td className="px-5 py-3.5 text-right">
//                     <Link
//                       to={`/vendors/profile/${v.id}`}
//                       className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                     >
//                       <FiEye size={16} />
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//               {pageItems.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
//                     No vendors match your search.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//           <p className="text-xs text-ink-500">
//             Page {page} of {totalPages}
//           </p>
//           <div className="flex items-center gap-1.5">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//             >
//               <FiChevronLeft size={15} />
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//               <button
//                 key={p}
//                 onClick={() => setPage(p)}
//                 className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                   p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                 }`}
//               >
//                 {p}
//               </button>
//             ))}
//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//             >
//               <FiChevronRight size={15} />
//             </button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }





// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiPlus, FiSearch, FiEye, FiChevronLeft, FiChevronRight, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { fetchVendorApplications } from "../../../services/vendorApplicationService";

// const PAGE_SIZE = 6;
// const STATUS_FILTERS = ["All", "Pending Survey", "Under Survey", "Pending Approval", "Approved", "Rejected"];

// // ── Backend's real workflow status → the simpler display buckets this page's filter chips use ──
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

// export default function VendorList() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     fetchVendorApplications({ limit: 100 }).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load vendor applications.");
//         return;
//       }
//       setApplications(result.data || []);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const filtered = useMemo(() => {
//     return applications.filter((v) => {
//       const name = v.personal?.fullName || "";
//       const vendorId = v.vendorId || "";
//       const appNo = v.applicationNo || "";
//       const matchesQuery =
//         !query ||
//         name.toLowerCase().includes(query.toLowerCase()) ||
//         vendorId.toLowerCase().includes(query.toLowerCase()) ||
//         appNo.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = status === "All" || displayStatus(v.status) === status;
//       return matchesQuery && matchesStatus;
//     });
//   }, [applications, query, status]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Registered Vendors</h1>
//           <p className="text-sm text-ink-500">{filtered.length} vendors found</p>
//         </div>
//         <Link to="/vendors/register">
//           <Button icon={FiPlus}>New Registration</Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search name, vendor ID, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => {
//                   setStatus(s);
//                   setPage(1);
//                 }}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s
//                     ? "bg-brand-500 text-white"
//                     : "bg-ink-50 text-ink-500 hover:bg-ink-100"
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
//             Loading vendor applications...
//           </div>
//         ) : error ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
//             <FiAlertCircle size={16} />
//             {error}
//           </div>
//         ) : (
//           <>
//             <div className="scrollbar-thin overflow-x-auto">
//               <table className="w-full min-w-[720px] text-left text-sm">
//                 <thead>
//                   <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                     <th className="px-5 py-3 font-semibold">Vendor</th>
//                     <th className="px-5 py-3 font-semibold">Vendor ID</th>
//                     <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                     <th className="px-5 py-3 font-semibold">Category</th>
//                     <th className="px-5 py-3 font-semibold">Status</th>
//                     <th className="px-5 py-3 font-semibold">Registered</th>
//                     <th className="px-5 py-3 text-right font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pageItems.map((v) => (
//                     <tr key={v._id || v.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                       <td className="px-5 py-3.5">
//                         <div className="flex items-center gap-3">
//                           <Avatar src={v.documents?.photo || undefined} name={v.personal?.fullName} size={34} />
//                           <div>
//                             <p className="font-semibold text-ink-900">{v.personal?.fullName}</p>
//                             <p className="text-xs text-ink-500">{v.personal?.mobile}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-5 py-3.5">
//                         <IdBadge>{v.vendorId}</IdBadge>
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">
//                         {v.address?.ward} &middot; {v.address?.zone}
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">{v.business?.businessCategory}</td>
//                       <td className="px-5 py-3.5">
//                         <StatusChip status={displayStatus(v.status)} />
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-500">{v.createdAt?.slice(0, 10)}</td>
//                       <td className="px-5 py-3.5 text-right">
//                         <Link
//                           to={`/vendors/profile/${v.applicationNo}`}
//                           className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                         >
//                           <FiEye size={16} />
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                   {pageItems.length === 0 && (
//                     <tr>
//                       <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
//                         No vendors match your search.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//               <p className="text-xs text-ink-500">
//                 Page {page} of {totalPages}
//               </p>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronLeft size={15} />
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                       p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronRight size={15} />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </Card>
//     </div>
//   );
// }


// ======================================

// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiPlus, FiSearch, FiEye, FiChevronLeft, FiChevronRight, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { fetchVendorApplications } from "../../../services/vendorApplicationService";

// const PAGE_SIZE = 6;
// const STATUS_FILTERS = ["All", "Pending Survey", "Under Survey", "Pending Approval", "Approved", "Rejected"];

// // ── Backend's real workflow status → the simpler display buckets this page's filter chips use ──
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

// export default function VendorList() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     fetchVendorApplications({ limit: 100 }).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load vendor applications.");
//         return;
//       }
//       setApplications(result.data || []);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const filtered = useMemo(() => {
//     return applications.filter((v) => {
//       const name = v.personal?.fullName || "";
//       const vendorId = v.vendorId || "";
//       const appNo = v.applicationNo || "";
//       const matchesQuery =
//         !query ||
//         name.toLowerCase().includes(query.toLowerCase()) ||
//         vendorId.toLowerCase().includes(query.toLowerCase()) ||
//         appNo.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = status === "All" || displayStatus(v.status) === status;
//       return matchesQuery && matchesStatus;
//     });
//   }, [applications, query, status]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Registered Vendors</h1>
//           <p className="text-sm text-ink-500">{filtered.length} vendors found</p>
//         </div>
//         <Link to="/vendors/register">
//           <Button icon={FiPlus}>New Registration</Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search name, vendor ID, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => {
//                   setStatus(s);
//                   setPage(1);
//                 }}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s
//                     ? "bg-brand-500 text-white"
//                     : "bg-ink-50 text-ink-500 hover:bg-ink-100"
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
//             Loading vendor applications...
//           </div>
//         ) : error ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
//             <FiAlertCircle size={16} />
//             {error}
//           </div>
//         ) : (
//           <>
//             <div className="scrollbar-thin overflow-x-auto">
//               <table className="w-full min-w-[720px] text-left text-sm">
//                 <thead>
//                   <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                     <th className="px-5 py-3 font-semibold">Vendor</th>
//                     <th className="px-5 py-3 font-semibold">Vendor ID</th>
//                     <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                     <th className="px-5 py-3 font-semibold">Category</th>
//                     <th className="px-5 py-3 font-semibold">Status</th>
//                     <th className="px-5 py-3 font-semibold">Registered</th>
//                     <th className="px-5 py-3 text-right font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pageItems.map((v) => (
//                     <tr key={v._id || v.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                       <td className="px-5 py-3.5">
//                         <div className="flex items-center gap-3">
//                           <Avatar src={v.documents?.photo || undefined} name={v.personal?.fullName} size={34} />
//                           <div>
//                             <p className="font-semibold text-ink-900">{v.personal?.fullName}</p>
//                             <p className="text-xs text-ink-500">{v.personal?.mobile}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-5 py-3.5">
//                         <IdBadge>{v.vendorId}</IdBadge>
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">
//                         {v.address?.ward} &middot; {v.address?.zone}
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">{v.business?.businessCategory}</td>
//                       <td className="px-5 py-3.5">
//                         <StatusChip status={displayStatus(v.status)} />
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-500">{v.createdAt?.slice(0, 10)}</td>
//                       <td className="px-5 py-3.5 text-right">
//                         <Link
//                           to={`/vendors/profile/${v.applicationNo}`}
//                           className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                         >
//                           <FiEye size={16} />
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                   {pageItems.length === 0 && (
//                     <tr>
//                       <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
//                         No vendors match your search.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//               <p className="text-xs text-ink-500">
//                 Page {page} of {totalPages}
//               </p>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronLeft size={15} />
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                       p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronRight size={15} />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </Card>
//     </div>
//   );
// }


// ============================


// import { useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { FiPlus, FiSearch, FiEye, FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";

// const PAGE_SIZE = 6;
// const STATUS_FILTERS = ["All", "Pending Survey", "Under Survey", "Pending Approval", "Approved", "Rejected"];

// export default function VendorList() {
//   const vendors = useSelector(selectAllVendors);
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);

//   const filtered = useMemo(() => {
//     return vendors.filter((v) => {
//       const matchesQuery =
//         !query ||
//         v.personal.fullName.toLowerCase().includes(query.toLowerCase()) ||
//         v.vendorId.toLowerCase().includes(query.toLowerCase()) ||
//         v.applicationNo.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = status === "All" || v.status === status;
//       return matchesQuery && matchesStatus;
//     });
//   }, [vendors, query, status]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Registered Vendors</h1>
//           <p className="text-sm text-ink-500">{filtered.length} vendors found</p>
//         </div>
//         <Link to="/vendors/register">
//           <Button icon={FiPlus}>New Registration</Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search name, vendor ID, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => {
//                   setStatus(s);
//                   setPage(1);
//                 }}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s
//                     ? "bg-brand-500 text-white"
//                     : "bg-ink-50 text-ink-500 hover:bg-ink-100"
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
//                 <th className="px-5 py-3 font-semibold">Vendor ID</th>
//                 <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                 <th className="px-5 py-3 font-semibold">Category</th>
//                 <th className="px-5 py-3 font-semibold">Status</th>
//                 <th className="px-5 py-3 font-semibold">Registered</th>
//                 <th className="px-5 py-3 text-right font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pageItems.map((v) => (
//                 <tr key={v.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                   <td className="px-5 py-3.5">
//                     <div className="flex items-center gap-3">
//                       <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={34} />
//                       <div>
//                         <p className="font-semibold text-ink-900">{v.personal.fullName}</p>
//                         <p className="text-xs text-ink-500">{v.personal.mobile}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <IdBadge>{v.vendorId}</IdBadge>
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-700">
//                     {v.address.ward} &middot; {v.address.zone}
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-700">{v.business.businessCategory}</td>
//                   <td className="px-5 py-3.5">
//                     <StatusChip status={v.status} />
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-500">{v.registrationDate}</td>
//                   <td className="px-5 py-3.5 text-right">
//                     <Link
//                       to={`/vendors/profile/${v.id}`}
//                       className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                     >
//                       <FiEye size={16} />
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//               {pageItems.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
//                     No vendors match your search.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//           <p className="text-xs text-ink-500">
//             Page {page} of {totalPages}
//           </p>
//           <div className="flex items-center gap-1.5">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//             >
//               <FiChevronLeft size={15} />
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//               <button
//                 key={p}
//                 onClick={() => setPage(p)}
//                 className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                   p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                 }`}
//               >
//                 {p}
//               </button>
//             ))}
//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//             >
//               <FiChevronRight size={15} />
//             </button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }





// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiPlus, FiSearch, FiEye, FiChevronLeft, FiChevronRight, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { fetchVendorApplications } from "../../../services/vendorApplicationService";

// const PAGE_SIZE = 6;
// const STATUS_FILTERS = ["All", "Pending Survey", "Under Survey", "Pending Approval", "Approved", "Rejected"];

// // ── Backend's real workflow status → the simpler display buckets this page's filter chips use ──
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

// export default function VendorList() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     fetchVendorApplications({ limit: 100 }).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load vendor applications.");
//         return;
//       }
//       setApplications(result.data || []);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const filtered = useMemo(() => {
//     return applications.filter((v) => {
//       const name = v.personal?.fullName || "";
//       const vendorId = v.vendorId || "";
//       const appNo = v.applicationNo || "";
//       const matchesQuery =
//         !query ||
//         name.toLowerCase().includes(query.toLowerCase()) ||
//         vendorId.toLowerCase().includes(query.toLowerCase()) ||
//         appNo.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = status === "All" || displayStatus(v.status) === status;
//       return matchesQuery && matchesStatus;
//     });
//   }, [applications, query, status]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Registered Vendors</h1>
//           <p className="text-sm text-ink-500">{filtered.length} vendors found</p>
//         </div>
//         <Link to="/vendors/register">
//           <Button icon={FiPlus}>New Registration</Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search name, vendor ID, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => {
//                   setStatus(s);
//                   setPage(1);
//                 }}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s
//                     ? "bg-brand-500 text-white"
//                     : "bg-ink-50 text-ink-500 hover:bg-ink-100"
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
//             Loading vendor applications...
//           </div>
//         ) : error ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
//             <FiAlertCircle size={16} />
//             {error}
//           </div>
//         ) : (
//           <>
//             <div className="scrollbar-thin overflow-x-auto">
//               <table className="w-full min-w-[720px] text-left text-sm">
//                 <thead>
//                   <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                     <th className="px-5 py-3 font-semibold">Vendor</th>
//                     <th className="px-5 py-3 font-semibold">Vendor ID</th>
//                     <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                     <th className="px-5 py-3 font-semibold">Category</th>
//                     <th className="px-5 py-3 font-semibold">Status</th>
//                     <th className="px-5 py-3 font-semibold">Registered</th>
//                     <th className="px-5 py-3 text-right font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pageItems.map((v) => (
//                     <tr key={v._id || v.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                       <td className="px-5 py-3.5">
//                         <div className="flex items-center gap-3">
//                           <Avatar src={v.documents?.photo || undefined} name={v.personal?.fullName} size={34} />
//                           <div>
//                             <p className="font-semibold text-ink-900">{v.personal?.fullName}</p>
//                             <p className="text-xs text-ink-500">{v.personal?.mobile}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-5 py-3.5">
//                         <IdBadge>{v.vendorId}</IdBadge>
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">
//                         {v.address?.ward} &middot; {v.address?.zone}
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">{v.business?.businessType}</td>
//                       <td className="px-5 py-3.5">
//                         <StatusChip status={displayStatus(v.status)} />
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-500">{v.createdAt?.slice(0, 10)}</td>
//                       <td className="px-5 py-3.5 text-right">
//                         <Link
//                           to={`/vendors/profile/${v.applicationNo}`}
//                           className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                         >
//                           <FiEye size={16} />
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                   {pageItems.length === 0 && (
//                     <tr>
//                       <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
//                         No vendors match your search.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//               <p className="text-xs text-ink-500">
//                 Page {page} of {totalPages}
//               </p>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronLeft size={15} />
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                       p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronRight size={15} />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </Card>
//     </div>
//   );
// }




// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiPlus, FiSearch, FiEye, FiChevronLeft, FiChevronRight, FiLoader, FiAlertCircle,FiTrash2, FiDownload} from "react-icons/fi";
// import * as XLSX from "xlsx";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { deleteVendorApplication, fetchVendorApplications } from "../../../services/vendorApplicationService";
// import { useAuth } from "../../auth/hooks/useAuth";




// const PAGE_SIZE = 6;
// const STATUS_FILTERS = ["All", "Pending Survey", "Under Survey", "Pending Approval", "Approved", "Rejected"];

// // ── Backend's real workflow status → the simpler display buckets this page's filter chips use ──
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

// // export default function VendorList() {
// //   const [applications, setApplications] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [query, setQuery] = useState("");
// //   const [status, setStatus] = useState("All");
// //   const [page, setPage] = useState(1);

// export default function VendorList() {
//   const { user } = useAuth();
//   const canDelete = user?.role === "counter_officer" || user?.role === "super_admin";
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);
//   const [deletingNo, setDeletingNo] = useState(null);

//   const handleDelete = async (applicationNo, name) => {
//     if (!window.confirm(`Delete ${name}'s registration (${applicationNo})? This cannot be undone.`)) return;
//     setDeletingNo(applicationNo);
//     const result = await deleteVendorApplication(applicationNo);
//     setDeletingNo(null);
//     if (!result.success) {
//       alert(result.message || "Could not delete this application.");
//       return;
//     }
//     setApplications((prev) => prev.filter((v) => v.applicationNo !== applicationNo));
//   };

//   // ── Reports Excel Download — exports the vendor list currently on screen (respects the
//   //    officer's own ward scoping from the backend, plus whatever search/status filter is
//   //    applied here) with each vendor's full info and status. ──
//   const handleExportExcel = () => {
//     const rows = filtered.map((v) => ({
//       "Application No": v.applicationNo || "",
//       "Vendor ID": v.vendorId || "",
//       "Full Name": v.personal?.fullName || "",
//       "Mobile": v.personal?.mobile || "",
//       "Ward": v.address?.ward || "",
//       "Zone": v.address?.zone || "",
//       "Business Type": v.business?.businessType || "",
//       "Status": displayStatus(v.status),
//       "Payment Status": v.payment?.status || "",
//       "Payment Amount": v.payment?.amount ?? "",
//       "Certificate No": v.certificate?.certificateNo || "",
//       "Registered On": v.createdAt ? v.createdAt.slice(0, 10) : "",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(rows);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Vendors");
//     const dateStr = new Date().toISOString().slice(0, 10);
//     XLSX.writeFile(workbook, `Vendor-Report-${dateStr}.xlsx`);
//   };

//   // useEffect(() => {
//   //   let cancelled = false;
//   //   setLoading(true);
//   //   setError("");
//   //   fetchVendorApplications({ limit: 100 }).then((result) => {
//   //     if (cancelled) return;
//   //     setLoading(false);
//   //     if (!result.success) {
//   //       setError(result.message || "Could not load vendor applications.");
//   //       return;
//   //     }
//   //     setApplications(result.data || []);
//   //   });
//   //   return () => {
//   //     cancelled = true;
//   //   };
//   // }, []);

  
//     useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     fetchVendorApplications({ limit: 1 }).then((countResult) => {
//       if (cancelled) return;
//       if (!countResult.success) {
//         setLoading(false);
//         setError(countResult.message || "Could not load vendor applications.");
//         return;
//       }
//       const dynamicLimit = countResult.total || 1;
//       fetchVendorApplications({ limit: dynamicLimit }).then((result) => {
//         if (cancelled) return;
//         setLoading(false);
//         if (!result.success) {
//           setError(result.message || "Could not load vendor applications.");
//           return;
//         }
//         setApplications(result.data || []);
//       });
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);
  
  
  
//   const filtered = useMemo(() => {
//     return applications.filter((v) => {
//       const name = v.personal?.fullName || "";
//       const vendorId = v.vendorId || "";
//       const appNo = v.applicationNo || "";
//       const matchesQuery =
//         !query ||
//         name.toLowerCase().includes(query.toLowerCase()) ||
//         vendorId.toLowerCase().includes(query.toLowerCase()) ||
//         appNo.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = status === "All" || displayStatus(v.status) === status;
//       return matchesQuery && matchesStatus;
//     });
//   }, [applications, query, status]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);


//   // Returns a compact list of page numbers with "..." for gaps, e.g. [1, "...", 27, 28, 29, "...", 267]
// function getPageNumbers(current, total, siblingCount = 1) {
//   const totalNumbers = siblingCount * 2 + 5; // first, last, current, 2 dots, siblings
//   if (total <= totalNumbers) {
//     return Array.from({ length: total }, (_, i) => i + 1);
//   }

//   const leftSibling = Math.max(current - siblingCount, 1);
//   const rightSibling = Math.min(current + siblingCount, total);

//   const showLeftDots = leftSibling > 2;
//   const showRightDots = rightSibling < total - 1;

//   const pages = [];

//   if (!showLeftDots && showRightDots) {
//     const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => i + 1);
//     pages.push(...leftRange, "...", total);
//   } else if (showLeftDots && !showRightDots) {
//     const rightRange = Array.from(
//       { length: 3 + siblingCount * 2 },
//       (_, i) => total - (3 + siblingCount * 2) + i + 1
//     );
//     pages.push(1, "...", ...rightRange);
//   } else {
//     const middleRange = Array.from(
//       { length: rightSibling - leftSibling + 1 },
//       (_, i) => leftSibling + i
//     );
//     pages.push(1, "...", ...middleRange, "...", total);
//   }

//   return pages;
// }

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Registered Vendors</h1>
//           <p className="text-sm text-ink-500">{filtered.length} vendors found</p>
//         </div>
//         <div className="flex flex-wrap items-center gap-2.5">
//           <Button icon={FiDownload} variant="outline" onClick={handleExportExcel}>
//             Reports Excel Download
//           </Button>
//           <Link to="/vendors/register">
//             <Button icon={FiPlus}>New Registration</Button>
//           </Link>
//         </div>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search name, vendor ID, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => {
//                   setStatus(s);
//                   setPage(1);
//                 }}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s
//                     ? "bg-brand-500 text-white"
//                     : "bg-ink-50 text-ink-500 hover:bg-ink-100"
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
//             Loading vendor applications...
//           </div>
//         ) : error ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
//             <FiAlertCircle size={16} />
//             {error}
//           </div>
//         ) : (
//           <>
//             <div className="scrollbar-thin overflow-x-auto">
//               <table className="w-full min-w-[720px] text-left text-sm">
//                 <thead>
//                   <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                     <th className="px-5 py-3 font-semibold">Vendor</th>
//                     <th className="px-5 py-3 font-semibold">Vendor ID</th>
//                     <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                     <th className="px-5 py-3 font-semibold">Category</th>
//                     <th className="px-5 py-3 font-semibold">Status</th>
//                     <th className="px-5 py-3 font-semibold">Registered</th>
//                     <th className="px-5 py-3 text-right font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pageItems.map((v) => (
//                     <tr key={v._id || v.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                       <td className="px-5 py-3.5">
//                         <div className="flex items-center gap-3">
//                           <Avatar src={v.documents?.photo || undefined} name={v.personal?.fullName} size={34} />
//                           <div>
//                             <p className="font-semibold text-ink-900">{v.personal?.fullName}</p>
//                             <p className="text-xs text-ink-500">{v.personal?.mobile}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-5 py-3.5">
//                         <IdBadge>{v.vendorId}</IdBadge>
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">
//                         {v.address?.ward} &middot; {v.address?.zone}
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">{v.business?.businessType}</td>
//                       <td className="px-5 py-3.5">
//                         <StatusChip status={displayStatus(v.status)} />
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-500">{v.createdAt?.slice(0, 10)}</td>
//                       <td className="px-5 py-3.5 text-right">
//                         <Link
//                           to={`/vendors/profile/${v.applicationNo}`}
//                           className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                         >
//                           <FiEye size={16} />
//                         </Link>
//                       </td>

//                       {/* <td className="px-5 py-3.5 text-right">
//                         <div className="inline-flex items-center gap-1">
//                           <Link
//                             to={`/vendors/profile/${v.applicationNo}`}
//                             className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                           >
//                             <FiEye size={16} />
//                           </Link>
//                           {canDelete && (
//                             <button
//                               type="button"
//                               onClick={() => handleDelete(v.applicationNo, v.personal?.fullName || "this vendor")}
//                               disabled={deletingNo === v.applicationNo}
//                               className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-50 hover:text-danger-500 disabled:opacity-50"
//                             >
//                               {deletingNo === v.applicationNo ? (
//                                 <FiLoader size={16} className="animate-spin" />
//                               ) : (
//                                 <FiTrash2 size={16} />
//                               )}
//                             </button>
//                           )}
//                         </div>
//                       </td> */}
//                     </tr>
//                   ))}
//                   {pageItems.length === 0 && (
//                     <tr>
//                       <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
//                         No vendors match your search.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//               <p className="text-xs text-ink-500">
//                 Page {page} of {totalPages}
//               </p>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronLeft size={15} />
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                       p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronRight size={15} />
//                 </button>
//               </div>
//             </div> */}


//                         <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//               <p className="text-xs text-ink-500">
//                 Page {page} of {totalPages}
//               </p>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronLeft size={15} />
//                 </button>

//                 {getPageNumbers(page, totalPages).map((p, idx) =>
//                   p === "..." ? (
//                     <span key={`dots-${idx}`} className="px-1 text-xs text-ink-400">
//                       …
//                     </span>
//                   ) : (
//                     <button
//                       key={p}
//                       onClick={() => setPage(p)}
//                       className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                         p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                       }`}
//                     >
//                       {p}
//                     </button>
//                   )
//                 )}

//                 <button
//                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronRight size={15} />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </Card>
//     </div>
//   );
// }



// import { useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { FiPlus, FiSearch, FiEye, FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";

// const PAGE_SIZE = 6;
// const STATUS_FILTERS = ["All", "Pending Survey", "Under Survey", "Pending Approval", "Approved", "Rejected"];

// export default function VendorList() {
//   const vendors = useSelector(selectAllVendors);
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);

//   const filtered = useMemo(() => {
//     return vendors.filter((v) => {
//       const matchesQuery =
//         !query ||
//         v.personal.fullName.toLowerCase().includes(query.toLowerCase()) ||
//         v.vendorId.toLowerCase().includes(query.toLowerCase()) ||
//         v.applicationNo.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = status === "All" || v.status === status;
//       return matchesQuery && matchesStatus;
//     });
//   }, [vendors, query, status]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Registered Vendors</h1>
//           <p className="text-sm text-ink-500">{filtered.length} vendors found</p>
//         </div>
//         <Link to="/vendors/register">
//           <Button icon={FiPlus}>New Registration</Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search name, vendor ID, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => {
//                   setStatus(s);
//                   setPage(1);
//                 }}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s
//                     ? "bg-brand-500 text-white"
//                     : "bg-ink-50 text-ink-500 hover:bg-ink-100"
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
//                 <th className="px-5 py-3 font-semibold">Vendor ID</th>
//                 <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                 <th className="px-5 py-3 font-semibold">Category</th>
//                 <th className="px-5 py-3 font-semibold">Status</th>
//                 <th className="px-5 py-3 font-semibold">Registered</th>
//                 <th className="px-5 py-3 text-right font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pageItems.map((v) => (
//                 <tr key={v.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                   <td className="px-5 py-3.5">
//                     <div className="flex items-center gap-3">
//                       <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={34} />
//                       <div>
//                         <p className="font-semibold text-ink-900">{v.personal.fullName}</p>
//                         <p className="text-xs text-ink-500">{v.personal.mobile}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <IdBadge>{v.vendorId}</IdBadge>
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-700">
//                     {v.address.ward} &middot; {v.address.zone}
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-700">{v.business.businessCategory}</td>
//                   <td className="px-5 py-3.5">
//                     <StatusChip status={v.status} />
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-500">{v.registrationDate}</td>
//                   <td className="px-5 py-3.5 text-right">
//                     <Link
//                       to={`/vendors/profile/${v.id}`}
//                       className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                     >
//                       <FiEye size={16} />
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//               {pageItems.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
//                     No vendors match your search.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//           <p className="text-xs text-ink-500">
//             Page {page} of {totalPages}
//           </p>
//           <div className="flex items-center gap-1.5">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//             >
//               <FiChevronLeft size={15} />
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//               <button
//                 key={p}
//                 onClick={() => setPage(p)}
//                 className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                   p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                 }`}
//               >
//                 {p}
//               </button>
//             ))}
//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//             >
//               <FiChevronRight size={15} />
//             </button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }





// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiPlus, FiSearch, FiEye, FiChevronLeft, FiChevronRight, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { fetchVendorApplications } from "../../../services/vendorApplicationService";

// const PAGE_SIZE = 6;
// const STATUS_FILTERS = ["All", "Pending Survey", "Under Survey", "Pending Approval", "Approved", "Rejected"];

// // ── Backend's real workflow status → the simpler display buckets this page's filter chips use ──
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

// export default function VendorList() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     fetchVendorApplications({ limit: 100 }).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load vendor applications.");
//         return;
//       }
//       setApplications(result.data || []);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const filtered = useMemo(() => {
//     return applications.filter((v) => {
//       const name = v.personal?.fullName || "";
//       const vendorId = v.vendorId || "";
//       const appNo = v.applicationNo || "";
//       const matchesQuery =
//         !query ||
//         name.toLowerCase().includes(query.toLowerCase()) ||
//         vendorId.toLowerCase().includes(query.toLowerCase()) ||
//         appNo.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = status === "All" || displayStatus(v.status) === status;
//       return matchesQuery && matchesStatus;
//     });
//   }, [applications, query, status]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Registered Vendors</h1>
//           <p className="text-sm text-ink-500">{filtered.length} vendors found</p>
//         </div>
//         <Link to="/vendors/register">
//           <Button icon={FiPlus}>New Registration</Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search name, vendor ID, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => {
//                   setStatus(s);
//                   setPage(1);
//                 }}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s
//                     ? "bg-brand-500 text-white"
//                     : "bg-ink-50 text-ink-500 hover:bg-ink-100"
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
//             Loading vendor applications...
//           </div>
//         ) : error ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
//             <FiAlertCircle size={16} />
//             {error}
//           </div>
//         ) : (
//           <>
//             <div className="scrollbar-thin overflow-x-auto">
//               <table className="w-full min-w-[720px] text-left text-sm">
//                 <thead>
//                   <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                     <th className="px-5 py-3 font-semibold">Vendor</th>
//                     <th className="px-5 py-3 font-semibold">Vendor ID</th>
//                     <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                     <th className="px-5 py-3 font-semibold">Category</th>
//                     <th className="px-5 py-3 font-semibold">Status</th>
//                     <th className="px-5 py-3 font-semibold">Registered</th>
//                     <th className="px-5 py-3 text-right font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pageItems.map((v) => (
//                     <tr key={v._id || v.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                       <td className="px-5 py-3.5">
//                         <div className="flex items-center gap-3">
//                           <Avatar src={v.documents?.photo || undefined} name={v.personal?.fullName} size={34} />
//                           <div>
//                             <p className="font-semibold text-ink-900">{v.personal?.fullName}</p>
//                             <p className="text-xs text-ink-500">{v.personal?.mobile}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-5 py-3.5">
//                         <IdBadge>{v.vendorId}</IdBadge>
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">
//                         {v.address?.ward} &middot; {v.address?.zone}
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">{v.business?.businessCategory}</td>
//                       <td className="px-5 py-3.5">
//                         <StatusChip status={displayStatus(v.status)} />
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-500">{v.createdAt?.slice(0, 10)}</td>
//                       <td className="px-5 py-3.5 text-right">
//                         <Link
//                           to={`/vendors/profile/${v.applicationNo}`}
//                           className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                         >
//                           <FiEye size={16} />
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                   {pageItems.length === 0 && (
//                     <tr>
//                       <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
//                         No vendors match your search.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//               <p className="text-xs text-ink-500">
//                 Page {page} of {totalPages}
//               </p>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronLeft size={15} />
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                       p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronRight size={15} />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </Card>
//     </div>
//   );
// }


// ======================================

// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiPlus, FiSearch, FiEye, FiChevronLeft, FiChevronRight, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { fetchVendorApplications } from "../../../services/vendorApplicationService";

// const PAGE_SIZE = 6;
// const STATUS_FILTERS = ["All", "Pending Survey", "Under Survey", "Pending Approval", "Approved", "Rejected"];

// // ── Backend's real workflow status → the simpler display buckets this page's filter chips use ──
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

// export default function VendorList() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     fetchVendorApplications({ limit: 100 }).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load vendor applications.");
//         return;
//       }
//       setApplications(result.data || []);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const filtered = useMemo(() => {
//     return applications.filter((v) => {
//       const name = v.personal?.fullName || "";
//       const vendorId = v.vendorId || "";
//       const appNo = v.applicationNo || "";
//       const matchesQuery =
//         !query ||
//         name.toLowerCase().includes(query.toLowerCase()) ||
//         vendorId.toLowerCase().includes(query.toLowerCase()) ||
//         appNo.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = status === "All" || displayStatus(v.status) === status;
//       return matchesQuery && matchesStatus;
//     });
//   }, [applications, query, status]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Registered Vendors</h1>
//           <p className="text-sm text-ink-500">{filtered.length} vendors found</p>
//         </div>
//         <Link to="/vendors/register">
//           <Button icon={FiPlus}>New Registration</Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search name, vendor ID, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => {
//                   setStatus(s);
//                   setPage(1);
//                 }}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s
//                     ? "bg-brand-500 text-white"
//                     : "bg-ink-50 text-ink-500 hover:bg-ink-100"
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
//             Loading vendor applications...
//           </div>
//         ) : error ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
//             <FiAlertCircle size={16} />
//             {error}
//           </div>
//         ) : (
//           <>
//             <div className="scrollbar-thin overflow-x-auto">
//               <table className="w-full min-w-[720px] text-left text-sm">
//                 <thead>
//                   <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                     <th className="px-5 py-3 font-semibold">Vendor</th>
//                     <th className="px-5 py-3 font-semibold">Vendor ID</th>
//                     <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                     <th className="px-5 py-3 font-semibold">Category</th>
//                     <th className="px-5 py-3 font-semibold">Status</th>
//                     <th className="px-5 py-3 font-semibold">Registered</th>
//                     <th className="px-5 py-3 text-right font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pageItems.map((v) => (
//                     <tr key={v._id || v.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                       <td className="px-5 py-3.5">
//                         <div className="flex items-center gap-3">
//                           <Avatar src={v.documents?.photo || undefined} name={v.personal?.fullName} size={34} />
//                           <div>
//                             <p className="font-semibold text-ink-900">{v.personal?.fullName}</p>
//                             <p className="text-xs text-ink-500">{v.personal?.mobile}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-5 py-3.5">
//                         <IdBadge>{v.vendorId}</IdBadge>
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">
//                         {v.address?.ward} &middot; {v.address?.zone}
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">{v.business?.businessCategory}</td>
//                       <td className="px-5 py-3.5">
//                         <StatusChip status={displayStatus(v.status)} />
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-500">{v.createdAt?.slice(0, 10)}</td>
//                       <td className="px-5 py-3.5 text-right">
//                         <Link
//                           to={`/vendors/profile/${v.applicationNo}`}
//                           className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                         >
//                           <FiEye size={16} />
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                   {pageItems.length === 0 && (
//                     <tr>
//                       <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
//                         No vendors match your search.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//               <p className="text-xs text-ink-500">
//                 Page {page} of {totalPages}
//               </p>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronLeft size={15} />
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                       p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronRight size={15} />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </Card>
//     </div>
//   );
// }


// ============================


// import { useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { FiPlus, FiSearch, FiEye, FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";

// const PAGE_SIZE = 6;
// const STATUS_FILTERS = ["All", "Pending Survey", "Under Survey", "Pending Approval", "Approved", "Rejected"];

// export default function VendorList() {
//   const vendors = useSelector(selectAllVendors);
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);

//   const filtered = useMemo(() => {
//     return vendors.filter((v) => {
//       const matchesQuery =
//         !query ||
//         v.personal.fullName.toLowerCase().includes(query.toLowerCase()) ||
//         v.vendorId.toLowerCase().includes(query.toLowerCase()) ||
//         v.applicationNo.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = status === "All" || v.status === status;
//       return matchesQuery && matchesStatus;
//     });
//   }, [vendors, query, status]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Registered Vendors</h1>
//           <p className="text-sm text-ink-500">{filtered.length} vendors found</p>
//         </div>
//         <Link to="/vendors/register">
//           <Button icon={FiPlus}>New Registration</Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search name, vendor ID, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => {
//                   setStatus(s);
//                   setPage(1);
//                 }}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s
//                     ? "bg-brand-500 text-white"
//                     : "bg-ink-50 text-ink-500 hover:bg-ink-100"
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
//                 <th className="px-5 py-3 font-semibold">Vendor ID</th>
//                 <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                 <th className="px-5 py-3 font-semibold">Category</th>
//                 <th className="px-5 py-3 font-semibold">Status</th>
//                 <th className="px-5 py-3 font-semibold">Registered</th>
//                 <th className="px-5 py-3 text-right font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pageItems.map((v) => (
//                 <tr key={v.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                   <td className="px-5 py-3.5">
//                     <div className="flex items-center gap-3">
//                       <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={34} />
//                       <div>
//                         <p className="font-semibold text-ink-900">{v.personal.fullName}</p>
//                         <p className="text-xs text-ink-500">{v.personal.mobile}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <IdBadge>{v.vendorId}</IdBadge>
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-700">
//                     {v.address.ward} &middot; {v.address.zone}
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-700">{v.business.businessCategory}</td>
//                   <td className="px-5 py-3.5">
//                     <StatusChip status={v.status} />
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-500">{v.registrationDate}</td>
//                   <td className="px-5 py-3.5 text-right">
//                     <Link
//                       to={`/vendors/profile/${v.id}`}
//                       className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                     >
//                       <FiEye size={16} />
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//               {pageItems.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
//                     No vendors match your search.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//           <p className="text-xs text-ink-500">
//             Page {page} of {totalPages}
//           </p>
//           <div className="flex items-center gap-1.5">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//             >
//               <FiChevronLeft size={15} />
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//               <button
//                 key={p}
//                 onClick={() => setPage(p)}
//                 className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                   p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                 }`}
//               >
//                 {p}
//               </button>
//             ))}
//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//             >
//               <FiChevronRight size={15} />
//             </button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }





// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiPlus, FiSearch, FiEye, FiChevronLeft, FiChevronRight, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { fetchVendorApplications } from "../../../services/vendorApplicationService";

// const PAGE_SIZE = 6;
// const STATUS_FILTERS = ["All", "Pending Survey", "Under Survey", "Pending Approval", "Approved", "Rejected"];

// // ── Backend's real workflow status → the simpler display buckets this page's filter chips use ──
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

// export default function VendorList() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     fetchVendorApplications({ limit: 100 }).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load vendor applications.");
//         return;
//       }
//       setApplications(result.data || []);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const filtered = useMemo(() => {
//     return applications.filter((v) => {
//       const name = v.personal?.fullName || "";
//       const vendorId = v.vendorId || "";
//       const appNo = v.applicationNo || "";
//       const matchesQuery =
//         !query ||
//         name.toLowerCase().includes(query.toLowerCase()) ||
//         vendorId.toLowerCase().includes(query.toLowerCase()) ||
//         appNo.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = status === "All" || displayStatus(v.status) === status;
//       return matchesQuery && matchesStatus;
//     });
//   }, [applications, query, status]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="font-display text-xl font-bold text-ink-900">Registered Vendors</h1>
//           <p className="text-sm text-ink-500">{filtered.length} vendors found</p>
//         </div>
//         <Link to="/vendors/register">
//           <Button icon={FiPlus}>New Registration</Button>
//         </Link>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:w-72">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search name, vendor ID, application no."
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STATUS_FILTERS.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => {
//                   setStatus(s);
//                   setPage(1);
//                 }}
//                 className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
//                   status === s
//                     ? "bg-brand-500 text-white"
//                     : "bg-ink-50 text-ink-500 hover:bg-ink-100"
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
//             Loading vendor applications...
//           </div>
//         ) : error ? (
//           <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
//             <FiAlertCircle size={16} />
//             {error}
//           </div>
//         ) : (
//           <>
//             <div className="scrollbar-thin overflow-x-auto">
//               <table className="w-full min-w-[720px] text-left text-sm">
//                 <thead>
//                   <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                     <th className="px-5 py-3 font-semibold">Vendor</th>
//                     <th className="px-5 py-3 font-semibold">Vendor ID</th>
//                     <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                     <th className="px-5 py-3 font-semibold">Category</th>
//                     <th className="px-5 py-3 font-semibold">Status</th>
//                     <th className="px-5 py-3 font-semibold">Registered</th>
//                     <th className="px-5 py-3 text-right font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pageItems.map((v) => (
//                     <tr key={v._id || v.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                       <td className="px-5 py-3.5">
//                         <div className="flex items-center gap-3">
//                           <Avatar src={v.documents?.photo || undefined} name={v.personal?.fullName} size={34} />
//                           <div>
//                             <p className="font-semibold text-ink-900">{v.personal?.fullName}</p>
//                             <p className="text-xs text-ink-500">{v.personal?.mobile}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-5 py-3.5">
//                         <IdBadge>{v.vendorId}</IdBadge>
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">
//                         {v.address?.ward} &middot; {v.address?.zone}
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">{v.business?.businessType}</td>
//                       <td className="px-5 py-3.5">
//                         <StatusChip status={displayStatus(v.status)} />
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-500">{v.createdAt?.slice(0, 10)}</td>
//                       <td className="px-5 py-3.5 text-right">
//                         <Link
//                           to={`/vendors/profile/${v.applicationNo}`}
//                           className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                         >
//                           <FiEye size={16} />
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                   {pageItems.length === 0 && (
//                     <tr>
//                       <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
//                         No vendors match your search.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
//               <p className="text-xs text-ink-500">
//                 Page {page} of {totalPages}
//               </p>
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronLeft size={15} />
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
//                       p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
//                 >
//                   <FiChevronRight size={15} />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </Card>
//     </div>
//   );
// }




import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiSearch, FiEye, FiChevronLeft, FiChevronRight, FiLoader, FiAlertCircle,FiTrash2, FiDownload} from "react-icons/fi";
// import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import StatusChip from "../../../components/ui/StatusChip";
import Avatar from "../../../components/ui/Avatar";
import { IdBadge } from "../../../components/ui/Avatar";
import { deleteVendorApplication, fetchVendorApplications } from "../../../services/vendorApplicationService";
import { useAuth } from "../../auth/hooks/useAuth";




const PAGE_SIZE = 6;
const STATUS_FILTERS = ["All", "Pending Survey", "Under Survey", "Pending Approval", "Approved", "Rejected"];

// ── Backend's real workflow status → the simpler display buckets this page's filter chips use ──
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

// export default function VendorList() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);

export default function VendorList() {
  const { user } = useAuth();
  const canDelete = user?.role === "counter_officer" || user?.role === "super_admin";
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [deletingNo, setDeletingNo] = useState(null);

  const handleDelete = async (applicationNo, name) => {
    if (!window.confirm(`Delete ${name}'s registration (${applicationNo})? This cannot be undone.`)) return;
    setDeletingNo(applicationNo);
    const result = await deleteVendorApplication(applicationNo);
    setDeletingNo(null);
    if (!result.success) {
      alert(result.message || "Could not delete this application.");
      return;
    }
    setApplications((prev) => prev.filter((v) => v.applicationNo !== applicationNo));
  };

  // ── Reports Excel Download — exports the vendor list currently on screen (respects the
  //    officer's own ward scoping from the backend, plus whatever search/status filter is
  //    applied here) with each vendor's full info and status. ──

  // const handleExportExcel = () => {
  //   const rows = filtered.map((v) => ({
  //     "Application No": v.applicationNo || "",
  //     "Vendor ID": v.vendorId || "",
  //     "Full Name": v.personal?.fullName || "",
  //     "Mobile": v.personal?.mobile || "",
  //     "Ward": v.address?.ward || "",
  //     "Zone": v.address?.zone || "",
  //     "Business Type": v.business?.businessType || "",
  //     "Status": displayStatus(v.status),
  //     "Working Address": v.address?.workingAddress || "",
  //     "Permanent Address": v.address?.permanentAddress || "",
  //     "Road Name": v.address?.roadName || "",
  //     "Certificate No": v.certificate?.certificateNo || "",
  //     "Registered On": v.createdAt ? v.createdAt.slice(0, 10) : "",
  //   }));

  //   const worksheet = XLSX.utils.json_to_sheet(rows);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Vendors");
  //   const dateStr = new Date().toISOString().slice(0, 10);
  //   XLSX.writeFile(workbook, `Vendor-Report-${dateStr}.xlsx`);
  // };


    const handleExportExcel = async () => {
    // ── Summary counts (per current filter/search on screen) ──
    const statusCounts = filtered.reduce((acc, v) => {
      const key = displayStatus(v.status);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Vendors");

    // Title
    const titleRow = sheet.addRow(["Vendor Report", new Date().toLocaleDateString("en-IN")]);
    titleRow.font = { bold: true, size: 13 };

    sheet.addRow([]);

    const totalRow = sheet.addRow(["Total Vendors", filtered.length]);
    totalRow.font = { bold: true };

    Object.entries(statusCounts).forEach(([label, count]) => {
      sheet.addRow([label, count]);
    });

    sheet.addRow([]); // spacer before the table

    const headers = [
      "Application No",
      "Vendor ID",
      "Full Name",
      "Mobile",
      "Ward",
      "Zone",
      "Business Type",
      "Status",
      "Working Address",
      "Permanent Address",
      "Road Name",
      "Certificate No",
      "Registered On",
    ];
    const headerRow = sheet.addRow(headers);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    filtered.forEach((v) => {
      sheet.addRow([
        v.applicationNo || "",
        v.vendorId || "",
        v.personal?.fullName || "",
        v.personal?.mobile || "",
        v.address?.ward || "",
        v.address?.zone || "",
        v.business?.businessType || "",
        displayStatus(v.status),
        v.address?.workingAddress || "",
        v.address?.permanentAddress || "",
        v.address?.roadName || "",
        v.certificate?.certificateNo || "",
        v.createdAt ? v.createdAt.slice(0, 10) : "",
      ]);
    });

    sheet.columns.forEach((col) => {
      col.width = 20;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const dateStr = new Date().toISOString().slice(0, 10);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Vendor-Report-${dateStr}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // useEffect(() => {
  //   let cancelled = false;
  //   setLoading(true);
  //   setError("");
  //   fetchVendorApplications({ limit: 100 }).then((result) => {
  //     if (cancelled) return;
  //     setLoading(false);
  //     if (!result.success) {
  //       setError(result.message || "Could not load vendor applications.");
  //       return;
  //     }
  //     setApplications(result.data || []);
  //   });
  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);

  
    useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchVendorApplications({ limit: 1 }).then((countResult) => {
      if (cancelled) return;
      if (!countResult.success) {
        setLoading(false);
        setError(countResult.message || "Could not load vendor applications.");
        return;
      }
      const dynamicLimit = countResult.total || 1;
      fetchVendorApplications({ limit: dynamicLimit }).then((result) => {
        if (cancelled) return;
        setLoading(false);
        if (!result.success) {
          setError(result.message || "Could not load vendor applications.");
          return;
        }
        setApplications(result.data || []);
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  
  
  
  const filtered = useMemo(() => {
    return applications.filter((v) => {
      const name = v.personal?.fullName || "";
      const vendorId = v.vendorId || "";
      const appNo = v.applicationNo || "";
      const matchesQuery =
        !query ||
        name.toLowerCase().includes(query.toLowerCase()) ||
        vendorId.toLowerCase().includes(query.toLowerCase()) ||
        appNo.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All" || displayStatus(v.status) === status;
      return matchesQuery && matchesStatus;
    });
  }, [applications, query, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);


  // Returns a compact list of page numbers with "..." for gaps, e.g. [1, "...", 27, 28, 29, "...", 267]
function getPageNumbers(current, total, siblingCount = 1) {
  const totalNumbers = siblingCount * 2 + 5; // first, last, current, 2 dots, siblings
  if (total <= totalNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  const pages = [];

  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => i + 1);
    pages.push(...leftRange, "...", total);
  } else if (showLeftDots && !showRightDots) {
    const rightRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, i) => total - (3 + siblingCount * 2) + i + 1
    );
    pages.push(1, "...", ...rightRange);
  } else {
    const middleRange = Array.from(
      { length: rightSibling - leftSibling + 1 },
      (_, i) => leftSibling + i
    );
    pages.push(1, "...", ...middleRange, "...", total);
  }

  return pages;
}

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-ink-900">Registered Vendors</h1>
          <p className="text-sm text-ink-500">{filtered.length} vendors found</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Button icon={FiDownload} variant="outline" onClick={handleExportExcel}>
            Reports Excel Download
          </Button>
          <Link to="/vendors/register">
            <Button icon={FiPlus}>New Registration</Button>
          </Link>
        </div>
      </div>

      <Card padded={false} className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-72">
            <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, vendor ID, application no."
              className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatus(s);
                  setPage(1);
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  status === s
                    ? "bg-brand-500 text-white"
                    : "bg-ink-50 text-ink-500 hover:bg-ink-100"
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
            Loading vendor applications...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
            <FiAlertCircle size={16} />
            {error}
          </div>
        ) : (
          <>
            <div className="scrollbar-thin overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
                    <th className="px-5 py-3 font-semibold">Vendor</th>
                    <th className="px-5 py-3 font-semibold">Vendor ID</th>
                    <th className="px-5 py-3 font-semibold">Ward / Zone</th>
                    <th className="px-5 py-3 font-semibold">Category</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Registered</th>
                    <th className="px-5 py-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((v) => (
                    <tr key={v._id || v.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar src={v.documents?.photo || undefined} name={v.personal?.fullName} size={34} />
                          <div>
                            <p className="font-semibold text-ink-900">{v.personal?.fullName}</p>
                            <p className="text-xs text-ink-500">{v.personal?.mobile}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <IdBadge>{v.vendorId}</IdBadge>
                      </td>
                      <td className="px-5 py-3.5 text-ink-700">
                        {v.address?.ward} &middot; {v.address?.zone}
                      </td>
                      <td className="px-5 py-3.5 text-ink-700">{v.business?.businessType}</td>
                      <td className="px-5 py-3.5">
                        <StatusChip status={displayStatus(v.status)} />
                      </td>
                      <td className="px-5 py-3.5 text-ink-500">{v.createdAt?.slice(0, 10)}</td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          to={`/vendors/profile/${v.applicationNo}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
                        >
                          <FiEye size={16} />
                        </Link>
                      </td>

                      {/* <td className="px-5 py-3.5 text-right">
                        <div className="inline-flex items-center gap-1">
                          <Link
                            to={`/vendors/profile/${v.applicationNo}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
                          >
                            <FiEye size={16} />
                          </Link>
                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => handleDelete(v.applicationNo, v.personal?.fullName || "this vendor")}
                              disabled={deletingNo === v.applicationNo}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-danger-50 hover:text-danger-500 disabled:opacity-50"
                            >
                              {deletingNo === v.applicationNo ? (
                                <FiLoader size={16} className="animate-spin" />
                              ) : (
                                <FiTrash2 size={16} />
                              )}
                            </button>
                          )}
                        </div>
                      </td> */}
                    </tr>
                  ))}
                  {pageItems.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">
                        No vendors match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
              <p className="text-xs text-ink-500">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
                >
                  <FiChevronLeft size={15} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
                      p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
                >
                  <FiChevronRight size={15} />
                </button>
              </div>
            </div> */}


                        <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-4">
              <p className="text-xs text-ink-500">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
                >
                  <FiChevronLeft size={15} />
                </button>

                {getPageNumbers(page, totalPages).map((p, idx) =>
                  p === "..." ? (
                    <span key={`dots-${idx}`} className="px-1 text-xs text-ink-400">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
                        p === page ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-50"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-100 text-ink-500 disabled:opacity-40"
                >
                  <FiChevronRight size={15} />
                </button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}