




// // import { useEffect, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// // const TABS = ["Action", "History"];

// // const ACTIONS = [
// //   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// // ];

// // export default function ApplicationDetails() {
// //   const { id: applicationNo } = useParams();
// //   const navigate = useNavigate();

// //   const [application, setApplication] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loadError, setLoadError] = useState("");

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");
// //   const [submitting, setSubmitting] = useState(false);
// //   const [actionError, setActionError] = useState("");

// //   const loadApplication = () => {
// //     setLoading(true);
// //     setLoadError("");
// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       setLoading(false);
// //       if (!result.success) {
// //         setLoadError(result.message || "Application not found.");
// //         return;
// //       }
// //       setApplication(result.data);
// //     });
// //   };

// //   useEffect(() => {
// //     loadApplication();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [applicationNo]);

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading application...
// //       </Card>
// //     );
// //   }

// //   if (loadError || !application) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
// //         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   // A.M.C. can only act while the application is sitting at their stage
// //   const canAct = application.status === "Forwarded to A.M.C.";
// //   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
// //     application.status
// //   );

// //   const handleAction = async (decision) => {
// //     setActionError("");
// //     setSubmitting(true);
// //     const result = await submitAmcDecision(applicationNo, { decision, remarks });
// //     setSubmitting(false);

// //     if (!result.success) {
// //       setActionError(result.message || "Could not record the decision.");
// //       return;
// //     }

// //     setRemarks("");
// //     setApplication(result.data);
// //   };

// //   const history = application.statusHistory || [];

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
// //           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

// //           <div className="space-y-1">
// //             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
// //             {history.map((entry, i) => {
// //               const isLast = i === history.length - 1;
// //               return (
// //                 <div key={entry._id || i} className="flex gap-4">
// //                   <div className="flex flex-col items-center">
// //                     <div
// //                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
// //                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
// //                       }`}
// //                     >
// //                       <FiCheck size={15} />
// //                     </div>
// //                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
// //                   </div>
// //                   <div className="pb-6">
// //                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
// //                     <p className="text-xs text-ink-500">
// //                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
// //                     </p>
// //                     {entry.createdAt && (
// //                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
// //                     )}
// //                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
// //               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.address?.ward} &middot; {application.address?.zone}
// //               </p>
// //             </div>
// //           </div>

