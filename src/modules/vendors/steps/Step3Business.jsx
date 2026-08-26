// import { Input, Select } from "../../../components/ui/Field";
// import {
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";

// export default function Step3Business({ register, errors }) {
//   return (
//     <div>
//       <h2 className="font-display text-lg font-bold text-ink-900">Business Information</h2>
//       <p className="mb-6 mt-1 text-sm text-ink-500">Tell us about the vendor's trade and operating hours.</p>

//       <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//         <Select
//           label="Vendor Type"
//           required
//           options={VENDOR_TYPE_OPTIONS}
//           error={errors.vendorType?.message}
//           {...register("vendorType", { required: "Vendor type is required" })}
//         />
//         <Select
//           label="Business Category"
//           required
//           options={BUSINESS_CATEGORY_OPTIONS}
//           error={errors.businessCategory?.message}
//           {...register("businessCategory", { required: "Business category is required" })}
//         />
//         <Input
//           label="Goods Type"
//           required
//           placeholder="e.g. Tea & Snacks, Seasonal Fruits"
//           error={errors.goodsType?.message}
//           {...register("goodsType", { required: "Goods type is required" })}
//         />
//         <Input
//           label="Business Timing"
//           required
//           placeholder="e.g. 09:00 AM - 08:00 PM"
//           error={errors.businessTiming?.message}
//           {...register("businessTiming", { required: "Business timing is required" })}
//         />
//         <Select
//           label="Years of Experience"
//           required
//           options={EXPERIENCE_OPTIONS}
//           error={errors.yearsExperience?.message}
//           {...register("yearsExperience", { required: "Years of experience is required" })}
//         />
//       </div>
//     </div>
//   );
// }


// import { Input, Select } from "../../../components/ui/Field";
// import {
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   // EXPERIENCE_OPTIONS,
// } from "../../../lib/options";

// export default function Step3Business({ register, errors }) {
//   return (
//     <div>
//       <h2 className="font-display text-lg font-bold text-ink-900">Business Information</h2>
//       <p className="mb-6 mt-1 text-sm text-ink-500">Tell us about the vendor's trade and operating hours.</p>

//       <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//         <Select
//           label="Vendor Type"
//           required
//           options={VENDOR_TYPE_OPTIONS}
//           error={errors.vendorType?.message}
//           {...register("vendorType", { required: "Vendor type is required" })}
//         />
//         <Select
//           label="Business Type"
//           required
//           options={BUSINESS_CATEGORY_OPTIONS}
//           error={errors.businessType?.message}
//           {...register("businessType", { required: "Business type is required" })}
//         />

//         {/* NEW FIELD: Business Place */}
//         <Input
//           label="Business Place"
//           placeholder="Enter business place"
//           error={errors.businessPlace?.message}
//           {...register("businessPlace")}
//         />

//         {/* COMMENTED OUT: Goods Type */}
//         {/* <Input
//           label="Goods Type"
//           required
//           placeholder="e.g. Tea & Snacks, Seasonal Fruits"
//           error={errors.goodsType?.message}
//           {...register("goodsType", { required: "Goods type is required" })}
//         /> */}

//         {/* COMMENTED OUT: Business Timing */}
//         {/* <Input
//           label="Business Timing"
//           required
//           placeholder="e.g. 09:00 AM - 08:00 PM"
//           error={errors.businessTiming?.message}
//           {...register("businessTiming", { required: "Business timing is required" })}
//         /> */}

//         {/* COMMENTED OUT: Years of Experience */}
//         {/* <Select
//           label="Years of Experience"
//           required
//           options={EXPERIENCE_OPTIONS}
//           error={errors.yearsExperience?.message}
//           {...register("yearsExperience", { required: "Years of experience is required" })}
//         /> */}
//       </div>
//     </div>
//   );
// }


// import { Input, Select } from "../../../components/ui/Field";
// import {
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   BUSINESS_PLACE_OPTIONS,
//   // EXPERIENCE_OPTIONS,
// } from "../../../lib/options";

// export default function Step3Business({ register, errors, watch, setValue }) {
//   const businessPlace = watch("businessPlace");
//   const businessType = watch("businessType");

