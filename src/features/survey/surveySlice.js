import { createSlice, nanoid } from "@reduxjs/toolkit";
import seedSurveys from "../../data/surveys.json";

const initialState = {
  list: seedSurveys,
};

function nextSurveyNumber(list) {
  const max = list.reduce((acc, s) => {
    const digits = s.surveyNumber?.match(/\d+$/)?.[0];
    return digits ? Math.max(acc, parseInt(digits, 10)) : acc;
  }, 2024000000);
  return max + 1;
}

const surveySlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    addSurvey: {
      reducer(state, action) {
        state.list.unshift(action.payload);
      },
      prepare(draft) {
        return { payload: draft };
      },
    },
  },
});

export const { addSurvey } = surveySlice.actions;

export const makeSurveyDraft = (list, vendor, formData, photos) => {
  const num = nextSurveyNumber(list);
  return {
    id: `s-${nanoid(6)}`,
    surveyNumber: `SURV${num}`,
    surveyDate: formData.surveyDate,
    surveyOfficer: formData.surveyOfficer,
    vendorId: vendor.id,
    vendorRefId: vendor.vendorId,
    vendorName: vendor.personal.fullName,
    applicationNo: vendor.applicationNo,
    latitude: formData.latitude,
    longitude: formData.longitude,
    ward: formData.ward,
    zone: formData.zone,
    market: formData.market,
    roadWidth: formData.roadWidth,
    nearbyLandmark: formData.nearbyLandmark,
    businessType: formData.businessType,
    existingVendor: formData.existingVendor,
    encroachment: formData.encroachment,
    officerRemarks: formData.officerRemarks,
    recommendation: formData.recommendation,
    photos,
    submittedAt: new Date().toISOString(),
  };
};

export const selectAllSurveys = (state) => state.surveys.list;
export const selectSurveyByVendorId = (state, vendorId) =>
  state.surveys.list.find((s) => s.vendorId === vendorId);

export default surveySlice.reducer;
