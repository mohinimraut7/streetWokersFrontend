
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import DashboardLayout from "./layouts/DashboardLayout";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import PublicRoute from "./routes/PublicRoute";

// import Login from "./modules/auth/pages/Login";

// import VendorRegistration from "./modules/vendors/pages/VendorRegistration";
// import VendorList from "./modules/vendors/pages/VendorList";
// import VendorProfile from "./modules/vendors/pages/VendorProfile";
// import EditVendorApplication from "./modules/vendors/pages/EditVendorApplication";
// import VendorPayment from "./modules/vendors/pages/VendorPayment";
// import BulkImportVendors from "./modules/vendors/pages/BulkImportVendors";

// // ... Routes मध्ये:
// <Route path="/vendors/edit/:id" element={<EditVendorApplication />} />

// import SurveyList from "./modules/survey/pages/SurveyList";
// import NewSurvey from "./modules/survey/pages/NewSurvey";
// import SurveyMap from "./modules/survey/pages/SurveyMap";

// import ApplicationList from "./modules/applications/ApplicationList";
// import ApplicationDetails from "./modules/applications/ApplicationDetails";
// import ApprovalHistory from "./modules/applications/ApprovalHistory";
// import PendingApproval from "./modules/applications/PendingApproval";

// import SmartCard from "./modules/certificate/pages/SmartCard";
// import BulkSmartCard from "./modules/certificate/pages/BulkSmartCard";
// import QRVerification from "./modules/certificate/pages/QRVerification";

// // ── No Feriwala Area Geofencing (NEW) ──
// import GeofenceManagement from "./modules/geofencing/pages/GeofenceManagement";

// // import Dashboard from "./modules/dashboard/pages/Dashboard.jsx";

// import Dashboard from "./modules/dashboard/pages/Dashboard.jsx";


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Public */}
//         <Route element={<PublicRoute />}>
//           <Route path="/login" element={<Login />} />
//         </Route>

//         {/* Public QR verification - scanned by anyone, no login required */}
//         <Route path="/verify/:id" element={<QRVerification />} />

//         {/* Protected */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/" element={<DashboardLayout />}>

//             {/* Dashboard */}
//             {/* <Route index element={<Navigate to="/vendors/register" replace />} /> */}
//             <Route index element={<Dashboard />} />

//             {/* Vendor */}
//             <Route path="vendors">
//               <Route path="register" element={<VendorRegistration />} />
//               <Route path="list" element={<VendorList />} />
//               <Route path="profile/:id" element={<VendorProfile />} />
//               <Route path="/vendors/edit/:id" element={<EditVendorApplication />} />
//               <Route path="/vendors/payment/:id" element={<VendorPayment />} />
//               <Route path="bulk-import" element={<BulkImportVendors />} />
//             </Route>

//             {/* Survey */}
//             <Route path="survey">
//               <Route index element={<SurveyList />} />
//               <Route path="new/:vendorId" element={<NewSurvey />} />
//               <Route path="map" element={<SurveyMap />} />
//             </Route>

//             {/* Application */}
//             <Route path="applications">
//               <Route index element={<ApplicationList />} />
//               <Route path="pending" element={<PendingApproval />} />
//               <Route path=":id" element={<ApplicationDetails />} />
//             </Route>

//             {/* Smart Card */}
//             <Route path="smart-card/:id" element={<SmartCard />} />
//             <Route path="smart-card/bulk" element={<BulkSmartCard />} />

//             {/* No Feriwala Area Geofencing (NEW) */}
//             <Route path="geofencing" element={<GeofenceManagement />} />

//           </Route>
//         </Route>

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/login" replace />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;





// =================================



import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

// ══════════════════════════════════════════════════════════
//  LAZY LOADING — प्रत्येक route चे page component आता code-split केले आहे
//  (React.lazy + Suspense). यामुळे पहिल्या लोडला फक्त login/dashboard साठी लागणारा
//  JS bundle येतो, बाकीच्या (survey, applications, certificate, इ.) pages चा कोड
//  त्या route वर गेल्यावरच डाउनलोड होतो — त्यामुळे initial load आणि data fetching
//  दोन्ही जलद वाटतात. कुठलाही component/route/behaviour बदललेला नाही, फक्त import
//  पद्धत lazy केली आहे. (जुने plain imports डिलीट न करता खाली comment म्हणून ठेवले आहेत.) ──
// ══════════════════════════════════════════════════════════

