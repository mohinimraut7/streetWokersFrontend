// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// // import { verifyCertificateByApplicationNo } from "../../../services/Vendorapplicationservice";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {loading ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         ) : vendor && valid ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {vendor && isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}

//         {!loading && vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate?.certificateNo && <Row label="Certificate No." value={certificate.certificateNo} />}
//               <Row label="Business Type" value={vendor.business?.businessType || "-"} />
//               <Row label="Ward / Zone" value={`${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Valid Till" value={formatDate(certificate.validTill)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//             </div>
//           </>
//         )}

//         {!loading && !vendor && (
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
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






// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// // import { verifyCertificateByApplicationNo } from "../../../services/Vendorapplicationservice";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {loading ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         ) : vendor && valid ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {vendor && isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}

//         {!loading && vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate?.certificateNo && <Row label="Certificate No." value={certificate.certificateNo} />}
//               {/* NEW — same details as printed on the ID card */}
//               <Row label="Gender" value={genderLabel(vendor.personal?.gender)} />
//               <Row label="Mobile No." value={vendor.personal?.mobile || "-"} />
//               <Row label="Date of Birth / Age" value={dobWithAge(vendor.personal?.dob)} />
//               <Row label="Business Type" value={vendor.business?.businessType || "-"} />
//               {/* NEW */}
//               <Row label="Business Place" value={vendor.business?.businessPlace || "-"} />
//               <Row label="Business Timing" value={vendor.business?.businessTiming || "-"} />
//               <Row label="Ward / Zone" value={`${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Valid Till" value={formatDate(certificate.validTill)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//               {/* NEW — addresses (long text, so shown label-above-value) */}
//               <BlockRow label="Business Address" value={vendor.address?.workingAddress} />
//               <BlockRow label="Residential Address" value={vendor.address?.permanentAddress} />
//             </div>
//           </>
//         )}

//         {!loading && !vendor && (
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
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

// // ── NEW helpers (added for the extra ID-card details) ──
// function genderLabel(g) {
//   if (!g) return "-";
//   const v = String(g).toLowerCase();
//   if (v === "male") return "Male";
//   if (v === "female") return "Female";
//   if (v === "other") return "Other";
//   return g;
// }

// function dobWithAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // return age >= 0 ? `${formatDate(dob)} / ${age} yrs` : formatDate(dob);
//     // return age >= 0 ? `${formatDate(dob)} / ${age} yrs` : formatDate(dob);
//   return age >= 0 ? `${formatDate(dob)} / ${age} वर्षे` : formatDate(dob);
// }

// // Long-text row: label on top, value below (used for addresses)
// function BlockRow({ label, value }) {
//   return (
//     <div className="text-xs">
//       <span className="text-ink-500">{label}</span>
//       <p className="mt-0.5 break-words font-semibold text-ink-900">{value || "-"}</p>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// // import { verifyCertificateByApplicationNo } from "../../../services/Vendorapplicationservice";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {loading ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         ) : vendor && valid ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {vendor && isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}

//         {!loading && vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate?.certificateNo && <Row label="Certificate No." value={certificate.certificateNo} />}
//               <Row label="Business Type" value={vendor.business?.businessType || "-"} />
//               <Row label="Ward / Zone" value={`${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Valid Till" value={formatDate(certificate.validTill)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//             </div>
//           </>
//         )}

//         {!loading && !vendor && (
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
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






// ─────────────────────────────────────────────────────────────
// PREVIOUS (plain card + Close button) version of this page — kept commented, not deleted.
// ─────────────────────────────────────────────────────────────
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// // import { verifyCertificateByApplicationNo } from "../../../services/Vendorapplicationservice";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
//
// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
//
// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);
//
//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;
//
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {loading ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         ) : vendor && valid ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {vendor && isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}
//
//         {!loading && vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>
//
//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate?.certificateNo && <Row label="Certificate No." value={certificate.certificateNo} />}
//               {/* NEW — same details as printed on the ID card */}
//               <Row label="Gender" value={genderLabel(vendor.personal?.gender)} />
//               <Row label="Mobile No." value={vendor.personal?.mobile || "-"} />
//               <Row label="Date of Birth / Age" value={dobWithAge(vendor.personal?.dob)} />
//               <Row label="Business Type" value={vendor.business?.businessType || "-"} />
//               {/* NEW */}
//               <Row label="Business Place" value={vendor.business?.businessPlace || "-"} />
//               <Row label="Business Timing" value={vendor.business?.businessTiming || "-"} />
//               <Row label="Ward / Zone" value={`${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Valid Till" value={formatDate(certificate.validTill)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//               {/* NEW — addresses (long text, so shown label-above-value) */}
//               <BlockRow label="Business Address" value={vendor.address?.workingAddress} />
//               <BlockRow label="Residential Address" value={vendor.address?.permanentAddress} />
//             </div>
//           </>
//         )}
//
//         {!loading && !vendor && (
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         )}
//
//         <Link to="/vendors/list">
//           <Button variant="outline" className="mt-5 w-full">
//             Close
//           </Button>
//         </Link>
//       </Card>
//     </div>
//   );
// }
//

// ═════════════════════════════════════════════════════════════
//  NEW — QR verification page in the ID-card design.
//  • Same two cards as the ID card (front + back, same size, same artwork,
//    same fonts / icon chips / dotted fields). Side by side on wide screens,
//    stacked in a single column on small (mobile) screens.
//  • NO QR code, NO "रस्ता विक्रेता ओळखपत्र", NO "सहाय्यक आयुक्त (प्रभाग समिती)".
//  • Every detail from the old verification page is kept.
//  • Close button removed → X icon at the top right.
// ═════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────
// PREVIOUS (two-card front/back) version — kept commented, not deleted.
// ─────────────────────────────────────────────────────────────
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FiCheckCircle,
//   FiXCircle,
//   FiLoader,
//   FiX,
//   FiUser,
//   FiFileText,
//   FiCreditCard,
//   FiCalendar,
//   FiPhone,
//   FiUsers,
//   FiClock,
//   FiBriefcase,
//   FiMapPin,
//   FiHome,
//   FiFlag,
//   FiHash,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
// import logo from "../../../assets/logovvcmc.jpg";
// import backbanner from "../../../assets/backbanner.png";
//
// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
//
// // Same card size as SmartCard.jsx (90mm x 105mm at 4.3px/mm)
// const CARD_W_PX = 90 * 4.3;
// const CARD_H_PX = 105 * 4.3;
//
// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [scale, setScale] = useState(1);
//
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);
//
//   // Same Poppins + Noto Sans Devanagari fonts the ID card uses (same element id → loaded only once)
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);
//
//   // Small screens: shrink the whole card (design unchanged) so it always fits the width
//   useEffect(() => {
//     const update = () => setScale(Math.min(1, (window.innerWidth - 32) / CARD_W_PX));
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);
//
//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;
//
//   const closeButton = (
//     <Link
//       to="/vendors/list"
//       aria-label="Close"
//       className="fixed right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-700 shadow-md ring-1 ring-black/5 transition hover:bg-ink-50"
//     >
//       <FiX size={18} />
//     </Link>
//   );
//
//   /* ---------- loading ---------- */
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//         {closeButton}
//         <Card className="w-full max-w-sm">
//           <div className="flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- not found / invalid ---------- */
//   if (!vendor) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//         {closeButton}
//         <Card className="w-full max-w-sm">
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Not a Verified Vendor</p>
//           </div>
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- every detail that was on the old verification page ---------- */
//   const frontFields = [
//     ...(certificate?.certificateNo
//       ? [{ icon: FiCreditCard, label: "Certificate No.", value: certificate.certificateNo }]
//       : []),
//     { icon: FiUser, label: "Vendor Name", value: vendor.personal?.fullName, strong: true },
//     { icon: FiHash, label: "Vendor ID", value: vendor.vendorId },
//     { icon: FiUsers, label: "Gender", value: genderLabel(vendor.personal?.gender) },
//     { icon: FiPhone, label: "Mobile No.", value: vendor.personal?.mobile || "-" },
//     {
//       icon: FiFlag,
//       label: "Ward / Zone",
//       value: `${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`,
//     },
//     ...(certificate
//       ? [
//           { icon: FiCalendar, label: "Issue Date", value: formatDate(certificate.issueDate) },
//           { icon: FiCalendar, label: "Valid Till", value: formatDate(certificate.validTill) },
//         ]
//       : []),
//   ];
//
//   const personalFields = [
//     { icon: FiClock, label: "DOB / Age", value: dobWithAge(vendor.personal?.dob) },
//     { icon: FiBriefcase, label: "Business Type", value: vendor.business?.businessType || "-" },
//     { icon: FiMapPin, label: "Business Place", value: vendor.business?.businessPlace || "-" },
//     { icon: FiClock, label: "Business Timing", value: vendor.business?.businessTiming || "-" },
//   ];
//
//   const certificateFields = [
//     { icon: FiFileText, label: "Application No.", value: vendor.applicationNo },
//     { icon: FiCheckCircle, label: "Status", value: vendor.status },
//   ];
//
//   const addressFields = [
//     { icon: FiMapPin, label: "Business Address", value: vendor.address?.workingAddress || "-", wrap: true, accent: "gold" },
//     { icon: FiHome, label: "Residential Address", value: vendor.address?.permanentAddress || "-", wrap: true },
//   ];
//
//   const cardStyle = {
//     width: `${CARD_W_PX}px`,
//     minHeight: `${CARD_H_PX}px`,
//     zoom: String(scale),
//     fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//     backgroundImage: `url(${backbanner})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//   };
//   const gridStyle = { gridTemplateColumns: "max-content max-content max-content 1fr" };
//
//   const statusText = valid ? "Vendor Verified" : isExpired ? "Certificate Expired" : "Not a Verified Vendor";
//
//   return (
//     <div className="min-h-screen bg-surface px-4 py-10">
//       {closeButton}
//
//       {/* two cards side by side on wide screens, single column on small screens */}
//       <div className="flex flex-wrap items-stretch justify-center gap-10 px-1 py-2">
//         {/* ---------- FRONT ---------- */}
//         <div
//           className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//           style={cardStyle}
//         >
//           <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-4 min-h-[96px]">
//             <div
//               className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
//               style={{ marginTop: "-18px" }}
//             >
//               <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//             </div>
//
//             <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//               <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                 वसई-विरार शहर महानगरपालिका
//               </p>
//               {/* "रस्ता विक्रेता ओळखपत्र" removed — English corporation name shown instead */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="whitespace-nowrap text-[11.5px] font-bold leading-tight tracking-tight text-[#F3D27A]">
//                   Vasai Virar City Municipal Corporation
//                 </h2>
//               </div>
//             </div>
//           </div>
//
//           <div className="relative z-10 flex flex-1 flex-col items-center gap-2 px-4 pb-3 pt-[5px]">
//             <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
//               {/* photo — same tile as the ID card */}
//               <div
//                 className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-[2px]"
//                 style={{ borderColor: "#F7E4C2" }}
//               >
//                 <div className="h-full w-full overflow-hidden rounded-[4px] bg-[#ffffff]">
//                   {vendor.documents?.photo ? (
//                     <img
//                       src={vendor.documents.photo}
//                       alt={vendor.personal?.fullName}
//                       className="block h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//
//               {/* verification status — sits where the QR code was on the ID card (QR removed) */}
//               <div
//                 className="flex h-[96px] w-[96px] shrink-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] px-1 text-center"
//                 style={{ borderColor: "#F7E4C2" }}
//               >
//                 {valid ? (
//                   <FiCheckCircle size={32} className="text-success-500" />
//                 ) : (
//                   <FiXCircle size={32} className="text-danger-500" />
//                 )}
//                 <p
//                   className={`text-[11.5px] font-bold leading-tight ${
//                     valid ? "text-success-500" : "text-danger-500"
//                   }`}
//                 >
//                   {statusText}
//                 </p>
//               </div>
//             </div>
//
//             <div
//               className="relative mt-[1px] grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
//               style={gridStyle}
//             >
//               {frontFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//               ))}
//             </div>
//             {/* signature block "सहाय्यक आयुक्त (प्रभाग समिती)" removed */}
//           </div>
//         </div>
//
//         {/* ---------- BACK ---------- */}
//         <div
//           className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//           style={cardStyle}
//         >
//           <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-4 min-h-[96px]">
//             <div
//               className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
//               style={{ marginTop: "-18px" }}
//             >
//               <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//             </div>
//
//             <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//               <p className="whitespace-nowrap pb-3 text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                 वसई-विरार शहर महानगरपालिका
//               </p>
//             </div>
//           </div>
//
//           <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 px-4 pb-3 pt-6">
//             <div className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5" style={gridStyle}>
//               <VerifyHeading>Personal Information</VerifyHeading>
//               {personalFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//               ))}
//
//               <VerifyHeading>Certificate Information</VerifyHeading>
//               {certificateFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//               ))}
//
//               <VerifyHeading>Address Information</VerifyHeading>
//               {addressFields.map((f) => (
//                 <VerifyField
//                   key={f.label}
//                   icon={f.icon}
//                   label={f.label}
//                   value={f.value}
//                   wrap={f.wrap}
//                   accent={f.accent}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// // Same look as IconCardField / SectionHeading in SmartCard.jsx
// function VerifyField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";
//
//   return (
//     <>
//       <span className={`mt-[2px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} strokeWidth={2} />
//       </span>
//       <span
//         className={`min-w-0 whitespace-nowrap text-[12.8px] leading-[16.5px] tracking-[0.005em] text-[#334155] ${
//           strong ? "font-bold text-[#0f172a]" : "font-semibold"
//         }`}
//       >
//         {label}
//       </span>
//       <span className={`text-[12.8px] leading-[16.5px] text-[#94a3b8] ${strong ? "font-bold" : "font-medium"}`}>:</span>
//
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[13.8px] leading-[16.5px] tabular-nums text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227]/60 underline-offset-[5px] leading-[21px]"
//             : "border-b border-dotted border-[#C9A227]/55 pb-[1.5px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }
//
// function VerifyHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[3px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.4px] font-bold uppercase tracking-[0.16em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/70 via-[#D9BE68]/50 to-transparent" />
//     </div>
//   );
// }
//
//

// ═════════════════════════════════════════════════════════════
//  NEW — QR verification page: single ID-card style card
//  (green header + logo + names + X, "Vendor Verified" panel,
//   photo + name, then all details with Marathi / English labels).
//  No QR code. No Close button (X icon at the top right instead).
// ═════════════════════════════════════════════════════════════
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FiCheck,
//   FiCheckCircle,
//   FiXCircle,
//   FiLoader,
//   FiX,
//   FiUser,
//   FiFileText,
//   FiAward,
//   FiPhone,
//   FiCalendar,
//   FiShoppingBag,
//   FiMapPin,
//   FiClock,
//   FiMap,
//   FiBriefcase,
//   FiHome,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
// import logo from "../../../assets/logovvcmc.jpg";
// import banner from "../../../assets/banner1.png";

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// // design width of the card; on smaller screens the whole card is scaled down to fit
// const CARD_W_PX = 400;

// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [scale, setScale] = useState(1);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   // Same Poppins + Noto Sans Devanagari fonts the ID card uses (same element id → loaded only once)
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // Small screens: shrink the whole card (design unchanged) so it always fits the width
//   useEffect(() => {
//     const update = () => setScale(Math.min(1, (window.innerWidth - 24) / CARD_W_PX));
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;

//   const pageStyle = { background: "linear-gradient(135deg, #F7FBEF 0%, #E9F8F2 55%, #E4F2FB 100%)" };

//   /* ---------- loading ---------- */
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
//         <Card className="w-full max-w-sm">
//           <div className="flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   /* ---------- not found / invalid ---------- */
//   if (!vendor) {
//     return (
//       <div className="relative flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
//         <Link
//           to="/vendors/list"
//           aria-label="Close"
//           className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-md"
//         >
//           <FiX size={18} />
//         </Link>
//         <Card className="w-full max-w-sm">
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Not a Verified Vendor</p>
//           </div>
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         </Card>
//       </div>
//     );
//   }

//   /* ---------- every detail that was on the old verification page ---------- */
//   const rows = [
//     { icon: FiFileText, mr: "अर्ज क्रमांक", en: "Application No.", value: vendor.applicationNo },
//     ...(certificate?.certificateNo
//       ? [{ icon: FiAward, mr: "ओळखपत्र क्रमांक", en: "Certificate No.", value: certificate.certificateNo }]
//       : []),
//     { icon: FiUser, mr: "लिंग", en: "Gender", value: genderLabel(vendor.personal?.gender) },
//     { icon: FiPhone, mr: "मोबाईल क्रमांक", en: "Mobile No.", value: vendor.personal?.mobile || "-" },
//     { icon: FiCalendar, mr: "जन्मतारीख / वय", en: "Date of Birth / Age", value: dobWithAge(vendor.personal?.dob) },
//     { icon: FiShoppingBag, mr: "व्यवसायाचा प्रकार", en: "Business Type", value: vendor.business?.businessType || "-" },
//     { icon: FiMapPin, mr: "व्यवसायाचे ठिकाण", en: "Business Place", value: vendor.business?.businessPlace || "-" },
//     { icon: FiClock, mr: "व्यवसायाची वेळ", en: "Business Timing", value: vendor.business?.businessTiming || "-" },
//     {
//       icon: FiMap,
//       mr: "प्रभाग / ward",
//       en: "Ward / Zone",
//       value: `${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`,
//     },
//     ...(certificate
//       ? [
//           { icon: FiCalendar, mr: "जारी दिनांक", en: "Issue Date", value: formatDate(certificate.issueDate) },
//           { icon: FiCalendar, mr: "वैधता", en: "Valid Till", value: formatDate(certificate.validTill) },
//         ]
//       : []),
//     { icon: FiCheckCircle, mr: "स्थिती", en: "Status", value: vendor.status },
//     { icon: FiBriefcase, mr: "व्यवसायाचा पत्ता", en: "Business Address", value: vendor.address?.workingAddress || "-" },
//     { icon: FiHome, mr: "निवासी पत्ता", en: "Residential Address", value: vendor.address?.permanentAddress || "-" },
//   ];

//   const statusTitle = valid ? "Vendor Verified" : isExpired ? "Certificate Expired" : "Not a Verified Vendor";
//   const statusSub = valid
//     ? "Vendor details have been verified successfully."
//     : "This certificate is not valid.";

//   return (
//     <div className="flex min-h-screen items-start justify-center px-3 py-8" style={pageStyle}>
//       <div
//         className="relative overflow-hidden rounded-[20px] border-[3px] border-[#E3B448] bg-[#FFFEFA] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"
//         style={{
//           width: `${CARD_W_PX}px`,
//           zoom: String(scale),
//           fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//         }}
//       >
//         {/* ───────── HEADER ───────── */}
//         <div
//           className="relative flex items-center gap-3 pl-4 pr-14"
//           style={{
//             aspectRatio: "3.3 / 1",
//             paddingBottom: "9%",
//             backgroundColor: "#0A7A44",
//             backgroundImage: `url(${banner})`,
//             backgroundSize: "100% 100%",
//             backgroundRepeat: "no-repeat",
//           }}
//         >
//           <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-white p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
//             <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//           </div>

//           <div className="flex min-w-0 flex-col justify-center gap-[3px] leading-tight">
//             <p className="whitespace-nowrap text-[15.5px] font-semibold leading-[20px] text-white">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//             <p className="whitespace-nowrap text-[11.5px] font-semibold leading-tight text-white/95">
//               Vasai Virar City Municipal Corporation
//             </p>
//           </div>

