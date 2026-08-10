import { createSlice, nanoid } from "@reduxjs/toolkit";
import seedApplications from "../../data/applications.json";

const initialState = {
  list: seedApplications,
};

export const STAGE_ORDER = ["Citizen", "Survey Officer", "Counter Employee", "Approval Authority", "Approved"];

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    addApplication: {
      reducer(state, action) {
        const exists = state.list.some((a) => a.vendorId === action.payload.vendorId);
        if (!exists) state.list.unshift(action.payload);
      },
      prepare(draft) {
        return { payload: draft };
      },
    },
    recordAction(state, action) {
      const { id, actor, actorRole, decision, remarks } = action.payload;
      const idx = state.list.findIndex((a) => a.id === id);
      if (idx === -1) return;
      const app = state.list[idx];
      const now = new Date().toISOString();

      app.history.push({
        stage: app.currentStage,
        actor,
        actorRole,
        action: decision,
        remarks: remarks || "",
        date: now,
      });

      if (decision === "Approve") {
        if (app.currentStage === "Counter Employee") {
          app.currentStage = "Approval Authority";
          app.status = "Pending Approval";
        } else if (app.currentStage === "Approval Authority") {
          app.currentStage = "Approved";
          app.status = "Approved";
        }
      } else if (decision === "Forward") {
        if (app.currentStage === "Counter Employee") {
          app.currentStage = "Approval Authority";
          app.status = "Pending Approval";
        }
      } else if (decision === "Reject") {
        app.currentStage = "Rejected";
        app.status = "Rejected";
      } else if (decision === "Send Back") {
        if (app.currentStage === "Approval Authority") {
          app.currentStage = "Counter Employee";
          app.status = "Pending Approval";
        } else if (app.currentStage === "Counter Employee") {
          app.currentStage = "Survey Officer";
          app.status = "Sent Back";
        }
      }
    },
  },
});

export const { addApplication, recordAction } = applicationsSlice.actions;

export const makeApplicationDraft = (vendor, survey) => ({
  id: `app-${nanoid(6)}`,
  applicationNo: vendor.applicationNo,
  vendorId: vendor.id,
  vendorRefId: vendor.vendorId,
  vendorName: vendor.personal.fullName,
  ward: vendor.address.ward,
  zone: vendor.address.zone,
  businessCategory: vendor.business.businessCategory,
  surveyNumber: survey.surveyNumber,
  status: "Pending Approval",
  currentStage: "Counter Employee",
  createdAt: new Date().toISOString(),
  history: [
    {
      stage: "Citizen",
      actor: vendor.personal.fullName,
      actorRole: "Vendor",
      action: "Application Submitted",
      remarks: "",
      date: vendor.registrationDate,
    },
    {
      stage: "Survey Officer",
      actor: survey.surveyOfficer,
      actorRole: "Survey Officer",
      action: "Survey Completed - Recommended Approve",
      remarks: survey.officerRemarks || "",
      date: survey.surveyDate,
    },
  ],
});

export const selectAllApplications = (state) => state.applications.list;
export const selectApplicationById = (state, id) => state.applications.list.find((a) => a.id === id);
export const selectApplicationByVendorId = (state, vendorId) =>
  state.applications.list.find((a) => a.vendorId === vendorId);

export default applicationsSlice.reducer;
