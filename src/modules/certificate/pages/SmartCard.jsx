// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.
// ========================================================= */

// function CardField({ label, value }) {
//   return (
//     <div className="flex items-baseline gap-1.5">
//       <span className="shrink-0 text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="shrink-0 text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span className="min-w-0 flex-1 truncate border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800">
//         {value || "\u00A0"}
//       </span>
//     </div>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== ACTIONS ==================== */

//   const handlePrint = () => window.print();
//   const handleDownloadPdf = () => window.print();

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     { label: "पत्ता", value: vendor.address.permanentAddress },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           className="smart-card relative mx-auto flex flex-col overflow-hidden"
//           style={{
//             width: "360px",
//             aspectRatio: "360 / 536",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
//             <h2 className="text-center text-[15px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-3 pt-3">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — top group ── */}
//           <div className="space-y-1 px-5 pb-2">
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} />
//             ))}
//           </div>

//           {/* ── Field list — bottom group ── */}
//           <div className="space-y-1 px-5 pb-2 pt-2">
//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-4 pt-2">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[10px] font-bold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* ================= PRINT CSS ================= */}
//       <style>{`
//         @media print {
//           /*
//             The card's content (logo, photo, QR, text) is all sized in
//             fixed px for a 360px-wide box. Printing at 80mm (~302px)
//             shrank the box but NOT the fixed-px content inside it, so
//             the content overflowed the box and spilled onto extra pages.
//             Fix: print at the real px-equivalent size (360px / 536px
//             converted to mm at 96dpi), plus a small buffer, so nothing
//             inside needs to reflow or overflow.
//           */
//           html,
//           body {
//             width: 100mm !important;
//             height: 148.9mm !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             background: #ffffff !important;
//           }

//           header,
//           aside,
//           nav,
//           .print\\:hidden {
//             display: none !important;
//           }

//           body * {
//             visibility: hidden;
//           }

//           .smart-card,
//           .smart-card * {
//             visibility: visible;
//           }

//           .smart-card {
//             position: relative !important;
//             width: 100mm !important;
//             height: 148.9mm !important;
//             max-width: none !important;
//             aspect-ratio: 360 / 536 !important;
//             margin: 0 !important;
//             border: 0 !important;
//             border-radius: 0 !important;
//             box-shadow: none !important;
//             overflow: hidden !important;
//             background-size: 100% 100% !important;
//             break-inside: avoid !important;
//             page-break-inside: avoid !important;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//           }

//           @page {
//             size: 100mm 148.9mm;
//             margin: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }



// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    `wrap` (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <div className={`flex gap-1.5 ${wrap ? "items-start" : "items-baseline"}`}>
//       <span className="shrink-0 text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="shrink-0 text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 flex-1 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </div>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== ACTIONS ==================== */

//   const handlePrint = () => window.print();
//   const handleDownloadPdf = () => window.print();

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           className="smart-card relative mx-auto flex flex-col overflow-hidden"
//           style={{
//             width: "360px",
//             aspectRatio: "360 / 536",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
//             <h2 className="text-center text-[15px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-3 pt-3">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — top group ── */}
//           <div className="space-y-1 px-5 pb-2">
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Field list — bottom group ── */}
//           <div className="space-y-1 px-5 pb-2 pt-2">
//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-4 pt-2">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[10px] font-bold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* ================= PRINT CSS ================= */}
//       <style>{`
//         @media print {
//           /*
//             The card's content (logo, photo, QR, text) is all sized in
//             fixed px for a 360px-wide box. Printing at 80mm (~302px)
//             shrank the box but NOT the fixed-px content inside it, so
//             the content overflowed the box and spilled onto extra pages.
//             Fix: print at the real px-equivalent size (360px / 536px
//             converted to mm at 96dpi), plus a small buffer, so nothing
//             inside needs to reflow or overflow.
//           */
//           html,
//           body {
//             width: 100mm !important;
//             height: 148.9mm !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             background: #ffffff !important;
//           }

//           header,
//           aside,
//           nav,
//           .print\\:hidden {
//             display: none !important;
//           }

//           body * {
//             visibility: hidden;
//           }

//           .smart-card,
//           .smart-card * {
//             visibility: visible;
//           }

//           .smart-card {
//             position: relative !important;
//             width: 100mm !important;
//             height: 148.9mm !important;
//             max-width: none !important;
//             aspect-ratio: 360 / 536 !important;
//             margin: 0 !important;
//             border: 0 !important;
//             border-radius: 0 !important;
//             box-shadow: none !important;
//             overflow: hidden !important;
//             background-size: 100% 100% !important;
//             break-inside: avoid !important;
//             page-break-inside: avoid !important;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//           }

//           @page {
//             size: 100mm 148.9mm;
//             margin: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    `wrap` (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <div className={`flex gap-1.5 ${wrap ? "items-start" : "items-baseline"}`}>
//       <span className="shrink-0 text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="shrink-0 text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 flex-1 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </div>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== ACTIONS ==================== */

//   const handlePrint = () => window.print();
//   const handleDownloadPdf = () => window.print();

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
//             <h2 className="text-center text-[15px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-3 pt-3">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — top group ── */}
//           <div className="space-y-1 px-5 pb-2">
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Field list — bottom group ── */}
//           <div className="space-y-1 px-5 pb-2 pt-2">
//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-4 pt-2">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[10px] font-bold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* ================= PRINT CSS ================= */}
//       <style>{`
//         @media print {
//           /*
//             The card's content (logo, photo, QR, text) is all sized in
//             fixed px for a 360px-wide box. Printing at 80mm (~302px)
//             shrank the box but NOT the fixed-px content inside it, so
//             the content overflowed the box and spilled onto extra pages.
//             Fix: print at the real px-equivalent size (360px / 536px
//             converted to mm at 96dpi), plus a small buffer, so nothing
//             inside needs to reflow or overflow.
//           */
//           html,
//           body {
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             background: #ffffff !important;
//           }

//           header,
//           aside,
//           nav,
//           .print\\:hidden {
//             display: none !important;
//           }

//           body * {
//             visibility: hidden;
//           }

//           .smart-card,
//           .smart-card * {
//             visibility: visible;
//           }

//           .smart-card {
//             position: relative !important;
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             max-width: none !important;
//             margin: 0 !important;
//             border: 0 !important;
//             border-radius: 0 !important;
//             box-shadow: none !important;
//             background-size: 100% 100% !important;
//             break-inside: avoid !important;
//             page-break-inside: avoid !important;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//           }

//           @page {
//             size: 100mm 148.9mm;
//             margin: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
//    3 plain grid cells (label / colon / value) straight into the parent's
//    grid (see the `grid` wrapper below in the component). Because every
//    field shares ONE grid, the browser auto-sizes the label column to the
//    width of the longest Marathi label ONCE, so every ":" across BOTH
//    field groups lines up in a single vertical line — no matter how short
//    or long each individual label is.

//    `wrap` (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== ACTIONS ==================== */