//           {/* X (close) — top right */}
//           <Link
//             to="/vendors/list"
//             aria-label="Close"
//             className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-sm transition hover:bg-[#FFF8E6]"
//           >
//             <FiX size={18} strokeWidth={2.5} />
//           </Link>
//         </div>

//         {/* ───────── BODY ───────── */}
//         <div className="relative px-4 pb-5 pt-3">
//           {/* faint emblem watermark */}
//           <img
//             src={logo}
//             alt=""
//             aria-hidden="true"
//             className="pointer-events-none absolute left-1/2 top-[60%] w-[64%] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.07] mix-blend-multiply"
//           />

//           <div className="relative z-10">
//             {/* Vendor Verified panel */}
//             <div
//               className={`mb-3.5 flex flex-col items-center rounded-2xl px-3 py-3.5 text-center ${
//                 valid ? "bg-[#E3F6EC] text-[#14803F]" : "bg-[#FDECEC] text-[#C0392B]"
//               }`}
//             >
//               <span
//                 className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-white ${
//                   valid ? "bg-[#1AA35B]" : "bg-[#D64545]"
//                 }`}
//               >
//                 {valid ? <FiCheck size={24} strokeWidth={3} /> : <FiX size={24} strokeWidth={3} />}
//               </span>
//               <p className="mt-1.5 text-[20px] font-bold leading-tight">{statusTitle}</p>
//               <p className="mt-0.5 text-[11.5px] font-medium opacity-90">{statusSub}</p>
//             </div>

//             {/* photo + name */}
//             <div className="flex items-center gap-3.5 pb-3">
//               <div className="h-[96px] w-[80px] shrink-0 overflow-hidden rounded-[8px] border-2 border-[#F0D48A] bg-white p-[2px]">
//                 <div className="h-full w-full overflow-hidden rounded-[6px] bg-white">
//                   {vendor.documents?.photo ? (
//                     <img
//                       src={vendor.documents.photo}
//                       alt={vendor.personal?.fullName}
//                       className="block h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="min-w-0">
//                 <p className="break-words text-[20px] font-bold leading-tight text-[#0f172a]">
//                   {vendor.personal?.fullName}
//                 </p>
//                 <p className="mt-0.5 break-all text-[12.5px] font-medium text-[#6B7A99]">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="h-px w-full bg-gradient-to-r from-[#C9A227]/60 via-[#D9BE68]/40 to-transparent" />

//             {/* details */}
//             <div>
//               {rows.map((r) => (
//                 <DetailRow key={r.en} icon={r.icon} mr={r.mr} en={r.en} value={r.value} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // One detail row: round icon chip | Marathi + English label | : | value (dotted gold underline)
// function DetailRow({ icon: Icon, mr, en, value }) {
//   return (
//     <div className="flex items-center gap-2.5 border-b border-dotted border-[#C9A227]/50 py-[9px]">
//       <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#E5F0E9] text-[#0B6B3A]">
//         <Icon size={15} strokeWidth={2} />
//       </span>
//       <div className="w-[104px] shrink-0 leading-tight">
//         <p className="text-[12.5px] font-semibold leading-[16px] text-[#1e293b]">{mr}</p>
//         <p className="text-[10.5px] font-medium leading-[14px] text-[#64748b]">{en}</p>
//       </div>
//       <span className="text-[13px] font-medium text-[#94a3b8]">:</span>
//       <span className="min-w-0 flex-1 whitespace-normal break-words text-[13.5px] font-semibold leading-[18px] tabular-nums text-[#0f172a]">
//         {value || "-"}
//       </span>
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

// // ── NEW helpers (added for the extra ID-card details) ──
// function genderLabel(g) {
//   if (!g) return "-";
//   const v = String(g).toLowerCase();
//   if (v === "male") return "Male";
//   if (v === "female") return "Female";
//   if (v === "other") return "Other";
//   return g;
// }

// function dobWithAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // return age >= 0 ? `${formatDate(dob)} / ${age} yrs` : formatDate(dob);
//     // return age >= 0 ? `${formatDate(dob)} / ${age} yrs` : formatDate(dob);
//   return age >= 0 ? `${formatDate(dob)} / ${age} वर्षे` : formatDate(dob);
// }

// // Long-text row: label on top, value below (used for addresses)
// function BlockRow({ label, value }) {
//   return (
//     <div className="text-xs">
//       <span className="text-ink-500">{label}</span>
//       <p className="mt-0.5 break-words font-semibold text-ink-900">{value || "-"}</p>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// // import { verifyCertificateByApplicationNo } from "../../../services/Vendorapplicationservice";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {loading ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         ) : vendor && valid ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {vendor && isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}

//         {!loading && vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate?.certificateNo && <Row label="Certificate No." value={certificate.certificateNo} />}
//               <Row label="Business Type" value={vendor.business?.businessType || "-"} />
//               <Row label="Ward / Zone" value={`${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Valid Till" value={formatDate(certificate.validTill)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//             </div>
//           </>
//         )}

//         {!loading && !vendor && (
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
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






// ─────────────────────────────────────────────────────────────
// PREVIOUS (plain card + Close button) version of this page — kept commented, not deleted.
// ─────────────────────────────────────────────────────────────
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// // import { verifyCertificateByApplicationNo } from "../../../services/Vendorapplicationservice";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
//
// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
//
// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);
//
//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;
//
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {loading ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         ) : vendor && valid ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {vendor && isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}
//
//         {!loading && vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>
//
//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate?.certificateNo && <Row label="Certificate No." value={certificate.certificateNo} />}
//               {/* NEW — same details as printed on the ID card */}
//               <Row label="Gender" value={genderLabel(vendor.personal?.gender)} />
//               <Row label="Mobile No." value={vendor.personal?.mobile || "-"} />
//               <Row label="Date of Birth / Age" value={dobWithAge(vendor.personal?.dob)} />
//               <Row label="Business Type" value={vendor.business?.businessType || "-"} />
//               {/* NEW */}
//               <Row label="Business Place" value={vendor.business?.businessPlace || "-"} />
//               <Row label="Business Timing" value={vendor.business?.businessTiming || "-"} />
//               <Row label="Ward / Zone" value={`${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Valid Till" value={formatDate(certificate.validTill)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//               {/* NEW — addresses (long text, so shown label-above-value) */}
//               <BlockRow label="Business Address" value={vendor.address?.workingAddress} />
//               <BlockRow label="Residential Address" value={vendor.address?.permanentAddress} />
//             </div>
//           </>
//         )}
//
//         {!loading && !vendor && (
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         )}
//
//         <Link to="/vendors/list">
//           <Button variant="outline" className="mt-5 w-full">
//             Close
//           </Button>
//         </Link>
//       </Card>
//     </div>
//   );
// }
//

// ═════════════════════════════════════════════════════════════
//  NEW — QR verification page in the ID-card design.
//  • Same two cards as the ID card (front + back, same size, same artwork,
//    same fonts / icon chips / dotted fields). Side by side on wide screens,
//    stacked in a single column on small (mobile) screens.
//  • NO QR code, NO "रस्ता विक्रेता ओळखपत्र", NO "सहाय्यक आयुक्त (प्रभाग समिती)".
//  • Every detail from the old verification page is kept.
//  • Close button removed → X icon at the top right.
// ═════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────
// PREVIOUS (two-card front/back) version — kept commented, not deleted.
// ─────────────────────────────────────────────────────────────
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FiCheckCircle,
//   FiXCircle,
//   FiLoader,
//   FiX,
//   FiUser,
//   FiFileText,
//   FiCreditCard,
//   FiCalendar,
//   FiPhone,
//   FiUsers,
//   FiClock,
//   FiBriefcase,
//   FiMapPin,
//   FiHome,
//   FiFlag,
//   FiHash,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
// import logo from "../../../assets/logovvcmc.jpg";
// import backbanner from "../../../assets/backbanner.png";
//
// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
//
// // Same card size as SmartCard.jsx (90mm x 105mm at 4.3px/mm)
// const CARD_W_PX = 90 * 4.3;
// const CARD_H_PX = 105 * 4.3;
//
// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [scale, setScale] = useState(1);
//
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);
//
//   // Same Poppins + Noto Sans Devanagari fonts the ID card uses (same element id → loaded only once)
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);
//
//   // Small screens: shrink the whole card (design unchanged) so it always fits the width
//   useEffect(() => {
//     const update = () => setScale(Math.min(1, (window.innerWidth - 32) / CARD_W_PX));
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);
//
//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;
//
//   const closeButton = (
//     <Link
//       to="/vendors/list"
//       aria-label="Close"
//       className="fixed right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-700 shadow-md ring-1 ring-black/5 transition hover:bg-ink-50"
//     >
//       <FiX size={18} />
//     </Link>
//   );
//
//   /* ---------- loading ---------- */
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//         {closeButton}
//         <Card className="w-full max-w-sm">
//           <div className="flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- not found / invalid ---------- */
//   if (!vendor) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//         {closeButton}
//         <Card className="w-full max-w-sm">
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Not a Verified Vendor</p>
//           </div>
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- every detail that was on the old verification page ---------- */
//   const frontFields = [
//     ...(certificate?.certificateNo
//       ? [{ icon: FiCreditCard, label: "Certificate No.", value: certificate.certificateNo }]
//       : []),
//     { icon: FiUser, label: "Vendor Name", value: vendor.personal?.fullName, strong: true },
//     { icon: FiHash, label: "Vendor ID", value: vendor.vendorId },
//     { icon: FiUsers, label: "Gender", value: genderLabel(vendor.personal?.gender) },
//     { icon: FiPhone, label: "Mobile No.", value: vendor.personal?.mobile || "-" },
//     {
//       icon: FiFlag,
//       label: "Ward / Zone",
//       value: `${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`,
//     },
//     ...(certificate
//       ? [
//           { icon: FiCalendar, label: "Issue Date", value: formatDate(certificate.issueDate) },
//           { icon: FiCalendar, label: "Valid Till", value: formatDate(certificate.validTill) },
//         ]
//       : []),
//   ];
//
//   const personalFields = [
//     { icon: FiClock, label: "DOB / Age", value: dobWithAge(vendor.personal?.dob) },
//     { icon: FiBriefcase, label: "Business Type", value: vendor.business?.businessType || "-" },
//     { icon: FiMapPin, label: "Business Place", value: vendor.business?.businessPlace || "-" },
//     { icon: FiClock, label: "Business Timing", value: vendor.business?.businessTiming || "-" },
//   ];
//
//   const certificateFields = [
//     { icon: FiFileText, label: "Application No.", value: vendor.applicationNo },
//     { icon: FiCheckCircle, label: "Status", value: vendor.status },
//   ];
//
//   const addressFields = [
//     { icon: FiMapPin, label: "Business Address", value: vendor.address?.workingAddress || "-", wrap: true, accent: "gold" },
//     { icon: FiHome, label: "Residential Address", value: vendor.address?.permanentAddress || "-", wrap: true },
//   ];
//
//   const cardStyle = {
//     width: `${CARD_W_PX}px`,
//     minHeight: `${CARD_H_PX}px`,
//     zoom: String(scale),
//     fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//     backgroundImage: `url(${backbanner})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//   };
//   const gridStyle = { gridTemplateColumns: "max-content max-content max-content 1fr" };
//
//   const statusText = valid ? "Vendor Verified" : isExpired ? "Certificate Expired" : "Not a Verified Vendor";
//
//   return (
//     <div className="min-h-screen bg-surface px-4 py-10">
//       {closeButton}
//
//       {/* two cards side by side on wide screens, single column on small screens */}
//       <div className="flex flex-wrap items-stretch justify-center gap-10 px-1 py-2">
//         {/* ---------- FRONT ---------- */}
//         <div
//           className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//           style={cardStyle}
//         >
//           <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-4 min-h-[96px]">
//             <div
//               className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
//               style={{ marginTop: "-18px" }}
//             >
//               <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//             </div>
//
//             <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//               <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                 वसई-विरार शहर महानगरपालिका
//               </p>
//               {/* "रस्ता विक्रेता ओळखपत्र" removed — English corporation name shown instead */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="whitespace-nowrap text-[11.5px] font-bold leading-tight tracking-tight text-[#F3D27A]">
//                   Vasai Virar City Municipal Corporation
//                 </h2>
//               </div>
//             </div>
//           </div>
//
//           <div className="relative z-10 flex flex-1 flex-col items-center gap-2 px-4 pb-3 pt-[5px]">
//             <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
//               {/* photo — same tile as the ID card */}
//               <div
//                 className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-[2px]"
//                 style={{ borderColor: "#F7E4C2" }}
//               >
//                 <div className="h-full w-full overflow-hidden rounded-[4px] bg-[#ffffff]">
//                   {vendor.documents?.photo ? (
//                     <img
//                       src={vendor.documents.photo}
//                       alt={vendor.personal?.fullName}
//                       className="block h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//
//               {/* verification status — sits where the QR code was on the ID card (QR removed) */}
//               <div
//                 className="flex h-[96px] w-[96px] shrink-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] px-1 text-center"
//                 style={{ borderColor: "#F7E4C2" }}
//               >
//                 {valid ? (
//                   <FiCheckCircle size={32} className="text-success-500" />
//                 ) : (
//                   <FiXCircle size={32} className="text-danger-500" />
//                 )}
//                 <p
//                   className={`text-[11.5px] font-bold leading-tight ${
//                     valid ? "text-success-500" : "text-danger-500"
//                   }`}
//                 >
//                   {statusText}
//                 </p>
//               </div>
//             </div>
//
//             <div
//               className="relative mt-[1px] grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
//               style={gridStyle}
//             >
//               {frontFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//               ))}
//             </div>
//             {/* signature block "सहाय्यक आयुक्त (प्रभाग समिती)" removed */}
//           </div>
//         </div>
//
//         {/* ---------- BACK ---------- */}
//         <div
//           className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//           style={cardStyle}
//         >
//           <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-4 min-h-[96px]">
//             <div
//               className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
//               style={{ marginTop: "-18px" }}
//             >
//               <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//             </div>
//
//             <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//               <p className="whitespace-nowrap pb-3 text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                 वसई-विरार शहर महानगरपालिका
//               </p>
//             </div>
//           </div>
//
//           <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 px-4 pb-3 pt-6">
//             <div className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5" style={gridStyle}>
//               <VerifyHeading>Personal Information</VerifyHeading>
//               {personalFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//               ))}
//
//               <VerifyHeading>Certificate Information</VerifyHeading>
//               {certificateFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//               ))}
//
//               <VerifyHeading>Address Information</VerifyHeading>
//               {addressFields.map((f) => (
//                 <VerifyField
//                   key={f.label}
//                   icon={f.icon}
//                   label={f.label}
//                   value={f.value}
//                   wrap={f.wrap}
//                   accent={f.accent}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// // Same look as IconCardField / SectionHeading in SmartCard.jsx
// function VerifyField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";
//
//   return (
//     <>
//       <span className={`mt-[2px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} strokeWidth={2} />
//       </span>
//       <span
//         className={`min-w-0 whitespace-nowrap text-[12.8px] leading-[16.5px] tracking-[0.005em] text-[#334155] ${
//           strong ? "font-bold text-[#0f172a]" : "font-semibold"
//         }`}
//       >
//         {label}
//       </span>
//       <span className={`text-[12.8px] leading-[16.5px] text-[#94a3b8] ${strong ? "font-bold" : "font-medium"}`}>:</span>
//
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[13.8px] leading-[16.5px] tabular-nums text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227]/60 underline-offset-[5px] leading-[21px]"
//             : "border-b border-dotted border-[#C9A227]/55 pb-[1.5px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }
//
// function VerifyHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[3px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.4px] font-bold uppercase tracking-[0.16em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/70 via-[#D9BE68]/50 to-transparent" />
//     </div>
//   );
// }
//
//

// ═════════════════════════════════════════════════════════════
//  NEW — QR verification page: single ID-card style card
//  (green header + logo + names + X, "Vendor Verified" panel,
//   photo + name, then all details with Marathi / English labels).
//  No QR code. No Close button (X icon at the top right instead).
// ═════════════════════════════════════════════════════════════
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FiCheck,
//   FiCheckCircle,
//   FiXCircle,
//   FiLoader,
//   FiX,
//   FiUser,
//   FiFileText,
//   FiAward,
//   FiPhone,
//   FiCalendar,
//   FiShoppingBag,
//   FiMapPin,
//   FiClock,
//   FiMap,
//   FiBriefcase,
//   FiHome,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
// import logo from "../../../assets/logovvcmc.jpg";
// // import banner from "../../../assets/banner1.png"; // old header banner (kept, not used now)
// import backbanner from "../../../assets/backbanner.png"; // same artwork as the ID card

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// // design width of the card; on smaller screens the whole card is scaled down to fit
// const CARD_W_PX = 400;

// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [scale, setScale] = useState(1);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   // Same Poppins + Noto Sans Devanagari fonts the ID card uses (same element id → loaded only once)
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // Small screens: shrink the whole card (design unchanged) so it always fits the width
//   useEffect(() => {
//     const update = () => setScale(Math.min(1, (window.innerWidth - 24) / CARD_W_PX));
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;

//   const pageStyle = { background: "linear-gradient(135deg, #F7FBEF 0%, #E9F8F2 55%, #E4F2FB 100%)" };

//   /* ---------- loading ---------- */
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
//         <Card className="w-full max-w-sm">
//           <div className="flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   /* ---------- not found / invalid ---------- */
//   if (!vendor) {
//     return (
//       <div className="relative flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
//         <Link
//           to="/vendors/list"
//           aria-label="Close"
//           className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-md"
//         >
//           <FiX size={18} />
//         </Link>
//         <Card className="w-full max-w-sm">
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Not a Verified Vendor</p>
//           </div>
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         </Card>
//       </div>
//     );
//   }

//   /* ---------- every detail that was on the old verification page ---------- */
//   const rows = [
//     { icon: FiFileText, mr: "अर्ज क्रमांक", en: "Application No.", value: vendor.applicationNo },
//     ...(certificate?.certificateNo
//       ? [{ icon: FiAward, mr: "ओळखपत्र क्रमांक", en: "Certificate No.", value: certificate.certificateNo }]
//       : []),
//     { icon: FiUser, mr: "लिंग", en: "Gender", value: genderLabel(vendor.personal?.gender) },
//     { icon: FiPhone, mr: "मोबाईल क्रमांक", en: "Mobile No.", value: vendor.personal?.mobile || "-" },
//     { icon: FiCalendar, mr: "जन्मतारीख / वय", en: "Date of Birth / Age", value: dobWithAge(vendor.personal?.dob) },
//     { icon: FiShoppingBag, mr: "व्यवसायाचा प्रकार", en: "Business Type", value: vendor.business?.businessType || "-" },
//     { icon: FiMapPin, mr: "व्यवसायाचे ठिकाण", en: "Business Place", value: vendor.business?.businessPlace || "-" },
//     { icon: FiClock, mr: "व्यवसायाची वेळ", en: "Business Timing", value: vendor.business?.businessTiming || "-" },
//     {
//       icon: FiMap,
//       mr: "प्रभाग / ward",
//       en: "Ward / Zone",
//       value: `${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`,
//     },
//     ...(certificate
//       ? [
//           { icon: FiCalendar, mr: "जारी दिनांक", en: "Issue Date", value: formatDate(certificate.issueDate) },
//           { icon: FiCalendar, mr: "वैधता", en: "Valid Till", value: formatDate(certificate.validTill) },
//         ]
//       : []),
//     { icon: FiCheckCircle, mr: "स्थिती", en: "Status", value: vendor.status },
//     { icon: FiBriefcase, mr: "व्यवसायाचा पत्ता", en: "Business Address", value: vendor.address?.workingAddress || "-" },
//     { icon: FiHome, mr: "निवासी पत्ता", en: "Residential Address", value: vendor.address?.permanentAddress || "-" },
//   ];

