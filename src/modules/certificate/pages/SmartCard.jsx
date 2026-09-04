// // import { Fragment, useEffect, useMemo, useRef, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { QRCodeSVG } from "qrcode.react";
// // import html2canvas from "html2canvas-pro";
// // import jsPDF from "jspdf";

// // import {
// //   FiDownload,
// //   FiPrinter,
// //   FiUser,
// //   FiExternalLink,
// //   FiShield,
// //   FiLoader,
// //   FiCreditCard,
// //   FiPhone,
// //   FiFlag,
// //   FiUsers,
// //   FiMapPin,
// //   FiCalendar,
// //   FiClock,
// //   FiBriefcase,
// //   FiHome,
// // } from "react-icons/fi";

// // import Card from "../../../components/ui/Card";
// // import Button from "../../../components/ui/Button";

// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // // NOTE: point this at the same logo file used in the sidebar
// // // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // // import vvcmcLogo from "../../../assets/logo.png";
// // import logo from "../../../assets/logovvcmc.jpg";
// // import banner from "../../../assets/banner1.png";
// // // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// // import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";
// // import { useAuth } from "../../auth/hooks/useAuth";


// // /* =========================================================
// //    HELPERS
// // ========================================================= */

// // function formatDate(d) {
// //   if (!d) return "-";
// //   const date = new Date(d);
// //   if (Number.isNaN(date.getTime())) return "-";
// //   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // }

// // function calcAge(dob) {
// //   if (!dob) return "-";
// //   const birth = new Date(dob);
// //   if (Number.isNaN(birth.getTime())) return "-";
// //   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// //   // guard against bad/future dates instead of showing a negative number
// //   return age >= 0 ? age : "-";
// // }

// // function saleType(vendorType) {
// //   if (!vendorType) return "-";
// //   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// // }

// // function genderType(gender) {
// //   if (!gender) return "-";
// //   const value = gender.toLowerCase();
// //   if (value === "male") return "पुरुष";
// //   if (value === "female") return "स्त्री";
// //   if (value === "other") return "इतर";
// //   return gender;
// // }


// // function CardField({ label, value, wrap = false }) {
// //   return (
// //     <>
// //       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
// //       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
// //       <span
// //         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
// //           wrap ? "whitespace-normal break-words" : "truncate"
// //         }`}
// //       >
// //         {value || "\u00A0"}
// //       </span>
// //     </>
// //   );
// // }



// // function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
// //   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

// //   return (
// //     <>
// //       <span className={`mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
// //         <Icon size={8.5} />
// //       </span>
// //       <span
// //         className={`min-w-0 whitespace-nowrap text-[13.1px] leading-[16.5px] text-[#0f172a] ${
// //           strong ? "font-bold" : "font-semibold"
// //         }`}
// //       >
// //         {label}
// //       </span>
// //       <span className={`text-[13.1px] leading-[16.5px] text-[#0f172a] ${strong ? "font-bold" : "font-semibold"}`}>:</span>
     
// //       <span
// //         className={`min-w-0 whitespace-normal break-words text-[14.5px] text-[#0f172a] ${
// //           strong ? "font-bold" : "font-semibold"
// //         } ${
// //           wrap
// //             ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
// //             : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
// //         }`}
// //       >
// //         {value || "\u00A0"}
// //       </span>
// //     </>
// //   );
// // }



// // function SectionHeading({ children }) {
// //   return (
// //     <div className="col-span-4 flex items-center gap-2 pt-[2px] first:pt-0">
// //       <span className="whitespace-nowrap text-[8.6px] font-bold uppercase tracking-[0.14em] text-[#0B5D30]">
// //         {children}
// //       </span>
// //       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#D9BE68] to-transparent opacity-80" />
// //     </div>
// //   );
// // }


// // /* =========================================================
// //    MAIN COMPONENT
// // ========================================================= */

// // export default function SmartCard() {
// //   const { id: applicationNo } = useParams();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   // two separate faces now — front and back are captured/printed
// //   // as two independent images instead of one tall card.
// //   const frontRef = useRef(null);
// //   const backRef = useRef(null);
// //   const [isExporting, setIsExporting] = useState(false);

// //   /* ==================== API DATA ==================== */

// //   const [vendor, setVendor] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     let cancelled = false;
// //     setLoading(true);
// //     setError("");

// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       if (cancelled) return;
// //       setLoading(false);

// //       if (!result.success) {
// //         setError(result.message || "Vendor not found.");
// //         return;
// //       }

// //       setVendor(result.data);
// //     });

// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [applicationNo]);

  
// //   useEffect(() => {
// //     if (document.getElementById("smartcard-poppins-font")) return;
// //     const link = document.createElement("link");
// //     link.id = "smartcard-poppins-font";
// //     link.rel = "stylesheet";
// //     link.href =
// //       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
// //     document.head.appendChild(link);
// //   }, []);

  
// //   useEffect(() => {
// //     if (document.getElementById("smartcard-selection-style")) return;
// //     const style = document.createElement("style");
// //     style.id = "smartcard-selection-style";
// //     style.textContent = `
// //       .smart-card-front ::selection,
// //       .smart-card-back ::selection {
// //         background-color: rgba(11, 93, 48, 0.12);
// //         color: inherit;
// //       }
// //     `;
// //     document.head.appendChild(style);
// //   }, []);

// //   const certificate = vendor?.certificate;

// //   /* ==================== VERIFICATION URL ==================== */

// //   const verifyUrl = useMemo(() => {
// //     if (certificate?.qrCodeData) return certificate.qrCodeData;
// //     if (!vendor) return "";
// //     return `${window.location.origin}/verify/${vendor.applicationNo}`;
// //   }, [vendor, certificate]);

// //   const cardCode = certificate?.certificateNo || "";

  
// //   const STYLE_PROPS_TO_FLATTEN = [
// //     "backgroundImage",
// //     "backgroundColor",
// //     "backgroundClip",
// //     "WebkitBackgroundClip",
// //     "backgroundPosition",
// //     "backgroundSize",
// //     "backgroundRepeat",
// //     "color",
// //     "borderTopColor",
// //     "borderRightColor",
// //     "borderBottomColor",
// //     "borderLeftColor",
// //     "borderTopWidth",
// //     "borderRightWidth",
// //     "borderBottomWidth",
// //     "borderLeftWidth",
// //     "borderTopLeftRadius",
// //     "borderTopRightRadius",
// //     "borderBottomLeftRadius",
// //     "borderBottomRightRadius",
// //     "borderStyle",
// //     "opacity",
// //     "fill",
// //     "stroke",
// //   ];

 
// //   const flattenComputedStyles = (sourceEl, targetEl) => {
// //     try {
// //       if (!sourceEl || !targetEl || sourceEl.nodeType !== 1 || targetEl.nodeType !== 1) return;

// //       let computed;
// //       try {
// //         computed = window.getComputedStyle(sourceEl);
// //       } catch {
// //         return; // can't read styles for this node — leave it as-is, move on
// //       }

// //       STYLE_PROPS_TO_FLATTEN.forEach((prop) => {
// //         try {
// //           const value = computed[prop];
// //           if (value) targetEl.style[prop] = value;
// //         } catch {
         
// //         }
// //       });

// //       const sourceChildren = sourceEl.children || [];
// //       const targetChildren = targetEl.children || [];
// //       const count = Math.min(sourceChildren.length, targetChildren.length);
// //       for (let i = 0; i < count; i++) {
// //         flattenComputedStyles(sourceChildren[i], targetChildren[i]);
// //       }
// //     } catch {
// //       // absolute last-resort guard — never let this function throw upward
// //     }
// //   };

 
// //   const withTimeout = (promise, ms, label) =>
// //     new Promise((resolve, reject) => {
// //       const timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
// //       promise.then(
// //         (value) => {
// //           clearTimeout(timer);
// //           resolve(value);
// //         },
// //         (err) => {
// //           clearTimeout(timer);
// //           reject(err);
// //         }
// //       );
// //     });

// //   const CARD_WIDTH_MM = 90;
// //   const CARD_HEIGHT_MM = 105;
// //   const PREVIEW_SCALE = 4.3; // px-per-mm, on-screen preview only

// //   const captureFace = async (ref) => {
// //     if (!ref.current) return null;

// //     // Make sure the Devanagari + Latin webfonts are fully loaded before
// //     // rasterizing, so text weight/rendering also matches the screen.
// //     // Capped at 3s so a font that never resolves can't stall export.
// //     if (document.fonts && document.fonts.ready) {
// //       try {
// //         await withTimeout(document.fonts.ready, 3000, "Font load");
// //       } catch {
// //         // proceed with capture regardless — better a slightly-late font
// //         // than a permanently stuck button
// //       }
// //     }

// //     return withTimeout(
// //       html2canvas(ref.current, {
// //         scale: 4, // high-res so print/PDF output stays crisp at this small size
// //         useCORS: true,
// //         allowTaint: true,
// //         backgroundColor: "#ffffff",
// //         foreignObjectRendering: false,
// //         imageTimeout: 0,
// //         logging: false,
// //         onclone: (_clonedDoc, clonedElement) => {
          
// //           flattenComputedStyles(ref.current, clonedElement);
// //         },
// //       }),
// //       15000,
// //       "Card capture"
// //     );
// //   };

// //   const handlePrint = async () => {
// //     if (isExporting) return;
// //     setIsExporting(true);
// //     try {
// //       const [frontCanvas, backCanvas] = await Promise.all([
// //         captureFace(frontRef),
// //         captureFace(backRef),
// //       ]);
// //       if (!frontCanvas || !backCanvas) return;

// //       const frontData = frontCanvas.toDataURL("image/png");
// //       const backData = backCanvas.toDataURL("image/png");

// //       const printWindow = window.open("", "_blank", "width=800,height=1000");
// //       if (!printWindow) {
// //         window.alert("Please allow pop-ups for this site to print the Smart Card.");
// //         return;
// //       }
// //       printWindow.document.write(
// //         "<html><head><title>Smart Card</title><style>" +
// //           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
// //           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
// //           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
// //           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
// //           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
// //           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
// //           ".page:last-child { page-break-after: auto; }" +
// //           "</style></head><body>" +
// //           "<div class=\"page\"><img src=\"" + frontData + "\" /></div>" +
// //           "<div class=\"page\"><img src=\"" + backData + "\" /></div>" +
// //           "</body></html>"
// //       );
// //       printWindow.document.close();
// //       printWindow.onload = () => {
// //         printWindow.focus();
// //         printWindow.print();
// //         printWindow.close();
// //       };
// //     } catch (err) {
// //       console.error("Smart card print failed:", err);
// //       window.alert("Print failed: " + (err && err.message ? err.message : String(err)));
// //     } finally {
// //       setIsExporting(false);
// //     }
// //   };

// //   const handleDownloadPdf = async () => {
// //     if (isExporting) return;
// //     setIsExporting(true);
// //     try {
// //       const [frontCanvas, backCanvas] = await Promise.all([
// //         captureFace(frontRef),
// //         captureFace(backRef),
// //       ]);
// //       if (!frontCanvas || !backCanvas) return;

// //       const frontData = frontCanvas.toDataURL("image/png");
// //       const backData = backCanvas.toDataURL("image/png");

// //       const pdf = new jsPDF({
// //         orientation: "portrait",
// //         unit: "mm",
// //         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
// //       });
// //       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
// //       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
// //       pdf.addImage(backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
// //       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
// //     } catch (err) {
// //       console.error("Smart card download failed:", err);
// //       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
// //     } finally {
// //       setIsExporting(false);
// //     }
// //   };

  

// //   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// //         <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
// //         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
// //         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
// //           Back to Dashboard
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   /* ==================== LOADING ==================== */

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading...
// //       </Card>
// //     );
// //   }

// //   /* ==================== VENDOR NOT FOUND ==================== */

// //   if (error || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
// //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Vendor List
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

// //   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// //         <p className="text-sm font-semibold text-ink-700">
// //           The Smart Card is only available once payment is complete and the certificate has been issued.
// //         </p>
// //         <p className="mt-1 text-xs text-ink-500">
// //           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
// //         </p>
// //         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// //           View Vendor Profile
// //         </Link>
// //       </Card>
// //     );
// //   }

  
// //   const frontFields = [
// //     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
// //     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
// //     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
// //     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
// //     {
// //       icon: FiCalendar,
// //       label: "ओळखपत्र वैधता",
// //       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
// //     },
// //   ];

