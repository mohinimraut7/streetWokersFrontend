
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
//   FiCreditCard,
//   FiPhone,
//   FiFlag,
//   FiUsers,
//   FiMapPin,
//   FiCalendar,
//   FiClock,
//   FiBriefcase,
//   FiTag,
//   FiHome,
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
// import { useAuth } from "../../auth/hooks/useAuth";


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
//    dotted underline. Rendered as a Fragment into a shared grid
//    so every ":" lines up in one vertical line regardless of
//    label length. Kept because the two previous design
//    revisions (preserved as comments below) still reference it.

//    wrap (optional): let the value wrap onto multiple lines
//    instead of truncating — used for the address on the back.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[7px] font-bold leading-[9px] text-slate-800">{label}</span>
//       <span className="text-[7px] font-bold leading-[9px] text-slate-800">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[0.5px] text-[7px] font-bold leading-[9px] text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    ICON + LABEL + ":" + DOTTED VALUE — single-column row used
//    on both faces of the current design. Rendered as a Fragment
//    into a shared 4-column grid (icon | label | colon | value)
//    so every row lines up cleanly, with a bigger, more readable
//    type scale than the old dotted-only rows above.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value }) {
//   return (
//     <>
//       <span className="mt-[1px] flex h-[12px] w-[12px] shrink-0 items-center justify-center rounded-full bg-[#0B5D30]/10 text-[#0B5D30]">
//         <Icon size={7} />
//       </span>
//       <span className="min-w-0 whitespace-nowrap text-[6px] font-semibold leading-[11px] text-slate-600">{label}</span>
//       <span className="text-[6px] font-semibold leading-[11px] text-slate-600">:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one. */}
//       <span className="min-w-0 whitespace-normal break-words border-b border-dotted border-[#C9A227] pb-[1px] text-[9px] font-extrabold leading-[11px] text-slate-900">
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
//   const { user } = useAuth();

//   // two separate faces now — front and back are captured/printed
//   // as two independent images instead of one tall card.
//   const frontRef = useRef(null);
//   const backRef = useRef(null);
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
//      Each face (front / back) is captured separately as a flattened
//      image via html2canvas — same reasoning as before: a flattened
//      image can't be split mid-way by the print engine's pagination,
//      so each face always renders as exactly one page at the exact
//      physical card size (88mm x 58mm — 8.8cm wide, 5.8cm tall). */

//   const CARD_WIDTH_MM = 88;
//   const CARD_HEIGHT_MM = 58;
//   const PREVIEW_SCALE = 4.3; // px-per-mm, on-screen preview only

//   const captureFace = async (ref) => {
//     if (!ref.current) return null;
//     return html2canvas(ref.current, {
//       scale: 4, // high-res so print/PDF output stays crisp at this small size
//       useCORS: true,
//       backgroundColor: "#ffffff",
//     });
//   };

//   const handlePrint = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Card.");
//         return;
//       }
//       printWindow.document.write(
//         "<html><head><title>Smart Card</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0; }" +
//           "html, body { margin: 0; padding: 0; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; }" +
//           ".page { page-break-after: always; }" +
//           ".page:last-child { page-break-after: auto; }" +
//           "</style></head><body>" +
//           "<div class=\"page\"><img src=\"" + frontData + "\" /></div>" +
//           "<div class=\"page\"><img src=\"" + backData + "\" /></div>" +
//           "</body></html>"
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
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
//       pdf.addImage(backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
//     } catch (err) {
//       console.error("Smart card download failed:", err);
//       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   /* ==================== NOT AUTHORIZED (29-10 request) — only A.M.C./super_admin
//      can generate OR view the Smart Card. counter_officer, survey_officer and vendor
//      must not see this page at all, even by direct link. ==================== */

//   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
//         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
//         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           Back to Dashboard
//         </Link>
//       </Card>
//     );
//   }

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

//   /* ==================== CARD FIELDS ====================
//      Front (next to photo): id no, name, gender, mobile, ward, validity.
//      Back (next to signature+QR): dob/age, business type, vendor type,
//      vending zone, business timing, address.
//      — exact same 6 + 6 fields, same order, same data as before;
//      only an icon is attached per row for the new layout. */

