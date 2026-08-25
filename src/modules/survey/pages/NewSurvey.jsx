// // import { useEffect, useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiLoader, FiAlertCircle } from "react-icons/fi";
// // import Card from "../../../components/ui/Card";
// // import Button from "../../../components/ui/Button";
// // import Avatar from "../../../components/ui/Avatar";
// // import { IdBadge } from "../../../components/ui/Avatar";
// // import { Input, Select, Textarea } from "../../../components/ui/Field";
// // import MapPlaceholder from "../../../components/ui/MapPlaceholder";
// // import PhotoUploadGrid from "../../../components/ui/PhotoUploadGrid";
// // import { ZONE_OPTIONS, WARD_OPTIONS, MARKET_OPTIONS, YES_NO_OPTIONS, BUSINESS_CATEGORY_OPTIONS } from "../../../lib/options";
// // import { fetchVendorApplicationByNo, submitSurvey } from "../../../services/vendorApplicationService";
// // import { useAuth } from "../../../modules/auth/hooks/useAuth";

// // // Backend survey stage only supports two recommendations: Approve / Send Back
// // const RECOMMENDATIONS = [
// //   { value: "Approve", icon: FiThumbsUp, tone: "border-success-500 bg-success-100 text-success-500" },
// //   { value: "Send Back", icon: FiThumbsDown, tone: "border-warning-500 bg-warning-100 text-warning-500" },
// // ];

// // export default function NewSurvey() {
// //   const { vendorId: applicationNo } = useParams();
// //   const { user } = useAuth();
// //   const navigate = useNavigate();

// //   const [vendor, setVendor] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loadError, setLoadError] = useState("");

// //   const [photos, setPhotos] = useState([]);
// //   const [recommendation, setRecommendation] = useState("");
// //   const [submitting, setSubmitting] = useState(false);
// //   const [submitError, setSubmitError] = useState("");
// //   const [done, setDone] = useState(null);

// //   const {
// //     register,
// //     watch,
// //     setValue,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm({
// //     defaultValues: {
// //       ward: "",
// //       zone: "",
// //       businessType: "",
// //     },
// //   });

// //   useEffect(() => {
// //     let cancelled = false;
// //     setLoading(true);
// //     setLoadError("");
// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       if (cancelled) return;
// //       setLoading(false);
// //       if (!result.success) {
// //         setLoadError(result.message || "Vendor not found.");
// //         return;
// //       }
// //       setVendor(result.data);
// //       setValue("ward", result.data.ward || result.data.address?.ward || "");
// //       setValue("zone", result.data.address?.zone || "");
// //       setValue("businessType", result.data.business?.businessType || "");
// //     });
// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [applicationNo, setValue]);

// //   const latitude = watch("latitude");
// //   const longitude = watch("longitude");

// //   const handleLocate = () => {
// //     setValue("latitude", "19.0760");
// //     setValue("longitude", "72.8777");
// //   };

// //   const onSubmit = async (formData) => {
// //     if (!recommendation) return;
// //     setSubmitError("");
// //     setSubmitting(true);

// //     // Backend only stores one free-text `comments` field for the survey — bundle the
// //     // extra field-survey details into it so nothing gets lost.
// //     const comments = [
// //       formData.market ? `Market: ${formData.market}` : "",
// //       formData.roadWidth ? `Road Width: ${formData.roadWidth} ft` : "",
// //       formData.nearbyLandmark ? `Nearby Landmark: ${formData.nearbyLandmark}` : "",
// //       formData.existingVendor ? `Existing Vendor: ${formData.existingVendor}` : "",
// //       formData.encroachment ? `Encroachment: ${formData.encroachment}` : "",
// //       formData.businessType ? `Business Type (field-verified): ${formData.businessType}` : "",
// //       formData.officerRemarks ? `Remarks: ${formData.officerRemarks}` : "",
// //     ]
// //       .filter(Boolean)
// //       .join(" | ");

// //     const rawPhotos = photos
// //       .map((p) => (p?.file instanceof File ? p.file : p instanceof File ? p : null))
// //       .filter(Boolean);

// //     const result = await submitSurvey(applicationNo, {
// //       lat: formData.latitude,
// //       lng: formData.longitude,
// //       comments,
// //       recommendation,
// //       ward: formData.ward,
// //       surveyPhotos: rawPhotos,
// //     });

// //     setSubmitting(false);

// //     if (!result.success) {
// //       setSubmitError(result.message || "Could not submit the survey. Please try again.");
// //       return;
// //     }

// //     setDone(result.data);
// //   };

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading application...
// //       </Card>
// //     );
// //   }