// //   const personalFields = [
// //     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
// //     {
// //       icon: FiClock,
// //       label: "जन्मतारीख / वय",
// //       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
// //     },
// //     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
// //     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
// //     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
// //   ];

// //   const addressFields = [
// //     // wrap: true -> long addresses flow onto extra lines instead of being cut off
// //     // accent: "gold" gives the business address a warm icon chip so it reads
// //     // as visually distinct from the residential address right below it.
// //     { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
// //     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
// //   ];

// //   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
// //   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

// //   /* ==================== PAGE ==================== */

// //   return (
// //     <div className="space-y-5">
// //       {/* ================= PAGE HEADER ================= */}
// //       <div className="flex flex-wrap items-start justify-between gap-4">
// //         <div>
// //           <p className="text-xs font-semibold text-ink-500">
// //             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
// //               Smart Card
// //             </Link>
// //             {" / "}
// //             {cardCode}
// //           </p>
// //           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
// //         </div>

// //         <div className="flex gap-2">
// //           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf} disabled={isExporting}>
// //             {isExporting ? "Preparing..." : "Download"}
// //           </Button>
// //           <Button icon={FiPrinter} onClick={handlePrint} disabled={isExporting}>
// //             {isExporting ? "Preparing..." : "Print"}
// //           </Button>
// //         </div>
// //       </div>

// //       {/* ================= CARD PREVIEW — front & back, side by side ================= */}
// //       <div className="flex flex-wrap items-start justify-center gap-10 px-1 py-6">

// //         {/* ---------- FRONT ---------- */}
// //         <div className="flex flex-col items-center gap-2">
// //           <p className="text-xs font-semibold text-ink-500">Front</p>
// //           <div
// //             ref={frontRef}
// //             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
// //             style={{
// //               width: `${CARD_W_PX}px`,
// //               height: `${CARD_H_PX}px`,
// //               border: "1.5px solid #0B5D30",
// //               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
// //             }}
// //           >

           



// //                         <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
// //               <div
// //                 className="absolute -inset-[3px] rounded-t-[10px]"
// //                 style={{
// //                   backgroundImage: `url(${banner})`,
// //                   backgroundSize: "cover",
// //                   backgroundPosition: "left center",
// //                   backgroundRepeat: "no-repeat",
// //                 }}
// //               />

// //               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
// //                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
// //               </div>

// //               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
// //                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
// //                   वसई-विरार शहर महानगरपालिका
// //                 </p>

// //                 <div className="relative w-full shrink-0 text-center">
// //                   <h2 className="text-[15px] font-bold leading-tight tracking-tight text-[#BB981A]">
// //                     रस्ता विक्रेता ओळखपत्र
// //                   </h2>
// //                 </div>
// //               </div>
// //             </div>

           
// //             <div className="relative z-10 flex flex-1 flex-col items-center gap-2 bg-[#ffffff] px-4 pb-2 pt-2">
// //               <div
// //                 className="pointer-events-none absolute inset-0"
// //                 style={{
// //                   backgroundImage:
// //                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
// //                 }}
// //               />

              

// //               <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
              


// //                                 <div
// //                   className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-[2px]"
// //                   style={{ borderColor: "#F7E4C2" }}
// //                 >
// //                   <div className="h-full w-full overflow-hidden rounded-[4px] bg-[#ffffff]">
// //                     {vendor.documents?.photo ? (
// //                       <img
// //                         src={vendor.documents.photo}
// //                         alt={vendor.personal.fullName}
// //                         className="block h-full w-full object-cover"
// //                       />
// //                     ) : (
// //                       <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
// //                         <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <Link
// //                   to={`/verify/${vendor.applicationNo}`}
// //                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-1.5 transition-transform hover:scale-[1.03]"
// //                   style={{ borderColor: "#F7E4C2" }}
// //                 >
// //                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
// //                 </Link>
// //               </div>

// //               {/* Fields — full-width rows, stacked one per line */}
// //               <div
// //                 className="relative mt-[1px] grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
// //                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
// //               >
// //                 {frontFields.map((f) => (
// //                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
// //                 ))}
// //               </div>

// //               {/* ── Signature line, pinned to the bottom (mt-auto). ── */}
// //               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
// //                 <div className="h-px w-[34%] bg-[#94a3b8]" />
// //                 <p className="whitespace-nowrap text-[11px] font-bold uppercase leading-tight tracking-[0.03em] text-[#0B5D30]">
// //                   सहाय्यक आयुक्त
// //                 </p>
// //                 <p className="whitespace-nowrap text-[11px] font-bold leading-tight text-[#0f172a]">(स्वाक्षरी)</p>
// //                 <div className="mt-1 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-80" />
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ---------- BACK ---------- */}
// //         <div className="flex flex-col items-center">
// //           <p className="text-xs font-semibold text-ink-500">Back</p>
// //           <div
// //             ref={backRef}
// //             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
// //             style={{
// //               width: `${CARD_W_PX}px`,
// //               height: `${CARD_H_PX}px`,
// //               border: "1.5px solid #0B5D30",
// //               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
// //             }}
// //           >
           



// //                         {/* <div className="relative  flex items-center  min-h-[140px] gap-3 pb-7 pl-2">
// //               <div
// //                 className="absolute -inset-[3px] rounded-t-[10px]"
// //                 style={{
// //                   backgroundImage: `url(${banner})`,
// //                   backgroundSize: "cover",
// //                   backgroundPosition: "left center",
// //                   backgroundRepeat: "no-repeat",
// //                 }}
// //               />

// //               <div className="relative  flex h-2=17 w-17 shrink-0 items-center justify-center rounded-full bg-[#ffffff]  shadow-[0_0_0_1.5px_#C9A227]">
// //                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
// //               </div>

// //               <div className="relative flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
// //                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
// //                   वसई-विरार शहर महानगरपालिका
// //                 </p>
// //               </div>
// //             </div> */}


// //                         <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
// //               <div
// //                 className="absolute -inset-[3px] rounded-t-[10px]"
// //                 style={{
// //                   backgroundImage: `url(${banner})`,
// //                   backgroundSize: "cover",
// //                   backgroundPosition: "left center",
// //                   backgroundRepeat: "no-repeat",
// //                 }}
// //               />

// //               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
// //                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
// //               </div>

