
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiUser,
  FiMapPin,
  FiShoppingBag,
  FiFileText,
  FiShield,
  FiHeadphones,
  FiBookmark,
  FiX,
  FiChevronDown,
  FiAlertCircle,
} from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Step1Personal from "../steps/Step1Personal";
import Step2Address from "../steps/Step2Address";
import Step3Business from "../steps/Step3Business";
import Step4Documents from "../steps/Step4Documents";
import Step5Preview from "../steps/Step5Preview";
import { addVendor, makeVendorDraft, selectAllVendors } from "../../../features/vendors/vendorsSlice";
import { submitVendorApplication } from "../../../services/vendorApplicationService";
import Registration from "../../../assets/registration.png";

const STEPS = ["Personal Details", "Address", "Business Info", "Documents", "Preview"];

const STEP_META = [
  {
    label: "Personal Details",
    subtitle: "Enter the vendor's personal identification details.",
    icon: FiUser,
    tint: "teal",
  },
  {
    label: "Address",
    subtitle: "Where the vendor lives and vends from.",
    icon: FiMapPin,
    tint: "orange",
  },
  {
    label: "Business Info",
    subtitle: "What the vendor sells and how they operate.",
    icon: FiShoppingBag,
    tint: "blue",
  },
  {
    label: "Documents",
    subtitle: "Upload the required identity and address proofs.",
    icon: FiFileText,
    tint: "purple",
  },
  {
    label: "Preview",
    subtitle: "Review everything before submitting the application.",
    icon: FiCheckCircle,
    tint: "green",
  },
];

const TINTS = {
  orange: { bg: "bg-amber-100", text: "text-amber-500" },
  blue: { bg: "bg-sky-100", text: "text-sky-500" },
  purple: { bg: "bg-violet-100", text: "text-violet-500" },
  green: { bg: "bg-emerald-100", text: "text-emerald-500" },
};

// UPDATED: fatherName no longer mandatory (Step1Personal.jsx), so it's dropped
// from the validation-trigger list. goodsType / businessTiming / yearsExperience
// are commented out on Step3Business.jsx, so removed here too.
// businessCategory renamed to businessType.
const STEP_FIELDS = {
  1: ["fullName", "dob", "gender", "mobile", "email", "aadhaar", "pan", "category"],
  2: ["permanentAddress", "currentAddress", "ward"],
  3: [], // Business Type, Business Place, Goods Type, Business Timing are all optional now
};

const BENEFITS = ["Get Official ID Card", "Access to Vending Zones", "Government Benefits", "Grow Your Business"];

/* ----------------------------- Step indicator ----------------------------- */

