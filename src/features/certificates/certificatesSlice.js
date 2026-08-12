// import { createSlice, nanoid } from "@reduxjs/toolkit";
// import seedCertificates from "../../data/certificates.json";

// const initialState = {
//   list: seedCertificates,
// };

// function nextCertNumber(list) {
//   const max = list.reduce((acc, c) => {
//     const digits = c.certificateNumber?.match(/\d+$/)?.[0];
//     return digits ? Math.max(acc, parseInt(digits, 10)) : acc;
//   }, 2024001233);
//   return max + 1;
// }

// const certificatesSlice = createSlice({
//   name: "certificates",
//   initialState,
//   reducers: {
//     addCertificate: {
//       reducer(state, action) {
//         const exists = state.list.some((c) => c.vendorId === action.payload.vendorId);
//         if (!exists) state.list.unshift(action.payload);
//       },
//       prepare(draft) {
//         return { payload: draft };
//       },
//     },
//   },
// });

// export const { addCertificate } = certificatesSlice.actions;

// export const makeCertificateDraft = (list, vendor, application) => {
//   const num = nextCertNumber(list);
//   const issueDate = new Date();
//   const expiryDate = new Date(issueDate);
//   expiryDate.setFullYear(expiryDate.getFullYear() + 3);

//   return {
//     id: `cert-${nanoid(6)}`,
//     certificateNumber: `CERT${num}`,
//     vendorId: vendor.id,
//     vendorRefId: vendor.vendorId,
//     applicationNo: vendor.applicationNo,
//     vendorName: vendor.personal.fullName,
//     ward: vendor.address.ward,
//     zone: vendor.address.zone,
//     businessCategory: vendor.business.businessCategory,
//     photo: vendor.documents?.photo?.url || null,
//     issueDate: issueDate.toISOString().slice(0, 10),
//     expiryDate: expiryDate.toISOString().slice(0, 10),
//     status: "Active",
//   };
// };

// export const selectAllCertificates = (state) => state.certificates.list;
// export const selectCertificateByVendorId = (state, vendorId) =>
//   state.certificates.list.find((c) => c.vendorId === vendorId);
// export const selectCertificateById = (state, id) => state.certificates.list.find((c) => c.id === id);

// export default certificatesSlice.reducer;



import { createSlice, nanoid } from "@reduxjs/toolkit";
import seedCertificates from "../../data/certificates.json";

const initialState = {
  list: seedCertificates,
};

function nextCertNumber(list) {
  const max = list.reduce((acc, c) => {
    const digits = c.certificateNumber?.match(/\d+$/)?.[0];
    return digits ? Math.max(acc, parseInt(digits, 10)) : acc;
  }, 2024001233);
  return max + 1;
}

const certificatesSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    addCertificate: {
      reducer(state, action) {
        const exists = state.list.some((c) => c.vendorId === action.payload.vendorId);
        if (!exists) state.list.unshift(action.payload);
      },
      prepare(draft) {
        return { payload: draft };
      },
    },
  },
});

export const { addCertificate } = certificatesSlice.actions;

export const makeCertificateDraft = (list, vendor, application) => {
  const num = nextCertNumber(list);
  const issueDate = new Date();
  const expiryDate = new Date(issueDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + 3);

  return {
    id: `cert-${nanoid(6)}`,
    certificateNumber: `CERT${num}`,
    vendorId: vendor.id,
    vendorRefId: vendor.vendorId,
    applicationNo: vendor.applicationNo,
    vendorName: vendor.personal.fullName,
    ward: vendor.address.ward,
    zone: vendor.address.zone,
    businessType: vendor.business.businessType,
    photo: vendor.documents?.photo?.url || null,
    issueDate: issueDate.toISOString().slice(0, 10),
    expiryDate: expiryDate.toISOString().slice(0, 10),
    status: "Active",
  };
};

export const selectAllCertificates = (state) => state.certificates.list;
export const selectCertificateByVendorId = (state, vendorId) =>
  state.certificates.list.find((c) => c.vendorId === vendorId);
export const selectCertificateById = (state, id) => state.certificates.list.find((c) => c.id === id);

export default certificatesSlice.reducer;