// //               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
// //                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
// //                   वसई-विरार शहर महानगरपालिका
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 bg-[#ffffff] px-4 pb-2.5 pt-6">
// //               <div
// //                 className="pointer-events-none absolute inset-0"
// //                 style={{
// //                   backgroundImage:
// //                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
// //                 }}
// //               />

// //               <div
// //                 className="relative grid w-full flex-1 content-start gap-y-[13px] gap-x-1.5"
// //                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
// //               >
// //                 <SectionHeading>Personal Information</SectionHeading>
// //                 {personalFields.map((f) => (
// //                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
// //                 ))}

// //                 <SectionHeading>Address Information</SectionHeading>
// //                 {addressFields.map((f) => (
// //                   <IconCardField
// //                     key={f.label}
// //                     icon={f.icon}
// //                     label={f.label}
// //                     value={f.value}
// //                     wrap={f.wrap}
// //                     accent={f.accent}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ================= VERIFICATION ================= */}
// //       <div className="flex justify-center">
// //         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
// //           Open Verification Screen
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // }



// // import { Fragment, useEffect, useMemo, useRef, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { QRCodeSVG } from "qrcode.react";
// // import html2canvas from "html2canvas-pro";
// // import jsPDF from "jspdf";

// // import {
// //   FiDownload,
// //   FiPrinter,
// //   FiUser,
// //   FiExternalLink,
// //   FiShield,
// //   FiLoader,
// //   FiCreditCard,
// //   FiPhone,
// //   FiFlag,
// //   FiUsers,
// //   FiMapPin,
// //   FiCalendar,
// //   FiClock,
// //   FiBriefcase,
// //   FiHome,
// // } from "react-icons/fi";

// // import Card from "../../../components/ui/Card";
// // import Button from "../../../components/ui/Button";

// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // // NOTE: point this at the same logo file used in the sidebar
// // // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // // import vvcmcLogo from "../../../assets/logo.png";
// // import logo from "../../../assets/logovvcmc.jpg";
// // import banner from "../../../assets/banner1.png";
// // import backbanner from "../../../assets/backbanner.png";

// // // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// // import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";
// // import { useAuth } from "../../auth/hooks/useAuth";


// // /* =========================================================
// //    HELPERS
// // ========================================================= */

// // function formatDate(d) {
// //   if (!d) return "-";
// //   const date = new Date(d);
// //   if (Number.isNaN(date.getTime())) return "-";
// //   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // }

// // function calcAge(dob) {
// //   if (!dob) return "-";
// //   const birth = new Date(dob);
// //   if (Number.isNaN(birth.getTime())) return "-";
// //   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// //   // guard against bad/future dates instead of showing a negative number
// //   return age >= 0 ? age : "-";
// // }

// // function saleType(vendorType) {
// //   if (!vendorType) return "-";
// //   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// // }

// // function genderType(gender) {
// //   if (!gender) return "-";
// //   const value = gender.toLowerCase();
// //   if (value === "male") return "पुरुष";
// //   if (value === "female") return "स्त्री";
// //   if (value === "other") return "इतर";
// //   return gender;
// // }


// // function CardField({ label, value, wrap = false }) {
// //   return (
// //     <>
// //       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
// //       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
// //       <span
// //         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
// //           wrap ? "whitespace-normal break-words" : "truncate"
// //         }`}
// //       >
// //         {value || "\u00A0"}
// //       </span>
// //     </>
// //   );
// // }


// // /* =========================================================
// //    IconCardField — label/value/colon hierarchy refined for
// //    consistent icon weight, muted labels + colon vs. stronger
// //    values, and tabular numerals so dates/numbers align cleanly
// //    down the column. Layout/positions unchanged.
// // ========================================================= */

// // function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
// //   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

// //   return (
// //     <>
// //       <span className={`mt-[2px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
// //         <Icon size={8.5} strokeWidth={2} />
// //       </span>
// //       <span
// //         className={`min-w-0 whitespace-nowrap text-[12.8px] leading-[16.5px] tracking-[0.005em] text-[#334155] ${
// //           strong ? "font-bold text-[#0f172a]" : "font-semibold"
// //         }`}
// //       >
// //         {label}
// //       </span>
// //       <span className={`text-[12.8px] leading-[16.5px] text-[#94a3b8] ${strong ? "font-bold" : "font-medium"}`}>:</span>

// //       <span
// //         className={`min-w-0 whitespace-normal break-words text-[13.8px] leading-[16.5px] tabular-nums text-[#0f172a] ${
// //           strong ? "font-bold" : "font-semibold"
// //         } ${
// //           wrap
// //             ? "underline decoration-dotted decoration-1 decoration-[#C9A227]/60 underline-offset-[5px] leading-[21px]"
// //             : "border-b border-dotted border-[#C9A227]/55 pb-[1.5px]"
// //         }`}
// //       >
// //         {value || "\u00A0"}
// //       </span>
// //     </>
// //   );
// // }


// // /* =========================================================
// //    SECTION HEADING — used on the back face to group fields into
// //    "PERSONAL INFORMATION" / "ADDRESS INFORMATION". Divider now
// //    fades in more gracefully (lower starting opacity) and tracking
// //    is slightly wider for a more formal, document-like eyebrow.
// // ========================================================= */

// // function SectionHeading({ children }) {
// //   return (
// //     <div className="col-span-4 flex items-center gap-2 pt-[3px] first:pt-0">
// //       <span className="whitespace-nowrap text-[8.4px] font-bold uppercase tracking-[0.16em] text-[#0B5D30]">
// //         {children}
// //       </span>
// //       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/70 via-[#D9BE68]/50 to-transparent" />
// //     </div>
// //   );
// // }


// // /* =========================================================
// //    MAIN COMPONENT
// // ========================================================= */

// // export default function SmartCard() {
// //   const { id: applicationNo } = useParams();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   // two separate faces now — front and back are captured/printed
// //   // as two independent images instead of one tall card.
// //   const frontRef = useRef(null);
// //   const backRef = useRef(null);
// //   const [isExporting, setIsExporting] = useState(false);

// //   /* ==================== API DATA ==================== */

// //   const [vendor, setVendor] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     let cancelled = false;
// //     setLoading(true);
// //     setError("");

// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       if (cancelled) return;
// //       setLoading(false);

// //       if (!result.success) {
// //         setError(result.message || "Vendor not found.");
// //         return;
// //       }

// //       setVendor(result.data);
// //     });

// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [applicationNo]);

  
// //   useEffect(() => {
// //     if (document.getElementById("smartcard-poppins-font")) return;
// //     const link = document.createElement("link");
// //     link.id = "smartcard-poppins-font";
// //     link.rel = "stylesheet";
// //     link.href =
// //       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
// //     document.head.appendChild(link);
// //   }, []);

  
// //   useEffect(() => {
// //     if (document.getElementById("smartcard-selection-style")) return;
// //     const style = document.createElement("style");
// //     style.id = "smartcard-selection-style";
// //     style.textContent = `
// //       .smart-card-front ::selection,
// //       .smart-card-back ::selection {
// //         background-color: rgba(11, 93, 48, 0.12);
// //         color: inherit;
// //       }
// //     `;
// //     document.head.appendChild(style);
// //   }, []);

// //   const certificate = vendor?.certificate;

// //   /* ==================== VERIFICATION URL ==================== */

// //   const verifyUrl = useMemo(() => {
// //     if (certificate?.qrCodeData) return certificate.qrCodeData;
// //     if (!vendor) return "";
// //     return `${window.location.origin}/verify/${vendor.applicationNo}`;
// //   }, [vendor, certificate]);

// //   const cardCode = certificate?.certificateNo || "";

  
// //   const STYLE_PROPS_TO_FLATTEN = [
// //     "backgroundImage",
// //     "backgroundColor",
// //     "backgroundClip",
// //     "WebkitBackgroundClip",
// //     "backgroundPosition",
// //     "backgroundSize",
// //     "backgroundRepeat",
// //     "color",
// //     "borderTopColor",
// //     "borderRightColor",
// //     "borderBottomColor",
// //     "borderLeftColor",
// //     "borderTopWidth",
// //     "borderRightWidth",
// //     "borderBottomWidth",
// //     "borderLeftWidth",
// //     "borderTopLeftRadius",
// //     "borderTopRightRadius",
// //     "borderBottomLeftRadius",
// //     "borderBottomRightRadius",
// //     "borderStyle",
// //     "opacity",
// //     "fill",
// //     "stroke",
// //   ];

 
// //   const flattenComputedStyles = (sourceEl, targetEl) => {
// //     try {
// //       if (!sourceEl || !targetEl || sourceEl.nodeType !== 1 || targetEl.nodeType !== 1) return;

// //       let computed;
// //       try {
// //         computed = window.getComputedStyle(sourceEl);
// //       } catch {
// //         return; // can't read styles for this node — leave it as-is, move on
// //       }

// //       STYLE_PROPS_TO_FLATTEN.forEach((prop) => {
// //         try {
// //           const value = computed[prop];
// //           if (value) targetEl.style[prop] = value;
// //         } catch {
         
// //         }
// //       });

// //       const sourceChildren = sourceEl.children || [];
// //       const targetChildren = targetEl.children || [];
// //       const count = Math.min(sourceChildren.length, targetChildren.length);
// //       for (let i = 0; i < count; i++) {
// //         flattenComputedStyles(sourceChildren[i], targetChildren[i]);
// //       }
// //     } catch {
// //       // absolute last-resort guard — never let this function throw upward
// //     }
// //   };

 
// //   const withTimeout = (promise, ms, label) =>
// //     new Promise((resolve, reject) => {
// //       const timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
// //       promise.then(
// //         (value) => {
// //           clearTimeout(timer);
// //           resolve(value);
// //         },
// //         (err) => {
// //           clearTimeout(timer);
// //           reject(err);
// //         }
// //       );
// //     });

// //   const CARD_WIDTH_MM = 90;
// //   const CARD_HEIGHT_MM = 105;
// //   const PREVIEW_SCALE = 4.3; // px-per-mm, on-screen preview only

// //   const captureFace = async (ref) => {
// //     if (!ref.current) return null;

// //     // Make sure the Devanagari + Latin webfonts are fully loaded before
// //     // rasterizing, so text weight/rendering also matches the screen.
// //     // Capped at 3s so a font that never resolves can't stall export.
// //     if (document.fonts && document.fonts.ready) {
// //       try {
// //         await withTimeout(document.fonts.ready, 3000, "Font load");
// //       } catch {
// //         // proceed with capture regardless — better a slightly-late font
// //         // than a permanently stuck button
// //       }
// //     }

// //     return withTimeout(
// //       html2canvas(ref.current, {
// //         scale: 4, // high-res so print/PDF output stays crisp at this small size
// //         useCORS: true,
// //         allowTaint: true,
// //         backgroundColor: "#ffffff",
// //         foreignObjectRendering: false,
// //         imageTimeout: 0,
// //         logging: false,
// //         onclone: (_clonedDoc, clonedElement) => {
          
// //           flattenComputedStyles(ref.current, clonedElement);
// //         },
// //       }),
// //       15000,
// //       "Card capture"
// //     );
// //   };

// //   const handlePrint = async () => {
// //     if (isExporting) return;
// //     setIsExporting(true);
// //     try {
// //       const [frontCanvas, backCanvas] = await Promise.all([
// //         captureFace(frontRef),
// //         captureFace(backRef),
// //       ]);
// //       if (!frontCanvas || !backCanvas) return;

// //       const frontData = frontCanvas.toDataURL("image/png");
// //       const backData = backCanvas.toDataURL("image/png");

// //       const printWindow = window.open("", "_blank", "width=800,height=1000");
// //       if (!printWindow) {
// //         window.alert("Please allow pop-ups for this site to print the Smart Card.");
// //         return;
// //       }
// //       printWindow.document.write(
// //         "<html><head><title>Smart Card</title><style>" +
// //           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
// //           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
// //           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
// //           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
// //           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
// //           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
// //           ".page:last-child { page-break-after: auto; }" +
// //           "</style></head><body>" +
// //           "<div class=\"page\"><img src=\"" + frontData + "\" /></div>" +
// //           "<div class=\"page\"><img src=\"" + backData + "\" /></div>" +
// //           "</body></html>"
// //       );
// //       printWindow.document.close();
// //       printWindow.onload = () => {
// //         printWindow.focus();
// //         printWindow.print();
// //         printWindow.close();
// //       };
// //     } catch (err) {
// //       console.error("Smart card print failed:", err);
// //       window.alert("Print failed: " + (err && err.message ? err.message : String(err)));
// //     } finally {
// //       setIsExporting(false);
// //     }
// //   };

// //   const handleDownloadPdf = async () => {
// //     if (isExporting) return;
// //     setIsExporting(true);
// //     try {
// //       const [frontCanvas, backCanvas] = await Promise.all([
// //         captureFace(frontRef),
// //         captureFace(backRef),
// //       ]);
// //       if (!frontCanvas || !backCanvas) return;

// //       const frontData = frontCanvas.toDataURL("image/png");
// //       const backData = backCanvas.toDataURL("image/png");

// //       const pdf = new jsPDF({
// //         orientation: "portrait",
// //         unit: "mm",
// //         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
// //       });
// //       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
// //       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
// //       pdf.addImage(backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
// //       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
// //     } catch (err) {
// //       console.error("Smart card download failed:", err);
// //       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
// //     } finally {
// //       setIsExporting(false);
// //     }
// //   };

  

// //   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// //         <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
// //         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
// //         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
// //           Back to Dashboard
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   /* ==================== LOADING ==================== */

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading...
// //       </Card>
// //     );
// //   }

// //   /* ==================== VENDOR NOT FOUND ==================== */

// //   if (error || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
// //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Vendor List
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

// //   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// //         <p className="text-sm font-semibold text-ink-700">
// //           The Smart Card is only available once payment is complete and the certificate has been issued.
// //         </p>
// //         <p className="mt-1 text-xs text-ink-500">
// //           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
// //         </p>
// //         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// //           View Vendor Profile
// //         </Link>
// //       </Card>
// //     );
// //   }

  
// //   const frontFields = [
// //     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
// //     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
// //     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
// //     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
// //     {
// //       icon: FiCalendar,
// //       label: "ओळखपत्र वैधता",
// //       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
// //     },
// //   ];

// //   const personalFields = [
// //     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
// //     {
// //       icon: FiClock,
// //       label: "जन्मतारीख / वय",
// //       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
// //     },
// //     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
// //     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
// //     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
// //   ];

// //   const addressFields = [
// //     // wrap: true -> long addresses flow onto extra lines instead of being cut off
// //     // accent: "gold" gives the business address a warm icon chip so it reads
// //     // as visually distinct from the residential address right below it.
// //     { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
// //     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
// //   ];

// //   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
// //   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

// //   /* ==================== PAGE ==================== */

// //   return (
// //     <div className="space-y-5">
// //       {/* ================= PAGE HEADER ================= */}
// //       <div className="flex flex-wrap items-start justify-between gap-4">
// //         <div>
// //           <p className="text-xs font-semibold text-ink-500">
// //             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
// //               Smart Card
// //             </Link>
// //             {" / "}
// //             {cardCode}
// //           </p>
// //           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
// //         </div>

// //         <div className="flex gap-2">
// //           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf} disabled={isExporting}>
// //             {isExporting ? "Preparing..." : "Download"}
// //           </Button>
// //           <Button icon={FiPrinter} onClick={handlePrint} disabled={isExporting}>
// //             {isExporting ? "Preparing..." : "Print"}
// //           </Button>
// //         </div>
// //       </div>

// //       {/* ================= CARD PREVIEW — front & back, side by side ================= */}
// //       <div className="flex flex-wrap items-start justify-center gap-10 px-1 py-6">

// //         {/* ---------- FRONT ---------- */}
// //         <div className="flex flex-col items-center gap-2">
// //           <p className="text-xs font-semibold text-ink-500">Front</p>
// //           <div
// //             ref={frontRef}
// //             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
// //             style={{
// //               width: `${CARD_W_PX}px`,
// //               height: `${CARD_H_PX}px`,
// //               border: "1.5px solid #0B5D30",
// //               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
// //             }}
// //           >

           



// //                         <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
// //               <div
// //                 className="absolute -inset-[3px] rounded-t-[10px]"
// //                 style={{
// //                   backgroundImage: `url(${banner})`,
// //                   backgroundSize: "cover",
// //                   backgroundPosition: "left center",
// //                   backgroundRepeat: "no-repeat",
// //                 }}
// //               />

// //               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
// //                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
// //               </div>

// //               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
// //                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
// //                   वसई-विरार शहर महानगरपालिका
// //                 </p>

// //                 <div className="relative w-full shrink-0 text-center">
// //                   <h2 className="text-[15px] font-bold leading-tight tracking-tight text-[#BB981A]">
// //                     रस्ता विक्रेता ओळखपत्र
// //                   </h2>
// //                 </div>
// //               </div>
// //             </div>

           
// //             <div className="relative z-10 flex flex-1 flex-col items-center gap-2 bg-[#ffffff] px-4 pb-2 pt-2">
// //               <div
// //                 className="pointer-events-none absolute inset-0"
// //                 style={{
// //                   backgroundImage:
// //                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
// //                 }}
// //               />

              

// //               <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
              


// //                                 <div
// //                   className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-[2px]"
// //                   style={{ borderColor: "#F7E4C2" }}
// //                 >
// //                   <div className="h-full w-full overflow-hidden rounded-[4px] bg-[#ffffff]">
// //                     {vendor.documents?.photo ? (
// //                       <img
// //                         src={vendor.documents.photo}
// //                         alt={vendor.personal.fullName}
// //                         className="block h-full w-full object-cover"
// //                       />
// //                     ) : (
// //                       <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
// //                         <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <Link
// //                   to={`/verify/${vendor.applicationNo}`}
// //                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-1.5 transition-transform hover:scale-[1.03]"
// //                   style={{ borderColor: "#F7E4C2" }}
// //                 >
// //                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
// //                 </Link>
// //               </div>

// //               {/* Fields — full-width rows, stacked one per line */}
// //               <div
// //                 className="relative mt-[1px] grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
// //                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
// //               >
// //                 {frontFields.map((f) => (
// //                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
// //                 ))}
// //               </div>

// //               {/* ── Signature line, pinned to the bottom (mt-auto). ── */}
// //               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
// //                 <div className="h-px w-[34%] bg-[#cbd5e1]" />
// //                 <p className="whitespace-nowrap text-[10.5px] font-bold uppercase leading-tight tracking-[0.05em] text-[#0B5D30]">
// //                   सहाय्यक आयुक्त
// //                 </p>
// //                 <p className="whitespace-nowrap text-[10.5px] font-semibold leading-tight text-[#475569]">(स्वाक्षरी)</p>
// //                 <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent" />
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ---------- BACK ---------- */}
// //         {/* <div className="flex flex-col items-center">
// //           <p className="text-xs font-semibold text-ink-500">Back</p>
// //           <div
// //             ref={backRef}
// //             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
// //             style={{
// //               width: `${CARD_W_PX}px`,
// //               height: `${CARD_H_PX}px`,
// //               border: "1.5px solid #0B5D30",
// //               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
// //             }}
// //           >
           



