



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
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
//     // { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace},
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     //  { icon: FiTag, label: "व्यवसायाचा पत्ता", value: saleType(vendor.address.workingAddress) },
//     { icon: FiTag, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress },

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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
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
//                  (photo box sized to ~50% of the body's height, with a thin
//                  signature line + label directly beneath it), right column
//                  ~71% width holding the title at top and the six fields
//                  below, spread with content-between so there is no leftover
//                  blank space. A very faint diagonal pattern sits behind the
//                  whole body for a premium printed-card texture. ── */}
//             <div className="relative flex flex-1 items-stretch gap-3 px-3 pb-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />
//               <div className="relative flex h-full w-[29%] shrink-0 flex-col items-center justify-start gap-1">
//                 <div className="mt-2 h-[50%] w-full overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={30} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//                 {/* ── Signature line, pinned to the bottom of the photo
//                      column (mt-auto) — a thin rule with a small label
//                      beneath it, matching the printed reference card's
//                      layout. ── */}
//                 <div className="mt-auto flex w-[85%] shrink-0 flex-col items-center gap-[1px] pb-0.5">
//                   <div className="h-px w-full bg-[#64748b]" />
//                   <p className="whitespace-nowrap text-[6px] font-extrabold leading-tight tracking-wide text-[#1e293b]">सहाय्यक आयुक्त</p>
//                   <p className="whitespace-nowrap text-[5.5px] leading-tight text-[#64748b]">(स्वाक्षरी)</p>
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
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
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






// import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
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
//       <span className="min-w-0 whitespace-nowrap text-[11.2px] font-bold leading-[14px] text-[#475569]">{label}</span>
//       <span className="text-[11.2px] font-bold leading-[14px] text-[#475569]">:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one. */}
//       <span className="min-w-0 whitespace-normal break-words border-b border-dotted border-[#C9A227] pb-[1px] text-[12.3px] font-extrabold leading-[14px] text-[#0f172a]">
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

//   // Load Poppins (modern, govt/project-UI friendly) once for the card faces.
//   // Noto Sans Devanagari is pulled in alongside it purely as a fallback —
//   // Poppins has no Devanagari glyphs, so Marathi labels/values need a font
//   // that actually covers them; English/numerals still render in Poppins.
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

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

//   const CARD_WIDTH_MM = 90;
//   const CARD_HEIGHT_MM = 105;
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
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
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
//     // { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace},
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     //  { icon: FiTag, label: "व्यवसायाचा पत्ता", value: saleType(vendor.address.workingAddress) },
//     { icon: FiTag, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress },

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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
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
//                 <p className="whitespace-nowrap text-[12px] font-black uppercase tracking-wide text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: single-column stack — title, then photo, then the
//                  six fields as full-width rows, then the AC signature line
//                  pinned to the bottom. A very faint diagonal pattern sits
//                  behind the whole body for a premium printed-card texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2 px-4 pb-2.5 pt-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* Title */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="text-[17.3px] font-black leading-tight tracking-tight text-[#0B5D30]">
//                   रस्ता विक्रेता ओळखपत्र
//                 </h2>
//                 <p className="text-[10.5px] font-bold italic leading-tight text-[#B9861C]">
//                   (Street Vendor Identity Card)
//                 </p>
//                 <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//               </div>

//               {/* QR + Photo — QR (same size/style as the back face) now sits
//                    to the left of the photo, side by side, both unchanged
//                    in size/border/shadow from their existing styling. ── */}
//               <div className="flex shrink-0 items-center justify-center gap-3">
//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>

//                 <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto) — same
//                    thin rule + label as before, just centered under the
//                    whole card now instead of under the photo column. ── */}
//               <div className="mt-auto flex w-[55%] shrink-0 flex-col items-center gap-[1px] pb-0.5">
//                 <div className="h-px w-full bg-[#64748b]" />
//                 <p className="whitespace-nowrap text-[10px] font-extrabold leading-tight tracking-wide text-[#1e293b]">सहाय्यक आयुक्त</p>
//                 <p className="whitespace-nowrap text-[9.5px] font-bold leading-tight text-[#64748b]">(स्वाक्षरी)</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
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

