// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// const HISTORY_STAGES = ["Registration Submitted", "Survey", "Counter Employee", "Approval Authority"];

// export default function VendorProfile() {
//   const { id } = useParams();
//   const vendor = useSelector((s) => selectVendorById(s, id));
//   const [tab, setTab] = useState(TABS[0]);

//   if (!vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Vendor not found.</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const currentIdx = HISTORY_STAGES.indexOf(
//     vendor.currentStage === "Survey"
//       ? "Survey"
//       : vendor.currentStage === "Approval Authority"
//       ? "Approval Authority"
//       : vendor.currentStage === "Approved"
//       ? "Approval Authority"
//       : "Registration Submitted"
//   );

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{vendor.registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">Current Stage: <span className="font-semibold text-ink-800">{vendor.currentStage}</span></span>
//             <StatusChip status={vendor.status} />
//             {vendor.status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.id}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {HISTORY_STAGES.map((stage, i) => {
//                 const done = i <= currentIdx;
//                 return (
//                   <div key={stage} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           done ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {done ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== HISTORY_STAGES.length - 1 && (
//                         <div className={`w-[2px] flex-1 ${done ? "bg-brand-500" : "bg-ink-100"}`} style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className={`text-sm font-semibold ${done ? "text-ink-900" : "text-ink-400"}`}>{stage}</p>
//                       <p className="text-xs text-ink-400">
//                         {done ? "Completed" : "Pending"}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// // ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

// export default function VendorProfile() {
//   const { id: applicationNo } = useParams();
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState(TABS[0]);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const status = displayStatus(vendor.status);
//   const registrationDate = vendor.createdAt?.slice(0, 10);
//   const history = vendor.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">
//               Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
//             </span>
//             <StatusChip status={status} />
//             {status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.applicationNo}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {history.length === 0 && (
//                 <p className="text-sm text-ink-400">No status history yet.</p>
//               )}
//               {history.map((entry, i) => {
//                 const done = true; // every entry in statusHistory already happened
//                 const isLast = i === history.length - 1;
//                 return (
//                   <div key={entry._id || i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {isLast ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== history.length - 1 && (
//                         <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                       {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
//                       <p className="text-xs text-ink-400">
//                         {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
//                         {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }

// =================================================================================

// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiArrowRight, FiCornerUpLeft } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { Textarea } from "../../../components/ui/Field";
// import Button from "../../../components/ui/Button";
// import { useAuth } from "../../auth/hooks/useAuth";
// import {
//   fetchVendorApplicationByNo,
//   forwardApplicationToSurvey,
//   sendApplicationBackToVendor,
// } from "../../../services/vendorApplicationService";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// // ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

// export default function VendorProfile() {
//   const { id: applicationNo } = useParams();
//   const { user } = useAuth();
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState(TABS[0]);

//   const [remarks, setRemarks] = useState("");
//   const [actionSubmitting, setActionSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadVendor = () => {
//     setLoading(true);
//     setError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//     });
//   };

//   useEffect(() => {
//     loadVendor();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [applicationNo]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const status = displayStatus(vendor.status);
//   const registrationDate = vendor.createdAt?.slice(0, 10);
//   const history = vendor.statusHistory || [];

//   // ── Counter Officer's action: forward a freshly-submitted application to the Survey Officer,
//   //    or send it back to the vendor for corrections. Only relevant at these two statuses. ──
//   const isCounterOfficer = user?.role === "counter_officer";
//   const canActAsCounterOfficer =
//     isCounterOfficer && ["Submitted", "Sent Back to Counter Officer"].includes(vendor.status);

//   const handleForward = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await forwardApplicationToSurvey(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not forward this application.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   const handleSendBackToVendor = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await sendApplicationBackToVendor(applicationNo, { remarks });
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not send this application back.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       {canActAsCounterOfficer && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is submitted and waiting on you — forward it to the Survey Officer, or send it
//             back to the vendor if something needs correcting.
//           </p>

//           <Textarea
//             label="Remarks (required if sending back)"
//             placeholder="Add remarks..."
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           />

//           {actionError && (
//             <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <Button variant="accent" icon={FiCornerUpLeft} onClick={handleSendBackToVendor} disabled={actionSubmitting || !remarks.trim()}>
//               Send Back to Vendor
//             </Button>
//             <Button variant="primary" icon={FiArrowRight} onClick={handleForward} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Forward to Survey Officer"}
//             </Button>
//           </div>
//         </Card>
//       )}

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">
//               Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
//             </span>
//             <StatusChip status={status} />
//             {status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.applicationNo}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {history.length === 0 && (
//                 <p className="text-sm text-ink-400">No status history yet.</p>
//               )}
//               {history.map((entry, i) => {
//                 const done = true; // every entry in statusHistory already happened
//                 const isLast = i === history.length - 1;
//                 return (
//                   <div key={entry._id || i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {isLast ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== history.length - 1 && (
//                         <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                       {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
//                       <p className="text-xs text-ink-400">
//                         {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
//                         {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }



// ======================================


// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiArrowRight, FiCornerUpLeft } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { Textarea } from "../../../components/ui/Field";
// import Button from "../../../components/ui/Button";
// import { useAuth } from "../../auth/hooks/useAuth";
// import {
//   fetchVendorApplicationByNo,
//   forwardApplicationToSurvey,
//   sendApplicationBackToVendor,
//   submitApplicationDraft,
// } from "../../../services/vendorApplicationService";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// // ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

// export default function VendorProfile() {
//   const { id: applicationNo } = useParams();
//   const { user } = useAuth();
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState(TABS[0]);

//   const [remarks, setRemarks] = useState("");
//   const [actionSubmitting, setActionSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadVendor = () => {
//     setLoading(true);
//     setError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//     });
//   };

//   useEffect(() => {
//     loadVendor();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [applicationNo]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const status = displayStatus(vendor.status);
//   const registrationDate = vendor.createdAt?.slice(0, 10);
//   const history = vendor.statusHistory || [];

//   // ── Counter Officer's actions ──
//   // 1) A Draft the vendor never submitted — Counter Officer can push it forward on their behalf.
//   // 2) A freshly-submitted (or previously sent-back) application — forward to Survey Officer, or send back.
//   const isCounterOfficer = user?.role === "counter_officer";
//   const canSubmitOnBehalf = isCounterOfficer && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
//   const canActAsCounterOfficer =
//     isCounterOfficer && ["Submitted", "Sent Back to Counter Officer"].includes(vendor.status);

//   const handleSubmitOnBehalf = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await submitApplicationDraft(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not submit this application.");
//       return;
//     }
//     loadVendor();
//   };

//   const handleForward = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await forwardApplicationToSurvey(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not forward this application.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   const handleSendBackToVendor = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await sendApplicationBackToVendor(applicationNo, { remarks });
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not send this application back.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       {canSubmitOnBehalf && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is still a Draft — the vendor hasn't submitted it yet. You can submit it on
//             their behalf to move it into the workflow.
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//             {actionSubmitting ? "Please wait..." : "Submit for Review"}
//           </Button>
//         </Card>
//       )}

//       {canActAsCounterOfficer && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is submitted and waiting on you — forward it to the Survey Officer, or send it
//             back to the vendor if something needs correcting.
//           </p>

//           <Textarea
//             label="Remarks (required if sending back)"
//             placeholder="Add remarks..."
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           />

//           {actionError && (
//             <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <Button variant="accent" icon={FiCornerUpLeft} onClick={handleSendBackToVendor} disabled={actionSubmitting || !remarks.trim()}>
//               Send Back to Vendor
//             </Button>
//             <Button variant="primary" icon={FiArrowRight} onClick={handleForward} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Forward to Survey Officer"}
//             </Button>
//           </div>
//         </Card>
//       )}

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">
//               Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
//             </span>
//             <StatusChip status={status} />
//             {status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.applicationNo}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {history.length === 0 && (
//                 <p className="text-sm text-ink-400">No status history yet.</p>
//               )}
//               {history.map((entry, i) => {
//                 const done = true; // every entry in statusHistory already happened
//                 const isLast = i === history.length - 1;
//                 return (
//                   <div key={entry._id || i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {isLast ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== history.length - 1 && (
//                         <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                       {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
//                       <p className="text-xs text-ink-400">
//                         {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
//                         {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }

// ================================================

// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiArrowRight, FiCornerUpLeft } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { Textarea } from "../../../components/ui/Field";
// import Button from "../../../components/ui/Button";
// import { useAuth } from "../../auth/hooks/useAuth";
// import {
//   fetchVendorApplicationByNo,
//   forwardApplicationToSurvey,
//   sendApplicationBackToVendor,
//   submitApplicationDraft,
// } from "../../../services/vendorApplicationService";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// // ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

// export default function VendorProfile() {
//   const { id: applicationNo } = useParams();
//   const { user } = useAuth();
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState(TABS[0]);

//   const [remarks, setRemarks] = useState("");
//   const [actionSubmitting, setActionSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadVendor = () => {
//     setLoading(true);
//     setError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//     });
//   };

//   useEffect(() => {
//     loadVendor();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [applicationNo]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const status = displayStatus(vendor.status);
//   const registrationDate = vendor.createdAt?.slice(0, 10);
//   const history = vendor.statusHistory || [];

//   // ── Vendor viewing their OWN application can submit it themselves ──
//   const isOwnerVendor = user?.role === "vendor" && vendor.createdById === user?.id;
//   const canVendorSubmit = isOwnerVendor && ["Draft", "Sent Back to Vendor"].includes(vendor.status);

//   // ── Counter Officer's actions ──
//   // 1) A Draft the vendor never submitted — Counter Officer can push it forward on their behalf.
//   // 2) A freshly-submitted (or previously sent-back) application — forward to Survey Officer, or send back.
//   const isCounterOfficer = user?.role === "counter_officer";
//   const canSubmitOnBehalf = isCounterOfficer && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
//   const canActAsCounterOfficer =
//     isCounterOfficer && ["Submitted", "Sent Back to Counter Officer"].includes(vendor.status);

//   const handleSubmitOnBehalf = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await submitApplicationDraft(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not submit this application.");
//       return;
//     }
//     loadVendor();
//   };

//   const handleForward = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await forwardApplicationToSurvey(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not forward this application.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   const handleSendBackToVendor = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await sendApplicationBackToVendor(applicationNo, { remarks });
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not send this application back.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       {canVendorSubmit && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Complete Your Application</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             {vendor.status === "Sent Back to Vendor"
//               ? "Your application was sent back for corrections. Once you're ready, submit it again for review."
//               : "Your application is saved as a draft. Submit it to send it for review."}
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//             {actionSubmitting ? "Please wait..." : "Submit Application"}
//           </Button>
//         </Card>
//       )}

//       {canSubmitOnBehalf && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is still a Draft — the vendor hasn't submitted it yet. You can submit it on
//             their behalf to move it into the workflow.
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//             {actionSubmitting ? "Please wait..." : "Submit for Review"}
//           </Button>
//         </Card>
//       )}

//       {canActAsCounterOfficer && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is submitted and waiting on you — forward it to the Survey Officer, or send it
//             back to the vendor if something needs correcting.
//           </p>

//           <Textarea
//             label="Remarks (required if sending back)"
//             placeholder="Add remarks..."
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           />

//           {actionError && (
//             <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <Button variant="accent" icon={FiCornerUpLeft} onClick={handleSendBackToVendor} disabled={actionSubmitting || !remarks.trim()}>
//               Send Back to Vendor
//             </Button>
//             <Button variant="primary" icon={FiArrowRight} onClick={handleForward} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Forward to Survey Officer"}
//             </Button>
//           </div>
//         </Card>
//       )}

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">
//               Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
//             </span>
//             <StatusChip status={status} />
//             {status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.applicationNo}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {history.length === 0 && (
//                 <p className="text-sm text-ink-400">No status history yet.</p>
//               )}
//               {history.map((entry, i) => {
//                 const done = true; // every entry in statusHistory already happened
//                 const isLast = i === history.length - 1;
//                 return (
//                   <div key={entry._id || i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {isLast ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== history.length - 1 && (
//                         <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                       {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
//                       <p className="text-xs text-ink-400">
//                         {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
//                         {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }


// ==========================================

// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiArrowRight, FiCornerUpLeft, FiEdit2 } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { Textarea } from "../../../components/ui/Field";
// import Button from "../../../components/ui/Button";
// import { useAuth } from "../../auth/hooks/useAuth";
// import {
//   fetchVendorApplicationByNo,
//   forwardApplicationToSurvey,
//   sendApplicationBackToVendor,
//   submitApplicationDraft,
// } from "../../../services/vendorApplicationService";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// // ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

// export default function VendorProfile() {
//   const { id: applicationNo } = useParams();
//   const { user } = useAuth();
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState(TABS[0]);

//   const [remarks, setRemarks] = useState("");
//   const [actionSubmitting, setActionSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadVendor = () => {
//     setLoading(true);
//     setError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//     });
//   };

//   useEffect(() => {
//     loadVendor();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [applicationNo]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const status = displayStatus(vendor.status);
//   const registrationDate = vendor.createdAt?.slice(0, 10);
//   const history = vendor.statusHistory || [];

//   // ── Vendor viewing their OWN application can submit it themselves ──
//   const isOwnerVendor = user?.role === "vendor" && vendor.createdById === user?.id;
//   const canVendorSubmit = isOwnerVendor && ["Draft", "Sent Back to Vendor"].includes(vendor.status);

//   // ── Counter Officer's actions ──
//   // 1) A Draft the vendor never submitted — Counter Officer can push it forward on their behalf.
//   // 2) A freshly-submitted (or previously sent-back) application — forward to Survey Officer, or send back.
//   const isCounterOfficer = user?.role === "counter_officer";
//   const canSubmitOnBehalf = isCounterOfficer && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
//   const canActAsCounterOfficer =
//     isCounterOfficer && ["Submitted", "Sent Back to Counter Officer"].includes(vendor.status);

//   const handleSubmitOnBehalf = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await submitApplicationDraft(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not submit this application.");
//       return;
//     }
//     loadVendor();
//   };

//   const handleForward = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await forwardApplicationToSurvey(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not forward this application.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   const handleSendBackToVendor = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await sendApplicationBackToVendor(applicationNo, { remarks });
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not send this application back.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       {canVendorSubmit && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Complete Your Application</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             {vendor.status === "Sent Back to Vendor"
//               ? "Your application was sent back for corrections. Once you're ready, submit it again for review."
//               : "Your application is saved as a draft. Submit it to send it for review."}
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="flex flex-wrap items-center gap-4">
//             <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Submit Application"}
//             </Button>
//             <Link
//               to={`/vendors/edit/${applicationNo}`}
//               className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//             >
//               <FiEdit2 size={13} /> Edit Application First
//             </Link>
//           </div>
//         </Card>
//       )}

//       {canSubmitOnBehalf && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is still a Draft — the vendor hasn't submitted it yet. You can submit it on
//             their behalf to move it into the workflow.
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="flex flex-wrap items-center gap-4">
//             <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Submit for Review"}
//             </Button>
//             <Link
//               to={`/vendors/edit/${applicationNo}`}
//               className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//             >
//               <FiEdit2 size={13} /> Edit Application First
//             </Link>
//           </div>
//         </Card>
//       )}

//       {canActAsCounterOfficer && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is submitted and waiting on you — forward it to the Survey Officer, or send it
//             back to the vendor if something needs correcting.
//           </p>

//           <Textarea
//             label="Remarks (required if sending back)"
//             placeholder="Add remarks..."
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           />

//           {actionError && (
//             <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <Button variant="accent" icon={FiCornerUpLeft} onClick={handleSendBackToVendor} disabled={actionSubmitting || !remarks.trim()}>
//               Send Back to Vendor
//             </Button>
//             <Button variant="primary" icon={FiArrowRight} onClick={handleForward} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Forward to Survey Officer"}
//             </Button>
//           </div>

//           <Link
//             to={`/vendors/edit/${applicationNo}`}
//             className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//           >
//             <FiEdit2 size={13} /> Edit Application Details
//           </Link>
//         </Card>
//       )}

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">
//               Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
//             </span>
//             <StatusChip status={status} />
//             {status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.applicationNo}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {history.length === 0 && (
//                 <p className="text-sm text-ink-400">No status history yet.</p>
//               )}
//               {history.map((entry, i) => {
//                 const done = true; // every entry in statusHistory already happened
//                 const isLast = i === history.length - 1;
//                 return (
//                   <div key={entry._id || i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {isLast ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== history.length - 1 && (
//                         <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                       {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
//                       <p className="text-xs text-ink-400">
//                         {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
//                         {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }


// ====================================================

// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiArrowRight, FiCornerUpLeft, FiEdit2 } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { Textarea } from "../../../components/ui/Field";
// import Button from "../../../components/ui/Button";
// import { useAuth } from "../../auth/hooks/useAuth";
// import {
//   fetchVendorApplicationByNo,
//   forwardApplicationToSurvey,
//   sendApplicationBackToVendor,
//   submitApplicationDraft,
// } from "../../../services/vendorApplicationService";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// // ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

// export default function VendorProfile() {
//   const { id: applicationNo } = useParams();
//   const { user } = useAuth();
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState(TABS[0]);

//   const [remarks, setRemarks] = useState("");
//   const [actionSubmitting, setActionSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadVendor = () => {
//     setLoading(true);
//     setError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//     });
//   };

//   useEffect(() => {
//     loadVendor();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [applicationNo]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const status = displayStatus(vendor.status);
//   const registrationDate = vendor.createdAt?.slice(0, 10);
//   const history = vendor.statusHistory || [];

//   // ── Vendor viewing their OWN application can submit it themselves ──
//   const isOwnerVendor = user?.role === "vendor" && vendor.createdById === user?.id;
//   const canVendorSubmit = isOwnerVendor && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
//   const canVendorPay = isOwnerVendor && vendor.status === "Payment Pending";

//   // ── Counter Officer's actions ──
//   // 1) A Draft the vendor never submitted — Counter Officer can push it forward on their behalf.
//   // 2) A freshly-submitted (or previously sent-back) application — forward to Survey Officer, or send back.
//   const isCounterOfficer = user?.role === "counter_officer";
//   const canSubmitOnBehalf = isCounterOfficer && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
//   const canActAsCounterOfficer =
//     isCounterOfficer && ["Submitted", "Sent Back to Counter Officer"].includes(vendor.status);

//   const handleSubmitOnBehalf = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await submitApplicationDraft(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not submit this application.");
//       return;
//     }
//     loadVendor();
//   };

//   const handleForward = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await forwardApplicationToSurvey(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not forward this application.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   const handleSendBackToVendor = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await sendApplicationBackToVendor(applicationNo, { remarks });
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not send this application back.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       {canVendorPay && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Payment Required</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             Your application has been approved by A.M.C. Complete the payment to receive your Smart Card.
//           </p>
//           <Link to={`/vendors/payment/${applicationNo}`}>
//             <Button variant="primary" icon={FiArrowRight}>
//               Proceed to Payment
//             </Button>
//           </Link>
//         </Card>
//       )}

//       {canVendorSubmit && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Complete Your Application</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             {vendor.status === "Sent Back to Vendor"
//               ? "Your application was sent back for corrections. Once you're ready, submit it again for review."
//               : "Your application is saved as a draft. Submit it to send it for review."}
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="flex flex-wrap items-center gap-4">
//             <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Submit Application"}
//             </Button>
//             <Link
//               to={`/vendors/edit/${applicationNo}`}
//               className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//             >
//               <FiEdit2 size={13} /> Edit Application First
//             </Link>
//           </div>
//         </Card>
//       )}

//       {canSubmitOnBehalf && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is still a Draft — the vendor hasn't submitted it yet. You can submit it on
//             their behalf to move it into the workflow.
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="flex flex-wrap items-center gap-4">
//             <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Submit for Review"}
//             </Button>
//             <Link
//               to={`/vendors/edit/${applicationNo}`}
//               className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//             >
//               <FiEdit2 size={13} /> Edit Application First
//             </Link>
//           </div>
//         </Card>
//       )}

//       {canActAsCounterOfficer && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is submitted and waiting on you — forward it to the Survey Officer, or send it
//             back to the vendor if something needs correcting.
//           </p>

//           <Textarea
//             label="Remarks (required if sending back)"
//             placeholder="Add remarks..."
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           />

//           {actionError && (
//             <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <Button variant="accent" icon={FiCornerUpLeft} onClick={handleSendBackToVendor} disabled={actionSubmitting || !remarks.trim()}>
//               Send Back to Vendor
//             </Button>
//             <Button variant="primary" icon={FiArrowRight} onClick={handleForward} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Forward to Survey Officer"}
//             </Button>
//           </div>

//           <Link
//             to={`/vendors/edit/${applicationNo}`}
//             className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//           >
//             <FiEdit2 size={13} /> Edit Application Details
//           </Link>
//         </Card>
//       )}

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">
//               Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
//             </span>
//             <StatusChip status={status} />
//             {status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.applicationNo}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {history.length === 0 && (
//                 <p className="text-sm text-ink-400">No status history yet.</p>
//               )}
//               {history.map((entry, i) => {
//                 const done = true; // every entry in statusHistory already happened
//                 const isLast = i === history.length - 1;
//                 return (
//                   <div key={entry._id || i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {isLast ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== history.length - 1 && (
//                         <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                       {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
//                       <p className="text-xs text-ink-400">
//                         {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
//                         {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }

// =============================================================

// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiArrowRight, FiCornerUpLeft, FiEdit2 } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { Textarea } from "../../../components/ui/Field";
// import Button from "../../../components/ui/Button";
// import { useAuth } from "../../auth/hooks/useAuth";
// import {
//   fetchVendorApplicationByNo,
//   forwardApplicationToSurvey,
//   sendApplicationBackToVendor,
//   submitApplicationDraft,
// } from "../../../services/vendorApplicationService";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// // ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

// export default function VendorProfile() {
//   const { id: applicationNo } = useParams();
//   const { user } = useAuth();
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState(TABS[0]);

//   const [remarks, setRemarks] = useState("");
//   const [actionSubmitting, setActionSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadVendor = () => {
//     setLoading(true);
//     setError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//     });
//   };

//   useEffect(() => {
//     loadVendor();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [applicationNo]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const status = displayStatus(vendor.status);
//   const registrationDate = vendor.createdAt?.slice(0, 10);
//   const history = vendor.statusHistory || [];

//   // ── Vendor viewing their OWN application can submit/pay for it themselves.
//   //    Match by createdById OR by mobile number — covers applications a Counter Officer
//   //    filled in on the vendor's behalf, where createdById may not equal the vendor's own id. ──
//   const isOwnerVendor =
//     user?.role === "vendor" &&
//     (vendor.createdById === user?.id ||
//       (user?.mobileNumber && vendor.personal?.mobile === user?.mobileNumber));
//   const canVendorSubmit = isOwnerVendor && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
//   const canVendorPay = isOwnerVendor && vendor.status === "Payment Pending";

//   // ── Counter Officer's actions ──
//   // 1) A Draft the vendor never submitted — Counter Officer can push it forward on their behalf.
//   // 2) A freshly-submitted (or previously sent-back) application — forward to Survey Officer, or send back.
//   const isCounterOfficer = user?.role === "counter_officer";
//   const canSubmitOnBehalf = isCounterOfficer && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
//   const canActAsCounterOfficer =
//     isCounterOfficer && ["Submitted", "Sent Back to Counter Officer"].includes(vendor.status);

//   const handleSubmitOnBehalf = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await submitApplicationDraft(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not submit this application.");
//       return;
//     }
//     loadVendor();
//   };

//   const handleForward = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await forwardApplicationToSurvey(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not forward this application.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   const handleSendBackToVendor = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await sendApplicationBackToVendor(applicationNo, { remarks });
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not send this application back.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       {canVendorPay && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Payment Required</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             Your application has been approved by A.M.C. Complete the payment to receive your Smart Card.
//           </p>
//           <Link to={`/vendors/payment/${applicationNo}`}>
//             <Button variant="primary" icon={FiArrowRight}>
//               Proceed to Payment
//             </Button>
//           </Link>
//         </Card>
//       )}

//       {canVendorSubmit && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Complete Your Application</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             {vendor.status === "Sent Back to Vendor"
//               ? "Your application was sent back for corrections. Once you're ready, submit it again for review."
//               : "Your application is saved as a draft. Submit it to send it for review."}
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="flex flex-wrap items-center gap-4">
//             <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Submit Application"}
//             </Button>
//             <Link
//               to={`/vendors/edit/${applicationNo}`}
//               className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//             >
//               <FiEdit2 size={13} /> Edit Application First
//             </Link>
//           </div>
//         </Card>
//       )}

//       {canSubmitOnBehalf && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is still a Draft — the vendor hasn't submitted it yet. You can submit it on
//             their behalf to move it into the workflow.
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="flex flex-wrap items-center gap-4">
//             <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Submit for Review"}
//             </Button>
//             <Link
//               to={`/vendors/edit/${applicationNo}`}
//               className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//             >
//               <FiEdit2 size={13} /> Edit Application First
//             </Link>
//           </div>
//         </Card>
//       )}

//       {canActAsCounterOfficer && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is submitted and waiting on you — forward it to the Survey Officer, or send it
//             back to the vendor if something needs correcting.
//           </p>

//           <Textarea
//             label="Remarks (required if sending back)"
//             placeholder="Add remarks..."
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           />

//           {actionError && (
//             <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <Button variant="accent" icon={FiCornerUpLeft} onClick={handleSendBackToVendor} disabled={actionSubmitting || !remarks.trim()}>
//               Send Back to Vendor
//             </Button>
//             <Button variant="primary" icon={FiArrowRight} onClick={handleForward} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Forward to Survey Officer"}
//             </Button>
//           </div>

//           <Link
//             to={`/vendors/edit/${applicationNo}`}
//             className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//           >
//             <FiEdit2 size={13} /> Edit Application Details
//           </Link>
//         </Card>
//       )}

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">
//               Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
//             </span>
//             <StatusChip status={status} />
//             {status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.applicationNo}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {history.length === 0 && (
//                 <p className="text-sm text-ink-400">No status history yet.</p>
//               )}
//               {history.map((entry, i) => {
//                 const done = true; // every entry in statusHistory already happened
//                 const isLast = i === history.length - 1;
//                 return (
//                   <div key={entry._id || i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {isLast ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== history.length - 1 && (
//                         <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                       {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
//                       <p className="text-xs text-ink-400">
//                         {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
//                         {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }


// ===================================================


// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// const HISTORY_STAGES = ["Registration Submitted", "Survey", "Counter Employee", "Approval Authority"];

// export default function VendorProfile() {
//   const { id } = useParams();
//   const vendor = useSelector((s) => selectVendorById(s, id));
//   const [tab, setTab] = useState(TABS[0]);

//   if (!vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Vendor not found.</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const currentIdx = HISTORY_STAGES.indexOf(
//     vendor.currentStage === "Survey"
//       ? "Survey"
//       : vendor.currentStage === "Approval Authority"
//       ? "Approval Authority"
//       : vendor.currentStage === "Approved"
//       ? "Approval Authority"
//       : "Registration Submitted"
//   );

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{vendor.registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">Current Stage: <span className="font-semibold text-ink-800">{vendor.currentStage}</span></span>
//             <StatusChip status={vendor.status} />
//             {vendor.status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.id}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {HISTORY_STAGES.map((stage, i) => {
//                 const done = i <= currentIdx;
//                 return (
//                   <div key={stage} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           done ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {done ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== HISTORY_STAGES.length - 1 && (
//                         <div className={`w-[2px] flex-1 ${done ? "bg-brand-500" : "bg-ink-100"}`} style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className={`text-sm font-semibold ${done ? "text-ink-900" : "text-ink-400"}`}>{stage}</p>
//                       <p className="text-xs text-ink-400">
//                         {done ? "Completed" : "Pending"}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// // ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

// export default function VendorProfile() {
//   const { id: applicationNo } = useParams();
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState(TABS[0]);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const status = displayStatus(vendor.status);
//   const registrationDate = vendor.createdAt?.slice(0, 10);
//   const history = vendor.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">
//               Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
//             </span>
//             <StatusChip status={status} />
//             {status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.applicationNo}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {history.length === 0 && (
//                 <p className="text-sm text-ink-400">No status history yet.</p>
//               )}
//               {history.map((entry, i) => {
//                 const done = true; // every entry in statusHistory already happened
//                 const isLast = i === history.length - 1;
//                 return (
//                   <div key={entry._id || i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {isLast ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== history.length - 1 && (
//                         <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                       {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
//                       <p className="text-xs text-ink-400">
//                         {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
//                         {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }

// =================================================================================

// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiArrowRight, FiCornerUpLeft } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { Textarea } from "../../../components/ui/Field";
// import Button from "../../../components/ui/Button";
// import { useAuth } from "../../auth/hooks/useAuth";
// import {
//   fetchVendorApplicationByNo,
//   forwardApplicationToSurvey,
//   sendApplicationBackToVendor,
// } from "../../../services/vendorApplicationService";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// // ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

// export default function VendorProfile() {
//   const { id: applicationNo } = useParams();
//   const { user } = useAuth();
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState(TABS[0]);

//   const [remarks, setRemarks] = useState("");
//   const [actionSubmitting, setActionSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadVendor = () => {
//     setLoading(true);
//     setError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//     });
//   };

//   useEffect(() => {
//     loadVendor();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [applicationNo]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const status = displayStatus(vendor.status);
//   const registrationDate = vendor.createdAt?.slice(0, 10);
//   const history = vendor.statusHistory || [];

//   // ── Counter Officer's action: forward a freshly-submitted application to the Survey Officer,
//   //    or send it back to the vendor for corrections. Only relevant at these two statuses. ──
//   const isCounterOfficer = user?.role === "counter_officer";
//   const canActAsCounterOfficer =
//     isCounterOfficer && ["Submitted", "Sent Back to Counter Officer"].includes(vendor.status);

//   const handleForward = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await forwardApplicationToSurvey(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not forward this application.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   const handleSendBackToVendor = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await sendApplicationBackToVendor(applicationNo, { remarks });
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not send this application back.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       {canActAsCounterOfficer && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is submitted and waiting on you — forward it to the Survey Officer, or send it
//             back to the vendor if something needs correcting.
//           </p>

//           <Textarea
//             label="Remarks (required if sending back)"
//             placeholder="Add remarks..."
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           />

//           {actionError && (
//             <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <Button variant="accent" icon={FiCornerUpLeft} onClick={handleSendBackToVendor} disabled={actionSubmitting || !remarks.trim()}>
//               Send Back to Vendor
//             </Button>
//             <Button variant="primary" icon={FiArrowRight} onClick={handleForward} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Forward to Survey Officer"}
//             </Button>
//           </div>
//         </Card>
//       )}

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">
//               Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
//             </span>
//             <StatusChip status={status} />
//             {status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.applicationNo}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {history.length === 0 && (
//                 <p className="text-sm text-ink-400">No status history yet.</p>
//               )}
//               {history.map((entry, i) => {
//                 const done = true; // every entry in statusHistory already happened
//                 const isLast = i === history.length - 1;
//                 return (
//                   <div key={entry._id || i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {isLast ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== history.length - 1 && (
//                         <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                       {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
//                       <p className="text-xs text-ink-400">
//                         {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
//                         {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }



// ======================================


// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiArrowRight, FiCornerUpLeft } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { Textarea } from "../../../components/ui/Field";
// import Button from "../../../components/ui/Button";
// import { useAuth } from "../../auth/hooks/useAuth";
// import {
//   fetchVendorApplicationByNo,
//   forwardApplicationToSurvey,
//   sendApplicationBackToVendor,
//   submitApplicationDraft,
// } from "../../../services/vendorApplicationService";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// // ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

// export default function VendorProfile() {
//   const { id: applicationNo } = useParams();
//   const { user } = useAuth();
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState(TABS[0]);

//   const [remarks, setRemarks] = useState("");
//   const [actionSubmitting, setActionSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadVendor = () => {
//     setLoading(true);
//     setError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//     });
//   };

//   useEffect(() => {
//     loadVendor();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [applicationNo]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const status = displayStatus(vendor.status);
//   const registrationDate = vendor.createdAt?.slice(0, 10);
//   const history = vendor.statusHistory || [];

//   // ── Counter Officer's actions ──
//   // 1) A Draft the vendor never submitted — Counter Officer can push it forward on their behalf.
//   // 2) A freshly-submitted (or previously sent-back) application — forward to Survey Officer, or send back.
//   const isCounterOfficer = user?.role === "counter_officer";
//   const canSubmitOnBehalf = isCounterOfficer && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
//   const canActAsCounterOfficer =
//     isCounterOfficer && ["Submitted", "Sent Back to Counter Officer"].includes(vendor.status);

//   const handleSubmitOnBehalf = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await submitApplicationDraft(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not submit this application.");
//       return;
//     }
//     loadVendor();
//   };

//   const handleForward = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await forwardApplicationToSurvey(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not forward this application.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   const handleSendBackToVendor = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await sendApplicationBackToVendor(applicationNo, { remarks });
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not send this application back.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       {canSubmitOnBehalf && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is still a Draft — the vendor hasn't submitted it yet. You can submit it on
//             their behalf to move it into the workflow.
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//             {actionSubmitting ? "Please wait..." : "Submit for Review"}
//           </Button>
//         </Card>
//       )}

//       {canActAsCounterOfficer && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is submitted and waiting on you — forward it to the Survey Officer, or send it
//             back to the vendor if something needs correcting.
//           </p>

//           <Textarea
//             label="Remarks (required if sending back)"
//             placeholder="Add remarks..."
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           />

//           {actionError && (
//             <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <Button variant="accent" icon={FiCornerUpLeft} onClick={handleSendBackToVendor} disabled={actionSubmitting || !remarks.trim()}>
//               Send Back to Vendor
//             </Button>
//             <Button variant="primary" icon={FiArrowRight} onClick={handleForward} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Forward to Survey Officer"}
//             </Button>
//           </div>
//         </Card>
//       )}

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">
//               Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
//             </span>
//             <StatusChip status={status} />
//             {status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.applicationNo}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {history.length === 0 && (
//                 <p className="text-sm text-ink-400">No status history yet.</p>
//               )}
//               {history.map((entry, i) => {
//                 const done = true; // every entry in statusHistory already happened
//                 const isLast = i === history.length - 1;
//                 return (
//                   <div key={entry._id || i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {isLast ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== history.length - 1 && (
//                         <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                       {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
//                       <p className="text-xs text-ink-400">
//                         {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
//                         {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }

// ================================================

// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiArrowRight, FiCornerUpLeft } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { Textarea } from "../../../components/ui/Field";
// import Button from "../../../components/ui/Button";
// import { useAuth } from "../../auth/hooks/useAuth";
// import {
//   fetchVendorApplicationByNo,
//   forwardApplicationToSurvey,
//   sendApplicationBackToVendor,
//   submitApplicationDraft,
// } from "../../../services/vendorApplicationService";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// // ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

// export default function VendorProfile() {
//   const { id: applicationNo } = useParams();
//   const { user } = useAuth();
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState(TABS[0]);

//   const [remarks, setRemarks] = useState("");
//   const [actionSubmitting, setActionSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadVendor = () => {
//     setLoading(true);
//     setError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//     });
//   };

//   useEffect(() => {
//     loadVendor();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [applicationNo]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const status = displayStatus(vendor.status);
//   const registrationDate = vendor.createdAt?.slice(0, 10);
//   const history = vendor.statusHistory || [];

//   // ── Vendor viewing their OWN application can submit it themselves ──
//   const isOwnerVendor = user?.role === "vendor" && vendor.createdById === user?.id;
//   const canVendorSubmit = isOwnerVendor && ["Draft", "Sent Back to Vendor"].includes(vendor.status);

//   // ── Counter Officer's actions ──
//   // 1) A Draft the vendor never submitted — Counter Officer can push it forward on their behalf.
//   // 2) A freshly-submitted (or previously sent-back) application — forward to Survey Officer, or send back.
//   const isCounterOfficer = user?.role === "counter_officer";
//   const canSubmitOnBehalf = isCounterOfficer && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
//   const canActAsCounterOfficer =
//     isCounterOfficer && ["Submitted", "Sent Back to Counter Officer"].includes(vendor.status);

//   const handleSubmitOnBehalf = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await submitApplicationDraft(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not submit this application.");
//       return;
//     }
//     loadVendor();
//   };

//   const handleForward = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await forwardApplicationToSurvey(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not forward this application.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   const handleSendBackToVendor = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await sendApplicationBackToVendor(applicationNo, { remarks });
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not send this application back.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       {canVendorSubmit && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Complete Your Application</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             {vendor.status === "Sent Back to Vendor"
//               ? "Your application was sent back for corrections. Once you're ready, submit it again for review."
//               : "Your application is saved as a draft. Submit it to send it for review."}
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//             {actionSubmitting ? "Please wait..." : "Submit Application"}
//           </Button>
//         </Card>
//       )}

//       {canSubmitOnBehalf && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is still a Draft — the vendor hasn't submitted it yet. You can submit it on
//             their behalf to move it into the workflow.
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//             {actionSubmitting ? "Please wait..." : "Submit for Review"}
//           </Button>
//         </Card>
//       )}

//       {canActAsCounterOfficer && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is submitted and waiting on you — forward it to the Survey Officer, or send it
//             back to the vendor if something needs correcting.
//           </p>

//           <Textarea
//             label="Remarks (required if sending back)"
//             placeholder="Add remarks..."
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           />

//           {actionError && (
//             <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <Button variant="accent" icon={FiCornerUpLeft} onClick={handleSendBackToVendor} disabled={actionSubmitting || !remarks.trim()}>
//               Send Back to Vendor
//             </Button>
//             <Button variant="primary" icon={FiArrowRight} onClick={handleForward} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Forward to Survey Officer"}
//             </Button>
//           </div>
//         </Card>
//       )}

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">
//               Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
//             </span>
//             <StatusChip status={status} />
//             {status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.applicationNo}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {history.length === 0 && (
//                 <p className="text-sm text-ink-400">No status history yet.</p>
//               )}
//               {history.map((entry, i) => {
//                 const done = true; // every entry in statusHistory already happened
//                 const isLast = i === history.length - 1;
//                 return (
//                   <div key={entry._id || i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {isLast ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== history.length - 1 && (
//                         <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                       {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
//                       <p className="text-xs text-ink-400">
//                         {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
//                         {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }


// ==========================================

// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiArrowRight, FiCornerUpLeft, FiEdit2 } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { Textarea } from "../../../components/ui/Field";
// import Button from "../../../components/ui/Button";
// import { useAuth } from "../../auth/hooks/useAuth";
// import {
//   fetchVendorApplicationByNo,
//   forwardApplicationToSurvey,
//   sendApplicationBackToVendor,
//   submitApplicationDraft,
// } from "../../../services/vendorApplicationService";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// // ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

// export default function VendorProfile() {
//   const { id: applicationNo } = useParams();
//   const { user } = useAuth();
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState(TABS[0]);

//   const [remarks, setRemarks] = useState("");
//   const [actionSubmitting, setActionSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadVendor = () => {
//     setLoading(true);
//     setError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//     });
//   };

//   useEffect(() => {
//     loadVendor();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [applicationNo]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const status = displayStatus(vendor.status);
//   const registrationDate = vendor.createdAt?.slice(0, 10);
//   const history = vendor.statusHistory || [];

//   // ── Vendor viewing their OWN application can submit it themselves ──
//   const isOwnerVendor = user?.role === "vendor" && vendor.createdById === user?.id;
//   const canVendorSubmit = isOwnerVendor && ["Draft", "Sent Back to Vendor"].includes(vendor.status);

//   // ── Counter Officer's actions ──
//   // 1) A Draft the vendor never submitted — Counter Officer can push it forward on their behalf.
//   // 2) A freshly-submitted (or previously sent-back) application — forward to Survey Officer, or send back.
//   const isCounterOfficer = user?.role === "counter_officer";
//   const canSubmitOnBehalf = isCounterOfficer && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
//   const canActAsCounterOfficer =
//     isCounterOfficer && ["Submitted", "Sent Back to Counter Officer"].includes(vendor.status);

//   const handleSubmitOnBehalf = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await submitApplicationDraft(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not submit this application.");
//       return;
//     }
//     loadVendor();
//   };

//   const handleForward = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await forwardApplicationToSurvey(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not forward this application.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   const handleSendBackToVendor = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await sendApplicationBackToVendor(applicationNo, { remarks });
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not send this application back.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       {canVendorSubmit && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Complete Your Application</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             {vendor.status === "Sent Back to Vendor"
//               ? "Your application was sent back for corrections. Once you're ready, submit it again for review."
//               : "Your application is saved as a draft. Submit it to send it for review."}
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="flex flex-wrap items-center gap-4">
//             <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Submit Application"}
//             </Button>
//             <Link
//               to={`/vendors/edit/${applicationNo}`}
//               className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//             >
//               <FiEdit2 size={13} /> Edit Application First
//             </Link>
//           </div>
//         </Card>
//       )}

//       {canSubmitOnBehalf && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is still a Draft — the vendor hasn't submitted it yet. You can submit it on
//             their behalf to move it into the workflow.
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="flex flex-wrap items-center gap-4">
//             <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Submit for Review"}
//             </Button>
//             <Link
//               to={`/vendors/edit/${applicationNo}`}
//               className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//             >
//               <FiEdit2 size={13} /> Edit Application First
//             </Link>
//           </div>
//         </Card>
//       )}

//       {canActAsCounterOfficer && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is submitted and waiting on you — forward it to the Survey Officer, or send it
//             back to the vendor if something needs correcting.
//           </p>

//           <Textarea
//             label="Remarks (required if sending back)"
//             placeholder="Add remarks..."
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           />

//           {actionError && (
//             <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <Button variant="accent" icon={FiCornerUpLeft} onClick={handleSendBackToVendor} disabled={actionSubmitting || !remarks.trim()}>
//               Send Back to Vendor
//             </Button>
//             <Button variant="primary" icon={FiArrowRight} onClick={handleForward} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Forward to Survey Officer"}
//             </Button>
//           </div>

//           <Link
//             to={`/vendors/edit/${applicationNo}`}
//             className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//           >
//             <FiEdit2 size={13} /> Edit Application Details
//           </Link>
//         </Card>
//       )}

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">
//               Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
//             </span>
//             <StatusChip status={status} />
//             {status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.applicationNo}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {history.length === 0 && (
//                 <p className="text-sm text-ink-400">No status history yet.</p>
//               )}
//               {history.map((entry, i) => {
//                 const done = true; // every entry in statusHistory already happened
//                 const isLast = i === history.length - 1;
//                 return (
//                   <div key={entry._id || i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {isLast ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== history.length - 1 && (
//                         <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                       {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
//                       <p className="text-xs text-ink-400">
//                         {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
//                         {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }


// ====================================================

// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiArrowRight, FiCornerUpLeft, FiEdit2 } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import StatusChip from "../../../components/ui/StatusChip";
// import { Textarea } from "../../../components/ui/Field";
// import Button from "../../../components/ui/Button";
// import { useAuth } from "../../auth/hooks/useAuth";
// import {
//   fetchVendorApplicationByNo,
//   forwardApplicationToSurvey,
//   sendApplicationBackToVendor,
//   submitApplicationDraft,
// } from "../../../services/vendorApplicationService";
// import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

// const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// // ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

// export default function VendorProfile() {
//   const { id: applicationNo } = useParams();
//   const { user } = useAuth();
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState(TABS[0]);

//   const [remarks, setRemarks] = useState("");
//   const [actionSubmitting, setActionSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadVendor = () => {
//     setLoading(true);
//     setError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//     });
//   };

//   useEffect(() => {
//     loadVendor();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [applicationNo]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   const status = displayStatus(vendor.status);
//   const registrationDate = vendor.createdAt?.slice(0, 10);
//   const history = vendor.statusHistory || [];

//   // ── Vendor viewing their OWN application can submit it themselves ──
//   const isOwnerVendor = user?.role === "vendor" && vendor.createdById === user?.id;
//   const canVendorSubmit = isOwnerVendor && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
//   const canVendorPay = isOwnerVendor && vendor.status === "Payment Pending";

//   // ── Counter Officer's actions ──
//   // 1) A Draft the vendor never submitted — Counter Officer can push it forward on their behalf.
//   // 2) A freshly-submitted (or previously sent-back) application — forward to Survey Officer, or send back.
//   const isCounterOfficer = user?.role === "counter_officer";
//   const canSubmitOnBehalf = isCounterOfficer && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
//   const canActAsCounterOfficer =
//     isCounterOfficer && ["Submitted", "Sent Back to Counter Officer"].includes(vendor.status);

//   const handleSubmitOnBehalf = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await submitApplicationDraft(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not submit this application.");
//       return;
//     }
//     loadVendor();
//   };

//   const handleForward = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await forwardApplicationToSurvey(applicationNo);
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not forward this application.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   const handleSendBackToVendor = async () => {
//     setActionError("");
//     setActionSubmitting(true);
//     const result = await sendApplicationBackToVendor(applicationNo, { remarks });
//     setActionSubmitting(false);
//     if (!result.success) {
//       setActionError(result.message || "Could not send this application back.");
//       return;
//     }
//     setRemarks("");
//     loadVendor();
//   };

//   return (
//     <div className="space-y-5">
//       <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to List
//       </Link>

//       {canVendorPay && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Payment Required</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             Your application has been approved by A.M.C. Complete the payment to receive your Smart Card.
//           </p>
//           <Link to={`/vendors/payment/${applicationNo}`}>
//             <Button variant="primary" icon={FiArrowRight}>
//               Proceed to Payment
//             </Button>
//           </Link>
//         </Card>
//       )}

//       {canVendorSubmit && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Complete Your Application</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             {vendor.status === "Sent Back to Vendor"
//               ? "Your application was sent back for corrections. Once you're ready, submit it again for review."
//               : "Your application is saved as a draft. Submit it to send it for review."}
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="flex flex-wrap items-center gap-4">
//             <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Submit Application"}
//             </Button>
//             <Link
//               to={`/vendors/edit/${applicationNo}`}
//               className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//             >
//               <FiEdit2 size={13} /> Edit Application First
//             </Link>
//           </div>
//         </Card>
//       )}

//       {canSubmitOnBehalf && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is still a Draft — the vendor hasn't submitted it yet. You can submit it on
//             their behalf to move it into the workflow.
//           </p>

//           {actionError && (
//             <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="flex flex-wrap items-center gap-4">
//             <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Submit for Review"}
//             </Button>
//             <Link
//               to={`/vendors/edit/${applicationNo}`}
//               className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//             >
//               <FiEdit2 size={13} /> Edit Application First
//             </Link>
//           </div>
//         </Card>
//       )}

//       {canActAsCounterOfficer && (
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
//           <p className="mb-4 text-xs text-ink-500">
//             This application is submitted and waiting on you — forward it to the Survey Officer, or send it
//             back to the vendor if something needs correcting.
//           </p>

//           <Textarea
//             label="Remarks (required if sending back)"
//             placeholder="Add remarks..."
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           />

//           {actionError && (
//             <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {actionError}
//             </div>
//           )}

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <Button variant="accent" icon={FiCornerUpLeft} onClick={handleSendBackToVendor} disabled={actionSubmitting || !remarks.trim()}>
//               Send Back to Vendor
//             </Button>
//             <Button variant="primary" icon={FiArrowRight} onClick={handleForward} disabled={actionSubmitting}>
//               {actionSubmitting ? "Please wait..." : "Forward to Survey Officer"}
//             </Button>
//           </div>

//           <Link
//             to={`/vendors/edit/${applicationNo}`}
//             className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
//           >
//             <FiEdit2 size={13} /> Edit Application Details
//           </Link>
//         </Card>
//       )}

//       <Card>
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
//             <div>
//               <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
//               <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
//                 <span>
//                   Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
//                 </span>
//                 <span>
//                   Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:items-end">
//             <span className="text-xs text-ink-500">
//               Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
//             </span>
//             <StatusChip status={status} />
//             {status === "Approved" && (
//               <Link
//                 to={`/smart-card/${vendor.applicationNo}`}
//                 className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//               >
//                 Generate Smart Card
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
//                 tab === t
//                   ? "border-brand-500 text-brand-700"
//                   : "border-transparent text-ink-500 hover:text-ink-700"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="pt-6">
//           {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
//           {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
//           {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
//           {tab === "History" && (
//             <div className="space-y-6">
//               {history.length === 0 && (
//                 <p className="text-sm text-ink-400">No status history yet.</p>
//               )}
//               {history.map((entry, i) => {
//                 const done = true; // every entry in statusHistory already happened
//                 const isLast = i === history.length - 1;
//                 return (
//                   <div key={entry._id || i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
//                           isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
//                         }`}
//                       >
//                         {isLast ? <FiCheckCircle size={15} /> : i + 1}
//                       </div>
//                       {i !== history.length - 1 && (
//                         <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
//                       )}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                       {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
//                       <p className="text-xs text-ink-400">
//                         {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
//                         {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }

// =============================================================

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiArrowRight, FiCornerUpLeft, FiEdit2, FiZap } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Avatar from "../../../components/ui/Avatar";
import { IdBadge } from "../../../components/ui/Avatar";
import StatusChip from "../../../components/ui/StatusChip";
import { Textarea } from "../../../components/ui/Field";
import Button from "../../../components/ui/Button";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  fetchVendorApplicationByNo,
  forwardApplicationToSurvey,
  sendApplicationBackToVendor,
  submitApplicationDraft,
  emergencyIssueCertificate,
} from "../../../services/vendorApplicationService";
import { PersonalDetailsPanel, BusinessInfoPanel, DocumentsPanel } from "./VendorDetails";

const TABS = ["Personal Details", "Business Info", "Documents", "History"];

// ── Backend's real workflow status → the simpler display buckets the UI uses ──
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

export default function VendorProfile() {
  const { id: applicationNo } = useParams();
  const { user } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState(TABS[0]);

  const [remarks, setRemarks] = useState("");
  const [actionSubmitting, setActionSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [emergencySubmitting, setEmergencySubmitting] = useState(false);
  const [emergencyError, setEmergencyError] = useState("");

  const loadVendor = () => {
    setLoading(true);
    setError("");
    fetchVendorApplicationByNo(applicationNo).then((result) => {
      setLoading(false);
      if (!result.success) {
        setError(result.message || "Vendor not found.");
        return;
      }
      setVendor(result.data);
    });
  };

  useEffect(() => {
    loadVendor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationNo]);

  if (loading) {
    return (
      <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
        <FiLoader className="animate-spin" size={20} />
        Loading application...
      </Card>
    );
  }

  if (error || !vendor) {
    return (
      <Card className="mx-auto max-w-md text-center">
        <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
        <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
        <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
          Back to Vendor List
        </Link>
      </Card>
    );
  }

  const status = displayStatus(vendor.status);
  const registrationDate = vendor.createdAt?.slice(0, 10);
  const history = vendor.statusHistory || [];

  // ── Vendor viewing their OWN application can submit/pay for it themselves.
  //    Match by createdById OR by mobile number — covers applications a Counter Officer
  //    filled in on the vendor's behalf, where createdById may not equal the vendor's own id. ──
  const isOwnerVendor =
    user?.role === "vendor" &&
    (vendor.createdById === user?.id ||
      (user?.mobileNumber && vendor.personal?.mobile === user?.mobileNumber));
  const canVendorSubmit = isOwnerVendor && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
  const canVendorPay = isOwnerVendor && vendor.status === "Payment Pending";

  // ── Counter Officer's actions ──
  // 1) A Draft the vendor never submitted — Counter Officer can push it forward on their behalf.
  // 2) A freshly-submitted (or previously sent-back) application — forward to Survey Officer, or send back.
  const isCounterOfficer = user?.role === "counter_officer";
  const canSubmitOnBehalf = isCounterOfficer && ["Draft", "Sent Back to Vendor"].includes(vendor.status);
  const canActAsCounterOfficer =
    isCounterOfficer && ["Submitted", "Sent Back to Counter Officer"].includes(vendor.status);

  // ── EMERGENCY bypass — available to Counter Officer at any in-progress stage before the
  //    certificate is actually issued (rescues an application stuck anywhere in the pipeline).
  //    The normal Survey → A.M.C. → Payment flow is completely unaffected for everyone else. ──
  const EMERGENCY_ELIGIBLE_STATUSES = [
    "Submitted",
    "Sent Back to Counter Officer",
    "Forwarded to Survey Officer",
    "Survey Approved",
    "Forwarded to A.M.C.",
    "A.M.C. Approved",
    "Payment Pending",
  ];
  const canEmergencyIssue = isCounterOfficer && EMERGENCY_ELIGIBLE_STATUSES.includes(vendor.status);

  const handleSubmitOnBehalf = async () => {
    setActionError("");
    setActionSubmitting(true);
    const result = await submitApplicationDraft(applicationNo);
    setActionSubmitting(false);
    if (!result.success) {
      setActionError(result.message || "Could not submit this application.");
      return;
    }
    loadVendor();
  };

  const handleForward = async () => {
    setActionError("");
    setActionSubmitting(true);
    const result = await forwardApplicationToSurvey(applicationNo);
    setActionSubmitting(false);
    if (!result.success) {
      setActionError(result.message || "Could not forward this application.");
      return;
    }
    setRemarks("");
    loadVendor();
  };

  const handleSendBackToVendor = async () => {
    setActionError("");
    setActionSubmitting(true);
    const result = await sendApplicationBackToVendor(applicationNo, { remarks });
    setActionSubmitting(false);
    if (!result.success) {
      setActionError(result.message || "Could not send this application back.");
      return;
    }
    setRemarks("");
    loadVendor();
  };

  // ── EMERGENCY — Counter Officer bypass: skip Survey/A.M.C./Payment, straight to Certificate ──
  const handleEmergencyIssue = async () => {
    // if (!window.confirm("This skips Survey, A.M.C. approval, and Payment, and issues the Smart Card immediately. Are you sure?")) {
    //   return;
    // }
    setEmergencyError("");
    setEmergencySubmitting(true);
    const result = await emergencyIssueCertificate(applicationNo, { remarks });
    setEmergencySubmitting(false);
    if (!result.success) {
      setEmergencyError(result.message || "Could not issue the certificate.");
      return;
    }
    setRemarks("");
    loadVendor();
  };

  return (
    <div className="space-y-5">
      <Link to="/vendors/list" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
        <FiArrowLeft size={14} /> Back to List
      </Link>

      {canVendorPay && (
        <Card>
          <h2 className="mb-1 font-display text-base font-bold text-ink-900">Payment Required</h2>
          <p className="mb-4 text-xs text-ink-500">
            Your application has been approved by A.M.C. Complete the payment to receive your Smart Card.
          </p>
          <Link to={`/vendors/payment/${applicationNo}`}>
            <Button variant="primary" icon={FiArrowRight}>
              Proceed to Payment
            </Button>
          </Link>
        </Card>
      )}

      {canVendorSubmit && (
        <Card>
          <h2 className="mb-1 font-display text-base font-bold text-ink-900">Complete Your Application</h2>
          <p className="mb-4 text-xs text-ink-500">
            {vendor.status === "Sent Back to Vendor"
              ? "Your application was sent back for corrections. Once you're ready, submit it again for review."
              : "Your application is saved as a draft. Submit it to send it for review."}
          </p>

          {actionError && (
            <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
              {actionError}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
              {actionSubmitting ? "Please wait..." : "Submit Application"}
            </Button>
            <Link
              to={`/vendors/edit/${applicationNo}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              <FiEdit2 size={13} /> Edit Application First
            </Link>
          </div>
        </Card>
      )}

      {canSubmitOnBehalf && (
        <Card>
          <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
          <p className="mb-4 text-xs text-ink-500">
            This application is still a Draft — the vendor hasn't submitted it yet. You can submit it on
            their behalf to move it into the workflow.
          </p>

          {actionError && (
            <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
              {actionError}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" icon={FiArrowRight} onClick={handleSubmitOnBehalf} disabled={actionSubmitting}>
              {actionSubmitting ? "Please wait..." : "Submit for Review"}
            </Button>
            <Link
              to={`/vendors/edit/${applicationNo}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              <FiEdit2 size={13} /> Edit Application First
            </Link>
          </div>
        </Card>
      )}

      {canActAsCounterOfficer && (
        <Card>
          <h2 className="mb-1 font-display text-base font-bold text-ink-900">Officer Actions</h2>
          <p className="mb-4 text-xs text-ink-500">
            This application is submitted and waiting on you — forward it to the Survey Officer, or send it
            back to the vendor if something needs correcting.
          </p>

          <Textarea
            label="Remarks (required if sending back)"
            placeholder="Add remarks..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />

          {actionError && (
            <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
              {actionError}
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button variant="accent" icon={FiCornerUpLeft} onClick={handleSendBackToVendor} disabled={actionSubmitting || !remarks.trim()}>
              Send Back to Vendor
            </Button>
            <Button variant="primary" icon={FiArrowRight} onClick={handleForward} disabled={actionSubmitting}>
              {actionSubmitting ? "Please wait..." : "Forward to Survey Officer"}
            </Button>
          </div>

          <Link
            to={`/vendors/edit/${applicationNo}`}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            <FiEdit2 size={13} /> Edit Application Details
          </Link>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3.5">
            {/* <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-amber-800">
              <FiZap size={14} />skip Survey/A.M.C./Payment
            </p> */}
            {/* <p className="mb-3 text-[11px] text-amber-700">
              Issues the vendor's Smart Card immediately, bypassing the normal approval chain. Use only for
              urgent situations.
            </p> */}

            {emergencyError && (
              <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600">
                <FiAlertCircle className="mt-0.5 shrink-0" size={14} />
                {emergencyError}
              </div>
            )}

            <Button variant="accent" icon={FiZap} onClick={handleEmergencyIssue} disabled={emergencySubmitting}>
              {emergencySubmitting ? "Please wait..." : "Generate ID Card"}
            </Button>
          </div>
        </Card>
      )}

      {!canActAsCounterOfficer && canEmergencyIssue && (
        <Card>
          {/* <p className="mb-1 flex items-center gap-1.5 font-display text-base font-bold text-amber-800">
            <FiZap size={16} /> Emergency Actions
          </p>
          <p className="mb-3 text-xs text-ink-500">
            This application is currently at "{vendor.status}". You can bypass the remaining
            Survey/A.M.C./Payment steps and issue the vendor's Smart Card immediately.
          </p> */}

          {emergencyError && (
            <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
              {emergencyError}
            </div>
          )}

          <Button variant="accent" icon={FiZap} onClick={handleEmergencyIssue} disabled={emergencySubmitting}>
            {emergencySubmitting ? "Please wait..." : "Generate ID Card"}
          </Button>
        </Card>
      )}

      <Card>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={64} />
            <div>
              <h1 className="font-display text-lg font-bold text-ink-900">{vendor.personal?.fullName}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
                <span>
                  Registration Date <span className="font-semibold text-ink-700">{registrationDate}</span>
                </span>
                <span>
                  Application No. <IdBadge className="ml-1 bg-transparent p-0 text-ink-700">{vendor.applicationNo}</IdBadge>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span className="text-xs text-ink-500">
              Current Stage: <span className="font-semibold text-ink-800">{vendor.status}</span>
            </span>
            <StatusChip status={status} />
            {status === "Approved" && (
              <Link
                to={`/smart-card/${vendor.applicationNo}`}
                className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
              >
                Generate Smart Card
              </Link>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink-100">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === t
                  ? "border-brand-500 text-brand-700"
                  : "border-transparent text-ink-500 hover:text-ink-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="pt-6">
          {tab === "Personal Details" && <PersonalDetailsPanel vendor={vendor} />}
          {tab === "Business Info" && <BusinessInfoPanel vendor={vendor} />}
          {tab === "Documents" && <DocumentsPanel vendor={vendor} />}
          {tab === "History" && (
            <div className="space-y-6">
              {history.length === 0 && (
                <p className="text-sm text-ink-400">No status history yet.</p>
              )}
              {history.map((entry, i) => {
                const done = true; // every entry in statusHistory already happened
                const isLast = i === history.length - 1;
                return (
                  <div key={entry._id || i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                          isLast ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
                        }`}
                      >
                        {isLast ? <FiCheckCircle size={15} /> : i + 1}
                      </div>
                      {i !== history.length - 1 && (
                        <div className="w-[2px] flex-1 bg-brand-500" style={{ minHeight: 28 }} />
                      )}
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
                      {entry.remarks && <p className="text-xs text-ink-500">{entry.remarks}</p>}
                      <p className="text-xs text-ink-400">
                        {entry.changedByName ? `${entry.changedByName} (${entry.changedByRole})` : ""}
                        {entry.createdAt ? ` · ${new Date(entry.createdAt).toLocaleString()}` : ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}