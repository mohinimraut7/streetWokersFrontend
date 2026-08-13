// import { useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// import { selectCertificateByVendorId } from "../../../features/certificates/certificatesSlice";

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// export default function QRVerification() {
//   const { id } = useParams();
//   const vendor = useSelector((s) => selectVendorById(s, id));
//   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

//   const isValid = vendor && vendor.status === "Approved" && certificate;
//   const isExpired = certificate && new Date(certificate.expiryDate) < new Date();

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {isValid && !isExpired ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}

//         {vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate && <Row label="Certificate No." value={certificate.certificateNumber} />}
//               <Row label="Business Category" value={vendor.business.businessCategory} />
//               <Row label="Ward / Zone" value={`${vendor.address.ward} / ${vendor.address.zone}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Expiry Date" value={formatDate(certificate.expiryDate)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//             </div>
//           </>
//         )}

//         {!vendor && (
//           <p className="text-center text-sm text-ink-500">No vendor found for this QR code.</p>
//         )}

//         <Link to="/vendors/list">
//           <Button variant="outline" className="mt-5 w-full">
//             Close
//           </Button>
//         </Link>
//       </Card>
//     </div>
//   );
// }

// function Row({ label, value }) {
//   return (
//     <div className="flex items-center justify-between text-xs">
//       <span className="text-ink-500">{label}</span>
//       <span className="font-semibold text-ink-900">{value}</span>
//     </div>
//   );
// }






// import { useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// import { selectCertificateByVendorId } from "../../../features/certificates/certificatesSlice";

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// export default function QRVerification() {
//   const { id } = useParams();
//   const vendor = useSelector((s) => selectVendorById(s, id));
//   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

//   const isValid = vendor && vendor.status === "Approved" && certificate;
//   const isExpired = certificate && new Date(certificate.expiryDate) < new Date();

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {isValid && !isExpired ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}

//         {vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate && <Row label="Certificate No." value={certificate.certificateNumber} />}
//               <Row label="Business Type" value={vendor.business.businessType} />
//               <Row label="Ward / Zone" value={`${vendor.address.ward} / ${vendor.address.zone}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Expiry Date" value={formatDate(certificate.expiryDate)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//             </div>
//           </>
//         )}

//         {!vendor && (
//           <p className="text-center text-sm text-ink-500">No vendor found for this QR code.</p>
//         )}

//         <Link to="/vendors/list">
//           <Button variant="outline" className="mt-5 w-full">
//             Close
//           </Button>
//         </Link>
//       </Card>
//     </div>
//   );
// }

// function Row({ label, value }) {
//   return (
//     <div className="flex items-center justify-between text-xs">
//       <span className="text-ink-500">{label}</span>
//       <span className="font-semibold text-ink-900">{value}</span>
//     </div>
//   );
// }




// import { useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// import { selectCertificateByVendorId } from "../../../features/certificates/certificatesSlice";

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// export default function QRVerification() {
//   const { id } = useParams();
//   const vendor = useSelector((s) => selectVendorById(s, id));
//   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

//   const isValid = vendor && vendor.status === "Approved" && certificate;
//   const isExpired = certificate && new Date(certificate.expiryDate) < new Date();

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {isValid && !isExpired ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}

//         {vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate && <Row label="Certificate No." value={certificate.certificateNumber} />}
//               <Row label="Business Category" value={vendor.business.businessCategory} />
//               <Row label="Ward / Zone" value={`${vendor.address.ward} / ${vendor.address.zone}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Expiry Date" value={formatDate(certificate.expiryDate)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//             </div>
//           </>
//         )}

//         {!vendor && (
//           <p className="text-center text-sm text-ink-500">No vendor found for this QR code.</p>
//         )}

//         <Link to="/vendors/list">
//           <Button variant="outline" className="mt-5 w-full">
//             Close
//           </Button>
//         </Link>
//       </Card>
//     </div>
//   );
// }

// function Row({ label, value }) {
//   return (
//     <div className="flex items-center justify-between text-xs">
//       <span className="text-ink-500">{label}</span>
//       <span className="font-semibold text-ink-900">{value}</span>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Avatar from "../../../components/ui/Avatar";
import { verifyCertificateByApplicationNo } from "../../../services/Vendorapplicationservice";

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function QRVerification() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [vendor, setVendor] = useState(null);
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    verifyCertificateByApplicationNo(id).then((result) => {
      if (cancelled) return;
      if (result.success) {
        setVendor(result.data);
        setValid(result.valid);
      } else {
        setVendor(null);
        setErrorMessage(result.message || "No vendor found for this QR code.");
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const certificate = vendor?.certificate;
  const isExpired = vendor && !valid;

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <Card className="w-full max-w-sm">
        {loading ? (
          <div className="mb-5 flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
            <FiLoader size={28} className="animate-spin" />
            <p className="mt-1.5 text-sm font-bold">Verifying...</p>
          </div>
        ) : vendor && valid ? (
          <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
            <FiCheckCircle size={28} />
            <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
          </div>
        ) : (
          <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
            <FiXCircle size={28} />
            <p className="mt-1.5 text-sm font-bold">
              {vendor && isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
            </p>
          </div>
        )}

        {!loading && vendor && (
          <>
            <div className="mb-4 flex items-center gap-3">
              <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
              <div>
                <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
                <p className="text-xs text-ink-500">{vendor.vendorId}</p>
              </div>
            </div>

            <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
              <Row label="Application No." value={vendor.applicationNo} />
              {certificate?.certificateNo && <Row label="Certificate No." value={certificate.certificateNo} />}
              <Row label="Business Type" value={vendor.business?.businessType || "-"} />
              <Row label="Ward / Zone" value={`${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`} />
              {certificate && (
                <>
                  <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
                  <Row label="Valid Till" value={formatDate(certificate.validTill)} />
                </>
              )}
              <Row label="Status" value={vendor.status} />
            </div>
          </>
        )}

        {!loading && !vendor && (
          <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
        )}

        <Link to="/vendors/list">
          <Button variant="outline" className="mt-5 w-full">
            Close
          </Button>
        </Link>
      </Card>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-ink-500">{label}</span>
      <span className="font-semibold text-ink-900">{value}</span>
    </div>
  );
}