//   const statusTitle = valid ? "Vendor Verified" : isExpired ? "Certificate Expired" : "Not a Verified Vendor";
//   const statusSub = valid
//     ? "Vendor details have been verified successfully."
//     : "This certificate is not valid.";

//   return (
//     <div className="flex min-h-screen items-start justify-center px-3 py-8" style={pageStyle}>
//       <div
//         className="relative overflow-hidden rounded-[20px] border-[3px] border-[#E3B448] bg-[#FFFEFA] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"
//         style={{
//           width: `${CARD_W_PX}px`,
//           zoom: String(scale),
//           fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//         }}
//       >
//         {/* ───────── HEADER ───────── */}
//         <div
//           className="relative flex items-center gap-3 pl-4 pr-14"
//           // style={{
//           //   aspectRatio: "3.3 / 1",
//           //   paddingBottom: "9%",
//           //   backgroundColor: "#0A7A44",
//           //   backgroundImage: `url(${banner})`,
//           //   backgroundSize: "100% 100%",
//           //   backgroundRepeat: "no-repeat",
//           // }}
//           // NEW: same green wave header artwork as the ID card (backbanner.png), top part only.
//           // Slightly zoomed + shifted so the artwork's own gold frame is cropped out
//           // (the card already has its own gold border).
//           style={{
//             height: "106px",
//             paddingBottom: "24px",
//             backgroundColor: "#0A7A44",
//             backgroundImage: `url(${backbanner})`,
//             backgroundSize: "418px auto",
//             backgroundPosition: "-12px -11px",
//             backgroundRepeat: "no-repeat",
//           }}
//         >
//           <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-white p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
//             <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//           </div>

//           <div className="flex min-w-0 flex-col justify-center gap-[3px] leading-tight">
//             <p className="whitespace-nowrap text-[15.5px] font-semibold leading-[20px] text-white">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//             <p className="whitespace-nowrap text-[11.5px] font-semibold leading-tight text-white/95">
//               Vasai Virar City Municipal Corporation
//             </p>
//           </div>

//           {/* X (close) — top right */}
//           <Link
//             to="/vendors/list"
//             aria-label="Close"
//             className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-sm transition hover:bg-[#FFF8E6]"
//           >
//             <FiX size={18} strokeWidth={2.5} />
//           </Link>
//         </div>

//         {/* ───────── BODY ───────── */}
//         <div className="relative px-4 pb-5 pt-3">
//           {/* faint emblem watermark */}
//           <img
//             src={logo}
//             alt=""
//             aria-hidden="true"
//             className="pointer-events-none absolute left-1/2 top-[60%] w-[64%] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.07] mix-blend-multiply"
//           />

//           <div className="relative z-10">
//             {/* Vendor Verified panel */}
//             <div
//               className={`mb-3.5 flex flex-col items-center rounded-2xl px-3 py-3.5 text-center ${
//                 valid ? "bg-[#E3F6EC] text-[#14803F]" : "bg-[#FDECEC] text-[#C0392B]"
//               }`}
//             >
//               <span
//                 className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-white ${
//                   valid ? "bg-[#1AA35B]" : "bg-[#D64545]"
//                 }`}
//               >
//                 {valid ? <FiCheck size={24} strokeWidth={3} /> : <FiX size={24} strokeWidth={3} />}
//               </span>
//               <p className="mt-1.5 text-[20px] font-bold leading-tight">{statusTitle}</p>
//               <p className="mt-0.5 text-[11.5px] font-medium opacity-90">{statusSub}</p>
//             </div>

//             {/* photo + name */}
//             <div className="flex items-center gap-3.5 pb-3">
//               <div className="h-[96px] w-[80px] shrink-0 overflow-hidden rounded-[8px] border-2 border-[#F0D48A] bg-white p-[2px]">
//                 <div className="h-full w-full overflow-hidden rounded-[6px] bg-white">
//                   {vendor.documents?.photo ? (
//                     <img
//                       src={vendor.documents.photo}
//                       alt={vendor.personal?.fullName}
//                       className="block h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="min-w-0">
//                 <p className="break-words text-[20px] font-bold leading-tight text-[#0f172a]">
//                   {vendor.personal?.fullName}
//                 </p>
//                 <p className="mt-0.5 break-all text-[12.5px] font-medium text-[#6B7A99]">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="h-px w-full bg-gradient-to-r from-[#C9A227]/60 via-[#D9BE68]/40 to-transparent" />

//             {/* details */}
//             <div>
//               {rows.map((r) => (
//                 <DetailRow key={r.en} icon={r.icon} mr={r.mr} en={r.en} value={r.value} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // One detail row: round icon chip | Marathi + English label | : | value (dotted gold underline)
// function DetailRow({ icon: Icon, mr, en, value }) {
//   return (
//     <div className="flex items-center gap-2.5 border-b border-dotted border-[#C9A227]/50 py-[9px]">
//       <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#E5F0E9] text-[#0B6B3A]">
//         <Icon size={15} strokeWidth={2} />
//       </span>
//       <div className="w-[104px] shrink-0 leading-tight">
//         <p className="text-[12.5px] font-semibold leading-[16px] text-[#1e293b]">{mr}</p>
//         <p className="text-[10.5px] font-medium leading-[14px] text-[#64748b]">{en}</p>
//       </div>
//       <span className="text-[13px] font-medium text-[#94a3b8]">:</span>
//       <span className="min-w-0 flex-1 whitespace-normal break-words text-[13.5px] font-semibold leading-[18px] tabular-nums text-[#0f172a]">
//         {value || "-"}
//       </span>
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

// // ── NEW helpers (added for the extra ID-card details) ──
// function genderLabel(g) {
//   if (!g) return "-";
//   const v = String(g).toLowerCase();
//   if (v === "male") return "Male";
//   if (v === "female") return "Female";
//   if (v === "other") return "Other";
//   return g;
// }

// function dobWithAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // return age >= 0 ? `${formatDate(dob)} / ${age} yrs` : formatDate(dob);
//     // return age >= 0 ? `${formatDate(dob)} / ${age} yrs` : formatDate(dob);
//   return age >= 0 ? `${formatDate(dob)} / ${age} वर्षे` : formatDate(dob);
// }

// // Long-text row: label on top, value below (used for addresses)
// function BlockRow({ label, value }) {
//   return (
//     <div className="text-xs">
//       <span className="text-ink-500">{label}</span>
//       <p className="mt-0.5 break-words font-semibold text-ink-900">{value || "-"}</p>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// // import { verifyCertificateByApplicationNo } from "../../../services/Vendorapplicationservice";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {loading ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         ) : vendor && valid ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {vendor && isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}

//         {!loading && vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate?.certificateNo && <Row label="Certificate No." value={certificate.certificateNo} />}
//               <Row label="Business Type" value={vendor.business?.businessType || "-"} />
//               <Row label="Ward / Zone" value={`${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Valid Till" value={formatDate(certificate.validTill)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//             </div>
//           </>
//         )}

//         {!loading && !vendor && (
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
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






// ─────────────────────────────────────────────────────────────
// PREVIOUS (plain card + Close button) version of this page — kept commented, not deleted.
// ─────────────────────────────────────────────────────────────
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// // import { verifyCertificateByApplicationNo } from "../../../services/Vendorapplicationservice";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
//
// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
//
// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);
//
//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;
//
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {loading ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         ) : vendor && valid ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {vendor && isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}
//
//         {!loading && vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>
//
//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate?.certificateNo && <Row label="Certificate No." value={certificate.certificateNo} />}
//               {/* NEW — same details as printed on the ID card */}
//               <Row label="Gender" value={genderLabel(vendor.personal?.gender)} />
//               <Row label="Mobile No." value={vendor.personal?.mobile || "-"} />
//               <Row label="Date of Birth / Age" value={dobWithAge(vendor.personal?.dob)} />
//               <Row label="Business Type" value={vendor.business?.businessType || "-"} />
//               {/* NEW */}
//               <Row label="Business Place" value={vendor.business?.businessPlace || "-"} />
//               <Row label="Business Timing" value={vendor.business?.businessTiming || "-"} />
//               <Row label="Ward / Zone" value={`${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Valid Till" value={formatDate(certificate.validTill)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//               {/* NEW — addresses (long text, so shown label-above-value) */}
//               <BlockRow label="Business Address" value={vendor.address?.workingAddress} />
//               <BlockRow label="Residential Address" value={vendor.address?.permanentAddress} />
//             </div>
//           </>
//         )}
//
//         {!loading && !vendor && (
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         )}
//
//         <Link to="/vendors/list">
//           <Button variant="outline" className="mt-5 w-full">
//             Close
//           </Button>
//         </Link>
//       </Card>
//     </div>
//   );
// }
//

// ═════════════════════════════════════════════════════════════
//  NEW — QR verification page in the ID-card design.
//  • Same two cards as the ID card (front + back, same size, same artwork,
//    same fonts / icon chips / dotted fields). Side by side on wide screens,
//    stacked in a single column on small (mobile) screens.
//  • NO QR code, NO "रस्ता विक्रेता ओळखपत्र", NO "सहाय्यक आयुक्त (प्रभाग समिती)".
//  • Every detail from the old verification page is kept.
//  • Close button removed → X icon at the top right.
// ═════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────
// PREVIOUS (two-card front/back) version — kept commented, not deleted.
// ─────────────────────────────────────────────────────────────
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FiCheckCircle,
//   FiXCircle,
//   FiLoader,
//   FiX,
//   FiUser,
//   FiFileText,
//   FiCreditCard,
//   FiCalendar,
//   FiPhone,
//   FiUsers,
//   FiClock,
//   FiBriefcase,
//   FiMapPin,
//   FiHome,
//   FiFlag,
//   FiHash,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
// import logo from "../../../assets/logovvcmc.jpg";
// import backbanner from "../../../assets/backbanner.png";
//
// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
//
// // Same card size as SmartCard.jsx (90mm x 105mm at 4.3px/mm)
// const CARD_W_PX = 90 * 4.3;
// const CARD_H_PX = 105 * 4.3;
//
// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [scale, setScale] = useState(1);
//
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);
//
//   // Same Poppins + Noto Sans Devanagari fonts the ID card uses (same element id → loaded only once)
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);
//
//   // Small screens: shrink the whole card (design unchanged) so it always fits the width
//   useEffect(() => {
//     const update = () => setScale(Math.min(1, (window.innerWidth - 32) / CARD_W_PX));
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);
//
//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;
//
//   const closeButton = (
//     <Link
//       to="/vendors/list"
//       aria-label="Close"
//       className="fixed right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-700 shadow-md ring-1 ring-black/5 transition hover:bg-ink-50"
//     >
//       <FiX size={18} />
//     </Link>
//   );
//
//   /* ---------- loading ---------- */
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//         {closeButton}
//         <Card className="w-full max-w-sm">
//           <div className="flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- not found / invalid ---------- */
//   if (!vendor) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//         {closeButton}
//         <Card className="w-full max-w-sm">
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Not a Verified Vendor</p>
//           </div>
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- every detail that was on the old verification page ---------- */
//   const frontFields = [
//     ...(certificate?.certificateNo
//       ? [{ icon: FiCreditCard, label: "Certificate No.", value: certificate.certificateNo }]
//       : []),
//     { icon: FiUser, label: "Vendor Name", value: vendor.personal?.fullName, strong: true },
//     { icon: FiHash, label: "Vendor ID", value: vendor.vendorId },
//     { icon: FiUsers, label: "Gender", value: genderLabel(vendor.personal?.gender) },
//     { icon: FiPhone, label: "Mobile No.", value: vendor.personal?.mobile || "-" },
//     {
//       icon: FiFlag,
//       label: "Ward / Zone",
//       value: `${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`,
//     },
//     ...(certificate
//       ? [
//           { icon: FiCalendar, label: "Issue Date", value: formatDate(certificate.issueDate) },
//           { icon: FiCalendar, label: "Valid Till", value: formatDate(certificate.validTill) },
//         ]
//       : []),
//   ];
//
//   const personalFields = [
//     { icon: FiClock, label: "DOB / Age", value: dobWithAge(vendor.personal?.dob) },
//     { icon: FiBriefcase, label: "Business Type", value: vendor.business?.businessType || "-" },
//     { icon: FiMapPin, label: "Business Place", value: vendor.business?.businessPlace || "-" },
//     { icon: FiClock, label: "Business Timing", value: vendor.business?.businessTiming || "-" },
//   ];
//
//   const certificateFields = [
//     { icon: FiFileText, label: "Application No.", value: vendor.applicationNo },
//     { icon: FiCheckCircle, label: "Status", value: vendor.status },
//   ];
//
//   const addressFields = [
//     { icon: FiMapPin, label: "Business Address", value: vendor.address?.workingAddress || "-", wrap: true, accent: "gold" },
//     { icon: FiHome, label: "Residential Address", value: vendor.address?.permanentAddress || "-", wrap: true },
//   ];
//
//   const cardStyle = {
//     width: `${CARD_W_PX}px`,
//     minHeight: `${CARD_H_PX}px`,
//     zoom: String(scale),
//     fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//     backgroundImage: `url(${backbanner})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//   };
//   const gridStyle = { gridTemplateColumns: "max-content max-content max-content 1fr" };
//
//   const statusText = valid ? "Vendor Verified" : isExpired ? "Certificate Expired" : "Not a Verified Vendor";
//
//   return (
//     <div className="min-h-screen bg-surface px-4 py-10">
//       {closeButton}
//
//       {/* two cards side by side on wide screens, single column on small screens */}
//       <div className="flex flex-wrap items-stretch justify-center gap-10 px-1 py-2">
//         {/* ---------- FRONT ---------- */}
//         <div
//           className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//           style={cardStyle}
//         >
//           <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-4 min-h-[96px]">
//             <div
//               className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
//               style={{ marginTop: "-18px" }}
//             >
//               <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//             </div>
//
//             <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//               <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                 वसई-विरार शहर महानगरपालिका
//               </p>
//               {/* "रस्ता विक्रेता ओळखपत्र" removed — English corporation name shown instead */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="whitespace-nowrap text-[11.5px] font-bold leading-tight tracking-tight text-[#F3D27A]">
//                   Vasai Virar City Municipal Corporation
//                 </h2>
//               </div>
//             </div>
//           </div>
//
//           <div className="relative z-10 flex flex-1 flex-col items-center gap-2 px-4 pb-3 pt-[5px]">
//             <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
//               {/* photo — same tile as the ID card */}
//               <div
//                 className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-[2px]"
//                 style={{ borderColor: "#F7E4C2" }}
//               >
//                 <div className="h-full w-full overflow-hidden rounded-[4px] bg-[#ffffff]">
//                   {vendor.documents?.photo ? (
//                     <img
//                       src={vendor.documents.photo}
//                       alt={vendor.personal?.fullName}
//                       className="block h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//
//               {/* verification status — sits where the QR code was on the ID card (QR removed) */}
//               <div
//                 className="flex h-[96px] w-[96px] shrink-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] px-1 text-center"
//                 style={{ borderColor: "#F7E4C2" }}
//               >
//                 {valid ? (
//                   <FiCheckCircle size={32} className="text-success-500" />
//                 ) : (
//                   <FiXCircle size={32} className="text-danger-500" />
//                 )}
//                 <p
//                   className={`text-[11.5px] font-bold leading-tight ${
//                     valid ? "text-success-500" : "text-danger-500"
//                   }`}
//                 >
//                   {statusText}
//                 </p>
//               </div>
//             </div>
//
//             <div
//               className="relative mt-[1px] grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
//               style={gridStyle}
//             >
//               {frontFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//               ))}
//             </div>
//             {/* signature block "सहाय्यक आयुक्त (प्रभाग समिती)" removed */}
//           </div>
//         </div>
//
//         {/* ---------- BACK ---------- */}
//         <div
//           className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//           style={cardStyle}
//         >
//           <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-4 min-h-[96px]">
//             <div
//               className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
//               style={{ marginTop: "-18px" }}
//             >
//               <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//             </div>
//
//             <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//               <p className="whitespace-nowrap pb-3 text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                 वसई-विरार शहर महानगरपालिका
//               </p>
//             </div>
//           </div>
//
//           <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 px-4 pb-3 pt-6">
//             <div className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5" style={gridStyle}>
//               <VerifyHeading>Personal Information</VerifyHeading>
//               {personalFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//               ))}
//
//               <VerifyHeading>Certificate Information</VerifyHeading>
//               {certificateFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//               ))}
//
//               <VerifyHeading>Address Information</VerifyHeading>
//               {addressFields.map((f) => (
//                 <VerifyField
//                   key={f.label}
//                   icon={f.icon}
//                   label={f.label}
//                   value={f.value}
//                   wrap={f.wrap}
//                   accent={f.accent}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// // Same look as IconCardField / SectionHeading in SmartCard.jsx
// function VerifyField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";
//
//   return (
//     <>
//       <span className={`mt-[2px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} strokeWidth={2} />
//       </span>
//       <span
//         className={`min-w-0 whitespace-nowrap text-[12.8px] leading-[16.5px] tracking-[0.005em] text-[#334155] ${
//           strong ? "font-bold text-[#0f172a]" : "font-semibold"
//         }`}
//       >
//         {label}
//       </span>
//       <span className={`text-[12.8px] leading-[16.5px] text-[#94a3b8] ${strong ? "font-bold" : "font-medium"}`}>:</span>
//
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[13.8px] leading-[16.5px] tabular-nums text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227]/60 underline-offset-[5px] leading-[21px]"
//             : "border-b border-dotted border-[#C9A227]/55 pb-[1.5px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }
//
// function VerifyHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[3px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.4px] font-bold uppercase tracking-[0.16em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/70 via-[#D9BE68]/50 to-transparent" />
//     </div>
//   );
// }
//
//

// ═════════════════════════════════════════════════════════════
//  NEW — QR verification page: single ID-card style card
//  (green header + logo + names + X, "Vendor Verified" panel,
//   photo + name, then all details with Marathi / English labels).
//  No QR code. No Close button (X icon at the top right instead).
// ═════════════════════════════════════════════════════════════
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FiCheck,
//   FiCheckCircle,
//   FiXCircle,
//   FiLoader,
//   FiX,
//   FiUser,
//   FiFileText,
//   FiAward,
//   FiPhone,
//   FiCalendar,
//   FiShoppingBag,
//   FiMapPin,
//   FiClock,
//   FiMap,
//   FiBriefcase,
//   FiHome,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
// import logo from "../../../assets/logovvcmc.jpg";
// // import banner from "../../../assets/banner1.png"; // old header banner (kept, not used now)
// import backbanner from "../../../assets/backbanner.png"; // same artwork as the ID card

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// // design width of the card; on smaller screens the whole card is scaled down to fit
// const CARD_W_PX = 400;

// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [scale, setScale] = useState(1);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   // Same Poppins + Noto Sans Devanagari fonts the ID card uses (same element id → loaded only once)
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // Small screens: shrink the whole card (design unchanged) so it always fits the width
//   useEffect(() => {
//     const update = () => setScale(Math.min(1, (window.innerWidth - 24) / CARD_W_PX));
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;