//   const frontFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const backFields = [
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.address.zone },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { icon: FiHome, label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
//   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

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

//       {/* ================= CARD PREVIEW — front & back, side by side ================= */}
//       <div className="flex flex-wrap items-start justify-center gap-10 px-1 py-6">

//         {/* ---------- FRONT ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Front</p>
//           <div
//             ref={frontRef}
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_2px_10px_rgba(11,93,48,0.25)] ring-1 ring-inset ring-[#C9A227]/60"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name, with a subtle gold decorative wave along the bottom
//                  edge (matches the reference card's curved accent). ── */}
//             <div className="relative flex shrink-0 items-center gap-2.5 overflow-hidden bg-gradient-to-r from-[#0B5D30] to-[#123f27] px-3 py-2.5">
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[14px] w-full opacity-40"
//                 viewBox="0 0 380 14"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 10 Q95 0 190 8 T380 6" fill="none" stroke="#C9A227" strokeWidth="1.4" />
//                 <path d="M0 13 Q95 4 190 12 T380 10" fill="none" stroke="#F2D98A" strokeWidth="0.8" />
//               </svg>
//               <img
//                 src={logo}
//                 alt="VVCMC"
//                 className="h-10 w-10 shrink-0 rounded-full border-2 border-[#C9A227] bg-white object-contain p-[1.5px]"
//               />
//               <div className="min-w-0 leading-tight">
//                 <p className="truncate text-[10px] font-black uppercase tracking-wide text-white">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="truncate text-[9.5px] font-semibold text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — photo ~27% width
//                  (sized to ~68% of the body's height, vertically centered),
//                  right column ~73% width holding the title at top and the
//                  six fields below, spread with content-between so there is
//                  no leftover blank space. A very faint diagonal pattern
//                  sits behind the whole body for a premium printed-card
//                  texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 px-3 pb-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, #0B5D30 0px, #0B5D30 1px, transparent 1px, transparent 12px)",
//                   opacity: 0.035,
//                 }}
//               />
//               <div className="relative flex w-[26%] shrink-0 items-center justify-center">
//                 <div className="h-[62%] w-full overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-slate-50 shadow-[0_0_0_1.5px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={30} strokeWidth={1.2} className="text-slate-300" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="relative flex min-w-0 flex-1 flex-col">
//                 {/* ── Title, now integrated at the top of the information
//                      column instead of a separate centered block, so it no
//                      longer creates isolated empty space. ── */}
//                 <div className="shrink-0 pb-1.5 pt-1.5">
//                   <h2 className="text-[13px] font-black leading-tight text-[#0B5D30]">
//                     रस्ता विक्रेता ओळखपत्र
//                   </h2>
//                   <p className="text-[6.5px] font-semibold italic leading-tight text-[#B9861C]">
//                     (Street Vendor Identity Card)
//                   </p>
//                   <div className="mt-1 h-px w-full bg-[#C9A227]/70" />
//                 </div>

//                 <div
//                   className="grid flex-1 content-between gap-x-1"
//                   style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//                 >
//                   {frontFields.map((f) => (
//                     <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_2px_10px_rgba(11,93,48,0.2)] ring-1 ring-inset ring-[#C9A227]/60"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── green/gold header strip — ~14% of card height, same wave
//                  treatment as the front so both faces read as one card ── */}
//             <div className="relative h-[34px] w-full shrink-0 overflow-hidden bg-gradient-to-r from-[#0B5D30] to-[#123f27]">
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[12px] w-full opacity-40"
//                 viewBox="0 0 380 12"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 8 Q95 0 190 6 T380 5" fill="none" stroke="#C9A227" strokeWidth="1.4" />
//                 <path d="M0 11 Q95 3 190 10 T380 8" fill="none" stroke="#F2D98A" strokeWidth="0.8" />
//               </svg>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — signature+QR
//                  column ~28% width, fields ~72% width, no leftover blank
//                  space since both columns stretch to the same height. A
//                  faint diagonal pattern echoes the front card's texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 pl-3 pr-2 py-2.5">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, #0B5D30 0px, #0B5D30 1px, transparent 1px, transparent 12px)",
//                   opacity: 0.035,
//                 }}
//               />

//               {/* ── Left: ONE cohesive verification/signature panel — a
//                    single bordered, lightly-tinted container. Signature sits
//                    at the TOP as its own compact bordered box (~72% of the
//                    panel's width), QR sits directly below it. ── */}
//               <div className="relative flex w-[28%] shrink-0 flex-col items-center gap-2 rounded-[6px] border border-[#C9A227]/50 bg-[#FAF8EF] px-1.5 py-2">
//                 <div className="flex w-full shrink-0 flex-col items-center gap-1">
//                   <div className="flex w-[72%] items-center justify-center rounded-[4px] border border-dashed border-slate-400 bg-white/70 py-2">
//                     <div className="h-px w-3/4 bg-slate-400" />
//                   </div>
//                   <p className="text-center text-[7px] font-extrabold leading-tight tracking-wide text-slate-800">
//                     सहाय्यक आयुक्त
//                   </p>
//                   <p className="text-center text-[6px] leading-tight text-slate-500">(स्वाक्षरी)</p>
//                 </div>

//                 <div className="h-px w-full bg-[#C9A227]/40" />

//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-white p-1 shadow-[0_0_0_1.5px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={74} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>
//               </div>

//               {/* ── Right: single-column fields, majority of the back card,
//                    separators reaching almost to the card's right edge. ── */}
//               <div
//                 className="relative grid min-w-0 flex-1 content-between gap-x-1 border-l border-dotted border-[#0B5D30]/40 pl-2.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {backFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}
//               </div>
//             </div>
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

// /* =========================================================
//    PREVIOUS LAYOUT #2 (icon-grid 2x4 front + Security Features /
//    Terms & Conditions / Vending Zone map / Signature / QR +
//    VERIFIED badge on the back) — kept here per project policy of
//    never deleting old code, only commenting it out. Superseded
//    because the brief explicitly excluded the Security Features /
//    Terms & Conditions / Zone map / Card Issue Status sections and
//    asked for a single-column icon+label+colon+value layout with
//    larger, more readable text instead. Only the JSX/markup
//    differed from the current version — data fetching, auth,
//    PDF/print logic were identical and are not duplicated here.

//   See the previously delivered SmartCard.jsx (or git history) for
//   the full icon-grid + Security Features / Terms & Conditions /
//   Vending Zone / VERIFIED-badge markup if it ever needs to be
//   restored.
// ========================================================= */

// /* =========================================================
//    PREVIOUS LAYOUT #1 (dotted "label : value" style, no icons,
//    photo beside fields on front, signature+QR beside fields on
//    back — the very first 88mm x 58mm two-face design) — kept
//    here per project policy of never deleting old code, only
//    commenting it out.

//   const frontFieldsOld = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   const backFieldsOld = [
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण", value: vendor.address.zone },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   <div
//     ref={frontRef}
//     className="smart-card-front relative flex flex-col overflow-hidden"
//     style={{
//       width: `${CARD_W_PX}px`,
//       height: `${CARD_H_PX}px`,
//       backgroundImage: `url(${vvcmccardbg})`,
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "center",
//       backgroundSize: "100% 100%",
//     }}
//   >
//     <div className="flex flex-row items-center gap-1.5 px-2.5 pt-1.5">
//       <img src={logo} alt="VVCMC" className="h-6 w-6 shrink-0 rounded-full border border-white bg-white object-contain p-[1px]" />
//       <p className="flex-1 text-left text-[8px] font-bold leading-[9px] text-white drop-shadow-sm">वसई-विरार शहर महानगरपालिका</p>
//     </div>
//     <div className="flex flex-col items-center gap-0.5 px-2 pb-0.5 pt-1">
//       <h2 className="text-center text-[9px] font-black leading-tight text-[#0B5D30]">रस्ता विक्रेता ओळखपत्र</h2>
//       <p className="text-center text-[6px] font-semibold italic text-[#B9861C]">(Street Vendor Identity Card)</p>
//       <div className="mt-0.5 h-px w-16 bg-[#C9A227]" />
//     </div>
//     <div className="flex flex-1 items-start gap-2 px-2.5 pb-1.5 pt-1">
//       <div className="flex h-[54px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-sm border-2 border-[#0B5D30] bg-white">
//         {vendor.documents?.photo ? (
//           <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//         ) : (
//           <FiUser size={20} strokeWidth={1.2} className="text-slate-300" />
//         )}
//       </div>
//       <div className="grid min-w-0 flex-1 gap-y-[2px] gap-x-1" style={{ gridTemplateColumns: "max-content max-content 1fr" }}>
//         {frontFieldsOld.map((f) => (
//           <CardField key={f.label} label={f.label} value={f.value} />
//         ))}
//       </div>
//     </div>
//   </div>

//   <div
//     ref={backRef}
//     className="smart-card-back relative flex flex-col overflow-hidden bg-white"
//     style={{ width: `${CARD_W_PX}px`, height: `${CARD_H_PX}px`, border: "1px solid #C9A227" }}
//   >
//     <div className="flex flex-1 gap-2 p-2.5">
//       <div className="flex w-[64px] shrink-0 flex-col items-center justify-between">
//         <div className="flex flex-col items-center gap-0.5 pt-1">
//           <div className="h-px w-12 bg-slate-500" />
//           <p className="text-center text-[6px] font-extrabold leading-tight tracking-wide text-slate-800">सहाय्यक आयुक्त</p>
//           <p className="text-center text-[5px] leading-tight text-slate-500">(स्वाक्षरी)</p>
//         </div>
//         <Link to={`/verify/${vendor.applicationNo}`} className="flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-sm border-2 border-slate-800 bg-white p-0.5 transition-transform hover:scale-[1.03]">
//           <QRCodeSVG value={verifyUrl} size={48} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//         </Link>
//       </div>
//       <div className="grid min-w-0 flex-1 content-start gap-y-[3px] gap-x-1 border-l border-dotted border-slate-300 pl-2" style={{ gridTemplateColumns: "max-content max-content 1fr" }}>
//         {backFieldsOld.map((f) => (
//           <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//         ))}
//       </div>
//     </div>
//   </div>

// ========================================================= */

// /* =========================================================
//    OLD LAYOUT (single tall vertical card, front-only) — kept
//    here per project policy of never deleting old code, only
//    commenting it out. Not used anymore; superseded by the
//    front/back 88mm x 58mm layouts above.

// export default function SmartCard_OLD() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const cardRef = useRef(null);
//   const [isExporting, setIsExporting] = useState(false);

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

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   const CARD_WIDTH_MM = 100;

//   const captureCardCanvas = async () => {
//     if (!cardRef.current) return null;
//     return html2canvas(cardRef.current, {
//       scale: 3,
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

//   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
//         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
//         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           Back to Dashboard
//         </Link>
//       </Card>
//     );
//   }

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
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
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

//   return (
//     <div className="space-y-5">
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

//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
//             <h2 className="text-center text-[13.5px] font-black leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

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

//           <div
//             className="grid gap-y-[5px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             <div className="col-span-3 h-0" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           <div className="mt-auto flex flex-col items-center gap-1 pb-2 pt-1">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-slate-800">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>
//     </div>
//   );
// }
// ========================================================= */


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
//   FiCreditCard,
//   FiPhone,
//   FiFlag,
//   FiUsers,
//   FiMapPin,
//   FiCalendar,
//   FiClock,
//   FiBriefcase,
//   FiTag,
//   FiHome,
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
// import { useAuth } from "../../auth/hooks/useAuth";


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
//    dotted underline. Rendered as a Fragment into a shared grid
//    so every ":" lines up in one vertical line regardless of
//    label length. Kept because the two previous design
//    revisions (preserved as comments below) still reference it.

//    wrap (optional): let the value wrap onto multiple lines
//    instead of truncating — used for the address on the back.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[7px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[7px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[7px] font-bold leading-[9px] text-[#1e293b] ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    ICON + LABEL + ":" + DOTTED VALUE — single-column row used
//    on both faces of the current design. Rendered as a Fragment
//    into a shared 4-column grid (icon | label | colon | value)
//    so every row lines up cleanly, with a bigger, more readable
//    type scale than the old dotted-only rows above.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value }) {
//   return (
//     <>
//       <span className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#E7EFEA] text-[#0B5D30]">
//         <Icon size={8.5} />
//       </span>
//       <span className="min-w-0 whitespace-nowrap text-[7.2px] font-semibold leading-[14px] text-[#475569]">{label}</span>
//       <span className="text-[7.2px] font-semibold leading-[14px] text-[#475569]">:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one. */}
//       <span className="min-w-0 whitespace-normal break-words border-b border-dotted border-[#C9A227] pb-[1px] text-[10.3px] font-extrabold leading-[14px] text-[#0f172a]">
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
//   const { user } = useAuth();

//   // two separate faces now — front and back are captured/printed
//   // as two independent images instead of one tall card.
//   const frontRef = useRef(null);
//   const backRef = useRef(null);
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
//      Each face (front / back) is captured separately as a flattened
//      image via html2canvas — same reasoning as before: a flattened
//      image can't be split mid-way by the print engine's pagination,
//      so each face always renders as exactly one page at the exact
//      physical card size (88mm x 58mm — 8.8cm wide, 5.8cm tall).

//      IMPORTANT: because captureFace() screenshots frontRef/backRef —
//      the exact same DOM nodes rendered in the on-screen preview below —
//      Print and Download will ALWAYS visually match the preview exactly.
//      There is no separate print-only or PDF-only markup anywhere in
//      this file, so any future visual change made to the preview JSX
//      automatically carries through to Print and PDF with zero extra
//      work. Nothing further was needed to satisfy "print/download made
//      same as preview" — it was already guaranteed by this capture
//      approach. */

//   const CARD_WIDTH_MM = 88;
//   const CARD_HEIGHT_MM = 58;
//   const PREVIEW_SCALE = 4.3; // px-per-mm, on-screen preview only

//   const captureFace = async (ref) => {
//     if (!ref.current) return null;
//     return html2canvas(ref.current, {
//       scale: 4, // high-res so print/PDF output stays crisp at this small size
//       useCORS: true,
//       backgroundColor: "#ffffff",
//     });
//   };

//   const handlePrint = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Card.");
//         return;
//       }
//       printWindow.document.write(
//         "<html><head><title>Smart Card</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0; }" +
//           "html, body { margin: 0; padding: 0; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; }" +
//           ".page { page-break-after: always; }" +
//           ".page:last-child { page-break-after: auto; }" +
//           "</style></head><body>" +
//           "<div class=\"page\"><img src=\"" + frontData + "\" /></div>" +
//           "<div class=\"page\"><img src=\"" + backData + "\" /></div>" +
//           "</body></html>"
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
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
//       pdf.addImage(backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
//     } catch (err) {
//       console.error("Smart card download failed:", err);
//       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   /* ==================== NOT AUTHORIZED (29-10 request) — only A.M.C./super_admin
//      can generate OR view the Smart Card. counter_officer, survey_officer and vendor
//      must not see this page at all, even by direct link. ==================== */

//   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
//         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
//         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           Back to Dashboard
//         </Link>
//       </Card>
//     );
//   }

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

//   /* ==================== CARD FIELDS ====================
//      Front (next to photo): id no, name, gender, mobile, ward, validity.
//      Back (next to signature+QR): dob/age, business type, vendor type,
//      vending zone, business timing, address.
//      — exact same 6 + 6 fields, same order, same data as before;
//      only an icon is attached per row for the new layout. */

//   const frontFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const backFields = [
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.address.zone },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { icon: FiHome, label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
//   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

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

//       {/* ================= CARD PREVIEW — front & back, side by side ================= */}
//       <div className="flex flex-wrap items-start justify-center gap-10 px-1 py-6">

//         {/* ---------- FRONT ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Front</p>
//           <div
//             ref={frontRef}
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)] ring-1 ring-inset ring-[#DFC77D]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name, with a subtle gold decorative wave along the bottom
//                  edge (matches the reference card's curved accent). ── */}
//             <div className="relative flex shrink-0 items-center gap-2.5 bg-gradient-to-r from-[#0c6636] via-[#0e4a26] to-[#0f3620] pl-3.5 pr-3 pt-3 pb-2.5">
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[14px] w-full opacity-65"
//                 viewBox="0 0 380 14"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 10 Q95 0 190 8 T380 6" fill="none" stroke="#C9A227" strokeWidth="1" />
//                 <path d="M0 13 Q95 4 190 12 T380 10" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//               </svg>
//               <img
//                 src={logo}
//                 alt="VVCMC"
//                 className="h-10 w-10 shrink-0 rounded-full border-2 border-[#C9A227] bg-[#ffffff] object-contain p-[1.5px]"
//               />

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits. ── */}
//               <div className="min-w-0 space-y-[6px] leading-tight">
//                 <p className="whitespace-nowrap text-[10px] font-black uppercase tracking-wide text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[10px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — photo ~29% width
//                  (sized to ~57% of the body's height, vertically centered),
//                  right column ~71% width holding the title at top and the
//                  six fields below, spread with content-between so there is
//                  no leftover blank space. A very faint diagonal pattern
//                  sits behind the whole body for a premium printed-card
//                  texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 px-3 pb-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, #0B5D30 0px, #0B5D30 1px, transparent 1px, transparent 12px)",
//                   opacity: 0.025,
//                 }}
//               />
//               <div className="relative flex w-[29%] shrink-0 items-center justify-center">
//                 <div className="h-[57%] w-full overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={30} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="relative flex min-w-0 flex-1 flex-col">
//                 {/* ── Title, integrated at the top of the information
//                      column instead of a separate centered block, so it no
//                      longer creates isolated empty space. ── */}
//                 <div className="shrink-0 pb-1.5 pt-1.5">
//                   <h2 className="text-[15.3px] font-black leading-tight tracking-tight text-[#0B5D30]">
//                     रस्ता विक्रेता ओळखपत्र
//                   </h2>
//                   <p className="text-[6.5px] font-semibold italic leading-tight text-[#B9861C]">
//                     (Street Vendor Identity Card)
//                   </p>
//                   <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//                 </div>

//                 <div
//                   className="grid flex-1 content-between gap-x-1"
//                   style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//                 >
//                   {frontFields.map((f) => (
//                     <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)] ring-1 ring-inset ring-[#DFC77D]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── green/gold header strip — ~14% of card height, same wave
//                  treatment as the front so both faces read as one card ── */}
//             <div className="relative h-[34px] w-full shrink-0 overflow-hidden bg-gradient-to-r from-[#0c6636] via-[#0e4a26] to-[#0f3620]">
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[12px] w-full opacity-65"
//                 viewBox="0 0 380 12"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 8 Q95 0 190 6 T380 5" fill="none" stroke="#C9A227" strokeWidth="1" />
//                 <path d="M0 11 Q95 3 190 10 T380 8" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//               </svg>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — signature+QR
//                  column ~28% width, fields ~72% width, no leftover blank
//                  space since both columns stretch to the same height. A
//                  faint diagonal pattern echoes the front card's texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 pl-3 pr-2 py-2.5">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, #0B5D30 0px, #0B5D30 1px, transparent 1px, transparent 12px)",
//                   opacity: 0.025,
//                 }}
//               />

//               {/* ── Left: signature panel arranged as three clearly divided
//                    sections (matches a real printed ID card): signature box,
//                    then designation text, then QR — each separated by a
//                    thin gold divider instead of one plain empty area. ── */}
//               <div className="relative flex w-[28%] shrink-0 flex-col items-center gap-1.5 rounded-[6px] border border-[#E4D193] bg-[#FAF8EF] px-1.5 py-2">
//                 <div className="flex w-[74%] items-center justify-center rounded-[4px] border border-dashed border-[#94a3b8] bg-[#ffffff] py-1.5">
//                   <div className="h-px w-3/4 bg-[#94a3b8]" />
//                 </div>

//                 <div className="h-px w-full bg-[#E6D69F]" />

//                 <div className="flex shrink-0 flex-col items-center">
//                   <p className="text-center text-[7px] font-extrabold leading-tight tracking-wide text-[#1e293b]">
//                     सहाय्यक आयुक्त
//                   </p>
//                   <p className="text-center text-[6px] leading-tight text-[#64748b]">(स्वाक्षरी)</p>
//                 </div>

//                 <div className="h-px w-full bg-[#E6D69F]" />

//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>
//               </div>

//               {/* ── Right: single-column fields, majority of the back card,
//                    separators reaching almost to the card's right edge. ── */}
//               <div
//                 className="relative grid min-w-0 flex-1 content-between gap-x-1 border-l border-dotted border-[#9DBEAC] pl-2.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {backFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}
//               </div>
//             </div>
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
//   FiCreditCard,
//   FiPhone,
//   FiFlag,
//   FiUsers,
//   FiMapPin,
//   FiCalendar,
//   FiClock,
//   FiBriefcase,
//   FiTag,
//   FiHome,
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
// import { useAuth } from "../../auth/hooks/useAuth";


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
//    dotted underline. Rendered as a Fragment into a shared grid
//    so every ":" lines up in one vertical line regardless of
//    label length. Kept because the two previous design
//    revisions (preserved as comments below) still reference it.

