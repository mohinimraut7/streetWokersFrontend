import { FiEdit2 } from "react-icons/fi";
import Avatar from "../../../components/ui/Avatar";

function Row({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-ink-400">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-ink-900">{value || "-"}</p>
    </div>
  );
}

function SectionCard({ title, onEdit, children }) {
  return (
    <div className="rounded-2xl border border-ink-100 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-ink-900">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
        >
          <FiEdit2 size={12} /> Edit
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">{children}</div>
    </div>
  );
}

export default function Step5Preview({ data, documents, goToStep }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-ink-900">Preview & Submit</h2>
      <p className="mb-6 mt-1 text-sm text-ink-500">
        Please review the details carefully before final submission.
      </p>

      <div className="mb-6 flex items-center gap-4 rounded-2xl bg-brand-50 p-5">
        <Avatar src={documents.photo?.url} name={data.fullName} size={64} />
        <div>
          <p className="font-display text-base font-bold text-ink-900">{data.fullName}</p>
          <p className="text-sm text-ink-500">
            {data.vendorType} &middot; {data.businessType}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <SectionCard title="Personal Details" onEdit={() => goToStep(1)}>
          {/* Father's Name no longer mandatory, still shown if provided */}
          <Row label="Father's Name" value={data.fatherName} />
          <Row label="Date of Birth" value={data.dob} />
          <Row label="Gender" value={data.gender} />
          <Row label="Mobile" value={data.mobile} />
          <Row label="Email" value={data.email} />
          <Row label="Aadhaar Number" value={data.aadhaar} />
          <Row label="PAN Number" value={data.pan} />
          <Row label="Category" value={data.category} />
        </SectionCard>

        <SectionCard title="Address" onEdit={() => goToStep(2)}>
          <Row label="RESIDENCE ADDRESS" value={data.permanentAddress} />
          <Row label="Working Address" value={data.currentAddress} />
          <Row label="Road Name" value={data.roadName} />
          <Row label="Ward" value={data.ward} />
          <Row label="Zone" value={data.zone} />
        </SectionCard>

        <SectionCard title="Business Information" onEdit={() => goToStep(3)}>
          {/* Vendor Type field removed from the form (kept in data model for future use) */}
          <Row
            label="Business Type"
            value={data.businessType === "Other" ? data.businessTypeOther : data.businessType}
          />
          <Row
            label="Business Place"
            value={data.businessPlace === "Other" ? data.businessPlaceOther : data.businessPlace || "Foot Path"}
          />
          <Row label="Goods Type" value={data.goodsType} />
          <Row
            label="Business Timing"
            value={
              data.businessTimingFrom && data.businessTimingTo
                ? `${data.businessTimingFrom} - ${data.businessTimingTo}`
                : ""
            }
          />
          {/* <Row label="Years of Experience" value={data.yearsExperience} /> */}
        </SectionCard>

        <SectionCard title="Documents" onEdit={() => goToStep(4)}>
          {Object.entries(documents).map(([key, doc]) => (
            <Row key={key} label={key.replace(/([A-Z])/g, " $1")} value={doc ? "Uploaded" : "Not uploaded"} />
          ))}
        </SectionCard>
      </div>

      <label className="mt-6 flex items-start gap-2.5 rounded-xl bg-ink-50 p-4 text-xs text-ink-600">
        <input type="checkbox" required className="mt-0.5 h-3.5 w-3.5 accent-[#0EA5A8]" />
        I hereby declare that the information provided above is true and correct to the best of my
        knowledge.
      </label>
    </div>
  );
}