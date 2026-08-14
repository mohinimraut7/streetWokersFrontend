

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);
//   const [existingBusinessType, setExistingBusinessType] = useState("");

//   const {
//     register,
//     reset,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessType: app.business?.businessType || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });

//       // ── Business Type may hold a raw/legacy value (e.g. from a bulk-imported Excel row)
//       //    that doesn't exactly match any option in BUSINESS_CATEGORY_OPTIONS. Track it so the
//       //    dropdown can show it instead of falling back to a blank "Select option". ──
//       setExistingBusinessType(app.business?.businessType || "");
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   // ── The extra "current value" option only exists in the DOM after this state updates and
//   //    the component re-renders — so re-apply the value here, once that option is present,
//   //    or the native <select> stays blank (it couldn't match anything on the first pass).
//   //    Also resolves case-mismatch: DB may hold "FISH" while the list has "Fish" — the native
//   //    <select> only matches exact strings, so we switch to the option's exact casing when one
//   //    matches, and only fall back to the raw value when nothing matches at all. ──
//   useEffect(() => {
//     if (!existingBusinessType) return;
//     const matched = BUSINESS_CATEGORY_OPTIONS.find(
//       (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
//     );
//     setValue("businessType", matched ? matched.value : existingBusinessType);
//   }, [existingBusinessType, setValue]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessType: data.businessType,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
//               {/* REMOVED: Father's Name — no longer collected */}
//               {/* <Input label="Father's Name" {...register("fatherName")} /> */}
//               <Input type="date" label="Date of Birth" {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" {...register("email")} />
//               <Input label="Aadhaar Number" {...register("aadhaar")} />
//               <Input label="PAN Number" {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Residence Address" {...register("permanentAddress")} />
//               <Input label="Working Address" {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} {...register("vendorType")} />
//               <Select
//                 label="Business Type"
//                 options={
//                   existingBusinessType &&
//                   !BUSINESS_CATEGORY_OPTIONS.some(
//                     (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
//                   )
//                     ? [{ value: existingBusinessType, label: `${existingBusinessType} (current)` }, ...BUSINESS_CATEGORY_OPTIONS]
//                     : BUSINESS_CATEGORY_OPTIONS
//                 }
//                 {...register("businessType")}
//               />
//               <Input label="Goods Type" {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" {...register("businessTiming")} />
//               {/* REMOVED: Years of Experience — field no longer collected */}
//               {/* <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} /> */}
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <FileUpload
//                   key={f.key}
//                   label={f.label}
//                   value={documents[f.key]}
//                   onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           </div>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }



// ======================================


// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);

//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessCategory: app.business?.businessCategory || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessCategory: data.businessCategory,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
//               <Input label="Father's Name" {...register("fatherName")} />
//               <Input type="date" label="Date of Birth" {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" {...register("email")} />
//               <Input label="Aadhaar Number" {...register("aadhaar")} />
//               <Input label="PAN Number" {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Permanent Address" {...register("permanentAddress")} />
//               <Input label="Current Address" {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} {...register("vendorType")} />
//               <Select label="Business Category" options={BUSINESS_CATEGORY_OPTIONS} {...register("businessCategory")} />
//               <Input label="Goods Type" {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" {...register("businessTiming")} />
//               <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <FileUpload
//                   key={f.key}
//                   label={f.label}
//                   value={documents[f.key]}
//                   onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           </div>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }



// ===========================

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);

//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessType: app.business?.businessType || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessType: data.businessType,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
//               <Input label="Father's Name" {...register("fatherName")} />
//               <Input type="date" label="Date of Birth" {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" {...register("email")} />
//               <Input label="Aadhaar Number" {...register("aadhaar")} />
//               <Input label="PAN Number" {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Permanent Address" {...register("permanentAddress")} />
//               <Input label="Current Address" {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} {...register("vendorType")} />
//               <Select label="Business Type" options={BUSINESS_CATEGORY_OPTIONS} {...register("businessType")} />
//               <Input label="Goods Type" {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" {...register("businessTiming")} />
//               <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <FileUpload
//                   key={f.key}
//                   label={f.label}
//                   value={documents[f.key]}
//                   onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           </div>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }

// ==================================

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);
//   const [existingBusinessType, setExistingBusinessType] = useState("");

//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessType: app.business?.businessType || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });

//       // ── Business Type may hold a raw/legacy value (e.g. from a bulk-imported Excel row)
//       //    that doesn't exactly match any option in BUSINESS_CATEGORY_OPTIONS. Track it so the
//       //    dropdown can show it instead of falling back to a blank "Select option". ──
//       setExistingBusinessType(app.business?.businessType || "");
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessType: data.businessType,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
//               {/* REMOVED: Father's Name — no longer collected */}
//               {/* <Input label="Father's Name" {...register("fatherName")} /> */}
//               <Input type="date" label="Date of Birth" {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" {...register("email")} />
//               <Input label="Aadhaar Number" {...register("aadhaar")} />
//               <Input label="PAN Number" {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Residence Address" {...register("permanentAddress")} />
//               <Input label="Working Address" {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} {...register("vendorType")} />
//               <Select
//                 label="Business Type"
//                 options={
//                   existingBusinessType &&
//                   !BUSINESS_CATEGORY_OPTIONS.some(
//                     (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
//                   )
//                     ? [{ value: existingBusinessType, label: `${existingBusinessType} (current)` }, ...BUSINESS_CATEGORY_OPTIONS]
//                     : BUSINESS_CATEGORY_OPTIONS
//                 }
//                 {...register("businessType")}
//               />
//               <Input label="Goods Type" {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" {...register("businessTiming")} />
//               {/* REMOVED: Years of Experience — field no longer collected */}
//               {/* <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} /> */}
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <FileUpload
//                   key={f.key}
//                   label={f.label}
//                   value={documents[f.key]}
//                   onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           </div>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }

// =====================================================
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);
//   const [existingBusinessType, setExistingBusinessType] = useState("");

//   const {
//     register,
//     reset,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessType: app.business?.businessType || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });

//       // ── Business Type may hold a raw/legacy value (e.g. from a bulk-imported Excel row)
//       //    that doesn't exactly match any option in BUSINESS_CATEGORY_OPTIONS. Track it so the
//       //    dropdown can show it instead of falling back to a blank "Select option". ──
//       setExistingBusinessType(app.business?.businessType || "");
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   // ── The extra "current value" option only exists in the DOM after this state updates and
//   //    the component re-renders — so re-apply the value here, once that option is present,
//   //    or the native <select> stays blank (it couldn't match anything on the first pass).
//   //    Also resolves case-mismatch: DB may hold "FISH" while the list has "Fish" — the native
//   //    <select> only matches exact strings, so we switch to the option's exact casing when one
//   //    matches, and only fall back to the raw value when nothing matches at all. ──
//   useEffect(() => {
//     if (!existingBusinessType) return;
//     const matched = BUSINESS_CATEGORY_OPTIONS.find(
//       (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
//     );
//     setValue("businessType", matched ? matched.value : existingBusinessType);
//   }, [existingBusinessType, setValue]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessType: data.businessType,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         {/* ── Editing is currently disabled (28-10 request) — form can still be opened and
//             reviewed, but no field can be changed right now. Not removed, just locked. ── */}
//         <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
//           <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//           Editing is currently disabled. You can view the application details below, but changes cannot be saved right now.
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <fieldset disabled className="m-0 min-w-0 space-y-8 border-0 p-0">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
//               {/* REMOVED: Father's Name — no longer collected */}
//               {/* <Input label="Father's Name" {...register("fatherName")} /> */}
//               <Input type="date" label="Date of Birth" {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" {...register("email")} />
//               <Input label="Aadhaar Number" {...register("aadhaar")} />
//               <Input label="PAN Number" {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Residence Address" {...register("permanentAddress")} />
//               <Input label="Working Address" {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} {...register("vendorType")} />
//               <Select
//                 label="Business Type"
//                 options={
//                   existingBusinessType &&
//                   !BUSINESS_CATEGORY_OPTIONS.some(
//                     (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
//                   )
//                     ? [{ value: existingBusinessType, label: `${existingBusinessType} (current)` }, ...BUSINESS_CATEGORY_OPTIONS]
//                     : BUSINESS_CATEGORY_OPTIONS
//                 }
//                 {...register("businessType")}
//               />
//               <Input label="Goods Type" {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" {...register("businessTiming")} />
//               {/* REMOVED: Years of Experience — field no longer collected */}
//               {/* <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} /> */}
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <div key={f.key} className="pointer-events-none opacity-70">
//                   <FileUpload
//                     label={f.label}
//                     value={documents[f.key]}
//                     onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//           </fieldset>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             {/* Save disabled while editing is turned off (28-10 request) — onSubmit/updateVendorApplication
//                 call is left completely intact for when editing is switched back on. */}
//             <Button type="submit" variant="success" icon={FiSave} disabled>
//               Editing Disabled
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);
//   const [existingBusinessType, setExistingBusinessType] = useState("");

//   const {
//     register,
//     reset,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessType: app.business?.businessType || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });

//       // ── Business Type may hold a raw/legacy value (e.g. from a bulk-imported Excel row)
//       //    that doesn't exactly match any option in BUSINESS_CATEGORY_OPTIONS. Track it so the
//       //    dropdown can show it instead of falling back to a blank "Select option". ──
//       setExistingBusinessType(app.business?.businessType || "");
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   // ── The extra "current value" option only exists in the DOM after this state updates and
//   //    the component re-renders — so re-apply the value here, once that option is present,
//   //    or the native <select> stays blank (it couldn't match anything on the first pass).
//   //    Also resolves case-mismatch: DB may hold "FISH" while the list has "Fish" — the native
//   //    <select> only matches exact strings, so we switch to the option's exact casing when one
//   //    matches, and only fall back to the raw value when nothing matches at all. ──
//   useEffect(() => {
//     if (!existingBusinessType) return;
//     const matched = BUSINESS_CATEGORY_OPTIONS.find(
//       (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
//     );
//     setValue("businessType", matched ? matched.value : existingBusinessType);
//   }, [existingBusinessType, setValue]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessType: data.businessType,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
//               {/* REMOVED: Father's Name — no longer collected */}
//               {/* <Input label="Father's Name" {...register("fatherName")} /> */}
//               <Input type="date" label="Date of Birth" {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" {...register("email")} />
//               <Input label="Aadhaar Number" {...register("aadhaar")} />
//               <Input label="PAN Number" {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Residence Address" {...register("permanentAddress")} />
//               <Input label="Working Address" {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} {...register("vendorType")} />
//               <Select
//                 label="Business Type"
//                 options={
//                   existingBusinessType &&
//                   !BUSINESS_CATEGORY_OPTIONS.some(
//                     (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
//                   )
//                     ? [{ value: existingBusinessType, label: `${existingBusinessType} (current)` }, ...BUSINESS_CATEGORY_OPTIONS]
//                     : BUSINESS_CATEGORY_OPTIONS
//                 }
//                 {...register("businessType")}
//               />
//               <Input label="Goods Type" {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" {...register("businessTiming")} />
//               {/* REMOVED: Years of Experience — field no longer collected */}
//               {/* <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} /> */}
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <FileUpload
//                   key={f.key}
//                   label={f.label}
//                   value={documents[f.key]}
//                   onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           </div>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }



// ======================================


// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);

//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessCategory: app.business?.businessCategory || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessCategory: data.businessCategory,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
//               <Input label="Father's Name" {...register("fatherName")} />
//               <Input type="date" label="Date of Birth" {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" {...register("email")} />
//               <Input label="Aadhaar Number" {...register("aadhaar")} />
//               <Input label="PAN Number" {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Permanent Address" {...register("permanentAddress")} />
//               <Input label="Current Address" {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} {...register("vendorType")} />
//               <Select label="Business Category" options={BUSINESS_CATEGORY_OPTIONS} {...register("businessCategory")} />
//               <Input label="Goods Type" {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" {...register("businessTiming")} />
//               <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <FileUpload
//                   key={f.key}
//                   label={f.label}
//                   value={documents[f.key]}
//                   onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           </div>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }



// ===========================

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);

//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessType: app.business?.businessType || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessType: data.businessType,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
//               <Input label="Father's Name" {...register("fatherName")} />
//               <Input type="date" label="Date of Birth" {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" {...register("email")} />
//               <Input label="Aadhaar Number" {...register("aadhaar")} />
//               <Input label="PAN Number" {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Permanent Address" {...register("permanentAddress")} />
//               <Input label="Current Address" {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} {...register("vendorType")} />
//               <Select label="Business Type" options={BUSINESS_CATEGORY_OPTIONS} {...register("businessType")} />
//               <Input label="Goods Type" {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" {...register("businessTiming")} />
//               <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <FileUpload
//                   key={f.key}
//                   label={f.label}
//                   value={documents[f.key]}
//                   onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           </div>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }

// ==================================

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);
//   const [existingBusinessType, setExistingBusinessType] = useState("");

//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessType: app.business?.businessType || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });

//       // ── Business Type may hold a raw/legacy value (e.g. from a bulk-imported Excel row)
//       //    that doesn't exactly match any option in BUSINESS_CATEGORY_OPTIONS. Track it so the
//       //    dropdown can show it instead of falling back to a blank "Select option". ──
//       setExistingBusinessType(app.business?.businessType || "");
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessType: data.businessType,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
//               {/* REMOVED: Father's Name — no longer collected */}
//               {/* <Input label="Father's Name" {...register("fatherName")} /> */}
//               <Input type="date" label="Date of Birth" {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" {...register("email")} />
//               <Input label="Aadhaar Number" {...register("aadhaar")} />
//               <Input label="PAN Number" {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Residence Address" {...register("permanentAddress")} />
//               <Input label="Working Address" {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} {...register("vendorType")} />
//               <Select
//                 label="Business Type"
//                 options={
//                   existingBusinessType &&
//                   !BUSINESS_CATEGORY_OPTIONS.some(
//                     (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
//                   )
//                     ? [{ value: existingBusinessType, label: `${existingBusinessType} (current)` }, ...BUSINESS_CATEGORY_OPTIONS]
//                     : BUSINESS_CATEGORY_OPTIONS
//                 }
//                 {...register("businessType")}
//               />
//               <Input label="Goods Type" {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" {...register("businessTiming")} />
//               {/* REMOVED: Years of Experience — field no longer collected */}
//               {/* <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} /> */}
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <FileUpload
//                   key={f.key}
//                   label={f.label}
//                   value={documents[f.key]}
//                   onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           </div>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }

// =====================================================
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);
//   const [existingBusinessType, setExistingBusinessType] = useState("");