//    wrap (optional): let the value wrap onto multiple lines
//    instead of truncating — used for the address on the back.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[7px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[7px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[7px] font-bold leading-[9px] text-[#1e293b] ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    ICON + LABEL + ":" + DOTTED VALUE — single-column row used
//    on both faces of the current design. Rendered as a Fragment
//    into a shared 4-column grid (icon | label | colon | value)
//    so every row lines up cleanly, with a bigger, more readable
//    type scale than the old dotted-only rows above.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value }) {
//   return (
//     <>
//       <span className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#E7EFEA] text-[#0B5D30]">
//         <Icon size={8.5} />
//       </span>
//       <span className="min-w-0 whitespace-nowrap text-[7.2px] font-semibold leading-[14px] text-[#475569]">{label}</span>
//       <span className="text-[7.2px] font-semibold leading-[14px] text-[#475569]">:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one. */}
//       <span className="min-w-0 whitespace-normal break-words border-b border-dotted border-[#C9A227] pb-[1px] text-[10.3px] font-extrabold leading-[14px] text-[#0f172a]">
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
//   const { user } = useAuth();

//   // two separate faces now — front and back are captured/printed
//   // as two independent images instead of one tall card.
//   const frontRef = useRef(null);
//   const backRef = useRef(null);
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
//      Each face (front / back) is captured separately as a flattened
//      image via html2canvas — same reasoning as before: a flattened
//      image can't be split mid-way by the print engine's pagination,
//      so each face always renders as exactly one page at the exact
//      physical card size (88mm x 58mm — 8.8cm wide, 5.8cm tall).

//      IMPORTANT: because captureFace() screenshots frontRef/backRef —
//      the exact same DOM nodes rendered in the on-screen preview below —
//      Print and Download will ALWAYS visually match the preview exactly.
//      There is no separate print-only or PDF-only markup anywhere in
//      this file, so any future visual change made to the preview JSX
//      automatically carries through to Print and PDF with zero extra
//      work. Nothing further was needed to satisfy "print/download made
//      same as preview" — it was already guaranteed by this capture
//      approach. */

//   const CARD_WIDTH_MM = 88;
//   const CARD_HEIGHT_MM = 58;
//   const PREVIEW_SCALE = 4.3; // px-per-mm, on-screen preview only

//   const captureFace = async (ref) => {
//     if (!ref.current) return null;
//     return html2canvas(ref.current, {
//       scale: 4, // high-res so print/PDF output stays crisp at this small size
//       useCORS: true,
//       allowTaint: true,
//       backgroundColor: "#ffffff",
//       foreignObjectRendering: false,
//       imageTimeout: 0,
//       logging: false,
//     });
//   };

//   const handlePrint = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Card.");
//         return;
//       }
//       printWindow.document.write(
//         "<html><head><title>Smart Card</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; }" +
//           ".page { page-break-after: always; }" +
//           ".page:last-child { page-break-after: auto; }" +
//           "</style></head><body>" +
//           "<div class=\"page\"><img src=\"" + frontData + "\" /></div>" +
//           "<div class=\"page\"><img src=\"" + backData + "\" /></div>" +
//           "</body></html>"
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
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
//       pdf.addImage(backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
//     } catch (err) {
//       console.error("Smart card download failed:", err);
//       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   /* ==================== NOT AUTHORIZED (29-10 request) — only A.M.C./super_admin
//      can generate OR view the Smart Card. counter_officer, survey_officer and vendor
//      must not see this page at all, even by direct link. ==================== */

//   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
//         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
//         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           Back to Dashboard
//         </Link>
//       </Card>
//     );
//   }

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

//   /* ==================== CARD FIELDS ====================
//      Front (next to photo): id no, name, gender, mobile, ward, validity.
//      Back (next to signature+QR): dob/age, business type, vendor type,
//      vending zone, business timing, address.
//      — exact same 6 + 6 fields, same order, same data as before;
//      only an icon is attached per row for the new layout. */

//   const frontFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const backFields = [
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.address.zone },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { icon: FiHome, label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
//   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

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

//       {/* ================= CARD PREVIEW — front & back, side by side ================= */}
//       <div className="flex flex-wrap items-start justify-center gap-10 px-1 py-6">

//         {/* ---------- FRONT ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Front</p>
//           <div
//             ref={frontRef}
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)] ring-1 ring-inset ring-[#DFC77D]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name, with a subtle gold decorative wave along the bottom
//                  edge (matches the reference card's curved accent). ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-2.5 pl-3.5 pr-3 pt-3 pb-2.5"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[14px] w-full opacity-65"
//                 viewBox="0 0 380 14"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 10 Q95 0 190 8 T380 6" fill="none" stroke="#C9A227" strokeWidth="1" />
//                 <path d="M0 13 Q95 4 190 12 T380 10" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//               </svg>
//               <img
//                 src={logo}
//                 alt="VVCMC"
//                 className="h-10 w-10 shrink-0 rounded-full border-2 border-[#C9A227] bg-[#ffffff] object-contain p-[1.5px]"
//               />

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits. ── */}
//               <div className="min-w-0 space-y-[6px] leading-tight">
//                 <p className="whitespace-nowrap text-[10px] font-black uppercase tracking-wide text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[10px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — photo ~29% width
//                  (sized to ~57% of the body's height, vertically centered),
//                  right column ~71% width holding the title at top and the
//                  six fields below, spread with content-between so there is
//                  no leftover blank space. A very faint diagonal pattern
//                  sits behind the whole body for a premium printed-card
//                  texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 px-3 pb-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />
//               <div className="relative flex w-[29%] shrink-0 items-center justify-center">
//                 <div className="h-[57%] w-full overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={30} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="relative flex min-w-0 flex-1 flex-col">
//                 {/* ── Title, integrated at the top of the information
//                      column instead of a separate centered block, so it no
//                      longer creates isolated empty space. ── */}
//                 <div className="shrink-0 pb-1.5 pt-1.5">
//                   <h2 className="text-[15.3px] font-black leading-tight tracking-tight text-[#0B5D30]">
//                     रस्ता विक्रेता ओळखपत्र
//                   </h2>
//                   <p className="text-[6.5px] font-semibold italic leading-tight text-[#B9861C]">
//                     (Street Vendor Identity Card)
//                   </p>
//                   <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//                 </div>

//                 <div
//                   className="grid flex-1 content-between gap-x-1"
//                   style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//                 >
//                   {frontFields.map((f) => (
//                     <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)] ring-1 ring-inset ring-[#DFC77D]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── green/gold header strip — ~14% of card height, same wave
//                  treatment as the front so both faces read as one card ── */}
//             <div
//               className="relative h-[34px] w-full shrink-0 overflow-hidden"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[12px] w-full opacity-65"
//                 viewBox="0 0 380 12"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 8 Q95 0 190 6 T380 5" fill="none" stroke="#C9A227" strokeWidth="1" />
//                 <path d="M0 11 Q95 3 190 10 T380 8" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//               </svg>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — signature+QR
//                  column ~28% width, fields ~72% width, no leftover blank
//                  space since both columns stretch to the same height. A
//                  faint diagonal pattern echoes the front card's texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 pl-3 pr-2 py-2.5">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* ── Left: signature panel arranged as three clearly divided
//                    sections (matches a real printed ID card): signature box,
//                    then designation text, then QR — each separated by a
//                    thin gold divider instead of one plain empty area. ── */}
//               <div className="relative flex w-[28%] shrink-0 flex-col items-center gap-1.5 rounded-[6px] border border-[#E4D193] bg-[#FAF8EF] px-1.5 py-2">
//                 <div className="flex w-[74%] items-center justify-center rounded-[4px] border border-dashed border-[#94a3b8] bg-[#ffffff] py-1.5">
//                   <div className="h-px w-3/4 bg-[#94a3b8]" />
//                 </div>

//                 <div className="h-px w-full bg-[#E6D69F]" />

//                 <div className="flex shrink-0 flex-col items-center">
//                   <p className="text-center text-[7px] font-extrabold leading-tight tracking-wide text-[#1e293b]">
//                     सहाय्यक आयुक्त
//                   </p>
//                   <p className="text-center text-[6px] leading-tight text-[#64748b]">(स्वाक्षरी)</p>
//                 </div>

//                 <div className="h-px w-full bg-[#E6D69F]" />

//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>
//               </div>

//               {/* ── Right: single-column fields, majority of the back card,
//                    separators reaching almost to the card's right edge. ── */}
//               <div
//                 className="relative grid min-w-0 flex-1 content-between gap-x-1 border-l border-dotted border-[#9DBEAC] pl-2.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {backFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}
//               </div>
//             </div>
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
//   FiCreditCard,
//   FiPhone,
//   FiFlag,
//   FiUsers,
//   FiMapPin,
//   FiCalendar,
//   FiClock,
//   FiBriefcase,
//   FiTag,
//   FiHome,
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
// import { useAuth } from "../../auth/hooks/useAuth";


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
//    dotted underline. Rendered as a Fragment into a shared grid
//    so every ":" lines up in one vertical line regardless of
//    label length. Kept because the two previous design
//    revisions (preserved as comments below) still reference it.

//    wrap (optional): let the value wrap onto multiple lines
//    instead of truncating — used for the address on the back.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[7px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[7px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[7px] font-bold leading-[9px] text-[#1e293b] ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    ICON + LABEL + ":" + DOTTED VALUE — single-column row used
//    on both faces of the current design. Rendered as a Fragment
//    into a shared 4-column grid (icon | label | colon | value)
//    so every row lines up cleanly, with a bigger, more readable
//    type scale than the old dotted-only rows above.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value }) {
//   return (
//     <>
//       <span className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#E7EFEA] text-[#0B5D30]">
//         <Icon size={8.5} />
//       </span>
//       <span className="min-w-0 whitespace-nowrap text-[7.2px] font-semibold leading-[14px] text-[#475569]">{label}</span>
//       <span className="text-[7.2px] font-semibold leading-[14px] text-[#475569]">:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one. */}
//       <span className="min-w-0 whitespace-normal break-words border-b border-dotted border-[#C9A227] pb-[1px] text-[10.3px] font-extrabold leading-[14px] text-[#0f172a]">
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
//   const { user } = useAuth();

//   // two separate faces now — front and back are captured/printed
//   // as two independent images instead of one tall card.
//   const frontRef = useRef(null);
//   const backRef = useRef(null);
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
//      Each face (front / back) is captured separately as a flattened
//      image via html2canvas — same reasoning as before: a flattened
//      image can't be split mid-way by the print engine's pagination,
//      so each face always renders as exactly one page at the exact
//      physical card size (88mm x 58mm — 8.8cm wide, 5.8cm tall).

//      IMPORTANT: because captureFace() screenshots frontRef/backRef —
//      the exact same DOM nodes rendered in the on-screen preview below —
//      Print and Download will ALWAYS visually match the preview exactly.
//      There is no separate print-only or PDF-only markup anywhere in
//      this file, so any future visual change made to the preview JSX
//      automatically carries through to Print and PDF with zero extra
//      work. Nothing further was needed to satisfy "print/download made
//      same as preview" — it was already guaranteed by this capture
//      approach.

//      COLOR PARITY FIX: a couple of utilities on this card still resolve
//      their final color through nested CSS custom properties — e.g.
//      `ring-1 ring-inset ring-[#DFC77D]` builds its box-shadow out of
//      --tw-ring-color/--tw-ring-inset/--tw-ring-shadow, and the diagonal
//      texture / border-radius / border colors are likewise resolved by
//      the browser via cascade + custom properties. html2canvas-pro parses
//      styles with its own CSS engine and doesn't always resolve those
//      var() chains identically to the real browser, which is what made
//      the ring/gradient/border tones look slightly different in the
//      captured output even after switching the header gradients to plain
//      inline `background`. flattenComputedStyles() walks the live,
//      on-screen DOM (already fully resolved by the browser's own
//      getComputedStyle) and copies the literal final values onto the
//      cloned nodes html2canvas is about to rasterize, so nothing is left
//      for html2canvas to mis-resolve. No JSX/classNames/UI change — this
//      only touches the capture step inside captureFace(). */

//   // NOTE: "boxShadow" is intentionally NOT in this list. Tailwind's ring
//   // utilities (ring-1 ring-inset ring-[#...]) resolve to 2-3 stacked
//   // inset box-shadows in one computed value. html2canvas-pro cannot
//   // reliably rasterize multiple stacked inset shadows — instead of a
//   // thin 1px ring it was painting a solid fill in the ring color across
//   // the whole card (the gold/tan fill seen in print preview). Leaving
//   // boxShadow unflattened lets html2canvas parse the original Tailwind
//   // CSS itself, which renders the ring correctly as a thin border.
//   const STYLE_PROPS_TO_FLATTEN = [
//     "backgroundImage",
//     "backgroundColor",
//     "backgroundClip",
//     "WebkitBackgroundClip",
//     "backgroundPosition",
//     "backgroundSize",
//     "backgroundRepeat",
//     "color",
//     "borderTopColor",
//     "borderRightColor",
//     "borderBottomColor",
//     "borderLeftColor",
//     "borderTopWidth",
//     "borderRightWidth",
//     "borderBottomWidth",
//     "borderLeftWidth",
//     "borderTopLeftRadius",
//     "borderTopRightRadius",
//     "borderBottomLeftRadius",
//     "borderBottomRightRadius",
//     "borderStyle",
//     "opacity",
//     "fill",
//     "stroke",
//   ];

