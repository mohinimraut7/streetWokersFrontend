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
     { icon: FiUser, mr: "विक्रेत्याचे नाव", en: "Vendor Name", value: vendor.personal?.fullName || "-" },
    { icon: FiUser, mr: "लिंग", en: "Gender", value: genderLabel(vendor.personal?.gender) },
    { icon: FiPhone, mr: "मोबाईल क्रमांक", en: "Mobile No.", value: vendor.personal?.mobile || "-" },
    { icon: FiCalendar, mr: "जन्मतारीख / वय", en: "Date of Birth / Age", value: dobWithAge(vendor.personal?.dob) },
    { icon: FiShoppingBag, mr: "व्यवसायाचा प्रकार", en: "Business Type", value: vendor.business?.businessType || "-" },
    // { icon: FiMapPin, mr: "व्यवसायाचे ठिकाण", en: "Business Place", value: vendor.business?.businessPlace || "-" },
    { icon: FiClock, mr: "व्यवसायाची वेळ", en: "Business Timing", value: vendor.business?.businessTiming || "-" },

//  {  icon: FiMap, mr: "प्रभाग", en: "Ward", value: `${vendor.address?.ward || vendor.ward || "-"} `},

//     {
//       icon: FiMap,
//       mr: "प्रभाग / ward",
//       en: "Ward / Zone",
//       value: `${vendor.address?.ward || vendor.ward || "-"} `,
//     },

    { icon: FiMap, mr: "प्रभाग", en: "Ward", value: vendor.address?.ward || vendor.ward || "-" },
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
       "Vendor Name",
      "Certificate No.",
      "Gender",
      "Mobile No.",
      "Date of Birth / Age",
      // "Business Address",
    ]);
    const rightRows = pick([
      "Business Type",
      "Business Place",
      "Business Timing",
      // "Ward / Zone",
       "Ward",
      "Issue Date",
      "Valid Till",
      "Status",
      // "Residential Address",
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
              {/* <div className="self-end">
                {rightRows.slice(0, 2).map((r) => (
                  <DetailRow key={r.en} icon={r.icon} mr={r.mr} en={r.en} value={r.value} wide />
                ))}
              </div> */}

                            {/* row 1 — RIGHT: first detail only, bottom-aligned with the divider under the photo */}
              {/* <div className="self-end">
                {rightRows.slice(0, 1).map((r) => (
                  <DetailRow key={r.en} icon={r.icon} mr={r.mr} en={r.en} value={r.value} wide />
                ))}
              </div> */}



                            <div /> 

              {/* remaining rows: one left + one right per grid row → always the same height / line */}
              {/* {Array.from({ length: Math.max(leftRows.length, rightRows.length - 2) }).flatMap((_, i) => {
                const l = leftRows[i];
                const r = rightRows[i + 2]; */}
              {/* {Array.from({ length: Math.max(leftRows.length, rightRows.length - 1) }).flatMap((_, i) => {
                const l = leftRows[i];
                const r = rightRows[i + 1]; */}


              {/* {Array.from({ length: Math.max(leftRows.length, rightRows.length - 1) }).flatMap((_, i) => {
                // right column is bottom-aligned with the left column, so the last rows always line up
                const offset = Math.max(0, leftRows.length - (rightRows.length - 1));
                const l = leftRows[i];
                const r = i >= offset ? rightRows[i - offset + 1] : null; */}


                              {Array.from({ length: Math.max(leftRows.length, rightRows.length) }).flatMap((_, i) => {
                const l = leftRows[i];
                const r = rightRows[i];



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

              {/* last row: Business Address (left) and Residential Address (right) side by side */}
              {byLabel["Business Address"] && (
                <DetailRow
                  icon={byLabel["Business Address"].icon}
                  mr={byLabel["Business Address"].mr}
                  en={byLabel["Business Address"].en}
                  value={byLabel["Business Address"].value}
                  wide
                />
              )}
              {byLabel["Residential Address"] && (
                <DetailRow
                  icon={byLabel["Residential Address"].icon}
                  mr={byLabel["Residential Address"].mr}
                  en={byLabel["Residential Address"].en}
                  value={byLabel["Residential Address"].value}
                  wide
                />
              )}
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