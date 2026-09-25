// import { useEffect, useMemo, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
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
//   FiCheckSquare,
//   FiSquare,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import logo from "../../../assets/logovvcmc.jpg";

// import { fetchVendorApplications } from "../../../services/vendorApplicationService";
// import { useAuth } from "../../auth/hooks/useAuth";

// /* =========================================================
//    HELPERS — identical copies of the ones in SmartCard.jsx, so
//    the bulk cards render pixel-for-pixel the same as the single
//    Smart Card page. Kept local (not imported) because the
//    single-card file's structure/fields are locked and must not
//    be touched for this bulk feature.
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

// function IconCardField({ icon: Icon, label, value }) {
//   return (
//     <>
//       <span className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#E7EFEA] text-[#0B5D30]">
//         <Icon size={8.5} />
//       </span>
//       <span className="min-w-0 whitespace-nowrap text-[7.2px] font-semibold leading-[14px] text-[#475569]">{label}</span>
//       <span className="text-[7.2px] font-semibold leading-[14px] text-[#475569]">:</span>
//       <span className="min-w-0 whitespace-normal break-words border-b border-dotted border-[#C9A227] pb-[1px] text-[10.3px] font-extrabold leading-[14px] text-[#0f172a]">
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    ONE VENDOR'S FRONT + BACK FACES — exact same markup as the
//    single SmartCard.jsx preview, just parameterised by `vendor`
//    and given per-vendor refs so every selected vendor gets its
//    own pair of DOM nodes to capture. Rendered small in a scroll
//    list, then captured at the same physical 88mm x 58mm size as
//    the single-card page.
// ========================================================= */

// function VendorCardFaces({ vendor, frontRef, backRef, cardWidthPx, cardHeightPx }) {
//   const certificate = vendor?.certificate;
//   const verifyUrl = certificate?.qrCodeData || `${window.location.origin}/verify/${vendor.applicationNo}`;