//   // Recursively copies each source element's fully-resolved computed
//   // style onto the matching cloned element (same tree shape, since the
//   // clone is a straight DOM clone of ref.current), so html2canvas
//   // rasterizes literal values instead of re-resolving Tailwind's
//   // CSS-variable-based gradients/rings/shadows itself.
//   //
//   // IMPORTANT: this must NEVER throw. html2canvas-pro's onclone hook does
//   // not reject its outer promise if the callback throws synchronously —
//   // it simply hangs forever, which is what left Print/Download stuck on
//   // "Preparing..." permanently. Every risky step below is wrapped so a
//   // single bad node (SVG child, missing style prop, mismatched clone,
//   // etc.) can only skip that one step and never abort the whole capture.
//   const flattenComputedStyles = (sourceEl, targetEl) => {
//     try {
//       if (!sourceEl || !targetEl || sourceEl.nodeType !== 1 || targetEl.nodeType !== 1) return;

//       let computed;
//       try {
//         computed = window.getComputedStyle(sourceEl);
//       } catch {
//         return; // can't read styles for this node — leave it as-is, move on
//       }

//       STYLE_PROPS_TO_FLATTEN.forEach((prop) => {
//         try {
//           const value = computed[prop];
//           if (value) targetEl.style[prop] = value;
//         } catch {
//           // unsupported/read-only property on this element — skip safely
//         }
//       });

//       const sourceChildren = sourceEl.children || [];
//       const targetChildren = targetEl.children || [];
//       const count = Math.min(sourceChildren.length, targetChildren.length);
//       for (let i = 0; i < count; i++) {
//         flattenComputedStyles(sourceChildren[i], targetChildren[i]);
//       }
//     } catch {
//       // absolute last-resort guard — never let this function throw upward
//     }
//   };

//   // Wraps a promise so it can never hang the UI forever: resolves with
//   // whatever the promise settles with, or rejects after `ms` if it never
//   // settles, so the calling button always returns to its normal state.
//   const withTimeout = (promise, ms, label) =>
//     new Promise((resolve, reject) => {
//       const timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
//       promise.then(
//         (value) => {
//           clearTimeout(timer);
//           resolve(value);
//         },
//         (err) => {
//           clearTimeout(timer);
//           reject(err);
//         }
//       );
//     });

//   const CARD_WIDTH_MM = 88;
//   const CARD_HEIGHT_MM = 58;
//   const PREVIEW_SCALE = 4.3; // px-per-mm, on-screen preview only

//   const captureFace = async (ref) => {
//     if (!ref.current) return null;

//     // Make sure the Devanagari + Latin webfonts are fully loaded before
//     // rasterizing, so text weight/rendering also matches the screen.
//     // Capped at 3s so a font that never resolves can't stall export.
//     if (document.fonts && document.fonts.ready) {
//       try {
//         await withTimeout(document.fonts.ready, 3000, "Font load");
//       } catch {
//         // proceed with capture regardless — better a slightly-late font
//         // than a permanently stuck button
//       }
//     }

//     return withTimeout(
//       html2canvas(ref.current, {
//         scale: 4, // high-res so print/PDF output stays crisp at this small size
//         useCORS: true,
//         allowTaint: true,
//         backgroundColor: "#ffffff",
//         foreignObjectRendering: false,
//         imageTimeout: 0,
//         logging: false,
//         onclone: (_clonedDoc, clonedElement) => {
//           // clonedElement corresponds 1:1 to ref.current — flatten computed
//           // styles from the real, on-screen node onto its clone so every
//           // gradient/ring/shadow/border color matches the screen exactly.
//           // Fully defensive — see comment on flattenComputedStyles above.
//           flattenComputedStyles(ref.current, clonedElement);
//         },
//       }),
//       15000,
//       "Card capture"
//     );
//   };

//   const handlePrint = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Card.");
//         return;
//       }
//       printWindow.document.write(
//         "<html><head><title>Smart Card</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; }" +
//           ".page { page-break-after: always; }" +
//           ".page:last-child { page-break-after: auto; }" +
//           "</style></head><body>" +
//           "<div class=\"page\"><img src=\"" + frontData + "\" /></div>" +
//           "<div class=\"page\"><img src=\"" + backData + "\" /></div>" +
//           "</body></html>"
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
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
//       pdf.addImage(backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
//     } catch (err) {
//       console.error("Smart card download failed:", err);
//       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   /* ==================== NOT AUTHORIZED (29-10 request) — only A.M.C./super_admin
//      can generate OR view the Smart Card. counter_officer, survey_officer and vendor
//      must not see this page at all, even by direct link. ==================== */

//   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
//         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
//         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           Back to Dashboard
//         </Link>
//       </Card>
//     );
//   }

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

//   /* ==================== CARD FIELDS ====================
//      Front (next to photo): id no, name, gender, mobile, ward, validity.
//      Back (next to signature+QR): dob/age, business type, vendor type,
//      vending zone, business timing, address.
//      — exact same 6 + 6 fields, same order, same data as before;
//      only an icon is attached per row for the new layout. */

//   const frontFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const backFields = [
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.address.zone },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { icon: FiHome, label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
//   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

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

//       {/* ================= CARD PREVIEW — front & back, side by side ================= */}
//       <div className="flex flex-wrap items-start justify-center gap-10 px-1 py-6">

//         {/* ---------- FRONT ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Front</p>
//           <div
//             ref={frontRef}
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)] ring-1 ring-inset ring-[#DFC77D]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name, with a subtle gold decorative wave along the bottom
//                  edge (matches the reference card's curved accent). ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-2.5 pl-3.5 pr-3 pt-3 pb-2.5"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[14px] w-full opacity-65"
//                 viewBox="0 0 380 14"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 10 Q95 0 190 8 T380 6" fill="none" stroke="#C9A227" strokeWidth="1" />
//                 <path d="M0 13 Q95 4 190 12 T380 10" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//               </svg>
//               <img
//                 src={logo}
//                 alt="VVCMC"
//                 className="h-10 w-10 shrink-0 rounded-full border-2 border-[#C9A227] bg-[#ffffff] object-contain p-[1.5px]"
//               />

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits. ── */}
//               <div className="min-w-0 space-y-[6px] leading-tight">
//                 <p className="whitespace-nowrap text-[10px] font-black uppercase tracking-wide text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[10px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — photo ~29% width
//                  (sized to ~57% of the body's height, vertically centered),
//                  right column ~71% width holding the title at top and the
//                  six fields below, spread with content-between so there is
//                  no leftover blank space. A very faint diagonal pattern
//                  sits behind the whole body for a premium printed-card
//                  texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 px-3 pb-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />
//               <div className="relative flex w-[29%] shrink-0 items-center justify-center">
//                 <div className="h-[57%] w-full overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={30} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="relative flex min-w-0 flex-1 flex-col">
//                 {/* ── Title, integrated at the top of the information
//                      column instead of a separate centered block, so it no
//                      longer creates isolated empty space. ── */}
//                 <div className="shrink-0 pb-1.5 pt-1.5">
//                   <h2 className="text-[15.3px] font-black leading-tight tracking-tight text-[#0B5D30]">
//                     रस्ता विक्रेता ओळखपत्र
//                   </h2>
//                   <p className="text-[6.5px] font-semibold italic leading-tight text-[#B9861C]">
//                     (Street Vendor Identity Card)
//                   </p>
//                   <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//                 </div>

//                 <div
//                   className="grid flex-1 content-between gap-x-1"
//                   style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//                 >
//                   {frontFields.map((f) => (
//                     <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)] ring-1 ring-inset ring-[#DFC77D]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── green/gold header strip — ~14% of card height, same wave
//                  treatment as the front so both faces read as one card ── */}
//             <div
//               className="relative h-[34px] w-full shrink-0 overflow-hidden"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[12px] w-full opacity-65"
//                 viewBox="0 0 380 12"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 8 Q95 0 190 6 T380 5" fill="none" stroke="#C9A227" strokeWidth="1" />
//                 <path d="M0 11 Q95 3 190 10 T380 8" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//               </svg>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — signature+QR
//                  column ~28% width, fields ~72% width, no leftover blank
//                  space since both columns stretch to the same height. A
//                  faint diagonal pattern echoes the front card's texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 pl-3 pr-2 py-2.5">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* ── Left: signature panel arranged as three clearly divided
//                    sections (matches a real printed ID card): signature box,
//                    then designation text, then QR — each separated by a
//                    thin gold divider instead of one plain empty area. ── */}
//               <div className="relative flex w-[28%] shrink-0 flex-col items-center gap-1.5 rounded-[6px] border border-[#E4D193] bg-[#FAF8EF] px-1.5 py-2">
//                 <div className="flex w-[74%] items-center justify-center rounded-[4px] border border-dashed border-[#94a3b8] bg-[#ffffff] py-1.5">
//                   <div className="h-px w-3/4 bg-[#94a3b8]" />
//                 </div>

//                 <div className="h-px w-full bg-[#E6D69F]" />

//                 <div className="flex shrink-0 flex-col items-center">
//                   <p className="text-center text-[7px] font-extrabold leading-tight tracking-wide text-[#1e293b]">
//                     सहाय्यक आयुक्त
//                   </p>
//                   <p className="text-center text-[6px] leading-tight text-[#64748b]">(स्वाक्षरी)</p>
//                 </div>

//                 <div className="h-px w-full bg-[#E6D69F]" />

//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>
//               </div>

//               {/* ── Right: single-column fields, majority of the back card,
//                    separators reaching almost to the card's right edge. ── */}
//               <div
//                 className="relative grid min-w-0 flex-1 content-between gap-x-1 border-l border-dotted border-[#9DBEAC] pl-2.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {backFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}
//               </div>
//             </div>
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
//   FiCreditCard,
//   FiPhone,
//   FiFlag,
//   FiUsers,
//   FiMapPin,
//   FiCalendar,
//   FiClock,
//   FiBriefcase,
//   FiTag,
//   FiHome,
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
// import { useAuth } from "../../auth/hooks/useAuth";


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
//    dotted underline. Rendered as a Fragment into a shared grid
//    so every ":" lines up in one vertical line regardless of
//    label length. Kept because the two previous design
//    revisions (preserved as comments below) still reference it.

//    wrap (optional): let the value wrap onto multiple lines
//    instead of truncating — used for the address on the back.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[7px] font-bold leading-[9px] text-slate-800">{label}</span>
//       <span className="text-[7px] font-bold leading-[9px] text-slate-800">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-slate-500 pb-[0.5px] text-[7px] font-bold leading-[9px] text-slate-800 ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    ICON + LABEL + ":" + DOTTED VALUE — single-column row used
//    on both faces of the current design. Rendered as a Fragment
//    into a shared 4-column grid (icon | label | colon | value)
//    so every row lines up cleanly, with a bigger, more readable
//    type scale than the old dotted-only rows above.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value }) {
//   return (
//     <>
//       <span className="mt-[1px] flex h-[12px] w-[12px] shrink-0 items-center justify-center rounded-full bg-[#0B5D30]/10 text-[#0B5D30]">
//         <Icon size={7} />
//       </span>
//       <span className="min-w-0 whitespace-nowrap text-[6px] font-semibold leading-[11px] text-slate-600">{label}</span>
//       <span className="text-[6px] font-semibold leading-[11px] text-slate-600">:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one. */}
//       <span className="min-w-0 whitespace-normal break-words border-b border-dotted border-[#C9A227] pb-[1px] text-[9px] font-extrabold leading-[11px] text-slate-900">
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
//   const { user } = useAuth();

//   // two separate faces now — front and back are captured/printed
//   // as two independent images instead of one tall card.
//   const frontRef = useRef(null);
//   const backRef = useRef(null);
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
//      Each face (front / back) is captured separately as a flattened
//      image via html2canvas — same reasoning as before: a flattened
//      image can't be split mid-way by the print engine's pagination,
//      so each face always renders as exactly one page at the exact
//      physical card size (88mm x 58mm — 8.8cm wide, 5.8cm tall). */

//   const CARD_WIDTH_MM = 88;
//   const CARD_HEIGHT_MM = 58;
//   const PREVIEW_SCALE = 4.3; // px-per-mm, on-screen preview only

