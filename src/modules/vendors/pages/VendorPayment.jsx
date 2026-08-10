import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiCreditCard,
  FiSmartphone,
  FiHome,
  FiBriefcase as FiWallet,
  FiDollarSign,
  FiShield,
  FiLock,
  FiCheck,
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiAlertCircle,
  FiPhoneCall,
  FiArrowLeft,
  FiUser,
} from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Avatar from "../../../components/ui/Avatar";
import { IdBadge } from "../../../components/ui/Avatar";
import { fetchVendorApplicationByNo, recordVendorPayment } from "../../../services/vendorApplicationService";

const METHODS = [
  { key: "card", label: "Card", icon: FiCreditCard },
  { key: "upi", label: "UPI", icon: FiSmartphone },
  { key: "netbanking", label: "Net Banking", icon: FiHome },
  { key: "wallet", label: "Wallet", icon: FiWallet },
  { key: "cash", label: "Cash Payment", icon: FiDollarSign },
];

// Phases: "form" -> "processing" -> "success" | "failed"
export default function VendorPayment() {
  const { id: applicationNo } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [method, setMethod] = useState("card");
  const [phase, setPhase] = useState("form");
  const [payError, setPayError] = useState("");
  const [paidData, setPaidData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError("");
    fetchVendorApplicationByNo(applicationNo).then((result) => {
      if (cancelled) return;
      setLoading(false);
      if (!result.success) {
        setLoadError(result.message || "Application not found.");
        return;
      }
      setVendor(result.data);
    });
    return () => {
      cancelled = true;
    };
  }, [applicationNo]);

  if (loading) {
    return (
      <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
        <FiLoader className="animate-spin" size={20} />
        Loading...
      </Card>
    );
  }

  if (loadError || !vendor) {
    return (
      <Card className="mx-auto max-w-md text-center">
        <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
        <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
          Back to Vendor List
        </Link>
      </Card>
    );
  }

  if (vendor.status === "Certificate Issued") {
    return (
      <Card className="mx-auto max-w-md text-center">
        <FiCheckCircle className="mx-auto mb-3 text-success-500" size={32} />
        <p className="text-sm font-semibold text-ink-800">Payment already complete for this application.</p>
        <Link to={`/smart-card/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
          View Smart Card
        </Link>
      </Card>
    );
  }

  if (vendor.status !== "Payment Pending") {
    return (
      <Card className="mx-auto max-w-md text-center">
        <FiAlertCircle className="mx-auto mb-3 text-warning-500" size={28} />
        <p className="text-sm font-semibold text-ink-800">This application isn't ready for payment yet.</p>
        <p className="mt-1 text-xs text-ink-500">
          Current status: <span className="font-semibold">{vendor.status}</span>
        </p>
        <Link to={`/vendors/profile/${vendor.applicationNo}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
          View Application
        </Link>
      </Card>
    );
  }

  // ── Fee breakdown — the License Fee is what A.M.C. set; the rest are fixed platform charges ──
  const licenseFee = vendor.payment?.amount || 500;
  const processingFee = 50;
  const serviceFee = 20;
  const gst = Math.round((licenseFee + processingFee + serviceFee) * 0.02);
  const totalAmount = licenseFee + processingFee + serviceFee + gst;

  const handlePay = async () => {
    setPayError("");
    setPhase("processing");

    const transactionId = `TXN${Date.now()}`;

    // Small delay so "Processing Payment" actually reads as a real step, not an instant flash.
    setTimeout(async () => {
      const result = await recordVendorPayment(applicationNo, {
        amount: totalAmount,
        transactionId,
        receiptUrl: "",
      });

      if (!result.success) {
        setPayError(result.message || "Payment could not be processed.");
        setPhase("failed");
        return;
      }
      setPaidData(result.data);
      setPhase("success");
    }, 1400);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      {phase === "form" && (
        <Link
          to={`/vendors/profile/${applicationNo}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
        >
          <FiArrowLeft size={14} /> Back to Application
        </Link>
      )}

      {/* ── Stepper ── */}
      <div className="flex items-center justify-center gap-3 text-xs font-semibold text-ink-400 sm:gap-6">
        <StepPill n={1} label="Application Details" done />
        <StepLine done />
        <StepPill n={2} label="Payment" current={phase !== "success"} done={phase === "success"} />
        <StepLine done={phase === "success"} />
        <StepPill n={3} label="Complete" current={phase === "success"} />
      </div>

      {phase === "form" && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
          {/* ============= LEFT: Method + form ============= */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-base font-bold text-ink-900">Select Payment Method</h2>
                <p className="text-xs text-ink-500">Choose a payment option to pay your license fee securely</p>
              </div>
              <div className="hidden items-center gap-1.5 text-xs font-semibold text-success-600 sm:flex">
                <FiShield size={14} /> 100% Secure Payment
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {METHODS.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMethod(m.key)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-3 text-xs font-semibold transition-colors ${
                    method === m.key
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-ink-100 text-ink-500 hover:border-ink-200"
                  }`}
                >
                  <m.icon size={18} />
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {method === "card" && (
                <div className="space-y-4 rounded-2xl border border-ink-100 bg-ink-50/40 p-4">
                  <p className="text-xs font-semibold text-ink-500">We accept all major credit and debit cards</p>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-ink-700">Card Number</label>
                    <input
                      placeholder="1234 5678 9012 3456"
                      className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="sm:col-span-1">
                      <label className="mb-1 block text-xs font-semibold text-ink-700">Cardholder Name</label>
                      <input
                        placeholder="Enter name on card"
                        className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-ink-700">Expiry Date</label>
                      <input
                        placeholder="MM / YY"
                        className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-ink-700">CVV</label>
                      <input
                        placeholder="123"
                        className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === "upi" && (
                <div className="space-y-3 rounded-2xl border border-ink-100 bg-ink-50/40 p-4">
                  <p className="text-xs font-semibold text-ink-500">Pay using any UPI app</p>
                  <input
                    placeholder="yourname@upi"
                    className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
                  />
                </div>
              )}

              {method === "netbanking" && (
                <div className="rounded-2xl border border-ink-100 bg-ink-50/40 p-4 text-xs font-semibold text-ink-500">
                  You'll be redirected to your bank's secure page to complete this payment.
                </div>
              )}

              {method === "wallet" && (
                <div className="rounded-2xl border border-ink-100 bg-ink-50/40 p-4 text-xs font-semibold text-ink-500">
                  Pay using your linked wallet balance.
                </div>
              )}

              {method === "cash" && (
                <div className="rounded-2xl border border-ink-100 bg-ink-50/40 p-4 text-xs font-semibold text-ink-500">
                  Pay in cash at the VVCMC office counter. Your application will move ahead once the Counter
                  Officer confirms your payment.
                </div>
              )}
            </div>

            {payError && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
                {payError}
              </div>
            )}

            <Button
              variant="primary"
              icon={FiLock}
              onClick={handlePay}
              className="mt-6 w-full justify-center py-3.5 text-base"
            >
              Pay ₹{totalAmount.toLocaleString("en-IN")} Securely
            </Button>

            <p className="mt-3 text-center text-[11px] text-ink-400">
              By proceeding, you agree to the VVCMC Terms &amp; Conditions and Privacy Policy.
            </p>
          </Card>

          {/* ============= RIGHT: Vendor + Fee summary ============= */}
          <div className="space-y-5">
            <Card>
              <h3 className="mb-3 font-display text-sm font-bold text-ink-900">Vendor Details</h3>
              <div className="flex items-center gap-3">
                <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={56} />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink-900">{vendor.personal?.fullName}</p>
                  <IdBadge className="mt-1 bg-ink-50">{vendor.vendorId}</IdBadge>
                </div>
              </div>
              <div className="mt-4 space-y-2 border-t border-ink-100 pt-3 text-xs">
                <Row label="Application No." value={vendor.applicationNo} />
                <Row label="Ward" value={vendor.address?.ward || vendor.ward} />
                <Row label="Mobile Number" value={vendor.personal?.mobile} />
                <Row label="Business Type" value={vendor.business?.businessCategory} />
              </div>
            </Card>

            <Card>
              <h3 className="mb-3 font-display text-sm font-bold text-ink-900">Fee Summary</h3>
              <div className="space-y-2 text-sm">
                <Row label="License Fee" value={`₹ ${licenseFee.toFixed(2)}`} />
                <Row label="Processing Fee" value={`₹ ${processingFee.toFixed(2)}`} />
                <Row label="Service Fee" value={`₹ ${serviceFee.toFixed(2)}`} />
                <Row label="GST" value={`₹ ${gst.toFixed(2)}`} />
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-3">
                <span className="text-sm font-bold text-ink-900">Total Amount</span>
                <span className="font-display text-lg font-black text-brand-700">₹ {totalAmount.toFixed(2)}</span>
              </div>
            </Card>

            <Card className="bg-brand-50/60">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-brand-700">
                <FiShield size={14} /> Secure Payment
              </p>
              <ul className="space-y-1.5 text-[11.5px] text-ink-600">
                <li className="flex items-center gap-1.5"><FiCheck size={12} className="text-success-500" /> 256-bit SSL encryption</li>
                <li className="flex items-center gap-1.5"><FiCheck size={12} className="text-success-500" /> Your card details are secure</li>
                <li className="flex items-center gap-1.5"><FiCheck size={12} className="text-success-500" /> We do not store your card information</li>
              </ul>
            </Card>

            <Card>
              <p className="flex items-center gap-1.5 text-xs font-bold text-ink-800">
                <FiPhoneCall size={14} /> Need Help?
              </p>
              <p className="mt-1 text-[11.5px] text-ink-500">
                Payment Support — Call us: <span className="font-semibold">1800-123-4567</span>
                <br />
                (Mon - Sat: 10:00 AM to 6:00 PM)
              </p>
            </Card>
          </div>
        </div>
      )}

      {phase === "processing" && (
        <Card className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
            <FiLoader className="animate-spin text-brand-600" size={28} />
          </div>
          <h2 className="font-display text-lg font-bold text-ink-900">Processing Payment</h2>
          <p className="text-sm text-ink-500">Please do not close or refresh this page.</p>
        </Card>
      )}

      {phase === "success" && (
        <Card className="mx-auto flex max-w-lg flex-col items-center gap-2 py-14 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
            <FiCheckCircle size={30} />
          </div>
          <h2 className="mt-2 font-display text-xl font-bold text-ink-900">Payment Successful!</h2>
          <p className="max-w-sm text-sm text-ink-500">
            Your payment of ₹{totalAmount.toFixed(2)} has been received. Your Street Vendor Smart Card has been
            generated.
          </p>
          {paidData?.certificate?.certificateNo && (
            <div className="mt-3 flex gap-3 rounded-xl bg-ink-50 px-5 py-3 text-sm">
              <span className="text-ink-500">Certificate No.</span>
              <span className="font-semibold text-ink-900">{paidData.certificate.certificateNo}</span>
            </div>
          )}
          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>
              View Application
            </Button>
            <Button onClick={() => navigate(`/smart-card/${applicationNo}`)}>View Smart Card</Button>
          </div>
        </Card>
      )}

      {phase === "failed" && (
        <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger-100 text-danger-500">
            <FiXCircle size={30} />
          </div>
          <h2 className="font-display text-lg font-bold text-ink-900">Payment Failed!</h2>
          <p className="max-w-sm text-sm text-ink-500">{payError || "We couldn't process your payment."}</p>
          <Button className="mt-5" onClick={() => setPhase("form")}>
            Try Again
          </Button>
        </Card>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-500">{label}</span>
      <span className="font-semibold text-ink-800">{value || "-"}</span>
    </div>
  );
}

function StepPill({ n, label, done, current }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
          done ? "bg-success-500 text-white" : current ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400"
        }`}
      >
        {done ? <FiCheck size={13} /> : n}
      </div>
      <span className={current || done ? "text-ink-800" : ""}>{label}</span>
    </div>
  );
}

function StepLine({ done }) {
  return <span className={`h-px w-8 sm:w-16 ${done ? "bg-success-500" : "bg-ink-200"}`} />;
}