//   const frontFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate?.certificateNo },
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal?.fullName },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal?.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal?.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address?.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate?.issueDate)} - ${formatDate(certificate?.validTill)}`,
//     },
//   ];

//   const backFields = [
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal?.dob)} / ${calcAge(vendor.personal?.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business?.businessType },
//     { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business?.vendorType) },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.address?.zone },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business?.businessTiming },
//     { icon: FiHome, label: "पत्ता", value: vendor.address?.permanentAddress, wrap: true },
//   ];

//   return (
//     <div className="flex flex-wrap items-start gap-6">
//       {/* ---------- FRONT ---------- */}
//       <div
//         ref={frontRef}
//         className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//         style={{ width: `${cardWidthPx}px`, height: `${cardHeightPx}px`, border: "1.5px solid #0B5D30" }}
//       >
//         <div
//           className="relative flex shrink-0 items-center gap-2.5 pl-3.5 pr-3 pt-3 pb-2.5"
//           style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//         >
//           <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-[14px] w-full opacity-65" viewBox="0 0 380 14" preserveAspectRatio="none">
//             <path d="M0 10 Q95 0 190 8 T380 6" fill="none" stroke="#C9A227" strokeWidth="1" />
//             <path d="M0 13 Q95 4 190 12 T380 10" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//           </svg>
//           <img src={logo} alt="VVCMC" className="h-10 w-10 shrink-0 rounded-full border-2 border-[#C9A227] bg-[#ffffff] object-contain p-[1.5px]" />
//           <div className="min-w-0 space-y-[6px] leading-tight">
//             <p className="whitespace-nowrap text-[10px] font-black uppercase tracking-wide text-[#ffffff]">
//               Vasai-Virar City Municipal Corporation
//             </p>
//             <p className="whitespace-nowrap text-[10px] font-semibold leading-[14px] text-[#F2D98A]">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>
//         </div>

//         <div className="relative flex flex-1 items-stretch gap-3 px-3 pb-2">
//           <div
//             className="pointer-events-none absolute inset-0"
//             style={{
//               backgroundImage:
//                 "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//             }}
//           />
//           <div className="relative flex h-full w-[29%] shrink-0 flex-col items-center justify-start gap-1">
//             <div className="mt-2 h-[50%] w-full overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal?.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <div className="flex h-full w-full items-center justify-center">
//                   <FiUser size={30} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                 </div>
//               )}
//             </div>
//             <div className="mt-auto flex w-[85%] shrink-0 flex-col items-center gap-[1px] pb-0.5">
//               <div className="h-px w-full bg-[#64748b]" />
//               <p className="whitespace-nowrap text-[6px] font-extrabold leading-tight tracking-wide text-[#1e293b]">सहाय्यक आयुक्त</p>
//               <p className="whitespace-nowrap text-[5.5px] leading-tight text-[#64748b]">(स्वाक्षरी)</p>
//             </div>
//           </div>

//           <div className="relative flex min-w-0 flex-1 flex-col">
//             <div className="shrink-0 pb-1.5 pt-1.5">
//               <h2 className="text-[15.3px] font-black leading-tight tracking-tight text-[#0B5D30]">रस्ता विक्रेता ओळखपत्र</h2>
//               <p className="text-[6.5px] font-semibold italic leading-tight text-[#B9861C]">(Street Vendor Identity Card)</p>
//               <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//             </div>
//             <div className="grid flex-1 content-between gap-x-1" style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}>
//               {frontFields.map((f) => (
//                 <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ---------- BACK ---------- */}
//       <div
//         ref={backRef}
//         className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//         style={{ width: `${cardWidthPx}px`, height: `${cardHeightPx}px`, border: "1.5px solid #0B5D30" }}
//       >
//         <div
//           className="relative h-[34px] w-full shrink-0 overflow-hidden"
//           style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//         >
//           <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-[12px] w-full opacity-65" viewBox="0 0 380 12" preserveAspectRatio="none">
//             <path d="M0 8 Q95 0 190 6 T380 5" fill="none" stroke="#C9A227" strokeWidth="1" />
//             <path d="M0 11 Q95 3 190 10 T380 8" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//           </svg>
//         </div>

//         <div className="relative flex flex-1 items-stretch gap-3 pl-3 pr-2 py-2.5">
//           <div
//             className="pointer-events-none absolute inset-0"
//             style={{
//               backgroundImage:
//                 "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//             }}
//           />
//           <div className="relative flex w-[28%] shrink-0 flex-col items-center gap-1.5 rounded-[6px] border border-[#E4D193] bg-[#FAF8EF] px-1.5 py-2">
//             <div className="flex w-[74%] items-center justify-center rounded-[4px] border border-dashed border-[#94a3b8] bg-[#ffffff] py-1.5">
//               <div className="h-px w-3/4 bg-[#94a3b8]" />
//             </div>
//             <div className="h-px w-full bg-[#E6D69F]" />
//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           <div
//             className="relative grid min-w-0 flex-1 content-between gap-x-1 border-l border-dotted border-[#9DBEAC] pl-2.5"
//             style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//           >
//             {backFields.map((f) => (
//               <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function BulkSmartCard() {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selected, setSelected] = useState([]); // array of applicationNo
//   const [isExporting, setIsExporting] = useState(false);
//   const [exportProgress, setExportProgress] = useState("");

//   // one front+back ref pair per vendor, keyed by applicationNo
//   const frontRefs = useRef({});
//   const backRefs = useRef({});

//   useEffect(() => {
//     setLoading(true);
//     setError("");
//     // Only vendors whose ID card has actually been generated belong here —
//     // same eligibility rule as the single Smart Card page.
//     fetchVendorApplications({ status: "Certificate Issued", limit: 200 }).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load vendors.");
//         return;
//       }
//       setVendors((result.data || []).filter((v) => v.certificate?.certificateNo));
//     });
//   }, []);

//   const toggleSelected = (applicationNo) => {
//     setSelected((prev) => (prev.includes(applicationNo) ? prev.filter((n) => n !== applicationNo) : [...prev, applicationNo]));
//   };

//   const toggleSelectAll = () => {
//     setSelected((prev) => (prev.length === vendors.length ? [] : vendors.map((v) => v.applicationNo)));
//   };

//   const selectedVendors = useMemo(
//     () => vendors.filter((v) => selected.includes(v.applicationNo)),
//     [vendors, selected]
//   );

//   /* ==================== CAPTURE (same approach as SmartCard.jsx) ==================== */

//   const STYLE_PROPS_TO_FLATTEN = [
//     "backgroundImage", "backgroundColor", "backgroundClip", "WebkitBackgroundClip",
//     "backgroundPosition", "backgroundSize", "backgroundRepeat", "color",
//     "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor",
//     "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
//     "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius",
//     "borderStyle", "opacity", "fill", "stroke",
//   ];

//   const flattenComputedStyles = (sourceEl, targetEl) => {
//     try {
//       if (!sourceEl || !targetEl || sourceEl.nodeType !== 1 || targetEl.nodeType !== 1) return;
//       let computed;
//       try {
//         computed = window.getComputedStyle(sourceEl);
//       } catch {
//         return;
//       }
//       STYLE_PROPS_TO_FLATTEN.forEach((prop) => {
//         try {
//           const value = computed[prop];
//           if (value) targetEl.style[prop] = value;
//         } catch {
//           // skip
//         }
//       });
//       const sourceChildren = sourceEl.children || [];
//       const targetChildren = targetEl.children || [];
//       const count = Math.min(sourceChildren.length, targetChildren.length);
//       for (let i = 0; i < count; i++) flattenComputedStyles(sourceChildren[i], targetChildren[i]);
//     } catch {
//       // never throw
//     }
//   };

//   const withTimeout = (promise, ms, label) =>
//     new Promise((resolve, reject) => {
//       const timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
//       promise.then(
//         (value) => { clearTimeout(timer); resolve(value); },
//         (err) => { clearTimeout(timer); reject(err); }
//       );
//     });

//   const CARD_WIDTH_MM = 88;
//   const CARD_HEIGHT_MM = 58;
//   const PREVIEW_SCALE = 4.3;
//   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
//   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

//   const captureFace = async (ref) => {
//     if (!ref) return null;
//     if (document.fonts && document.fonts.ready) {
//       try {
//         await withTimeout(document.fonts.ready, 3000, "Font load");
//       } catch {
//         // proceed anyway
//       }
//     }
//     return withTimeout(
//       html2canvas(ref, {
//         scale: 4,
//         useCORS: true,
//         allowTaint: true,
//         backgroundColor: "#ffffff",
//         foreignObjectRendering: false,
//         imageTimeout: 0,
//         logging: false,
//         onclone: (_clonedDoc, clonedElement) => flattenComputedStyles(ref, clonedElement),
//       }),
//       15000,
//       "Card capture"
//     );
//   };

//   // Captures every selected vendor's front+back, one vendor at a time (keeps
//   // memory bounded when the list is large), returning [{ applicationNo, frontData, backData }]
//   const captureAll = async () => {
//     const results = [];
//     for (let i = 0; i < selectedVendors.length; i++) {
//       const v = selectedVendors[i];
//       setExportProgress(`Capturing ${i + 1} / ${selectedVendors.length} — ${v.personal?.fullName || v.applicationNo}`);
//       const frontEl = frontRefs.current[v.applicationNo];
//       const backEl = backRefs.current[v.applicationNo];
//       const [frontCanvas, backCanvas] = await Promise.all([captureFace(frontEl), captureFace(backEl)]);
//       if (!frontCanvas || !backCanvas) continue;
//       results.push({
//         applicationNo: v.applicationNo,
//         frontData: frontCanvas.toDataURL("image/png"),
//         backData: backCanvas.toDataURL("image/png"),
//       });
//     }
//     return results;
//   };

//   const handleBulkDownload = async () => {
//     if (isExporting || selectedVendors.length === 0) return;
//     setIsExporting(true);
//     setExportProgress("Preparing...");
//     try {
//       const captured = await captureAll();
//       if (captured.length === 0) return;

//       // One combined PDF — front then back for each vendor, in order, at
//       // the exact 88mm x 58mm physical card size, so it's ready to print
//       // directly with nothing extra on any page.
//       const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [CARD_WIDTH_MM, CARD_HEIGHT_MM] });
//       captured.forEach((c, idx) => {
//         if (idx > 0) pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
//         pdf.addImage(c.frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//         pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
//         pdf.addImage(c.backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       });
//       pdf.save(`SmartCards-Bulk-${captured.length}.pdf`);
//     } catch (err) {
//       console.error("Bulk smart card download failed:", err);
//       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//       setExportProgress("");
//     }
//   };

//   const handleBulkPrint = async () => {
//     if (isExporting || selectedVendors.length === 0) return;
//     setIsExporting(true);
//     setExportProgress("Preparing...");
//     try {
//       const captured = await captureAll();
//       if (captured.length === 0) return;

//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Cards.");
//         return;
//       }
//       const pages = captured
//         .map((c) => `<div class="page"><img src="${c.frontData}" /></div><div class="page"><img src="${c.backData}" /></div>`)
//         .join("");
//       printWindow.document.write(
//         "<html><head><title>Smart Cards - Bulk</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
//           ".page:last-child { page-break-after: auto; }" +
//           "</style></head><body>" + pages + "</body></html>"
//       );
//       printWindow.document.close();
//       printWindow.onload = () => {
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//       };
//     } catch (err) {
//       console.error("Bulk smart card print failed:", err);
//       window.alert("Print failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//       setExportProgress("");
//     }
//   };

//   /* ==================== NOT AUTHORIZED — same rule as SmartCard.jsx ==================== */

//   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">You're not authorized to view this page.</p>
//         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can bulk print or download Smart Cards.</p>
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

//   if (error) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/applications" className="text-brand-600 hover:text-brand-700">
//               Application Approval
//             </Link>
//             {" / "}Bulk Smart Card
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Bulk Print / Download — पथविक्रेता ओळखपत्र</h1>
//           <p className="mt-1 text-sm text-ink-500">
//             {vendors.length} ID card(s) available. {selected.length > 0 && <span className="font-semibold text-brand-600">{selected.length} selected.</span>}
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleBulkDownload} disabled={isExporting || selected.length === 0}>
//             {isExporting ? "Preparing..." : `Download (${selected.length})`}
//           </Button>
//           <Button icon={FiPrinter} onClick={handleBulkPrint} disabled={isExporting || selected.length === 0}>
//             {isExporting ? "Preparing..." : `Print (${selected.length})`}
//           </Button>
//         </div>
//       </div>

//       {isExporting && exportProgress && (
//         <Card className="flex items-center gap-2 text-sm text-ink-600">
//           <FiLoader className="animate-spin" size={16} />
//           {exportProgress}
//         </Card>
//       )}

//       {/* ================= VENDOR SELECTION LIST ================= */}
//       <Card padded={false} className="overflow-hidden">
//         <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3">
//           <button onClick={toggleSelectAll} className="flex items-center gap-2 text-sm font-semibold text-ink-700">
//             {selected.length === vendors.length && vendors.length > 0 ? (
//               <FiCheckSquare className="text-brand-600" />
//             ) : (
//               <FiSquare className="text-ink-400" />
//             )}
//             Select all
//           </button>
//         </div>
//         <div className="max-h-[420px] divide-y divide-ink-100 overflow-y-auto">
//           {vendors.length === 0 && <p className="p-5 text-sm text-ink-500">No ID cards have been generated yet.</p>}
//           {vendors.map((v) => (
//             <button
//               key={v.applicationNo}
//               onClick={() => toggleSelected(v.applicationNo)}
//               className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-ink-50"
//             >
//               {selected.includes(v.applicationNo) ? (
//                 <FiCheckSquare className="shrink-0 text-brand-600" />
//               ) : (
//                 <FiSquare className="shrink-0 text-ink-400" />
//               )}
//               <span className="min-w-0 flex-1">
//                 <span className="block truncate text-sm font-semibold text-ink-900">{v.personal?.fullName || v.applicationNo}</span>
//                 <span className="block truncate text-xs text-ink-500">
//                   {v.certificate?.certificateNo} · Ward {v.address?.ward || "-"}
//                 </span>
//               </span>
//             </button>
//           ))}
//         </div>
//       </Card>

//       {/* ================= PREVIEW — every selected vendor's card, visible
//          on screen exactly as it will print/download. Also doubles as the
//          capture source for html2canvas (same refs), so preview and output
//          are guaranteed identical — no separate hidden markup anymore. */}
//       {selectedVendors.length > 0 && (
//         <Card>
//           <p className="mb-4 text-sm font-bold text-ink-900">
//             Preview — {selectedVendors.length} card{selectedVendors.length > 1 ? "s" : ""}
//           </p>
//           <div className="max-h-[640px] space-y-8 overflow-y-auto pr-1">
//             {selectedVendors.map((v) => (
//               <div key={v.applicationNo}>
//                 <p className="mb-2 text-xs font-semibold text-ink-500">
//                   {v.personal?.fullName || v.applicationNo} · {v.certificate?.certificateNo}
//                 </p>
//                 <VendorCardFaces
//                   vendor={v}
//                   frontRef={(el) => { frontRefs.current[v.applicationNo] = el; }}
//                   backRef={(el) => { backRefs.current[v.applicationNo] = el; }}
//                   cardWidthPx={CARD_W_PX}
//                   cardHeightPx={CARD_H_PX}
//                 />
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }



// import { useEffect, useMemo, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";

// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
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
//   FiCheckSquare,
//   FiSquare,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import logo from "../../../assets/logovvcmc.jpg";

// import { fetchVendorApplications } from "../../../services/vendorApplicationService";
// import { useAuth } from "../../auth/hooks/useAuth";

// /* =========================================================
//    HELPERS — identical copies of the ones in SmartCard.jsx, so
//    the bulk cards render pixel-for-pixel the same as the single
//    Smart Card page. Kept local (not imported) because the
//    single-card file's structure/fields are locked and must not
//    be touched for this bulk feature.
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

// function IconCardField({ icon: Icon, label, value }) {
//   return (
//     <>
//       <span className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#E7EFEA] text-[#0B5D30]">
//         <Icon size={8.5} />
//       </span>
//       <span className="min-w-0 whitespace-nowrap text-[7.2px] font-semibold leading-[14px] text-[#475569]">{label}</span>
//       <span className="text-[7.2px] font-semibold leading-[14px] text-[#475569]">:</span>
//       <span className="min-w-0 whitespace-normal break-words border-b border-dotted border-[#C9A227] pb-[1px] text-[10.3px] font-extrabold leading-[14px] text-[#0f172a]">
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    ONE VENDOR'S FRONT + BACK FACES — exact same markup as the
//    single SmartCard.jsx preview, just parameterised by `vendor`
//    and given per-vendor refs so every selected vendor gets its
//    own pair of DOM nodes to capture. Rendered small in a scroll
//    list, then captured at the same physical 88mm x 58mm size as
//    the single-card page.
// ========================================================= */

// function VendorCardFaces({ vendor, frontRef, backRef, cardWidthPx, cardHeightPx }) {
//   const certificate = vendor?.certificate;
//   const verifyUrl = certificate?.qrCodeData || `${window.location.origin}/verify/${vendor.applicationNo}`;

//   const frontFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate?.certificateNo },
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal?.fullName },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal?.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal?.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address?.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate?.issueDate)} - ${formatDate(certificate?.validTill)}`,
//     },
//   ];

