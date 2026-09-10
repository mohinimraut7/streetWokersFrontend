import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUserPlus,
  FiFilePlus,
  FiCalendar,
  FiCreditCard,
  FiAward,
  FiBarChart2,
  FiShield,
  FiMapPin,
  FiUsers,
  FiClock,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Avatar from "../../../components/ui/Avatar";
import StatusChip from "../../../components/ui/StatusChip";
import { useAuth } from "../../auth/hooks/useAuth";
import { fetchVendorApplications } from "../../../services/vendorApplicationService";
import { ZONE_OPTIONS, WARD_OPTIONS } from "../../../lib/options";
import vendorgadi from '../../../assets/vendorgadi.png';

function timeAgo(dateStr) {
  if (!dateStr) return "-";
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

// ── Backend's real workflow status → the simpler display buckets used across the app ──
// (same bucketing as VendorList.jsx, so the numbers stay consistent across pages)
const STATUS_DISPLAY_MAP = {
  Draft: "Draft",
  Submitted: "Pending Survey",
  "Sent Back to Vendor": "Sent Back",
  "Forwarded to Survey Officer": "Under Survey",
  "Sent Back to Counter Officer": "Sent Back",
  "Survey Approved": "Under Survey",
  "Forwarded to A.M.C.": "Pending Approval",
  "A.M.C. Approved": "Approved",
  Rejected: "Rejected",
  "Payment Pending": "Approved",
  "Payment Done": "Approved",
  "Certificate Issued": "Approved",
};
const displayStatus = (backendStatus) => STATUS_DISPLAY_MAP[backendStatus] || backendStatus;

// ── Static placeholder numbers shown right after the brief spinner, while the real
// dashboard data is still being fetched in the background. As soon as the fetch
// completes, the KPI/footer numbers animate (count up/down) from these placeholders
// to the real values via <AnimatedNumber />, and Recent Applications swaps to real rows. ──
const STATIC_STATS = {
  totalApplications: 1441,
  approved: 1,
  rejected: 0,
  pending: 1,
  paymentsToday: 0,
  smartCardsDisbursed: 0,
};
const STATIC_ZONES = 5;
const STATIC_WARDS = 9;

// Dummy trend values for the "Application Overview" chart, shown until the real
// per-day counts are computed from fetched applications. Labels are real (last 6
// days from today) so only the chart's shape/curve is a placeholder, not the dates.
const STATIC_TREND_VALUES = [8, 14, 10, 18, 13, 20];

// Placeholder rows for "Recent Applications" shown until the real list arrives —
// same row shape/markup as a real row, just non-clickable dummy content.
const STATIC_RECENT_APPLICATIONS = Array.from({ length: 5 }, (_, i) => ({
  _id: `static-${i}`,
  applicationNo: "—",
  personal: { fullName: "Loading vendor…" },
  business: { businessType: "—" },
  status: "Submitted",
  createdAt: null,
  __static: true,
}));

// Small hand-rolled SVG line chart - no extra chart library needed.
function ApplicationTrendChart({ points }) {
  const width = 640;
  const height = 220;
  const padding = 28;
  const max = Math.max(...points.map((p) => p.value), 1);

  const coords = points.map((p, i) => {
    const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
    const y = height - padding - (p.value / max) * (height - padding * 2);
    return { x, y, ...p };
  });

  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${
    height - padding
  } Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Applications trend">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16C47F" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#16C47F" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={padding}
          x2={width - padding}
          y1={height - padding - f * (height - padding * 2)}
          y2={height - padding - f * (height - padding * 2)}
          stroke="#EEF2F1"
          strokeWidth="1"
        />
      ))}
      <path d={areaPath} fill="url(#trendFill)" />
      <path d={linePath} fill="none" stroke="#16C47F" strokeWidth="2.5" />
      {coords.map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r="4" fill="#16C47F" stroke="white" strokeWidth="2" />
          <text x={c.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#94A3B8">
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── Animated counter: whenever `value` changes, counts smoothly from the previous
// number to the new one instead of just popping the digit in (used so KPI/footer
// numbers visibly "animate" from static → real once the fetch resolves). Non-numeric
// values (dates, strings) render as-is with no animation. ──
function AnimatedNumber({ value, duration = 700 }) {
  const isNumeric = typeof value === "number" && !Number.isNaN(value);
  const [display, setDisplay] = useState(isNumeric ? value : 0);
  const prevValue = useRef(isNumeric ? value : 0);

  useEffect(() => {
    if (!isNumeric) return;
    const from = prevValue.current;
    const to = value;
    if (from === to) return;

    let startTime = null;
    let rafId;

    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(from + (to - from) * eased);
      setDisplay(current);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        prevValue.current = to;
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, isNumeric]);

  if (!isNumeric) return <>{value}</>;
  return <>{display}</>;
}

const KPI_TONES = {
  brand: ["bg-brand-100", "text-brand-600"],
  warning: ["bg-warning-100", "text-warning-500"],
  success: ["bg-success-100", "text-success-500"],
  danger: ["bg-danger-100", "text-danger-500"],
  accent: ["bg-accent-100", "text-accent-700"],
  info: ["bg-info-100", "text-info-500"],
};

function KpiCard({ icon: Icon, tone, label, value, trend }) {
  const [bg, text] = KPI_TONES[tone] || KPI_TONES.brand;
  return (
    <Card className="flex items-start gap-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-ink-500">{label}</p>
        <p className="font-display text-2xl font-bold text-ink-900">
          <AnimatedNumber value={value} />
        </p>
        {trend && <p className="mt-0.5 text-xs font-semibold text-success-500">{trend}</p>}
      </div>
    </Card>
  );
}

const QUICK_ACTIONS = [
//   { label: "Add Vendor", icon: FiUserPlus, to: "/vendors/register", tone: "brand" },
//   { label: "New Application", icon: FiFilePlus, to: "/vendors/register", tone: "warning" },
  { label: "Schedule Inspection", icon: FiCalendar, to: "/survey", tone: "accent" },
  // { label: "Collect Payment", icon: FiCreditCard, to: "/applications/pending", tone: "success" },
  { label: "Generate Certificate", icon: FiAward, to: "/vendors/list", tone: "info" },
  { label: "View Reports", icon: FiBarChart2, to: "/applications", tone: "brand" },
];

export default function Dashboard() {
  const { user } = useAuth();

  // ── Real, role/ward-filtered data ──
  // The backend (`GET /api/applications/getAll`) automatically scopes results to the
  // logged-in officer's own ward for counter_officer / survey_officer / A.M.C., and to
  // everything for super_admin — this component never needs to know or send the ward itself.
  const [dataLoaded, setDataLoaded] = useState(false); // true once the stats counts finish loading
  const [computedStats, setComputedStats] = useState(null);
  const [error, setError] = useState("");
  const [showSpinner, setShowSpinner] = useState(true); // brief spinner shown for a fixed short window on mount only

  // ── Recent Applications gets its own small, fast fetch — independent of the stats
  // counts below. This way Recent Applications can swap to real data quickly even while
  // the stats requests are still running in the background. ──
  const [recentApps, setRecentApps] = useState([]);
  const [recentLoaded, setRecentLoaded] = useState(false);

  // ── Trend chart gets its own small fetch — only the last 6 days' worth of applications
  // (via the backend's `since` filter), not the whole collection. ──
  const [trendApps, setTrendApps] = useState([]);
  const [trendLoaded, setTrendLoaded] = useState(false);

  // Brief spinner — shown for a fixed short window (milliseconds) on mount, independent
  // of the actual network fetch. After this window we show static placeholders (if the
  // fetch hasn't finished yet) or real data (if it already has) — the spinner never
  // waits on the network, so it's never stuck showing "Loading..." for a long time.
  useEffect(() => {
    const t = setTimeout(() => setShowSpinner(false), 400);
    return () => clearTimeout(t);
  }, []);

  // Fast fetch for Recent Applications — small limit, sorted client-side by newest.
  useEffect(() => {
    let cancelled = false;
    setRecentLoaded(false);
    fetchVendorApplications({ limit: 20 }).then((result) => {
      if (cancelled) return;
      setRecentLoaded(true);
      if (result.success) {
        const top5 = [...(result.data || [])]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setRecentApps(top5);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Fast fetch for the trend chart — only applications created in the last 6 days.
  useEffect(() => {
    let cancelled = false;
    setTrendLoaded(false);
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 5);
    sixDaysAgo.setHours(0, 0, 0, 0);
    fetchVendorApplications({ since: sixDaysAgo.toISOString(), limit: 2000 }).then((result) => {
      if (cancelled) return;
      setTrendLoaded(true);
      if (result.success) setTrendApps(result.data || []);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── KPI counts — previously this fetched the ENTIRE collection (13,000+ full documents,
  // including statusHistory/survey/certificate) just to count how many fell into each
  // status bucket client-side. That's why the Dashboard got slow as the data grew. Now
  // each number is its own cheap `countDocuments()` (limit:1 → only `total` is read, no
  // documents are actually transferred), and all of them run in parallel. ──
  useEffect(() => {
    let cancelled = false;
    setDataLoaded(false);
    setError("");

    const APPROVED_STATUSES = ["A.M.C. Approved", "Payment Pending", "Payment Done", "Certificate Issued"].join(",");

    Promise.all([
      fetchVendorApplications({ limit: 1 }), // total
      fetchVendorApplications({ status: APPROVED_STATUSES, limit: 1 }), // approved
      fetchVendorApplications({ status: "Rejected", limit: 1 }), // rejected
      fetchVendorApplications({ hasCertificate: "true", limit: 1 }), // smart cards disbursed
    ]).then(([totalRes, approvedRes, rejectedRes, certRes]) => {
      if (cancelled) return;
      setDataLoaded(true);
      if (!totalRes.success) {
        setError(totalRes.message || "Could not load dashboard data.");
        return;
      }
      const totalApplications = totalRes.total || 0;
      const approved = approvedRes.success ? approvedRes.total || 0 : 0;
      const rejected = rejectedRes.success ? rejectedRes.total || 0 : 0;
      const smartCardsDisbursed = certRes.success ? certRes.total || 0 : 0;
      const pending = Math.max(totalApplications - approved - rejected, 0);
      setComputedStats({ totalApplications, approved, rejected, pending, paymentsToday: 0, smartCardsDisbursed });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Static placeholders until the counts resolve, then the real numbers —
  // KpiCard/FooterStat animate the transition via <AnimatedNumber />.
  const stats = dataLoaded && computedStats ? computedStats : STATIC_STATS;

  // Dummy trend values until the (small, last-6-days-only) trend fetch resolves, then the
  // real per-day counts — date labels are always real (last 6 days from today).
  const trendPoints = useMemo(() => {
    const days = 6;
    const counts = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
      const value = trendLoaded
        ? trendApps.filter((a) => a.createdAt && a.createdAt.slice(0, 10) === key).length
        : STATIC_TREND_VALUES[days - 1 - i];
      counts.push({ label, value });
    }
    return counts;
  }, [trendApps, trendLoaded]);

  // Static placeholder rows until the FAST recent-fetch resolves, then real latest-5
  // applications — this no longer waits on the stats counts.
  const recentApplications = useMemo(() => {
    if (!recentLoaded) return STATIC_RECENT_APPLICATIONS;
    return recentApps;
  }, [recentApps, recentLoaded]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900">Dashboard</h1>
          <p className="text-sm text-ink-500">
            Welcome back, {user?.name || "Officer"}! Here's what's happening today.
          </p>
        </div>
      </div>

      {showSpinner ? (
        <Card className="flex items-center justify-center gap-2 py-16 text-sm text-ink-400">
          <FiLoader className="animate-spin" size={16} />
          Loading dashboard...
        </Card>
      ) : (
        <>
          {/* Non-blocking error banner — dashboard still renders with placeholder/real
              data below, instead of replacing the whole page with an error screen. */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-danger-200 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-600">
              <FiAlertCircle size={16} />
              {error}
            </div>
          )}

          {/* KPI cards */}
          {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"> */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <KpiCard icon={FiFilePlus} tone="brand" label="Total Vendor Applications" value={stats.totalApplications} />
            <KpiCard icon={FiClock} tone="warning" label="Pending" value={stats.pending} />
            <KpiCard icon={FiShield} tone="success" label="Approved" value={stats.approved} />
            <KpiCard icon={FiShield} tone="danger" label="Rejected" value={stats.rejected} />
            {/* <KpiCard icon={FiCreditCard} tone="accent" label="Payments" value={stats.paymentsToday} /> */}
            <KpiCard icon={FiAward} tone="info" label="Smart Card Disbursed" value={stats.smartCardsDisbursed} />
          </div>

          {/* Overview row */}
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_1fr]">
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-ink-900">Application Overview</h2>
                <span className="rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-500">
                  Last 6 Days
                </span>
              </div>
              <ApplicationTrendChart points={trendPoints} />
            </Card>

            <Card padded={false} className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-ink-100 p-5">
                <h2 className="font-display text-base font-bold text-ink-900">Recent Applications</h2>
                <Link to="/vendors/list" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                  View All
                </Link>
              </div>
              <div className="divide-y divide-ink-50">
                {recentApplications.length === 0 ? (
                  <p className="px-5 py-8 text-center text-sm text-ink-400">No applications yet.</p>
                ) : (
                  recentApplications.map((a) => (
                    <Link
                      key={a._id || a.applicationNo}
                      to={a.__static ? "#" : `/vendors/profile/${a.applicationNo}`}
                      onClick={(e) => a.__static && e.preventDefault()}
                      className={`flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50/50 ${
                        a.__static ? "opacity-60" : ""
                      }`}
                    >
                      <Avatar src={a.documents?.photo || undefined} name={a.personal?.fullName} size={36} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold text-ink-900">{a.personal?.fullName}</p>
                        <p className="truncate text-xs text-ink-500">{a.business?.businessType}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <StatusChip status={displayStatus(a.status)} />
                        <p className="mt-1 text-[10px] text-ink-400">{a.__static ? "" : timeAgo(a.createdAt)}</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Quick Actions + Banner */}
          {/* <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
              <div className="grid grid-cols-3 gap-3">
                {QUICK_ACTIONS.map((a) => {
                  const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
                  return (
                    <Link
                      key={a.label}
                      to={a.to}
                      className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
                        <a.icon size={18} />
                      </div>
                      <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
                    </Link>
                  );
                })}
              </div>
            </Card>

            <Card
              padded={false}
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
            >
              <img
                src={vendorgadi}
                alt="Street vendor with cart"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
              />
              <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                <FiShield size={11} className="text-[#E9CE8B]" />
                VVCMC Initiative
              </span>
              <div className="relative z-10 p-5 pt-3">
                <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
                <p className="mt-1.5 text-[12.5px] text-white/85">
                  Building stronger communities through transparent &amp; efficient management.
                </p>
              </div>
            </Card>
          </div> */}


          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <h2 className="mb-5 font-display text-base font-bold text-ink-900">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {QUICK_ACTIONS.map((a) => {
                  const [bg, text] = KPI_TONES[a.tone] || KPI_TONES.brand;
                  return (
                    <Link
                      key={a.label}
                      to={a.to}
                      className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 px-3 py-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
                        <a.icon size={18} />
                      </div>
                      <span className="text-[11.5px] font-semibold text-ink-700">{a.label}</span>
                    </Link>
                  );
                })}
              </div>
            </Card>

            <Card
              padded={false}
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden text-white shadow-[var(--shadow-soft-lg)]"
            >
              <img
                src={vendorgadi}
                alt="Street vendor with cart"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.35) 55%, rgba(6,46,52,0.92) 100%)",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border-[6px] border-[#E9CE8B]/30"
              />
              <span className="relative z-10 mx-5 mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                <FiShield size={11} className="text-[#E9CE8B]" />
                VVCMC Initiative
              </span>
              <div className="relative z-10 p-5 pt-3">
                <p className="font-display text-lg font-bold leading-snug">Empowering Street Vendors</p>
                <p className="mt-1.5 text-[12.5px] text-white/85">
                  Building stronger communities through transparent &amp; efficient management.
                </p>
              </div>
            </Card>
          </div>

          {/* Footer stats bar */}
          {/* <Card className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <FooterStat icon={FiMapPin} label="Total Zones" value={dataLoaded ? ZONE_OPTIONS.length : STATIC_ZONES} />
            <FooterStat icon={FiMapPin} label="Total Wards" value={dataLoaded ? WARD_OPTIONS.length : STATIC_WARDS} />
            <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
            <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
              <div>
                <p className="text-[11px] text-ink-400">System Status</p>
                <p className="text-sm font-semibold text-ink-900">Healthy</p>
              </div>
            </div>
            <FooterStat
              icon={FiClock}
              label="Last Backup"
              value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            />
          </Card> */}
          <Card className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4">
            <FooterStat icon={FiMapPin} label="Total Zones" value={dataLoaded ? ZONE_OPTIONS.length : STATIC_ZONES} />
            <FooterStat icon={FiMapPin} label="Total Wards" value={dataLoaded ? WARD_OPTIONS.length : STATIC_WARDS} />
            <FooterStat icon={FiUsers} label="Active Inspectors" value={1} />
            <FooterStat icon={FiUsers} label="Active Counter Staff" value={1} />
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
              <div>
                <p className="text-[11px] text-ink-400">System Status</p>
                <p className="text-sm font-semibold text-ink-900">Healthy</p>
              </div>
            </div>
            <FooterStat
              icon={FiClock}
              label="Last Backup"
              value={new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            />
          </Card>
        </>
      )}
    </div>
  );
}

function FooterStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400">
        <Icon size={14} />
      </div>
      <div>
        <p className="text-[11px] text-ink-400">{label}</p>
        <p className="text-sm font-semibold text-ink-900">
          <AnimatedNumber value={value} />
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OLD CODE — kept commented out per project policy (never delete, only comment).
// This was the earlier version where Recent Applications was derived from the
// SAME big `applications` state as the KPI stats (fetched with `dynamicLimit`,
// i.e. all ~1441 records). That meant Recent Applications stayed on placeholders
// until the entire heavy fetch resolved, even though it only ever needed the
// latest 5. Replaced above with a separate, small `fetchVendorApplications({ limit: 20 })`
// call (`recentApps`/`recentLoaded`) so Recent Applications can swap to real data
// quickly, independent of how long the full stats fetch takes.
// ─────────────────────────────────────────────────────────────────────────────
//
// const [loading, setLoading] = useState(true);
//
// useEffect(() => {
//   let cancelled = false;
//   setLoading(true);
//   setError("");
//   fetchVendorApplications({ limit: 1 }).then((countResult) => {
//     if (cancelled) return;
//     if (!countResult.success) {
//       setLoading(false);
//       setError(countResult.message || "Could not load dashboard data.");
//       return;
//     }
//     const dynamicLimit = countResult.total || 1;
//     fetchVendorApplications({ limit: dynamicLimit }).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setError(result.message || "Could not load dashboard data.");
//         return;
//       }
//       setApplications(result.data || []);
//     });
//   });
//   return () => {
//     cancelled = true;
//   };
// }, []);
//
// {loading ? (
//   <Card className="flex items-center justify-center gap-2 py-16 text-sm text-ink-400">
//     <FiLoader className="animate-spin" size={16} />
//     Loading dashboard...
//   </Card>
// ) : error ? (
//   <Card className="flex items-center justify-center gap-2 py-16 text-sm font-medium text-danger-500">
//     <FiAlertCircle size={16} />
//     {error}
//   </Card>
// ) : (
//   <>
//     {/* ...same KPI/overview/quick-actions/footer JSX as above... */}
//   </>
// )}
//
// // old trendPoints — always computed from `applications` (flat/empty while loading):
// const trendPoints = useMemo(() => {
//   const days = 6;
//   const counts = [];
//   for (let i = days - 1; i >= 0; i--) {
//     const d = new Date();
//     d.setDate(d.getDate() - i);
//     const key = d.toISOString().slice(0, 10);
//     const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//     const value = applications.filter((a) => a.createdAt && a.createdAt.slice(0, 10) === key).length;
//     counts.push({ label, value });
//   }
//   return counts;
// }, [applications]);
//
// // old recentApplications — derived from the big `applications`/`dataLoaded`:
// const recentApplications = useMemo(() => {
//   if (!dataLoaded) return STATIC_RECENT_APPLICATIONS;
//   return [...applications]
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 5);
// }, [applications, dataLoaded]);
//
// // old recentApplications (even older) only took first 4 and had no static placeholder:
// const recentApplications = useMemo(
//   () =>
//     [...applications]
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       .slice(0, 4),
//   [applications]
// );