// //                         <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
// //               <div
// //                 className="absolute -inset-[3px] rounded-t-[10px]"
// //                 style={{
// //                   backgroundImage: `url(${banner})`,
// //                   backgroundSize: "cover",
// //                   backgroundPosition: "left center",
// //                   backgroundRepeat: "no-repeat",
// //                 }}
// //               />

// //               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
// //                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
// //               </div>

// //               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
// //                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
// //                   वसई-विरार शहर महानगरपालिका
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 bg-[#ffffff] px-4 pb-2.5 pt-6">
// //               <div
// //                 className="pointer-events-none absolute inset-0"
// //                 style={{
// //                   backgroundImage:
// //                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
// //                 }}
// //               />

// //               <div
// //                 className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
// //                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
// //               >
// //                 <SectionHeading>Personal Information</SectionHeading>
// //                 {personalFields.map((f) => (
// //                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
// //                 ))}

// //                 <SectionHeading>Address Information</SectionHeading>
// //                 {addressFields.map((f) => (
// //                   <IconCardField
// //                     key={f.label}
// //                     icon={f.icon}
// //                     label={f.label}
// //                     value={f.value}
// //                     wrap={f.wrap}
// //                     accent={f.accent}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div> */}


// //                 <div className="flex flex-col items-center">
// //           <p className="text-xs font-semibold text-ink-500">Back</p>
// //           <div
// //             ref={backRef}
// //             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
// //             style={{
// //               width: `${CARD_W_PX}px`,
// //               height: `${CARD_H_PX}px`,
// //               border: "1.5px solid #0B5D30",
// //               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
// //               backgroundImage: `url(${backbanner})`,
// //               backgroundSize: "cover",
// //               backgroundPosition: "center",
// //               backgroundRepeat: "no-repeat",
// //             }}
// //           >
// //             <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
// //               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
// //                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
// //               </div>

// //               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
// //                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
// //                   वसई-विरार शहर महानगरपालिका
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
// //               <div
// //                 className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
// //                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
// //               >
// //                 <SectionHeading>Personal Information</SectionHeading>
// //                 {personalFields.map((f) => (
// //                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
// //                 ))}

// //                 <SectionHeading>Address Information</SectionHeading>
// //                 {addressFields.map((f) => (
// //                   <IconCardField
// //                     key={f.label}
// //                     icon={f.icon}
// //                     label={f.label}
// //                     value={f.value}
// //                     wrap={f.wrap}
// //                     accent={f.accent}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ================= VERIFICATION ================= */}
// //       <div className="flex justify-center">
// //         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
// //           Open Verification Screen
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // }




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
// import backbanner from "../../../assets/backbanner.png";

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
//    IconCardField — label/value/colon hierarchy refined for
//    consistent icon weight, muted labels + colon vs. stronger
//    values, and tabular numerals so dates/numbers align cleanly
//    down the column. Layout/positions unchanged.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

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


// /* =========================================================
//    SECTION HEADING — used on the back face to group fields into
//    "PERSONAL INFORMATION" / "ADDRESS INFORMATION". Divider now
//    fades in more gracefully (lower starting opacity) and tracking
//    is slightly wider for a more formal, document-like eyebrow.
// ========================================================= */

// function SectionHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[3px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.4px] font-bold uppercase tracking-[0.16em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/70 via-[#D9BE68]/50 to-transparent" />
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

  
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

  
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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//               backgroundImage: `url(${backbanner})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//             }}
//           >

           



//                         <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
//               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>

//                 <div className="relative w-full shrink-0 text-center">
//                   <h2 className="text-[15px] font-bold leading-tight tracking-tight text-[#BB981A]">
//                     रस्ता विक्रेता ओळखपत्र
//                   </h2>
//                 </div>
//               </div>
//             </div>

           
//             <div className="relative z-10 flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
              

//               <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
              


//                                 <div
//                   className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-[2px]"
//                   style={{ borderColor: "#F7E4C2" }}
//                 >
//                   <div className="h-full w-full overflow-hidden rounded-[4px] bg-[#ffffff]">
//                     {vendor.documents?.photo ? (
//                       <img
//                         src={vendor.documents.photo}
//                         alt={vendor.personal.fullName}
//                         className="block h-full w-full object-cover"
//                       />
//                     ) : (
//                       <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                         <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-1.5 transition-transform hover:scale-[1.03]"
//                   style={{ borderColor: "#F7E4C2" }}
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative mt-[1px] grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto). ── */}
//               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
//                 <div className="h-px w-[34%] bg-[#cbd5e1]" />
//                 <p className="whitespace-nowrap text-[10.5px] font-bold uppercase leading-tight tracking-[0.05em] text-[#0B5D30]">
//                   सहाय्यक आयुक्त
//                 </p>
//                 <p className="whitespace-nowrap text-[10.5px] font-semibold leading-tight text-[#475569]">(स्वाक्षरी)</p>
//                 <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         {/* <div className="flex flex-col items-center">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
           



//                         <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
//               <div
//                 className="absolute -inset-[3px] rounded-t-[10px]"
//                 style={{
//                   backgroundImage: `url(${banner})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "left center",
//                   backgroundRepeat: "no-repeat",
//                 }}
//               />

//               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 bg-[#ffffff] px-4 pb-2.5 pt-6">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
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
//         </div> */}


//                 <div className="flex flex-col items-center">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//               backgroundImage: `url(${backbanner})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//             }}
//           >
//             <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
//               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
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


// // ===========================================================



// // import { Fragment, useEffect, useMemo, useRef, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { QRCodeSVG } from "qrcode.react";
// // import html2canvas from "html2canvas-pro";
// // import jsPDF from "jspdf";

// // import {
// //   FiDownload,
// //   FiPrinter,
// //   FiUser,
// //   FiExternalLink,
// //   FiShield,
// //   FiLoader,
// //   FiCreditCard,
// //   FiPhone,
// //   FiFlag,
// //   FiUsers,
// //   FiMapPin,
// //   FiCalendar,
// //   FiClock,
// //   FiBriefcase,
// //   FiHome,
// // } from "react-icons/fi";

// // import Card from "../../../components/ui/Card";
// // import Button from "../../../components/ui/Button";

// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // // NOTE: point this at the same logo file used in the sidebar
// // // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // // import vvcmcLogo from "../../../assets/logo.png";
// // import logo from "../../../assets/logovvcmc.jpg";
// // import banner from "../../../assets/banner1.png";
// // // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// // import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";
// // import { useAuth } from "../../auth/hooks/useAuth";


// // /* =========================================================
// //    HELPERS
// // ========================================================= */

// // function formatDate(d) {
// //   if (!d) return "-";
// //   const date = new Date(d);
// //   if (Number.isNaN(date.getTime())) return "-";
// //   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // }

// // function calcAge(dob) {
// //   if (!dob) return "-";
// //   const birth = new Date(dob);
// //   if (Number.isNaN(birth.getTime())) return "-";
// //   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// //   // guard against bad/future dates instead of showing a negative number
// //   return age >= 0 ? age : "-";
// // }

// // function saleType(vendorType) {
// //   if (!vendorType) return "-";
// //   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// // }

// // function genderType(gender) {
// //   if (!gender) return "-";
// //   const value = gender.toLowerCase();
// //   if (value === "male") return "पुरुष";
// //   if (value === "female") return "स्त्री";
// //   if (value === "other") return "इतर";
// //   return gender;
// // }


// // function CardField({ label, value, wrap = false }) {
// //   return (
// //     <>
// //       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
// //       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
// //       <span
// //         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
// //           wrap ? "whitespace-normal break-words" : "truncate"
// //         }`}
// //       >
// //         {value || "\u00A0"}
// //       </span>
// //     </>
// //   );
// // }



// // function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
// //   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

// //   return (
// //     <>
// //       <span className={`mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
// //         <Icon size={8.5} />
// //       </span>
// //       <span
// //         className={`min-w-0 whitespace-nowrap text-[13.1px] leading-[16.5px] text-[#0f172a] ${
// //           strong ? "font-bold" : "font-semibold"
// //         }`}
// //       >
// //         {label}
// //       </span>
// //       <span className={`text-[13.1px] leading-[16.5px] text-[#0f172a] ${strong ? "font-bold" : "font-semibold"}`}>:</span>
     
// //       <span
// //         className={`min-w-0 whitespace-normal break-words text-[14.5px] text-[#0f172a] ${
// //           strong ? "font-bold" : "font-semibold"
// //         } ${
// //           wrap
// //             ? "underline decoration-dotted decoration-1 decoration-[#C9A227] underline-offset-[5px] leading-[22px]"
// //             : "border-b border-dotted border-[#C9A227] pb-[1px] leading-[14px]"
// //         }`}
// //       >
// //         {value || "\u00A0"}
// //       </span>
// //     </>
// //   );
// // }



// // function SectionHeading({ children }) {
// //   return (
// //     <div className="col-span-4 flex items-center gap-2 pt-[2px] first:pt-0">
// //       <span className="whitespace-nowrap text-[8.6px] font-bold uppercase tracking-[0.14em] text-[#0B5D30]">
// //         {children}
// //       </span>
// //       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227] via-[#D9BE68] to-transparent opacity-80" />
// //     </div>
// //   );
// // }


// // /* =========================================================
// //    MAIN COMPONENT
// // ========================================================= */

// // export default function SmartCard() {
// //   const { id: applicationNo } = useParams();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   // two separate faces now — front and back are captured/printed
// //   // as two independent images instead of one tall card.
// //   const frontRef = useRef(null);
// //   const backRef = useRef(null);
// //   const [isExporting, setIsExporting] = useState(false);

// //   /* ==================== API DATA ==================== */

// //   const [vendor, setVendor] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     let cancelled = false;
// //     setLoading(true);
// //     setError("");

// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       if (cancelled) return;
// //       setLoading(false);

// //       if (!result.success) {
// //         setError(result.message || "Vendor not found.");
// //         return;
// //       }

// //       setVendor(result.data);
// //     });

// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [applicationNo]);

  
// //   useEffect(() => {
// //     if (document.getElementById("smartcard-poppins-font")) return;
// //     const link = document.createElement("link");
// //     link.id = "smartcard-poppins-font";
// //     link.rel = "stylesheet";
// //     link.href =
// //       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
// //     document.head.appendChild(link);
// //   }, []);

  
// //   useEffect(() => {
// //     if (document.getElementById("smartcard-selection-style")) return;
// //     const style = document.createElement("style");
// //     style.id = "smartcard-selection-style";
// //     style.textContent = `
// //       .smart-card-front ::selection,
// //       .smart-card-back ::selection {
// //         background-color: rgba(11, 93, 48, 0.12);
// //         color: inherit;
// //       }
// //     `;
// //     document.head.appendChild(style);
// //   }, []);

// //   const certificate = vendor?.certificate;

// //   /* ==================== VERIFICATION URL ==================== */

// //   const verifyUrl = useMemo(() => {
// //     if (certificate?.qrCodeData) return certificate.qrCodeData;
// //     if (!vendor) return "";
// //     return `${window.location.origin}/verify/${vendor.applicationNo}`;
// //   }, [vendor, certificate]);

// //   const cardCode = certificate?.certificateNo || "";

  
// //   const STYLE_PROPS_TO_FLATTEN = [
// //     "backgroundImage",
// //     "backgroundColor",
// //     "backgroundClip",
// //     "WebkitBackgroundClip",
// //     "backgroundPosition",
// //     "backgroundSize",
// //     "backgroundRepeat",
// //     "color",
// //     "borderTopColor",
// //     "borderRightColor",
// //     "borderBottomColor",
// //     "borderLeftColor",
// //     "borderTopWidth",
// //     "borderRightWidth",
// //     "borderBottomWidth",
// //     "borderLeftWidth",
// //     "borderTopLeftRadius",
// //     "borderTopRightRadius",
// //     "borderBottomLeftRadius",
// //     "borderBottomRightRadius",
// //     "borderStyle",
// //     "opacity",
// //     "fill",
// //     "stroke",
// //   ];

 
// //   const flattenComputedStyles = (sourceEl, targetEl) => {
// //     try {
// //       if (!sourceEl || !targetEl || sourceEl.nodeType !== 1 || targetEl.nodeType !== 1) return;