//   const captureFace = async (ref) => {
//     if (!ref.current) return null;
//     return html2canvas(ref.current, {
//       scale: 4, // high-res so print/PDF output stays crisp at this small size
//       useCORS: true,
//       backgroundColor: "#ffffff",
//     });
//   };

//   const handlePrint = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Card.");
//         return;
//       }
//       printWindow.document.write(
//         "<html><head><title>Smart Card</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0; }" +
//           "html, body { margin: 0; padding: 0; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; }" +
//           ".page { page-break-after: always; }" +
//           ".page:last-child { page-break-after: auto; }" +
//           "</style></head><body>" +
//           "<div class=\"page\"><img src=\"" + frontData + "\" /></div>" +
//           "<div class=\"page\"><img src=\"" + backData + "\" /></div>" +
//           "</body></html>"
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
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
//       pdf.addImage(backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
//     } catch (err) {
//       console.error("Smart card download failed:", err);
//       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   /* ==================== NOT AUTHORIZED (29-10 request) — only A.M.C./super_admin
//      can generate OR view the Smart Card. counter_officer, survey_officer and vendor
//      must not see this page at all, even by direct link. ==================== */

//   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
//         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
//         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           Back to Dashboard
//         </Link>
//       </Card>
//     );
//   }

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

//   /* ==================== CARD FIELDS ====================
//      Front (next to photo): id no, name, gender, mobile, ward, validity.
//      Back (next to signature+QR): dob/age, business type, vendor type,
//      vending zone, business timing, address.
//      — exact same 6 + 6 fields, same order, same data as before;
//      only an icon is attached per row for the new layout. */

//   const frontFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const backFields = [
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.address.zone },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { icon: FiHome, label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
//   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

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

//       {/* ================= CARD PREVIEW — front & back, side by side ================= */}
//       <div className="flex flex-wrap items-start justify-center gap-10 px-1 py-6">

//         {/* ---------- FRONT ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Front</p>
//           <div
//             ref={frontRef}
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_2px_10px_rgba(11,93,48,0.25)] ring-1 ring-inset ring-[#C9A227]/60"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name, with a subtle gold decorative wave along the bottom
//                  edge (matches the reference card's curved accent). ── */}
//             <div className="relative flex shrink-0 items-center gap-2.5 overflow-hidden bg-gradient-to-r from-[#0B5D30] to-[#123f27] px-3 py-2.5">
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[14px] w-full opacity-40"
//                 viewBox="0 0 380 14"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 10 Q95 0 190 8 T380 6" fill="none" stroke="#C9A227" strokeWidth="1.4" />
//                 <path d="M0 13 Q95 4 190 12 T380 10" fill="none" stroke="#F2D98A" strokeWidth="0.8" />
//               </svg>
//               <img
//                 src={logo}
//                 alt="VVCMC"
//                 className="h-10 w-10 shrink-0 rounded-full border-2 border-[#C9A227] bg-white object-contain p-[1.5px]"
//               />
//               <div className="min-w-0 leading-tight">
//                 <p className="truncate text-[10px] font-black uppercase tracking-wide text-white">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="truncate text-[9.5px] font-semibold text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — photo ~27% width
//                  (sized to ~68% of the body's height, vertically centered),
//                  right column ~73% width holding the title at top and the
//                  six fields below, spread with content-between so there is
//                  no leftover blank space. A very faint diagonal pattern
//                  sits behind the whole body for a premium printed-card
//                  texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 px-3 pb-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, #0B5D30 0px, #0B5D30 1px, transparent 1px, transparent 12px)",
//                   opacity: 0.035,
//                 }}
//               />
//               <div className="relative flex w-[26%] shrink-0 items-center justify-center">
//                 <div className="h-[62%] w-full overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-slate-50 shadow-[0_0_0_1.5px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={30} strokeWidth={1.2} className="text-slate-300" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="relative flex min-w-0 flex-1 flex-col">
//                 {/* ── Title, now integrated at the top of the information
//                      column instead of a separate centered block, so it no
//                      longer creates isolated empty space. ── */}
//                 <div className="shrink-0 pb-1.5 pt-1.5">
//                   <h2 className="text-[13px] font-black leading-tight text-[#0B5D30]">
//                     रस्ता विक्रेता ओळखपत्र
//                   </h2>
//                   <p className="text-[6.5px] font-semibold italic leading-tight text-[#B9861C]">
//                     (Street Vendor Identity Card)
//                   </p>
//                   <div className="mt-1 h-px w-full bg-[#C9A227]/70" />
//                 </div>

//                 <div
//                   className="grid flex-1 content-between gap-x-1"
//                   style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//                 >
//                   {frontFields.map((f) => (
//                     <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_2px_10px_rgba(11,93,48,0.2)] ring-1 ring-inset ring-[#C9A227]/60"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── green/gold header strip — ~14% of card height, same wave
//                  treatment as the front so both faces read as one card ── */}
//             <div className="relative h-[34px] w-full shrink-0 overflow-hidden bg-gradient-to-r from-[#0B5D30] to-[#123f27]">
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[12px] w-full opacity-40"
//                 viewBox="0 0 380 12"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 8 Q95 0 190 6 T380 5" fill="none" stroke="#C9A227" strokeWidth="1.4" />
//                 <path d="M0 11 Q95 3 190 10 T380 8" fill="none" stroke="#F2D98A" strokeWidth="0.8" />
//               </svg>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — signature+QR
//                  column ~28% width, fields ~72% width, no leftover blank
//                  space since both columns stretch to the same height. A
//                  faint diagonal pattern echoes the front card's texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 pl-3 pr-2 py-2.5">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, #0B5D30 0px, #0B5D30 1px, transparent 1px, transparent 12px)",
//                   opacity: 0.035,
//                 }}
//               />

//               {/* ── Left: ONE cohesive verification/signature panel — a
//                    single bordered, lightly-tinted container. Signature sits
//                    at the TOP as its own compact bordered box (~72% of the
//                    panel's width), QR sits directly below it. ── */}
//               <div className="relative flex w-[28%] shrink-0 flex-col items-center gap-2 rounded-[6px] border border-[#C9A227]/50 bg-[#FAF8EF] px-1.5 py-2">
//                 <div className="flex w-full shrink-0 flex-col items-center gap-1">
//                   <div className="flex w-[72%] items-center justify-center rounded-[4px] border border-dashed border-slate-400 bg-white/70 py-2">
//                     <div className="h-px w-3/4 bg-slate-400" />
//                   </div>
//                   <p className="text-center text-[7px] font-extrabold leading-tight tracking-wide text-slate-800">
//                     सहाय्यक आयुक्त
//                   </p>
//                   <p className="text-center text-[6px] leading-tight text-slate-500">(स्वाक्षरी)</p>
//                 </div>

//                 <div className="h-px w-full bg-[#C9A227]/40" />

//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-white p-1 shadow-[0_0_0_1.5px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={74} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>
//               </div>

//               {/* ── Right: single-column fields, majority of the back card,
//                    separators reaching almost to the card's right edge. ── */}
//               <div
//                 className="relative grid min-w-0 flex-1 content-between gap-x-1 border-l border-dotted border-[#0B5D30]/40 pl-2.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {backFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}
//               </div>
//             </div>
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

// /* =========================================================
//    PREVIOUS LAYOUT #2 (icon-grid 2x4 front + Security Features /
//    Terms & Conditions / Vending Zone map / Signature / QR +
//    VERIFIED badge on the back) — kept here per project policy of
//    never deleting old code, only commenting it out. Superseded
//    because the brief explicitly excluded the Security Features /
//    Terms & Conditions / Zone map / Card Issue Status sections and
//    asked for a single-column icon+label+colon+value layout with
//    larger, more readable text instead. Only the JSX/markup
//    differed from the current version — data fetching, auth,
//    PDF/print logic were identical and are not duplicated here.

//   See the previously delivered SmartCard.jsx (or git history) for
//   the full icon-grid + Security Features / Terms & Conditions /
//   Vending Zone / VERIFIED-badge markup if it ever needs to be
//   restored.
// ========================================================= */

// /* =========================================================
//    PREVIOUS LAYOUT #1 (dotted "label : value" style, no icons,
//    photo beside fields on front, signature+QR beside fields on
//    back — the very first 88mm x 58mm two-face design) — kept
//    here per project policy of never deleting old code, only
//    commenting it out.

//   const frontFieldsOld = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
//     { label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { label: "प्रभाग / ward", value: vendor.address.ward },
//     { label: "ओळखपत्र वैधता", value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}` },
//   ];

//   const backFieldsOld = [
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { label: "विक्रीचे ठिकाण", value: vendor.address.zone },
//     { label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     { label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   <div
//     ref={frontRef}
//     className="smart-card-front relative flex flex-col overflow-hidden"
//     style={{
//       width: `${CARD_W_PX}px`,
//       height: `${CARD_H_PX}px`,
//       backgroundImage: `url(${vvcmccardbg})`,
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "center",
//       backgroundSize: "100% 100%",
//     }}
//   >
//     <div className="flex flex-row items-center gap-1.5 px-2.5 pt-1.5">
//       <img src={logo} alt="VVCMC" className="h-6 w-6 shrink-0 rounded-full border border-white bg-white object-contain p-[1px]" />
//       <p className="flex-1 text-left text-[8px] font-bold leading-[9px] text-white drop-shadow-sm">वसई-विरार शहर महानगरपालिका</p>
//     </div>
//     <div className="flex flex-col items-center gap-0.5 px-2 pb-0.5 pt-1">
//       <h2 className="text-center text-[9px] font-black leading-tight text-[#0B5D30]">रस्ता विक्रेता ओळखपत्र</h2>
//       <p className="text-center text-[6px] font-semibold italic text-[#B9861C]">(Street Vendor Identity Card)</p>
//       <div className="mt-0.5 h-px w-16 bg-[#C9A227]" />
//     </div>
//     <div className="flex flex-1 items-start gap-2 px-2.5 pb-1.5 pt-1">
//       <div className="flex h-[54px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-sm border-2 border-[#0B5D30] bg-white">
//         {vendor.documents?.photo ? (
//           <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//         ) : (
//           <FiUser size={20} strokeWidth={1.2} className="text-slate-300" />
//         )}
//       </div>
//       <div className="grid min-w-0 flex-1 gap-y-[2px] gap-x-1" style={{ gridTemplateColumns: "max-content max-content 1fr" }}>
//         {frontFieldsOld.map((f) => (
//           <CardField key={f.label} label={f.label} value={f.value} />
//         ))}
//       </div>
//     </div>
//   </div>

//   <div
//     ref={backRef}
//     className="smart-card-back relative flex flex-col overflow-hidden bg-white"
//     style={{ width: `${CARD_W_PX}px`, height: `${CARD_H_PX}px`, border: "1px solid #C9A227" }}
//   >
//     <div className="flex flex-1 gap-2 p-2.5">
//       <div className="flex w-[64px] shrink-0 flex-col items-center justify-between">
//         <div className="flex flex-col items-center gap-0.5 pt-1">
//           <div className="h-px w-12 bg-slate-500" />
//           <p className="text-center text-[6px] font-extrabold leading-tight tracking-wide text-slate-800">सहाय्यक आयुक्त</p>
//           <p className="text-center text-[5px] leading-tight text-slate-500">(स्वाक्षरी)</p>
//         </div>
//         <Link to={`/verify/${vendor.applicationNo}`} className="flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-sm border-2 border-slate-800 bg-white p-0.5 transition-transform hover:scale-[1.03]">
//           <QRCodeSVG value={verifyUrl} size={48} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//         </Link>
//       </div>
//       <div className="grid min-w-0 flex-1 content-start gap-y-[3px] gap-x-1 border-l border-dotted border-slate-300 pl-2" style={{ gridTemplateColumns: "max-content max-content 1fr" }}>
//         {backFieldsOld.map((f) => (
//           <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//         ))}
//       </div>
//     </div>
//   </div>

// ========================================================= */

// /* =========================================================
//    OLD LAYOUT (single tall vertical card, front-only) — kept
//    here per project policy of never deleting old code, only
//    commenting it out. Not used anymore; superseded by the
//    front/back 88mm x 58mm layouts above.

// export default function SmartCard_OLD() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const cardRef = useRef(null);
//   const [isExporting, setIsExporting] = useState(false);

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

//   const verifyUrl = useMemo(() => {
//     if (certificate?.qrCodeData) return certificate.qrCodeData;
//     if (!vendor) return "";
//     return `${window.location.origin}/verify/${vendor.applicationNo}`;
//   }, [vendor, certificate]);

//   const cardCode = certificate?.certificateNo || "";

//   const CARD_WIDTH_MM = 100;

//   const captureCardCanvas = async () => {
//     if (!cardRef.current) return null;
//     return html2canvas(cardRef.current, {
//       scale: 3,
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

//   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
//         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
//         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           Back to Dashboard
//         </Link>
//       </Card>
//     );
//   }

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
//           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
//         </p>
//         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           View Vendor Profile
//         </Link>
//       </Card>
//     );
//   }

//   const cardFields = [
//     { label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { label: "जन्मतारीख / वय", value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे` },
//     { label: "लिंग", value: genderType(vendor.personal.gender) },
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

//   return (
//     <div className="space-y-5">
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

//           <div className="flex flex-col items-center gap-0.5 px-6 pb-1 pt-2 mt-6">
//             <h2 className="text-center text-[13.5px] font-black leading-tight text-[#0B5D30]">
//               रस्ता विक्रेता ओळखपत्र
//             </h2>
//             <p className="text-center text-[9.5px] font-semibold italic text-[#B9861C]">
//               (Street Vendor Identity Card)
//             </p>
//             <div className="mt-1 h-px w-28 bg-[#C9A227]" />
//           </div>

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

//           <div
//             className="grid gap-y-[5px] gap-x-1.5 px-5 pb-2 pt-1"
//             style={{ gridTemplateColumns: "max-content max-content 1fr" }}
//           >
//             {cardFields.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}

//             <div className="col-span-3 h-0" />

//             {cardFields2.map((f) => (
//               <CardField key={f.label} label={f.label} value={f.value} wrap={f.wrap} />
//             ))}
//           </div>

//           <div className="mt-auto flex flex-col items-center gap-1 pb-2 pt-1">
//             <div className="h-px w-32 bg-slate-500" />
//             <p className="text-[12px] font-extrabold tracking-wide text-slate-800">सहाय्यक आयुक्त</p>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
//           Open Verification Screen
//         </Button>
//       </div>
//     </div>
//   );
// }
// ========================================================= */


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
//   FiCreditCard,
//   FiPhone,
//   FiFlag,
//   FiUsers,
//   FiMapPin,
//   FiCalendar,
//   FiClock,
//   FiBriefcase,
//   FiTag,
//   FiHome,
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
// import { useAuth } from "../../auth/hooks/useAuth";


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
//    dotted underline. Rendered as a Fragment into a shared grid
//    so every ":" lines up in one vertical line regardless of
//    label length. Kept because the two previous design
//    revisions (preserved as comments below) still reference it.

//    wrap (optional): let the value wrap onto multiple lines
//    instead of truncating — used for the address on the back.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[7px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[7px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[7px] font-bold leading-[9px] text-[#1e293b] ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    ICON + LABEL + ":" + DOTTED VALUE — single-column row used
//    on both faces of the current design. Rendered as a Fragment
//    into a shared 4-column grid (icon | label | colon | value)
//    so every row lines up cleanly, with a bigger, more readable
//    type scale than the old dotted-only rows above.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value }) {
//   return (
//     <>
//       <span className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#E7EFEA] text-[#0B5D30]">
//         <Icon size={8.5} />
//       </span>
//       <span className="min-w-0 whitespace-nowrap text-[7.2px] font-semibold leading-[14px] text-[#475569]">{label}</span>
//       <span className="text-[7.2px] font-semibold leading-[14px] text-[#475569]">:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one. */}
//       <span className="min-w-0 whitespace-normal break-words border-b border-dotted border-[#C9A227] pb-[1px] text-[10.3px] font-extrabold leading-[14px] text-[#0f172a]">
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
//   const { user } = useAuth();

//   // two separate faces now — front and back are captured/printed
//   // as two independent images instead of one tall card.
//   const frontRef = useRef(null);
//   const backRef = useRef(null);
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
//      Each face (front / back) is captured separately as a flattened
//      image via html2canvas — same reasoning as before: a flattened
//      image can't be split mid-way by the print engine's pagination,
//      so each face always renders as exactly one page at the exact
//      physical card size (88mm x 58mm — 8.8cm wide, 5.8cm tall).

//      IMPORTANT: because captureFace() screenshots frontRef/backRef —
//      the exact same DOM nodes rendered in the on-screen preview below —
//      Print and Download will ALWAYS visually match the preview exactly.
//      There is no separate print-only or PDF-only markup anywhere in
//      this file, so any future visual change made to the preview JSX
//      automatically carries through to Print and PDF with zero extra
//      work. Nothing further was needed to satisfy "print/download made
//      same as preview" — it was already guaranteed by this capture
//      approach. */

//   const CARD_WIDTH_MM = 88;
//   const CARD_HEIGHT_MM = 58;
//   const PREVIEW_SCALE = 4.3; // px-per-mm, on-screen preview only

//   const captureFace = async (ref) => {
//     if (!ref.current) return null;
//     return html2canvas(ref.current, {
//       scale: 4, // high-res so print/PDF output stays crisp at this small size
//       useCORS: true,
//       backgroundColor: "#ffffff",
//     });
//   };

//   const handlePrint = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Card.");
//         return;
//       }
//       printWindow.document.write(
//         "<html><head><title>Smart Card</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0; }" +
//           "html, body { margin: 0; padding: 0; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; }" +
//           ".page { page-break-after: always; }" +
//           ".page:last-child { page-break-after: auto; }" +
//           "</style></head><body>" +
//           "<div class=\"page\"><img src=\"" + frontData + "\" /></div>" +
//           "<div class=\"page\"><img src=\"" + backData + "\" /></div>" +
//           "</body></html>"
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
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
//       pdf.addImage(backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
//     } catch (err) {
//       console.error("Smart card download failed:", err);
//       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   /* ==================== NOT AUTHORIZED (29-10 request) — only A.M.C./super_admin
//      can generate OR view the Smart Card. counter_officer, survey_officer and vendor
//      must not see this page at all, even by direct link. ==================== */

//   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
//         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
//         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           Back to Dashboard
//         </Link>
//       </Card>
//     );
//   }

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

//   /* ==================== CARD FIELDS ====================
//      Front (next to photo): id no, name, gender, mobile, ward, validity.
//      Back (next to signature+QR): dob/age, business type, vendor type,
//      vending zone, business timing, address.
//      — exact same 6 + 6 fields, same order, same data as before;
//      only an icon is attached per row for the new layout. */

//   const frontFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const backFields = [
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.address.zone },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { icon: FiHome, label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
//   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

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

//       {/* ================= CARD PREVIEW — front & back, side by side ================= */}
//       <div className="flex flex-wrap items-start justify-center gap-10 px-1 py-6">

//         {/* ---------- FRONT ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Front</p>
//           <div
//             ref={frontRef}
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)] ring-1 ring-inset ring-[#DFC77D]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name, with a subtle gold decorative wave along the bottom
//                  edge (matches the reference card's curved accent). ── */}
//             <div className="relative flex shrink-0 items-center gap-2.5 bg-gradient-to-r from-[#0c6636] via-[#0e4a26] to-[#0f3620] pl-3.5 pr-3 pt-3 pb-2.5">
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[14px] w-full opacity-65"
//                 viewBox="0 0 380 14"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 10 Q95 0 190 8 T380 6" fill="none" stroke="#C9A227" strokeWidth="1" />
//                 <path d="M0 13 Q95 4 190 12 T380 10" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//               </svg>
//               <img
//                 src={logo}
//                 alt="VVCMC"
//                 className="h-10 w-10 shrink-0 rounded-full border-2 border-[#C9A227] bg-[#ffffff] object-contain p-[1.5px]"
//               />

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits. ── */}
//               <div className="min-w-0 space-y-[6px] leading-tight">
//                 <p className="whitespace-nowrap text-[10px] font-black uppercase tracking-wide text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[10px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — photo ~29% width
//                  (sized to ~57% of the body's height, vertically centered),
//                  right column ~71% width holding the title at top and the
//                  six fields below, spread with content-between so there is
//                  no leftover blank space. A very faint diagonal pattern
//                  sits behind the whole body for a premium printed-card
//                  texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 px-3 pb-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, #0B5D30 0px, #0B5D30 1px, transparent 1px, transparent 12px)",
//                   opacity: 0.025,
//                 }}
//               />
//               <div className="relative flex w-[29%] shrink-0 items-center justify-center">
//                 <div className="h-[57%] w-full overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={30} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="relative flex min-w-0 flex-1 flex-col">
//                 {/* ── Title, integrated at the top of the information
//                      column instead of a separate centered block, so it no
//                      longer creates isolated empty space. ── */}
//                 <div className="shrink-0 pb-1.5 pt-1.5">
//                   <h2 className="text-[15.3px] font-black leading-tight tracking-tight text-[#0B5D30]">
//                     रस्ता विक्रेता ओळखपत्र
//                   </h2>
//                   <p className="text-[6.5px] font-semibold italic leading-tight text-[#B9861C]">
//                     (Street Vendor Identity Card)
//                   </p>
//                   <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//                 </div>