//   const handlePrint = () => window.print();
//   const handleDownloadPdf = () => window.print();

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-9">
//             <h2 className="text-center text-[15px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-3 pt-3">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — a single shared grid so every ":" lines up
//                perfectly across BOTH groups, regardless of label length.
//                (Previously each field was its own independent flex row,
//                so the colon position drifted with each label's length.) ── */}
//           <div
//             className="grid gap-y-[7px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             {/* thin spacer row between the two logical groups, replacing
//                 the old separate <div> wrappers around each group */}
//             <div className="col-span-3 h-1" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-4 pt-2">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[10px] font-bold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* ================= PRINT CSS ================= */}
//       <style>{`
//         @media print {
//           /*
//             The card's content (logo, photo, QR, text) is all sized in
//             fixed px for a 360px-wide box. Printing at 80mm (~302px)
//             shrank the box but NOT the fixed-px content inside it, so
//             the content overflowed the box and spilled onto extra pages.
//             Fix: print at the real px-equivalent size (360px / 536px
//             converted to mm at 96dpi), plus a small buffer, so nothing
//             inside needs to reflow or overflow.
//           */
//           html,
//           body {
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             background: #ffffff !important;
//           }

//           header,
//           aside,
//           nav,
//           .print\\:hidden {
//             display: none !important;
//           }

//           body * {
//             visibility: hidden;
//           }

//           .smart-card,
//           .smart-card * {
//             visibility: visible;
//           }

//           .smart-card {
//             position: relative !important;
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             max-width: none !important;
//             margin: 0 !important;
//             border: 0 !important;
//             border-radius: 0 !important;
//             box-shadow: none !important;
//             background-size: 100% 100% !important;
//             break-inside: avoid !important;
//             page-break-inside: avoid !important;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//           }

//           @page {
//             size: 100mm 148.9mm;
//             margin: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }



// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
//    3 plain grid cells (label / colon / value) straight into the parent's
//    grid (see the `grid` wrapper below in the component). Because every
//    field shares ONE grid, the browser auto-sizes the label column to the
//    width of the longest Marathi label ONCE, so every ":" across BOTH
//    field groups lines up in a single vertical line — no matter how short
//    or long each individual label is.

//    `wrap` (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== ACTIONS ==================== */

//   const handlePrint = () => window.print();
//   const handleDownloadPdf = () => window.print();

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-10">
//             <h2 className="text-center text-[15px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-3 pt-3">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — a single shared grid so every ":" lines up
//                perfectly across BOTH groups, regardless of label length.
//                (Previously each field was its own independent flex row,
//                so the colon position drifted with each label's length.) ── */}
//           <div
//             className="grid gap-y-[7px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             {/* thin spacer row between the two logical groups, replacing
//                 the old separate <div> wrappers around each group */}
//             <div className="col-span-3 h-1" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-4 pt-5">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* ================= PRINT CSS ================= */}
//       <style>{`
//         @media print {
//           /*
//             The card's content (logo, photo, QR, text) is all sized in
//             fixed px for a 360px-wide box. Printing at 80mm (~302px)
//             shrank the box but NOT the fixed-px content inside it, so
//             the content overflowed the box and spilled onto extra pages.
//             Fix: print at the real px-equivalent size (360px / 536px
//             converted to mm at 96dpi), plus a small buffer, so nothing
//             inside needs to reflow or overflow.
//           */
//           html,
//           body {
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             background: #ffffff !important;
//           }

//           header,
//           aside,
//           nav,
//           .print\\:hidden {
//             display: none !important;
//           }

//           body * {
//             visibility: hidden;
//           }

//           .smart-card,
//           .smart-card * {
//             visibility: visible;
//           }

//           .smart-card {
//             position: relative !important;
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             max-width: none !important;
//             margin: 0 !important;
//             border: 0 !important;
//             border-radius: 0 !important;
//             box-shadow: none !important;
//             background-size: 100% 100% !important;
//             break-inside: avoid !important;
//             page-break-inside: avoid !important;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//           }

//           @page {
//             size: 100mm 148.9mm;
//             margin: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
//    3 plain grid cells (label / colon / value) straight into the parent's
//    grid (see the `grid` wrapper below in the component). Because every
//    field shares ONE grid, the browser auto-sizes the label column to the
//    width of the longest Marathi label ONCE, so every ":" across BOTH
//    field groups lines up in a single vertical line — no matter how short
//    or long each individual label is.

//    `wrap` (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== ACTIONS ==================== */

//   const handlePrint = () => window.print();
//   const handleDownloadPdf = () => window.print();

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="print-root space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="print-card-wrap flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title — kept compact (mt-6) so the card doesn't grow
//                taller than it needs to and risk spilling onto a 2nd page ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
//             <h2 className="text-center text-[15px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-3 pt-3">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — a single shared grid so every ":" lines up
//                perfectly across BOTH groups, regardless of label length.
//                (Previously each field was its own independent flex row,
//                so the colon position drifted with each label's length.) ── */}
//           <div
//             className="grid gap-y-[7px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             {/* thin spacer row between the two logical groups, replacing
//                 the old separate <div> wrappers around each group */}
//             <div className="col-span-3 h-1" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-4 pt-3">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* ================= PRINT CSS ================= */}
//       <style>{`
//         @media print {
//           /*
//             The card's content (logo, photo, QR, text) is all sized in
//             fixed px for a 360px-wide box. Printing at 80mm (~302px)
//             shrank the box but NOT the fixed-px content inside it, so
//             the content overflowed the box and spilled onto extra pages.
//             Fix: print at the real px-equivalent size (360px / 536px
//             converted to mm at 96dpi), plus a small buffer, so nothing
//             inside needs to reflow or overflow.
//           */
//           html,
//           body {
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             background: #ffffff !important;
//           }

//           /* These ancestor wrappers are invisible in print but, since
//              visibility: hidden (used below) keeps an element's box in
//              the layout, their padding/gap were still eating into the
//              page's height budget and pushing the card onto a 2nd/3rd
//              blank page. Zeroing them out removes every last bit of that
//              leftover space. (Note: no backticks in this comment block,
//              since it lives inside a JS template literal below and a
//              backtick here would terminate that string early and break
//              the build - that was the previous bug.) */
//           .print-root,
//           .print-card-wrap {
//             margin: 0 !important;
//             padding: 0 !important;
//             gap: 0 !important;
//           }

//           header,
//           aside,
//           nav,
//           .print\\:hidden {
//             display: none !important;
//           }

//           body * {
//             visibility: hidden;
//           }

//           .smart-card,
//           .smart-card * {
//             visibility: visible;
//           }

//           .smart-card {
//             position: absolute !important;
//             top: 0 !important;
//             left: 0 !important;
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             max-width: none !important;
//             margin: 0 !important;
//             border: 0 !important;
//             border-radius: 0 !important;
//             box-shadow: none !important;
//             background-size: 100% 100% !important;
//             break-inside: avoid !important;
//             page-break-inside: avoid !important;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//           }

//           @page {
//             size: 100mm 148.9mm;
//             margin: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
//    3 plain grid cells (label / colon / value) straight into the parent's
//    grid (see the `grid` wrapper below in the component). Because every
//    field shares ONE grid, the browser auto-sizes the label column to the
//    width of the longest Marathi label ONCE, so every ":" across BOTH
//    field groups lines up in a single vertical line — no matter how short
//    or long each individual label is.

//    `wrap` (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== ACTIONS ==================== */