// //   if (loadError || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
// //         <p className="text-sm text-ink-500">{loadError || "Vendor not found."}</p>
// //         <Link to="/survey" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Survey Queue
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   if (done) {
// //     return (
// //       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
// //         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
// //           <FiCheckCircle size={30} />
// //         </div>
// //         <h2 className="font-display text-xl font-bold text-ink-900">Survey Submitted</h2>
// //         <p className="mt-2 max-w-sm text-sm text-ink-500">
// //           Survey for {vendor.personal?.fullName} recorded with recommendation{" "}
// //           <span className="font-semibold text-ink-800">{done.survey?.recommendation}</span>.
// //         </p>
// //         <div className="mt-5 flex gap-3 rounded-xl bg-ink-50 px-5 py-3 id-mono text-sm">
// //           <span className="text-ink-500">Application No.</span>
// //           <span className="font-semibold text-ink-900">{done.applicationNo}</span>
// //         </div>
// //         <div className="mt-6 flex gap-3">
// //           <Button variant="outline" onClick={() => navigate(`/vendors/profile/${vendor.applicationNo}`)}>
// //             View Vendor
// //           </Button>
// //           <Button onClick={() => navigate("/survey")}>Back to Survey Queue</Button>
// //         </div>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <div className="mx-auto max-w-4xl space-y-5">
// //       <Link to="/survey" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
// //         <FiArrowLeft size={14} /> Back to Survey Queue
// //       </Link>

// //       <Card>
// //         <div className="mb-6 flex items-center gap-4 rounded-2xl bg-brand-50 p-4">
// //           <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
// //           <div>
// //             <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
// //             <div className="mt-0.5 flex items-center gap-3 text-xs text-ink-500">
// //               <IdBadge className="bg-white">{vendor.applicationNo}</IdBadge>
// //               <span>
// //                 {vendor.address?.ward} &middot; {vendor.address?.zone}
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
// //           <div>
// //             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Survey Details</h2>
// //             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
// //               <Input label="Survey Date" value={new Date().toISOString().slice(0, 10)} disabled className="bg-ink-50 text-ink-400" />
// //               <Input label="Survey Officer" value={user?.fullName || ""} disabled className="bg-ink-50 text-ink-400" />
// //               <Input label="Ward (assignment)" value={watch("ward")} disabled className="bg-ink-50 text-ink-400" />
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
// //             <MapPlaceholder latitude={latitude} longitude={longitude} onLocate={handleLocate} />

// //             <div className="grid grid-cols-2 gap-x-4 gap-y-5">
// //               <Input
// //                 label="Latitude"
// //                 required
// //                 placeholder="19.0760"
// //                 error={errors.latitude?.message}
// //                 {...register("latitude", { required: "Latitude is required" })}
// //               />
// //               <Input
// //                 label="Longitude"
// //                 required
// //                 placeholder="72.8777"
// //                 error={errors.longitude?.message}
// //                 {...register("longitude", { required: "Longitude is required" })}
// //               />
// //               <Select label="Ward (zone change)" options={WARD_OPTIONS} {...register("ward")} />
// //               <Select label="Zone (reference only)" options={ZONE_OPTIONS} disabled {...register("zone")} />
// //               <Select label="Market" options={MARKET_OPTIONS} className="col-span-2" {...register("market")} />
// //               <Input label="Road Width (in ft)" type="number" {...register("roadWidth")} />
// //               <Input label="Nearby Landmark" {...register("nearbyLandmark")} />
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
// //             <Select label="Business Type" options={BUSINESS_CATEGORY_OPTIONS} {...register("businessType")} />
// //             <Select label="Existing Vendor" options={YES_NO_OPTIONS} {...register("existingVendor")} />
// //             <Select label="Encroachment" options={YES_NO_OPTIONS} {...register("encroachment")} />
// //           </div>

// //           <PhotoUploadGrid label="Survey Photos" photos={photos} onChange={setPhotos} />

// //           <Textarea label="Officer Remarks" placeholder="Add field observations..." {...register("officerRemarks")} />

// //           <div>
// //             <span className="mb-2 block text-[13px] font-semibold text-ink-700">
// //               Recommendation <span className="text-danger-500">*</span>
// //             </span>
// //             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
// //               {RECOMMENDATIONS.map(({ value, icon: Icon, tone }) => (
// //                 <button
// //                   type="button"
// //                   key={value}
// //                   onClick={() => setRecommendation(value)}
// //                   className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
// //                     recommendation === value ? tone : "border-ink-100 text-ink-500 hover:border-ink-200"
// //                   }`}
// //                 >
// //                   <Icon size={16} /> {value === "Send Back" ? "Send Back to Counter Officer" : value}
// //                 </button>
// //               ))}
// //             </div>
// //             {!recommendation && (
// //               <p className="mt-1.5 text-xs text-ink-400">Select a recommendation to enable submission.</p>
// //             )}
// //           </div>

// //           {submitError && (
// //             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
// //               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
// //               {submitError}
// //             </div>
// //           )}

// //           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
// //             <Button type="button" variant="outline" icon={FiArrowLeft} onClick={() => navigate("/survey")} disabled={submitting}>
// //               Cancel
// //             </Button>
// //             <Button type="submit" variant="success" icon={FiCheckCircle} disabled={!recommendation || submitting}>
// //               {submitting ? "Submitting..." : "Submit Survey"}
// //             </Button>
// //           </div>
// //         </form>
// //       </Card>
// //     </div>
// //   );
// // }





// // import { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiHelpCircle } from "react-icons/fi";
// // import Card from "../../../components/ui/Card";
// // import Button from "../../../components/ui/Button";
// // import Avatar from "../../../components/ui/Avatar";
// // import { IdBadge } from "../../../components/ui/Avatar";
// // import { Input, Select, Textarea } from "../../../components/ui/Field";
// // import MapPlaceholder from "../../../components/ui/MapPlaceholder";
// // import PhotoUploadGrid from "../../../components/ui/PhotoUploadGrid";
// // import { WARD_OPTIONS, ZONE_OPTIONS, MARKET_OPTIONS, YES_NO_OPTIONS, BUSINESS_CATEGORY_OPTIONS } from "../../../lib/options";
// // import { selectVendorById, updateVendorStatus } from "../../../features/vendors/vendorsSlice";
// // import { addSurvey, makeSurveyDraft, selectAllSurveys } from "../../../features/survey/surveySlice";
// // import { addApplication, makeApplicationDraft } from "../../../features/applications/applicationsSlice";

// // const RECOMMENDATIONS = [
// //   { value: "Approve", icon: FiThumbsUp, tone: "border-success-500 bg-success-100 text-success-500" },
// //   { value: "Reject", icon: FiThumbsDown, tone: "border-danger-500 bg-danger-100 text-danger-500" },
// //   { value: "Need Clarification", icon: FiHelpCircle, tone: "border-warning-500 bg-warning-100 text-warning-500" },
// // ];

// // export default function NewSurvey() {
// //   const { vendorId } = useParams();
// //   const vendor = useSelector((s) => selectVendorById(s, vendorId));
// //   const surveys = useSelector(selectAllSurveys);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const [photos, setPhotos] = useState([]);
// //   const [recommendation, setRecommendation] = useState("");
// //   const [done, setDone] = useState(null);

// //   const {
// //     register,
// //     watch,
// //     setValue,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm({
// //     defaultValues: {
// //       surveyDate: new Date().toISOString().slice(0, 10),
// //       surveyOfficer: "Survey Officer",
// //       ward: vendor?.address?.ward ?? "",
// //       zone: vendor?.address?.zone ?? "",
// //       businessType: vendor?.business?.businessCategory ?? "",
// //     },
// //   });

// //   const latitude = watch("latitude");
// //   const longitude = watch("longitude");

// //   const handleLocate = () => {
// //     setValue("latitude", "19.0760");
// //     setValue("longitude", "72.8777");
// //   };

// //   const onSubmit = (formData) => {
// //     if (!recommendation) return;
// //     const draft = makeSurveyDraft(surveys, vendor, { ...formData, recommendation }, photos);
// //     dispatch(addSurvey(draft));

// //     const next =
// //       recommendation === "Approve"
// //         ? { status: "Pending Approval", currentStage: "Counter Employee" }
// //         : recommendation === "Reject"
// //         ? { status: "Rejected", currentStage: "Rejected" }
// //         : { status: "Under Survey", currentStage: "Survey" };

// //     dispatch(updateVendorStatus({ id: vendor.id, ...next }));

// //     if (recommendation === "Approve") {
// //       dispatch(addApplication(makeApplicationDraft(vendor, draft)));
// //     }

// //     setDone(draft);
// //   };

// //   if (!vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">Vendor not found.</p>
// //         <Link to="/survey" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Survey Queue
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   if (done) {
// //     return (
// //       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
// //         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
// //           <FiCheckCircle size={30} />
// //         </div>
// //         <h2 className="font-display text-xl font-bold text-ink-900">Survey Submitted</h2>
// //         <p className="mt-2 max-w-sm text-sm text-ink-500">
// //           Survey for {vendor.personal.fullName} recorded with recommendation{" "}
// //           <span className="font-semibold text-ink-800">{done.recommendation}</span>.
// //         </p>
// //         <div className="mt-5 flex gap-3 rounded-xl bg-ink-50 px-5 py-3 id-mono text-sm">
// //           <span className="text-ink-500">Survey No.</span>
// //           <span className="font-semibold text-ink-900">{done.surveyNumber}</span>
// //         </div>
// //         <div className="mt-6 flex gap-3">
// //           <Button variant="outline" onClick={() => navigate(`/vendors/profile/${vendor.id}`)}>
// //             View Vendor
// //           </Button>
// //           <Button onClick={() => navigate("/survey")}>Back to Survey Queue</Button>
// //         </div>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <div className="mx-auto max-w-4xl space-y-5">
// //       <Link to="/survey" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
// //         <FiArrowLeft size={14} /> Back to Survey Queue
// //       </Link>

// //       <Card>
// //         <div className="mb-6 flex items-center gap-4 rounded-2xl bg-brand-50 p-4">
// //           <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={52} />
// //           <div>
// //             <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
// //             <div className="mt-0.5 flex items-center gap-3 text-xs text-ink-500">
// //               <IdBadge className="bg-white">{vendor.applicationNo}</IdBadge>
// //               <span>{vendor.address.ward} &middot; {vendor.address.zone}</span>
// //             </div>
// //           </div>
// //         </div>

// //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
// //           <div>
// //             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Survey Details</h2>
// //             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
// //               <Input
// //                 label="Survey Number"
// //                 value="Auto-generated on submit"
// //                 disabled
// //                 className="bg-ink-50 text-ink-400"
// //               />
// //               <Input
// //                 type="date"
// //                 label="Survey Date"
// //                 required
// //                 error={errors.surveyDate?.message}
// //                 {...register("surveyDate", { required: "Survey date is required" })}
// //               />
// //               <Input
// //                 label="Survey Officer"
// //                 required
// //                 error={errors.surveyOfficer?.message}
// //                 {...register("surveyOfficer", { required: "Survey officer is required" })}
// //               />
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
// //             <MapPlaceholder latitude={latitude} longitude={longitude} onLocate={handleLocate} />

// //             <div className="grid grid-cols-2 gap-x-4 gap-y-5">
// //               <Input
// //                 label="Latitude"
// //                 required
// //                 placeholder="19.0760"
// //                 error={errors.latitude?.message}
// //                 {...register("latitude", { required: "Latitude is required" })}
// //               />
// //               <Input
// //                 label="Longitude"
// //                 required
// //                 placeholder="72.8777"
// //                 error={errors.longitude?.message}
// //                 {...register("longitude", { required: "Longitude is required" })}
// //               />
// //               <Select label="Ward" required options={WARD_OPTIONS} error={errors.ward?.message} {...register("ward", { required: true })} />
// //               <Select label="Zone" required options={ZONE_OPTIONS} error={errors.zone?.message} {...register("zone", { required: true })} />
// //               <Select
// //                 label="Market"
// //                 options={MARKET_OPTIONS}
// //                 className="col-span-2"
// //                 {...register("market")}
// //               />
// //               <Input
// //                 label="Road Width (in ft)"
// //                 type="number"
// //                 required
// //                 error={errors.roadWidth?.message}
// //                 {...register("roadWidth", { required: "Road width is required" })}
// //               />
// //               <Input label="Nearby Landmark" required error={errors.nearbyLandmark?.message} {...register("nearbyLandmark", { required: "Nearby landmark is required" })} />
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
// //             <Select
// //               label="Business Type"
// //               required
// //               options={BUSINESS_CATEGORY_OPTIONS}
// //               error={errors.businessType?.message}
// //               {...register("businessType", { required: "Business type is required" })}
// //             />
// //             <Select
// //               label="Existing Vendor"
// //               required
// //               options={YES_NO_OPTIONS}
// //               error={errors.existingVendor?.message}
// //               {...register("existingVendor", { required: "This field is required" })}
// //             />
// //             <Select
// //               label="Encroachment"
// //               required
// //               options={YES_NO_OPTIONS}
// //               error={errors.encroachment?.message}
// //               {...register("encroachment", { required: "This field is required" })}
// //             />
// //           </div>

// //           <PhotoUploadGrid label="Survey Photos" required photos={photos} onChange={setPhotos} />

// //           <Textarea label="Officer Remarks" placeholder="Add field observations..." {...register("officerRemarks")} />

// //           <div>
// //             <span className="mb-2 block text-[13px] font-semibold text-ink-700">
// //               Recommendation <span className="text-danger-500">*</span>
// //             </span>
// //             <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
// //               {RECOMMENDATIONS.map(({ value, icon: Icon, tone }) => (
// //                 <button
// //                   type="button"
// //                   key={value}
// //                   onClick={() => setRecommendation(value)}
// //                   className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
// //                     recommendation === value ? tone : "border-ink-100 text-ink-500 hover:border-ink-200"
// //                   }`}
// //                 >
// //                   <Icon size={16} /> {value}
// //                 </button>
// //               ))}
// //             </div>
// //             {!recommendation && (
// //               <p className="mt-1.5 text-xs text-ink-400">Select a recommendation to enable submission.</p>
// //             )}
// //           </div>

// //           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
// //             <Button type="button" variant="outline" icon={FiArrowLeft} onClick={() => navigate("/survey")}>
// //               Cancel
// //             </Button>
// //             <Button type="submit" variant="success" icon={FiCheckCircle} disabled={!recommendation}>
// //               Submit Survey
// //             </Button>
// //           </div>
// //         </form>
// //       </Card>
// //     </div>
// //   );
// // }



// // import { useEffect, useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiLoader, FiAlertCircle } from "react-icons/fi";
// // import Card from "../../../components/ui/Card";
// // import Button from "../../../components/ui/Button";
// // import Avatar from "../../../components/ui/Avatar";
// // import { IdBadge } from "../../../components/ui/Avatar";
// // import { Input, Select, Textarea } from "../../../components/ui/Field";
// // import MapPlaceholder from "../../../components/ui/MapPlaceholder";
// // import PhotoUploadGrid from "../../../components/ui/PhotoUploadGrid";
// // import { ZONE_OPTIONS, WARD_OPTIONS, MARKET_OPTIONS, YES_NO_OPTIONS, BUSINESS_CATEGORY_OPTIONS } from "../../../lib/options";
// // import { fetchVendorApplicationByNo, submitSurvey } from "../../../services/vendorApplicationService";
// // import { useAuth } from "../../../modules/auth/hooks/useAuth";

// // // Backend survey stage only supports two recommendations: Approve / Send Back
// // const RECOMMENDATIONS = [
// //   { value: "Approve", icon: FiThumbsUp, tone: "border-success-500 bg-success-100 text-success-500" },
// //   { value: "Send Back", icon: FiThumbsDown, tone: "border-warning-500 bg-warning-100 text-warning-500" },
// // ];

// // export default function NewSurvey() {
// //   const { vendorId: applicationNo } = useParams();
// //   const { user } = useAuth();
// //   const navigate = useNavigate();

// //   const [vendor, setVendor] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loadError, setLoadError] = useState("");

// //   const [photos, setPhotos] = useState([]);
// //   const [recommendation, setRecommendation] = useState("");
// //   const [submitting, setSubmitting] = useState(false);
// //   const [submitError, setSubmitError] = useState("");
// //   const [done, setDone] = useState(null);

// //   const {
// //     register,
// //     watch,
// //     setValue,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm({
// //     defaultValues: {
// //       ward: "",
// //       zone: "",
// //       businessType: "",
// //     },
// //   });

// //   useEffect(() => {
// //     let cancelled = false;
// //     setLoading(true);
// //     setLoadError("");
// //     fetchVendorApplicationByNo(applicationNo).then((result) => {
// //       if (cancelled) return;
// //       setLoading(false);
// //       if (!result.success) {
// //         setLoadError(result.message || "Vendor not found.");
// //         return;
// //       }
// //       setVendor(result.data);
// //       setValue("ward", result.data.ward || result.data.address?.ward || "");
// //       setValue("zone", result.data.address?.zone || "");
// //       setValue("businessType", result.data.business?.businessCategory || "");
// //     });
// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [applicationNo, setValue]);

// //   const latitude = watch("latitude");
// //   const longitude = watch("longitude");

// //   const handleLocate = () => {
// //     setValue("latitude", "19.0760");
// //     setValue("longitude", "72.8777");
// //   };

// //   const onSubmit = async (formData) => {
// //     if (!recommendation) return;
// //     setSubmitError("");
// //     setSubmitting(true);

// //     // Backend only stores one free-text `comments` field for the survey — bundle the
// //     // extra field-survey details into it so nothing gets lost.
// //     const comments = [
// //       formData.market ? `Market: ${formData.market}` : "",
// //       formData.roadWidth ? `Road Width: ${formData.roadWidth} ft` : "",
// //       formData.nearbyLandmark ? `Nearby Landmark: ${formData.nearbyLandmark}` : "",
// //       formData.existingVendor ? `Existing Vendor: ${formData.existingVendor}` : "",
// //       formData.encroachment ? `Encroachment: ${formData.encroachment}` : "",
// //       formData.businessType ? `Business Type (field-verified): ${formData.businessType}` : "",
// //       formData.officerRemarks ? `Remarks: ${formData.officerRemarks}` : "",
// //     ]
// //       .filter(Boolean)
// //       .join(" | ");

// //     const rawPhotos = photos
// //       .map((p) => (p?.file instanceof File ? p.file : p instanceof File ? p : null))
// //       .filter(Boolean);

// //     const result = await submitSurvey(applicationNo, {
// //       lat: formData.latitude,
// //       lng: formData.longitude,
// //       comments,
// //       recommendation,
// //       ward: formData.ward,
// //       surveyPhotos: rawPhotos,
// //     });

// //     setSubmitting(false);

// //     if (!result.success) {
// //       setSubmitError(result.message || "Could not submit the survey. Please try again.");
// //       return;
// //     }

// //     setDone(result.data);
// //   };

// //   if (loading) {
// //     return (
// //       <Card className="mx-auto flex max-w-md flex-col items-center gap-2 py-14 text-center text-sm text-ink-400">
// //         <FiLoader className="animate-spin" size={20} />
// //         Loading application...
// //       </Card>
// //     );
// //   }

// //   if (loadError || !vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <FiAlertCircle className="mx-auto mb-2 text-danger-500" size={22} />
// //         <p className="text-sm text-ink-500">{loadError || "Vendor not found."}</p>
// //         <Link to="/survey" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Survey Queue
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   if (done) {
// //     return (
// //       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
// //         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
// //           <FiCheckCircle size={30} />
// //         </div>
// //         <h2 className="font-display text-xl font-bold text-ink-900">Survey Submitted</h2>
// //         <p className="mt-2 max-w-sm text-sm text-ink-500">
// //           Survey for {vendor.personal?.fullName} recorded with recommendation{" "}
// //           <span className="font-semibold text-ink-800">{done.survey?.recommendation}</span>.
// //         </p>
// //         <div className="mt-5 flex gap-3 rounded-xl bg-ink-50 px-5 py-3 id-mono text-sm">
// //           <span className="text-ink-500">Application No.</span>
// //           <span className="font-semibold text-ink-900">{done.applicationNo}</span>
// //         </div>
// //         <div className="mt-6 flex gap-3">
// //           <Button variant="outline" onClick={() => navigate(`/vendors/profile/${vendor.applicationNo}`)}>
// //             View Vendor
// //           </Button>
// //           <Button onClick={() => navigate("/survey")}>Back to Survey Queue</Button>
// //         </div>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <div className="mx-auto max-w-4xl space-y-5">
// //       <Link to="/survey" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
// //         <FiArrowLeft size={14} /> Back to Survey Queue
// //       </Link>

// //       <Card>
// //         <div className="mb-6 flex items-center gap-4 rounded-2xl bg-brand-50 p-4">
// //           <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
// //           <div>
// //             <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
// //             <div className="mt-0.5 flex items-center gap-3 text-xs text-ink-500">
// //               <IdBadge className="bg-white">{vendor.applicationNo}</IdBadge>
// //               <span>
// //                 {vendor.address?.ward} &middot; {vendor.address?.zone}
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
// //           <div>
// //             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Survey Details</h2>
// //             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
// //               <Input label="Survey Date" value={new Date().toISOString().slice(0, 10)} disabled className="bg-ink-50 text-ink-400" />
// //               <Input label="Survey Officer" value={user?.fullName || ""} disabled className="bg-ink-50 text-ink-400" />
// //               <Input label="Ward (assignment)" value={watch("ward")} disabled className="bg-ink-50 text-ink-400" />
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
// //             <MapPlaceholder latitude={latitude} longitude={longitude} onLocate={handleLocate} />

// //             <div className="grid grid-cols-2 gap-x-4 gap-y-5">
// //               <Input
// //                 label="Latitude"
// //                 required
// //                 placeholder="19.0760"
// //                 error={errors.latitude?.message}
// //                 {...register("latitude", { required: "Latitude is required" })}
// //               />
// //               <Input
// //                 label="Longitude"
// //                 required
// //                 placeholder="72.8777"
// //                 error={errors.longitude?.message}
// //                 {...register("longitude", { required: "Longitude is required" })}
// //               />
// //               <Select label="Ward (zone change)" options={WARD_OPTIONS} {...register("ward")} />
// //               <Select label="Zone (reference only)" options={ZONE_OPTIONS} disabled {...register("zone")} />
// //               <Select label="Market" options={MARKET_OPTIONS} className="col-span-2" {...register("market")} />
// //               <Input label="Road Width (in ft)" type="number" {...register("roadWidth")} />
// //               <Input label="Nearby Landmark" {...register("nearbyLandmark")} />
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
// //             <Select label="Business Type" options={BUSINESS_CATEGORY_OPTIONS} {...register("businessType")} />
// //             <Select label="Existing Vendor" options={YES_NO_OPTIONS} {...register("existingVendor")} />
// //             <Select label="Encroachment" options={YES_NO_OPTIONS} {...register("encroachment")} />
// //           </div>

// //           <PhotoUploadGrid label="Survey Photos" photos={photos} onChange={setPhotos} />

// //           <Textarea label="Officer Remarks" placeholder="Add field observations..." {...register("officerRemarks")} />

// //           <div>
// //             <span className="mb-2 block text-[13px] font-semibold text-ink-700">
// //               Recommendation <span className="text-danger-500">*</span>
// //             </span>
// //             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
// //               {RECOMMENDATIONS.map(({ value, icon: Icon, tone }) => (
// //                 <button
// //                   type="button"
// //                   key={value}
// //                   onClick={() => setRecommendation(value)}
// //                   className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
// //                     recommendation === value ? tone : "border-ink-100 text-ink-500 hover:border-ink-200"
// //                   }`}
// //                 >
// //                   <Icon size={16} /> {value === "Send Back" ? "Send Back to Counter Officer" : value}
// //                 </button>
// //               ))}
// //             </div>
// //             {!recommendation && (
// //               <p className="mt-1.5 text-xs text-ink-400">Select a recommendation to enable submission.</p>
// //             )}
// //           </div>

// //           {submitError && (
// //             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
// //               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
// //               {submitError}
// //             </div>
// //           )}

// //           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
// //             <Button type="button" variant="outline" icon={FiArrowLeft} onClick={() => navigate("/survey")} disabled={submitting}>
// //               Cancel
// //             </Button>
// //             <Button type="submit" variant="success" icon={FiCheckCircle} disabled={!recommendation || submitting}>
// //               {submitting ? "Submitting..." : "Submit Survey"}
// //             </Button>
// //           </div>
// //         </form>
// //       </Card>
// //     </div>
// //   );
// // }



// // ==============================


// // import { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { FiArrowLeft, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiHelpCircle } from "react-icons/fi";
// // import Card from "../../../components/ui/Card";
// // import Button from "../../../components/ui/Button";
// // import Avatar from "../../../components/ui/Avatar";
// // import { IdBadge } from "../../../components/ui/Avatar";
// // import { Input, Select, Textarea } from "../../../components/ui/Field";
// // import MapPlaceholder from "../../../components/ui/MapPlaceholder";
// // import PhotoUploadGrid from "../../../components/ui/PhotoUploadGrid";
// // import { WARD_OPTIONS, ZONE_OPTIONS, MARKET_OPTIONS, YES_NO_OPTIONS, BUSINESS_CATEGORY_OPTIONS } from "../../../lib/options";
// // import { selectVendorById, updateVendorStatus } from "../../../features/vendors/vendorsSlice";
// // import { addSurvey, makeSurveyDraft, selectAllSurveys } from "../../../features/survey/surveySlice";
// // import { addApplication, makeApplicationDraft } from "../../../features/applications/applicationsSlice";

// // const RECOMMENDATIONS = [
// //   { value: "Approve", icon: FiThumbsUp, tone: "border-success-500 bg-success-100 text-success-500" },
// //   { value: "Reject", icon: FiThumbsDown, tone: "border-danger-500 bg-danger-100 text-danger-500" },
// //   { value: "Need Clarification", icon: FiHelpCircle, tone: "border-warning-500 bg-warning-100 text-warning-500" },
// // ];

// // export default function NewSurvey() {
// //   const { vendorId } = useParams();
// //   const vendor = useSelector((s) => selectVendorById(s, vendorId));
// //   const surveys = useSelector(selectAllSurveys);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const [photos, setPhotos] = useState([]);
// //   const [recommendation, setRecommendation] = useState("");
// //   const [done, setDone] = useState(null);

// //   const {
// //     register,
// //     watch,
// //     setValue,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm({
// //     defaultValues: {
// //       surveyDate: new Date().toISOString().slice(0, 10),
// //       surveyOfficer: "Survey Officer",
// //       ward: vendor?.address?.ward ?? "",
// //       zone: vendor?.address?.zone ?? "",
// //       businessType: vendor?.business?.businessCategory ?? "",
// //     },
// //   });

// //   const latitude = watch("latitude");
// //   const longitude = watch("longitude");

// //   const handleLocate = () => {
// //     setValue("latitude", "19.0760");
// //     setValue("longitude", "72.8777");
// //   };

// //   const onSubmit = (formData) => {
// //     if (!recommendation) return;
// //     const draft = makeSurveyDraft(surveys, vendor, { ...formData, recommendation }, photos);
// //     dispatch(addSurvey(draft));

// //     const next =
// //       recommendation === "Approve"
// //         ? { status: "Pending Approval", currentStage: "Counter Employee" }
// //         : recommendation === "Reject"
// //         ? { status: "Rejected", currentStage: "Rejected" }
// //         : { status: "Under Survey", currentStage: "Survey" };

// //     dispatch(updateVendorStatus({ id: vendor.id, ...next }));

// //     if (recommendation === "Approve") {
// //       dispatch(addApplication(makeApplicationDraft(vendor, draft)));
// //     }

// //     setDone(draft);
// //   };

// //   if (!vendor) {
// //     return (
// //       <Card className="mx-auto max-w-md text-center">
// //         <p className="text-sm text-ink-500">Vendor not found.</p>
// //         <Link to="/survey" className="mt-3 inline-block text-sm font-semibold text-brand-600">
// //           Back to Survey Queue
// //         </Link>
// //       </Card>
// //     );
// //   }

// //   if (done) {
// //     return (
// //       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
// //         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
// //           <FiCheckCircle size={30} />
// //         </div>
// //         <h2 className="font-display text-xl font-bold text-ink-900">Survey Submitted</h2>
// //         <p className="mt-2 max-w-sm text-sm text-ink-500">
// //           Survey for {vendor.personal.fullName} recorded with recommendation{" "}
// //           <span className="font-semibold text-ink-800">{done.recommendation}</span>.
// //         </p>
// //         <div className="mt-5 flex gap-3 rounded-xl bg-ink-50 px-5 py-3 id-mono text-sm">
// //           <span className="text-ink-500">Survey No.</span>
// //           <span className="font-semibold text-ink-900">{done.surveyNumber}</span>
// //         </div>
// //         <div className="mt-6 flex gap-3">
// //           <Button variant="outline" onClick={() => navigate(`/vendors/profile/${vendor.id}`)}>
// //             View Vendor
// //           </Button>
// //           <Button onClick={() => navigate("/survey")}>Back to Survey Queue</Button>
// //         </div>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <div className="mx-auto max-w-4xl space-y-5">
// //       <Link to="/survey" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
// //         <FiArrowLeft size={14} /> Back to Survey Queue
// //       </Link>

// //       <Card>
// //         <div className="mb-6 flex items-center gap-4 rounded-2xl bg-brand-50 p-4">
// //           <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={52} />
// //           <div>
// //             <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
// //             <div className="mt-0.5 flex items-center gap-3 text-xs text-ink-500">
// //               <IdBadge className="bg-white">{vendor.applicationNo}</IdBadge>
// //               <span>{vendor.address.ward} &middot; {vendor.address.zone}</span>
// //             </div>
// //           </div>
// //         </div>

// //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
// //           <div>
// //             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Survey Details</h2>
// //             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
// //               <Input
// //                 label="Survey Number"
// //                 value="Auto-generated on submit"
// //                 disabled
// //                 className="bg-ink-50 text-ink-400"
// //               />
// //               <Input
// //                 type="date"
// //                 label="Survey Date"
// //                 required
// //                 error={errors.surveyDate?.message}
// //                 {...register("surveyDate", { required: "Survey date is required" })}
// //               />
// //               <Input
// //                 label="Survey Officer"
// //                 required
// //                 error={errors.surveyOfficer?.message}
// //                 {...register("surveyOfficer", { required: "Survey officer is required" })}
// //               />
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
// //             <MapPlaceholder latitude={latitude} longitude={longitude} onLocate={handleLocate} />

// //             <div className="grid grid-cols-2 gap-x-4 gap-y-5">
// //               <Input
// //                 label="Latitude"
// //                 required
// //                 placeholder="19.0760"
// //                 error={errors.latitude?.message}
// //                 {...register("latitude", { required: "Latitude is required" })}
// //               />
// //               <Input
// //                 label="Longitude"
// //                 required
// //                 placeholder="72.8777"
// //                 error={errors.longitude?.message}
// //                 {...register("longitude", { required: "Longitude is required" })}
// //               />
// //               <Select label="Ward" required options={WARD_OPTIONS} error={errors.ward?.message} {...register("ward", { required: true })} />
// //               <Select label="Zone" required options={ZONE_OPTIONS} error={errors.zone?.message} {...register("zone", { required: true })} />
// //               <Select
// //                 label="Market"
// //                 options={MARKET_OPTIONS}
// //                 className="col-span-2"
// //                 {...register("market")}
// //               />
// //               <Input
// //                 label="Road Width (in ft)"
// //                 type="number"
// //                 required
// //                 error={errors.roadWidth?.message}
// //                 {...register("roadWidth", { required: "Road width is required" })}
// //               />
// //               <Input label="Nearby Landmark" required error={errors.nearbyLandmark?.message} {...register("nearbyLandmark", { required: "Nearby landmark is required" })} />
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
// //             <Select
// //               label="Business Type"
// //               required
// //               options={BUSINESS_CATEGORY_OPTIONS}
// //               error={errors.businessType?.message}
// //               {...register("businessType", { required: "Business type is required" })}
// //             />
// //             <Select
// //               label="Existing Vendor"
// //               required
// //               options={YES_NO_OPTIONS}
// //               error={errors.existingVendor?.message}
// //               {...register("existingVendor", { required: "This field is required" })}
// //             />
// //             <Select
// //               label="Encroachment"
// //               required
// //               options={YES_NO_OPTIONS}
// //               error={errors.encroachment?.message}
// //               {...register("encroachment", { required: "This field is required" })}
// //             />
// //           </div>

// //           <PhotoUploadGrid label="Survey Photos" required photos={photos} onChange={setPhotos} />

// //           <Textarea label="Officer Remarks" placeholder="Add field observations..." {...register("officerRemarks")} />

// //           <div>
// //             <span className="mb-2 block text-[13px] font-semibold text-ink-700">
// //               Recommendation <span className="text-danger-500">*</span>
// //             </span>
// //             <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
// //               {RECOMMENDATIONS.map(({ value, icon: Icon, tone }) => (
// //                 <button
// //                   type="button"
// //                   key={value}
// //                   onClick={() => setRecommendation(value)}
// //                   className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
// //                     recommendation === value ? tone : "border-ink-100 text-ink-500 hover:border-ink-200"
// //                   }`}
// //                 >
// //                   <Icon size={16} /> {value}
// //                 </button>
// //               ))}
// //             </div>
// //             {!recommendation && (
// //               <p className="mt-1.5 text-xs text-ink-400">Select a recommendation to enable submission.</p>
// //             )}
// //           </div>

// //           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
// //             <Button type="button" variant="outline" icon={FiArrowLeft} onClick={() => navigate("/survey")}>
// //               Cancel
// //             </Button>
// //             <Button type="submit" variant="success" icon={FiCheckCircle} disabled={!recommendation}>
// //               Submit Survey
// //             </Button>
// //           </div>
// //         </form>
// //       </Card>
// //     </div>
// //   );
// // }



// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { Input, Select, Textarea } from "../../../components/ui/Field";
// import MapPlaceholder from "../../../components/ui/MapPlaceholder";
// import PhotoUploadGrid from "../../../components/ui/PhotoUploadGrid";
// import { ZONE_OPTIONS, WARD_OPTIONS, MARKET_OPTIONS, YES_NO_OPTIONS, BUSINESS_CATEGORY_OPTIONS } from "../../../lib/options";
// import { fetchVendorApplicationByNo, submitSurvey } from "../../../services/vendorApplicationService";
// import { useAuth } from "../../../modules/auth/hooks/useAuth";

// // Backend survey stage only supports two recommendations: Approve / Send Back
// const RECOMMENDATIONS = [
//   { value: "Approve", icon: FiThumbsUp, tone: "border-success-500 bg-success-100 text-success-500" },
//   { value: "Send Back", icon: FiThumbsDown, tone: "border-warning-500 bg-warning-100 text-warning-500" },
// ];

// export default function NewSurvey() {
//   const { vendorId: applicationNo } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [photos, setPhotos] = useState([]);
//   const [recommendation, setRecommendation] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [done, setDone] = useState(null);

//   const {
//     register,
//     watch,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       ward: "",
//       zone: "",
//       businessType: "",
//     },
//   });

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//       setValue("ward", result.data.ward || result.data.address?.ward || "");
//       setValue("zone", result.data.address?.zone || "");
//       setValue("businessType", result.data.business?.businessType || "");
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, setValue]);

//   const latitude = watch("latitude");
//   const longitude = watch("longitude");
//   const [locateError, setLocateError] = useState("");
//   const [locating, setLocating] = useState(false);

//   // ── Real GPS capture (28-10 request) — previously this just set fixed dummy coordinates.
//   //    Geo location is compulsory for every survey now, so it must be the officer's actual
//   //    on-site location, not a placeholder. ──
//   const handleLocate = () => {
//     setLocateError("");
//     if (!navigator.geolocation) {
//       setLocateError("Geolocation is not supported on this device/browser.");
//       return;
//     }
//     setLocating(true);
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocating(false);
//         setValue("latitude", String(position.coords.latitude));
//         setValue("longitude", String(position.coords.longitude));
//       },
//       (err) => {
//         setLocating(false);
//         setLocateError(err?.message || "Could not fetch current location. Please allow location access and try again.");
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   };