//   const pageStyle = { background: "linear-gradient(135deg, #F7FBEF 0%, #E9F8F2 55%, #E4F2FB 100%)" };

//   /* ---------- loading ---------- */
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
//         <Card className="w-full max-w-sm">
//           <div className="flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   /* ---------- not found / invalid ---------- */
//   if (!vendor) {
//     return (
//       <div className="relative flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
//         <Link
//           to="/vendors/list"
//           aria-label="Close"
//           className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-md"
//         >
//           <FiX size={18} />
//         </Link>
//         <Card className="w-full max-w-sm">
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Not a Verified Vendor</p>
//           </div>
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         </Card>
//       </div>
//     );
//   }

//   /* ---------- every detail that was on the old verification page ---------- */
//   const rows = [
//     { icon: FiFileText, mr: "अर्ज क्रमांक", en: "Application No.", value: vendor.applicationNo },
//     ...(certificate?.certificateNo
//       ? [{ icon: FiAward, mr: "ओळखपत्र क्रमांक", en: "Certificate No.", value: certificate.certificateNo }]
//       : []),
//     { icon: FiUser, mr: "लिंग", en: "Gender", value: genderLabel(vendor.personal?.gender) },
//     { icon: FiPhone, mr: "मोबाईल क्रमांक", en: "Mobile No.", value: vendor.personal?.mobile || "-" },
//     { icon: FiCalendar, mr: "जन्मतारीख / वय", en: "Date of Birth / Age", value: dobWithAge(vendor.personal?.dob) },
//     { icon: FiShoppingBag, mr: "व्यवसायाचा प्रकार", en: "Business Type", value: vendor.business?.businessType || "-" },
//     { icon: FiMapPin, mr: "व्यवसायाचे ठिकाण", en: "Business Place", value: vendor.business?.businessPlace || "-" },
//     { icon: FiClock, mr: "व्यवसायाची वेळ", en: "Business Timing", value: vendor.business?.businessTiming || "-" },
//     {
//       icon: FiMap,
//       mr: "प्रभाग / ward",
//       en: "Ward / Zone",
//       value: `${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`,
//     },
//     ...(certificate
//       ? [
//           { icon: FiCalendar, mr: "जारी दिनांक", en: "Issue Date", value: formatDate(certificate.issueDate) },
//           { icon: FiCalendar, mr: "वैधता", en: "Valid Till", value: formatDate(certificate.validTill) },
//         ]
//       : []),
//     { icon: FiCheckCircle, mr: "स्थिती", en: "Status", value: vendor.status },
//     { icon: FiBriefcase, mr: "व्यवसायाचा पत्ता", en: "Business Address", value: vendor.address?.workingAddress || "-" },
//     { icon: FiHome, mr: "निवासी पत्ता", en: "Residential Address", value: vendor.address?.permanentAddress || "-" },
//   ];

//   const statusTitle = valid ? "Vendor Verified" : isExpired ? "Certificate Expired" : "Not a Verified Vendor";
//   const statusSub = valid
//     ? "Vendor details have been verified successfully."
//     : "This certificate is not valid.";

//   return (
//     <div className="flex min-h-screen items-start justify-center px-3 py-8" style={pageStyle}>
//       <div
//         className="relative overflow-hidden rounded-[20px] border-[3px] border-[#E3B448] bg-[#FEFDFB] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"
//         style={{
//           width: `${CARD_W_PX}px`,
//           zoom: String(scale),
//           fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//         }}
//       >
//         {/* ───────── ID-CARD BACKGROUND ARTWORK (same backbanner.png as the ID card) ─────────
//             Layer 1: green wave header + soft swirl, fading out smoothly (no hard edge).
//             Layer 2: the faint VVCMC emblem watermark (lower right, like the ID card).
//             The artwork's own gold frame is cropped out (card has its own gold border). */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute left-0 right-0 top-0 z-0"
//           style={{
//             height: "170px",
//             backgroundImage: `url(${backbanner})`,
//             backgroundSize: "418px auto",
//             backgroundPosition: "-12px -11px",
//             backgroundRepeat: "no-repeat",
//             WebkitMaskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
//             maskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
//           }}
//         />
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute left-0 right-0 z-0"
//           style={{
//             top: "52%",
//             height: "230px",
//             backgroundImage: `url(${backbanner})`,
//             backgroundSize: "418px auto",
//             backgroundPosition: "-12px -187px",
//             backgroundRepeat: "no-repeat",
//             WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%)",
//             maskImage: "linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%)",
//           }}
//         />

//         {/* ───────── HEADER ───────── */}
//         <div
//           className="relative flex items-center gap-3 pl-4 pr-14"
//           // style={{
//           //   aspectRatio: "3.3 / 1",
//           //   paddingBottom: "9%",
//           //   backgroundColor: "#0A7A44",
//           //   backgroundImage: `url(${banner})`,
//           //   backgroundSize: "100% 100%",
//           //   backgroundRepeat: "no-repeat",
//           // }}
//           // NEW: same green wave header artwork as the ID card (backbanner.png), top part only.
//           // Slightly zoomed + shifted so the artwork's own gold frame is cropped out
//           // (the card already has its own gold border).
//           // style={{
//           //   height: "106px",
//           //   paddingBottom: "24px",
//           //   backgroundColor: "#0A7A44",
//           //   backgroundImage: `url(${backbanner})`,
//           //   backgroundSize: "418px auto",
//           //   backgroundPosition: "-12px -11px",
//           //   backgroundRepeat: "no-repeat",
//           // }}
//           // NEW: the header artwork is now drawn by the background layer above (smooth fade, no seam)
//           style={{ height: "106px", paddingBottom: "24px" }}
//         >
//           <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-white p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
//             <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//           </div>

//           <div className="flex min-w-0 flex-col justify-center gap-[3px] leading-tight">
//             <p className="whitespace-nowrap text-[15.5px] font-semibold leading-[20px] text-white">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//             <p className="whitespace-nowrap text-[11.5px] font-semibold leading-tight text-white/95">
//               Vasai Virar City Municipal Corporation
//             </p>
//           </div>

//           {/* X (close) — top right */}
//           <Link
//             to="/vendors/list"
//             aria-label="Close"
//             className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-sm transition hover:bg-[#FFF8E6]"
//           >
//             <FiX size={18} strokeWidth={2.5} />
//           </Link>
//         </div>

//         {/* ───────── BODY ───────── */}
//         <div className="relative px-4 pb-5 pt-3">
//           {/* OLD plain emblem watermark — replaced by the artwork watermark layer above
//           <img
//             src={logo}
//             alt=""
//             aria-hidden="true"
//             className="pointer-events-none absolute left-1/2 top-[60%] w-[64%] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.07] mix-blend-multiply"
//           />
//           */}

//           <div className="relative z-10">
//             {/* Vendor Verified panel */}
//             <div
//               className={`mb-3.5 flex flex-col items-center rounded-2xl px-3 py-3.5 text-center ${
//                 valid ? "bg-[#E3F6EC] text-[#14803F]" : "bg-[#FDECEC] text-[#C0392B]"
//               }`}
//             >
//               <span
//                 className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-white ${
//                   valid ? "bg-[#1AA35B]" : "bg-[#D64545]"
//                 }`}
//               >
//                 {valid ? <FiCheck size={24} strokeWidth={3} /> : <FiX size={24} strokeWidth={3} />}
//               </span>
//               <p className="mt-1.5 text-[20px] font-bold leading-tight">{statusTitle}</p>
//               <p className="mt-0.5 text-[11.5px] font-medium opacity-90">{statusSub}</p>
//             </div>

//             {/* photo + name */}
//             <div className="flex items-center gap-3.5 pb-3">
//               <div className="h-[96px] w-[80px] shrink-0 overflow-hidden rounded-[8px] border-2 border-[#F0D48A] bg-white p-[2px]">
//                 <div className="h-full w-full overflow-hidden rounded-[6px] bg-white">
//                   {vendor.documents?.photo ? (
//                     <img
//                       src={vendor.documents.photo}
//                       alt={vendor.personal?.fullName}
//                       className="block h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="min-w-0">
//                 <p className="break-words text-[20px] font-bold leading-tight text-[#0f172a]">
//                   {vendor.personal?.fullName}
//                 </p>
//                 <p className="mt-0.5 break-all text-[12.5px] font-medium text-[#6B7A99]">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="h-px w-full bg-gradient-to-r from-[#C9A227]/60 via-[#D9BE68]/40 to-transparent" />

//             {/* details */}
//             <div>
//               {rows.map((r) => (
//                 <DetailRow key={r.en} icon={r.icon} mr={r.mr} en={r.en} value={r.value} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // One detail row: round icon chip | Marathi + English label | : | value (dotted gold underline)
// function DetailRow({ icon: Icon, mr, en, value }) {
//   return (
//     <div className="flex items-center gap-2.5 border-b border-dotted border-[#C9A227]/50 py-[9px]">
//       <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#E5F0E9] text-[#0B6B3A]">
//         <Icon size={15} strokeWidth={2} />
//       </span>
//       <div className="w-[104px] shrink-0 leading-tight">
//         <p className="text-[12.5px] font-semibold leading-[16px] text-[#1e293b]">{mr}</p>
//         <p className="text-[10.5px] font-medium leading-[14px] text-[#64748b]">{en}</p>
//       </div>
//       <span className="text-[13px] font-medium text-[#94a3b8]">:</span>
//       <span className="min-w-0 flex-1 whitespace-normal break-words text-[13.5px] font-semibold leading-[18px] tabular-nums text-[#0f172a]">
//         {value || "-"}
//       </span>
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

// // ── NEW helpers (added for the extra ID-card details) ──
// function genderLabel(g) {
//   if (!g) return "-";
//   const v = String(g).toLowerCase();
//   if (v === "male") return "Male";
//   if (v === "female") return "Female";
//   if (v === "other") return "Other";
//   return g;
// }

// function dobWithAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // return age >= 0 ? `${formatDate(dob)} / ${age} yrs` : formatDate(dob);
//     // return age >= 0 ? `${formatDate(dob)} / ${age} yrs` : formatDate(dob);
//   return age >= 0 ? `${formatDate(dob)} / ${age} वर्षे` : formatDate(dob);
// }

// // Long-text row: label on top, value below (used for addresses)
// function BlockRow({ label, value }) {
//   return (
//     <div className="text-xs">
//       <span className="text-ink-500">{label}</span>
//       <p className="mt-0.5 break-words font-semibold text-ink-900">{value || "-"}</p>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// // import { verifyCertificateByApplicationNo } from "../../../services/Vendorapplicationservice";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {loading ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         ) : vendor && valid ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {vendor && isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}

//         {!loading && vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate?.certificateNo && <Row label="Certificate No." value={certificate.certificateNo} />}
//               <Row label="Business Type" value={vendor.business?.businessType || "-"} />
//               <Row label="Ward / Zone" value={`${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Valid Till" value={formatDate(certificate.validTill)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//             </div>
//           </>
//         )}

//         {!loading && !vendor && (
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
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






// ─────────────────────────────────────────────────────────────
// PREVIOUS (plain card + Close button) version of this page — kept commented, not deleted.
// ─────────────────────────────────────────────────────────────
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// // import { verifyCertificateByApplicationNo } from "../../../services/Vendorapplicationservice";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
//
// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
//
// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);
//
//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;
//
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {loading ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         ) : vendor && valid ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {vendor && isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}
//
//         {!loading && vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>
//
//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate?.certificateNo && <Row label="Certificate No." value={certificate.certificateNo} />}
//               {/* NEW — same details as printed on the ID card */}
//               <Row label="Gender" value={genderLabel(vendor.personal?.gender)} />
//               <Row label="Mobile No." value={vendor.personal?.mobile || "-"} />
//               <Row label="Date of Birth / Age" value={dobWithAge(vendor.personal?.dob)} />
//               <Row label="Business Type" value={vendor.business?.businessType || "-"} />
//               {/* NEW */}
//               <Row label="Business Place" value={vendor.business?.businessPlace || "-"} />
//               <Row label="Business Timing" value={vendor.business?.businessTiming || "-"} />
//               <Row label="Ward / Zone" value={`${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Valid Till" value={formatDate(certificate.validTill)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//               {/* NEW — addresses (long text, so shown label-above-value) */}
//               <BlockRow label="Business Address" value={vendor.address?.workingAddress} />
//               <BlockRow label="Residential Address" value={vendor.address?.permanentAddress} />
//             </div>
//           </>
//         )}
//
//         {!loading && !vendor && (
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         )}
//
//         <Link to="/vendors/list">
//           <Button variant="outline" className="mt-5 w-full">
//             Close
//           </Button>
//         </Link>
//       </Card>
//     </div>
//   );
// }
//

// ═════════════════════════════════════════════════════════════
//  NEW — QR verification page in the ID-card design.
//  • Same two cards as the ID card (front + back, same size, same artwork,
//    same fonts / icon chips / dotted fields). Side by side on wide screens,
//    stacked in a single column on small (mobile) screens.
//  • NO QR code, NO "रस्ता विक्रेता ओळखपत्र", NO "सहाय्यक आयुक्त (प्रभाग समिती)".
//  • Every detail from the old verification page is kept.
//  • Close button removed → X icon at the top right.
// ═════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────
// PREVIOUS (two-card front/back) version — kept commented, not deleted.
// ─────────────────────────────────────────────────────────────
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FiCheckCircle,
//   FiXCircle,
//   FiLoader,
//   FiX,
//   FiUser,
//   FiFileText,
//   FiCreditCard,
//   FiCalendar,
//   FiPhone,
//   FiUsers,
//   FiClock,
//   FiBriefcase,
//   FiMapPin,
//   FiHome,
//   FiFlag,
//   FiHash,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
// import logo from "../../../assets/logovvcmc.jpg";
// import backbanner from "../../../assets/backbanner.png";
//
// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
//
// // Same card size as SmartCard.jsx (90mm x 105mm at 4.3px/mm)
// const CARD_W_PX = 90 * 4.3;
// const CARD_H_PX = 105 * 4.3;
//
// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [scale, setScale] = useState(1);
//
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);
//
//   // Same Poppins + Noto Sans Devanagari fonts the ID card uses (same element id → loaded only once)
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);
//
//   // Small screens: shrink the whole card (design unchanged) so it always fits the width
//   useEffect(() => {
//     const update = () => setScale(Math.min(1, (window.innerWidth - 32) / CARD_W_PX));
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);
//
//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;
//
//   const closeButton = (
//     <Link
//       to="/vendors/list"
//       aria-label="Close"
//       className="fixed right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-700 shadow-md ring-1 ring-black/5 transition hover:bg-ink-50"
//     >
//       <FiX size={18} />
//     </Link>
//   );
//
//   /* ---------- loading ---------- */
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//         {closeButton}
//         <Card className="w-full max-w-sm">
//           <div className="flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- not found / invalid ---------- */
//   if (!vendor) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//         {closeButton}
//         <Card className="w-full max-w-sm">
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Not a Verified Vendor</p>
//           </div>
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- every detail that was on the old verification page ---------- */
//   const frontFields = [
//     ...(certificate?.certificateNo
//       ? [{ icon: FiCreditCard, label: "Certificate No.", value: certificate.certificateNo }]
//       : []),
//     { icon: FiUser, label: "Vendor Name", value: vendor.personal?.fullName, strong: true },
//     { icon: FiHash, label: "Vendor ID", value: vendor.vendorId },
//     { icon: FiUsers, label: "Gender", value: genderLabel(vendor.personal?.gender) },
//     { icon: FiPhone, label: "Mobile No.", value: vendor.personal?.mobile || "-" },
//     {
//       icon: FiFlag,
//       label: "Ward / Zone",
//       value: `${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`,
//     },
//     ...(certificate
//       ? [
//           { icon: FiCalendar, label: "Issue Date", value: formatDate(certificate.issueDate) },
//           { icon: FiCalendar, label: "Valid Till", value: formatDate(certificate.validTill) },
//         ]
//       : []),
//   ];
//
//   const personalFields = [
//     { icon: FiClock, label: "DOB / Age", value: dobWithAge(vendor.personal?.dob) },
//     { icon: FiBriefcase, label: "Business Type", value: vendor.business?.businessType || "-" },
//     { icon: FiMapPin, label: "Business Place", value: vendor.business?.businessPlace || "-" },
//     { icon: FiClock, label: "Business Timing", value: vendor.business?.businessTiming || "-" },
//   ];
//
//   const certificateFields = [
//     { icon: FiFileText, label: "Application No.", value: vendor.applicationNo },
//     { icon: FiCheckCircle, label: "Status", value: vendor.status },
//   ];
//
//   const addressFields = [
//     { icon: FiMapPin, label: "Business Address", value: vendor.address?.workingAddress || "-", wrap: true, accent: "gold" },
//     { icon: FiHome, label: "Residential Address", value: vendor.address?.permanentAddress || "-", wrap: true },
//   ];
//
//   const cardStyle = {
//     width: `${CARD_W_PX}px`,
//     minHeight: `${CARD_H_PX}px`,
//     zoom: String(scale),
//     fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//     backgroundImage: `url(${backbanner})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//   };
//   const gridStyle = { gridTemplateColumns: "max-content max-content max-content 1fr" };
//
//   const statusText = valid ? "Vendor Verified" : isExpired ? "Certificate Expired" : "Not a Verified Vendor";
//
//   return (
//     <div className="min-h-screen bg-surface px-4 py-10">
//       {closeButton}
//
//       {/* two cards side by side on wide screens, single column on small screens */}
//       <div className="flex flex-wrap items-stretch justify-center gap-10 px-1 py-2">
//         {/* ---------- FRONT ---------- */}
//         <div
//           className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//           style={cardStyle}
//         >
//           <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-4 min-h-[96px]">
//             <div
//               className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
//               style={{ marginTop: "-18px" }}
//             >
//               <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//             </div>
//
//             <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//               <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                 वसई-विरार शहर महानगरपालिका
//               </p>
//               {/* "रस्ता विक्रेता ओळखपत्र" removed — English corporation name shown instead */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="whitespace-nowrap text-[11.5px] font-bold leading-tight tracking-tight text-[#F3D27A]">
//                   Vasai Virar City Municipal Corporation
//                 </h2>
//               </div>
//             </div>
//           </div>
//
//           <div className="relative z-10 flex flex-1 flex-col items-center gap-2 px-4 pb-3 pt-[5px]">
//             <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
//               {/* photo — same tile as the ID card */}
//               <div
//                 className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-[2px]"
//                 style={{ borderColor: "#F7E4C2" }}
//               >
//                 <div className="h-full w-full overflow-hidden rounded-[4px] bg-[#ffffff]">
//                   {vendor.documents?.photo ? (
//                     <img
//                       src={vendor.documents.photo}
//                       alt={vendor.personal?.fullName}
//                       className="block h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//
//               {/* verification status — sits where the QR code was on the ID card (QR removed) */}
//               <div
//                 className="flex h-[96px] w-[96px] shrink-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] px-1 text-center"
//                 style={{ borderColor: "#F7E4C2" }}
//               >
//                 {valid ? (
//                   <FiCheckCircle size={32} className="text-success-500" />
//                 ) : (
//                   <FiXCircle size={32} className="text-danger-500" />
//                 )}
//                 <p
//                   className={`text-[11.5px] font-bold leading-tight ${
//                     valid ? "text-success-500" : "text-danger-500"
//                   }`}
//                 >
//                   {statusText}
//                 </p>
//               </div>
//             </div>
//
//             <div
//               className="relative mt-[1px] grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
//               style={gridStyle}
//             >
//               {frontFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//               ))}
//             </div>
//             {/* signature block "सहाय्यक आयुक्त (प्रभाग समिती)" removed */}
//           </div>
//         </div>
//
//         {/* ---------- BACK ---------- */}
//         <div
//           className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//           style={cardStyle}
//         >
//           <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-4 min-h-[96px]">
//             <div
//               className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
//               style={{ marginTop: "-18px" }}
//             >
//               <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//             </div>
//
//             <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//               <p className="whitespace-nowrap pb-3 text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                 वसई-विरार शहर महानगरपालिका
//               </p>
//             </div>
//           </div>
//
//           <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 px-4 pb-3 pt-6">
//             <div className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5" style={gridStyle}>
//               <VerifyHeading>Personal Information</VerifyHeading>
//               {personalFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//               ))}
//
//               <VerifyHeading>Certificate Information</VerifyHeading>
//               {certificateFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//               ))}
//
//               <VerifyHeading>Address Information</VerifyHeading>
//               {addressFields.map((f) => (
//                 <VerifyField
//                   key={f.label}
//                   icon={f.icon}
//                   label={f.label}
//                   value={f.value}
//                   wrap={f.wrap}
//                   accent={f.accent}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// // Same look as IconCardField / SectionHeading in SmartCard.jsx
// function VerifyField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";
//
//   return (
//     <>
//       <span className={`mt-[2px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} strokeWidth={2} />
//       </span>
//       <span
//         className={`min-w-0 whitespace-nowrap text-[12.8px] leading-[16.5px] tracking-[0.005em] text-[#334155] ${
//           strong ? "font-bold text-[#0f172a]" : "font-semibold"
//         }`}
//       >
//         {label}
//       </span>
//       <span className={`text-[12.8px] leading-[16.5px] text-[#94a3b8] ${strong ? "font-bold" : "font-medium"}`}>:</span>
//
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[13.8px] leading-[16.5px] tabular-nums text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227]/60 underline-offset-[5px] leading-[21px]"
//             : "border-b border-dotted border-[#C9A227]/55 pb-[1.5px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }
//
// function VerifyHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[3px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.4px] font-bold uppercase tracking-[0.16em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/70 via-[#D9BE68]/50 to-transparent" />
//     </div>
//   );
// }
//
//