//   const handlePrint = () => window.print();
//   const handleDownloadPdf = () => window.print();

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="print-root space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="print-card-wrap flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title — kept compact (mt-6) so the card doesn't grow
//                taller than it needs to and risk spilling onto a 2nd page ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
//             <h2 className="text-center text-[15px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-3 pt-3">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — a single shared grid so every ":" lines up
//                perfectly across BOTH groups, regardless of label length.
//                (Previously each field was its own independent flex row,
//                so the colon position drifted with each label's length.) ── */}
//           <div
//             className="grid gap-y-[5px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             {/* thin spacer row between the two logical groups, replacing
//                 the old separate <div> wrappers around each group */}
//             <div className="col-span-3 h-1" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-3 pt-2">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* ================= PRINT CSS ================= */}
//       <style>{`
//         @media print {
//           /*
//             The card's content (logo, photo, QR, text) is all sized in
//             fixed px for a 360px-wide box. Printing at 80mm (~302px)
//             shrank the box but NOT the fixed-px content inside it, so
//             the content overflowed the box and spilled onto extra pages.
//             Fix: print at the real px-equivalent size (360px / 536px
//             converted to mm at 96dpi), plus a small buffer, so nothing
//             inside needs to reflow or overflow.
//           */
//           html,
//           body {
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             background: #ffffff !important;
//           }

//           /* These ancestor wrappers are invisible in print but, since
//              visibility: hidden (used below) keeps an element's box in
//              the layout, their padding/gap were still eating into the
//              page's height budget and pushing the card onto a 2nd/3rd
//              blank page. Zeroing them out removes every last bit of that
//              leftover space. (Note: no backticks in this comment block,
//              since it lives inside a JS template literal below and a
//              backtick here would terminate that string early and break
//              the build - that was the previous bug.) */
//           .print-root,
//           .print-card-wrap {
//             margin: 0 !important;
//             padding: 0 !important;
//             gap: 0 !important;
//           }

//           header,
//           aside,
//           nav,
//           .print\\:hidden {
//             display: none !important;
//           }

//           body * {
//             visibility: hidden;
//           }

//           .smart-card,
//           .smart-card * {
//             visibility: visible;
//           }

//           .smart-card {
//             position: relative !important;
//             top: auto !important;
//             left: auto !important;
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             max-width: none !important;
//             margin: 0 auto !important;
//             border: 0 !important;
//             border-radius: 0 !important;
//             box-shadow: none !important;
//             background-size: 100% 100% !important;
//             break-inside: avoid !important;
//             page-break-inside: avoid !important;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//           }

//           @page {
//             size: 100mm 148.9mm;
//             margin: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
//    3 plain grid cells (label / colon / value) straight into the parent's
//    grid (see the `grid` wrapper below in the component). Because every
//    field shares ONE grid, the browser auto-sizes the label column to the
//    width of the longest Marathi label ONCE, so every ":" across BOTH
//    field groups lines up in a single vertical line — no matter how short
//    or long each individual label is.

//    `wrap` (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== ACTIONS ==================== */

//   const handlePrint = () => window.print();
//   const handleDownloadPdf = () => window.print();

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="print-root space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="print-card-wrap flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title — kept compact (mt-6) so the card doesn't grow
//                taller than it needs to and risk spilling onto a 2nd page ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
//             <h2 className="text-center text-[15px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-3 pt-3">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — a single shared grid so every ":" lines up
//                perfectly across BOTH groups, regardless of label length.
//                (Previously each field was its own independent flex row,
//                so the colon position drifted with each label's length.) ── */}
//           <div
//             className="grid gap-y-[5px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             {/* thin spacer row between the two logical groups, replacing
//                 the old separate <div> wrappers around each group */}
//             <div className="col-span-3 h-1" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-3 pt-2">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* ================= PRINT CSS ================= */}
//       <style>{`
//         @media print {
//           /*
//             The card's content (logo, photo, QR, text) is all sized in
//             fixed px for a 360px-wide box. Printing at 80mm (~302px)
//             shrank the box but NOT the fixed-px content inside it, so
//             the content overflowed the box and spilled onto extra pages.
//             Fix: print at the real px-equivalent size (360px / 536px
//             converted to mm at 96dpi), plus a small buffer, so nothing
//             inside needs to reflow or overflow.
//           */
//           html,
//           body {
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             background: #ffffff !important;
//           }

//           /* These ancestor wrappers are invisible in print but, since
//              visibility: hidden (used below) keeps an element's box in
//              the layout, their padding/gap were still eating into the
//              page's height budget and pushing the card onto a 2nd/3rd
//              blank page. Zeroing them out removes every last bit of that
//              leftover space. (Note: no backticks in this comment block,
//              since it lives inside a JS template literal below and a
//              backtick here would terminate that string early and break
//              the build - that was the previous bug.) */
//           .print-root,
//           .print-card-wrap {
//             margin: 0 !important;
//             padding: 0 !important;
//             gap: 0 !important;
//           }

//           header,
//           aside,
//           nav,
//           .print\\:hidden {
//             display: none !important;
//           }

//           body * {
//             visibility: hidden;
//           }

//           .smart-card,
//           .smart-card * {
//             visibility: visible;
//           }

//           .smart-card {
//             position: relative !important;
//             top: auto !important;
//             left: auto !important;
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             max-width: none !important;
//             margin: 0 auto !important;
//             border: 0 !important;
//             border-radius: 0 !important;
//             box-shadow: none !important;
//             background-size: 100% 100% !important;
//             break-inside: avoid !important;
//             page-break-inside: avoid !important;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//           }

//           @page {
//             size: 100mm 148.9mm;
//             margin: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }



// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
//    3 plain grid cells (label / colon / value) straight into the parent's
//    grid (see the `grid` wrapper below in the component). Because every
//    field shares ONE grid, the browser auto-sizes the label column to the
//    width of the longest Marathi label ONCE, so every ":" across BOTH
//    field groups lines up in a single vertical line — no matter how short
//    or long each individual label is.

//    `wrap` (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== ACTIONS ==================== */

//   const handlePrint = () => window.print();
//   const handleDownloadPdf = () => window.print();

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="print-root space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="print-card-wrap flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title — kept compact (mt-6) so the card doesn't grow
//                taller than it needs to and risk spilling onto a 2nd page ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
//             <h2 className="text-center text-[15px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-3 pt-3">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — a single shared grid so every ":" lines up
//                perfectly across BOTH groups, regardless of label length.
//                (Previously each field was its own independent flex row,
//                so the colon position drifted with each label's length.) ── */}
//           <div
//             className="grid gap-y-[5px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             {/* thin spacer row between the two logical groups, replacing
//                 the old separate <div> wrappers around each group */}
//             <div className="col-span-3 h-1" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-3 pt-2">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* ================= PRINT CSS ================= */}
//       <style>{`
//         @media print {
//           /*
//             The card's content (logo, photo, QR, text) is all sized in
//             fixed px for a 360px-wide box. Printing at 100mm shrank the
//             box but earlier attempts let the card's height grow past a
//             single page, spilling content onto page 2.

//             Fix: pin the card to a fixed max-height that matches the
//             physical page, clip anything beyond it with overflow:
//             hidden, and apply a small scale-down transform so the
//             content comfortably fits inside that single page instead
//             of relying on the page itself growing to fit the content.
//           */
//           html,
//           body {
//             width: 100mm !important;
//             height: 148.9mm !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             background: #ffffff !important;
//             overflow: hidden !important;
//           }