//   const onSubmit = async (formData) => {
//     if (!recommendation) return;
//     setSubmitError("");
//     setSubmitting(true);

//     // Backend only stores one free-text `comments` field for the survey — bundle the
//     // extra field-survey details into it so nothing gets lost.
//     const comments = [
//       formData.market ? `Market: ${formData.market}` : "",
//       formData.roadWidth ? `Road Width: ${formData.roadWidth} ft` : "",
//       formData.nearbyLandmark ? `Nearby Landmark: ${formData.nearbyLandmark}` : "",
//       formData.existingVendor ? `Existing Vendor: ${formData.existingVendor}` : "",
//       formData.encroachment ? `Encroachment: ${formData.encroachment}` : "",
//       formData.businessType ? `Business Type (field-verified): ${formData.businessType}` : "",
//       formData.officerRemarks ? `Remarks: ${formData.officerRemarks}` : "",
//     ]
//       .filter(Boolean)
//       .join(" | ");

//     const rawPhotos = photos
//       .map((p) => (p?.file instanceof File ? p.file : p instanceof File ? p : null))
//       .filter(Boolean);

//     const result = await submitSurvey(applicationNo, {
//       lat: formData.latitude,
//       lng: formData.longitude,
//       comments,
//       recommendation,
//       ward: formData.ward,
//       surveyPhotos: rawPhotos,
//     });