// ═════════════════════════════════════════════════════════════
//  NEW — QR verification page: single ID-card style card
//  (green header + logo + names + X, "Vendor Verified" panel,
//   photo + name, then all details with Marathi / English labels).
//  No QR code. No Close button (X icon at the top right instead).
// ═════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────
// PREVIOUS (single card + 3-slice background images) version — kept commented, not deleted.
// ─────────────────────────────────────────────────────────────
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FiCheck,
//   FiCheckCircle,
//   FiXCircle,
//   FiLoader,
//   FiX,
//   FiUser,
//   FiFileText,
//   FiAward,
//   FiPhone,
//   FiCalendar,
//   FiShoppingBag,
//   FiMapPin,
//   FiClock,
//   FiMap,
//   FiBriefcase,
//   FiHome,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
// import logo from "../../../assets/logovvcmc.jpg";
// // import banner from "../../../assets/banner1.png"; // old header banner (kept, not used now)
// // import backbanner from "../../../assets/backbanner.png"; // (used by the previous layered version — kept commented)
// // Full-page background made from the ID-card artwork (same look, any card height):
// import vbTop from "../../../assets/verify-bg-top.jpg"; // green wave header + frame top
// import vbMid from "../../../assets/verify-bg-mid.jpg"; // stretchable middle (gold side frame + cream)
// import vbBottom from "../../../assets/verify-bg-bottom.jpg"; // frame bottom + rounded corners
// import vbWatermark from "../../../assets/verify-watermark.png"; // faint VVCMC emblem (transparent PNG)
//
// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
//
// // design width of the card; on smaller screens the whole card is scaled down to fit
// const CARD_W_PX = 400;
//
// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [scale, setScale] = useState(1);
//
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);
//
//   // Same Poppins + Noto Sans Devanagari fonts the ID card uses (same element id → loaded only once)
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);
//
//   // Small screens: shrink the whole card (design unchanged) so it always fits the width
//   useEffect(() => {
//     const update = () => setScale(Math.min(1, (window.innerWidth - 24) / CARD_W_PX));
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);
//
//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;
//
//   const pageStyle = { background: "linear-gradient(135deg, #F7FBEF 0%, #E9F8F2 55%, #E4F2FB 100%)" };
//
//   /* ---------- loading ---------- */
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
//         <Card className="w-full max-w-sm">
//           <div className="flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- not found / invalid ---------- */
//   if (!vendor) {
//     return (
//       <div className="relative flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
//         <Link
//           to="/vendors/list"
//           aria-label="Close"
//           className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-md"
//         >
//           <FiX size={18} />
//         </Link>
//         <Card className="w-full max-w-sm">
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Not a Verified Vendor</p>
//           </div>
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- every detail that was on the old verification page ---------- */
//   const rows = [
//     { icon: FiFileText, mr: "अर्ज क्रमांक", en: "Application No.", value: vendor.applicationNo },
//     ...(certificate?.certificateNo
//       ? [{ icon: FiAward, mr: "ओळखपत्र क्रमांक", en: "Certificate No.", value: certificate.certificateNo }]
//       : []),
//     { icon: FiUser, mr: "लिंग", en: "Gender", value: genderLabel(vendor.personal?.gender) },
//     { icon: FiPhone, mr: "मोबाईल क्रमांक", en: "Mobile No.", value: vendor.personal?.mobile || "-" },
//     { icon: FiCalendar, mr: "जन्मतारीख / वय", en: "Date of Birth / Age", value: dobWithAge(vendor.personal?.dob) },
//     { icon: FiShoppingBag, mr: "व्यवसायाचा प्रकार", en: "Business Type", value: vendor.business?.businessType || "-" },
//     { icon: FiMapPin, mr: "व्यवसायाचे ठिकाण", en: "Business Place", value: vendor.business?.businessPlace || "-" },
//     { icon: FiClock, mr: "व्यवसायाची वेळ", en: "Business Timing", value: vendor.business?.businessTiming || "-" },
//     {
//       icon: FiMap,
//       mr: "प्रभाग / ward",
//       en: "Ward / Zone",
//       value: `${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`,
//     },
//     ...(certificate
//       ? [
//           { icon: FiCalendar, mr: "जारी दिनांक", en: "Issue Date", value: formatDate(certificate.issueDate) },
//           { icon: FiCalendar, mr: "वैधता", en: "Valid Till", value: formatDate(certificate.validTill) },
//         ]
//       : []),
//     { icon: FiCheckCircle, mr: "स्थिती", en: "Status", value: vendor.status },
//     { icon: FiBriefcase, mr: "व्यवसायाचा पत्ता", en: "Business Address", value: vendor.address?.workingAddress || "-" },
//     { icon: FiHome, mr: "निवासी पत्ता", en: "Residential Address", value: vendor.address?.permanentAddress || "-" },
//   ];
//
//   const statusTitle = valid ? "Vendor Verified" : isExpired ? "Certificate Expired" : "Not a Verified Vendor";
//   const statusSub = valid
//     ? "Vendor details have been verified successfully."
//     : "This certificate is not valid.";
//
//   // ── PREVIOUS layered-artwork background (kept, not deleted) ──
//   //         {/* ───────── ID-CARD BACKGROUND ARTWORK (same backbanner.png as the ID card) ─────────
//   //             Layer 1: green wave header + soft swirl, fading out smoothly (no hard edge).
//   //             Layer 2: the faint VVCMC emblem watermark (lower right, like the ID card).
//   //             The artwork's own gold frame is cropped out (card has its own gold border). */}
//   //         <div
//   //           aria-hidden="true"
//   //           className="pointer-events-none absolute left-0 right-0 top-0 z-0"
//   //           style={{
//   //             height: "170px",
//   //             backgroundImage: `url(${backbanner})`,
//   //             backgroundSize: "418px auto",
//   //             backgroundPosition: "-12px -11px",
//   //             backgroundRepeat: "no-repeat",
//   //             WebkitMaskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
//   //             maskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
//   //           }}
//   //         />
//   //         <div
//   //           aria-hidden="true"
//   //           className="pointer-events-none absolute left-0 right-0 z-0"
//   //           style={{
//   //             top: "52%",
//   //             height: "230px",
//   //             backgroundImage: `url(${backbanner})`,
//   //             backgroundSize: "418px auto",
//   //             backgroundPosition: "-12px -187px",
//   //             backgroundRepeat: "no-repeat",
//   //             WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%)",
//   //             maskImage: "linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%)",
//   //           }}
//   //         />
//
//   return (
//     <div className="flex min-h-screen items-start justify-center px-3 py-8" style={pageStyle}>
//       <div
//         // className="relative overflow-hidden rounded-[20px] border-[3px] border-[#E3B448] bg-[#FEFDFB] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"
//         className="relative overflow-hidden rounded-[12px] bg-[#FEFDFB] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"
//         style={{
//           width: `${CARD_W_PX}px`,
//           zoom: String(scale),
//           fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//           // ID-card style background for the WHOLE card (any height): top slice + bottom slice + stretchable middle
//           backgroundImage: `url(${vbTop}), url(${vbBottom}), url(${vbMid})`,
//           backgroundSize: "100% auto, 100% auto, 100% 100%",
//           backgroundPosition: "top center, bottom center, center",
//           backgroundRepeat: "no-repeat, no-repeat, no-repeat",
//         }}
//       >
//         {/* faint VVCMC emblem watermark, lower right — same as the ID card */}
//         <img
//           src={vbWatermark}
//           alt=""
//           aria-hidden="true"
//           className="pointer-events-none absolute -right-[2%] bottom-[6%] z-0 w-[66%] select-none"
//         />
//
//         {/* ───────── HEADER ───────── */}
//         <div
//           className="relative flex items-center gap-3 pl-4 pr-14"
//           // style={{
//           //   aspectRatio: "3.3 / 1",
//           //   paddingBottom: "9%",
//           //   backgroundColor: "#0A7A44",
//           //   backgroundImage: `url(${banner})`,
//           //   backgroundSize: "100% 100%",
//           //   backgroundRepeat: "no-repeat",
//           // }}
//           // NEW: same green wave header artwork as the ID card (backbanner.png), top part only.
//           // Slightly zoomed + shifted so the artwork's own gold frame is cropped out
//           // (the card already has its own gold border).
//           // style={{
//           //   height: "106px",
//           //   paddingBottom: "24px",
//           //   backgroundColor: "#0A7A44",
//           //   backgroundImage: `url(${backbanner})`,
//           //   backgroundSize: "418px auto",
//           //   backgroundPosition: "-12px -11px",
//           //   backgroundRepeat: "no-repeat",
//           // }}
//           // NEW: the header artwork is now drawn by the background layer above (smooth fade, no seam)
//           style={{ height: "106px", paddingBottom: "24px" }}
//         >
//           <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-white p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
//             <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//           </div>
//
//           <div className="flex min-w-0 flex-col justify-center gap-[3px] leading-tight">
//             <p className="whitespace-nowrap text-[15.5px] font-semibold leading-[20px] text-white">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//             <p className="whitespace-nowrap text-[11.5px] font-semibold leading-tight text-white/95">
//               Vasai Virar City Municipal Corporation
//             </p>
//           </div>
//
//           {/* X (close) — top right */}
//           <Link
//             to="/vendors/list"
//             aria-label="Close"
//             className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-sm transition hover:bg-[#FFF8E6]"
//           >
//             <FiX size={18} strokeWidth={2.5} />
//           </Link>
//         </div>
//
//         {/* ───────── BODY ───────── */}
//         <div className="relative px-4 pb-5 pt-3">
//           {/* OLD plain emblem watermark — replaced by the artwork watermark layer above
//           <img
//             src={logo}
//             alt=""
//             aria-hidden="true"
//             className="pointer-events-none absolute left-1/2 top-[60%] w-[64%] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.07] mix-blend-multiply"
//           />
//           */}
//
//           <div className="relative z-10">
//             {/* Vendor Verified panel */}
//             <div
//               className={`mb-3.5 flex flex-col items-center rounded-2xl px-3 py-3.5 text-center ${
//                 valid ? "bg-[#E3F6EC] text-[#14803F]" : "bg-[#FDECEC] text-[#C0392B]"
//               }`}
//             >
//               <span
//                 className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-white ${
//                   valid ? "bg-[#1AA35B]" : "bg-[#D64545]"
//                 }`}
//               >
//                 {valid ? <FiCheck size={24} strokeWidth={3} /> : <FiX size={24} strokeWidth={3} />}
//               </span>
//               <p className="mt-1.5 text-[20px] font-bold leading-tight">{statusTitle}</p>
//               <p className="mt-0.5 text-[11.5px] font-medium opacity-90">{statusSub}</p>
//             </div>
//
//             {/* photo + name */}
//             <div className="flex items-center gap-3.5 pb-3">
//               <div className="h-[96px] w-[80px] shrink-0 overflow-hidden rounded-[8px] border-2 border-[#F0D48A] bg-white p-[2px]">
//                 <div className="h-full w-full overflow-hidden rounded-[6px] bg-white">
//                   {vendor.documents?.photo ? (
//                     <img
//                       src={vendor.documents.photo}
//                       alt={vendor.personal?.fullName}
//                       className="block h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="min-w-0">
//                 <p className="break-words text-[20px] font-bold leading-tight text-[#0f172a]">
//                   {vendor.personal?.fullName}
//                 </p>
//                 <p className="mt-0.5 break-all text-[12.5px] font-medium text-[#6B7A99]">{vendor.vendorId}</p>
//               </div>
//             </div>
//
//             <div className="h-px w-full bg-gradient-to-r from-[#C9A227]/60 via-[#D9BE68]/40 to-transparent" />
//
//             {/* details */}
//             <div>
//               {rows.map((r) => (
//                 <DetailRow key={r.en} icon={r.icon} mr={r.mr} en={r.en} value={r.value} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// // One detail row: round icon chip | Marathi + English label | : | value (dotted gold underline)
// function DetailRow({ icon: Icon, mr, en, value }) {
//   return (
//     <div className="flex items-center gap-2.5 border-b border-dotted border-[#C9A227]/50 py-[9px]">
//       <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#E5F0E9] text-[#0B6B3A]">
//         <Icon size={15} strokeWidth={2} />
//       </span>
//       <div className="w-[104px] shrink-0 leading-tight">
//         <p className="text-[12.5px] font-semibold leading-[16px] text-[#1e293b]">{mr}</p>
//         <p className="text-[10.5px] font-medium leading-[14px] text-[#64748b]">{en}</p>
//       </div>
//       <span className="text-[13px] font-medium text-[#94a3b8]">:</span>
//       <span className="min-w-0 flex-1 whitespace-normal break-words text-[13.5px] font-semibold leading-[18px] tabular-nums text-[#0f172a]">
//         {value || "-"}
//       </span>
//     </div>
//   );
// }
//
//

// ═════════════════════════════════════════════════════════════
//  NEW — responsive QR verification page
//  • small screens (mobile)  : single ID-card style card (unchanged design)
//  • web / large screens     : wide layout like the hand-drawn sketch
//                              (header, centred "Vendor Verified", photo + name on the left,
//                               details in two columns)
//  "Vendor Verified" block: background removed and shifted 12px up.
// ═════════════════════════════════════════════════════════════
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FiCheck,
//   FiCheckCircle,
//   FiXCircle,
//   FiLoader,
//   FiX,
//   FiUser,
//   FiFileText,
//   FiAward,
//   FiPhone,
//   FiCalendar,
//   FiShoppingBag,
//   FiMapPin,
//   FiClock,
//   FiMap,
//   FiBriefcase,
//   FiHome,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
// import logo from "../../../assets/logovvcmc.jpg";
// // import banner from "../../../assets/banner1.png"; // old header banner (kept, not used now)
// import backbanner from "../../../assets/backbanner.png"; // same artwork as the ID card

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// // design width of the small-screen card; on smaller screens the whole card is scaled down to fit
// const CARD_W_PX = 400;
// // from this width up the wide (web) layout is used
// const WIDE_QUERY = "(min-width: 768px)";

// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [scale, setScale] = useState(1);
//   const [isWide, setIsWide] = useState(
//     () => typeof window !== "undefined" && window.matchMedia(WIDE_QUERY).matches
//   );

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   // Same Poppins + Noto Sans Devanagari fonts the ID card uses (same element id → loaded only once)
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // Small screens: shrink the whole card (design unchanged) so it always fits the width
//   useEffect(() => {
//     const update = () => setScale(Math.min(1, (window.innerWidth - 24) / CARD_W_PX));
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   // small screen ↔ large screen switch
//   useEffect(() => {
//     const mq = window.matchMedia(WIDE_QUERY);
//     const onChange = (e) => setIsWide(e.matches);
//     setIsWide(mq.matches);
//     mq.addEventListener("change", onChange);
//     return () => mq.removeEventListener("change", onChange);
//   }, []);

//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;

//   const pageStyle = { background: "linear-gradient(135deg, #F7FBEF 0%, #E9F8F2 55%, #E4F2FB 100%)" };

//   /* ---------- loading ---------- */
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
//         <Card className="w-full max-w-sm">
//           <div className="flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   /* ---------- not found / invalid ---------- */
//   if (!vendor) {
//     return (
//       <div className="relative flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
//         <Link
//           to="/vendors/list"
//           aria-label="Close"
//           className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-md"
//         >
//           <FiX size={18} />
//         </Link>
//         <Card className="w-full max-w-sm">
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Not a Verified Vendor</p>
//           </div>
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         </Card>
//       </div>
//     );
//   }

//   /* ---------- every detail that was on the old verification page ---------- */
//   const rows = [
//     { icon: FiFileText, mr: "अर्ज क्रमांक", en: "Application No.", value: vendor.applicationNo },
//     ...(certificate?.certificateNo
//       ? [{ icon: FiAward, mr: "ओळखपत्र क्रमांक", en: "Certificate No.", value: certificate.certificateNo }]
//       : []),
//     { icon: FiUser, mr: "लिंग", en: "Gender", value: genderLabel(vendor.personal?.gender) },
//     { icon: FiPhone, mr: "मोबाईल क्रमांक", en: "Mobile No.", value: vendor.personal?.mobile || "-" },
//     { icon: FiCalendar, mr: "जन्मतारीख / वय", en: "Date of Birth / Age", value: dobWithAge(vendor.personal?.dob) },
//     { icon: FiShoppingBag, mr: "व्यवसायाचा प्रकार", en: "Business Type", value: vendor.business?.businessType || "-" },
//     { icon: FiMapPin, mr: "व्यवसायाचे ठिकाण", en: "Business Place", value: vendor.business?.businessPlace || "-" },
//     { icon: FiClock, mr: "व्यवसायाची वेळ", en: "Business Timing", value: vendor.business?.businessTiming || "-" },
//     {
//       icon: FiMap,
//       mr: "प्रभाग / ward",
//       en: "Ward / Zone",
//       value: `${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`,
//     },
//     ...(certificate
//       ? [
//           { icon: FiCalendar, mr: "जारी दिनांक", en: "Issue Date", value: formatDate(certificate.issueDate) },
//           { icon: FiCalendar, mr: "वैधता", en: "Valid Till", value: formatDate(certificate.validTill) },
//         ]
//       : []),
//     { icon: FiCheckCircle, mr: "स्थिती", en: "Status", value: vendor.status },
//     { icon: FiBriefcase, mr: "व्यवसायाचा पत्ता", en: "Business Address", value: vendor.address?.workingAddress || "-" },
//     { icon: FiHome, mr: "निवासी पत्ता", en: "Residential Address", value: vendor.address?.permanentAddress || "-" },
//   ];