//   // ── Fields that already hold a value stay locked; only genuinely empty fields (and the
//   //    Documents section, always) can be edited — applies to every role (29-10 request). ──
//   const hasValue = (v) => v !== undefined && v !== null && String(v).trim() !== "";

//   const {
//     register,
//     reset,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessType: app.business?.businessType || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });

//       // ── Business Type may hold a raw/legacy value (e.g. from a bulk-imported Excel row)
//       //    that doesn't exactly match any option in BUSINESS_CATEGORY_OPTIONS. Track it so the
//       //    dropdown can show it instead of falling back to a blank "Select option". ──
//       setExistingBusinessType(app.business?.businessType || "");
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   // ── The extra "current value" option only exists in the DOM after this state updates and
//   //    the component re-renders — so re-apply the value here, once that option is present,
//   //    or the native <select> stays blank (it couldn't match anything on the first pass).
//   //    Also resolves case-mismatch: DB may hold "FISH" while the list has "Fish" — the native
//   //    <select> only matches exact strings, so we switch to the option's exact casing when one
//   //    matches, and only fall back to the raw value when nothing matches at all. ──
//   useEffect(() => {
//     if (!existingBusinessType) return;
//     const matched = BUSINESS_CATEGORY_OPTIONS.find(
//       (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
//     );
//     setValue("businessType", matched ? matched.value : existingBusinessType);
//   }, [existingBusinessType, setValue]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessType: data.businessType,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         {/* ── Editing rule (29-10 request): fields that already have a value stay locked;
//             only empty fields can be filled in, and Documents can always be replaced. ── */}
//         <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
//           <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//          Only fields with empty values are editable.
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} disabled={hasValue(vendor.personal?.fullName)} {...register("fullName", { required: "Required" })} />
//               {/* REMOVED: Father's Name — no longer collected */}
//               {/* <Input label="Father's Name" {...register("fatherName")} /> */}
//               <Input type="date" label="Date of Birth" disabled={hasValue(vendor.personal?.dob)} {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} disabled={hasValue(vendor.personal?.gender)} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} disabled={hasValue(vendor.personal?.mobile)} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" disabled={hasValue(vendor.personal?.email)} {...register("email")} />
//               <Input label="Aadhaar Number" disabled={hasValue(vendor.personal?.aadhaar)} {...register("aadhaar")} />
//               <Input label="PAN Number" disabled={hasValue(vendor.personal?.pan)} {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} disabled={hasValue(vendor.personal?.category)} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Residence Address" disabled={hasValue(vendor.address?.permanentAddress)} {...register("permanentAddress")} />
//               <Input label="Working Address" disabled={hasValue(vendor.address?.currentAddress)} {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} disabled={hasValue(vendor.address?.ward)} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} disabled={hasValue(vendor.address?.zone)} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} disabled={hasValue(vendor.business?.vendorType)} {...register("vendorType")} />
//               <Select
//                 label="Business Type"
//                 disabled={hasValue(vendor.business?.businessType)}
//                 options={
//                   existingBusinessType &&
//                   !BUSINESS_CATEGORY_OPTIONS.some(
//                     (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
//                   )
//                     ? [{ value: existingBusinessType, label: `${existingBusinessType} (current)` }, ...BUSINESS_CATEGORY_OPTIONS]
//                     : BUSINESS_CATEGORY_OPTIONS
//                 }
//                 {...register("businessType")}
//               />
//               <Input label="Goods Type" disabled={hasValue(vendor.business?.goodsType)} {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" disabled={hasValue(vendor.business?.businessTiming)} {...register("businessTiming")} />
//               {/* REMOVED: Years of Experience — field no longer collected */}
//               {/* <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} /> */}
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <FileUpload
//                   key={f.key}
//                   label={f.label}
//                   value={documents[f.key]}
//                   onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           </div>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);
//   const [existingBusinessType, setExistingBusinessType] = useState("");

//   const {
//     register,
//     reset,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessType: app.business?.businessType || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });

//       // ── Business Type may hold a raw/legacy value (e.g. from a bulk-imported Excel row)
//       //    that doesn't exactly match any option in BUSINESS_CATEGORY_OPTIONS. Track it so the
//       //    dropdown can show it instead of falling back to a blank "Select option". ──
//       setExistingBusinessType(app.business?.businessType || "");
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   // ── The extra "current value" option only exists in the DOM after this state updates and
//   //    the component re-renders — so re-apply the value here, once that option is present,
//   //    or the native <select> stays blank (it couldn't match anything on the first pass).
//   //    Also resolves case-mismatch: DB may hold "FISH" while the list has "Fish" — the native
//   //    <select> only matches exact strings, so we switch to the option's exact casing when one
//   //    matches, and only fall back to the raw value when nothing matches at all. ──
//   useEffect(() => {
//     if (!existingBusinessType) return;
//     const matched = BUSINESS_CATEGORY_OPTIONS.find(
//       (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
//     );
//     setValue("businessType", matched ? matched.value : existingBusinessType);
//   }, [existingBusinessType, setValue]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessType: data.businessType,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
//               {/* REMOVED: Father's Name — no longer collected */}
//               {/* <Input label="Father's Name" {...register("fatherName")} /> */}
//               <Input type="date" label="Date of Birth" {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" {...register("email")} />
//               <Input label="Aadhaar Number" {...register("aadhaar")} />
//               <Input label="PAN Number" {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Residence Address" {...register("permanentAddress")} />
//               <Input label="Working Address" {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} {...register("vendorType")} />
//               <Select
//                 label="Business Type"
//                 options={
//                   existingBusinessType &&
//                   !BUSINESS_CATEGORY_OPTIONS.some(
//                     (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
//                   )
//                     ? [{ value: existingBusinessType, label: `${existingBusinessType} (current)` }, ...BUSINESS_CATEGORY_OPTIONS]
//                     : BUSINESS_CATEGORY_OPTIONS
//                 }
//                 {...register("businessType")}
//               />
//               <Input label="Goods Type" {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" {...register("businessTiming")} />
//               {/* REMOVED: Years of Experience — field no longer collected */}
//               {/* <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} /> */}
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <FileUpload
//                   key={f.key}
//                   label={f.label}
//                   value={documents[f.key]}
//                   onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           </div>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }



// ======================================


// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);

//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessCategory: app.business?.businessCategory || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessCategory: data.businessCategory,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
//               <Input label="Father's Name" {...register("fatherName")} />
//               <Input type="date" label="Date of Birth" {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" {...register("email")} />
//               <Input label="Aadhaar Number" {...register("aadhaar")} />
//               <Input label="PAN Number" {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Permanent Address" {...register("permanentAddress")} />
//               <Input label="Current Address" {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} {...register("vendorType")} />
//               <Select label="Business Category" options={BUSINESS_CATEGORY_OPTIONS} {...register("businessCategory")} />
//               <Input label="Goods Type" {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" {...register("businessTiming")} />
//               <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <FileUpload
//                   key={f.key}
//                   label={f.label}
//                   value={documents[f.key]}
//                   onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           </div>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }



// ===========================

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);

//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessType: app.business?.businessType || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessType: data.businessType,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
//               <Input label="Father's Name" {...register("fatherName")} />
//               <Input type="date" label="Date of Birth" {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" {...register("email")} />
//               <Input label="Aadhaar Number" {...register("aadhaar")} />
//               <Input label="PAN Number" {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Permanent Address" {...register("permanentAddress")} />
//               <Input label="Current Address" {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} {...register("vendorType")} />
//               <Select label="Business Type" options={BUSINESS_CATEGORY_OPTIONS} {...register("businessType")} />
//               <Input label="Goods Type" {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" {...register("businessTiming")} />
//               <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <FileUpload
//                   key={f.key}
//                   label={f.label}
//                   value={documents[f.key]}
//                   onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           </div>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }

// ==================================

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import { Input, Select } from "../../../components/ui/Field";
// import FileUpload from "../../../components/ui/FileUpload";
// import {
//   GENDER_OPTIONS,
//   CATEGORY_OPTIONS,
//   WARD_OPTIONS,
//   ZONE_OPTIONS,
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";
// import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

// const DOC_FIELDS = [
//   { key: "photo", label: "Vendor Photograph" },
//   { key: "aadhaarCard", label: "Aadhaar Card" },
//   { key: "panCard", label: "PAN Card" },
//   { key: "addressProof", label: "Address Proof" },
//   { key: "businessProof", label: "Business Proof" },
// ];

// // Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
// function docUrlToValue(url) {
//   if (!url) return null;
//   const isPdf = url.toLowerCase().endsWith(".pdf");
//   return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
// }

// export default function EditVendorApplication() {
//   const { id: applicationNo } = useParams();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [documents, setDocuments] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saved, setSaved] = useState(false);
//   const [existingBusinessType, setExistingBusinessType] = useState("");

//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Application not found.");
//         return;
//       }
//       const app = result.data;
//       setVendor(app);
//       reset({
//         fullName: app.personal?.fullName || "",
//         fatherName: app.personal?.fatherName || "",
//         dob: app.personal?.dob || "",
//         gender: app.personal?.gender || "",
//         mobile: app.personal?.mobile || "",
//         email: app.personal?.email || "",
//         aadhaar: app.personal?.aadhaar || "",
//         pan: app.personal?.pan || "",
//         category: app.personal?.category || "",
//         permanentAddress: app.address?.permanentAddress || "",
//         currentAddress: app.address?.currentAddress || "",
//         ward: app.address?.ward || "",
//         zone: app.address?.zone || "",
//         vendorType: app.business?.vendorType || "",
//         businessType: app.business?.businessType || "",
//         goodsType: app.business?.goodsType || "",
//         businessTiming: app.business?.businessTiming || "",
//         yearsExperience: app.business?.yearsExperience || "",
//       });
//       setDocuments({
//         photo: docUrlToValue(app.documents?.photo),
//         aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
//         panCard: docUrlToValue(app.documents?.panCard),
//         addressProof: docUrlToValue(app.documents?.addressProof),
//         businessProof: docUrlToValue(app.documents?.businessProof),
//       });