//     setSubmitting(false);

//     if (!result.success) {
//       setSubmitError(result.message || "Could not submit the survey. Please try again.");
//       return;
//     }

//     setDone(result.data);
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
//         <p className="text-sm text-ink-500">{loadError || "Vendor not found."}</p>
//         <Link to="/survey" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Survey Queue
//         </Link>
//       </Card>
//     );
//   }

//   if (done) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Survey Submitted</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           Survey for {vendor.personal?.fullName} recorded with recommendation{" "}
//           <span className="font-semibold text-ink-800">{done.survey?.recommendation}</span>.
//         </p>
//         <div className="mt-5 flex gap-3 rounded-xl bg-ink-50 px-5 py-3 id-mono text-sm">
//           <span className="text-ink-500">Application No.</span>
//           <span className="font-semibold text-ink-900">{done.applicationNo}</span>
//         </div>
//         <div className="mt-6 flex gap-3">
//           <Button variant="outline" onClick={() => navigate(`/vendors/profile/${vendor.applicationNo}`)}>
//             View Vendor
//           </Button>
//           <Button onClick={() => navigate("/survey")}>Back to Survey Queue</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link to="/survey" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to Survey Queue
//       </Link>

//       <Card>
//         <div className="mb-6 flex items-center gap-4 rounded-2xl bg-brand-50 p-4">
//           <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//           <div>
//             <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//             <div className="mt-0.5 flex items-center gap-3 text-xs text-ink-500">
//               <IdBadge className="bg-white">{vendor.applicationNo}</IdBadge>
//               <span>
//                 {vendor.address?.ward} &middot; {vendor.address?.zone}
//               </span>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Survey Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Survey Date" value={new Date().toISOString().slice(0, 10)} disabled className="bg-ink-50 text-ink-400" />
//               <Input label="Survey Officer" value={user?.fullName || ""} disabled className="bg-ink-50 text-ink-400" />
//               <Input label="Ward (assignment)" value={watch("ward")} disabled className="bg-ink-50 text-ink-400" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//             <div>
//               <MapPlaceholder latitude={latitude} longitude={longitude} onLocate={handleLocate} />
//               {locating && <p className="mt-1.5 text-xs text-ink-400">Fetching current location...</p>}
//               {locateError && <p className="mt-1.5 text-xs font-medium text-danger-500">{locateError}</p>}
//             </div>

//             <div className="grid grid-cols-2 gap-x-4 gap-y-5">
//               <Input
//                 label="Latitude"
//                 required
//                 placeholder="19.0760"
//                 error={errors.latitude?.message}
//                 {...register("latitude", { required: "Latitude is required" })}
//               />
//               <Input
//                 label="Longitude"
//                 required
//                 placeholder="72.8777"
//                 error={errors.longitude?.message}
//                 {...register("longitude", { required: "Longitude is required" })}
//               />
//               <Select label="Ward (zone change)" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone (reference only)" options={ZONE_OPTIONS} disabled {...register("zone")} />
//               <Select label="Market" options={MARKET_OPTIONS} className="col-span-2" {...register("market")} />
//               <Input label="Road Width (in ft)" type="number" {...register("roadWidth")} />
//               <Input label="Nearby Landmark" {...register("nearbyLandmark")} />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
//             <Select label="Business Type" options={BUSINESS_CATEGORY_OPTIONS} {...register("businessType")} />
//             <Select label="Existing Vendor" options={YES_NO_OPTIONS} {...register("existingVendor")} />
//             <Select label="Encroachment" options={YES_NO_OPTIONS} {...register("encroachment")} />
//           </div>