// //       let computed;
// //       try {
// //         computed = window.getComputedStyle(sourceEl);
// //       } catch {
// //         return; // can't read styles for this node — leave it as-is, move on
// //       }

// //       STYLE_PROPS_TO_FLATTEN.forEach((prop) => {
// //         try {
// //           const value = computed[prop];
// //           if (value) targetEl.style[prop] = value;
// //         } catch {
         
// //         }
// //       });

// //       const sourceChildren = sourceEl.children || [];
// //       const targetChildren = targetEl.children || [];
// //       const count = Math.min(sourceChildren.length, targetChildren.length);
// //       for (let i = 0; i < count; i++) {
// //         flattenComputedStyles(sourceChildren[i], targetChildren[i]);
// //       }
// //     } catch {
// //       // absolute last-resort guard — never let this function throw upward
// //     }
// //   };

 
// //   const withTimeout = (promise, ms, label) =>
// //     new Promise((resolve, reject) => {
// //       const timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
// //       promise.then(
// //         (value) => {
// //           clearTimeout(timer);
// //           resolve(value);
// //         },
// //         (err) => {
// //           clearTimeout(timer);
// //           reject(err);
// //         }
// //       );
// //     });

// //   const CARD_WIDTH_MM = 90;
// //   const CARD_HEIGHT_MM = 105;
// //   const PREVIEW_SCALE = 4.3; // px-per-mm, on-screen preview only

// //   const captureFace = async (ref) => {
// //     if (!ref.current) return null;

// //     // Make sure the Devanagari + Latin webfonts are fully loaded before
// //     // rasterizing, so text weight/rendering also matches the screen.
// //     // Capped at 3s so a font that never resolves can't stall export.
// //     if (document.fonts && document.fonts.ready) {
// //       try {
// //         await withTimeout(document.fonts.ready, 3000, "Font load");
// //       } catch {
// //         // proceed with capture regardless — better a slightly-late font
// //         // than a permanently stuck button
// //       }
// //     }

// //     return withTimeout(
// //       html2canvas(ref.current, {
// //         scale: 4, // high-res so print/PDF output stays crisp at this small size
// //         useCORS: true,
// //         allowTaint: true,
// //         backgroundColor: "#ffffff",
// //         foreignObjectRendering: false,
// //         imageTimeout: 0,
// //         logging: false,
// //         onclone: (_clonedDoc, clonedElement) => {
          
// //           flattenComputedStyles(ref.current, clonedElement);
// //         },
// //       }),
// //       15000,
// //       "Card capture"
// //     );
// //   };

// //   const handlePrint = async () => {
// //     if (isExporting) return;
// //     setIsExporting(true);
// //     try {
// //       const [frontCanvas, backCanvas] = await Promise.all([
// //         captureFace(frontRef),
// //         captureFace(backRef),
// //       ]);
// //       if (!frontCanvas || !backCanvas) return;

// //       const frontData = frontCanvas.toDataURL("image/png");
// //       const backData = backCanvas.toDataURL("image/png");

// //       const printWindow = window.open("", "_blank", "width=800,height=1000");
// //       if (!printWindow) {
// //         window.alert("Please allow pop-ups for this site to print the Smart Card.");
// //         return;
// //       }
// //       printWindow.document.write(
// //         "<html><head><title>Smart Card</title><style>" +
// //           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
// //           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
// //           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
// //           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
// //           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
// //           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
// //           ".page:last-child { page-break-after: auto; }" +
// //           "</style></head><body>" +
// //           "<div class=\"page\"><img src=\"" + frontData + "\" /></div>" +
// //           "<div class=\"page\"><img src=\"" + backData + "\" /></div>" +
// //           "</body></html>"
// //       );
// //       printWindow.document.close();
// //       printWindow.onload = () => {
// //         printWindow.focus();
// //         printWindow.print();
// //         printWindow.close();
// //       };
// //     } catch (err) {
// //       console.error("Smart card print failed:", err);
// //       window.alert("Print failed: " + (err && err.message ? err.message : String(err)));
// //     } finally {
// //       setIsExporting(false);
// //     }
// //   };

// //   const handleDownloadPdf = async () => {
// //     if (isExporting) return;
// //     setIsExporting(true);
// //     try {
// //       const [frontCanvas, backCanvas] = await Promise.all([
// //         captureFace(frontRef),
// //         captureFace(backRef),
// //       ]);
// //       if (!frontCanvas || !backCanvas) return;

// //       const frontData = frontCanvas.toDataURL("image/png");
// //       const backData = backCanvas.toDataURL("image/png");

// //       const pdf = new jsPDF({
// //         orientation: "portrait",
// //         unit: "mm",
// //         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
// //       });
// //       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
// //       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
// //       pdf.addImage(backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
// //       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
// //     } catch (err) {
// //       console.error("Smart card download failed:", err);
// //       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
// //     } finally {
// //       setIsExporting(false);
// //     }
// //   };

  

// //   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// //         <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
// //         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
// //         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
// //           Back to Dashboard
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   /* ==================== LOADING ==================== */

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading...
// //       </Card>
// //     );
// //   }

// //   /* ==================== VENDOR NOT FOUND ==================== */

// //   if (error || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
// //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Vendor List
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

// //   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// //         <p className="text-sm font-semibold text-ink-700">
// //           The Smart Card is only available once payment is complete and the certificate has been issued.
// //         </p>
// //         <p className="mt-1 text-xs text-ink-500">
// //           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
// //         </p>
// //         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// //           View Vendor Profile
// //         </Link>
// //       </Card>
// //     );
// //   }

  
// //   const frontFields = [
// //     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
// //     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
// //     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
// //     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
// //     {
// //       icon: FiCalendar,
// //       label: "ओळखपत्र वैधता",
// //       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
// //     },
// //   ];

// //   const personalFields = [
// //     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
// //     {
// //       icon: FiClock,
// //       label: "जन्मतारीख / वय",
// //       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
// //     },
// //     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
// //     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
// //     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
// //   ];

// //   const addressFields = [
// //     // wrap: true -> long addresses flow onto extra lines instead of being cut off
// //     // accent: "gold" gives the business address a warm icon chip so it reads
// //     // as visually distinct from the residential address right below it.
// //     { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
// //     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
// //   ];

// //   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
// //   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

// //   /* ==================== PAGE ==================== */

// //   return (
// //     <div className="space-y-5">
// //       {/* ================= PAGE HEADER ================= */}
// //       <div className="flex flex-wrap items-start justify-between gap-4">
// //         <div>
// //           <p className="text-xs font-semibold text-ink-500">
// //             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
// //               Smart Card
// //             </Link>
// //             {" / "}
// //             {cardCode}
// //           </p>
// //           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
// //         </div>

// //         <div className="flex gap-2">
// //           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf} disabled={isExporting}>
// //             {isExporting ? "Preparing..." : "Download"}
// //           </Button>
// //           <Button icon={FiPrinter} onClick={handlePrint} disabled={isExporting}>
// //             {isExporting ? "Preparing..." : "Print"}
// //           </Button>
// //         </div>
// //       </div>

// //       {/* ================= CARD PREVIEW — front & back, side by side ================= */}
// //       <div className="flex flex-wrap items-start justify-center gap-10 px-1 py-6">

// //         {/* ---------- FRONT ---------- */}
// //         <div className="flex flex-col items-center gap-2">
// //           <p className="text-xs font-semibold text-ink-500">Front</p>
// //           <div
// //             ref={frontRef}
// //             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.25)]"
// //             style={{
// //               width: `${CARD_W_PX}px`,
// //               height: `${CARD_H_PX}px`,
// //               border: "1.5px solid #0B5D30",
// //               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
// //             }}
// //           >

           



// //                         <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
// //               <div
// //                 className="absolute -inset-[3px] rounded-t-[10px]"
// //                 style={{
// //                   backgroundImage: `url(${banner})`,
// //                   backgroundSize: "cover",
// //                   backgroundPosition: "left center",
// //                   backgroundRepeat: "no-repeat",
// //                 }}
// //               />

// //               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
// //                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
// //               </div>

// //               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
// //                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
// //                   वसई-विरार शहर महानगरपालिका
// //                 </p>

// //                 <div className="relative w-full shrink-0 text-center">
// //                   <h2 className="text-[15px] font-bold leading-tight tracking-tight text-[#BB981A]">
// //                     रस्ता विक्रेता ओळखपत्र
// //                   </h2>
// //                 </div>
// //               </div>
// //             </div>

           
// //             <div className="relative z-10 flex flex-1 flex-col items-center gap-2 bg-[#ffffff] px-4 pb-2 pt-2">
// //               <div
// //                 className="pointer-events-none absolute inset-0"
// //                 style={{
// //                   backgroundImage:
// //                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
// //                 }}
// //               />

              

// //               <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
              


// //                                 <div
// //                   className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-[2px]"
// //                   style={{ borderColor: "#F7E4C2" }}
// //                 >
// //                   <div className="h-full w-full overflow-hidden rounded-[4px] bg-[#ffffff]">
// //                     {vendor.documents?.photo ? (
// //                       <img
// //                         src={vendor.documents.photo}
// //                         alt={vendor.personal.fullName}
// //                         className="block h-full w-full object-cover"
// //                       />
// //                     ) : (
// //                       <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
// //                         <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <Link
// //                   to={`/verify/${vendor.applicationNo}`}
// //                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-1.5 transition-transform hover:scale-[1.03]"
// //                   style={{ borderColor: "#F7E4C2" }}
// //                 >
// //                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
// //                 </Link>
// //               </div>

// //               {/* Fields — full-width rows, stacked one per line */}
// //               <div
// //                 className="relative mt-[1px] grid w-full flex-1 content-start gap-y-2.5 gap-x-1.5"
// //                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
// //               >
// //                 {frontFields.map((f) => (
// //                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
// //                 ))}
// //               </div>

// //               {/* ── Signature line, pinned to the bottom (mt-auto). ── */}
// //               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
// //                 <div className="h-px w-[34%] bg-[#94a3b8]" />
// //                 <p className="whitespace-nowrap text-[11px] font-bold uppercase leading-tight tracking-[0.03em] text-[#0B5D30]">
// //                   सहाय्यक आयुक्त
// //                 </p>
// //                 <p className="whitespace-nowrap text-[11px] font-bold leading-tight text-[#0f172a]">(स्वाक्षरी)</p>
// //                 <div className="mt-1 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-80" />
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ---------- BACK ---------- */}
// //         <div className="flex flex-col items-center">
// //           <p className="text-xs font-semibold text-ink-500">Back</p>
// //           <div
// //             ref={backRef}
// //             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_rgba(11,93,48,0.2)]"
// //             style={{
// //               width: `${CARD_W_PX}px`,
// //               height: `${CARD_H_PX}px`,
// //               border: "1.5px solid #0B5D30",
// //               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
// //             }}
// //           >
           



// //                         {/* <div className="relative  flex items-center  min-h-[140px] gap-3 pb-7 pl-2">
// //               <div
// //                 className="absolute -inset-[3px] rounded-t-[10px]"
// //                 style={{
// //                   backgroundImage: `url(${banner})`,
// //                   backgroundSize: "cover",
// //                   backgroundPosition: "left center",
// //                   backgroundRepeat: "no-repeat",
// //                 }}
// //               />

// //               <div className="relative  flex h-2=17 w-17 shrink-0 items-center justify-center rounded-full bg-[#ffffff]  shadow-[0_0_0_1.5px_#C9A227]">
// //                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
// //               </div>

// //               <div className="relative flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
// //                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
// //                   वसई-विरार शहर महानगरपालिका
// //                 </p>
// //               </div>
// //             </div> */}


// //                         <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
// //               <div
// //                 className="absolute -inset-[3px] rounded-t-[10px]"
// //                 style={{
// //                   backgroundImage: `url(${banner})`,
// //                   backgroundSize: "cover",
// //                   backgroundPosition: "left center",
// //                   backgroundRepeat: "no-repeat",
// //                 }}
// //               />

// //               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
// //                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
// //               </div>