//   return (
//     <div>
//       <h2 className="font-display text-lg font-bold text-ink-900">Business Information</h2>
//       <p className="mb-6 mt-1 text-sm text-ink-500">Tell us about the vendor's trade and operating hours.</p>

//       <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//         {/* COMMENTED OUT: Vendor Type — field removed from the form, kept here for future use */}
//         {/* <Select
//           label="Vendor Type"
//           required
//           options={VENDOR_TYPE_OPTIONS}
//           error={errors.vendorType?.message}
//           {...register("vendorType", { required: "Vendor type is required" })}
//         /> */}

//         {/* UPDATED: Business Type — not mandatory anymore */}
//         <div>
//           <Select
//             label="Business Type"
//             options={BUSINESS_CATEGORY_OPTIONS}
//             error={errors.businessType?.message}
//             {...register("businessType")}
//           />
//           {businessType === "Other" && (
//             <div className="mt-3">
//               <Input
//                 label="Please specify Business Type"
//                 placeholder="Enter business type"
//                 error={errors.businessTypeOther?.message}
//                 {...register("businessTypeOther")}
//               />
//             </div>
//           )}
//         </div>

//         {/* Business Place — defaults to Foot Path, Other reveals a text box */}
//         <div>
//           <Select
//             label="Business Place"
//             options={BUSINESS_PLACE_OPTIONS}
//             defaultValue="Foot Path"
//             error={errors.businessPlace?.message}
//             {...register("businessPlace")}
//           />
//           {businessPlace === "Other" && (
//             <div className="mt-3">
//               <Input
//                 label="Please specify Business Place"
//                 placeholder="Enter business place"
//                 error={errors.businessPlaceOther?.message}
//                 {...register("businessPlaceOther")}
//               />
//             </div>
//           )}
//         </div>

//         {/* RESTORED: Goods Type — optional, not mandatory */}
//         <Input
//           label="Goods Type"
//           placeholder="e.g. Tea & Snacks, Seasonal Fruits"
//           error={errors.goodsType?.message}
//           {...register("goodsType")}
//         />

//         {/* RESTORED: Business Timing — calendar/clock-style time picker (native time input), not mandatory */}
//         <div>
//           <span className="mb-1.5 flex items-center gap-1 text-[13px] font-semibold text-ink-700">
//             Business Timing
//           </span>
//           <div className="flex items-center gap-3">
//             <Input
//               type="time"
//               placeholder="Opening time"
//               error={errors.businessTimingFrom?.message}
//               {...register("businessTimingFrom")}
//             />
//             <span className="text-sm text-ink-400">to</span>
//             <Input
//               type="time"
//               placeholder="Closing time"
//               error={errors.businessTimingTo?.message}
//               {...register("businessTimingTo")}
//             />
//           </div>
//         </div>

//         {/* COMMENTED OUT: Years of Experience */}
//         {/* <Select
//           label="Years of Experience"
//           required
//           options={EXPERIENCE_OPTIONS}
//           error={errors.yearsExperience?.message}
//           {...register("yearsExperience", { required: "Years of experience is required" })}
//         /> */}
//       </div>
//     </div>
//   );
// }




// import { Input, Select } from "../../../components/ui/Field";
// import {
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   EXPERIENCE_OPTIONS,
// } from "../../../lib/options";

// export default function Step3Business({ register, errors }) {
//   return (
//     <div>
//       <h2 className="font-display text-lg font-bold text-ink-900">Business Information</h2>
//       <p className="mb-6 mt-1 text-sm text-ink-500">Tell us about the vendor's trade and operating hours.</p>