//           <PhotoUploadGrid label="Survey Photos" photos={photos} onChange={setPhotos} />

//           <Textarea label="Officer Remarks" placeholder="Add field observations..." {...register("officerRemarks")} />

//           <div>
//             <span className="mb-2 block text-[13px] font-semibold text-ink-700">
//               Recommendation <span className="text-danger-500">*</span>
//             </span>
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//               {RECOMMENDATIONS.map(({ value, icon: Icon, tone }) => (
//                 <button
//                   type="button"
//                   key={value}
//                   onClick={() => setRecommendation(value)}
//                   className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
//                     recommendation === value ? tone : "border-ink-100 text-ink-500 hover:border-ink-200"
//                   }`}
//                 >
//                   <Icon size={16} /> {value === "Send Back" ? "Send Back to Counter Officer" : value}
//                 </button>
//               ))}
//             </div>
//             {!recommendation && (
//               <p className="mt-1.5 text-xs text-ink-400">Select a recommendation to enable submission.</p>
//             )}
//           </div>

//           {submitError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {submitError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button type="button" variant="outline" icon={FiArrowLeft} onClick={() => navigate("/survey")} disabled={submitting}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiCheckCircle} disabled={!recommendation || submitting}>
//               {submitting ? "Submitting..." : "Submit Survey"}
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
// import { FiArrowLeft, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { Input, Select, Textarea } from "../../../components/ui/Field";
// import MapPlaceholder from "../../../components/ui/MapPlaceholder";
// import PhotoUploadGrid from "../../../components/ui/PhotoUploadGrid";
// import { ZONE_OPTIONS, WARD_OPTIONS, MARKET_OPTIONS, YES_NO_OPTIONS, BUSINESS_CATEGORY_OPTIONS } from "../../../lib/options";
// import { fetchVendorApplicationByNo, submitSurvey } from "../../../services/vendorApplicationService";
// import { useAuth } from "../../../modules/auth/hooks/useAuth";

// // Backend survey stage only supports two recommendations: Approve / Send Back
// const RECOMMENDATIONS = [
//   { value: "Approve", icon: FiThumbsUp, tone: "border-success-500 bg-success-100 text-success-500" },
//   { value: "Send Back", icon: FiThumbsDown, tone: "border-warning-500 bg-warning-100 text-warning-500" },
// ];

// export default function NewSurvey() {
//   const { vendorId: applicationNo } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [photos, setPhotos] = useState([]);
//   const [recommendation, setRecommendation] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [done, setDone] = useState(null);

//   const {
//     register,
//     watch,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       ward: "",
//       zone: "",
//       businessType: "",
//     },
//   });

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//       setValue("ward", result.data.ward || result.data.address?.ward || "");
//       setValue("zone", result.data.address?.zone || "");
//       setValue("businessType", result.data.business?.businessType || "");
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, setValue]);

//   const latitude = watch("latitude");
//   const longitude = watch("longitude");

//   const handleLocate = () => {
//     setValue("latitude", "19.0760");
//     setValue("longitude", "72.8777");
//   };

//   const onSubmit = async (formData) => {
//     if (!recommendation) return;
//     setSubmitError("");
//     setSubmitting(true);

//     // Backend only stores one free-text `comments` field for the survey — bundle the
//     // extra field-survey details into it so nothing gets lost.
//     const comments = [
//       formData.market ? `Market: ${formData.market}` : "",
//       formData.roadWidth ? `Road Width: ${formData.roadWidth} ft` : "",
//       formData.nearbyLandmark ? `Nearby Landmark: ${formData.nearbyLandmark}` : "",
//       formData.existingVendor ? `Existing Vendor: ${formData.existingVendor}` : "",
//       formData.encroachment ? `Encroachment: ${formData.encroachment}` : "",
//       formData.businessType ? `Business Type (field-verified): ${formData.businessType}` : "",
//       formData.officerRemarks ? `Remarks: ${formData.officerRemarks}` : "",
//     ]
//       .filter(Boolean)
//       .join(" | ");

//     const rawPhotos = photos
//       .map((p) => (p?.file instanceof File ? p.file : p instanceof File ? p : null))
//       .filter(Boolean);

//     const result = await submitSurvey(applicationNo, {
//       lat: formData.latitude,
//       lng: formData.longitude,
//       comments,
//       recommendation,
//       ward: formData.ward,
//       surveyPhotos: rawPhotos,
//     });

//     setSubmitting(false);

//     if (!result.success) {
//       setSubmitError(result.message || "Could not submit the survey. Please try again.");
//       return;
//     }

//     setDone(result.data);
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
//         <p className="text-sm text-ink-500">{loadError || "Vendor not found."}</p>
//         <Link to="/survey" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Survey Queue
//         </Link>
//       </Card>
//     );
//   }

//   if (done) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Survey Submitted</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           Survey for {vendor.personal?.fullName} recorded with recommendation{" "}
//           <span className="font-semibold text-ink-800">{done.survey?.recommendation}</span>.
//         </p>
//         <div className="mt-5 flex gap-3 rounded-xl bg-ink-50 px-5 py-3 id-mono text-sm">
//           <span className="text-ink-500">Application No.</span>
//           <span className="font-semibold text-ink-900">{done.applicationNo}</span>
//         </div>
//         <div className="mt-6 flex gap-3">
//           <Button variant="outline" onClick={() => navigate(`/vendors/profile/${vendor.applicationNo}`)}>
//             View Vendor
//           </Button>
//           <Button onClick={() => navigate("/survey")}>Back to Survey Queue</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link to="/survey" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to Survey Queue
//       </Link>

//       <Card>
//         <div className="mb-6 flex items-center gap-4 rounded-2xl bg-brand-50 p-4">
//           <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//           <div>
//             <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//             <div className="mt-0.5 flex items-center gap-3 text-xs text-ink-500">
//               <IdBadge className="bg-white">{vendor.applicationNo}</IdBadge>
//               <span>
//                 {vendor.address?.ward} &middot; {vendor.address?.zone}
//               </span>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Survey Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Survey Date" value={new Date().toISOString().slice(0, 10)} disabled className="bg-ink-50 text-ink-400" />
//               <Input label="Survey Officer" value={user?.fullName || ""} disabled className="bg-ink-50 text-ink-400" />
//               <Input label="Ward (assignment)" value={watch("ward")} disabled className="bg-ink-50 text-ink-400" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//             <MapPlaceholder latitude={latitude} longitude={longitude} onLocate={handleLocate} />

//             <div className="grid grid-cols-2 gap-x-4 gap-y-5">
//               <Input
//                 label="Latitude"
//                 required
//                 placeholder="19.0760"
//                 error={errors.latitude?.message}
//                 {...register("latitude", { required: "Latitude is required" })}
//               />
//               <Input
//                 label="Longitude"
//                 required
//                 placeholder="72.8777"
//                 error={errors.longitude?.message}
//                 {...register("longitude", { required: "Longitude is required" })}
//               />
//               <Select label="Ward (zone change)" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone (reference only)" options={ZONE_OPTIONS} disabled {...register("zone")} />
//               <Select label="Market" options={MARKET_OPTIONS} className="col-span-2" {...register("market")} />
//               <Input label="Road Width (in ft)" type="number" {...register("roadWidth")} />
//               <Input label="Nearby Landmark" {...register("nearbyLandmark")} />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
//             <Select label="Business Type" options={BUSINESS_CATEGORY_OPTIONS} {...register("businessType")} />
//             <Select label="Existing Vendor" options={YES_NO_OPTIONS} {...register("existingVendor")} />
//             <Select label="Encroachment" options={YES_NO_OPTIONS} {...register("encroachment")} />
//           </div>

//           <PhotoUploadGrid label="Survey Photos" photos={photos} onChange={setPhotos} />

//           <Textarea label="Officer Remarks" placeholder="Add field observations..." {...register("officerRemarks")} />

//           <div>
//             <span className="mb-2 block text-[13px] font-semibold text-ink-700">
//               Recommendation <span className="text-danger-500">*</span>
//             </span>
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//               {RECOMMENDATIONS.map(({ value, icon: Icon, tone }) => (
//                 <button
//                   type="button"
//                   key={value}
//                   onClick={() => setRecommendation(value)}
//                   className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
//                     recommendation === value ? tone : "border-ink-100 text-ink-500 hover:border-ink-200"
//                   }`}
//                 >
//                   <Icon size={16} /> {value === "Send Back" ? "Send Back to Counter Officer" : value}
//                 </button>
//               ))}
//             </div>
//             {!recommendation && (
//               <p className="mt-1.5 text-xs text-ink-400">Select a recommendation to enable submission.</p>
//             )}
//           </div>

//           {submitError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {submitError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button type="button" variant="outline" icon={FiArrowLeft} onClick={() => navigate("/survey")} disabled={submitting}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiCheckCircle} disabled={!recommendation || submitting}>
//               {submitting ? "Submitting..." : "Submit Survey"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }





// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiHelpCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { Input, Select, Textarea } from "../../../components/ui/Field";
// import MapPlaceholder from "../../../components/ui/MapPlaceholder";
// import PhotoUploadGrid from "../../../components/ui/PhotoUploadGrid";
// import { WARD_OPTIONS, ZONE_OPTIONS, MARKET_OPTIONS, YES_NO_OPTIONS, BUSINESS_CATEGORY_OPTIONS } from "../../../lib/options";
// import { selectVendorById, updateVendorStatus } from "../../../features/vendors/vendorsSlice";
// import { addSurvey, makeSurveyDraft, selectAllSurveys } from "../../../features/survey/surveySlice";
// import { addApplication, makeApplicationDraft } from "../../../features/applications/applicationsSlice";

// const RECOMMENDATIONS = [
//   { value: "Approve", icon: FiThumbsUp, tone: "border-success-500 bg-success-100 text-success-500" },
//   { value: "Reject", icon: FiThumbsDown, tone: "border-danger-500 bg-danger-100 text-danger-500" },
//   { value: "Need Clarification", icon: FiHelpCircle, tone: "border-warning-500 bg-warning-100 text-warning-500" },
// ];

// export default function NewSurvey() {
//   const { vendorId } = useParams();
//   const vendor = useSelector((s) => selectVendorById(s, vendorId));
//   const surveys = useSelector(selectAllSurveys);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [photos, setPhotos] = useState([]);
//   const [recommendation, setRecommendation] = useState("");
//   const [done, setDone] = useState(null);

//   const {
//     register,
//     watch,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       surveyDate: new Date().toISOString().slice(0, 10),
//       surveyOfficer: "Survey Officer",
//       ward: vendor?.address?.ward ?? "",
//       zone: vendor?.address?.zone ?? "",
//       businessType: vendor?.business?.businessCategory ?? "",
//     },
//   });

//   const latitude = watch("latitude");
//   const longitude = watch("longitude");

//   const handleLocate = () => {
//     setValue("latitude", "19.0760");
//     setValue("longitude", "72.8777");
//   };