//           /* These ancestor wrappers are invisible in print but, since
//              visibility: hidden (used below) keeps an element's box in
//              the layout, their padding/gap were still eating into the
//              page's height budget and pushing the card onto a 2nd/3rd
//              blank page. Zeroing them out removes every last bit of that
//              leftover space. (Note: no backticks in this comment block,
//              since it lives inside a JS template literal below and a
//              backtick here would terminate that string early and break
//              the build - that was the previous bug.) */
//           .print-root,
//           .print-card-wrap {
//             margin: 0 !important;
//             padding: 0 !important;
//             gap: 0 !important;
//             overflow: hidden !important;
//           }

//           header,
//           aside,
//           nav,
//           .print\\:hidden {
//             display: none !important;
//           }

//           body * {
//             visibility: hidden;
//           }

//           .smart-card,
//           .smart-card * {
//             visibility: visible;
//           }

//           .smart-card {
//             position: fixed !important;
//             top: 0 !important;
//             left: 50% !important;
//             width: 360px !important;
//             min-height: unset !important;
//             max-height: 536px !important;
//             max-width: none !important;
//             margin: 0 !important;
//             border: 0 !important;
//             border-radius: 0 !important;
//             box-shadow: none !important;
//             background-size: 100% 100% !important;
//             transform: translateX(-50%) scale(0.965);
//             transform-origin: top center;
//             break-inside: avoid !important;
//             page-break-inside: avoid !important;
//             overflow: hidden !important;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//           }

//           @page {
//             size: 100mm 148.9mm;
//             margin: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }



// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
//    3 plain grid cells (label / colon / value) straight into the parent's
//    grid (see the `grid` wrapper below in the component). Because every
//    field shares ONE grid, the browser auto-sizes the label column to the
//    width of the longest Marathi label ONCE, so every ":" across BOTH
//    field groups lines up in a single vertical line — no matter how short
//    or long each individual label is.

//    `wrap` (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== ACTIONS ==================== */

//   const handlePrint = () => window.print();
//   const handleDownloadPdf = () => window.print();

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="print-root space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="print-card-wrap flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title — kept compact (mt-6) so the card doesn't grow
//                taller than it needs to and risk spilling onto a 2nd page ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
//             <h2 className="text-center text-[13.5px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-2 pt-2">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — a single shared grid so every ":" lines up
//                perfectly across BOTH groups, regardless of label length.
//                (Previously each field was its own independent flex row,
//                so the colon position drifted with each label's length.) ── */}
//           <div
//             className="grid gap-y-[5px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             {/* thin spacer row between the two logical groups, replacing
//                 the old separate <div> wrappers around each group */}
//             <div className="col-span-3 h-0.5" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-3 pt-2">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* ================= PRINT CSS ================= */}
//       <style>{`
//         @media print {
//           /*
//             The card's content (logo, photo, QR, text) is all sized in
//             fixed px for a 360px-wide box. Printing at 80mm (~302px)
//             shrank the box but NOT the fixed-px content inside it, so
//             the content overflowed the box and spilled onto extra pages.
//             Fix: print at the real px-equivalent size (360px / 536px
//             converted to mm at 96dpi), plus a small buffer, so nothing
//             inside needs to reflow or overflow.
//           */
//           html,
//           body {
//             width: 100mm !important;
//             min-height: 155mm !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             background: #ffffff !important;
//           }

//           /* These ancestor wrappers are invisible in print but, since
//              visibility: hidden (used below) keeps an element's box in
//              the layout, their padding/gap were still eating into the
//              page's height budget and pushing the card onto a 2nd/3rd
//              blank page. Zeroing them out removes every last bit of that
//              leftover space. (Note: no backticks in this comment block,
//              since it lives inside a JS template literal below and a
//              backtick here would terminate that string early and break
//              the build - that was the previous bug.) */
//           .print-root,
//           .print-card-wrap {
//             margin: 0 !important;
//             padding: 0 !important;
//             gap: 0 !important;
//           }

//           header,
//           aside,
//           nav,
//           .print\\:hidden {
//             display: none !important;
//           }

//           body * {
//             visibility: hidden;
//           }

//           .smart-card,
//           .smart-card * {
//             visibility: visible;
//           }

//           .smart-card {
//             position: relative !important;
//             top: auto !important;
//             left: auto !important;
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             max-width: none !important;
//             margin: 0 auto !important;
//             border: 0 !important;
//             border-radius: 0 !important;
//             box-shadow: none !important;
//             background-size: 100% 100% !important;
//             break-inside: avoid !important;
//             page-break-inside: avoid !important;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//           }

//           @page {
//             size: 100mm 148.9mm;
//             margin: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
//    3 plain grid cells (label / colon / value) straight into the parent's
//    grid (see the `grid` wrapper below in the component). Because every
//    field shares ONE grid, the browser auto-sizes the label column to the
//    width of the longest Marathi label ONCE, so every ":" across BOTH
//    field groups lines up in a single vertical line — no matter how short
//    or long each individual label is.

//    `wrap` (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== ACTIONS ==================== */

//   const handlePrint = () => window.print();
//   const handleDownloadPdf = () => window.print();

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="print-root space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="print-card-wrap flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title — kept compact (mt-6) so the card doesn't grow
//                taller than it needs to and risk spilling onto a 2nd page ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
//             <h2 className="text-center text-[13.5px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-2 pt-2">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — a single shared grid so every ":" lines up
//                perfectly across BOTH groups, regardless of label length.
//                (Previously each field was its own independent flex row,
//                so the colon position drifted with each label's length.) ── */}
//           <div
//             className="grid gap-y-[5px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             {/* thin spacer row between the two logical groups, replacing
//                 the old separate <div> wrappers around each group */}
//             <div className="col-span-3 h-0.5" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-3 pt-2">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* ================= PRINT CSS ================= */}
//       <style>{`
//         @media print {
//           /*
//             The card's content (logo, photo, QR, text) is all sized in
//             fixed px for a 360px-wide box. Printing at 80mm (~302px)
//             shrank the box but NOT the fixed-px content inside it, so
//             the content overflowed the box and spilled onto extra pages.
//             Fix: print at the real px-equivalent size (360px / 536px
//             converted to mm at 96dpi), plus a small buffer, so nothing
//             inside needs to reflow or overflow.
//           */
//           html,
//           body {
//             width: 100mm !important;
//             min-height: 155mm !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             background: #ffffff !important;
//           }

//           /* These ancestor wrappers are invisible in print but, since
//              visibility: hidden (used below) keeps an element's box in
//              the layout, their padding/gap were still eating into the
//              page's height budget and pushing the card onto a 2nd/3rd
//              blank page. Zeroing them out removes every last bit of that
//              leftover space. (Note: no backticks in this comment block,
//              since it lives inside a JS template literal below and a
//              backtick here would terminate that string early and break
//              the build - that was the previous bug.) */
//           .print-root,
//           .print-card-wrap {
//             margin: 0 !important;
//             padding: 0 !important;
//             gap: 0 !important;
//           }

//           header,
//           aside,
//           nav,
//           .print\\:hidden {
//             display: none !important;
//           }

//           body * {
//             visibility: hidden;
//           }

//           .smart-card,
//           .smart-card * {
//             visibility: visible;
//           }

//           .smart-card {
//             position: relative !important;
//             top: auto !important;
//             left: auto !important;
//             width: 100mm !important;
//             min-height: 148.9mm !important;
//             max-width: none !important;
//             margin: 0 auto !important;
//             border: 0 !important;
//             border-radius: 0 !important;
//             box-shadow: none !important;
//             background-size: 100% 100% !important;
//             break-inside: avoid !important;
//             page-break-inside: avoid !important;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//           }