//   const statusTitle = valid ? "Vendor Verified" : isExpired ? "Certificate Expired" : "Not a Verified Vendor";
//   const statusSub = valid
//     ? "Vendor details have been verified successfully."
//     : "This certificate is not valid.";

//   /* ═════════════ WEB / LARGE SCREENS — layout like the hand-drawn sketch ═════════════ */
//   if (isWide) {
//     const byLabel = Object.fromEntries(rows.map((r) => [r.en, r]));
//     const pick = (labels) => labels.map((l) => byLabel[l]).filter(Boolean);

//     // left column (under the photo + name) and right column, as in the sketch
//     const leftRows = pick([
//       "Application No.",
//       "Certificate No.",
//       "Gender",
//       "Mobile No.",
//       "Date of Birth / Age",
//       "Business Address",
//     ]);
//     const rightRows = pick([
//       "Business Type",
//       "Business Place",
//       "Business Timing",
//       "Ward / Zone",
//       "Issue Date",
//       "Valid Till",
//       "Status",
//       "Residential Address",
//     ]);

//     return (
//       <div className="flex min-h-screen items-start justify-center px-6 py-10" style={pageStyle}>
//         <div
//           // className="relative w-full max-w-[1000px] overflow-hidden rounded-[22px] border-[3px] border-[#E3B448] bg-[#FEFDFB] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"


//                     // className="relative w-full max-w-[1000px] overflow-hidden rounded-[22px] border-[3px] border-[#E3B448] bg-[#FEFDFB] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"
//           className="relative w-[80%] overflow-hidden rounded-[22px] border-[3px] border-[#E3B448] bg-[#FEFDFB] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"
//           style={{ fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif" }}
//         >
//           {/* ID-card artwork: green wave header (stretched to the wide card) + faint emblem watermark */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute left-0 right-0 top-0 z-0"
//             style={{
//               height: "240px",
//               backgroundImage: `url(${backbanner})`,
//               backgroundSize: "106.2% 675px",
//               backgroundPosition: "50% -11px",
//               backgroundRepeat: "no-repeat",
//               WebkitMaskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
//               maskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
//             }}
//           />
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute bottom-[3%] right-[2%] z-0"
//             style={{
//               width: "350px",
//               height: "305px",
//               backgroundImage: `url(${backbanner})`,
//               backgroundSize: "582px auto",
//               backgroundPosition: "-215px -260px",
//               backgroundRepeat: "no-repeat",
//               WebkitMaskImage: "radial-gradient(ellipse closest-side, #000 55%, transparent 100%)",
//               maskImage: "radial-gradient(ellipse closest-side, #000 55%, transparent 100%)",
//             }}
//           />

//           {/* ───────── HEADER (same as the small-screen card: logo, names, X) ───────── */}
//           <div
//             className="relative flex items-center gap-5 pl-8 pr-24"
//             style={{ height: "150px", paddingBottom: "34px" }}
//           >
//             <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-white p-[4px] shadow-[0_0_0_2px_#C9A227]">
//               <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//             </div>

//             <div className="flex min-w-0 flex-col justify-center gap-1 leading-tight">
//               <p className="whitespace-nowrap text-[27px] font-semibold leading-[34px] text-white">
//                 वसई-विरार शहर महानगरपालिका
//               </p>
//               <p className="whitespace-nowrap text-[15.5px] font-semibold leading-tight text-white/95">
//                 Vasai Virar City Municipal Corporation
//               </p>
//             </div>

//             {/* X (close) — top right */}
//             <Link
//               to="/vendors/list"
//               aria-label="Close"
//               className="absolute right-5 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-sm transition hover:bg-[#FFF8E6]"
//             >
//               <FiX size={20} strokeWidth={2.5} />
//             </Link>
//           </div>

//           {/* ───────── BODY ───────── */}
//           <div className="relative z-10 px-10 pb-10 pt-2">
//             {/* Vendor Verified — no background box, centred */}
//             <div
//               className={`-mt-3 mb-6 flex flex-col items-center px-3 py-2 text-center ${
//                 valid ? "text-[#14803F]" : "text-[#C0392B]"
//               }`}
//             >
//               <span
//                 className={`flex h-[46px] w-[46px] items-center justify-center rounded-full text-white ${
//                   valid ? "bg-[#1AA35B]" : "bg-[#D64545]"
//                 }`}
//               >
//                 {valid ? <FiCheck size={28} strokeWidth={3} /> : <FiX size={28} strokeWidth={3} />}
//               </span>
//               <p className="mt-2 text-[26px] font-bold leading-tight">{statusTitle}</p>
//               <p className="mt-0.5 text-[14px] font-medium opacity-90">{statusSub}</p>
//             </div>

//             <div className="grid grid-cols-2 gap-x-14">
//               {/* LEFT: photo + name, then details */}
//               <div>
//                 <div className="flex items-center gap-5 pb-4">
//                   <div className="h-[132px] w-[110px] shrink-0 overflow-hidden rounded-[10px] border-2 border-[#F0D48A] bg-white p-[3px]">
//                     <div className="h-full w-full overflow-hidden rounded-[7px] bg-white">
//                       {vendor.documents?.photo ? (
//                         <img
//                           src={vendor.documents.photo}
//                           alt={vendor.personal?.fullName}
//                           className="block h-full w-full object-cover"
//                         />
//                       ) : (
//                         <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                           <FiUser size={44} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="min-w-0">
//                     <p className="break-words text-[26px] font-bold leading-tight text-[#0f172a]">
//                       {vendor.personal?.fullName}
//                     </p>
//                     <p className="mt-1 break-all text-[14px] font-medium text-[#6B7A99]">{vendor.vendorId}</p>
//                   </div>
//                 </div>

//                 <div className="h-px w-full bg-gradient-to-r from-[#C9A227]/60 via-[#D9BE68]/40 to-transparent" />

//                 {leftRows.map((r) => (
//                   <DetailRow key={r.en} icon={r.icon} mr={r.mr} en={r.en} value={r.value} wide />
//                 ))}
//               </div>

//               {/* RIGHT: details */}
//               <div>
//                 {rightRows.map((r) => (
//                   <DetailRow key={r.en} icon={r.icon} mr={r.mr} en={r.en} value={r.value} wide />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ═════════════ SMALL SCREENS (mobile) — single card, design unchanged ═════════════ */
//   return (
//     <div className="flex min-h-screen items-start justify-center px-3 py-8" style={pageStyle}>
//       <div
//         className="relative overflow-hidden rounded-[20px] border-[3px] border-[#E3B448] bg-[#FEFDFB] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"
//         style={{
//           width: `${CARD_W_PX}px`,
//           zoom: String(scale),
//           fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//         }}
//       >
//         {/* ───────── ID-CARD BACKGROUND ARTWORK (same backbanner.png as the ID card) ─────────
//             Layer 1: green wave header + soft swirl, fading out smoothly (no hard edge).
//             Layer 2: the faint VVCMC emblem watermark (lower right, like the ID card).
//             The artwork's own gold frame is cropped out (card has its own gold border). */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute left-0 right-0 top-0 z-0"
//           style={{
//             height: "170px",
//             backgroundImage: `url(${backbanner})`,
//             backgroundSize: "418px auto",
//             backgroundPosition: "-12px -11px",
//             backgroundRepeat: "no-repeat",
//             WebkitMaskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
//             maskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
//           }}
//         />
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute left-0 right-0 z-0"
//           style={{
//             top: "52%",
//             height: "230px",
//             backgroundImage: `url(${backbanner})`,
//             backgroundSize: "418px auto",
//             backgroundPosition: "-12px -187px",
//             backgroundRepeat: "no-repeat",
//             WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%)",
//             maskImage: "linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%)",
//           }}
//         />

//         {/* ───────── HEADER ───────── */}
//         <div
//           className="relative flex items-center gap-3 pl-4 pr-14"
//           // the header artwork is drawn by the background layer above (smooth fade, no seam)
//           style={{ height: "106px", paddingBottom: "24px" }}
//         >
//           <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-white p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
//             <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//           </div>

//           <div className="flex min-w-0 flex-col justify-center gap-[3px] leading-tight">
//             <p className="whitespace-nowrap text-[15.5px] font-semibold leading-[20px] text-white">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//             <p className="whitespace-nowrap text-[11.5px] font-semibold leading-tight text-white/95">
//               Vasai Virar City Municipal Corporation
//             </p>
//           </div>

//           {/* X (close) — top right */}
//           <Link
//             to="/vendors/list"
//             aria-label="Close"
//             className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-sm transition hover:bg-[#FFF8E6]"
//           >
//             <FiX size={18} strokeWidth={2.5} />
//           </Link>
//         </div>

//         {/* ───────── BODY ───────── */}
//         <div className="relative px-4 pb-5 pt-3">
//           <div className="relative z-10">
//             {/* Vendor Verified — background removed, shifted 12px up */}
//             <div
//               // className={`mb-3.5 flex flex-col items-center rounded-2xl px-3 py-3.5 text-center ${
//               //   valid ? "bg-[#E3F6EC] text-[#14803F]" : "bg-[#FDECEC] text-[#C0392B]"
//               // }`}
//               className={`-mt-3 mb-3.5 flex flex-col items-center px-3 py-2 text-center ${
//                 valid ? "text-[#14803F]" : "text-[#C0392B]"
//               }`}
//             >
//               <span
//                 className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-white ${
//                   valid ? "bg-[#1AA35B]" : "bg-[#D64545]"
//                 }`}
//               >
//                 {valid ? <FiCheck size={24} strokeWidth={3} /> : <FiX size={24} strokeWidth={3} />}
//               </span>
//               <p className="mt-1.5 text-[20px] font-bold leading-tight">{statusTitle}</p>
//               <p className="mt-0.5 text-[11.5px] font-medium opacity-90">{statusSub}</p>
//             </div>

//             {/* photo + name */}
//             <div className="flex items-center gap-3.5 pb-3">
//               <div className="h-[96px] w-[80px] shrink-0 overflow-hidden rounded-[8px] border-2 border-[#F0D48A] bg-white p-[2px]">
//                 <div className="h-full w-full overflow-hidden rounded-[6px] bg-white">
//                   {vendor.documents?.photo ? (
//                     <img
//                       src={vendor.documents.photo}
//                       alt={vendor.personal?.fullName}
//                       className="block h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="min-w-0">
//                 <p className="break-words text-[20px] font-bold leading-tight text-[#0f172a]">
//                   {vendor.personal?.fullName}
//                 </p>
//                 <p className="mt-0.5 break-all text-[12.5px] font-medium text-[#6B7A99]">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="h-px w-full bg-gradient-to-r from-[#C9A227]/60 via-[#D9BE68]/40 to-transparent" />

//             {/* details */}
//             <div>
//               {rows.map((r) => (
//                 <DetailRow key={r.en} icon={r.icon} mr={r.mr} en={r.en} value={r.value} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // One detail row: round icon chip | Marathi + English label | : | value (dotted gold underline)
// // `wide` = bigger version used on web / large screens; default = the small-screen (mobile) size.
// function DetailRow({ icon: Icon, mr, en, value, wide = false }) {
//   return (
//     <div
//       className={`flex items-center border-b border-dotted border-[#C9A227]/50 ${
//         wide ? "gap-3.5 py-[12px]" : "gap-2.5 py-[9px]"
//       }`}
//     >
//       <span
//         className={`flex shrink-0 items-center justify-center rounded-full bg-[#E5F0E9] text-[#0B6B3A] ${
//           wide ? "h-[38px] w-[38px]" : "h-[30px] w-[30px]"
//         }`}
//       >
//         <Icon size={wide ? 18 : 15} strokeWidth={2} />
//       </span>
//       <div className={`shrink-0 leading-tight ${wide ? "w-[170px]" : "w-[104px]"}`}>
//         <p
//           className={`font-semibold text-[#1e293b] ${
//             wide ? "text-[14.5px] leading-[19px]" : "text-[12.5px] leading-[16px]"
//           }`}
//         >
//           {mr}
//         </p>
//         <p
//           className={`font-medium text-[#64748b] ${
//             wide ? "text-[12px] leading-[16px]" : "text-[10.5px] leading-[14px]"
//           }`}
//         >
//           {en}
//         </p>
//       </div>
//       <span className={`font-medium text-[#94a3b8] ${wide ? "text-[15px]" : "text-[13px]"}`}>:</span>
//       <span
//         className={`min-w-0 flex-1 whitespace-normal break-words font-semibold tabular-nums text-[#0f172a] ${
//           wide ? "text-[15.5px] leading-[21px]" : "text-[13.5px] leading-[18px]"
//         }`}
//       >
//         {value || "-"}
//       </span>
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

// // ── NEW helpers (added for the extra ID-card details) ──
// function genderLabel(g) {
//   if (!g) return "-";
//   const v = String(g).toLowerCase();
//   if (v === "male") return "Male";
//   if (v === "female") return "Female";
//   if (v === "other") return "Other";
//   return g;
// }

// function dobWithAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // return age >= 0 ? `${formatDate(dob)} / ${age} yrs` : formatDate(dob);
//     // return age >= 0 ? `${formatDate(dob)} / ${age} yrs` : formatDate(dob);
//   return age >= 0 ? `${formatDate(dob)} / ${age} वर्षे` : formatDate(dob);
// }

// // Long-text row: label on top, value below (used for addresses)
// function BlockRow({ label, value }) {
//   return (
//     <div className="text-xs">
//       <span className="text-ink-500">{label}</span>
//       <p className="mt-0.5 break-words font-semibold text-ink-900">{value || "-"}</p>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// // import { verifyCertificateByApplicationNo } from "../../../services/Vendorapplicationservice";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {loading ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         ) : vendor && valid ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {vendor && isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}

//         {!loading && vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>

//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate?.certificateNo && <Row label="Certificate No." value={certificate.certificateNo} />}
//               <Row label="Business Type" value={vendor.business?.businessType || "-"} />
//               <Row label="Ward / Zone" value={`${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Valid Till" value={formatDate(certificate.validTill)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//             </div>
//           </>
//         )}

//         {!loading && !vendor && (
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
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






// ─────────────────────────────────────────────────────────────
// PREVIOUS (plain card + Close button) version of this page — kept commented, not deleted.
// ─────────────────────────────────────────────────────────────
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// // import { verifyCertificateByApplicationNo } from "../../../services/Vendorapplicationservice";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
//
// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
//
// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);
//
//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;
//
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//       <Card className="w-full max-w-sm">
//         {loading ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         ) : vendor && valid ? (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-success-100 py-4 text-success-500">
//             <FiCheckCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Vendor Verified</p>
//           </div>
//         ) : (
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">
//               {vendor && isExpired ? "Certificate Expired" : "Not a Verified Vendor"}
//             </p>
//           </div>
//         )}
//
//         {!loading && vendor && (
//           <>
//             <div className="mb-4 flex items-center gap-3">
//               <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//               <div>
//                 <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//                 <p className="text-xs text-ink-500">{vendor.vendorId}</p>
//               </div>
//             </div>
//
//             <div className="space-y-2.5 rounded-xl bg-ink-50 p-4 text-sm">
//               <Row label="Application No." value={vendor.applicationNo} />
//               {certificate?.certificateNo && <Row label="Certificate No." value={certificate.certificateNo} />}
//               {/* NEW — same details as printed on the ID card */}
//               <Row label="Gender" value={genderLabel(vendor.personal?.gender)} />
//               <Row label="Mobile No." value={vendor.personal?.mobile || "-"} />
//               <Row label="Date of Birth / Age" value={dobWithAge(vendor.personal?.dob)} />
//               <Row label="Business Type" value={vendor.business?.businessType || "-"} />
//               {/* NEW */}
//               <Row label="Business Place" value={vendor.business?.businessPlace || "-"} />
//               <Row label="Business Timing" value={vendor.business?.businessTiming || "-"} />
//               <Row label="Ward / Zone" value={`${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`} />
//               {certificate && (
//                 <>
//                   <Row label="Issue Date" value={formatDate(certificate.issueDate)} />
//                   <Row label="Valid Till" value={formatDate(certificate.validTill)} />
//                 </>
//               )}
//               <Row label="Status" value={vendor.status} />
//               {/* NEW — addresses (long text, so shown label-above-value) */}
//               <BlockRow label="Business Address" value={vendor.address?.workingAddress} />
//               <BlockRow label="Residential Address" value={vendor.address?.permanentAddress} />
//             </div>
//           </>
//         )}
//
//         {!loading && !vendor && (
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         )}
//
//         <Link to="/vendors/list">
//           <Button variant="outline" className="mt-5 w-full">
//             Close
//           </Button>
//         </Link>
//       </Card>
//     </div>
//   );
// }
//

