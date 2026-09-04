// import { useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { FiMapPin, FiSearch, FiEye, FiThumbsUp, FiThumbsDown, FiHelpCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllSurveys } from "../../../features/survey/surveySlice";

// const RECOMMENDATION_ICON = {
//   Approve: { icon: FiThumbsUp, className: "bg-success-100 text-success-500" },
//   Reject: { icon: FiThumbsDown, className: "bg-danger-100 text-danger-500" },
//   "Need Clarification": { icon: FiHelpCircle, className: "bg-warning-100 text-warning-500" },
// };

// export default function SurveyList() {
//   const vendors = useSelector(selectAllVendors);
//   const surveys = useSelector(selectAllSurveys);
//   const [query, setQuery] = useState("");

//   const pending = useMemo(
//     () =>
//       vendors
//         .filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//         .filter((v) => !query || v.personal.fullName.toLowerCase().includes(query.toLowerCase())),
//     [vendors, query]
//   );

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="font-display text-xl font-bold text-ink-900">Vendor Survey</h1>
//         <p className="text-sm text-ink-500">Field verification queue and completed survey records</p>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex items-center justify-between gap-4 border-b border-ink-100 p-5">
//           <div>
//             <h2 className="text-sm font-bold text-ink-900">Awaiting Survey</h2>
//             <p className="text-xs text-ink-500">{pending.length} vendors need a field visit</p>
//           </div>
//           <div className="relative w-56">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search vendor"
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//         </div>

//         <div className="scrollbar-thin overflow-x-auto">
//           <table className="w-full min-w-[640px] text-left text-sm">
//             <thead>
//               <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                 <th className="px-5 py-3 font-semibold">Vendor</th>
//                 <th className="px-5 py-3 font-semibold">Application No.</th>
//                 <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                 <th className="px-5 py-3 font-semibold">Status</th>
//                 <th className="px-5 py-3 text-right font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pending.map((v) => (
//                 <tr key={v.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                   <td className="px-5 py-3.5">
//                     <div className="flex items-center gap-3">
//                       <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={34} />
//                       <span className="font-semibold text-ink-900">{v.personal.fullName}</span>
//                     </div>
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <IdBadge>{v.applicationNo}</IdBadge>
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-700">
//                     {v.address.ward} &middot; {v.address.zone}
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <StatusChip status={v.status} />
//                   </td>
//                   <td className="px-5 py-3.5 text-right">
//                     <Link
//                       to={`/survey/new/${v.id}`}
//                       className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//                     >
//                       <FiMapPin size={13} /> Conduct Survey
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//               {pending.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="px-5 py-10 text-center text-sm text-ink-400">
//                     No vendors are currently awaiting a survey.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </Card>

//       <Card padded={false} className="overflow-hidden">
//         <div className="border-b border-ink-100 p-5">
//           <h2 className="text-sm font-bold text-ink-900">Completed Surveys</h2>
//           <p className="text-xs text-ink-500">{surveys.length} survey records</p>
//         </div>
//         <div className="scrollbar-thin overflow-x-auto">
//           <table className="w-full min-w-[680px] text-left text-sm">
//             <thead>
//               <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                 <th className="px-5 py-3 font-semibold">Survey No.</th>
//                 <th className="px-5 py-3 font-semibold">Vendor</th>
//                 <th className="px-5 py-3 font-semibold">Survey Date</th>
//                 <th className="px-5 py-3 font-semibold">Officer</th>
//                 <th className="px-5 py-3 font-semibold">Recommendation</th>
//                 <th className="px-5 py-3 text-right font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {surveys.map((s) => {
//                 const rec = RECOMMENDATION_ICON[s.recommendation];
//                 const RecIcon = rec?.icon ?? FiHelpCircle;
//                 return (
//                   <tr key={s.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                     <td className="px-5 py-3.5">
//                       <IdBadge>{s.surveyNumber}</IdBadge>
//                     </td>
//                     <td className="px-5 py-3.5 font-semibold text-ink-900">{s.vendorName}</td>
//                     <td className="px-5 py-3.5 text-ink-500">{s.surveyDate}</td>
//                     <td className="px-5 py-3.5 text-ink-700">{s.surveyOfficer}</td>
//                     <td className="px-5 py-3.5">
//                       <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${rec?.className ?? "bg-ink-100 text-ink-500"}`}>
//                         <RecIcon size={12} /> {s.recommendation}
//                       </span>
//                     </td>
//                     <td className="px-5 py-3.5 text-right">
//                       <Link
//                         to={`/vendors/profile/${s.vendorId}`}
//                         className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                       >
//                         <FiEye size={16} />
//                       </Link>
//                     </td>
//                   </tr>
//                 );
//               })}
//               {surveys.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="px-5 py-10 text-center text-sm text-ink-400">
//                     No surveys completed yet.
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



// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiMapPin, FiSearch, FiEye, FiThumbsUp, FiThumbsDown, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { fetchVendorApplications } from "../../../services/vendorApplicationService";

// // Backend survey stage only supports two recommendations
// const RECOMMENDATION_ICON = {
//   Approve: { icon: FiThumbsUp, className: "bg-success-100 text-success-500" },
//   "Send Back": { icon: FiThumbsDown, className: "bg-warning-100 text-warning-500" },
// };

// export default function SurveyList() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");

//   // useEffect(() => {
//   //   // let cancelled = false;
//   //   // setLoading(true);
//   //   // setError("");
//   //   // fetchVendorApplications({ limit: 100 }).then((result) => {
//   //   //   if (cancelled) return;



//   //       let cancelled = false;
//   //   setLoading(true);
//   //   setError("");
//   //   fetchVendorApplications({ limit: 1 }).then((countResult) => {
//   //     if (cancelled) return;
//   //     if (!countResult.success) {
//   //       setLoading(false);
//   //       setError(countResult.message || "Could not load vendor applications.");
//   //       return;
//   //     }
//   //     const dynamicLimit = countResult.total || 1;
//   //     fetchVendorApplications({ limit: dynamicLimit }).then((result) => {
//   //       if (cancelled) return;
//   //     setLoading(false);
//   //     if (!result.success) {
//   //       setError(result.message || "Could not load survey queue.");
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
//           setError(result.message || "Could not load survey queue.");
//           return;
//         }
//         setApplications(result.data || []);
//       });
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // ── Awaiting Survey — applications the backend has forwarded to this Survey Officer's ward ──
//   const pending = useMemo(
//     () =>
//       applications
//         .filter((v) => v.status === "Forwarded to Survey Officer")
//         .filter((v) => !query || v.personal?.fullName?.toLowerCase().includes(query.toLowerCase())),
//     [applications, query]
//   );

//   // ── Completed Surveys — any application that already has survey data recorded, whatever stage it's in now ──
//   const completed = useMemo(() => applications.filter((v) => v.survey?.surveyDate), [applications]);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="font-display text-xl font-bold text-ink-900">Vendor Survey</h1>
//         <p className="text-sm text-ink-500">Field verification queue and completed survey records</p>
//       </div>

//       {loading ? (
//         <Card className="flex items-center justify-center gap-2 py-16 text-sm text-ink-400">
//           <FiLoader className="animate-spin" size={16} />
//           Loading survey queue...
//         </Card>
//       ) : error ? (
//         <Card className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-danger-500">
//           <FiAlertCircle size={16} />
//           {error}
//         </Card>
//       ) : (
//         <>
//           <Card padded={false} className="overflow-hidden">
//             <div className="flex items-center justify-between gap-4 border-b border-ink-100 p-5">
//               <div>
//                 <h2 className="text-sm font-bold text-ink-900">Awaiting Survey</h2>
//                 <p className="text-xs text-ink-500">{pending.length} vendors need a field visit</p>
//               </div>
//               <div className="relative w-56">
//                 <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//                 <input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search vendor"
//                   className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//                 />
//               </div>
//             </div>