//   const backFields = [
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal?.dob)} / ${calcAge(vendor.personal?.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business?.businessType },
//     { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business?.vendorType) },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.address?.zone },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business?.businessTiming },
//     { icon: FiHome, label: "पत्ता", value: vendor.address?.permanentAddress, wrap: true },
//   ];

//   return (
//     <div className="flex flex-wrap items-start gap-6">
//       {/* ---------- FRONT ---------- */}
//       <div
//         ref={frontRef}
//         className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//         style={{ width: `${cardWidthPx}px`, height: `${cardHeightPx}px`, border: "1.5px solid #0B5D30" }}
//       >
//         <div
//           className="relative flex shrink-0 items-center gap-2.5 pl-3.5 pr-3 pt-3 pb-2.5"
//           style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//         >
//           <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-[14px] w-full opacity-65" viewBox="0 0 380 14" preserveAspectRatio="none">
//             <path d="M0 10 Q95 0 190 8 T380 6" fill="none" stroke="#C9A227" strokeWidth="1" />
//             <path d="M0 13 Q95 4 190 12 T380 10" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//           </svg>
//           <img src={logo} alt="VVCMC" className="h-10 w-10 shrink-0 rounded-full border-2 border-[#C9A227] bg-[#ffffff] object-contain p-[1.5px]" />
//           <div className="min-w-0 space-y-[6px] leading-tight">
//             <p className="whitespace-nowrap text-[10px] font-black uppercase tracking-wide text-[#ffffff]">
//               Vasai-Virar City Municipal Corporation
//             </p>
//             <p className="whitespace-nowrap text-[10px] font-semibold leading-[14px] text-[#F2D98A]">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>
//         </div>

//         <div className="relative flex flex-1 items-stretch gap-3 px-3 pb-2">
//           <div
//             className="pointer-events-none absolute inset-0"
//             style={{
//               backgroundImage:
//                 "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//             }}
//           />
//           <div className="relative flex h-full w-[29%] shrink-0 flex-col items-center justify-start gap-1">
//             <div className="mt-2 h-[50%] w-full overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal?.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <div className="flex h-full w-full items-center justify-center">
//                   <FiUser size={30} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                 </div>
//               )}
//             </div>
//             <div className="mt-auto flex w-[85%] shrink-0 flex-col items-center gap-[1px] pb-0.5">
//               <div className="h-px w-full bg-[#64748b]" />
//               <p className="whitespace-nowrap text-[6px] font-extrabold leading-tight tracking-wide text-[#1e293b]">सहाय्यक आयुक्त</p>
//               <p className="whitespace-nowrap text-[5.5px] leading-tight text-[#64748b]">(स्वाक्षरी)</p>
//             </div>
//           </div>

//           <div className="relative flex min-w-0 flex-1 flex-col">
//             <div className="shrink-0 pb-1.5 pt-1.5">
//               <h2 className="text-[15.3px] font-black leading-tight tracking-tight text-[#0B5D30]">रस्ता विक्रेता ओळखपत्र</h2>
//               <p className="text-[6.5px] font-semibold italic leading-tight text-[#B9861C]">(Street Vendor Identity Card)</p>
//               <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//             </div>
//             <div className="grid flex-1 content-between gap-x-1" style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}>
//               {frontFields.map((f) => (
//                 <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ---------- BACK ---------- */}
//       <div
//         ref={backRef}
//         className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//         style={{ width: `${cardWidthPx}px`, height: `${cardHeightPx}px`, border: "1.5px solid #0B5D30" }}
//       >
//         <div
//           className="relative h-[34px] w-full shrink-0 overflow-hidden"
//           style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//         >
//           <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-[12px] w-full opacity-65" viewBox="0 0 380 12" preserveAspectRatio="none">
//             <path d="M0 8 Q95 0 190 6 T380 5" fill="none" stroke="#C9A227" strokeWidth="1" />
//             <path d="M0 11 Q95 3 190 10 T380 8" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//           </svg>
//         </div>

//         <div className="relative flex flex-1 items-stretch gap-3 pl-3 pr-2 py-2.5">
//           <div
//             className="pointer-events-none absolute inset-0"
//             style={{
//               backgroundImage:
//                 "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//             }}
//           />
//           <div className="relative flex w-[28%] shrink-0 flex-col items-center gap-1.5 rounded-[6px] border border-[#E4D193] bg-[#FAF8EF] px-1.5 py-2">
//             <div className="flex w-[74%] items-center justify-center rounded-[4px] border border-dashed border-[#94a3b8] bg-[#ffffff] py-1.5">
//               <div className="h-px w-3/4 bg-[#94a3b8]" />
//             </div>
//             <div className="h-px w-full bg-[#E6D69F]" />
//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>

//           <div
//             className="relative grid min-w-0 flex-1 content-between gap-x-1 border-l border-dotted border-[#9DBEAC] pl-2.5"
//             style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//           >
//             {backFields.map((f) => (
//               <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function BulkSmartCard() {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selected, setSelected] = useState([]); // array of applicationNo
//   const [isExporting, setIsExporting] = useState(false);
//   const [exportProgress, setExportProgress] = useState("");

//   // one front+back ref pair per vendor, keyed by applicationNo
//   const frontRefs = useRef({});
//   const backRefs = useRef({});

//   useEffect(() => {
//     setLoading(true);
//     setError("");
//     // Only vendors whose ID card has actually been generated belong here —
//     // same eligibility rule as the single Smart Card page.
//     fetchVendorApplications({ status: "Certificate Issued", limit: 200 }).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load vendors.");
//         return;
//       }
//       setVendors((result.data || []).filter((v) => v.certificate?.certificateNo));
//     });
//   }, []);

//   const toggleSelected = (applicationNo) => {
//     setSelected((prev) => (prev.includes(applicationNo) ? prev.filter((n) => n !== applicationNo) : [...prev, applicationNo]));
//   };

//   const toggleSelectAll = () => {
//     setSelected((prev) => (prev.length === vendors.length ? [] : vendors.map((v) => v.applicationNo)));
//   };

//   const selectedVendors = useMemo(
//     () => vendors.filter((v) => selected.includes(v.applicationNo)),
//     [vendors, selected]
//   );

//   /* ==================== CAPTURE (same approach as SmartCard.jsx) ==================== */

//   const STYLE_PROPS_TO_FLATTEN = [
//     "backgroundImage", "backgroundColor", "backgroundClip", "WebkitBackgroundClip",
//     "backgroundPosition", "backgroundSize", "backgroundRepeat", "color",
//     "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor",
//     "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
//     "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius",
//     "borderStyle", "opacity", "fill", "stroke",
//   ];

//   const flattenComputedStyles = (sourceEl, targetEl) => {
//     try {
//       if (!sourceEl || !targetEl || sourceEl.nodeType !== 1 || targetEl.nodeType !== 1) return;
//       let computed;
//       try {
//         computed = window.getComputedStyle(sourceEl);
//       } catch {
//         return;
//       }
//       STYLE_PROPS_TO_FLATTEN.forEach((prop) => {
//         try {
//           const value = computed[prop];
//           if (value) targetEl.style[prop] = value;
//         } catch {
//           // skip
//         }
//       });
//       const sourceChildren = sourceEl.children || [];
//       const targetChildren = targetEl.children || [];
//       const count = Math.min(sourceChildren.length, targetChildren.length);
//       for (let i = 0; i < count; i++) flattenComputedStyles(sourceChildren[i], targetChildren[i]);
//     } catch {
//       // never throw
//     }
//   };

//   const withTimeout = (promise, ms, label) =>
//     new Promise((resolve, reject) => {
//       const timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
//       promise.then(
//         (value) => { clearTimeout(timer); resolve(value); },
//         (err) => { clearTimeout(timer); reject(err); }
//       );
//     });

//   const CARD_WIDTH_MM = 88;
//   const CARD_HEIGHT_MM = 58;
//   const PREVIEW_SCALE = 4.3;
//   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
//   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

//   const captureFace = async (ref) => {
//     if (!ref) return null;
//     if (document.fonts && document.fonts.ready) {
//       try {
//         await withTimeout(document.fonts.ready, 3000, "Font load");
//       } catch {
//         // proceed anyway
//       }
//     }
//     return withTimeout(
//       html2canvas(ref, {
//         scale: 4,
//         useCORS: true,
//         allowTaint: true,
//         backgroundColor: "#ffffff",
//         foreignObjectRendering: false,
//         imageTimeout: 0,
//         logging: false,
//         onclone: (_clonedDoc, clonedElement) => flattenComputedStyles(ref, clonedElement),
//       }),
//       15000,
//       "Card capture"
//     );
//   };

//   // Captures every selected vendor's front+back, one vendor at a time (keeps
//   // memory bounded when the list is large), returning [{ applicationNo, frontData, backData }]
//   const captureAll = async () => {
//     const results = [];
//     for (let i = 0; i < selectedVendors.length; i++) {
//       const v = selectedVendors[i];
//       setExportProgress(`Capturing ${i + 1} / ${selectedVendors.length} — ${v.personal?.fullName || v.applicationNo}`);
//       const frontEl = frontRefs.current[v.applicationNo];
//       const backEl = backRefs.current[v.applicationNo];
//       const [frontCanvas, backCanvas] = await Promise.all([captureFace(frontEl), captureFace(backEl)]);
//       if (!frontCanvas || !backCanvas) continue;
//       results.push({
//         applicationNo: v.applicationNo,
//         frontData: frontCanvas.toDataURL("image/png"),
//         backData: backCanvas.toDataURL("image/png"),
//       });
//     }
//     return results;
//   };

//   const handleBulkDownload = async () => {
//     if (isExporting || selectedVendors.length === 0) return;
//     setIsExporting(true);
//     setExportProgress("Preparing...");
//     try {
//       const captured = await captureAll();
//       if (captured.length === 0) return;

//       // One combined PDF — front then back for each vendor, in order, at
//       // the exact 88mm x 58mm physical card size, so it's ready to print
//       // directly with nothing extra on any page.
//       const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [CARD_WIDTH_MM, CARD_HEIGHT_MM] });
//       captured.forEach((c, idx) => {
//         if (idx > 0) pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
//         pdf.addImage(c.frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//         pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
//         pdf.addImage(c.backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       });
//       pdf.save(`SmartCards-Bulk-${captured.length}.pdf`);
//     } catch (err) {
//       console.error("Bulk smart card download failed:", err);
//       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//       setExportProgress("");
//     }
//   };

//   const handleBulkPrint = async () => {
//     if (isExporting || selectedVendors.length === 0) return;
//     setIsExporting(true);
//     setExportProgress("Preparing...");
//     try {
//       const captured = await captureAll();
//       if (captured.length === 0) return;

//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Cards.");
//         return;
//       }
//       const pages = captured
//         .map((c) => `<div class="page"><img src="${c.frontData}" /></div><div class="page"><img src="${c.backData}" /></div>`)
//         .join("");
//       printWindow.document.write(
//         "<html><head><title>Smart Cards - Bulk</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
//           ".page:last-child { page-break-after: auto; }" +
//           "</style></head><body>" + pages + "</body></html>"
//       );
//       printWindow.document.close();
//       printWindow.onload = () => {
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//       };
//     } catch (err) {
//       console.error("Bulk smart card print failed:", err);
//       window.alert("Print failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//       setExportProgress("");
//     }
//   };

//   /* ==================== NOT AUTHORIZED — same rule as SmartCard.jsx ==================== */

//   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">You're not authorized to view this page.</p>
//         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can bulk print or download Smart Cards.</p>
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

//   if (error) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/applications" className="text-brand-600 hover:text-brand-700">
//               Application Approval
//             </Link>
//             {" / "}Bulk Smart Card
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Bulk Print / Download — पथविक्रेता ओळखपत्र</h1>
//           <p className="mt-1 text-sm text-ink-500">
//             {vendors.length} ID card(s) available. {selected.length > 0 && <span className="font-semibold text-brand-600">{selected.length} selected.</span>}
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleBulkDownload} disabled={isExporting || selected.length === 0}>
//             {isExporting ? "Preparing..." : `Download (${selected.length})`}
//           </Button>
//           <Button icon={FiPrinter} onClick={handleBulkPrint} disabled={isExporting || selected.length === 0}>
//             {isExporting ? "Preparing..." : `Print (${selected.length})`}
//           </Button>
//         </div>
//       </div>

