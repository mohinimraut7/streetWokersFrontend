




function Item({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-ink-50 py-2.5 text-sm last:border-0">
      <span className="text-ink-500">{label}</span>
      <span className="font-semibold text-ink-900">{value || "-"}</span>
    </div>
  );
}

export function PersonalDetailsPanel({ vendor }) {
  const { personal = {}, address = {} } = vendor;
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
      <div>
        <h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-400">
          Personal Information
        </h4>
        {/* REMOVED: Father's Name — no longer shown in the Draft/profile view */}
        {/* <Item label="Father's Name" value={personal.fatherName} /> */}
        <Item label="Date of Birth" value={personal.dob} />
        <Item label="Gender" value={personal.gender} />
        <Item label="Mobile Number" value={personal.mobile} />
        <Item label="Email" value={personal.email} />
        <Item label="Aadhaar Number" value={personal.aadhaar} />
        <Item label="PAN Number" value={personal.pan} />
        <Item label="Category" value={personal.category} />
      </div>
      <div>
        <h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-400">
          Address Information
        </h4>
        <Item label="Residence Address" value={address.permanentAddress} />
        <Item label="Working Address" value={address.currentAddress} />
        <Item label="Ward" value={address.ward} />
        <Item label="Zone" value={address.zone} />
      </div>
    </div>
  );
}

export function BusinessInfoPanel({ vendor }) {
  const { business = {} } = vendor;
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
      <div>
        <Item label="Vendor Type" value={business.vendorType} />
        <Item label="Business Type" value={business.businessType} />
        <Item label="Goods Type" value={business.goodsType} />
      </div>
      <div>
        <Item label="Business Timing" value={business.businessTiming} />
        {/* REMOVED: Years of Experience — field no longer collected */}
        {/* <Item label="Years of Experience" value={business.yearsExperience} /> */}
      </div>
    </div>
  );
}

const DOC_LABELS = {
  photo: "Vendor Photograph",
  aadhaarCard: "Aadhaar Card",
  panCard: "PAN Card",
  addressProof: "Address Proof",
  businessProof: "Business Proof",
};

// A document value can be:
//  - a plain URL string (from the real backend — Cloudinary URL)
//  - a { url, type } object (from the local dummy/session-only draft)
//  - null/undefined (not uploaded)
function normalizeDoc(doc) {
  if (!doc) return null;
  if (typeof doc === "string") {
    const isPdf = doc.toLowerCase().endsWith(".pdf");
    return { url: doc, isImage: !isPdf };
  }
  return { url: doc.url, isImage: doc.type?.startsWith("image/") ?? true };
}

export function DocumentsPanel({ vendor }) {
  const docs = vendor.documents || {};
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {Object.entries(DOC_LABELS).map(([key, label]) => {
        const doc = normalizeDoc(docs[key]);
        return (
          <div key={key} className="overflow-hidden rounded-2xl border border-ink-100">
            <div className="flex h-28 items-center justify-center bg-ink-50">
              {doc?.url && doc.isImage ? (
                <img src={doc.url} alt={label} className="h-full w-full object-cover" />
              ) : doc?.url ? (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-brand-600 underline"
                >
                  View Document
                </a>
              ) : (
                <span className="text-xs text-ink-400">Not uploaded</span>
              )}
            </div>
            <p className="px-3 py-2 text-xs font-semibold text-ink-700">{label}</p>
          </div>
        );
      })}
    </div>
  );
}


