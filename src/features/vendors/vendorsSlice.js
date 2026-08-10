import { createSlice, nanoid } from "@reduxjs/toolkit";
import seedVendors from "../../data/vendors.json";

const initialState = {
  list: seedVendors,
};

function nextVendorNumber(list) {
  const max = list.reduce((acc, v) => {
    const digits = v.vendorId?.match(/\d+$/)?.[0];
    return digits ? Math.max(acc, parseInt(digits, 10)) : acc;
  }, 2024001238);
  return max + 1;
}

const vendorsSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    addVendor: {
      reducer(state, action) {
        state.list.unshift(action.payload);
      },
      prepare(vendorDraft) {
        return { payload: vendorDraft };
      },
    },
    updateVendor(state, action) {
      const { id, changes } = action.payload;
      const idx = state.list.findIndex((v) => v.id === id);
      if (idx !== -1) {
        state.list[idx] = { ...state.list[idx], ...changes };
      }
    },
    updateVendorStatus(state, action) {
      const { id, status, currentStage } = action.payload;
      const idx = state.list.findIndex((v) => v.id === id);
      if (idx !== -1) {
        state.list[idx].status = status;
        if (currentStage) state.list[idx].currentStage = currentStage;
      }
    },
  },
});

export const { addVendor, updateVendor, updateVendorStatus } = vendorsSlice.actions;

export const makeVendorDraft = (list, formData) => {
  const num = nextVendorNumber(list);
  return {
    id: `v-${nanoid(6)}`,
    vendorId: `VDR${num}`,
    applicationNo: `APP${num}`,
    status: "Pending Survey",
    currentStage: "Survey",
    registrationDate: new Date().toISOString().slice(0, 10),
    personal: formData.personal,
    address: formData.address,
    business: formData.business,
    documents: formData.documents,
  };
};

export const selectAllVendors = (state) => state.vendors.list;
export const selectVendorById = (state, id) =>
  state.vendors.list.find((v) => v.id === id);

export default vendorsSlice.reducer;