//           @page {
//             size: 100mm 148.9mm;
//             margin: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }




// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
//    3 plain grid cells (label / colon / value) straight into the parent's
//    grid (see the grid wrapper below in the component). Because every
//    field shares ONE grid, the browser auto-sizes the label column to the
//    width of the longest Marathi label ONCE, so every ":" across BOTH
//    field groups lines up in a single vertical line — no matter how short
//    or long each individual label is.

//    wrap (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== ACTIONS ==================== */

//   const handlePrint = () => window.print();
//   const handleDownloadPdf = () => window.print();

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="print-root space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="print-card-wrap flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title — kept compact (mt-4) so the card doesn't grow
//                taller than it needs to and risk spilling onto a 2nd page ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-4">
//             <h2 className="text-center text-[13.5px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-2 pt-2">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — a single shared grid so every ":" lines up
//                perfectly across BOTH groups, regardless of label length.
//                (Previously each field was its own independent flex row,
//                so the colon position drifted with each label's length.) ── */}
//           <div
//             className="grid gap-y-[5px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             {/* thin spacer row between the two logical groups, replacing
//                 the old separate <div> wrappers around each group */}
//             <div className="col-span-3 h-0.5" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-2 pt-1">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* ================= PRINT CSS ================= */}
//       <style>{`
//         @media print {
//           /*
//             The card's content (logo, photo, QR, text) is all sized in
//             fixed px for a 360px-wide box. Printing at 80mm (~302px)
//             shrank the box but NOT the fixed-px content inside it, so
//             the content overflowed the box and spilled onto extra pages.
//             Fix: print at the real px-equivalent size (360px / 536px
//             converted to mm at 96dpi), plus a small buffer, so nothing
//             inside needs to reflow or overflow.
//           */
//           html,
//           body {
//             width: 100mm !important;
//             min-height: 160mm !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             background: #ffffff !important;
//           }

//           /* These ancestor wrappers are invisible in print but, since
//              visibility: hidden (used below) keeps an element's box in
//              the layout, their padding/gap were still eating into the
//              page's height budget and pushing the card onto a 2nd/3rd
//              blank page. Zeroing them out removes every last bit of that
//              leftover space. Reminder to self: no backtick characters
//              anywhere in these CSS comments, since this whole block is a
//              JS template literal and a stray backtick ends the string
//              early and breaks the build. Use plain quotes only. */
//           .print-root,
//           .print-card-wrap {
//             margin: 0 !important;
//             padding: 0 !important;
//             gap: 0 !important;
//           }

//           header,
//           aside,
//           nav,
//           .print\\:hidden {
//             display: none !important;
//           }

//           body * {
//             visibility: hidden;
//           }

//           .smart-card,
//           .smart-card * {
//             visibility: visible;
//           }

//           .smart-card {
//             position: relative !important;
//             top: auto !important;
//             left: auto !important;
//             display: block !important;
//             width: 100mm !important;
//             min-height: 160mm !important;
//             max-width: none !important;
//             margin: 0 auto !important;
//             border: 0 !important;
//             border-radius: 0 !important;
//             box-shadow: none !important;
//             background-size: 100% 100% !important;
//             break-inside: avoid !important;
//             page-break-inside: avoid !important;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//           }

//           /* Chrome ignores break-inside: avoid on flex containers (a
//              long-standing bug), which let the on-screen flex-column
//              smart-card split mid-child across pages. Forcing display:
//              block above sidesteps that bug entirely. The trade-off is
//              that block layout does not support the flex mt-auto trick
//              that normally pins the footer to the bottom of the card,
//              so we give the footer a plain top margin instead, and only
//              for print. */
//           .smart-card > div:last-child {
//             margin-top: 12px !important;
//           }

//           @page {
//             size: 100mm 160mm;
//             margin: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


// import { useEffect, useMemo, useRef, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
//    3 plain grid cells (label / colon / value) straight into the parent's
//    grid (see the grid wrapper below in the component). Because every
//    field shares ONE grid, the browser auto-sizes the label column to the
//    width of the longest Marathi label ONCE, so every ":" across BOTH
//    field groups lines up in a single vertical line — no matter how short
//    or long each individual label is.

//    wrap (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();
//   const cardRef = useRef(null);
//   const [isExporting, setIsExporting] = useState(false);

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== IMAGE-BASED PRINT / DOWNLOAD ====================
//      The card is captured as a single flattened image (via html2canvas)
//      instead of relying on the live DOM for printing. Chrome's print
//      pagination engine repeatedly and unpredictably split the live card
//      across two pages (a known, long-standing bug with break-inside:
//      avoid on flex/complex layouts, especially with a real printer
//      selected rather than "Save as PDF"). A flattened image has no
//      text/flow for the print engine to fragment, so it always renders
//      as exactly one page, at the exact size we specify, matching the
//      on-screen design pixel for pixel. */

//   const CARD_WIDTH_MM = 100; // physical print width; height is derived
//   // from the captured image's own aspect ratio, so it always matches
//   // whatever the on-screen card actually rendered (including a
//   // wrapped, multi-line address).

//   const captureCardCanvas = async () => {
//     if (!cardRef.current) return null;
//     return html2canvas(cardRef.current, {
//       scale: 3, // high-res so print/PDF output stays crisp
//       useCORS: true,
//       backgroundColor: "#ffffff",
//     });
//   };

//   const handlePrint = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const canvas = await captureCardCanvas();
//       if (!canvas) return;
//       const imgData = canvas.toDataURL("image/png");
//       const heightMm = (canvas.height / canvas.width) * CARD_WIDTH_MM;

//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Card.");
//         return;
//       }
//       printWindow.document.write(
//         "<html><head><title>Smart Card</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + heightMm + "mm; margin: 0; }" +
//           "html, body { margin: 0; padding: 0; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + heightMm + "mm; }" +
//           "</style></head><body><img src=\"" + imgData + "\" /></body></html>"
//       );
//       printWindow.document.close();
//       printWindow.onload = () => {
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//       };
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   const handleDownloadPdf = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const canvas = await captureCardCanvas();
//       if (!canvas) return;
//       const imgData = canvas.toDataURL("image/png");
//       const heightMm = (canvas.height / canvas.width) * CARD_WIDTH_MM;

//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, heightMm],
//       });
//       pdf.addImage(imgData, "PNG", 0, 0, CARD_WIDTH_MM, heightMm);
//       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf} disabled={isExporting}>
//             {isExporting ? "Preparing..." : "Download"}
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint} disabled={isExporting}>
//             {isExporting ? "Preparing..." : "Print"}
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           ref={cardRef}
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-4">
//             <h2 className="text-center text-[13.5px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-2 pt-2">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — a single shared grid so every ":" lines up
//                perfectly across BOTH groups, regardless of label length ── */}
//           <div
//             className="grid gap-y-[5px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             {/* thin spacer row between the two logical groups */}
//             <div className="col-span-3 h-0.5" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-2 pt-1">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useMemo, useRef, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
//    3 plain grid cells (label / colon / value) straight into the parent's
//    grid (see the grid wrapper below in the component). Because every
//    field shares ONE grid, the browser auto-sizes the label column to the
//    width of the longest Marathi label ONCE, so every ":" across BOTH
//    field groups lines up in a single vertical line — no matter how short
//    or long each individual label is.