// //               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
// //                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
// //                   वसई-विरार शहर महानगरपालिका
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 bg-[#ffffff] px-4 pb-2.5 pt-6">
// //               <div
// //                 className="pointer-events-none absolute inset-0"
// //                 style={{
// //                   backgroundImage:
// //                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
// //                 }}
// //               />

// //               <div
// //                 className="relative grid w-full flex-1 content-start gap-y-[13px] gap-x-1.5"
// //                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
// //               >
// //                 <SectionHeading>Personal Information</SectionHeading>
// //                 {personalFields.map((f) => (
// //                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
// //                 ))}

// //                 <SectionHeading>Address Information</SectionHeading>
// //                 {addressFields.map((f) => (
// //                   <IconCardField
// //                     key={f.label}
// //                     icon={f.icon}
// //                     label={f.label}
// //                     value={f.value}
// //                     wrap={f.wrap}
// //                     accent={f.accent}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ================= VERIFICATION ================= */}
// //       <div className="flex justify-center">
// //         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
// //           Open Verification Screen
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // }



// // import { Fragment, useEffect, useMemo, useRef, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { QRCodeSVG } from "qrcode.react";
// // import html2canvas from "html2canvas-pro";
// // import jsPDF from "jspdf";

// // import {
// //   FiDownload,
// //   FiPrinter,
// //   FiUser,
// //   FiExternalLink,
// //   FiShield,
// //   FiLoader,
// //   FiCreditCard,
// //   FiPhone,
// //   FiFlag,
// //   FiUsers,
// //   FiMapPin,
// //   FiCalendar,
// //   FiClock,
// //   FiBriefcase,
// //   FiHome,
// // } from "react-icons/fi";

// // import Card from "../../../components/ui/Card";
// // import Button from "../../../components/ui/Button";

// // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";
// // // NOTE: point this at the same logo file used in the sidebar
// // // (the round VVCMC emblem). Adjust the path if it lives elsewhere.
// // // import vvcmcLogo from "../../../assets/logo.png";
// // import logo from "../../../assets/logovvcmc.jpg";
// // import banner from "../../../assets/banner1.png";
// // import backbanner from "../../../assets/backbanner.png";

// // // import vvcmccardbg from "../../../assets/vvcmcbgcard2.png";

// // import { fetchVendorApplicationByNo } from "../../../services/vendorApplicationService";
// // import { useAuth } from "../../auth/hooks/useAuth";


// // /* =========================================================
// //    HELPERS
// // ========================================================= */

// // function formatDate(d) {
// //   if (!d) return "-";
// //   const date = new Date(d);
// //   if (Number.isNaN(date.getTime())) return "-";
// //   return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // }

// // function calcAge(dob) {
// //   if (!dob) return "-";
// //   const birth = new Date(dob);
// //   if (Number.isNaN(birth.getTime())) return "-";
// //   const age = Math.floor((Date.now() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
// //   // guard against bad/future dates instead of showing a negative number
// //   return age >= 0 ? age : "-";
// // }

// // function saleType(vendorType) {
// //   if (!vendorType) return "-";
// //   return vendorType.toLowerCase().includes("mobile") ? "फिरता" : "स्थिर";
// // }

// // function genderType(gender) {
// //   if (!gender) return "-";
// //   const value = gender.toLowerCase();
// //   if (value === "male") return "पुरुष";
// //   if (value === "female") return "स्त्री";
// //   if (value === "other") return "इतर";
// //   return gender;
// // }


// // function CardField({ label, value, wrap = false }) {
// //   return (
// //     <>
// //       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">{label}</span>
// //       <span className="text-[9px] font-bold leading-[9px] text-[#1e293b]">:</span>
// //       <span
// //         className={`min-w-0 border-b border-dotted border-[#64748b] pb-[0.5px] text-[9px] font-bold leading-[9px] text-[#1e293b] ${
// //           wrap ? "whitespace-normal break-words" : "truncate"
// //         }`}
// //       >
// //         {value || "\u00A0"}
// //       </span>
// //     </>
// //   );
// // }


// // /* =========================================================
// //    IconCardField — label/value/colon hierarchy refined for
// //    consistent icon weight, muted labels + colon vs. stronger
// //    values, and tabular numerals so dates/numbers align cleanly
// //    down the column. Layout/positions unchanged.
// // ========================================================= */

// // function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
// //   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

// //   return (
// //     <>
// //       <span className={`mt-[2px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${chipClasses}`}>
// //         <Icon size={8.5} strokeWidth={2} />
// //       </span>
// //       <span
// //         className={`min-w-0 whitespace-nowrap text-[12.8px] leading-[16.5px] tracking-[0.005em] text-[#334155] ${
// //           strong ? "font-bold text-[#0f172a]" : "font-semibold"
// //         }`}
// //       >
// //         {label}
// //       </span>
// //       <span className={`text-[12.8px] leading-[16.5px] text-[#94a3b8] ${strong ? "font-bold" : "font-medium"}`}>:</span>

// //       <span
// //         className={`min-w-0 whitespace-normal break-words text-[13.8px] leading-[16.5px] tabular-nums text-[#0f172a] ${
// //           strong ? "font-bold" : "font-semibold"
// //         } ${
// //           wrap
// //             ? "underline decoration-dotted decoration-1 decoration-[#C9A227]/60 underline-offset-[5px] leading-[21px]"
// //             : "border-b border-dotted border-[#C9A227]/55 pb-[1.5px]"
// //         }`}
// //       >
// //         {value || "\u00A0"}
// //       </span>
// //     </>
// //   );
// // }


// // /* =========================================================
// //    SECTION HEADING — used on the back face to group fields into
// //    "PERSONAL INFORMATION" / "ADDRESS INFORMATION". Divider now
// //    fades in more gracefully (lower starting opacity) and tracking
// //    is slightly wider for a more formal, document-like eyebrow.
// // ========================================================= */

// // function SectionHeading({ children }) {
// //   return (
// //     <div className="col-span-4 flex items-center gap-2 pt-[3px] first:pt-0">
// //       <span className="whitespace-nowrap text-[8.4px] font-bold uppercase tracking-[0.16em] text-[#0B5D30]">
// //         {children}
// //       </span>
// //       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/70 via-[#D9BE68]/50 to-transparent" />
// //     </div>
// //   );
// // }


// // /* =========================================================
// //    MAIN COMPONENT
// // ========================================================= */

// // export default function SmartCard() {
// //   const { id: applicationNo } = useParams();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   // two separate faces now — front and back are captured/printed
// //   // as two independent images instead of one tall card.
// //   const frontRef = useRef(null);
// //   const backRef = useRef(null);
// //   const [isExporting, setIsExporting] = useState(false);

// //   /* ==================== API DATA ==================== */

// //   const [vendor, setVendor] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     let cancelled = false;
// //     setLoading(true);
// //     setError("");

// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       if (cancelled) return;
// //       setLoading(false);

// //       if (!result.success) {
// //         setError(result.message || "Vendor not found.");
// //         return;
// //       }

// //       setVendor(result.data);
// //     });

// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [applicationNo]);

  
// //   useEffect(() => {
// //     if (document.getElementById("smartcard-poppins-font")) return;
// //     const link = document.createElement("link");
// //     link.id = "smartcard-poppins-font";
// //     link.rel = "stylesheet";
// //     link.href =
// //       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
// //     document.head.appendChild(link);
// //   }, []);

  
// //   useEffect(() => {
// //     if (document.getElementById("smartcard-selection-style")) return;
// //     const style = document.createElement("style");
// //     style.id = "smartcard-selection-style";
// //     style.textContent = `
// //       .smart-card-front ::selection,
// //       .smart-card-back ::selection {
// //         background-color: rgba(11, 93, 48, 0.12);
// //         color: inherit;
// //       }
// //     `;
// //     document.head.appendChild(style);
// //   }, []);

// //   const certificate = vendor?.certificate;

// //   /* ==================== VERIFICATION URL ==================== */

// //   const verifyUrl = useMemo(() => {
// //     if (certificate?.qrCodeData) return certificate.qrCodeData;
// //     if (!vendor) return "";
// //     return `${window.location.origin}/verify/${vendor.applicationNo}`;
// //   }, [vendor, certificate]);

// //   const cardCode = certificate?.certificateNo || "";

  
// //   const STYLE_PROPS_TO_FLATTEN = [
// //     "backgroundImage",
// //     "backgroundColor",
// //     "backgroundClip",
// //     "WebkitBackgroundClip",
// //     "backgroundPosition",
// //     "backgroundSize",
// //     "backgroundRepeat",
// //     "color",
// //     "borderTopColor",
// //     "borderRightColor",
// //     "borderBottomColor",
// //     "borderLeftColor",
// //     "borderTopWidth",
// //     "borderRightWidth",
// //     "borderBottomWidth",
// //     "borderLeftWidth",
// //     "borderTopLeftRadius",
// //     "borderTopRightRadius",
// //     "borderBottomLeftRadius",
// //     "borderBottomRightRadius",
// //     "borderStyle",
// //     "opacity",
// //     "fill",
// //     "stroke",
// //   ];

 
// //   const flattenComputedStyles = (sourceEl, targetEl) => {
// //     try {
// //       if (!sourceEl || !targetEl || sourceEl.nodeType !== 1 || targetEl.nodeType !== 1) return;

// //       let computed;
// //       try {
// //         computed = window.getComputedStyle(sourceEl);
// //       } catch {
// //         return; // can't read styles for this node — leave it as-is, move on
// //       }

// //       STYLE_PROPS_TO_FLATTEN.forEach((prop) => {
// //         try {
// //           const value = computed[prop];
// //           if (value) targetEl.style[prop] = value;
// //         } catch {
         
// //         }
// //       });

// //       const sourceChildren = sourceEl.children || [];
// //       const targetChildren = targetEl.children || [];
// //       const count = Math.min(sourceChildren.length, targetChildren.length);
// //       for (let i = 0; i < count; i++) {
// //         flattenComputedStyles(sourceChildren[i], targetChildren[i]);
// //       }
// //     } catch {
// //       // absolute last-resort guard — never let this function throw upward
// //     }
// //   };

 
// //   const withTimeout = (promise, ms, label) =>
// //     new Promise((resolve, reject) => {
// //       const timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
// //       promise.then(
// //         (value) => {
// //           clearTimeout(timer);
// //           resolve(value);
// //         },
// //         (err) => {
// //           clearTimeout(timer);
// //           reject(err);
// //         }
// //       );
// //     });

// //   const CARD_WIDTH_MM = 90;
// //   const CARD_HEIGHT_MM = 105;
// //   const PREVIEW_SCALE = 4.3; // px-per-mm, on-screen preview only

// //   const captureFace = async (ref) => {
// //     if (!ref.current) return null;

// //     // Make sure the Devanagari + Latin webfonts are fully loaded before
// //     // rasterizing, so text weight/rendering also matches the screen.
// //     // Capped at 3s so a font that never resolves can't stall export.
// //     if (document.fonts && document.fonts.ready) {
// //       try {
// //         await withTimeout(document.fonts.ready, 3000, "Font load");
// //       } catch {
// //         // proceed with capture regardless — better a slightly-late font
// //         // than a permanently stuck button
// //       }
// //     }

// //     return withTimeout(
// //       html2canvas(ref.current, {
// //         scale: 4, // high-res so print/PDF output stays crisp at this small size
// //         useCORS: true,
// //         allowTaint: true,
// //         backgroundColor: "#ffffff",
// //         foreignObjectRendering: false,
// //         imageTimeout: 0,
// //         logging: false,
// //         onclone: (_clonedDoc, clonedElement) => {
          
// //           flattenComputedStyles(ref.current, clonedElement);
// //         },
// //       }),
// //       15000,
// //       "Card capture"
// //     );
// //   };

// //   const handlePrint = async () => {
// //     if (isExporting) return;
// //     setIsExporting(true);
// //     try {
// //       const [frontCanvas, backCanvas] = await Promise.all([
// //         captureFace(frontRef),
// //         captureFace(backRef),
// //       ]);
// //       if (!frontCanvas || !backCanvas) return;

// //       const frontData = frontCanvas.toDataURL("image/png");
// //       const backData = backCanvas.toDataURL("image/png");

// //       const printWindow = window.open("", "_blank", "width=800,height=1000");
// //       if (!printWindow) {
// //         window.alert("Please allow pop-ups for this site to print the Smart Card.");
// //         return;
// //       }
// //       printWindow.document.write(
// //         "<html><head><title>Smart Card</title><style>" +
// //           "@page { size: " + CARD_WIDTH_MM + "mm " + CARD_HEIGHT_MM + "mm; margin: 0 !important; }" +
// //           "* { margin: 0; padding: 0; box-sizing: border-box; }" +
// //           "html, body { margin: 0; padding: 0; background: #ffffff; width: " + CARD_WIDTH_MM + "mm; }" +
// //           "body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }" +
// //           "img { display: block; width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; object-fit: contain; }" +
// //           ".page { width: " + CARD_WIDTH_MM + "mm; height: " + CARD_HEIGHT_MM + "mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }" +
// //           ".page:last-child { page-break-after: auto; }" +
// //           "</style></head><body>" +
// //           "<div class=\"page\"><img src=\"" + frontData + "\" /></div>" +
// //           "<div class=\"page\"><img src=\"" + backData + "\" /></div>" +
// //           "</body></html>"
// //       );
// //       printWindow.document.close();
// //       printWindow.onload = () => {
// //         printWindow.focus();
// //         printWindow.print();
// //         printWindow.close();
// //       };
// //     } catch (err) {
// //       console.error("Smart card print failed:", err);
// //       window.alert("Print failed: " + (err && err.message ? err.message : String(err)));
// //     } finally {
// //       setIsExporting(false);
// //     }
// //   };

// //   const handleDownloadPdf = async () => {
// //     if (isExporting) return;
// //     setIsExporting(true);
// //     try {
// //       const [frontCanvas, backCanvas] = await Promise.all([
// //         captureFace(frontRef),
// //         captureFace(backRef),
// //       ]);
// //       if (!frontCanvas || !backCanvas) return;

// //       const frontData = frontCanvas.toDataURL("image/png");
// //       const backData = backCanvas.toDataURL("image/png");

// //       const pdf = new jsPDF({
// //         orientation: "portrait",
// //         unit: "mm",
// //         format: [CARD_WIDTH_MM, CARD_HEIGHT_MM],
// //       });
// //       pdf.addImage(frontData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
// //       pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], "portrait");
// //       pdf.addImage(backData, "PNG", 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
// //       pdf.save(`SmartCard-${vendor?.applicationNo || cardCode}.pdf`);
// //     } catch (err) {
// //       console.error("Smart card download failed:", err);
// //       window.alert("Download failed: " + (err && err.message ? err.message : String(err)));
// //     } finally {
// //       setIsExporting(false);
// //     }
// //   };

  

// //   if (user?.role !== "A.M.C." && user?.role !== "super_admin") {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// //         <p className="text-sm font-semibold text-ink-700">You're not authorized to view the Smart Card.</p>
// //         <p className="mt-1 text-xs text-ink-500">Only the A.M.C. can generate and view Smart Cards right now.</p>
// //         <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand-600">
// //           Back to Dashboard
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   /* ==================== LOADING ==================== */

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading...
// //       </Card>
// //     );
// //   }

// //   /* ==================== VENDOR NOT FOUND ==================== */

// //   if (error || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">{error || "Vendor not found."}</p>
// //         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Vendor List
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   /* ==================== CERTIFICATE NOT YET ISSUED ==================== */

// //   if (vendor.status !== "Certificate Issued" || !certificate?.certificateNo) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiShield className="mx-auto mb-3 text-ink-300" size={32} />
// //         <p className="text-sm font-semibold text-ink-700">
// //           The Smart Card is only available once payment is complete and the certificate has been issued.
// //         </p>
// //         <p className="mt-1 text-xs text-ink-500">
// //           Current status: <span className="ml-1 font-semibold">{vendor.status}</span>
// //         </p>
// //         <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
// //           View Vendor Profile
// //         </Link>
// //       </Card>
// //     );
// //   }

  
// //   const frontFields = [
// //     { icon: FiUser, label: "विक्रेत्याचे नाव", value: vendor.personal.fullName, strong: true },
// //     { icon: FiUsers, label: "लिंग", value: genderType(vendor.personal.gender) },
// //     { icon: FiPhone, label: "मोबाईल क्रमांक", value: vendor.personal.mobile },
// //     { icon: FiFlag, label: "प्रभाग / ward", value: vendor.address.ward },
// //     {
// //       icon: FiCalendar,
// //       label: "ओळखपत्र वैधता",
// //       value: `${formatDate(certificate.issueDate)} - ${formatDate(certificate.validTill)}`,
// //     },
// //   ];

// //   const personalFields = [
// //     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
// //     {
// //       icon: FiClock,
// //       label: "जन्मतारीख / वय",
// //       value: `${formatDate(vendor.personal.dob)} / ${calcAge(vendor.personal.dob)} वर्षे`,
// //     },
// //     { icon: FiBriefcase, label: "व्यवसायाचा प्रकार", value: vendor.business.businessType },
// //     { icon: FiMapPin, label: "विक्रीचे ठिकाण", value: vendor.business.businessPlace },
// //     { icon: FiClock, label: "व्यवसायाची वेळ", value: vendor.business.businessTiming },
// //   ];

// //   const addressFields = [
// //     // wrap: true -> long addresses flow onto extra lines instead of being cut off
// //     // accent: "gold" gives the business address a warm icon chip so it reads
// //     // as visually distinct from the residential address right below it.
// //     { icon: FiMapPin, label: "व्यवसायाचा पत्ता", value: vendor.address.workingAddress, wrap: true, accent: "gold" },
// //     { icon: FiHome, label: "निवासी पत्ता", value: vendor.address.permanentAddress, wrap: true },
// //   ];

// //   const CARD_W_PX = CARD_WIDTH_MM * PREVIEW_SCALE;
// //   const CARD_H_PX = CARD_HEIGHT_MM * PREVIEW_SCALE;

// //   /* ==================== PAGE ==================== */

// //   return (
// //     <div className="space-y-5">
// //       {/* ================= PAGE HEADER ================= */}
// //       <div className="flex flex-wrap items-start justify-between gap-4">
// //         <div>
// //           <p className="text-xs font-semibold text-ink-500">
// //             <Link to="/vendors/list" className="text-brand-600 hover:text-brand-700">
// //               Smart Card
// //             </Link>
// //             {" / "}
// //             {cardCode}
// //           </p>
// //           <h1 className="mt-1 font-display text-2xl font-bold text-ink-900">पथविक्रेता ओळखपत्र</h1>
// //         </div>

// //         <div className="flex gap-2">
// //           <Button variant="outline" icon={FiDownload} onClick={handleDownloadPdf} disabled={isExporting}>
// //             {isExporting ? "Preparing..." : "Download"}
// //           </Button>
// //           <Button icon={FiPrinter} onClick={handlePrint} disabled={isExporting}>
// //             {isExporting ? "Preparing..." : "Print"}
// //           </Button>
// //         </div>
// //       </div>

// //       {/* ================= CARD PREVIEW — front & back, side by side ================= */}
// //       <div className="flex flex-wrap items-start justify-center gap-10 px-1 py-6">

// //         {/* ---------- FRONT ---------- */}
// //         <div className="flex flex-col items-center gap-2">
// //           <p className="text-xs font-semibold text-ink-500">Front</p>
// //           <div
// //             ref={frontRef}
// //             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
// //             style={{
// //               width: `${CARD_W_PX}px`,
// //               height: `${CARD_H_PX}px`,
// //               border: "1.5px solid #0B5D30",
// //               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
// //             }}
// //           >

           



// //                         <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
// //               <div
// //                 className="absolute -inset-[3px] rounded-t-[10px]"
// //                 style={{
// //                   backgroundImage: `url(${banner})`,
// //                   backgroundSize: "cover",
// //                   backgroundPosition: "left center",
// //                   backgroundRepeat: "no-repeat",
// //                 }}
// //               />

// //               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
// //                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
// //               </div>

// //               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
// //                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
// //                   वसई-विरार शहर महानगरपालिका
// //                 </p>

// //                 <div className="relative w-full shrink-0 text-center">
// //                   <h2 className="text-[15px] font-bold leading-tight tracking-tight text-[#BB981A]">
// //                     रस्ता विक्रेता ओळखपत्र
// //                   </h2>
// //                 </div>
// //               </div>
// //             </div>

           
// //             <div className="relative z-10 flex flex-1 flex-col items-center gap-2 bg-[#ffffff] px-4 pb-2 pt-2">
// //               <div
// //                 className="pointer-events-none absolute inset-0"
// //                 style={{
// //                   backgroundImage:
// //                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
// //                 }}
// //               />

              

// //               <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
              


// //                                 <div
// //                   className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-[2px]"
// //                   style={{ borderColor: "#F7E4C2" }}
// //                 >
// //                   <div className="h-full w-full overflow-hidden rounded-[4px] bg-[#ffffff]">
// //                     {vendor.documents?.photo ? (
// //                       <img
// //                         src={vendor.documents.photo}
// //                         alt={vendor.personal.fullName}
// //                         className="block h-full w-full object-cover"
// //                       />
// //                     ) : (
// //                       <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
// //                         <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <Link
// //                   to={`/verify/${vendor.applicationNo}`}
// //                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-1.5 transition-transform hover:scale-[1.03]"
// //                   style={{ borderColor: "#F7E4C2" }}
// //                 >
// //                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
// //                 </Link>
// //               </div>

// //               {/* Fields — full-width rows, stacked one per line */}
// //               <div
// //                 className="relative mt-[1px] grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
// //                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
// //               >
// //                 {frontFields.map((f) => (
// //                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
// //                 ))}
// //               </div>

// //               {/* ── Signature line, pinned to the bottom (mt-auto). ── */}
// //               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
// //                 <div className="h-px w-[34%] bg-[#cbd5e1]" />
// //                 <p className="whitespace-nowrap text-[10.5px] font-bold uppercase leading-tight tracking-[0.05em] text-[#0B5D30]">
// //                   सहाय्यक आयुक्त
// //                 </p>
// //                 <p className="whitespace-nowrap text-[10.5px] font-semibold leading-tight text-[#475569]">(स्वाक्षरी)</p>
// //                 <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent" />
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ---------- BACK ---------- */}
// //         {/* <div className="flex flex-col items-center">
// //           <p className="text-xs font-semibold text-ink-500">Back</p>
// //           <div
// //             ref={backRef}
// //             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
// //             style={{
// //               width: `${CARD_W_PX}px`,
// //               height: `${CARD_H_PX}px`,
// //               border: "1.5px solid #0B5D30",
// //               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
// //             }}
// //           >
           