//       <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//         <Select
//           label="Vendor Type"
//           required
//           options={VENDOR_TYPE_OPTIONS}
//           error={errors.vendorType?.message}
//           {...register("vendorType", { required: "Vendor type is required" })}
//         />
//         <Select
//           label="Business Category"
//           required
//           options={BUSINESS_CATEGORY_OPTIONS}
//           error={errors.businessCategory?.message}
//           {...register("businessCategory", { required: "Business category is required" })}
//         />
//         <Input
//           label="Goods Type"
//           required
//           placeholder="e.g. Tea & Snacks, Seasonal Fruits"
//           error={errors.goodsType?.message}
//           {...register("goodsType", { required: "Goods type is required" })}
//         />
//         <Input
//           label="Business Timing"
//           required
//           placeholder="e.g. 09:00 AM - 08:00 PM"
//           error={errors.businessTiming?.message}
//           {...register("businessTiming", { required: "Business timing is required" })}
//         />
//         <Select
//           label="Years of Experience"
//           required
//           options={EXPERIENCE_OPTIONS}
//           error={errors.yearsExperience?.message}
//           {...register("yearsExperience", { required: "Years of experience is required" })}
//         />
//       </div>
//     </div>
//   );
// }


// import { Input, Select } from "../../../components/ui/Field";
// import {
//   VENDOR_TYPE_OPTIONS,
//   BUSINESS_CATEGORY_OPTIONS,
//   // EXPERIENCE_OPTIONS,
// } from "../../../lib/options";

// export default function Step3Business({ register, errors }) {
//   return (
//     <div>
//       <h2 className="font-display text-lg font-bold text-ink-900">Business Information</h2>
//       <p className="mb-6 mt-1 text-sm text-ink-500">Tell us about the vendor's trade and operating hours.</p>

//       <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//         <Select
//           label="Vendor Type"
//           required
//           options={VENDOR_TYPE_OPTIONS}
//           error={errors.vendorType?.message}
//           {...register("vendorType", { required: "Vendor type is required" })}
//         />
//         <Select
//           label="Business Type"
//           required
//           options={BUSINESS_CATEGORY_OPTIONS}
//           error={errors.businessType?.message}
//           {...register("businessType", { required: "Business type is required" })}
//         />

//         {/* NEW FIELD: Business Place */}
//         <Input
//           label="Business Place"
//           placeholder="Enter business place"
//           error={errors.businessPlace?.message}
//           {...register("businessPlace")}
//         />

//         {/* COMMENTED OUT: Goods Type */}
//         {/* <Input
//           label="Goods Type"
//           required
//           placeholder="e.g. Tea & Snacks, Seasonal Fruits"
//           error={errors.goodsType?.message}
//           {...register("goodsType", { required: "Goods type is required" })}
//         /> */}

//         {/* COMMENTED OUT: Business Timing */}
//         {/* <Input
//           label="Business Timing"
//           required
//           placeholder="e.g. 09:00 AM - 08:00 PM"
//           error={errors.businessTiming?.message}
//           {...register("businessTiming", { required: "Business timing is required" })}
//         /> */}

//         {/* COMMENTED OUT: Years of Experience */}
//         {/* <Select
//           label="Years of Experience"
//           required
//           options={EXPERIENCE_OPTIONS}
//           error={errors.yearsExperience?.message}
//           {...register("yearsExperience", { required: "Years of experience is required" })}
//         /> */}
//       </div>
//     </div>
//   );
// }


import { Input, Select } from "../../../components/ui/Field";
import {
  VENDOR_TYPE_OPTIONS,
  BUSINESS_CATEGORY_OPTIONS,
  BUSINESS_PLACE_OPTIONS,
  // EXPERIENCE_OPTIONS,
} from "../../../lib/options";

// Business Timing dropdown options — 12-hour Hour (01-12), Minute (00-59), AM/PM.
// Built once, outside the component, so the same array isn't re-created on every render.
const HOUR_OPTIONS = Array.from({ length: 12 }, (_, i) => {
  const v = String(i + 1).padStart(2, "0");
  return { value: v, label: v };
});
const MINUTE_OPTIONS = Array.from({ length: 60 }, (_, i) => {
  const v = String(i).padStart(2, "0");
  return { value: v, label: v };
});
const PERIOD_OPTIONS = [
  { value: "AM", label: "AM" },
  { value: "PM", label: "PM" },
];