//    wrap (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();
//   const cardRef = useRef(null);
//   const [isExporting, setIsExporting] = useState(false);

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== IMAGE-BASED PRINT / DOWNLOAD ====================
//      The card is captured as a single flattened image (via html2canvas)
//      instead of relying on the live DOM for printing. Chrome's print
//      pagination engine repeatedly and unpredictably split the live card
//      across two pages (a known, long-standing bug with break-inside:
//      avoid on flex/complex layouts, especially with a real printer
//      selected rather than "Save as PDF"). A flattened image has no
//      text/flow for the print engine to fragment, so it always renders
//      as exactly one page, at the exact size we specify, matching the
//      on-screen design pixel for pixel. */

//   const CARD_WIDTH_MM = 100; // physical print width; height is derived
//   // from the captured image's own aspect ratio, so it always matches
//   // whatever the on-screen card actually rendered (including a
//   // wrapped, multi-line address).

//   const captureCardCanvas = async () => {
//     if (!cardRef.current) return null;
//     return html2canvas(cardRef.current, {
//       scale: 3, // high-res so print/PDF output stays crisp
//       useCORS: true,
//       backgroundColor: "#ffffff",
//     });
//   };

//   const handlePrint = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const canvas = await captureCardCanvas();
//       if (!canvas) return;
//       const imgData = canvas.toDataURL("image/png");
//       const heightMm = (canvas.height / canvas.width) * CARD_WIDTH_MM;

//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Card.");
//         return;
//       }
//       printWindow.document.write(
//         "<html><head><title>Smart Card</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + heightMm + "mm; margin: 0; }" +
//           "html, body { margin: 0; padding: 0; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + heightMm + "mm; }" +
//           "</style></head><body><img src=\"" + imgData + "\" /></body></html>"
//       );
//       printWindow.document.close();
//       printWindow.onload = () => {
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//       };
//     } catch (err) {
//       console.error("Smart card print failed:", err);
//       window.alert("Print failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   const handleDownloadPdf = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const canvas = await captureCardCanvas();
//       if (!canvas) return;
//       const imgData = canvas.toDataURL("image/png");
//       const heightMm = (canvas.height / canvas.width) * CARD_WIDTH_MM;

//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, heightMm],
//       });
//       pdf.addImage(imgData, "PNG", 0, 0, CARD_WIDTH_MM, heightMm);
//       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
//     } catch (err) {
//       console.error("Smart card download failed:", err);
//       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf} disabled={isExporting}>
//             {isExporting ? "Preparing..." : "Download"}
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint} disabled={isExporting}>
//             {isExporting ? "Preparing..." : "Print"}
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           ref={cardRef}
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-4">
//             <h2 className="text-center text-[13.5px] font-extrabold leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-2 pt-2">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — a single shared grid so every ":" lines up
//                perfectly across BOTH groups, regardless of label length ── */}
//           <div
//             className="grid gap-y-[5px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             {/* thin spacer row between the two logical groups */}
//             <div className="col-span-3 h-0.5" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-2 pt-1">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useMemo, useRef, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
//    3 plain grid cells (label / colon / value) straight into the parent's
//    grid (see the grid wrapper below in the component). Because every
//    field shares ONE grid, the browser auto-sizes the label column to the
//    width of the longest Marathi label ONCE, so every ":" across BOTH
//    field groups lines up in a single vertical line — no matter how short
//    or long each individual label is.

//    wrap (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">{label}</span>
//       <span className="text-[10.5px] font-semibold text-[#1E1E1E]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();
//   const cardRef = useRef(null);
//   const [isExporting, setIsExporting] = useState(false);

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== IMAGE-BASED PRINT / DOWNLOAD ====================
//      The card is captured as a single flattened image (via html2canvas)
//      instead of relying on the live DOM for printing. Chrome's print
//      pagination engine repeatedly and unpredictably split the live card
//      across two pages (a known, long-standing bug with break-inside:
//      avoid on flex/complex layouts, especially with a real printer
//      selected rather than "Save as PDF"). A flattened image has no
//      text/flow for the print engine to fragment, so it always renders
//      as exactly one page, at the exact size we specify, matching the
//      on-screen design pixel for pixel. */

//   const CARD_WIDTH_MM = 100; // physical print width; height is derived
//   // from the captured image's own aspect ratio, so it always matches
//   // whatever the on-screen card actually rendered (including a
//   // wrapped, multi-line address).

//   const captureCardCanvas = async () => {
//     if (!cardRef.current) return null;
//     return html2canvas(cardRef.current, {
//       scale: 3, // high-res so print/PDF output stays crisp
//       useCORS: true,
//       backgroundColor: "#ffffff",
//     });
//   };

//   const handlePrint = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const canvas = await captureCardCanvas();
//       if (!canvas) return;
//       const imgData = canvas.toDataURL("image/png");
//       const heightMm = (canvas.height / canvas.width) * CARD_WIDTH_MM;

//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Card.");
//         return;
//       }
//       printWindow.document.write(
//         "<html><head><title>Smart Card</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + heightMm + "mm; margin: 0; }" +
//           "html, body { margin: 0; padding: 0; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + heightMm + "mm; }" +
//           "</style></head><body><img src=\"" + imgData + "\" /></body></html>"
//       );
//       printWindow.document.close();
//       printWindow.onload = () => {
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//       };
//     } catch (err) {
//       console.error("Smart card print failed:", err);
//       window.alert("Print failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   const handleDownloadPdf = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const canvas = await captureCardCanvas();
//       if (!canvas) return;
//       const imgData = canvas.toDataURL("image/png");
//       const heightMm = (canvas.height / canvas.width) * CARD_WIDTH_MM;

//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, heightMm],
//       });
//       pdf.addImage(imgData, "PNG", 0, 0, CARD_WIDTH_MM, heightMm);
//       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
//     } catch (err) {
//       console.error("Smart card download failed:", err);
//       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf} disabled={isExporting}>
//             {isExporting ? "Preparing..." : "Download"}
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint} disabled={isExporting}>
//             {isExporting ? "Preparing..." : "Print"}
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           ref={cardRef}
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
//             <h2 className="text-center text-[13.5px] font-black leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-1 pt-2">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — a single shared grid so every ":" lines up
//                perfectly across BOTH groups, regardless of label length ── */}
//           <div
//             className="grid gap-y-[5px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             {/* thin spacer row between the two logical groups */}
//             <div className="col-span-3 h-0" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-2 pt-1">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useMemo, useRef, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   // guard against bad/future dates instead of showing a negative number
//   return age >= 0 ? age : "-";
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }

// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }


// /* =========================================================
//    ONE LABELLED FIELD ROW — "label : ____value____" with a
//    dotted underline, matching the reference card exactly.

//    ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
//    3 plain grid cells (label / colon / value) straight into the parent's
//    grid (see the grid wrapper below in the component). Because every
//    field shares ONE grid, the browser auto-sizes the label column to the
//    width of the longest Marathi label ONCE, so every ":" across BOTH
//    field groups lines up in a single vertical line — no matter how short
//    or long each individual label is.

//    wrap (optional): when true, the value is allowed to wrap
//    onto multiple lines instead of being truncated with an
//    ellipsis. Used for long fields like the address, where
//    cutting the text hides information the officer needs to see.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[10.5px] font-bold text-[#B9861C]">{label}</span>
//       <span className="text-[10.5px] font-bold text-[#B9861C]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();
//   const cardRef = useRef(null);
//   const [isExporting, setIsExporting] = useState(false);