//       // ── Business Type may hold a raw/legacy value (e.g. from a bulk-imported Excel row)
//       //    that doesn't exactly match any option in BUSINESS_CATEGORY_OPTIONS. Track it so the
//       //    dropdown can show it instead of falling back to a blank "Select option". ──
//       setExistingBusinessType(app.business?.businessType || "");
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, reset]);

//   const onSubmit = async (data) => {
//     setSaveError("");
//     setSaving(true);

//     const personal = {
//       fullName: data.fullName,
//       fatherName: data.fatherName,
//       dob: data.dob,
//       gender: data.gender,
//       mobile: data.mobile,
//       email: data.email,
//       aadhaar: data.aadhaar,
//       pan: data.pan,
//       category: data.category,
//     };
//     const address = {
//       permanentAddress: data.permanentAddress,
//       currentAddress: data.currentAddress,
//       ward: data.ward,
//       zone: data.zone,
//     };
//     const business = {
//       vendorType: data.vendorType,
//       businessType: data.businessType,
//       goodsType: data.goodsType,
//       businessTiming: data.businessTiming,
//       yearsExperience: data.yearsExperience,
//     };

//     const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
//     setSaving(false);

//     if (!result.success) {
//       setSaveError(result.message || "Could not save your changes. Please try again.");
//       return;
//     }
//     setSaved(true);
//   };

//   if (loading) {
//     return (
//       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
//         <FiLoader className="animate-spin" size={20} />
//         Loading application...
//       </Card>
//     );
//   }

//   if (loadError || !vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
//         <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
//         <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Vendor List
//         </Link>
//       </Card>
//     );
//   }

//   if (saved) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           The application has been updated.
//           {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
//         </p>
//         <div className="mt-6 flex gap-3">
//           <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link
//         to={`/vendors/profile/${applicationNo}`}
//         className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
//       >
//         <FiArrowLeft size={14} /> Back to Application
//       </Link>

//       <Card>
//         <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
//         <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Full Name" required error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
//               {/* REMOVED: Father's Name — no longer collected */}
//               {/* <Input label="Father's Name" {...register("fatherName")} /> */}
//               <Input type="date" label="Date of Birth" {...register("dob")} />
//               <Select label="Gender" options={GENDER_OPTIONS} {...register("gender")} />
//               <Input label="Mobile Number" required error={errors.mobile?.message} {...register("mobile", { required: "Required" })} />
//               <Input type="email" label="Email" {...register("email")} />
//               <Input label="Aadhaar Number" {...register("aadhaar")} />
//               <Input label="PAN Number" {...register("pan")} />
//               <Select label="Category" options={CATEGORY_OPTIONS} {...register("category")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//               <Input label="Residence Address" {...register("permanentAddress")} />
//               <Input label="Working Address" {...register("currentAddress")} />
//               <Select label="Ward" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone" options={ZONE_OPTIONS} {...register("zone")} />
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} {...register("vendorType")} />
//               <Select
//                 label="Business Type"
//                 options={
//                   existingBusinessType &&
//                   !BUSINESS_CATEGORY_OPTIONS.some(
//                     (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
//                   )
//                     ? [{ value: existingBusinessType, label: `${existingBusinessType} (current)` }, ...BUSINESS_CATEGORY_OPTIONS]
//                     : BUSINESS_CATEGORY_OPTIONS
//                 }
//                 {...register("businessType")}
//               />
//               <Input label="Goods Type" {...register("goodsType")} />
//               <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" {...register("businessTiming")} />
//               {/* REMOVED: Years of Experience — field no longer collected */}
//               {/* <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} /> */}
//             </div>
//           </div>

//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
//             <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
//               {DOC_FIELDS.map((f) => (
//                 <FileUpload
//                   key={f.key}
//                   label={f.label}
//                   value={documents[f.key]}
//                   onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           </div>

//           {saveError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {saveError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               icon={FiArrowLeft}
//               onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }

// =====================================================
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiLoader, FiAlertCircle, FiSave } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { Input, Select } from "../../../components/ui/Field";
import FileUpload from "../../../components/ui/FileUpload";
import {
  GENDER_OPTIONS,
  CATEGORY_OPTIONS,
  WARD_OPTIONS,
  ZONE_OPTIONS,
  VENDOR_TYPE_OPTIONS,
  BUSINESS_CATEGORY_OPTIONS,
  EXPERIENCE_OPTIONS,
} from "../../../lib/options";
import { fetchVendorApplicationByNo, updateVendorApplication } from "../../../services/vendorApplicationService";

const DOC_FIELDS = [
  { key: "photo", label: "Vendor Photograph" },
  { key: "aadhaarCard", label: "Aadhaar Card" },
  { key: "panCard", label: "PAN Card" },
  { key: "addressProof", label: "Address Proof" },
  { key: "businessProof", label: "Business Proof" },
];