export default function Step3Business({ register, errors, watch, setValue }) {
  const businessPlace = watch("businessPlace");
  const businessType = watch("businessType");

  return (
    <div>
      <h2 className="font-display text-lg font-bold text-ink-900">Business Information</h2>
      <p className="mb-6 mt-1 text-sm text-ink-500">Tell us about the vendor's trade and operating hours.</p>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {/* COMMENTED OUT: Vendor Type — field removed from the form, kept here for future use */}
        {/* <Select
          label="Vendor Type"
          required
          options={VENDOR_TYPE_OPTIONS}
          error={errors.vendorType?.message}
          {...register("vendorType", { required: "Vendor type is required" })}
        /> */}

        {/* UPDATED: Business Type — not mandatory anymore */}
        <div>
          <Select
            label="Business Type"
            options={BUSINESS_CATEGORY_OPTIONS}
            error={errors.businessType?.message}
            {...register("businessType")}
          />
          {businessType === "Other" && (
            <div className="mt-3">
              <Input
                label="Please specify Business Type"
                placeholder="Enter business type"
                error={errors.businessTypeOther?.message}
                {...register("businessTypeOther")}
              />
            </div>
          )}
        </div>

        {/* Business Place — defaults to Foot Path, Other reveals a text box */}
        <div>
          <Select
            label="Business Place"
            options={BUSINESS_PLACE_OPTIONS}
            defaultValue="Foot Path"
            error={errors.businessPlace?.message}
            {...register("businessPlace")}
          />
          {businessPlace === "Other" && (
            <div className="mt-3">
              <Input
                label="Please specify Business Place"
                placeholder="Enter business place"
                error={errors.businessPlaceOther?.message}
                {...register("businessPlaceOther")}
              />
            </div>
          )}
        </div>

        {/* RESTORED: Goods Type — optional, not mandatory */}
        <Input
          label="Goods Type"
          placeholder="e.g. Tea & Snacks, Seasonal Fruits"
          error={errors.goodsType?.message}
          {...register("goodsType")}
        />

        {/* RESTORED: Business Timing — custom Hour / Minute / AM-PM dropdowns.
            NOTE: native <input type="time"> was replaced because its 12-hour
            AM/PM display depends on the OS/browser region settings (Windows
            Chrome kept showing a 24-hour list even with lang="en-US") — these
            dropdowns always show AM/PM, on every device, no exceptions. */}
        <div>
          <span className="mb-1.5 flex items-center gap-1 text-[13px] font-semibold text-ink-700">
            Business Timing
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Select
                className="w-[72px]"
                placeholder="HH"
                options={HOUR_OPTIONS}
                error={errors.businessTimingFromHour?.message}
                {...register("businessTimingFromHour")}
              />
              <span className="text-sm text-ink-400">:</span>
              <Select
                className="w-[72px]"
                placeholder="MM"
                options={MINUTE_OPTIONS}
                error={errors.businessTimingFromMinute?.message}
                {...register("businessTimingFromMinute")}
              />
              <Select
                className="w-[84px]"
                placeholder="AM/PM"
                options={PERIOD_OPTIONS}
                error={errors.businessTimingFromPeriod?.message}
                {...register("businessTimingFromPeriod")}
              />
            </div>
            <span className="text-sm text-ink-400">to</span>
            <div className="flex items-center gap-1.5">
              <Select
                className="w-[72px]"
                placeholder="HH"
                options={HOUR_OPTIONS}
                error={errors.businessTimingToHour?.message}
                {...register("businessTimingToHour")}
              />
              <span className="text-sm text-ink-400">:</span>
              <Select
                className="w-[72px]"
                placeholder="MM"
                options={MINUTE_OPTIONS}
                error={errors.businessTimingToMinute?.message}
                {...register("businessTimingToMinute")}
              />
              <Select
                className="w-[84px]"
                placeholder="AM/PM"
                options={PERIOD_OPTIONS}
                error={errors.businessTimingToPeriod?.message}
                {...register("businessTimingToPeriod")}
              />
            </div>
          </div>
        </div>

        {/* COMMENTED OUT: Years of Experience */}
        {/* <Select
          label="Years of Experience"
          required
          options={EXPERIENCE_OPTIONS}
          error={errors.yearsExperience?.message}
          {...register("yearsExperience", { required: "Years of experience is required" })}
        /> */}
      </div>
    </div>
  );
}