// ═════════════════════════════════════════════════════════════
//  NEW — QR verification page in the ID-card design.
//  • Same two cards as the ID card (front + back, same size, same artwork,
//    same fonts / icon chips / dotted fields). Side by side on wide screens,
//    stacked in a single column on small (mobile) screens.
//  • NO QR code, NO "रस्ता विक्रेता ओळखपत्र", NO "सहाय्यक आयुक्त (प्रभाग समिती)".
//  • Every detail from the old verification page is kept.
//  • Close button removed → X icon at the top right.
// ═════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────
// PREVIOUS (two-card front/back) version — kept commented, not deleted.
// ─────────────────────────────────────────────────────────────
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FiCheckCircle,
//   FiXCircle,
//   FiLoader,
//   FiX,
//   FiUser,
//   FiFileText,
//   FiCreditCard,
//   FiCalendar,
//   FiPhone,
//   FiUsers,
//   FiClock,
//   FiBriefcase,
//   FiMapPin,
//   FiHome,
//   FiFlag,
//   FiHash,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
// import logo from "../../../assets/logovvcmc.jpg";
// import backbanner from "../../../assets/backbanner.png";
//
// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
//
// // Same card size as SmartCard.jsx (90mm x 105mm at 4.3px/mm)
// const CARD_W_PX = 90 * 4.3;
// const CARD_H_PX = 105 * 4.3;
//
// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [scale, setScale] = useState(1);
//
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);
//
//   // Same Poppins + Noto Sans Devanagari fonts the ID card uses (same element id → loaded only once)
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);
//
//   // Small screens: shrink the whole card (design unchanged) so it always fits the width
//   useEffect(() => {
//     const update = () => setScale(Math.min(1, (window.innerWidth - 32) / CARD_W_PX));
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);
//
//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;
//
//   const closeButton = (
//     <Link
//       to="/vendors/list"
//       aria-label="Close"
//       className="fixed right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-700 shadow-md ring-1 ring-black/5 transition hover:bg-ink-50"
//     >
//       <FiX size={18} />
//     </Link>
//   );
//
//   /* ---------- loading ---------- */
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//         {closeButton}
//         <Card className="w-full max-w-sm">
//           <div className="flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- not found / invalid ---------- */
//   if (!vendor) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
//         {closeButton}
//         <Card className="w-full max-w-sm">
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Not a Verified Vendor</p>
//           </div>
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- every detail that was on the old verification page ---------- */
//   const frontFields = [
//     ...(certificate?.certificateNo
//       ? [{ icon: FiCreditCard, label: "Certificate No.", value: certificate.certificateNo }]
//       : []),
//     { icon: FiUser, label: "Vendor Name", value: vendor.personal?.fullName, strong: true },
//     { icon: FiHash, label: "Vendor ID", value: vendor.vendorId },
//     { icon: FiUsers, label: "Gender", value: genderLabel(vendor.personal?.gender) },
//     { icon: FiPhone, label: "Mobile No.", value: vendor.personal?.mobile || "-" },
//     {
//       icon: FiFlag,
//       label: "Ward / Zone",
//       value: `${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`,
//     },
//     ...(certificate
//       ? [
//           { icon: FiCalendar, label: "Issue Date", value: formatDate(certificate.issueDate) },
//           { icon: FiCalendar, label: "Valid Till", value: formatDate(certificate.validTill) },
//         ]
//       : []),
//   ];
//
//   const personalFields = [
//     { icon: FiClock, label: "DOB / Age", value: dobWithAge(vendor.personal?.dob) },
//     { icon: FiBriefcase, label: "Business Type", value: vendor.business?.businessType || "-" },
//     { icon: FiMapPin, label: "Business Place", value: vendor.business?.businessPlace || "-" },
//     { icon: FiClock, label: "Business Timing", value: vendor.business?.businessTiming || "-" },
//   ];
//
//   const certificateFields = [
//     { icon: FiFileText, label: "Application No.", value: vendor.applicationNo },
//     { icon: FiCheckCircle, label: "Status", value: vendor.status },
//   ];
//
//   const addressFields = [
//     { icon: FiMapPin, label: "Business Address", value: vendor.address?.workingAddress || "-", wrap: true, accent: "gold" },
//     { icon: FiHome, label: "Residential Address", value: vendor.address?.permanentAddress || "-", wrap: true },
//   ];
//
//   const cardStyle = {
//     width: `${CARD_W_PX}px`,
//     minHeight: `${CARD_H_PX}px`,
//     zoom: String(scale),
//     fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//     backgroundImage: `url(${backbanner})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//   };
//   const gridStyle = { gridTemplateColumns: "max-content max-content max-content 1fr" };
//
//   const statusText = valid ? "Vendor Verified" : isExpired ? "Certificate Expired" : "Not a Verified Vendor";
//
//   return (
//     <div className="min-h-screen bg-surface px-4 py-10">
//       {closeButton}
//
//       {/* two cards side by side on wide screens, single column on small screens */}
//       <div className="flex flex-wrap items-stretch justify-center gap-10 px-1 py-2">
//         {/* ---------- FRONT ---------- */}
//         <div
//           className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//           style={cardStyle}
//         >
//           <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-4 min-h-[96px]">
//             <div
//               className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
//               style={{ marginTop: "-18px" }}
//             >
//               <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//             </div>
//
//             <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//               <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                 वसई-विरार शहर महानगरपालिका
//               </p>
//               {/* "रस्ता विक्रेता ओळखपत्र" removed — English corporation name shown instead */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="whitespace-nowrap text-[11.5px] font-bold leading-tight tracking-tight text-[#F3D27A]">
//                   Vasai Virar City Municipal Corporation
//                 </h2>
//               </div>
//             </div>
//           </div>
//
//           <div className="relative z-10 flex flex-1 flex-col items-center gap-2 px-4 pb-3 pt-[5px]">
//             <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
//               {/* photo — same tile as the ID card */}
//               <div
//                 className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-[2px]"
//                 style={{ borderColor: "#F7E4C2" }}
//               >
//                 <div className="h-full w-full overflow-hidden rounded-[4px] bg-[#ffffff]">
//                   {vendor.documents?.photo ? (
//                     <img
//                       src={vendor.documents.photo}
//                       alt={vendor.personal?.fullName}
//                       className="block h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//
//               {/* verification status — sits where the QR code was on the ID card (QR removed) */}
//               <div
//                 className="flex h-[96px] w-[96px] shrink-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] px-1 text-center"
//                 style={{ borderColor: "#F7E4C2" }}
//               >
//                 {valid ? (
//                   <FiCheckCircle size={32} className="text-success-500" />
//                 ) : (
//                   <FiXCircle size={32} className="text-danger-500" />
//                 )}
//                 <p
//                   className={`text-[11.5px] font-bold leading-tight ${
//                     valid ? "text-success-500" : "text-danger-500"
//                   }`}
//                 >
//                   {statusText}
//                 </p>
//               </div>
//             </div>
//
//             <div
//               className="relative mt-[1px] grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
//               style={gridStyle}
//             >
//               {frontFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//               ))}
//             </div>
//             {/* signature block "सहाय्यक आयुक्त (प्रभाग समिती)" removed */}
//           </div>
//         </div>
//
//         {/* ---------- BACK ---------- */}
//         <div
//           className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//           style={cardStyle}
//         >
//           <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-4 min-h-[96px]">
//             <div
//               className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
//               style={{ marginTop: "-18px" }}
//             >
//               <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//             </div>
//
//             <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//               <p className="whitespace-nowrap pb-3 text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                 वसई-विरार शहर महानगरपालिका
//               </p>
//             </div>
//           </div>
//
//           <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 px-4 pb-3 pt-6">
//             <div className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5" style={gridStyle}>
//               <VerifyHeading>Personal Information</VerifyHeading>
//               {personalFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//               ))}
//
//               <VerifyHeading>Certificate Information</VerifyHeading>
//               {certificateFields.map((f) => (
//                 <VerifyField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//               ))}
//
//               <VerifyHeading>Address Information</VerifyHeading>
//               {addressFields.map((f) => (
//                 <VerifyField
//                   key={f.label}
//                   icon={f.icon}
//                   label={f.label}
//                   value={f.value}
//                   wrap={f.wrap}
//                   accent={f.accent}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// // Same look as IconCardField / SectionHeading in SmartCard.jsx
// function VerifyField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";
//
//   return (
//     <>
//       <span className={`mt-[2px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} strokeWidth={2} />
//       </span>
//       <span
//         className={`min-w-0 whitespace-nowrap text-[12.8px] leading-[16.5px] tracking-[0.005em] text-[#334155] ${
//           strong ? "font-bold text-[#0f172a]" : "font-semibold"
//         }`}
//       >
//         {label}
//       </span>
//       <span className={`text-[12.8px] leading-[16.5px] text-[#94a3b8] ${strong ? "font-bold" : "font-medium"}`}>:</span>
//
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[13.8px] leading-[16.5px] tabular-nums text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227]/60 underline-offset-[5px] leading-[21px]"
//             : "border-b border-dotted border-[#C9A227]/55 pb-[1.5px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }
//
// function VerifyHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[3px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.4px] font-bold uppercase tracking-[0.16em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/70 via-[#D9BE68]/50 to-transparent" />
//     </div>
//   );
// }
//
//

// ═════════════════════════════════════════════════════════════
//  NEW — QR verification page: single ID-card style card
//  (green header + logo + names + X, "Vendor Verified" panel,
//   photo + name, then all details with Marathi / English labels).
//  No QR code. No Close button (X icon at the top right instead).
// ═════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────
// PREVIOUS (single card + 3-slice background images) version — kept commented, not deleted.
// ─────────────────────────────────────────────────────────────
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FiCheck,
//   FiCheckCircle,
//   FiXCircle,
//   FiLoader,
//   FiX,
//   FiUser,
//   FiFileText,
//   FiAward,
//   FiPhone,
//   FiCalendar,
//   FiShoppingBag,
//   FiMapPin,
//   FiClock,
//   FiMap,
//   FiBriefcase,
//   FiHome,
// } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
// import logo from "../../../assets/logovvcmc.jpg";
// // import banner from "../../../assets/banner1.png"; // old header banner (kept, not used now)
// // import backbanner from "../../../assets/backbanner.png"; // (used by the previous layered version — kept commented)
// // Full-page background made from the ID-card artwork (same look, any card height):
// import vbTop from "../../../assets/verify-bg-top.jpg"; // green wave header + frame top
// import vbMid from "../../../assets/verify-bg-mid.jpg"; // stretchable middle (gold side frame + cream)
// import vbBottom from "../../../assets/verify-bg-bottom.jpg"; // frame bottom + rounded corners
// import vbWatermark from "../../../assets/verify-watermark.png"; // faint VVCMC emblem (transparent PNG)
//
// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
//
// // design width of the card; on smaller screens the whole card is scaled down to fit
// const CARD_W_PX = 400;
//
// export default function QRVerification() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [vendor, setVendor] = useState(null);
//   const [valid, setValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [scale, setScale] = useState(1);
//
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     verifyCertificateByApplicationNo(id).then((result) => {
//       if (cancelled) return;
//       if (result.success) {
//         setVendor(result.data);
//         setValid(result.valid);
//       } else {
//         setVendor(null);
//         setErrorMessage(result.message || "No vendor found for this QR code.");
//       }
//       setLoading(false);
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);
//
//   // Same Poppins + Noto Sans Devanagari fonts the ID card uses (same element id → loaded only once)
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);
//
//   // Small screens: shrink the whole card (design unchanged) so it always fits the width
//   useEffect(() => {
//     const update = () => setScale(Math.min(1, (window.innerWidth - 24) / CARD_W_PX));
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);
//
//   const certificate = vendor?.certificate;
//   const isExpired = vendor && !valid;
//
//   const pageStyle = { background: "linear-gradient(135deg, #F7FBEF 0%, #E9F8F2 55%, #E4F2FB 100%)" };
//
//   /* ---------- loading ---------- */
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
//         <Card className="w-full max-w-sm">
//           <div className="flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
//             <FiLoader size={28} className="animate-spin" />
//             <p className="mt-1.5 text-sm font-bold">Verifying...</p>
//           </div>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- not found / invalid ---------- */
//   if (!vendor) {
//     return (
//       <div className="relative flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
//         <Link
//           to="/vendors/list"
//           aria-label="Close"
//           className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-md"
//         >
//           <FiX size={18} />
//         </Link>
//         <Card className="w-full max-w-sm">
//           <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
//             <FiXCircle size={28} />
//             <p className="mt-1.5 text-sm font-bold">Not a Verified Vendor</p>
//           </div>
//           <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
//         </Card>
//       </div>
//     );
//   }
//
//   /* ---------- every detail that was on the old verification page ---------- */
//   const rows = [
//     { icon: FiFileText, mr: "अर्ज क्रमांक", en: "Application No.", value: vendor.applicationNo },
//     ...(certificate?.certificateNo
//       ? [{ icon: FiAward, mr: "ओळखपत्र क्रमांक", en: "Certificate No.", value: certificate.certificateNo }]
//       : []),
//     { icon: FiUser, mr: "लिंग", en: "Gender", value: genderLabel(vendor.personal?.gender) },
//     { icon: FiPhone, mr: "मोबाईल क्रमांक", en: "Mobile No.", value: vendor.personal?.mobile || "-" },
//     { icon: FiCalendar, mr: "जन्मतारीख / वय", en: "Date of Birth / Age", value: dobWithAge(vendor.personal?.dob) },
//     { icon: FiShoppingBag, mr: "व्यवसायाचा प्रकार", en: "Business Type", value: vendor.business?.businessType || "-" },
//     { icon: FiMapPin, mr: "व्यवसायाचे ठिकाण", en: "Business Place", value: vendor.business?.businessPlace || "-" },
//     { icon: FiClock, mr: "व्यवसायाची वेळ", en: "Business Timing", value: vendor.business?.businessTiming || "-" },
//     {
//       icon: FiMap,
//       mr: "प्रभाग / ward",
//       en: "Ward / Zone",
//       value: `${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`,
//     },
//     ...(certificate
//       ? [
//           { icon: FiCalendar, mr: "जारी दिनांक", en: "Issue Date", value: formatDate(certificate.issueDate) },
//           { icon: FiCalendar, mr: "वैधता", en: "Valid Till", value: formatDate(certificate.validTill) },
//         ]
//       : []),
//     { icon: FiCheckCircle, mr: "स्थिती", en: "Status", value: vendor.status },
//     { icon: FiBriefcase, mr: "व्यवसायाचा पत्ता", en: "Business Address", value: vendor.address?.workingAddress || "-" },
//     { icon: FiHome, mr: "निवासी पत्ता", en: "Residential Address", value: vendor.address?.permanentAddress || "-" },
//   ];
//
//   const statusTitle = valid ? "Vendor Verified" : isExpired ? "Certificate Expired" : "Not a Verified Vendor";
//   const statusSub = valid
//     ? "Vendor details have been verified successfully."
//     : "This certificate is not valid.";
//
//   // ── PREVIOUS layered-artwork background (kept, not deleted) ──
//   //         {/* ───────── ID-CARD BACKGROUND ARTWORK (same backbanner.png as the ID card) ─────────
//   //             Layer 1: green wave header + soft swirl, fading out smoothly (no hard edge).
//   //             Layer 2: the faint VVCMC emblem watermark (lower right, like the ID card).
//   //             The artwork's own gold frame is cropped out (card has its own gold border). */}
//   //         <div
//   //           aria-hidden="true"
//   //           className="pointer-events-none absolute left-0 right-0 top-0 z-0"
//   //           style={{
//   //             height: "170px",
//   //             backgroundImage: `url(${backbanner})`,
//   //             backgroundSize: "418px auto",
//   //             backgroundPosition: "-12px -11px",
//   //             backgroundRepeat: "no-repeat",
//   //             WebkitMaskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
//   //             maskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
//   //           }}
//   //         />
//   //         <div
//   //           aria-hidden="true"
//   //           className="pointer-events-none absolute left-0 right-0 z-0"
//   //           style={{
//   //             top: "52%",
//   //             height: "230px",
//   //             backgroundImage: `url(${backbanner})`,
//   //             backgroundSize: "418px auto",
//   //             backgroundPosition: "-12px -187px",
//   //             backgroundRepeat: "no-repeat",
//   //             WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%)",
//   //             maskImage: "linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%)",
//   //           }}
//   //         />
//
//   return (
//     <div className="flex min-h-screen items-start justify-center px-3 py-8" style={pageStyle}>
//       <div
//         // className="relative overflow-hidden rounded-[20px] border-[3px] border-[#E3B448] bg-[#FEFDFB] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"
//         className="relative overflow-hidden rounded-[12px] bg-[#FEFDFB] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"
//         style={{
//           width: `${CARD_W_PX}px`,
//           zoom: String(scale),
//           fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//           // ID-card style background for the WHOLE card (any height): top slice + bottom slice + stretchable middle
//           backgroundImage: `url(${vbTop}), url(${vbBottom}), url(${vbMid})`,
//           backgroundSize: "100% auto, 100% auto, 100% 100%",
//           backgroundPosition: "top center, bottom center, center",
//           backgroundRepeat: "no-repeat, no-repeat, no-repeat",
//         }}
//       >
//         {/* faint VVCMC emblem watermark, lower right — same as the ID card */}
//         <img
//           src={vbWatermark}
//           alt=""
//           aria-hidden="true"
//           className="pointer-events-none absolute -right-[2%] bottom-[6%] z-0 w-[66%] select-none"
//         />
//
//         {/* ───────── HEADER ───────── */}
//         <div
//           className="relative flex items-center gap-3 pl-4 pr-14"
//           // style={{
//           //   aspectRatio: "3.3 / 1",
//           //   paddingBottom: "9%",
//           //   backgroundColor: "#0A7A44",
//           //   backgroundImage: `url(${banner})`,
//           //   backgroundSize: "100% 100%",
//           //   backgroundRepeat: "no-repeat",
//           // }}
//           // NEW: same green wave header artwork as the ID card (backbanner.png), top part only.
//           // Slightly zoomed + shifted so the artwork's own gold frame is cropped out
//           // (the card already has its own gold border).
//           // style={{
//           //   height: "106px",
//           //   paddingBottom: "24px",
//           //   backgroundColor: "#0A7A44",
//           //   backgroundImage: `url(${backbanner})`,
//           //   backgroundSize: "418px auto",
//           //   backgroundPosition: "-12px -11px",
//           //   backgroundRepeat: "no-repeat",
//           // }}
//           // NEW: the header artwork is now drawn by the background layer above (smooth fade, no seam)
//           style={{ height: "106px", paddingBottom: "24px" }}
//         >
//           <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-white p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
//             <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//           </div>
//
//           <div className="flex min-w-0 flex-col justify-center gap-[3px] leading-tight">
//             <p className="whitespace-nowrap text-[15.5px] font-semibold leading-[20px] text-white">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//             <p className="whitespace-nowrap text-[11.5px] font-semibold leading-tight text-white/95">
//               Vasai Virar City Municipal Corporation
//             </p>
//           </div>
//
//           {/* X (close) — top right */}
//           <Link
//             to="/vendors/list"
//             aria-label="Close"
//             className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-sm transition hover:bg-[#FFF8E6]"
//           >
//             <FiX size={18} strokeWidth={2.5} />
//           </Link>
//         </div>
//
//         {/* ───────── BODY ───────── */}
//         <div className="relative px-4 pb-5 pt-3">
//           {/* OLD plain emblem watermark — replaced by the artwork watermark layer above
//           <img
//             src={logo}
//             alt=""
//             aria-hidden="true"
//             className="pointer-events-none absolute left-1/2 top-[60%] w-[64%] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.07] mix-blend-multiply"
//           />
//           */}
//
//           <div className="relative z-10">
//             {/* Vendor Verified panel */}
//             <div
//               className={`mb-3.5 flex flex-col items-center rounded-2xl px-3 py-3.5 text-center ${
//                 valid ? "bg-[#E3F6EC] text-[#14803F]" : "bg-[#FDECEC] text-[#C0392B]"
//               }`}
//             >
//               <span
//                 className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-white ${
//                   valid ? "bg-[#1AA35B]" : "bg-[#D64545]"
//                 }`}
//               >
//                 {valid ? <FiCheck size={24} strokeWidth={3} /> : <FiX size={24} strokeWidth={3} />}
//               </span>
//               <p className="mt-1.5 text-[20px] font-bold leading-tight">{statusTitle}</p>
//               <p className="mt-0.5 text-[11.5px] font-medium opacity-90">{statusSub}</p>
//             </div>
//
//             {/* photo + name */}
//             <div className="flex items-center gap-3.5 pb-3">
//               <div className="h-[96px] w-[80px] shrink-0 overflow-hidden rounded-[8px] border-2 border-[#F0D48A] bg-white p-[2px]">
//                 <div className="h-full w-full overflow-hidden rounded-[6px] bg-white">
//                   {vendor.documents?.photo ? (
//                     <img
//                       src={vendor.documents.photo}
//                       alt={vendor.personal?.fullName}
//                       className="block h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="min-w-0">
//                 <p className="break-words text-[20px] font-bold leading-tight text-[#0f172a]">
//                   {vendor.personal?.fullName}
//                 </p>
//                 <p className="mt-0.5 break-all text-[12.5px] font-medium text-[#6B7A99]">{vendor.vendorId}</p>
//               </div>
//             </div>
//
//             <div className="h-px w-full bg-gradient-to-r from-[#C9A227]/60 via-[#D9BE68]/40 to-transparent" />
//
//             {/* details */}
//             <div>
//               {rows.map((r) => (
//                 <DetailRow key={r.en} icon={r.icon} mr={r.mr} en={r.en} value={r.value} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// // One detail row: round icon chip | Marathi + English label | : | value (dotted gold underline)
// function DetailRow({ icon: Icon, mr, en, value }) {
//   return (
//     <div className="flex items-center gap-2.5 border-b border-dotted border-[#C9A227]/50 py-[9px]">
//       <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#E5F0E9] text-[#0B6B3A]">
//         <Icon size={15} strokeWidth={2} />
//       </span>
//       <div className="w-[104px] shrink-0 leading-tight">
//         <p className="text-[12.5px] font-semibold leading-[16px] text-[#1e293b]">{mr}</p>
//         <p className="text-[10.5px] font-medium leading-[14px] text-[#64748b]">{en}</p>
//       </div>
//       <span className="text-[13px] font-medium text-[#94a3b8]">:</span>
//       <span className="min-w-0 flex-1 whitespace-normal break-words text-[13.5px] font-semibold leading-[18px] tabular-nums text-[#0f172a]">
//         {value || "-"}
//       </span>
//     </div>
//   );
// }
//
//