// import Login from "./modules/auth/pages/Login";
// import VendorRegistration from "./modules/vendors/pages/VendorRegistration";
// import VendorList from "./modules/vendors/pages/VendorList";
// import VendorProfile from "./modules/vendors/pages/VendorProfile";
// import EditVendorApplication from "./modules/vendors/pages/EditVendorApplication";
// import VendorPayment from "./modules/vendors/pages/VendorPayment";
// import BulkImportVendors from "./modules/vendors/pages/BulkImportVendors";
// import SurveyList from "./modules/survey/pages/SurveyList";
// import NewSurvey from "./modules/survey/pages/NewSurvey";
// import SurveyMap from "./modules/survey/pages/SurveyMap";
// import ApplicationList from "./modules/applications/ApplicationList";
// import ApplicationDetails from "./modules/applications/ApplicationDetails";
// import ApprovalHistory from "./modules/applications/ApprovalHistory";
// import PendingApproval from "./modules/applications/PendingApproval";
// import SmartCard from "./modules/certificate/pages/SmartCard";
// import BulkSmartCard from "./modules/certificate/pages/BulkSmartCard";
// import QRVerification from "./modules/certificate/pages/QRVerification";
// import GeofenceManagement from "./modules/geofencing/pages/GeofenceManagement";
// import Dashboard from "./modules/dashboard/pages/Dashboard.jsx";

const Login = lazy(() => import("./modules/auth/pages/Login"));

const VendorRegistration = lazy(() => import("./modules/vendors/pages/VendorRegistration"));
const VendorList = lazy(() => import("./modules/vendors/pages/VendorList"));
const VendorProfile = lazy(() => import("./modules/vendors/pages/VendorProfile"));
const EditVendorApplication = lazy(() => import("./modules/vendors/pages/EditVendorApplication"));
const VendorPayment = lazy(() => import("./modules/vendors/pages/VendorPayment"));
const BulkImportVendors = lazy(() => import("./modules/vendors/pages/Bulkimportvendors"));

const SurveyList = lazy(() => import("./modules/survey/pages/SurveyList"));
const NewSurvey = lazy(() => import("./modules/survey/pages/NewSurvey"));
const SurveyMap = lazy(() => import("./modules/survey/pages/SurveyMap"));

const ApplicationList = lazy(() => import("./modules/applications/ApplicationList"));
const ApplicationDetails = lazy(() => import("./modules/applications/ApplicationDetails"));
const ApprovalHistory = lazy(() => import("./modules/applications/ApprovalHistory"));
const PendingApproval = lazy(() => import("./modules/applications/PendingApproval"));

const SmartCard = lazy(() => import("./modules/certificate/pages/SmartCard"));
const BulkSmartCard = lazy(() => import("./modules/certificate/pages/BulkSmartCard"));
const QRVerification = lazy(() => import("./modules/certificate/pages/QRVerification"));

// ── No Feriwala Area Geofencing (NEW) ──
const GeofenceManagement = lazy(() => import("./modules/geofencing/pages/GeofenceManagement"));

const Dashboard = lazy(() => import("./modules/dashboard/pages/Dashboard.jsx"));

// ── Simple, unobtrusive fallback shown while a route's chunk is downloading ──
function RouteLoadingFallback() {
  return (
    <div className="flex min-h-[40vh] w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-500" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoadingFallback />}>
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
              <Route path="/vendors/payment/:id" element={<VendorPayment />} />
              <Route path="bulk-import" element={<BulkImportVendors />} />
            </Route>

            {/* Survey */}
            <Route path="survey">
              <Route index element={<SurveyList />} />
              <Route path="new/:vendorId" element={<NewSurvey />} />
              <Route path="map" element={<SurveyMap />} />
            </Route>

            {/* Application */}
            <Route path="applications">
              <Route index element={<ApplicationList />} />
              <Route path="pending" element={<PendingApproval />} />
              <Route path=":id" element={<ApplicationDetails />} />
            </Route>

            {/* Smart Card */}
            <Route path="smart-card/:id" element={<SmartCard />} />
            <Route path="smart-card/bulk" element={<BulkSmartCard />} />

            {/* No Feriwala Area Geofencing (NEW) */}
            <Route path="geofencing" element={<GeofenceManagement />} />

          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