// //                         <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
// //               <div
// //                 className="absolute -inset-[3px] rounded-t-[10px]"
// //                 style={{
// //                   backgroundImage: `url(${banner})`,
// //                   backgroundSize: "cover",
// //                   backgroundPosition: "left center",
// //                   backgroundRepeat: "no-repeat",
// //                 }}
// //               />

// //               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
// //                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
// //               </div>

// //               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
// //                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
// //                   वसई-विरार शहर महानगरपालिका
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 bg-[#ffffff] px-4 pb-2.5 pt-6">
// //               <div
// //                 className="pointer-events-none absolute inset-0"
// //                 style={{
// //                   backgroundImage:
// //                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
// //                 }}
// //               />

// //               <div
// //                 className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
// //                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
// //               >
// //                 <SectionHeading>Personal Information</SectionHeading>
// //                 {personalFields.map((f) => (
// //                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
// //                 ))}

// //                 <SectionHeading>Address Information</SectionHeading>
// //                 {addressFields.map((f) => (
// //                   <IconCardField
// //                     key={f.label}
// //                     icon={f.icon}
// //                     label={f.label}
// //                     value={f.value}
// //                     wrap={f.wrap}
// //                     accent={f.accent}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div> */}


// //                 <div className="flex flex-col items-center">
// //           <p className="text-xs font-semibold text-ink-500">Back</p>
// //           <div
// //             ref={backRef}
// //             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
// //             style={{
// //               width: `${CARD_W_PX}px`,
// //               height: `${CARD_H_PX}px`,
// //               border: "1.5px solid #0B5D30",
// //               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
// //               backgroundImage: `url(${backbanner})`,
// //               backgroundSize: "cover",
// //               backgroundPosition: "center",
// //               backgroundRepeat: "no-repeat",
// //             }}
// //           >
// //             <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
// //               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
// //                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
// //               </div>

// //               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
// //                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
// //                   वसई-विरार शहर महानगरपालिका
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
// //               <div
// //                 className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
// //                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
// //               >
// //                 <SectionHeading>Personal Information</SectionHeading>
// //                 {personalFields.map((f) => (
// //                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} />
// //                 ))}

// //                 <SectionHeading>Address Information</SectionHeading>
// //                 {addressFields.map((f) => (
// //                   <IconCardField
// //                     key={f.label}
// //                     icon={f.icon}
// //                     label={f.label}
// //                     value={f.value}
// //                     wrap={f.wrap}
// //                     accent={f.accent}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ================= VERIFICATION ================= */}
// //       <div className="flex justify-center">
// //         <Button variant="ghost" icon={FiExternalLink} onClick={() => navigate(`/verify/${vendor.applicationNo}`)}>
// //           Open Verification Screen
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // }




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
// import backbanner from "../../../assets/backbanner.png";

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
//    IconCardField — label/value/colon hierarchy refined for
//    consistent icon weight, muted labels + colon vs. stronger
//    values, and tabular numerals so dates/numbers align cleanly
//    down the column. Layout/positions unchanged.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

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


// /* =========================================================
//    SECTION HEADING — used on the back face to group fields into
//    "PERSONAL INFORMATION" / "ADDRESS INFORMATION". Divider now
//    fades in more gracefully (lower starting opacity) and tracking
//    is slightly wider for a more formal, document-like eyebrow.
// ========================================================= */

// function SectionHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[3px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.4px] font-bold uppercase tracking-[0.16em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/70 via-[#D9BE68]/50 to-transparent" />
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

  
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

  
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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//               backgroundImage: `url(${backbanner})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//             }}
//           >

           



//                         <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
//               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>

//                 <div className="relative w-full shrink-0 text-center">
//                   <h2 className="text-[15px] font-bold leading-tight tracking-tight text-[#BB981A]">
//                     रस्ता विक्रेता ओळखपत्र
//                   </h2>
//                 </div>
//               </div>
//             </div>

           
//             <div className="relative z-10 flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
              

//               <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
              


//                                 <div
//                   className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-[2px]"
//                   style={{ borderColor: "#F7E4C2" }}
//                 >
//                   <div className="h-full w-full overflow-hidden rounded-[4px] bg-[#ffffff]">
//                     {vendor.documents?.photo ? (
//                       <img
//                         src={vendor.documents.photo}
//                         alt={vendor.personal.fullName}
//                         className="block h-full w-full object-cover"
//                       />
//                     ) : (
//                       <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                         <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-1.5 transition-transform hover:scale-[1.03]"
//                   style={{ borderColor: "#F7E4C2" }}
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative mt-[1px] grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto). ── */}
//               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
//                 <div className="h-px w-[34%] bg-[#cbd5e1]" />
//                 <p className="whitespace-nowrap text-[10.5px] font-bold uppercase leading-tight tracking-[0.05em] text-[#0B5D30]">
//                   सहाय्यक आयुक्त
//                 </p>
//                 <p className="whitespace-nowrap text-[10.5px] font-semibold leading-tight text-[#475569]">(स्वाक्षरी)</p>
//                 <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         {/* <div className="flex flex-col items-center">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//             }}
//           >
           