//                 <div
//                   className="grid flex-1 content-between gap-x-1"
//                   style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//                 >
//                   {frontFields.map((f) => (
//                     <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)] ring-1 ring-inset ring-[#DFC77D]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── green/gold header strip — ~14% of card height, same wave
//                  treatment as the front so both faces read as one card ── */}
//             <div className="relative h-[34px] w-full shrink-0 overflow-hidden bg-gradient-to-r from-[#0c6636] via-[#0e4a26] to-[#0f3620]">
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[12px] w-full opacity-65"
//                 viewBox="0 0 380 12"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 8 Q95 0 190 6 T380 5" fill="none" stroke="#C9A227" strokeWidth="1" />
//                 <path d="M0 11 Q95 3 190 10 T380 8" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//               </svg>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — signature+QR
//                  column ~28% width, fields ~72% width, no leftover blank
//                  space since both columns stretch to the same height. A
//                  faint diagonal pattern echoes the front card's texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 pl-3 pr-2 py-2.5">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, #0B5D30 0px, #0B5D30 1px, transparent 1px, transparent 12px)",
//                   opacity: 0.025,
//                 }}
//               />

//               {/* ── Left: signature panel arranged as three clearly divided
//                    sections (matches a real printed ID card): signature box,
//                    then designation text, then QR — each separated by a
//                    thin gold divider instead of one plain empty area. ── */}
//               <div className="relative flex w-[28%] shrink-0 flex-col items-center gap-1.5 rounded-[6px] border border-[#E4D193] bg-[#FAF8EF] px-1.5 py-2">
//                 <div className="flex w-[74%] items-center justify-center rounded-[4px] border border-dashed border-[#94a3b8] bg-[#ffffff] py-1.5">
//                   <div className="h-px w-3/4 bg-[#94a3b8]" />
//                 </div>

//                 <div className="h-px w-full bg-[#E6D69F]" />

//                 <div className="flex shrink-0 flex-col items-center">
//                   <p className="text-center text-[7px] font-extrabold leading-tight tracking-wide text-[#1e293b]">
//                     सहाय्यक आयुक्त
//                   </p>
//                   <p className="text-center text-[6px] leading-tight text-[#64748b]">(स्वाक्षरी)</p>
//                 </div>

//                 <div className="h-px w-full bg-[#E6D69F]" />

//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>
//               </div>

//               {/* ── Right: single-column fields, majority of the back card,
//                    separators reaching almost to the card's right edge. ── */}
//               <div
//                 className="relative grid min-w-0 flex-1 content-between gap-x-1 border-l border-dotted border-[#9DBEAC] pl-2.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {backFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}
//               </div>
//             </div>
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
//   FiCreditCard,
//   FiPhone,
//   FiFlag,
//   FiUsers,
//   FiMapPin,
//   FiCalendar,
//   FiClock,
//   FiBriefcase,
//   FiTag,
//   FiHome,
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
// import { useAuth } from "../../auth/hooks/useAuth";


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
//    dotted underline. Rendered as a Fragment into a shared grid
//    so every ":" lines up in one vertical line regardless of
//    label length. Kept because the two previous design
//    revisions (preserved as comments below) still reference it.

//    wrap (optional): let the value wrap onto multiple lines
//    instead of truncating — used for the address on the back.
// ========================================================= */

// function CardField({ label, value, wrap = false }) {
//   return (
//     <>
//       <span className="text-[7px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[7px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[7px] font-bold leading-[9px] text-[#1e293b] ${
//           wrap ? "whitespace-normal break-words" : "truncate"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    ICON + LABEL + ":" + DOTTED VALUE — single-column row used
//    on both faces of the current design. Rendered as a Fragment
//    into a shared 4-column grid (icon | label | colon | value)
//    so every row lines up cleanly, with a bigger, more readable
//    type scale than the old dotted-only rows above.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value }) {
//   return (
//     <>
//       <span className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#E7EFEA] text-[#0B5D30]">
//         <Icon size={8.5} />
//       </span>
//       <span className="min-w-0 whitespace-nowrap text-[7.2px] font-semibold leading-[14px] text-[#475569]">{label}</span>
//       <span className="text-[7.2px] font-semibold leading-[14px] text-[#475569]">:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one. */}
//       <span className="min-w-0 whitespace-normal break-words border-b border-dotted border-[#C9A227] pb-[1px] text-[10.3px] font-extrabold leading-[14px] text-[#0f172a]">
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
//   const { user } = useAuth();

