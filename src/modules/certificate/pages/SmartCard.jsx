// // // import { useEffect, useMemo, useRef } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { QRCodeSVG } from "qrcode.react";
// // // import { FiArrowLeft, FiDownload, FiPrinter, FiShield } from "react-icons/fi";
// // // import jsPDF from "jspdf";
// // // import Card from "../../../components/ui/Card";
// // // import Button from "../../../components/ui/Button";
// // // import Avatar from "../../../components/ui/Avatar";
// // // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // // import logo from "../../../assets/logovvcmc.jpeg";

// // // import {
// // //   selectCertificateByVendorId,
// // //   selectAllCertificates,
// // //   addCertificate,
// // //   makeCertificateDraft,
// // // } from "../../../features/certificates/certificatesSlice";
// // // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // // function formatDate(d) {
// // //   if (!d) return "-";
// // //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // // }

// // // export default function SmartCard() {
// // //   const { id } = useParams();
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();
// // //   const cardRef = useRef(null);

// // //   const vendor = useSelector((s) => selectVendorById(s, id));
// // //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// // //   const certificates = useSelector(selectAllCertificates);
// // //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// // //   useEffect(() => {
// // //     if (vendor && vendor.status === "Approved" && !certificate) {
// // //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [vendor?.id, vendor?.status, certificate]);

// // //   const verifyUrl = useMemo(() => {
// // //     if (!vendor) return "";
// // //     return `${window.location.origin}/verify/${vendor.id}`;
// // //   }, [vendor]);

// // //   if (!vendor) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <p className="text-sm text-ink-500">Vendor not found.</p>
// // //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// // //           Back to Vendor List
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (vendor.status !== "Approved") {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// // //         <p className="text-sm font-semibold text-ink-700">
// // //           Smart Card is only available for approved vendors.
// // //         </p>
// // //         <p className="mt-1 text-xs text-ink-500">
// // //           Current status: <span className="font-semibold">{vendor.status}</span>
// // //         </p>
// // //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// // //           View Vendor Profile
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (!certificate) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// // //         Generating certificate...
// // //       </Card>
// // //     );
// // //   }

// // //   const handlePrint = () => window.print();

// // //   const handleDownloadPdf = () => {
// // //     const doc = new jsPDF({ unit: "pt", format: [340, 520] });

// // //     // Header band
// // //     doc.setFillColor(11, 79, 82);
// // //     doc.rect(0, 0, 340, 70, "F");
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(13);
// // //     doc.text("VASAI VIRAR CITY", 20, 30);
// // //     doc.text("MUNICIPAL CORPORATION", 20, 46);
// // //     doc.setFontSize(9);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.text("SMART VENDOR CARD", 20, 60);

// // //     // Body
// // //     doc.setTextColor(15, 23, 42);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(15);
// // //     doc.text(vendor.personal.fullName, 20, 100);

// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(10);
// // //     const rows = [
// // //       ["Vendor ID", vendor.vendorId],
// // //       ["Application No.", vendor.applicationNo],
// // //       ["Certificate No.", certificate.certificateNumber],
// // //       ["Business Category", vendor.business.businessCategory],
// // //       ["Ward / Zone", `${vendor.address.ward} / ${vendor.address.zone}`],
// // //       ["Issue Date", formatDate(certificate.issueDate)],
// // //       ["Expiry Date", formatDate(certificate.expiryDate)],
// // //     ];
// // //     let y = 125;
// // //     rows.forEach(([label, value]) => {
// // //       doc.setTextColor(100, 116, 139);
// // //       doc.text(label, 20, y);
// // //       doc.setTextColor(15, 23, 42);
// // //       doc.text(String(value), 150, y);
// // //       y += 20;
// // //     });

// // //     doc.setDrawColor(226, 232, 240);
// // //     doc.line(20, y + 5, 320, y + 5);
// // //     y += 25;

// // //     doc.setTextColor(100, 116, 139);
// // //     doc.setFontSize(9);
// // //     doc.text("This card is non-transferable and must be displayed", 20, y);
// // //     doc.text("at the place of vending. Valid till the expiry date.", 20, y + 14);

// // //     doc.save(`${vendor.vendorId}-smart-card.pdf`);
// // //   };

// // //   return (
// // //     <div className="space-y-5">
// // //       <Link
// // //         to={`/vendors/profile/${vendor.id}`}
// // //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600 print:hidden"
// // //       >
// // //         <FiArrowLeft size={14} /> Back to Vendor Profile
// // //       </Link>

// // //       <div className="mx-auto max-w-3xl">
// // //         <div ref={cardRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
// // //           {/* FRONT */}
// // //           <div className="overflow-hidden rounded-[var(--radius-card)] border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// // //             <div className="sidebar-gradient flex items-center justify-between px-5 py-4 text-white">
// // //               <div>
// // //                 <p className="font-display text-[13px] font-bold leading-tight">VASAI VIRAR CITY</p>
// // //                 <p className="font-display text-[13px] font-bold leading-tight">MUNICIPAL CORPORATION</p>
// // //                 <p className="mt-1 text-[10px] font-semibold tracking-wide text-brand-100">
// // //                   SMART VENDOR CARD
// // //                 </p>
// // //               </div>
// // //               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-sm font-extrabold">
// // //                 SV
// // //               </div>
// // //             </div>

// // //             <div className="flex gap-4 p-5">
// // //               <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={64} />
// // //               <div className="flex-1">
// // //                 <p className="text-[11px] text-ink-500">Vendor Name</p>
// // //                 <p className="font-display text-[15px] font-bold text-ink-900">{vendor.personal.fullName}</p>
// // //                 <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
// // //                   <div>
// // //                     <p className="text-ink-400">Vendor ID</p>
// // //                     <p className="id-mono font-semibold text-ink-800">{vendor.vendorId}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-ink-400">Application No.</p>
// // //                     <p className="id-mono font-semibold text-ink-800">{vendor.applicationNo}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="flex items-center gap-4 px-5 pb-5">
// // //               <div className="rounded-xl border border-ink-100 p-2">
// // //                 <QRCodeSVG value={verifyUrl} size={72} />
// // //               </div>
// // //               <div className="text-[11px]">
// // //                 <p className="text-ink-400">Certificate No.</p>
// // //                 <p className="id-mono mb-1.5 font-semibold text-ink-800">{certificate.certificateNumber}</p>
// // //                 <p className="text-ink-400">Business Category</p>
// // //                 <p className="font-semibold text-ink-800">{vendor.business.businessCategory}</p>
// // //               </div>
// // //             </div>

// // //             <div className="sidebar-gradient flex items-center justify-between px-5 py-3 text-[11px] text-white">
// // //               <div>
// // //                 <p className="text-brand-100">Business Category</p>
// // //                 <p className="font-semibold">{vendor.business.businessCategory}</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-brand-100">Ward</p>
// // //                 <p className="font-semibold">{vendor.address.ward}</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-brand-100">Zone</p>
// // //                 <p className="font-semibold">{vendor.address.zone}</p>
// // //               </div>
// // //             </div>

// // //             <div className="flex items-center justify-between border-t border-ink-100 px-5 py-3 text-[11px]">
// // //               <div>
// // //                 <p className="text-ink-400">Issue Date</p>
// // //                 <p className="font-semibold text-ink-800">{formatDate(certificate.issueDate)}</p>
// // //               </div>
// // //               <div className="text-right">
// // //                 <p className="text-ink-400">Expiry Date</p>
// // //                 <p className="font-semibold text-ink-800">{formatDate(certificate.expiryDate)}</p>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* BACK */}
// // //           <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// // //             <div className="p-5">
// // //               <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-ink-500">
// // //                 Terms &amp; Conditions
// // //               </p>
// // //               <ol className="list-decimal space-y-2 pl-4 text-[11px] text-ink-600">
// // //                 <li>This card is non-transferable.</li>
// // //                 <li>Vendor must follow rules and regulations of the Municipal Corporation.</li>
// // //                 <li>This card should be displayed at the place of vending.</li>
// // //                 <li>This card is valid till the expiry date.</li>
// // //               </ol>
// // //             </div>

// // //             <div className="mx-5 rounded-xl bg-accent-50 p-3.5 text-[11px]">
// // //               <p className="font-semibold text-accent-700">Emergency Contact</p>
// // //               <p className="font-display text-base font-bold text-accent-700">1800-123-4567</p>
// // //             </div>

// // //             <div className="mt-auto flex items-center justify-between p-5 text-[11px]">
// // //               <div>
// // //                 <p className="text-ink-400">Scan QR Code for</p>
// // //                 <p className="text-ink-400">Verification</p>
// // //               </div>
// // //               <div className="rounded-lg border border-ink-100 p-1.5">
// // //                 <QRCodeSVG value={verifyUrl} size={48} />
// // //               </div>
// // //             </div>

// // //             <div className="border-t border-ink-100 px-5 py-3 text-center text-[11px] text-ink-500">
// // //               <p className="italic">Authorised Signatory</p>
// // //               <p className="font-semibold text-ink-700">Commissioner</p>
// // //               <p>Vasai Virar City Municipal Corporation</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="mt-6 flex justify-center gap-3 print:hidden">
// // //           <Button variant="outline" icon={FiPrinter} onClick={handlePrint}>
// // //             Print
// // //           </Button>
// // //           <Button icon={FiDownload} onClick={handleDownloadPdf}>
// // //             Download PDF
// // //           </Button>
// // //           <Button variant="ghost" onClick={() => navigate(`/verify/${vendor.id}`)}>
// // //             Open Verification Screen
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // import { useEffect, useMemo, useRef } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { QRCodeSVG } from "qrcode.react";
// // // import { FiArrowLeft, FiDownload, FiPrinter, FiShield } from "react-icons/fi";
// // // import jsPDF from "jspdf";
// // // import Card from "../../../components/ui/Card";
// // // import Button from "../../../components/ui/Button";
// // // import Avatar from "../../../components/ui/Avatar";
// // // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // // import logo from "../../../assets/logovvcmc.jpg";

// // // import {
// // //   selectCertificateByVendorId,
// // //   selectAllCertificates,
// // //   addCertificate,
// // //   makeCertificateDraft,
// // // } from "../../../features/certificates/certificatesSlice";
// // // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // // function formatDate(d) {
// // //   if (!d) return "-";
// // //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // // }

// // // export default function SmartCard() {
// // //   const { id } = useParams();
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();
// // //   const cardRef = useRef(null);

// // //   const vendor = useSelector((s) => selectVendorById(s, id));
// // //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// // //   const certificates = useSelector(selectAllCertificates);
// // //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// // //   useEffect(() => {
// // //     if (vendor && vendor.status === "Approved" && !certificate) {
// // //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [vendor?.id, vendor?.status, certificate]);

// // //   const verifyUrl = useMemo(() => {
// // //     if (!vendor) return "";
// // //     return `${window.location.origin}/verify/${vendor.id}`;
// // //   }, [vendor]);

// // //   if (!vendor) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <p className="text-sm text-ink-500">Vendor not found.</p>
// // //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// // //           Back to Vendor List
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (vendor.status !== "Approved") {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// // //         <p className="text-sm font-semibold text-ink-700">
// // //           Smart Card is only available for approved vendors.
// // //         </p>
// // //         <p className="mt-1 text-xs text-ink-500">
// // //           Current status: <span className="font-semibold">{vendor.status}</span>
// // //         </p>
// // //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// // //           View Vendor Profile
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (!certificate) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// // //         Generating certificate...
// // //       </Card>
// // //     );
// // //   }

// // //   const handlePrint = () => window.print();

// // //   const handleDownloadPdf = () => {
// // //     const doc = new jsPDF({ unit: "pt", format: [340, 520] });

// // //     // Header band
// // //     doc.setFillColor(11, 79, 82);
// // //     doc.rect(0, 0, 340, 70, "F");
// // //     try {
// // //       doc.addImage(logo, "PNG", 14, 10, 48, 48);
// // //     } catch {
// // //       // logo failed to embed - continue without it
// // //     }
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(13);
// // //     doc.text("VASAI VIRAR CITY", 70, 30);
// // //     doc.text("MUNICIPAL CORPORATION", 70, 46);
// // //     doc.setFontSize(9);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.text("SMART VENDOR CARD", 70, 60);

// // //     // Body
// // //     doc.setTextColor(15, 23, 42);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(15);
// // //     doc.text(vendor.personal.fullName, 20, 100);

// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(10);
// // //     const rows = [
// // //       ["Vendor ID", vendor.vendorId],
// // //       ["Application No.", vendor.applicationNo],
// // //       ["Certificate No.", certificate.certificateNumber],
// // //       ["Business Category", vendor.business.businessCategory],
// // //       ["Ward / Zone", `${vendor.address.ward} / ${vendor.address.zone}`],
// // //       ["Issue Date", formatDate(certificate.issueDate)],
// // //       ["Expiry Date", formatDate(certificate.expiryDate)],
// // //     ];
// // //     let y = 125;
// // //     rows.forEach(([label, value]) => {
// // //       doc.setTextColor(100, 116, 139);
// // //       doc.text(label, 20, y);
// // //       doc.setTextColor(15, 23, 42);
// // //       doc.text(String(value), 150, y);
// // //       y += 20;
// // //     });

// // //     doc.setDrawColor(226, 232, 240);
// // //     doc.line(20, y + 5, 320, y + 5);
// // //     y += 25;

// // //     doc.setTextColor(100, 116, 139);
// // //     doc.setFontSize(9);
// // //     doc.text("This card is non-transferable and must be displayed", 20, y);
// // //     doc.text("at the place of vending. Valid till the expiry date.", 20, y + 14);
// // //     y += 30;

// // //     doc.setFont("helvetica", "italic");
// // //     doc.setFontSize(9);
// // //     doc.text("Authorised Signatory", 240, y);

// // //     doc.save(`${vendor.vendorId}-smart-card.pdf`);
// // //   };

// // //   return (
// // //     <div className="space-y-5">
// // //       <Link
// // //         to={`/vendors/profile/${vendor.id}`}
// // //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600 print:hidden"
// // //       >
// // //         <FiArrowLeft size={14} /> Back to Vendor Profile
// // //       </Link>

// // //       <div className="mx-auto max-w-3xl">
// // //         <div ref={cardRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
// // //           {/* FRONT */}
// // //           <div className="overflow-hidden rounded-[var(--radius-card)] border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// // //             <div className="sidebar-gradient flex items-center gap-3 px-5 py-4 text-white">
// // //               <img
// // //                 src={logo}
// // //                 alt="Vasai Virar City Municipal Corporation"
// // //                 className="h-10 w-10 shrink-0 rounded-full bg-white/90 p-0.5"
// // //               />
// // //               <div>
// // //                 <p className="font-display text-[13px] font-bold leading-tight">VASAI VIRAR CITY</p>
// // //                 <p className="font-display text-[13px] font-bold leading-tight">MUNICIPAL CORPORATION</p>
// // //                 <p className="mt-1 text-[10px] font-semibold tracking-wide text-brand-100">
// // //                   SMART VENDOR CARD
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             <div className="flex gap-4 p-5">
// // //               <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={64} />
// // //               <div className="flex-1">
// // //                 <p className="text-[11px] text-ink-500">Vendor Name</p>
// // //                 <p className="font-display text-[15px] font-bold text-ink-900">{vendor.personal.fullName}</p>
// // //                 <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
// // //                   <div>
// // //                     <p className="text-ink-400">Vendor ID</p>
// // //                     <p className="id-mono font-semibold text-ink-800">{vendor.vendorId}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-ink-400">Application No.</p>
// // //                     <p className="id-mono font-semibold text-ink-800">{vendor.applicationNo}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="flex items-center gap-4 px-5 pb-5">
// // //               <div className="rounded-xl border border-ink-100 p-2">
// // //                 <QRCodeSVG value={verifyUrl} size={72} />
// // //               </div>
// // //               <div className="text-[11px]">
// // //                 <p className="text-ink-400">Certificate No.</p>
// // //                 <p className="id-mono mb-1.5 font-semibold text-ink-800">{certificate.certificateNumber}</p>
// // //                 <p className="text-ink-400">Business Category</p>
// // //                 <p className="font-semibold text-ink-800">{vendor.business.businessCategory}</p>
// // //               </div>
// // //             </div>

// // //             <div className="sidebar-gradient flex items-center justify-between px-5 py-3 text-[11px] text-white">
// // //               <div>
// // //                 <p className="text-brand-100">Business Category</p>
// // //                 <p className="font-semibold">{vendor.business.businessCategory}</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-brand-100">Ward</p>
// // //                 <p className="font-semibold">{vendor.address.ward}</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-brand-100">Zone</p>
// // //                 <p className="font-semibold">{vendor.address.zone}</p>
// // //               </div>
// // //             </div>

// // //             <div className="flex items-end justify-between border-t border-ink-100 px-5 py-3 text-[11px]">
// // //               <div className="flex gap-4">
// // //                 <div>
// // //                   <p className="text-ink-400">Issue Date</p>
// // //                   <p className="font-semibold text-ink-800">{formatDate(certificate.issueDate)}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-ink-400">Expiry Date</p>
// // //                   <p className="font-semibold text-ink-800">{formatDate(certificate.expiryDate)}</p>
// // //                 </div>
// // //               </div>
// // //               <p className="italic text-ink-500">Authorised Signatory</p>
// // //             </div>
// // //           </div>

// // //           {/* BACK */}
// // //           <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// // //             <div className="p-5">
// // //               <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-ink-500">
// // //                 Terms &amp; Conditions
// // //               </p>
// // //               <ol className="list-decimal space-y-2 pl-4 text-[11px] text-ink-600">
// // //                 <li>This card is non-transferable.</li>
// // //                 <li>Vendor must follow rules and regulations of the Municipal Corporation.</li>
// // //                 <li>This card should be displayed at the place of vending.</li>
// // //                 <li>This card is valid till the expiry date.</li>
// // //               </ol>
// // //             </div>

// // //             <div className="mx-5 rounded-xl bg-accent-50 p-3.5 text-[11px]">
// // //               <p className="font-semibold text-accent-700">Emergency Contact</p>
// // //               <p className="font-display text-base font-bold text-accent-700">1800-123-4567</p>
// // //             </div>

// // //             <div className="mt-auto flex items-center justify-between p-5 text-[11px]">
// // //               <div>
// // //                 <p className="text-ink-400">Scan QR Code for</p>
// // //                 <p className="text-ink-400">Verification</p>
// // //               </div>
// // //               <div className="rounded-lg border border-ink-100 p-1.5">
// // //                 <QRCodeSVG value={verifyUrl} size={48} />
// // //               </div>
// // //             </div>

// // //             <div className="border-t border-ink-100 px-5 py-3 text-center text-[11px] text-ink-500">
// // //               <p className="italic">Authorised Signatory</p>
// // //               <p className="mt-1 font-semibold text-ink-700">Vasai Virar City Municipal Corporation</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="mt-6 flex justify-center gap-3 print:hidden">
// // //           <Button variant="outline" icon={FiPrinter} onClick={handlePrint}>
// // //             Print
// // //           </Button>
// // //           <Button icon={FiDownload} onClick={handleDownloadPdf}>
// // //             Download PDF
// // //           </Button>
// // //           <Button variant="ghost" onClick={() => navigate(`/verify/${vendor.id}`)}>
// // //             Open Verification Screen
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // import { useEffect, useMemo, useRef } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { QRCodeSVG } from "qrcode.react";
// // // import { FiArrowLeft, FiDownload, FiPrinter, FiShield } from "react-icons/fi";
// // // import jsPDF from "jspdf";
// // // import Card from "../../../components/ui/Card";
// // // import Button from "../../../components/ui/Button";
// // // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // // import logo from "../../../assets/logovvcmc.jpg";

// // // import {
// // //   selectCertificateByVendorId,
// // //   selectAllCertificates,
// // //   addCertificate,
// // //   makeCertificateDraft,
// // // } from "../../../features/certificates/certificatesSlice";
// // // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // // function formatDate(d) {
// // //   if (!d) return "-";
// // //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // // }

// // // function calcAge(dob) {
// // //   if (!dob) return "-";
// // //   const birth = new Date(dob);
// // //   if (Number.isNaN(birth.getTime())) return "-";
// // //   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// // // }

// // // // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile,
// // // // matching the "स्थिर / फिरता" field on the official ID card.
// // // function saleType(vendorType) {
// // //   if (!vendorType) return "-";
// // //   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// // // }

// // // // Field rows in the exact order/labels as the official Vasai-Virar Street Vendor ID card,
// // // // translated to English.
// // // function useCardFields(vendor, certificate) {
// // //   return useMemo(() => {
// // //     if (!vendor) return [];
// // //     return [
// // //       ["ID Card Number", certificate?.certificateNumber || "-"],
// // //       ["Vendor Name", vendor.personal.fullName],
// // //       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
// // //       ["Gender", vendor.personal.gender || "-"],
// // //       ["Address", vendor.address.permanentAddress],
// // //       ["Mobile Number", vendor.personal.mobile],
// // //       ["Type of Business", vendor.business.businessCategory],
// // //       ["Sale Type", saleType(vendor.business.vendorType)],
// // //       ["Vending Zone", vendor.address.zone],
// // //       ["Ward", vendor.address.ward],
// // //       ["Business Timing", vendor.business.businessTiming || "-"],
// // //       ["ID Validity", certificate ? `${formatDate(certificate.issueDate)} - ${formatDate(certificate.expiryDate)}` : "-"],
// // //     ];
// // //   }, [vendor, certificate]);
// // // }

// // // export default function SmartCard() {
// // //   const { id } = useParams();
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();
// // //   const cardRef = useRef(null);

// // //   const vendor = useSelector((s) => selectVendorById(s, id));
// // //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// // //   const certificates = useSelector(selectAllCertificates);
// // //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// // //   const fields = useCardFields(vendor, certificate);

// // //   useEffect(() => {
// // //     if (vendor && vendor.status === "Approved" && !certificate) {
// // //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [vendor?.id, vendor?.status, certificate]);

// // //   const verifyUrl = useMemo(() => {
// // //     if (!vendor) return "";
// // //     return `${window.location.origin}/verify/${vendor.id}`;
// // //   }, [vendor]);

// // //   if (!vendor) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <p className="text-sm text-ink-500">Vendor not found.</p>
// // //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// // //           Back to Vendor List
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (vendor.status !== "Approved") {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// // //         <p className="text-sm font-semibold text-ink-700">
// // //           Smart Card is only available for approved vendors.
// // //         </p>
// // //         <p className="mt-1 text-xs text-ink-500">
// // //           Current status: <span className="font-semibold">{vendor.status}</span>
// // //         </p>
// // //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// // //           View Vendor Profile
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (!certificate) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// // //         Generating certificate...
// // //       </Card>
// // //     );
// // //   }

// // //   const handlePrint = () => window.print();

// // //   const handleDownloadPdf = () => {
// // //     const doc = new jsPDF({ unit: "pt", format: [360, 620] });

// // //     // Green header
// // //     doc.setFillColor(21, 128, 61);
// // //     doc.rect(0, 0, 360, 64, "F");
// // //     try {
// // //       doc.addImage(logo, "PNG", 14, 8, 48, 48);
// // //     } catch {
// // //       // logo failed to embed - continue without it
// // //     }
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(12);
// // //     doc.text("VASAI-VIRAR CITY", 72, 28);
// // //     doc.text("MUNICIPAL CORPORATION", 72, 44);

// // //     // Gold accent band
// // //     doc.setFillColor(202, 158, 58);
// // //     doc.rect(0, 64, 360, 6, "F");

// // //     // Title
// // //     doc.setTextColor(21, 128, 61);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(15);
// // //     doc.text("STREET VENDOR IDENTITY CARD", 180, 92, { align: "center" });

// // //     // Fields
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(10);
// // //     let y = 118;
// // //     fields.forEach(([label, value]) => {
// // //       doc.setTextColor(30, 58, 95);
// // //       doc.setFont("helvetica", "bold");
// // //       const labelLines = doc.splitTextToSize(String(label), 110);
// // //       doc.text(labelLines, 20, y);
// // //       doc.setFont("helvetica", "normal");
// // //       doc.setTextColor(15, 23, 42);
// // //       const valueLines = doc.splitTextToSize(String(value ?? "-"), 175);
// // //       doc.text(valueLines, 150, y);
// // //       y += Math.max(labelLines.length, valueLines.length) * 12 + 8;
// // //     });

// // //     doc.setDrawColor(202, 158, 58);
// // //     doc.setLineWidth(1);
// // //     doc.line(20, y + 4, 340, y + 4);
// // //     y += 26;

// // //     doc.setFont("helvetica", "italic");
// // //     doc.setTextColor(21, 128, 61);
// // //     doc.setFontSize(11);
// // //     doc.text("Authorised Signatory", 180, y, { align: "center" });

// // //     doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
// // //   };

// // //   return (
// // //     <div className="space-y-5">
// // //       <Link
// // //         to={`/vendors/profile/${vendor.id}`}
// // //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600 print:hidden"
// // //       >
// // //         <FiArrowLeft size={14} /> Back to Vendor Profile
// // //       </Link>

// // //       <div className="mx-auto max-w-sm">
// // //         <div
// // //           ref={cardRef}
// // //           className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]"
// // //         >
// // //           {/* Header */}
// // //           <div className="relative bg-[#15803D] px-5 pb-4 pt-5 text-white">
// // //             <div className="flex items-center gap-3">
// // //               <img
// // //                 src={logo}
// // //                 alt="Vasai-Virar City Municipal Corporation"
// // //                 className="h-11 w-11 shrink-0 rounded-full bg-white p-0.5"
// // //               />
// // //               <p className="font-display text-[15px] font-bold leading-tight">
// // //                 VASAI-VIRAR CITY
// // //                 <br />
// // //                 MUNICIPAL CORPORATION
// // //               </p>
// // //             </div>
// // //           </div>
// // //           {/* Gold accent band */}
// // //           <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

// // //           {/* Title */}
// // //           <div className="px-5 pt-4 text-center">
// // //             <p className="font-display text-lg font-extrabold text-[#15803D]">STREET VENDOR IDENTITY CARD</p>
// // //           </div>

// // //           {/* Photo + QR */}
// // //           <div className="flex items-center justify-center gap-5 px-5 py-5">
// // //             <div className="flex h-24 w-20 items-center justify-center overflow-hidden rounded-lg border-2 border-[#15803D] bg-ink-50">
// // //               {vendor.documents?.photo?.url ? (
// // //                 <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
// // //               ) : (
// // //                 <span className="text-[10px] text-ink-400">Photo</span>
// // //               )}
// // //             </div>
// // //             <div className="rounded-lg border-2 border-[#15803D] p-1.5">
// // //               <QRCodeSVG value={verifyUrl} size={80} />
// // //             </div>
// // //           </div>

// // //           {/* Fields */}
// // //           <div className="space-y-2 px-5 pb-5 text-[12.5px]">
// // //             {fields.map(([label, value]) => (
// // //               <div key={label} className="flex gap-2">
// // //                 <span className="w-[46%] shrink-0 font-semibold text-[#1E3A8F]">{label}</span>
// // //                 <span className="text-ink-800">: {value}</span>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* Footer */}
// // //           <div className="border-t border-dashed border-ink-200 px-5 py-3.5 text-center">
// // //             <p className="text-[12px] italic text-[#15803D]">Authorised Signatory</p>
// // //           </div>
// // //         </div>

// // //         <div className="mt-6 flex justify-center gap-3 print:hidden">
// // //           <Button variant="outline" icon={FiPrinter} onClick={handlePrint}>
// // //             Print
// // //           </Button>
// // //           <Button icon={FiDownload} onClick={handleDownloadPdf}>
// // //             Download PDF
// // //           </Button>
// // //           <Button variant="ghost" onClick={() => navigate(`/verify/${vendor.id}`)}>
// // //             Open Verification Screen
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // import { useEffect, useMemo, useRef } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { QRCodeSVG } from "qrcode.react";
// // // import { FiArrowLeft, FiDownload, FiPrinter, FiShield } from "react-icons/fi";
// // // import jsPDF from "jspdf";
// // // import Card from "../../../components/ui/Card";
// // // import Button from "../../../components/ui/Button";
// // // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // // import logo from "../../../assets/logovvcmc.jpg";

// // // import {
// // //   selectCertificateByVendorId,
// // //   selectAllCertificates,
// // //   addCertificate,
// // //   makeCertificateDraft,
// // // } from "../../../features/certificates/certificatesSlice";
// // // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // // function formatDate(d) {
// // //   if (!d) return "-";
// // //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // // }

// // // function calcAge(dob) {
// // //   if (!dob) return "-";
// // //   const birth = new Date(dob);
// // //   if (Number.isNaN(birth.getTime())) return "-";
// // //   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// // // }

// // // // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile,
// // // // matching the "स्थिर / फिरता" field on the official ID card.
// // // function saleType(vendorType) {
// // //   if (!vendorType) return "-";
// // //   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// // // }

// // // // Field rows in the exact order/labels as the official Vasai-Virar Street Vendor ID card,
// // // // translated to English.
// // // function useCardFields(vendor, certificate) {
// // //   return useMemo(() => {
// // //     if (!vendor) return [];
// // //     return [
// // //       ["ID Card Number", certificate?.certificateNumber || "-"],
// // //       ["Vendor Name", vendor.personal.fullName],
// // //       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
// // //       ["Gender", vendor.personal.gender || "-"],
// // //       ["Address", vendor.address.permanentAddress],
// // //       ["Mobile Number", vendor.personal.mobile],
// // //       ["Type of Business", vendor.business.businessCategory],
// // //       ["Sale Type", saleType(vendor.business.vendorType)],
// // //       ["Vending Zone", vendor.address.zone],
// // //       ["Ward", vendor.address.ward],
// // //       ["Business Timing", vendor.business.businessTiming || "-"],
// // //       ["ID Validity", certificate ? `${formatDate(certificate.issueDate)} - ${formatDate(certificate.expiryDate)}` : "-"],
// // //     ];
// // //   }, [vendor, certificate]);
// // // }

// // // export default function SmartCard() {
// // //   const { id } = useParams();
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();
// // //   const cardRef = useRef(null);

// // //   const vendor = useSelector((s) => selectVendorById(s, id));
// // //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// // //   const certificates = useSelector(selectAllCertificates);
// // //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// // //   const fields = useCardFields(vendor, certificate);

// // //   useEffect(() => {
// // //     if (vendor && vendor.status === "Approved" && !certificate) {
// // //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [vendor?.id, vendor?.status, certificate]);

// // //   const verifyUrl = useMemo(() => {
// // //     if (!vendor) return "";
// // //     return `${window.location.origin}/verify/${vendor.id}`;
// // //   }, [vendor]);

// // //   if (!vendor) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <p className="text-sm text-ink-500">Vendor not found.</p>
// // //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// // //           Back to Vendor List
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (vendor.status !== "Approved") {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// // //         <p className="text-sm font-semibold text-ink-700">
// // //           Smart Card is only available for approved vendors.
// // //         </p>
// // //         <p className="mt-1 text-xs text-ink-500">
// // //           Current status: <span className="font-semibold">{vendor.status}</span>
// // //         </p>
// // //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// // //           View Vendor Profile
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (!certificate) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// // //         Generating certificate...
// // //       </Card>
// // //     );
// // //   }

// // //   const handlePrint = () => window.print();

// // //   const handleDownloadPdf = () => {
// // //     const doc = new jsPDF({ unit: "pt", format: [360, 620] });

// // //     // Header - teal, matches sidebar gradient colors
// // //     doc.setFillColor(11, 77, 82);
// // //     doc.rect(0, 0, 360, 64, "F");
// // //     try {
// // //       doc.addImage(logo, "PNG", 14, 8, 48, 48);
// // //     } catch {
// // //       // logo failed to embed - continue without it
// // //     }
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(11);
// // //     doc.text("VASAI-VIRAR CITY MUNICIPAL CORPORATION", 72, 36);

// // //     // Gold accent band
// // //     doc.setFillColor(202, 158, 58);
// // //     doc.rect(0, 64, 360, 6, "F");

// // //     // Title
// // //     doc.setTextColor(11, 77, 82);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(15);
// // //     doc.text("STREET VENDOR IDENTITY CARD", 180, 92, { align: "center" });

// // //     // Fields
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(10);
// // //     let y = 118;
// // //     fields.forEach(([label, value]) => {
// // //       doc.setTextColor(30, 58, 95);
// // //       doc.setFont("helvetica", "bold");
// // //       const labelLines = doc.splitTextToSize(String(label), 110);
// // //       doc.text(labelLines, 20, y);
// // //       doc.setFont("helvetica", "normal");
// // //       doc.setTextColor(15, 23, 42);
// // //       const valueLines = doc.splitTextToSize(String(value ?? "-"), 175);
// // //       doc.text(valueLines, 150, y);
// // //       y += Math.max(labelLines.length, valueLines.length) * 12 + 8;
// // //     });

// // //     doc.setDrawColor(202, 158, 58);
// // //     doc.setLineWidth(1);
// // //     doc.line(20, y + 4, 340, y + 4);
// // //     y += 26;

// // //     doc.setFont("helvetica", "italic");
// // //     doc.setTextColor(11, 77, 82);
// // //     doc.setFontSize(11);
// // //     doc.text("Authorised Signatory", 180, y, { align: "center" });

// // //     doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
// // //   };

// // //   return (
// // //     <div className="space-y-5">
// // //       <Link
// // //         to={`/vendors/profile/${vendor.id}`}
// // //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600 print:hidden"
// // //       >
// // //         <FiArrowLeft size={14} /> Back to Vendor Profile
// // //       </Link>

// // //       <div className="mx-auto max-w-md">
// // //         <div
// // //           ref={cardRef}
// // //           className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]"
// // //         >
// // //           {/* Header - exact same gradient colors as the sidebar */}
// // //           <div
// // //             className="relative px-5 pb-4 pt-5 text-white"
// // //             style={{ background: "linear-gradient(160deg, #0B4D52 0%, #08464B 55%, #062E34 100%)" }}
// // //           >
// // //             <div className="flex items-center gap-3">
// // //               <img
// // //                 src={logo}
// // //                 alt="Vasai-Virar City Municipal Corporation"
// // //                 className="h-11 w-11 shrink-0 rounded-full bg-white p-0.5"
// // //               />
// // //               <p className="whitespace-nowrap font-display text-[13px] font-bold tracking-tight">
// // //                 VASAI-VIRAR CITY MUNICIPAL CORPORATION
// // //               </p>
// // //             </div>
// // //           </div>
// // //           {/* Gold accent band */}
// // //           <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

// // //           {/* Title */}
// // //           <div className="px-5 pt-4 text-center">
// // //             <p className="font-display text-lg font-extrabold text-[#0B4D52]">STREET VENDOR IDENTITY CARD</p>
// // //           </div>

// // //           {/* Photo + QR */}
// // //           <div className="flex items-center justify-center gap-5 px-5 py-5">
// // //             <div className="flex h-24 w-20 items-center justify-center overflow-hidden rounded-lg border-2 border-[#0B4D52] bg-ink-50">
// // //               {vendor.documents?.photo?.url ? (
// // //                 <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
// // //               ) : (
// // //                 <span className="text-[10px] text-ink-400">Photo</span>
// // //               )}
// // //             </div>
// // //             <div className="rounded-lg border-2 border-[#0B4D52] p-1.5">
// // //               <QRCodeSVG value={verifyUrl} size={80} />
// // //             </div>
// // //           </div>

// // //           {/* Fields */}
// // //           <div className="space-y-2 px-5 pb-5 text-[12.5px]">
// // //             {fields.map(([label, value]) => (
// // //               <div key={label} className="flex gap-2">
// // //                 <span className="w-[46%] shrink-0 font-semibold text-[#1E3A8F]">{label}</span>
// // //                 <span className="text-ink-800">: {value}</span>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* Footer */}
// // //           <div className="border-t border-dashed border-ink-200 px-5 py-3.5 text-center">
// // //             <p className="text-[12px] italic text-[#0B4D52]">Authorised Signatory</p>
// // //           </div>
// // //         </div>

// // //         <div className="mt-6 flex justify-center gap-3 print:hidden">
// // //           <Button variant="outline" icon={FiPrinter} onClick={handlePrint}>
// // //             Print
// // //           </Button>
// // //           <Button icon={FiDownload} onClick={handleDownloadPdf}>
// // //             Download PDF
// // //           </Button>
// // //           <Button variant="ghost" onClick={() => navigate(`/verify/${vendor.id}`)}>
// // //             Open Verification Screen
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }




// // // import { useEffect, useMemo } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { QRCodeSVG } from "qrcode.react";
// // // import {
// // //   FiDownload,
// // //   FiPrinter,
// // //   FiShield,
// // //   FiExternalLink,
// // //   FiCreditCard,
// // //   FiCalendar,
// // //   FiUser,
// // //   FiPhone,
// // //   FiBriefcase,
// // //   FiMapPin,
// // //   FiHome,
// // //   FiClock,
// // //   FiFileText,
// // //   FiCheckCircle,
// // // } from "react-icons/fi";
// // // import jsPDF from "jspdf";
// // // import Card from "../../../components/ui/Card";
// // // import Button from "../../../components/ui/Button";
// // // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // // import logo from "../../../assets/logovvcmc.jpg";

// // // import {
// // //   selectCertificateByVendorId,
// // //   selectAllCertificates,
// // //   addCertificate,
// // //   makeCertificateDraft,
// // // } from "../../../features/certificates/certificatesSlice";
// // // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // // const TEAL_GRADIENT = "linear-gradient(160deg, #0B4D52 0%, #08464B 55%, #062E34 100%)";

// // // function formatDate(d) {
// // //   if (!d) return "-";
// // //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // // }

// // // function calcAge(dob) {
// // //   if (!dob) return "-";
// // //   const birth = new Date(dob);
// // //   if (Number.isNaN(birth.getTime())) return "-";
// // //   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// // // }

// // // // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile.
// // // function saleType(vendorType) {
// // //   if (!vendorType) return "-";
// // //   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// // // }

// // // function FieldRow({ icon: Icon, label, value }) {
// // //   return (
// // //     <div className="flex items-start gap-2.5">
// // //       <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0B4D52]/10 text-[#0B4D52]">
// // //         <Icon size={13} />
// // //       </div>
// // //       <div>
// // //         <p className="text-[11.5px] font-semibold text-[#0B4D52]">{label}</p>
// // //         <p className="text-[13px] text-ink-800">{value}</p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default function SmartCard() {
// // //   const { id } = useParams();
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();

// // //   const vendor = useSelector((s) => selectVendorById(s, id));
// // //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// // //   const certificates = useSelector(selectAllCertificates);
// // //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// // //   useEffect(() => {
// // //     if (vendor && vendor.status === "Approved" && !certificate) {
// // //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [vendor?.id, vendor?.status, certificate]);

// // //   const verifyUrl = useMemo(() => {
// // //     if (!vendor) return "";
// // //     return `${window.location.origin}/verify/${vendor.id}`;
// // //   }, [vendor]);

// // //   const cardCode = vendor ? `CARD-${vendor.id.replace(/\D/g, "") || vendor.id}` : "";

// // //   if (!vendor) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <p className="text-sm text-ink-500">Vendor not found.</p>
// // //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// // //           Back to Vendor List
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (vendor.status !== "Approved") {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// // //         <p className="text-sm font-semibold text-ink-700">
// // //           Smart Card is only available for approved vendors.
// // //         </p>
// // //         <p className="mt-1 text-xs text-ink-500">
// // //           Current status: <span className="font-semibold">{vendor.status}</span>
// // //         </p>
// // //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// // //           View Vendor Profile
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (!certificate) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// // //         Generating certificate...
// // //       </Card>
// // //     );
// // //   }

// // //   const handlePrint = () => window.print();

// // //   const handleDownloadPdf = () => {
// // //     const doc = new jsPDF({ unit: "pt", format: [380, 640] });

// // //     // Header
// // //     doc.setFillColor(11, 77, 82);
// // //     doc.rect(0, 0, 380, 76, "F");
// // //     try {
// // //       doc.addImage(logo, "PNG", 16, 12, 52, 52);
// // //     } catch {
// // //       // logo failed to embed - continue without it
// // //     }
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(12);
// // //     doc.text("VASAI VIRAR CITY MUNICIPAL CORPORATION", 78, 32);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(10);
// // //     doc.text("Vasai Virar Shahar Mahanagarpalika", 78, 48);
// // //     doc.setTextColor(202, 158, 58);
// // //     doc.setFontSize(8.5);
// // //     doc.text("Established: 3 July 2009", 78, 62);

// // //     doc.setFillColor(202, 158, 58);
// // //     doc.rect(0, 76, 380, 4, "F");

// // //     // Name + badge
// // //     doc.setTextColor(11, 77, 82);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(16);
// // //     doc.text(vendor.personal.fullName.toUpperCase(), 20, 108);
// // //     doc.setFillColor(213, 245, 227);
// // //     doc.roundedRect(20, 116, 150, 18, 9, 9, "F");
// // //     doc.setTextColor(22, 163, 74);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(8.5);
// // //     doc.text("CERTIFIED STREET VENDOR", 30, 128);

// // //     // Fields
// // //     const rows = [
// // //       ["ID Card Number", certificate.certificateNumber],
// // //       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
// // //       ["Gender", vendor.personal.gender || "-"],
// // //       ["Mobile Number", vendor.personal.mobile],
// // //       ["Type of Business", vendor.business.businessCategory],
// // //       ["Vending Zone", vendor.address.zone],
// // //       ["Ward", vendor.address.ward],
// // //       ["Business Timing", vendor.business.businessTiming || "-"],
// // //       ["Address", vendor.address.permanentAddress],
// // //     ];
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(9.5);
// // //     let y = 155;
// // //     rows.forEach(([label, value]) => {
// // //       doc.setTextColor(11, 77, 82);
// // //       doc.setFont("helvetica", "bold");
// // //       doc.text(String(label), 20, y);
// // //       doc.setFont("helvetica", "normal");
// // //       doc.setTextColor(15, 23, 42);
// // //       const valueLines = doc.splitTextToSize(String(value ?? "-"), 200);
// // //       doc.text(valueLines, 20, y + 12);
// // //       y += 12 * valueLines.length + 12;
// // //     });

// // //     // Validity
// // //     doc.setDrawColor(11, 77, 82);
// // //     doc.setLineWidth(1);
// // //     doc.roundedRect(230, 300, 130, 60, 8, 8);
// // //     doc.setTextColor(11, 77, 82);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(8);
// // //     doc.text("VALIDITY PERIOD", 295, 316, { align: "center" });
// // //     doc.setFontSize(10);
// // //     doc.text(formatDate(certificate.issueDate), 295, 334, { align: "center" });
// // //     doc.setFontSize(7.5);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.text("to", 295, 344, { align: "center" });
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(10);
// // //     doc.text(formatDate(certificate.expiryDate), 295, 354, { align: "center" });

// // //     // Footer
// // //     doc.setFillColor(11, 77, 82);
// // //     doc.rect(0, 580, 380, 60, "F");
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(8.5);
// // //     doc.text("Authorised by Vasai Virar City Municipal Corporation", 20, 610);
// // //     doc.setFont("helvetica", "italic");
// // //     doc.text("Authorised Signatory", 260, 610);

// // //     doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
// // //   };

// // //   return (
// // //     <div className="space-y-5">
// // //       <div className="flex flex-wrap items-start justify-between gap-4">
// // //         <div>
// // //           <p className="text-xs font-semibold text-ink-500 print:hidden">
// // //             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
// // //               Smart Card
// // //             </Link>{" "}
// // //             / {cardCode}
// // //           </p>
// // //           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
// // //           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
// // //         </div>
// // //         <div className="flex gap-2 print:hidden">
// // //           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
// // //             Download
// // //           </Button>
// // //           <Button icon={FiPrinter} onClick={handlePrint}>
// // //             Print
// // //           </Button>
// // //         </div>
// // //       </div>

// // //       <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// // //         {/* Header */}
// // //         <div className="relative overflow-hidden px-6 py-5 text-white" style={{ background: TEAL_GRADIENT }}>
// // //           <div
// // //             aria-hidden="true"
// // //             className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[10px] border-[#CA9E3A]/40"
// // //           />
// // //           <div className="relative flex items-center gap-4">
// // //             <img src={logo} alt="Vasai Virar City Municipal Corporation" className="h-14 w-14 shrink-0 rounded-full bg-white p-0.5" />
// // //             <div>
// // //               <p className="font-display text-[17px] font-bold leading-tight">VASAI VIRAR CITY MUNICIPAL CORPORATION</p>
// // //               <p className="text-[13px] text-white/85">वसई विरार शहर महानगरपालिका</p>
// // //               <p className="mt-0.5 text-[11px] font-medium text-[#E9CE8B]">Established: 3 July 2009</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

// // //         {/* Body */}
// // //         <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-[auto_1fr_auto]">
// // //           {/* Photo */}
// // //           <div className="h-32 w-28 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-50">
// // //             {vendor.documents?.photo?.url ? (
// // //               <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
// // //             ) : (
// // //               <div className="flex h-full w-full items-center justify-center text-[11px] text-ink-400">Photo</div>
// // //             )}
// // //           </div>

// // //           {/* Details */}
// // //           <div>
// // //             <p className="font-display text-xl font-extrabold text-[#0B4D52]">
// // //               {vendor.personal.fullName.toUpperCase()}
// // //             </p>
// // //             <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success-100 px-3 py-1 text-[11px] font-semibold text-success-600">
// // //               <FiCheckCircle size={12} /> Certified Street Vendor
// // //             </span>

// // //             <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
// // //               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNumber} />
// // //               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address.zone} />

// // //               <FieldRow
// // //                 icon={FiCalendar}
// // //                 label="Date of Birth / Age"
// // //                 value={`${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`}
// // //               />
// // //               <FieldRow icon={FiHome} label="Ward" value={vendor.address.ward} />

// // //               <FieldRow icon={FiUser} label="Gender" value={vendor.personal.gender || "-"} />
// // //               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business.businessTiming || "-"} />

// // //               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal.mobile} />
// // //               <FieldRow icon={FiFileText} label="Address" value={vendor.address.permanentAddress} />

// // //               <FieldRow icon={FiBriefcase} label="Type of Business" value={vendor.business.businessCategory} />
// // //               <FieldRow icon={FiBriefcase} label="Sale Type" value={saleType(vendor.business.vendorType)} />
// // //             </div>
// // //           </div>

// // //           {/* QR + Validity */}
// // //           <div className="flex flex-col items-center gap-4 print:hidden sm:print:flex">
// // //             <Link
// // //               to={`/verify/${vendor.id}`}
// // //               className="overflow-hidden rounded-xl border border-ink-100 shadow-[var(--shadow-soft)]"
// // //             >
// // //               <div className="p-3">
// // //                 <QRCodeSVG value={verifyUrl} size={128} />
// // //               </div>
// // //               <div className="py-1.5 text-center text-[11px] font-bold tracking-wide text-white" style={{ background: TEAL_GRADIENT }}>
// // //                 SCAN TO VERIFY
// // //               </div>
// // //             </Link>

// // //             <div className="w-full rounded-xl border border-ink-100 p-3 text-center">
// // //               <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#0B4D52]">Validity Period</p>
// // //               <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#0B4D52]">
// // //                 <FiCalendar size={13} />
// // //                 {formatDate(certificate.issueDate)}
// // //               </div>
// // //               <p className="my-0.5 text-[10px] text-ink-400">to</p>
// // //               <p className="text-[13px] font-bold text-[#0B4D52]">{formatDate(certificate.expiryDate)}</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Footer */}
// // //         <div
// // //           className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-[12px] text-white"
// // //           style={{ background: TEAL_GRADIENT }}
// // //         >
// // //           <span className="flex items-center gap-2">
// // //             <FiShield size={14} className="text-[#E9CE8B]" />
// // //             Authorised by Vasai Virar City Municipal Corporation
// // //           </span>
// // //           <span className="italic text-white/90">Authorised Signatory</span>
// // //         </div>
// // //       </div>

// // //       <div className="flex justify-center print:hidden">
// // //         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.id}`)}>
// // //           Open Verification Screen
// // //         </Button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // import { useEffect, useMemo } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { QRCodeSVG } from "qrcode.react";
// // // import {
// // //   FiDownload,
// // //   FiPrinter,
// // //   FiShield,
// // //   FiExternalLink,
// // //   FiCreditCard,
// // //   FiCalendar,
// // //   FiUser,
// // //   FiPhone,
// // //   FiBriefcase,
// // //   FiMapPin,
// // //   FiHome,
// // //   FiClock,
// // //   FiFileText,
// // //   FiCheckCircle,
// // // } from "react-icons/fi";
// // // import jsPDF from "jspdf";
// // // import Card from "../../../components/ui/Card";
// // // import Button from "../../../components/ui/Button";
// // // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // // import logo from "../../../assets/logovvcmc.jpg";

// // // import {
// // //   selectCertificateByVendorId,
// // //   selectAllCertificates,
// // //   addCertificate,
// // //   makeCertificateDraft,
// // // } from "../../../features/certificates/certificatesSlice";
// // // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // // const TEAL_GRADIENT = "linear-gradient(160deg, #0B4D52 0%, #08464B 55%, #062E34 100%)";

// // // function formatDate(d) {
// // //   if (!d) return "-";
// // //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // // }

// // // function calcAge(dob) {
// // //   if (!dob) return "-";
// // //   const birth = new Date(dob);
// // //   if (Number.isNaN(birth.getTime())) return "-";
// // //   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// // // }

// // // // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile.
// // // function saleType(vendorType) {
// // //   if (!vendorType) return "-";
// // //   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// // // }

// // // function FieldRow({ icon: Icon, label, value }) {
// // //   return (
// // //     <div className="flex items-start gap-2.5">
// // //       <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0B4D52]/10 text-[#0B4D52]">
// // //         <Icon size={13} />
// // //       </div>
// // //       <div className="min-w-0">
// // //         <p className="text-[11.5px] font-semibold text-[#0B4D52]">{label}</p>
// // //         <p className="text-[13px] text-ink-800 break-words">{value}</p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default function SmartCard() {
// // //   const { id } = useParams();
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();

// // //   const vendor = useSelector((s) => selectVendorById(s, id));
// // //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// // //   const certificates = useSelector(selectAllCertificates);
// // //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// // //   useEffect(() => {
// // //     if (vendor && vendor.status === "Approved" && !certificate) {
// // //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [vendor?.id, vendor?.status, certificate]);

// // //   const verifyUrl = useMemo(() => {
// // //     if (!vendor) return "";
// // //     return `${window.location.origin}/verify/${vendor.id}`;
// // //   }, [vendor]);

// // //   const cardCode = vendor ? `CARD-${vendor.id.replace(/\D/g, "") || vendor.id}` : "";

// // //   if (!vendor) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <p className="text-sm text-ink-500">Vendor not found.</p>
// // //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// // //           Back to Vendor List
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (vendor.status !== "Approved") {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// // //         <p className="text-sm font-semibold text-ink-700">
// // //           Smart Card is only available for approved vendors.
// // //         </p>
// // //         <p className="mt-1 text-xs text-ink-500">
// // //           Current status: <span className="font-semibold">{vendor.status}</span>
// // //         </p>
// // //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// // //           View Vendor Profile
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (!certificate) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// // //         Generating certificate...
// // //       </Card>
// // //     );
// // //   }

// // //   const handlePrint = () => window.print();

// // //   const handleDownloadPdf = () => {
// // //     const doc = new jsPDF({ unit: "pt", format: [380, 640] });

// // //     // Header
// // //     doc.setFillColor(11, 77, 82);
// // //     doc.rect(0, 0, 380, 76, "F");
// // //     try {
// // //       doc.addImage(logo, "PNG", 16, 12, 52, 52);
// // //     } catch {
// // //       // logo failed to embed - continue without it
// // //     }
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(12);
// // //     doc.text("VASAI VIRAR CITY MUNICIPAL CORPORATION", 78, 32);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(10);
// // //     doc.text("Vasai Virar Shahar Mahanagarpalika", 78, 48);
// // //     doc.setTextColor(202, 158, 58);
// // //     doc.setFontSize(8.5);
// // //     doc.text("Established: 3 July 2009", 78, 62);

// // //     doc.setFillColor(202, 158, 58);
// // //     doc.rect(0, 76, 380, 4, "F");

// // //     // Name + badge
// // //     doc.setTextColor(11, 77, 82);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(16);
// // //     doc.text(vendor.personal.fullName.toUpperCase(), 20, 108);
// // //     doc.setFillColor(213, 245, 227);
// // //     doc.roundedRect(20, 116, 150, 18, 9, 9, "F");
// // //     doc.setTextColor(22, 163, 74);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(8.5);
// // //     doc.text("CERTIFIED STREET VENDOR", 30, 128);

// // //     // Fields
// // //     const rows = [
// // //       ["ID Card Number", certificate.certificateNumber],
// // //       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
// // //       ["Gender", vendor.personal.gender || "-"],
// // //       ["Mobile Number", vendor.personal.mobile],
// // //       ["Type of Business", vendor.business.businessCategory],
// // //       ["Vending Zone", vendor.address.zone],
// // //       ["Ward", vendor.address.ward],
// // //       ["Business Timing", vendor.business.businessTiming || "-"],
// // //       ["Address", vendor.address.permanentAddress],
// // //     ];
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(9.5);
// // //     let y = 155;
// // //     rows.forEach(([label, value]) => {
// // //       doc.setTextColor(11, 77, 82);
// // //       doc.setFont("helvetica", "bold");
// // //       doc.text(String(label), 20, y);
// // //       doc.setFont("helvetica", "normal");
// // //       doc.setTextColor(15, 23, 42);
// // //       const valueLines = doc.splitTextToSize(String(value ?? "-"), 200);
// // //       doc.text(valueLines, 20, y + 12);
// // //       y += 12 * valueLines.length + 12;
// // //     });

// // //     // Validity
// // //     doc.setDrawColor(11, 77, 82);
// // //     doc.setLineWidth(1);
// // //     doc.roundedRect(230, 300, 130, 60, 8, 8);
// // //     doc.setTextColor(11, 77, 82);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(8);
// // //     doc.text("VALIDITY PERIOD", 295, 316, { align: "center" });
// // //     doc.setFontSize(10);
// // //     doc.text(formatDate(certificate.issueDate), 295, 334, { align: "center" });
// // //     doc.setFontSize(7.5);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.text("to", 295, 344, { align: "center" });
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(10);
// // //     doc.text(formatDate(certificate.expiryDate), 295, 354, { align: "center" });

// // //     // Footer
// // //     doc.setFillColor(11, 77, 82);
// // //     doc.rect(0, 580, 380, 60, "F");
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(8.5);
// // //     doc.text("Authorised by Vasai Virar City Municipal Corporation", 20, 610);
// // //     doc.setFont("helvetica", "italic");
// // //     doc.text("Authorised Signatory", 260, 610);

// // //     doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
// // //   };

// // //   return (
// // //     <div className="space-y-5">
// // //       <div className="flex flex-wrap items-start justify-between gap-4">
// // //         <div>
// // //           <p className="text-xs font-semibold text-ink-500 print:hidden">
// // //             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
// // //               Smart Card
// // //             </Link>{" "}
// // //             / {cardCode}
// // //           </p>
// // //           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
// // //           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
// // //         </div>
// // //         <div className="flex gap-2 print:hidden">
// // //           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
// // //             Download
// // //           </Button>
// // //           <Button icon={FiPrinter} onClick={handlePrint}>
// // //             Print
// // //           </Button>
// // //         </div>
// // //       </div>

// // //       <div className="mx-auto max-w-[600px] overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// // //         {/* Header */}
// // //         <div className="relative overflow-hidden px-6 py-5 text-white" style={{ background: TEAL_GRADIENT }}>
// // //           <div
// // //             aria-hidden="true"
// // //             className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[10px] border-[#CA9E3A]/40"
// // //           />
// // //           <div className="relative flex items-center gap-4">
// // //             <img src={logo} alt="Vasai Virar City Municipal Corporation" className="h-14 w-14 shrink-0 rounded-full bg-white p-0.5" />
// // //             <div>
// // //               <p className="font-display text-[15px] font-bold leading-tight">VASAI VIRAR CITY MUNICIPAL CORPORATION</p>
// // //               <p className="text-[12.5px] text-white/85">वसई विरार शहर महानगरपालिका</p>
// // //               <p className="mt-0.5 text-[11px] font-medium text-[#E9CE8B]">Established: 3 July 2009</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

// // //         {/* Body */}
// // //         <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-[auto_1fr_auto]">
// // //           {/* Photo */}
// // //           <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-50">
// // //             {vendor.documents?.photo?.url ? (
// // //               <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
// // //             ) : (
// // //               <div className="flex h-full w-full items-center justify-center text-[10px] text-ink-400">Photo</div>
// // //             )}
// // //           </div>

// // //           {/* Details */}
// // //           <div className="min-w-0">
// // //             <p className="font-display text-lg font-extrabold text-[#0B4D52] break-words">
// // //               {vendor.personal.fullName.toUpperCase()}
// // //             </p>
// // //             <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success-100 px-2.5 py-1 text-[10.5px] font-semibold text-success-600">
// // //               <FiCheckCircle size={11} /> Certified Street Vendor
// // //             </span>

// // //             <div className="mt-3.5 grid grid-cols-1 gap-y-3">
// // //               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNumber} />
// // //               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address.zone} />
// // //               <FieldRow
// // //                 icon={FiCalendar}
// // //                 label="Date of Birth / Age"
// // //                 value={`${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`}
// // //               />
// // //               <FieldRow icon={FiHome} label="Ward" value={vendor.address.ward} />
// // //               <FieldRow icon={FiUser} label="Gender" value={vendor.personal.gender || "-"} />
// // //               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business.businessTiming || "-"} />
// // //               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal.mobile} />
// // //               <FieldRow icon={FiFileText} label="Address" value={vendor.address.permanentAddress} />
// // //               <FieldRow icon={FiBriefcase} label="Type of Business" value={vendor.business.businessCategory} />
// // //               <FieldRow icon={FiBriefcase} label="Sale Type" value={saleType(vendor.business.vendorType)} />
// // //             </div>
// // //           </div>

// // //           {/* QR + Validity */}
// // //           <div className="flex flex-col items-center gap-4 print:hidden sm:print:flex">
// // //             <Link
// // //               to={`/verify/${vendor.id}`}
// // //               className="overflow-hidden rounded-xl border border-ink-100 shadow-[var(--shadow-soft)]"
// // //             >
// // //               <div className="p-3">
// // //                 <QRCodeSVG value={verifyUrl} size={112} />
// // //               </div>
// // //               <div className="py-1.5 text-center text-[10.5px] font-bold tracking-wide text-white" style={{ background: TEAL_GRADIENT }}>
// // //                 SCAN TO VERIFY
// // //               </div>
// // //             </Link>

// // //             <div className="w-full rounded-xl border border-ink-100 p-3 text-center">
// // //               <p className="text-[10px] font-bold uppercase tracking-wide text-[#0B4D52]">Validity Period</p>
// // //               <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[12.5px] font-bold text-[#0B4D52]">
// // //                 <FiCalendar size={12} />
// // //                 {formatDate(certificate.issueDate)}
// // //               </div>
// // //               <p className="my-0.5 text-[10px] text-ink-400">to</p>
// // //               <p className="text-[12.5px] font-bold text-[#0B4D52]">{formatDate(certificate.expiryDate)}</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Footer */}
// // //         <div
// // //           className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-[11.5px] text-white"
// // //           style={{ background: TEAL_GRADIENT }}
// // //         >
// // //           <span className="flex items-center gap-2">
// // //             <FiShield size={14} className="text-[#E9CE8B]" />
// // //             Authorised by Vasai Virar City Municipal Corporation
// // //           </span>
// // //           <span className="italic text-white/90">Authorised Signatory</span>
// // //         </div>
// // //       </div>

// // //       <div className="flex justify-center print:hidden">
// // //         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.id}`)}>
// // //           Open Verification Screen
// // //         </Button>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import { useEffect, useMemo } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { QRCodeSVG } from "qrcode.react";
// // import {
// //   FiDownload,
// //   FiPrinter,
// //   FiShield,
// //   FiExternalLink,
// //   FiCreditCard,
// //   FiCalendar,
// //   FiUser,
// //   FiPhone,
// //   FiBriefcase,
// //   FiMapPin,
// //   FiHome,
// //   FiClock,
// //   FiFileText,
// //   FiCheckCircle,
// // } from "react-icons/fi";
// // import jsPDF from "jspdf";
// // import Card from "../../../components/ui/Card";
// // import Button from "../../../components/ui/Button";
// // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // import logo from "../../../assets/logovvcmc.jpg";

// // import {
// //   selectCertificateByVendorId,
// //   selectAllCertificates,
// //   addCertificate,
// //   makeCertificateDraft,
// // } from "../../../features/certificates/certificatesSlice";
// // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // const TEAL_GRADIENT = "linear-gradient(160deg, #0B4D52 0%, #08464B 55%, #062E34 100%)";
// // const TEAL = [11, 77, 82];
// // const TEAL_DARK = [6, 46, 52];
// // const GOLD = [202, 158, 58];

// // function formatDate(d) {
// //   if (!d) return "-";
// //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // }

// // function calcAge(dob) {
// //   if (!dob) return "-";
// //   const birth = new Date(dob);
// //   if (Number.isNaN(birth.getTime())) return "-";
// //   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// // }

// // // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile.
// // function saleType(vendorType) {
// //   if (!vendorType) return "-";
// //   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// // }

// // function FieldRow({ icon: Icon, label, value }) {
// //   return (
// //     <div className="flex items-start gap-2.5">
// //       <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0B4D52]/10 text-[#0B4D52]">
// //         <Icon size={13} />
// //       </div>
// //       <div className="min-w-0">
// //         <p className="text-[11.5px] font-semibold text-[#0B4D52]">{label}</p>
// //         <p className="text-[13px] text-ink-800 break-words">{value}</p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function SmartCard() {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const vendor = useSelector((s) => selectVendorById(s, id));
// //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// //   const certificates = useSelector(selectAllCertificates);
// //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// //   useEffect(() => {
// //     if (vendor && vendor.status === "Approved" && !certificate) {
// //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [vendor?.id, vendor?.status, certificate]);

// //   const verifyUrl = useMemo(() => {
// //     if (!vendor) return "";
// //     return `${window.location.origin}/verify/${vendor.id}`;
// //   }, [vendor]);

// //   const cardCode = vendor ? `CARD-${vendor.id.replace(/\D/g, "") || vendor.id}` : "";

// //   if (!vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">Vendor not found.</p>
// //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Vendor List
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   if (vendor.status !== "Approved") {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// //         <p className="text-sm font-semibold text-ink-700">
// //           Smart Card is only available for approved vendors.
// //         </p>
// //         <p className="mt-1 text-xs text-ink-500">
// //           Current status: <span className="font-semibold">{vendor.status}</span>
// //         </p>
// //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// //           View Vendor Profile
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   if (!certificate) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// //         Generating certificate...
// //       </Card>
// //     );
// //   }

// //   const handlePrint = () => window.print();

// //   const handleDownloadPdf = () => {
// //     // Card canvas size mirrors the on-screen card proportions (wide layout)
// //     const W = 620;
// //     const H = 460;
// //     const doc = new jsPDF({ unit: "pt", format: [W, H] });

// //     // ---------- Header ----------
// //     doc.setFillColor(...TEAL);
// //     doc.rect(0, 0, W, 92, "F");

// //     // circular logo badge
// //     try {
// //       doc.setFillColor(255, 255, 255);
// //       doc.circle(50, 46, 26, "F");
// //       doc.addImage(logo, "JPEG", 26, 22, 48, 48, undefined, "FAST");
// //     } catch {
// //       // logo failed to embed - continue without it
// //     }

// //     doc.setTextColor(255, 255, 255);
// //     doc.setFont("helvetica", "bold");
// //     doc.setFontSize(13);
// //     doc.text("VASAI VIRAR CITY MUNICIPAL CORPORATION", 92, 38);
// //     doc.setFont("helvetica", "normal");
// //     doc.setFontSize(10.5);
// //     doc.text("Vasai Virar Shahar Mahanagarpalika", 92, 54);
// //     doc.setTextColor(...GOLD);
// //     doc.setFontSize(9);
// //     doc.text("Established: 3 July 2009", 92, 70);

// //     // gold gradient-look curve accent (simple arc using ellipse clip-free trick)
// //     doc.setDrawColor(...GOLD);
// //     doc.setLineWidth(6);
// //     doc.circle(W - 30, 92, 55, "S");

// //     // gold divider bar
// //     doc.setFillColor(...GOLD);
// //     doc.rect(0, 92, W, 4, "F");

// //     // ---------- Photo ----------
// //     const photoX = 24;
// //     const photoY = 116;
// //     const photoW = 90;
// //     const photoH = 108;
// //     doc.setDrawColor(230, 230, 230);
// //     doc.setFillColor(245, 247, 246);
// //     doc.roundedRect(photoX, photoY, photoW, photoH, 8, 8, "FD");
// //     if (vendor.documents?.photo?.url) {
// //       try {
// //         doc.addImage(vendor.documents.photo.url, "JPEG", photoX, photoY, photoW, photoH, undefined, "FAST");
// //       } catch {
// //         // ignore if not embeddable (e.g. cross-origin)
// //       }
// //     }

// //     // ---------- Name + badge ----------
// //     const infoX = photoX + photoW + 20;
// //     doc.setTextColor(...TEAL);
// //     doc.setFont("helvetica", "bold");
// //     doc.setFontSize(16);
// //     doc.text(vendor.personal.fullName.toUpperCase(), infoX, photoY + 16);

// //     doc.setFillColor(213, 245, 227);
// //     doc.roundedRect(infoX, photoY + 26, 150, 18, 9, 9, "F");
// //     doc.setTextColor(22, 163, 74);
// //     doc.setFont("helvetica", "bold");
// //     doc.setFontSize(8.5);
// //     doc.text("CERTIFIED STREET VENDOR", infoX + 20, photoY + 38);

// //     // ---------- Two-column fields ----------
// //     const colGap = 18; // reduced gap between the two field columns
// //     const col1X = infoX;
// //     const col2X = infoX + 165 + colGap;
// //     const fieldsStartY = photoY + 58;
// //     const rowGap = 32;

// //     const leftRows = [
// //       ["ID Card Number", certificate.certificateNumber],
// //       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
// //       ["Gender", vendor.personal.gender || "-"],
// //       ["Mobile Number", vendor.personal.mobile],
// //       ["Type of Business", vendor.business.businessCategory],
// //     ];
// //     const rightRows = [
// //       ["Vending Zone", vendor.address.zone],
// //       ["Ward", vendor.address.ward],
// //       ["Business Timing", vendor.business.businessTiming || "-"],
// //       ["Address", vendor.address.permanentAddress],
// //     ];

// //     const drawField = (x, y, label, value) => {
// //       doc.setFont("helvetica", "bold");
// //       doc.setFontSize(8.5);
// //       doc.setTextColor(...TEAL);
// //       doc.text(String(label), x, y);
// //       doc.setFont("helvetica", "normal");
// //       doc.setFontSize(9.5);
// //       doc.setTextColor(15, 23, 42);
// //       const lines = doc.splitTextToSize(String(value ?? "-"), 155);
// //       doc.text(lines, x, y + 12);
// //       return 12 * lines.length + rowGap - 12;
// //     };

// //     let yL = fieldsStartY;
// //     leftRows.forEach(([label, value]) => {
// //       yL += drawField(col1X, yL, label, value);
// //     });

// //     let yR = fieldsStartY;
// //     rightRows.forEach(([label, value]) => {
// //       yR += drawField(col2X, yR, label, value);
// //     });

// //     // ---------- QR + Validity (right side) ----------
// //     const qrBoxX = W - 150;
// //     const qrBoxY = 116;
// //     const qrBoxSize = 120;
// //     doc.setDrawColor(220, 224, 223);
// //     doc.setLineWidth(1);
// //     doc.roundedRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 8, 8, "S");

// //     // QR rendered via a temporary offscreen canvas
// //     const qrCanvas = document.createElement("canvas");
// //     // eslint-disable-next-line no-undef
// //     const QRCode = window.QRCode; // fallback not required; using existing SVG on page instead
// //     try {
// //       const svgEl = document.querySelector('a[href^="/verify/"] svg');
// //       if (svgEl) {
// //         const svgData = new XMLSerializer().serializeToString(svgEl);
// //         const img = new Image();
// //         const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
// //         const url = URL.createObjectURL(svgBlob);
// //         img.onload = () => {
// //           qrCanvas.width = 300;
// //           qrCanvas.height = 300;
// //           const ctx = qrCanvas.getContext("2d");
// //           ctx.fillStyle = "#ffffff";
// //           ctx.fillRect(0, 0, 300, 300);
// //           ctx.drawImage(img, 0, 0, 300, 300);
// //           URL.revokeObjectURL(url);
// //           const dataUrl = qrCanvas.toDataURL("image/png");
// //           doc.addImage(dataUrl, "PNG", qrBoxX + 10, qrBoxY + 10, qrBoxSize - 20, qrBoxSize - 20);
// //           finishPdf();
// //         };
// //         img.src = url;
// //       } else {
// //         finishPdf();
// //       }
// //     } catch {
// //       finishPdf();
// //     }

// //     function finishPdf() {
// //       doc.setFillColor(...TEAL);
// //       doc.rect(qrBoxX, qrBoxY + qrBoxSize - 20, qrBoxSize, 20, "F");
// //       doc.setTextColor(255, 255, 255);
// //       doc.setFont("helvetica", "bold");
// //       doc.setFontSize(8);
// //       doc.text("SCAN TO VERIFY", qrBoxX + qrBoxSize / 2, qrBoxY + qrBoxSize - 7, { align: "center" });

// //       // Validity box
// //       const valY = qrBoxY + qrBoxSize + 16;
// //       doc.setDrawColor(220, 224, 223);
// //       doc.roundedRect(qrBoxX, valY, qrBoxSize, 76, 8, 8, "S");
// //       doc.setTextColor(...TEAL);
// //       doc.setFont("helvetica", "bold");
// //       doc.setFontSize(7.5);
// //       doc.text("VALIDITY PERIOD", qrBoxX + qrBoxSize / 2, valY + 16, { align: "center" });
// //       doc.setFontSize(10);
// //       doc.text(formatDate(certificate.issueDate), qrBoxX + qrBoxSize / 2, valY + 34, { align: "center" });
// //       doc.setFont("helvetica", "normal");
// //       doc.setFontSize(7.5);
// //       doc.setTextColor(140, 150, 148);
// //       doc.text("to", qrBoxX + qrBoxSize / 2, valY + 46, { align: "center" });
// //       doc.setFont("helvetica", "bold");
// //       doc.setFontSize(10);
// //       doc.setTextColor(...TEAL);
// //       doc.text(formatDate(certificate.expiryDate), qrBoxX + qrBoxSize / 2, valY + 62, { align: "center" });

// //       // ---------- Footer ----------
// //       const footerY = H - 44;
// //       doc.setFillColor(...TEAL);
// //       doc.rect(0, footerY, W, 44, "F");
// //       doc.setTextColor(255, 255, 255);
// //       doc.setFont("helvetica", "normal");
// //       doc.setFontSize(9);
// //       doc.text("Authorised by Vasai Virar City Municipal Corporation", 24, footerY + 26);
// //       doc.setFont("helvetica", "italic");
// //       doc.text("Authorised Signatory", W - 130, footerY + 26);

// //       doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
// //     }
// //   };

// //   return (
// //     <div className="space-y-5">
// //       <div className="flex flex-wrap items-start justify-between gap-4">
// //         <div>
// //           <p className="text-xs font-semibold text-ink-500 print:hidden">
// //             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
// //               Smart Card
// //             </Link>{" "}
// //             / {cardCode}
// //           </p>
// //           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
// //           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
// //         </div>
// //         <div className="flex gap-2 print:hidden">
// //           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
// //             Download
// //           </Button>
// //           <Button icon={FiPrinter} onClick={handlePrint}>
// //             Print
// //           </Button>
// //         </div>
// //       </div>

// //       <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// //         {/* Header */}
// //         <div className="relative overflow-hidden px-6 py-5 text-white" style={{ background: TEAL_GRADIENT }}>
// //           <div
// //             aria-hidden="true"
// //             className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[10px] border-[#CA9E3A]/40"
// //           />
// //           <div className="relative flex items-center gap-4">
// //             <img src={logo} alt="Vasai Virar City Municipal Corporation" className="h-14 w-14 shrink-0 rounded-full bg-white p-0.5" />
// //             <div>
// //               <p className="font-display text-[17px] font-bold leading-tight">VASAI VIRAR CITY MUNICIPAL CORPORATION</p>
// //               <p className="text-[13px] text-white/85">वसई विरार शहर महानगरपालिका</p>
// //               <p className="mt-0.5 text-[11px] font-medium text-[#E9CE8B]">Established: 3 July 2009</p>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

// //         {/* Body */}
// //         <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-[auto_1fr_auto]">
// //           {/* Photo */}
// //           <div className="h-32 w-28 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-50">
// //             {vendor.documents?.photo?.url ? (
// //               <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
// //             ) : (
// //               <div className="flex h-full w-full items-center justify-center text-[11px] text-ink-400">Photo</div>
// //             )}
// //           </div>

// //           {/* Details */}
// //           <div>
// //             <p className="font-display text-xl font-extrabold text-[#0B4D52]">
// //               {vendor.personal.fullName.toUpperCase()}
// //             </p>
// //             <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success-100 px-3 py-1 text-[11px] font-semibold text-success-600">
// //               <FiCheckCircle size={12} /> Certified Street Vendor
// //             </span>

// //             {/* reduced gap-x from 6 to 3 so the two columns sit closer together */}
// //             <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-3.5 sm:grid-cols-2">
// //               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNumber} />
// //               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address.zone} />

// //               <FieldRow
// //                 icon={FiCalendar}
// //                 label="Date of Birth / Age"
// //                 value={`${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`}
// //               />
// //               <FieldRow icon={FiHome} label="Ward" value={vendor.address.ward} />

// //               <FieldRow icon={FiUser} label="Gender" value={vendor.personal.gender || "-"} />
// //               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business.businessTiming || "-"} />

// //               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal.mobile} />
// //               <FieldRow icon={FiFileText} label="Address" value={vendor.address.permanentAddress} />

// //               <FieldRow icon={FiBriefcase} label="Type of Business" value={vendor.business.businessCategory} />
// //               <FieldRow icon={FiBriefcase} label="Sale Type" value={saleType(vendor.business.vendorType)} />
// //             </div>
// //           </div>

// //           {/* QR + Validity */}
// //           <div className="flex flex-col items-center gap-4 print:hidden sm:print:flex">
// //             <Link
// //               to={`/verify/${vendor.id}`}
// //               className="overflow-hidden rounded-xl border border-ink-100 shadow-[var(--shadow-soft)]"
// //             >
// //               <div className="p-3">
// //                 <QRCodeSVG value={verifyUrl} size={128} />
// //               </div>
// //               <div className="py-1.5 text-center text-[11px] font-bold tracking-wide text-white" style={{ background: TEAL_GRADIENT }}>
// //                 SCAN TO VERIFY
// //               </div>
// //             </Link>

// //             <div className="w-full rounded-xl border border-ink-100 p-3 text-center">
// //               <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#0B4D52]">Validity Period</p>
// //               <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#0B4D52]">
// //                 <FiCalendar size={13} />
// //                 {formatDate(certificate.issueDate)}
// //               </div>
// //               <p className="my-0.5 text-[10px] text-ink-400">to</p>
// //               <p className="text-[13px] font-bold text-[#0B4D52]">{formatDate(certificate.expiryDate)}</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Footer */}
// //         <div
// //           className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-[12px] text-white"
// //           style={{ background: TEAL_GRADIENT }}
// //         >
// //           <span className="flex items-center gap-2">
// //             <FiShield size={14} className="text-[#E9CE8B]" />
// //             Authorised by Vasai Virar City Municipal Corporation
// //           </span>
// //           <span className="italic text-white/90">Authorised Signatory</span>
// //         </div>
// //       </div>

// //       <div className="flex justify-center print:hidden">
// //         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.id}`)}>
// //           Open Verification Screen
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import {
//   FiDownload,
//   FiPrinter,
//   FiShield,
//   FiExternalLink,
//   FiCreditCard,
//   FiCalendar,
//   FiUser,
//   FiPhone,
//   FiBriefcase,
//   FiMapPin,
//   FiHome,
//   FiClock,
//   FiFileText,
//   FiCheckCircle,
// } from "react-icons/fi";
// import jsPDF from "jspdf";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// import logo from "../../../assets/logovvcmc.jpg";

// import {
//   selectCertificateByVendorId,
//   selectAllCertificates,
//   addCertificate,
//   makeCertificateDraft,
// } from "../../../features/certificates/certificatesSlice";
// import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// const TEAL_GRADIENT = "linear-gradient(160deg, #0B4D52 0%, #08464B 55%, #062E34 100%)";
// const TEAL = [11, 77, 82];
// const GOLD = [202, 158, 58];

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// }

// // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile.
// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// }

// function FieldRow({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-start gap-2.5">
//       <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0B4D52]/10 text-[#0B4D52]">
//         <Icon size={13} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[11.5px] font-semibold text-[#0B4D52]">{label}</p>
//         <p className="text-[13px] text-ink-800 break-words">{value}</p>
//       </div>
//     </div>
//   );
// }

// export default function SmartCard() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const vendor = useSelector((s) => selectVendorById(s, id));
//   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
//   const certificates = useSelector(selectAllCertificates);
//   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

//   useEffect(() => {
//     if (vendor && vendor.status === "Approved" && !certificate) {
//       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [vendor?.id, vendor?.status, certificate]);

//   const verifyUrl = useMemo(() => {
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.id}`;
//   }, [vendor]);

//   const cardCode = vendor ? `CARD-${vendor.id.replace(/\D/g, "") || vendor.id}` : "";

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

//   if (vendor.status !== "Approved") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           Smart Card is only available for approved vendors.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   if (!certificate) {
//     return (
//       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
//         Generating certificate...
//       </Card>
//     );
//   }

//   const handlePrint = () => window.print();

//   const handleDownloadPdf = () => {
//     const W = 620;
//     const H = 460;
//     const doc = new jsPDF({ unit: "pt", format: [W, H] });

//     // ---------- Header ----------
//     doc.setFillColor(...TEAL);
//     doc.rect(0, 0, W, 92, "F");

//     try {
//       doc.setFillColor(255, 255, 255);
//       doc.circle(50, 46, 26, "F");
//       doc.addImage(logo, "JPEG", 26, 22, 48, 48, undefined, "FAST");
//     } catch {
//       // logo failed to embed - continue without it
//     }

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(13);
//     doc.text("VASAI VIRAR CITY MUNICIPAL CORPORATION", 92, 38);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10.5);
//     doc.text("Vasai Virar Shahar Mahanagarpalika", 92, 54);
//     doc.setTextColor(...GOLD);
//     doc.setFontSize(9);
//     doc.text("Established: 3 July 2009", 92, 70);

//     doc.setDrawColor(...GOLD);
//     doc.setLineWidth(6);
//     doc.circle(W - 30, 92, 55, "S");

//     doc.setFillColor(...GOLD);
//     doc.rect(0, 92, W, 4, "F");

//     // ---------- Photo ----------
//     const photoX = 24;
//     const photoY = 116;
//     const photoW = 90;
//     const photoH = 108;
//     doc.setDrawColor(230, 230, 230);
//     doc.setFillColor(245, 247, 246);
//     doc.roundedRect(photoX, photoY, photoW, photoH, 8, 8, "FD");
//     if (vendor.documents?.photo?.url) {
//       try {
//         doc.addImage(vendor.documents.photo.url, "JPEG", photoX, photoY, photoW, photoH, undefined, "FAST");
//       } catch {
//         // ignore if not embeddable (e.g. cross-origin)
//       }
//     }

//     // ---------- Name + badge ----------
//     const infoX = photoX + photoW + 20;
//     doc.setTextColor(...TEAL);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.text(vendor.personal.fullName.toUpperCase(), infoX, photoY + 16);

//     doc.setFillColor(213, 245, 227);
//     doc.roundedRect(infoX, photoY + 26, 150, 18, 9, 9, "F");
//     doc.setTextColor(22, 163, 74);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8.5);
//     doc.text("CERTIFIED STREET VENDOR", infoX + 20, photoY + 38);

//     // ---------- Two-column fields (compressed gap) ----------
//     const colGap = 10;
//     const colWidth = 155;
//     const col1X = infoX;
//     const col2X = infoX + colWidth + colGap;
//     const fieldsStartY = photoY + 58;
//     const rowGap = 32;

//     const leftRows = [
//       ["ID Card Number", certificate.certificateNumber],
//       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
//       ["Gender", vendor.personal.gender || "-"],
//       ["Mobile Number", vendor.personal.mobile],
//       ["Type of Business", vendor.business.businessCategory],
//     ];
//     const rightRows = [
//       ["Vending Zone", vendor.address.zone],
//       ["Ward", vendor.address.ward],
//       ["Business Timing", vendor.business.businessTiming || "-"],
//       ["Address", vendor.address.permanentAddress],
//     ];

//     const drawField = (x, y, label, value) => {
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(8.5);
//       doc.setTextColor(...TEAL);
//       doc.text(String(label), x, y);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(9.5);
//       doc.setTextColor(15, 23, 42);
//       const lines = doc.splitTextToSize(String(value ?? "-"), colWidth);
//       doc.text(lines, x, y + 12);
//       return 12 * lines.length + rowGap - 12;
//     };

//     let yL = fieldsStartY;
//     leftRows.forEach(([label, value]) => {
//       yL += drawField(col1X, yL, label, value);
//     });

//     let yR = fieldsStartY;
//     rightRows.forEach(([label, value]) => {
//       yR += drawField(col2X, yR, label, value);
//     });

//     // ---------- QR + Validity (right side) ----------
//     const qrBoxX = W - 150;
//     const qrBoxY = 116;
//     const qrBoxSize = 120;
//     doc.setDrawColor(220, 224, 223);
//     doc.setLineWidth(1);
//     doc.roundedRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 8, 8, "S");

//     const qrCanvas = document.createElement("canvas");
//     try {
//       const svgEl = document.querySelector('a[href^="/verify/"] svg');
//       if (svgEl) {
//         const svgData = new XMLSerializer().serializeToString(svgEl);
//         const img = new Image();
//         const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
//         const url = URL.createObjectURL(svgBlob);
//         img.onload = () => {
//           qrCanvas.width = 300;
//           qrCanvas.height = 300;
//           const ctx = qrCanvas.getContext("2d");
//           ctx.fillStyle = "#ffffff";
//           ctx.fillRect(0, 0, 300, 300);
//           ctx.drawImage(img, 0, 0, 300, 300);
//           URL.revokeObjectURL(url);
//           const dataUrl = qrCanvas.toDataURL("image/png");
//           doc.addImage(dataUrl, "PNG", qrBoxX + 10, qrBoxY + 10, qrBoxSize - 20, qrBoxSize - 20);
//           finishPdf();
//         };
//         img.src = url;
//       } else {
//         finishPdf();
//       }
//     } catch {
//       finishPdf();
//     }

//     function finishPdf() {
//       doc.setFillColor(...TEAL);
//       doc.rect(qrBoxX, qrBoxY + qrBoxSize - 20, qrBoxSize, 20, "F");
//       doc.setTextColor(255, 255, 255);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(8);
//       doc.text("SCAN TO VERIFY", qrBoxX + qrBoxSize / 2, qrBoxY + qrBoxSize - 7, { align: "center" });

//       const valY = qrBoxY + qrBoxSize + 16;
//       doc.setDrawColor(220, 224, 223);
//       doc.roundedRect(qrBoxX, valY, qrBoxSize, 76, 8, 8, "S");
//       doc.setTextColor(...TEAL);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(7.5);
//       doc.text("VALIDITY PERIOD", qrBoxX + qrBoxSize / 2, valY + 16, { align: "center" });
//       doc.setFontSize(10);
//       doc.text(formatDate(certificate.issueDate), qrBoxX + qrBoxSize / 2, valY + 34, { align: "center" });
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(7.5);
//       doc.setTextColor(140, 150, 148);
//       doc.text("to", qrBoxX + qrBoxSize / 2, valY + 46, { align: "center" });
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(10);
//       doc.setTextColor(...TEAL);
//       doc.text(formatDate(certificate.expiryDate), qrBoxX + qrBoxSize / 2, valY + 62, { align: "center" });

//       const footerY = H - 44;
//       doc.setFillColor(...TEAL);
//       doc.rect(0, footerY, W, 44, "F");
//       doc.setTextColor(255, 255, 255);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(9);
//       doc.text("Authorised by Vasai Virar City Municipal Corporation", 24, footerY + 26);
//       doc.setFont("helvetica", "italic");
//       doc.text("Authorised Signatory", W - 130, footerY + 26);

//       doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
//     }
//   };

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div>
//           <p className="text-xs font-semibold text-ink-500 print:hidden">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>{" "}
//             / {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
//           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
//         </div>
//         <div className="flex gap-2 print:hidden">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
//         {/* Header */}
//         <div className="relative overflow-hidden px-6 py-5 text-white" style={{ background: TEAL_GRADIENT }}>
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[10px] border-[#CA9E3A]/40"
//           />
//           <div className="relative flex items-center gap-4">
//             <img src={logo} alt="Vasai Virar City Municipal Corporation" className="h-14 w-14 shrink-0 rounded-full bg-white p-0.5" />
//             <div>
//               <p className="font-display text-[17px] font-bold leading-tight">VASAI VIRAR CITY MUNICIPAL CORPORATION</p>
//               <p className="text-[13px] text-white/85">वसई विरार शहर महानगरपालिका</p>
//               <p className="mt-0.5 text-[11px] font-medium text-[#E9CE8B]">Established: 3 July 2009</p>
//             </div>
//           </div>
//         </div>
//         <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

//         {/* Body */}
//         {/* <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-[auto_1fr_auto]"> */}
//         <div className="grid grid-cols-1 gap-6 p-6 sm:flex sm:flex-wrap sm:items-start sm:justify-start">
//           {/* Photo */}
//           <div className="h-32 w-28 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-50">
//             {vendor.documents?.photo?.url ? (
//               <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//             ) : (
//               <div className="flex h-full w-full items-center justify-center text-[11px] text-ink-400">Photo</div>
//             )}
//           </div>

//           {/* Details */}
//           <div>
//             <p className="font-display text-xl font-extrabold text-[#0B4D52]">
//               {vendor.personal.fullName.toUpperCase()}
//             </p>
//             {/* <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success-100 px-3 py-1 text-[11px] font-semibold text-success-600">
//               <FiCheckCircle size={12} /> Certified Street Vendor
//             </span> */}

//             <span className="mt-2 block w-fit items-center gap-1.5 rounded-full bg-success-100 px-3 py-1 text-[11px] font-semibold text-success-600">
//               <span className="inline-flex items-center gap-1.5">
//                 <FiCheckCircle size={12} /> Certified Street Vendor
//               </span>
//             </span>

//             {/* columns brought close together: fixed narrow width instead of stretching to 1fr, tight gap */}
//             {/* <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3.5 sm:[grid-template-columns:repeat(2,minmax(0,220px))]"> */}

//             {/* narrower fixed columns + wrapped in an inline block so the grid hugs together, not stretched */}
//             <div className="mt-4 inline-grid grid-cols-1 gap-x-3 gap-y-3.5 sm:[grid-template-columns:repeat(2,170px)]">
//               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNumber} />
//               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address.zone} />

//               <FieldRow
//                 icon={FiCalendar}
//                 label="Date of Birth / Age"
//                 value={`${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`}
//               />
//               <FieldRow icon={FiHome} label="Ward" value={vendor.address.ward} />

//               <FieldRow icon={FiUser} label="Gender" value={vendor.personal.gender || "-"} />
//               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business.businessTiming || "-"} />

//               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal.mobile} />
//               <FieldRow icon={FiFileText} label="Address" value={vendor.address.permanentAddress} />

//               <FieldRow icon={FiBriefcase} label="Type of Business" value={vendor.business.businessCategory} />
//               <FieldRow icon={FiBriefcase} label="Sale Type" value={saleType(vendor.business.vendorType)} />
//             </div>
//           </div>

//           {/* QR + Validity */}
//           <div className="flex flex-col items-center gap-4 print:hidden sm:print:flex">
//             <Link
//               to={`/verify/${vendor.id}`}
//               className="overflow-hidden rounded-xl border border-ink-100 shadow-[var(--shadow-soft)]"
//             >
//               <div className="p-3">
//                 <QRCodeSVG value={verifyUrl} size={128} />
//               </div>
//               <div className="py-1.5 text-center text-[11px] font-bold tracking-wide text-white" style={{ background: TEAL_GRADIENT }}>
//                 SCAN TO VERIFY
//               </div>
//             </Link>

//             <div className="w-full rounded-xl border border-ink-100 p-3 text-center">
//               <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#0B4D52]">Validity Period</p>
//               <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#0B4D52]">
//                 <FiCalendar size={13} />
//                 {formatDate(certificate.issueDate)}
//               </div>
//               <p className="my-0.5 text-[10px] text-ink-400">to</p>
//               <p className="text-[13px] font-bold text-[#0B4D52]">{formatDate(certificate.expiryDate)}</p>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div
//           className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-[12px] text-white"
//           style={{ background: TEAL_GRADIENT }}
//         >
//           <span className="flex items-center gap-2">
//             <FiShield size={14} className="text-[#E9CE8B]" />
//             Authorised by Vasai Virar City Municipal Corporation
//           </span>
//           <span className="italic text-white/90">Authorised Signatory</span>
//         </div>
//       </div>

//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.id}`)}>
//           Open Verification Screen
//         </Button>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import {
//   FiDownload,
//   FiPrinter,
//   FiShield,
//   FiExternalLink,
//   FiCreditCard,
//   FiCalendar,
//   FiUser,
//   FiPhone,
//   FiBriefcase,
//   FiMapPin,
//   FiHome,
//   FiClock,
//   FiFileText,
//   FiCheckCircle,
// } from "react-icons/fi";
// import jsPDF from "jspdf";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// import logo from "../../../assets/logovvcmc.jpg";

// import {
//   selectCertificateByVendorId,
//   selectAllCertificates,
//   addCertificate,
//   makeCertificateDraft,
// } from "../../../features/certificates/certificatesSlice";
// import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// const TEAL_GRADIENT = "linear-gradient(160deg, #0B4D52 0%, #08464B 55%, #062E34 100%)";
// const TEAL = [11, 77, 82];
// const GOLD = [202, 158, 58];

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// }

// // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile.
// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// }

// function FieldRow({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-start gap-2.5">
//       <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0B4D52]/10 text-[#0B4D52]">
//         <Icon size={13} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[11.5px] font-semibold text-[#0B4D52]">{label}</p>
//         <p className="text-[13px] text-ink-800 break-words">{value}</p>
//       </div>
//     </div>
//   );
// }

// export default function SmartCard() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const vendor = useSelector((s) => selectVendorById(s, id));
//   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
//   const certificates = useSelector(selectAllCertificates);
//   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

//   useEffect(() => {
//     if (vendor && vendor.status === "Approved" && !certificate) {
//       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [vendor?.id, vendor?.status, certificate]);

//   const verifyUrl = useMemo(() => {
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.id}`;
//   }, [vendor]);

//   const cardCode = vendor ? `CARD-${vendor.id.replace(/\D/g, "") || vendor.id}` : "";

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

//   if (vendor.status !== "Approved") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           Smart Card is only available for approved vendors.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   if (!certificate) {
//     return (
//       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
//         Generating certificate...
//       </Card>
//     );
//   }

//   const handlePrint = () => window.print();

//   const handleDownloadPdf = () => {
//     const W = 620;
//     const H = 460;
//     const doc = new jsPDF({ unit: "pt", format: [W, H] });

//     // ---------- Header ----------
//     doc.setFillColor(...TEAL);
//     doc.rect(0, 0, W, 92, "F");

//     try {
//       doc.setFillColor(255, 255, 255);
//       doc.circle(50, 46, 26, "F");
//       doc.addImage(logo, "JPEG", 26, 22, 48, 48, undefined, "FAST");
//     } catch {
//       // logo failed to embed - continue without it
//     }

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(13);
//     doc.text("VASAI VIRAR CITY MUNICIPAL CORPORATION", 92, 38);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10.5);
//     doc.text("Vasai Virar Shahar Mahanagarpalika", 92, 54);
//     doc.setTextColor(...GOLD);
//     doc.setFontSize(9);
//     doc.text("Established: 3 July 2009", 92, 70);

//     doc.setDrawColor(...GOLD);
//     doc.setLineWidth(6);
//     doc.circle(W - 30, 92, 55, "S");

//     doc.setFillColor(...GOLD);
//     doc.rect(0, 92, W, 4, "F");

//     // ---------- Photo ----------
//     const photoX = 24;
//     const photoY = 116;
//     const photoW = 90;
//     const photoH = 108;
//     doc.setDrawColor(230, 230, 230);
//     doc.setFillColor(245, 247, 246);
//     doc.roundedRect(photoX, photoY, photoW, photoH, 8, 8, "FD");
//     if (vendor.documents?.photo?.url) {
//       try {
//         doc.addImage(vendor.documents.photo.url, "JPEG", photoX, photoY, photoW, photoH, undefined, "FAST");
//       } catch {
//         // ignore if not embeddable (e.g. cross-origin)
//       }
//     }

//     // ---------- Name + badge ----------
//     const infoX = photoX + photoW + 20;
//     doc.setTextColor(...TEAL);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.text(vendor.personal.fullName.toUpperCase(), infoX, photoY + 16);

//     doc.setFillColor(213, 245, 227);
//     doc.roundedRect(infoX, photoY + 26, 150, 18, 9, 9, "F");
//     doc.setTextColor(22, 163, 74);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8.5);
//     doc.text("CERTIFIED STREET VENDOR", infoX + 20, photoY + 38);

//     // ---------- Two-column fields (compressed gap) ----------
//     const colGap = 10;
//     const colWidth = 155;
//     const col1X = infoX;
//     const col2X = infoX + colWidth + colGap;
//     const fieldsStartY = photoY + 58;
//     const rowGap = 32;

//     const leftRows = [
//       ["ID Card Number", certificate.certificateNumber],
//       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
//       ["Gender", vendor.personal.gender || "-"],
//       ["Mobile Number", vendor.personal.mobile],
//       ["Type of Business", vendor.business.businessCategory],
//     ];
//     const rightRows = [
//       ["Vending Zone", vendor.address.zone],
//       ["Ward", vendor.address.ward],
//       ["Business Timing", vendor.business.businessTiming || "-"],
//       ["Address", vendor.address.permanentAddress],
//     ];

//     const drawField = (x, y, label, value) => {
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(8.5);
//       doc.setTextColor(...TEAL);
//       doc.text(String(label), x, y);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(9.5);
//       doc.setTextColor(15, 23, 42);
//       const lines = doc.splitTextToSize(String(value ?? "-"), colWidth);
//       doc.text(lines, x, y + 12);
//       return 12 * lines.length + rowGap - 12;
//     };

//     let yL = fieldsStartY;
//     leftRows.forEach(([label, value]) => {
//       yL += drawField(col1X, yL, label, value);
//     });

//     let yR = fieldsStartY;
//     rightRows.forEach(([label, value]) => {
//       yR += drawField(col2X, yR, label, value);
//     });

//     // ---------- QR + Validity (right side) ----------
//     const qrBoxX = W - 150;
//     const qrBoxY = 116;
//     const qrBoxSize = 120;
//     doc.setDrawColor(220, 224, 223);
//     doc.setLineWidth(1);
//     doc.roundedRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 8, 8, "S");

//     const qrCanvas = document.createElement("canvas");
//     try {
//       const svgEl = document.querySelector('a[href^="/verify/"] svg');
//       if (svgEl) {
//         const svgData = new XMLSerializer().serializeToString(svgEl);
//         const img = new Image();
//         const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
//         const url = URL.createObjectURL(svgBlob);
//         img.onload = () => {
//           qrCanvas.width = 300;
//           qrCanvas.height = 300;
//           const ctx = qrCanvas.getContext("2d");
//           ctx.fillStyle = "#ffffff";
//           ctx.fillRect(0, 0, 300, 300);
//           ctx.drawImage(img, 0, 0, 300, 300);
//           URL.revokeObjectURL(url);
//           const dataUrl = qrCanvas.toDataURL("image/png");
//           doc.addImage(dataUrl, "PNG", qrBoxX + 10, qrBoxY + 10, qrBoxSize - 20, qrBoxSize - 20);
//           finishPdf();
//         };
//         img.src = url;
//       } else {
//         finishPdf();
//       }
//     } catch {
//       finishPdf();
//     }

//     function finishPdf() {
//       doc.setFillColor(...TEAL);
//       doc.rect(qrBoxX, qrBoxY + qrBoxSize - 20, qrBoxSize, 20, "F");
//       doc.setTextColor(255, 255, 255);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(8);
//       doc.text("SCAN TO VERIFY", qrBoxX + qrBoxSize / 2, qrBoxY + qrBoxSize - 7, { align: "center" });

//       const valY = qrBoxY + qrBoxSize + 16;
//       doc.setDrawColor(220, 224, 223);
//       doc.roundedRect(qrBoxX, valY, qrBoxSize, 76, 8, 8, "S");
//       doc.setTextColor(...TEAL);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(7.5);
//       doc.text("VALIDITY PERIOD", qrBoxX + qrBoxSize / 2, valY + 16, { align: "center" });
//       doc.setFontSize(10);
//       doc.text(formatDate(certificate.issueDate), qrBoxX + qrBoxSize / 2, valY + 34, { align: "center" });
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(7.5);
//       doc.setTextColor(140, 150, 148);
//       doc.text("to", qrBoxX + qrBoxSize / 2, valY + 46, { align: "center" });
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(10);
//       doc.setTextColor(...TEAL);
//       doc.text(formatDate(certificate.expiryDate), qrBoxX + qrBoxSize / 2, valY + 62, { align: "center" });

//       const footerY = H - 44;
//       doc.setFillColor(...TEAL);
//       doc.rect(0, footerY, W, 44, "F");
//       doc.setTextColor(255, 255, 255);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(9);
//       doc.text("Authorised by Vasai Virar City Municipal Corporation", 24, footerY + 26);
//       doc.setFont("helvetica", "italic");
//       doc.text("Authorised Signatory", W - 130, footerY + 26);

//       doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
//     }
//   };

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div>
//           <p className="text-xs font-semibold text-ink-500 print:hidden">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>{" "}
//             / {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
//           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
//         </div>
//         <div className="flex gap-2 print:hidden">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]"> */}
//       <div className="mx-auto max-w-[820px] overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
//         {/* Header */}
//         <div className="relative overflow-hidden px-6 py-5 text-white" style={{ background: TEAL_GRADIENT }}>
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[10px] border-[#CA9E3A]/40"
//           />
//           <div className="relative flex items-center gap-4">
//             <img src={logo} alt="Vasai Virar City Municipal Corporation" className="h-14 w-14 shrink-0 rounded-full bg-white p-0.5" />
//             <div>
//               <p className="font-display text-[17px] font-bold leading-tight">VASAI VIRAR CITY MUNICIPAL CORPORATION</p>
//               <p className="text-[13px] text-white/85">वसई विरार शहर महानगरपालिका</p>
//               <p className="mt-0.5 text-[11px] font-medium text-[#E9CE8B]">Established: 3 July 2009</p>
//             </div>
//           </div>
//         </div>
//         <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

//         {/* Body */}
//         <div className="grid grid-cols-1 gap-6 p-6 sm:flex sm:flex-wrap sm:items-start sm:justify-start">
//           {/* Photo */}
//           <div className="h-32 w-28 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-50">
//             {vendor.documents?.photo?.url ? (
//               <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//             ) : (
//               <div className="flex h-full w-full items-center justify-center text-[11px] text-ink-400">Photo</div>
//             )}
//           </div>

//           {/* Details */}
//           <div className="sm:shrink-0">
//             <p className="font-display text-xl font-extrabold text-[#0B4D52]">
//               {vendor.personal.fullName.toUpperCase()}
//             </p>
//             <span className="mt-2 block w-fit items-center gap-1.5 rounded-full bg-success-100 px-3 py-1 text-[11px] font-semibold text-success-600">
//               <span className="inline-flex items-center gap-1.5">
//                 <FiCheckCircle size={12} /> Certified Street Vendor
//               </span>
//             </span>

//             <div className="mt-4 inline-grid grid-cols-1 gap-x-3 gap-y-3.5 sm:[grid-template-columns:repeat(2,170px)]">
//               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNumber} />
//               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address.zone} />

//               <FieldRow
//                 icon={FiCalendar}
//                 label="Date of Birth / Age"
//                 value={`${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`}
//               />
//               <FieldRow icon={FiHome} label="Ward" value={vendor.address.ward} />

//               <FieldRow icon={FiUser} label="Gender" value={vendor.personal.gender || "-"} />
//               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business.businessTiming || "-"} />

//               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal.mobile} />
//               <FieldRow icon={FiFileText} label="Address" value={vendor.address.permanentAddress} />

//               <FieldRow icon={FiBriefcase} label="Type of Business" value={vendor.business.businessCategory} />
//               <FieldRow icon={FiBriefcase} label="Sale Type" value={saleType(vendor.business.vendorType)} />
//             </div>
//           </div>

//           {/* QR + Validity */}
//           <div className="flex flex-col items-center gap-4 print:hidden sm:shrink-0 sm:print:flex">
//             <Link
//               to={`/verify/${vendor.id}`}
//               className="overflow-hidden rounded-xl border border-ink-100 shadow-[var(--shadow-soft)]"
//             >
//               <div className="p-3">
//                 <QRCodeSVG value={verifyUrl} size={128} />
//               </div>
//               <div className="py-1.5 text-center text-[11px] font-bold tracking-wide text-white" style={{ background: TEAL_GRADIENT }}>
//                 SCAN TO VERIFY
//               </div>
//             </Link>

//             <div className="w-full rounded-xl border border-ink-100 p-3 text-center">
//               <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#0B4D52]">Validity Period</p>
//               <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#0B4D52]">
//                 <FiCalendar size={13} />
//                 {formatDate(certificate.issueDate)}
//               </div>
//               <p className="my-0.5 text-[10px] text-ink-400">to</p>
//               <p className="text-[13px] font-bold text-[#0B4D52]">{formatDate(certificate.expiryDate)}</p>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div
//           className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-[12px] text-white"
//           style={{ background: TEAL_GRADIENT }}
//         >
//           <span className="flex items-center gap-2">
//             <FiShield size={14} className="text-[#E9CE8B]" />
//             Authorised by Vasai Virar City Municipal Corporation
//           </span>
//           <span className="italic text-white/90">Authorised Signatory</span>
//         </div>
//       </div>

//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.id}`)}>
//           Open Verification Screen
//         </Button>
//       </div>
//     </div>
//   );
// }























// import { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import {
//   FiDownload,
//   FiPrinter,
//   FiShield,
//   FiExternalLink,
//   FiCreditCard,
//   FiCalendar,
//   FiUser,
//   FiPhone,
//   FiBriefcase,
//   FiMapPin,
//   FiHome,
//   FiClock,
//   FiFileText,
//   FiCheckCircle,
//   FiAlertTriangle,
//   FiRefreshCw,
//   FiMessageCircle,
// } from "react-icons/fi";
// import jsPDF from "jspdf";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// import logo from "../../../assets/logovvcmc.jpg";

// import {
//   selectCertificateByVendorId,
//   selectAllCertificates,
//   addCertificate,
//   makeCertificateDraft,
// } from "../../../features/certificates/certificatesSlice";

// import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// const TEAL = "#004C4D";
// const TEAL_DARK = "#003B3D";
// const GOLD = "#D5A936";
// const GOLD_LIGHT = "#F0D487";
// const CREAM = "#FCFCF9";

// const VVCMC_HELPLINE = "0250-XXXXXXX";
// const VVCMC_WHATSAPP = "+91 XXXXXXXXXX";
// const VVCMC_ADDRESS =
//   "VVCMC Main Office, Near Fire Brigade, Vasai (West), Palghar - 401202, Maharashtra.";

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// }

// /* ----------------------------- Decorative pieces ----------------------------- */

// function HeaderTexture() {
//   return (
//     <div className="pointer-events-none absolute right-4 top-4 grid grid-cols-6 gap-1 opacity-20" aria-hidden="true">
//       {Array.from({ length: 24 }).map((_, i) => (
//         <span key={i} className="h-1 w-1 rounded-full bg-white" />
//       ))}
//     </div>
//   );
// }

// function VVMonogram({ size = 48 }) {
//   return (
//     <div
//       className="flex items-center justify-center font-black leading-none"
//       style={{ fontSize: size, letterSpacing: "-0.13em", transform: "scaleX(.88)" }}
//       aria-hidden="true"
//     >
//       <span style={{ color: TEAL }}>V</span>
//       <span style={{ color: GOLD, marginLeft: size * -0.24 }}>V</span>
//     </div>
//   );
// }

// function RoundIcon({ icon: Icon, dark = false }) {
//   return (
//     <div
//       className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
//         dark ? "border-white/30 bg-white/10 text-white" : "border-[#005050]/35 bg-white text-[#005050]"
//       }`}
//     >
//       <Icon size={13} />
//     </div>
//   );
// }

// function FieldRow({ icon: Icon, label, value }) {
//   return (
//     <div className="flex min-w-0 items-start gap-2.5 border-b border-[#005050]/15 pb-2.5">
//       <RoundIcon icon={Icon} />
//       <div className="min-w-0 pt-0.5">
//         <p className="text-[8px] font-black uppercase tracking-wide text-[#005050]">{label}</p>
//         <p className="mt-0.5 break-words text-[11.5px] font-medium leading-[1.15] text-slate-900">{value || "-"}</p>
//       </div>
//     </div>
//   );
// }

// function VerifiedBadge() {
//   return (
//     <div className="relative flex h-[84px] w-[84px] items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,.08)]">
//       <div
//         className="absolute inset-[6px] rounded-full border-[2.5px] border-[#005050]"
//         style={{
//           clipPath:
//             "polygon(50% 0%, 61% 5%, 72% 3%, 81% 11%, 92% 14%, 95% 26%, 100% 36%, 95% 48%, 98% 59%, 90% 68%, 88% 80%, 77% 85%, 70% 95%, 57% 94%, 47% 100%, 37% 94%, 25% 97%, 19% 87%, 8% 81%, 10% 68%, 2% 59%, 6% 47%, 1% 37%, 8% 27%, 9% 15%, 21% 12%, 29% 3%, 40% 6%)",
//         }}
//       />
//       <div className="relative z-10 flex flex-col items-center justify-center text-[#005050]">
//         <span className="text-[6.5px] font-black tracking-widest">VERIFIED</span>
//         <FiCheckCircle size={22} className="my-0.5" />
//         <span className="text-[6.5px] font-black tracking-widest">VENDOR</span>
//       </div>
//     </div>
//   );
// }

// const TERMS = [
//   { icon: FiShield, text: "This card is non-transferable." },
//   { icon: FiUser, text: "This card is the property of Vasai Virar City Municipal Corporation." },
//   { icon: FiAlertTriangle, text: "Misuse of this card is punishable as per law." },
//   { icon: FiMapPin, text: "Display this card at your vending location." },
//   { icon: FiRefreshCw, text: "Renewal of this card is subject to rules and regulations." },
// ];

// export default function SmartCard() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const vendor = useSelector((s) => selectVendorById(s, id));
//   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
//   const certificates = useSelector(selectAllCertificates);
//   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

//   useEffect(() => {
//     if (vendor && vendor.status === "Approved" && !certificate) {
//       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [vendor?.id, vendor?.status, certificate]);

//   const verifyUrl = useMemo(() => {
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.id}`;
//   }, [vendor]);

//   const cardCode = vendor ? `CARD-${vendor.id.replace(/\D/g, "") || vendor.id}` : "";

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

//   if (vendor.status !== "Approved") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">Smart Card is only available for approved vendors.</p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   if (!certificate) {
//     return (
//       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
//         Generating certificate...
//       </Card>
//     );
//   }

//   const handlePrint = () => window.print();

//   /*
//    * PDF follows the same portrait proportions as the physical card.
//    * The live HTML card remains the primary visual design.
//    */
//   const handleDownloadPdf = () => {
//     const W = 540;
//     const H = 720;

//     const doc = new jsPDF({ unit: "pt", format: [W, H] });

//     doc.setFillColor(250, 251, 248);
//     doc.rect(0, 0, W, H, "F");

//     doc.setFillColor(0, 76, 77);
//     doc.roundedRect(0, 0, W, 160, 20, 20, "F");

//     doc.setFillColor(...[213, 169, 54]);
//     doc.rect(0, 156, W, 5, "F");

//     try {
//       doc.setFillColor(255, 255, 255);
//       doc.circle(60, 60, 34, "F");
//       doc.addImage(logo, "JPEG", 28, 28, 64, 64, undefined, "FAST");
//     } catch {}

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(24);
//     doc.text("VASAI VIRAR", 118, 52);

//     doc.setTextColor(...[240, 212, 135]);
//     doc.setFontSize(12);
//     doc.text("CITY MUNICIPAL CORPORATION", 118, 70);

//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(10);
//     doc.text("Vasai Virar City Municipal Corporation", 118, 88);

//     doc.setTextColor(...[240, 212, 135]);
//     doc.setFontSize(9);
//     doc.text("Established: 3 July 2009", 118, 104);

//     const photoX = 22;
//     const photoY = 190;
//     const photoW = 122;
//     const photoH = 152;

//     doc.setDrawColor(...[0, 76, 77]);
//     doc.setLineWidth(2);
//     doc.roundedRect(photoX, photoY, photoW, photoH, 12, 12, "S");

//     if (vendor.documents?.photo?.url) {
//       try {
//         doc.addImage(vendor.documents.photo.url, "JPEG", photoX, photoY, photoW, photoH, undefined, "FAST");
//       } catch {}
//     }

//     doc.setTextColor(...[0, 76, 77]);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(22);
//     doc.text(vendor.personal.fullName.toUpperCase(), 166, 225);

//     doc.setFillColor(...[0, 76, 77]);
//     doc.roundedRect(166, 240, 190, 26, 13, 13, "F");

//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(9);
//     doc.text("CERTIFIED STREET VENDOR", 184, 257);

//     const rows = [
//       ["ID CARD NUMBER", certificate.certificateNumber],
//       ["DATE OF BIRTH / AGE", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
//       ["GENDER", vendor.personal.gender || "-"],
//       ["MOBILE NUMBER", vendor.personal.mobile || "-"],
//       ["VENDING ZONE", vendor.address.zone || "-"],
//       ["WARD", vendor.address.ward || "-"],
//       ["BUSINESS TIMING", vendor.business.businessTiming || "-"],
//       ["ADDRESS", vendor.address.permanentAddress || "-"],
//     ];

//     let y = 390;

//     rows.forEach(([label, value], index) => {
//       const x = index % 2 === 0 ? 24 : 280;

//       if (index % 2 === 0) {
//         doc.setDrawColor(215, 225, 221);
//         doc.line(24, y + 32, 256, y + 32);
//       }

//       doc.setTextColor(...[0, 76, 77]);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(7);
//       doc.text(label, x, y);

//       doc.setTextColor(20, 30, 30);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(10);

//       const lines = doc.splitTextToSize(String(value), 215);
//       doc.text(lines, x, y + 13);

//       if (index % 2 === 1) {
//         doc.line(280, y + 32, 516, y + 32);
//         y += 46;
//       }
//     });

//     doc.setFillColor(...[232, 239, 234]);
//     doc.roundedRect(24, 578, 325, 52, 12, 12, "F");

//     doc.setTextColor(...[0, 76, 77]);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(7);
//     doc.text("TYPE OF BUSINESS", 40, 598);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10);
//     doc.text(String(vendor.business.businessCategory || "-"), 40, 614);

//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(7);
//     doc.text("SALE TYPE", 205, 598);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10);
//     doc.text(saleType(vendor.business.vendorType), 205, 614);

//     doc.setFillColor(...[0, 76, 77]);
//     doc.roundedRect(365, 578, 150, 80, 12, 12, "F");

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8);
//     doc.text("VALIDITY PERIOD", 440, 596, { align: "center" });

//     doc.setFontSize(11);
//     doc.text(formatDate(certificate.issueDate), 440, 616, { align: "center" });

//     doc.setFontSize(7);
//     doc.text("TO", 440, 632, { align: "center" });

//     doc.setFontSize(11);
//     doc.text(formatDate(certificate.expiryDate), 440, 649, { align: "center" });

//     doc.setFillColor(...[0, 59, 61]);
//     doc.rect(0, 658, W, 62, "F");

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8);
//     doc.text("Authorised by Vasai Virar City Municipal Corporation", 25, 695);

//     doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
//   };

//   return (
//     <div className="space-y-5">
//       {/* PAGE HEADER */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>{" "}
//             / {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
//           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
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

//       {/* ======================= PHYSICAL SMART CARD ======================= */}
//       <div className="grid grid-cols-1 items-stretch justify-items-center gap-6 px-1 py-5 lg:grid-cols-2">

//         {/* ============================== FRONT ============================== */}
//         <div className="smart-card-front flex h-full w-full max-w-[440px] flex-col overflow-hidden rounded-[20px] border border-[#004C4D]/15 bg-[#FCFCF9] shadow-[0_18px_44px_rgba(0,65,65,.20)]">
//           {/* HEADER — curved teal wedge */}
//           <div className="relative h-[118px] overflow-hidden bg-[#F8F7F2]">

//             {/* Teal curved wedge */}
//             <div
//               className="absolute left-0 top-0 h-full w-[72%]"
//               style={{
//                 background: TEAL,
//                 borderBottomRightRadius: "100% 100%",
//               }}
//             />

//             {/* Gold outline following the curve */}
//             <div
//               className="pointer-events-none absolute left-0 top-0 h-full w-[72%]"
//               style={{
//                 borderRight: `3px solid ${GOLD}`,
//                 borderBottom: `5px solid ${GOLD}`,
//                 borderBottomRightRadius: "100% 100%",
//               }}
//             />

//             {/* Optional subtle texture — stays inside teal */}
//             <div className="pointer-events-none absolute inset-0">
//               <HeaderTexture />
//             </div>

//             {/* Header content */}
//             <div className="relative z-10 flex items-start px-5 pt-4">
//               <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-lg">
//                 <img
//                   src={logo}
//                   alt="Vasai Virar City Municipal Corporation"
//                   className="h-full w-full rounded-full object-contain"
//                 />
//               </div>

//               <div className="ml-3 pt-0.5 text-white">
//                 <h2 className="font-display text-[20px] font-black leading-none tracking-tight">VASAI VIRAR</h2>
//                 <p className="mt-1 text-[9px] font-black uppercase tracking-wide text-[#F1C85B]">
//                   City Municipal Corporation
//                 </p>
//                 <p className="mt-0.5 text-[8px]">वसई विरार शहर महानगरपालिका</p>
//                 <p className="mt-1 text-[7px] font-semibold text-[#F1C85B]">Established: 3 July 2009</p>
//               </div>
//             </div>
//           </div>

//           {/* BODY — normal document flow, grows with content */}
//           <div className="flex-1 px-5 pb-4 pt-5">
//             {/* Vendor identity row */}
//             <div className="flex flex-wrap items-start gap-3">
//               <div className="h-[104px] w-[84px] shrink-0 overflow-hidden rounded-[11px] border-2 border-[#005050] bg-white">
//                 {vendor.documents?.photo?.url ? (
//                   <img
//                     src={vendor.documents.photo.url}
//                     alt={vendor.personal.fullName}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-full w-full items-center justify-center bg-[#F3F6FA] text-[10px] text-slate-400">
//                     Photo
//                   </div>
//                 )}
//               </div>

//               <div className="min-w-0 flex-1 pt-1.5">
//                 <h2 className="font-display text-[18px] font-black uppercase leading-[1.1] text-[#005050]">
//                   {vendor.personal.fullName}
//                 </h2>
//                 <div className="mt-2.5 inline-flex max-w-[145px] items-center gap-1.5 rounded-full bg-[#005050] px-3 py-1.5 text-[7.5px] font-black uppercase leading-tight text-white">
//                   <FiCheckCircle size={11} className="shrink-0" />
//                   Certified Street Vendor
//                 </div>
//               </div>

//               <Link
//                 to={`/verify/${vendor.id}`}
//                 className="w-[84px] shrink-0 overflow-hidden rounded-[11px] border-2 border-[#005050] bg-white shadow-md print:hidden"
//               >
//                 <div className="flex justify-center p-1.5">
//                   <QRCodeSVG value={verifyUrl} size={70} level="M" />
//                 </div>
//                 <div className="bg-[#005050] py-1.5 text-center text-[6.5px] font-black tracking-wide text-white">
//                   SCAN TO VERIFY
//                 </div>
//               </Link>
//             </div>

//             <div className="my-3.5 h-px bg-[#005050]/20" />

//             {/* Information grid */}
//             <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
//               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNumber} />
//               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address.zone} />
//               <FieldRow
//                 icon={FiCalendar}
//                 label="Date of Birth / Age"
//                 value={`${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`}
//               />
//               <FieldRow icon={FiHome} label="Ward" value={vendor.address.ward} />
//               <FieldRow icon={FiUser} label="Gender" value={vendor.personal.gender} />
//               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business.businessTiming} />
//               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal.mobile} />
//               <FieldRow icon={FiFileText} label="Address" value={vendor.address.permanentAddress} />
//             </div>

//             {/* Bottom information row */}
//             <div className="mt-3.5 flex flex-wrap items-stretch gap-2.5">
//               <div className="grid min-w-[180px] flex-1 grid-cols-2 overflow-hidden rounded-[11px] bg-[#E7EEE9]">
//                 <div className="flex min-w-0 items-center gap-1.5 border-r border-[#005050]/20 px-2.5 py-2">
//                   <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#005050] text-white">
//                     <FiBriefcase size={13} />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-[7px] font-black uppercase text-[#005050]">Type of Business</p>
//                     <p className="mt-0.5 truncate text-[10.5px] font-medium text-slate-900">
//                       {vendor.business.businessCategory || "-"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex min-w-0 items-center gap-1.5 px-2.5 py-2">
//                   <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#005050] text-white">
//                     <FiBriefcase size={13} />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-[7px] font-black uppercase text-[#005050]">Sale Type</p>
//                     <p className="mt-0.5 text-[10.5px] font-medium text-slate-900">
//                       {saleType(vendor.business.vendorType)}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-[96px] shrink-0 overflow-hidden rounded-[11px] bg-[#005050] text-white shadow-md">
//                 <div className="bg-[#006B69] px-1.5 py-1.5 text-center">
//                   <p className="text-[7px] font-black uppercase tracking-wide">Validity Period</p>
//                 </div>
//                 <div className="px-2 py-1.5 text-center">
//                   <FiCalendar size={17} className="mx-auto mb-1 text-[#F0C34B]" />
//                   <p className="text-[9px] font-black">{formatDate(certificate.issueDate)}</p>
//                   <p className="my-0.5 text-[6px] text-white/65">TO</p>
//                   <p className="text-[9px] font-black">{formatDate(certificate.expiryDate)}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* FRONT FOOTER — normal flow, decoration clipped to footer only */}
//           <div className="relative mt-auto shrink-0 overflow-hidden px-5 py-3" style={{ background: TEAL_DARK }}>
//             <div className="pointer-events-none absolute -bottom-16 -right-5 h-28 w-56 rounded-full border-[10px] border-white/5" />
//             <div className="relative flex items-center justify-between gap-3">
//               <div className="flex items-center gap-2.5">
//                 <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#E6B63F] text-[#E6B63F]">
//                   <FiShield size={14} />
//                 </div>
//                 <div>
//                   <p className="text-[7px] text-white/70">Authorised by</p>
//                   <p className="text-[9.5px] font-black text-white">Vasai Virar City Municipal Corporation</p>
//                 </div>
//               </div>
//               <VVMonogram size={26} />
//             </div>
//           </div>
//         </div>

//         {/* =============================== BACK =============================== */}
//         <div className="smart-card-back flex h-full w-full max-w-[440px] flex-col overflow-hidden rounded-[20px] border border-[#004C4D]/15 bg-[#FCFCF9] shadow-[0_18px_44px_rgba(0,65,65,.20)]">

//           {/* HEADER — teal only as a curved wedge behind the badge, rest stays cream */}
//           <div className="relative h-[152px] overflow-hidden">
//             <div
//               className="absolute left-0 top-0 h-full w-[58%]"
//               style={{ background: TEAL, borderBottomRightRadius: "999px 999px" }}
//             />
//             <div
//               className="absolute left-0 top-0 h-full w-[58%]"
//               style={{
//                 border: `2px solid ${GOLD}`,
//                 borderTop: "none",
//                 borderLeft: "none",
//                 borderBottomRightRadius: "999px 999px",
//               }}
//               aria-hidden="true"
//             />
//             <div className="absolute left-5 top-5">
//               <VerifiedBadge />
//             </div>
//           </div>

//          {/* BODY */}
// <div className="flex flex-1 flex-col px-5 pb-4 pt-2">
//   <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1.3fr_1fr]">
//     {/* TERMS */}
//     <div className="min-w-0">
//       <span className="inline-flex rounded-full bg-[#005050] px-3.5 py-1.5 text-[8.5px] font-black uppercase tracking-wide text-white">
//         Terms &amp; Conditions
//       </span>
//       <div className="mt-3 space-y-3">
//         {TERMS.map(({ icon: Icon, text }) => (
//           <div key={text} className="flex items-start gap-2.5">
//             <RoundIcon icon={Icon} />
//             <p className="pt-0.5 text-[9.5px] leading-[1.35] text-slate-900">{text}</p>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* BRAND */}
//     <div className="flex min-w-0 flex-col items-center pt-1.5 text-center">
//       <VVMonogram size={54} />
//       <p className="mt-1 text-[13.5px] font-black text-[#005050]">SMART VENDOR</p>
//       <div className="mt-2.5 flex items-center justify-center gap-1.5">
//         <span className="h-px w-5 bg-[#005050]/45" />
//         <span className="text-[7px] uppercase tracking-[0.13em] text-[#005050]">Better City</span>
//         <span className="h-px w-5 bg-[#005050]/45" />
//       </div>
//       <p className="mt-1 text-[7.5px] uppercase tracking-[0.15em] text-[#005050]">Better Tomorrow</p>
//     </div>
//   </div>

//   {/* Spacer — pushes the block below all the way down to sit just above the footer */}
//   <div className="flex-1" />

//   {/* Emergency contact + signature, anchored to the bottom of the card */}
// <div className="grid grid-cols-1 items-end gap-3.5 sm:grid-cols-[1.4fr_1fr]">
//   <div className="overflow-hidden rounded-[13px] border-2 border-[#005050] bg-white">
//     <div className="bg-[#005050] px-2.5 py-1.5 text-[7.5px] font-black uppercase tracking-wide text-white">
//       Emergency Contact
//     </div>
//     <div className="grid grid-cols-2 divide-x divide-[#005050]/20">
//       <div className="px-2.5 py-2.5">
//         <p className="text-[7px] font-bold text-[#005050]">VVCMC Helpline</p>
//         <div className="mt-1.5 flex items-center gap-1.5">
//           <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#005050] text-white">
//             <FiPhone size={11} />
//           </div>
//           <span className="truncate text-[7px] font-bold text-slate-900">{VVCMC_HELPLINE}</span>
//         </div>
//       </div>
//       <div className="px-2.5 py-2.5">
//         <p className="text-[7px] font-bold text-[#005050]">WhatsApp Support</p>
//         <div className="mt-1.5 flex items-center gap-1.5">
//           <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
//             <FiMessageCircle size={11} />
//           </div>
//           <span className="truncate text-[7px] font-bold text-slate-900">{VVCMC_WHATSAPP}</span>
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className="pb-1 text-center">
//     <div className="mx-auto h-px w-20 bg-slate-300" />
//     <p className="mt-1.5 text-[8px] text-slate-500">Authorised Signatory</p>
//     <p className="mt-0.5 text-[9px] font-black text-[#005050]">VVCMC</p>
//   </div>
// </div>
// </div>

//           {/* BACK FOOTER */}
//           <div className="relative mt-auto shrink-0 overflow-hidden px-5 py-4" style={{ background: TEAL_DARK }}>
//             <div className="pointer-events-none absolute -bottom-14 -right-5 h-32 w-48 rounded-full border-[12px] border-[#E3B337]/70" />
//             <div className="pointer-events-none absolute bottom-3 right-3 grid grid-cols-5 gap-1.5 opacity-70">
//               {Array.from({ length: 15 }).map((_, i) => (
//                 <span key={i} className="h-1 w-1 rounded-full bg-[#F0C34B]" />
//               ))}
//             </div>
//             <div className="relative flex items-start gap-2.5 text-white">
//               <FiMapPin size={16} className="mt-0.5 shrink-0 text-[#E6B63F]" />
//               <div className="pr-[15%]">
//                 <p className="text-[9px] font-black">Vasai Virar City Municipal Corporation</p>
//                 <p className="mt-1 text-[7px] leading-[1.45] text-white/85">{VVCMC_ADDRESS}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* VERIFICATION */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.id}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* PRINT RULES */}
//       <style>{`
//         @media print {
//           body {
//             background: white !important;
//           }

//           .smart-card-front,
//           .smart-card-back {
//             break-inside: avoid;
//             page-break-inside: avoid;
//             box-shadow: none !important;
//           }

//           @page {
//             size: A4 portrait;
//             margin: 8mm;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


// =======================================

// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import {
//   FiDownload,
//   FiPrinter,
//   FiShield,
//   FiExternalLink,
//   FiCreditCard,
//   FiCalendar,
//   FiUser,
//   FiPhone,
//   FiBriefcase,
//   FiMapPin,
//   FiHome,
//   FiClock,
//   FiFileText,
//   FiCheckCircle,
//   FiAlertTriangle,
//   FiRefreshCw,
//   FiMessageCircle,
//   FiLoader,
// } from "react-icons/fi";
// import jsPDF from "jspdf";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import logo from "../../../assets/logovvcmc.jpg";
// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";

// const TEAL = "#004C4D";
// const TEAL_DARK = "#003B3D";
// const GOLD = "#D5A936";
// const GOLD_LIGHT = "#F0D487";
// const CREAM = "#FCFCF9";

// const VVCMC_HELPLINE = "0250-XXXXXXX";
// const VVCMC_WHATSAPP = "+91 XXXXXXXXXX";
// const VVCMC_ADDRESS =
//   "VVCMC Main Office, Near Fire Brigade, Vasai (West), Palghar - 401202, Maharashtra.";

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// }

// /* ----------------------------- Decorative pieces ----------------------------- */

// function HeaderTexture() {
//   return (
//     <div className="pointer-events-none absolute right-4 top-4 grid grid-cols-6 gap-1 opacity-20" aria-hidden="true">
//       {Array.from({ length: 24 }).map((_, i) => (
//         <span key={i} className="h-1 w-1 rounded-full bg-white" />
//       ))}
//     </div>
//   );
// }

// function VVMonogram({ size = 48 }) {
//   return (
//     <div
//       className="flex items-center justify-center font-black leading-none"
//       style={{ fontSize: size, letterSpacing: "-0.13em", transform: "scaleX(.88)" }}
//       aria-hidden="true"
//     >
//       <span style={{ color: TEAL }}>V</span>
//       <span style={{ color: GOLD, marginLeft: size * -0.24 }}>V</span>
//     </div>
//   );
// }

// function RoundIcon({ icon: Icon, dark = false }) {
//   return (
//     <div
//       className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
//         dark ? "border-white/30 bg-white/10 text-white" : "border-[#005050]/35 bg-white text-[#005050]"
//       }`}
//     >
//       <Icon size={13} />
//     </div>
//   );
// }

// function FieldRow({ icon: Icon, label, value }) {
//   return (
//     <div className="flex min-w-0 items-start gap-2.5 border-b border-[#005050]/15 pb-2.5">
//       <RoundIcon icon={Icon} />
//       <div className="min-w-0 pt-0.5">
//         <p className="text-[8px] font-black uppercase tracking-wide text-[#005050]">{label}</p>
//         <p className="mt-0.5 break-words text-[11.5px] font-medium leading-[1.15] text-slate-900">{value || "-"}</p>
//       </div>
//     </div>
//   );
// }

// function VerifiedBadge() {
//   return (
//     <div className="relative flex h-[84px] w-[84px] items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,.08)]">
//       <div
//         className="absolute inset-[6px] rounded-full border-[2.5px] border-[#005050]"
//         style={{
//           clipPath:
//             "polygon(50% 0%, 61% 5%, 72% 3%, 81% 11%, 92% 14%, 95% 26%, 100% 36%, 95% 48%, 98% 59%, 90% 68%, 88% 80%, 77% 85%, 70% 95%, 57% 94%, 47% 100%, 37% 94%, 25% 97%, 19% 87%, 8% 81%, 10% 68%, 2% 59%, 6% 47%, 1% 37%, 8% 27%, 9% 15%, 21% 12%, 29% 3%, 40% 6%)",
//         }}
//       />
//       <div className="relative z-10 flex flex-col items-center justify-center text-[#005050]">
//         <span className="text-[6.5px] font-black tracking-widest">VERIFIED</span>
//         <FiCheckCircle size={22} className="my-0.5" />
//         <span className="text-[6.5px] font-black tracking-widest">VENDOR</span>
//       </div>
//     </div>
//   );
// }

// const TERMS = [
//   { icon: FiShield, text: "This card is non-transferable." },
//   { icon: FiUser, text: "This card is the property of Vasai Virar City Municipal Corporation." },
//   { icon: FiAlertTriangle, text: "Misuse of this card is punishable as per law." },
//   { icon: FiMapPin, text: "Display this card at your vending location." },
//   { icon: FiRefreshCw, text: "Renewal of this card is subject to rules and regulations." },
// ];

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

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

//   // Backend already generates the QR (encoding the public verify URL) at payment time —
//   // we reuse that same URL here so the QR on the card and the one you'd scan match exactly.
//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

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

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   const cardCode = certificate.certificateNo;

//   const handlePrint = () => window.print();

//   /*
//    * PDF follows the same portrait proportions as the physical card.
//    * The live HTML card remains the primary visual design.
//    */
//   const handleDownloadPdf = () => {
//     const W = 540;
//     const H = 720;

//     const doc = new jsPDF({ unit: "pt", format: [W, H] });

//     doc.setFillColor(250, 251, 248);
//     doc.rect(0, 0, W, H, "F");

//     doc.setFillColor(0, 76, 77);
//     doc.roundedRect(0, 0, W, 160, 20, 20, "F");

//     doc.setFillColor(...[213, 169, 54]);
//     doc.rect(0, 156, W, 5, "F");

//     try {
//       doc.setFillColor(255, 255, 255);
//       doc.circle(60, 60, 34, "F");
//       doc.addImage(logo, "JPEG", 28, 28, 64, 64, undefined, "FAST");
//     } catch {}

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(24);
//     doc.text("VASAI VIRAR", 118, 52);

//     doc.setTextColor(...[240, 212, 135]);
//     doc.setFontSize(12);
//     doc.text("CITY MUNICIPAL CORPORATION", 118, 70);

//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(10);
//     doc.text("Vasai Virar City Municipal Corporation", 118, 88);

//     doc.setTextColor(...[240, 212, 135]);
//     doc.setFontSize(9);
//     doc.text("Established: 3 July 2009", 118, 104);

//     const photoX = 22;
//     const photoY = 190;
//     const photoW = 122;
//     const photoH = 152;

//     doc.setDrawColor(...[0, 76, 77]);
//     doc.setLineWidth(2);
//     doc.roundedRect(photoX, photoY, photoW, photoH, 12, 12, "S");

//     if (vendor.documents?.photo) {
//       try {
//         doc.addImage(vendor.documents.photo, "JPEG", photoX, photoY, photoW, photoH, undefined, "FAST");
//       } catch {}
//     }

//     doc.setTextColor(...[0, 76, 77]);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(22);
//     doc.text((vendor.personal?.fullName || "").toUpperCase(), 166, 225);

//     doc.setFillColor(...[0, 76, 77]);
//     doc.roundedRect(166, 240, 190, 26, 13, 13, "F");

//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(9);
//     doc.text("CERTIFIED STREET VENDOR", 184, 257);

//     const rows = [
//       ["ID CARD NUMBER", certificate.certificateNo],
//       ["DATE OF BIRTH / AGE", `${formatDate(vendor.personal?.dob)} / ${calcAge(vendor.personal?.dob)} yrs`],
//       ["GENDER", vendor.personal?.gender || "-"],
//       ["MOBILE NUMBER", vendor.personal?.mobile || "-"],
//       ["VENDING ZONE", vendor.address?.zone || "-"],
//       ["WARD", vendor.address?.ward || vendor.ward || "-"],
//       ["BUSINESS TIMING", vendor.business?.businessTiming || "-"],
//       ["ADDRESS", vendor.address?.permanentAddress || "-"],
//     ];

//     let y = 390;

//     rows.forEach(([label, value], index) => {
//       const x = index % 2 === 0 ? 24 : 280;

//       if (index % 2 === 0) {
//         doc.setDrawColor(215, 225, 221);
//         doc.line(24, y + 32, 256, y + 32);
//       }

//       doc.setTextColor(...[0, 76, 77]);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(7);
//       doc.text(label, x, y);

//       doc.setTextColor(20, 30, 30);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(10);

//       const lines = doc.splitTextToSize(String(value), 215);
//       doc.text(lines, x, y + 13);

//       if (index % 2 === 1) {
//         doc.line(280, y + 32, 516, y + 32);
//         y += 46;
//       }
//     });

//     doc.setFillColor(...[232, 239, 234]);
//     doc.roundedRect(24, 578, 325, 52, 12, 12, "F");

//     doc.setTextColor(...[0, 76, 77]);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(7);
//     doc.text("TYPE OF BUSINESS", 40, 598);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10);
//     doc.text(String(vendor.business?.businessCategory || "-"), 40, 614);

//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(7);
//     doc.text("SALE TYPE", 205, 598);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10);
//     doc.text(saleType(vendor.business?.vendorType), 205, 614);

//     doc.setFillColor(...[0, 76, 77]);
//     doc.roundedRect(365, 578, 150, 80, 12, 12, "F");

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8);
//     doc.text("VALIDITY PERIOD", 440, 596, { align: "center" });

//     doc.setFontSize(11);
//     doc.text(formatDate(certificate.issueDate), 440, 616, { align: "center" });

//     doc.setFontSize(7);
//     doc.text("TO", 440, 632, { align: "center" });

//     doc.setFontSize(11);
//     doc.text(formatDate(certificate.validTill), 440, 649, { align: "center" });

//     doc.setFillColor(...[0, 59, 61]);
//     doc.rect(0, 658, W, 62, "F");

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8);
//     doc.text("Authorised by Vasai Virar City Municipal Corporation", 25, 695);

//     doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
//   };

//   return (
//     <div className="space-y-5">
//       {/* PAGE HEADER */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>{" "}
//             / {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
//           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
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

//       {/* ======================= PHYSICAL SMART CARD ======================= */}
//       <div className="grid grid-cols-1 items-stretch justify-items-center gap-6 px-1 py-5 lg:grid-cols-2">

//         {/* ============================== FRONT ============================== */}
//         <div className="smart-card-front flex h-full w-full max-w-[440px] flex-col overflow-hidden rounded-[20px] border border-[#004C4D]/15 bg-[#FCFCF9] shadow-[0_18px_44px_rgba(0,65,65,.20)]">
//           {/* HEADER — curved teal wedge */}
//           <div className="relative h-[118px] overflow-hidden bg-[#F8F7F2]">

//             {/* Teal curved wedge */}
//             <div
//               className="absolute left-0 top-0 h-full w-[72%]"
//               style={{
//                 background: TEAL,
//                 borderBottomRightRadius: "100% 100%",
//               }}
//             />

//             {/* Gold outline following the curve */}
//             <div
//               className="pointer-events-none absolute left-0 top-0 h-full w-[72%]"
//               style={{
//                 borderRight: `3px solid ${GOLD}`,
//                 borderBottom: `5px solid ${GOLD}`,
//                 borderBottomRightRadius: "100% 100%",
//               }}
//             />

//             {/* Optional subtle texture — stays inside teal */}
//             <div className="pointer-events-none absolute inset-0">
//               <HeaderTexture />
//             </div>

//             {/* Header content */}
//             <div className="relative z-10 flex items-start px-5 pt-4">
//               <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-lg">
//                 <img
//                   src={logo}
//                   alt="Vasai Virar City Municipal Corporation"
//                   className="h-full w-full rounded-full object-contain"
//                 />
//               </div>

//               <div className="ml-3 pt-0.5 text-white">
//                 <h2 className="font-display text-[20px] font-black leading-none tracking-tight">VASAI VIRAR</h2>
//                 <p className="mt-1 text-[9px] font-black uppercase tracking-wide text-[#F1C85B]">
//                   City Municipal Corporation
//                 </p>
//                 <p className="mt-0.5 text-[8px]">वसई विरार शहर महानगरपालिका</p>
//                 <p className="mt-1 text-[7px] font-semibold text-[#F1C85B]">Established: 3 July 2009</p>
//               </div>
//             </div>
//           </div>

//           {/* BODY — normal document flow, grows with content */}
//           <div className="flex-1 px-5 pb-4 pt-5">
//             {/* Vendor identity row */}
//             <div className="flex flex-wrap items-start gap-3">
//               <div className="h-[104px] w-[84px] shrink-0 overflow-hidden rounded-[11px] border-2 border-[#005050] bg-white">
//                 {vendor.documents?.photo ? (
//                   <img
//                     src={vendor.documents.photo}
//                     alt={vendor.personal?.fullName}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-full w-full items-center justify-center bg-[#F3F6FA] text-[10px] text-slate-400">
//                     Photo
//                   </div>
//                 )}
//               </div>

//               <div className="min-w-0 flex-1 pt-1.5">
//                 <h2 className="font-display text-[18px] font-black uppercase leading-[1.1] text-[#005050]">
//                   {vendor.personal?.fullName}
//                 </h2>
//                 <div className="mt-2.5 inline-flex max-w-[145px] items-center gap-1.5 rounded-full bg-[#005050] px-3 py-1.5 text-[7.5px] font-black uppercase leading-tight text-white">
//                   <FiCheckCircle size={11} className="shrink-0" />
//                   Certified Street Vendor
//                 </div>
//               </div>

//               <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="w-[84px] shrink-0 overflow-hidden rounded-[11px] border-2 border-[#005050] bg-white shadow-md print:hidden"
//               >
//                 <div className="flex justify-center p-1.5">
//                   <QRCodeSVG value={verifyUrl} size={70} level="M" />
//                 </div>
//                 <div className="bg-[#005050] py-1.5 text-center text-[6.5px] font-black tracking-wide text-white">
//                   SCAN TO VERIFY
//                 </div>
//               </Link>
//             </div>

//             <div className="my-3.5 h-px bg-[#005050]/20" />

//             {/* Information grid */}
//             <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
//               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNo} />
//               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address?.zone} />
//               <FieldRow
//                 icon={FiCalendar}
//                 label="Date of Birth / Age"
//                 value={`${formatDate(vendor.personal?.dob)} / ${calcAge(vendor.personal?.dob)} yrs`}
//               />
//               <FieldRow icon={FiHome} label="Ward" value={vendor.address?.ward || vendor.ward} />
//               <FieldRow icon={FiUser} label="Gender" value={vendor.personal?.gender} />
//               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business?.businessTiming} />
//               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal?.mobile} />
//               <FieldRow icon={FiFileText} label="Address" value={vendor.address?.permanentAddress} />
//             </div>

//             {/* Bottom information row */}
//             <div className="mt-3.5 flex flex-wrap items-stretch gap-2.5">
//               <div className="grid min-w-[180px] flex-1 grid-cols-2 overflow-hidden rounded-[11px] bg-[#E7EEE9]">
//                 <div className="flex min-w-0 items-center gap-1.5 border-r border-[#005050]/20 px-2.5 py-2">
//                   <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#005050] text-white">
//                     <FiBriefcase size={13} />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-[7px] font-black uppercase text-[#005050]">Type of Business</p>
//                     <p className="mt-0.5 truncate text-[10.5px] font-medium text-slate-900">
//                       {vendor.business?.businessCategory || "-"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex min-w-0 items-center gap-1.5 px-2.5 py-2">
//                   <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#005050] text-white">
//                     <FiBriefcase size={13} />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-[7px] font-black uppercase text-[#005050]">Sale Type</p>
//                     <p className="mt-0.5 text-[10.5px] font-medium text-slate-900">
//                       {saleType(vendor.business?.vendorType)}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-[96px] shrink-0 overflow-hidden rounded-[11px] bg-[#005050] text-white shadow-md">
//                 <div className="bg-[#006B69] px-1.5 py-1.5 text-center">
//                   <p className="text-[7px] font-black uppercase tracking-wide">Validity Period</p>
//                 </div>
//                 <div className="px-2 py-1.5 text-center">
//                   <FiCalendar size={17} className="mx-auto mb-1 text-[#F0C34B]" />
//                   <p className="text-[9px] font-black">{formatDate(certificate.issueDate)}</p>
//                   <p className="my-0.5 text-[6px] text-white/65">TO</p>
//                   <p className="text-[9px] font-black">{formatDate(certificate.validTill)}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* FRONT FOOTER — normal flow, decoration clipped to footer only */}
//           <div className="relative mt-auto shrink-0 overflow-hidden px-5 py-3" style={{ background: TEAL_DARK }}>
//             <div className="pointer-events-none absolute -bottom-16 -right-5 h-28 w-56 rounded-full border-[10px] border-white/5" />
//             <div className="relative flex items-center justify-between gap-3">
//               <div className="flex items-center gap-2.5">
//                 <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#E6B63F] text-[#E6B63F]">
//                   <FiShield size={14} />
//                 </div>
//                 <div>
//                   <p className="text-[7px] text-white/70">Authorised by</p>
//                   <p className="text-[9.5px] font-black text-white">Vasai Virar City Municipal Corporation</p>
//                 </div>
//               </div>
//               <VVMonogram size={26} />
//             </div>
//           </div>
//         </div>

//         {/* =============================== BACK =============================== */}
//         <div className="smart-card-back flex h-full w-full max-w-[440px] flex-col overflow-hidden rounded-[20px] border border-[#004C4D]/15 bg-[#FCFCF9] shadow-[0_18px_44px_rgba(0,65,65,.20)]">

//           {/* HEADER — teal only as a curved wedge behind the badge, rest stays cream */}
//           <div className="relative h-[152px] overflow-hidden">
//             <div
//               className="absolute left-0 top-0 h-full w-[58%]"
//               style={{ background: TEAL, borderBottomRightRadius: "999px 999px" }}
//             />
//             <div
//               className="absolute left-0 top-0 h-full w-[58%]"
//               style={{
//                 border: `2px solid ${GOLD}`,
//                 borderTop: "none",
//                 borderLeft: "none",
//                 borderBottomRightRadius: "999px 999px",
//               }}
//               aria-hidden="true"
//             />
//             <div className="absolute left-5 top-5">
//               <VerifiedBadge />
//             </div>
//           </div>

//          {/* BODY */}
// <div className="flex flex-1 flex-col px-5 pb-4 pt-2">
//   <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1.3fr_1fr]">
//     {/* TERMS */}
//     <div className="min-w-0">
//       <span className="inline-flex rounded-full bg-[#005050] px-3.5 py-1.5 text-[8.5px] font-black uppercase tracking-wide text-white">
//         Terms &amp; Conditions
//       </span>
//       <div className="mt-3 space-y-3">
//         {TERMS.map(({ icon: Icon, text }) => (
//           <div key={text} className="flex items-start gap-2.5">
//             <RoundIcon icon={Icon} />
//             <p className="pt-0.5 text-[9.5px] leading-[1.35] text-slate-900">{text}</p>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* BRAND */}
//     <div className="flex min-w-0 flex-col items-center pt-1.5 text-center">
//       <VVMonogram size={54} />
//       <p className="mt-1 text-[13.5px] font-black text-[#005050]">SMART VENDOR</p>
//       <div className="mt-2.5 flex items-center justify-center gap-1.5">
//         <span className="h-px w-5 bg-[#005050]/45" />
//         <span className="text-[7px] uppercase tracking-[0.13em] text-[#005050]">Better City</span>
//         <span className="h-px w-5 bg-[#005050]/45" />
//       </div>
//       <p className="mt-1 text-[7.5px] uppercase tracking-[0.15em] text-[#005050]">Better Tomorrow</p>
//     </div>
//   </div>

//   {/* Spacer — pushes the block below all the way down to sit just above the footer */}
//   <div className="flex-1" />

//   {/* Emergency contact + signature, anchored to the bottom of the card */}
// <div className="grid grid-cols-1 items-end gap-3.5 sm:grid-cols-[1.4fr_1fr]">
//   <div className="overflow-hidden rounded-[13px] border-2 border-[#005050] bg-white">
//     <div className="bg-[#005050] px-2.5 py-1.5 text-[7.5px] font-black uppercase tracking-wide text-white">
//       Emergency Contact
//     </div>
//     <div className="grid grid-cols-2 divide-x divide-[#005050]/20">
//       <div className="px-2.5 py-2.5">
//         <p className="text-[7px] font-bold text-[#005050]">VVCMC Helpline</p>
//         <div className="mt-1.5 flex items-center gap-1.5">
//           <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#005050] text-white">
//             <FiPhone size={11} />
//           </div>
//           <span className="truncate text-[7px] font-bold text-slate-900">{VVCMC_HELPLINE}</span>
//         </div>
//       </div>
//       <div className="px-2.5 py-2.5">
//         <p className="text-[7px] font-bold text-[#005050]">WhatsApp Support</p>
//         <div className="mt-1.5 flex items-center gap-1.5">
//           <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
//             <FiMessageCircle size={11} />
//           </div>
//           <span className="truncate text-[7px] font-bold text-slate-900">{VVCMC_WHATSAPP}</span>
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className="pb-1 text-center">
//     <div className="mx-auto h-px w-20 bg-slate-300" />
//     <p className="mt-1.5 text-[8px] text-slate-500">Authorised Signatory</p>
//     <p className="mt-0.5 text-[9px] font-black text-[#005050]">VVCMC</p>
//   </div>
// </div>
// </div>

//           {/* BACK FOOTER */}
//           <div className="relative mt-auto shrink-0 overflow-hidden px-5 py-4" style={{ background: TEAL_DARK }}>
//             <div className="pointer-events-none absolute -bottom-14 -right-5 h-32 w-48 rounded-full border-[12px] border-[#E3B337]/70" />
//             <div className="pointer-events-none absolute bottom-3 right-3 grid grid-cols-5 gap-1.5 opacity-70">
//               {Array.from({ length: 15 }).map((_, i) => (
//                 <span key={i} className="h-1 w-1 rounded-full bg-[#F0C34B]" />
//               ))}
//             </div>
//             <div className="relative flex items-start gap-2.5 text-white">
//               <FiMapPin size={16} className="mt-0.5 shrink-0 text-[#E6B63F]" />
//               <div className="pr-[15%]">
//                 <p className="text-[9px] font-black">Vasai Virar City Municipal Corporation</p>
//                 <p className="mt-1 text-[7px] leading-[1.45] text-white/85">{VVCMC_ADDRESS}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* VERIFICATION */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* PRINT RULES */}
//       <style>{`
//         @media print {
//           body {
//             background: white !important;
//           }

//           .smart-card-front,
//           .smart-card-back {
//             break-inside: avoid;
//             page-break-inside: avoid;
//             box-shadow: none !important;
//           }

//           @page {
//             size: A4 portrait;
//             margin: 8mm;
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
//   FiBriefcase,
//   FiShoppingBag,
//   FiMapPin,
//   FiHome,
//   FiClock,
//   FiCalendar,
//   FiExternalLink,
//   FiShield,
//   FiLoader,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import logo from "../../../assets/logovvcmc.jpg";
// import streetVendorBg from "../../../assets/street-vendor-bg.jpg";
// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


// /* =========================================================
//    COLORS
// ========================================================= */

// const TEAL = "#004C4D";
// const GOLD = "#CA9E3A";
// const CREAM = "#FBFAF6";


// /* =========================================================
//    HELPERS
// ========================================================= */

// function formatDate(d) {
//   if (!d) return "-";

//   const date = new Date(d);

//   if (Number.isNaN(date.getTime())) {
//     return "-";
//   }

//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }


// function calcAge(dob) {
//   if (!dob) return "-";

//   const birth = new Date(dob);

//   if (Number.isNaN(birth.getTime())) {
//     return "-";
//   }

//   return Math.floor(
//     (Date.now() - birth.getTime()) /
//       (365.25 * 24 * 60 * 60 * 1000)
//   );
// }


// function saleType(vendorType) {
//   if (!vendorType) return "-";

//   return vendorType
//     .toLowerCase()
//     .includes("mobile")
//     ? "फिरता"
//     : "स्थिर";
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
//    LEFT GREEN / GOLD RIBBON
// ========================================================= */

// function SideRibbon() {
//   return (
//     <div
//       className="
//         pointer-events-none
//         absolute
//         inset-y-0
//         left-0
//         z-10
//         w-[15%]
//         overflow-hidden
//       "
//       aria-hidden="true"
//     >
//       <svg
//         viewBox="0 0 150 540"
//         preserveAspectRatio="none"
//         className="h-full w-full"
//       >

//         {/* =====================================================
//             TEAL SIDE PANEL
//             Narrow at top → wide flowing curve at bottom
//         ===================================================== */}

//         <path
//           d="
//             M0 0
//             H70

//             C
//               62 35,
//               55 75,
//               53 115

//             C
//               50 165,
//               49 215,
//               51 265

//             C
//               53 315,
//               59 365,
//               70 410

//             C
//               82 460,
//               101 505,
//               125 540

//             H0
//             Z
//           "
//           fill={TEAL}
//         />

//         {/* =====================================================
//             GOLD CURVE
//             Exactly follows the outer teal boundary
//         ===================================================== */}

//         <path
//           d="
//             M70 0

//             C
//               62 35,
//               55 75,
//               53 115

//             C
//               50 165,
//               49 215,
//               51 265

//             C
//               53 315,
//               59 365,
//               70 410

//             C
//               82 460,
//               101 505,
//               125 540
//           "
//           fill="none"
//           stroke={GOLD}
//           strokeWidth="8"
//           strokeLinecap="round"
//           vectorEffect="non-scaling-stroke"
//         />

//       </svg>
//     </div>
//   );
// }


// /* =========================================================
//    BOTTOM GREEN / GOLD CURVE
// ========================================================= */

// function BottomCurve() {
//   return (
//     <div
//       className="
//         pointer-events-none
//         absolute
//         bottom-0
//         right-0
//         z-[5]
//         h-[18%]
//         w-[43%]
//         overflow-hidden
//       "
//       aria-hidden="true"
//     >

//       <svg
//         viewBox="0 0 400 100"
//         preserveAspectRatio="none"
//         className="h-full w-full"
//       >

//         <path
//           d="
//             M0 100
//             C100 5 240 80 400 0
//             L400 100
//             Z
//           "
//           fill={TEAL}
//         />

//         <path
//           d="
//             M0 100
//             C100 5 240 80 400 0
//           "
//           fill="none"
//           stroke={GOLD}
//           strokeWidth="8"
//         />

//       </svg>

//     </div>
//   );
// }


// /* =========================================================
//    FRONT FIELD
// ========================================================= */

// function FrontField({ label, value }) {
//   return (
//     <div className="flex min-w-0 items-center gap-2">
//       {/* LABEL */}
//       <span
//         className="
//           w-[42%]
//           shrink-0
//           truncate
//           text-[13px]
//           font-black
//           uppercase
//           tracking-[0.02em]
//           text-[#0B4D52]
//         "
//       >
//         {label}
//       </span>

//       {/* COLON */}
//       <span
//         className="
//           shrink-0
//           text-[11px]
//           font-black
//           text-[#0B4D52]
//         "
//       >
//         :
//       </span>

//       {/* VALUE */}
//       <span
//         className="
//           min-w-0
//           flex-1
//           truncate
//           border-b
//           border-slate-400
//           pb-[4px]
//           text-[13px]
//           font-extrabold
//           leading-tight
//           text-slate-900
//         "
//       >
//         {value || "\u00A0"}
//       </span>
//     </div>
//   );
// }


// /* =========================================================
//    BACK FIELD
// ========================================================= */

// function BackField({
//   icon: Icon,
//   label,
//   value,
// }) {
//   return (
//     <div className="flex min-w-0 items-center gap-2">

//       {/* ICON */}
//       <div
//         className="
//           flex
//           h-6
//           w-6
//           shrink-0
//           items-center
//           justify-center
//           rounded-full
//           bg-[#E8F0EC]
//         "
//       >
//         <Icon
//           size={12}
//           strokeWidth={2.5}
//           className="text-[#0B4D52]"
//         />
//       </div>

//       {/* LABEL */}
//       <span
//         className="
//           w-[42%]
//           shrink-0
//           truncate
//           text-[13px]
//           font-black
//           uppercase
//           tracking-[0.01em]
//           text-[#0B4D52]
//         "
//       >
//         {label}
//       </span>

//       {/* COLON */}
//       <span
//         className="
//           shrink-0
//           text-[11px]
//           font-black
//           text-[#0B4D52]
//         "
//       >
//         :
//       </span>

//       {/* VALUE */}
//       <span
//         className="
//           min-w-0
//           flex-1
//           truncate
//           border-b
//           border-slate-200
//           pb-[4px]
//           text-[13px]
//           font-extrabold
//           leading-tight
//           text-slate-900
//         "
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


//   /* =======================================================
//      API DATA (replaces Redux selectors)
//   ======================================================= */

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


//   /* =======================================================
//      VERIFICATION URL
//      Reuses the same QR data the backend generated at
//      payment time, so the QR on the card matches exactly.
//   ======================================================= */

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);


//   /* =======================================================
//      CARD CODE
//   ======================================================= */

//   const cardCode = certificate?.certificateNo || "";


//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }


//   /* =======================================================
//      VENDOR NOT FOUND
//   ======================================================= */

//   if (error || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">

//         <p className="text-sm text-ink-500">
//           {error || "Vendor not found."}
//         </p>

//         <Link
//           to="/vendors/list"
//           className="
//             mt-3
//             inline-block
//             text-sm
//             font-semibold
//             text-brand-600
//           "
//         >
//           Back to Vendor List
//         </Link>

//       </Card>
//     );
//   }


//   /* =======================================================
//      CERTIFICATE NOT YET ISSUED
//   ======================================================= */

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">

//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />

//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>

//         <p className="mt-1 text-xs text-ink-500">
//           Current status:
//           <span className="ml-1 font-semibold">
//             {vendor.status}
//           </span>
//         </p>

//         <Link
//           to={`/vendors/profile/${vendor.applicationNo}`}
//           className="
//             mt-4
//             inline-block
//             text-sm
//             font-semibold
//             text-brand-600
//           "
//         >
//           View Vendor Profile
//         </Link>

//       </Card>
//     );
//   }


//   /* =======================================================
//      ACTIONS
//   ======================================================= */

//   const handlePrint = () => {
//     window.print();
//   };


//   const handleDownloadPdf = () => {
//     window.print();
//   };


//   /* =======================================================
//      FRONT DATA
//   ======================================================= */

//   const frontFields = [
//     {
//       label: "ओळखपत्र क्रमांक",
//       value: certificate.certificateNo,
//     },
//     {
//       label: "विक्रेत्याचे नाव",
//       value: vendor.personal.fullName,
//     },
//     {
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(
//         vendor.personal.dob
//       )} वर्षे`,
//     },
//     {
//       label: "लिंग",
//       value: genderType(vendor.personal.gender),
//     },
//     {
//       label: "पत्ता",
//       value: vendor.address.permanentAddress,
//     },
//     {
//       label: "मोबाईल क्रमांक",
//       value: vendor.personal.mobile,
//     },
//   ];


//   /* =======================================================
//      BACK DATA
//   ======================================================= */

//   const backFields = [
//     {
//       icon: FiBriefcase,
//       label: "व्यवसायाचा प्रकार",
//       value: vendor.business.businessCategory,
//     },

//     {
//       icon: FiShoppingBag,
//       label: "विक्रीचा प्रकार",
//       value: saleType(vendor.business.vendorType),
//     },

//     {
//       icon: FiMapPin,
//       label: "विक्रय स्थान",
//       value: vendor.address.zone,
//     },

//     {
//       icon: FiHome,
//       label: "विभाग / प्रभाग",
//       value: vendor.address.ward,
//     },

//     {
//       icon: FiClock,
//       label: "व्यवसायाची वेळ",
//       value: vendor.business.businessTiming,
//     },

//     {
//       icon: FiCalendar,
//       label: "ओळखपत्राची वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(
//         certificate.validTill
//       )}`,
//     },
//   ];


//   /* =======================================================
//      PAGE
//   ======================================================= */

//   return (
//     <div className="space-y-5">


//       {/* ==================================================
//           PAGE HEADER
//       ================================================== */}

//       <div
//         className="
//           flex
//           flex-wrap
//           items-start
//           justify-between
//           gap-4
//           print:hidden
//         "
//       >

//         <div>

//           <p
//             className="
//               text-xs
//               font-semibold
//               text-ink-500
//             "
//           >

//             <Link
//               to="/vendors/list"
//               className="
//                 text-brand-600
//                 hover:text-brand-700
//               "
//             >
//               Smart Card
//             </Link>

//             {" / "}

//             {cardCode}

//           </p>


//           <h1
//             className="
//               mt-1
//               font-display
//               text-2xl
//               font-bold
//               text-ink-900
//             "
//           >
//             पथविक्रेता ओळखपत्र
//           </h1>


//           <p
//             className="
//               text-sm
//               text-ink-500
//             "
//           >
//             आधार कार्डच्या आकाराचे महानगरपालिका ओळखपत्र
//           </p>

//         </div>


//         {/* ACTIONS */}

//         <div className="flex gap-2">

//           <Button
//             variant="outline"
//             icon={FiDownload}
//             onClick={handleDownloadPdf}
//           >
//             Download
//           </Button>

//           <Button
//             icon={FiPrinter}
//             onClick={handlePrint}
//           >
//             Print
//           </Button>

//         </div>

//       </div>


//       {/* ==================================================
//           CARD PREVIEW
//       ================================================== */}

//       <div
//         className="
//           flex
//           flex-col
//           items-center
//           gap-8
//           px-1
//           py-6
//         "
//       >


//         {/* =================================================
//             FRONT CARD
//         ================================================= */}

//         <div
//           className="
//             smart-card
//             smart-card-front
//             relative
//             mx-auto
//             aspect-[856/540]
//             w-full
//             max-w-[640px]
//             overflow-hidden
//             rounded-2xl
//             border
//             border-[#004C4D]/15
//             shadow-[0_18px_44px_rgba(0,65,65,.18)]
//           "
//           style={{
//             backgroundImage: `
//               linear-gradient(
//                 90deg,
//                 rgba(251,250,246,0.98) 0%,
//                 rgba(251,250,246,0.94) 38%,
//                 rgba(251,250,246,0.72) 65%,
//                 rgba(251,250,246,0.30) 100%
//               ),
//               url(${streetVendorBg})
//             `,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//           }}
//         >

//           {/* LEFT RIBBON */}

//           <SideRibbon />


//           {/* SUBTLE SECURITY PATTERN */}

//           <div
//             className="
//               pointer-events-none
//               absolute
//               inset-0
//               z-[1]
//               opacity-[0.07]
//             "
//             style={{
//               backgroundImage: `
//                 repeating-radial-gradient(
//                   ellipse at center,
//                   transparent 0px,
//                   transparent 12px,
//                   rgba(0,76,77,.20) 13px,
//                   transparent 14px
//                 )
//               `,
//             }}
//           />


//           {/* FRONT CONTENT */}

//           <div
//             className="
//               relative
//               z-20
//               flex
//               h-full
//               flex-col
//               pl-[10%]
//               pr-[3%]
//               py-[4%]
//             "
//           >


//             {/* ==========================================
//                 HEADER
//             ========================================== */}

//             <div
//               className="
//                 flex
//                 shrink-0
//                 items-center
//                 gap-3
//               "
//             >

//               {/* LOGO */}

//               <div
//                 className="
//                   flex
//                   h-12
//                   w-12
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-white
//                   p-1
//                   shadow-sm
//                   ring-1
//                   ring-[#005050]/15
//                 "
//               >

//                 <img
//                   src={logo}
//                   alt="VVCMC"
//                   className="
//                     h-full
//                     w-full
//                     rounded-full
//                     object-contain
//                   "
//                 />

//               </div>


//               {/* TITLE */}

//               <div className="min-w-0">

//                 <h1
//                   className="
//                     font-display
//                     text-[20px]
//                     font-black
//                     leading-none
//                     text-[#0B4D52]
//                   "
//                 >
//                   वसई विरार शहर महानगरपालिका
//                 </h1>



//                 <div
//                   className="
//                     mt-1.5
//                     flex
//                     items-center
//                     gap-2
//                     text-[10px]
//                     font-bold
//                     uppercase
//                     tracking-[0.12em]
//                     text-[#CA9E3A]
//                   "
//                 >

//                   <span className="h-px w-5 bg-[#CA9E3A]/90" />

//                   पथविक्रेता व्यवस्थापन प्रणाली

//                   <span className="h-px w-5 bg-[#CA9E3A]/60" />

//                 </div>

//               </div>

//             </div>


//             {/* ==========================================
//                 FRONT BODY
//                 SAME SPACING AS BACK
//             ========================================== */}

//             <div
//               className="
//                 mt-3
//                 flex
//                 min-h-0
//                 flex-1
//                 items-center
//               "
//             >


//               {/* ========================================
//                   PHOTO
//               ======================================== */}

//               <div
//                 className="
//                   relative
//                   z-10
//                   flex
//                   h-[60%]
//                   w-[23%]
//                   shrink-0
//                   items-center
//                   justify-center
//                   overflow-hidden
//                   rounded-xl
//                   border-2
//                   border-[#0B4D52]
//                   bg-white
//                   shadow-sm
//                 "
//               >

//                 {vendor.documents?.photo ? (

//                   <img
//                     src={vendor.documents.photo}
//                     alt={vendor.personal.fullName}
//                     className="
//                       h-full
//                       w-full
//                       object-cover
//                     "
//                   />

//                 ) : (

//                   <div
//                     className="
//                       flex
//                       h-full
//                       w-full
//                       flex-col
//                       items-center
//                       justify-center
//                       gap-1
//                     "
//                   >

//                     <FiUser
//                       size={40}
//                       strokeWidth={1.2}
//                       className="text-slate-300"
//                     />

//                     <span
//                       className="
//                         text-[7px]
//                         font-semibold
//                         uppercase
//                         tracking-wide
//                         text-slate-400
//                       "
//                     >
//                       PHOTO
//                     </span>

//                   </div>

//                 )}

//               </div>


//               {/* ========================================
//                   FRONT INFORMATION
//               ======================================== */}



//               <div
//                 className="
//                   ml-4
//                   flex
//                   min-w-0
//                   flex-1
//                   h-[70%]
//                   flex-col
//                   justify-between
//                   self-center
//                 "
//               >
//                 {frontFields.map(
//                   ({
//                     label,
//                     value,
//                   }) => (
//                     <FrontField
//                       key={label}
//                       label={label}
//                       value={value}
//                     />
//                   )
//                 )}
//               </div>


//               {/* ========================================
//                   QR
//               ======================================== */}

//               <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="
//                   relative
//                   z-10
//                   ml-4
//                   flex
//                   h-[64%]
//                   w-[23%]
//                   max-w-[400px]
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-xl
//                   p-2
//                   shadow-sm
//                   transition-transform
//                   hover:scale-[1.02]
//                 "
//               >

//                 <QRCodeSVG
//                   value={verifyUrl}
//                   size={150}
//                   level="M"
//                   bgColor="#FFFFFF"
//                   fgColor="#111111"
//                   className="
//                     h-full
//                     w-full
//                   "
//                 />

//               </Link>

//             </div>


//             {/* FRONT CURVE */}

//             <BottomCurve />


//             {/* FRONT MESSAGE */}

//             <div
//               className="
//                 pointer-events-none
//                 absolute
//                 bottom-[3.5%]
//                 right-[3%]
//                 z-20
//                 text-right
//                 text-white
//               "
//             >

//               <p className="text-[5px] font-bold uppercase">
//                 Together for
//               </p>

//               <p className="text-[5.5px] font-black uppercase">
//                 Clean, Safe & Empowered
//               </p>

//               <p className="text-[5.5px] font-black uppercase">
//                 Street Vendors
//               </p>

//             </div>

//           </div>

//         </div>


//         {/* =================================================
//             BACK CARD
//         ================================================= */}

//         <div
//           className="
//             smart-card
//             smart-card-back
//             relative
//             mx-auto
//             aspect-[856/540]
//             w-full
//             max-w-[640px]
//             overflow-hidden
//             rounded-2xl
//             border
//             border-[#004C4D]/15
//             bg-[#FBFAF6]
//             shadow-[0_18px_44px_rgba(0,65,65,.18)]
//           "
//         >

//           {/* LEFT RIBBON */}

//           <SideRibbon />


//           {/* BACKGROUND */}

//           <div
//             className="
//               absolute
//               inset-0
//               z-0
//               bg-[#FBFAF6]
//             "
//           />


//           {/* SECURITY PATTERN */}

//           <div
//             className="
//               pointer-events-none
//               absolute
//               inset-0
//               z-[1]
//               opacity-[0.10]
//             "
//             style={{
//               backgroundImage: `
//                 repeating-radial-gradient(
//                   ellipse at center,
//                   transparent 0px,
//                   transparent 12px,
//                   rgba(0,76,77,.20) 13px,
//                   transparent 14px
//                 )
//               `,
//             }}
//           />


//           {/* ==========================================
//               BACK CONTENT
//           ========================================== */}

//           <div
//             className="
//               relative
//               z-[20]
//               flex
//               h-full
//               pl-[9%]
//               pr-[4%]
//               py-[5%]
//             "
//           >

//             {/* BACK FIELDS */}

//             <div
//               className="
//                 flex
//                 min-w-0
//                 flex-1
//                 flex-col
//                 justify-center
//                 gap-[5%]
//               "
//             >

//               {backFields.map(
//                 ({
//                   icon,
//                   label,
//                   value,
//                 }) => (
//                   <BackField
//                     key={label}
//                     icon={icon}
//                     label={label}
//                     value={value}
//                   />
//                 )
//               )}

//             </div>


//             {/* ========================================
//                 WATERMARK
//             ======================================== */}


//             <div
//               className="
//                 relative
//                 ml-[3%]
//                 flex
//                 h-full
//                 w-[30%]
//                 shrink-0
//                 items-center
//                 justify-center
//               "
//             >
//               {/* WATERMARK LOGO */}
//               <div
//                 className="
//                   relative
//                   z-10
//                   flex
//                   h-[82%]
//                   aspect-square
//                   items-center
//                   justify-center
//                   opacity-[0.26]
//                 "
//               >
//                 <img
//                   src={logo}
//                   alt=""
//                   className="
//                     h-full
//                     w-full
//                     object-contain
//                   "
//                 />
//               </div>
//             </div>

//           </div>


//           {/* BACK CURVE */}

//           <BottomCurve />


//           {/* ========================================
//               AUTHORIZED SIGNATORY
//           ======================================== */}

//           <div
//             className="
//               absolute
//               bottom-[4%]
//               left-[13%]
//               z-[20]
//               text-center
//             "
//           >

//             <div
//               className="
//                 mb-0.5
//                 h-px
//                 w-20
//                 bg-slate-400
//               "
//             />

//             <p
//               className="
//                 text-[10px]
//                 font-black
//                 uppercase
//                 tracking-wide
//                 text-[#0B4D52]

//               "
//             >
//               अधिकृत स्वाक्षरी
//             </p>

//             <p
//               className="
//                 text-[7px]
//                 font-bold
//                 text-slate-500
//               "
//             >
//               VVCMC
//             </p>

//           </div>

//         </div>

//       </div>


//       {/* ==================================================
//           VERIFICATION
//       ================================================== */}

//       <div
//         className="
//           flex
//           justify-center
//           print:hidden
//         "
//       >

//         <Button
//           variant="ghost"
//           icon={FiExternalLink}
//           onClick={() =>
//             navigate(
//               `/verify/${vendor.applicationNo}`
//             )
//           }
//         >
//           Open Verification Screen
//         </Button>

//       </div>


//       {/* ==================================================
//           PRINT CSS
//       ================================================== */}

//       <style>{`

//         @media print {

//           body {
//             background: white !important;
//           }

//           header,
//           aside,
//           nav,
//           .print\\\\:hidden {
//             display: none !important;
//           }

//           .smart-card {
//             width: 85.6mm !important;
//             height: 54mm !important;
//             max-width: none !important;
//             border-radius: 3mm !important;
//             box-shadow: none !important;
//             break-inside: avoid !important;
//             page-break-inside: avoid !important;
//           }

//           .smart-card-front,
//           .smart-card-back {
//             margin: 0 auto !important;
//           }

//           .smart-card-front {
//             margin-bottom: 8mm !important;
//           }

//           @page {
//             size: A4 portrait;
//             margin: 12mm;
//           }

//           .print\\\\:hidden {
//             display: none !important;
//           }

//         }

//       `}</style>

//     </div>
//   );
// }




// // // import { useEffect, useMemo, useRef } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { QRCodeSVG } from "qrcode.react";
// // // import { FiArrowLeft, FiDownload, FiPrinter, FiShield } from "react-icons/fi";
// // // import jsPDF from "jspdf";
// // // import Card from "../../../components/ui/Card";
// // // import Button from "../../../components/ui/Button";
// // // import Avatar from "../../../components/ui/Avatar";
// // // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // // import logo from "../../../assets/logovvcmc.jpeg";

// // // import {
// // //   selectCertificateByVendorId,
// // //   selectAllCertificates,
// // //   addCertificate,
// // //   makeCertificateDraft,
// // // } from "../../../features/certificates/certificatesSlice";
// // // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // // function formatDate(d) {
// // //   if (!d) return "-";
// // //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // // }

// // // export default function SmartCard() {
// // //   const { id } = useParams();
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();
// // //   const cardRef = useRef(null);

// // //   const vendor = useSelector((s) => selectVendorById(s, id));
// // //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// // //   const certificates = useSelector(selectAllCertificates);
// // //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// // //   useEffect(() => {
// // //     if (vendor && vendor.status === "Approved" && !certificate) {
// // //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [vendor?.id, vendor?.status, certificate]);

// // //   const verifyUrl = useMemo(() => {
// // //     if (!vendor) return "";
// // //     return `${window.location.origin}/verify/${vendor.id}`;
// // //   }, [vendor]);

// // //   if (!vendor) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <p className="text-sm text-ink-500">Vendor not found.</p>
// // //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// // //           Back to Vendor List
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (vendor.status !== "Approved") {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// // //         <p className="text-sm font-semibold text-ink-700">
// // //           Smart Card is only available for approved vendors.
// // //         </p>
// // //         <p className="mt-1 text-xs text-ink-500">
// // //           Current status: <span className="font-semibold">{vendor.status}</span>
// // //         </p>
// // //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// // //           View Vendor Profile
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (!certificate) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// // //         Generating certificate...
// // //       </Card>
// // //     );
// // //   }

// // //   const handlePrint = () => window.print();

// // //   const handleDownloadPdf = () => {
// // //     const doc = new jsPDF({ unit: "pt", format: [340, 520] });

// // //     // Header band
// // //     doc.setFillColor(11, 79, 82);
// // //     doc.rect(0, 0, 340, 70, "F");
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(13);
// // //     doc.text("VASAI VIRAR CITY", 20, 30);
// // //     doc.text("MUNICIPAL CORPORATION", 20, 46);
// // //     doc.setFontSize(9);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.text("SMART VENDOR CARD", 20, 60);

// // //     // Body
// // //     doc.setTextColor(15, 23, 42);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(15);
// // //     doc.text(vendor.personal.fullName, 20, 100);

// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(10);
// // //     const rows = [
// // //       ["Vendor ID", vendor.vendorId],
// // //       ["Application No.", vendor.applicationNo],
// // //       ["Certificate No.", certificate.certificateNumber],
// // //       ["Business Category", vendor.business.businessCategory],
// // //       ["Ward / Zone", `${vendor.address.ward} / ${vendor.address.zone}`],
// // //       ["Issue Date", formatDate(certificate.issueDate)],
// // //       ["Expiry Date", formatDate(certificate.expiryDate)],
// // //     ];
// // //     let y = 125;
// // //     rows.forEach(([label, value]) => {
// // //       doc.setTextColor(100, 116, 139);
// // //       doc.text(label, 20, y);
// // //       doc.setTextColor(15, 23, 42);
// // //       doc.text(String(value), 150, y);
// // //       y += 20;
// // //     });

// // //     doc.setDrawColor(226, 232, 240);
// // //     doc.line(20, y + 5, 320, y + 5);
// // //     y += 25;

// // //     doc.setTextColor(100, 116, 139);
// // //     doc.setFontSize(9);
// // //     doc.text("This card is non-transferable and must be displayed", 20, y);
// // //     doc.text("at the place of vending. Valid till the expiry date.", 20, y + 14);

// // //     doc.save(`${vendor.vendorId}-smart-card.pdf`);
// // //   };

// // //   return (
// // //     <div className="space-y-5">
// // //       <Link
// // //         to={`/vendors/profile/${vendor.id}`}
// // //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600 print:hidden"
// // //       >
// // //         <FiArrowLeft size={14} /> Back to Vendor Profile
// // //       </Link>

// // //       <div className="mx-auto max-w-3xl">
// // //         <div ref={cardRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
// // //           {/* FRONT */}
// // //           <div className="overflow-hidden rounded-[var(--radius-card)] border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// // //             <div className="sidebar-gradient flex items-center justify-between px-5 py-4 text-white">
// // //               <div>
// // //                 <p className="font-display text-[13px] font-bold leading-tight">VASAI VIRAR CITY</p>
// // //                 <p className="font-display text-[13px] font-bold leading-tight">MUNICIPAL CORPORATION</p>
// // //                 <p className="mt-1 text-[10px] font-semibold tracking-wide text-brand-100">
// // //                   SMART VENDOR CARD
// // //                 </p>
// // //               </div>
// // //               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-sm font-extrabold">
// // //                 SV
// // //               </div>
// // //             </div>

// // //             <div className="flex gap-4 p-5">
// // //               <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={64} />
// // //               <div className="flex-1">
// // //                 <p className="text-[11px] text-ink-500">Vendor Name</p>
// // //                 <p className="font-display text-[15px] font-bold text-ink-900">{vendor.personal.fullName}</p>
// // //                 <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
// // //                   <div>
// // //                     <p className="text-ink-400">Vendor ID</p>
// // //                     <p className="id-mono font-semibold text-ink-800">{vendor.vendorId}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-ink-400">Application No.</p>
// // //                     <p className="id-mono font-semibold text-ink-800">{vendor.applicationNo}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="flex items-center gap-4 px-5 pb-5">
// // //               <div className="rounded-xl border border-ink-100 p-2">
// // //                 <QRCodeSVG value={verifyUrl} size={72} />
// // //               </div>
// // //               <div className="text-[11px]">
// // //                 <p className="text-ink-400">Certificate No.</p>
// // //                 <p className="id-mono mb-1.5 font-semibold text-ink-800">{certificate.certificateNumber}</p>
// // //                 <p className="text-ink-400">Business Category</p>
// // //                 <p className="font-semibold text-ink-800">{vendor.business.businessCategory}</p>
// // //               </div>
// // //             </div>

// // //             <div className="sidebar-gradient flex items-center justify-between px-5 py-3 text-[11px] text-white">
// // //               <div>
// // //                 <p className="text-brand-100">Business Category</p>
// // //                 <p className="font-semibold">{vendor.business.businessCategory}</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-brand-100">Ward</p>
// // //                 <p className="font-semibold">{vendor.address.ward}</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-brand-100">Zone</p>
// // //                 <p className="font-semibold">{vendor.address.zone}</p>
// // //               </div>
// // //             </div>

// // //             <div className="flex items-center justify-between border-t border-ink-100 px-5 py-3 text-[11px]">
// // //               <div>
// // //                 <p className="text-ink-400">Issue Date</p>
// // //                 <p className="font-semibold text-ink-800">{formatDate(certificate.issueDate)}</p>
// // //               </div>
// // //               <div className="text-right">
// // //                 <p className="text-ink-400">Expiry Date</p>
// // //                 <p className="font-semibold text-ink-800">{formatDate(certificate.expiryDate)}</p>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* BACK */}
// // //           <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// // //             <div className="p-5">
// // //               <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-ink-500">
// // //                 Terms &amp; Conditions
// // //               </p>
// // //               <ol className="list-decimal space-y-2 pl-4 text-[11px] text-ink-600">
// // //                 <li>This card is non-transferable.</li>
// // //                 <li>Vendor must follow rules and regulations of the Municipal Corporation.</li>
// // //                 <li>This card should be displayed at the place of vending.</li>
// // //                 <li>This card is valid till the expiry date.</li>
// // //               </ol>
// // //             </div>

// // //             <div className="mx-5 rounded-xl bg-accent-50 p-3.5 text-[11px]">
// // //               <p className="font-semibold text-accent-700">Emergency Contact</p>
// // //               <p className="font-display text-base font-bold text-accent-700">1800-123-4567</p>
// // //             </div>

// // //             <div className="mt-auto flex items-center justify-between p-5 text-[11px]">
// // //               <div>
// // //                 <p className="text-ink-400">Scan QR Code for</p>
// // //                 <p className="text-ink-400">Verification</p>
// // //               </div>
// // //               <div className="rounded-lg border border-ink-100 p-1.5">
// // //                 <QRCodeSVG value={verifyUrl} size={48} />
// // //               </div>
// // //             </div>

// // //             <div className="border-t border-ink-100 px-5 py-3 text-center text-[11px] text-ink-500">
// // //               <p className="italic">Authorised Signatory</p>
// // //               <p className="font-semibold text-ink-700">Commissioner</p>
// // //               <p>Vasai Virar City Municipal Corporation</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="mt-6 flex justify-center gap-3 print:hidden">
// // //           <Button variant="outline" icon={FiPrinter} onClick={handlePrint}>
// // //             Print
// // //           </Button>
// // //           <Button icon={FiDownload} onClick={handleDownloadPdf}>
// // //             Download PDF
// // //           </Button>
// // //           <Button variant="ghost" onClick={() => navigate(`/verify/${vendor.id}`)}>
// // //             Open Verification Screen
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // import { useEffect, useMemo, useRef } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { QRCodeSVG } from "qrcode.react";
// // // import { FiArrowLeft, FiDownload, FiPrinter, FiShield } from "react-icons/fi";
// // // import jsPDF from "jspdf";
// // // import Card from "../../../components/ui/Card";
// // // import Button from "../../../components/ui/Button";
// // // import Avatar from "../../../components/ui/Avatar";
// // // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // // import logo from "../../../assets/logovvcmc.jpg";

// // // import {
// // //   selectCertificateByVendorId,
// // //   selectAllCertificates,
// // //   addCertificate,
// // //   makeCertificateDraft,
// // // } from "../../../features/certificates/certificatesSlice";
// // // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // // function formatDate(d) {
// // //   if (!d) return "-";
// // //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // // }

// // // export default function SmartCard() {
// // //   const { id } = useParams();
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();
// // //   const cardRef = useRef(null);

// // //   const vendor = useSelector((s) => selectVendorById(s, id));
// // //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// // //   const certificates = useSelector(selectAllCertificates);
// // //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// // //   useEffect(() => {
// // //     if (vendor && vendor.status === "Approved" && !certificate) {
// // //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [vendor?.id, vendor?.status, certificate]);

// // //   const verifyUrl = useMemo(() => {
// // //     if (!vendor) return "";
// // //     return `${window.location.origin}/verify/${vendor.id}`;
// // //   }, [vendor]);

// // //   if (!vendor) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <p className="text-sm text-ink-500">Vendor not found.</p>
// // //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// // //           Back to Vendor List
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (vendor.status !== "Approved") {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// // //         <p className="text-sm font-semibold text-ink-700">
// // //           Smart Card is only available for approved vendors.
// // //         </p>
// // //         <p className="mt-1 text-xs text-ink-500">
// // //           Current status: <span className="font-semibold">{vendor.status}</span>
// // //         </p>
// // //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// // //           View Vendor Profile
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (!certificate) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// // //         Generating certificate...
// // //       </Card>
// // //     );
// // //   }

// // //   const handlePrint = () => window.print();

// // //   const handleDownloadPdf = () => {
// // //     const doc = new jsPDF({ unit: "pt", format: [340, 520] });

// // //     // Header band
// // //     doc.setFillColor(11, 79, 82);
// // //     doc.rect(0, 0, 340, 70, "F");
// // //     try {
// // //       doc.addImage(logo, "PNG", 14, 10, 48, 48);
// // //     } catch {
// // //       // logo failed to embed - continue without it
// // //     }
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(13);
// // //     doc.text("VASAI VIRAR CITY", 70, 30);
// // //     doc.text("MUNICIPAL CORPORATION", 70, 46);
// // //     doc.setFontSize(9);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.text("SMART VENDOR CARD", 70, 60);

// // //     // Body
// // //     doc.setTextColor(15, 23, 42);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(15);
// // //     doc.text(vendor.personal.fullName, 20, 100);

// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(10);
// // //     const rows = [
// // //       ["Vendor ID", vendor.vendorId],
// // //       ["Application No.", vendor.applicationNo],
// // //       ["Certificate No.", certificate.certificateNumber],
// // //       ["Business Category", vendor.business.businessCategory],
// // //       ["Ward / Zone", `${vendor.address.ward} / ${vendor.address.zone}`],
// // //       ["Issue Date", formatDate(certificate.issueDate)],
// // //       ["Expiry Date", formatDate(certificate.expiryDate)],
// // //     ];
// // //     let y = 125;
// // //     rows.forEach(([label, value]) => {
// // //       doc.setTextColor(100, 116, 139);
// // //       doc.text(label, 20, y);
// // //       doc.setTextColor(15, 23, 42);
// // //       doc.text(String(value), 150, y);
// // //       y += 20;
// // //     });

// // //     doc.setDrawColor(226, 232, 240);
// // //     doc.line(20, y + 5, 320, y + 5);
// // //     y += 25;

// // //     doc.setTextColor(100, 116, 139);
// // //     doc.setFontSize(9);
// // //     doc.text("This card is non-transferable and must be displayed", 20, y);
// // //     doc.text("at the place of vending. Valid till the expiry date.", 20, y + 14);
// // //     y += 30;

// // //     doc.setFont("helvetica", "italic");
// // //     doc.setFontSize(9);
// // //     doc.text("Authorised Signatory", 240, y);

// // //     doc.save(`${vendor.vendorId}-smart-card.pdf`);
// // //   };

// // //   return (
// // //     <div className="space-y-5">
// // //       <Link
// // //         to={`/vendors/profile/${vendor.id}`}
// // //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600 print:hidden"
// // //       >
// // //         <FiArrowLeft size={14} /> Back to Vendor Profile
// // //       </Link>

// // //       <div className="mx-auto max-w-3xl">
// // //         <div ref={cardRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
// // //           {/* FRONT */}
// // //           <div className="overflow-hidden rounded-[var(--radius-card)] border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// // //             <div className="sidebar-gradient flex items-center gap-3 px-5 py-4 text-white">
// // //               <img
// // //                 src={logo}
// // //                 alt="Vasai Virar City Municipal Corporation"
// // //                 className="h-10 w-10 shrink-0 rounded-full bg-white/90 p-0.5"
// // //               />
// // //               <div>
// // //                 <p className="font-display text-[13px] font-bold leading-tight">VASAI VIRAR CITY</p>
// // //                 <p className="font-display text-[13px] font-bold leading-tight">MUNICIPAL CORPORATION</p>
// // //                 <p className="mt-1 text-[10px] font-semibold tracking-wide text-brand-100">
// // //                   SMART VENDOR CARD
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             <div className="flex gap-4 p-5">
// // //               <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={64} />
// // //               <div className="flex-1">
// // //                 <p className="text-[11px] text-ink-500">Vendor Name</p>
// // //                 <p className="font-display text-[15px] font-bold text-ink-900">{vendor.personal.fullName}</p>
// // //                 <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
// // //                   <div>
// // //                     <p className="text-ink-400">Vendor ID</p>
// // //                     <p className="id-mono font-semibold text-ink-800">{vendor.vendorId}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-ink-400">Application No.</p>
// // //                     <p className="id-mono font-semibold text-ink-800">{vendor.applicationNo}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="flex items-center gap-4 px-5 pb-5">
// // //               <div className="rounded-xl border border-ink-100 p-2">
// // //                 <QRCodeSVG value={verifyUrl} size={72} />
// // //               </div>
// // //               <div className="text-[11px]">
// // //                 <p className="text-ink-400">Certificate No.</p>
// // //                 <p className="id-mono mb-1.5 font-semibold text-ink-800">{certificate.certificateNumber}</p>
// // //                 <p className="text-ink-400">Business Category</p>
// // //                 <p className="font-semibold text-ink-800">{vendor.business.businessCategory}</p>
// // //               </div>
// // //             </div>

// // //             <div className="sidebar-gradient flex items-center justify-between px-5 py-3 text-[11px] text-white">
// // //               <div>
// // //                 <p className="text-brand-100">Business Category</p>
// // //                 <p className="font-semibold">{vendor.business.businessCategory}</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-brand-100">Ward</p>
// // //                 <p className="font-semibold">{vendor.address.ward}</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-brand-100">Zone</p>
// // //                 <p className="font-semibold">{vendor.address.zone}</p>
// // //               </div>
// // //             </div>

// // //             <div className="flex items-end justify-between border-t border-ink-100 px-5 py-3 text-[11px]">
// // //               <div className="flex gap-4">
// // //                 <div>
// // //                   <p className="text-ink-400">Issue Date</p>
// // //                   <p className="font-semibold text-ink-800">{formatDate(certificate.issueDate)}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-ink-400">Expiry Date</p>
// // //                   <p className="font-semibold text-ink-800">{formatDate(certificate.expiryDate)}</p>
// // //                 </div>
// // //               </div>
// // //               <p className="italic text-ink-500">Authorised Signatory</p>
// // //             </div>
// // //           </div>

// // //           {/* BACK */}
// // //           <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// // //             <div className="p-5">
// // //               <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-ink-500">
// // //                 Terms &amp; Conditions
// // //               </p>
// // //               <ol className="list-decimal space-y-2 pl-4 text-[11px] text-ink-600">
// // //                 <li>This card is non-transferable.</li>
// // //                 <li>Vendor must follow rules and regulations of the Municipal Corporation.</li>
// // //                 <li>This card should be displayed at the place of vending.</li>
// // //                 <li>This card is valid till the expiry date.</li>
// // //               </ol>
// // //             </div>

// // //             <div className="mx-5 rounded-xl bg-accent-50 p-3.5 text-[11px]">
// // //               <p className="font-semibold text-accent-700">Emergency Contact</p>
// // //               <p className="font-display text-base font-bold text-accent-700">1800-123-4567</p>
// // //             </div>

// // //             <div className="mt-auto flex items-center justify-between p-5 text-[11px]">
// // //               <div>
// // //                 <p className="text-ink-400">Scan QR Code for</p>
// // //                 <p className="text-ink-400">Verification</p>
// // //               </div>
// // //               <div className="rounded-lg border border-ink-100 p-1.5">
// // //                 <QRCodeSVG value={verifyUrl} size={48} />
// // //               </div>
// // //             </div>

// // //             <div className="border-t border-ink-100 px-5 py-3 text-center text-[11px] text-ink-500">
// // //               <p className="italic">Authorised Signatory</p>
// // //               <p className="mt-1 font-semibold text-ink-700">Vasai Virar City Municipal Corporation</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="mt-6 flex justify-center gap-3 print:hidden">
// // //           <Button variant="outline" icon={FiPrinter} onClick={handlePrint}>
// // //             Print
// // //           </Button>
// // //           <Button icon={FiDownload} onClick={handleDownloadPdf}>
// // //             Download PDF
// // //           </Button>
// // //           <Button variant="ghost" onClick={() => navigate(`/verify/${vendor.id}`)}>
// // //             Open Verification Screen
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // import { useEffect, useMemo, useRef } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { QRCodeSVG } from "qrcode.react";
// // // import { FiArrowLeft, FiDownload, FiPrinter, FiShield } from "react-icons/fi";
// // // import jsPDF from "jspdf";
// // // import Card from "../../../components/ui/Card";
// // // import Button from "../../../components/ui/Button";
// // // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // // import logo from "../../../assets/logovvcmc.jpg";

// // // import {
// // //   selectCertificateByVendorId,
// // //   selectAllCertificates,
// // //   addCertificate,
// // //   makeCertificateDraft,
// // // } from "../../../features/certificates/certificatesSlice";
// // // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // // function formatDate(d) {
// // //   if (!d) return "-";
// // //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // // }

// // // function calcAge(dob) {
// // //   if (!dob) return "-";
// // //   const birth = new Date(dob);
// // //   if (Number.isNaN(birth.getTime())) return "-";
// // //   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// // // }

// // // // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile,
// // // // matching the "स्थिर / फिरता" field on the official ID card.
// // // function saleType(vendorType) {
// // //   if (!vendorType) return "-";
// // //   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// // // }

// // // // Field rows in the exact order/labels as the official Vasai-Virar Street Vendor ID card,
// // // // translated to English.
// // // function useCardFields(vendor, certificate) {
// // //   return useMemo(() => {
// // //     if (!vendor) return [];
// // //     return [
// // //       ["ID Card Number", certificate?.certificateNumber || "-"],
// // //       ["Vendor Name", vendor.personal.fullName],
// // //       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
// // //       ["Gender", vendor.personal.gender || "-"],
// // //       ["Address", vendor.address.permanentAddress],
// // //       ["Mobile Number", vendor.personal.mobile],
// // //       ["Type of Business", vendor.business.businessCategory],
// // //       ["Sale Type", saleType(vendor.business.vendorType)],
// // //       ["Vending Zone", vendor.address.zone],
// // //       ["Ward", vendor.address.ward],
// // //       ["Business Timing", vendor.business.businessTiming || "-"],
// // //       ["ID Validity", certificate ? `${formatDate(certificate.issueDate)} - ${formatDate(certificate.expiryDate)}` : "-"],
// // //     ];
// // //   }, [vendor, certificate]);
// // // }

// // // export default function SmartCard() {
// // //   const { id } = useParams();
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();
// // //   const cardRef = useRef(null);

// // //   const vendor = useSelector((s) => selectVendorById(s, id));
// // //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// // //   const certificates = useSelector(selectAllCertificates);
// // //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// // //   const fields = useCardFields(vendor, certificate);

// // //   useEffect(() => {
// // //     if (vendor && vendor.status === "Approved" && !certificate) {
// // //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [vendor?.id, vendor?.status, certificate]);

// // //   const verifyUrl = useMemo(() => {
// // //     if (!vendor) return "";
// // //     return `${window.location.origin}/verify/${vendor.id}`;
// // //   }, [vendor]);

// // //   if (!vendor) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <p className="text-sm text-ink-500">Vendor not found.</p>
// // //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// // //           Back to Vendor List
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (vendor.status !== "Approved") {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// // //         <p className="text-sm font-semibold text-ink-700">
// // //           Smart Card is only available for approved vendors.
// // //         </p>
// // //         <p className="mt-1 text-xs text-ink-500">
// // //           Current status: <span className="font-semibold">{vendor.status}</span>
// // //         </p>
// // //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// // //           View Vendor Profile
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (!certificate) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// // //         Generating certificate...
// // //       </Card>
// // //     );
// // //   }

// // //   const handlePrint = () => window.print();

// // //   const handleDownloadPdf = () => {
// // //     const doc = new jsPDF({ unit: "pt", format: [360, 620] });

// // //     // Green header
// // //     doc.setFillColor(21, 128, 61);
// // //     doc.rect(0, 0, 360, 64, "F");
// // //     try {
// // //       doc.addImage(logo, "PNG", 14, 8, 48, 48);
// // //     } catch {
// // //       // logo failed to embed - continue without it
// // //     }
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(12);
// // //     doc.text("VASAI-VIRAR CITY", 72, 28);
// // //     doc.text("MUNICIPAL CORPORATION", 72, 44);

// // //     // Gold accent band
// // //     doc.setFillColor(202, 158, 58);
// // //     doc.rect(0, 64, 360, 6, "F");

// // //     // Title
// // //     doc.setTextColor(21, 128, 61);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(15);
// // //     doc.text("STREET VENDOR IDENTITY CARD", 180, 92, { align: "center" });

// // //     // Fields
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(10);
// // //     let y = 118;
// // //     fields.forEach(([label, value]) => {
// // //       doc.setTextColor(30, 58, 95);
// // //       doc.setFont("helvetica", "bold");
// // //       const labelLines = doc.splitTextToSize(String(label), 110);
// // //       doc.text(labelLines, 20, y);
// // //       doc.setFont("helvetica", "normal");
// // //       doc.setTextColor(15, 23, 42);
// // //       const valueLines = doc.splitTextToSize(String(value ?? "-"), 175);
// // //       doc.text(valueLines, 150, y);
// // //       y += Math.max(labelLines.length, valueLines.length) * 12 + 8;
// // //     });

// // //     doc.setDrawColor(202, 158, 58);
// // //     doc.setLineWidth(1);
// // //     doc.line(20, y + 4, 340, y + 4);
// // //     y += 26;

// // //     doc.setFont("helvetica", "italic");
// // //     doc.setTextColor(21, 128, 61);
// // //     doc.setFontSize(11);
// // //     doc.text("Authorised Signatory", 180, y, { align: "center" });

// // //     doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
// // //   };

// // //   return (
// // //     <div className="space-y-5">
// // //       <Link
// // //         to={`/vendors/profile/${vendor.id}`}
// // //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600 print:hidden"
// // //       >
// // //         <FiArrowLeft size={14} /> Back to Vendor Profile
// // //       </Link>

// // //       <div className="mx-auto max-w-sm">
// // //         <div
// // //           ref={cardRef}
// // //           className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]"
// // //         >
// // //           {/* Header */}
// // //           <div className="relative bg-[#15803D] px-5 pb-4 pt-5 text-white">
// // //             <div className="flex items-center gap-3">
// // //               <img
// // //                 src={logo}
// // //                 alt="Vasai-Virar City Municipal Corporation"
// // //                 className="h-11 w-11 shrink-0 rounded-full bg-white p-0.5"
// // //               />
// // //               <p className="font-display text-[15px] font-bold leading-tight">
// // //                 VASAI-VIRAR CITY
// // //                 <br />
// // //                 MUNICIPAL CORPORATION
// // //               </p>
// // //             </div>
// // //           </div>
// // //           {/* Gold accent band */}
// // //           <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

// // //           {/* Title */}
// // //           <div className="px-5 pt-4 text-center">
// // //             <p className="font-display text-lg font-extrabold text-[#15803D]">STREET VENDOR IDENTITY CARD</p>
// // //           </div>

// // //           {/* Photo + QR */}
// // //           <div className="flex items-center justify-center gap-5 px-5 py-5">
// // //             <div className="flex h-24 w-20 items-center justify-center overflow-hidden rounded-lg border-2 border-[#15803D] bg-ink-50">
// // //               {vendor.documents?.photo?.url ? (
// // //                 <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
// // //               ) : (
// // //                 <span className="text-[10px] text-ink-400">Photo</span>
// // //               )}
// // //             </div>
// // //             <div className="rounded-lg border-2 border-[#15803D] p-1.5">
// // //               <QRCodeSVG value={verifyUrl} size={80} />
// // //             </div>
// // //           </div>

// // //           {/* Fields */}
// // //           <div className="space-y-2 px-5 pb-5 text-[12.5px]">
// // //             {fields.map(([label, value]) => (
// // //               <div key={label} className="flex gap-2">
// // //                 <span className="w-[46%] shrink-0 font-semibold text-[#1E3A8F]">{label}</span>
// // //                 <span className="text-ink-800">: {value}</span>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* Footer */}
// // //           <div className="border-t border-dashed border-ink-200 px-5 py-3.5 text-center">
// // //             <p className="text-[12px] italic text-[#15803D]">Authorised Signatory</p>
// // //           </div>
// // //         </div>

// // //         <div className="mt-6 flex justify-center gap-3 print:hidden">
// // //           <Button variant="outline" icon={FiPrinter} onClick={handlePrint}>
// // //             Print
// // //           </Button>
// // //           <Button icon={FiDownload} onClick={handleDownloadPdf}>
// // //             Download PDF
// // //           </Button>
// // //           <Button variant="ghost" onClick={() => navigate(`/verify/${vendor.id}`)}>
// // //             Open Verification Screen
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // import { useEffect, useMemo, useRef } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { QRCodeSVG } from "qrcode.react";
// // // import { FiArrowLeft, FiDownload, FiPrinter, FiShield } from "react-icons/fi";
// // // import jsPDF from "jspdf";
// // // import Card from "../../../components/ui/Card";
// // // import Button from "../../../components/ui/Button";
// // // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // // import logo from "../../../assets/logovvcmc.jpg";

// // // import {
// // //   selectCertificateByVendorId,
// // //   selectAllCertificates,
// // //   addCertificate,
// // //   makeCertificateDraft,
// // // } from "../../../features/certificates/certificatesSlice";
// // // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // // function formatDate(d) {
// // //   if (!d) return "-";
// // //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // // }

// // // function calcAge(dob) {
// // //   if (!dob) return "-";
// // //   const birth = new Date(dob);
// // //   if (Number.isNaN(birth.getTime())) return "-";
// // //   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// // // }

// // // // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile,
// // // // matching the "स्थिर / फिरता" field on the official ID card.
// // // function saleType(vendorType) {
// // //   if (!vendorType) return "-";
// // //   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// // // }

// // // // Field rows in the exact order/labels as the official Vasai-Virar Street Vendor ID card,
// // // // translated to English.
// // // function useCardFields(vendor, certificate) {
// // //   return useMemo(() => {
// // //     if (!vendor) return [];
// // //     return [
// // //       ["ID Card Number", certificate?.certificateNumber || "-"],
// // //       ["Vendor Name", vendor.personal.fullName],
// // //       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
// // //       ["Gender", vendor.personal.gender || "-"],
// // //       ["Address", vendor.address.permanentAddress],
// // //       ["Mobile Number", vendor.personal.mobile],
// // //       ["Type of Business", vendor.business.businessCategory],
// // //       ["Sale Type", saleType(vendor.business.vendorType)],
// // //       ["Vending Zone", vendor.address.zone],
// // //       ["Ward", vendor.address.ward],
// // //       ["Business Timing", vendor.business.businessTiming || "-"],
// // //       ["ID Validity", certificate ? `${formatDate(certificate.issueDate)} - ${formatDate(certificate.expiryDate)}` : "-"],
// // //     ];
// // //   }, [vendor, certificate]);
// // // }

// // // export default function SmartCard() {
// // //   const { id } = useParams();
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();
// // //   const cardRef = useRef(null);

// // //   const vendor = useSelector((s) => selectVendorById(s, id));
// // //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// // //   const certificates = useSelector(selectAllCertificates);
// // //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// // //   const fields = useCardFields(vendor, certificate);

// // //   useEffect(() => {
// // //     if (vendor && vendor.status === "Approved" && !certificate) {
// // //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [vendor?.id, vendor?.status, certificate]);

// // //   const verifyUrl = useMemo(() => {
// // //     if (!vendor) return "";
// // //     return `${window.location.origin}/verify/${vendor.id}`;
// // //   }, [vendor]);

// // //   if (!vendor) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <p className="text-sm text-ink-500">Vendor not found.</p>
// // //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// // //           Back to Vendor List
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (vendor.status !== "Approved") {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// // //         <p className="text-sm font-semibold text-ink-700">
// // //           Smart Card is only available for approved vendors.
// // //         </p>
// // //         <p className="mt-1 text-xs text-ink-500">
// // //           Current status: <span className="font-semibold">{vendor.status}</span>
// // //         </p>
// // //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// // //           View Vendor Profile
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (!certificate) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// // //         Generating certificate...
// // //       </Card>
// // //     );
// // //   }

// // //   const handlePrint = () => window.print();

// // //   const handleDownloadPdf = () => {
// // //     const doc = new jsPDF({ unit: "pt", format: [360, 620] });

// // //     // Header - teal, matches sidebar gradient colors
// // //     doc.setFillColor(11, 77, 82);
// // //     doc.rect(0, 0, 360, 64, "F");
// // //     try {
// // //       doc.addImage(logo, "PNG", 14, 8, 48, 48);
// // //     } catch {
// // //       // logo failed to embed - continue without it
// // //     }
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(11);
// // //     doc.text("VASAI-VIRAR CITY MUNICIPAL CORPORATION", 72, 36);

// // //     // Gold accent band
// // //     doc.setFillColor(202, 158, 58);
// // //     doc.rect(0, 64, 360, 6, "F");

// // //     // Title
// // //     doc.setTextColor(11, 77, 82);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(15);
// // //     doc.text("STREET VENDOR IDENTITY CARD", 180, 92, { align: "center" });

// // //     // Fields
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(10);
// // //     let y = 118;
// // //     fields.forEach(([label, value]) => {
// // //       doc.setTextColor(30, 58, 95);
// // //       doc.setFont("helvetica", "bold");
// // //       const labelLines = doc.splitTextToSize(String(label), 110);
// // //       doc.text(labelLines, 20, y);
// // //       doc.setFont("helvetica", "normal");
// // //       doc.setTextColor(15, 23, 42);
// // //       const valueLines = doc.splitTextToSize(String(value ?? "-"), 175);
// // //       doc.text(valueLines, 150, y);
// // //       y += Math.max(labelLines.length, valueLines.length) * 12 + 8;
// // //     });

// // //     doc.setDrawColor(202, 158, 58);
// // //     doc.setLineWidth(1);
// // //     doc.line(20, y + 4, 340, y + 4);
// // //     y += 26;

// // //     doc.setFont("helvetica", "italic");
// // //     doc.setTextColor(11, 77, 82);
// // //     doc.setFontSize(11);
// // //     doc.text("Authorised Signatory", 180, y, { align: "center" });

// // //     doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
// // //   };

// // //   return (
// // //     <div className="space-y-5">
// // //       <Link
// // //         to={`/vendors/profile/${vendor.id}`}
// // //         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600 print:hidden"
// // //       >
// // //         <FiArrowLeft size={14} /> Back to Vendor Profile
// // //       </Link>

// // //       <div className="mx-auto max-w-md">
// // //         <div
// // //           ref={cardRef}
// // //           className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]"
// // //         >
// // //           {/* Header - exact same gradient colors as the sidebar */}
// // //           <div
// // //             className="relative px-5 pb-4 pt-5 text-white"
// // //             style={{ background: "linear-gradient(160deg, #0B4D52 0%, #08464B 55%, #062E34 100%)" }}
// // //           >
// // //             <div className="flex items-center gap-3">
// // //               <img
// // //                 src={logo}
// // //                 alt="Vasai-Virar City Municipal Corporation"
// // //                 className="h-11 w-11 shrink-0 rounded-full bg-white p-0.5"
// // //               />
// // //               <p className="whitespace-nowrap font-display text-[13px] font-bold tracking-tight">
// // //                 VASAI-VIRAR CITY MUNICIPAL CORPORATION
// // //               </p>
// // //             </div>
// // //           </div>
// // //           {/* Gold accent band */}
// // //           <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

// // //           {/* Title */}
// // //           <div className="px-5 pt-4 text-center">
// // //             <p className="font-display text-lg font-extrabold text-[#0B4D52]">STREET VENDOR IDENTITY CARD</p>
// // //           </div>

// // //           {/* Photo + QR */}
// // //           <div className="flex items-center justify-center gap-5 px-5 py-5">
// // //             <div className="flex h-24 w-20 items-center justify-center overflow-hidden rounded-lg border-2 border-[#0B4D52] bg-ink-50">
// // //               {vendor.documents?.photo?.url ? (
// // //                 <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
// // //               ) : (
// // //                 <span className="text-[10px] text-ink-400">Photo</span>
// // //               )}
// // //             </div>
// // //             <div className="rounded-lg border-2 border-[#0B4D52] p-1.5">
// // //               <QRCodeSVG value={verifyUrl} size={80} />
// // //             </div>
// // //           </div>

// // //           {/* Fields */}
// // //           <div className="space-y-2 px-5 pb-5 text-[12.5px]">
// // //             {fields.map(([label, value]) => (
// // //               <div key={label} className="flex gap-2">
// // //                 <span className="w-[46%] shrink-0 font-semibold text-[#1E3A8F]">{label}</span>
// // //                 <span className="text-ink-800">: {value}</span>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* Footer */}
// // //           <div className="border-t border-dashed border-ink-200 px-5 py-3.5 text-center">
// // //             <p className="text-[12px] italic text-[#0B4D52]">Authorised Signatory</p>
// // //           </div>
// // //         </div>

// // //         <div className="mt-6 flex justify-center gap-3 print:hidden">
// // //           <Button variant="outline" icon={FiPrinter} onClick={handlePrint}>
// // //             Print
// // //           </Button>
// // //           <Button icon={FiDownload} onClick={handleDownloadPdf}>
// // //             Download PDF
// // //           </Button>
// // //           <Button variant="ghost" onClick={() => navigate(`/verify/${vendor.id}`)}>
// // //             Open Verification Screen
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }




// // // import { useEffect, useMemo } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { QRCodeSVG } from "qrcode.react";
// // // import {
// // //   FiDownload,
// // //   FiPrinter,
// // //   FiShield,
// // //   FiExternalLink,
// // //   FiCreditCard,
// // //   FiCalendar,
// // //   FiUser,
// // //   FiPhone,
// // //   FiBriefcase,
// // //   FiMapPin,
// // //   FiHome,
// // //   FiClock,
// // //   FiFileText,
// // //   FiCheckCircle,
// // // } from "react-icons/fi";
// // // import jsPDF from "jspdf";
// // // import Card from "../../../components/ui/Card";
// // // import Button from "../../../components/ui/Button";
// // // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // // import logo from "../../../assets/logovvcmc.jpg";

// // // import {
// // //   selectCertificateByVendorId,
// // //   selectAllCertificates,
// // //   addCertificate,
// // //   makeCertificateDraft,
// // // } from "../../../features/certificates/certificatesSlice";
// // // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // // const TEAL_GRADIENT = "linear-gradient(160deg, #0B4D52 0%, #08464B 55%, #062E34 100%)";

// // // function formatDate(d) {
// // //   if (!d) return "-";
// // //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // // }

// // // function calcAge(dob) {
// // //   if (!dob) return "-";
// // //   const birth = new Date(dob);
// // //   if (Number.isNaN(birth.getTime())) return "-";
// // //   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// // // }

// // // // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile.
// // // function saleType(vendorType) {
// // //   if (!vendorType) return "-";
// // //   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// // // }

// // // function FieldRow({ icon: Icon, label, value }) {
// // //   return (
// // //     <div className="flex items-start gap-2.5">
// // //       <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0B4D52]/10 text-[#0B4D52]">
// // //         <Icon size={13} />
// // //       </div>
// // //       <div>
// // //         <p className="text-[11.5px] font-semibold text-[#0B4D52]">{label}</p>
// // //         <p className="text-[13px] text-ink-800">{value}</p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default function SmartCard() {
// // //   const { id } = useParams();
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();

// // //   const vendor = useSelector((s) => selectVendorById(s, id));
// // //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// // //   const certificates = useSelector(selectAllCertificates);
// // //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// // //   useEffect(() => {
// // //     if (vendor && vendor.status === "Approved" && !certificate) {
// // //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [vendor?.id, vendor?.status, certificate]);

// // //   const verifyUrl = useMemo(() => {
// // //     if (!vendor) return "";
// // //     return `${window.location.origin}/verify/${vendor.id}`;
// // //   }, [vendor]);

// // //   const cardCode = vendor ? `CARD-${vendor.id.replace(/\D/g, "") || vendor.id}` : "";

// // //   if (!vendor) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <p className="text-sm text-ink-500">Vendor not found.</p>
// // //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// // //           Back to Vendor List
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (vendor.status !== "Approved") {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// // //         <p className="text-sm font-semibold text-ink-700">
// // //           Smart Card is only available for approved vendors.
// // //         </p>
// // //         <p className="mt-1 text-xs text-ink-500">
// // //           Current status: <span className="font-semibold">{vendor.status}</span>
// // //         </p>
// // //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// // //           View Vendor Profile
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (!certificate) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// // //         Generating certificate...
// // //       </Card>
// // //     );
// // //   }

// // //   const handlePrint = () => window.print();

// // //   const handleDownloadPdf = () => {
// // //     const doc = new jsPDF({ unit: "pt", format: [380, 640] });

// // //     // Header
// // //     doc.setFillColor(11, 77, 82);
// // //     doc.rect(0, 0, 380, 76, "F");
// // //     try {
// // //       doc.addImage(logo, "PNG", 16, 12, 52, 52);
// // //     } catch {
// // //       // logo failed to embed - continue without it
// // //     }
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(12);
// // //     doc.text("VASAI VIRAR CITY MUNICIPAL CORPORATION", 78, 32);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(10);
// // //     doc.text("Vasai Virar Shahar Mahanagarpalika", 78, 48);
// // //     doc.setTextColor(202, 158, 58);
// // //     doc.setFontSize(8.5);
// // //     doc.text("Established: 3 July 2009", 78, 62);

// // //     doc.setFillColor(202, 158, 58);
// // //     doc.rect(0, 76, 380, 4, "F");

// // //     // Name + badge
// // //     doc.setTextColor(11, 77, 82);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(16);
// // //     doc.text(vendor.personal.fullName.toUpperCase(), 20, 108);
// // //     doc.setFillColor(213, 245, 227);
// // //     doc.roundedRect(20, 116, 150, 18, 9, 9, "F");
// // //     doc.setTextColor(22, 163, 74);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(8.5);
// // //     doc.text("CERTIFIED STREET VENDOR", 30, 128);

// // //     // Fields
// // //     const rows = [
// // //       ["ID Card Number", certificate.certificateNumber],
// // //       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
// // //       ["Gender", vendor.personal.gender || "-"],
// // //       ["Mobile Number", vendor.personal.mobile],
// // //       ["Type of Business", vendor.business.businessCategory],
// // //       ["Vending Zone", vendor.address.zone],
// // //       ["Ward", vendor.address.ward],
// // //       ["Business Timing", vendor.business.businessTiming || "-"],
// // //       ["Address", vendor.address.permanentAddress],
// // //     ];
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(9.5);
// // //     let y = 155;
// // //     rows.forEach(([label, value]) => {
// // //       doc.setTextColor(11, 77, 82);
// // //       doc.setFont("helvetica", "bold");
// // //       doc.text(String(label), 20, y);
// // //       doc.setFont("helvetica", "normal");
// // //       doc.setTextColor(15, 23, 42);
// // //       const valueLines = doc.splitTextToSize(String(value ?? "-"), 200);
// // //       doc.text(valueLines, 20, y + 12);
// // //       y += 12 * valueLines.length + 12;
// // //     });

// // //     // Validity
// // //     doc.setDrawColor(11, 77, 82);
// // //     doc.setLineWidth(1);
// // //     doc.roundedRect(230, 300, 130, 60, 8, 8);
// // //     doc.setTextColor(11, 77, 82);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(8);
// // //     doc.text("VALIDITY PERIOD", 295, 316, { align: "center" });
// // //     doc.setFontSize(10);
// // //     doc.text(formatDate(certificate.issueDate), 295, 334, { align: "center" });
// // //     doc.setFontSize(7.5);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.text("to", 295, 344, { align: "center" });
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(10);
// // //     doc.text(formatDate(certificate.expiryDate), 295, 354, { align: "center" });

// // //     // Footer
// // //     doc.setFillColor(11, 77, 82);
// // //     doc.rect(0, 580, 380, 60, "F");
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(8.5);
// // //     doc.text("Authorised by Vasai Virar City Municipal Corporation", 20, 610);
// // //     doc.setFont("helvetica", "italic");
// // //     doc.text("Authorised Signatory", 260, 610);

// // //     doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
// // //   };

// // //   return (
// // //     <div className="space-y-5">
// // //       <div className="flex flex-wrap items-start justify-between gap-4">
// // //         <div>
// // //           <p className="text-xs font-semibold text-ink-500 print:hidden">
// // //             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
// // //               Smart Card
// // //             </Link>{" "}
// // //             / {cardCode}
// // //           </p>
// // //           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
// // //           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
// // //         </div>
// // //         <div className="flex gap-2 print:hidden">
// // //           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
// // //             Download
// // //           </Button>
// // //           <Button icon={FiPrinter} onClick={handlePrint}>
// // //             Print
// // //           </Button>
// // //         </div>
// // //       </div>

// // //       <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// // //         {/* Header */}
// // //         <div className="relative overflow-hidden px-6 py-5 text-white" style={{ background: TEAL_GRADIENT }}>
// // //           <div
// // //             aria-hidden="true"
// // //             className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[10px] border-[#CA9E3A]/40"
// // //           />
// // //           <div className="relative flex items-center gap-4">
// // //             <img src={logo} alt="Vasai Virar City Municipal Corporation" className="h-14 w-14 shrink-0 rounded-full bg-white p-0.5" />
// // //             <div>
// // //               <p className="font-display text-[17px] font-bold leading-tight">VASAI VIRAR CITY MUNICIPAL CORPORATION</p>
// // //               <p className="text-[13px] text-white/85">वसई विरार शहर महानगरपालिका</p>
// // //               <p className="mt-0.5 text-[11px] font-medium text-[#E9CE8B]">Established: 3 July 2009</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

// // //         {/* Body */}
// // //         <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-[auto_1fr_auto]">
// // //           {/* Photo */}
// // //           <div className="h-32 w-28 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-50">
// // //             {vendor.documents?.photo?.url ? (
// // //               <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
// // //             ) : (
// // //               <div className="flex h-full w-full items-center justify-center text-[11px] text-ink-400">Photo</div>
// // //             )}
// // //           </div>

// // //           {/* Details */}
// // //           <div>
// // //             <p className="font-display text-xl font-extrabold text-[#0B4D52]">
// // //               {vendor.personal.fullName.toUpperCase()}
// // //             </p>
// // //             <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success-100 px-3 py-1 text-[11px] font-semibold text-success-600">
// // //               <FiCheckCircle size={12} /> Certified Street Vendor
// // //             </span>

// // //             <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
// // //               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNumber} />
// // //               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address.zone} />

// // //               <FieldRow
// // //                 icon={FiCalendar}
// // //                 label="Date of Birth / Age"
// // //                 value={`${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`}
// // //               />
// // //               <FieldRow icon={FiHome} label="Ward" value={vendor.address.ward} />

// // //               <FieldRow icon={FiUser} label="Gender" value={vendor.personal.gender || "-"} />
// // //               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business.businessTiming || "-"} />

// // //               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal.mobile} />
// // //               <FieldRow icon={FiFileText} label="Address" value={vendor.address.permanentAddress} />

// // //               <FieldRow icon={FiBriefcase} label="Type of Business" value={vendor.business.businessCategory} />
// // //               <FieldRow icon={FiBriefcase} label="Sale Type" value={saleType(vendor.business.vendorType)} />
// // //             </div>
// // //           </div>

// // //           {/* QR + Validity */}
// // //           <div className="flex flex-col items-center gap-4 print:hidden sm:print:flex">
// // //             <Link
// // //               to={`/verify/${vendor.id}`}
// // //               className="overflow-hidden rounded-xl border border-ink-100 shadow-[var(--shadow-soft)]"
// // //             >
// // //               <div className="p-3">
// // //                 <QRCodeSVG value={verifyUrl} size={128} />
// // //               </div>
// // //               <div className="py-1.5 text-center text-[11px] font-bold tracking-wide text-white" style={{ background: TEAL_GRADIENT }}>
// // //                 SCAN TO VERIFY
// // //               </div>
// // //             </Link>

// // //             <div className="w-full rounded-xl border border-ink-100 p-3 text-center">
// // //               <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#0B4D52]">Validity Period</p>
// // //               <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#0B4D52]">
// // //                 <FiCalendar size={13} />
// // //                 {formatDate(certificate.issueDate)}
// // //               </div>
// // //               <p className="my-0.5 text-[10px] text-ink-400">to</p>
// // //               <p className="text-[13px] font-bold text-[#0B4D52]">{formatDate(certificate.expiryDate)}</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Footer */}
// // //         <div
// // //           className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-[12px] text-white"
// // //           style={{ background: TEAL_GRADIENT }}
// // //         >
// // //           <span className="flex items-center gap-2">
// // //             <FiShield size={14} className="text-[#E9CE8B]" />
// // //             Authorised by Vasai Virar City Municipal Corporation
// // //           </span>
// // //           <span className="italic text-white/90">Authorised Signatory</span>
// // //         </div>
// // //       </div>

// // //       <div className="flex justify-center print:hidden">
// // //         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.id}`)}>
// // //           Open Verification Screen
// // //         </Button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // import { useEffect, useMemo } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { QRCodeSVG } from "qrcode.react";
// // // import {
// // //   FiDownload,
// // //   FiPrinter,
// // //   FiShield,
// // //   FiExternalLink,
// // //   FiCreditCard,
// // //   FiCalendar,
// // //   FiUser,
// // //   FiPhone,
// // //   FiBriefcase,
// // //   FiMapPin,
// // //   FiHome,
// // //   FiClock,
// // //   FiFileText,
// // //   FiCheckCircle,
// // // } from "react-icons/fi";
// // // import jsPDF from "jspdf";
// // // import Card from "../../../components/ui/Card";
// // // import Button from "../../../components/ui/Button";
// // // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // // import logo from "../../../assets/logovvcmc.jpg";

// // // import {
// // //   selectCertificateByVendorId,
// // //   selectAllCertificates,
// // //   addCertificate,
// // //   makeCertificateDraft,
// // // } from "../../../features/certificates/certificatesSlice";
// // // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // // const TEAL_GRADIENT = "linear-gradient(160deg, #0B4D52 0%, #08464B 55%, #062E34 100%)";

// // // function formatDate(d) {
// // //   if (!d) return "-";
// // //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // // }

// // // function calcAge(dob) {
// // //   if (!dob) return "-";
// // //   const birth = new Date(dob);
// // //   if (Number.isNaN(birth.getTime())) return "-";
// // //   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// // // }

// // // // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile.
// // // function saleType(vendorType) {
// // //   if (!vendorType) return "-";
// // //   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// // // }

// // // function FieldRow({ icon: Icon, label, value }) {
// // //   return (
// // //     <div className="flex items-start gap-2.5">
// // //       <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0B4D52]/10 text-[#0B4D52]">
// // //         <Icon size={13} />
// // //       </div>
// // //       <div className="min-w-0">
// // //         <p className="text-[11.5px] font-semibold text-[#0B4D52]">{label}</p>
// // //         <p className="text-[13px] text-ink-800 break-words">{value}</p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default function SmartCard() {
// // //   const { id } = useParams();
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();

// // //   const vendor = useSelector((s) => selectVendorById(s, id));
// // //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// // //   const certificates = useSelector(selectAllCertificates);
// // //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// // //   useEffect(() => {
// // //     if (vendor && vendor.status === "Approved" && !certificate) {
// // //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [vendor?.id, vendor?.status, certificate]);

// // //   const verifyUrl = useMemo(() => {
// // //     if (!vendor) return "";
// // //     return `${window.location.origin}/verify/${vendor.id}`;
// // //   }, [vendor]);

// // //   const cardCode = vendor ? `CARD-${vendor.id.replace(/\D/g, "") || vendor.id}` : "";

// // //   if (!vendor) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <p className="text-sm text-ink-500">Vendor not found.</p>
// // //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// // //           Back to Vendor List
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (vendor.status !== "Approved") {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center">
// // //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// // //         <p className="text-sm font-semibold text-ink-700">
// // //           Smart Card is only available for approved vendors.
// // //         </p>
// // //         <p className="mt-1 text-xs text-ink-500">
// // //           Current status: <span className="font-semibold">{vendor.status}</span>
// // //         </p>
// // //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// // //           View Vendor Profile
// // //         </Link>
// // //       </Card>
// // //     );
// // //   }

// // //   if (!certificate) {
// // //     return (
// // //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// // //         Generating certificate...
// // //       </Card>
// // //     );
// // //   }

// // //   const handlePrint = () => window.print();

// // //   const handleDownloadPdf = () => {
// // //     const doc = new jsPDF({ unit: "pt", format: [380, 640] });

// // //     // Header
// // //     doc.setFillColor(11, 77, 82);
// // //     doc.rect(0, 0, 380, 76, "F");
// // //     try {
// // //       doc.addImage(logo, "PNG", 16, 12, 52, 52);
// // //     } catch {
// // //       // logo failed to embed - continue without it
// // //     }
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(12);
// // //     doc.text("VASAI VIRAR CITY MUNICIPAL CORPORATION", 78, 32);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(10);
// // //     doc.text("Vasai Virar Shahar Mahanagarpalika", 78, 48);
// // //     doc.setTextColor(202, 158, 58);
// // //     doc.setFontSize(8.5);
// // //     doc.text("Established: 3 July 2009", 78, 62);

// // //     doc.setFillColor(202, 158, 58);
// // //     doc.rect(0, 76, 380, 4, "F");

// // //     // Name + badge
// // //     doc.setTextColor(11, 77, 82);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(16);
// // //     doc.text(vendor.personal.fullName.toUpperCase(), 20, 108);
// // //     doc.setFillColor(213, 245, 227);
// // //     doc.roundedRect(20, 116, 150, 18, 9, 9, "F");
// // //     doc.setTextColor(22, 163, 74);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(8.5);
// // //     doc.text("CERTIFIED STREET VENDOR", 30, 128);

// // //     // Fields
// // //     const rows = [
// // //       ["ID Card Number", certificate.certificateNumber],
// // //       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
// // //       ["Gender", vendor.personal.gender || "-"],
// // //       ["Mobile Number", vendor.personal.mobile],
// // //       ["Type of Business", vendor.business.businessCategory],
// // //       ["Vending Zone", vendor.address.zone],
// // //       ["Ward", vendor.address.ward],
// // //       ["Business Timing", vendor.business.businessTiming || "-"],
// // //       ["Address", vendor.address.permanentAddress],
// // //     ];
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(9.5);
// // //     let y = 155;
// // //     rows.forEach(([label, value]) => {
// // //       doc.setTextColor(11, 77, 82);
// // //       doc.setFont("helvetica", "bold");
// // //       doc.text(String(label), 20, y);
// // //       doc.setFont("helvetica", "normal");
// // //       doc.setTextColor(15, 23, 42);
// // //       const valueLines = doc.splitTextToSize(String(value ?? "-"), 200);
// // //       doc.text(valueLines, 20, y + 12);
// // //       y += 12 * valueLines.length + 12;
// // //     });

// // //     // Validity
// // //     doc.setDrawColor(11, 77, 82);
// // //     doc.setLineWidth(1);
// // //     doc.roundedRect(230, 300, 130, 60, 8, 8);
// // //     doc.setTextColor(11, 77, 82);
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(8);
// // //     doc.text("VALIDITY PERIOD", 295, 316, { align: "center" });
// // //     doc.setFontSize(10);
// // //     doc.text(formatDate(certificate.issueDate), 295, 334, { align: "center" });
// // //     doc.setFontSize(7.5);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.text("to", 295, 344, { align: "center" });
// // //     doc.setFont("helvetica", "bold");
// // //     doc.setFontSize(10);
// // //     doc.text(formatDate(certificate.expiryDate), 295, 354, { align: "center" });

// // //     // Footer
// // //     doc.setFillColor(11, 77, 82);
// // //     doc.rect(0, 580, 380, 60, "F");
// // //     doc.setTextColor(255, 255, 255);
// // //     doc.setFont("helvetica", "normal");
// // //     doc.setFontSize(8.5);
// // //     doc.text("Authorised by Vasai Virar City Municipal Corporation", 20, 610);
// // //     doc.setFont("helvetica", "italic");
// // //     doc.text("Authorised Signatory", 260, 610);

// // //     doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
// // //   };

// // //   return (
// // //     <div className="space-y-5">
// // //       <div className="flex flex-wrap items-start justify-between gap-4">
// // //         <div>
// // //           <p className="text-xs font-semibold text-ink-500 print:hidden">
// // //             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
// // //               Smart Card
// // //             </Link>{" "}
// // //             / {cardCode}
// // //           </p>
// // //           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
// // //           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
// // //         </div>
// // //         <div className="flex gap-2 print:hidden">
// // //           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
// // //             Download
// // //           </Button>
// // //           <Button icon={FiPrinter} onClick={handlePrint}>
// // //             Print
// // //           </Button>
// // //         </div>
// // //       </div>

// // //       <div className="mx-auto max-w-[600px] overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// // //         {/* Header */}
// // //         <div className="relative overflow-hidden px-6 py-5 text-white" style={{ background: TEAL_GRADIENT }}>
// // //           <div
// // //             aria-hidden="true"
// // //             className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[10px] border-[#CA9E3A]/40"
// // //           />
// // //           <div className="relative flex items-center gap-4">
// // //             <img src={logo} alt="Vasai Virar City Municipal Corporation" className="h-14 w-14 shrink-0 rounded-full bg-white p-0.5" />
// // //             <div>
// // //               <p className="font-display text-[15px] font-bold leading-tight">VASAI VIRAR CITY MUNICIPAL CORPORATION</p>
// // //               <p className="text-[12.5px] text-white/85">वसई विरार शहर महानगरपालिका</p>
// // //               <p className="mt-0.5 text-[11px] font-medium text-[#E9CE8B]">Established: 3 July 2009</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

// // //         {/* Body */}
// // //         <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-[auto_1fr_auto]">
// // //           {/* Photo */}
// // //           <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-50">
// // //             {vendor.documents?.photo?.url ? (
// // //               <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
// // //             ) : (
// // //               <div className="flex h-full w-full items-center justify-center text-[10px] text-ink-400">Photo</div>
// // //             )}
// // //           </div>

// // //           {/* Details */}
// // //           <div className="min-w-0">
// // //             <p className="font-display text-lg font-extrabold text-[#0B4D52] break-words">
// // //               {vendor.personal.fullName.toUpperCase()}
// // //             </p>
// // //             <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success-100 px-2.5 py-1 text-[10.5px] font-semibold text-success-600">
// // //               <FiCheckCircle size={11} /> Certified Street Vendor
// // //             </span>

// // //             <div className="mt-3.5 grid grid-cols-1 gap-y-3">
// // //               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNumber} />
// // //               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address.zone} />
// // //               <FieldRow
// // //                 icon={FiCalendar}
// // //                 label="Date of Birth / Age"
// // //                 value={`${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`}
// // //               />
// // //               <FieldRow icon={FiHome} label="Ward" value={vendor.address.ward} />
// // //               <FieldRow icon={FiUser} label="Gender" value={vendor.personal.gender || "-"} />
// // //               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business.businessTiming || "-"} />
// // //               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal.mobile} />
// // //               <FieldRow icon={FiFileText} label="Address" value={vendor.address.permanentAddress} />
// // //               <FieldRow icon={FiBriefcase} label="Type of Business" value={vendor.business.businessCategory} />
// // //               <FieldRow icon={FiBriefcase} label="Sale Type" value={saleType(vendor.business.vendorType)} />
// // //             </div>
// // //           </div>

// // //           {/* QR + Validity */}
// // //           <div className="flex flex-col items-center gap-4 print:hidden sm:print:flex">
// // //             <Link
// // //               to={`/verify/${vendor.id}`}
// // //               className="overflow-hidden rounded-xl border border-ink-100 shadow-[var(--shadow-soft)]"
// // //             >
// // //               <div className="p-3">
// // //                 <QRCodeSVG value={verifyUrl} size={112} />
// // //               </div>
// // //               <div className="py-1.5 text-center text-[10.5px] font-bold tracking-wide text-white" style={{ background: TEAL_GRADIENT }}>
// // //                 SCAN TO VERIFY
// // //               </div>
// // //             </Link>

// // //             <div className="w-full rounded-xl border border-ink-100 p-3 text-center">
// // //               <p className="text-[10px] font-bold uppercase tracking-wide text-[#0B4D52]">Validity Period</p>
// // //               <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[12.5px] font-bold text-[#0B4D52]">
// // //                 <FiCalendar size={12} />
// // //                 {formatDate(certificate.issueDate)}
// // //               </div>
// // //               <p className="my-0.5 text-[10px] text-ink-400">to</p>
// // //               <p className="text-[12.5px] font-bold text-[#0B4D52]">{formatDate(certificate.expiryDate)}</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Footer */}
// // //         <div
// // //           className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-[11.5px] text-white"
// // //           style={{ background: TEAL_GRADIENT }}
// // //         >
// // //           <span className="flex items-center gap-2">
// // //             <FiShield size={14} className="text-[#E9CE8B]" />
// // //             Authorised by Vasai Virar City Municipal Corporation
// // //           </span>
// // //           <span className="italic text-white/90">Authorised Signatory</span>
// // //         </div>
// // //       </div>

// // //       <div className="flex justify-center print:hidden">
// // //         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.id}`)}>
// // //           Open Verification Screen
// // //         </Button>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import { useEffect, useMemo } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { QRCodeSVG } from "qrcode.react";
// // import {
// //   FiDownload,
// //   FiPrinter,
// //   FiShield,
// //   FiExternalLink,
// //   FiCreditCard,
// //   FiCalendar,
// //   FiUser,
// //   FiPhone,
// //   FiBriefcase,
// //   FiMapPin,
// //   FiHome,
// //   FiClock,
// //   FiFileText,
// //   FiCheckCircle,
// // } from "react-icons/fi";
// // import jsPDF from "jspdf";
// // import Card from "../../../components/ui/Card";
// // import Button from "../../../components/ui/Button";
// // import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// // import logo from "../../../assets/logovvcmc.jpg";

// // import {
// //   selectCertificateByVendorId,
// //   selectAllCertificates,
// //   addCertificate,
// //   makeCertificateDraft,
// // } from "../../../features/certificates/certificatesSlice";
// // import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// // const TEAL_GRADIENT = "linear-gradient(160deg, #0B4D52 0%, #08464B 55%, #062E34 100%)";
// // const TEAL = [11, 77, 82];
// // const TEAL_DARK = [6, 46, 52];
// // const GOLD = [202, 158, 58];

// // function formatDate(d) {
// //   if (!d) return "-";
// //   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // }

// // function calcAge(dob) {
// //   if (!dob) return "-";
// //   const birth = new Date(dob);
// //   if (Number.isNaN(birth.getTime())) return "-";
// //   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// // }

// // // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile.
// // function saleType(vendorType) {
// //   if (!vendorType) return "-";
// //   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// // }

// // function FieldRow({ icon: Icon, label, value }) {
// //   return (
// //     <div className="flex items-start gap-2.5">
// //       <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0B4D52]/10 text-[#0B4D52]">
// //         <Icon size={13} />
// //       </div>
// //       <div className="min-w-0">
// //         <p className="text-[11.5px] font-semibold text-[#0B4D52]">{label}</p>
// //         <p className="text-[13px] text-ink-800 break-words">{value}</p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function SmartCard() {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const vendor = useSelector((s) => selectVendorById(s, id));
// //   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
// //   const certificates = useSelector(selectAllCertificates);
// //   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

// //   useEffect(() => {
// //     if (vendor && vendor.status === "Approved" && !certificate) {
// //       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [vendor?.id, vendor?.status, certificate]);

// //   const verifyUrl = useMemo(() => {
// //     if (!vendor) return "";
// //     return `${window.location.origin}/verify/${vendor.id}`;
// //   }, [vendor]);

// //   const cardCode = vendor ? `CARD-${vendor.id.replace(/\D/g, "") || vendor.id}` : "";

// //   if (!vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">Vendor not found.</p>
// //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Vendor List
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   if (vendor.status !== "Approved") {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// //         <p className="text-sm font-semibold text-ink-700">
// //           Smart Card is only available for approved vendors.
// //         </p>
// //         <p className="mt-1 text-xs text-ink-500">
// //           Current status: <span className="font-semibold">{vendor.status}</span>
// //         </p>
// //         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// //           View Vendor Profile
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   if (!certificate) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
// //         Generating certificate...
// //       </Card>
// //     );
// //   }

// //   const handlePrint = () => window.print();

// //   const handleDownloadPdf = () => {
// //     // Card canvas size mirrors the on-screen card proportions (wide layout)
// //     const W = 620;
// //     const H = 460;
// //     const doc = new jsPDF({ unit: "pt", format: [W, H] });

// //     // ---------- Header ----------
// //     doc.setFillColor(...TEAL);
// //     doc.rect(0, 0, W, 92, "F");

// //     // circular logo badge
// //     try {
// //       doc.setFillColor(255, 255, 255);
// //       doc.circle(50, 46, 26, "F");
// //       doc.addImage(logo, "JPEG", 26, 22, 48, 48, undefined, "FAST");
// //     } catch {
// //       // logo failed to embed - continue without it
// //     }

// //     doc.setTextColor(255, 255, 255);
// //     doc.setFont("helvetica", "bold");
// //     doc.setFontSize(13);
// //     doc.text("VASAI VIRAR CITY MUNICIPAL CORPORATION", 92, 38);
// //     doc.setFont("helvetica", "normal");
// //     doc.setFontSize(10.5);
// //     doc.text("Vasai Virar Shahar Mahanagarpalika", 92, 54);
// //     doc.setTextColor(...GOLD);
// //     doc.setFontSize(9);
// //     doc.text("Established: 3 July 2009", 92, 70);

// //     // gold gradient-look curve accent (simple arc using ellipse clip-free trick)
// //     doc.setDrawColor(...GOLD);
// //     doc.setLineWidth(6);
// //     doc.circle(W - 30, 92, 55, "S");

// //     // gold divider bar
// //     doc.setFillColor(...GOLD);
// //     doc.rect(0, 92, W, 4, "F");

// //     // ---------- Photo ----------
// //     const photoX = 24;
// //     const photoY = 116;
// //     const photoW = 90;
// //     const photoH = 108;
// //     doc.setDrawColor(230, 230, 230);
// //     doc.setFillColor(245, 247, 246);
// //     doc.roundedRect(photoX, photoY, photoW, photoH, 8, 8, "FD");
// //     if (vendor.documents?.photo?.url) {
// //       try {
// //         doc.addImage(vendor.documents.photo.url, "JPEG", photoX, photoY, photoW, photoH, undefined, "FAST");
// //       } catch {
// //         // ignore if not embeddable (e.g. cross-origin)
// //       }
// //     }

// //     // ---------- Name + badge ----------
// //     const infoX = photoX + photoW + 20;
// //     doc.setTextColor(...TEAL);
// //     doc.setFont("helvetica", "bold");
// //     doc.setFontSize(16);
// //     doc.text(vendor.personal.fullName.toUpperCase(), infoX, photoY + 16);

// //     doc.setFillColor(213, 245, 227);
// //     doc.roundedRect(infoX, photoY + 26, 150, 18, 9, 9, "F");
// //     doc.setTextColor(22, 163, 74);
// //     doc.setFont("helvetica", "bold");
// //     doc.setFontSize(8.5);
// //     doc.text("CERTIFIED STREET VENDOR", infoX + 20, photoY + 38);

// //     // ---------- Two-column fields ----------
// //     const colGap = 18; // reduced gap between the two field columns
// //     const col1X = infoX;
// //     const col2X = infoX + 165 + colGap;
// //     const fieldsStartY = photoY + 58;
// //     const rowGap = 32;

// //     const leftRows = [
// //       ["ID Card Number", certificate.certificateNumber],
// //       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
// //       ["Gender", vendor.personal.gender || "-"],
// //       ["Mobile Number", vendor.personal.mobile],
// //       ["Type of Business", vendor.business.businessCategory],
// //     ];
// //     const rightRows = [
// //       ["Vending Zone", vendor.address.zone],
// //       ["Ward", vendor.address.ward],
// //       ["Business Timing", vendor.business.businessTiming || "-"],
// //       ["Address", vendor.address.permanentAddress],
// //     ];

// //     const drawField = (x, y, label, value) => {
// //       doc.setFont("helvetica", "bold");
// //       doc.setFontSize(8.5);
// //       doc.setTextColor(...TEAL);
// //       doc.text(String(label), x, y);
// //       doc.setFont("helvetica", "normal");
// //       doc.setFontSize(9.5);
// //       doc.setTextColor(15, 23, 42);
// //       const lines = doc.splitTextToSize(String(value ?? "-"), 155);
// //       doc.text(lines, x, y + 12);
// //       return 12 * lines.length + rowGap - 12;
// //     };

// //     let yL = fieldsStartY;
// //     leftRows.forEach(([label, value]) => {
// //       yL += drawField(col1X, yL, label, value);
// //     });

// //     let yR = fieldsStartY;
// //     rightRows.forEach(([label, value]) => {
// //       yR += drawField(col2X, yR, label, value);
// //     });

// //     // ---------- QR + Validity (right side) ----------
// //     const qrBoxX = W - 150;
// //     const qrBoxY = 116;
// //     const qrBoxSize = 120;
// //     doc.setDrawColor(220, 224, 223);
// //     doc.setLineWidth(1);
// //     doc.roundedRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 8, 8, "S");

// //     // QR rendered via a temporary offscreen canvas
// //     const qrCanvas = document.createElement("canvas");
// //     // eslint-disable-next-line no-undef
// //     const QRCode = window.QRCode; // fallback not required; using existing SVG on page instead
// //     try {
// //       const svgEl = document.querySelector('a[href^="/verify/"] svg');
// //       if (svgEl) {
// //         const svgData = new XMLSerializer().serializeToString(svgEl);
// //         const img = new Image();
// //         const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
// //         const url = URL.createObjectURL(svgBlob);
// //         img.onload = () => {
// //           qrCanvas.width = 300;
// //           qrCanvas.height = 300;
// //           const ctx = qrCanvas.getContext("2d");
// //           ctx.fillStyle = "#ffffff";
// //           ctx.fillRect(0, 0, 300, 300);
// //           ctx.drawImage(img, 0, 0, 300, 300);
// //           URL.revokeObjectURL(url);
// //           const dataUrl = qrCanvas.toDataURL("image/png");
// //           doc.addImage(dataUrl, "PNG", qrBoxX + 10, qrBoxY + 10, qrBoxSize - 20, qrBoxSize - 20);
// //           finishPdf();
// //         };
// //         img.src = url;
// //       } else {
// //         finishPdf();
// //       }
// //     } catch {
// //       finishPdf();
// //     }

// //     function finishPdf() {
// //       doc.setFillColor(...TEAL);
// //       doc.rect(qrBoxX, qrBoxY + qrBoxSize - 20, qrBoxSize, 20, "F");
// //       doc.setTextColor(255, 255, 255);
// //       doc.setFont("helvetica", "bold");
// //       doc.setFontSize(8);
// //       doc.text("SCAN TO VERIFY", qrBoxX + qrBoxSize / 2, qrBoxY + qrBoxSize - 7, { align: "center" });

// //       // Validity box
// //       const valY = qrBoxY + qrBoxSize + 16;
// //       doc.setDrawColor(220, 224, 223);
// //       doc.roundedRect(qrBoxX, valY, qrBoxSize, 76, 8, 8, "S");
// //       doc.setTextColor(...TEAL);
// //       doc.setFont("helvetica", "bold");
// //       doc.setFontSize(7.5);
// //       doc.text("VALIDITY PERIOD", qrBoxX + qrBoxSize / 2, valY + 16, { align: "center" });
// //       doc.setFontSize(10);
// //       doc.text(formatDate(certificate.issueDate), qrBoxX + qrBoxSize / 2, valY + 34, { align: "center" });
// //       doc.setFont("helvetica", "normal");
// //       doc.setFontSize(7.5);
// //       doc.setTextColor(140, 150, 148);
// //       doc.text("to", qrBoxX + qrBoxSize / 2, valY + 46, { align: "center" });
// //       doc.setFont("helvetica", "bold");
// //       doc.setFontSize(10);
// //       doc.setTextColor(...TEAL);
// //       doc.text(formatDate(certificate.expiryDate), qrBoxX + qrBoxSize / 2, valY + 62, { align: "center" });

// //       // ---------- Footer ----------
// //       const footerY = H - 44;
// //       doc.setFillColor(...TEAL);
// //       doc.rect(0, footerY, W, 44, "F");
// //       doc.setTextColor(255, 255, 255);
// //       doc.setFont("helvetica", "normal");
// //       doc.setFontSize(9);
// //       doc.text("Authorised by Vasai Virar City Municipal Corporation", 24, footerY + 26);
// //       doc.setFont("helvetica", "italic");
// //       doc.text("Authorised Signatory", W - 130, footerY + 26);

// //       doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
// //     }
// //   };

// //   return (
// //     <div className="space-y-5">
// //       <div className="flex flex-wrap items-start justify-between gap-4">
// //         <div>
// //           <p className="text-xs font-semibold text-ink-500 print:hidden">
// //             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
// //               Smart Card
// //             </Link>{" "}
// //             / {cardCode}
// //           </p>
// //           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
// //           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
// //         </div>
// //         <div className="flex gap-2 print:hidden">
// //           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
// //             Download
// //           </Button>
// //           <Button icon={FiPrinter} onClick={handlePrint}>
// //             Print
// //           </Button>
// //         </div>
// //       </div>

// //       <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
// //         {/* Header */}
// //         <div className="relative overflow-hidden px-6 py-5 text-white" style={{ background: TEAL_GRADIENT }}>
// //           <div
// //             aria-hidden="true"
// //             className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[10px] border-[#CA9E3A]/40"
// //           />
// //           <div className="relative flex items-center gap-4">
// //             <img src={logo} alt="Vasai Virar City Municipal Corporation" className="h-14 w-14 shrink-0 rounded-full bg-white p-0.5" />
// //             <div>
// //               <p className="font-display text-[17px] font-bold leading-tight">VASAI VIRAR CITY MUNICIPAL CORPORATION</p>
// //               <p className="text-[13px] text-white/85">वसई विरार शहर महानगरपालिका</p>
// //               <p className="mt-0.5 text-[11px] font-medium text-[#E9CE8B]">Established: 3 July 2009</p>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

// //         {/* Body */}
// //         <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-[auto_1fr_auto]">
// //           {/* Photo */}
// //           <div className="h-32 w-28 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-50">
// //             {vendor.documents?.photo?.url ? (
// //               <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
// //             ) : (
// //               <div className="flex h-full w-full items-center justify-center text-[11px] text-ink-400">Photo</div>
// //             )}
// //           </div>

// //           {/* Details */}
// //           <div>
// //             <p className="font-display text-xl font-extrabold text-[#0B4D52]">
// //               {vendor.personal.fullName.toUpperCase()}
// //             </p>
// //             <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success-100 px-3 py-1 text-[11px] font-semibold text-success-600">
// //               <FiCheckCircle size={12} /> Certified Street Vendor
// //             </span>

// //             {/* reduced gap-x from 6 to 3 so the two columns sit closer together */}
// //             <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-3.5 sm:grid-cols-2">
// //               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNumber} />
// //               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address.zone} />

// //               <FieldRow
// //                 icon={FiCalendar}
// //                 label="Date of Birth / Age"
// //                 value={`${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`}
// //               />
// //               <FieldRow icon={FiHome} label="Ward" value={vendor.address.ward} />

// //               <FieldRow icon={FiUser} label="Gender" value={vendor.personal.gender || "-"} />
// //               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business.businessTiming || "-"} />

// //               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal.mobile} />
// //               <FieldRow icon={FiFileText} label="Address" value={vendor.address.permanentAddress} />

// //               <FieldRow icon={FiBriefcase} label="Type of Business" value={vendor.business.businessCategory} />
// //               <FieldRow icon={FiBriefcase} label="Sale Type" value={saleType(vendor.business.vendorType)} />
// //             </div>
// //           </div>

// //           {/* QR + Validity */}
// //           <div className="flex flex-col items-center gap-4 print:hidden sm:print:flex">
// //             <Link
// //               to={`/verify/${vendor.id}`}
// //               className="overflow-hidden rounded-xl border border-ink-100 shadow-[var(--shadow-soft)]"
// //             >
// //               <div className="p-3">
// //                 <QRCodeSVG value={verifyUrl} size={128} />
// //               </div>
// //               <div className="py-1.5 text-center text-[11px] font-bold tracking-wide text-white" style={{ background: TEAL_GRADIENT }}>
// //                 SCAN TO VERIFY
// //               </div>
// //             </Link>

// //             <div className="w-full rounded-xl border border-ink-100 p-3 text-center">
// //               <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#0B4D52]">Validity Period</p>
// //               <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#0B4D52]">
// //                 <FiCalendar size={13} />
// //                 {formatDate(certificate.issueDate)}
// //               </div>
// //               <p className="my-0.5 text-[10px] text-ink-400">to</p>
// //               <p className="text-[13px] font-bold text-[#0B4D52]">{formatDate(certificate.expiryDate)}</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Footer */}
// //         <div
// //           className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-[12px] text-white"
// //           style={{ background: TEAL_GRADIENT }}
// //         >
// //           <span className="flex items-center gap-2">
// //             <FiShield size={14} className="text-[#E9CE8B]" />
// //             Authorised by Vasai Virar City Municipal Corporation
// //           </span>
// //           <span className="italic text-white/90">Authorised Signatory</span>
// //         </div>
// //       </div>

// //       <div className="flex justify-center print:hidden">
// //         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.id}`)}>
// //           Open Verification Screen
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import {
//   FiDownload,
//   FiPrinter,
//   FiShield,
//   FiExternalLink,
//   FiCreditCard,
//   FiCalendar,
//   FiUser,
//   FiPhone,
//   FiBriefcase,
//   FiMapPin,
//   FiHome,
//   FiClock,
//   FiFileText,
//   FiCheckCircle,
// } from "react-icons/fi";
// import jsPDF from "jspdf";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// import logo from "../../../assets/logovvcmc.jpg";

// import {
//   selectCertificateByVendorId,
//   selectAllCertificates,
//   addCertificate,
//   makeCertificateDraft,
// } from "../../../features/certificates/certificatesSlice";
// import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// const TEAL_GRADIENT = "linear-gradient(160deg, #0B4D52 0%, #08464B 55%, #062E34 100%)";
// const TEAL = [11, 77, 82];
// const GOLD = [202, 158, 58];

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// }

// // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile.
// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// }

// function FieldRow({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-start gap-2.5">
//       <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0B4D52]/10 text-[#0B4D52]">
//         <Icon size={13} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[11.5px] font-semibold text-[#0B4D52]">{label}</p>
//         <p className="text-[13px] text-ink-800 break-words">{value}</p>
//       </div>
//     </div>
//   );
// }

// export default function SmartCard() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const vendor = useSelector((s) => selectVendorById(s, id));
//   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
//   const certificates = useSelector(selectAllCertificates);
//   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

//   useEffect(() => {
//     if (vendor && vendor.status === "Approved" && !certificate) {
//       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [vendor?.id, vendor?.status, certificate]);

//   const verifyUrl = useMemo(() => {
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.id}`;
//   }, [vendor]);

//   const cardCode = vendor ? `CARD-${vendor.id.replace(/\D/g, "") || vendor.id}` : "";

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

//   if (vendor.status !== "Approved") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           Smart Card is only available for approved vendors.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   if (!certificate) {
//     return (
//       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
//         Generating certificate...
//       </Card>
//     );
//   }

//   const handlePrint = () => window.print();

//   const handleDownloadPdf = () => {
//     const W = 620;
//     const H = 460;
//     const doc = new jsPDF({ unit: "pt", format: [W, H] });

//     // ---------- Header ----------
//     doc.setFillColor(...TEAL);
//     doc.rect(0, 0, W, 92, "F");

//     try {
//       doc.setFillColor(255, 255, 255);
//       doc.circle(50, 46, 26, "F");
//       doc.addImage(logo, "JPEG", 26, 22, 48, 48, undefined, "FAST");
//     } catch {
//       // logo failed to embed - continue without it
//     }

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(13);
//     doc.text("VASAI VIRAR CITY MUNICIPAL CORPORATION", 92, 38);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10.5);
//     doc.text("Vasai Virar Shahar Mahanagarpalika", 92, 54);
//     doc.setTextColor(...GOLD);
//     doc.setFontSize(9);
//     doc.text("Established: 3 July 2009", 92, 70);

//     doc.setDrawColor(...GOLD);
//     doc.setLineWidth(6);
//     doc.circle(W - 30, 92, 55, "S");

//     doc.setFillColor(...GOLD);
//     doc.rect(0, 92, W, 4, "F");

//     // ---------- Photo ----------
//     const photoX = 24;
//     const photoY = 116;
//     const photoW = 90;
//     const photoH = 108;
//     doc.setDrawColor(230, 230, 230);
//     doc.setFillColor(245, 247, 246);
//     doc.roundedRect(photoX, photoY, photoW, photoH, 8, 8, "FD");
//     if (vendor.documents?.photo?.url) {
//       try {
//         doc.addImage(vendor.documents.photo.url, "JPEG", photoX, photoY, photoW, photoH, undefined, "FAST");
//       } catch {
//         // ignore if not embeddable (e.g. cross-origin)
//       }
//     }

//     // ---------- Name + badge ----------
//     const infoX = photoX + photoW + 20;
//     doc.setTextColor(...TEAL);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.text(vendor.personal.fullName.toUpperCase(), infoX, photoY + 16);

//     doc.setFillColor(213, 245, 227);
//     doc.roundedRect(infoX, photoY + 26, 150, 18, 9, 9, "F");
//     doc.setTextColor(22, 163, 74);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8.5);
//     doc.text("CERTIFIED STREET VENDOR", infoX + 20, photoY + 38);

//     // ---------- Two-column fields (compressed gap) ----------
//     const colGap = 10;
//     const colWidth = 155;
//     const col1X = infoX;
//     const col2X = infoX + colWidth + colGap;
//     const fieldsStartY = photoY + 58;
//     const rowGap = 32;

//     const leftRows = [
//       ["ID Card Number", certificate.certificateNumber],
//       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
//       ["Gender", vendor.personal.gender || "-"],
//       ["Mobile Number", vendor.personal.mobile],
//       ["Type of Business", vendor.business.businessCategory],
//     ];
//     const rightRows = [
//       ["Vending Zone", vendor.address.zone],
//       ["Ward", vendor.address.ward],
//       ["Business Timing", vendor.business.businessTiming || "-"],
//       ["Address", vendor.address.permanentAddress],
//     ];

//     const drawField = (x, y, label, value) => {
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(8.5);
//       doc.setTextColor(...TEAL);
//       doc.text(String(label), x, y);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(9.5);
//       doc.setTextColor(15, 23, 42);
//       const lines = doc.splitTextToSize(String(value ?? "-"), colWidth);
//       doc.text(lines, x, y + 12);
//       return 12 * lines.length + rowGap - 12;
//     };

//     let yL = fieldsStartY;
//     leftRows.forEach(([label, value]) => {
//       yL += drawField(col1X, yL, label, value);
//     });

//     let yR = fieldsStartY;
//     rightRows.forEach(([label, value]) => {
//       yR += drawField(col2X, yR, label, value);
//     });

//     // ---------- QR + Validity (right side) ----------
//     const qrBoxX = W - 150;
//     const qrBoxY = 116;
//     const qrBoxSize = 120;
//     doc.setDrawColor(220, 224, 223);
//     doc.setLineWidth(1);
//     doc.roundedRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 8, 8, "S");

//     const qrCanvas = document.createElement("canvas");
//     try {
//       const svgEl = document.querySelector('a[href^="/verify/"] svg');
//       if (svgEl) {
//         const svgData = new XMLSerializer().serializeToString(svgEl);
//         const img = new Image();
//         const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
//         const url = URL.createObjectURL(svgBlob);
//         img.onload = () => {
//           qrCanvas.width = 300;
//           qrCanvas.height = 300;
//           const ctx = qrCanvas.getContext("2d");
//           ctx.fillStyle = "#ffffff";
//           ctx.fillRect(0, 0, 300, 300);
//           ctx.drawImage(img, 0, 0, 300, 300);
//           URL.revokeObjectURL(url);
//           const dataUrl = qrCanvas.toDataURL("image/png");
//           doc.addImage(dataUrl, "PNG", qrBoxX + 10, qrBoxY + 10, qrBoxSize - 20, qrBoxSize - 20);
//           finishPdf();
//         };
//         img.src = url;
//       } else {
//         finishPdf();
//       }
//     } catch {
//       finishPdf();
//     }

//     function finishPdf() {
//       doc.setFillColor(...TEAL);
//       doc.rect(qrBoxX, qrBoxY + qrBoxSize - 20, qrBoxSize, 20, "F");
//       doc.setTextColor(255, 255, 255);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(8);
//       doc.text("SCAN TO VERIFY", qrBoxX + qrBoxSize / 2, qrBoxY + qrBoxSize - 7, { align: "center" });

//       const valY = qrBoxY + qrBoxSize + 16;
//       doc.setDrawColor(220, 224, 223);
//       doc.roundedRect(qrBoxX, valY, qrBoxSize, 76, 8, 8, "S");
//       doc.setTextColor(...TEAL);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(7.5);
//       doc.text("VALIDITY PERIOD", qrBoxX + qrBoxSize / 2, valY + 16, { align: "center" });
//       doc.setFontSize(10);
//       doc.text(formatDate(certificate.issueDate), qrBoxX + qrBoxSize / 2, valY + 34, { align: "center" });
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(7.5);
//       doc.setTextColor(140, 150, 148);
//       doc.text("to", qrBoxX + qrBoxSize / 2, valY + 46, { align: "center" });
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(10);
//       doc.setTextColor(...TEAL);
//       doc.text(formatDate(certificate.expiryDate), qrBoxX + qrBoxSize / 2, valY + 62, { align: "center" });

//       const footerY = H - 44;
//       doc.setFillColor(...TEAL);
//       doc.rect(0, footerY, W, 44, "F");
//       doc.setTextColor(255, 255, 255);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(9);
//       doc.text("Authorised by Vasai Virar City Municipal Corporation", 24, footerY + 26);
//       doc.setFont("helvetica", "italic");
//       doc.text("Authorised Signatory", W - 130, footerY + 26);

//       doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
//     }
//   };

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div>
//           <p className="text-xs font-semibold text-ink-500 print:hidden">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>{" "}
//             / {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
//           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
//         </div>
//         <div className="flex gap-2 print:hidden">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
//         {/* Header */}
//         <div className="relative overflow-hidden px-6 py-5 text-white" style={{ background: TEAL_GRADIENT }}>
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[10px] border-[#CA9E3A]/40"
//           />
//           <div className="relative flex items-center gap-4">
//             <img src={logo} alt="Vasai Virar City Municipal Corporation" className="h-14 w-14 shrink-0 rounded-full bg-white p-0.5" />
//             <div>
//               <p className="font-display text-[17px] font-bold leading-tight">VASAI VIRAR CITY MUNICIPAL CORPORATION</p>
//               <p className="text-[13px] text-white/85">वसई विरार शहर महानगरपालिका</p>
//               <p className="mt-0.5 text-[11px] font-medium text-[#E9CE8B]">Established: 3 July 2009</p>
//             </div>
//           </div>
//         </div>
//         <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

//         {/* Body */}
//         {/* <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-[auto_1fr_auto]"> */}
//         <div className="grid grid-cols-1 gap-6 p-6 sm:flex sm:flex-wrap sm:items-start sm:justify-start">
//           {/* Photo */}
//           <div className="h-32 w-28 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-50">
//             {vendor.documents?.photo?.url ? (
//               <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//             ) : (
//               <div className="flex h-full w-full items-center justify-center text-[11px] text-ink-400">Photo</div>
//             )}
//           </div>

//           {/* Details */}
//           <div>
//             <p className="font-display text-xl font-extrabold text-[#0B4D52]">
//               {vendor.personal.fullName.toUpperCase()}
//             </p>
//             {/* <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success-100 px-3 py-1 text-[11px] font-semibold text-success-600">
//               <FiCheckCircle size={12} /> Certified Street Vendor
//             </span> */}

//             <span className="mt-2 block w-fit items-center gap-1.5 rounded-full bg-success-100 px-3 py-1 text-[11px] font-semibold text-success-600">
//               <span className="inline-flex items-center gap-1.5">
//                 <FiCheckCircle size={12} /> Certified Street Vendor
//               </span>
//             </span>

//             {/* columns brought close together: fixed narrow width instead of stretching to 1fr, tight gap */}
//             {/* <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3.5 sm:[grid-template-columns:repeat(2,minmax(0,220px))]"> */}

//             {/* narrower fixed columns + wrapped in an inline block so the grid hugs together, not stretched */}
//             <div className="mt-4 inline-grid grid-cols-1 gap-x-3 gap-y-3.5 sm:[grid-template-columns:repeat(2,170px)]">
//               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNumber} />
//               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address.zone} />

//               <FieldRow
//                 icon={FiCalendar}
//                 label="Date of Birth / Age"
//                 value={`${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`}
//               />
//               <FieldRow icon={FiHome} label="Ward" value={vendor.address.ward} />

//               <FieldRow icon={FiUser} label="Gender" value={vendor.personal.gender || "-"} />
//               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business.businessTiming || "-"} />

//               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal.mobile} />
//               <FieldRow icon={FiFileText} label="Address" value={vendor.address.permanentAddress} />

//               <FieldRow icon={FiBriefcase} label="Type of Business" value={vendor.business.businessCategory} />
//               <FieldRow icon={FiBriefcase} label="Sale Type" value={saleType(vendor.business.vendorType)} />
//             </div>
//           </div>

//           {/* QR + Validity */}
//           <div className="flex flex-col items-center gap-4 print:hidden sm:print:flex">
//             <Link
//               to={`/verify/${vendor.id}`}
//               className="overflow-hidden rounded-xl border border-ink-100 shadow-[var(--shadow-soft)]"
//             >
//               <div className="p-3">
//                 <QRCodeSVG value={verifyUrl} size={128} />
//               </div>
//               <div className="py-1.5 text-center text-[11px] font-bold tracking-wide text-white" style={{ background: TEAL_GRADIENT }}>
//                 SCAN TO VERIFY
//               </div>
//             </Link>

//             <div className="w-full rounded-xl border border-ink-100 p-3 text-center">
//               <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#0B4D52]">Validity Period</p>
//               <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#0B4D52]">
//                 <FiCalendar size={13} />
//                 {formatDate(certificate.issueDate)}
//               </div>
//               <p className="my-0.5 text-[10px] text-ink-400">to</p>
//               <p className="text-[13px] font-bold text-[#0B4D52]">{formatDate(certificate.expiryDate)}</p>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div
//           className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-[12px] text-white"
//           style={{ background: TEAL_GRADIENT }}
//         >
//           <span className="flex items-center gap-2">
//             <FiShield size={14} className="text-[#E9CE8B]" />
//             Authorised by Vasai Virar City Municipal Corporation
//           </span>
//           <span className="italic text-white/90">Authorised Signatory</span>
//         </div>
//       </div>

//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.id}`)}>
//           Open Verification Screen
//         </Button>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import {
//   FiDownload,
//   FiPrinter,
//   FiShield,
//   FiExternalLink,
//   FiCreditCard,
//   FiCalendar,
//   FiUser,
//   FiPhone,
//   FiBriefcase,
//   FiMapPin,
//   FiHome,
//   FiClock,
//   FiFileText,
//   FiCheckCircle,
// } from "react-icons/fi";
// import jsPDF from "jspdf";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// import logo from "../../../assets/logovvcmc.jpg";

// import {
//   selectCertificateByVendorId,
//   selectAllCertificates,
//   addCertificate,
//   makeCertificateDraft,
// } from "../../../features/certificates/certificatesSlice";
// import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// const TEAL_GRADIENT = "linear-gradient(160deg, #0B4D52 0%, #08464B 55%, #062E34 100%)";
// const TEAL = [11, 77, 82];
// const GOLD = [202, 158, 58];

// function formatDate(d) {
//   if (!d) return "-";
//   return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// }

// // "Stationary Vendor" / "Mobile Vendor" / "Seasonal Vendor" -> Stationary / Mobile.
// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// }

// function FieldRow({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-start gap-2.5">
//       <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0B4D52]/10 text-[#0B4D52]">
//         <Icon size={13} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[11.5px] font-semibold text-[#0B4D52]">{label}</p>
//         <p className="text-[13px] text-ink-800 break-words">{value}</p>
//       </div>
//     </div>
//   );
// }

// export default function SmartCard() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const vendor = useSelector((s) => selectVendorById(s, id));
//   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
//   const certificates = useSelector(selectAllCertificates);
//   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

//   useEffect(() => {
//     if (vendor && vendor.status === "Approved" && !certificate) {
//       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [vendor?.id, vendor?.status, certificate]);

//   const verifyUrl = useMemo(() => {
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.id}`;
//   }, [vendor]);

//   const cardCode = vendor ? `CARD-${vendor.id.replace(/\D/g, "") || vendor.id}` : "";

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

//   if (vendor.status !== "Approved") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           Smart Card is only available for approved vendors.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   if (!certificate) {
//     return (
//       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
//         Generating certificate...
//       </Card>
//     );
//   }

//   const handlePrint = () => window.print();

//   const handleDownloadPdf = () => {
//     const W = 620;
//     const H = 460;
//     const doc = new jsPDF({ unit: "pt", format: [W, H] });

//     // ---------- Header ----------
//     doc.setFillColor(...TEAL);
//     doc.rect(0, 0, W, 92, "F");

//     try {
//       doc.setFillColor(255, 255, 255);
//       doc.circle(50, 46, 26, "F");
//       doc.addImage(logo, "JPEG", 26, 22, 48, 48, undefined, "FAST");
//     } catch {
//       // logo failed to embed - continue without it
//     }

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(13);
//     doc.text("VASAI VIRAR CITY MUNICIPAL CORPORATION", 92, 38);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10.5);
//     doc.text("Vasai Virar Shahar Mahanagarpalika", 92, 54);
//     doc.setTextColor(...GOLD);
//     doc.setFontSize(9);
//     doc.text("Established: 3 July 2009", 92, 70);

//     doc.setDrawColor(...GOLD);
//     doc.setLineWidth(6);
//     doc.circle(W - 30, 92, 55, "S");

//     doc.setFillColor(...GOLD);
//     doc.rect(0, 92, W, 4, "F");

//     // ---------- Photo ----------
//     const photoX = 24;
//     const photoY = 116;
//     const photoW = 90;
//     const photoH = 108;
//     doc.setDrawColor(230, 230, 230);
//     doc.setFillColor(245, 247, 246);
//     doc.roundedRect(photoX, photoY, photoW, photoH, 8, 8, "FD");
//     if (vendor.documents?.photo?.url) {
//       try {
//         doc.addImage(vendor.documents.photo.url, "JPEG", photoX, photoY, photoW, photoH, undefined, "FAST");
//       } catch {
//         // ignore if not embeddable (e.g. cross-origin)
//       }
//     }

//     // ---------- Name + badge ----------
//     const infoX = photoX + photoW + 20;
//     doc.setTextColor(...TEAL);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.text(vendor.personal.fullName.toUpperCase(), infoX, photoY + 16);

//     doc.setFillColor(213, 245, 227);
//     doc.roundedRect(infoX, photoY + 26, 150, 18, 9, 9, "F");
//     doc.setTextColor(22, 163, 74);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8.5);
//     doc.text("CERTIFIED STREET VENDOR", infoX + 20, photoY + 38);

//     // ---------- Two-column fields (compressed gap) ----------
//     const colGap = 10;
//     const colWidth = 155;
//     const col1X = infoX;
//     const col2X = infoX + colWidth + colGap;
//     const fieldsStartY = photoY + 58;
//     const rowGap = 32;

//     const leftRows = [
//       ["ID Card Number", certificate.certificateNumber],
//       ["Date of Birth / Age", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
//       ["Gender", vendor.personal.gender || "-"],
//       ["Mobile Number", vendor.personal.mobile],
//       ["Type of Business", vendor.business.businessCategory],
//     ];
//     const rightRows = [
//       ["Vending Zone", vendor.address.zone],
//       ["Ward", vendor.address.ward],
//       ["Business Timing", vendor.business.businessTiming || "-"],
//       ["Address", vendor.address.permanentAddress],
//     ];

//     const drawField = (x, y, label, value) => {
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(8.5);
//       doc.setTextColor(...TEAL);
//       doc.text(String(label), x, y);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(9.5);
//       doc.setTextColor(15, 23, 42);
//       const lines = doc.splitTextToSize(String(value ?? "-"), colWidth);
//       doc.text(lines, x, y + 12);
//       return 12 * lines.length + rowGap - 12;
//     };

//     let yL = fieldsStartY;
//     leftRows.forEach(([label, value]) => {
//       yL += drawField(col1X, yL, label, value);
//     });

//     let yR = fieldsStartY;
//     rightRows.forEach(([label, value]) => {
//       yR += drawField(col2X, yR, label, value);
//     });

//     // ---------- QR + Validity (right side) ----------
//     const qrBoxX = W - 150;
//     const qrBoxY = 116;
//     const qrBoxSize = 120;
//     doc.setDrawColor(220, 224, 223);
//     doc.setLineWidth(1);
//     doc.roundedRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 8, 8, "S");

//     const qrCanvas = document.createElement("canvas");
//     try {
//       const svgEl = document.querySelector('a[href^="/verify/"] svg');
//       if (svgEl) {
//         const svgData = new XMLSerializer().serializeToString(svgEl);
//         const img = new Image();
//         const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
//         const url = URL.createObjectURL(svgBlob);
//         img.onload = () => {
//           qrCanvas.width = 300;
//           qrCanvas.height = 300;
//           const ctx = qrCanvas.getContext("2d");
//           ctx.fillStyle = "#ffffff";
//           ctx.fillRect(0, 0, 300, 300);
//           ctx.drawImage(img, 0, 0, 300, 300);
//           URL.revokeObjectURL(url);
//           const dataUrl = qrCanvas.toDataURL("image/png");
//           doc.addImage(dataUrl, "PNG", qrBoxX + 10, qrBoxY + 10, qrBoxSize - 20, qrBoxSize - 20);
//           finishPdf();
//         };
//         img.src = url;
//       } else {
//         finishPdf();
//       }
//     } catch {
//       finishPdf();
//     }

//     function finishPdf() {
//       doc.setFillColor(...TEAL);
//       doc.rect(qrBoxX, qrBoxY + qrBoxSize - 20, qrBoxSize, 20, "F");
//       doc.setTextColor(255, 255, 255);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(8);
//       doc.text("SCAN TO VERIFY", qrBoxX + qrBoxSize / 2, qrBoxY + qrBoxSize - 7, { align: "center" });

//       const valY = qrBoxY + qrBoxSize + 16;
//       doc.setDrawColor(220, 224, 223);
//       doc.roundedRect(qrBoxX, valY, qrBoxSize, 76, 8, 8, "S");
//       doc.setTextColor(...TEAL);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(7.5);
//       doc.text("VALIDITY PERIOD", qrBoxX + qrBoxSize / 2, valY + 16, { align: "center" });
//       doc.setFontSize(10);
//       doc.text(formatDate(certificate.issueDate), qrBoxX + qrBoxSize / 2, valY + 34, { align: "center" });
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(7.5);
//       doc.setTextColor(140, 150, 148);
//       doc.text("to", qrBoxX + qrBoxSize / 2, valY + 46, { align: "center" });
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(10);
//       doc.setTextColor(...TEAL);
//       doc.text(formatDate(certificate.expiryDate), qrBoxX + qrBoxSize / 2, valY + 62, { align: "center" });

//       const footerY = H - 44;
//       doc.setFillColor(...TEAL);
//       doc.rect(0, footerY, W, 44, "F");
//       doc.setTextColor(255, 255, 255);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(9);
//       doc.text("Authorised by Vasai Virar City Municipal Corporation", 24, footerY + 26);
//       doc.setFont("helvetica", "italic");
//       doc.text("Authorised Signatory", W - 130, footerY + 26);

//       doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
//     }
//   };

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div>
//           <p className="text-xs font-semibold text-ink-500 print:hidden">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>{" "}
//             / {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
//           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
//         </div>
//         <div className="flex gap-2 print:hidden">
//           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf}>
//             Download
//           </Button>
//           <Button icon={FiPrinter} onClick={handlePrint}>
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]"> */}
//       <div className="mx-auto max-w-[820px] overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft-lg)]">
//         {/* Header */}
//         <div className="relative overflow-hidden px-6 py-5 text-white" style={{ background: TEAL_GRADIENT }}>
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[10px] border-[#CA9E3A]/40"
//           />
//           <div className="relative flex items-center gap-4">
//             <img src={logo} alt="Vasai Virar City Municipal Corporation" className="h-14 w-14 shrink-0 rounded-full bg-white p-0.5" />
//             <div>
//               <p className="font-display text-[17px] font-bold leading-tight">VASAI VIRAR CITY MUNICIPAL CORPORATION</p>
//               <p className="text-[13px] text-white/85">वसई विरार शहर महानगरपालिका</p>
//               <p className="mt-0.5 text-[11px] font-medium text-[#E9CE8B]">Established: 3 July 2009</p>
//             </div>
//           </div>
//         </div>
//         <div className="h-1.5 w-full bg-gradient-to-r from-[#CA9E3A] via-[#E9CE8B] to-[#CA9E3A]" />

//         {/* Body */}
//         <div className="grid grid-cols-1 gap-6 p-6 sm:flex sm:flex-wrap sm:items-start sm:justify-start">
//           {/* Photo */}
//           <div className="h-32 w-28 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-50">
//             {vendor.documents?.photo?.url ? (
//               <img src={vendor.documents.photo.url} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//             ) : (
//               <div className="flex h-full w-full items-center justify-center text-[11px] text-ink-400">Photo</div>
//             )}
//           </div>

//           {/* Details */}
//           <div className="sm:shrink-0">
//             <p className="font-display text-xl font-extrabold text-[#0B4D52]">
//               {vendor.personal.fullName.toUpperCase()}
//             </p>
//             <span className="mt-2 block w-fit items-center gap-1.5 rounded-full bg-success-100 px-3 py-1 text-[11px] font-semibold text-success-600">
//               <span className="inline-flex items-center gap-1.5">
//                 <FiCheckCircle size={12} /> Certified Street Vendor
//               </span>
//             </span>

//             <div className="mt-4 inline-grid grid-cols-1 gap-x-3 gap-y-3.5 sm:[grid-template-columns:repeat(2,170px)]">
//               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNumber} />
//               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address.zone} />

//               <FieldRow
//                 icon={FiCalendar}
//                 label="Date of Birth / Age"
//                 value={`${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`}
//               />
//               <FieldRow icon={FiHome} label="Ward" value={vendor.address.ward} />

//               <FieldRow icon={FiUser} label="Gender" value={vendor.personal.gender || "-"} />
//               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business.businessTiming || "-"} />

//               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal.mobile} />
//               <FieldRow icon={FiFileText} label="Address" value={vendor.address.permanentAddress} />

//               <FieldRow icon={FiBriefcase} label="Type of Business" value={vendor.business.businessCategory} />
//               <FieldRow icon={FiBriefcase} label="Sale Type" value={saleType(vendor.business.vendorType)} />
//             </div>
//           </div>

//           {/* QR + Validity */}
//           <div className="flex flex-col items-center gap-4 print:hidden sm:shrink-0 sm:print:flex">
//             <Link
//               to={`/verify/${vendor.id}`}
//               className="overflow-hidden rounded-xl border border-ink-100 shadow-[var(--shadow-soft)]"
//             >
//               <div className="p-3">
//                 <QRCodeSVG value={verifyUrl} size={128} />
//               </div>
//               <div className="py-1.5 text-center text-[11px] font-bold tracking-wide text-white" style={{ background: TEAL_GRADIENT }}>
//                 SCAN TO VERIFY
//               </div>
//             </Link>

//             <div className="w-full rounded-xl border border-ink-100 p-3 text-center">
//               <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#0B4D52]">Validity Period</p>
//               <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#0B4D52]">
//                 <FiCalendar size={13} />
//                 {formatDate(certificate.issueDate)}
//               </div>
//               <p className="my-0.5 text-[10px] text-ink-400">to</p>
//               <p className="text-[13px] font-bold text-[#0B4D52]">{formatDate(certificate.expiryDate)}</p>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div
//           className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-[12px] text-white"
//           style={{ background: TEAL_GRADIENT }}
//         >
//           <span className="flex items-center gap-2">
//             <FiShield size={14} className="text-[#E9CE8B]" />
//             Authorised by Vasai Virar City Municipal Corporation
//           </span>
//           <span className="italic text-white/90">Authorised Signatory</span>
//         </div>
//       </div>

//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.id}`)}>
//           Open Verification Screen
//         </Button>
//       </div>
//     </div>
//   );
// }























// import { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import {
//   FiDownload,
//   FiPrinter,
//   FiShield,
//   FiExternalLink,
//   FiCreditCard,
//   FiCalendar,
//   FiUser,
//   FiPhone,
//   FiBriefcase,
//   FiMapPin,
//   FiHome,
//   FiClock,
//   FiFileText,
//   FiCheckCircle,
//   FiAlertTriangle,
//   FiRefreshCw,
//   FiMessageCircle,
// } from "react-icons/fi";
// import jsPDF from "jspdf";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { selectVendorById } from "../../../features/vendors/vendorsSlice";
// import logo from "../../../assets/logovvcmc.jpg";

// import {
//   selectCertificateByVendorId,
//   selectAllCertificates,
//   addCertificate,
//   makeCertificateDraft,
// } from "../../../features/certificates/certificatesSlice";

// import { selectApplicationByVendorId } from "../../../features/applications/applicationsSlice";

// const TEAL = "#004C4D";
// const TEAL_DARK = "#003B3D";
// const GOLD = "#D5A936";
// const GOLD_LIGHT = "#F0D487";
// const CREAM = "#FCFCF9";

// const VVCMC_HELPLINE = "0250-XXXXXXX";
// const VVCMC_WHATSAPP = "+91 XXXXXXXXXX";
// const VVCMC_ADDRESS =
//   "VVCMC Main Office, Near Fire Brigade, Vasai (West), Palghar - 401202, Maharashtra.";

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// }

// /* ----------------------------- Decorative pieces ----------------------------- */

// function HeaderTexture() {
//   return (
//     <div className="pointer-events-none absolute right-4 top-4 grid grid-cols-6 gap-1 opacity-20" aria-hidden="true">
//       {Array.from({ length: 24 }).map((_, i) => (
//         <span key={i} className="h-1 w-1 rounded-full bg-white" />
//       ))}
//     </div>
//   );
// }

// function VVMonogram({ size = 48 }) {
//   return (
//     <div
//       className="flex items-center justify-center font-black leading-none"
//       style={{ fontSize: size, letterSpacing: "-0.13em", transform: "scaleX(.88)" }}
//       aria-hidden="true"
//     >
//       <span style={{ color: TEAL }}>V</span>
//       <span style={{ color: GOLD, marginLeft: size * -0.24 }}>V</span>
//     </div>
//   );
// }

// function RoundIcon({ icon: Icon, dark = false }) {
//   return (
//     <div
//       className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
//         dark ? "border-white/30 bg-white/10 text-white" : "border-[#005050]/35 bg-white text-[#005050]"
//       }`}
//     >
//       <Icon size={13} />
//     </div>
//   );
// }

// function FieldRow({ icon: Icon, label, value }) {
//   return (
//     <div className="flex min-w-0 items-start gap-2.5 border-b border-[#005050]/15 pb-2.5">
//       <RoundIcon icon={Icon} />
//       <div className="min-w-0 pt-0.5">
//         <p className="text-[8px] font-black uppercase tracking-wide text-[#005050]">{label}</p>
//         <p className="mt-0.5 break-words text-[11.5px] font-medium leading-[1.15] text-slate-900">{value || "-"}</p>
//       </div>
//     </div>
//   );
// }

// function VerifiedBadge() {
//   return (
//     <div className="relative flex h-[84px] w-[84px] items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,.08)]">
//       <div
//         className="absolute inset-[6px] rounded-full border-[2.5px] border-[#005050]"
//         style={{
//           clipPath:
//             "polygon(50% 0%, 61% 5%, 72% 3%, 81% 11%, 92% 14%, 95% 26%, 100% 36%, 95% 48%, 98% 59%, 90% 68%, 88% 80%, 77% 85%, 70% 95%, 57% 94%, 47% 100%, 37% 94%, 25% 97%, 19% 87%, 8% 81%, 10% 68%, 2% 59%, 6% 47%, 1% 37%, 8% 27%, 9% 15%, 21% 12%, 29% 3%, 40% 6%)",
//         }}
//       />
//       <div className="relative z-10 flex flex-col items-center justify-center text-[#005050]">
//         <span className="text-[6.5px] font-black tracking-widest">VERIFIED</span>
//         <FiCheckCircle size={22} className="my-0.5" />
//         <span className="text-[6.5px] font-black tracking-widest">VENDOR</span>
//       </div>
//     </div>
//   );
// }

// const TERMS = [
//   { icon: FiShield, text: "This card is non-transferable." },
//   { icon: FiUser, text: "This card is the property of Vasai Virar City Municipal Corporation." },
//   { icon: FiAlertTriangle, text: "Misuse of this card is punishable as per law." },
//   { icon: FiMapPin, text: "Display this card at your vending location." },
//   { icon: FiRefreshCw, text: "Renewal of this card is subject to rules and regulations." },
// ];

// export default function SmartCard() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const vendor = useSelector((s) => selectVendorById(s, id));
//   const application = useSelector((s) => (vendor ? selectApplicationByVendorId(s, vendor.id) : null));
//   const certificates = useSelector(selectAllCertificates);
//   const certificate = useSelector((s) => (vendor ? selectCertificateByVendorId(s, vendor.id) : null));

//   useEffect(() => {
//     if (vendor && vendor.status === "Approved" && !certificate) {
//       dispatch(addCertificate(makeCertificateDraft(certificates, vendor, application)));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [vendor?.id, vendor?.status, certificate]);

//   const verifyUrl = useMemo(() => {
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.id}`;
//   }, [vendor]);

//   const cardCode = vendor ? `CARD-${vendor.id.replace(/\D/g, "") || vendor.id}` : "";

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

//   if (vendor.status !== "Approved") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">Smart Card is only available for approved vendors.</p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   if (!certificate) {
//     return (
//       <Card className="mx-auto max-w-md text-center text-sm text-ink-500">
//         Generating certificate...
//       </Card>
//     );
//   }

//   const handlePrint = () => window.print();

//   /*
//    * PDF follows the same portrait proportions as the physical card.
//    * The live HTML card remains the primary visual design.
//    */
//   const handleDownloadPdf = () => {
//     const W = 540;
//     const H = 720;

//     const doc = new jsPDF({ unit: "pt", format: [W, H] });

//     doc.setFillColor(250, 251, 248);
//     doc.rect(0, 0, W, H, "F");

//     doc.setFillColor(0, 76, 77);
//     doc.roundedRect(0, 0, W, 160, 20, 20, "F");

//     doc.setFillColor(...[213, 169, 54]);
//     doc.rect(0, 156, W, 5, "F");

//     try {
//       doc.setFillColor(255, 255, 255);
//       doc.circle(60, 60, 34, "F");
//       doc.addImage(logo, "JPEG", 28, 28, 64, 64, undefined, "FAST");
//     } catch {}

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(24);
//     doc.text("VASAI VIRAR", 118, 52);

//     doc.setTextColor(...[240, 212, 135]);
//     doc.setFontSize(12);
//     doc.text("CITY MUNICIPAL CORPORATION", 118, 70);

//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(10);
//     doc.text("Vasai Virar City Municipal Corporation", 118, 88);

//     doc.setTextColor(...[240, 212, 135]);
//     doc.setFontSize(9);
//     doc.text("Established: 3 July 2009", 118, 104);

//     const photoX = 22;
//     const photoY = 190;
//     const photoW = 122;
//     const photoH = 152;

//     doc.setDrawColor(...[0, 76, 77]);
//     doc.setLineWidth(2);
//     doc.roundedRect(photoX, photoY, photoW, photoH, 12, 12, "S");

//     if (vendor.documents?.photo?.url) {
//       try {
//         doc.addImage(vendor.documents.photo.url, "JPEG", photoX, photoY, photoW, photoH, undefined, "FAST");
//       } catch {}
//     }

//     doc.setTextColor(...[0, 76, 77]);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(22);
//     doc.text(vendor.personal.fullName.toUpperCase(), 166, 225);

//     doc.setFillColor(...[0, 76, 77]);
//     doc.roundedRect(166, 240, 190, 26, 13, 13, "F");

//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(9);
//     doc.text("CERTIFIED STREET VENDOR", 184, 257);

//     const rows = [
//       ["ID CARD NUMBER", certificate.certificateNumber],
//       ["DATE OF BIRTH / AGE", `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`],
//       ["GENDER", vendor.personal.gender || "-"],
//       ["MOBILE NUMBER", vendor.personal.mobile || "-"],
//       ["VENDING ZONE", vendor.address.zone || "-"],
//       ["WARD", vendor.address.ward || "-"],
//       ["BUSINESS TIMING", vendor.business.businessTiming || "-"],
//       ["ADDRESS", vendor.address.permanentAddress || "-"],
//     ];

//     let y = 390;

//     rows.forEach(([label, value], index) => {
//       const x = index % 2 === 0 ? 24 : 280;

//       if (index % 2 === 0) {
//         doc.setDrawColor(215, 225, 221);
//         doc.line(24, y + 32, 256, y + 32);
//       }

//       doc.setTextColor(...[0, 76, 77]);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(7);
//       doc.text(label, x, y);

//       doc.setTextColor(20, 30, 30);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(10);

//       const lines = doc.splitTextToSize(String(value), 215);
//       doc.text(lines, x, y + 13);

//       if (index % 2 === 1) {
//         doc.line(280, y + 32, 516, y + 32);
//         y += 46;
//       }
//     });

//     doc.setFillColor(...[232, 239, 234]);
//     doc.roundedRect(24, 578, 325, 52, 12, 12, "F");

//     doc.setTextColor(...[0, 76, 77]);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(7);
//     doc.text("TYPE OF BUSINESS", 40, 598);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10);
//     doc.text(String(vendor.business.businessCategory || "-"), 40, 614);

//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(7);
//     doc.text("SALE TYPE", 205, 598);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10);
//     doc.text(saleType(vendor.business.vendorType), 205, 614);

//     doc.setFillColor(...[0, 76, 77]);
//     doc.roundedRect(365, 578, 150, 80, 12, 12, "F");

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8);
//     doc.text("VALIDITY PERIOD", 440, 596, { align: "center" });

//     doc.setFontSize(11);
//     doc.text(formatDate(certificate.issueDate), 440, 616, { align: "center" });

//     doc.setFontSize(7);
//     doc.text("TO", 440, 632, { align: "center" });

//     doc.setFontSize(11);
//     doc.text(formatDate(certificate.expiryDate), 440, 649, { align: "center" });

//     doc.setFillColor(...[0, 59, 61]);
//     doc.rect(0, 658, W, 62, "F");

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8);
//     doc.text("Authorised by Vasai Virar City Municipal Corporation", 25, 695);

//     doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
//   };

//   return (
//     <div className="space-y-5">
//       {/* PAGE HEADER */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>{" "}
//             / {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
//           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
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

//       {/* ======================= PHYSICAL SMART CARD ======================= */}
//       <div className="grid grid-cols-1 items-stretch justify-items-center gap-6 px-1 py-5 lg:grid-cols-2">

//         {/* ============================== FRONT ============================== */}
//         <div className="smart-card-front flex h-full w-full max-w-[440px] flex-col overflow-hidden rounded-[20px] border border-[#004C4D]/15 bg-[#FCFCF9] shadow-[0_18px_44px_rgba(0,65,65,.20)]">
//           {/* HEADER — curved teal wedge */}
//           <div className="relative h-[118px] overflow-hidden bg-[#F8F7F2]">

//             {/* Teal curved wedge */}
//             <div
//               className="absolute left-0 top-0 h-full w-[72%]"
//               style={{
//                 background: TEAL,
//                 borderBottomRightRadius: "100% 100%",
//               }}
//             />

//             {/* Gold outline following the curve */}
//             <div
//               className="pointer-events-none absolute left-0 top-0 h-full w-[72%]"
//               style={{
//                 borderRight: `3px solid ${GOLD}`,
//                 borderBottom: `5px solid ${GOLD}`,
//                 borderBottomRightRadius: "100% 100%",
//               }}
//             />

//             {/* Optional subtle texture — stays inside teal */}
//             <div className="pointer-events-none absolute inset-0">
//               <HeaderTexture />
//             </div>

//             {/* Header content */}
//             <div className="relative z-10 flex items-start px-5 pt-4">
//               <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-lg">
//                 <img
//                   src={logo}
//                   alt="Vasai Virar City Municipal Corporation"
//                   className="h-full w-full rounded-full object-contain"
//                 />
//               </div>

//               <div className="ml-3 pt-0.5 text-white">
//                 <h2 className="font-display text-[20px] font-black leading-none tracking-tight">VASAI VIRAR</h2>
//                 <p className="mt-1 text-[9px] font-black uppercase tracking-wide text-[#F1C85B]">
//                   City Municipal Corporation
//                 </p>
//                 <p className="mt-0.5 text-[8px]">वसई विरार शहर महानगरपालिका</p>
//                 <p className="mt-1 text-[7px] font-semibold text-[#F1C85B]">Established: 3 July 2009</p>
//               </div>
//             </div>
//           </div>

//           {/* BODY — normal document flow, grows with content */}
//           <div className="flex-1 px-5 pb-4 pt-5">
//             {/* Vendor identity row */}
//             <div className="flex flex-wrap items-start gap-3">
//               <div className="h-[104px] w-[84px] shrink-0 overflow-hidden rounded-[11px] border-2 border-[#005050] bg-white">
//                 {vendor.documents?.photo?.url ? (
//                   <img
//                     src={vendor.documents.photo.url}
//                     alt={vendor.personal.fullName}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-full w-full items-center justify-center bg-[#F3F6FA] text-[10px] text-slate-400">
//                     Photo
//                   </div>
//                 )}
//               </div>

//               <div className="min-w-0 flex-1 pt-1.5">
//                 <h2 className="font-display text-[18px] font-black uppercase leading-[1.1] text-[#005050]">
//                   {vendor.personal.fullName}
//                 </h2>
//                 <div className="mt-2.5 inline-flex max-w-[145px] items-center gap-1.5 rounded-full bg-[#005050] px-3 py-1.5 text-[7.5px] font-black uppercase leading-tight text-white">
//                   <FiCheckCircle size={11} className="shrink-0" />
//                   Certified Street Vendor
//                 </div>
//               </div>

//               <Link
//                 to={`/verify/${vendor.id}`}
//                 className="w-[84px] shrink-0 overflow-hidden rounded-[11px] border-2 border-[#005050] bg-white shadow-md print:hidden"
//               >
//                 <div className="flex justify-center p-1.5">
//                   <QRCodeSVG value={verifyUrl} size={70} level="M" />
//                 </div>
//                 <div className="bg-[#005050] py-1.5 text-center text-[6.5px] font-black tracking-wide text-white">
//                   SCAN TO VERIFY
//                 </div>
//               </Link>
//             </div>

//             <div className="my-3.5 h-px bg-[#005050]/20" />

//             {/* Information grid */}
//             <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
//               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNumber} />
//               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address.zone} />
//               <FieldRow
//                 icon={FiCalendar}
//                 label="Date of Birth / Age"
//                 value={`${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} yrs`}
//               />
//               <FieldRow icon={FiHome} label="Ward" value={vendor.address.ward} />
//               <FieldRow icon={FiUser} label="Gender" value={vendor.personal.gender} />
//               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business.businessTiming} />
//               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal.mobile} />
//               <FieldRow icon={FiFileText} label="Address" value={vendor.address.permanentAddress} />
//             </div>

//             {/* Bottom information row */}
//             <div className="mt-3.5 flex flex-wrap items-stretch gap-2.5">
//               <div className="grid min-w-[180px] flex-1 grid-cols-2 overflow-hidden rounded-[11px] bg-[#E7EEE9]">
//                 <div className="flex min-w-0 items-center gap-1.5 border-r border-[#005050]/20 px-2.5 py-2">
//                   <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#005050] text-white">
//                     <FiBriefcase size={13} />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-[7px] font-black uppercase text-[#005050]">Type of Business</p>
//                     <p className="mt-0.5 truncate text-[10.5px] font-medium text-slate-900">
//                       {vendor.business.businessCategory || "-"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex min-w-0 items-center gap-1.5 px-2.5 py-2">
//                   <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#005050] text-white">
//                     <FiBriefcase size={13} />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-[7px] font-black uppercase text-[#005050]">Sale Type</p>
//                     <p className="mt-0.5 text-[10.5px] font-medium text-slate-900">
//                       {saleType(vendor.business.vendorType)}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-[96px] shrink-0 overflow-hidden rounded-[11px] bg-[#005050] text-white shadow-md">
//                 <div className="bg-[#006B69] px-1.5 py-1.5 text-center">
//                   <p className="text-[7px] font-black uppercase tracking-wide">Validity Period</p>
//                 </div>
//                 <div className="px-2 py-1.5 text-center">
//                   <FiCalendar size={17} className="mx-auto mb-1 text-[#F0C34B]" />
//                   <p className="text-[9px] font-black">{formatDate(certificate.issueDate)}</p>
//                   <p className="my-0.5 text-[6px] text-white/65">TO</p>
//                   <p className="text-[9px] font-black">{formatDate(certificate.expiryDate)}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* FRONT FOOTER — normal flow, decoration clipped to footer only */}
//           <div className="relative mt-auto shrink-0 overflow-hidden px-5 py-3" style={{ background: TEAL_DARK }}>
//             <div className="pointer-events-none absolute -bottom-16 -right-5 h-28 w-56 rounded-full border-[10px] border-white/5" />
//             <div className="relative flex items-center justify-between gap-3">
//               <div className="flex items-center gap-2.5">
//                 <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#E6B63F] text-[#E6B63F]">
//                   <FiShield size={14} />
//                 </div>
//                 <div>
//                   <p className="text-[7px] text-white/70">Authorised by</p>
//                   <p className="text-[9.5px] font-black text-white">Vasai Virar City Municipal Corporation</p>
//                 </div>
//               </div>
//               <VVMonogram size={26} />
//             </div>
//           </div>
//         </div>

//         {/* =============================== BACK =============================== */}
//         <div className="smart-card-back flex h-full w-full max-w-[440px] flex-col overflow-hidden rounded-[20px] border border-[#004C4D]/15 bg-[#FCFCF9] shadow-[0_18px_44px_rgba(0,65,65,.20)]">

//           {/* HEADER — teal only as a curved wedge behind the badge, rest stays cream */}
//           <div className="relative h-[152px] overflow-hidden">
//             <div
//               className="absolute left-0 top-0 h-full w-[58%]"
//               style={{ background: TEAL, borderBottomRightRadius: "999px 999px" }}
//             />
//             <div
//               className="absolute left-0 top-0 h-full w-[58%]"
//               style={{
//                 border: `2px solid ${GOLD}`,
//                 borderTop: "none",
//                 borderLeft: "none",
//                 borderBottomRightRadius: "999px 999px",
//               }}
//               aria-hidden="true"
//             />
//             <div className="absolute left-5 top-5">
//               <VerifiedBadge />
//             </div>
//           </div>

//          {/* BODY */}
// <div className="flex flex-1 flex-col px-5 pb-4 pt-2">
//   <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1.3fr_1fr]">
//     {/* TERMS */}
//     <div className="min-w-0">
//       <span className="inline-flex rounded-full bg-[#005050] px-3.5 py-1.5 text-[8.5px] font-black uppercase tracking-wide text-white">
//         Terms &amp; Conditions
//       </span>
//       <div className="mt-3 space-y-3">
//         {TERMS.map(({ icon: Icon, text }) => (
//           <div key={text} className="flex items-start gap-2.5">
//             <RoundIcon icon={Icon} />
//             <p className="pt-0.5 text-[9.5px] leading-[1.35] text-slate-900">{text}</p>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* BRAND */}
//     <div className="flex min-w-0 flex-col items-center pt-1.5 text-center">
//       <VVMonogram size={54} />
//       <p className="mt-1 text-[13.5px] font-black text-[#005050]">SMART VENDOR</p>
//       <div className="mt-2.5 flex items-center justify-center gap-1.5">
//         <span className="h-px w-5 bg-[#005050]/45" />
//         <span className="text-[7px] uppercase tracking-[0.13em] text-[#005050]">Better City</span>
//         <span className="h-px w-5 bg-[#005050]/45" />
//       </div>
//       <p className="mt-1 text-[7.5px] uppercase tracking-[0.15em] text-[#005050]">Better Tomorrow</p>
//     </div>
//   </div>

//   {/* Spacer — pushes the block below all the way down to sit just above the footer */}
//   <div className="flex-1" />

//   {/* Emergency contact + signature, anchored to the bottom of the card */}
// <div className="grid grid-cols-1 items-end gap-3.5 sm:grid-cols-[1.4fr_1fr]">
//   <div className="overflow-hidden rounded-[13px] border-2 border-[#005050] bg-white">
//     <div className="bg-[#005050] px-2.5 py-1.5 text-[7.5px] font-black uppercase tracking-wide text-white">
//       Emergency Contact
//     </div>
//     <div className="grid grid-cols-2 divide-x divide-[#005050]/20">
//       <div className="px-2.5 py-2.5">
//         <p className="text-[7px] font-bold text-[#005050]">VVCMC Helpline</p>
//         <div className="mt-1.5 flex items-center gap-1.5">
//           <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#005050] text-white">
//             <FiPhone size={11} />
//           </div>
//           <span className="truncate text-[7px] font-bold text-slate-900">{VVCMC_HELPLINE}</span>
//         </div>
//       </div>
//       <div className="px-2.5 py-2.5">
//         <p className="text-[7px] font-bold text-[#005050]">WhatsApp Support</p>
//         <div className="mt-1.5 flex items-center gap-1.5">
//           <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
//             <FiMessageCircle size={11} />
//           </div>
//           <span className="truncate text-[7px] font-bold text-slate-900">{VVCMC_WHATSAPP}</span>
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className="pb-1 text-center">
//     <div className="mx-auto h-px w-20 bg-slate-300" />
//     <p className="mt-1.5 text-[8px] text-slate-500">Authorised Signatory</p>
//     <p className="mt-0.5 text-[9px] font-black text-[#005050]">VVCMC</p>
//   </div>
// </div>
// </div>

//           {/* BACK FOOTER */}
//           <div className="relative mt-auto shrink-0 overflow-hidden px-5 py-4" style={{ background: TEAL_DARK }}>
//             <div className="pointer-events-none absolute -bottom-14 -right-5 h-32 w-48 rounded-full border-[12px] border-[#E3B337]/70" />
//             <div className="pointer-events-none absolute bottom-3 right-3 grid grid-cols-5 gap-1.5 opacity-70">
//               {Array.from({ length: 15 }).map((_, i) => (
//                 <span key={i} className="h-1 w-1 rounded-full bg-[#F0C34B]" />
//               ))}
//             </div>
//             <div className="relative flex items-start gap-2.5 text-white">
//               <FiMapPin size={16} className="mt-0.5 shrink-0 text-[#E6B63F]" />
//               <div className="pr-[15%]">
//                 <p className="text-[9px] font-black">Vasai Virar City Municipal Corporation</p>
//                 <p className="mt-1 text-[7px] leading-[1.45] text-white/85">{VVCMC_ADDRESS}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* VERIFICATION */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.id}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* PRINT RULES */}
//       <style>{`
//         @media print {
//           body {
//             background: white !important;
//           }

//           .smart-card-front,
//           .smart-card-back {
//             break-inside: avoid;
//             page-break-inside: avoid;
//             box-shadow: none !important;
//           }

//           @page {
//             size: A4 portrait;
//             margin: 8mm;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


// =======================================

// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import {
//   FiDownload,
//   FiPrinter,
//   FiShield,
//   FiExternalLink,
//   FiCreditCard,
//   FiCalendar,
//   FiUser,
//   FiPhone,
//   FiBriefcase,
//   FiMapPin,
//   FiHome,
//   FiClock,
//   FiFileText,
//   FiCheckCircle,
//   FiAlertTriangle,
//   FiRefreshCw,
//   FiMessageCircle,
//   FiLoader,
// } from "react-icons/fi";
// import jsPDF from "jspdf";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import logo from "../../../assets/logovvcmc.jpg";
// import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";

// const TEAL = "#004C4D";
// const TEAL_DARK = "#003B3D";
// const GOLD = "#D5A936";
// const GOLD_LIGHT = "#F0D487";
// const CREAM = "#FCFCF9";

// const VVCMC_HELPLINE = "0250-XXXXXXX";
// const VVCMC_WHATSAPP = "+91 XXXXXXXXXX";
// const VVCMC_ADDRESS =
//   "VVCMC Main Office, Near Fire Brigade, Vasai (West), Palghar - 401202, Maharashtra.";

// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   return Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// }

// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "Mobile" : "Stationary";
// }

// /* ----------------------------- Decorative pieces ----------------------------- */

// function HeaderTexture() {
//   return (
//     <div className="pointer-events-none absolute right-4 top-4 grid grid-cols-6 gap-1 opacity-20" aria-hidden="true">
//       {Array.from({ length: 24 }).map((_, i) => (
//         <span key={i} className="h-1 w-1 rounded-full bg-white" />
//       ))}
//     </div>
//   );
// }

// function VVMonogram({ size = 48 }) {
//   return (
//     <div
//       className="flex items-center justify-center font-black leading-none"
//       style={{ fontSize: size, letterSpacing: "-0.13em", transform: "scaleX(.88)" }}
//       aria-hidden="true"
//     >
//       <span style={{ color: TEAL }}>V</span>
//       <span style={{ color: GOLD, marginLeft: size * -0.24 }}>V</span>
//     </div>
//   );
// }

// function RoundIcon({ icon: Icon, dark = false }) {
//   return (
//     <div
//       className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
//         dark ? "border-white/30 bg-white/10 text-white" : "border-[#005050]/35 bg-white text-[#005050]"
//       }`}
//     >
//       <Icon size={13} />
//     </div>
//   );
// }

// function FieldRow({ icon: Icon, label, value }) {
//   return (
//     <div className="flex min-w-0 items-start gap-2.5 border-b border-[#005050]/15 pb-2.5">
//       <RoundIcon icon={Icon} />
//       <div className="min-w-0 pt-0.5">
//         <p className="text-[8px] font-black uppercase tracking-wide text-[#005050]">{label}</p>
//         <p className="mt-0.5 break-words text-[11.5px] font-medium leading-[1.15] text-slate-900">{value || "-"}</p>
//       </div>
//     </div>
//   );
// }

// function VerifiedBadge() {
//   return (
//     <div className="relative flex h-[84px] w-[84px] items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,.08)]">
//       <div
//         className="absolute inset-[6px] rounded-full border-[2.5px] border-[#005050]"
//         style={{
//           clipPath:
//             "polygon(50% 0%, 61% 5%, 72% 3%, 81% 11%, 92% 14%, 95% 26%, 100% 36%, 95% 48%, 98% 59%, 90% 68%, 88% 80%, 77% 85%, 70% 95%, 57% 94%, 47% 100%, 37% 94%, 25% 97%, 19% 87%, 8% 81%, 10% 68%, 2% 59%, 6% 47%, 1% 37%, 8% 27%, 9% 15%, 21% 12%, 29% 3%, 40% 6%)",
//         }}
//       />
//       <div className="relative z-10 flex flex-col items-center justify-center text-[#005050]">
//         <span className="text-[6.5px] font-black tracking-widest">VERIFIED</span>
//         <FiCheckCircle size={22} className="my-0.5" />
//         <span className="text-[6.5px] font-black tracking-widest">VENDOR</span>
//       </div>
//     </div>
//   );
// }

// const TERMS = [
//   { icon: FiShield, text: "This card is non-transferable." },
//   { icon: FiUser, text: "This card is the property of Vasai Virar City Municipal Corporation." },
//   { icon: FiAlertTriangle, text: "Misuse of this card is punishable as per law." },
//   { icon: FiMapPin, text: "Display this card at your vending location." },
//   { icon: FiRefreshCw, text: "Renewal of this card is subject to rules and regulations." },
// ];

// export default function SmartCard() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

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

//   // Backend already generates the QR (encoding the public verify URL) at payment time —
//   // we reuse that same URL here so the QR on the card and the one you'd scan match exactly.
//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }

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

//   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">
//           The Smart Card is only available once payment is complete and the certificate has been issued.
//         </p>
//         <p className="mt-1 text-xs text-ink-500">
//           Current status: <span className="font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   const cardCode = certificate.certificateNo;

//   const handlePrint = () => window.print();

//   /*
//    * PDF follows the same portrait proportions as the physical card.
//    * The live HTML card remains the primary visual design.
//    */
//   const handleDownloadPdf = () => {
//     const W = 540;
//     const H = 720;

//     const doc = new jsPDF({ unit: "pt", format: [W, H] });

//     doc.setFillColor(250, 251, 248);
//     doc.rect(0, 0, W, H, "F");

//     doc.setFillColor(0, 76, 77);
//     doc.roundedRect(0, 0, W, 160, 20, 20, "F");

//     doc.setFillColor(...[213, 169, 54]);
//     doc.rect(0, 156, W, 5, "F");

//     try {
//       doc.setFillColor(255, 255, 255);
//       doc.circle(60, 60, 34, "F");
//       doc.addImage(logo, "JPEG", 28, 28, 64, 64, undefined, "FAST");
//     } catch {}

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(24);
//     doc.text("VASAI VIRAR", 118, 52);

//     doc.setTextColor(...[240, 212, 135]);
//     doc.setFontSize(12);
//     doc.text("CITY MUNICIPAL CORPORATION", 118, 70);

//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(10);
//     doc.text("Vasai Virar City Municipal Corporation", 118, 88);

//     doc.setTextColor(...[240, 212, 135]);
//     doc.setFontSize(9);
//     doc.text("Established: 3 July 2009", 118, 104);

//     const photoX = 22;
//     const photoY = 190;
//     const photoW = 122;
//     const photoH = 152;

//     doc.setDrawColor(...[0, 76, 77]);
//     doc.setLineWidth(2);
//     doc.roundedRect(photoX, photoY, photoW, photoH, 12, 12, "S");

//     if (vendor.documents?.photo) {
//       try {
//         doc.addImage(vendor.documents.photo, "JPEG", photoX, photoY, photoW, photoH, undefined, "FAST");
//       } catch {}
//     }

//     doc.setTextColor(...[0, 76, 77]);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(22);
//     doc.text((vendor.personal?.fullName || "").toUpperCase(), 166, 225);

//     doc.setFillColor(...[0, 76, 77]);
//     doc.roundedRect(166, 240, 190, 26, 13, 13, "F");

//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(9);
//     doc.text("CERTIFIED STREET VENDOR", 184, 257);

//     const rows = [
//       ["ID CARD NUMBER", certificate.certificateNo],
//       ["DATE OF BIRTH / AGE", `${formatDate(vendor.personal?.dob)} / ${calcAge(vendor.personal?.dob)} yrs`],
//       ["GENDER", vendor.personal?.gender || "-"],
//       ["MOBILE NUMBER", vendor.personal?.mobile || "-"],
//       ["VENDING ZONE", vendor.address?.zone || "-"],
//       ["WARD", vendor.address?.ward || vendor.ward || "-"],
//       ["BUSINESS TIMING", vendor.business?.businessTiming || "-"],
//       ["ADDRESS", vendor.address?.permanentAddress || "-"],
//     ];

//     let y = 390;

//     rows.forEach(([label, value], index) => {
//       const x = index % 2 === 0 ? 24 : 280;

//       if (index % 2 === 0) {
//         doc.setDrawColor(215, 225, 221);
//         doc.line(24, y + 32, 256, y + 32);
//       }

//       doc.setTextColor(...[0, 76, 77]);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(7);
//       doc.text(label, x, y);

//       doc.setTextColor(20, 30, 30);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(10);

//       const lines = doc.splitTextToSize(String(value), 215);
//       doc.text(lines, x, y + 13);

//       if (index % 2 === 1) {
//         doc.line(280, y + 32, 516, y + 32);
//         y += 46;
//       }
//     });

//     doc.setFillColor(...[232, 239, 234]);
//     doc.roundedRect(24, 578, 325, 52, 12, 12, "F");

//     doc.setTextColor(...[0, 76, 77]);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(7);
//     doc.text("TYPE OF BUSINESS", 40, 598);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10);
//     doc.text(String(vendor.business?.businessCategory || "-"), 40, 614);

//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(7);
//     doc.text("SALE TYPE", 205, 598);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10);
//     doc.text(saleType(vendor.business?.vendorType), 205, 614);

//     doc.setFillColor(...[0, 76, 77]);
//     doc.roundedRect(365, 578, 150, 80, 12, 12, "F");

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8);
//     doc.text("VALIDITY PERIOD", 440, 596, { align: "center" });

//     doc.setFontSize(11);
//     doc.text(formatDate(certificate.issueDate), 440, 616, { align: "center" });

//     doc.setFontSize(7);
//     doc.text("TO", 440, 632, { align: "center" });

//     doc.setFontSize(11);
//     doc.text(formatDate(certificate.validTill), 440, 649, { align: "center" });

//     doc.setFillColor(...[0, 59, 61]);
//     doc.rect(0, 658, W, 62, "F");

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8);
//     doc.text("Authorised by Vasai Virar City Municipal Corporation", 25, 695);

//     doc.save(`${vendor.vendorId}-street-vendor-id-card.pdf`);
//   };

//   return (
//     <div className="space-y-5">
//       {/* PAGE HEADER */}
//       <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
//               Smart Card
//             </Link>{" "}
//             / {cardCode}
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Street Vendor Identity Card</h1>
//           <p className="text-sm text-ink-500">Authorised Identity for Street Vendor Operations</p>
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

//       {/* ======================= PHYSICAL SMART CARD ======================= */}
//       <div className="grid grid-cols-1 items-stretch justify-items-center gap-6 px-1 py-5 lg:grid-cols-2">

//         {/* ============================== FRONT ============================== */}
//         <div className="smart-card-front flex h-full w-full max-w-[440px] flex-col overflow-hidden rounded-[20px] border border-[#004C4D]/15 bg-[#FCFCF9] shadow-[0_18px_44px_rgba(0,65,65,.20)]">
//           {/* HEADER — curved teal wedge */}
//           <div className="relative h-[118px] overflow-hidden bg-[#F8F7F2]">

//             {/* Teal curved wedge */}
//             <div
//               className="absolute left-0 top-0 h-full w-[72%]"
//               style={{
//                 background: TEAL,
//                 borderBottomRightRadius: "100% 100%",
//               }}
//             />

//             {/* Gold outline following the curve */}
//             <div
//               className="pointer-events-none absolute left-0 top-0 h-full w-[72%]"
//               style={{
//                 borderRight: `3px solid ${GOLD}`,
//                 borderBottom: `5px solid ${GOLD}`,
//                 borderBottomRightRadius: "100% 100%",
//               }}
//             />

//             {/* Optional subtle texture — stays inside teal */}
//             <div className="pointer-events-none absolute inset-0">
//               <HeaderTexture />
//             </div>

//             {/* Header content */}
//             <div className="relative z-10 flex items-start px-5 pt-4">
//               <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-lg">
//                 <img
//                   src={logo}
//                   alt="Vasai Virar City Municipal Corporation"
//                   className="h-full w-full rounded-full object-contain"
//                 />
//               </div>

//               <div className="ml-3 pt-0.5 text-white">
//                 <h2 className="font-display text-[20px] font-black leading-none tracking-tight">VASAI VIRAR</h2>
//                 <p className="mt-1 text-[9px] font-black uppercase tracking-wide text-[#F1C85B]">
//                   City Municipal Corporation
//                 </p>
//                 <p className="mt-0.5 text-[8px]">वसई विरार शहर महानगरपालिका</p>
//                 <p className="mt-1 text-[7px] font-semibold text-[#F1C85B]">Established: 3 July 2009</p>
//               </div>
//             </div>
//           </div>

//           {/* BODY — normal document flow, grows with content */}
//           <div className="flex-1 px-5 pb-4 pt-5">
//             {/* Vendor identity row */}
//             <div className="flex flex-wrap items-start gap-3">
//               <div className="h-[104px] w-[84px] shrink-0 overflow-hidden rounded-[11px] border-2 border-[#005050] bg-white">
//                 {vendor.documents?.photo ? (
//                   <img
//                     src={vendor.documents.photo}
//                     alt={vendor.personal?.fullName}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-full w-full items-center justify-center bg-[#F3F6FA] text-[10px] text-slate-400">
//                     Photo
//                   </div>
//                 )}
//               </div>

//               <div className="min-w-0 flex-1 pt-1.5">
//                 <h2 className="font-display text-[18px] font-black uppercase leading-[1.1] text-[#005050]">
//                   {vendor.personal?.fullName}
//                 </h2>
//                 <div className="mt-2.5 inline-flex max-w-[145px] items-center gap-1.5 rounded-full bg-[#005050] px-3 py-1.5 text-[7.5px] font-black uppercase leading-tight text-white">
//                   <FiCheckCircle size={11} className="shrink-0" />
//                   Certified Street Vendor
//                 </div>
//               </div>

//               <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="w-[84px] shrink-0 overflow-hidden rounded-[11px] border-2 border-[#005050] bg-white shadow-md print:hidden"
//               >
//                 <div className="flex justify-center p-1.5">
//                   <QRCodeSVG value={verifyUrl} size={70} level="M" />
//                 </div>
//                 <div className="bg-[#005050] py-1.5 text-center text-[6.5px] font-black tracking-wide text-white">
//                   SCAN TO VERIFY
//                 </div>
//               </Link>
//             </div>

//             <div className="my-3.5 h-px bg-[#005050]/20" />

//             {/* Information grid */}
//             <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
//               <FieldRow icon={FiCreditCard} label="ID Card Number" value={certificate.certificateNo} />
//               <FieldRow icon={FiMapPin} label="Vending Zone" value={vendor.address?.zone} />
//               <FieldRow
//                 icon={FiCalendar}
//                 label="Date of Birth / Age"
//                 value={`${formatDate(vendor.personal?.dob)} / ${calcAge(vendor.personal?.dob)} yrs`}
//               />
//               <FieldRow icon={FiHome} label="Ward" value={vendor.address?.ward || vendor.ward} />
//               <FieldRow icon={FiUser} label="Gender" value={vendor.personal?.gender} />
//               <FieldRow icon={FiClock} label="Business Timing" value={vendor.business?.businessTiming} />
//               <FieldRow icon={FiPhone} label="Mobile Number" value={vendor.personal?.mobile} />
//               <FieldRow icon={FiFileText} label="Address" value={vendor.address?.permanentAddress} />
//             </div>

//             {/* Bottom information row */}
//             <div className="mt-3.5 flex flex-wrap items-stretch gap-2.5">
//               <div className="grid min-w-[180px] flex-1 grid-cols-2 overflow-hidden rounded-[11px] bg-[#E7EEE9]">
//                 <div className="flex min-w-0 items-center gap-1.5 border-r border-[#005050]/20 px-2.5 py-2">
//                   <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#005050] text-white">
//                     <FiBriefcase size={13} />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-[7px] font-black uppercase text-[#005050]">Type of Business</p>
//                     <p className="mt-0.5 truncate text-[10.5px] font-medium text-slate-900">
//                       {vendor.business?.businessCategory || "-"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex min-w-0 items-center gap-1.5 px-2.5 py-2">
//                   <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#005050] text-white">
//                     <FiBriefcase size={13} />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-[7px] font-black uppercase text-[#005050]">Sale Type</p>
//                     <p className="mt-0.5 text-[10.5px] font-medium text-slate-900">
//                       {saleType(vendor.business?.vendorType)}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-[96px] shrink-0 overflow-hidden rounded-[11px] bg-[#005050] text-white shadow-md">
//                 <div className="bg-[#006B69] px-1.5 py-1.5 text-center">
//                   <p className="text-[7px] font-black uppercase tracking-wide">Validity Period</p>
//                 </div>
//                 <div className="px-2 py-1.5 text-center">
//                   <FiCalendar size={17} className="mx-auto mb-1 text-[#F0C34B]" />
//                   <p className="text-[9px] font-black">{formatDate(certificate.issueDate)}</p>
//                   <p className="my-0.5 text-[6px] text-white/65">TO</p>
//                   <p className="text-[9px] font-black">{formatDate(certificate.validTill)}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* FRONT FOOTER — normal flow, decoration clipped to footer only */}
//           <div className="relative mt-auto shrink-0 overflow-hidden px-5 py-3" style={{ background: TEAL_DARK }}>
//             <div className="pointer-events-none absolute -bottom-16 -right-5 h-28 w-56 rounded-full border-[10px] border-white/5" />
//             <div className="relative flex items-center justify-between gap-3">
//               <div className="flex items-center gap-2.5">
//                 <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#E6B63F] text-[#E6B63F]">
//                   <FiShield size={14} />
//                 </div>
//                 <div>
//                   <p className="text-[7px] text-white/70">Authorised by</p>
//                   <p className="text-[9.5px] font-black text-white">Vasai Virar City Municipal Corporation</p>
//                 </div>
//               </div>
//               <VVMonogram size={26} />
//             </div>
//           </div>
//         </div>

//         {/* =============================== BACK =============================== */}
//         <div className="smart-card-back flex h-full w-full max-w-[440px] flex-col overflow-hidden rounded-[20px] border border-[#004C4D]/15 bg-[#FCFCF9] shadow-[0_18px_44px_rgba(0,65,65,.20)]">

//           {/* HEADER — teal only as a curved wedge behind the badge, rest stays cream */}
//           <div className="relative h-[152px] overflow-hidden">
//             <div
//               className="absolute left-0 top-0 h-full w-[58%]"
//               style={{ background: TEAL, borderBottomRightRadius: "999px 999px" }}
//             />
//             <div
//               className="absolute left-0 top-0 h-full w-[58%]"
//               style={{
//                 border: `2px solid ${GOLD}`,
//                 borderTop: "none",
//                 borderLeft: "none",
//                 borderBottomRightRadius: "999px 999px",
//               }}
//               aria-hidden="true"
//             />
//             <div className="absolute left-5 top-5">
//               <VerifiedBadge />
//             </div>
//           </div>

//          {/* BODY */}
// <div className="flex flex-1 flex-col px-5 pb-4 pt-2">
//   <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1.3fr_1fr]">
//     {/* TERMS */}
//     <div className="min-w-0">
//       <span className="inline-flex rounded-full bg-[#005050] px-3.5 py-1.5 text-[8.5px] font-black uppercase tracking-wide text-white">
//         Terms &amp; Conditions
//       </span>
//       <div className="mt-3 space-y-3">
//         {TERMS.map(({ icon: Icon, text }) => (
//           <div key={text} className="flex items-start gap-2.5">
//             <RoundIcon icon={Icon} />
//             <p className="pt-0.5 text-[9.5px] leading-[1.35] text-slate-900">{text}</p>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* BRAND */}
//     <div className="flex min-w-0 flex-col items-center pt-1.5 text-center">
//       <VVMonogram size={54} />
//       <p className="mt-1 text-[13.5px] font-black text-[#005050]">SMART VENDOR</p>
//       <div className="mt-2.5 flex items-center justify-center gap-1.5">
//         <span className="h-px w-5 bg-[#005050]/45" />
//         <span className="text-[7px] uppercase tracking-[0.13em] text-[#005050]">Better City</span>
//         <span className="h-px w-5 bg-[#005050]/45" />
//       </div>
//       <p className="mt-1 text-[7.5px] uppercase tracking-[0.15em] text-[#005050]">Better Tomorrow</p>
//     </div>
//   </div>

//   {/* Spacer — pushes the block below all the way down to sit just above the footer */}
//   <div className="flex-1" />

//   {/* Emergency contact + signature, anchored to the bottom of the card */}
// <div className="grid grid-cols-1 items-end gap-3.5 sm:grid-cols-[1.4fr_1fr]">
//   <div className="overflow-hidden rounded-[13px] border-2 border-[#005050] bg-white">
//     <div className="bg-[#005050] px-2.5 py-1.5 text-[7.5px] font-black uppercase tracking-wide text-white">
//       Emergency Contact
//     </div>
//     <div className="grid grid-cols-2 divide-x divide-[#005050]/20">
//       <div className="px-2.5 py-2.5">
//         <p className="text-[7px] font-bold text-[#005050]">VVCMC Helpline</p>
//         <div className="mt-1.5 flex items-center gap-1.5">
//           <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#005050] text-white">
//             <FiPhone size={11} />
//           </div>
//           <span className="truncate text-[7px] font-bold text-slate-900">{VVCMC_HELPLINE}</span>
//         </div>
//       </div>
//       <div className="px-2.5 py-2.5">
//         <p className="text-[7px] font-bold text-[#005050]">WhatsApp Support</p>
//         <div className="mt-1.5 flex items-center gap-1.5">
//           <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
//             <FiMessageCircle size={11} />
//           </div>
//           <span className="truncate text-[7px] font-bold text-slate-900">{VVCMC_WHATSAPP}</span>
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className="pb-1 text-center">
//     <div className="mx-auto h-px w-20 bg-slate-300" />
//     <p className="mt-1.5 text-[8px] text-slate-500">Authorised Signatory</p>
//     <p className="mt-0.5 text-[9px] font-black text-[#005050]">VVCMC</p>
//   </div>
// </div>
// </div>

//           {/* BACK FOOTER */}
//           <div className="relative mt-auto shrink-0 overflow-hidden px-5 py-4" style={{ background: TEAL_DARK }}>
//             <div className="pointer-events-none absolute -bottom-14 -right-5 h-32 w-48 rounded-full border-[12px] border-[#E3B337]/70" />
//             <div className="pointer-events-none absolute bottom-3 right-3 grid grid-cols-5 gap-1.5 opacity-70">
//               {Array.from({ length: 15 }).map((_, i) => (
//                 <span key={i} className="h-1 w-1 rounded-full bg-[#F0C34B]" />
//               ))}
//             </div>
//             <div className="relative flex items-start gap-2.5 text-white">
//               <FiMapPin size={16} className="mt-0.5 shrink-0 text-[#E6B63F]" />
//               <div className="pr-[15%]">
//                 <p className="text-[9px] font-black">Vasai Virar City Municipal Corporation</p>
//                 <p className="mt-1 text-[7px] leading-[1.45] text-white/85">{VVCMC_ADDRESS}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* VERIFICATION */}
//       <div className="flex justify-center print:hidden">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>

//       {/* PRINT RULES */}
//       <style>{`
//         @media print {
//           body {
//             background: white !important;
//           }

//           .smart-card-front,
//           .smart-card-back {
//             break-inside: avoid;
//             page-break-inside: avoid;
//             box-shadow: none !important;
//           }

//           @page {
//             size: A4 portrait;
//             margin: 8mm;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }



import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

import {
  FiDownload,
  FiPrinter,
  FiUser,
  FiBriefcase,
  FiShoppingBag,
  FiMapPin,
  FiHome,
  FiClock,
  FiCalendar,
  FiExternalLink,
  FiShield,
  FiLoader,
} from "react-icons/fi";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

import logo from "../../../assets/logovvcmc.jpg";
import streetVendorBg from "../../../assets/street-vendor-bg.jpg";
import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";


/* =========================================================
   COLORS
========================================================= */

const TEAL = "#004C4D";
const GOLD = "#CA9E3A";
const CREAM = "#FBFAF6";


/* =========================================================
   HELPERS
========================================================= */

function formatDate(d) {
  if (!d) return "-";

  const date = new Date(d);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


function calcAge(dob) {
  if (!dob) return "-";

  const birth = new Date(dob);

  if (Number.isNaN(birth.getTime())) {
    return "-";
  }

  return Math.floor(
    (Date.now() - birth.getTime()) /
      (365.25 * 24 * 60 * 60 * 1000)
  );
}


function saleType(vendorType) {
  if (!vendorType) return "-";

  return vendorType
    .toLowerCase()
    .includes("mobile")
    ? "फिरता"
    : "स्थिर";
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
   LEFT GREEN / GOLD RIBBON
========================================================= */

function SideRibbon() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-y-0
        left-0
        z-10
        w-[15%]
        overflow-hidden
      "
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 150 540"
        preserveAspectRatio="none"
        className="h-full w-full"
      >

        {/* =====================================================
            TEAL SIDE PANEL
            Narrow at top → wide flowing curve at bottom
        ===================================================== */}

        <path
          d="
            M0 0
            H70

            C
              62 35,
              55 75,
              53 115

            C
              50 165,
              49 215,
              51 265

            C
              53 315,
              59 365,
              70 410

            C
              82 460,
              101 505,
              125 540

            H0
            Z
          "
          fill={TEAL}
        />

        {/* =====================================================
            GOLD CURVE
            Exactly follows the outer teal boundary
        ===================================================== */}

        <path
          d="
            M70 0

            C
              62 35,
              55 75,
              53 115

            C
              50 165,
              49 215,
              51 265

            C
              53 315,
              59 365,
              70 410

            C
              82 460,
              101 505,
              125 540
          "
          fill="none"
          stroke={GOLD}
          strokeWidth="8"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

      </svg>
    </div>
  );
}


/* =========================================================
   BOTTOM GREEN / GOLD CURVE
========================================================= */

function BottomCurve() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        bottom-0
        right-0
        z-[5]
        h-[18%]
        w-[43%]
        overflow-hidden
      "
      aria-hidden="true"
    >

      <svg
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        className="h-full w-full"
      >

        <path
          d="
            M0 100
            C100 5 240 80 400 0
            L400 100
            Z
          "
          fill={TEAL}
        />

        <path
          d="
            M0 100
            C100 5 240 80 400 0
          "
          fill="none"
          stroke={GOLD}
          strokeWidth="8"
        />

      </svg>

    </div>
  );
}


/* =========================================================
   FRONT FIELD
========================================================= */

function FrontField({ label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      {/* LABEL */}
      <span
        className="
          w-[42%]
          shrink-0
          truncate
          text-[13px]
          font-black
          uppercase
          tracking-[0.02em]
          text-[#0B4D52]
        "
      >
        {label}
      </span>

      {/* COLON */}
      <span
        className="
          shrink-0
          text-[11px]
          font-black
          text-[#0B4D52]
        "
      >
        :
      </span>

      {/* VALUE */}
      <span
        className="
          min-w-0
          flex-1
          truncate
          border-b
          border-slate-400
          pb-[4px]
          text-[13px]
          font-extrabold
          leading-tight
          text-slate-900
        "
      >
        {value || "\u00A0"}
      </span>
    </div>
  );
}


/* =========================================================
   BACK FIELD
========================================================= */

function BackField({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">

      {/* ICON */}
      <div
        className="
          flex
          h-6
          w-6
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#E8F0EC]
        "
      >
        <Icon
          size={12}
          strokeWidth={2.5}
          className="text-[#0B4D52]"
        />
      </div>

      {/* LABEL */}
      <span
        className="
          w-[42%]
          shrink-0
          truncate
          text-[13px]
          font-black
          uppercase
          tracking-[0.01em]
          text-[#0B4D52]
        "
      >
        {label}
      </span>

      {/* COLON */}
      <span
        className="
          shrink-0
          text-[11px]
          font-black
          text-[#0B4D52]
        "
      >
        :
      </span>

      {/* VALUE */}
      <span
        className="
          min-w-0
          flex-1
          truncate
          border-b
          border-slate-200
          pb-[4px]
          text-[13px]
          font-extrabold
          leading-tight
          text-slate-900
        "
      >
        {value || "\u00A0"}
      </span>
    </div>
  );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SmartCard() {
  const { id: applicationNo } = useParams();
  const navigate = useNavigate();


  /* =======================================================
     API DATA (replaces Redux selectors)
  ======================================================= */

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


  /* =======================================================
     VERIFICATION URL
     Reuses the same QR data the backend generated at
     payment time, so the QR on the card matches exactly.
  ======================================================= */

  const verifyUrl = useMemo(() => {
    if (certificate?.qrCodeData) return certificate.qrCodeData;
    if (!vendor) return "";
    return `${window.location.origin}/verify/${vendor.applicationNo}`;
  }, [vendor, certificate]);


  /* =======================================================
     CARD CODE
  ======================================================= */

  const cardCode = certificate?.certificateNo || "";


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
        <FiLoader className="animate-spin" size={20} />
        Loading...
      </Card>
    );
  }


  /* =======================================================
     VENDOR NOT FOUND
  ======================================================= */

  if (error || !vendor) {
    return (
      <Card className="mx-auto max-w-md text-center">

        <p className="text-sm text-ink-500">
          {error || "Vendor not found."}
        </p>

        <Link
          to="/vendors/list"
          className="
            mt-3
            inline-block
            text-sm
            font-semibold
            text-brand-600
          "
        >
          Back to Vendor List
        </Link>

      </Card>
    );
  }


  /* =======================================================
     CERTIFICATE NOT YET ISSUED
  ======================================================= */

  if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
    return (
      <Card className="mx-auto max-w-md text-center">

        <FiShield className="mx-auto mb-3 text-ink-300" size={32} />

        <p className="text-sm font-semibold text-ink-700">
          The Smart Card is only available once payment is complete and the certificate has been issued.
        </p>

        <p className="mt-1 text-xs text-ink-500">
          Current status:
          <span className="ml-1 font-semibold">
            {vendor.status}
          </span>
        </p>

        <Link
          to={`/vendors/profile/${vendor.applicationNo}`}
          className="
            mt-4
            inline-block
            text-sm
            font-semibold
            text-brand-600
          "
        >
          View Vendor Profile
        </Link>

      </Card>
    );
  }


  /* =======================================================
     ACTIONS
  ======================================================= */

  const handlePrint = () => {
    window.print();
  };


  const handleDownloadPdf = () => {
    window.print();
  };


  /* =======================================================
     FRONT DATA
  ======================================================= */

  const frontFields = [
    {
      label: "ओळखपत्र क्रमांक",
      value: certificate.certificateNo,
    },
    {
      label: "विक्रेत्याचे नाव",
      value: vendor.personal.fullName,
    },
    {
      label: "जन्मतारीख / वय",
      value: `${formatDate(vendor.personal.dob)} / ${calcAge(
        vendor.personal.dob
      )} वर्षे`,
    },
    {
      label: "लिंग",
      value: genderType(vendor.personal.gender),
    },
    {
      label: "पत्ता",
      value: vendor.address.permanentAddress,
    },
    {
      label: "मोबाईल क्रमांक",
      value: vendor.personal.mobile,
    },
  ];


  /* =======================================================
     BACK DATA
  ======================================================= */

  const backFields = [
    {
      icon: FiBriefcase,
      label: "व्यवसायाचा प्रकार",
      value: vendor.business.businessType,
    },

    {
      icon: FiShoppingBag,
      label: "विक्रीचा प्रकार",
      value: saleType(vendor.business.vendorType),
    },

    {
      icon: FiMapPin,
      label: "विक्रय स्थान",
      value: vendor.address.zone,
    },

    {
      icon: FiHome,
      label: "विभाग / प्रभाग",
      value: vendor.address.ward,
    },

    {
      icon: FiClock,
      label: "व्यवसायाची वेळ",
      value: vendor.business.businessTiming,
    },

    {
      icon: FiCalendar,
      label: "ओळखपत्राची वैधता",
      value: `${formatDate(certificate.issueDate)} - ${formatDate(
        certificate.validTill
      )}`,
    },
  ];


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="space-y-5">


      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div
        className="
          flex
          flex-wrap
          items-start
          justify-between
          gap-4
          print:hidden
        "
      >

        <div>

          <p
            className="
              text-xs
              font-semibold
              text-ink-500
            "
          >

            <Link
              to="/vendors/list"
              className="
                text-brand-600
                hover:text-brand-700
              "
            >
              Smart Card
            </Link>

            {" / "}

            {cardCode}

          </p>


          <h1
            className="
              mt-1
              font-display
              text-2xl
              font-bold
              text-ink-900
            "
          >
            पथविक्रेता ओळखपत्र
          </h1>


          <p
            className="
              text-sm
              text-ink-500
            "
          >
            आधार कार्डच्या आकाराचे महानगरपालिका ओळखपत्र
          </p>

        </div>


        {/* ACTIONS */}

        <div className="flex gap-2">

          <Button
            variant="outline"
            icon={FiDownload}
            onClick={handleDownloadPdf}
          >
            Download
          </Button>

          <Button
            icon={FiPrinter}
            onClick={handlePrint}
          >
            Print
          </Button>

        </div>

      </div>


      {/* ==================================================
          CARD PREVIEW
      ================================================== */}

      <div
        className="
          flex
          flex-col
          items-center
          gap-8
          px-1
          py-6
        "
      >


        {/* =================================================
            FRONT CARD
        ================================================= */}

        <div
          className="
            smart-card
            smart-card-front
            relative
            mx-auto
            aspect-[856/540]
            w-full
            max-w-[640px]
            overflow-hidden
            rounded-2xl
            border
            border-[#004C4D]/15
            shadow-[0_18px_44px_rgba(0,65,65,.18)]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(251,250,246,0.98) 0%,
                rgba(251,250,246,0.94) 38%,
                rgba(251,250,246,0.72) 65%,
                rgba(251,250,246,0.30) 100%
              ),
              url(${streetVendorBg})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >

          {/* LEFT RIBBON */}

          <SideRibbon />


          {/* SUBTLE SECURITY PATTERN */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-[1]
              opacity-[0.07]
            "
            style={{
              backgroundImage: `
                repeating-radial-gradient(
                  ellipse at center,
                  transparent 0px,
                  transparent 12px,
                  rgba(0,76,77,.20) 13px,
                  transparent 14px
                )
              `,
            }}
          />


          {/* FRONT CONTENT */}

          <div
            className="
              relative
              z-20
              flex
              h-full
              flex-col
              pl-[10%]
              pr-[3%]
              py-[4%]
            "
          >


            {/* ==========================================
                HEADER
            ========================================== */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-3
              "
            >

              {/* LOGO */}

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  p-1
                  shadow-sm
                  ring-1
                  ring-[#005050]/15
                "
              >

                <img
                  src={logo}
                  alt="VVCMC"
                  className="
                    h-full
                    w-full
                    rounded-full
                    object-contain
                  "
                />

              </div>


              {/* TITLE */}

              <div className="min-w-0">

                <h1
                  className="
                    font-display
                    text-[20px]
                    font-black
                    leading-none
                    text-[#0B4D52]
                  "
                >
                  वसई विरार शहर महानगरपालिका
                </h1>



                <div
                  className="
                    mt-1.5
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-[#CA9E3A]
                  "
                >

                  <span className="h-px w-5 bg-[#CA9E3A]/90" />

                  पथविक्रेता व्यवस्थापन प्रणाली

                  <span className="h-px w-5 bg-[#CA9E3A]/60" />

                </div>

              </div>

            </div>


            {/* ==========================================
                FRONT BODY
                SAME SPACING AS BACK
            ========================================== */}

            <div
              className="
                mt-3
                flex
                min-h-0
                flex-1
                items-center
              "
            >


              {/* ========================================
                  PHOTO
              ======================================== */}

              <div
                className="
                  relative
                  z-10
                  flex
                  h-[60%]
                  w-[23%]
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border-2
                  border-[#0B4D52]
                  bg-white
                  shadow-sm
                "
              >

                {vendor.documents?.photo ? (

                  <img
                    src={vendor.documents.photo}
                    alt={vendor.personal.fullName}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                ) : (

                  <div
                    className="
                      flex
                      h-full
                      w-full
                      flex-col
                      items-center
                      justify-center
                      gap-1
                    "
                  >

                    <FiUser
                      size={40}
                      strokeWidth={1.2}
                      className="text-slate-300"
                    />

                    <span
                      className="
                        text-[7px]
                        font-semibold
                        uppercase
                        tracking-wide
                        text-slate-400
                      "
                    >
                      PHOTO
                    </span>

                  </div>

                )}

              </div>


              {/* ========================================
                  FRONT INFORMATION
              ======================================== */}



              <div
                className="
                  ml-4
                  flex
                  min-w-0
                  flex-1
                  h-[70%]
                  flex-col
                  justify-between
                  self-center
                "
              >
                {frontFields.map(
                  ({
                    label,
                    value,
                  }) => (
                    <FrontField
                      key={label}
                      label={label}
                      value={value}
                    />
                  )
                )}
              </div>


              {/* ========================================
                  QR
              ======================================== */}

              <Link
                to={`/verify/${vendor.applicationNo}`}
                className="
                  relative
                  z-10
                  ml-4
                  flex
                  h-[64%]
                  w-[23%]
                  max-w-[400px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  p-2
                  shadow-sm
                  transition-transform
                  hover:scale-[1.02]
                "
              >

                <QRCodeSVG
                  value={verifyUrl}
                  size={150}
                  level="M"
                  bgColor="#FFFFFF"
                  fgColor="#111111"
                  className="
                    h-full
                    w-full
                  "
                />

              </Link>

            </div>


            {/* FRONT CURVE */}

            <BottomCurve />


            {/* FRONT MESSAGE */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-[3.5%]
                right-[3%]
                z-20
                text-right
                text-white
              "
            >

              <p className="text-[5px] font-bold uppercase">
                Together for
              </p>

              <p className="text-[5.5px] font-black uppercase">
                Clean, Safe & Empowered
              </p>

              <p className="text-[5.5px] font-black uppercase">
                Street Vendors
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            BACK CARD
        ================================================= */}

        <div
          className="
            smart-card
            smart-card-back
            relative
            mx-auto
            aspect-[856/540]
            w-full
            max-w-[640px]
            overflow-hidden
            rounded-2xl
            border
            border-[#004C4D]/15
            bg-[#FBFAF6]
            shadow-[0_18px_44px_rgba(0,65,65,.18)]
          "
        >

          {/* LEFT RIBBON */}

          <SideRibbon />


          {/* BACKGROUND */}

          <div
            className="
              absolute
              inset-0
              z-0
              bg-[#FBFAF6]
            "
          />


          {/* SECURITY PATTERN */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-[1]
              opacity-[0.10]
            "
            style={{
              backgroundImage: `
                repeating-radial-gradient(
                  ellipse at center,
                  transparent 0px,
                  transparent 12px,
                  rgba(0,76,77,.20) 13px,
                  transparent 14px
                )
              `,
            }}
          />


          {/* ==========================================
              BACK CONTENT
          ========================================== */}

          <div
            className="
              relative
              z-[20]
              flex
              h-full
              pl-[9%]
              pr-[4%]
              py-[5%]
            "
          >

            {/* BACK FIELDS */}

            <div
              className="
                flex
                min-w-0
                flex-1
                flex-col
                justify-center
                gap-[5%]
              "
            >

              {backFields.map(
                ({
                  icon,
                  label,
                  value,
                }) => (
                  <BackField
                    key={label}
                    icon={icon}
                    label={label}
                    value={value}
                  />
                )
              )}

            </div>


            {/* ========================================
                WATERMARK
            ======================================== */}


            <div
              className="
                relative
                ml-[3%]
                flex
                h-full
                w-[30%]
                shrink-0
                items-center
                justify-center
              "
            >
              {/* WATERMARK LOGO */}
              <div
                className="
                  relative
                  z-10
                  flex
                  h-[82%]
                  aspect-square
                  items-center
                  justify-center
                  opacity-[0.26]
                "
              >
                <img
                  src={logo}
                  alt=""
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />
              </div>
            </div>

          </div>


          {/* BACK CURVE */}

          <BottomCurve />


          {/* ========================================
              AUTHORIZED SIGNATORY
          ======================================== */}

          <div
            className="
              absolute
              bottom-[4%]
              left-[13%]
              z-[20]
              text-center
            "
          >

            <div
              className="
                mb-0.5
                h-px
                w-20
                bg-slate-400
              "
            />

            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-wide
                text-[#0B4D52]

              "
            >
              अधिकृत स्वाक्षरी
            </p>

            <p
              className="
                text-[7px]
                font-bold
                text-slate-500
              "
            >
              VVCMC
            </p>

          </div>

        </div>

      </div>


      {/* ==================================================
          VERIFICATION
      ================================================== */}

      <div
        className="
          flex
          justify-center
          print:hidden
        "
      >

        <Button
          variant="ghost"
          icon={FiExternalLink}
          onClick={() =>
            navigate(
              `/verify/${vendor.applicationNo}`
            )
          }
        >
          Open Verification Screen
        </Button>

      </div>


      {/* ==================================================
          PRINT CSS
      ================================================== */}

      <style>{`

        @media print {

          body {
            background: white !important;
          }

          header,
          aside,
          nav,
          .print\\\\:hidden {
            display: none !important;
          }

          .smart-card {
            width: 85.6mm !important;
            height: 54mm !important;
            max-width: none !important;
            border-radius: 3mm !important;
            box-shadow: none !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .smart-card-front,
          .smart-card-back {
            margin: 0 auto !important;
          }

          .smart-card-front {
            margin-bottom: 8mm !important;
          }

          @page {
            size: A4 portrait;
            margin: 12mm;
          }

          .print\\\\:hidden {
            display: none !important;
          }

        }

      `}</style>

    </div>
  );
}