//   const onSubmit = (formData) => {
//     if (!recommendation) return;
//     const draft = makeSurveyDraft(surveys, vendor, { ...formData, recommendation }, photos);
//     dispatch(addSurvey(draft));

//     const next =
//       recommendation === "Approve"
//         ? { status: "Pending Approval", currentStage: "Counter Employee" }
//         : recommendation === "Reject"
//         ? { status: "Rejected", currentStage: "Rejected" }
//         : { status: "Under Survey", currentStage: "Survey" };

//     dispatch(updateVendorStatus({ id: vendor.id, ...next }));

//     if (recommendation === "Approve") {
//       dispatch(addApplication(makeApplicationDraft(vendor, draft)));
//     }

//     setDone(draft);
//   };

//   if (!vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Vendor not found.</p>
//         <Link to="/survey" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Survey Queue
//         </Link>
//       </Card>
//     );
//   }

//   if (done) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Survey Submitted</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           Survey for {vendor.personal.fullName} recorded with recommendation{" "}
//           <span className="font-semibold text-ink-800">{done.recommendation}</span>.
//         </p>
//         <div className="mt-5 flex gap-3 rounded-xl bg-ink-50 px-5 py-3 id-mono text-sm">
//           <span className="text-ink-500">Survey No.</span>
//           <span className="font-semibold text-ink-900">{done.surveyNumber}</span>
//         </div>
//         <div className="mt-6 flex gap-3">
//           <Button variant="outline" onClick={() => navigate(`/vendors/profile/${vendor.id}`)}>
//             View Vendor
//           </Button>
//           <Button onClick={() => navigate("/survey")}>Back to Survey Queue</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link to="/survey" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to Survey Queue
//       </Link>

//       <Card>
//         <div className="mb-6 flex items-center gap-4 rounded-2xl bg-brand-50 p-4">
//           <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={52} />
//           <div>
//             <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//             <div className="mt-0.5 flex items-center gap-3 text-xs text-ink-500">
//               <IdBadge className="bg-white">{vendor.applicationNo}</IdBadge>
//               <span>{vendor.address.ward} &middot; {vendor.address.zone}</span>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Survey Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input
//                 label="Survey Number"
//                 value="Auto-generated on submit"
//                 disabled
//                 className="bg-ink-50 text-ink-400"
//               />
//               <Input
//                 type="date"
//                 label="Survey Date"
//                 required
//                 error={errors.surveyDate?.message}
//                 {...register("surveyDate", { required: "Survey date is required" })}
//               />
//               <Input
//                 label="Survey Officer"
//                 required
//                 error={errors.surveyOfficer?.message}
//                 {...register("surveyOfficer", { required: "Survey officer is required" })}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//             <MapPlaceholder latitude={latitude} longitude={longitude} onLocate={handleLocate} />

//             <div className="grid grid-cols-2 gap-x-4 gap-y-5">
//               <Input
//                 label="Latitude"
//                 required
//                 placeholder="19.0760"
//                 error={errors.latitude?.message}
//                 {...register("latitude", { required: "Latitude is required" })}
//               />
//               <Input
//                 label="Longitude"
//                 required
//                 placeholder="72.8777"
//                 error={errors.longitude?.message}
//                 {...register("longitude", { required: "Longitude is required" })}
//               />
//               <Select label="Ward" required options={WARD_OPTIONS} error={errors.ward?.message} {...register("ward", { required: true })} />
//               <Select label="Zone" required options={ZONE_OPTIONS} error={errors.zone?.message} {...register("zone", { required: true })} />
//               <Select
//                 label="Market"
//                 options={MARKET_OPTIONS}
//                 className="col-span-2"
//                 {...register("market")}
//               />
//               <Input
//                 label="Road Width (in ft)"
//                 type="number"
//                 required
//                 error={errors.roadWidth?.message}
//                 {...register("roadWidth", { required: "Road width is required" })}
//               />
//               <Input label="Nearby Landmark" required error={errors.nearbyLandmark?.message} {...register("nearbyLandmark", { required: "Nearby landmark is required" })} />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
//             <Select
//               label="Business Type"
//               required
//               options={BUSINESS_CATEGORY_OPTIONS}
//               error={errors.businessType?.message}
//               {...register("businessType", { required: "Business type is required" })}
//             />
//             <Select
//               label="Existing Vendor"
//               required
//               options={YES_NO_OPTIONS}
//               error={errors.existingVendor?.message}
//               {...register("existingVendor", { required: "This field is required" })}
//             />
//             <Select
//               label="Encroachment"
//               required
//               options={YES_NO_OPTIONS}
//               error={errors.encroachment?.message}
//               {...register("encroachment", { required: "This field is required" })}
//             />
//           </div>

//           <PhotoUploadGrid label="Survey Photos" required photos={photos} onChange={setPhotos} />

//           <Textarea label="Officer Remarks" placeholder="Add field observations..." {...register("officerRemarks")} />

//           <div>
//             <span className="mb-2 block text-[13px] font-semibold text-ink-700">
//               Recommendation <span className="text-danger-500">*</span>
//             </span>
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//               {RECOMMENDATIONS.map(({ value, icon: Icon, tone }) => (
//                 <button
//                   type="button"
//                   key={value}
//                   onClick={() => setRecommendation(value)}
//                   className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
//                     recommendation === value ? tone : "border-ink-100 text-ink-500 hover:border-ink-200"
//                   }`}
//                 >
//                   <Icon size={16} /> {value}
//                 </button>
//               ))}
//             </div>
//             {!recommendation && (
//               <p className="mt-1.5 text-xs text-ink-400">Select a recommendation to enable submission.</p>
//             )}
//           </div>

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button type="button" variant="outline" icon={FiArrowLeft} onClick={() => navigate("/survey")}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiCheckCircle} disabled={!recommendation}>
//               Submit Survey
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
// import { FiArrowLeft, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiLoader, FiAlertCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { Input, Select, Textarea } from "../../../components/ui/Field";
// import MapPlaceholder from "../../../components/ui/MapPlaceholder";
// import PhotoUploadGrid from "../../../components/ui/PhotoUploadGrid";
// import { ZONE_OPTIONS, WARD_OPTIONS, MARKET_OPTIONS, YES_NO_OPTIONS, BUSINESS_CATEGORY_OPTIONS } from "../../../lib/options";
// import { fetchVendorApplicationByNo, submitSurvey } from "../../../services/vendorApplicationService";
// import { useAuth } from "../../../modules/auth/hooks/useAuth";

// // Backend survey stage only supports two recommendations: Approve / Send Back
// const RECOMMENDATIONS = [
//   { value: "Approve", icon: FiThumbsUp, tone: "border-success-500 bg-success-100 text-success-500" },
//   { value: "Send Back", icon: FiThumbsDown, tone: "border-warning-500 bg-warning-100 text-warning-500" },
// ];

// export default function NewSurvey() {
//   const { vendorId: applicationNo } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   const [photos, setPhotos] = useState([]);
//   const [recommendation, setRecommendation] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [done, setDone] = useState(null);

//   const {
//     register,
//     watch,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       ward: "",
//       zone: "",
//       businessType: "",
//     },
//   });

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setLoadError("");
//     fetchVendorApplicationByNo(applicationNo).then((result) => {
//       if (cancelled) return;
//       setLoading(false);
//       if (!result.success) {
//         setLoadError(result.message || "Vendor not found.");
//         return;
//       }
//       setVendor(result.data);
//       setValue("ward", result.data.ward || result.data.address?.ward || "");
//       setValue("zone", result.data.address?.zone || "");
//       setValue("businessType", result.data.business?.businessCategory || "");
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [applicationNo, setValue]);

//   const latitude = watch("latitude");
//   const longitude = watch("longitude");

//   const handleLocate = () => {
//     setValue("latitude", "19.0760");
//     setValue("longitude", "72.8777");
//   };

//   const onSubmit = async (formData) => {
//     if (!recommendation) return;
//     setSubmitError("");
//     setSubmitting(true);

//     // Backend only stores one free-text `comments` field for the survey — bundle the
//     // extra field-survey details into it so nothing gets lost.
//     const comments = [
//       formData.market ? `Market: ${formData.market}` : "",
//       formData.roadWidth ? `Road Width: ${formData.roadWidth} ft` : "",
//       formData.nearbyLandmark ? `Nearby Landmark: ${formData.nearbyLandmark}` : "",
//       formData.existingVendor ? `Existing Vendor: ${formData.existingVendor}` : "",
//       formData.encroachment ? `Encroachment: ${formData.encroachment}` : "",
//       formData.businessType ? `Business Type (field-verified): ${formData.businessType}` : "",
//       formData.officerRemarks ? `Remarks: ${formData.officerRemarks}` : "",
//     ]
//       .filter(Boolean)
//       .join(" | ");

//     const rawPhotos = photos
//       .map((p) => (p?.file instanceof File ? p.file : p instanceof File ? p : null))
//       .filter(Boolean);

//     const result = await submitSurvey(applicationNo, {
//       lat: formData.latitude,
//       lng: formData.longitude,
//       comments,
//       recommendation,
//       ward: formData.ward,
//       surveyPhotos: rawPhotos,
//     });

//     setSubmitting(false);

//     if (!result.success) {
//       setSubmitError(result.message || "Could not submit the survey. Please try again.");
//       return;
//     }

//     setDone(result.data);
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
//         <p className="text-sm text-ink-500">{loadError || "Vendor not found."}</p>
//         <Link to="/survey" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Survey Queue
//         </Link>
//       </Card>
//     );
//   }

//   if (done) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Survey Submitted</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           Survey for {vendor.personal?.fullName} recorded with recommendation{" "}
//           <span className="font-semibold text-ink-800">{done.survey?.recommendation}</span>.
//         </p>
//         <div className="mt-5 flex gap-3 rounded-xl bg-ink-50 px-5 py-3 id-mono text-sm">
//           <span className="text-ink-500">Application No.</span>
//           <span className="font-semibold text-ink-900">{done.applicationNo}</span>
//         </div>
//         <div className="mt-6 flex gap-3">
//           <Button variant="outline" onClick={() => navigate(`/vendors/profile/${vendor.applicationNo}`)}>
//             View Vendor
//           </Button>
//           <Button onClick={() => navigate("/survey")}>Back to Survey Queue</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link to="/survey" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to Survey Queue
//       </Link>

//       <Card>
//         <div className="mb-6 flex items-center gap-4 rounded-2xl bg-brand-50 p-4">
//           <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
//           <div>
//             <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
//             <div className="mt-0.5 flex items-center gap-3 text-xs text-ink-500">
//               <IdBadge className="bg-white">{vendor.applicationNo}</IdBadge>
//               <span>
//                 {vendor.address?.ward} &middot; {vendor.address?.zone}
//               </span>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Survey Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input label="Survey Date" value={new Date().toISOString().slice(0, 10)} disabled className="bg-ink-50 text-ink-400" />
//               <Input label="Survey Officer" value={user?.fullName || ""} disabled className="bg-ink-50 text-ink-400" />
//               <Input label="Ward (assignment)" value={watch("ward")} disabled className="bg-ink-50 text-ink-400" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//             <MapPlaceholder latitude={latitude} longitude={longitude} onLocate={handleLocate} />

