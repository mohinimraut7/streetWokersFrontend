import { useState } from "react";
import { Textarea, Select } from "../../../components/ui/Field";
import { WARD_OPTIONS, ZONE_OPTIONS } from "../../../lib/options";

export default function Step2Address({ register, errors, watch, setValue }) {
  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const permanentAddress = watch("permanentAddress");

  const toggleSame = (checked) => {
    setSameAsPermanent(checked);
    if (checked) setValue("currentAddress", permanentAddress, { shouldValidate: true });
  };

  return (
    <div>
      <h2 className="font-display text-lg font-bold text-ink-900">Address</h2>
      <p className="mb-6 mt-1 text-sm text-ink-500">Provide the vendor's residential and vending ward details.</p>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5">
        <Textarea
          label="Permanent Address"
          required
          placeholder="House no, street, city, state, pincode"
          error={errors.permanentAddress?.message}
          {...register("permanentAddress", { required: "Permanent address is required" })}
        />

        <div>
          <Textarea
            label="Current Address"
            required
            placeholder="House no, street, city, state, pincode"
            disabled={sameAsPermanent}
            error={errors.currentAddress?.message}
            className={sameAsPermanent ? "bg-ink-50 text-ink-500" : ""}
            {...register("currentAddress", { required: "Current address is required" })}
          />
          <label className="mt-2 flex items-center gap-2 text-xs font-medium text-ink-500">
            <input
              type="checkbox"
              checked={sameAsPermanent}
              onChange={(e) => toggleSame(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-ink-300 accent-[#0EA5A8]"
            />
            Same as permanent address
          </label>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <Select
            label="Ward"
            required
            options={WARD_OPTIONS}
            error={errors.ward?.message}
            {...register("ward", { required: "Ward is required" })}
          />
          <Select
            label="Zone"
            required
            options={ZONE_OPTIONS}
            error={errors.zone?.message}
            {...register("zone", { required: "Zone is required" })}
          />
        </div>
      </div>
    </div>
  );
}