// Turn a plain backend URL string into the { name, url, type } shape FileUpload expects for preview.
function docUrlToValue(url) {
  if (!url) return null;
  const isPdf = url.toLowerCase().endsWith(".pdf");
  return { name: "Current file", url, type: isPdf ? "application/pdf" : "image/jpeg" };
}

export default function EditVendorApplication() {
  const { id: applicationNo } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [documents, setDocuments] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);
  const [existingBusinessType, setExistingBusinessType] = useState("");

  // ── Fields that already hold a value stay locked; only genuinely empty fields (and the
  //    Documents section, always) can be edited — applies to every role (29-10 request). ──
  const hasValue = (v) => v !== undefined && v !== null && String(v).trim() !== "";

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      const app = result.data;
      setVendor(app);
      reset({
        fullName: app.personal?.fullName || "",
        fatherName: app.personal?.fatherName || "",
        dob: app.personal?.dob || "",
        gender: app.personal?.gender || "",
        mobile: app.personal?.mobile || "",
        email: app.personal?.email || "",
        aadhaar: app.personal?.aadhaar || "",
        pan: app.personal?.pan || "",
        category: app.personal?.category || "",
        permanentAddress: app.address?.permanentAddress || "",
        currentAddress: app.address?.currentAddress || "",
        ward: app.address?.ward || "",
        zone: app.address?.zone || "",
        vendorType: app.business?.vendorType || "",
        businessType: app.business?.businessType || "",
        goodsType: app.business?.goodsType || "",
        businessTiming: app.business?.businessTiming || "",
        yearsExperience: app.business?.yearsExperience || "",
      });
      setDocuments({
        photo: docUrlToValue(app.documents?.photo),
        aadhaarCard: docUrlToValue(app.documents?.aadhaarCard),
        panCard: docUrlToValue(app.documents?.panCard),
        addressProof: docUrlToValue(app.documents?.addressProof),
        businessProof: docUrlToValue(app.documents?.businessProof),
      });

      // ── Business Type may hold a raw/legacy value (e.g. from a bulk-imported Excel row)
      //    that doesn't exactly match any option in BUSINESS_CATEGORY_OPTIONS. Track it so the
      //    dropdown can show it instead of falling back to a blank "Select option". ──
      setExistingBusinessType(app.business?.businessType || "");
    });
    return () => {
      cancelled = true;
    };
  }, [applicationNo, reset]);

  // ── The extra "current value" option only exists in the DOM after this state updates and
  //    the component re-renders — so re-apply the value here, once that option is present,
  //    or the native <select> stays blank (it couldn't match anything on the first pass).
  //    Also resolves case-mismatch: DB may hold "FISH" while the list has "Fish" — the native
  //    <select> only matches exact strings, so we switch to the option's exact casing when one
  //    matches, and only fall back to the raw value when nothing matches at all. ──
  useEffect(() => {
    if (!existingBusinessType) return;
    const matched = BUSINESS_CATEGORY_OPTIONS.find(
      (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
    );
    setValue("businessType", matched ? matched.value : existingBusinessType);
  }, [existingBusinessType, setValue]);

  const onSubmit = async (data) => {
    setSaveError("");
    setSaving(true);

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
      permanentAddress: data.permanentAddress,
      currentAddress: data.currentAddress,
      ward: data.ward,
      zone: data.zone,
    };
    const business = {
      vendorType: data.vendorType,
      businessType: data.businessType,
      goodsType: data.goodsType,
      businessTiming: data.businessTiming,
      yearsExperience: data.yearsExperience,
    };

    const result = await updateVendorApplication(applicationNo, { personal, address, business, documents });
    setSaving(false);

    if (!result.success) {
      setSaveError(result.message || "Could not save your changes. Please try again.");
      return;
    }
    setSaved(true);
  };

  if (loading) {
    return (
      <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
        <FiLoader className="animate-spin" size={20} />
        Loading application...
      </Card>
    );
  }

  if (loadError || !vendor) {
    return (
      <Card className="mx-auto max-w-md text-center">
        <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
        <p className="text-sm text-ink-500">{loadError || "Application not found."}</p>
        <Link to="/vendors/list" className="mt-3 inline-block text-sm font-semibold text-brand-600">
          Back to Vendor List
        </Link>
      </Card>
    );
  }

  if (saved) {
    return (
      <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
          <FiCheckCircle size={30} />
        </div>
        <h2 className="font-display text-xl font-bold text-ink-900">Changes Saved</h2>
        <p className="mt-2 max-w-sm text-sm text-ink-500">
          The application has been updated.
          {vendor.status === "Sent Back to Vendor" && " Don't forget to submit it again once you're ready."}
        </p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => navigate(`/vendors/profile/${applicationNo}`)}>Back to Application</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Link
        to={`/vendors/profile/${applicationNo}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600"
      >
        <FiArrowLeft size={14} /> Back to Application
      </Link>

      <Card>
        <h1 className="font-display text-xl font-bold text-ink-900">Edit Application</h1>
        <p className="mt-1 text-sm text-ink-500">{vendor.applicationNo}</p>

        {/* ── Editing rule (29-10 request): fields that already have a value stay locked;
            only empty fields can be filled in, and Documents can always be replaced. ── */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
          Only fields with empty values can be edited.
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
          <div>
            <h2 className="mb-4 font-display text-base font-bold text-ink-900">Personal Details</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <Input label="Full Name" required error={errors.fullName?.message} disabled={hasValue(vendor.personal?.fullName)} style={hasValue(vendor.personal?.fullName) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("fullName", { required: "Required" })} />
              {/* REMOVED: Father's Name — no longer collected */}
              {/* <Input label="Father's Name" {...register("fatherName")} /> */}
              <Input type="date" label="Date of Birth" disabled={hasValue(vendor.personal?.dob)} style={hasValue(vendor.personal?.dob) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("dob")} />
              <Select label="Gender" options={GENDER_OPTIONS} disabled={hasValue(vendor.personal?.gender)} style={hasValue(vendor.personal?.gender) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("gender")} />
              <Input label="Mobile Number" required error={errors.mobile?.message} disabled={hasValue(vendor.personal?.mobile)} style={hasValue(vendor.personal?.mobile) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("mobile", { required: "Required" })} />
              <Input type="email" label="Email" disabled={hasValue(vendor.personal?.email)} style={hasValue(vendor.personal?.email) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("email")} />
              <Input label="Aadhaar Number" disabled={hasValue(vendor.personal?.aadhaar)} style={hasValue(vendor.personal?.aadhaar) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("aadhaar")} />
              <Input label="PAN Number" disabled={hasValue(vendor.personal?.pan)} style={hasValue(vendor.personal?.pan) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("pan")} />
              <Select label="Category" options={CATEGORY_OPTIONS} disabled={hasValue(vendor.personal?.category)} style={hasValue(vendor.personal?.category) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("category")} />
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-base font-bold text-ink-900">Address</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <Input label="Residence Address" disabled={hasValue(vendor.address?.permanentAddress)} style={hasValue(vendor.address?.permanentAddress) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("permanentAddress")} />
              <Input label="Working Address" disabled={hasValue(vendor.address?.currentAddress)} style={hasValue(vendor.address?.currentAddress) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("currentAddress")} />
              <Select label="Ward" options={WARD_OPTIONS} disabled={hasValue(vendor.address?.ward)} style={hasValue(vendor.address?.ward) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("ward")} />
              <Select label="Zone" options={ZONE_OPTIONS} disabled={hasValue(vendor.address?.zone)} style={hasValue(vendor.address?.zone) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("zone")} />
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-base font-bold text-ink-900">Business Info</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <Select label="Vendor Type" options={VENDOR_TYPE_OPTIONS} disabled={hasValue(vendor.business?.vendorType)} style={hasValue(vendor.business?.vendorType) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("vendorType")} />
              <Select
                label="Business Type"
                disabled={hasValue(vendor.business?.businessType)} style={hasValue(vendor.business?.businessType) ? { backgroundColor: "#F2F2F2" } : undefined}
                options={
                  existingBusinessType &&
                  !BUSINESS_CATEGORY_OPTIONS.some(
                    (o) => o.value.toLowerCase() === existingBusinessType.toLowerCase()
                  )
                    ? [{ value: existingBusinessType, label: `${existingBusinessType} (current)` }, ...BUSINESS_CATEGORY_OPTIONS]
                    : BUSINESS_CATEGORY_OPTIONS
                }
                {...register("businessType")}
              />
              <Input label="Goods Type" disabled={hasValue(vendor.business?.goodsType)} style={hasValue(vendor.business?.goodsType) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("goodsType")} />
              <Input label="Business Timing" placeholder="e.g. 09:00 AM - 08:00 PM" disabled={hasValue(vendor.business?.businessTiming)} style={hasValue(vendor.business?.businessTiming) ? { backgroundColor: "#F2F2F2" } : undefined} {...register("businessTiming")} />
              {/* REMOVED: Years of Experience — field no longer collected */}
              {/* <Select label="Years of Experience" options={EXPERIENCE_OPTIONS} {...register("yearsExperience")} /> */}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-base font-bold text-ink-900">Documents</h2>
            {/* <p className="mb-4 text-xs text-ink-500">Only re-upload a document if it needs to be replaced — otherwise the existing one stays as-is.</p> */}

             <p className="mb-4 text-xs text-ink-500"></p>

            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              {DOC_FIELDS.map((f) => (
                <FileUpload
                  key={f.key}
                  label={f.label}
                  value={documents[f.key]}
                  onChange={(v) => setDocuments((prev) => ({ ...prev, [f.key]: v }))}
                />
              ))}
            </div>
          </div>

          {saveError && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
              {saveError}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-ink-100 pt-6">
            <Button
              type="button"
              variant="outline"
              icon={FiArrowLeft}
              onClick={() => navigate(`/vendors/profile/${applicationNo}`)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" variant="success" icon={FiSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}