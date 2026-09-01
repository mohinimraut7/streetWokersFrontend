// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { FiArrowLeft, FiCheckSquare } from "react-icons/fi";
// import Card from "../../components/ui/Card";
// import StatusChip from "../../components/ui/StatusChip";
// import Avatar from "../../components/ui/Avatar";
// import { IdBadge } from "../../components/ui/Avatar";
// import { useAuth } from "../auth/hooks/useAuth";
// import { selectAllApplications } from "../../features/applications/applicationsSlice";

// export default function PendingApproval() {
//   const applications = useSelector(selectAllApplications);
//   const { user } = useAuth();

//   const myQueue = useMemo(
//     () =>
//       applications.filter(
//         (a) => a.currentStage === "Counter Employee" || a.currentStage === "Approval Authority"
//       ),
//     [applications]
//   );

//   return (
//     <div className="space-y-5">
//       <Link
//         to="/applications"
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Applications
//       </Link>

//       <div>
//         <h1 className="font-display text-xl font-bold text-ink-900">Pending Approval</h1>
//         <p className="text-sm text-ink-500">
//           Applications waiting for action{user?.role ? ` at your desk (${user.role})` : ""}
//         </p>
//       </div>

//       <Card padded={false} className="overflow-hidden">
//         <div className="scrollbar-thin overflow-x-auto">
//           <table className="w-full min-w-[680px] text-left text-sm">
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
//               {myQueue.map((a) => (
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
//                       className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
//                     >
//                       <FiCheckSquare size={13} /> Review
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//               {myQueue.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="px-5 py-10 text-center text-sm text-ink-400">
//                     No applications are currently pending action.
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



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiCheckSquare, FiLoader, FiAlertCircle } from "react-icons/fi";
import Card from "../../components/ui/Card";
import StatusChip from "../../components/ui/StatusChip";
import Avatar from "../../components/ui/Avatar";
import { IdBadge } from "../../components/ui/Avatar";
import { useAuth } from "../auth/hooks/useAuth";
import { fetchVendorApplications } from "../../services/vendorApplicationService";

export default function PendingApproval() {
  const { user } = useAuth();
  const [myQueue, setMyQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   let cancelled = false;
  //   setLoading(true);
  //   setError("");
  //   // // "Forwarded to A.M.C." — the backend already filters this to the logged-in officer's ward
  //   // fetchVendorApplications({ status: "Forwarded to A.M.C.", limit: 100 }).then((result) => {
  //   //   if (cancelled) return;


  //       // "Forwarded to A.M.C." — the backend already filters this to the logged-in officer's ward
  //   fetchVendorApplications({ status: "Forwarded to A.M.C.", limit: 1 }).then((countResult) => {
  //     if (cancelled) return;
  //     if (!countResult.success) {
  //       setLoading(false);
  //       setError(countResult.message || "Could not load vendor applications.");
  //       return;
  //     }
  //     const dynamicLimit = countResult.total || 1;
  //     fetchVendorApplications({ status: "Forwarded to A.M.C.", limit: dynamicLimit }).then((result) => {
  //       if (cancelled) return;
  //     setLoading(false);
  //     if (!result.success) {
  //       setError(result.message || "Could not load your approval queue.");
  //       return;
  //     }
  //     setMyQueue(result.data || []);
  //   });
  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);




    useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    // "Forwarded to A.M.C." — the backend already filters this to the logged-in officer's ward
    fetchVendorApplications({ status: "Forwarded to A.M.C.", limit: 1 }).then((countResult) => {
      if (cancelled) return;
      if (!countResult.success) {
        setLoading(false);
        setError(countResult.message || "Could not load vendor applications.");
        return;
      }
      const dynamicLimit = countResult.total || 1;
      fetchVendorApplications({ status: "Forwarded to A.M.C.", limit: dynamicLimit }).then((result) => {
        if (cancelled) return;
        setLoading(false);
        if (!result.success) {
          setError(result.message || "Could not load your approval queue.");
          return;
        }
        setMyQueue(result.data || []);
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-5">
      <Link
        to="/applications"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
      >
        <FiArrowLeft size={14} /> Back to Applications
      </Link>

      <div>
        <h1 className="font-display text-xl font-bold text-ink-900">Pending Approval</h1>
        <p className="text-sm text-ink-500">
          Applications waiting for your decision{user?.ward ? ` — ${user.ward}` : ""}
        </p>
      </div>

      <Card padded={false} className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm text-ink-400">
            <FiLoader className="animate-spin" size={16} />
            Loading...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm font-medium text-danger-500">
            <FiAlertCircle size={16} />
            {error}
          </div>
        ) : (
          <div className="scrollbar-thin overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
                  <th className="px-5 py-3 font-semibold">Vendor</th>
                  <th className="px-5 py-3 font-semibold">Application No.</th>
                  <th className="px-5 py-3 font-semibold">Ward / Zone</th>
                  <th className="px-5 py-3 font-semibold">Stage</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {myQueue.map((a) => (
                  <tr key={a._id || a.applicationNo} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
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
                      <StatusChip status="Pending Approval" />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        to={`/applications/${a.applicationNo}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
                      >
                        <FiCheckSquare size={13} /> Review
                      </Link>
                    </td>
                  </tr>
                ))}
                {myQueue.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-ink-400">
                      No applications are currently pending your decision.
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