//             <div className="grid grid-cols-2 gap-x-4 gap-y-5">
//               <Input
//                 label="Latitude"
//                 required
//                 placeholder="19.0760"
//                 error={errors.latitude?.message}
//                 {...register("latitude", { required: "Latitude is required" })}
//               />
//               <Input
//                 label="Longitude"
//                 required
//                 placeholder="72.8777"
//                 error={errors.longitude?.message}
//                 {...register("longitude", { required: "Longitude is required" })}
//               />
//               <Select label="Ward (zone change)" options={WARD_OPTIONS} {...register("ward")} />
//               <Select label="Zone (reference only)" options={ZONE_OPTIONS} disabled {...register("zone")} />
//               <Select label="Market" options={MARKET_OPTIONS} className="col-span-2" {...register("market")} />
//               <Input label="Road Width (in ft)" type="number" {...register("roadWidth")} />
//               <Input label="Nearby Landmark" {...register("nearbyLandmark")} />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
//             <Select label="Business Type" options={BUSINESS_CATEGORY_OPTIONS} {...register("businessType")} />
//             <Select label="Existing Vendor" options={YES_NO_OPTIONS} {...register("existingVendor")} />
//             <Select label="Encroachment" options={YES_NO_OPTIONS} {...register("encroachment")} />
//           </div>

//           <PhotoUploadGrid label="Survey Photos" photos={photos} onChange={setPhotos} />

//           <Textarea label="Officer Remarks" placeholder="Add field observations..." {...register("officerRemarks")} />

//           <div>
//             <span className="mb-2 block text-[13px] font-semibold text-ink-700">
//               Recommendation <span className="text-danger-500">*</span>
//             </span>
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//               {RECOMMENDATIONS.map(({ value, icon: Icon, tone }) => (
//                 <button
//                   type="button"
//                   key={value}
//                   onClick={() => setRecommendation(value)}
//                   className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
//                     recommendation === value ? tone : "border-ink-100 text-ink-500 hover:border-ink-200"
//                   }`}
//                 >
//                   <Icon size={16} /> {value === "Send Back" ? "Send Back to Counter Officer" : value}
//                 </button>
//               ))}
//             </div>
//             {!recommendation && (
//               <p className="mt-1.5 text-xs text-ink-400">Select a recommendation to enable submission.</p>
//             )}
//           </div>

//           {submitError && (
//             <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//               <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
//               {submitError}
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button type="button" variant="outline" icon={FiArrowLeft} onClick={() => navigate("/survey")} disabled={submitting}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiCheckCircle} disabled={!recommendation || submitting}>
//               {submitting ? "Submitting..." : "Submit Survey"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }



// ==============================


// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiHelpCircle } from "react-icons/fi";
// import Card from "../../../components/ui/Card";
// import Button from "../../../components/ui/Button";
// import Avatar from "../../../components/ui/Avatar";
// import { IdBadge } from "../../../components/ui/Avatar";
// import { Input, Select, Textarea } from "../../../components/ui/Field";
// import MapPlaceholder from "../../../components/ui/MapPlaceholder";
// import PhotoUploadGrid from "../../../components/ui/PhotoUploadGrid";
// import { WARD_OPTIONS, ZONE_OPTIONS, MARKET_OPTIONS, YES_NO_OPTIONS, BUSINESS_CATEGORY_OPTIONS } from "../../../lib/options";
// import { selectVendorById, updateVendorStatus } from "../../../features/vendors/vendorsSlice";
// import { addSurvey, makeSurveyDraft, selectAllSurveys } from "../../../features/survey/surveySlice";
// import { addApplication, makeApplicationDraft } from "../../../features/applications/applicationsSlice";

// const RECOMMENDATIONS = [
//   { value: "Approve", icon: FiThumbsUp, tone: "border-success-500 bg-success-100 text-success-500" },
//   { value: "Reject", icon: FiThumbsDown, tone: "border-danger-500 bg-danger-100 text-danger-500" },
//   { value: "Need Clarification", icon: FiHelpCircle, tone: "border-warning-500 bg-warning-100 text-warning-500" },
// ];

// export default function NewSurvey() {
//   const { vendorId } = useParams();
//   const vendor = useSelector((s) => selectVendorById(s, vendorId));
//   const surveys = useSelector(selectAllSurveys);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [photos, setPhotos] = useState([]);
//   const [recommendation, setRecommendation] = useState("");
//   const [done, setDone] = useState(null);

//   const {
//     register,
//     watch,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       surveyDate: new Date().toISOString().slice(0, 10),
//       surveyOfficer: "Survey Officer",
//       ward: vendor?.address?.ward ?? "",
//       zone: vendor?.address?.zone ?? "",
//       businessType: vendor?.business?.businessCategory ?? "",
//     },
//   });

//   const latitude = watch("latitude");
//   const longitude = watch("longitude");

//   const handleLocate = () => {
//     setValue("latitude", "19.0760");
//     setValue("longitude", "72.8777");
//   };

//   const onSubmit = (formData) => {
//     if (!recommendation) return;
//     const draft = makeSurveyDraft(surveys, vendor, { ...formData, recommendation }, photos);
//     dispatch(addSurvey(draft));

//     const next =
//       recommendation === "Approve"
//         ? { status: "Pending Approval", currentStage: "Counter Employee" }
//         : recommendation === "Reject"
//         ? { status: "Rejected", currentStage: "Rejected" }
//         : { status: "Under Survey", currentStage: "Survey" };

//     dispatch(updateVendorStatus({ id: vendor.id, ...next }));

//     if (recommendation === "Approve") {
//       dispatch(addApplication(makeApplicationDraft(vendor, draft)));
//     }

//     setDone(draft);
//   };

//   if (!vendor) {
//     return (
//       <Card className="mx-auto max-w-md text-center">
//         <p className="text-sm text-ink-500">Vendor not found.</p>
//         <Link to="/survey" className="mt-3 inline-block text-sm font-semibold text-brand-600">
//           Back to Survey Queue
//         </Link>
//       </Card>
//     );
//   }

//   if (done) {
//     return (
//       <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
//           <FiCheckCircle size={30} />
//         </div>
//         <h2 className="font-display text-xl font-bold text-ink-900">Survey Submitted</h2>
//         <p className="mt-2 max-w-sm text-sm text-ink-500">
//           Survey for {vendor.personal.fullName} recorded with recommendation{" "}
//           <span className="font-semibold text-ink-800">{done.recommendation}</span>.
//         </p>
//         <div className="mt-5 flex gap-3 rounded-xl bg-ink-50 px-5 py-3 id-mono text-sm">
//           <span className="text-ink-500">Survey No.</span>
//           <span className="font-semibold text-ink-900">{done.surveyNumber}</span>
//         </div>
//         <div className="mt-6 flex gap-3">
//           <Button variant="outline" onClick={() => navigate(`/vendors/profile/${vendor.id}`)}>
//             View Vendor
//           </Button>
//           <Button onClick={() => navigate("/survey")}>Back to Survey Queue</Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl space-y-5">
//       <Link to="/survey" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
//         <FiArrowLeft size={14} /> Back to Survey Queue
//       </Link>

//       <Card>
//         <div className="mb-6 flex items-center gap-4 rounded-2xl bg-brand-50 p-4">
//           <Avatar src={vendor.documents?.photo?.url} name={vendor.personal.fullName} size={52} />
//           <div>
//             <p className="font-display text-base font-bold text-ink-900">{vendor.personal.fullName}</p>
//             <div className="mt-0.5 flex items-center gap-3 text-xs text-ink-500">
//               <IdBadge className="bg-white">{vendor.applicationNo}</IdBadge>
//               <span>{vendor.address.ward} &middot; {vendor.address.zone}</span>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//           <div>
//             <h2 className="mb-4 font-display text-base font-bold text-ink-900">Survey Details</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
//               <Input
//                 label="Survey Number"
//                 value="Auto-generated on submit"
//                 disabled
//                 className="bg-ink-50 text-ink-400"
//               />
//               <Input
//                 type="date"
//                 label="Survey Date"
//                 required
//                 error={errors.surveyDate?.message}
//                 {...register("surveyDate", { required: "Survey date is required" })}
//               />
//               <Input
//                 label="Survey Officer"
//                 required
//                 error={errors.surveyOfficer?.message}
//                 {...register("surveyOfficer", { required: "Survey officer is required" })}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//             <MapPlaceholder latitude={latitude} longitude={longitude} onLocate={handleLocate} />

//             <div className="grid grid-cols-2 gap-x-4 gap-y-5">
//               <Input
//                 label="Latitude"
//                 required
//                 placeholder="19.0760"
//                 error={errors.latitude?.message}
//                 {...register("latitude", { required: "Latitude is required" })}
//               />
//               <Input
//                 label="Longitude"
//                 required
//                 placeholder="72.8777"
//                 error={errors.longitude?.message}
//                 {...register("longitude", { required: "Longitude is required" })}
//               />
//               <Select label="Ward" required options={WARD_OPTIONS} error={errors.ward?.message} {...register("ward", { required: true })} />
//               <Select label="Zone" required options={ZONE_OPTIONS} error={errors.zone?.message} {...register("zone", { required: true })} />
//               <Select
//                 label="Market"
//                 options={MARKET_OPTIONS}
//                 className="col-span-2"
//                 {...register("market")}
//               />
//               <Input
//                 label="Road Width (in ft)"
//                 type="number"
//                 required
//                 error={errors.roadWidth?.message}
//                 {...register("roadWidth", { required: "Road width is required" })}
//               />
//               <Input label="Nearby Landmark" required error={errors.nearbyLandmark?.message} {...register("nearbyLandmark", { required: "Nearby landmark is required" })} />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
//             <Select
//               label="Business Type"
//               required
//               options={BUSINESS_CATEGORY_OPTIONS}
//               error={errors.businessType?.message}
//               {...register("businessType", { required: "Business type is required" })}
//             />
//             <Select
//               label="Existing Vendor"
//               required
//               options={YES_NO_OPTIONS}
//               error={errors.existingVendor?.message}
//               {...register("existingVendor", { required: "This field is required" })}
//             />
//             <Select
//               label="Encroachment"
//               required
//               options={YES_NO_OPTIONS}
//               error={errors.encroachment?.message}
//               {...register("encroachment", { required: "This field is required" })}
//             />
//           </div>

//           <PhotoUploadGrid label="Survey Photos" required photos={photos} onChange={setPhotos} />

//           <Textarea label="Officer Remarks" placeholder="Add field observations..." {...register("officerRemarks")} />

//           <div>
//             <span className="mb-2 block text-[13px] font-semibold text-ink-700">
//               Recommendation <span className="text-danger-500">*</span>
//             </span>
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//               {RECOMMENDATIONS.map(({ value, icon: Icon, tone }) => (
//                 <button
//                   type="button"
//                   key={value}
//                   onClick={() => setRecommendation(value)}
//                   className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
//                     recommendation === value ? tone : "border-ink-100 text-ink-500 hover:border-ink-200"
//                   }`}
//                 >
//                   <Icon size={16} /> {value}
//                 </button>
//               ))}
//             </div>
//             {!recommendation && (
//               <p className="mt-1.5 text-xs text-ink-400">Select a recommendation to enable submission.</p>
//             )}
//           </div>