//   // two separate faces now — front and back are captured/printed
//   // as two independent images instead of one tall card.
//   const frontRef = useRef(null);
//   const backRef = useRef(null);
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
//      Each face (front / back) is captured separately as a flattened
//      image via html2canvas — same reasoning as before: a flattened
//      image can't be split mid-way by the print engine's pagination,
//      so each face always renders as exactly one page at the exact
//      physical card size (88mm x 58mm — 8.8cm wide, 5.8cm tall).

//      IMPORTANT: because captureFace() screenshots frontRef/backRef —
//      the exact same DOM nodes rendered in the on-screen preview below —
//      Print and Download will ALWAYS visually match the preview exactly.
//      There is no separate print-only or PDF-only markup anywhere in
//      this file, so any future visual change made to the preview JSX
//      automatically carries through to Print and PDF with zero extra
//      work. Nothing further was needed to satisfy "print/download made
//      same as preview" — it was already guaranteed by this capture
//      approach. */

//   const CARD_WIDTH_MM = 88;
//   const CARD_HEIGHT_MM = 58;
//   const PREVIEW_SCALE = 4.3; // px-per-mm, on-screen preview only

//   const captureFace = async (ref) => {
//     if (!ref.current) return null;
//     return html2canvas(ref.current, {
//       scale: 4, // high-res so print/PDF output stays crisp at this small size
//       useCORS: true,
//       allowTaint: true,
//       backgroundColor: "#ffffff",
//       foreignObjectRendering: false,
//       imageTimeout: 0,
//       logging: false,
//     });
//   };

//   const handlePrint = async () => {
//     if (isExporting) return;
//     setIsExporting(true);
//     try {
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Card.");
//         return;
//       }
//       printWindow.document.write(
//         "<html><head><title>Smart Card</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; }" +
//           ".page { page-break-after: always; }" +
//           ".page:last-child { page-break-after: auto; }" +
//           "</style></head><body>" +
//           "<div class=\"page\"><img src=\"" + frontData + "\" /></div>" +
//           "<div class=\"page\"><img src=\"" + backData + "\" /></div>" +
//           "</body></html>"
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
//       const [frontCanvas, backCanvas] = await Promise.all([
//         captureFace(frontRef),
//         captureFace(backRef),
//       ]);
//       if (!frontCanvas || !backCanvas) return;

//       const frontData = frontCanvas.toDataURL("image/png");
//       const backData = backCanvas.toDataURL("image/png");

//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
//       pdf.addImage(backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
//     } catch (err) {
//       console.error("Smart card download failed:", err);
//       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   /* ==================== NOT AUTHORIZED (29-10 request) — only A.M.C./super_admin
//      can generate OR view the Smart Card. counter_officer, survey_officer and vendor
//      must not see this page at all, even by direct link. ==================== */

//   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
//         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
//         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           Back to Dashboard
//         </Link>
//       </Card>
//     );
//   }

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

//   /* ==================== CARD FIELDS ====================
//      Front (next to photo): id no, name, gender, mobile, ward, validity.
//      Back (next to signature+QR): dob/age, business type, vendor type,
//      vending zone, business timing, address.
//      — exact same 6 + 6 fields, same order, same data as before;
//      only an icon is attached per row for the new layout. */

//   const frontFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const backFields = [
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.address.zone },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     { icon: FiHome, label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
//   ];

//   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
//   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

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

//       {/* ================= CARD PREVIEW — front & back, side by side ================= */}
//       <div className="flex flex-wrap items-start justify-center gap-10 px-1 py-6">

//         {/* ---------- FRONT ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Front</p>
//           <div
//             ref={frontRef}
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)] ring-1 ring-inset ring-[#DFC77D]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name, with a subtle gold decorative wave along the bottom
//                  edge (matches the reference card's curved accent). ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-2.5 pl-3.5 pr-3 pt-3 pb-2.5"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[14px] w-full opacity-65"
//                 viewBox="0 0 380 14"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 10 Q95 0 190 8 T380 6" fill="none" stroke="#C9A227" strokeWidth="1" />
//                 <path d="M0 13 Q95 4 190 12 T380 10" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//               </svg>
//               <img
//                 src={logo}
//                 alt="VVCMC"
//                 className="h-10 w-10 shrink-0 rounded-full border-2 border-[#C9A227] bg-[#ffffff] object-contain p-[1.5px]"
//               />

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits. ── */}
//               <div className="min-w-0 space-y-[6px] leading-tight">
//                 <p className="whitespace-nowrap text-[10px] font-black uppercase tracking-wide text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[10px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — photo ~29% width
//                  (sized to ~57% of the body's height, vertically centered),
//                  right column ~71% width holding the title at top and the
//                  six fields below, spread with content-between so there is
//                  no leftover blank space. A very faint diagonal pattern
//                  sits behind the whole body for a premium printed-card
//                  texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 px-3 pb-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />
//               <div className="relative flex w-[29%] shrink-0 items-center justify-center">
//                 <div className="h-[57%] w-full overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={30} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="relative flex min-w-0 flex-1 flex-col">
//                 {/* ── Title, integrated at the top of the information
//                      column instead of a separate centered block, so it no
//                      longer creates isolated empty space. ── */}
//                 <div className="shrink-0 pb-1.5 pt-1.5">
//                   <h2 className="text-[15.3px] font-black leading-tight tracking-tight text-[#0B5D30]">
//                     रस्ता विक्रेता ओळखपत्र
//                   </h2>
//                   <p className="text-[6.5px] font-semibold italic leading-tight text-[#B9861C]">
//                     (Street Vendor Identity Card)
//                   </p>
//                   <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//                 </div>

//                 <div
//                   className="grid flex-1 content-between gap-x-1"
//                   style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//                 >
//                   {frontFields.map((f) => (
//                     <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)] ring-1 ring-inset ring-[#DFC77D]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//             }}
//           >
//             {/* ── green/gold header strip — ~14% of card height, same wave
//                  treatment as the front so both faces read as one card ── */}
//             <div
//               className="relative h-[34px] w-full shrink-0 overflow-hidden"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <svg
//                 className="pointer-events-none absolute inset-x-0 bottom-0 h-[12px] w-full opacity-65"
//                 viewBox="0 0 380 12"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 8 Q95 0 190 6 T380 5" fill="none" stroke="#C9A227" strokeWidth="1" />
//                 <path d="M0 11 Q95 3 190 10 T380 8" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//               </svg>
//             </div>

//             {/* ── Body: fills all remaining height (flex-1) — signature+QR
//                  column ~28% width, fields ~72% width, no leftover blank
//                  space since both columns stretch to the same height. A
//                  faint diagonal pattern echoes the front card's texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 pl-3 pr-2 py-2.5">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* ── Left: signature panel arranged as three clearly divided
//                    sections (matches a real printed ID card): signature box,
//                    then designation text, then QR — each separated by a
//                    thin gold divider instead of one plain empty area. ── */}
//               <div className="relative flex w-[28%] shrink-0 flex-col items-center gap-1.5 rounded-[6px] border border-[#E4D193] bg-[#FAF8EF] px-1.5 py-2">
//                 <div className="flex w-[74%] items-center justify-center rounded-[4px] border border-dashed border-[#94a3b8] bg-[#ffffff] py-1.5">
//                   <div className="h-px w-3/4 bg-[#94a3b8]" />
//                 </div>

//                 <div className="h-px w-full bg-[#E6D69F]" />

//                 <div className="flex shrink-0 flex-col items-center">
//                   <p className="text-center text-[7px] font-extrabold leading-tight tracking-wide text-[#1e293b]">
//                     सहाय्यक आयुक्त
//                   </p>
//                   <p className="text-center text-[6px] leading-tight text-[#64748b]">(स्वाक्षरी)</p>
//                 </div>

//                 <div className="h-px w-full bg-[#E6D69F]" />

//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>
//               </div>

//               {/* ── Right: single-column fields, majority of the back card,
//                    separators reaching almost to the card's right edge. ── */}
//               <div
//                 className="relative grid min-w-0 flex-1 content-between gap-x-1 border-l border-dotted border-[#9DBEAC] pl-2.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {backFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}
//               </div>
//             </div>
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
  FiCreditCard,
  FiPhone,
  FiFlag,
  FiUsers,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiBriefcase,
  FiTag,
  FiHome,
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
import { useAuth } from "../../auth/hooks/useAuth";


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
   dotted underline. Rendered as a Fragment into a shared grid
   so every ":" lines up in one vertical line regardless of
   label length. Kept because the two previous design
   revisions (preserved as comments below) still reference it.

   wrap (optional): let the value wrap onto multiple lines
   instead of truncating — used for the address on the back.
========================================================= */