//   /* ==================== API DATA ==================== */

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

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

//   const certificate = vendor?.certificate;

//   /* ==================== VERIFICATION URL ==================== */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   /* ==================== IMAGE-BASED PRINT / DOWNLOAD ====================
//      The card is captured as a single flattened image (via html2canvas)
//      instead of relying on the live DOM for printing. Chrome's print
//      pagination engine repeatedly and unpredictably split the live card
//      across two pages (a known, long-standing bug with break-inside:
//      avoid on flex/complex layouts, especially with a real printer
//      selected rather than "Save as PDF"). A flattened image has no
//      text/flow for the print engine to fragment, so it always renders
//      as exactly one page, at the exact size we specify, matching the
//      on-screen design pixel for pixel. */

//   const CARD_WIDTH_MM = 100; // physical print width; height is derived
//   // from the captured image's own aspect ratio, so it always matches
//   // whatever the on-screen card actually rendered (including a
//   // wrapped, multi-line address).

//   const captureCardCanvas = async () => {
//     if (!cardRef.current) return null;
//     return html2canvas(cardRef.current, {
//       scale: 3, // high-res so print/PDF output stays crisp
//       useCORS: true,
//       backgroundColor: "#ffffff",
//     });
//   };

//   const handlePrint = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const canvas = await captureCardCanvas();
//       if (!canvas) return;
//       const imgData = canvas.toDataURL("image/png");
//       const heightMm = (canvas.height / canvas.width) * CARD_WIDTH_MM;

//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Card.");
//         return;
//       }
//       printWindow.document.write(
//         "<html><head><title>Smart Card</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + heightMm + "mm; margin: 0; }" +
//           "html, body { margin: 0; padding: 0; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + heightMm + "mm; }" +
//           "</style></head><body><img src=\"" + imgData + "\" /></body></html>"
//       );
//       printWindow.document.close();
//       printWindow.onload = () => {
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//       };
//     } catch (err) {
//       console.error("Smart card print failed:", err);
//       window.alert("Print failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   const handleDownloadPdf = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const canvas = await captureCardCanvas();
//       if (!canvas) return;
//       const imgData = canvas.toDataURL("image/png");
//       const heightMm = (canvas.height / canvas.width) * CARD_WIDTH_MM;

//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, heightMm],
//       });
//       pdf.addImage(imgData, "PNG", 0, 0, CARD_WIDTH_MM, heightMm);
//       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
//     } catch (err) {
//       console.error("Smart card download failed:", err);
//       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   /* ==================== LOADING ==================== */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

//   /* ==================== VENDOR NOT FOUND ==================== */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   /* ==================== CARD FIELDS — same order as the reference ==================== */

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const cardFields2 = [
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   /* ==================== PAGE ==================== */

//   return (
//     <div className="space-y-5">
//       {/* ================= PAGE HEADER ================= */}
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>
//             {" / "}
//             {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf} disabled={isExporting}>
//             {isExporting ? "Preparing..." : "Download"}
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint} disabled={isExporting}>
//             {isExporting ? "Preparing..." : "Print"}
//           </Button>
//         </div>
//       </div>

//       {/* ================= CARD PREVIEW ================= */}
//       <div className="flex flex-col items-center gap-8 px-1 py-6">
//         <div
//           ref={cardRef}
//           className="smart-card relative mx-auto flex flex-col"
//           style={{
//             width: "360px",
//             minHeight: "536px",
//             backgroundImage: `url(${vvcmccardbg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           {/* ── Corporation header — logo pinned left, name fills the rest ── */}
//           <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
//             <img
//               src={logo}
//               alt="VVCMC"
//               className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
//             />
//             <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>

//           {/* ── Card title ── */}
//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
//             <h2 className="text-center text-[13.5px] font-black leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

//           {/* ── Photo + QR ── */}
//           <div className="flex items-start justify-center gap-6 px-4 pb-1 pt-2">
//             <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
//               )}
//             </div>

//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           {/* ── Field list — a single shared grid so every ":" lines up
//                perfectly across BOTH groups, regardless of label length ── */}
//           <div
//             className="grid gap-y-[5px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             {/* thin spacer row between the two logical groups */}
//             <div className="col-span-3 h-0" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           {/* ── Footer signature ── */}
//           <div className="mt-auto flex flex-col items-center gap-1 pb-2 pt-1">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-[#1E1E1E]">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= VERIFICATION ================= */}
//       <div className="flex justify-center">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>
//     </div>
//   );
// }



import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

import {
  FiDownload,
  FiPrinter,
  FiUser,
  FiExternalLink,
  FiShield,
  FiLoader,
} from "react-icons/fi";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// NOTE: point this at the same logo file used in the sidebar
// (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// import vvcmcLogo from "../../../assets/logo.png";
import logo from "../../../assets/logovvcmc.jpg";
// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


/* =========================================================
   HELPERS
========================================================= */