//           <div className="flex items-center justify-between border-t border-ink-100 pt-6">
//             <Button type="button" variant="outline" icon={FiArrowLeft} onClick={() => navigate("/survey")}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="success" icon={FiCheckCircle} disabled={!recommendation}>
//               Submit Survey
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiLoader, FiAlertCircle } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Avatar from "../../../components/ui/Avatar";
import { IdBadge } from "../../../components/ui/Avatar";
import { Input, Select, Textarea } from "../../../components/ui/Field";
import MapPlaceholder from "../../../components/ui/MapPlaceholder";
import PhotoUploadGrid from "../../../components/ui/PhotoUploadGrid";
import { ZONE_OPTIONS, WARD_OPTIONS, MARKET_OPTIONS, YES_NO_OPTIONS, BUSINESS_CATEGORY_OPTIONS } from "../../../lib/options";
import { fetchVendorApplicationByNo, submitSurvey } from "../../../services/vendorApplicationService";
import { useAuth } from "../../../modules/auth/hooks/useAuth";
// ── No Feriwala Area Geofencing (NEW) ──
import { checkGeofenceLocation } from "../../../services/geofenceService";

// Backend survey stage only supports two recommendations: Approve / Send Back
const RECOMMENDATIONS = [
  { value: "Approve", icon: FiThumbsUp, tone: "border-success-500 bg-success-100 text-success-500" },
  { value: "Send Back", icon: FiThumbsDown, tone: "border-warning-500 bg-warning-100 text-warning-500" },
];

export default function NewSurvey() {
  const { vendorId: applicationNo } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [photos, setPhotos] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(null);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ward: "",
      zone: "",
      businessType: "",
    },
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError("");
    fetchVendorApplicationByNo(applicationNo).then((result) => {
      if (cancelled) return;
      setLoading(false);
      if (!result.success) {
        setLoadError(result.message || "Vendor not found.");
        return;
      }
      setVendor(result.data);
      setValue("ward", result.data.ward || result.data.address?.ward || "");
      setValue("zone", result.data.address?.zone || "");
      setValue("businessType", result.data.business?.businessType || "");
    });
    return () => {
      cancelled = true;
    };
  }, [applicationNo, setValue]);

  const latitude = watch("latitude");
  const longitude = watch("longitude");
  const [locateError, setLocateError] = useState("");
  const [locating, setLocating] = useState(false);

  // ── No Feriwala Area Geofencing (NEW) ──
  // geofenceStatus: "idle" | "checking" | "inside" | "outside"
  const [geofenceStatus, setGeofenceStatus] = useState("idle");
  const [restrictedAreaName, setRestrictedAreaName] = useState("");

  const checkGeofence = async (lat, lng) => {
    setGeofenceStatus("checking");
    const result = await checkGeofenceLocation(lat, lng);
    if (result.success && result.isInsideRestrictedArea) {
      setGeofenceStatus("inside");
      setRestrictedAreaName(result.area?.name || "No Feriwala Area");
    } else {
      setGeofenceStatus("outside");
      setRestrictedAreaName("");
    }
  };

  // ── Real GPS capture (28-10 request) — previously this just set fixed dummy coordinates.
  //    Geo location is compulsory for every survey now, so it must be the officer's actual
  //    on-site location, not a placeholder. ──
  const handleLocate = () => {
    setLocateError("");
    if (!navigator.geolocation) {
      setLocateError("Geolocation is not supported on this device/browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        const lat = String(position.coords.latitude);
        const lng = String(position.coords.longitude);
        setValue("latitude", lat);
        setValue("longitude", lng);
        // No Feriwala Area Geofencing (NEW) — check immediately after capturing GPS
        checkGeofence(lat, lng);
      },
      (err) => {
        setLocating(false);
        setLocateError(err?.message || "Could not fetch current location. Please allow location access and try again.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const onSubmit = async (formData) => {
    if (!recommendation) return;
    setSubmitError("");

    // ── No Feriwala Area Geofencing (NEW) — hard client-side block too ──
    // (Backend already rejects this at /applications/survey/:applicationNo — this is
    // just an early, friendlier stop so the officer doesn't wait for the network round-trip.)
    let geoState = geofenceStatus;
    if (geoState === "idle" && formData.latitude && formData.longitude) {
      // location was typed manually and never auto-checked — check now before submitting
      setGeofenceStatus("checking");
      const result = await checkGeofenceLocation(formData.latitude, formData.longitude);
      geoState = result.success && result.isInsideRestrictedArea ? "inside" : "outside";
      setGeofenceStatus(geoState);
      setRestrictedAreaName(result.area?.name || "");
    }
    if (geoState === "inside") {
      setSubmitError(
        `⚠️ Survey cannot be submitted — this location falls inside "${restrictedAreaName || "No Feriwala Area"}". Street vending is restricted here.`
      );
      return;
    }

    setSubmitting(true);

    // Backend only stores one free-text `comments` field for the survey — bundle the
    // extra field-survey details into it so nothing gets lost.
    const comments = [
      formData.market ? `Market: ${formData.market}` : "",
      formData.roadWidth ? `Road Width: ${formData.roadWidth} ft` : "",
      formData.nearbyLandmark ? `Nearby Landmark: ${formData.nearbyLandmark}` : "",
      formData.existingVendor ? `Existing Vendor: ${formData.existingVendor}` : "",
      formData.encroachment ? `Encroachment: ${formData.encroachment}` : "",
      formData.businessType ? `Business Type (field-verified): ${formData.businessType}` : "",
      formData.officerRemarks ? `Remarks: ${formData.officerRemarks}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const rawPhotos = photos
      .map((p) => (p?.file instanceof File ? p.file : p instanceof File ? p : null))
      .filter(Boolean);

    const result = await submitSurvey(applicationNo, {
      lat: formData.latitude,
      lng: formData.longitude,
      comments,
      recommendation,
      ward: formData.ward,
      surveyPhotos: rawPhotos,
    });

    setSubmitting(false);

    if (!result.success) {
      setSubmitError(result.message || "Could not submit the survey. Please try again.");
      return;
    }

    setDone(result.data);
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
        <p className="text-sm text-ink-500">{loadError || "Vendor not found."}</p>
        <Link to="/survey" className="mt-3 inline-block text-sm font-semibold text-brand-600">
          Back to Survey Queue
        </Link>
      </Card>
    );
  }

  if (done) {
    return (
      <Card className="mx-auto flex max-w-xl flex-col items-center py-14 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-500">
          <FiCheckCircle size={30} />
        </div>
        <h2 className="font-display text-xl font-bold text-ink-900">Survey Submitted</h2>
        <p className="mt-2 max-w-sm text-sm text-ink-500">
          Survey for {vendor.personal?.fullName} recorded with recommendation{" "}
          <span className="font-semibold text-ink-800">{done.survey?.recommendation}</span>.
        </p>
        <div className="mt-5 flex gap-3 rounded-xl bg-ink-50 px-5 py-3 id-mono text-sm">
          <span className="text-ink-500">Application No.</span>
          <span className="font-semibold text-ink-900">{done.applicationNo}</span>
        </div>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={() => navigate(`/vendors/profile/${vendor.applicationNo}`)}>
            View Vendor
          </Button>
          <Button onClick={() => navigate("/survey")}>Back to Survey Queue</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Link to="/survey" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600">
        <FiArrowLeft size={14} /> Back to Survey Queue
      </Link>

      <Card>
        <div className="mb-6 flex items-center gap-4 rounded-2xl bg-brand-50 p-4">
          <Avatar src={vendor.documents?.photo || undefined} name={vendor.personal?.fullName} size={52} />
          <div>
            <p className="font-display text-base font-bold text-ink-900">{vendor.personal?.fullName}</p>
            <div className="mt-0.5 flex items-center gap-3 text-xs text-ink-500">
              <IdBadge className="bg-white">{vendor.applicationNo}</IdBadge>
              <span>
                {vendor.address?.ward} &middot; {vendor.address?.zone}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <h2 className="mb-4 font-display text-base font-bold text-ink-900">Survey Details</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <Input label="Survey Date" value={new Date().toISOString().slice(0, 10)} disabled className="bg-ink-50 text-ink-400" />
              <Input label="Survey Officer" value={user?.fullName || ""} disabled className="bg-ink-50 text-ink-400" />
              <Input label="Ward (assignment)" value={watch("ward")} disabled className="bg-ink-50 text-ink-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <MapPlaceholder
                latitude={latitude}
                longitude={longitude}
                onLocate={handleLocate}
                restricted={geofenceStatus === "inside"}
              />
              {locating && <p className="mt-1.5 text-xs text-ink-400">Fetching current location...</p>}
              {locateError && <p className="mt-1.5 text-xs font-medium text-danger-500">{locateError}</p>}
              {geofenceStatus === "checking" && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-400">
                  <FiLoader className="animate-spin" size={12} /> Checking No Feriwala Area...
                </p>
              )}
              {/* No Feriwala Area Geofencing (NEW) — prominent, user-friendly warning ── */}
              {geofenceStatus === "inside" && (
                <div className="mt-2 flex items-start gap-2.5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
                  <span>⚠️ You have entered a No Feriwala Area ({restrictedAreaName}). Survey cannot be submitted for this location.</span>
                </div>
              )}
              {geofenceStatus === "outside" && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-success-600">
                  <FiCheckCircle size={13} /> Location is outside all No Feriwala Areas.
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <Input
                label="Latitude"
                required
                placeholder="19.0760"
                error={errors.latitude?.message}
                {...register("latitude", { required: "Latitude is required" })}
              />
              <Input
                label="Longitude"
                required
                placeholder="72.8777"
                error={errors.longitude?.message}
                {...register("longitude", { required: "Longitude is required" })}
              />
              <Select label="Ward (zone change)" options={WARD_OPTIONS} {...register("ward")} />
              <Select label="Zone (reference only)" options={ZONE_OPTIONS} disabled {...register("zone")} />
              <Select label="Market" options={MARKET_OPTIONS} className="col-span-2" {...register("market")} />
              <Input label="Road Width (in ft)" type="number" {...register("roadWidth")} />
              <Input label="Nearby Landmark" {...register("nearbyLandmark")} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
            <Select label="Business Type" options={BUSINESS_CATEGORY_OPTIONS} {...register("businessType")} />
            <Select label="Existing Vendor" options={YES_NO_OPTIONS} {...register("existingVendor")} />
            <Select label="Encroachment" options={YES_NO_OPTIONS} {...register("encroachment")} />
          </div>

          <PhotoUploadGrid label="Survey Photos" photos={photos} onChange={setPhotos} />

          <Textarea label="Officer Remarks" placeholder="Add field observations..." {...register("officerRemarks")} />

          <div>
            <span className="mb-2 block text-[13px] font-semibold text-ink-700">
              Recommendation <span className="text-danger-500">*</span>
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {RECOMMENDATIONS.map(({ value, icon: Icon, tone }) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setRecommendation(value)}
                  className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
                    recommendation === value ? tone : "border-ink-100 text-ink-500 hover:border-ink-200"
                  }`}
                >
                  <Icon size={16} /> {value === "Send Back" ? "Send Back to Counter Officer" : value}
                </button>
              ))}
            </div>
            {!recommendation && (
              <p className="mt-1.5 text-xs text-ink-400">Select a recommendation to enable submission.</p>
            )}
          </div>

          {submitError && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
              {submitError}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-ink-100 pt-6">
            <Button type="button" variant="outline" icon={FiArrowLeft} onClick={() => navigate("/survey")} disabled={submitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="success"
              icon={FiCheckCircle}
              disabled={!recommendation || submitting || geofenceStatus === "inside" || geofenceStatus === "checking"}
            >
              {submitting ? "Submitting..." : geofenceStatus === "inside" ? "Blocked — No Feriwala Area" : "Submit Survey"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