function CardField({ label, value, wrap = false }) {
  return (
    <>
      <span className="text-[7px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
      <span className="text-[7px] font-bold leading-[9px] text-[#1e293b]">:</span>
      <span
        className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[7px] font-bold leading-[9px] text-[#1e293b] ${
          wrap ? "whitespace-normal break-words" : "truncate"
        }`}
      >
        {value || "\u00A0"}
      </span>
    </>
  );
}

/* =========================================================
   ICON + LABEL + ":" + DOTTED VALUE — single-column row used
   on both faces of the current design. Rendered as a Fragment
   into a shared 4-column grid (icon | label | colon | value)
   so every row lines up cleanly, with a bigger, more readable
   type scale than the old dotted-only rows above.
========================================================= */

function IconCardField({ icon: Icon, label, value }) {
  return (
    <>
      <span className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#E7EFEA] text-[#0B5D30]">
        <Icon size={8.5} />
      </span>
      <span className="min-w-0 whitespace-nowrap text-[7.2px] font-semibold leading-[14px] text-[#475569]">{label}</span>
      <span className="text-[7.2px] font-semibold leading-[14px] text-[#475569]">:</span>
      {/* Value is never truncated — certificate numbers / validity ranges must
          stay fully readable, wrapping onto a second line only if it
          genuinely cannot fit on one. */}
      <span className="min-w-0 whitespace-normal break-words border-b border-dotted border-[#C9A227] pb-[1px] text-[10.3px] font-extrabold leading-[14px] text-[#0f172a]">
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
  const { user } = useAuth();

  // two separate faces now — front and back are captured/printed
  // as two independent images instead of one tall card.
  const frontRef = useRef(null);
  const backRef = useRef(null);
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
     Each face (front / back) is captured separately as a flattened
     image via html2canvas — same reasoning as before: a flattened
     image can't be split mid-way by the print engine's pagination,
     so each face always renders as exactly one page at the exact
     physical card size (88mm x 58mm — 8.8cm wide, 5.8cm tall).

     IMPORTANT: because captureFace() screenshots frontRef/backRef —
     the exact same DOM nodes rendered in the on-screen preview below —
     Print and Download will ALWAYS visually match the preview exactly.
     There is no separate print-only or PDF-only markup anywhere in
     this file, so any future visual change made to the preview JSX
     automatically carries through to Print and PDF with zero extra
     work. Nothing further was needed to satisfy "print/download made
     same as preview" — it was already guaranteed by this capture
     approach.

     COLOR PARITY FIX: a couple of utilities on this card still resolve
     their final color through nested CSS custom properties — e.g.
     `ring-1 ring-inset ring-[#DFC77D]` builds its box-shadow out of
     --tw-ring-color/--tw-ring-inset/--tw-ring-shadow, and the diagonal
     texture / border-radius / border colors are likewise resolved by
     the browser via cascade + custom properties. html2canvas-pro parses
     styles with its own CSS engine and doesn't always resolve those
     var() chains identically to the real browser, which is what made
     the ring/gradient/border tones look slightly different in the
     captured output even after switching the header gradients to plain
     inline `background`. flattenComputedStyles() walks the live,
     on-screen DOM (already fully resolved by the browser's own
     getComputedStyle) and copies the literal final values onto the
     cloned nodes html2canvas is about to rasterize, so nothing is left
     for html2canvas to mis-resolve. No JSX/classNames/UI change — this
     only touches the capture step inside captureFace(). */

  // NOTE: "boxShadow" is intentionally NOT in this list. Tailwind's ring
  // utilities (ring-1 ring-inset ring-[#...]) resolve to 2-3 stacked
  // inset box-shadows in one computed value. html2canvas-pro cannot
  // reliably rasterize multiple stacked inset shadows — instead of a
  // thin 1px ring it was painting a solid fill in the ring color across
  // the whole card (the gold/tan fill seen in print preview). Leaving
  // boxShadow unflattened lets html2canvas parse the original Tailwind
  // CSS itself, which renders the ring correctly as a thin border.
  const STYLE_PROPS_TO_FLATTEN = [
    "backgroundImage",
    "backgroundColor",
    "backgroundClip",
    "WebkitBackgroundClip",
    "backgroundPosition",
    "backgroundSize",
    "backgroundRepeat",
    "color",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "borderStyle",
    "opacity",
    "fill",
    "stroke",
  ];

  // Recursively copies each source element's fully-resolved computed
  // style onto the matching cloned element (same tree shape, since the
  // clone is a straight DOM clone of ref.current), so html2canvas
  // rasterizes literal values instead of re-resolving Tailwind's
  // CSS-variable-based gradients/rings/shadows itself.
  //
  // IMPORTANT: this must NEVER throw. html2canvas-pro's onclone hook does
  // not reject its outer promise if the callback throws synchronously —
  // it simply hangs forever, which is what left Print/Download stuck on
  // "Preparing..." permanently. Every risky step below is wrapped so a
  // single bad node (SVG child, missing style prop, mismatched clone,
  // etc.) can only skip that one step and never abort the whole capture.
  const flattenComputedStyles = (sourceEl, targetEl) => {
    try {
      if (!sourceEl || !targetEl || sourceEl.nodeType !== 1 || targetEl.nodeType !== 1) return;

      let computed;
      try {
        computed = window.getComputedStyle(sourceEl);
      } catch {
        return; // can't read styles for this node — leave it as-is, move on
      }

      STYLE_PROPS_TO_FLATTEN.forEach((prop) => {
        try {
          const value = computed[prop];
          if (value) targetEl.style[prop] = value;
        } catch {
          // unsupported/read-only property on this element — skip safely
        }
      });

      const sourceChildren = sourceEl.children || [];
      const targetChildren = targetEl.children || [];
      const count = Math.min(sourceChildren.length, targetChildren.length);
      for (let i = 0; i < count; i++) {
        flattenComputedStyles(sourceChildren[i], targetChildren[i]);
      }
    } catch {
      // absolute last-resort guard — never let this function throw upward
    }
  };

  // Wraps a promise so it can never hang the UI forever: resolves with
  // whatever the promise settles with, or rejects after `ms` if it never
  // settles, so the calling button always returns to its normal state.
  const withTimeout = (promise, ms, label) =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
      promise.then(
        (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        (err) => {
          clearTimeout(timer);
          reject(err);
        }
      );
    });

  const CARD_WIDTH_MM = 88;
  const CARD_HEIGHT_MM = 58;
  const PREVIEW_SCALE = 4.3; // px-per-mm, on-screen preview only

  const captureFace = async (ref) => {
    if (!ref.current) return null;

    // Make sure the Devanagari + Latin webfonts are fully loaded before
    // rasterizing, so text weight/rendering also matches the screen.
    // Capped at 3s so a font that never resolves can't stall export.
    if (document.fonts && document.fonts.ready) {
      try {
        await withTimeout(document.fonts.ready, 3000, "Font load");
      } catch {
        // proceed with capture regardless — better a slightly-late font
        // than a permanently stuck button
      }
    }

    return withTimeout(
      html2canvas(ref.current, {
        scale: 4, // high-res so print/PDF output stays crisp at this small size
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        foreignObjectRendering: false,
        imageTimeout: 0,
        logging: false,
        onclone: (_clonedDoc, clonedElement) => {
          // clonedElement corresponds 1:1 to ref.current — flatten computed
          // styles from the real, on-screen node onto its clone so every
          // gradient/ring/shadow/border color matches the screen exactly.
          // Fully defensive — see comment on flattenComputedStyles above.
          flattenComputedStyles(ref.current, clonedElement);
        },
      }),
      15000,
      "Card capture"
    );
  };

  const handlePrint = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const [frontCanvas, backCanvas] = await Promise.all([
        captureFace(frontRef),
        captureFace(backRef),
      ]);
      if (!frontCanvas || !backCanvas) return;

      const frontData = frontCanvas.toDataURL("image/png");
      const backData = backCanvas.toDataURL("image/png");

      const printWindow = window.open("", "_blank", "width=800,height=1000");
      if (!printWindow) {
        window.alert("Please allow pop-ups for this site to print the Smart Card.");
        return;
      }
      printWindow.document.write(
        "<html><head><title>Smart Card</title><style>" +
          "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0; }" +
          "html, body { margin: 0; padding: 0; background: #ffffff; }" +
          "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
          "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; }" +
          ".page { page-break-after: always; }" +
          ".page:last-child { page-break-after: auto; }" +
          "</style></head><body>" +
          "<div class=\"page\"><img src=\"" + frontData + "\" /></div>" +
          "<div class=\"page\"><img src=\"" + backData + "\" /></div>" +
          "</body></html>"
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
      const [frontCanvas, backCanvas] = await Promise.all([
        captureFace(frontRef),
        captureFace(backRef),
      ]);
      if (!frontCanvas || !backCanvas) return;

      const frontData = frontCanvas.toDataURL("image/png");
      const backData = backCanvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
      });
      pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
      pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
      pdf.addImage(backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
      pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
    } catch (err) {
      console.error("Smart card download failed:", err);
      window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
    } finally {
      setIsExporting(false);
    }
  };

  /* ==================== NOT AUTHORIZED (29-10 request) — only A.M.C./super_admin
     can generate OR view the Smart Card. counter_officer, survey_officer and vendor
     must not see this page at all, even by direct link. ==================== */

  if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
    return (
      <Card className="mx-auto max-w-md text-center">
        <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
        <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
        <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
          Back to Dashboard
        </Link>
      </Card>
    );
  }

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

  /* ==================== CARD FIELDS ====================
     Front (next to photo): id no, name, gender, mobile, ward, validity.
     Back (next to signature+QR): dob/age, business type, vendor type,
     vending zone, business timing, address.
     — exact same 6 + 6 fields, same order, same data as before;
     only an icon is attached per row for the new layout. */

  const frontFields = [
    { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
    { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName },
    { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
    { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
    { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
    {
      icon: FiCalendar,
      label: "ओळखपत्र वैधता",
      value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
    },
  ];

  const backFields = [
    {
      icon: FiClock,
      label: "जन्मतारीख / वय",
      value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
    },
    { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
    { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
    { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.address.zone },
    { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
    // wrap: true -> long addresses flow onto extra lines instead of being cut off
    { icon: FiHome, label: "पत्ता", value: vendor.address.permanentAddress, wrap: true },
  ];

  const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
  const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

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

      {/* ================= CARD PREVIEW — front & back, side by side ================= */}
      <div className="flex flex-wrap items-start justify-center gap-10 px-1 py-6">

        {/* ---------- FRONT ---------- */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-semibold text-ink-500">Front</p>
          <div
            ref={frontRef}
            className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
            style={{
              width: `${CARD_W_PX}px`,
              height: `${CARD_H_PX}px`,
              border: "1.5px solid #0B5D30",
            }}
          >
            {/* ── Header bar — occupies ~22% of card height, logo + corporation
                 name, with a subtle gold decorative wave along the bottom
                 edge (matches the reference card's curved accent). ── */}
            <div
              className="relative flex shrink-0 items-center gap-2.5 pl-3.5 pr-3 pt-3 pb-2.5"
              style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
            >
              <svg
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[14px] w-full opacity-65"
                viewBox="0 0 380 14"
                preserveAspectRatio="none"
              >
                <path d="M0 10 Q95 0 190 8 T380 6" fill="none" stroke="#C9A227" strokeWidth="1" />
                <path d="M0 13 Q95 4 190 12 T380 10" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
              </svg>
              <img
                src={logo}
                alt="VVCMC"
                className="h-10 w-10 shrink-0 rounded-full border-2 border-[#C9A227] bg-[#ffffff] object-contain p-[1.5px]"
              />

              {/* ── Corporation name — two lines, no `truncate` (that class
                   sets its own overflow:hidden and was clipping the tops of
                   Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
                   alone is enough since this text is fixed and always fits. ── */}
              <div className="min-w-0 space-y-[6px] leading-tight">
                <p className="whitespace-nowrap text-[10px] font-black uppercase tracking-wide text-[#ffffff]">
                  Vasai-Virar City Municipal Corporation
                </p>
                <p className="whitespace-nowrap text-[10px] font-semibold leading-[14px] text-[#F2D98A]">
                  वसई-विरार शहर महानगरपालिका
                </p>
              </div>
            </div>

            {/* ── Body: fills all remaining height (flex-1) — photo ~29% width
                 (sized to ~57% of the body's height, vertically centered),
                 right column ~71% width holding the title at top and the
                 six fields below, spread with content-between so there is
                 no leftover blank space. A very faint diagonal pattern
                 sits behind the whole body for a premium printed-card
                 texture. ── */}
            <div className="relative flex flex-1 items-stretch gap-3 px-3 pb-2">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
                }}
              />
              <div className="relative flex w-[29%] shrink-0 items-center justify-center">
                <div className="h-[57%] w-full overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
                  {vendor.documents?.photo ? (
                    <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <FiUser size={30} strokeWidth={1.2} className="text-[#cbd5e1]" />
                    </div>
                  )}
                </div>
              </div>

              <div className="relative flex min-w-0 flex-1 flex-col">
                {/* ── Title, integrated at the top of the information
                     column instead of a separate centered block, so it no
                     longer creates isolated empty space. ── */}
                <div className="shrink-0 pb-1.5 pt-1.5">
                  <h2 className="text-[15.3px] font-black leading-tight tracking-tight text-[#0B5D30]">
                    रस्ता विक्रेता ओळखपत्र
                  </h2>
                  <p className="text-[6.5px] font-semibold italic leading-tight text-[#B9861C]">
                    (Street Vendor Identity Card)
                  </p>
                  <div className="mt-1 h-px w-full bg-[#D9BE68]" />
                </div>

                <div
                  className="grid flex-1 content-between gap-x-1"
                  style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
                >
                  {frontFields.map((f) => (
                    <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- BACK ---------- */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-semibold text-ink-500">Back</p>
          <div
            ref={backRef}
            className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
            style={{
              width: `${CARD_W_PX}px`,
              height: `${CARD_H_PX}px`,
              border: "1.5px solid #0B5D30",
            }}
          >
            {/* ── green/gold header strip — ~14% of card height, same wave
                 treatment as the front so both faces read as one card ── */}
            <div
              className="relative h-[34px] w-full shrink-0 overflow-hidden"
              style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
            >
              <svg
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[12px] w-full opacity-65"
                viewBox="0 0 380 12"
                preserveAspectRatio="none"
              >
                <path d="M0 8 Q95 0 190 6 T380 5" fill="none" stroke="#C9A227" strokeWidth="1" />
                <path d="M0 11 Q95 3 190 10 T380 8" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
              </svg>
            </div>

            {/* ── Body: fills all remaining height (flex-1) — signature+QR
                 column ~28% width, fields ~72% width, no leftover blank
                 space since both columns stretch to the same height. A
                 faint diagonal pattern echoes the front card's texture. ── */}
            <div className="relative flex flex-1 items-stretch gap-3 pl-3 pr-2 py-2.5">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
                }}
              />

              {/* ── Left: signature panel arranged as three clearly divided
                   sections (matches a real printed ID card): signature box,
                   then designation text, then QR — each separated by a
                   thin gold divider instead of one plain empty area. ── */}
              <div className="relative flex w-[28%] shrink-0 flex-col items-center gap-1.5 rounded-[6px] border border-[#E4D193] bg-[#FAF8EF] px-1.5 py-2">
                <div className="flex w-[74%] items-center justify-center rounded-[4px] border border-dashed border-[#94a3b8] bg-[#ffffff] py-1.5">
                  <div className="h-px w-3/4 bg-[#94a3b8]" />
                </div>

                <div className="h-px w-full bg-[#E6D69F]" />

                <div className="flex shrink-0 flex-col items-center">
                  <p className="text-center text-[7px] font-extrabold leading-tight tracking-wide text-[#1e293b]">
                    सहाय्यक आयुक्त
                  </p>
                  <p className="text-center text-[6px] leading-tight text-[#64748b]">(स्वाक्षरी)</p>
                </div>

                <div className="h-px w-full bg-[#E6D69F]" />

                <Link
                  to={`/verify/${vendor.applicationNo}`}
                  className="flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
                >
                  <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
                </Link>
              </div>

              {/* ── Right: single-column fields, majority of the back card,
                   separators reaching almost to the card's right edge. ── */}
              <div
                className="relative grid min-w-0 flex-1 content-between gap-x-1 border-l border-dotted border-[#9DBEAC] pl-2.5"
                style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
              >
                {backFields.map((f) => (
                  <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
                ))}
              </div>
            </div>
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