// //           {application.survey?.recommendation && (
// //             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
// //               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
// //             </div>
// //           )}

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {!canAct ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     {isFinal ? (
// //                       <>
// //                         This application has reached a final state:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                         {application.status === "A.M.C. Approved" && (
// //                           <div className="mt-3">
// //                             <Link to={`/smart-card/${application.applicationNo}`}>
// //                               <Button size="sm">Generate Smart Card</Button>
// //                             </Link>
// //                           </div>
// //                         )}
// //                       </>
// //                     ) : (
// //                       <>
// //                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                       </>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />

// //                     {actionError && (
// //                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
// //                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
// //                         {actionError}
// //                       </div>
// //                     )}

// //                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
// //                       {ACTIONS.map((a) => (
// //                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
// //                           {submitting ? "Submitting..." : a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
// //                 {[...history].reverse().map((h, i) => (
// //                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
// //                       {h.createdAt && (
// //                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
// //                       )}
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }


// // ==============================


// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// // import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// // import { useAuth } from "../auth/hooks/useAuth";
// // import ApprovalHistory from "./ApprovalHistory";

// // const TABS = ["Action", "History", "Remarks"];

// // const ACTIONS = [
// //   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
// //   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// // ];

// // // Which actions make sense at which stage
// // const STAGE_ACTIONS = {
// //   "Counter Employee": ["Forward", "Send Back", "Reject"],
// //   "Approval Authority": ["Approve", "Send Back", "Reject"],
// // };

// // export default function ApplicationDetails() {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   const application = useSelector((s) => selectApplicationById(s, id));
// //   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");

// //   if (!application || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">Application not found.</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
// //   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

// //   const handleAction = (decision) => {
// //     dispatch(
// //       recordAction({
// //         id: application.id,
// //         actor: user?.name || "Officer",
// //         actorRole: user?.role || application.currentStage,
// //         decision,
// //         remarks,
// //       })
// //     );

// //     if (decision === "Approve" && application.currentStage === "Approval Authority") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
// //     } else if (decision === "Reject") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
// //     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
// //     }

// //     setRemarks("");
// //   };

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
// //           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
// //           <ApprovalHistory application={application} />
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
// //               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.ward} &middot; {application.zone}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {isFinal ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     This application has reached a final state:{" "}
// //                     <span className="font-semibold text-ink-800">{application.status}</span>.
// //                     {application.status === "Approved" && (
// //                       <div className="mt-3">
// //                         <Link to={`/smart-card/${vendor.id}`}>
// //                           <Button size="sm">Generate Smart Card</Button>
// //                         </Link>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />
// //                     <div className="grid grid-cols-2 gap-3">
// //                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
// //                         <Button
// //                           key={a.key}
// //                           variant={a.variant}
// //                           icon={a.icon}
// //                           onClick={() => handleAction(a.key)}
// //                         >
// //                           {a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {[...application.history].reverse().map((h, i) => (
// //                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
// //                       <span className="text-[11px] text-ink-400">
// //                         {new Date(h.date).toLocaleDateString("en-IN")}
// //                       </span>
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.stage} &middot; {h.actor}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {tab === "Remarks" && (
// //               <div className="space-y-3">
// //                 {application.history.filter((h) => h.remarks).length === 0 && (
// //                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
// //                 )}
// //                 {application.history
// //                   .filter((h) => h.remarks)
// //                   .map((h, i) => (
// //                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
// //                       <p className="mb-1 text-xs font-semibold text-ink-500">
// //                         {h.actor} &middot; {h.stage}
// //                       </p>
// //                       {h.remarks}
// //                     </div>
// //                   ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }




// // import { useEffect, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// // const TABS = ["Action", "History"];

// // const ACTIONS = [
// //   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// // ];

// // export default function ApplicationDetails() {
// //   const { id: applicationNo } = useParams();
// //   const navigate = useNavigate();

// //   const [application, setApplication] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loadError, setLoadError] = useState("");

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");
// //   const [submitting, setSubmitting] = useState(false);
// //   const [actionError, setActionError] = useState("");

// //   const loadApplication = () => {
// //     setLoading(true);
// //     setLoadError("");
// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       setLoading(false);
// //       if (!result.success) {
// //         setLoadError(result.message || "Application not found.");
// //         return;
// //       }
// //       setApplication(result.data);
// //     });
// //   };

// //   useEffect(() => {
// //     loadApplication();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [applicationNo]);

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading application...
// //       </Card>
// //     );
// //   }

// //   if (loadError || !application) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
// //         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   // A.M.C. can only act while the application is sitting at their stage
// //   const canAct = application.status === "Forwarded to A.M.C.";
// //   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
// //     application.status
// //   );

// //   const handleAction = async (decision) => {
// //     setActionError("");
// //     setSubmitting(true);
// //     const result = await submitAmcDecision(applicationNo, { decision, remarks });
// //     setSubmitting(false);

// //     if (!result.success) {
// //       setActionError(result.message || "Could not record the decision.");
// //       return;
// //     }

// //     setRemarks("");
// //     setApplication(result.data);
// //   };

// //   const history = application.statusHistory || [];

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
// //           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

// //           <div className="space-y-1">
// //             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
// //             {history.map((entry, i) => {
// //               const isLast = i === history.length - 1;
// //               return (
// //                 <div key={entry._id || i} className="flex gap-4">
// //                   <div className="flex flex-col items-center">
// //                     <div
// //                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
// //                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
// //                       }`}
// //                     >
// //                       <FiCheck size={15} />
// //                     </div>
// //                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
// //                   </div>
// //                   <div className="pb-6">
// //                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
// //                     <p className="text-xs text-ink-500">
// //                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
// //                     </p>
// //                     {entry.createdAt && (
// //                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
// //                     )}
// //                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
// //               <p className="text-xs text-ink-500">{application.business?.businessCategory}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.address?.ward} &middot; {application.address?.zone}
// //               </p>
// //             </div>
// //           </div>

// //           {application.survey?.recommendation && (
// //             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
// //               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
// //             </div>
// //           )}

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {!canAct ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     {isFinal ? (
// //                       <>
// //                         This application has reached a final state:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                         {application.status === "A.M.C. Approved" && (
// //                           <div className="mt-3">
// //                             <Link to={`/smart-card/${application.applicationNo}`}>
// //                               <Button size="sm">Generate Smart Card</Button>
// //                             </Link>
// //                           </div>
// //                         )}
// //                       </>
// //                     ) : (
// //                       <>
// //                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                       </>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />

// //                     {actionError && (
// //                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
// //                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
// //                         {actionError}
// //                       </div>
// //                     )}

// //                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
// //                       {ACTIONS.map((a) => (
// //                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
// //                           {submitting ? "Submitting..." : a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
// //                 {[...history].reverse().map((h, i) => (
// //                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
// //                       {h.createdAt && (
// //                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
// //                       )}
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }







// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// // import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// // import { useAuth } from "../auth/hooks/useAuth";
// // import ApprovalHistory from "./ApprovalHistory";

// // const TABS = ["Action", "History", "Remarks"];

// // const ACTIONS = [
// //   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
// //   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// // ];

// // // Which actions make sense at which stage
// // const STAGE_ACTIONS = {
// //   "Counter Employee": ["Forward", "Send Back", "Reject"],
// //   "Approval Authority": ["Approve", "Send Back", "Reject"],
// // };

// // export default function ApplicationDetails() {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   const application = useSelector((s) => selectApplicationById(s, id));
// //   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");

// //   if (!application || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">Application not found.</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
// //   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

// //   const handleAction = (decision) => {
// //     dispatch(
// //       recordAction({
// //         id: application.id,
// //         actor: user?.name || "Officer",
// //         actorRole: user?.role || application.currentStage,
// //         decision,
// //         remarks,
// //       })
// //     );

// //     if (decision === "Approve" && application.currentStage === "Approval Authority") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
// //     } else if (decision === "Reject") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
// //     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
// //     }

// //     setRemarks("");
// //   };

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
// //           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
// //           <ApprovalHistory application={application} />
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
// //               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.ward} &middot; {application.zone}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {isFinal ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     This application has reached a final state:{" "}
// //                     <span className="font-semibold text-ink-800">{application.status}</span>.
// //                     {application.status === "Approved" && (
// //                       <div className="mt-3">
// //                         <Link to={`/smart-card/${vendor.id}`}>
// //                           <Button size="sm">Generate Smart Card</Button>
// //                         </Link>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />
// //                     <div className="grid grid-cols-2 gap-3">
// //                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
// //                         <Button
// //                           key={a.key}
// //                           variant={a.variant}
// //                           icon={a.icon}
// //                           onClick={() => handleAction(a.key)}
// //                         >
// //                           {a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {[...application.history].reverse().map((h, i) => (
// //                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
// //                       <span className="text-[11px] text-ink-400">
// //                         {new Date(h.date).toLocaleDateString("en-IN")}
// //                       </span>
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.stage} &middot; {h.actor}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {tab === "Remarks" && (
// //               <div className="space-y-3">
// //                 {application.history.filter((h) => h.remarks).length === 0 && (
// //                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
// //                 )}
// //                 {application.history
// //                   .filter((h) => h.remarks)
// //                   .map((h, i) => (
// //                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
// //                       <p className="mb-1 text-xs font-semibold text-ink-500">
// //                         {h.actor} &middot; {h.stage}
// //                       </p>
// //                       {h.remarks}
// //                     </div>
// //                   ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiMapPin } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision, generateIdCardByAmc } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");
//   const [idCardSubmitting, setIdCardSubmitting] = useState(false);
//   const [idCardError, setIdCardError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   // ── A.M.C.: generate the ID Card right after approval, without payment (future scope) ──
//   const handleGenerateIdCard = async () => {
//     setIdCardError("");
//     setIdCardSubmitting(true);
//     const result = await generateIdCardByAmc(applicationNo, { remarks });
//     setIdCardSubmitting(false);
//     if (!result.success) {
//       setIdCardError(result.message || "Could not generate the ID card.");
//       return;
//     }
//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//               {application.survey.geoLocation?.lat != null && application.survey.geoLocation?.lng != null && (
//                 <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-600">
//                   <FiMapPin size={13} className="text-brand-500" />
//                   {application.survey.geoLocation.lat}, {application.survey.geoLocation.lng}
//                   <a
//                     href={`https://www.google.com/maps?q=${application.survey.geoLocation.lat},${application.survey.geoLocation.lng}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="font-semibold text-brand-600 underline"
//                   >
//                     View on Map
//                   </a>
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {/* CHANGED (29-10 request): Smart Card now auto-generates the instant A.M.C.
//                             approves (see amcDecision on the backend) — so this manual button is no
//                             longer needed in the normal flow. Kept commented, not deleted, as a
//                             fallback in case an older application is ever stuck at "A.M.C. Approved"
//                             without a certificate.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3 space-y-2">
//                             {idCardError && (
//                               <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
//                                 <FiAlertCircle className="mt-0.5 shrink-0" size={14} />
//                                 {idCardError}
//                               </div>
//                             )}
//                             <Button size="sm" variant="success" onClick={handleGenerateIdCard} disabled={idCardSubmitting}>
//                               {idCardSubmitting ? "Please wait..." : "Generate Smart Card"}
//                             </Button>
//                             <p className="text-[11px] text-ink-400">
//                               Payment is not required right now — this issues the Smart Card directly.
//                             </p>
//                           </div>
//                         )}
//                         */}
//                         {application.status === "Certificate Issued" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">View Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }











// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">Generate Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }


// ==============================


// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// import { useAuth } from "../auth/hooks/useAuth";
// import ApprovalHistory from "./ApprovalHistory";

// const TABS = ["Action", "History", "Remarks"];

// const ACTIONS = [
//   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
//   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// ];

// // Which actions make sense at which stage
// const STAGE_ACTIONS = {
//   "Counter Employee": ["Forward", "Send Back", "Reject"],
//   "Approval Authority": ["Approve", "Send Back", "Reject"],
// };

// export default function ApplicationDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const application = useSelector((s) => selectApplicationById(s, id));
//   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");

//   if (!application || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Application not found.</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
//   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

//   const handleAction = (decision) => {
//     dispatch(
//       recordAction({
//         id: application.id,
//         actor: user?.name || "Officer",
//         actorRole: user?.role || application.currentStage,
//         decision,
//         remarks,
//       })
//     );

//     if (decision === "Approve" && application.currentStage === "Approval Authority") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
//     } else if (decision === "Reject") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
//     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
//     }

//     setRemarks("");
//   };

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
//           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
//           <ApprovalHistory application={application} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.ward} &middot; {application.zone}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {isFinal ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     This application has reached a final state:{" "}
//                     <span className="font-semibold text-ink-800">{application.status}</span>.
//                     {application.status === "Approved" && (
//                       <div className="mt-3">
//                         <Link to={`/smart-card/${vendor.id}`}>
//                           <Button size="sm">Generate Smart Card</Button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
//                         <Button
//                           key={a.key}
//                           variant={a.variant}
//                           icon={a.icon}
//                           onClick={() => handleAction(a.key)}
//                         >
//                           {a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {[...application.history].reverse().map((h, i) => (
//                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
//                       <span className="text-[11px] text-ink-400">
//                         {new Date(h.date).toLocaleDateString("en-IN")}
//                       </span>
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.stage} &middot; {h.actor}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "Remarks" && (
//               <div className="space-y-3">
//                 {application.history.filter((h) => h.remarks).length === 0 && (
//                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
//                 )}
//                 {application.history
//                   .filter((h) => h.remarks)
//                   .map((h, i) => (
//                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
//                       <p className="mb-1 text-xs font-semibold text-ink-500">
//                         {h.actor} &middot; {h.stage}
//                       </p>
//                       {h.remarks}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">Generate Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }







// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// import { useAuth } from "../auth/hooks/useAuth";
// import ApprovalHistory from "./ApprovalHistory";

// const TABS = ["Action", "History", "Remarks"];

// const ACTIONS = [
//   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
//   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// ];

// // Which actions make sense at which stage
// const STAGE_ACTIONS = {
//   "Counter Employee": ["Forward", "Send Back", "Reject"],
//   "Approval Authority": ["Approve", "Send Back", "Reject"],
// };

// export default function ApplicationDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const application = useSelector((s) => selectApplicationById(s, id));
//   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");

//   if (!application || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Application not found.</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
//   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

//   const handleAction = (decision) => {
//     dispatch(
//       recordAction({
//         id: application.id,
//         actor: user?.name || "Officer",
//         actorRole: user?.role || application.currentStage,
//         decision,
//         remarks,
//       })
//     );

//     if (decision === "Approve" && application.currentStage === "Approval Authority") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
//     } else if (decision === "Reject") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
//     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
//     }

//     setRemarks("");
//   };

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
//           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
//           <ApprovalHistory application={application} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.ward} &middot; {application.zone}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {isFinal ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     This application has reached a final state:{" "}
//                     <span className="font-semibold text-ink-800">{application.status}</span>.
//                     {application.status === "Approved" && (
//                       <div className="mt-3">
//                         <Link to={`/smart-card/${vendor.id}`}>
//                           <Button size="sm">Generate Smart Card</Button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
//                         <Button
//                           key={a.key}
//                           variant={a.variant}
//                           icon={a.icon}
//                           onClick={() => handleAction(a.key)}
//                         >
//                           {a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {[...application.history].reverse().map((h, i) => (
//                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
//                       <span className="text-[11px] text-ink-400">
//                         {new Date(h.date).toLocaleDateString("en-IN")}
//                       </span>
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.stage} &middot; {h.actor}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "Remarks" && (
//               <div className="space-y-3">
//                 {application.history.filter((h) => h.remarks).length === 0 && (
//                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
//                 )}
//                 {application.history
//                   .filter((h) => h.remarks)
//                   .map((h, i) => (
//                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
//                       <p className="mb-1 text-xs font-semibold text-ink-500">
//                         {h.actor} &middot; {h.stage}
//                       </p>
//                       {h.remarks}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiMapPin } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision, generateIdCardByAmc } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");
//   const [idCardSubmitting, setIdCardSubmitting] = useState(false);
//   const [idCardError, setIdCardError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   // ── A.M.C.: generate the ID Card right after approval, without payment (future scope) ──
//   const handleGenerateIdCard = async () => {
//     setIdCardError("");
//     setIdCardSubmitting(true);
//     const result = await generateIdCardByAmc(applicationNo, { remarks });
//     setIdCardSubmitting(false);
//     if (!result.success) {
//       setIdCardError(result.message || "Could not generate the ID card.");
//       return;
//     }
//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//               {application.survey.geoLocation?.lat != null && application.survey.geoLocation?.lng != null && (
//                 <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-600">
//                   <FiMapPin size={13} className="text-brand-500" />
//                   {application.survey.geoLocation.lat}, {application.survey.geoLocation.lng}
//                   <a
//                     href={`https://www.google.com/maps?q=${application.survey.geoLocation.lat},${application.survey.geoLocation.lng}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="font-semibold text-brand-600 underline"
//                   >
//                     View on Map
//                   </a>
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {["A.M.C. Approved", "Payment Pending"].includes(application.status) && (
//                           <div className="mt-3 space-y-2">
//                             {idCardError && (
//                               <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
//                                 <FiAlertCircle className="mt-0.5 shrink-0" size={14} />
//                                 {idCardError}
//                               </div>
//                             )}
//                             <Button size="sm" variant="success" onClick={handleGenerateIdCard} disabled={idCardSubmitting}>
//                               {idCardSubmitting ? "Please wait..." : "Generate Smart Card"}
//                             </Button>
//                             <p className="text-[11px] text-ink-400">
//                               Payment is not required right now — this issues the Smart Card directly.
//                             </p>
//                           </div>
//                         )}
//                         {application.status === "Certificate Issued" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">View Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// // import { useEffect, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// // const TABS = ["Action", "History"];

// // const ACTIONS = [
// //   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// // ];

// // export default function ApplicationDetails() {
// //   const { id: applicationNo } = useParams();
// //   const navigate = useNavigate();

// //   const [application, setApplication] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loadError, setLoadError] = useState("");

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");
// //   const [submitting, setSubmitting] = useState(false);
// //   const [actionError, setActionError] = useState("");

// //   const loadApplication = () => {
// //     setLoading(true);
// //     setLoadError("");
// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       setLoading(false);
// //       if (!result.success) {
// //         setLoadError(result.message || "Application not found.");
// //         return;
// //       }
// //       setApplication(result.data);
// //     });
// //   };

// //   useEffect(() => {
// //     loadApplication();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [applicationNo]);

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading application...
// //       </Card>
// //     );
// //   }

// //   if (loadError || !application) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
// //         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   // A.M.C. can only act while the application is sitting at their stage
// //   const canAct = application.status === "Forwarded to A.M.C.";
// //   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
// //     application.status
// //   );

// //   const handleAction = async (decision) => {
// //     setActionError("");
// //     setSubmitting(true);
// //     const result = await submitAmcDecision(applicationNo, { decision, remarks });
// //     setSubmitting(false);

// //     if (!result.success) {
// //       setActionError(result.message || "Could not record the decision.");
// //       return;
// //     }

// //     setRemarks("");
// //     setApplication(result.data);
// //   };

// //   const history = application.statusHistory || [];

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
// //           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

// //           <div className="space-y-1">
// //             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
// //             {history.map((entry, i) => {
// //               const isLast = i === history.length - 1;
// //               return (
// //                 <div key={entry._id || i} className="flex gap-4">
// //                   <div className="flex flex-col items-center">
// //                     <div
// //                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
// //                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
// //                       }`}
// //                     >
// //                       <FiCheck size={15} />
// //                     </div>
// //                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
// //                   </div>
// //                   <div className="pb-6">
// //                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
// //                     <p className="text-xs text-ink-500">
// //                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
// //                     </p>
// //                     {entry.createdAt && (
// //                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
// //                     )}
// //                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
// //               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.address?.ward} &middot; {application.address?.zone}
// //               </p>
// //             </div>
// //           </div>

// //           {application.survey?.recommendation && (
// //             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
// //               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
// //             </div>
// //           )}

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {!canAct ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     {isFinal ? (
// //                       <>
// //                         This application has reached a final state:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                         {application.status === "A.M.C. Approved" && (
// //                           <div className="mt-3">
// //                             <Link to={`/smart-card/${application.applicationNo}`}>
// //                               <Button size="sm">Generate Smart Card</Button>
// //                             </Link>
// //                           </div>
// //                         )}
// //                       </>
// //                     ) : (
// //                       <>
// //                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                       </>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />

// //                     {actionError && (
// //                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
// //                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
// //                         {actionError}
// //                       </div>
// //                     )}

// //                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
// //                       {ACTIONS.map((a) => (
// //                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
// //                           {submitting ? "Submitting..." : a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
// //                 {[...history].reverse().map((h, i) => (
// //                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
// //                       {h.createdAt && (
// //                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
// //                       )}
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }


// // ==============================


// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// // import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// // import { useAuth } from "../auth/hooks/useAuth";
// // import ApprovalHistory from "./ApprovalHistory";

// // const TABS = ["Action", "History", "Remarks"];

// // const ACTIONS = [
// //   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
// //   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// // ];

// // // Which actions make sense at which stage
// // const STAGE_ACTIONS = {
// //   "Counter Employee": ["Forward", "Send Back", "Reject"],
// //   "Approval Authority": ["Approve", "Send Back", "Reject"],
// // };

// // export default function ApplicationDetails() {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   const application = useSelector((s) => selectApplicationById(s, id));
// //   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");

// //   if (!application || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">Application not found.</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
// //   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

// //   const handleAction = (decision) => {
// //     dispatch(
// //       recordAction({
// //         id: application.id,
// //         actor: user?.name || "Officer",
// //         actorRole: user?.role || application.currentStage,
// //         decision,
// //         remarks,
// //       })
// //     );

// //     if (decision === "Approve" && application.currentStage === "Approval Authority") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
// //     } else if (decision === "Reject") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
// //     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
// //     }

// //     setRemarks("");
// //   };

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
// //           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
// //           <ApprovalHistory application={application} />
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
// //               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.ward} &middot; {application.zone}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {isFinal ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     This application has reached a final state:{" "}
// //                     <span className="font-semibold text-ink-800">{application.status}</span>.
// //                     {application.status === "Approved" && (
// //                       <div className="mt-3">
// //                         <Link to={`/smart-card/${vendor.id}`}>
// //                           <Button size="sm">Generate Smart Card</Button>
// //                         </Link>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />
// //                     <div className="grid grid-cols-2 gap-3">
// //                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
// //                         <Button
// //                           key={a.key}
// //                           variant={a.variant}
// //                           icon={a.icon}
// //                           onClick={() => handleAction(a.key)}
// //                         >
// //                           {a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {[...application.history].reverse().map((h, i) => (
// //                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
// //                       <span className="text-[11px] text-ink-400">
// //                         {new Date(h.date).toLocaleDateString("en-IN")}
// //                       </span>
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.stage} &middot; {h.actor}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {tab === "Remarks" && (
// //               <div className="space-y-3">
// //                 {application.history.filter((h) => h.remarks).length === 0 && (
// //                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
// //                 )}
// //                 {application.history
// //                   .filter((h) => h.remarks)
// //                   .map((h, i) => (
// //                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
// //                       <p className="mb-1 text-xs font-semibold text-ink-500">
// //                         {h.actor} &middot; {h.stage}
// //                       </p>
// //                       {h.remarks}
// //                     </div>
// //                   ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }




// // import { useEffect, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// // const TABS = ["Action", "History"];

// // const ACTIONS = [
// //   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// // ];

// // export default function ApplicationDetails() {
// //   const { id: applicationNo } = useParams();
// //   const navigate = useNavigate();

// //   const [application, setApplication] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loadError, setLoadError] = useState("");

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");
// //   const [submitting, setSubmitting] = useState(false);
// //   const [actionError, setActionError] = useState("");

// //   const loadApplication = () => {
// //     setLoading(true);
// //     setLoadError("");
// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       setLoading(false);
// //       if (!result.success) {
// //         setLoadError(result.message || "Application not found.");
// //         return;
// //       }
// //       setApplication(result.data);
// //     });
// //   };

// //   useEffect(() => {
// //     loadApplication();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [applicationNo]);

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading application...
// //       </Card>
// //     );
// //   }

// //   if (loadError || !application) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
// //         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   // A.M.C. can only act while the application is sitting at their stage
// //   const canAct = application.status === "Forwarded to A.M.C.";
// //   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
// //     application.status
// //   );

// //   const handleAction = async (decision) => {
// //     setActionError("");
// //     setSubmitting(true);
// //     const result = await submitAmcDecision(applicationNo, { decision, remarks });
// //     setSubmitting(false);

// //     if (!result.success) {
// //       setActionError(result.message || "Could not record the decision.");
// //       return;
// //     }

// //     setRemarks("");
// //     setApplication(result.data);
// //   };

// //   const history = application.statusHistory || [];

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
// //           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

// //           <div className="space-y-1">
// //             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
// //             {history.map((entry, i) => {
// //               const isLast = i === history.length - 1;
// //               return (
// //                 <div key={entry._id || i} className="flex gap-4">
// //                   <div className="flex flex-col items-center">
// //                     <div
// //                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
// //                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
// //                       }`}
// //                     >
// //                       <FiCheck size={15} />
// //                     </div>
// //                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
// //                   </div>
// //                   <div className="pb-6">
// //                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
// //                     <p className="text-xs text-ink-500">
// //                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
// //                     </p>
// //                     {entry.createdAt && (
// //                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
// //                     )}
// //                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
// //               <p className="text-xs text-ink-500">{application.business?.businessCategory}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.address?.ward} &middot; {application.address?.zone}
// //               </p>
// //             </div>
// //           </div>

// //           {application.survey?.recommendation && (
// //             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
// //               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
// //             </div>
// //           )}

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {!canAct ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     {isFinal ? (
// //                       <>
// //                         This application has reached a final state:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                         {application.status === "A.M.C. Approved" && (
// //                           <div className="mt-3">
// //                             <Link to={`/smart-card/${application.applicationNo}`}>
// //                               <Button size="sm">Generate Smart Card</Button>
// //                             </Link>
// //                           </div>
// //                         )}
// //                       </>
// //                     ) : (
// //                       <>
// //                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                       </>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />

// //                     {actionError && (
// //                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
// //                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
// //                         {actionError}
// //                       </div>
// //                     )}

// //                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
// //                       {ACTIONS.map((a) => (
// //                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
// //                           {submitting ? "Submitting..." : a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
// //                 {[...history].reverse().map((h, i) => (
// //                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
// //                       {h.createdAt && (
// //                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
// //                       )}
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }







// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// // import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// // import { useAuth } from "../auth/hooks/useAuth";
// // import ApprovalHistory from "./ApprovalHistory";

// // const TABS = ["Action", "History", "Remarks"];

// // const ACTIONS = [
// //   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
// //   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// // ];

// // // Which actions make sense at which stage
// // const STAGE_ACTIONS = {
// //   "Counter Employee": ["Forward", "Send Back", "Reject"],
// //   "Approval Authority": ["Approve", "Send Back", "Reject"],
// // };

// // export default function ApplicationDetails() {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   const application = useSelector((s) => selectApplicationById(s, id));
// //   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");

// //   if (!application || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">Application not found.</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
// //   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

// //   const handleAction = (decision) => {
// //     dispatch(
// //       recordAction({
// //         id: application.id,
// //         actor: user?.name || "Officer",
// //         actorRole: user?.role || application.currentStage,
// //         decision,
// //         remarks,
// //       })
// //     );

// //     if (decision === "Approve" && application.currentStage === "Approval Authority") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
// //     } else if (decision === "Reject") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
// //     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
// //     }

// //     setRemarks("");
// //   };

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
// //           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
// //           <ApprovalHistory application={application} />
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
// //               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.ward} &middot; {application.zone}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {isFinal ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     This application has reached a final state:{" "}
// //                     <span className="font-semibold text-ink-800">{application.status}</span>.
// //                     {application.status === "Approved" && (
// //                       <div className="mt-3">
// //                         <Link to={`/smart-card/${vendor.id}`}>
// //                           <Button size="sm">Generate Smart Card</Button>
// //                         </Link>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />
// //                     <div className="grid grid-cols-2 gap-3">
// //                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
// //                         <Button
// //                           key={a.key}
// //                           variant={a.variant}
// //                           icon={a.icon}
// //                           onClick={() => handleAction(a.key)}
// //                         >
// //                           {a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {[...application.history].reverse().map((h, i) => (
// //                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
// //                       <span className="text-[11px] text-ink-400">
// //                         {new Date(h.date).toLocaleDateString("en-IN")}
// //                       </span>
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.stage} &middot; {h.actor}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {tab === "Remarks" && (
// //               <div className="space-y-3">
// //                 {application.history.filter((h) => h.remarks).length === 0 && (
// //                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
// //                 )}
// //                 {application.history
// //                   .filter((h) => h.remarks)
// //                   .map((h, i) => (
// //                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
// //                       <p className="mb-1 text-xs font-semibold text-ink-500">
// //                         {h.actor} &middot; {h.stage}
// //                       </p>
// //                       {h.remarks}
// //                     </div>
// //                   ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiMapPin } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision, generateIdCardByAmc } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");
//   const [idCardSubmitting, setIdCardSubmitting] = useState(false);
//   const [idCardError, setIdCardError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   // ── A.M.C.: generate the ID Card right after approval, without payment (future scope) ──
//   const handleGenerateIdCard = async () => {
//     setIdCardError("");
//     setIdCardSubmitting(true);
//     const result = await generateIdCardByAmc(applicationNo, { remarks });
//     setIdCardSubmitting(false);
//     if (!result.success) {
//       setIdCardError(result.message || "Could not generate the ID card.");
//       return;
//     }
//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//               {application.survey.geoLocation?.lat != null && application.survey.geoLocation?.lng != null && (
//                 <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-600">
//                   <FiMapPin size={13} className="text-brand-500" />
//                   {application.survey.geoLocation.lat}, {application.survey.geoLocation.lng}
//                   <a
//                     href={`https://www.google.com/maps?q=${application.survey.geoLocation.lat},${application.survey.geoLocation.lng}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="font-semibold text-brand-600 underline"
//                   >
//                     View on Map
//                   </a>
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {/* CHANGED (29-10 request): Smart Card now auto-generates the instant A.M.C.
//                             approves (see amcDecision on the backend) — so this manual button is no
//                             longer needed in the normal flow. Kept commented, not deleted, as a
//                             fallback in case an older application is ever stuck at "A.M.C. Approved"
//                             without a certificate.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3 space-y-2">
//                             {idCardError && (
//                               <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
//                                 <FiAlertCircle className="mt-0.5 shrink-0" size={14} />
//                                 {idCardError}
//                               </div>
//                             )}
//                             <Button size="sm" variant="success" onClick={handleGenerateIdCard} disabled={idCardSubmitting}>
//                               {idCardSubmitting ? "Please wait..." : "Generate Smart Card"}
//                             </Button>
//                             <p className="text-[11px] text-ink-400">
//                               Payment is not required right now — this issues the Smart Card directly.
//                             </p>
//                           </div>
//                         )}
//                         */}
//                         {application.status === "Certificate Issued" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">View Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }











// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">Generate Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }


// ==============================


// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// import { useAuth } from "../auth/hooks/useAuth";
// import ApprovalHistory from "./ApprovalHistory";

// const TABS = ["Action", "History", "Remarks"];

// const ACTIONS = [
//   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
//   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// ];

// // Which actions make sense at which stage
// const STAGE_ACTIONS = {
//   "Counter Employee": ["Forward", "Send Back", "Reject"],
//   "Approval Authority": ["Approve", "Send Back", "Reject"],
// };

// export default function ApplicationDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const application = useSelector((s) => selectApplicationById(s, id));
//   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");

//   if (!application || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Application not found.</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
//   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

//   const handleAction = (decision) => {
//     dispatch(
//       recordAction({
//         id: application.id,
//         actor: user?.name || "Officer",
//         actorRole: user?.role || application.currentStage,
//         decision,
//         remarks,
//       })
//     );

//     if (decision === "Approve" && application.currentStage === "Approval Authority") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
//     } else if (decision === "Reject") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
//     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
//     }

//     setRemarks("");
//   };

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
//           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
//           <ApprovalHistory application={application} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.ward} &middot; {application.zone}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {isFinal ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     This application has reached a final state:{" "}
//                     <span className="font-semibold text-ink-800">{application.status}</span>.
//                     {application.status === "Approved" && (
//                       <div className="mt-3">
//                         <Link to={`/smart-card/${vendor.id}`}>
//                           <Button size="sm">Generate Smart Card</Button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
//                         <Button
//                           key={a.key}
//                           variant={a.variant}
//                           icon={a.icon}
//                           onClick={() => handleAction(a.key)}
//                         >
//                           {a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {[...application.history].reverse().map((h, i) => (
//                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
//                       <span className="text-[11px] text-ink-400">
//                         {new Date(h.date).toLocaleDateString("en-IN")}
//                       </span>
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.stage} &middot; {h.actor}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "Remarks" && (
//               <div className="space-y-3">
//                 {application.history.filter((h) => h.remarks).length === 0 && (
//                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
//                 )}
//                 {application.history
//                   .filter((h) => h.remarks)
//                   .map((h, i) => (
//                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
//                       <p className="mb-1 text-xs font-semibold text-ink-500">
//                         {h.actor} &middot; {h.stage}
//                       </p>
//                       {h.remarks}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">Generate Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }







// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// import { useAuth } from "../auth/hooks/useAuth";
// import ApprovalHistory from "./ApprovalHistory";

// const TABS = ["Action", "History", "Remarks"];

// const ACTIONS = [
//   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
//   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// ];

// // Which actions make sense at which stage
// const STAGE_ACTIONS = {
//   "Counter Employee": ["Forward", "Send Back", "Reject"],
//   "Approval Authority": ["Approve", "Send Back", "Reject"],
// };

// export default function ApplicationDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const application = useSelector((s) => selectApplicationById(s, id));
//   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");

//   if (!application || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Application not found.</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
//   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

//   const handleAction = (decision) => {
//     dispatch(
//       recordAction({
//         id: application.id,
//         actor: user?.name || "Officer",
//         actorRole: user?.role || application.currentStage,
//         decision,
//         remarks,
//       })
//     );

//     if (decision === "Approve" && application.currentStage === "Approval Authority") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
//     } else if (decision === "Reject") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
//     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
//     }

//     setRemarks("");
//   };

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
//           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
//           <ApprovalHistory application={application} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.ward} &middot; {application.zone}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {isFinal ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     This application has reached a final state:{" "}
//                     <span className="font-semibold text-ink-800">{application.status}</span>.
//                     {application.status === "Approved" && (
//                       <div className="mt-3">
//                         <Link to={`/smart-card/${vendor.id}`}>
//                           <Button size="sm">Generate Smart Card</Button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
//                         <Button
//                           key={a.key}
//                           variant={a.variant}
//                           icon={a.icon}
//                           onClick={() => handleAction(a.key)}
//                         >
//                           {a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {[...application.history].reverse().map((h, i) => (
//                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
//                       <span className="text-[11px] text-ink-400">
//                         {new Date(h.date).toLocaleDateString("en-IN")}
//                       </span>
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.stage} &middot; {h.actor}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "Remarks" && (
//               <div className="space-y-3">
//                 {application.history.filter((h) => h.remarks).length === 0 && (
//                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
//                 )}
//                 {application.history
//                   .filter((h) => h.remarks)
//                   .map((h, i) => (
//                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
//                       <p className="mb-1 text-xs font-semibold text-ink-500">
//                         {h.actor} &middot; {h.stage}
//                       </p>
//                       {h.remarks}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiMapPin } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision, generateIdCardByAmc } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");
//   const [idCardSubmitting, setIdCardSubmitting] = useState(false);
//   const [idCardError, setIdCardError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   // ── A.M.C.: generate the ID Card right after approval, without payment (future scope) ──
//   const handleGenerateIdCard = async () => {
//     setIdCardError("");
//     setIdCardSubmitting(true);
//     const result = await generateIdCardByAmc(applicationNo, { remarks });
//     setIdCardSubmitting(false);
//     if (!result.success) {
//       setIdCardError(result.message || "Could not generate the ID card.");
//       return;
//     }
//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//               {application.survey.geoLocation?.lat != null && application.survey.geoLocation?.lng != null && (
//                 <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-600">
//                   <FiMapPin size={13} className="text-brand-500" />
//                   {application.survey.geoLocation.lat}, {application.survey.geoLocation.lng}
//                   <a
//                     href={`https://www.google.com/maps?q=${application.survey.geoLocation.lat},${application.survey.geoLocation.lng}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="font-semibold text-brand-600 underline"
//                   >
//                     View on Map
//                   </a>
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {["A.M.C. Approved", "Payment Pending"].includes(application.status) && (
//                           <div className="mt-3 space-y-2">
//                             {idCardError && (
//                               <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
//                                 <FiAlertCircle className="mt-0.5 shrink-0" size={14} />
//                                 {idCardError}
//                               </div>
//                             )}
//                             <Button size="sm" variant="success" onClick={handleGenerateIdCard} disabled={idCardSubmitting}>
//                               {idCardSubmitting ? "Please wait..." : "Generate Smart Card"}
//                             </Button>
//                             <p className="text-[11px] text-ink-400">
//                               Payment is not required right now — this issues the Smart Card directly.
//                             </p>
//                           </div>
//                         )}
//                         {application.status === "Certificate Issued" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">View Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">Generate Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }


// ==============================


// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// import { useAuth } from "../auth/hooks/useAuth";
// import ApprovalHistory from "./ApprovalHistory";

// const TABS = ["Action", "History", "Remarks"];

// const ACTIONS = [
//   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
//   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// ];

// // Which actions make sense at which stage
// const STAGE_ACTIONS = {
//   "Counter Employee": ["Forward", "Send Back", "Reject"],
//   "Approval Authority": ["Approve", "Send Back", "Reject"],
// };

// export default function ApplicationDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const application = useSelector((s) => selectApplicationById(s, id));
//   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");

//   if (!application || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Application not found.</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
//   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

//   const handleAction = (decision) => {
//     dispatch(
//       recordAction({
//         id: application.id,
//         actor: user?.name || "Officer",
//         actorRole: user?.role || application.currentStage,
//         decision,
//         remarks,
//       })
//     );

//     if (decision === "Approve" && application.currentStage === "Approval Authority") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
//     } else if (decision === "Reject") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
//     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
//     }

//     setRemarks("");
//   };

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
//           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
//           <ApprovalHistory application={application} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.ward} &middot; {application.zone}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {isFinal ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     This application has reached a final state:{" "}
//                     <span className="font-semibold text-ink-800">{application.status}</span>.
//                     {application.status === "Approved" && (
//                       <div className="mt-3">
//                         <Link to={`/smart-card/${vendor.id}`}>
//                           <Button size="sm">Generate Smart Card</Button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
//                         <Button
//                           key={a.key}
//                           variant={a.variant}
//                           icon={a.icon}
//                           onClick={() => handleAction(a.key)}
//                         >
//                           {a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {[...application.history].reverse().map((h, i) => (
//                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
//                       <span className="text-[11px] text-ink-400">
//                         {new Date(h.date).toLocaleDateString("en-IN")}
//                       </span>
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.stage} &middot; {h.actor}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "Remarks" && (
//               <div className="space-y-3">
//                 {application.history.filter((h) => h.remarks).length === 0 && (
//                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
//                 )}
//                 {application.history
//                   .filter((h) => h.remarks)
//                   .map((h, i) => (
//                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
//                       <p className="mb-1 text-xs font-semibold text-ink-500">
//                         {h.actor} &middot; {h.stage}
//                       </p>
//                       {h.remarks}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">Generate Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }







// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// import { useAuth } from "../auth/hooks/useAuth";
// import ApprovalHistory from "./ApprovalHistory";

// const TABS = ["Action", "History", "Remarks"];

// const ACTIONS = [
//   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
//   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// ];

// // Which actions make sense at which stage
// const STAGE_ACTIONS = {
//   "Counter Employee": ["Forward", "Send Back", "Reject"],
//   "Approval Authority": ["Approve", "Send Back", "Reject"],
// };

// export default function ApplicationDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const application = useSelector((s) => selectApplicationById(s, id));
//   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");

//   if (!application || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Application not found.</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
//   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

//   const handleAction = (decision) => {
//     dispatch(
//       recordAction({
//         id: application.id,
//         actor: user?.name || "Officer",
//         actorRole: user?.role || application.currentStage,
//         decision,
//         remarks,
//       })
//     );

//     if (decision === "Approve" && application.currentStage === "Approval Authority") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
//     } else if (decision === "Reject") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
//     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
//     }

//     setRemarks("");
//   };

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
//           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
//           <ApprovalHistory application={application} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.ward} &middot; {application.zone}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {isFinal ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     This application has reached a final state:{" "}
//                     <span className="font-semibold text-ink-800">{application.status}</span>.
//                     {application.status === "Approved" && (
//                       <div className="mt-3">
//                         <Link to={`/smart-card/${vendor.id}`}>
//                           <Button size="sm">Generate Smart Card</Button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
//                         <Button
//                           key={a.key}
//                           variant={a.variant}
//                           icon={a.icon}
//                           onClick={() => handleAction(a.key)}
//                         >
//                           {a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {[...application.history].reverse().map((h, i) => (
//                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
//                       <span className="text-[11px] text-ink-400">
//                         {new Date(h.date).toLocaleDateString("en-IN")}
//                       </span>
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.stage} &middot; {h.actor}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "Remarks" && (
//               <div className="space-y-3">
//                 {application.history.filter((h) => h.remarks).length === 0 && (
//                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
//                 )}
//                 {application.history
//                   .filter((h) => h.remarks)
//                   .map((h, i) => (
//                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
//                       <p className="mb-1 text-xs font-semibold text-ink-500">
//                         {h.actor} &middot; {h.stage}
//                       </p>
//                       {h.remarks}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiMapPin,FiImage } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { useAuth } from "../auth/hooks/useAuth";
// import { fetchVendorApplicationByNo, submitAmcDecision, generateIdCardByAmc } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const isAmc = user?.role === "A.M.C.";
//   const isSuperAdmin = user?.role === "super_admin";
//   // ── Generate/View Vendor ID is A.M.C.-only (29-10 request) — counter_officer,
//   //    survey_officer must NOT be able to generate it, or even view it. ──
//   const canSeeSmartCard = isAmc || isSuperAdmin;


//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");
//   const [idCardSubmitting, setIdCardSubmitting] = useState(false);

//   // const [idCardError, setIdCardError] = useState("");

//   const [idCardError, setIdCardError] = useState("");
//   const [lightboxPhoto, setLightboxPhoto] = useState(null);

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage — and only if this
//   // logged-in user actually IS an A.M.C. (Counter Officer / Survey Officer / Vendor viewing
//   // this page should never see action buttons, only read-only info + history)
//   const canAct = isAmc && application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   // ── A.M.C.: generate the ID Card right after approval, without payment (future scope) ──
//   const handleGenerateIdCard = async () => {
//     setIdCardError("");
//     setIdCardSubmitting(true);
//     const result = await generateIdCardByAmc(applicationNo, { remarks });
//     setIdCardSubmitting(false);
//     if (!result.success) {
//       setIdCardError(result.message || "Could not generate the ID card.");
//       return;
//     }
//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//               {application.survey.geoLocation?.lat != null && application.survey.geoLocation?.lng != null && (
//                 <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-600">
//                   <FiMapPin size={13} className="text-brand-500" />
//                   {application.survey.geoLocation.lat}, {application.survey.geoLocation.lng}
//                   <a
//                     href={`https://www.google.com/maps?q=${application.survey.geoLocation.lat},${application.survey.geoLocation.lng}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="font-semibold text-brand-600 underline"
//                   >
//                     View on Map
//                   </a>
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {canSeeSmartCard && ["A.M.C. Approved", "Payment Pending"].includes(application.status) && (
//                           <div className="mt-3 space-y-2">
//                             {idCardError && (
//                               <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
//                                 <FiAlertCircle className="mt-0.5 shrink-0" size={14} />
//                                 {idCardError}
//                               </div>
//                             )}
//                             <Button size="sm" variant="success" onClick={handleGenerateIdCard} disabled={idCardSubmitting}>
//                               {idCardSubmitting ? "Please wait..." : "Generate Smart Card"}
//                             </Button>
//                             <p className="text-[11px] text-ink-400">
//                               Payment is not required right now — this issues the Smart Card directly.
//                             </p>
//                           </div>
//                         )}
//                         {canSeeSmartCard && application.status === "Certificate Issued" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">View Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : !isAmc ? (
//                       <>
//                         Only the A.M.C. can take action on this application. Current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// // import { useEffect, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// // const TABS = ["Action", "History"];

// // const ACTIONS = [
// //   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// // ];

// // export default function ApplicationDetails() {
// //   const { id: applicationNo } = useParams();
// //   const navigate = useNavigate();

// //   const [application, setApplication] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loadError, setLoadError] = useState("");

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");
// //   const [submitting, setSubmitting] = useState(false);
// //   const [actionError, setActionError] = useState("");

// //   const loadApplication = () => {
// //     setLoading(true);
// //     setLoadError("");
// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       setLoading(false);
// //       if (!result.success) {
// //         setLoadError(result.message || "Application not found.");
// //         return;
// //       }
// //       setApplication(result.data);
// //     });
// //   };

// //   useEffect(() => {
// //     loadApplication();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [applicationNo]);

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading application...
// //       </Card>
// //     );
// //   }

// //   if (loadError || !application) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
// //         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   // A.M.C. can only act while the application is sitting at their stage
// //   const canAct = application.status === "Forwarded to A.M.C.";
// //   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
// //     application.status
// //   );

// //   const handleAction = async (decision) => {
// //     setActionError("");
// //     setSubmitting(true);
// //     const result = await submitAmcDecision(applicationNo, { decision, remarks });
// //     setSubmitting(false);

// //     if (!result.success) {
// //       setActionError(result.message || "Could not record the decision.");
// //       return;
// //     }

// //     setRemarks("");
// //     setApplication(result.data);
// //   };

// //   const history = application.statusHistory || [];

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
// //           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

// //           <div className="space-y-1">
// //             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
// //             {history.map((entry, i) => {
// //               const isLast = i === history.length - 1;
// //               return (
// //                 <div key={entry._id || i} className="flex gap-4">
// //                   <div className="flex flex-col items-center">
// //                     <div
// //                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
// //                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
// //                       }`}
// //                     >
// //                       <FiCheck size={15} />
// //                     </div>
// //                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
// //                   </div>
// //                   <div className="pb-6">
// //                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
// //                     <p className="text-xs text-ink-500">
// //                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
// //                     </p>
// //                     {entry.createdAt && (
// //                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
// //                     )}
// //                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
// //               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.address?.ward} &middot; {application.address?.zone}
// //               </p>
// //             </div>
// //           </div>

// //           {application.survey?.recommendation && (
// //             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
// //               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
// //             </div>
// //           )}

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {!canAct ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     {isFinal ? (
// //                       <>
// //                         This application has reached a final state:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                         {application.status === "A.M.C. Approved" && (
// //                           <div className="mt-3">
// //                             <Link to={`/smart-card/${application.applicationNo}`}>
// //                               <Button size="sm">Generate Smart Card</Button>
// //                             </Link>
// //                           </div>
// //                         )}
// //                       </>
// //                     ) : (
// //                       <>
// //                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                       </>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />

// //                     {actionError && (
// //                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
// //                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
// //                         {actionError}
// //                       </div>
// //                     )}

// //                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
// //                       {ACTIONS.map((a) => (
// //                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
// //                           {submitting ? "Submitting..." : a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
// //                 {[...history].reverse().map((h, i) => (
// //                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
// //                       {h.createdAt && (
// //                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
// //                       )}
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }


// // ==============================


// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// // import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// // import { useAuth } from "../auth/hooks/useAuth";
// // import ApprovalHistory from "./ApprovalHistory";

// // const TABS = ["Action", "History", "Remarks"];

// // const ACTIONS = [
// //   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
// //   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// // ];

// // // Which actions make sense at which stage
// // const STAGE_ACTIONS = {
// //   "Counter Employee": ["Forward", "Send Back", "Reject"],
// //   "Approval Authority": ["Approve", "Send Back", "Reject"],
// // };

// // export default function ApplicationDetails() {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   const application = useSelector((s) => selectApplicationById(s, id));
// //   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");

// //   if (!application || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">Application not found.</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
// //   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

// //   const handleAction = (decision) => {
// //     dispatch(
// //       recordAction({
// //         id: application.id,
// //         actor: user?.name || "Officer",
// //         actorRole: user?.role || application.currentStage,
// //         decision,
// //         remarks,
// //       })
// //     );

// //     if (decision === "Approve" && application.currentStage === "Approval Authority") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
// //     } else if (decision === "Reject") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
// //     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
// //     }

// //     setRemarks("");
// //   };

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
// //           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
// //           <ApprovalHistory application={application} />
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
// //               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.ward} &middot; {application.zone}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {isFinal ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     This application has reached a final state:{" "}
// //                     <span className="font-semibold text-ink-800">{application.status}</span>.
// //                     {application.status === "Approved" && (
// //                       <div className="mt-3">
// //                         <Link to={`/smart-card/${vendor.id}`}>
// //                           <Button size="sm">Generate Smart Card</Button>
// //                         </Link>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />
// //                     <div className="grid grid-cols-2 gap-3">
// //                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
// //                         <Button
// //                           key={a.key}
// //                           variant={a.variant}
// //                           icon={a.icon}
// //                           onClick={() => handleAction(a.key)}
// //                         >
// //                           {a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {[...application.history].reverse().map((h, i) => (
// //                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
// //                       <span className="text-[11px] text-ink-400">
// //                         {new Date(h.date).toLocaleDateString("en-IN")}
// //                       </span>
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.stage} &middot; {h.actor}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {tab === "Remarks" && (
// //               <div className="space-y-3">
// //                 {application.history.filter((h) => h.remarks).length === 0 && (
// //                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
// //                 )}
// //                 {application.history
// //                   .filter((h) => h.remarks)
// //                   .map((h, i) => (
// //                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
// //                       <p className="mb-1 text-xs font-semibold text-ink-500">
// //                         {h.actor} &middot; {h.stage}
// //                       </p>
// //                       {h.remarks}
// //                     </div>
// //                   ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }




// // import { useEffect, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// // const TABS = ["Action", "History"];

// // const ACTIONS = [
// //   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// // ];

// // export default function ApplicationDetails() {
// //   const { id: applicationNo } = useParams();
// //   const navigate = useNavigate();

// //   const [application, setApplication] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loadError, setLoadError] = useState("");

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");
// //   const [submitting, setSubmitting] = useState(false);
// //   const [actionError, setActionError] = useState("");

// //   const loadApplication = () => {
// //     setLoading(true);
// //     setLoadError("");
// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       setLoading(false);
// //       if (!result.success) {
// //         setLoadError(result.message || "Application not found.");
// //         return;
// //       }
// //       setApplication(result.data);
// //     });
// //   };

// //   useEffect(() => {
// //     loadApplication();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [applicationNo]);

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading application...
// //       </Card>
// //     );
// //   }

// //   if (loadError || !application) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
// //         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   // A.M.C. can only act while the application is sitting at their stage
// //   const canAct = application.status === "Forwarded to A.M.C.";
// //   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
// //     application.status
// //   );

// //   const handleAction = async (decision) => {
// //     setActionError("");
// //     setSubmitting(true);
// //     const result = await submitAmcDecision(applicationNo, { decision, remarks });
// //     setSubmitting(false);

// //     if (!result.success) {
// //       setActionError(result.message || "Could not record the decision.");
// //       return;
// //     }

// //     setRemarks("");
// //     setApplication(result.data);
// //   };

// //   const history = application.statusHistory || [];

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
// //           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

// //           <div className="space-y-1">
// //             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
// //             {history.map((entry, i) => {
// //               const isLast = i === history.length - 1;
// //               return (
// //                 <div key={entry._id || i} className="flex gap-4">
// //                   <div className="flex flex-col items-center">
// //                     <div
// //                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
// //                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
// //                       }`}
// //                     >
// //                       <FiCheck size={15} />
// //                     </div>
// //                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
// //                   </div>
// //                   <div className="pb-6">
// //                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
// //                     <p className="text-xs text-ink-500">
// //                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
// //                     </p>
// //                     {entry.createdAt && (
// //                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
// //                     )}
// //                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
// //               <p className="text-xs text-ink-500">{application.business?.businessCategory}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.address?.ward} &middot; {application.address?.zone}
// //               </p>
// //             </div>
// //           </div>

// //           {application.survey?.recommendation && (
// //             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
// //               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
// //             </div>
// //           )}

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {!canAct ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     {isFinal ? (
// //                       <>
// //                         This application has reached a final state:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                         {application.status === "A.M.C. Approved" && (
// //                           <div className="mt-3">
// //                             <Link to={`/smart-card/${application.applicationNo}`}>
// //                               <Button size="sm">Generate Smart Card</Button>
// //                             </Link>
// //                           </div>
// //                         )}
// //                       </>
// //                     ) : (
// //                       <>
// //                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                       </>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />

// //                     {actionError && (
// //                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
// //                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
// //                         {actionError}
// //                       </div>
// //                     )}

// //                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
// //                       {ACTIONS.map((a) => (
// //                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
// //                           {submitting ? "Submitting..." : a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
// //                 {[...history].reverse().map((h, i) => (
// //                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
// //                       {h.createdAt && (
// //                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
// //                       )}
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }







// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// // import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// // import { useAuth } from "../auth/hooks/useAuth";
// // import ApprovalHistory from "./ApprovalHistory";

// // const TABS = ["Action", "History", "Remarks"];

// // const ACTIONS = [
// //   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
// //   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// // ];

// // // Which actions make sense at which stage
// // const STAGE_ACTIONS = {
// //   "Counter Employee": ["Forward", "Send Back", "Reject"],
// //   "Approval Authority": ["Approve", "Send Back", "Reject"],
// // };

// // export default function ApplicationDetails() {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   const application = useSelector((s) => selectApplicationById(s, id));
// //   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");

// //   if (!application || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">Application not found.</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
// //   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

// //   const handleAction = (decision) => {
// //     dispatch(
// //       recordAction({
// //         id: application.id,
// //         actor: user?.name || "Officer",
// //         actorRole: user?.role || application.currentStage,
// //         decision,
// //         remarks,
// //       })
// //     );

// //     if (decision === "Approve" && application.currentStage === "Approval Authority") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
// //     } else if (decision === "Reject") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
// //     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
// //     }

// //     setRemarks("");
// //   };

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
// //           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
// //           <ApprovalHistory application={application} />
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
// //               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.ward} &middot; {application.zone}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {isFinal ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     This application has reached a final state:{" "}
// //                     <span className="font-semibold text-ink-800">{application.status}</span>.
// //                     {application.status === "Approved" && (
// //                       <div className="mt-3">
// //                         <Link to={`/smart-card/${vendor.id}`}>
// //                           <Button size="sm">Generate Smart Card</Button>
// //                         </Link>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />
// //                     <div className="grid grid-cols-2 gap-3">
// //                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
// //                         <Button
// //                           key={a.key}
// //                           variant={a.variant}
// //                           icon={a.icon}
// //                           onClick={() => handleAction(a.key)}
// //                         >
// //                           {a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {[...application.history].reverse().map((h, i) => (
// //                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
// //                       <span className="text-[11px] text-ink-400">
// //                         {new Date(h.date).toLocaleDateString("en-IN")}
// //                       </span>
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.stage} &middot; {h.actor}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {tab === "Remarks" && (
// //               <div className="space-y-3">
// //                 {application.history.filter((h) => h.remarks).length === 0 && (
// //                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
// //                 )}
// //                 {application.history
// //                   .filter((h) => h.remarks)
// //                   .map((h, i) => (
// //                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
// //                       <p className="mb-1 text-xs font-semibold text-ink-500">
// //                         {h.actor} &middot; {h.stage}
// //                       </p>
// //                       {h.remarks}
// //                     </div>
// //                   ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiMapPin } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision, generateIdCardByAmc } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");
//   const [idCardSubmitting, setIdCardSubmitting] = useState(false);
//   const [idCardError, setIdCardError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   // ── A.M.C.: generate the ID Card right after approval, without payment (future scope) ──
//   const handleGenerateIdCard = async () => {
//     setIdCardError("");
//     setIdCardSubmitting(true);
//     const result = await generateIdCardByAmc(applicationNo, { remarks });
//     setIdCardSubmitting(false);
//     if (!result.success) {
//       setIdCardError(result.message || "Could not generate the ID card.");
//       return;
//     }
//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//               {application.survey.geoLocation?.lat != null && application.survey.geoLocation?.lng != null && (
//                 <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-600">
//                   <FiMapPin size={13} className="text-brand-500" />
//                   {application.survey.geoLocation.lat}, {application.survey.geoLocation.lng}
//                   <a
//                     href={`https://www.google.com/maps?q=${application.survey.geoLocation.lat},${application.survey.geoLocation.lng}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="font-semibold text-brand-600 underline"
//                   >
//                     View on Map
//                   </a>
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {/* CHANGED (29-10 request): Smart Card now auto-generates the instant A.M.C.
//                             approves (see amcDecision on the backend) — so this manual button is no
//                             longer needed in the normal flow. Kept commented, not deleted, as a
//                             fallback in case an older application is ever stuck at "A.M.C. Approved"
//                             without a certificate.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3 space-y-2">
//                             {idCardError && (
//                               <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
//                                 <FiAlertCircle className="mt-0.5 shrink-0" size={14} />
//                                 {idCardError}
//                               </div>
//                             )}
//                             <Button size="sm" variant="success" onClick={handleGenerateIdCard} disabled={idCardSubmitting}>
//                               {idCardSubmitting ? "Please wait..." : "Generate Smart Card"}
//                             </Button>
//                             <p className="text-[11px] text-ink-400">
//                               Payment is not required right now — this issues the Smart Card directly.
//                             </p>
//                           </div>
//                         )}
//                         */}
//                         {application.status === "Certificate Issued" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">View Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }











// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">Generate Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }


// ==============================


// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// import { useAuth } from "../auth/hooks/useAuth";
// import ApprovalHistory from "./ApprovalHistory";

// const TABS = ["Action", "History", "Remarks"];

// const ACTIONS = [
//   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
//   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// ];

// // Which actions make sense at which stage
// const STAGE_ACTIONS = {
//   "Counter Employee": ["Forward", "Send Back", "Reject"],
//   "Approval Authority": ["Approve", "Send Back", "Reject"],
// };

// export default function ApplicationDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const application = useSelector((s) => selectApplicationById(s, id));
//   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");

//   if (!application || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Application not found.</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
//   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

//   const handleAction = (decision) => {
//     dispatch(
//       recordAction({
//         id: application.id,
//         actor: user?.name || "Officer",
//         actorRole: user?.role || application.currentStage,
//         decision,
//         remarks,
//       })
//     );

//     if (decision === "Approve" && application.currentStage === "Approval Authority") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
//     } else if (decision === "Reject") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
//     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
//     }

//     setRemarks("");
//   };

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
//           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
//           <ApprovalHistory application={application} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.ward} &middot; {application.zone}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {isFinal ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     This application has reached a final state:{" "}
//                     <span className="font-semibold text-ink-800">{application.status}</span>.
//                     {application.status === "Approved" && (
//                       <div className="mt-3">
//                         <Link to={`/smart-card/${vendor.id}`}>
//                           <Button size="sm">Generate Smart Card</Button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
//                         <Button
//                           key={a.key}
//                           variant={a.variant}
//                           icon={a.icon}
//                           onClick={() => handleAction(a.key)}
//                         >
//                           {a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {[...application.history].reverse().map((h, i) => (
//                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
//                       <span className="text-[11px] text-ink-400">
//                         {new Date(h.date).toLocaleDateString("en-IN")}
//                       </span>
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.stage} &middot; {h.actor}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "Remarks" && (
//               <div className="space-y-3">
//                 {application.history.filter((h) => h.remarks).length === 0 && (
//                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
//                 )}
//                 {application.history
//                   .filter((h) => h.remarks)
//                   .map((h, i) => (
//                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
//                       <p className="mb-1 text-xs font-semibold text-ink-500">
//                         {h.actor} &middot; {h.stage}
//                       </p>
//                       {h.remarks}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">Generate Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }







// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// import { useAuth } from "../auth/hooks/useAuth";
// import ApprovalHistory from "./ApprovalHistory";

// const TABS = ["Action", "History", "Remarks"];

// const ACTIONS = [
//   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
//   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// ];

// // Which actions make sense at which stage
// const STAGE_ACTIONS = {
//   "Counter Employee": ["Forward", "Send Back", "Reject"],
//   "Approval Authority": ["Approve", "Send Back", "Reject"],
// };

// export default function ApplicationDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const application = useSelector((s) => selectApplicationById(s, id));
//   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");

//   if (!application || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Application not found.</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
//   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

//   const handleAction = (decision) => {
//     dispatch(
//       recordAction({
//         id: application.id,
//         actor: user?.name || "Officer",
//         actorRole: user?.role || application.currentStage,
//         decision,
//         remarks,
//       })
//     );

//     if (decision === "Approve" && application.currentStage === "Approval Authority") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
//     } else if (decision === "Reject") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
//     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
//     }

//     setRemarks("");
//   };

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
//           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
//           <ApprovalHistory application={application} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.ward} &middot; {application.zone}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {isFinal ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     This application has reached a final state:{" "}
//                     <span className="font-semibold text-ink-800">{application.status}</span>.
//                     {application.status === "Approved" && (
//                       <div className="mt-3">
//                         <Link to={`/smart-card/${vendor.id}`}>
//                           <Button size="sm">Generate Smart Card</Button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
//                         <Button
//                           key={a.key}
//                           variant={a.variant}
//                           icon={a.icon}
//                           onClick={() => handleAction(a.key)}
//                         >
//                           {a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {[...application.history].reverse().map((h, i) => (
//                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
//                       <span className="text-[11px] text-ink-400">
//                         {new Date(h.date).toLocaleDateString("en-IN")}
//                       </span>
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.stage} &middot; {h.actor}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "Remarks" && (
//               <div className="space-y-3">
//                 {application.history.filter((h) => h.remarks).length === 0 && (
//                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
//                 )}
//                 {application.history
//                   .filter((h) => h.remarks)
//                   .map((h, i) => (
//                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
//                       <p className="mb-1 text-xs font-semibold text-ink-500">
//                         {h.actor} &middot; {h.stage}
//                       </p>
//                       {h.remarks}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiMapPin } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision, generateIdCardByAmc } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");
//   const [idCardSubmitting, setIdCardSubmitting] = useState(false);
//   const [idCardError, setIdCardError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   // ── A.M.C.: generate the ID Card right after approval, without payment (future scope) ──
//   const handleGenerateIdCard = async () => {
//     setIdCardError("");
//     setIdCardSubmitting(true);
//     const result = await generateIdCardByAmc(applicationNo, { remarks });
//     setIdCardSubmitting(false);
//     if (!result.success) {
//       setIdCardError(result.message || "Could not generate the ID card.");
//       return;
//     }
//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//               {application.survey.geoLocation?.lat != null && application.survey.geoLocation?.lng != null && (
//                 <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-600">
//                   <FiMapPin size={13} className="text-brand-500" />
//                   {application.survey.geoLocation.lat}, {application.survey.geoLocation.lng}
//                   <a
//                     href={`https://www.google.com/maps?q=${application.survey.geoLocation.lat},${application.survey.geoLocation.lng}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="font-semibold text-brand-600 underline"
//                   >
//                     View on Map
//                   </a>
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {["A.M.C. Approved", "Payment Pending"].includes(application.status) && (
//                           <div className="mt-3 space-y-2">
//                             {idCardError && (
//                               <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
//                                 <FiAlertCircle className="mt-0.5 shrink-0" size={14} />
//                                 {idCardError}
//                               </div>
//                             )}
//                             <Button size="sm" variant="success" onClick={handleGenerateIdCard} disabled={idCardSubmitting}>
//                               {idCardSubmitting ? "Please wait..." : "Generate Smart Card"}
//                             </Button>
//                             <p className="text-[11px] text-ink-400">
//                               Payment is not required right now — this issues the Smart Card directly.
//                             </p>
//                           </div>
//                         )}
//                         {application.status === "Certificate Issued" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">View Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// // import { useEffect, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// // const TABS = ["Action", "History"];

// // const ACTIONS = [
// //   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// // ];

// // export default function ApplicationDetails() {
// //   const { id: applicationNo } = useParams();
// //   const navigate = useNavigate();

// //   const [application, setApplication] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loadError, setLoadError] = useState("");

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");
// //   const [submitting, setSubmitting] = useState(false);
// //   const [actionError, setActionError] = useState("");

// //   const loadApplication = () => {
// //     setLoading(true);
// //     setLoadError("");
// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       setLoading(false);
// //       if (!result.success) {
// //         setLoadError(result.message || "Application not found.");
// //         return;
// //       }
// //       setApplication(result.data);
// //     });
// //   };

// //   useEffect(() => {
// //     loadApplication();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [applicationNo]);

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading application...
// //       </Card>
// //     );
// //   }

// //   if (loadError || !application) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
// //         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   // A.M.C. can only act while the application is sitting at their stage
// //   const canAct = application.status === "Forwarded to A.M.C.";
// //   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
// //     application.status
// //   );

// //   const handleAction = async (decision) => {
// //     setActionError("");
// //     setSubmitting(true);
// //     const result = await submitAmcDecision(applicationNo, { decision, remarks });
// //     setSubmitting(false);

// //     if (!result.success) {
// //       setActionError(result.message || "Could not record the decision.");
// //       return;
// //     }

// //     setRemarks("");
// //     setApplication(result.data);
// //   };

// //   const history = application.statusHistory || [];

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
// //           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

// //           <div className="space-y-1">
// //             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
// //             {history.map((entry, i) => {
// //               const isLast = i === history.length - 1;
// //               return (
// //                 <div key={entry._id || i} className="flex gap-4">
// //                   <div className="flex flex-col items-center">
// //                     <div
// //                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
// //                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
// //                       }`}
// //                     >
// //                       <FiCheck size={15} />
// //                     </div>
// //                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
// //                   </div>
// //                   <div className="pb-6">
// //                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
// //                     <p className="text-xs text-ink-500">
// //                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
// //                     </p>
// //                     {entry.createdAt && (
// //                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
// //                     )}
// //                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
// //               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.address?.ward} &middot; {application.address?.zone}
// //               </p>
// //             </div>
// //           </div>

// //           {application.survey?.recommendation && (
// //             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
// //               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
// //             </div>
// //           )}

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {!canAct ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     {isFinal ? (
// //                       <>
// //                         This application has reached a final state:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                         {application.status === "A.M.C. Approved" && (
// //                           <div className="mt-3">
// //                             <Link to={`/smart-card/${application.applicationNo}`}>
// //                               <Button size="sm">Generate Smart Card</Button>
// //                             </Link>
// //                           </div>
// //                         )}
// //                       </>
// //                     ) : (
// //                       <>
// //                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                       </>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />

// //                     {actionError && (
// //                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
// //                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
// //                         {actionError}
// //                       </div>
// //                     )}

// //                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
// //                       {ACTIONS.map((a) => (
// //                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
// //                           {submitting ? "Submitting..." : a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
// //                 {[...history].reverse().map((h, i) => (
// //                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
// //                       {h.createdAt && (
// //                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
// //                       )}
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }


// // ==============================


// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// // import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// // import { useAuth } from "../auth/hooks/useAuth";
// // import ApprovalHistory from "./ApprovalHistory";

// // const TABS = ["Action", "History", "Remarks"];

// // const ACTIONS = [
// //   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
// //   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// // ];

// // // Which actions make sense at which stage
// // const STAGE_ACTIONS = {
// //   "Counter Employee": ["Forward", "Send Back", "Reject"],
// //   "Approval Authority": ["Approve", "Send Back", "Reject"],
// // };

// // export default function ApplicationDetails() {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   const application = useSelector((s) => selectApplicationById(s, id));
// //   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");

// //   if (!application || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">Application not found.</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
// //   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

// //   const handleAction = (decision) => {
// //     dispatch(
// //       recordAction({
// //         id: application.id,
// //         actor: user?.name || "Officer",
// //         actorRole: user?.role || application.currentStage,
// //         decision,
// //         remarks,
// //       })
// //     );

// //     if (decision === "Approve" && application.currentStage === "Approval Authority") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
// //     } else if (decision === "Reject") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
// //     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
// //     }

// //     setRemarks("");
// //   };

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
// //           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
// //           <ApprovalHistory application={application} />
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
// //               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.ward} &middot; {application.zone}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {isFinal ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     This application has reached a final state:{" "}
// //                     <span className="font-semibold text-ink-800">{application.status}</span>.
// //                     {application.status === "Approved" && (
// //                       <div className="mt-3">
// //                         <Link to={`/smart-card/${vendor.id}`}>
// //                           <Button size="sm">Generate Smart Card</Button>
// //                         </Link>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />
// //                     <div className="grid grid-cols-2 gap-3">
// //                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
// //                         <Button
// //                           key={a.key}
// //                           variant={a.variant}
// //                           icon={a.icon}
// //                           onClick={() => handleAction(a.key)}
// //                         >
// //                           {a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {[...application.history].reverse().map((h, i) => (
// //                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
// //                       <span className="text-[11px] text-ink-400">
// //                         {new Date(h.date).toLocaleDateString("en-IN")}
// //                       </span>
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.stage} &middot; {h.actor}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {tab === "Remarks" && (
// //               <div className="space-y-3">
// //                 {application.history.filter((h) => h.remarks).length === 0 && (
// //                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
// //                 )}
// //                 {application.history
// //                   .filter((h) => h.remarks)
// //                   .map((h, i) => (
// //                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
// //                       <p className="mb-1 text-xs font-semibold text-ink-500">
// //                         {h.actor} &middot; {h.stage}
// //                       </p>
// //                       {h.remarks}
// //                     </div>
// //                   ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }




// // import { useEffect, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// // const TABS = ["Action", "History"];

// // const ACTIONS = [
// //   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// // ];

// // export default function ApplicationDetails() {
// //   const { id: applicationNo } = useParams();
// //   const navigate = useNavigate();

// //   const [application, setApplication] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loadError, setLoadError] = useState("");

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");
// //   const [submitting, setSubmitting] = useState(false);
// //   const [actionError, setActionError] = useState("");

// //   const loadApplication = () => {
// //     setLoading(true);
// //     setLoadError("");
// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       setLoading(false);
// //       if (!result.success) {
// //         setLoadError(result.message || "Application not found.");
// //         return;
// //       }
// //       setApplication(result.data);
// //     });
// //   };

// //   useEffect(() => {
// //     loadApplication();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [applicationNo]);

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading application...
// //       </Card>
// //     );
// //   }

// //   if (loadError || !application) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
// //         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   // A.M.C. can only act while the application is sitting at their stage
// //   const canAct = application.status === "Forwarded to A.M.C.";
// //   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
// //     application.status
// //   );

// //   const handleAction = async (decision) => {
// //     setActionError("");
// //     setSubmitting(true);
// //     const result = await submitAmcDecision(applicationNo, { decision, remarks });
// //     setSubmitting(false);

// //     if (!result.success) {
// //       setActionError(result.message || "Could not record the decision.");
// //       return;
// //     }

// //     setRemarks("");
// //     setApplication(result.data);
// //   };

// //   const history = application.statusHistory || [];

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
// //           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

// //           <div className="space-y-1">
// //             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
// //             {history.map((entry, i) => {
// //               const isLast = i === history.length - 1;
// //               return (
// //                 <div key={entry._id || i} className="flex gap-4">
// //                   <div className="flex flex-col items-center">
// //                     <div
// //                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
// //                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
// //                       }`}
// //                     >
// //                       <FiCheck size={15} />
// //                     </div>
// //                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
// //                   </div>
// //                   <div className="pb-6">
// //                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
// //                     <p className="text-xs text-ink-500">
// //                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
// //                     </p>
// //                     {entry.createdAt && (
// //                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
// //                     )}
// //                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
// //               <p className="text-xs text-ink-500">{application.business?.businessCategory}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.address?.ward} &middot; {application.address?.zone}
// //               </p>
// //             </div>
// //           </div>

// //           {application.survey?.recommendation && (
// //             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
// //               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
// //             </div>
// //           )}

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {!canAct ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     {isFinal ? (
// //                       <>
// //                         This application has reached a final state:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                         {application.status === "A.M.C. Approved" && (
// //                           <div className="mt-3">
// //                             <Link to={`/smart-card/${application.applicationNo}`}>
// //                               <Button size="sm">Generate Smart Card</Button>
// //                             </Link>
// //                           </div>
// //                         )}
// //                       </>
// //                     ) : (
// //                       <>
// //                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
// //                         <span className="font-semibold text-ink-800">{application.status}</span>.
// //                       </>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />

// //                     {actionError && (
// //                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
// //                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
// //                         {actionError}
// //                       </div>
// //                     )}

// //                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
// //                       {ACTIONS.map((a) => (
// //                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
// //                           {submitting ? "Submitting..." : a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
// //                 {[...history].reverse().map((h, i) => (
// //                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
// //                       {h.createdAt && (
// //                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
// //                       )}
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }







// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// // import Card from "../../components/ui/Card";
// // import Button from "../../components/ui/Button";
// // import Avatar from "../../components/ui/Avatar";
// // import { IdBadge } from "../../components/ui/Avatar";
// // import StatusChip from "../../components/ui/StatusChip";
// // import { Textarea } from "../../components/ui/Field";
// // import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// // import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// // import { useAuth } from "../auth/hooks/useAuth";
// // import ApprovalHistory from "./ApprovalHistory";

// // const TABS = ["Action", "History", "Remarks"];

// // const ACTIONS = [
// //   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
// //   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
// //   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
// //   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// // ];

// // // Which actions make sense at which stage
// // const STAGE_ACTIONS = {
// //   "Counter Employee": ["Forward", "Send Back", "Reject"],
// //   "Approval Authority": ["Approve", "Send Back", "Reject"],
// // };

// // export default function ApplicationDetails() {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   const application = useSelector((s) => selectApplicationById(s, id));
// //   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

// //   const [tab, setTab] = useState("Action");
// //   const [remarks, setRemarks] = useState("");

// //   if (!application || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">Application not found.</p>
// //         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Applications
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
// //   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

// //   const handleAction = (decision) => {
// //     dispatch(
// //       recordAction({
// //         id: application.id,
// //         actor: user?.name || "Officer",
// //         actorRole: user?.role || application.currentStage,
// //         decision,
// //         remarks,
// //       })
// //     );

// //     if (decision === "Approve" && application.currentStage === "Approval Authority") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
// //     } else if (decision === "Reject") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
// //     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
// //       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
// //     }

// //     setRemarks("");
// //   };

// //   return (
// //     <div className="space-y-5">
// //       <Link
// //         to="/applications"
// //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
// //       >
// //         <FiArrowLeft size={14} /> Back to Applications
// //       </Link>

// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
// //         <Card>
// //           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
// //           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
// //           <ApprovalHistory application={application} />
// //         </Card>

// //         <Card padded={false} className="overflow-hidden">
// //           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
// //             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
// //             <div>
// //               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
// //               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
// //             </div>
// //             <StatusChip status={application.status} className="ml-auto" />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
// //               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
// //               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
// //             </div>
// //             <div>
// //               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
// //               <p className="mt-1 font-semibold text-ink-800">
// //                 {application.ward} &middot; {application.zone}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex gap-1 border-b border-ink-100 px-5">
// //             {TABS.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
// //                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
// //                 }`}
// //               >
// //                 {t}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="p-5">
// //             {tab === "Action" && (
// //               <div className="space-y-5">
// //                 {isFinal ? (
// //                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
// //                     This application has reached a final state:{" "}
// //                     <span className="font-semibold text-ink-800">{application.status}</span>.
// //                     {application.status === "Approved" && (
// //                       <div className="mt-3">
// //                         <Link to={`/smart-card/${vendor.id}`}>
// //                           <Button size="sm">Generate Smart Card</Button>
// //                         </Link>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Textarea
// //                       label="Remarks"
// //                       placeholder="Add remarks for this action..."
// //                       value={remarks}
// //                       onChange={(e) => setRemarks(e.target.value)}
// //                     />
// //                     <div className="grid grid-cols-2 gap-3">
// //                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
// //                         <Button
// //                           key={a.key}
// //                           variant={a.variant}
// //                           icon={a.icon}
// //                           onClick={() => handleAction(a.key)}
// //                         >
// //                           {a.label}
// //                         </Button>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {tab === "History" && (
// //               <div className="space-y-4">
// //                 {[...application.history].reverse().map((h, i) => (
// //                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
// //                       <span className="text-[11px] text-ink-400">
// //                         {new Date(h.date).toLocaleDateString("en-IN")}
// //                       </span>
// //                     </div>
// //                     <p className="mt-0.5 text-xs text-ink-500">
// //                       {h.stage} &middot; {h.actor}
// //                     </p>
// //                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {tab === "Remarks" && (
// //               <div className="space-y-3">
// //                 {application.history.filter((h) => h.remarks).length === 0 && (
// //                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
// //                 )}
// //                 {application.history
// //                   .filter((h) => h.remarks)
// //                   .map((h, i) => (
// //                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
// //                       <p className="mb-1 text-xs font-semibold text-ink-500">
// //                         {h.actor} &middot; {h.stage}
// //                       </p>
// //                       {h.remarks}
// //                     </div>
// //                   ))}
// //               </div>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiMapPin } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision, generateIdCardByAmc } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");
//   const [idCardSubmitting, setIdCardSubmitting] = useState(false);
//   const [idCardError, setIdCardError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   // ── A.M.C.: generate the ID Card right after approval, without payment (future scope) ──
//   const handleGenerateIdCard = async () => {
//     setIdCardError("");
//     setIdCardSubmitting(true);
//     const result = await generateIdCardByAmc(applicationNo, { remarks });
//     setIdCardSubmitting(false);
//     if (!result.success) {
//       setIdCardError(result.message || "Could not generate the ID card.");
//       return;
//     }
//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//               {application.survey.geoLocation?.lat != null && application.survey.geoLocation?.lng != null && (
//                 <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-600">
//                   <FiMapPin size={13} className="text-brand-500" />
//                   {application.survey.geoLocation.lat}, {application.survey.geoLocation.lng}
//                   <a
//                     href={`https://www.google.com/maps?q=${application.survey.geoLocation.lat},${application.survey.geoLocation.lng}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="font-semibold text-brand-600 underline"
//                   >
//                     View on Map
//                   </a>
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {/* CHANGED (29-10 request): Smart Card now auto-generates the instant A.M.C.
//                             approves (see amcDecision on the backend) — so this manual button is no
//                             longer needed in the normal flow. Kept commented, not deleted, as a
//                             fallback in case an older application is ever stuck at "A.M.C. Approved"
//                             without a certificate.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3 space-y-2">
//                             {idCardError && (
//                               <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
//                                 <FiAlertCircle className="mt-0.5 shrink-0" size={14} />
//                                 {idCardError}
//                               </div>
//                             )}
//                             <Button size="sm" variant="success" onClick={handleGenerateIdCard} disabled={idCardSubmitting}>
//                               {idCardSubmitting ? "Please wait..." : "Generate Smart Card"}
//                             </Button>
//                             <p className="text-[11px] text-ink-400">
//                               Payment is not required right now — this issues the Smart Card directly.
//                             </p>
//                           </div>
//                         )}
//                         */}
//                         {application.status === "Certificate Issued" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">View Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }











// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">Generate Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }


// ==============================


// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// import { useAuth } from "../auth/hooks/useAuth";
// import ApprovalHistory from "./ApprovalHistory";

// const TABS = ["Action", "History", "Remarks"];

// const ACTIONS = [
//   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
//   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// ];

// // Which actions make sense at which stage
// const STAGE_ACTIONS = {
//   "Counter Employee": ["Forward", "Send Back", "Reject"],
//   "Approval Authority": ["Approve", "Send Back", "Reject"],
// };

// export default function ApplicationDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const application = useSelector((s) => selectApplicationById(s, id));
//   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");

//   if (!application || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Application not found.</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
//   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

//   const handleAction = (decision) => {
//     dispatch(
//       recordAction({
//         id: application.id,
//         actor: user?.name || "Officer",
//         actorRole: user?.role || application.currentStage,
//         decision,
//         remarks,
//       })
//     );

//     if (decision === "Approve" && application.currentStage === "Approval Authority") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
//     } else if (decision === "Reject") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
//     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
//     }

//     setRemarks("");
//   };

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
//           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
//           <ApprovalHistory application={application} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.ward} &middot; {application.zone}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {isFinal ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     This application has reached a final state:{" "}
//                     <span className="font-semibold text-ink-800">{application.status}</span>.
//                     {application.status === "Approved" && (
//                       <div className="mt-3">
//                         <Link to={`/smart-card/${vendor.id}`}>
//                           <Button size="sm">Generate Smart Card</Button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
//                         <Button
//                           key={a.key}
//                           variant={a.variant}
//                           icon={a.icon}
//                           onClick={() => handleAction(a.key)}
//                         >
//                           {a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {[...application.history].reverse().map((h, i) => (
//                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
//                       <span className="text-[11px] text-ink-400">
//                         {new Date(h.date).toLocaleDateString("en-IN")}
//                       </span>
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.stage} &middot; {h.actor}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "Remarks" && (
//               <div className="space-y-3">
//                 {application.history.filter((h) => h.remarks).length === 0 && (
//                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
//                 )}
//                 {application.history
//                   .filter((h) => h.remarks)
//                   .map((h, i) => (
//                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
//                       <p className="mb-1 text-xs font-semibold text-ink-500">
//                         {h.actor} &middot; {h.stage}
//                       </p>
//                       {h.remarks}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">Generate Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }







// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// import { useAuth } from "../auth/hooks/useAuth";
// import ApprovalHistory from "./ApprovalHistory";

// const TABS = ["Action", "History", "Remarks"];

// const ACTIONS = [
//   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
//   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// ];

// // Which actions make sense at which stage
// const STAGE_ACTIONS = {
//   "Counter Employee": ["Forward", "Send Back", "Reject"],
//   "Approval Authority": ["Approve", "Send Back", "Reject"],
// };

// export default function ApplicationDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const application = useSelector((s) => selectApplicationById(s, id));
//   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");

//   if (!application || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Application not found.</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
//   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

//   const handleAction = (decision) => {
//     dispatch(
//       recordAction({
//         id: application.id,
//         actor: user?.name || "Officer",
//         actorRole: user?.role || application.currentStage,
//         decision,
//         remarks,
//       })
//     );

//     if (decision === "Approve" && application.currentStage === "Approval Authority") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
//     } else if (decision === "Reject") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
//     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
//     }

//     setRemarks("");
//   };

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
//           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
//           <ApprovalHistory application={application} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.ward} &middot; {application.zone}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {isFinal ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     This application has reached a final state:{" "}
//                     <span className="font-semibold text-ink-800">{application.status}</span>.
//                     {application.status === "Approved" && (
//                       <div className="mt-3">
//                         <Link to={`/smart-card/${vendor.id}`}>
//                           <Button size="sm">Generate Smart Card</Button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
//                         <Button
//                           key={a.key}
//                           variant={a.variant}
//                           icon={a.icon}
//                           onClick={() => handleAction(a.key)}
//                         >
//                           {a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {[...application.history].reverse().map((h, i) => (
//                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
//                       <span className="text-[11px] text-ink-400">
//                         {new Date(h.date).toLocaleDateString("en-IN")}
//                       </span>
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.stage} &middot; {h.actor}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "Remarks" && (
//               <div className="space-y-3">
//                 {application.history.filter((h) => h.remarks).length === 0 && (
//                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
//                 )}
//                 {application.history
//                   .filter((h) => h.remarks)
//                   .map((h, i) => (
//                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
//                       <p className="mb-1 text-xs font-semibold text-ink-500">
//                         {h.actor} &middot; {h.stage}
//                       </p>
//                       {h.remarks}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiMapPin } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision, generateIdCardByAmc } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");
//   const [idCardSubmitting, setIdCardSubmitting] = useState(false);
//   const [idCardError, setIdCardError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   // ── A.M.C.: generate the ID Card right after approval, without payment (future scope) ──
//   const handleGenerateIdCard = async () => {
//     setIdCardError("");
//     setIdCardSubmitting(true);
//     const result = await generateIdCardByAmc(applicationNo, { remarks });
//     setIdCardSubmitting(false);
//     if (!result.success) {
//       setIdCardError(result.message || "Could not generate the ID card.");
//       return;
//     }
//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//               {application.survey.geoLocation?.lat != null && application.survey.geoLocation?.lng != null && (
//                 <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-600">
//                   <FiMapPin size={13} className="text-brand-500" />
//                   {application.survey.geoLocation.lat}, {application.survey.geoLocation.lng}
//                   <a
//                     href={`https://www.google.com/maps?q=${application.survey.geoLocation.lat},${application.survey.geoLocation.lng}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="font-semibold text-brand-600 underline"
//                   >
//                     View on Map
//                   </a>
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {["A.M.C. Approved", "Payment Pending"].includes(application.status) && (
//                           <div className="mt-3 space-y-2">
//                             {idCardError && (
//                               <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
//                                 <FiAlertCircle className="mt-0.5 shrink-0" size={14} />
//                                 {idCardError}
//                               </div>
//                             )}
//                             <Button size="sm" variant="success" onClick={handleGenerateIdCard} disabled={idCardSubmitting}>
//                               {idCardSubmitting ? "Please wait..." : "Generate Smart Card"}
//                             </Button>
//                             <p className="text-[11px] text-ink-400">
//                               Payment is not required right now — this issues the Smart Card directly.
//                             </p>
//                           </div>
//                         )}
//                         {application.status === "Certificate Issued" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">View Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessType}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">Generate Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }


// ==============================


// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// import { useAuth } from "../auth/hooks/useAuth";
// import ApprovalHistory from "./ApprovalHistory";

// const TABS = ["Action", "History", "Remarks"];

// const ACTIONS = [
//   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
//   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// ];

// // Which actions make sense at which stage
// const STAGE_ACTIONS = {
//   "Counter Employee": ["Forward", "Send Back", "Reject"],
//   "Approval Authority": ["Approve", "Send Back", "Reject"],
// };

// export default function ApplicationDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const application = useSelector((s) => selectApplicationById(s, id));
//   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");

//   if (!application || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Application not found.</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
//   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

//   const handleAction = (decision) => {
//     dispatch(
//       recordAction({
//         id: application.id,
//         actor: user?.name || "Officer",
//         actorRole: user?.role || application.currentStage,
//         decision,
//         remarks,
//       })
//     );

//     if (decision === "Approve" && application.currentStage === "Approval Authority") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
//     } else if (decision === "Reject") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
//     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
//     }

//     setRemarks("");
//   };

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
//           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
//           <ApprovalHistory application={application} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.ward} &middot; {application.zone}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {isFinal ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     This application has reached a final state:{" "}
//                     <span className="font-semibold text-ink-800">{application.status}</span>.
//                     {application.status === "Approved" && (
//                       <div className="mt-3">
//                         <Link to={`/smart-card/${vendor.id}`}>
//                           <Button size="sm">Generate Smart Card</Button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
//                         <Button
//                           key={a.key}
//                           variant={a.variant}
//                           icon={a.icon}
//                           onClick={() => handleAction(a.key)}
//                         >
//                           {a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {[...application.history].reverse().map((h, i) => (
//                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
//                       <span className="text-[11px] text-ink-400">
//                         {new Date(h.date).toLocaleDateString("en-IN")}
//                       </span>
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.stage} &middot; {h.actor}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "Remarks" && (
//               <div className="space-y-3">
//                 {application.history.filter((h) => h.remarks).length === 0 && (
//                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
//                 )}
//                 {application.history
//                   .filter((h) => h.remarks)
//                   .map((h, i) => (
//                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
//                       <p className="mb-1 text-xs font-semibold text-ink-500">
//                         {h.actor} &middot; {h.stage}
//                       </p>
//                       {h.remarks}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { fetchVendorApplicationByNo, submitAmcDecision } from "../../services/vendorApplicationService";

// const TABS = ["Action", "History"];

// const ACTIONS = [
//   { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
// ];

// export default function ApplicationDetails() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [actionError, setActionError] = useState("");

//   const loadApplication = () => {
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       setApplication(result.data);
//     });
//   };

//   useEffect(() => {
//     loadApplication();
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

//   if (loadError || !application) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   // A.M.C. can only act while the application is sitting at their stage
//   const canAct = application.status === "Forwarded to A.M.C.";
//   const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
//     application.status
//   );

//   const handleAction = async (decision) => {
//     setActionError("");
//     setSubmitting(true);
//     const result = await submitAmcDecision(applicationNo, { decision, remarks });
//     setSubmitting(false);

//     if (!result.success) {
//       setActionError(result.message || "Could not record the decision.");
//       return;
//     }

//     setRemarks("");
//     setApplication(result.data);
//   };

//   const history = application.statusHistory || [];

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
//           <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

//           <div className="space-y-1">
//             {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
//             {history.map((entry, i) => {
//               const isLast = i === history.length - 1;
//               return (
//                 <div key={entry._id || i} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
//                         isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
//                       }`}
//                     >
//                       <FiCheck size={15} />
//                     </div>
//                     {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
//                     <p className="text-xs text-ink-500">
//                       {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
//                     </p>
//                     {entry.createdAt && (
//                       <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
//                     )}
//                     {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
//               <p className="text-xs text-ink-500">{application.business?.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.address?.ward} &middot; {application.address?.zone}
//               </p>
//             </div>
//           </div>

//           {application.survey?.recommendation && (
//             <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
//               <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
//               {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
//             </div>
//           )}

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {!canAct ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     {isFinal ? (
//                       <>
//                         This application has reached a final state:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                         {application.status === "A.M.C. Approved" && (
//                           <div className="mt-3">
//                             <Link to={`/smart-card/${application.applicationNo}`}>
//                               <Button size="sm">Generate Smart Card</Button>
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         This application isn't at the A.M.C. decision stage right now — current status:{" "}
//                         <span className="font-semibold text-ink-800">{application.status}</span>.
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />

//                     {actionError && (
//                       <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                         <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//                         {actionError}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                       {ACTIONS.map((a) => (
//                         <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
//                           {submitting ? "Submitting..." : a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
//                 {[...history].reverse().map((h, i) => (
//                   <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.status}</p>
//                       {h.createdAt && (
//                         <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
//                       )}
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }







// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiArrowRight } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import StatusChip from "../../components/ui/StatusChip";
// import { Textarea } from "../../components/ui/Field";
// import { selectApplicationById, recordAction } from "../../features/applications/applicationsSlice";
// import { selectVendorById, updateVendorStatus } from "../../features/vendors/vendorsSlice";
// import { useAuth } from "../auth/hooks/useAuth";
// import ApprovalHistory from "./ApprovalHistory";

// const TABS = ["Action", "History", "Remarks"];

// const ACTIONS = [
//   { key: "Approve", label: "Approve", icon: FiCheck, variant: "success" },
//   { key: "Reject", label: "Reject", icon: FiX, variant: "danger" },
//   { key: "Send Back", label: "Send Back", icon: FiCornerUpLeft, variant: "accent" },
//   { key: "Forward", label: "Forward", icon: FiArrowRight, variant: "primary" },
// ];

// // Which actions make sense at which stage
// const STAGE_ACTIONS = {
//   "Counter Employee": ["Forward", "Send Back", "Reject"],
//   "Approval Authority": ["Approve", "Send Back", "Reject"],
// };

// export default function ApplicationDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const application = useSelector((s) => selectApplicationById(s, id));
//   const vendor = useSelector((s) => (application ? selectVendorById(s, application.vendorId) : null));

//   const [tab, setTab] = useState("Action");
//   const [remarks, setRemarks] = useState("");

//   if (!application || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Application not found.</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   const availableActions = STAGE_ACTIONS[application.currentStage] || [];
//   const isFinal = application.currentStage === "Approved" || application.currentStage === "Rejected";

//   const handleAction = (decision) => {
//     dispatch(
//       recordAction({
//         id: application.id,
//         actor: user?.name || "Officer",
//         actorRole: user?.role || application.currentStage,
//         decision,
//         remarks,
//       })
//     );

//     if (decision === "Approve" && application.currentStage === "Approval Authority") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Approved", currentStage: "Approved" }));
//     } else if (decision === "Reject") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Rejected", currentStage: "Rejected" }));
//     } else if (decision === "Send Back" && application.currentStage === "Counter Employee") {
//       dispatch(updateVendorStatus({ id: vendor.id, status: "Under Survey", currentStage: "Survey" }));
//     }

//     setRemarks("");
//   };

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
//         <Card>
//           <h2 className="mb-1 font-display text-base font-bold text-ink-900">Approval Workflow</h2>
//           <p className="mb-5 text-xs text-ink-500">Track the vendor's journey through each stage</p>
//           <ApprovalHistory application={application} />
//         </Card>

//         <Card padded={false} className="overflow-hidden">
//           <div className="flex items-center gap-4 border-b border-ink-100 p-5">
//             <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={48} />
//             <div>
//               <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//               <p className="text-xs text-ink-500">{vendor.business.businessCategory}</p>
//             </div>
//             <StatusChip status={application.status} className="ml-auto" />
//           </div>

//           <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
//               <IdBadge className="mt-1 bg-ink-50">{application.vendorRefId}</IdBadge>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
//               <p className="mt-1 font-semibold text-ink-800">{application.currentStage}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
//               <p className="mt-1 font-semibold text-ink-800">
//                 {application.ward} &middot; {application.zone}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-1 border-b border-ink-100 px-5">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
//                   tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="p-5">
//             {tab === "Action" && (
//               <div className="space-y-5">
//                 {isFinal ? (
//                   <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
//                     This application has reached a final state:{" "}
//                     <span className="font-semibold text-ink-800">{application.status}</span>.
//                     {application.status === "Approved" && (
//                       <div className="mt-3">
//                         <Link to={`/smart-card/${vendor.id}`}>
//                           <Button size="sm">Generate Smart Card</Button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       label="Remarks"
//                       placeholder="Add remarks for this action..."
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       {ACTIONS.filter((a) => availableActions.includes(a.key)).map((a) => (
//                         <Button
//                           key={a.key}
//                           variant={a.variant}
//                           icon={a.icon}
//                           onClick={() => handleAction(a.key)}
//                         >
//                           {a.label}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {tab === "History" && (
//               <div className="space-y-4">
//                 {[...application.history].reverse().map((h, i) => (
//                   <div key={i} className="rounded-xl border border-ink-100 p-3.5">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-ink-900">{h.action}</p>
//                       <span className="text-[11px] text-ink-400">
//                         {new Date(h.date).toLocaleDateString("en-IN")}
//                       </span>
//                     </div>
//                     <p className="mt-0.5 text-xs text-ink-500">
//                       {h.stage} &middot; {h.actor}
//                     </p>
//                     {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "Remarks" && (
//               <div className="space-y-3">
//                 {application.history.filter((h) => h.remarks).length === 0 && (
//                   <p className="text-sm text-ink-400">No remarks recorded yet.</p>
//                 )}
//                 {application.history
//                   .filter((h) => h.remarks)
//                   .map((h, i) => (
//                     <div key={i} className="rounded-xl bg-ink-50 p-3.5 text-sm text-ink-700">
//                       <p className="mb-1 text-xs font-semibold text-ink-500">
//                         {h.actor} &middot; {h.stage}
//                       </p>
//                       {h.remarks}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiX, FiCornerUpLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiMapPin, FiImage } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Avatar from "../../components/ui/Avatar";
import { IdBadge } from "../../components/ui/Avatar";
import StatusChip from "../../components/ui/StatusChip";
import { Textarea } from "../../components/ui/Field";
import { useAuth } from "../auth/hooks/useAuth";
import { fetchVendorApplicationByNo, submitAmcDecision, generateIdCardByAmc } from "../../services/vendorApplicationService";

const TABS = ["Action", "History"];

const ACTIONS = [
  { key: "Approved", label: "Approve", icon: FiCheck, variant: "success" },
  { key: "Rejected", label: "Reject", icon: FiX, variant: "danger" },
  { key: "Sent Back", label: "Send Back to Counter Officer", icon: FiCornerUpLeft, variant: "accent" },
];

export default function ApplicationDetails() {
  const { id: applicationNo } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAmc = user?.role === "A.M.C.";
  const isSuperAdmin = user?.role === "super_admin";
  // ── Generate/View Vendor ID is A.M.C.-only (29-10 request) — counter_officer,
  //    survey_officer must NOT be able to generate it, or even view it. ──
  const canSeeSmartCard = isAmc || isSuperAdmin;


  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [tab, setTab] = useState("Action");
  const [remarks, setRemarks] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [idCardSubmitting, setIdCardSubmitting] = useState(false);
  const [idCardError, setIdCardError] = useState("");
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const loadApplication = () => {
    setLoading(true);
    setLoadError("");
    fetchVendorApplicationByNo(applicationNo).then((result) => {
      setLoading(false);
      if (!result.success) {
        setLoadError(result.message || "Application not found.");
        return;
      }
      setApplication(result.data);
    });
  };

  useEffect(() => {
    loadApplication();
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

  if (loadError || !application) {
    return (
      <Card className="mx-auto max-w-md text-center">
        <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
        <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
        <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
          Back to Applications
        </Link>
      </Card>
    );
  }

  // A.M.C. can only act while the application is sitting at their stage — and only if this
  // logged-in user actually IS an A.M.C. (Counter Officer / Survey Officer / Vendor viewing
  // this page should never see action buttons, only read-only info + history)
  const canAct = isAmc && application.status === "Forwarded to A.M.C.";
  const isFinal = ["A.M.C. Approved", "Rejected", "Payment Pending", "Payment Done", "Certificate Issued"].includes(
    application.status
  );

  const handleAction = async (decision) => {
    setActionError("");
    setSubmitting(true);
    const result = await submitAmcDecision(applicationNo, { decision, remarks });
    setSubmitting(false);

    if (!result.success) {
      setActionError(result.message || "Could not record the decision.");
      return;
    }

    setRemarks("");
    setApplication(result.data);
  };

  // ── A.M.C.: generate the ID Card right after approval, without payment (future scope) ──
  const handleGenerateIdCard = async () => {
    setIdCardError("");
    setIdCardSubmitting(true);
    const result = await generateIdCardByAmc(applicationNo, { remarks });
    setIdCardSubmitting(false);
    if (!result.success) {
      setIdCardError(result.message || "Could not generate the ID card.");
      return;
    }
    setRemarks("");
    setApplication(result.data);
  };

  const history = application.statusHistory || [];

  return (
    <div className="space-y-5">
      <Link
        to="/applications"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
      >
        <FiArrowLeft size={14} /> Back to Applications
      </Link>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
        <Card>
          <h2 className="mb-1 font-display text-base font-bold text-ink-900">Application History</h2>
          <p className="mb-5 text-xs text-ink-500">Every status change recorded for this application</p>

          <div className="space-y-1">
            {history.length === 0 && <p className="text-sm text-ink-400">No history yet.</p>}
            {history.map((entry, i) => {
              const isLast = i === history.length - 1;
              return (
                <div key={entry._id || i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isLast ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-success-500 text-white"
                      }`}
                    >
                      <FiCheck size={15} />
                    </div>
                    {!isLast && <div className="w-[2px] flex-1 bg-success-500" style={{ minHeight: 32 }} />}
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-semibold text-ink-900">{entry.status}</p>
                    <p className="text-xs text-ink-500">
                      {entry.changedByName} {entry.changedByRole ? `(${entry.changedByRole})` : ""}
                    </p>
                    {entry.createdAt && (
                      <p className="mt-0.5 text-[11px] text-ink-400">{new Date(entry.createdAt).toLocaleString("en-IN")}</p>
                    )}
                    {entry.remarks && <p className="mt-0.5 text-xs font-medium text-brand-600">{entry.remarks}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card padded={false} className="overflow-hidden">
          <div className="flex items-center gap-4 border-b border-ink-100 p-5">
            <Avatar src={application.documents?.photo || undefined} name={application.personal?.fullName} size={48} />
            <div>
              <p className="font-display text-base font-bold text-ink-900">{application.personal?.fullName}</p>
              <p className="text-xs text-ink-500">{application.business?.businessType}</p>
            </div>
            <StatusChip status={application.status} className="ml-auto" />
          </div>

          <div className="grid grid-cols-2 gap-3 border-b border-ink-100 p-5 text-sm">
            <div>
              <p className="text-[11px] font-medium uppercase text-ink-400">Application No.</p>
              <IdBadge className="mt-1 bg-ink-50">{application.applicationNo}</IdBadge>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase text-ink-400">Vendor ID</p>
              <IdBadge className="mt-1 bg-ink-50">{application.vendorId}</IdBadge>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase text-ink-400">Current Stage</p>
              <p className="mt-1 font-semibold text-ink-800">{application.status}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase text-ink-400">Ward / Zone</p>
              <p className="mt-1 font-semibold text-ink-800">
                {application.address?.ward} &middot; {application.address?.zone}
              </p>
            </div>
          </div>

          {application.survey?.recommendation && (
            <div className="border-b border-ink-100 bg-ink-50/50 p-5 text-sm">
              <p className="text-[11px] font-medium uppercase text-ink-400">Survey Officer's Recommendation</p>
              <p className="mt-1 font-semibold text-ink-800">{application.survey.recommendation}</p>
              {application.survey.comments && <p className="mt-1 text-xs text-ink-600">{application.survey.comments}</p>}
              {application.survey.geoLocation?.lat != null && application.survey.geoLocation?.lng != null && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-600">
                  <FiMapPin size={13} className="text-brand-500" />
                  {application.survey.geoLocation.lat}, {application.survey.geoLocation.lng}
                  <a
                    href={`https://www.google.com/maps?q=${application.survey.geoLocation.lat},${application.survey.geoLocation.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-brand-600 underline"
                  >
                    View on Map
                  </a>
                </p>
              )}
              {application.survey.surveyPhotos?.length > 0 && (
                <div className="mt-3">
                  <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase text-ink-400">
                    <FiImage size={13} /> Survey Photos
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {application.survey.surveyPhotos.slice(0, 4).map((photoUrl, i) => (
                      <button
                        key={photoUrl || i}
                        type="button"
                        onClick={() => setLightboxPhoto(photoUrl)}
                        className="h-16 w-16 overflow-hidden rounded-lg border border-ink-200 transition hover:opacity-80"
                      >
                        <img src={photoUrl} alt={`Survey photo ${i + 1}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-1 border-b border-ink-100 px-5">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
                  tab === t ? "border-brand-500 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="p-5">
            {tab === "Action" && (
              <div className="space-y-5">
                {!canAct ? (
                  <div className="rounded-xl bg-ink-50 p-4 text-center text-sm text-ink-500">
                    {isFinal ? (
                      <>
                        This application has reached a final state:{" "}
                        <span className="font-semibold text-ink-800">{application.status}</span>.
                        {canSeeSmartCard && ["A.M.C. Approved", "Payment Pending"].includes(application.status) && (
                          <div className="mt-3 space-y-2">
                            {idCardError && (
                              <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                                <FiAlertCircle className="mt-0.5 shrink-0" size={14} />
                                {idCardError}
                              </div>
                            )}
                            <Button size="sm" variant="success" onClick={handleGenerateIdCard} disabled={idCardSubmitting}>
                              {idCardSubmitting ? "Please wait..." : "Generate Smart Card"}
                            </Button>
                            <p className="text-[11px] text-ink-400">
                              Payment is not required right now — this issues the Smart Card directly.
                            </p>
                          </div>
                        )}
                        {canSeeSmartCard && application.status === "Certificate Issued" && (
                          <div className="mt-3">
                            <Link to={`/smart-card/${application.applicationNo}`}>
                              <Button size="sm">View Smart Card</Button>
                            </Link>
                          </div>
                        )}
                      </>
                    ) : !isAmc ? (
                      <>
                        Only the A.M.C. can take action on this application. Current status:{" "}
                        <span className="font-semibold text-ink-800">{application.status}</span>.
                      </>
                    ) : (
                      <>
                        This application isn't at the A.M.C. decision stage right now — current status:{" "}
                        <span className="font-semibold text-ink-800">{application.status}</span>.
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <Textarea
                      label="Remarks"
                      placeholder="Add remarks for this action..."
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />

                    {actionError && (
                      <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                        <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
                        {actionError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {ACTIONS.map((a) => (
                        <Button key={a.key} variant={a.variant} icon={a.icon} onClick={() => handleAction(a.key)} disabled={submitting}>
                          {submitting ? "Submitting..." : a.label}
                        </Button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {tab === "History" && (
              <div className="space-y-4">
                {history.length === 0 && <p className="text-sm text-ink-400">No history recorded yet.</p>}
                {[...history].reverse().map((h, i) => (
                  <div key={h._id || i} className="rounded-xl border border-ink-100 p-3.5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-ink-900">{h.status}</p>
                      {h.createdAt && (
                        <span className="text-[11px] text-ink-400">{new Date(h.createdAt).toLocaleDateString("en-IN")}</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-ink-500">
                      {h.changedByName} {h.changedByRole ? `· ${h.changedByRole}` : ""}
                    </p>
                    {h.remarks && <p className="mt-1.5 text-xs text-ink-600">{h.remarks}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxPhoto(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <FiX size={20} />
          </button>
          <img
            src={lightboxPhoto}
            alt="Survey photo"
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}