import { configureStore } from "@reduxjs/toolkit";
import vendorsReducer from "../features/vendors/vendorsSlice";
import surveysReducer from "../features/survey/surveySlice";
import authReducer from "../modules/auth/redux/authSlice";
import applicationsReducer from "../features/applications/applicationsSlice";
import certificatesReducer from "../features/certificates/certificatesSlice";

export const store = configureStore({
  reducer: {
    vendors: vendorsReducer,
    surveys: surveysReducer,
    auth: authReducer,
    applications: applicationsReducer,
    certificates: certificatesReducer,
  },
});
