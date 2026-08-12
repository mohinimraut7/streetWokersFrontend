// import { Input, Select } from "../../../components/ui/Field";
// import { GENDER_OPTIONS, CATEGORY_OPTIONS } from "../../../lib/options";

// export default function Step1Personal({ register, errors }) {
//   return (
//     <div>
//       <h2 className="font-display text-lg font-bold text-ink-900">Personal Details</h2>
//       <p className="mb-6 mt-1 text-sm text-ink-500">Enter the vendor's personal identification details.</p>

//       <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//         <Input
//           label="Full Name"
//           required
//           placeholder="Enter full name"
//           error={errors.fullName?.message}
//           {...register("fullName", { required: "Full name is required" })}
//         />
//         <Input
//           label="Father's Name"
//           required
//           placeholder="Enter father's name"
//           error={errors.fatherName?.message}
//           {...register("fatherName", { required: "Father's name is required" })}
//         />
//         <Input
//           type="date"
//           label="Date of Birth"
//           required
//           error={errors.dob?.message}
//           {...register("dob", { required: "Date of birth is required" })}
//         />
//         <Select
//           label="Gender"
//           required
//           options={GENDER_OPTIONS}
//           error={errors.gender?.message}
//           {...register("gender", { required: "Gender is required" })}
//         />
//         <Input
//           label="Mobile Number"
//           required
//           placeholder="Enter mobile number"
//           maxLength={10}
//           error={errors.mobile?.message}
//           {...register("mobile", {
//             required: "Mobile number is required",
//             pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
//           })}
//         />
//         <Input
//           type="email"
//           label="Email"
//           placeholder="Enter email address"
//           error={errors.email?.message}
//           {...register("email", {
//             pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
//           })}
//         />
//         <Input
//           label="Aadhaar Number"
//           required
//           placeholder="Enter aadhaar number"
//           maxLength={14}
//           error={errors.aadhaar?.message}
//           {...register("aadhaar", {
//             required: "Aadhaar number is required",
//             pattern: { value: /^\d{4}\s?\d{4}\s?\d{4}$/, message: "Enter a valid 12-digit aadhaar number" },
//           })}
//         />
//         <Input
//           label="PAN Number"
//           placeholder="Enter PAN number"
//           maxLength={10}
//           error={errors.pan?.message}
//           {...register("pan", {
//             pattern: { value: /^[A-Z]{5}\d{4}[A-Z]$/, message: "Enter a valid PAN number" },
//           })}
//         />
//         <Select
//           label="Category"
//           required
//           options={CATEGORY_OPTIONS}
//           error={errors.category?.message}
//           {...register("category", { required: "Category is required" })}
//         />
//       </div>
//     </div>
//   );
// }





// import { Input, Select } from "../../../components/ui/Field";
// import { GENDER_OPTIONS, CATEGORY_OPTIONS } from "../../../lib/options";

// export default function Step1Personal({ register, errors }) {
//   return (
//     <div>
//       <h2 className="font-display text-lg font-bold text-ink-900">Personal Details</h2>
//       <p className="mb-6 mt-1 text-sm text-ink-500">Enter the vendor's personal identification details.</p>

//       <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//         <Input
//           label="Full Name"
//           required
//           placeholder="Enter full name"
//           error={errors.fullName?.message}
//           {...register("fullName", { required: "Full name is required" })}
//         />
//         {/* <Input
//           label="Father's Name"
//           // required
//           placeholder="Enter father's name"
//           error={errors.fatherName?.message}
//           {...register("fatherName")}
//           // {...register("fatherName", { required: "Father's name is required" })}
//         /> */}
//         <Input
//           type="date"
//           label="Date of Birth"
//           required
//           error={errors.dob?.message}
//           {...register("dob", { required: "Date of birth is required" })}
//         />
//         <Select
//           label="Gender"
//           required
//           options={GENDER_OPTIONS}
//           error={errors.gender?.message}
//           {...register("gender", { required: "Gender is required" })}
//         />
//         <Input
//           label="Mobile Number"
//           required
//           placeholder="Enter mobile number"
//           maxLength={10}
//           error={errors.mobile?.message}
//           {...register("mobile", {
//             required: "Mobile number is required",
//             pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
//           })}
//         />
//         <Input
//           type="email"
//           label="Email"
//           placeholder="Enter email address"
//           error={errors.email?.message}
//           {...register("email", {
//             pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
//           })}
//         />
//         <Input
//           label="Aadhaar Number"
//           required
//           placeholder="Enter aadhaar number"
//           maxLength={14}
//           error={errors.aadhaar?.message}
//           {...register("aadhaar", {
//             required: "Aadhaar number is required",
//             pattern: { value: /^\d{4}\s?\d{4}\s?\d{4}$/, message: "Enter a valid 12-digit aadhaar number" },
//           })}
//         />
//         <Input
//           label="PAN Number"
//           placeholder="Enter PAN number"
//           maxLength={10}
//           error={errors.pan?.message}
//           {...register("pan", {
//             pattern: { value: /^[A-Z]{5}\d{4}[A-Z]$/, message: "Enter a valid PAN number" },
//           })}
//         />
//         <Select
//           label="Category"
//           required
//           options={CATEGORY_OPTIONS}
//           error={errors.category?.message}
//           {...register("category", { required: "Category is required" })}
//         />
//       </div>
//     </div>
//   );
// }