// ═════════════════════════════════════════════════════════════
//  NEW — responsive QR verification page
//  • small screens (mobile)  : single ID-card style card (unchanged design)
//  • web / large screens     : wide layout like the hand-drawn sketch
//                              (header, centred "Vendor Verified", photo + name on the left,
//                               details in two columns)
//  "Vendor Verified" block: background removed and shifted 12px up.
// ═════════════════════════════════════════════════════════════
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiCheck,
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiX,
  FiUser,
  FiFileText,
  FiAward,
  FiPhone,
  FiCalendar,
  FiShoppingBag,
  FiMapPin,
  FiClock,
  FiMap,
  FiBriefcase,
  FiHome,
} from "react-icons/fi";
import Card from "../../../components/ui/Card";
import { verifyCertificateByApplicationNo } from "../../../services/vendorApplicationService";
import logo from "../../../assets/logovvcmc.jpg";
// import banner from "../../../assets/banner1.png"; // old header banner (kept, not used now)
import backbanner from "../../../assets/backbanner.png"; // same artwork as the ID card

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// design width of the small-screen card; on smaller screens the whole card is scaled down to fit
const CARD_W_PX = 400;
// from this width up the wide (web) layout is used
const WIDE_QUERY = "(min-width: 768px)";

export default function QRVerification() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [vendor, setVendor] = useState(null);
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scale, setScale] = useState(1);
  const [isWide, setIsWide] = useState(
    () => typeof window !== "undefined" && window.matchMedia(WIDE_QUERY).matches
  );

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

  // Same Poppins + Noto Sans Devanagari fonts the ID card uses (same element id → loaded only once)
  useEffect(() => {
    if (document.getElementById("smartcard-poppins-font")) return;
    const link = document.createElement("link");
    link.id = "smartcard-poppins-font";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  // Small screens: shrink the whole card (design unchanged) so it always fits the width
  useEffect(() => {
    const update = () => setScale(Math.min(1, (window.innerWidth - 24) / CARD_W_PX));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // small screen ↔ large screen switch
  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const onChange = (e) => setIsWide(e.matches);
    setIsWide(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const certificate = vendor?.certificate;
  const isExpired = vendor && !valid;

  const pageStyle = { background: "linear-gradient(135deg, #F7FBEF 0%, #E9F8F2 55%, #E4F2FB 100%)" };

  /* ---------- loading ---------- */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
        <Card className="w-full max-w-sm">
          <div className="flex flex-col items-center rounded-2xl bg-ink-50 py-6 text-ink-500">
            <FiLoader size={28} className="animate-spin" />
            <p className="mt-1.5 text-sm font-bold">Verifying...</p>
          </div>
        </Card>
      </div>
    );
  }

  /* ---------- not found / invalid ---------- */
  if (!vendor) {
    return (
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10" style={pageStyle}>
        <Link
          to="/vendors/list"
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-md"
        >
          <FiX size={18} />
        </Link>
        <Card className="w-full max-w-sm">
          <div className="mb-5 flex flex-col items-center rounded-2xl bg-danger-100 py-4 text-danger-500">
            <FiXCircle size={28} />
            <p className="mt-1.5 text-sm font-bold">Not a Verified Vendor</p>
          </div>
          <p className="text-center text-sm text-ink-500">{errorMessage || "No vendor found for this QR code."}</p>
        </Card>
      </div>
    );
  }

  /* ---------- every detail that was on the old verification page ---------- */
  const rows = [
    { icon: FiFileText, mr: "अर्ज क्रमांक", en: "Application No.", value: vendor.applicationNo },
    ...(certificate?.certificateNo
      ? [{ icon: FiAward, mr: "ओळखपत्र क्रमांक", en: "Certificate No.", value: certificate.certificateNo }]
      : []),
    { icon: FiUser, mr: "लिंग", en: "Gender", value: genderLabel(vendor.personal?.gender) },
    { icon: FiPhone, mr: "मोबाईल क्रमांक", en: "Mobile No.", value: vendor.personal?.mobile || "-" },
    { icon: FiCalendar, mr: "जन्मतारीख / वय", en: "Date of Birth / Age", value: dobWithAge(vendor.personal?.dob) },
    { icon: FiShoppingBag, mr: "व्यवसायाचा प्रकार", en: "Business Type", value: vendor.business?.businessType || "-" },
    { icon: FiMapPin, mr: "व्यवसायाचे ठिकाण", en: "Business Place", value: vendor.business?.businessPlace || "-" },
    { icon: FiClock, mr: "व्यवसायाची वेळ", en: "Business Timing", value: vendor.business?.businessTiming || "-" },
    {
      icon: FiMap,
      mr: "प्रभाग / ward",
      en: "Ward / Zone",
      value: `${vendor.address?.ward || vendor.ward || "-"} / ${vendor.address?.zone || "-"}`,
    },
    ...(certificate
      ? [
          { icon: FiCalendar, mr: "जारी दिनांक", en: "Issue Date", value: formatDate(certificate.issueDate) },
          { icon: FiCalendar, mr: "वैधता", en: "Valid Till", value: formatDate(certificate.validTill) },
        ]
      : []),
    { icon: FiCheckCircle, mr: "स्थिती", en: "Status", value: vendor.status },
    { icon: FiBriefcase, mr: "व्यवसायाचा पत्ता", en: "Business Address", value: vendor.address?.workingAddress || "-" },
    { icon: FiHome, mr: "निवासी पत्ता", en: "Residential Address", value: vendor.address?.permanentAddress || "-" },
  ];

  const statusTitle = valid ? "Vendor Verified" : isExpired ? "Certificate Expired" : "Not a Verified Vendor";
  const statusSub = valid
    ? "Vendor details have been verified successfully."
    : "This certificate is not valid.";

  /* ═════════════ WEB / LARGE SCREENS — layout like the hand-drawn sketch ═════════════ */
  if (isWide) {
    const byLabel = Object.fromEntries(rows.map((r) => [r.en, r]));
    const pick = (labels) => labels.map((l) => byLabel[l]).filter(Boolean);

    // left column (under the photo + name) and right column, as in the sketch
    const leftRows = pick([
      "Application No.",
      "Certificate No.",
      "Gender",
      "Mobile No.",
      "Date of Birth / Age",
      "Business Address",
    ]);
    const rightRows = pick([
      "Business Type",
      "Business Place",
      "Business Timing",
      "Ward / Zone",
      "Issue Date",
      "Valid Till",
      "Status",
      "Residential Address",
    ]);

    return (
      <div className="flex min-h-screen items-start justify-center px-6 py-10" style={pageStyle}>
        <div
          // className="relative w-full max-w-[1000px] overflow-hidden rounded-[22px] border-[3px] border-[#E3B448] bg-[#FEFDFB] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"
          className="relative w-[80%] overflow-hidden rounded-[22px] border-[3px] border-[#E3B448] bg-[#FEFDFB] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"
          style={{ fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif" }}
        >
          {/* ID-card artwork: green wave header (stretched to the wide card) + faint emblem watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-0 z-0"
            style={{
              height: "240px",
              backgroundImage: `url(${backbanner})`,
              backgroundSize: "106.2% 675px",
              backgroundPosition: "50% -11px",
              backgroundRepeat: "no-repeat",
              WebkitMaskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[3%] right-[2%] z-0"
            style={{
              width: "350px",
              height: "305px",
              backgroundImage: `url(${backbanner})`,
              backgroundSize: "582px auto",
              backgroundPosition: "-215px -260px",
              backgroundRepeat: "no-repeat",
              WebkitMaskImage: "radial-gradient(ellipse closest-side, #000 55%, transparent 100%)",
              maskImage: "radial-gradient(ellipse closest-side, #000 55%, transparent 100%)",
            }}
          />

          {/* ───────── HEADER (same as the small-screen card: logo, names, X) ───────── */}
          <div
            className="relative flex items-center gap-5 pl-8 pr-24"
            style={{ height: "150px", paddingBottom: "34px" }}
          >
            <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-white p-[4px] shadow-[0_0_0_2px_#C9A227]">
              <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
            </div>

            <div className="flex min-w-0 flex-col justify-center gap-1 leading-tight">
              <p className="whitespace-nowrap text-[27px] font-semibold leading-[34px] text-white">
                वसई-विरार शहर महानगरपालिका
              </p>
              <p className="whitespace-nowrap text-[15.5px] font-semibold leading-tight text-white/95">
                Vasai Virar City Municipal Corporation
              </p>
            </div>

            {/* X (close) — top right */}
            <Link
              to="/vendors/list"
              aria-label="Close"
              className="absolute right-5 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-sm transition hover:bg-[#FFF8E6]"
            >
              <FiX size={20} strokeWidth={2.5} />
            </Link>
          </div>

          {/* ───────── BODY ───────── */}
          <div className="relative z-10 px-10 pb-10 pt-2">
            {/* Vendor Verified — no background box, centred */}
            <div
              className={`-mt-3 mb-6 flex flex-col items-center px-3 py-2 text-center ${
                valid ? "text-[#14803F]" : "text-[#C0392B]"
              }`}
            >
              <span
                className={`flex h-[46px] w-[46px] items-center justify-center rounded-full text-white ${
                  valid ? "bg-[#1AA35B]" : "bg-[#D64545]"
                }`}
              >
                {valid ? <FiCheck size={28} strokeWidth={3} /> : <FiX size={28} strokeWidth={3} />}
              </span>
              <p className="mt-2 text-[26px] font-bold leading-tight">{statusTitle}</p>
              <p className="mt-0.5 text-[14px] font-medium opacity-90">{statusSub}</p>
            </div>

            {/* two columns, paired row by row so every separator line lines up horizontally
                (left[i] sits exactly beside right[i + 2]; the first two right rows sit beside the photo) */}
            <div className="grid grid-cols-2 gap-x-14">
              {/* row 1 — LEFT: photo + name */}
              <div>
                <div className="flex items-center gap-5 pb-4">
                  <div className="h-[132px] w-[110px] shrink-0 overflow-hidden rounded-[10px] border-2 border-[#F0D48A] bg-white p-[3px]">
                    <div className="h-full w-full overflow-hidden rounded-[7px] bg-white">
                      {vendor.documents?.photo ? (
                        <img
                          src={vendor.documents.photo}
                          alt={vendor.personal?.fullName}
                          className="block h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
                          <FiUser size={44} strokeWidth={1.2} className="text-[#cbd5e1]" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="break-words text-[26px] font-bold leading-tight text-[#0f172a]">
                      {vendor.personal?.fullName}
                    </p>
                    <p className="mt-1 break-all text-[14px] font-medium text-[#6B7A99]">{vendor.vendorId}</p>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-[#C9A227]/60 via-[#D9BE68]/40 to-transparent" />
              </div>

              {/* row 1 — RIGHT: first two details, bottom-aligned with the divider under the photo */}
              <div className="self-end">
                {rightRows.slice(0, 2).map((r) => (
                  <DetailRow key={r.en} icon={r.icon} mr={r.mr} en={r.en} value={r.value} wide />
                ))}
              </div>

              {/* remaining rows: one left + one right per grid row → always the same height / line */}
              {Array.from({ length: Math.max(leftRows.length, rightRows.length - 2) }).flatMap((_, i) => {
                const l = leftRows[i];
                const r = rightRows[i + 2];
                return [
                  l ? (
                    <DetailRow key={`l-${l.en}`} icon={l.icon} mr={l.mr} en={l.en} value={l.value} wide />
                  ) : (
                    <div key={`l-empty-${i}`} />
                  ),
                  r ? (
                    <DetailRow key={`r-${r.en}`} icon={r.icon} mr={r.mr} en={r.en} value={r.value} wide />
                  ) : (
                    <div key={`r-empty-${i}`} />
                  ),
                ];
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ═════════════ SMALL SCREENS (mobile) — single card, design unchanged ═════════════ */
  return (
    <div className="flex min-h-screen items-start justify-center px-3 py-8" style={pageStyle}>
      <div
        className="relative overflow-hidden rounded-[20px] border-[3px] border-[#E3B448] bg-[#FEFDFB] shadow-[0_6px_24px_rgba(11,93,48,0.18)]"
        style={{
          width: `${CARD_W_PX}px`,
          zoom: String(scale),
          fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
        }}
      >
        {/* ───────── ID-CARD BACKGROUND ARTWORK (same backbanner.png as the ID card) ─────────
            Layer 1: green wave header + soft swirl, fading out smoothly (no hard edge).
            Layer 2: the faint VVCMC emblem watermark (lower right, like the ID card).
            The artwork's own gold frame is cropped out (card has its own gold border). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 z-0"
          style={{
            height: "170px",
            backgroundImage: `url(${backbanner})`,
            backgroundSize: "418px auto",
            backgroundPosition: "-12px -11px",
            backgroundRepeat: "no-repeat",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, #000 0, #000 62%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 z-0"
          style={{
            top: "52%",
            height: "230px",
            backgroundImage: `url(${backbanner})`,
            backgroundSize: "418px auto",
            backgroundPosition: "-12px -187px",
            backgroundRepeat: "no-repeat",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%)",
          }}
        />

        {/* ───────── HEADER ───────── */}
        <div
          className="relative flex items-center gap-3 pl-4 pr-14"
          // the header artwork is drawn by the background layer above (smooth fade, no seam)
          style={{ height: "106px", paddingBottom: "24px" }}
        >
          <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-white p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
            <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
          </div>

          <div className="flex min-w-0 flex-col justify-center gap-[3px] leading-tight">
            <p className="whitespace-nowrap text-[15.5px] font-semibold leading-[20px] text-white">
              वसई-विरार शहर महानगरपालिका
            </p>
            <p className="whitespace-nowrap text-[11.5px] font-semibold leading-tight text-white/95">
              Vasai Virar City Municipal Corporation
            </p>
          </div>

          {/* X (close) — top right */}
          <Link
            to="/vendors/list"
            aria-label="Close"
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D9A93B] bg-white text-[#7A4A12] shadow-sm transition hover:bg-[#FFF8E6]"
          >
            <FiX size={18} strokeWidth={2.5} />
          </Link>
        </div>

        {/* ───────── BODY ───────── */}
        <div className="relative px-4 pb-5 pt-3">
          <div className="relative z-10">
            {/* Vendor Verified — background removed, shifted 12px up */}
            <div
              // className={`mb-3.5 flex flex-col items-center rounded-2xl px-3 py-3.5 text-center ${
              //   valid ? "bg-[#E3F6EC] text-[#14803F]" : "bg-[#FDECEC] text-[#C0392B]"
              // }`}
              className={`-mt-3 mb-3.5 flex flex-col items-center px-3 py-2 text-center ${
                valid ? "text-[#14803F]" : "text-[#C0392B]"
              }`}
            >
              <span
                className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-white ${
                  valid ? "bg-[#1AA35B]" : "bg-[#D64545]"
                }`}
              >
                {valid ? <FiCheck size={24} strokeWidth={3} /> : <FiX size={24} strokeWidth={3} />}
              </span>
              <p className="mt-1.5 text-[20px] font-bold leading-tight">{statusTitle}</p>
              <p className="mt-0.5 text-[11.5px] font-medium opacity-90">{statusSub}</p>
            </div>

            {/* photo + name */}
            <div className="flex items-center gap-3.5 pb-3">
              <div className="h-[96px] w-[80px] shrink-0 overflow-hidden rounded-[8px] border-2 border-[#F0D48A] bg-white p-[2px]">
                <div className="h-full w-full overflow-hidden rounded-[6px] bg-white">
                  {vendor.documents?.photo ? (
                    <img
                      src={vendor.documents.photo}
                      alt={vendor.personal?.fullName}
                      className="block h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
                      <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
                    </div>
                  )}
                </div>
              </div>
              <div className="min-w-0">
                <p className="break-words text-[20px] font-bold leading-tight text-[#0f172a]">
                  {vendor.personal?.fullName}
                </p>
                <p className="mt-0.5 break-all text-[12.5px] font-medium text-[#6B7A99]">{vendor.vendorId}</p>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-[#C9A227]/60 via-[#D9BE68]/40 to-transparent" />

            {/* details */}
            <div>
              {rows.map((r) => (
                <DetailRow key={r.en} icon={r.icon} mr={r.mr} en={r.en} value={r.value} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// One detail row: round icon chip | Marathi + English label | : | value (dotted gold underline)
// `wide` = bigger version used on web / large screens; default = the small-screen (mobile) size.
function DetailRow({ icon: Icon, mr, en, value, wide = false }) {
  return (
    <div
      className={`flex items-center border-b border-dotted border-[#C9A227]/50 ${
        wide ? "gap-3.5 py-[12px]" : "gap-2.5 py-[9px]"
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-[#E5F0E9] text-[#0B6B3A] ${
          wide ? "h-[38px] w-[38px]" : "h-[30px] w-[30px]"
        }`}
      >
        <Icon size={wide ? 18 : 15} strokeWidth={2} />
      </span>
      <div className={`shrink-0 leading-tight ${wide ? "w-[170px]" : "w-[104px]"}`}>
        <p
          className={`font-semibold text-[#1e293b] ${
            wide ? "text-[14.5px] leading-[19px]" : "text-[12.5px] leading-[16px]"
          }`}
        >
          {mr}
        </p>
        <p
          className={`font-medium text-[#64748b] ${
            wide ? "text-[12px] leading-[16px]" : "text-[10.5px] leading-[14px]"
          }`}
        >
          {en}
        </p>
      </div>
      <span className={`font-medium text-[#94a3b8] ${wide ? "text-[15px]" : "text-[13px]"}`}>:</span>
      <span
        className={`min-w-0 flex-1 whitespace-normal break-words font-semibold tabular-nums text-[#0f172a] ${
          wide ? "text-[15.5px] leading-[21px]" : "text-[13.5px] leading-[18px]"
        }`}
      >
        {value || "-"}
      </span>
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

// ── NEW helpers (added for the extra ID-card details) ──
function genderLabel(g) {
  if (!g) return "-";
  const v = String(g).toLowerCase();
  if (v === "male") return "Male";
  if (v === "female") return "Female";
  if (v === "other") return "Other";
  return g;
}

function dobWithAge(dob) {
  if (!dob) return "-";
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return "-";
  const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  // return age >= 0 ? `${formatDate(dob)} / ${age} yrs` : formatDate(dob);
    // return age >= 0 ? `${formatDate(dob)} / ${age} yrs` : formatDate(dob);
  return age >= 0 ? `${formatDate(dob)} / ${age} वर्षे` : formatDate(dob);
}

// Long-text row: label on top, value below (used for addresses)
function BlockRow({ label, value }) {
  return (
    <div className="text-xs">
      <span className="text-ink-500">{label}</span>
      <p className="mt-0.5 break-words font-semibold text-ink-900">{value || "-"}</p>
    </div>
  );
}