//             {/* ── Body: single-column stack — QR at the top, then the six
//                  fields as full-width rows below it. A faint diagonal
//                  pattern echoes the front card's texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-3">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* QR */}
//               {/* <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//               >
//                 <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//               </Link> */}

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[18px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {backFields.map((f) => (
//                   <Fragment key={f.label}>
//                     <IconCardField icon={f.icon} label={f.label} value={f.value} />
//                     {(f.label === "व्यवसायाचा पत्ता" || f.label === "पत्ता") && (
//                       <div className="col-span-4 h-[14px]" aria-hidden="true" />
//                     )}
//                   </Fragment>
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









// import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
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

// function IconCardField({ icon: Icon, label, value, wrap = false }) {
//   return (
//     <>
//       <span className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#E7EFEA] text-[#0B5D30]">
//         <Icon size={8.5} />
//       </span>
//       <span className="min-w-0 whitespace-nowrap text-[11.2px] font-bold leading-[14px] text-[#475569]">{label}</span>
//       <span className="text-[11.2px] font-bold leading-[14px] text-[#475569]">:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one.
//           When `wrap` is set (used for the address fields, which regularly
//           run onto 2 lines): a single border-bottom only ever draws under
//           the LAST line of a wrapped box, so line 1 ("...virar") was left
//           with no underline at all. Switching to a text-decoration dotted
//           underline instead fixes that — text-decoration is drawn under
//           EVERY line of wrapped text, so both "...virar" and "(West)
//           Working/Residence" each get their own dotted line. underline-
//           offset pushes it down off the descenders, and the extra
//           line-height gives the two lines (and their two underlines) room
//           to breathe instead of crowding into each other. */}
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[12.3px] font-extrabold text-[#0f172a] ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
//             : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
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

//   // Load Poppins (modern, govt/project-UI friendly) once for the card faces.
//   // Noto Sans Devanagari is pulled in alongside it purely as a fallback —
//   // Poppins has no Devanagari glyphs, so Marathi labels/values need a font
//   // that actually covers them; English/numerals still render in Poppins.
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

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

//   const CARD_WIDTH_MM = 90;
//   const CARD_HEIGHT_MM = 105;
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
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
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
//     // { icon: FiTag, label: "विक्रीचा प्रकार", value: saleType(vendor.business.vendorType) },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace},
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     //  { icon: FiTag, label: "व्यवसायाचा पत्ता", value: saleType(vendor.address.workingAddress) },
//     { icon: FiTag, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true },

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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
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
//                 <p className="whitespace-nowrap text-[12px] font-black uppercase tracking-wide text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: single-column stack — title, then photo, then the
//                  six fields as full-width rows, then the AC signature line
//                  pinned to the bottom. A very faint diagonal pattern sits
//                  behind the whole body for a premium printed-card texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2 px-4 pb-2.5 pt-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* Title */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="text-[17.3px] font-black leading-tight tracking-tight text-[#0B5D30]">
//                   रस्ता विक्रेता ओळखपत्र
//                 </h2>
//                 <p className="text-[11.5px] font-extrabold italic leading-tight text-[#B9861C]">
//                   (Street Vendor Identity Card)
//                 </p>
//                 <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//               </div>

//               {/* QR + Photo — QR (same size/style as the back face) now sits
//                    to the left of the photo, side by side, both unchanged
//                    in size/border/shadow from their existing styling. ── */}
//               <div className="flex shrink-0 items-center justify-center gap-3">
//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>

//                 <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto) — same
//                    thin rule + label as before, just centered under the
//                    whole card now instead of under the photo column. ── */}
//               <div className="mt-auto flex w-[55%] shrink-0 flex-col items-center gap-[1px] pb-0.5">
//                 <div className="h-px w-full bg-[#64748b]" />
//                 <p className="whitespace-nowrap text-[10px] font-extrabold leading-tight tracking-wide text-[#1e293b]">सहाय्यक आयुक्त</p>
//                 <p className="whitespace-nowrap text-[9.5px] font-bold leading-tight text-[#64748b]">(स्वाक्षरी)</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — same logo + corporation name as the front
//                  face, so both sides read as one consistent card. Only the
//                  header changed here; everything below it on the back is
//                  untouched. ── */}
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

//               <div className="min-w-0 space-y-[6px] leading-tight">
//                 <p className="whitespace-nowrap text-[12px] font-black uppercase tracking-wide text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: single-column stack — QR at the top, then the six
//                  fields as full-width rows below it. A faint diagonal
//                  pattern echoes the front card's texture.
//                  Top padding bumped up (pt-3 -> pt-6) per feedback so the
//                  back face has clearly more breathing room below the green
//                  header strip before the first field starts. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* QR */}
//               {/* <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//               >
//                 <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//               </Link> */}

//               {/* Fields — full-width rows, stacked one per line.
//                   gap-y set to 16px — this is now the ONLY space between
//                   the two wrapped address rows (व्यवसायाचा पत्ता / पत्ता)
//                   since their dedicated extra spacer was removed. */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[16px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {backFields.map((f) => (
//                   <Fragment key={f.label}>
//                     <IconCardField icon={f.icon} label={f.label} value={f.value} wrap={f.wrap} />
//                     {/* Address fields wrap onto 2 lines, each with its own
//                         dotted underline now (see IconCardField) — that
//                         already reads as a complete block on its own, so no
//                         dedicated spacer is needed between the two address
//                         rows any more. Removed entirely (was 16px) per
//                         feedback — the base grid gap-y below is now the
//                         only space between "...Working" and "पत्ता". */}
//                   </Fragment>
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





// import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
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
//    so every row lines up cleanly.

//    Typography hierarchy (kept consistent everywhere this is
//    used): label = Medium/500, value = SemiBold/600, and the
//    `strong` flag bumps a single row (the vendor's name) up to
//    Bold/700 — the only three weights used across the card.

//    `accent` lets a single row's icon chip use a warm gold tone
//    instead of the default green, so the business address can
//    read as visually distinct from the residential address
//    without changing the icon glyph or the surrounding layout.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

//   return (
//     <>
//       <span className={`mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} />
//       </span>
//       <span className="min-w-0 whitespace-nowrap text-[10.6px] font-medium leading-[14px] text-[#5b6b7a]">{label}</span>
//       <span className="text-[10.6px] font-medium leading-[14px] text-[#5b6b7a]">:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one.
//           When `wrap` is set (used for the address fields, which regularly
//           run onto 2 lines): a single border-bottom only ever draws under
//           the LAST line of a wrapped box, so line 1 ("...virar") was left
//           with no underline at all. Switching to a text-decoration dotted
//           underline instead fixes that — text-decoration is drawn under
//           EVERY line of wrapped text, so both "...virar" and "(West)
//           Working/Residence" each get their own dotted line. underline-
//           offset pushes it down off the descenders, and the extra
//           line-height gives the two lines (and their two underlines) room
//           to breathe instead of crowding into each other. */}
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[12px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
//             : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    SECTION HEADING — used on the back face to group fields into
//    "PERSONAL INFORMATION" / "ADDRESS INFORMATION" without adding
//    visual weight: a small green uppercase eyebrow plus a thin
//    gold rule that trails off toward the edge of the card. Spans
//    all 4 grid columns so it sits flush with the rows below it.
// ========================================================= */

// function SectionHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[2px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.6px] font-bold uppercase tracking-[0.14em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#D9BE68] to-transparent opacity-80" />
//     </div>
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

//   // Load Poppins (modern, govt/project-UI friendly) once for the card faces.
//   // Noto Sans Devanagari is pulled in alongside it purely as a fallback —
//   // Poppins has no Devanagari glyphs, so Marathi labels/values need a font
//   // that actually covers them; English/numerals still render in Poppins.
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // A plain browser text-selection highlight (bright blue, full-opacity)
//   // reads as an accidental artifact on a printed-style ID card. This scopes
//   // a soft, on-brand selection color to just the two card faces so an
//   // accidental click-drag never shows the default blue.
//   useEffect(() => {
//     if (document.getElementById("smartcard-selection-style")) return;
//     const style = document.createElement("style");
//     style.id = "smartcard-selection-style";
//     style.textContent = `
//       .smart-card-front ::selection,
//       .smart-card-back ::selection {
//         background-color: rgba(11, 93, 48, 0.12);
//         color: inherit;
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

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

//   const CARD_WIDTH_MM = 90;
//   const CARD_HEIGHT_MM = 105;
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
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
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
//      Back is now split into two labelled groups instead of one flat list:
//        - PERSONAL INFORMATION: dob/age, business type, vending place, timing
//        - ADDRESS INFORMATION: business address, residential address
//      Same fields, same data, same icons as before — only the grouping and
//      the "पत्ता" label (now "निवासी पत्ता", to read unambiguously as the
//      residential address once it sits next to the business address) changed. */

//   const frontFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const personalFields = [
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//   ];

//   const addressFields = [
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     // accent: "gold" gives the business address a warm icon chip so it reads
//     // as visually distinct from the residential address right below it.
//     { icon: FiTag, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
//     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name. The logo now sits inside its own white ring with real
//                  padding around the emblem (rather than a border drawn flush
//                  against it), and the two name lines are centered as one
//                  flex column against that ring's full height so the English
//                  and Marathi lines feel deliberately balanced rather than
//                  just stacked. A single hairline gold rule closes out the
//                  bottom edge — restrained, not a decorative wave. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits.
//                    `flex flex-col justify-center` keeps both lines centered
//                    against the taller logo ring beside them. ── */}
//               <div className="flex min-w-0 flex-col justify-center gap-[3px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: single-column stack — title, then photo, then the
//                  six fields as full-width rows, then the AC signature line
//                  pinned to the bottom. A very faint diagonal pattern sits
//                  behind the whole body for a premium printed-card texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* Title */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="text-[17.3px] font-bold leading-tight tracking-tight text-[#0B5D30]">
//                   रस्ता विक्रेता ओळखपत्र
//                 </h2>
//                 <p className="text-[11.5px] font-semibold italic leading-tight text-[#B9861C]">
//                   (Street Vendor Identity Card)
//                 </p>
//                 <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//               </div>

//               {/* QR + Photo — QR (same size/style as the back face) now sits
//                    to the left of the photo, side by side, both unchanged
//                    in size/border/shadow from their existing styling. ── */}
//               <div className="flex shrink-0 items-center justify-center gap-3">
//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>

//                 <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto). Shortened
//                    and centered so it reads as a deliberate signature block
//                    rather than a stray leftover rule; "सहाय्यक आयुक्त" is now
//                    the prominent line (green, bold, small-caps tracking) with
//                    "(स्वाक्षरी)" reduced to a quiet secondary caption. A thin
//                    gold rule closes out the very bottom of the card, mirroring
//                    the header's hairline for a finished, bookend feel. ── */}
//               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
//                 <div className="h-px w-[34%] bg-[#94a3b8]" />
//                 <p className="whitespace-nowrap text-[11px] font-bold uppercase leading-tight tracking-[0.03em] text-[#0B5D30]">
//                   सहाय्यक आयुक्त
//                 </p>
//                 <p className="whitespace-nowrap text-[8.5px] font-medium leading-tight text-[#94a3b8]">(स्वाक्षरी)</p>
//                 <div className="mt-1 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-80" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — identical treatment to the front face (see
//                  comments there): more breathing room around the logo, the
//                  two name lines centered against it as one column, and a
//                  single hairline gold rule instead of the old decorative
//                  wave, so both faces read as one consistent card. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="flex min-w-0 flex-col justify-center gap-[3px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: QR at the top (unchanged, currently commented out
//                  as in the original), then the fields grouped into two
//                  clearly labelled sections — PERSONAL INFORMATION and
//                  ADDRESS INFORMATION — instead of one flat list. A faint
//                  diagonal pattern echoes the front face's texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* QR */}
//               {/* <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//               >
//                 <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//               </Link> */}

//               {/* Fields — grouped into two labelled sections. Each
//                   SectionHeading spans all 4 grid columns so the eyebrow +
//                   gold rule sits flush above its rows; gap-y is the only
//                   spacing between rows within a section, and the heading's
//                   own top padding gives the two groups a clear but light
//                   separation. */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[13px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 <SectionHeading>Personal Information</SectionHeading>
//                 {personalFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}

//                 <SectionHeading>Address Information</SectionHeading>
//                 {addressFields.map((f) => (
//                   <IconCardField
//                     key={f.label}
//                     icon={f.icon}
//                     label={f.label}
//                     value={f.value}
//                     wrap={f.wrap}
//                     accent={f.accent}
//                   />
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




// import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
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
//    so every row lines up cleanly.

//    Typography hierarchy (kept consistent everywhere this is
//    used): label = Medium/500, value = SemiBold/600, and the
//    `strong` flag bumps a single row (the vendor's name) up to
//    Bold/700 — the only three weights used across the card.

//    `accent` lets a single row's icon chip use a warm gold tone
//    instead of the default green, so the business address can
//    read as visually distinct from the residential address
//    without changing the icon glyph or the surrounding layout.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

//   return (
//     <>
//       <span className={`mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} />
//       </span>
//       <span className="min-w-0 whitespace-nowrap text-[10.6px] font-medium leading-[14px] text-[#5b6b7a]">{label}</span>
//       <span className="text-[10.6px] font-medium leading-[14px] text-[#5b6b7a]">:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one.
//           When `wrap` is set (used for the address fields, which regularly
//           run onto 2 lines): a single border-bottom only ever draws under
//           the LAST line of a wrapped box, so line 1 ("...virar") was left
//           with no underline at all. Switching to a text-decoration dotted
//           underline instead fixes that — text-decoration is drawn under
//           EVERY line of wrapped text, so both "...virar" and "(West)
//           Working/Residence" each get their own dotted line. underline-
//           offset pushes it down off the descenders, and the extra
//           line-height gives the two lines (and their two underlines) room
//           to breathe instead of crowding into each other. */}
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[12px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
//             : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    SECTION HEADING — used on the back face to group fields into
//    "PERSONAL INFORMATION" / "ADDRESS INFORMATION" without adding
//    visual weight: a small green uppercase eyebrow plus a thin
//    gold rule that trails off toward the edge of the card. Spans
//    all 4 grid columns so it sits flush with the rows below it.
// ========================================================= */

// function SectionHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[2px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.6px] font-bold uppercase tracking-[0.14em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#D9BE68] to-transparent opacity-80" />
//     </div>
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

//   // Load Poppins (modern, govt/project-UI friendly) once for the card faces.
//   // Noto Sans Devanagari is pulled in alongside it purely as a fallback —
//   // Poppins has no Devanagari glyphs, so Marathi labels/values need a font
//   // that actually covers them; English/numerals still render in Poppins.
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // A plain browser text-selection highlight (bright blue, full-opacity)
//   // reads as an accidental artifact on a printed-style ID card. This scopes
//   // a soft, on-brand selection color to just the two card faces so an
//   // accidental click-drag never shows the default blue.
//   useEffect(() => {
//     if (document.getElementById("smartcard-selection-style")) return;
//     const style = document.createElement("style");
//     style.id = "smartcard-selection-style";
//     style.textContent = `
//       .smart-card-front ::selection,
//       .smart-card-back ::selection {
//         background-color: rgba(11, 93, 48, 0.12);
//         color: inherit;
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

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

//   const CARD_WIDTH_MM = 90;
//   const CARD_HEIGHT_MM = 105;
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
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
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
//      Back is now split into two labelled groups instead of one flat list:
//        - PERSONAL INFORMATION: dob/age, business type, vending place, timing
//        - ADDRESS INFORMATION: business address, residential address
//      Same fields, same data, same icons as before — only the grouping and
//      the "पत्ता" label (now "निवासी पत्ता", to read unambiguously as the
//      residential address once it sits next to the business address) changed. */

//   const frontFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const personalFields = [
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//   ];

//   const addressFields = [
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     // accent: "gold" gives the business address a warm icon chip so it reads
//     // as visually distinct from the residential address right below it.
//     { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
//     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name. The logo now sits inside its own white ring with real
//                  padding around the emblem (rather than a border drawn flush
//                  against it), and the two name lines are centered as one
//                  flex column against that ring's full height so the English
//                  and Marathi lines feel deliberately balanced rather than
//                  just stacked. A single hairline gold rule closes out the
//                  bottom edge — restrained, not a decorative wave. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits.
//                    `flex flex-col justify-center` keeps both lines centered
//                    against the taller logo ring beside them. ── */}
//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: single-column stack — title, then photo, then the
//                  six fields as full-width rows, then the AC signature line
//                  pinned to the bottom. A very faint diagonal pattern sits
//                  behind the whole body for a premium printed-card texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* Title */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="text-[17.3px] font-bold leading-tight tracking-tight text-[#0B5D30]">
//                   रस्ता विक्रेता ओळखपत्र
//                 </h2>
//                 <p className="text-[11.5px] font-semibold italic leading-tight text-[#B9861C]">
//                   (Street Vendor Identity Card)
//                 </p>
//                 <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//               </div>

//               {/* QR + Photo — QR (same size/style as the back face) now sits
//                    to the left of the photo, side by side, both unchanged
//                    in size/border/shadow from their existing styling. ── */}
//               <div className="flex shrink-0 items-center justify-center gap-3">
//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>

//                 <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto). Shortened
//                    and centered so it reads as a deliberate signature block
//                    rather than a stray leftover rule; "सहाय्यक आयुक्त" is now
//                    the prominent line (green, bold, small-caps tracking) with
//                    "(स्वाक्षरी)" reduced to a quiet secondary caption. A thin
//                    gold rule closes out the very bottom of the card, mirroring
//                    the header's hairline for a finished, bookend feel. ── */}
//               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
//                 <div className="h-px w-[34%] bg-[#94a3b8]" />
//                 <p className="whitespace-nowrap text-[11px] font-bold uppercase leading-tight tracking-[0.03em] text-[#0B5D30]">
//                   सहाय्यक आयुक्त
//                 </p>
//                 <p className="whitespace-nowrap text-[8.5px] font-bold leading-tight text-[#94a3b8]">(स्वाक्षरी)</p>
//                 <div className="mt-1 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-80" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — identical treatment to the front face (see
//                  comments there): more breathing room around the logo, the
//                  two name lines centered against it as one column, and a
//                  single hairline gold rule instead of the old decorative
//                  wave, so both faces read as one consistent card. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: QR at the top (unchanged, currently commented out
//                  as in the original), then the fields grouped into two
//                  clearly labelled sections — PERSONAL INFORMATION and
//                  ADDRESS INFORMATION — instead of one flat list. A faint
//                  diagonal pattern echoes the front face's texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* QR */}
//               {/* <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//               >
//                 <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//               </Link> */}

//               {/* Fields — grouped into two labelled sections. Each
//                   SectionHeading spans all 4 grid columns so the eyebrow +
//                   gold rule sits flush above its rows; gap-y is the only
//                   spacing between rows within a section, and the heading's
//                   own top padding gives the two groups a clear but light
//                   separation. */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[13px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 <SectionHeading>Personal Information</SectionHeading>
//                 {personalFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}

//                 <SectionHeading>Address Information</SectionHeading>
//                 {addressFields.map((f) => (
//                   <IconCardField
//                     key={f.label}
//                     icon={f.icon}
//                     label={f.label}
//                     value={f.value}
//                     wrap={f.wrap}
//                     accent={f.accent}
//                   />
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





// import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
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
//    so every row lines up cleanly.

//    Typography hierarchy (kept consistent everywhere this is
//    used): label = Medium/500, value = SemiBold/600, and the
//    `strong` flag bumps a single row (the vendor's name) up to
//    Bold/700 — the only three weights used across the card.

//    `accent` lets a single row's icon chip use a warm gold tone
//    instead of the default green, so the business address can
//    read as visually distinct from the residential address
//    without changing the icon glyph or the surrounding layout.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

//   return (
//     <>
//       <span className={`mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} />
//       </span>
//       <span
//         className={`min-w-0 whitespace-nowrap text-[10.6px] leading-[14px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         }`}
//       >
//         {label}
//       </span>
//       <span className={`text-[10.6px] leading-[14px] text-[#0f172a] ${strong ? "font-bold" : "font-semibold"}`}>:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one.
//           When `wrap` is set (used for the address fields, which regularly
//           run onto 2 lines): a single border-bottom only ever draws under
//           the LAST line of a wrapped box, so line 1 ("...virar") was left
//           with no underline at all. Switching to a text-decoration dotted
//           underline instead fixes that — text-decoration is drawn under
//           EVERY line of wrapped text, so both "...virar" and "(West)
//           Working/Residence" each get their own dotted line. underline-
//           offset pushes it down off the descenders, and the extra
//           line-height gives the two lines (and their two underlines) room
//           to breathe instead of crowding into each other. */}
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[12px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
//             : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    SECTION HEADING — used on the back face to group fields into
//    "PERSONAL INFORMATION" / "ADDRESS INFORMATION" without adding
//    visual weight: a small green uppercase eyebrow plus a thin
//    gold rule that trails off toward the edge of the card. Spans
//    all 4 grid columns so it sits flush with the rows below it.
// ========================================================= */

// function SectionHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[2px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.6px] font-bold uppercase tracking-[0.14em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#D9BE68] to-transparent opacity-80" />
//     </div>
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

//   // Load Poppins (modern, govt/project-UI friendly) once for the card faces.
//   // Noto Sans Devanagari is pulled in alongside it purely as a fallback —
//   // Poppins has no Devanagari glyphs, so Marathi labels/values need a font
//   // that actually covers them; English/numerals still render in Poppins.
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // A plain browser text-selection highlight (bright blue, full-opacity)
//   // reads as an accidental artifact on a printed-style ID card. This scopes
//   // a soft, on-brand selection color to just the two card faces so an
//   // accidental click-drag never shows the default blue.
//   useEffect(() => {
//     if (document.getElementById("smartcard-selection-style")) return;
//     const style = document.createElement("style");
//     style.id = "smartcard-selection-style";
//     style.textContent = `
//       .smart-card-front ::selection,
//       .smart-card-back ::selection {
//         background-color: rgba(11, 93, 48, 0.12);
//         color: inherit;
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

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

//   const CARD_WIDTH_MM = 90;
//   const CARD_HEIGHT_MM = 105;
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
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
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
//      Back is now split into two labelled groups instead of one flat list:
//        - PERSONAL INFORMATION: dob/age, business type, vending place, timing
//        - ADDRESS INFORMATION: business address, residential address
//      Same fields, same data, same icons as before — only the grouping and
//      the "पत्ता" label (now "निवासी पत्ता", to read unambiguously as the
//      residential address once it sits next to the business address) changed. */

//   const frontFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const personalFields = [
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//   ];

//   const addressFields = [
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     // accent: "gold" gives the business address a warm icon chip so it reads
//     // as visually distinct from the residential address right below it.
//     { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
//     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name. The logo now sits inside its own white ring with real
//                  padding around the emblem (rather than a border drawn flush
//                  against it), and the two name lines are centered as one
//                  flex column against that ring's full height so the English
//                  and Marathi lines feel deliberately balanced rather than
//                  just stacked. A single hairline gold rule closes out the
//                  bottom edge — restrained, not a decorative wave. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits.
//                    `flex flex-col justify-center` keeps both lines centered
//                    against the taller logo ring beside them. ── */}
//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: single-column stack — title, then photo, then the
//                  six fields as full-width rows, then the AC signature line
//                  pinned to the bottom. A very faint diagonal pattern sits
//                  behind the whole body for a premium printed-card texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* Title */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="text-[17.3px] font-bold leading-tight tracking-tight text-[#0B5D30]">
//                   रस्ता विक्रेता ओळखपत्र
//                 </h2>
//                 <p className="text-[11.5px] font-semibold italic leading-tight text-[#B9861C]">
//                   (Street Vendor Identity Card)
//                 </p>
//                 <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//               </div>

//               {/* QR + Photo — QR (same size/style as the back face) now sits
//                    to the left of the photo, side by side, both unchanged
//                    in size/border/shadow from their existing styling. ── */}
//               <div className="flex shrink-0 items-center justify-center gap-3">
//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>

//                 <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto). Shortened
//                    and centered so it reads as a deliberate signature block
//                    rather than a stray leftover rule; "सहाय्यक आयुक्त" is now
//                    the prominent line (green, bold, small-caps tracking) with
//                    "(स्वाक्षरी)" reduced to a quiet secondary caption. A thin
//                    gold rule closes out the very bottom of the card, mirroring
//                    the header's hairline for a finished, bookend feel. ── */}
//               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
//                 <div className="h-px w-[34%] bg-[#94a3b8]" />
//                 <p className="whitespace-nowrap text-[11px] font-bold uppercase leading-tight tracking-[0.03em] text-[#0B5D30]">
//                   सहाय्यक आयुक्त
//                 </p>
//                 <p className="whitespace-nowrap text-[8.5px] font-bold leading-tight text-[#94a3b8]">(स्वाक्षरी)</p>
//                 <div className="mt-1 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-80" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — identical treatment to the front face (see
//                  comments there): more breathing room around the logo, the
//                  two name lines centered against it as one column, and a
//                  single hairline gold rule instead of the old decorative
//                  wave, so both faces read as one consistent card. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: QR at the top (unchanged, currently commented out
//                  as in the original), then the fields grouped into two
//                  clearly labelled sections — PERSONAL INFORMATION and
//                  ADDRESS INFORMATION — instead of one flat list. A faint
//                  diagonal pattern echoes the front face's texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* QR */}
//               {/* <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//               >
//                 <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//               </Link> */}

//               {/* Fields — grouped into two labelled sections. Each
//                   SectionHeading spans all 4 grid columns so the eyebrow +
//                   gold rule sits flush above its rows; gap-y is the only
//                   spacing between rows within a section, and the heading's
//                   own top padding gives the two groups a clear but light
//                   separation. */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[13px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 <SectionHeading>Personal Information</SectionHeading>
//                 {personalFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}

//                 <SectionHeading>Address Information</SectionHeading>
//                 {addressFields.map((f) => (
//                   <IconCardField
//                     key={f.label}
//                     icon={f.icon}
//                     label={f.label}
//                     value={f.value}
//                     wrap={f.wrap}
//                     accent={f.accent}
//                   />
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


// import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
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
//    so every row lines up cleanly.

//    Typography hierarchy (kept consistent everywhere this is
//    used): label = Medium/500, value = SemiBold/600, and the
//    `strong` flag bumps a single row (the vendor's name) up to
//    Bold/700 — the only three weights used across the card.

//    `accent` lets a single row's icon chip use a warm gold tone
//    instead of the default green, so the business address can
//    read as visually distinct from the residential address
//    without changing the icon glyph or the surrounding layout.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

//   return (
//     <>
//       <span className={`mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} />
//       </span>
//       <span
//         className={`min-w-0 whitespace-nowrap text-[10.6px] leading-[14px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         }`}
//       >
//         {label}
//       </span>
//       <span className={`text-[10.6px] leading-[14px] text-[#0f172a] ${strong ? "font-bold" : "font-semibold"}`}>:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one.
//           When `wrap` is set (used for the address fields, which regularly
//           run onto 2 lines): a single border-bottom only ever draws under
//           the LAST line of a wrapped box, so line 1 ("...virar") was left
//           with no underline at all. Switching to a text-decoration dotted
//           underline instead fixes that — text-decoration is drawn under
//           EVERY line of wrapped text, so both "...virar" and "(West)
//           Working/Residence" each get their own dotted line. underline-
//           offset pushes it down off the descenders, and the extra
//           line-height gives the two lines (and their two underlines) room
//           to breathe instead of crowding into each other. */}
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[12px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
//             : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    SECTION HEADING — used on the back face to group fields into
//    "PERSONAL INFORMATION" / "ADDRESS INFORMATION" without adding
//    visual weight: a small green uppercase eyebrow plus a thin
//    gold rule that trails off toward the edge of the card. Spans
//    all 4 grid columns so it sits flush with the rows below it.
// ========================================================= */

// function SectionHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[2px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.6px] font-bold uppercase tracking-[0.14em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#D9BE68] to-transparent opacity-80" />
//     </div>
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

//   // Load Poppins (modern, govt/project-UI friendly) once for the card faces.
//   // Noto Sans Devanagari is pulled in alongside it purely as a fallback —
//   // Poppins has no Devanagari glyphs, so Marathi labels/values need a font
//   // that actually covers them; English/numerals still render in Poppins.
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // A plain browser text-selection highlight (bright blue, full-opacity)
//   // reads as an accidental artifact on a printed-style ID card. This scopes
//   // a soft, on-brand selection color to just the two card faces so an
//   // accidental click-drag never shows the default blue.
//   useEffect(() => {
//     if (document.getElementById("smartcard-selection-style")) return;
//     const style = document.createElement("style");
//     style.id = "smartcard-selection-style";
//     style.textContent = `
//       .smart-card-front ::selection,
//       .smart-card-back ::selection {
//         background-color: rgba(11, 93, 48, 0.12);
//         color: inherit;
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

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

//   const CARD_WIDTH_MM = 90;
//   const CARD_HEIGHT_MM = 105;
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
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
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
//      Front (next to photo): name, gender, mobile, ward, validity.
//      Back is split into two labelled groups instead of one flat list:
//        - PERSONAL INFORMATION: certificate no., dob/age, business type,
//          vending place, timing
//        - ADDRESS INFORMATION: business address, residential address
//      "ओळखपत्र क्रमांक" (certificate no.) moved from the front to the top
//      of Personal Information on the back, per request — same data, same
//      icon, just relocated. Same otherwise as before — only the grouping
//      and the "पत्ता" label (now "निवासी पत्ता", to read unambiguously as
//      the residential address once it sits next to the business address)
//      changed. */

//   const frontFields = [
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const personalFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//   ];

//   const addressFields = [
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     // accent: "gold" gives the business address a warm icon chip so it reads
//     // as visually distinct from the residential address right below it.
//     { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
//     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name. The logo now sits inside its own white ring with real
//                  padding around the emblem (rather than a border drawn flush
//                  against it), and the two name lines are centered as one
//                  flex column against that ring's full height so the English
//                  and Marathi lines feel deliberately balanced rather than
//                  just stacked. A single hairline gold rule closes out the
//                  bottom edge — restrained, not a decorative wave. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits.
//                    `flex flex-col justify-center` keeps both lines centered
//                    against the taller logo ring beside them. ── */}
//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: single-column stack — title, then photo, then the
//                  six fields as full-width rows, then the AC signature line
//                  pinned to the bottom. A very faint diagonal pattern sits
//                  behind the whole body for a premium printed-card texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* Title */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="text-[17.3px] font-bold leading-tight tracking-tight text-[#0B5D30]">
//                   रस्ता विक्रेता ओळखपत्र
//                 </h2>
//                 <p className="text-[11.5px] font-semibold italic leading-tight text-[#B9861C]">
//                   (Street Vendor Identity Card)
//                 </p>
//                 <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//               </div>

//               {/* QR + Photo — QR (same size/style as the back face) now sits
//                    to the left of the photo, side by side, both unchanged
//                    in size/border/shadow from their existing styling. ── */}
//               <div className="flex shrink-0 items-center justify-center gap-3">
//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>

//                 <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto). Shortened
//                    and centered so it reads as a deliberate signature block
//                    rather than a stray leftover rule; "सहाय्यक आयुक्त" is now
//                    the prominent line (green, bold, small-caps tracking) with
//                    "(स्वाक्षरी)" reduced to a quiet secondary caption. A thin
//                    gold rule closes out the very bottom of the card, mirroring
//                    the header's hairline for a finished, bookend feel. ── */}
//               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
//                 <div className="h-px w-[34%] bg-[#94a3b8]" />
//                 <p className="whitespace-nowrap text-[11px] font-bold uppercase leading-tight tracking-[0.03em] text-[#0B5D30]">
//                   सहाय्यक आयुक्त
//                 </p>
//                 <p className="whitespace-nowrap text-[8.5px] font-bold leading-tight text-[#94a3b8]">(स्वाक्षरी)</p>
//                 <div className="mt-1 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-80" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — identical treatment to the front face (see
//                  comments there): more breathing room around the logo, the
//                  two name lines centered against it as one column, and a
//                  single hairline gold rule instead of the old decorative
//                  wave, so both faces read as one consistent card. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#F2D98A]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: QR at the top (unchanged, currently commented out
//                  as in the original), then the fields grouped into two
//                  clearly labelled sections — PERSONAL INFORMATION and
//                  ADDRESS INFORMATION — instead of one flat list. A faint
//                  diagonal pattern echoes the front face's texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* QR */}
//               {/* <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//               >
//                 <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//               </Link> */}

//               {/* Fields — grouped into two labelled sections. Each
//                   SectionHeading spans all 4 grid columns so the eyebrow +
//                   gold rule sits flush above its rows; gap-y is the only
//                   spacing between rows within a section, and the heading's
//                   own top padding gives the two groups a clear but light
//                   separation. */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[13px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 <SectionHeading>Personal Information</SectionHeading>
//                 {personalFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}

//                 <SectionHeading>Address Information</SectionHeading>
//                 {addressFields.map((f) => (
//                   <IconCardField
//                     key={f.label}
//                     icon={f.icon}
//                     label={f.label}
//                     value={f.value}
//                     wrap={f.wrap}
//                     accent={f.accent}
//                   />
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



// import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
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
//    so every row lines up cleanly.

//    Typography hierarchy (kept consistent everywhere this is
//    used): label = Medium/500, value = SemiBold/600, and the
//    `strong` flag bumps a single row (the vendor's name) up to
//    Bold/700 — the only three weights used across the card.

//    `accent` lets a single row's icon chip use a warm gold tone
//    instead of the default green, so the business address can
//    read as visually distinct from the residential address
//    without changing the icon glyph or the surrounding layout.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

//   return (
//     <>
//       <span className={`mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} />
//       </span>
//       <span
//         className={`min-w-0 whitespace-nowrap text-[10.6px] leading-[14px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         }`}
//       >
//         {label}
//       </span>
//       <span className={`text-[10.6px] leading-[14px] text-[#0f172a] ${strong ? "font-bold" : "font-semibold"}`}>:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one.
//           When `wrap` is set (used for the address fields, which regularly
//           run onto 2 lines): a single border-bottom only ever draws under
//           the LAST line of a wrapped box, so line 1 ("...virar") was left
//           with no underline at all. Switching to a text-decoration dotted
//           underline instead fixes that — text-decoration is drawn under
//           EVERY line of wrapped text, so both "...virar" and "(West)
//           Working/Residence" each get their own dotted line. underline-
//           offset pushes it down off the descenders, and the extra
//           line-height gives the two lines (and their two underlines) room
//           to breathe instead of crowding into each other. */}
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[12px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
//             : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    SECTION HEADING — used on the back face to group fields into
//    "PERSONAL INFORMATION" / "ADDRESS INFORMATION" without adding
//    visual weight: a small green uppercase eyebrow plus a thin
//    gold rule that trails off toward the edge of the card. Spans
//    all 4 grid columns so it sits flush with the rows below it.
// ========================================================= */

// function SectionHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[2px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.6px] font-bold uppercase tracking-[0.14em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#D9BE68] to-transparent opacity-80" />
//     </div>
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

//   // Load Poppins (modern, govt/project-UI friendly) once for the card faces.
//   // Noto Sans Devanagari is pulled in alongside it purely as a fallback —
//   // Poppins has no Devanagari glyphs, so Marathi labels/values need a font
//   // that actually covers them; English/numerals still render in Poppins.
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // A plain browser text-selection highlight (bright blue, full-opacity)
//   // reads as an accidental artifact on a printed-style ID card. This scopes
//   // a soft, on-brand selection color to just the two card faces so an
//   // accidental click-drag never shows the default blue.
//   useEffect(() => {
//     if (document.getElementById("smartcard-selection-style")) return;
//     const style = document.createElement("style");
//     style.id = "smartcard-selection-style";
//     style.textContent = `
//       .smart-card-front ::selection,
//       .smart-card-back ::selection {
//         background-color: rgba(11, 93, 48, 0.12);
//         color: inherit;
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

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

//   const CARD_WIDTH_MM = 90;
//   const CARD_HEIGHT_MM = 105;
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
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
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
//      Front (next to photo): name, gender, mobile, ward, validity.
//      Back is split into two labelled groups instead of one flat list:
//        - PERSONAL INFORMATION: certificate no., dob/age, business type,
//          vending place, timing
//        - ADDRESS INFORMATION: business address, residential address
//      "ओळखपत्र क्रमांक" (certificate no.) moved from the front to the top
//      of Personal Information on the back, per request — same data, same
//      icon, just relocated. Same otherwise as before — only the grouping
//      and the "पत्ता" label (now "निवासी पत्ता", to read unambiguously as
//      the residential address once it sits next to the business address)
//      changed. */

//   const frontFields = [
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const personalFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//   ];

//   const addressFields = [
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     // accent: "gold" gives the business address a warm icon chip so it reads
//     // as visually distinct from the residential address right below it.
//     { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
//     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name. The logo now sits inside its own white ring with real
//                  padding around the emblem (rather than a border drawn flush
//                  against it), and the two name lines are centered as one
//                  flex column against that ring's full height so the English
//                  and Marathi lines feel deliberately balanced rather than
//                  just stacked. A single hairline gold rule closes out the
//                  bottom edge — restrained, not a decorative wave. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits.
//                    `flex flex-col justify-center` keeps both lines centered
//                    against the taller logo ring beside them. ── */}
//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: single-column stack — title, then photo, then the
//                  six fields as full-width rows, then the AC signature line
//                  pinned to the bottom. A very faint diagonal pattern sits
//                  behind the whole body for a premium printed-card texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* Title */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="text-[17.3px] font-bold leading-tight tracking-tight text-[#0B5D30]">
//                   रस्ता विक्रेता ओळखपत्र
//                 </h2>
//                 <p className="text-[11.5px] font-semibold italic leading-tight text-[#CA9D28]">
//                   (Street Vendor Identity Card)
//                 </p>
//                 <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//               </div>

//               {/* QR + Photo — QR (same size/style as the back face) now sits
//                    to the left of the photo, side by side, both unchanged
//                    in size/border/shadow from their existing styling. ── */}
//               <div className="mt-[1px] flex shrink-0 items-center justify-center gap-3">
//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>

//                 <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative mt-[1px] grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto). Shortened
//                    and centered so it reads as a deliberate signature block
//                    rather than a stray leftover rule; "सहाय्यक आयुक्त" is now
//                    the prominent line (green, bold, small-caps tracking) with
//                    "(स्वाक्षरी)" reduced to a quiet secondary caption. A thin
//                    gold rule closes out the very bottom of the card, mirroring
//                    the header's hairline for a finished, bookend feel. ── */}
//               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
//                 <div className="h-px w-[34%] bg-[#94a3b8]" />
//                 <p className="whitespace-nowrap text-[11px] font-bold uppercase leading-tight tracking-[0.03em] text-[#0B5D30]">
//                   सहाय्यक आयुक्त
//                 </p>
//                 <p className="whitespace-nowrap text-[8.5px] font-bold leading-tight text-[#94a3b8]">(स्वाक्षरी)</p>
//                 <div className="mt-1 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-80" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — identical treatment to the front face (see
//                  comments there): more breathing room around the logo, the
//                  two name lines centered against it as one column, and a
//                  single hairline gold rule instead of the old decorative
//                  wave, so both faces read as one consistent card. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: QR at the top (unchanged, currently commented out
//                  as in the original), then the fields grouped into two
//                  clearly labelled sections — PERSONAL INFORMATION and
//                  ADDRESS INFORMATION — instead of one flat list. A faint
//                  diagonal pattern echoes the front face's texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* QR */}
//               {/* <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//               >
//                 <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//               </Link> */}

//               {/* Fields — grouped into two labelled sections. Each
//                   SectionHeading spans all 4 grid columns so the eyebrow +
//                   gold rule sits flush above its rows; gap-y is the only
//                   spacing between rows within a section, and the heading's
//                   own top padding gives the two groups a clear but light
//                   separation. */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[13px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 <SectionHeading>Personal Information</SectionHeading>
//                 {personalFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}

//                 <SectionHeading>Address Information</SectionHeading>
//                 {addressFields.map((f) => (
//                   <IconCardField
//                     key={f.label}
//                     icon={f.icon}
//                     label={f.label}
//                     value={f.value}
//                     wrap={f.wrap}
//                     accent={f.accent}
//                   />
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




// import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
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
//    so every row lines up cleanly.

//    Typography hierarchy (kept consistent everywhere this is
//    used): label = Medium/500, value = SemiBold/600, and the
//    `strong` flag bumps a single row (the vendor's name) up to
//    Bold/700 — the only three weights used across the card.

//    `accent` lets a single row's icon chip use a warm gold tone
//    instead of the default green, so the business address can
//    read as visually distinct from the residential address
//    without changing the icon glyph or the surrounding layout.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

//   return (
//     <>
//       <span className={`mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} />
//       </span>
//       <span
//         className={`min-w-0 whitespace-nowrap text-[10.6px] leading-[14px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         }`}
//       >
//         {label}
//       </span>
//       <span className={`text-[10.6px] leading-[14px] text-[#0f172a] ${strong ? "font-bold" : "font-semibold"}`}>:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one.
//           When `wrap` is set (used for the address fields, which regularly
//           run onto 2 lines): a single border-bottom only ever draws under
//           the LAST line of a wrapped box, so line 1 ("...virar") was left
//           with no underline at all. Switching to a text-decoration dotted
//           underline instead fixes that — text-decoration is drawn under
//           EVERY line of wrapped text, so both "...virar" and "(West)
//           Working/Residence" each get their own dotted line. underline-
//           offset pushes it down off the descenders, and the extra
//           line-height gives the two lines (and their two underlines) room
//           to breathe instead of crowding into each other. */}
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[12px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
//             : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    SECTION HEADING — used on the back face to group fields into
//    "PERSONAL INFORMATION" / "ADDRESS INFORMATION" without adding
//    visual weight: a small green uppercase eyebrow plus a thin
//    gold rule that trails off toward the edge of the card. Spans
//    all 4 grid columns so it sits flush with the rows below it.
// ========================================================= */

// function SectionHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[2px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.6px] font-bold uppercase tracking-[0.14em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#D9BE68] to-transparent opacity-80" />
//     </div>
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

//   // Load Poppins (modern, govt/project-UI friendly) once for the card faces.
//   // Noto Sans Devanagari is pulled in alongside it purely as a fallback —
//   // Poppins has no Devanagari glyphs, so Marathi labels/values need a font
//   // that actually covers them; English/numerals still render in Poppins.
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // A plain browser text-selection highlight (bright blue, full-opacity)
//   // reads as an accidental artifact on a printed-style ID card. This scopes
//   // a soft, on-brand selection color to just the two card faces so an
//   // accidental click-drag never shows the default blue.
//   useEffect(() => {
//     if (document.getElementById("smartcard-selection-style")) return;
//     const style = document.createElement("style");
//     style.id = "smartcard-selection-style";
//     style.textContent = `
//       .smart-card-front ::selection,
//       .smart-card-back ::selection {
//         background-color: rgba(11, 93, 48, 0.12);
//         color: inherit;
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

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

//   const CARD_WIDTH_MM = 90;
//   const CARD_HEIGHT_MM = 105;
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
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
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
//      Front (next to photo): name, gender, mobile, ward, validity.
//      Back is split into two labelled groups instead of one flat list:
//        - PERSONAL INFORMATION: certificate no., dob/age, business type,
//          vending place, timing
//        - ADDRESS INFORMATION: business address, residential address
//      "ओळखपत्र क्रमांक" (certificate no.) moved from the front to the top
//      of Personal Information on the back, per request — same data, same
//      icon, just relocated. Same otherwise as before — only the grouping
//      and the "पत्ता" label (now "निवासी पत्ता", to read unambiguously as
//      the residential address once it sits next to the business address)
//      changed. */

//   const frontFields = [
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const personalFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//   ];

//   const addressFields = [
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     // accent: "gold" gives the business address a warm icon chip so it reads
//     // as visually distinct from the residential address right below it.
//     { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
//     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name. The logo now sits inside its own white ring with real
//                  padding around the emblem (rather than a border drawn flush
//                  against it), and the two name lines are centered as one
//                  flex column against that ring's full height so the English
//                  and Marathi lines feel deliberately balanced rather than
//                  just stacked. A single hairline gold rule closes out the
//                  bottom edge — restrained, not a decorative wave. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits.
//                    `flex flex-col justify-center` keeps both lines centered
//                    against the taller logo ring beside them. ── */}
//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: single-column stack — title, then photo, then the
//                  six fields as full-width rows, then the AC signature line
//                  pinned to the bottom. A very faint diagonal pattern sits
//                  behind the whole body for a premium printed-card texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* Title */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="text-[17.3px] font-bold leading-tight tracking-tight text-[#0B5D30]">
//                   रस्ता विक्रेता ओळखपत्र
//                 </h2>
//                 <p className="text-[11.5px] font-semibold italic leading-tight text-[#CA9D28]">
//                   (Street Vendor Identity Card)
//                 </p>
//                 <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//               </div>

//               {/* QR + Photo — QR (same size/style as the back face) now sits
//                    to the left of the photo, side by side, both unchanged
//                    in size/border/shadow from their existing styling. ── */}
//               <div className="mt-[1px] flex shrink-0 items-center justify-center gap-3">
//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>

//                 <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative mt-[1px] grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto). Shortened
//                    and centered so it reads as a deliberate signature block
//                    rather than a stray leftover rule; "सहाय्यक आयुक्त" is now
//                    the prominent line (green, bold, small-caps tracking) with
//                    "(स्वाक्षरी)" reduced to a quiet secondary caption. A thin
//                    gold rule closes out the very bottom of the card, mirroring
//                    the header's hairline for a finished, bookend feel. ── */}
//               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
//                 <div className="h-px w-[34%] bg-[#94a3b8]" />
//                 <p className="whitespace-nowrap text-[11px] font-bold uppercase leading-tight tracking-[0.03em] text-[#0B5D30]">
//                   सहाय्यक आयुक्त
//                 </p>
//                 <p className="whitespace-nowrap text-[8.5px] font-bold leading-tight text-[#0f172a]">(स्वाक्षरी)</p>
//                 <div className="mt-1 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-80" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — identical treatment to the front face (see
//                  comments there): more breathing room around the logo, the
//                  two name lines centered against it as one column, and a
//                  single hairline gold rule instead of the old decorative
//                  wave, so both faces read as one consistent card. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: QR at the top (unchanged, currently commented out
//                  as in the original), then the fields grouped into two
//                  clearly labelled sections — PERSONAL INFORMATION and
//                  ADDRESS INFORMATION — instead of one flat list. A faint
//                  diagonal pattern echoes the front face's texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* QR */}
//               {/* <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//               >
//                 <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//               </Link> */}

//               {/* Fields — grouped into two labelled sections. Each
//                   SectionHeading spans all 4 grid columns so the eyebrow +
//                   gold rule sits flush above its rows; gap-y is the only
//                   spacing between rows within a section, and the heading's
//                   own top padding gives the two groups a clear but light
//                   separation. */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[13px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 <SectionHeading>Personal Information</SectionHeading>
//                 {personalFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}

//                 <SectionHeading>Address Information</SectionHeading>
//                 {addressFields.map((f) => (
//                   <IconCardField
//                     key={f.label}
//                     icon={f.icon}
//                     label={f.label}
//                     value={f.value}
//                     wrap={f.wrap}
//                     accent={f.accent}
//                   />
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

// import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
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
//    so every row lines up cleanly.

//    Typography hierarchy (kept consistent everywhere this is
//    used): label = Medium/500, value = SemiBold/600, and the
//    `strong` flag bumps a single row (the vendor's name) up to
//    Bold/700 — the only three weights used across the card.

//    `accent` lets a single row's icon chip use a warm gold tone
//    instead of the default green, so the business address can
//    read as visually distinct from the residential address
//    without changing the icon glyph or the surrounding layout.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

//   return (
//     <>
//       <span className={`mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} />
//       </span>
//       <span
//         className={`min-w-0 whitespace-nowrap text-[13.6px] leading-[17px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         }`}
//       >
//         {label}
//       </span>
//       <span className={`text-[13.6px] leading-[17px] text-[#0f172a] ${strong ? "font-bold" : "font-semibold"}`}>:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one.
//           When `wrap` is set (used for the address fields, which regularly
//           run onto 2 lines): a single border-bottom only ever draws under
//           the LAST line of a wrapped box, so line 1 ("...virar") was left
//           with no underline at all. Switching to a text-decoration dotted
//           underline instead fixes that — text-decoration is drawn under
//           EVERY line of wrapped text, so both "...virar" and "(West)
//           Working/Residence" each get their own dotted line. underline-
//           offset pushes it down off the descenders, and the extra
//           line-height gives the two lines (and their two underlines) room
//           to breathe instead of crowding into each other. */}
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[15px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
//             : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    SECTION HEADING — used on the back face to group fields into
//    "PERSONAL INFORMATION" / "ADDRESS INFORMATION" without adding
//    visual weight: a small green uppercase eyebrow plus a thin
//    gold rule that trails off toward the edge of the card. Spans
//    all 4 grid columns so it sits flush with the rows below it.
// ========================================================= */

// function SectionHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[2px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.6px] font-bold uppercase tracking-[0.14em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#D9BE68] to-transparent opacity-80" />
//     </div>
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

//   // Load Poppins (modern, govt/project-UI friendly) once for the card faces.
//   // Noto Sans Devanagari is pulled in alongside it purely as a fallback —
//   // Poppins has no Devanagari glyphs, so Marathi labels/values need a font
//   // that actually covers them; English/numerals still render in Poppins.
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // A plain browser text-selection highlight (bright blue, full-opacity)
//   // reads as an accidental artifact on a printed-style ID card. This scopes
//   // a soft, on-brand selection color to just the two card faces so an
//   // accidental click-drag never shows the default blue.
//   useEffect(() => {
//     if (document.getElementById("smartcard-selection-style")) return;
//     const style = document.createElement("style");
//     style.id = "smartcard-selection-style";
//     style.textContent = `
//       .smart-card-front ::selection,
//       .smart-card-back ::selection {
//         background-color: rgba(11, 93, 48, 0.12);
//         color: inherit;
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

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

//   const CARD_WIDTH_MM = 90;
//   const CARD_HEIGHT_MM = 105;
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
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
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
//      Front (next to photo): name, gender, mobile, ward, validity.
//      Back is split into two labelled groups instead of one flat list:
//        - PERSONAL INFORMATION: certificate no., dob/age, business type,
//          vending place, timing
//        - ADDRESS INFORMATION: business address, residential address
//      "ओळखपत्र क्रमांक" (certificate no.) moved from the front to the top
//      of Personal Information on the back, per request — same data, same
//      icon, just relocated. Same otherwise as before — only the grouping
//      and the "पत्ता" label (now "निवासी पत्ता", to read unambiguously as
//      the residential address once it sits next to the business address)
//      changed. */

//   const frontFields = [
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const personalFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//   ];

//   const addressFields = [
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     // accent: "gold" gives the business address a warm icon chip so it reads
//     // as visually distinct from the residential address right below it.
//     { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
//     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name. The logo now sits inside its own white ring with real
//                  padding around the emblem (rather than a border drawn flush
//                  against it), and the two name lines are centered as one
//                  flex column against that ring's full height so the English
//                  and Marathi lines feel deliberately balanced rather than
//                  just stacked. A single hairline gold rule closes out the
//                  bottom edge — restrained, not a decorative wave. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits.
//                    `flex flex-col justify-center` keeps both lines centered
//                    against the taller logo ring beside them. ── */}
//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: single-column stack — title, then photo, then the
//                  six fields as full-width rows, then the AC signature line
//                  pinned to the bottom. A very faint diagonal pattern sits
//                  behind the whole body for a premium printed-card texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* Title */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="text-[17.3px] font-bold leading-tight tracking-tight text-[#0B5D30]">
//                   रस्ता विक्रेता ओळखपत्र
//                 </h2>
//                 <p className="text-[11.5px] font-semibold italic leading-tight text-[#CA9D28]">
//                   (Street Vendor Identity Card)
//                 </p>
//                 <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//               </div>

//               {/* QR + Photo — QR (same size/style as the back face) now sits
//                    to the left of the photo, side by side, both unchanged
//                    in size/border/shadow from their existing styling. ── */}
//               <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>

//                 <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative mt-[1px] grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto). Shortened
//                    and centered so it reads as a deliberate signature block
//                    rather than a stray leftover rule; "सहाय्यक आयुक्त" is now
//                    the prominent line (green, bold, small-caps tracking) with
//                    "(स्वाक्षरी)" reduced to a quiet secondary caption. A thin
//                    gold rule closes out the very bottom of the card, mirroring
//                    the header's hairline for a finished, bookend feel. ── */}
//               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
//                 <div className="h-px w-[34%] bg-[#94a3b8]" />
//                 <p className="whitespace-nowrap text-[11px] font-bold uppercase leading-tight tracking-[0.03em] text-[#0B5D30]">
//                   सहाय्यक आयुक्त
//                 </p>
//                 <p className="whitespace-nowrap text-[11px] font-bold leading-tight text-[#0f172a]">(स्वाक्षरी)</p>
//                 <div className="mt-1 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-80" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — identical treatment to the front face (see
//                  comments there): more breathing room around the logo, the
//                  two name lines centered against it as one column, and a
//                  single hairline gold rule instead of the old decorative
//                  wave, so both faces read as one consistent card. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: QR at the top (unchanged, currently commented out
//                  as in the original), then the fields grouped into two
//                  clearly labelled sections — PERSONAL INFORMATION and
//                  ADDRESS INFORMATION — instead of one flat list. A faint
//                  diagonal pattern echoes the front face's texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* QR */}
//               {/* <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//               >
//                 <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//               </Link> */}

//               {/* Fields — grouped into two labelled sections. Each
//                   SectionHeading spans all 4 grid columns so the eyebrow +
//                   gold rule sits flush above its rows; gap-y is the only
//                   spacing between rows within a section, and the heading's
//                   own top padding gives the two groups a clear but light
//                   separation. */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[13px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 <SectionHeading>Personal Information</SectionHeading>
//                 {personalFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}

//                 <SectionHeading>Address Information</SectionHeading>
//                 {addressFields.map((f) => (
//                   <IconCardField
//                     key={f.label}
//                     icon={f.icon}
//                     label={f.label}
//                     value={f.value}
//                     wrap={f.wrap}
//                     accent={f.accent}
//                   />
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




// import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
//   FiHome,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// import banner from "../../../assets/banner1.png";

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
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
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
//    so every row lines up cleanly.

//    Typography hierarchy (kept consistent everywhere this is
//    used): label = Medium/500, value = SemiBold/600, and the
//    `strong` flag bumps a single row (the vendor's name) up to
//    Bold/700 — the only three weights used across the card.

//    `accent` lets a single row's icon chip use a warm gold tone
//    instead of the default green, so the business address can
//    read as visually distinct from the residential address
//    without changing the icon glyph or the surrounding layout.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

//   return (
//     <>
//       <span className={`mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} />
//       </span>
//       <span
//         className={`min-w-0 whitespace-nowrap text-[13.1px] leading-[16.5px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         }`}
//       >
//         {label}
//       </span>
//       <span className={`text-[13.1px] leading-[16.5px] text-[#0f172a] ${strong ? "font-bold" : "font-semibold"}`}>:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one.
//           When `wrap` is set (used for the address fields, which regularly
//           run onto 2 lines): a single border-bottom only ever draws under
//           the LAST line of a wrapped box, so line 1 ("...virar") was left
//           with no underline at all. Switching to a text-decoration dotted
//           underline instead fixes that — text-decoration is drawn under
//           EVERY line of wrapped text, so both "...virar" and "(West)
//           Working/Residence" each get their own dotted line. underline-
//           offset pushes it down off the descenders, and the extra
//           line-height gives the two lines (and their two underlines) room
//           to breathe instead of crowding into each other. */}
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[14.5px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
//             : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    SECTION HEADING — used on the back face to group fields into
//    "PERSONAL INFORMATION" / "ADDRESS INFORMATION" without adding
//    visual weight: a small green uppercase eyebrow plus a thin
//    gold rule that trails off toward the edge of the card. Spans
//    all 4 grid columns so it sits flush with the rows below it.
// ========================================================= */

// function SectionHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[2px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.6px] font-bold uppercase tracking-[0.14em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#D9BE68] to-transparent opacity-80" />
//     </div>
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

//   // Load Poppins (modern, govt/project-UI friendly) once for the card faces.
//   // Noto Sans Devanagari is pulled in alongside it purely as a fallback —
//   // Poppins has no Devanagari glyphs, so Marathi labels/values need a font
//   // that actually covers them; English/numerals still render in Poppins.
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // A plain browser text-selection highlight (bright blue, full-opacity)
//   // reads as an accidental artifact on a printed-style ID card. This scopes
//   // a soft, on-brand selection color to just the two card faces so an
//   // accidental click-drag never shows the default blue.
//   useEffect(() => {
//     if (document.getElementById("smartcard-selection-style")) return;
//     const style = document.createElement("style");
//     style.id = "smartcard-selection-style";
//     style.textContent = `
//       .smart-card-front ::selection,
//       .smart-card-back ::selection {
//         background-color: rgba(11, 93, 48, 0.12);
//         color: inherit;
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

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

//   const CARD_WIDTH_MM = 90;
//   const CARD_HEIGHT_MM = 105;
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
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
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
//      Front (next to photo): name, gender, mobile, ward, validity.
//      Back is split into two labelled groups instead of one flat list:
//        - PERSONAL INFORMATION: certificate no., dob/age, business type,
//          vending place, timing
//        - ADDRESS INFORMATION: business address, residential address
//      "ओळखपत्र क्रमांक" (certificate no.) moved from the front to the top
//      of Personal Information on the back, per request — same data, same
//      icon, just relocated. Same otherwise as before — only the grouping
//      and the "पत्ता" label (now "निवासी पत्ता", to read unambiguously as
//      the residential address once it sits next to the business address)
//      changed. */

//   const frontFields = [
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const personalFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//   ];

//   const addressFields = [
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     // accent: "gold" gives the business address a warm icon chip so it reads
//     // as visually distinct from the residential address right below it.
//     { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
//     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name. The logo now sits inside its own white ring with real
//                  padding around the emblem (rather than a border drawn flush
//                  against it), and the two name lines are centered as one
//                  flex column against that ring's full height so the English
//                  and Marathi lines feel deliberately balanced rather than
//                  just stacked. A single hairline gold rule closes out the
//                  bottom edge — restrained, not a decorative wave. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits.
//                    `flex flex-col justify-center` keeps both lines centered
//                    against the taller logo ring beside them. ── */}
//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: single-column stack — title, then photo, then the
//                  six fields as full-width rows, then the AC signature line
//                  pinned to the bottom. A very faint diagonal pattern sits
//                  behind the whole body for a premium printed-card texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* Title */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="text-[17.3px] font-bold leading-tight tracking-tight text-[#0B5D30]">
//                   रस्ता विक्रेता ओळखपत्र
//                 </h2>
//                 <p className="text-[11.5px] font-semibold italic leading-tight text-[#CA9D28]">
//                   (Street Vendor Identity Card)
//                 </p>
//                 <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//               </div>

//               {/* QR + Photo — QR (same size/style as the back face) now sits
//                    to the left of the photo, side by side, both unchanged
//                    in size/border/shadow from their existing styling. ── */}
//               <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>

//                 <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative mt-[1px] grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto). Shortened
//                    and centered so it reads as a deliberate signature block
//                    rather than a stray leftover rule; "सहाय्यक आयुक्त" is now
//                    the prominent line (green, bold, small-caps tracking) with
//                    "(स्वाक्षरी)" reduced to a quiet secondary caption. A thin
//                    gold rule closes out the very bottom of the card, mirroring
//                    the header's hairline for a finished, bookend feel. ── */}
//               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
//                 <div className="h-px w-[34%] bg-[#94a3b8]" />
//                 <p className="whitespace-nowrap text-[11px] font-bold uppercase leading-tight tracking-[0.03em] text-[#0B5D30]">
//                   सहाय्यक आयुक्त
//                 </p>
//                 <p className="whitespace-nowrap text-[11px] font-bold leading-tight text-[#0f172a]">(स्वाक्षरी)</p>
//                 <div className="mt-1 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-80" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — identical treatment to the front face (see
//                  comments there): more breathing room around the logo, the
//                  two name lines centered against it as one column, and a
//                  single hairline gold rule instead of the old decorative
//                  wave, so both faces read as one consistent card. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ background: "linear-gradient(to right, #0c6636 0%, #0e4a26 50%, #0f3620 100%)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: QR at the top (unchanged, currently commented out
//                  as in the original), then the fields grouped into two
//                  clearly labelled sections — PERSONAL INFORMATION and
//                  ADDRESS INFORMATION — instead of one flat list. A faint
//                  diagonal pattern echoes the front face's texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* QR */}
//               {/* <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//               >
//                 <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//               </Link> */}

//               {/* Fields — grouped into two labelled sections. Each
//                   SectionHeading spans all 4 grid columns so the eyebrow +
//                   gold rule sits flush above its rows; gap-y is the only
//                   spacing between rows within a section, and the heading's
//                   own top padding gives the two groups a clear but light
//                   separation. */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[13px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 <SectionHeading>Personal Information</SectionHeading>
//                 {personalFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}

//                 <SectionHeading>Address Information</SectionHeading>
//                 {addressFields.map((f) => (
//                   <IconCardField
//                     key={f.label}
//                     icon={f.icon}
//                     label={f.label}
//                     value={f.value}
//                     wrap={f.wrap}
//                     accent={f.accent}
//                   />
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




// import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
//   FiHome,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// import banner from "../../../assets/banner1.png";
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
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
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
//    so every row lines up cleanly.

//    Typography hierarchy (kept consistent everywhere this is
//    used): label = Medium/500, value = SemiBold/600, and the
//    `strong` flag bumps a single row (the vendor's name) up to
//    Bold/700 — the only three weights used across the card.

//    `accent` lets a single row's icon chip use a warm gold tone
//    instead of the default green, so the business address can
//    read as visually distinct from the residential address
//    without changing the icon glyph or the surrounding layout.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

//   return (
//     <>
//       <span className={`mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} />
//       </span>
//       <span
//         className={`min-w-0 whitespace-nowrap text-[13.1px] leading-[16.5px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         }`}
//       >
//         {label}
//       </span>
//       <span className={`text-[13.1px] leading-[16.5px] text-[#0f172a] ${strong ? "font-bold" : "font-semibold"}`}>:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one.
//           When `wrap` is set (used for the address fields, which regularly
//           run onto 2 lines): a single border-bottom only ever draws under
//           the LAST line of a wrapped box, so line 1 ("...virar") was left
//           with no underline at all. Switching to a text-decoration dotted
//           underline instead fixes that — text-decoration is drawn under
//           EVERY line of wrapped text, so both "...virar" and "(West)
//           Working/Residence" each get their own dotted line. underline-
//           offset pushes it down off the descenders, and the extra
//           line-height gives the two lines (and their two underlines) room
//           to breathe instead of crowding into each other. */}
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[14.5px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
//             : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    SECTION HEADING — used on the back face to group fields into
//    "PERSONAL INFORMATION" / "ADDRESS INFORMATION" without adding
//    visual weight: a small green uppercase eyebrow plus a thin
//    gold rule that trails off toward the edge of the card. Spans
//    all 4 grid columns so it sits flush with the rows below it.
// ========================================================= */

// function SectionHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[2px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.6px] font-bold uppercase tracking-[0.14em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#D9BE68] to-transparent opacity-80" />
//     </div>
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

//   // Load Poppins (modern, govt/project-UI friendly) once for the card faces.
//   // Noto Sans Devanagari is pulled in alongside it purely as a fallback —
//   // Poppins has no Devanagari glyphs, so Marathi labels/values need a font
//   // that actually covers them; English/numerals still render in Poppins.
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // A plain browser text-selection highlight (bright blue, full-opacity)
//   // reads as an accidental artifact on a printed-style ID card. This scopes
//   // a soft, on-brand selection color to just the two card faces so an
//   // accidental click-drag never shows the default blue.
//   useEffect(() => {
//     if (document.getElementById("smartcard-selection-style")) return;
//     const style = document.createElement("style");
//     style.id = "smartcard-selection-style";
//     style.textContent = `
//       .smart-card-front ::selection,
//       .smart-card-back ::selection {
//         background-color: rgba(11, 93, 48, 0.12);
//         color: inherit;
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

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

//   const CARD_WIDTH_MM = 90;
//   const CARD_HEIGHT_MM = 105;
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
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
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
//      Front (next to photo): name, gender, mobile, ward, validity.
//      Back is split into two labelled groups instead of one flat list:
//        - PERSONAL INFORMATION: certificate no., dob/age, business type,
//          vending place, timing
//        - ADDRESS INFORMATION: business address, residential address
//      "ओळखपत्र क्रमांक" (certificate no.) moved from the front to the top
//      of Personal Information on the back, per request — same data, same
//      icon, just relocated. Same otherwise as before — only the grouping
//      and the "पत्ता" label (now "निवासी पत्ता", to read unambiguously as
//      the residential address once it sits next to the business address)
//      changed. */

//   const frontFields = [
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const personalFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//   ];

//   const addressFields = [
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     // accent: "gold" gives the business address a warm icon chip so it reads
//     // as visually distinct from the residential address right below it.
//     { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
//     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name. The logo now sits inside its own white ring with real
//                  padding around the emblem (rather than a border drawn flush
//                  against it), and the two name lines are centered as one
//                  flex column against that ring's full height so the English
//                  and Marathi lines feel deliberately balanced rather than
//                  just stacked. A single hairline gold rule closes out the
//                  bottom edge — restrained, not a decorative wave. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits.
//                    `flex flex-col justify-center` keeps both lines centered
//                    against the taller logo ring beside them. ── */}
//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: single-column stack — title, then photo, then the
//                  six fields as full-width rows, then the AC signature line
//                  pinned to the bottom. A very faint diagonal pattern sits
//                  behind the whole body for a premium printed-card texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* Title */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="text-[17.3px] font-bold leading-tight tracking-tight text-[#0B5D30]">
//                   रस्ता विक्रेता ओळखपत्र
//                 </h2>
//                 <p className="text-[11.5px] font-semibold italic leading-tight text-[#CA9D28]">
//                   (Street Vendor Identity Card)
//                 </p>
//                 <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//               </div>

//               {/* QR + Photo — QR (same size/style as the back face) now sits
//                    to the left of the photo, side by side, both unchanged
//                    in size/border/shadow from their existing styling. ── */}
//               <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>

//                 <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative mt-[1px] grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto). Shortened
//                    and centered so it reads as a deliberate signature block
//                    rather than a stray leftover rule; "सहाय्यक आयुक्त" is now
//                    the prominent line (green, bold, small-caps tracking) with
//                    "(स्वाक्षरी)" reduced to a quiet secondary caption. A thin
//                    gold rule closes out the very bottom of the card, mirroring
//                    the header's hairline for a finished, bookend feel. ── */}
//               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
//                 <div className="h-px w-[34%] bg-[#94a3b8]" />
//                 <p className="whitespace-nowrap text-[11px] font-bold uppercase leading-tight tracking-[0.03em] text-[#0B5D30]">
//                   सहाय्यक आयुक्त
//                 </p>
//                 <p className="whitespace-nowrap text-[11px] font-bold leading-tight text-[#0f172a]">(स्वाक्षरी)</p>
//                 <div className="mt-1 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-80" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — identical treatment to the front face (see
//                  comments there): more breathing room around the logo, the
//                  two name lines centered against it as one column, and a
//                  single hairline gold rule instead of the old decorative
//                  wave, so both faces read as one consistent card. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: QR at the top (unchanged, currently commented out
//                  as in the original), then the fields grouped into two
//                  clearly labelled sections — PERSONAL INFORMATION and
//                  ADDRESS INFORMATION — instead of one flat list. A faint
//                  diagonal pattern echoes the front face's texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* QR */}
//               {/* <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//               >
//                 <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//               </Link> */}

//               {/* Fields — grouped into two labelled sections. Each
//                   SectionHeading spans all 4 grid columns so the eyebrow +
//                   gold rule sits flush above its rows; gap-y is the only
//                   spacing between rows within a section, and the heading's
//                   own top padding gives the two groups a clear but light
//                   separation. */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[13px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 <SectionHeading>Personal Information</SectionHeading>
//                 {personalFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}

//                 <SectionHeading>Address Information</SectionHeading>
//                 {addressFields.map((f) => (
//                   <IconCardField
//                     key={f.label}
//                     icon={f.icon}
//                     label={f.label}
//                     value={f.value}
//                     wrap={f.wrap}
//                     accent={f.accent}
//                   />
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


// import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
//   FiHome,
// } from "react-icons/fi";

// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";

// import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // NOTE: point this at the same logo file used in the sidebar
// // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // import vvcmcLogo from "../../../assets/logo.png";
// import logo from "../../../assets/logovvcmc.jpg";
// import banner from "../../../assets/banner1.png";
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
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
//       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
//       <span
//         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
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
//    so every row lines up cleanly.

//    Typography hierarchy (kept consistent everywhere this is
//    used): label = Medium/500, value = SemiBold/600, and the
//    `strong` flag bumps a single row (the vendor's name) up to
//    Bold/700 — the only three weights used across the card.

//    `accent` lets a single row's icon chip use a warm gold tone
//    instead of the default green, so the business address can
//    read as visually distinct from the residential address
//    without changing the icon glyph or the surrounding layout.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

//   return (
//     <>
//       <span className={`mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
//         <Icon size={8.5} />
//       </span>
//       <span
//         className={`min-w-0 whitespace-nowrap text-[13.1px] leading-[16.5px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         }`}
//       >
//         {label}
//       </span>
//       <span className={`text-[13.1px] leading-[16.5px] text-[#0f172a] ${strong ? "font-bold" : "font-semibold"}`}>:</span>
//       {/* Value is never truncated — certificate numbers / validity ranges must
//           stay fully readable, wrapping onto a second line only if it
//           genuinely cannot fit on one.
//           When `wrap` is set (used for the address fields, which regularly
//           run onto 2 lines): a single border-bottom only ever draws under
//           the LAST line of a wrapped box, so line 1 ("...virar") was left
//           with no underline at all. Switching to a text-decoration dotted
//           underline instead fixes that — text-decoration is drawn under
//           EVERY line of wrapped text, so both "...virar" and "(West)
//           Working/Residence" each get their own dotted line. underline-
//           offset pushes it down off the descenders, and the extra
//           line-height gives the two lines (and their two underlines) room
//           to breathe instead of crowding into each other. */}
//       <span
//         className={`min-w-0 whitespace-normal break-words text-[14.5px] text-[#0f172a] ${
//           strong ? "font-bold" : "font-semibold"
//         } ${
//           wrap
//             ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
//             : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
//         }`}
//       >
//         {value || "\u00A0"}
//       </span>
//     </>
//   );
// }

// /* =========================================================
//    SECTION HEADING — used on the back face to group fields into
//    "PERSONAL INFORMATION" / "ADDRESS INFORMATION" without adding
//    visual weight: a small green uppercase eyebrow plus a thin
//    gold rule that trails off toward the edge of the card. Spans
//    all 4 grid columns so it sits flush with the rows below it.
// ========================================================= */

// function SectionHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[2px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.6px] font-bold uppercase tracking-[0.14em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#D9BE68] to-transparent opacity-80" />
//     </div>
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

//   // Load Poppins (modern, govt/project-UI friendly) once for the card faces.
//   // Noto Sans Devanagari is pulled in alongside it purely as a fallback —
//   // Poppins has no Devanagari glyphs, so Marathi labels/values need a font
//   // that actually covers them; English/numerals still render in Poppins.
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

//   // A plain browser text-selection highlight (bright blue, full-opacity)
//   // reads as an accidental artifact on a printed-style ID card. This scopes
//   // a soft, on-brand selection color to just the two card faces so an
//   // accidental click-drag never shows the default blue.
//   useEffect(() => {
//     if (document.getElementById("smartcard-selection-style")) return;
//     const style = document.createElement("style");
//     style.id = "smartcard-selection-style";
//     style.textContent = `
//       .smart-card-front ::selection,
//       .smart-card-back ::selection {
//         background-color: rgba(11, 93, 48, 0.12);
//         color: inherit;
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

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

//   const CARD_WIDTH_MM = 90;
//   const CARD_HEIGHT_MM = 105;
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
//           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
//           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
//           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
//           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
//           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
//           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
//         orientation: "portrait",
//         unit: "mm",
//         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
//       });
//       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
//       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
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
//      Front (next to photo): name, gender, mobile, ward, validity.
//      Back is split into two labelled groups instead of one flat list:
//        - PERSONAL INFORMATION: certificate no., dob/age, business type,
//          vending place, timing
//        - ADDRESS INFORMATION: business address, residential address
//      "ओळखपत्र क्रमांक" (certificate no.) moved from the front to the top
//      of Personal Information on the back, per request — same data, same
//      icon, just relocated. Same otherwise as before — only the grouping
//      and the "पत्ता" label (now "निवासी पत्ता", to read unambiguously as
//      the residential address once it sits next to the business address)
//      changed. */

//   const frontFields = [
//     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
//     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
//     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
//     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
//     {
//       icon: FiCalendar,
//       label: "ओळखपत्र वैधता",
//       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
//     },
//   ];

//   const personalFields = [
//     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
//     {
//       icon: FiClock,
//       label: "जन्मतारीख / वय",
//       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
//     },
//     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
//     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
//     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
//   ];

//   const addressFields = [
//     // wrap: true -> long addresses flow onto extra lines instead of being cut off
//     // accent: "gold" gives the business address a warm icon chip so it reads
//     // as visually distinct from the residential address right below it.
//     { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
//     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — occupies ~22% of card height, logo + corporation
//                  name. The logo now sits inside its own white ring with real
//                  padding around the emblem (rather than a border drawn flush
//                  against it), and the two name lines are centered as one
//                  flex column against that ring's full height so the English
//                  and Marathi lines feel deliberately balanced rather than
//                  just stacked. A single hairline gold rule closes out the
//                  bottom edge — restrained, not a decorative wave. ── */}
//             {/* <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ backgroundImage: `url(${banner})`, backgroundSize: "118% 130%", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
//             > */}

//             <div
//   className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-2 pb-3"
//   style={{ backgroundImage: `url(${banner})`, backgroundSize: "118% 130%", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
// >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               {/* ── Corporation name — two lines, no `truncate` (that class
//                    sets its own overflow:hidden and was clipping the tops of
//                    Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
//                    alone is enough since this text is fixed and always fits.
//                    `flex flex-col justify-center` keeps both lines centered
//                    against the taller logo ring beside them. ── */}
//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: single-column stack — title, then photo, then the
//                  six fields as full-width rows, then the AC signature line
//                  pinned to the bottom. A very faint diagonal pattern sits
//                  behind the whole body for a premium printed-card texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* Title */}
//               <div className="relative w-full shrink-0 text-center">
//                 <h2 className="text-[17.3px] font-bold leading-tight tracking-tight text-[#0B5D30]">
//                   रस्ता विक्रेता ओळखपत्र
//                 </h2>
//                 <p className="text-[11.5px] font-semibold italic leading-tight text-[#CA9D28]">
//                   (Street Vendor Identity Card)
//                 </p>
//                 <div className="mt-1 h-px w-full bg-[#D9BE68]" />
//               </div>

//               {/* QR + Photo — QR (same size/style as the back face) now sits
//                    to the left of the photo, side by side, both unchanged
//                    in size/border/shadow from their existing styling. ── */}
//               <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>

//                 <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
//                   {vendor.documents?.photo ? (
//                     <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center">
//                       <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative mt-[1px] grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto). Shortened
//                    and centered so it reads as a deliberate signature block
//                    rather than a stray leftover rule; "सहाय्यक आयुक्त" is now
//                    the prominent line (green, bold, small-caps tracking) with
//                    "(स्वाक्षरी)" reduced to a quiet secondary caption. A thin
//                    gold rule closes out the very bottom of the card, mirroring
//                    the header's hairline for a finished, bookend feel. ── */}
//               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
//                 <div className="h-px w-[34%] bg-[#94a3b8]" />
//                 <p className="whitespace-nowrap text-[11px] font-bold uppercase leading-tight tracking-[0.03em] text-[#0B5D30]">
//                   सहाय्यक आयुक्त
//                 </p>
//                 <p className="whitespace-nowrap text-[11px] font-bold leading-tight text-[#0f172a]">(स्वाक्षरी)</p>
//                 <div className="mt-1 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-80" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
//             {/* ── Header bar — identical treatment to the front face (see
//                  comments there): more breathing room around the logo, the
//                  two name lines centered against it as one column, and a
//                  single hairline gold rule instead of the old decorative
//                  wave, so both faces read as one consistent card. ── */}
//             <div
//               className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
//               style={{ backgroundImage: `url(${banner})`, backgroundSize: "118% 130%", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
//                 <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
//                   Vasai-Virar City Municipal Corporation
//                 </p>
//                 <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             {/* ── Body: QR at the top (unchanged, currently commented out
//                  as in the original), then the fields grouped into two
//                  clearly labelled sections — PERSONAL INFORMATION and
//                  ADDRESS INFORMATION — instead of one flat list. A faint
//                  diagonal pattern echoes the front face's texture. ── */}
//             <div className="relative flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               {/* QR */}
//               {/* <Link
//                 to={`/verify/${vendor.applicationNo}`}
//                 className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
//               >
//                 <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//               </Link> */}

//               {/* Fields — grouped into two labelled sections. Each
//                   SectionHeading spans all 4 grid columns so the eyebrow +
//                   gold rule sits flush above its rows; gap-y is the only
//                   spacing between rows within a section, and the heading's
//                   own top padding gives the two groups a clear but light
//                   separation. */}
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[13px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 <SectionHeading>Personal Information</SectionHeading>
//                 {personalFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
//                 ))}

//                 <SectionHeading>Address Information</SectionHeading>
//                 {addressFields.map((f) => (
//                   <IconCardField
//                     key={f.label}
//                     icon={f.icon}
//                     label={f.label}
//                     value={f.value}
//                     wrap={f.wrap}
//                     accent={f.accent}
//                   />
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





import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
  FiHome,
} from "react-icons/fi";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// NOTE: point this at the same logo file used in the sidebar
// (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// import vvcmcLogo from "../../../assets/logo.png";
import logo from "../../../assets/logovvcmc.jpg";
import banner from "../../../assets/banner1.png";
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
      <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
      <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
      <span
        className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
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
   so every row lines up cleanly.

   Typography hierarchy (kept consistent everywhere this is
   used): label = Medium/500, value = SemiBold/600, and the
   `strong` flag bumps a single row (the vendor's name) up to
   Bold/700 — the only three weights used across the card.

   `accent` lets a single row's icon chip use a warm gold tone
   instead of the default green, so the business address can
   read as visually distinct from the residential address
   without changing the icon glyph or the surrounding layout.
========================================================= */

function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
  const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

  return (
    <>
      <span className={`mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
        <Icon size={8.5} />
      </span>
      <span
        className={`min-w-0 whitespace-nowrap text-[13.1px] leading-[16.5px] text-[#0f172a] ${
          strong ? "font-bold" : "font-semibold"
        }`}
      >
        {label}
      </span>
      <span className={`text-[13.1px] leading-[16.5px] text-[#0f172a] ${strong ? "font-bold" : "font-semibold"}`}>:</span>
      {/* Value is never truncated — certificate numbers / validity ranges must
          stay fully readable, wrapping onto a second line only if it
          genuinely cannot fit on one.
          When `wrap` is set (used for the address fields, which regularly
          run onto 2 lines): a single border-bottom only ever draws under
          the LAST line of a wrapped box, so line 1 ("...virar") was left
          with no underline at all. Switching to a text-decoration dotted
          underline instead fixes that — text-decoration is drawn under
          EVERY line of wrapped text, so both "...virar" and "(West)
          Working/Residence" each get their own dotted line. underline-
          offset pushes it down off the descenders, and the extra
          line-height gives the two lines (and their two underlines) room
          to breathe instead of crowding into each other. */}
      <span
        className={`min-w-0 whitespace-normal break-words text-[14.5px] text-[#0f172a] ${
          strong ? "font-bold" : "font-semibold"
        } ${
          wrap
            ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
            : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
        }`}
      >
        {value || "\u00A0"}
      </span>
    </>
  );
}

/* =========================================================
   SECTION HEADING — used on the back face to group fields into
   "PERSONAL INFORMATION" / "ADDRESS INFORMATION" without adding
   visual weight: a small green uppercase eyebrow plus a thin
   gold rule that trails off toward the edge of the card. Spans
   all 4 grid columns so it sits flush with the rows below it.
========================================================= */

function SectionHeading({ children }) {
  return (
    <div className="col-span-4 flex items-center gap-2 pt-[2px] first:pt-0">
      <span className="whitespace-nowrap text-[8.6px] font-bold uppercase tracking-[0.14em] text-[#0B5D30]">
        {children}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#D9BE68] to-transparent opacity-80" />
    </div>
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

  // Load Poppins (modern, govt/project-UI friendly) once for the card faces.
  // Noto Sans Devanagari is pulled in alongside it purely as a fallback —
  // Poppins has no Devanagari glyphs, so Marathi labels/values need a font
  // that actually covers them; English/numerals still render in Poppins.
  useEffect(() => {
    if (document.getElementById("smartcard-poppins-font")) return;
    const link = document.createElement("link");
    link.id = "smartcard-poppins-font";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  // A plain browser text-selection highlight (bright blue, full-opacity)
  // reads as an accidental artifact on a printed-style ID card. This scopes
  // a soft, on-brand selection color to just the two card faces so an
  // accidental click-drag never shows the default blue.
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

  const CARD_WIDTH_MM = 90;
  const CARD_HEIGHT_MM = 105;
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
          "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
          "* { margin: 0; padding: 0; box-sizing: border-box; }" +
          "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
          "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
          "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
          ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
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
        orientation: "portrait",
        unit: "mm",
        format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
      });
      pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
      pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
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
     Front (next to photo): name, gender, mobile, ward, validity.
     Back is split into two labelled groups instead of one flat list:
       - PERSONAL INFORMATION: certificate no., dob/age, business type,
         vending place, timing
       - ADDRESS INFORMATION: business address, residential address
     "ओळखपत्र क्रमांक" (certificate no.) moved from the front to the top
     of Personal Information on the back, per request — same data, same
     icon, just relocated. Same otherwise as before — only the grouping
     and the "पत्ता" label (now "निवासी पत्ता", to read unambiguously as
     the residential address once it sits next to the business address)
     changed. */

  const frontFields = [
    { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
    { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
    { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
    { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
    {
      icon: FiCalendar,
      label: "ओळखपत्र वैधता",
      value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
    },
  ];

  const personalFields = [
    { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
    {
      icon: FiClock,
      label: "जन्मतारीख / वय",
      value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
    },
    { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
    { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
    { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
  ];

  const addressFields = [
    // wrap: true -> long addresses flow onto extra lines instead of being cut off
    // accent: "gold" gives the business address a warm icon chip so it reads
    // as visually distinct from the residential address right below it.
    { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
    { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
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
              fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
            }}
          >
            {/* ── Header bar — occupies ~22% of card height, logo + corporation
                 name. The logo now sits inside its own white ring with real
                 padding around the emblem (rather than a border drawn flush
                 against it), and the two name lines are centered as one
                 flex column against that ring's full height so the English
                 and Marathi lines feel deliberately balanced rather than
                 just stacked. A single hairline gold rule closes out the
                 bottom edge — restrained, not a decorative wave. ── */}
            {/* <div
              className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
              style={{ backgroundImage: `url(${banner})`, backgroundSize: "118% 130%", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
            > */}
            {/* <div
              className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-2 pb-3"
              style={{ backgroundImage: `url(${banner})`, backgroundSize: "118% 130%", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
            > */}

            {/* banner1.png has a chunk of blank white space above the green
                shape itself — center-positioning it was pushing that white
                strip straight into view at the top of the header. Scaling
                the image taller (backgroundSize height "170%") and pulling
                it up with a negative Y offset in backgroundPosition moves
                that white strip up and off-screen, so only the green/gold
                banner artwork shows inside the header, edge-to-edge. */}
            <div
              className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-1.5 pb-3"
              style={{
                backgroundImage: `url(${banner})`,
                backgroundSize: "120% 170%",
                backgroundPosition: "center -18px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
                <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
              </div>

              {/* ── Corporation name — two lines, no `truncate` (that class
                   sets its own overflow:hidden and was clipping the tops of
                   Devanagari matras like "वि"/"लि"); `whitespace-nowrap`
                   alone is enough since this text is fixed and always fits.
                   `flex flex-col justify-center` keeps both lines centered
                   against the taller logo ring beside them. ── */}
              <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
                <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
                  Vasai-Virar City Municipal Corporation
                </p>
                <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
                  वसई-विरार शहर महानगरपालिका
                </p>
              </div>
            </div>

            {/* ── Body: single-column stack — title, then photo, then the
                 six fields as full-width rows, then the AC signature line
                 pinned to the bottom. A very faint diagonal pattern sits
                 behind the whole body for a premium printed-card texture. ── */}
            <div className="relative flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
                }}
              />

              {/* Title */}
              <div className="relative w-full shrink-0 text-center">
                <h2 className="text-[17.3px] font-bold leading-tight tracking-tight text-[#0B5D30]">
                  रस्ता विक्रेता ओळखपत्र
                </h2>
                <p className="text-[11.5px] font-semibold italic leading-tight text-[#CA9D28]">
                  (Street Vendor Identity Card)
                </p>
                <div className="mt-1 h-px w-full bg-[#D9BE68]" />
              </div>

              {/* QR + Photo — QR (same size/style as the back face) now sits
                   to the left of the photo, side by side, both unchanged
                   in size/border/shadow from their existing styling. ── */}
              <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
                <Link
                  to={`/verify/${vendor.applicationNo}`}
                  className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
                >
                  <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
                </Link>

                <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#f8fafc] shadow-[0_0_0_2px_#C9A227]">
                  {vendor.documents?.photo ? (
                    <img src={vendor.documents.photo} alt={vendor.personal.fullName} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Fields — full-width rows, stacked one per line */}
              <div
                className="relative mt-[1px] grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
                style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
              >
                {frontFields.map((f) => (
                  <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
                ))}
              </div>

              {/* ── Signature line, pinned to the bottom (mt-auto). Shortened
                   and centered so it reads as a deliberate signature block
                   rather than a stray leftover rule; "सहाय्यक आयुक्त" is now
                   the prominent line (green, bold, small-caps tracking) with
                   "(स्वाक्षरी)" reduced to a quiet secondary caption. A thin
                   gold rule closes out the very bottom of the card, mirroring
                   the header's hairline for a finished, bookend feel. ── */}
              <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
                <div className="h-px w-[34%] bg-[#94a3b8]" />
                <p className="whitespace-nowrap text-[11px] font-bold uppercase leading-tight tracking-[0.03em] text-[#0B5D30]">
                  सहाय्यक आयुक्त
                </p>
                <p className="whitespace-nowrap text-[11px] font-bold leading-tight text-[#0f172a]">(स्वाक्षरी)</p>
                <div className="mt-1 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-80" />
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
              fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
            }}
          >
            {/* ── Header bar — identical treatment to the front face (see
                 comments there): more breathing room around the logo, the
                 two name lines centered against it as one column, and a
                 single hairline gold rule instead of the old decorative
                 wave, so both faces read as one consistent card. ── */}
            {/* <div
              className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-3.5 pb-3"
              style={{ backgroundImage: `url(${banner})`, backgroundSize: "118% 130%", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
            > */}

            {/* Same crop/offset fix as the front header above — pushes
                banner1.png's blank top margin off-screen so only the
                green/gold artwork fills the header. Keep this in sync
                with the front header if either is tweaked again. */}
            <div
              className="relative flex shrink-0 items-center gap-3 pl-4 pr-3.5 pt-1.5 pb-3"
              style={{
                backgroundImage: `url(${banner})`,
                backgroundSize: "120% 170%",
                backgroundPosition: "center -18px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9BE68] to-transparent opacity-90" />

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[2.5px] shadow-[0_0_0_1.5px_#C9A227]">
                <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
              </div>

              <div className="flex min-w-0 flex-col justify-center gap-[4px] leading-tight">
                <p className="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.02em] text-[#ffffff]">
                  Vasai-Virar City Municipal Corporation
                </p>
                <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] text-[#CA9D28]">
                  वसई-विरार शहर महानगरपालिका
                </p>
              </div>
            </div>

            {/* ── Body: QR at the top (unchanged, currently commented out
                 as in the original), then the fields grouped into two
                 clearly labelled sections — PERSONAL INFORMATION and
                 ADDRESS INFORMATION — instead of one flat list. A faint
                 diagonal pattern echoes the front face's texture. ── */}
            <div className="relative flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
                }}
              />

              {/* QR */}
              {/* <Link
                to={`/verify/${vendor.applicationNo}`}
                className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 border-[#0B5D30] bg-[#ffffff] p-1.5 shadow-[0_0_0_2px_#C9A227] transition-transform hover:scale-[1.03]"
              >
                <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
              </Link> */}

              {/* Fields — grouped into two labelled sections. Each
                  SectionHeading spans all 4 grid columns so the eyebrow +
                  gold rule sits flush above its rows; gap-y is the only
                  spacing between rows within a section, and the heading's
                  own top padding gives the two groups a clear but light
                  separation. */}
              <div
                className="relative grid w-full flex-1 content-start gap-y-[13px] gap-x-1.5"
                style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
              >
                <SectionHeading>Personal Information</SectionHeading>
                {personalFields.map((f) => (
                  <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
                ))}

                <SectionHeading>Address Information</SectionHeading>
                {addressFields.map((f) => (
                  <IconCardField
                    key={f.label}
                    icon={f.icon}
                    label={f.label}
                    value={f.value}
                    wrap={f.wrap}
                    accent={f.accent}
                  />
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