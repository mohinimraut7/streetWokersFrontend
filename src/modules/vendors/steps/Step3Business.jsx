import { Input, Select } from "../../../components/ui/Field";
import {
  VENDOR_TYPE_OPTIONS,
  BUSINESS_CATEGORY_OPTIONS,
  EXPERIENCE_OPTIONS,
} from "../../../lib/options";

export default function Step3Business({ register, errors }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-ink-900">Business Information</h2>
      <p className="mb-6 mt-1 text-sm text-ink-500">Tell us about the vendor's trade and operating hours.</p>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <Select
          label="Vendor Type"
          required
          options={VENDOR_TYPE_OPTIONS}
          error={errors.vendorType?.message}
          {...register("vendorType", { required: "Vendor type is required" })}
        />
        <Select
          label="Business Category"
          required
          options={BUSINESS_CATEGORY_OPTIONS}
          error={errors.businessCategory?.message}
          {...register("businessCategory", { required: "Business category is required" })}
        />
        <Input
          label="Goods Type"
          required
          placeholder="e.g. Tea & Snacks, Seasonal Fruits"
          error={errors.goodsType?.message}
          {...register("goodsType", { required: "Goods type is required" })}
        />
        <Input
          label="Business Timing"
          required
          placeholder="e.g. 09:00 AM - 08:00 PM"
          error={errors.businessTiming?.message}
          {...register("businessTiming", { required: "Business timing is required" })}
        />
        <Select
          label="Years of Experience"
          required
          options={EXPERIENCE_OPTIONS}
          error={errors.yearsExperience?.message}
          {...register("yearsExperience", { required: "Years of experience is required" })}
        />
      </div>
    </div>
  );
}
