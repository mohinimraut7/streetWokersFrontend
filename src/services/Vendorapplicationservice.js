



import apiClient from "../lib/apiClient";

// Submits the vendor application to POST /api/applications/create as multipart/form-data.
// `documents` values are raw File objects (from <input type="file">).
export async function submitVendorApplication({ personal, address, business, documents, ward }) {
  const formData = new FormData();

  formData.append("personal", JSON.stringify(personal));
  formData.append("address", JSON.stringify(address));
  formData.append("business", JSON.stringify(business));
  // Operational ward (Ward A - Ward I) used for officer routing — defaults to the vendor's own address ward
  formData.append("ward", ward || address.ward || "");

  // `documents[key]` is `{ name, url, type, file }` (from FileUpload.jsx) — we need the
  // actual raw File object, not the whole wrapper, or it serializes as "[object Object]".
  Object.entries(documents || {}).forEach(([key, doc]) => {
    const file = doc?.file instanceof File ? doc.file : doc instanceof File ? doc : null;
    if (file) formData.append(key, file);
  });

  try {
    const { data } = await apiClient.post("/applications/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data; // { success, message, applicationNo, vendorId, data }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not submit the application. Please try again.",
    };
  }
}

// ── Fetch vendor applications (role/ward filtered automatically by the backend, based on the logged-in user) ──
export async function fetchVendorApplications({ status, page = 1, limit = 100 } = {}) {
  try {
    const params = { page, limit };
    if (status) params.status = status;
    const { data } = await apiClient.get("/applications/getAll", { params });
    return data; // { success, data, total, page, totalPages }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not load vendor applications.",
      data: [],
    };
  }
}
export async function deleteVendorApplication(applicationNo) {
  try {
    const { data } = await apiClient.delete(`/applications/${applicationNo}`);
    return data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not delete this application.",
    };
  }
}

// ── Fetch a single application by its applicationNo ──
export async function fetchVendorApplicationByNo(applicationNo) {
  try {
    const { data } = await apiClient.get(`/applications/${applicationNo}`);
    return data; // { success, data }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not load this application.",
    };
  }
}

// ── Survey Officer submits field survey (geo location, photos, comments, recommendation) ──
// recommendation: "Approve" | "Send Back"
export async function submitSurvey(applicationNo, { lat, lng, comments, recommendation, ward, surveyPhotos }) {
  const formData = new FormData();
  if (lat !== undefined && lat !== "") formData.append("lat", lat);
  if (lng !== undefined && lng !== "") formData.append("lng", lng);
  if (comments) formData.append("comments", comments);
  if (recommendation) formData.append("recommendation", recommendation);
  if (ward) formData.append("ward", ward);

  (surveyPhotos || []).forEach((file) => {
    if (file) formData.append("surveyPhotos", file);
  });

  try {
    const { data } = await apiClient.patch(`/applications/survey/${applicationNo}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data; // { success, message, data }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not submit the survey. Please try again.",
    };
  }
}

// ── A.M.C. decision — Approved | Rejected | Sent Back ──
export async function submitAmcDecision(applicationNo, { decision, remarks }) {
  try {
    const { data } = await apiClient.patch(`/applications/amcDecision/${applicationNo}`, { decision, remarks });
    return data; // { success, message, data }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not record the decision. Please try again.",
    };
  }
}

// ── Vendor submits their own Draft application (Draft → Submitted) ──
export async function submitApplicationDraft(applicationNo) {
  try {
    const { data } = await apiClient.patch(`/applications/submit/${applicationNo}`);
    return data; // { success, message, data }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not submit the application.",
    };
  }
}

// ── Counter Officer: forward a Submitted application to the Survey Officer ──
export async function forwardApplicationToSurvey(applicationNo, { ward } = {}) {
  try {
    const { data } = await apiClient.patch(`/applications/forwardToSurvey/${applicationNo}`, ward ? { ward } : {});
    return data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Could not forward this application." };
  }
}

// ── Counter Officer: send the application back to the vendor for corrections ──
export async function sendApplicationBackToVendor(applicationNo, { remarks } = {}) {
  try {
    const { data } = await apiClient.patch(`/applications/sendBackToVendor/${applicationNo}`, { remarks });
    return data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Could not send this application back." };
  }
}

// ── EMERGENCY — Counter Officer bypass: skip Survey/A.M.C./Payment, issue the Smart Card
//    Certificate directly. Temporary shortcut for urgent situations only. ──
export async function emergencyIssueCertificate(applicationNo, { remarks } = {}) {
  try {
    const { data } = await apiClient.patch(`/applications/emergencyIssue/${applicationNo}`, { remarks });
    return data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Could not issue the emergency certificate." };
  }
}

// ── Edit an existing application (Vendor's own Draft/Sent-Back, or Counter Officer/Super Admin any time) ──
export async function updateVendorApplication(applicationNo, { personal, address, business, documents }) {
  const formData = new FormData();
  if (personal) formData.append("personal", JSON.stringify(personal));
  if (address) formData.append("address", JSON.stringify(address));
  if (business) formData.append("business", JSON.stringify(business));

  // Only send documents that were actually re-picked (a real File) — leave the rest untouched on the backend.
  Object.entries(documents || {}).forEach(([key, doc]) => {
    const file = doc?.file instanceof File ? doc.file : doc instanceof File ? doc : null;
    if (file) formData.append(key, file);
  });

  try {
    const { data } = await apiClient.patch(`/applications/update/${applicationNo}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not update the application. Please try again.",
    };
  }
}

// ── Record payment — auto-generates the QR Smart Card on the backend once this succeeds ──
export async function recordVendorPayment(applicationNo, { amount, transactionId, receiptUrl }) {
  try {
    const { data } = await apiClient.patch(`/applications/payment/${applicationNo}`, {
      amount,
      transactionId,
      receiptUrl,
    });
    return data; // { success, message, data }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Payment could not be processed. Please try again.",
    };
  }
}

// ── Public QR verification — no auth required, anyone scanning the Smart Card QR can check it ──
export async function verifyCertificateByApplicationNo(applicationNo) {
  try {
    const { data } = await apiClient.get(`/applications/public/verify/${applicationNo}`);
    return data; // { success, valid, data } — data.status === "Certificate Issued" when success is true
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not verify this certificate.",
    };
  }
}

// ── Counter Officer: bulk-import vendors parsed from an Excel/CSV file ──
// `rows` is a plain array of objects, already mapped on the frontend to:
// { name, mobile, residenceAddress, workingAddress, wardName, roadName, businessType, businessPlace }
export async function bulkImportVendorApplications(rows) {
  try {
    const { data } = await apiClient.post("/applications/bulkImport", { rows });
    return data; // { success, message, createdCount, skippedCount, created, skipped }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Bulk import failed. Please try again.",
    };
  }
}