//       {isExporting && exportProgress && (
//         <Card className="flex items-center gap-2 text-sm text-ink-600">
//           <FiLoader className="animate-spin" size={16} />
//           {exportProgress}
//         </Card>
//       )}

//       {/* ================= VENDOR SELECTION LIST ================= */}
//       <Card padded={false} className="overflow-hidden">
//         <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3">
//           <button onClick={toggleSelectAll} className="flex items-center gap-2 text-sm font-semibold text-ink-700">
//             {selected.length === vendors.length && vendors.length > 0 ? (
//               <FiCheckSquare className="text-brand-600" />
//             ) : (
//               <FiSquare className="text-ink-400" />
//             )}
//             Select all
//           </button>
//         </div>
//         <div className="max-h-[420px] divide-y divide-ink-100 overflow-y-auto">
//           {vendors.length === 0 && <p className="p-5 text-sm text-ink-500">No ID cards have been generated yet.</p>}
//           {vendors.map((v) => (
//             <button
//               key={v.applicationNo}
//               onClick={() => toggleSelected(v.applicationNo)}
//               className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-ink-50"
//             >
//               {selected.includes(v.applicationNo) ? (
//                 <FiCheckSquare className="shrink-0 text-brand-600" />
//               ) : (
//                 <FiSquare className="shrink-0 text-ink-400" />
//               )}
//               <span className="min-w-0 flex-1">
//                 <span className="block truncate text-sm font-semibold text-ink-900">{v.personal?.fullName || v.applicationNo}</span>
//                 <span className="block truncate text-xs text-ink-500">
//                   {v.certificate?.certificateNo} · Ward {v.address?.ward || "-"}
//                 </span>
//               </span>
//             </button>
//           ))}
//         </div>
//       </Card>

//       {/* ================= OFF-SCREEN CAPTURE AREA ====================
//          Selected vendors' cards are rendered here (shifted far off-
//          screen with a fixed position, never `display:none`, since
//          html2canvas needs the nodes actually laid out to capture
//          them) at the exact same physical size used for the single
//          Smart Card page. Nothing from this block is ever visible to
//          the user — it exists purely so each face can be screenshotted. */}
//       <div style={{ position: "fixed", left: "-99999px", top: 0, zIndex: -1 }} aria-hidden="true">
//         {selectedVendors.map((v) => (
//           <VendorCardFaces
//             key={v.applicationNo}
//             vendor={v}
//             frontRef={(el) => { frontRefs.current[v.applicationNo] = el; }}
//             backRef={(el) => { backRefs.current[v.applicationNo] = el; }}
//             cardWidthPx={CARD_W_PX}
//             cardHeightPx={CARD_H_PX}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }





// =================================================================
// 25-09-2026 — KHALCHA JUNA ACTIVE CODE (88x58mm landscape bulk card)
// comment kela, delete nahi. Navin code ya block chya khali aahe.
// =================================================================
// import { useEffect, useMemo, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { QRCodeSVG } from "qrcode.react";
// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";
//
// import {
//   FiDownload,
//   FiPrinter,
//   FiUser,
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
//   FiCheckSquare,
//   FiSquare,
// } from "react-icons/fi";
//
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
//
// import logo from "../../../assets/logovvcmc.jpg";
//
// import { fetchVendorApplications } from "../../../services/vendorApplicationService";
// import { useAuth } from "../../auth/hooks/useAuth";
//
// /* =========================================================
//    HELPERS — identical copies of the ones in SmartCard.jsx, so
//    the bulk cards render pixel-for-pixel the same as the single
//    Smart Card page. Kept local (not imported) because the
//    single-card file's structure/fields are locked and must not
//    be touched for this bulk feature.
// ========================================================= */
//
// function formatDate(d) {
//   if (!d) return "-";
//   const date = new Date(d);
//   if (Number.isNaN(date.getTime())) return "-";
//   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
//
// function calcAge(dob) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "-";
//   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//   return age >= 0 ? age : "-";
// }
//
// function saleType(vendorType) {
//   if (!vendorType) return "-";
//   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// }
//
// function genderType(gender) {
//   if (!gender) return "-";
//   const value = gender.toLowerCase();
//   if (value === "male") return "पुरुष";
//   if (value === "female") return "स्त्री";
//   if (value === "other") return "इतर";
//   return gender;
// }
//
// function IconCardField({ icon: Icon, label, value }) {
//   return (
//     <>
//       <span className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#E7EFEA] text-[#0B5D30]">
//         <Icon size={8.5} />
//       </span>
//       <span className="min-w-0 whitespace-nowrap text-[7.2px] font-semibold leading-[14px] text-[#475569]">{label}</span>
//       <span className="text-[7.2px] font-semibold leading-[14px] text-[#475569]">:</span>
//       <span className="min-w-0 whitespace-normal break-words border-b border-dotted border-[#C9A227] pb-[1px] text-[10.3px] font-extrabold leading-[14px] text-[#0f172a]">
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }
//
// /* =========================================================
//    ONE VENDOR'S FRONT + BACK FACES — exact same markup as the
//    single SmartCard.jsx preview, just parameterised by `vendor`
//    and given per-vendor refs so every selected vendor gets its
//    own pair of DOM nodes to capture. Rendered small in a scroll
//    list, then captured at the same physical 88mm x 58mm size as
//    the single-card page.
// ========================================================= */
//
// function VendorCardFaces({ vendor, frontRef, backRef, cardWidthPx, cardHeightPx }) {
//   const certificate = vendor?.certificate;
//   const verifyUrl = certificate?.qrCodeData || `${window.location.origin}/verify/${vendor.applicationNo}`;
//
//   const frontFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate?.certificateNo },
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal?.fullName },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal?.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal?.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address?.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate?.issueDate)} - ${formatDate(certificate?.validTill)}`,
//     },
//   ];
//
//   const backFields = [
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal?.dob)} / ${calcAge(vendor.personal?.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business?.businessType },
//     { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business?.vendorType) },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.address?.zone },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business?.businessTiming },
//     { icon: FiHome, label: "पत्ता", value: vendor.address?.permanentAddress, wrap: true },
//   ];
//
//   return (
//     <div className="flex flex-wrap items-start gap-6">
//       {/* ---------- FRONT ---------- */}
//       <div
//         ref={frontRef}
//         className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//         style={{ width: `${cardWidthPx}px`, height: `${cardHeightPx}px`, border: "1.5px solid #0B5D30" }}
//       >
//         <div
//           className="relative flex shrink-0 items-center gap-2.5 pl-3.5 pr-3 pt-3 pb-2.5"
//           style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//         >
//           <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-[14px] w-full opacity-65" viewBox="0 0 380 14" preserveAspectRatio="none">
//             <path d="M0 10 Q95 0 190 8 T380 6" fill="none" stroke="#C9A227" strokeWidth="1" />
//             <path d="M0 13 Q95 4 190 12 T380 10" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//           </svg>
//           <img src={logo} alt="VVCMC" className="h-10 w-10 shrink-0 rounded-full border-2 border-[#C9A227] bg-[#ffffff] object-contain p-[1.5px]" />
//           <div className="min-w-0 space-y-[6px] leading-tight">
//             <p className="whitespace-nowrap text-[10px] font-black uppercase tracking-wide text-[#ffffff]">
//               Vasai-Virar City Municipal Corporation
//             </p>
//             <p className="whitespace-nowrap text-[10px] font-semibold leading-[14px] text-[#F2D98A]">
//               वसई-विरार शहर महानगरपालिका
//             </p>
//           </div>
//         </div>
//
//         <div className="relative flex flex-1 items-stretch gap-3 px-3 pb-2">
//           <div
//             className="pointer-events-none absolute inset-0"
//             style={{
//               backgroundImage:
//                 "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//             }}
//           />
//           <div className="relative flex h-full w-[29%] shrink-0 flex-col items-center justify-start gap-1">
//             <div className="mt-2 h-[50%] w-full overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//               {vendor.documents?.photo ? (
//                 <img src={vendor.documents.photo} alt={vendor.personal?.fullName} className="h-full w-full object-cover" />
//               ) : (
//                 <div className="flex h-full w-full items-center justify-center">
//                   <FiUser size={30} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                 </div>
//               )}
//             </div>
//             <div className="mt-auto flex w-[85%] shrink-0 flex-col items-center gap-[1px] pb-0.5">
//               <div className="h-px w-full bg-[#64748b]" />
//               <p className="whitespace-nowrap text-[6px] font-extrabold leading-tight tracking-wide text-[#1e293b]">सहाय्यक आयुक्त</p>
//               <p className="whitespace-nowrap text-[5.5px] leading-tight text-[#64748b]">(स्वाक्षरी)</p>
//             </div>
//           </div>
//
//           <div className="relative flex min-w-0 flex-1 flex-col">
//             <div className="shrink-0 pb-1.5 pt-1.5">
//               <h2 className="text-[15.3px] font-black leading-tight tracking-tight text-[#0B5D30]">रस्ता विक्रेता ओळखपत्र</h2>
//               <p className="text-[6.5px] font-semibold italic leading-tight text-[#B9861C]">(Street Vendor Identity Card)</p>
//               <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//             </div>
//             <div className="grid flex-1 content-between gap-x-1" style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}>
//               {frontFields.map((f) => (
//                 <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//
//       {/* ---------- BACK ---------- */}
//       <div
//         ref={backRef}
//         className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//         style={{ width: `${cardWidthPx}px`, height: `${cardHeightPx}px`, border: "1.5px solid #0B5D30" }}
//       >
//         <div
//           className="relative h-[34px] w-full shrink-0 overflow-hidden"
//           style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//         >
//           <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-[12px] w-full opacity-65" viewBox="0 0 380 12" preserveAspectRatio="none">
//             <path d="M0 8 Q95 0 190 6 T380 5" fill="none" stroke="#C9A227" strokeWidth="1" />
//             <path d="M0 11 Q95 3 190 10 T380 8" fill="none" stroke="#F2D98A" strokeWidth="0.6" />
//           </svg>
//         </div>
//
//         <div className="relative flex flex-1 items-stretch gap-3 pl-3 pr-2 py-2.5">
//           <div
//             className="pointer-events-none absolute inset-0"
//             style={{
//               backgroundImage:
//                 "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//             }}
//           />
//           <div className="relative flex w-[28%] shrink-0 flex-col items-center gap-1.5 rounded-[6px] border border-[#E4D193] bg-[#FAF8EF] px-1.5 py-2">
//             <div className="flex w-[74%] items-center justify-center rounded-[4px] border border-dashed border-[#94a3b8] bg-[#ffffff] py-1.5">
//               <div className="h-px w-3/4 bg-[#94a3b8]" />
//             </div>
//             <div className="h-px w-full bg-[#E6D69F]" />
//             <Link
//               to={`/verify/${vendor.applicationNo}`}
//               className="flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//             >
//               <QRCodeSVG value={verifyUrl} size={72} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//             </Link>
//           </div>
//
//           <div
//             className="relative grid min-w-0 flex-1 content-between gap-x-1 border-l border-dotted border-[#9DBEAC] pl-2.5"
//             style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//           >
//             {backFields.map((f) => (
//               <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */
//
// export default function BulkSmartCard() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//
//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selected, setSelected] = useState([]); // array of applicationNo
//   const [isExporting, setIsExporting] = useState(false);
//   const [exportProgress, setExportProgress] = useState("");
//
//   // one front+back ref pair per vendor, keyed by applicationNo
//   const frontRefs = useRef({});
//   const backRefs = useRef({});
//
//   useEffect(() => {
//     setLoading(true);
//     setError("");
//     // Only vendors whose ID card has actually been generated belong here —
//     // same eligibility rule as the single Smart Card page.
//     fetchVendorApplications({ status: "Certificate Issued", limit: 200 }).then((result) => {
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load vendors.");
//         return;
//       }
//       setVendors((result.data || []).filter((v) => v.certificate?.certificateNo));
//     });
//   }, []);
//
//   const toggleSelected = (applicationNo) => {
//     setSelected((prev) => (prev.includes(applicationNo) ? prev.filter((n) => n !== applicationNo) : [...prev, applicationNo]));
//   };
//
//   const toggleSelectAll = () => {
//     setSelected((prev) => (prev.length === vendors.length ? [] : vendors.map((v) => v.applicationNo)));
//   };
//
//   const selectedVendors = useMemo(
//     () => vendors.filter((v) => selected.includes(v.applicationNo)),
//     [vendors, selected]
//   );
//
//   /* ==================== CAPTURE (same approach as SmartCard.jsx) ==================== */
//
//   const STYLE_PROPS_TO_FLATTEN = [
//     "backgroundImage", "backgroundColor", "backgroundClip", "WebkitBackgroundClip",
//     "backgroundPosition", "backgroundSize", "backgroundRepeat", "color",
//     "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor",
//     "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
//     "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius",
//     "borderStyle", "opacity", "fill", "stroke",
//   ];
//
//   const flattenComputedStyles = (sourceEl, targetEl) => {
//     try {
//       if (!sourceEl || !targetEl || sourceEl.nodeType !== 1 || targetEl.nodeType !== 1) return;
//       let computed;
//       try {
//         computed = window.getComputedStyle(sourceEl);
//       } catch {
//         return;
//       }
//       STYLE_PROPS_TO_FLATTEN.forEach((prop) => {
//         try {
//           const value = computed[prop];
//           if (value) targetEl.style[prop] = value;
//         } catch {
//           // skip
//         }
//       });
//       const sourceChildren = sourceEl.children || [];
//       const targetChildren = targetEl.children || [];
//       const count = Math.min(sourceChildren.length, targetChildren.length);
//       for (let i = 0; i < count; i++) flattenComputedStyles(sourceChildren[i], targetChildren[i]);
//     } catch {
//       // never throw
//     }
//   };
//
//   const withTimeout = (promise, ms, label) =>
//     new Promise((resolve, reject) => {
//       const timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
//       promise.then(
//         (value) => { clearTimeout(timer); resolve(value); },
//         (err) => { clearTimeout(timer); reject(err); }
//       );
//     });
//
//   const CARD_WIDTH_MM = 88;
//   const CARD_HEIGHT_MM = 58;
//   const PREVIEW_SCALE = 4.3;
//   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
//   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;
//
//   const captureFace = async (ref) => {
//     if (!ref) return null;
//     if (document.fonts && document.fonts.ready) {
//       try {
//         await withTimeout(document.fonts.ready, 3000, "Font load");
//       } catch {
//         // proceed anyway
//       }
//     }
//     return withTimeout(
//       html2canvas(ref, {
//         scale: 4,
//         useCORS: true,
//         allowTaint: true,
//         backgroundColor: "#ffffff",
//         foreignObjectRendering: false,
//         imageTimeout: 0,
//         logging: false,
//         onclone: (_clonedDoc, clonedElement) => flattenComputedStyles(ref, clonedElement),
//       }),
//       15000,
//       "Card capture"
//     );
//   };
//
//   // Captures every selected vendor's front+back, one vendor at a time (keeps
//   // memory bounded when the list is large), returning [{ applicationNo, frontData, backData }]
//   const captureAll = async () => {
//     const results = [];
//     for (let i = 0; i < selectedVendors.length; i++) {
//       const v = selectedVendors[i];
//       setExportProgress(`Capturing ${i + 1} / ${selectedVendors.length} — ${v.personal?.fullName || v.applicationNo}`);
//       const frontEl = frontRefs.current[v.applicationNo];
//       const backEl = backRefs.current[v.applicationNo];
//       const [frontCanvas, backCanvas] = await Promise.all([captureFace(frontEl), captureFace(backEl)]);
//       if (!frontCanvas || !backCanvas) continue;
//       results.push({
//         applicationNo: v.applicationNo,
//         frontData: frontCanvas.toDataURL("image/png"),
//         backData: backCanvas.toDataURL("image/png"),
//       });
//     }
//     return results;
//   };
//
//   const handleBulkDownload = async () => {
//     if (isExporting || selectedVendors.length === 0) return;
//     setIsExporting(true);
//     setExportProgress("Preparing...");
//     try {
//       const captured = await captureAll();
//       if (captured.length === 0) return;
//
//       // One combined PDF — front then back for each vendor, in order, at
//       // the exact 88mm x 58mm physical card size, so it's ready to print
//       // directly with nothing extra on any page.
//       const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [CARD_WIDTH_MM, CARD_HEIGHT_MM] });
//       captured.forEach((c, idx) => {
//         if (idx > 0) pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
//         pdf.addImage(c.frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//         pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "landscape");
//         pdf.addImage(c.backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       });
//       pdf.save(`SmartCards-Bulk-${captured.length}.pdf`);
//     } catch (err) {
//       console.error("Bulk smart card download failed:", err);
//       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//       setExportProgress("");
//     }
//   };
//
//   const handleBulkPrint = async () => {
//     if (isExporting || selectedVendors.length === 0) return;
//     setIsExporting(true);
//     setExportProgress("Preparing...");
//     try {
//       const captured = await captureAll();
//       if (captured.length === 0) return;
//
//       const printWindow = window.open("", "_blank", "width=800,height=1000");
//       if (!printWindow) {
//         window.alert("Please allow pop-ups for this site to print the Smart Cards.");
//         return;
//       }
//       const pages = captured
//         .map((c) => `<div class="page"><img src="${c.frontData}" /></div><div class="page"><img src="${c.backData}" /></div>`)
//         .join("");
//       printWindow.document.write(
//         "<html><head><title>Smart Cards - Bulk</title><style>" +
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
//           ".page:last-child { page-break-after: auto; }" +
//           "</style></head><body>" + pages + "</body></html>"
//       );
//       printWindow.document.close();
//       printWindow.onload = () => {
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//       };
//     } catch (err) {
//       console.error("Bulk smart card print failed:", err);
//       window.alert("Print failed: " + (err && err.message ? err.message : String(err)));
//     } finally {
//       setIsExporting(false);
//       setExportProgress("");
//     }
//   };
//
//   /* ==================== NOT AUTHORIZED — same rule as SmartCard.jsx ==================== */
//
//   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
//         <p className="text-sm font-semibold text-ink-700">You're not authorized to view this page.</p>
//         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can bulk print or download Smart Cards.</p>
//         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
//           Back to Dashboard
//         </Link>
//       </Card>
//     );
//   }
//
//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading...
//       </Card>
//     );
//   }
//
//   if (error) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">{error}</p>
//         <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Applications
//         </Link>
//       </Card>
//     );
//   }
//
//   return (
//     <div className="space-y-5">
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div>
//           <p className="text-xs font-semibold text-ink-500">
//             <Link to="/applications" className="text-brand-600 hover:text-brand-700">
//               Application Approval
//             </Link>
//             {" / "}Bulk Smart Card
//           </p>
//           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Bulk Print / Download — पथविक्रेता ओळखपत्र</h1>
//           <p className="mt-1 text-sm text-ink-500">
//             {vendors.length} ID card(s) available. {selected.length > 0 && <span className="font-semibold text-brand-600">{selected.length} selected.</span>}
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline" icon={FiDownload} onClick={handleBulkDownload} disabled={isExporting || selected.length === 0}>
//             {isExporting ? "Preparing..." : `Download (${selected.length})`}
//           </Button>
//           <Button icon={FiPrinter} onClick={handleBulkPrint} disabled={isExporting || selected.length === 0}>
//             {isExporting ? "Preparing..." : `Print (${selected.length})`}
//           </Button>
//         </div>
//       </div>
//
//       {isExporting && exportProgress && (
//         <Card className="flex items-center gap-2 text-sm text-ink-600">
//           <FiLoader className="animate-spin" size={16} />
//           {exportProgress}
//         </Card>
//       )}
//
//       {/* ================= VENDOR SELECTION LIST ================= */}
//       <Card padded={false} className="overflow-hidden">
//         <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3">
//           <button onClick={toggleSelectAll} className="flex items-center gap-2 text-sm font-semibold text-ink-700">
//             {selected.length === vendors.length && vendors.length > 0 ? (
//               <FiCheckSquare className="text-brand-600" />
//             ) : (
//               <FiSquare className="text-ink-400" />
//             )}
//             Select all
//           </button>
//         </div>
//         <div className="max-h-[420px] divide-y divide-ink-100 overflow-y-auto">
//           {vendors.length === 0 && <p className="p-5 text-sm text-ink-500">No ID cards have been generated yet.</p>}
//           {vendors.map((v) => (
//             <button
//               key={v.applicationNo}
//               onClick={() => toggleSelected(v.applicationNo)}
//               className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-ink-50"
//             >
//               {selected.includes(v.applicationNo) ? (
//                 <FiCheckSquare className="shrink-0 text-brand-600" />
//               ) : (
//                 <FiSquare className="shrink-0 text-ink-400" />
//               )}
//               <span className="min-w-0 flex-1">
//                 <span className="block truncate text-sm font-semibold text-ink-900">{v.personal?.fullName || v.applicationNo}</span>
//                 <span className="block truncate text-xs text-ink-500">
//                   {v.certificate?.certificateNo} · Ward {v.address?.ward || "-"}
//                 </span>
//               </span>
//             </button>
//           ))}
//         </div>
//       </Card>
//
//       {/* ================= PREVIEW — every selected vendor's card, visible
//          on screen exactly as it will print/download. Also doubles as the
//          capture source for html2canvas (same refs), so preview and output
//          are guaranteed identical — no separate hidden markup anymore. */}
//       {selectedVendors.length > 0 && (
//         <Card>
//           <p className="mb-4 text-sm font-bold text-ink-900">
//             Preview — {selectedVendors.length} card{selectedVendors.length > 1 ? "s" : ""}
//           </p>
//           <div className="max-h-[640px] space-y-8 overflow-y-auto pr-1">
//             {selectedVendors.map((v) => (
//               <div key={v.applicationNo}>
//                 <p className="mb-2 text-xs font-semibold text-ink-500">
//                   {v.personal?.fullName || v.applicationNo} · {v.certificate?.certificateNo}
//                 </p>
//                 <VendorCardFaces
//                   vendor={v}
//                   frontRef={(el) => { frontRefs.current[v.applicationNo] = el; }}
//                   backRef={(el) => { backRefs.current[v.applicationNo] = el; }}
//                   cardWidthPx={CARD_W_PX}
//                   cardHeightPx={CARD_H_PX}
//                 />
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

/* =========================================================
   25-09-2026 — BULK ID CARD = SINGLE SMART CARD (100% same)
   ---------------------------------------------------------
   Juna bulk card (88mm x 58mm landscape, English header, English
   values, vegla layout) varti comment kela aahe — delete nahi kela.

   Ata bulk madhla pratyek card SmartCard.jsx chya exact same
   markup/size/text ne banto:
     • size 90mm x 105mm portrait (front + back vegle pages)
     • backbanner.png background, logo, header text same
     • Poppins + Noto Sans Devanagari font same (link inject)
     • values Marathi madhe — useMarathiVendor / mrDigits /
       wardMr / dateMr / timingMr (single card sarkhech)
     • IconCardField / SectionHeading / टीप notes — copy-paste
       from SmartCard.jsx (SmartCard.jsx la haat lavla nahi)
     • capture (html2canvas-pro scale 4), PDF & print CSS same
   Backend madhe kahi change nahi.
========================================================= */

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

import {
  FiDownload,
  FiPrinter,
  FiUser,
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
  FiHome,
  FiCheckSquare,
  FiSquare,
} from "react-icons/fi";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

import logo from "../../../assets/logovvcmc.jpg";
import backbanner from "../../../assets/backbanner.png"; // SmartCard.jsx sarkhach card background

import { fetchVendorApplications } from "../../../services/vendorApplicationService";
import { useMarathiVendor, mrDigits, wardMr, dateMr, timingMr } from "../../../utils/marathiCard"; // ID card Marathi display (DB la haat nahi)
import { useAuth } from "../../auth/hooks/useAuth";

/* =========================================================
   HELPERS — SmartCard.jsx madhun exact copy
========================================================= */

function calcAge(dob) {
  if (!dob) return "-";
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return "-";
  const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  return age >= 0 ? age : "-";
}

function genderType(gender) {
  if (!gender) return "-";
  const value = gender.toLowerCase();
  if (value === "male") return "पुरुष";
  if (value === "female") return "स्त्री";
  if (value === "other") return "इतर";
  return gender;
}

/* IconCardField — SmartCard.jsx madhun exact copy */
function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
  const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

  return (
    <>
      <span className={`mt-[2px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
        <Icon size={8.5} strokeWidth={2} />
      </span>
      <span
        className={`min-w-0 whitespace-nowrap text-[12.8px] leading-[16.5px] tracking-[0.005em] text-[#334155] ${
          strong ? "font-bold text-[#0f172a]" : "font-semibold"
        }`}
      >
        {label}
      </span>
      <span className={`text-[12.8px] leading-[16.5px] text-[#94a3b8] ${strong ? "font-bold" : "font-medium"}`}>:</span>

      <span
        className={`min-w-0 whitespace-normal break-words text-[13.8px] leading-[16.5px] tabular-nums text-[#0f172a] ${
          strong ? "font-bold" : "font-semibold"
        } ${
          wrap
            ? "underline decoration-dotted decoration-1 decoration-[#C9A227]/60 underline-offset-[5px] leading-[21px]"
            : "border-b border-dotted border-[#C9A227]/55 pb-[1.5px]"
        }`}
      >
        {value || "\u00A0"}
      </span>
    </>
  );
}