//             <div className="scrollbar-thin overflow-x-auto">
//               <table className="w-full min-w-[640px] text-left text-sm">
//                 <thead>
//                   <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                     <th className="px-5 py-3 font-semibold">Vendor</th>
//                     <th className="px-5 py-3 font-semibold">Application No.</th>
//                     <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                     <th className="px-5 py-3 font-semibold">Status</th>
//                     <th className="px-5 py-3 text-right font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pending.map((v) => (
//                     <tr key={v._id || v.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                       <td className="px-5 py-3.5">
//                         <div className="flex items-center gap-3">
//                           <Avatar src={v.documents?.photo || undefined} name={v.personal?.fullName} size={34} />
//                           <span className="font-semibold text-ink-900">{v.personal?.fullName}</span>
//                         </div>
//                       </td>
//                       <td className="px-5 py-3.5">
//                         <IdBadge>{v.applicationNo}</IdBadge>
//                       </td>
//                       <td className="px-5 py-3.5 text-ink-700">
//                         {v.address?.ward} &middot; {v.address?.zone}
//                       </td>
//                       <td className="px-5 py-3.5">
//                         <StatusChip status="Under Survey" />
//                       </td>
//                       <td className="px-5 py-3.5 text-right">
//                         <Link
//                           to={`/survey/new/${v.applicationNo}`}
//                           className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//                         >
//                           <FiMapPin size={13} /> Conduct Survey
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                   {pending.length === 0 && (
//                     <tr>
//                       <td colSpan={5} className="px-5 py-10 text-center text-sm text-ink-400">
//                         No vendors are currently awaiting a survey.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </Card>

//           <Card padded={false} className="overflow-hidden">
//             <div className="border-b border-ink-100 p-5">
//               <h2 className="text-sm font-bold text-ink-900">Completed Surveys</h2>
//               <p className="text-xs text-ink-500">{completed.length} survey records</p>
//             </div>
//             <div className="scrollbar-thin overflow-x-auto">
//               <table className="w-full min-w-[680px] text-left text-sm">
//                 <thead>
//                   <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                     <th className="px-5 py-3 font-semibold">Application No.</th>
//                     <th className="px-5 py-3 font-semibold">Vendor</th>
//                     <th className="px-5 py-3 font-semibold">Survey Date</th>
//                     <th className="px-5 py-3 font-semibold">Officer</th>
//                     <th className="px-5 py-3 font-semibold">Recommendation</th>
//                     <th className="px-5 py-3 text-right font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {completed.map((v) => {
//                     const rec = RECOMMENDATION_ICON[v.survey?.recommendation];
//                     const RecIcon = rec?.icon ?? FiThumbsUp;
//                     return (
//                       <tr key={v._id || v.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                         <td className="px-5 py-3.5">
//                           <IdBadge>{v.applicationNo}</IdBadge>
//                         </td>
//                         <td className="px-5 py-3.5 font-semibold text-ink-900">{v.personal?.fullName}</td>
//                         <td className="px-5 py-3.5 text-ink-500">{v.survey?.surveyDate?.slice(0, 10)}</td>
//                         <td className="px-5 py-3.5 text-ink-700">{v.survey?.surveyOfficerName}</td>
//                         <td className="px-5 py-3.5">
//                           <span
//                             className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
//                               rec?.className ?? "bg-ink-100 text-ink-500"
//                             }`}
//                           >
//                             <RecIcon size={12} /> {v.survey?.recommendation}
//                           </span>
//                         </td>
//                         <td className="px-5 py-3.5 text-right">
//                           <Link
//                             to={`/vendors/profile/${v.applicationNo}`}
//                             className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                           >
//                             <FiEye size={16} />
//                           </Link>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                   {completed.length === 0 && (
//                     <tr>
//                       <td colSpan={6} className="px-5 py-10 text-center text-sm text-ink-400">
//                         No surveys completed yet.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </Card>
//         </>
//       )}
//     </div>
//   );
// }



// import { useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { FiMapPin, FiSearch, FiEye, FiThumbsUp, FiThumbsDown, FiHelpCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import StatusChip from "../../../components/ui/StatusChip";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { selectAllVendors } from "../../../features/vendors/vendorsSlice";
// import { selectAllSurveys } from "../../../features/survey/surveySlice";

// const RECOMMENDATION_ICON = {
//   Approve: { icon: FiThumbsUp, className: "bg-success-100 text-success-500" },
//   Reject: { icon: FiThumbsDown, className: "bg-danger-100 text-danger-500" },
//   "Need Clarification": { icon: FiHelpCircle, className: "bg-warning-100 text-warning-500" },
// };

// export default function SurveyList() {
//   const vendors = useSelector(selectAllVendors);
//   const surveys = useSelector(selectAllSurveys);
//   const [query, setQuery] = useState("");

//   const pending = useMemo(
//     () =>
//       vendors
//         .filter((v) => v.status === "Pending Survey" || v.status === "Under Survey")
//         .filter((v) => !query || v.personal.fullName.toLowerCase().includes(query.toLowerCase())),
//     [vendors, query]
//   );

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="font-display text-xl font-bold text-ink-900">Vendor Survey</h1>
//         <p className="text-sm text-ink-500">Field verification queue and completed survey records</p>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="flex items-center justify-between gap-4 border-b border-ink-100 p-5">
//           <div>
//             <h2 className="text-sm font-bold text-ink-900">Awaiting Survey</h2>
//             <p className="text-xs text-ink-500">{pending.length} vendors need a field visit</p>
//           </div>
//           <div className="relative w-56">
//             <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search vendor"
//               className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
//             />
//           </div>
//         </div>

//         <div className="scrollbar-thin overflow-x-auto">
//           <table className="w-full min-w-[640px] text-left text-sm">
//             <thead>
//               <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                 <th className="px-5 py-3 font-semibold">Vendor</th>
//                 <th className="px-5 py-3 font-semibold">Application No.</th>
//                 <th className="px-5 py-3 font-semibold">Ward / Zone</th>
//                 <th className="px-5 py-3 font-semibold">Status</th>
//                 <th className="px-5 py-3 text-right font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pending.map((v) => (
//                 <tr key={v.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                   <td className="px-5 py-3.5">
//                     <div className="flex items-center gap-3">
//                       <Avatar src={v.documents?.photo?.url} name={v.personal.fullName} size={34} />
//                       <span className="font-semibold text-ink-900">{v.personal.fullName}</span>
//                     </div>
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <IdBadge>{v.applicationNo}</IdBadge>
//                   </td>
//                   <td className="px-5 py-3.5 text-ink-700">
//                     {v.address.ward} &middot; {v.address.zone}
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <StatusChip status={v.status} />
//                   </td>
//                   <td className="px-5 py-3.5 text-right">
//                     <Link
//                       to={`/survey/new/${v.id}`}
//                       className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//                     >
//                       <FiMapPin size={13} /> Conduct Survey
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//               {pending.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="px-5 py-10 text-center text-sm text-ink-400">
//                     No vendors are currently awaiting a survey.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </Card>

//       <Card padded={false} className="overflow-hidden">
//         <div className="border-b border-ink-100 p-5">
//           <h2 className="text-sm font-bold text-ink-900">Completed Surveys</h2>
//           <p className="text-xs text-ink-500">{surveys.length} survey records</p>
//         </div>
//         <div className="scrollbar-thin overflow-x-auto">
//           <table className="w-full min-w-[680px] text-left text-sm">
//             <thead>
//               <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
//                 <th className="px-5 py-3 font-semibold">Survey No.</th>
//                 <th className="px-5 py-3 font-semibold">Vendor</th>
//                 <th className="px-5 py-3 font-semibold">Survey Date</th>
//                 <th className="px-5 py-3 font-semibold">Officer</th>
//                 <th className="px-5 py-3 font-semibold">Recommendation</th>
//                 <th className="px-5 py-3 text-right font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {surveys.map((s) => {
//                 const rec = RECOMMENDATION_ICON[s.recommendation];
//                 const RecIcon = rec?.icon ?? FiHelpCircle;
//                 return (
//                   <tr key={s.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
//                     <td className="px-5 py-3.5">
//                       <IdBadge>{s.surveyNumber}</IdBadge>
//                     </td>
//                     <td className="px-5 py-3.5 font-semibold text-ink-900">{s.vendorName}</td>
//                     <td className="px-5 py-3.5 text-ink-500">{s.surveyDate}</td>
//                     <td className="px-5 py-3.5 text-ink-700">{s.surveyOfficer}</td>
//                     <td className="px-5 py-3.5">
//                       <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${rec?.className ?? "bg-ink-100 text-ink-500"}`}>
//                         <RecIcon size={12} /> {s.recommendation}
//                       </span>
//                     </td>
//                     <td className="px-5 py-3.5 text-right">
//                       <Link
//                         to={`/vendors/profile/${s.vendorId}`}
//                         className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
//                       >
//                         <FiEye size={16} />
//                       </Link>
//                     </td>
//                   </tr>
//                 );
//               })}
//               {surveys.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="px-5 py-10 text-center text-sm text-ink-400">
//                     No surveys completed yet.
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
import { FiMapPin, FiSearch, FiEye, FiThumbsUp, FiThumbsDown, FiLoader, FiAlertCircle } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import StatusChip from "../../../components/ui/StatusChip";
import Avatar from "../../../components/ui/Avatar";
import { IdBadge } from "../../../components/ui/Avatar";
import { fetchVendorApplications } from "../../../services/vendorApplicationService";

// Backend survey stage only supports two recommendations
const RECOMMENDATION_ICON = {
  Approve: { icon: FiThumbsUp, className: "bg-success-100 text-success-500" },
  "Send Back": { icon: FiThumbsDown, className: "bg-warning-100 text-warning-500" },
};

// ── Every status an application can be in AFTER a survey has actually been recorded
// (i.e. has survey.surveyDate set), regardless of which stage it has moved on to since.
// Used to server-filter "Completed Surveys" instead of fetching every application in
// the ward and filtering client-side. ──
const SURVEY_COMPLETED_STATUSES = [
  "Survey Approved",
  "Sent Back to Counter Officer",
  "Forwarded to A.M.C.",
  "A.M.C. Approved",
  "Rejected",
  "Payment Pending",
  "Payment Done",
  "Certificate Issued",
];

// Reasonable ceiling for how many rows each of the two tables ever needs to show —
// keeps the fetch small and fast instead of pulling in every matching record.
const SURVEY_FETCH_LIMIT = 200;

export default function SurveyList() {
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  // ── Two small, server-filtered fetches (status filter now applied on the backend, see
  // getAllApplications) instead of one heavy "fetch the WHOLE ward/collection, then split
  // client-side" call — this is what was making Vendor Survey slow (fetching every single
  // application's full document, including statusHistory/survey/certificate, on every
  // page load). Both fetches run in parallel. ──
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    Promise.all([
      fetchVendorApplications({ status: "Forwarded to Survey Officer", limit: SURVEY_FETCH_LIMIT }),
      fetchVendorApplications({ status: SURVEY_COMPLETED_STATUSES.join(","), limit: SURVEY_FETCH_LIMIT }),
    ]).then(([pendingResult, completedResult]) => {
      if (cancelled) return;
      setLoading(false);
      if (!pendingResult.success || !completedResult.success) {
        setError(pendingResult.message || completedResult.message || "Could not load survey queue.");
        return;
      }
      setPending(pendingResult.data || []);
      setCompleted(completedResult.data || []);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Awaiting Survey — name search only, status already filtered server-side ──
  const filteredPending = useMemo(
    () => pending.filter((v) => !query || v.personal?.fullName?.toLowerCase().includes(query.toLowerCase())),
    [pending, query]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink-900">Vendor Survey</h1>
        <p className="text-sm text-ink-500">Field verification queue and completed survey records</p>
      </div>

      {loading ? (
        <Card className="flex items-center justify-center gap-2 py-16 text-sm text-ink-400">
          <FiLoader className="animate-spin" size={16} />
          Loading survey queue...
        </Card>
      ) : error ? (
        <Card className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-danger-500">
          <FiAlertCircle size={16} />
          {error}
        </Card>
      ) : (
        <>
          <Card padded={false} className="overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-ink-100 p-5">
              <div>
                <h2 className="text-sm font-bold text-ink-900">Awaiting Survey</h2>
                <p className="text-xs text-ink-500">{filteredPending.length} vendors need a field visit</p>
              </div>
              <div className="relative w-56">
                <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search vendor"
                  className="w-full rounded-xl border border-ink-100 bg-ink-50/50 py-2 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
                />
              </div>
            </div>

            <div className="scrollbar-thin overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
                    <th className="px-5 py-3 font-semibold">Vendor</th>
                    <th className="px-5 py-3 font-semibold">Application No.</th>
                    <th className="px-5 py-3 font-semibold">Ward / Zone</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPending.map((v) => (
                    <tr key={v._id || v.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar src={v.documents?.photo || undefined} name={v.personal?.fullName} size={34} />
                          <span className="font-semibold text-ink-900">{v.personal?.fullName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <IdBadge>{v.applicationNo}</IdBadge>
                      </td>
                      <td className="px-5 py-3.5 text-ink-700">
                        {v.address?.ward} &middot; {v.address?.zone}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusChip status="Under Survey" />
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          to={`/survey/new/${v.applicationNo}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
                        >
                          <FiMapPin size={13} /> Conduct Survey
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {filteredPending.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-sm text-ink-400">
                        No vendors are currently awaiting a survey.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          <Card padded={false} className="overflow-hidden">
            <div className="border-b border-ink-100 p-5">
              <h2 className="text-sm font-bold text-ink-900">Completed Surveys</h2>
              <p className="text-xs text-ink-500">{completed.length} survey records</p>
            </div>
            <div className="scrollbar-thin overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
                    <th className="px-5 py-3 font-semibold">Application No.</th>
                    <th className="px-5 py-3 font-semibold">Vendor</th>
                    <th className="px-5 py-3 font-semibold">Survey Date</th>
                    <th className="px-5 py-3 font-semibold">Officer</th>
                    <th className="px-5 py-3 font-semibold">Recommendation</th>
                    <th className="px-5 py-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {completed.map((v) => {
                    const rec = RECOMMENDATION_ICON[v.survey?.recommendation];
                    const RecIcon = rec?.icon ?? FiThumbsUp;
                    return (
                      <tr key={v._id || v.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
                        <td className="px-5 py-3.5">
                          <IdBadge>{v.applicationNo}</IdBadge>
                        </td>
                        <td className="px-5 py-3.5 font-semibold text-ink-900">{v.personal?.fullName}</td>
                        <td className="px-5 py-3.5 text-ink-500">{v.survey?.surveyDate?.slice(0, 10)}</td>
                        <td className="px-5 py-3.5 text-ink-700">{v.survey?.surveyOfficerName}</td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                              rec?.className ?? "bg-ink-100 text-ink-500"
                            }`}
                          >
                            <RecIcon size={12} /> {v.survey?.recommendation}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <Link
                            to={`/vendors/profile/${v.applicationNo}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"
                          >
                            <FiEye size={16} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                  {completed.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-sm text-ink-400">
                        No surveys completed yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
