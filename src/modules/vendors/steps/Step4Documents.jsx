import FileUpload from "../../../components/ui/FileUpload";

const DOC_FIELDS = [
  { key: "photo", label: "Vendor Photograph", hint: "JPG, PNG (Max. 2MB)" },
  { key: "aadhaarCard", label: "Aadhaar Card", hint: "JPG, PNG, PDF (Max. 2MB)" },
  { key: "panCard", label: "PAN Card", hint: "JPG, PNG, PDF (Max. 2MB)" },
  { key: "addressProof", label: "Address Proof", hint: "JPG, PNG, PDF (Max. 2MB)" },
  { key: "businessProof", label: "Business Proof", hint: "JPG, PNG, PDF (Max. 2MB)" },
];

export default function Step4Documents({ documents, setDocuments, errors = {} }) {
  const setDoc = (key, value) => setDocuments((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      <h2 className="font-display text-lg font-bold text-ink-900">Upload Documents</h2>
      <p className="mb-6 mt-1 text-sm text-ink-500">Upload clear and valid documents.</p>

      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
        {DOC_FIELDS.map((f) => (
          <FileUpload
            key={f.key}
            label={f.label}
            // required={f.key !== "businessProof"}
            required={f.key === "aadhaarCard" || f.key === "addressProof"}
            hint={f.hint}
            value={documents[f.key]}
            onChange={(v) => setDoc(f.key, v)}
            error={errors[f.key]}
          />
        ))}
      </div>
    </div>
  );
}