// import { Input, Select } from "../../../components/ui/Field";
// import { GENDER_OPTIONS, CATEGORY_OPTIONS } from "../../../lib/options";

// export default function Step1Personal({ register, errors }) {
//   return (
//     <div>
//       <h2 className="font-display text-lg font-bold text-ink-900">Personal Details</h2>
//       <p className="mb-6 mt-1 text-sm text-ink-500">Enter the vendor's personal identification details.</p>

//       <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//         <Input
//           label="Full Name"
//           required
//           placeholder="Enter full name"
//           error={errors.fullName?.message}
//           {...register("fullName", { required: "Full name is required" })}
//         />
//         <Input
//           label="Father's Name"
//           required
//           placeholder="Enter father's name"
//           error={errors.fatherName?.message}
//           {...register("fatherName", { required: "Father's name is required" })}
//         />
//         <Input
//           type="date"
//           label="Date of Birth"
//           required
//           error={errors.dob?.message}
//           {...register("dob", { required: "Date of birth is required" })}
//         />
//         <Select
//           label="Gender"
//           required
//           options={GENDER_OPTIONS}
//           error={errors.gender?.message}
//           {...register("gender", { required: "Gender is required" })}
//         />
//         <Input
//           label="Mobile Number"
//           required
//           placeholder="Enter mobile number"
//           maxLength={10}
//           error={errors.mobile?.message}
//           {...register("mobile", {
//             required: "Mobile number is required",
//             pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
//           })}
//         />
//         <Input
//           type="email"
//           label="Email"
//           placeholder="Enter email address"
//           error={errors.email?.message}
//           {...register("email", {
//             pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
//           })}
//         />
//         <Input
//           label="Aadhaar Number"
//           required
//           placeholder="Enter aadhaar number"
//           maxLength={14}
//           error={errors.aadhaar?.message}
//           {...register("aadhaar", {
//             required: "Aadhaar number is required",
//             pattern: { value: /^\d{4}\s?\d{4}\s?\d{4}$/, message: "Enter a valid 12-digit aadhaar number" },
//           })}
//         />
//         <Input
//           label="PAN Number"
//           placeholder="Enter PAN number"
//           maxLength={10}
//           error={errors.pan?.message}
//           {...register("pan", {
//             pattern: { value: /^[A-Z]{5}\d{4}[A-Z]$/, message: "Enter a valid PAN number" },
//           })}
//         />
//         <Select
//           label="Category"
//           required
//           options={CATEGORY_OPTIONS}
//           error={errors.category?.message}
//           {...register("category", { required: "Category is required" })}
//         />
//       </div>
//     </div>
//   );
// }





import { Input, Select } from "../../../components/ui/Field";
import { GENDER_OPTIONS, CATEGORY_OPTIONS } from "../../../lib/options";

export default function Step1Personal({ register, errors }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-ink-900">Personal Details</h2>
      <p className="mb-6 mt-1 text-sm text-ink-500">Enter the vendor's personal identification details.</p>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <Input
          label="Full Name"
          required
          placeholder="Enter full name"
          error={errors.fullName?.message}
          {...register("fullName", { required: "Full name is required" })}
        />
        {/* <Input
          label="Father's Name"
          // required
          placeholder="Enter father's name"
          error={errors.fatherName?.message}
          {...register("fatherName")}
          // {...register("fatherName", { required: "Father's name is required" })}
        /> */}
        <Input
          type="date"
          label="Date of Birth"
          required
          error={errors.dob?.message}
          {...register("dob", { required: "Date of birth is required" })}
        />
        <Select
          label="Gender"
          required
          options={GENDER_OPTIONS}
          error={errors.gender?.message}
          {...register("gender", { required: "Gender is required" })}
        />
        <Input
          label="Mobile Number"
          required
          placeholder="Enter mobile number"
          maxLength={10}
          error={errors.mobile?.message}
          {...register("mobile", {
            required: "Mobile number is required",
            pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
          })}
        />
        <Input
          type="email"
          label="Email"
          placeholder="Enter email address"
          error={errors.email?.message}
          {...register("email", {
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
          })}
        />
        <Input
          label="Aadhaar Number"
          required
          placeholder="Enter aadhaar number"
          maxLength={14}
          error={errors.aadhaar?.message}
          {...register("aadhaar", {
            required: "Aadhaar number is required",
            pattern: { value: /^\d{4}\s?\d{4}\s?\d{4}$/, message: "Enter a valid 12-digit aadhaar number" },
          })}
        />
        <Input
          label="PAN Number"
          placeholder="Enter PAN number"
          maxLength={10}
          error={errors.pan?.message}
          {...register("pan", {
            pattern: { value: /^[A-Z]{5}\d{4}[A-Z]$/, message: "Enter a valid PAN number" },
          })}
        />
        <Select
          label="Category"
          required
          options={CATEGORY_OPTIONS}
          error={errors.category?.message}
          {...register("category", { required: "Category is required" })}
        />
      </div>
    </div>
  );
}