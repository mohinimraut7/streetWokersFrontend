import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import Login from "./modules/auth/pages/Login";

import VendorRegistration from "./modules/vendors/pages/VendorRegistration";
import VendorList from "./modules/vendors/pages/VendorList";
import VendorProfile from "./modules/vendors/pages/VendorProfile";
import EditVendorApplication from "./modules/vendors/pages/EditVendorApplication";

// ... Routes मध्ये:
<Route path="/vendors/edit/:id" element={<EditVendorApplication />} />

import SurveyList from "./modules/survey/pages/SurveyList";
import NewSurvey from "./modules/survey/pages/NewSurvey";

import ApplicationList from "./modules/applications/ApplicationList";
import ApplicationDetails from "./modules/applications/ApplicationDetails";
import ApprovalHistory from "./modules/applications/ApprovalHistory";
import PendingApproval from "./modules/applications/PendingApproval";

import SmartCard from "./modules/certificate/pages/SmartCard";
import QRVerification from "./modules/certificate/pages/QRVerification";

// import Dashboard from "./modules/dashboard/pages/Dashboard.jsx";

import Dashboard from "./modules/dashboard/pages/Dashboard.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Public QR verification - scanned by anyone, no login required */}
        <Route path="/verify/:id" element={<QRVerification />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>

            {/* Dashboard */}
            {/* <Route index element={<Navigate to="/vendors/register" replace />} /> */}
            <Route index element={<Dashboard />} />

            {/* Vendor */}
            <Route path="vendors">
              <Route path="register" element={<VendorRegistration />} />
              <Route path="list" element={<VendorList />} />
              <Route path="profile/:id" element={<VendorProfile />} />
              <Route path="/vendors/edit/:id" element={<EditVendorApplication />} />
            </Route>

            {/* Survey */}
            <Route path="survey">
              <Route index element={<SurveyList />} />
              <Route path="new/:vendorId" element={<NewSurvey />} />
            </Route>

            {/* Application */}
            <Route path="applications">
              <Route index element={<ApplicationList />} />
              <Route path="pending" element={<PendingApproval />} />
              <Route path=":id" element={<ApplicationDetails />} />
            </Route>

            {/* Smart Card */}
            <Route path="smart-card/:id" element={<SmartCard />} />

          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
