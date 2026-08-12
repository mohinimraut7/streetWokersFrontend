import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud, FiCheckCircle, FiAlertCircle, FiArrowLeft, FiFileText } from "react-icons/fi";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { useAuth } from "../../../modules/auth/hooks/useAuth";
import { bulkImportVendorApplications } from "../../../services/Vendorapplicationservice";

// ── Maps a raw spreadsheet header (any case/spacing) to our internal field name ──
const HEADER_MAP = {
  "sr no": "srNo",
  name: "name",
  "mobile number": "mobile",
  "residence address": "residenceAddress",
  "working address": "workingAddress",
  "ward name": "wardName",
  "road name": "roadName",
  "business type": "businessType",
  "business place": "businessPlace",
};

function normalizeHeader(h) {
  return String(h || "").trim().toLowerCase();
}

// Converts an array of raw parsed rows (keyed by original header) into rows keyed by our field names.
function mapRows(rawRows) {
  return rawRows.map((raw) => {
    const row = {};
    Object.entries(raw).forEach(([key, value]) => {
      const mapped = HEADER_MAP[normalizeHeader(key)];
      if (mapped) row[mapped] = typeof value === "string" ? value.trim() : value;
    });
    return row;
  });
}

export default function BulkImportVendors() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState([]);
  const [parseError, setParseError] = useState("");
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);

  // Only counter_officer (and super_admin, for support) can access this screen
  const allowed = user?.role === "counter_officer" || user?.role === "super_admin";

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParseError("");
    setResult(null);
    setFileName(file.name);

    const ext = file.name.split(".").pop().toLowerCase();

    if (ext === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (res) => setRows(mapRows(res.data)),
        error: (err) => setParseError(err.message || "Could not read this CSV file."),
      });
    } else if (ext === "xlsx" || ext === "xls") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const workbook = XLSX.read(evt.target.result, { type: "binary" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const rawRows = XLSX.utils.sheet_to_json(firstSheet, { defval: "" });
          setRows(mapRows(rawRows));
        } catch (err) {
          setParseError("Could not read this Excel file. Please check the format.");
        }
      };
      reader.onerror = () => setParseError("Could not read this file.");
      reader.readAsBinaryString(file);
    } else {
      setParseError("Only .csv, .xlsx, or .xls files are supported ❌");
    }
  };

  const handleImport = async () => {
    setImporting(true);
    setResult(null);
    const res = await bulkImportVendorApplications(rows);
    setImporting(false);
    setResult(res);
  };

  const resetAll = () => {
    setFileName("");
    setRows([]);
    setParseError("");
    setResult(null);
  };

  if (!allowed) {
    return (
      <Card className="mx-auto max-w-lg py-10 text-center">
        <FiAlertCircle size={28} className="mx-auto text-danger-500" />
        <p className="mt-3 text-sm font-medium text-ink-700">
          You don't have access to bulk import. This screen is for Counter Officers only.
        </p>
        <Button className="mt-5" onClick={() => navigate("/vendors/list")}>
          Back to Vendor List
        </Button>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <button
        type="button"
        onClick={() => navigate("/vendors/list")}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-700"
      >
        <FiArrowLeft size={15} /> Back to Vendor List
      </button>

      <Card className="p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-ink-900">Bulk Import Vendors</h2>
        <p className="mt-1 text-sm text-ink-500">
          Upload an Excel (.xlsx) or CSV file to create multiple vendor applications at once. Imported
          applications are created in <span className="font-semibold text-ink-700">Draft</span> status for your
          review before submission.
        </p>

        <div className="mt-3 rounded-xl bg-ink-50 px-4 py-3 text-xs text-ink-500">
          Expected columns: <span className="font-semibold text-ink-700">NAME, MOBILE NUMBER, RESIDENCE ADDRESS,
          WORKING ADDRESS, WARD NAME, ROAD NAME, Business TYPE, Business Place</span> (column order doesn't matter).
        </div>

        {/* Upload box */}
        {!fileName && (
          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink-200 py-12 text-center hover:border-brand-400 hover:bg-brand-50/40">
            <FiUploadCloud size={28} className="text-ink-400" />
            <p className="text-sm font-semibold text-ink-700">Click to upload .csv, .xlsx, or .xls</p>
            <p className="text-xs text-ink-400">Or drag and drop the file here</p>
            <input type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleFile} />
          </label>
        )}

        {parseError && (
          <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
            {parseError}
          </div>
        )}

        {fileName && !result && (
          <div className="mt-6">
            <div className="flex items-center justify-between rounded-xl border border-ink-100 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <FiFileText className="text-brand-500" size={18} />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{fileName}</p>
                  <p className="text-xs text-ink-500">{rows.length} rows found</p>
                </div>
              </div>
              <button type="button" onClick={resetAll} className="text-xs font-semibold text-danger-500 hover:underline">
                Remove
              </button>
            </div>

            {rows.length > 0 && (
              <div className="mt-4 max-h-80 overflow-auto rounded-xl border border-ink-100">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-ink-50 text-ink-500">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Name</th>
                      <th className="px-3 py-2 font-semibold">Mobile</th>
                      <th className="px-3 py-2 font-semibold">Ward</th>
                      <th className="px-3 py-2 font-semibold">Business Type</th>
                      <th className="px-3 py-2 font-semibold">Business Place</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice(0, 50).map((r, i) => (
                      <tr key={i} className="border-t border-ink-100 text-ink-700">
                        <td className="px-3 py-2">{r.name || "—"}</td>
                        <td className="px-3 py-2">{r.mobile || "—"}</td>
                        <td className="px-3 py-2">{r.wardName || "—"}</td>
                        <td className="px-3 py-2">{r.businessType || "—"}</td>
                        <td className="px-3 py-2">{r.businessPlace || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rows.length > 50 && (
                  <p className="border-t border-ink-100 px-3 py-2 text-[11px] text-ink-400">
                    Showing first 50 of {rows.length} rows — all rows will be imported.
                  </p>
                )}
              </div>
            )}

            <div className="mt-5 flex justify-end gap-3">
              <Button variant="outline" onClick={resetAll} disabled={importing}>
                Cancel
              </Button>
              <Button onClick={handleImport} disabled={importing || rows.length === 0}>
                {importing ? "Importing..." : `Import ${rows.length} Vendors`}
              </Button>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-6">
            {result.success ? (
              <div className="flex items-start gap-2.5 rounded-xl border border-success-200 bg-success-50 px-4 py-3 text-sm font-medium text-success-700">
                <FiCheckCircle className="mt-0.5 shrink-0" size={16} />
                {result.message}
              </div>
            ) : (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
                {result.message}
              </div>
            )}

            {result.skipped?.length > 0 && (
              <div className="mt-4 max-h-64 overflow-auto rounded-xl border border-amber-200 bg-amber-50 p-3">
                <p className="mb-2 text-xs font-semibold text-amber-700">Skipped rows ({result.skipped.length}):</p>
                <ul className="space-y-1 text-xs text-amber-700">
                  {result.skipped.map((s, i) => (
                    <li key={i}>Row {s.row}: {s.reason}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-5 flex justify-end gap-3">
              <Button variant="outline" onClick={resetAll}>
                Import Another File
              </Button>
              <Button onClick={() => navigate("/vendors/list")}>Go to Vendor List</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}