/* SectionHeading — SmartCard.jsx madhun exact copy */
function SectionHeading({ children }) {
  return (
    <div className="col-span-4 flex items-center gap-2 pt-[6px] first:pt-[2px]">
      <span className="whitespace-nowrap text-[8.4px] font-bold uppercase tracking-[0.16em] text-[#0B5D30]">
        {children}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/70 via-[#D9BE68]/50 to-transparent" />
    </div>
  );
}

/* =========================================================
   CARD SIZE — SmartCard.jsx sarkhach (90mm x 105mm, portrait)
========================================================= */

const CARD_WIDTH_MM = 90;
const CARD_HEIGHT_MM = 105;
const PREVIEW_SCALE = 4.3; // px-per-mm, on-screen preview only
const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

/* =========================================================
   ONE VENDOR'S FRONT + BACK — SmartCard.jsx cha exact markup,
   fakta `vendor` prop ani per-vendor refs. useMarathiVendor
   pratyek vendor sathi vegla chalto (component level hook).
   data-mr-ready → capture aadhi Marathi convert purna jhala ka
   te check karayla.
========================================================= */

function VendorCardFaces({ vendor, frontRef, backRef }) {
  const certificate = vendor?.certificate;
  const mr = useMarathiVendor(vendor); // नाव / पत्ता / व्यवसाय Marathi madhe (fakta display)

  const verifyUrl = certificate?.qrCodeData || `${window.location.origin}/verify/${vendor.applicationNo}`;

  const frontFields = [
    { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate?.certificateNo },
    { icon: FiUser, label: "विक्रेत्याचे नाव", value: mr.fullName, strong: true },
    { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal?.gender) },
    { icon: FiPhone, label: "मोबाईल क्रमांक", value: mrDigits(vendor.personal?.mobile) },
    { icon: FiFlag, label: "प्रभाग / ward", value: wardMr(vendor) },
    {
      icon: FiCalendar,
      label: "ओळखपत्र वैधता",
      value: `${dateMr(certificate?.issueDate)} - ${dateMr(certificate?.validTill)}`,
    },
  ];

  const personalFields = [
    {
      icon: FiClock,
      label: "जन्मतारीख / वय",
      value: `${dateMr(vendor.personal?.dob)} / ${mrDigits(calcAge(vendor.personal?.dob))} वर्षे`,
    },
    { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: mr.businessType },
    { icon: FiClock, label: "व्यवसायाची वेळ", value: timingMr(vendor.business?.businessTiming) },
  ];

  const addressFields = [
    { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: mr.workingAddress, wrap: true, accent: "gold" },
    { icon: FiHome, label: "निवासी पत्ता", value: mr.permanentAddress, wrap: true },
  ];

  const faceStyle = {
    width: `${CARD_W_PX}px`,
    height: `${CARD_H_PX}px`,
    fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
    backgroundImage: `url(${backbanner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="flex flex-wrap items-start justify-center gap-10 px-1 py-2">
      {/* ---------- FRONT ---------- */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs font-semibold text-ink-500">Front</p>
        <div
          ref={frontRef}
          data-mr-ready={mr.ready ? "1" : "0"}
          className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
          style={faceStyle}
        >
          <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-4 min-h-[96px]">
            <div
              className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
              style={{ marginTop: "-18px" }}
            >
              <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
            </div>

            <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
              <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
                वसई-विरार शहर महानगरपालिका
              </p>

              <div className="relative w-full shrink-0 text-center">
                <h2 className="text-[15px] font-bold leading-tight tracking-tight text-[#BB981A]">
                  रस्ता विक्रेता ओळखपत्र
                </h2>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-[5px]">
            <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
              <div
                className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-[2px]"
                style={{ borderColor: "#F7E4C2" }}
              >
                <div className="h-full w-full overflow-hidden rounded-[4px] bg-[#ffffff]">
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

              <Link
                to={`/verify/${vendor.applicationNo}`}
                className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-1.5 transition-transform hover:scale-[1.03]"
                style={{ borderColor: "#F7E4C2" }}
              >
                <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
              </Link>
            </div>

            <div
              className="relative mt-[1px] grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
              style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
            >
              {frontFields.map((f) => (
                <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
              ))}
            </div>

            <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
              <div className="h-px w-[34%] bg-[#cbd5e1]" />
              <p className="whitespace-nowrap text-[10.5px] font-bold uppercase leading-tight tracking-[0.05em] text-[#0B5D30]">
                सहाय्यक आयुक्त
              </p>
              <p className="whitespace-nowrap text-[10.5px] font-semibold leading-tight text-[#475569]">(प्रभाग समिती)</p>
              <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- BACK ---------- */}
      <div className=" flex flex-col items-center">
        <p className="text-xs font-semibold text-ink-500">Back</p>
        <div
          ref={backRef}
          className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
          style={faceStyle}
        >
          <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-4 min-h-[96px]">
            <div
              className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
              style={{ marginTop: "-18px" }}
            >
              <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
            </div>

            <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
              <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff] pb-3">
                वसई-विरार शहर महानगरपालिका
              </p>
            </div>
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-[18px]">
            <div
              className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
              style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
            >
              <SectionHeading>Personal Information</SectionHeading>
              {personalFields.map((f) => (
                <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
              ))}

              <SectionHeading>Address Information</SectionHeading>
              {addressFields.map((f) => (
                <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} wrap={f.wrap} accent={f.accent} />
              ))}
            </div>

            <div className="relative mb-[12px] mt-auto w-full shrink-0 pt-1">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="whitespace-nowrap text-[10px] font-bold leading-none text-[#0B5D30]">टीप</span>
                <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/70 via-[#D9BE68]/50 to-transparent" />
              </div>
              <div className="space-y-[3px]">
                <div className="flex gap-1 text-[9.5px] font-medium leading-[13px] text-[#334155]">
                  <span className="shrink-0 font-bold">१)</span>
                  <span>ओळखपत्र हरवल्यास नगर पथविक्रेता समितीस निदर्शनास आणून द्यावे.</span>
                </div>
                <div className="flex gap-1 text-[9.5px] font-medium leading-[13px] text-[#334155]">
                  <span className="shrink-0 font-bold">२)</span>
                  <span>
                    हे ओळखपत्र पथविक्रेता (उपजीविकेचे संरक्षण व पथविक्री विनियमन) अधिनियम २०१४ मधील कलम ६ (३)
                    अंतर्गत असलेल्या अटींच्या आधारावर जारी केले आहे.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function BulkSmartCard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState([]); // array of applicationNo
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState("");

  const frontRefs = useRef({});
  const backRefs = useRef({});

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchVendorApplications({ status: "Certificate Issued", limit: 200 }).then((result) => {
      setLoading(false);
      if (!result.success) {
        setError(result.message || "Could not load vendors.");
        return;
      }
      setVendors((result.data || []).filter((v) => v.certificate?.certificateNo));
    });
  }, []);

  /* Font — SmartCard.jsx sarkhach (same id, mhanun dublicate link nahi banat).
     Juna bulk page ha font load karat navhta → text vegla disaycha. */
  useEffect(() => {
    if (document.getElementById("smartcard-poppins-font")) return;
    const link = document.createElement("link");
    link.id = "smartcard-poppins-font";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (document.getElementById("smartcard-selection-style")) return;
    const style = document.createElement("style");
    style.id = "smartcard-selection-style";
    style.textContent = `
      .smart-card-front ::selection,
      .smart-card-back ::selection {
        background-color: rgba(11, 93, 48, 0.12);
        color: inherit;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const toggleSelected = (applicationNo) => {
    setSelected((prev) => (prev.includes(applicationNo) ? prev.filter((n) => n !== applicationNo) : [...prev, applicationNo]));
  };

  const toggleSelectAll = () => {
    setSelected((prev) => (prev.length === vendors.length ? [] : vendors.map((v) => v.applicationNo)));
  };

  const selectedVendors = useMemo(
    () => vendors.filter((v) => selected.includes(v.applicationNo)),
    [vendors, selected]
  );

  /* ==================== CAPTURE (SmartCard.jsx sarkhach) ==================== */

  const STYLE_PROPS_TO_FLATTEN = [
    "backgroundImage", "backgroundColor", "backgroundClip", "WebkitBackgroundClip",
    "backgroundPosition", "backgroundSize", "backgroundRepeat", "color",
    "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor",
    "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
    "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius",
    "borderStyle", "opacity", "fill", "stroke",
  ];

  const flattenComputedStyles = (sourceEl, targetEl) => {
    try {
      if (!sourceEl || !targetEl || sourceEl.nodeType !== 1 || targetEl.nodeType !== 1) return;
      let computed;
      try {
        computed = window.getComputedStyle(sourceEl);
      } catch {
        return;
      }
      STYLE_PROPS_TO_FLATTEN.forEach((prop) => {
        try {
          const value = computed[prop];
          if (value) targetEl.style[prop] = value;
        } catch {
          // ignore
        }
      });
      const sourceChildren = sourceEl.children || [];
      const targetChildren = targetEl.children || [];
      const count = Math.min(sourceChildren.length, targetChildren.length);
      for (let i = 0; i < count; i++) flattenComputedStyles(sourceChildren[i], targetChildren[i]);
    } catch {
      // never throw upward
    }
  };

  const withTimeout = (promise, ms, label) =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
      promise.then(
        (value) => { clearTimeout(timer); resolve(value); },
        (err) => { clearTimeout(timer); reject(err); }
      );
    });

  const captureFace = async (el) => {
    if (!el) return null;
    if (document.fonts && document.fonts.ready) {
      try {
        await withTimeout(document.fonts.ready, 3000, "Font load");
      } catch {
        // proceed anyway
      }
    }
    return withTimeout(
      html2canvas(el, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        foreignObjectRendering: false,
        imageTimeout: 0,
        logging: false,
        onclone: (_clonedDoc, clonedElement) => flattenComputedStyles(el, clonedElement),
      }),
      15000,
      "Card capture"
    );
  };

  /* Capture aadhi sagle selected cards che naav/patta Marathi madhe convert
     jhale ka te check (data-mr-ready="1"). Max 10s — internet slow asel
     tari button adkun rahnar nahi. */
  const waitForMarathi = async () => {
    const start = Date.now();
    while (Date.now() - start < 10000) {
      const allReady = selectedVendors.every((v) => {
        const el = frontRefs.current[v.applicationNo];
        return el && el.getAttribute("data-mr-ready") === "1";
      });
      if (allReady) return;
      await new Promise((r) => setTimeout(r, 200));
    }
  };

  const captureAll = async () => {
    setExportProgress("Marathi text tayar hot aahe...");
    await waitForMarathi();

    const results = [];
    for (let i = 0; i < selectedVendors.length; i++) {
      const v = selectedVendors[i];
      setExportProgress(`Capturing ${i + 1} / ${selectedVendors.length} — ${v.personal?.fullName || v.applicationNo}`);
      const frontEl = frontRefs.current[v.applicationNo];
      const backEl = backRefs.current[v.applicationNo];
      const [frontCanvas, backCanvas] = await Promise.all([captureFace(frontEl), captureFace(backEl)]);
      if (!frontCanvas || !backCanvas) continue;
      results.push({
        applicationNo: v.applicationNo,
        frontData: frontCanvas.toDataURL("image/png"),
        backData: backCanvas.toDataURL("image/png"),
      });
    }
    return results;
  };

  const handleBulkDownload = async () => {
    if (isExporting || selectedVendors.length === 0) return;
    setIsExporting(true);
    setExportProgress("Preparing...");
    try {
      const captured = await captureAll();
      if (captured.length === 0) return;

      // SmartCard.jsx sarkhach — portrait 90 x 105 mm, pratyek vendor: front page + back page
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [CARD_WIDTH_MM, CARD_HEIGHT_MM] });
      captured.forEach((c, idx) => {
        if (idx > 0) pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
        pdf.addImage(c.frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
        pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
        pdf.addImage(c.backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
      });
      // ekach card select kela tar file naav pan single card sarkhach
      pdf.save(captured.length === 1 ? `SmartCard-${captured[0].applicationNo}.pdf` : `SmartCards-Bulk-${captured.length}.pdf`);
    } catch (err) {
      console.error("Bulk smart card download failed:", err);
      window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
    } finally {
      setIsExporting(false);
      setExportProgress("");
    }
  };

  const handleBulkPrint = async () => {
    if (isExporting || selectedVendors.length === 0) return;
    setIsExporting(true);
    setExportProgress("Preparing...");
    try {
      const captured = await captureAll();
      if (captured.length === 0) return;

      const printWindow = window.open("", "_blank", "width=800,height=1000");
      if (!printWindow) {
        window.alert("Please allow pop-ups for this site to print the Smart Cards.");
        return;
      }
      const pages = captured
        .map((c) => `<div class="page"><img src="${c.frontData}" /></div><div class="page"><img src="${c.backData}" /></div>`)
        .join("");
      printWindow.document.write(
        "<html><head><title>Smart Cards - Bulk</title><style>" +
          "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
          "* { margin: 0; padding: 0; box-sizing: border-box; }" +
          "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
          "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
          "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
          ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
          ".page:last-child { page-break-after: auto; }" +
          "</style></head><body>" + pages + "</body></html>"
      );
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };
    } catch (err) {
      console.error("Bulk smart card print failed:", err);
      window.alert("Print failed: " + (err && err.message ? err.message : String(err)));
    } finally {
      setIsExporting(false);
      setExportProgress("");
    }
  };

  /* ==================== NOT AUTHORIZED — same rule as SmartCard.jsx ==================== */

  if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
    return (
      <Card className="mx-auto max-w-md text-center">
        <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
        <p className="text-sm font-semibold text-ink-700">You're not authorized to view this page.</p>
        <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can bulk print or download Smart Cards.</p>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
          Back to Dashboard
        </Link>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
        <FiLoader className="animate-spin" size={20} />
        Loading...
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-md text-center">
        <p className="text-sm text-ink-500">{error}</p>
        <Link to="/applications" className="mt-3 inline-block text-sm font-semibold text-brand-600">
          Back to Applications
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-ink-500">
            <Link to="/applications" className="text-brand-600 hover:text-brand-700">
              Application Approval
            </Link>
            {" / "}Bulk Smart Card
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">Bulk Print / Download — पथविक्रेता ओळखपत्र</h1>
          <p className="mt-1 text-sm text-ink-500">
            {vendors.length} ID card(s) available. {selected.length > 0 && <span className="font-semibold text-brand-600">{selected.length} selected.</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={FiDownload} onClick={handleBulkDownload} disabled={isExporting || selected.length === 0}>
            {isExporting ? "Preparing..." : `Download (${selected.length})`}
          </Button>
          <Button icon={FiPrinter} onClick={handleBulkPrint} disabled={isExporting || selected.length === 0}>
            {isExporting ? "Preparing..." : `Print (${selected.length})`}
          </Button>
        </div>
      </div>

      {isExporting && exportProgress && (
        <Card className="flex items-center gap-2 text-sm text-ink-600">
          <FiLoader className="animate-spin" size={16} />
          {exportProgress}
        </Card>
      )}

      {/* ================= VENDOR SELECTION LIST ================= */}
      <Card padded={false} className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3">
          <button onClick={toggleSelectAll} className="flex items-center gap-2 text-sm font-semibold text-ink-700">
            {selected.length === vendors.length && vendors.length > 0 ? (
              <FiCheckSquare className="text-brand-600" />
            ) : (
              <FiSquare className="text-ink-400" />
            )}
            Select all
          </button>
        </div>
        <div className="max-h-[420px] divide-y divide-ink-100 overflow-y-auto">
          {vendors.length === 0 && <p className="p-5 text-sm text-ink-500">No ID cards have been generated yet.</p>}
          {vendors.map((v) => (
            <button
              key={v.applicationNo}
              onClick={() => toggleSelected(v.applicationNo)}
              className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-ink-50"
            >
              {selected.includes(v.applicationNo) ? (
                <FiCheckSquare className="shrink-0 text-brand-600" />
              ) : (
                <FiSquare className="shrink-0 text-ink-400" />
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink-900">{v.personal?.fullName || v.applicationNo}</span>
                <span className="block truncate text-xs text-ink-500">
                  {v.certificate?.certificateNo} · Ward {v.address?.ward || "-"}
                </span>
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* ================= PREVIEW — preview hech capture source (same refs),
         mhanun preview = print/download output. ================= */}
      {selectedVendors.length > 0 && (
        <Card>
          <p className="mb-4 text-sm font-bold text-ink-900">
            Preview — {selectedVendors.length} card{selectedVendors.length > 1 ? "s" : ""}
          </p>
          <div className="max-h-[640px] space-y-8 overflow-y-auto pr-1">
            {selectedVendors.map((v) => (
              <div key={v.applicationNo}>
                <p className="mb-2 text-xs font-semibold text-ink-500">
                  {v.personal?.fullName || v.applicationNo} · {v.certificate?.certificateNo}
                </p>
                <VendorCardFaces
                  vendor={v}
                  frontRef={(el) => { frontRefs.current[v.applicationNo] = el; }}
                  backRef={(el) => { backRefs.current[v.applicationNo] = el; }}
                />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}


