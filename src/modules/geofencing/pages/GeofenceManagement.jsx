// ══════════════════════════════════════════════════════════
//  Geofencing / No Feriwala Areas — Admin Management Page
//  Feature: No Feriwala Area Geofencing
// ══════════════════════════════════════════════════════════
// A.M.C. / super_admin can view, create, edit, activate/deactivate, and delete
// restricted-vendor-area polygons. Supports multiple geofences (not hardcoded
// to a single "No Feriwala Area").
import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiEdit2, FiLoader, FiAlertCircle, FiMapPin, FiToggleLeft, FiToggleRight, FiX } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { Input, Textarea, Select } from "../../../components/ui/Field";
import {
  fetchGeofences,
  createGeofence,
  updateGeofence,
  deleteGeofence,
} from "../../../services/geofenceService";

// Pretty-printed example so admins know the exact shape expected (GeoJSON order: [lng, lat])
const COORDINATES_PLACEHOLDER = `[
  [72.8119891, 19.4553061],
  [72.8118175, 19.4552682],
  [72.8117209, 19.4551367],
  [72.8115439, 19.4549520],
  [72.8114956, 19.4548585],
  [72.8117209, 19.4548129],
  [72.8120160, 19.4549217],
  [72.8121715, 19.4551266],
  [72.8122010, 19.4552935],
  [72.8119891, 19.4553061]
]`;

const emptyForm = { name: "", description: "", status: "active", coordinatesText: COORDINATES_PLACEHOLDER };

export default function GeofenceManagement() {
  const [geofences, setGeofences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadGeofences = () => {
    setLoading(true);
    setError("");
    fetchGeofences().then((result) => {
      setLoading(false);
      if (!result.success) {
        setError(result.message || "Could not load geofences.");
        return;
      }
      setGeofences(result.data || []);
    });
  };

  useEffect(() => {
    loadGeofences();
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (g) => {
    setEditingId(g._id);
    setForm({
      name: g.name || "",
      description: g.description || "",
      status: g.status || "active",
      coordinatesText: JSON.stringify(g.location?.coordinates?.[0] || [], null, 2),
    });
    setFormError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
  };

  const handleSave = async () => {
    setFormError("");
    if (!form.name.trim()) {
      setFormError("Area name is required.");
      return;
    }

    let ring;
    try {
      ring = JSON.parse(form.coordinatesText);
      if (!Array.isArray(ring)) throw new Error();
    } catch {
      setFormError("Coordinates must be valid JSON — an array of [longitude, latitude] points.");
      return;
    }

    setSaving(true);
    const payload = {
      name: form.name,
      description: form.description,
      status: form.status,
      coordinates: [ring], // Polygon coordinates = array of rings
    };

    const result = editingId ? await updateGeofence(editingId, payload) : await createGeofence(payload);
    setSaving(false);

    if (!result.success) {
      setFormError(result.message || "Could not save the geofence. Please check the coordinates and try again.");
      return;
    }

    closeForm();
    loadGeofences();
  };

  const handleToggleStatus = async (g) => {
    const nextStatus = g.status === "active" ? "inactive" : "active";
    const result = await updateGeofence(g._id, { status: nextStatus });
    if (result.success) loadGeofences();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this geofenced area? This cannot be undone.")) return;
    setDeletingId(id);
    const result = await deleteGeofence(id);
    setDeletingId(null);
    if (result.success) loadGeofences();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold text-ink-900">Geofencing / No Feriwala Areas</h1>
          <p className="text-sm text-ink-500">Manage restricted vendor areas. Vendors cannot be surveyed or issued an ID card inside an active area.</p>
        </div>
        <Button icon={FiPlus} onClick={openCreateForm}>
          Add Area
        </Button>
      </div>

      {showForm && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-ink-900">{editingId ? "Edit Area" : "New Restricted Area"}</h2>
            <button type="button" onClick={closeForm} className="text-ink-400 hover:text-ink-700">
              <FiX size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Area Name"
              required
              placeholder="No Feriwala Area"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <Select
              label="Status"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </div>

          <Textarea
            label="Description"
            placeholder="Street vending is restricted inside this zone."
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />

          <Textarea
            label="Polygon Coordinates (JSON — [longitude, latitude] pairs, closed ring)"
            hint="Paste the exact coordinates array from Google My Maps / GeoJSON export. First and last point must match."
            className="font-mono text-xs"
            rows={10}
            value={form.coordinatesText}
            onChange={(e) => setForm((f) => ({ ...f, coordinatesText: e.target.value }))}
          />

          {formError && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
              {formError}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-ink-100 pt-4">
            <Button variant="outline" onClick={closeForm} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editingId ? "Save Changes" : "Create Area"}
            </Button>
          </div>
        </Card>
      )}

      <Card padded={false} className="overflow-hidden">
        {error && (
          <div className="flex items-center justify-center gap-2 px-5 py-6 text-sm font-medium text-danger-500">
            <FiAlertCircle size={16} />
            {error}
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-5 py-10 text-sm text-ink-400">
            <FiLoader className="animate-spin" size={16} />
            Loading geofences...
          </div>
        ) : (
          <div className="scrollbar-thin overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
                  <th className="px-5 py-3 font-semibold">Area Name</th>
                  <th className="px-5 py-3 font-semibold">Description</th>
                  <th className="px-5 py-3 font-semibold">Points</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {geofences.map((g) => (
                  <tr key={g._id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
                    <td className="px-5 py-3.5 font-semibold text-ink-900">
                      <span className="inline-flex items-center gap-1.5">
                        <FiMapPin className="text-red-500" size={14} /> {g.name}
                      </span>
                    </td>
                    <td className="max-w-xs truncate px-5 py-3.5 text-ink-500">{g.description || "—"}</td>
                    <td className="px-5 py-3.5 text-ink-500">{(g.location?.coordinates?.[0]?.length || 0) - 1} pts</td>
                    <td className="px-5 py-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(g)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          g.status === "active" ? "bg-red-100 text-red-700" : "bg-ink-100 text-ink-500"
                        }`}
                      >
                        {g.status === "active" ? <FiToggleRight size={14} /> : <FiToggleLeft size={14} />}
                        {g.status === "active" ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="inline-flex items-center gap-3">
                        <button type="button" onClick={() => openEditForm(g)} className="text-ink-400 hover:text-brand-600">
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(g._id)}
                          disabled={deletingId === g._id}
                          className="text-ink-400 hover:text-danger-500"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {geofences.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-sm text-ink-400">
                      No geofenced areas yet. Click "Add Area" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}