//                         <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
//               <div
//                 className="absolute -inset-[3px] rounded-t-[10px]"
//                 style={{
//                   backgroundImage: `url(${banner})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "left center",
//                   backgroundRepeat: "no-repeat",
//                 }}
//               />

//               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 bg-[#ffffff] px-4 pb-2.5 pt-6">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg, rgba(11,93,48,0.05) 0px, rgba(11,93,48,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 12px)",
//                 }}
//               />

//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
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
//         </div> */}


//                 <div className="flex flex-col items-center">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               border: "1.5px solid #0B5D30",
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//               backgroundImage: `url(${backbanner})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//             }}
//           >
//             <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-5 pb-7 min-h-[120px]">
//               <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]">
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
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
// import backbanner from "../../../assets/backbanner.png";

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
//    IconCardField — label/value/colon hierarchy refined for
//    consistent icon weight, muted labels + colon vs. stronger
//    values, and tabular numerals so dates/numbers align cleanly
//    down the column. Layout/positions unchanged.
// ========================================================= */

// function IconCardField({ icon: Icon, label, value, wrap = false, accent = "green", strong = false }) {
//   const chipClasses = accent === "gold" ? "bg-[#F6EED8] text-[#9A7418]" : "bg-[#E7EFEA] text-[#0B5D30]";

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


// /* =========================================================
//    SECTION HEADING — used on the back face to group fields into
//    "PERSONAL INFORMATION" / "ADDRESS INFORMATION". Divider now
//    fades in more gracefully (lower starting opacity) and tracking
//    is slightly wider for a more formal, document-like eyebrow.
// ========================================================= */

// function SectionHeading({ children }) {
//   return (
//     <div className="col-span-4 flex items-center gap-2 pt-[3px] first:pt-0">
//       <span className="whitespace-nowrap text-[8.4px] font-bold uppercase tracking-[0.16em] text-[#0B5D30]">
//         {children}
//       </span>
//       <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/70 via-[#D9BE68]/50 to-transparent" />
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

  
//   useEffect(() => {
//     if (document.getElementById("smartcard-poppins-font")) return;
//     const link = document.createElement("link");
//     link.id = "smartcard-poppins-font";
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap";
//     document.head.appendChild(link);
//   }, []);

  
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
//             className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//               backgroundImage: `url(${backbanner})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//             }}
//           >

           



//                         <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-7 min-h-[120px]">
//               <div
//                 className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
//                 style={{ marginTop: "-18px" }}
//               >
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff]">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>

//                 <div className="relative w-full shrink-0 text-center">
//                   <h2 className="text-[15px] font-bold leading-tight tracking-tight text-[#BB981A]">
//                     रस्ता विक्रेता ओळखपत्र
//                   </h2>
//                 </div>
//               </div>
//             </div>

           
//             <div className="relative z-10 flex flex-1 flex-col items-center gap-2 px-4 pb-2 pt-2">
              

//               <div className="mt-[1.5px] mb-[0.5px] flex shrink-0 items-center justify-center gap-3">
              


//                                 <div
//                   className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-[2px]"
//                   style={{ borderColor: "#F7E4C2" }}
//                 >
//                   <div className="h-full w-full overflow-hidden rounded-[4px] bg-[#ffffff]">
//                     {vendor.documents?.photo ? (
//                       <img
//                         src={vendor.documents.photo}
//                         alt={vendor.personal.fullName}
//                         className="block h-full w-full object-cover"
//                       />
//                     ) : (
//                       <div className="flex h-full w-full items-center justify-center bg-[#f8fafc]">
//                         <FiUser size={34} strokeWidth={1.2} className="text-[#cbd5e1]" />
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <Link
//                   to={`/verify/${vendor.applicationNo}`}
//                   className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border-2 bg-[#ffffff] p-1.5 transition-transform hover:scale-[1.03]"
//                   style={{ borderColor: "#F7E4C2" }}
//                 >
//                   <QRCodeSVG value={verifyUrl} size={84} level="M" bgColor="#FFFFFF" fgColor="#111111" className="h-full w-full" />
//                 </Link>
//               </div>

//               {/* Fields — full-width rows, stacked one per line */}
//               <div
//                 className="relative mt-[1px] grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
//                 style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
//               >
//                 {frontFields.map((f) => (
//                   <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
//                 ))}
//               </div>

//               {/* ── Signature line, pinned to the bottom (mt-auto). ── */}
//               <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
//                 <div className="h-px w-[34%] bg-[#cbd5e1]" />
//                 <p className="whitespace-nowrap text-[10.5px] font-bold uppercase leading-tight tracking-[0.05em] text-[#0B5D30]">
//                   सहाय्यक आयुक्त
//                 </p>
//                 <p className="whitespace-nowrap text-[10.5px] font-semibold leading-tight text-[#475569]">(स्वाक्षरी)</p>
//                 <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div className="flex flex-col items-center">
//           <p className="text-xs font-semibold text-ink-500">Back</p>
//           <div
//             ref={backRef}
//             className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
//             style={{
//               width: `${CARD_W_PX}px`,
//               height: `${CARD_H_PX}px`,
//               fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
//               backgroundImage: `url(${backbanner})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//             }}
//           >
//             <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-7 min-h-[120px]">
//               <div
//                 className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffffff] p-[3px] shadow-[0_0_0_1.5px_#C9A227]"
//                 style={{ marginTop: "-18px" }}
//               >
//                 <img src={logo} alt="VVCMC" className="h-full w-full rounded-full object-contain" />
//               </div>

//               <div className="relative z-10 flex min-w-0 flex-col justify-center gap-[10px] leading-tight">
//                 <p className="whitespace-nowrap text-[16px] font-semibold leading-[14px] text-[#ffffff] pb-3">
//                   वसई-विरार शहर महानगरपालिका
//                 </p>
//               </div>
//             </div>

//             <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
//               <div
//                 className="relative grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
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
import backbanner from "../../../assets/backbanner.png";

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
   IconCardField — label/value/colon hierarchy refined for
   consistent icon weight, muted labels + colon vs. stronger
   values, and tabular numerals so dates/numbers align cleanly
   down the column. Layout/positions unchanged.
========================================================= */

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


/* =========================================================
   SECTION HEADING — used on the back face to group fields into
   "PERSONAL INFORMATION" / "ADDRESS INFORMATION". Divider now
   fades in more gracefully (lower starting opacity) and tracking
   is slightly wider for a more formal, document-like eyebrow.
========================================================= */

function SectionHeading({ children }) {
  return (
    <div className="col-span-4 flex items-center gap-2 pt-[3px] first:pt-0">
      <span className="whitespace-nowrap text-[8.4px] font-bold uppercase tracking-[0.16em] text-[#0B5D30]">
        {children}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/70 via-[#D9BE68]/50 to-transparent" />
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

  const certificate = vendor?.certificate;

  /* ==================== VERIFICATION URL ==================== */

  const verifyUrl = useMemo(() => {
    if (certificate?.qrCodeData) return certificate.qrCodeData;
    if (!vendor) return "";
    return `${window.location.origin}/verify/${vendor.applicationNo}`;
  }, [vendor, certificate]);

  const cardCode = certificate?.certificateNo || "";

  
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

  
  const frontFields = [
     { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
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
    // { icon: FiCreditCard, label: "ओळखपत्र क्रमांक", value: certificate.certificateNo },
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
            className="smart-card-front relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
            style={{
              width: `${CARD_W_PX}px`,
              height: `${CARD_H_PX}px`,
              fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
              backgroundImage: `url(${backbanner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >

           



                        {/* <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-7 min-h-[120px]"> */}
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
                        alt={vendor.personal.fullName}
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

              {/* Fields — full-width rows, stacked one per line */}
              <div
                className="relative mt-[1px] grid w-full flex-1 content-start gap-y-[11px] gap-x-1.5"
                style={{ gridTemplateColumns: "max-content max-content max-content 1fr" }}
              >
                {frontFields.map((f) => (
                  <IconCardField key={f.label} icon={f.icon} label={f.label} value={f.value} strong={f.strong} />
                ))}
              </div>

              {/* ── Signature line, pinned to the bottom (mt-auto). ── */}
              <div className="relative mt-auto flex w-full shrink-0 flex-col items-center gap-[3px] pb-[2px] pt-1">
                <div className="h-px w-[34%] bg-[#cbd5e1]" />
                <p className="whitespace-nowrap text-[10.5px] font-bold uppercase leading-tight tracking-[0.05em] text-[#0B5D30]">
                  सहाय्यक आयुक्त
                </p>
                {/* <p className="whitespace-nowrap text-[10.5px] font-semibold leading-tight text-[#475569]">(स्वाक्षरी)</p> */}
               <p className="whitespace-nowrap text-[10.5px] font-semibold leading-tight text-[#475569]">(प्रभाग समिती)</p>

               
                <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* ---------- BACK ---------- */}
        <div className="flex flex-col items-center">
          <p className="text-xs font-semibold text-ink-500">Back</p>
          <div
            ref={backRef}
            className="smart-card-back relative flex flex-col overflow-hidden rounded-[10px] shadow-[0_3px_12px_rgba(11,93,48,0.18)]"
            style={{
              width: `${CARD_W_PX}px`,
              height: `${CARD_H_PX}px`,
              fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
              backgroundImage: `url(${backbanner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* <div className="relative z-20 flex shrink-0 items-center gap-3 overflow-hidden pl-4 pr-3.5 pt-2 pb-7 min-h-[120px]"> */}
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

            <div className="relative z-10 flex flex-1 flex-col items-center gap-2.5 px-4 pb-2.5 pt-6">
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