function RegistrationStepper({ current }) {
  return (
    <div className="flex items-start justify-between overflow-x-auto pb-1">
      {STEP_META.map((meta, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        const isCurrentOrDone = isActive || isDone;
        const tint = TINTS[meta.tint];

        return (
          <div key={meta.label} className="flex flex-1 items-start last:flex-none">
            <div className="flex min-w-[76px] flex-col items-center text-center">
              <div
                className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all ${
                  isCurrentOrDone ? "bg-[#0EA5A8] text-white shadow-[0_0_0_6px_rgba(14,165,168,0.15)]" : `${tint.bg} ${tint.text}`
                }`}
              >
                {isDone ? <FiCheckCircle size={22} /> : <meta.icon size={20} />}
              </div>
              <p className={`mt-2 text-sm font-bold ${isCurrentOrDone ? "text-[#0EA5A8]" : "text-ink-400"}`}>{stepNum}</p>
              <p className={`mt-0.5 whitespace-nowrap text-[12px] font-semibold ${isActive ? "text-ink-900" : "text-ink-500"}`}>
                {meta.label}
              </p>
              {isActive && <FiChevronDown size={16} className="mt-1 text-[#0EA5A8]" />}
            </div>

            {stepNum < STEP_META.length && (
              <div className="mt-7 h-0 flex-1 px-1">
                <div
                  className={`h-px w-full ${
                    stepNum < current ? "bg-[#0EA5A8]" : "border-t border-dashed border-ink-200"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ----------------------------- Side panels ----------------------------- */

// function WhyRegisterCard() {
//   return (
//     <div className="hidden w-[240px] shrink-0 flex-col gap-4 lg:flex">
//       <div className="rounded-2xl border border-ink-100 bg-[#F3FBFA] p-5">
//         <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
//           <FiShield size={26} className="text-[#0B4D52]" />
//         </div>
//         <p className="font-display text-[15px] font-bold text-ink-900">Why register?</p>
//         <ul className="mt-3 space-y-2.5">
//           {BENEFITS.map((b) => (
//             <li key={b} className="flex items-start gap-2 text-[12.5px] font-medium text-ink-700">
//               <FiCheckCircle size={15} className="mt-0.5 shrink-0 text-success-500" />
//               {b}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <button
//         type="button"
//         className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-3.5 text-left shadow-sm transition hover:border-[#0EA5A8]/40"
//       >
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-500">
//           <FiHeadphones size={17} />
//         </div>
//         <div className="min-w-0 flex-1">
//           <p className="text-[12.5px] font-bold text-ink-900">Need Help?</p>
//           <p className="text-[11px] text-ink-500">We're here to assist you</p>
//         </div>
//         <FiArrowRight size={14} className="shrink-0 text-ink-400" />
//       </button>
//     </div>
//   );
// }

function HeroPanel() {
  return (
    <aside className="relative hidden overflow-hidden lg:block">
      <img src={Registration} alt="Street vendor" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,46,52,0.05) 0%, rgba(6,46,52,0.55) 55%, rgba(6,46,52,0.96) 100%)",
        }}
      />

      

      <div className="relative flex h-full flex-col justify-end p-7">
        <h2 className="font-display text-[26px] font-black leading-tight text-white">
          Vendor
          <br />
          Registration
        </h2>
        <p className="mt-2 max-w-[220px] text-[13px] text-white/85">
          Register yourself as a certified street vendor with VVCMC.
        </p>

        <div className="mt-6 space-y-3.5 border-t border-white/15 pt-5">
          <div className="flex items-start gap-3">
            <FiShield size={16} className="mt-0.5 shrink-0 text-[#E9CE8B]" />
            <div>
              <p className="text-[13px] font-bold text-[#E9CE8B]">Secure &amp; Safe</p>
              <p className="text-[11.5px] text-white/70">Your data is protected</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FiFileText size={16} className="mt-0.5 shrink-0 text-[#E9CE8B]" />
            <div>
              <p className="text-[13px] font-bold text-[#E9CE8B]">Quick &amp; Easy</p>
              <p className="text-[11.5px] text-white/70">Simple 5 step registration</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FiCheckCircle size={16} className="mt-0.5 shrink-0 text-[#E9CE8B]" />
            <div>
              <p className="text-[13px] font-bold text-[#E9CE8B]">Verified by VVCMC</p>
              <p className="text-[11.5px] text-white/70">Trusted by the city</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ----------------------------- Main component ----------------------------- */

export default function VendorRegistration() {
  const [step, setStep] = useState(1);
  const [documents, setDocuments] = useState({
    photo: null,
    aadhaarCard: null,
    panCard: null,
    addressProof: null,
    businessProof: null,
  });
  const [submitted, setSubmitted] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const dispatch = useDispatch();
  const vendors = useSelector(selectAllVendors);
  const navigate = useNavigate();

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onTouched" });

  const data = watch();

  const handleNext = async () => {
    if (step <= 3) {
      const valid = await trigger(STEP_FIELDS[step]);
      if (!valid) return;
    }
    if (step === 4) {
      const requiredDocs = ["photo", "aadhaarCard", "panCard", "addressProof"];
      const missing = requiredDocs.some((k) => !documents[k]);
      if (missing) return;
    }
    setStep((s) => Math.min(s + 1, 5));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitError("");
    setSubmitting(true);

    const personal = {
      fullName: data.fullName,
      fatherName: data.fatherName,
      dob: data.dob,
      gender: data.gender,
      mobile: data.mobile,
      email: data.email,
      aadhaar: data.aadhaar,
      pan: data.pan,
      category: data.category,
    };
    const address = {
      permanentAddress: data.permanentAddress, // RESIDENCE ADDRESS
      currentAddress: data.currentAddress, // Working Address
      roadName: data.roadName, // NEW
      ward: data.ward,
      zone: data.zone,
    };
    // Business Type / Business Place — if "Other" was picked, use the free-text value instead
    const resolvedBusinessType = data.businessType === "Other" ? data.businessTypeOther : data.businessType;
    const resolvedBusinessPlace =
      data.businessPlace === "Other" ? data.businessPlaceOther : data.businessPlace || "Foot Path";

    // Business Timing — combine the two time-picker values into a single readable string
    const businessTiming =
      data.businessTimingFrom && data.businessTimingTo
        ? `${data.businessTimingFrom} - ${data.businessTimingTo}`
        : "";

    const business = {
      vendorType: data.vendorType, // field no longer collected on the form; stays undefined
      businessType: resolvedBusinessType || "",
      businessPlace: resolvedBusinessPlace,
      goodsType: data.goodsType || "",
      businessTiming,
      // yearsExperience: data.yearsExperience,
    };

    // ── Submit to the real backend (multipart, with the actual document files) ──
    const result = await submitVendorApplication({ personal, address, business, documents, ward: data.ward });

    setSubmitting(false);

    if (!result.success) {
      setSubmitError(result.message || "Could not submit the application. Please try again.");
      return;
    }

    // ── Keep the local vendor list (this session's UI) in sync too, using the
    //    real applicationNo/vendorId the backend just generated ──
    const draft = makeVendorDraft(vendors, {
      personal,
      address,
      business,
      // documents already hold { name, url, type, file } from FileUpload.jsx — the `url`
      // (blob preview) and `type` are exactly what the local list/profile pages need to display.
      documents: Object.fromEntries(
        Object.entries(documents).map(([key, doc]) => [
          key,
          doc ? { name: doc.name, url: doc.url, type: doc.type } : null,
        ])
      ),
    });
    draft.applicationNo = result.applicationNo;
    draft.vendorId = result.vendorId;

    dispatch(addVendor(draft));
    setSubmitted(draft);
  };

  if (submitted) {
    return (
      <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
          <FiCheckCircle size={30} />
        </div>
        <h2 className="font-display text-xl font-bold text-ink-900">Registration Submitted</h2>
        <p className="mt-2 max-w-sm text-sm text-ink-500">
          {submitted.personal.fullName}'s application has been recorded with status{" "}
          <span className="font-semibold text-warning-500">Pending Survey</span>.
        </p>
        <div className="mt-5 flex gap-3 rounded-xl bg-ink-50 px-5 py-3 id-mono text-sm">
          <span className="text-ink-500">Vendor ID</span>
          <span className="font-semibold text-ink-900">{submitted.vendorId}</span>
        </div>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={() => navigate(`/vendors/profile/${submitted.id}`)}>
            View Profile
          </Button>
          <Button onClick={() => navigate("/vendors/list")}>Back to Vendor List</Button>
        </div>
      </Card>
    );
  }

  const meta = STEP_META[step - 1];
  const progressPct = Math.round((step / STEPS.length) * 100);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-ink-100 bg-white shadow-[0_20px_50px_-20px_rgba(6,46,52,0.25)] lg:grid-cols-[280px_1fr]">
        <HeroPanel />

        <div className="flex flex-col">
          {/* Stepper */}
          <div className="px-6 pb-2 pt-7 sm:px-8">
            <RegistrationStepper current={step} />
          </div>

          {/* Progress bar */}
          <div className="mx-6 mt-5 flex flex-wrap items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50/50 px-5 py-3.5 sm:mx-8">
            <p className="shrink-0 text-[13px] font-semibold text-ink-700">Registration Progress</p>
            <div className="h-2 min-w-[120px] flex-1 overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#16C47F] to-[#0EA5A8] transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="shrink-0 text-[13px] font-bold text-[#0B4D52]">{progressPct}% Completed</p>
            <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-[#E7F7F3] px-3 py-1.5 text-[11.5px] font-semibold text-[#0B4D52]">
              <FiShield size={13} />
              Your information is safe with us
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-xl font-bold text-ink-900">{meta.label}</h2>
                <p className="mt-1 text-sm text-ink-500">{meta.subtitle}</p>

                <div className="mt-6">
                  {step === 1 && <Step1Personal register={register} errors={errors} />}
                  {step === 2 && <Step2Address register={register} errors={errors} watch={watch} setValue={setValue} />}
                  {step === 3 && (
                    <Step3Business register={register} errors={errors} watch={watch} setValue={setValue} />
                  )}
                  {step === 4 && <Step4Documents documents={documents} setDocuments={setDocuments} />}
                  {step === 5 && <Step5Preview data={getValues()} documents={documents} goToStep={setStep} />}
                </div>

                {step === 5 && submitError && (
                  <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
                    {submitError}
                  </div>
                )}
              </div>

              {/* {step < 5 && <WhyRegisterCard />} */}
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 px-6 py-5 sm:px-8">
            {step < 5 ? (
              <button
                type="button"
                className="flex items-center gap-2 text-[13px] font-semibold text-ink-500 hover:text-ink-700"
              >
                <FiBookmark size={15} />
                Save &amp; Continue Later
              </button>
            ) : (
              <span />
            )}

            <div className="ml-auto flex gap-3">
              <Button
                variant="outline"
                icon={step === 1 ? FiX : FiArrowLeft}
                onClick={step === 1 ? () => navigate("/vendors/list") : handleBack}
                disabled={submitting}
              >
                {step === 1 ? "Cancel" : "Back"}
              </Button>
              {step < 5 ? (
                <Button icon={FiArrowRight} iconPosition="right" onClick={handleNext}>
                  Next Step
                </Button>
              ) : (
                <Button variant="success" icon={FiCheckCircle} onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Registration"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}