function formatDate(d) {
  if (!d) return "-";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function calcAge(dob) {
  if (!dob) return "-";
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return "-";
  const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  // guard against bad/future dates instead of showing a negative number
  return age >= 0 ? age : "-";
}

function saleType(vendorType) {
  if (!vendorType) return "-";
  return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
}

function genderType(gender) {
  if (!gender) return "-";
  const value = gender.toLowerCase();
  if (value === "male") return "पुरुष";
  if (value === "female") return "स्त्री";
  if (value === "other") return "इतर";
  return gender;
}


/* =========================================================
   ONE LABELLED FIELD ROW — "label : ____value____" with a
   dotted underline, matching the reference card exactly.

   ALIGNMENT NOTE: this is rendered as a React Fragment — i.e. it drops
   3 plain grid cells (label / colon / value) straight into the parent's
   grid (see the grid wrapper below in the component). Because every
   field shares ONE grid, the browser auto-sizes the label column to the
   width of the longest Marathi label ONCE, so every ":" across BOTH
   field groups lines up in a single vertical line — no matter how short
   or long each individual label is.

   wrap (optional): when true, the value is allowed to wrap
   onto multiple lines instead of being truncated with an
   ellipsis. Used for long fields like the address, where
   cutting the text hides information the officer needs to see.
========================================================= */

function CardField({ label, value, wrap = false }) {
  return (
    <>
      <span className="text-[10.5px] font-bold text-slate-800">{label}</span>
      <span className="text-[10.5px] font-bold text-slate-800">:</span>
      <span
        className={`min-w-0 border-b border-dotted border-slate-500 pb-[1px] text-[10.5px] font-bold text-slate-800 ${
          wrap ? "whitespace-normal break-words" : "truncate"
        }`}
      >
        {value || "\u00A0"}
      </span>
    </>
  );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SmartCard() {
  const { id: applicationNo } = useParams();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  /* ==================== API DATA ==================== */

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    fetchVendorApplicationByNo(applicationNo).then((result) => {
      if (cancelled) return;
      setLoading(false);

      if (!result.success) {
        setError(result.message || "Vendor not found.");
        return;
      }

      setVendor(result.data);
    });

    return () => {
      cancelled = true;
    };
  }, [applicationNo]);

  const certificate = vendor?.certificate;

  /* ==================== VERIFICATION URL ==================== */

  const verifyUrl = useMemo(() => {
    if (certificate?.qrCodeData) return certificate.qrCodeData;
    if (!vendor) return "";
    return `${window.location.origin}/verify/${vendor.applicationNo}`;
  }, [vendor, certificate]);

  const cardCode = certificate?.certificateNo || "";

  /* ==================== IMAGE-BASED PRINT / DOWNLOAD ====================
     The card is captured as a single flattened image (via html2canvas)
     instead of relying on the live DOM for printing. Chrome's print
     pagination engine repeatedly and unpredictably split the live card
     across two pages (a known, long-standing bug with break-inside:
     avoid on flex/complex layouts, especially with a real printer
     selected rather than "Save as PDF"). A flattened image has no
     text/flow for the print engine to fragment, so it always renders
     as exactly one page, at the exact size we specify, matching the
     on-screen design pixel for pixel. */

  const CARD_WIDTH_MM = 100; // physical print width; height is derived
  // from the captured image's own aspect ratio, so it always matches
  // whatever the on-screen card actually rendered (including a
  // wrapped, multi-line address).

  const captureCardCanvas = async () => {
    if (!cardRef.current) return null;
    return html2canvas(cardRef.current, {
      scale: 3, // high-res so print/PDF output stays crisp
      useCORS: true,
      backgroundColor: "#ffffff",
    });
  };

  const handlePrint = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const canvas = await captureCardCanvas();
      if (!canvas) return;
      const imgData = canvas.toDataURL("image/png");
      const heightMm = (canvas.height / canvas.width) * CARD_WIDTH_MM;

      const printWindow = window.open("", "_blank", "width=800,height=1000");
      if (!printWindow) {
        window.alert("Please allow pop-ups for this site to print the Smart Card.");
        return;
      }
      printWindow.document.write(
        "<html><head><title>Smart Card</title><style>" +
          "@page { size: " + CARD_WIDTH_MM + "mm " + heightMm + "mm; margin: 0; }" +
          "html, body { margin: 0; padding: 0; }" +
          "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + heightMm + "mm; }" +
          "</style></head><body><img src=\"" + imgData + "\" /></body></html>"
      );
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };
    } catch (err) {
      console.error("Smart card print failed:", err);
      window.alert("Print failed: " + (err && err.message ? err.message : String(err)));
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const canvas = await captureCardCanvas();
      if (!canvas) return;
      const imgData = canvas.toDataURL("image/png");
      const heightMm = (canvas.height / canvas.width) * CARD_WIDTH_MM;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [CARD_WIDTH_MM, heightMm],
      });
      pdf.addImage(imgData, "PNG", 0, 0, CARD_WIDTH_MM, heightMm);
      pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
    } catch (err) {
      console.error("Smart card download failed:", err);
      window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
    } finally {
      setIsExporting(false);
    }
  };

  /* ==================== LOADING ==================== */

  if (loading) {
    return (
      <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
        <FiLoader className="animate-spin" size={20} />
        Loading...
      </Card>
    );
  }

  /* ==================== VENDOR NOT FOUND ==================== */

  if (error || !vendor) {
    return (
      <Card className="mx-auto max-w-md text-center">
        <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
        <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
          Back to Vendor List
        </Link>
      </Card>
    );
  }

  /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

  if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
    return (
      <Card className="mx-auto max-w-md text-center">
        <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
        <p className="text-sm font-semibold text-ink-700">
          The Smart Card is only available once payment is complete and the certificate has been issued.
        </p>
        <p className="mt-1 text-xs text-ink-500">
          Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
        </p>
        <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
          View Vendor Profile
        </Link>
      </Card>
    );
  }

  /* ==================== CARD FIELDS — same order as the reference ==================== */

  const cardFields = [
    { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
    { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
    { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
    { label: "लिंग", value: genderType(vendor.personal.gender) },
    // wrap: true -> long addresses flow onto extra lines instead of being cut off
    { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
  ];

  const cardFields2 = [
    { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
    { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
    { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
    { label: "विक्रीचे ठिकाण (Vending Zone)", value: vendor.address.zone },
    { label: "प्रभाग / ward", value: vendor.address.ward },
    { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
    { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
  ];

  /* ==================== PAGE ==================== */

  return (
    <div className="space-y-5">
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-ink-500">
            <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
              Smart Card
            </Link>
            {" / "}
            {cardCode}
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf} disabled={isExporting}>
            {isExporting ? "Preparing..." : "Download"}
          </Button>
          <Button icon={FiPrinter} onClick={handlePrint} disabled={isExporting}>
            {isExporting ? "Preparing..." : "Print"}
          </Button>
        </div>
      </div>

      {/* ================= CARD PREVIEW ================= */}
      <div className="flex flex-col items-center gap-8 px-1 py-6">
        <div
          ref={cardRef}
          className="smart-card relative mx-auto flex flex-col"
          style={{
            width: "360px",
            minHeight: "536px",
            backgroundImage: `url(${vvcmccardbg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "100% 100%",
          }}
        >
          {/* ── Corporation header — logo pinned left, name fills the rest ── */}
          <div className="flex flex-row items-center gap-2 px-4 pt-2.5">
            <img
              src={logo}
              alt="VVCMC"
              className="h-9 w-9 shrink-0 rounded-full border border-white bg-white object-contain p-[2px]"
            />
            <p className="flex-1 text-left text-[14px] font-bold leading-[13px] text-white drop-shadow-sm">
              वसई-विरार शहर महानगरपालिका
            </p>
          </div>

          {/* ── Card title ── */}
          <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
            <h2 className="text-center text-[13.5px] font-black leading-tight text-[#0B5D30]">
              रस्ता विक्रेता ओळखपत्र
            </h2>
            <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
              (Street Vendor Identity Card)
            </p>
            <div className="mt-1 h-px w-28 bg-[#C9A227]" />
          </div>

          {/* ── Photo + QR ── */}
          <div className="flex items-start justify-center gap-6 px-4 pb-1 pt-2">
            <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-[#0B5D30] bg-white">
              {vendor.documents?.photo ? (
                <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
              ) : (
                <FiUser size={36} strokeWidth={1.2} className="text-slate-300" />
              )}
            </div>

            <Link
              to={`/verify/${vendor.applicationNo}`}
              className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-slate-800 bg-white p-1 transition-transform hover:scale-[1.03]"
            >
              <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
            </Link>
          </div>

          {/* ── Field list — a single shared grid so every ":" lines up
               perfectly across BOTH groups, regardless of label length ── */}
          <div
            className="grid gap-y-[5px] gap-x-1.5 px-5 pb-2 pt-1"
            style={{ gridTemplateColumns: "max-content max-content 1fr" }}
          >
            {cardFields.map((f) => (
              <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
            ))}

            {/* thin spacer row between the two logical groups */}
            <div className="col-span-3 h-0" />

            {cardFields2.map((f) => (
              <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
            ))}
          </div>

          {/* ── Footer signature ── */}
          <div className="mt-auto flex flex-col items-center gap-1 pb-2 pt-1">
            <div className="h-px w-32 bg-slate-500" />
            <p className="text-[12px] font-extrabold tracking-wide text-slate-800">सहाय्यक आयुक्त</p>
          </div>
        </div>
      </div>

      {/* ================= VERIFICATION ================= */}
      <div className="flex justify-center">
        <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
          Open Verification Screen
        </Button>
      </div>
    </div>
  );
}