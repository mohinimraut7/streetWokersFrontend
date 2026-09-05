// // Simulated authentication service (no backend, per Phase 1 rules).
// // Replace with a real API call once a backend is available.

// const DUMMY_USERS = [
//   {
//     mobile: "9999999999",
//     password: "admin123",
//     name: "Survey Officer",
//     role: "Survey Officer",
//     ward: "Ward 12 Office",
//   },
//   {
//     mobile: "8888888888",
//     password: "approver123",
//     name: "Approval Authority",
//     role: "Approval Authority",
//     ward: "Zone A Office",
//   },
// ];

// const STORAGE_KEY = "svms_auth";

// export function login({ mobile, password }) {
//   const user = DUMMY_USERS.find((u) => u.mobile === mobile && u.password === password);
//   if (!user) {
//     return { success: false, message: "Invalid mobile number or password." };
//   }
//   const { password: _pw, ...safeUser } = user;
//   const token = `dummy-token-${safeUser.mobile}-${Date.now()}`;
//   const session = { token, user: safeUser };
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
//   return { success: true, session };
// }

// export function logout() {
//   localStorage.removeItem(STORAGE_KEY);
// }

// export function getSession() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// =========================================================================

// Real backend-integrated auth service (replaces the old dummy/localStorage-only version).
// import apiClient from "../api/Apiclient";

// const STORAGE_KEY = "svms_auth";

// // ── Roles shown in the "Login as" dropdown on the Password Login tab ──
// export const STAFF_ROLES = [
//   { value: "counter_officer", label: "Counter Officer" },
//   { value: "survey_officer", label: "Survey Officer" },
//   { value: "A.M.C.", label: "A.M.C." },
//   { value: "super_admin", label: "Super Admin" },
// ];

// function saveSession(session) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
// }

// export function getSession() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// export function logout() {
//   localStorage.removeItem(STORAGE_KEY);
// }

// // ══════════════════════════════════════════════
// //  OTP LOGIN — Vendor / Citizen
// // ══════════════════════════════════════════════

// export async function sendOtp(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/sendOtp", { mobileNo });
//     return { success: data.success, message: data.message };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Failed to send OTP." };
//   }
// }

// // fullName is only needed the first time a mobile number logs in (auto-registers as vendor)
// export async function verifyOtpLogin({ mobileNo, otp, fullName }) {
//   try {
//     const { data } = await apiClient.post("/users/verifyOtpLogin", { mobileNo, otp, fullName });
//     if (!data.success) return { success: false, message: data.message };

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "OTP verification failed." };
//   }
// }

// // ══════════════════════════════════════════════
// //  PASSWORD LOGIN — Staff (Counter Officer / Survey Officer / A.M.C. / Super Admin)
// // ══════════════════════════════════════════════

// // `expectedRole` is whatever the user picked in the "Login as" dropdown.
// // We verify it against the role the backend actually returns, so someone can't
// // accidentally (or deliberately) sign in through the wrong role's tab.
// export async function loginWithPassword({ userName, password, expectedRole }) {
//   try {
//     const { data } = await apiClient.post("/users/login", { userName, password });
//     if (!data.success) return { success: false, message: data.message };

//     if (expectedRole && data.user.role !== expectedRole) {
//       const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
//       return {
//         success: false,
//         message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
//       };
//     }

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Invalid username or password." };
//   }
// }


// =========================================================================================

// Real backend-integrated auth service (replaces the old dummy/localStorage-only version).
// import apiClient from "../../../lib/apiClient";
// import apiClient from "../api/Apiclient";

// const STORAGE_KEY = "svms_auth";

// // ── Roles shown in the "Login as" dropdown on the Password Login tab ──
// export const STAFF_ROLES = [
//   { value: "counter_officer", label: "Counter Officer" },
//   { value: "survey_officer", label: "Survey Officer" },
//   { value: "A.M.C.", label: "A.M.C." },
//   { value: "super_admin", label: "Super Admin" },
// ];

// function saveSession(session) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
// }

// export function getSession() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// export function logout() {
//   localStorage.removeItem(STORAGE_KEY);
// }

// // ══════════════════════════════════════════════
// //  CHECK MOBILE — used before sending OTP, to know if this is a new or existing user
// // ══════════════════════════════════════════════

// export async function checkMobile(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/checkMobile", { mobileNo });
//     return { success: data.success, exists: data.exists, message: data.message };
//   } catch (err) {
//     return { success: false, exists: false, message: err.response?.data?.message || "Could not verify this number." };
//   }
// }

// // ══════════════════════════════════════════════
// //  OTP LOGIN — Vendor / Citizen
// // ══════════════════════════════════════════════

// export async function sendOtp(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/sendOtp", { mobileNo });
//     return { success: data.success, message: data.message };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Failed to send OTP." };
//   }
// }

// // fullName is only needed the first time a mobile number logs in (auto-registers as vendor)
// export async function verifyOtpLogin({ mobileNo, otp, fullName }) {
//   try {
//     const { data } = await apiClient.post("/users/verifyOtpLogin", { mobileNo, otp, fullName });
//     if (!data.success) return { success: false, message: data.message };

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "OTP verification failed." };
//   }
// }

// // ══════════════════════════════════════════════
// //  PASSWORD LOGIN — Staff (Counter Officer / Survey Officer / A.M.C. / Super Admin)
// // ══════════════════════════════════════════════

// // `expectedRole` is whatever the user picked in the "Login as" dropdown.
// // We verify it against the role the backend actually returns, so someone can't
// // accidentally (or deliberately) sign in through the wrong role's tab.
// export async function loginWithPassword({ userName, password, expectedRole }) {
//   try {
//     const { data } = await apiClient.post("/users/login", { userName, password });
//     if (!data.success) return { success: false, message: data.message };

//     if (expectedRole && data.user.role !== expectedRole) {
//       const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
//       return {
//         success: false,
//         message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
//       };
//     }

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Invalid username or password." };
//   }
// }

// ============================================================

// Real backend-integrated auth service (replaces the old dummy/localStorage-only version).
// import apiClient from "../api/Apiclient";

// const STORAGE_KEY = "svms_auth";

// // ── Roles shown in the "Login as" dropdown on the Password Login tab ──
// export const STAFF_ROLES = [
//   { value: "counter_officer", label: "Counter Officer" },
//   { value: "survey_officer", label: "Survey Officer" },
//   { value: "A.M.C.", label: "A.M.C." },
//   { value: "super_admin", label: "Super Admin" },
// ];

// // ── Combined list for the single "Login as" dropdown on the Login page ──
// // Vendor uses OTP login; everything else uses username + password.
// export const LOGIN_ROLES = [{ value: "vendor", label: "Vendor" }, ...STAFF_ROLES];

// function saveSession(session) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
// }

// export function getSession() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// export function logout() {
//   localStorage.removeItem(STORAGE_KEY);
// }

// // ══════════════════════════════════════════════
// //  CHECK MOBILE — used before sending OTP, to know if this is a new or existing user
// // ══════════════════════════════════════════════

// export async function checkMobile(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/checkMobile", { mobileNo });
//     return { success: data.success, exists: data.exists, message: data.message };
//   } catch (err) {
//     return { success: false, exists: false, message: err.response?.data?.message || "Could not verify this number." };
//   }
// }

// // ══════════════════════════════════════════════
// //  OTP LOGIN — Vendor / Citizen
// // ══════════════════════════════════════════════

// export async function sendOtp(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/sendOtp", { mobileNo });
//     return { success: data.success, message: data.message };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Failed to send OTP." };
//   }
// }

// // fullName is only needed the first time a mobile number logs in (auto-registers as vendor)
// export async function verifyOtpLogin({ mobileNo, otp, fullName }) {
//   try {
//     const { data } = await apiClient.post("/users/verifyOtpLogin", { mobileNo, otp, fullName });
//     if (!data.success) return { success: false, message: data.message };

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "OTP verification failed." };
//   }
// }

// // ══════════════════════════════════════════════
// //  PASSWORD LOGIN — Staff (Counter Officer / Survey Officer / A.M.C. / Super Admin)
// // ══════════════════════════════════════════════

// // `expectedRole` is whatever the user picked in the "Login as" dropdown.
// // We verify it against the role the backend actually returns, so someone can't
// // accidentally (or deliberately) sign in through the wrong role's tab.
// export async function loginWithPassword({ userName, password, expectedRole }) {
//   try {
//     const { data } = await apiClient.post("/users/login", { userName, password });
//     if (!data.success) return { success: false, message: data.message };

//     if (expectedRole && data.user.role !== expectedRole) {
//       const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
//       return {
//         success: false,
//         message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
//       };
//     }

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Invalid username or password." };
//   }
// }

// // ══════════════════════════════════════════════
// //  REGISTER OFFICER — Super Admin only (used on the "Register Officer" page)
// // ══════════════════════════════════════════════

// export async function registerStaff(payload) {
//   try {
//     const { data } = await apiClient.post("/users/register", payload);
//     return { success: data.success, message: data.message, user: data.user };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Could not register this officer." };
//   }
// }




// // Simulated authentication service (no backend, per Phase 1 rules).
// // Replace with a real API call once a backend is available.

// const DUMMY_USERS = [
//   {
//     mobile: "9999999999",
//     password: "admin123",
//     name: "Survey Officer",
//     role: "Survey Officer",
//     ward: "Ward 12 Office",
//   },
//   {
//     mobile: "8888888888",
//     password: "approver123",
//     name: "Approval Authority",
//     role: "Approval Authority",
//     ward: "Zone A Office",
//   },
// ];

// const STORAGE_KEY = "svms_auth";

// export function login({ mobile, password }) {
//   const user = DUMMY_USERS.find((u) => u.mobile === mobile && u.password === password);
//   if (!user) {
//     return { success: false, message: "Invalid mobile number or password." };
//   }
//   const { password: _pw, ...safeUser } = user;
//   const token = `dummy-token-${safeUser.mobile}-${Date.now()}`;
//   const session = { token, user: safeUser };
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
//   return { success: true, session };
// }

// export function logout() {
//   localStorage.removeItem(STORAGE_KEY);
// }

// export function getSession() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// =========================================================================

// Real backend-integrated auth service (replaces the old dummy/localStorage-only version).
// import apiClient from "../api/Apiclient";

// const STORAGE_KEY = "svms_auth";

// // ── Roles shown in the "Login as" dropdown on the Password Login tab ──
// export const STAFF_ROLES = [
//   { value: "counter_officer", label: "Counter Officer" },
//   { value: "survey_officer", label: "Survey Officer" },
//   { value: "A.M.C.", label: "A.M.C." },
//   { value: "super_admin", label: "Super Admin" },
// ];

// function saveSession(session) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
// }

// export function getSession() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// export function logout() {
//   localStorage.removeItem(STORAGE_KEY);
// }

// // ══════════════════════════════════════════════
// //  OTP LOGIN — Vendor / Citizen
// // ══════════════════════════════════════════════

// export async function sendOtp(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/sendOtp", { mobileNo });
//     return { success: data.success, message: data.message };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Failed to send OTP." };
//   }
// }

// // fullName is only needed the first time a mobile number logs in (auto-registers as vendor)
// export async function verifyOtpLogin({ mobileNo, otp, fullName }) {
//   try {
//     const { data } = await apiClient.post("/users/verifyOtpLogin", { mobileNo, otp, fullName });
//     if (!data.success) return { success: false, message: data.message };

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "OTP verification failed." };
//   }
// }

// // ══════════════════════════════════════════════
// //  PASSWORD LOGIN — Staff (Counter Officer / Survey Officer / A.M.C. / Super Admin)
// // ══════════════════════════════════════════════

// // `expectedRole` is whatever the user picked in the "Login as" dropdown.
// // We verify it against the role the backend actually returns, so someone can't
// // accidentally (or deliberately) sign in through the wrong role's tab.
// export async function loginWithPassword({ userName, password, expectedRole }) {
//   try {
//     const { data } = await apiClient.post("/users/login", { userName, password });
//     if (!data.success) return { success: false, message: data.message };

//     if (expectedRole && data.user.role !== expectedRole) {
//       const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
//       return {
//         success: false,
//         message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
//       };
//     }

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Invalid username or password." };
//   }
// }


// =========================================================================================

// Real backend-integrated auth service (replaces the old dummy/localStorage-only version).
// import apiClient from "../../../lib/apiClient";
// import apiClient from "../api/Apiclient";

// const STORAGE_KEY = "svms_auth";

// // ── Roles shown in the "Login as" dropdown on the Password Login tab ──
// export const STAFF_ROLES = [
//   { value: "counter_officer", label: "Counter Officer" },
//   { value: "survey_officer", label: "Survey Officer" },
//   { value: "A.M.C.", label: "A.M.C." },
//   { value: "super_admin", label: "Super Admin" },
// ];

// function saveSession(session) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
// }

// export function getSession() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// export function logout() {
//   localStorage.removeItem(STORAGE_KEY);
// }

// // ══════════════════════════════════════════════
// //  CHECK MOBILE — used before sending OTP, to know if this is a new or existing user
// // ══════════════════════════════════════════════

// export async function checkMobile(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/checkMobile", { mobileNo });
//     return { success: data.success, exists: data.exists, message: data.message };
//   } catch (err) {
//     return { success: false, exists: false, message: err.response?.data?.message || "Could not verify this number." };
//   }
// }

// // ══════════════════════════════════════════════
// //  OTP LOGIN — Vendor / Citizen
// // ══════════════════════════════════════════════

// export async function sendOtp(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/sendOtp", { mobileNo });
//     return { success: data.success, message: data.message };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Failed to send OTP." };
//   }
// }

// // fullName is only needed the first time a mobile number logs in (auto-registers as vendor)
// export async function verifyOtpLogin({ mobileNo, otp, fullName }) {
//   try {
//     const { data } = await apiClient.post("/users/verifyOtpLogin", { mobileNo, otp, fullName });
//     if (!data.success) return { success: false, message: data.message };

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "OTP verification failed." };
//   }
// }

// // ══════════════════════════════════════════════
// //  PASSWORD LOGIN — Staff (Counter Officer / Survey Officer / A.M.C. / Super Admin)
// // ══════════════════════════════════════════════

// // `expectedRole` is whatever the user picked in the "Login as" dropdown.
// // We verify it against the role the backend actually returns, so someone can't
// // accidentally (or deliberately) sign in through the wrong role's tab.
// export async function loginWithPassword({ userName, password, expectedRole }) {
//   try {
//     const { data } = await apiClient.post("/users/login", { userName, password });
//     if (!data.success) return { success: false, message: data.message };

//     if (expectedRole && data.user.role !== expectedRole) {
//       const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
//       return {
//         success: false,
//         message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
//       };
//     }

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Invalid username or password." };
//   }
// }

// ============================================================

// Real backend-integrated auth service (replaces the old dummy/localStorage-only version).
// import apiClient from "../api/Apiclient";

// const STORAGE_KEY = "svms_auth";

// // ── Roles shown in the "Login as" dropdown on the Password Login tab ──
// export const STAFF_ROLES = [
//   { value: "counter_officer", label: "Counter Officer" },
//   { value: "survey_officer", label: "Survey Officer" },
//   { value: "A.M.C.", label: "A.M.C." },
//   { value: "super_admin", label: "Super Admin" },
// ];

// // ── Combined list for the single "Login as" dropdown on the Login page ──
// // Vendor uses OTP login; everything else uses username + password.
// export const LOGIN_ROLES = [{ value: "vendor", label: "Vendor" }, ...STAFF_ROLES];

// function saveSession(session) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
// }

// export function getSession() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// export function logout() {
//   localStorage.removeItem(STORAGE_KEY);
// }

// // ══════════════════════════════════════════════
// //  CHECK MOBILE — used before sending OTP, to know if this is a new or existing user
// // ══════════════════════════════════════════════

// export async function checkMobile(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/checkMobile", { mobileNo });
//     return { success: data.success, exists: data.exists, message: data.message };
//   } catch (err) {
//     return { success: false, exists: false, message: err.response?.data?.message || "Could not verify this number." };
//   }
// }

// // ══════════════════════════════════════════════
// //  OTP LOGIN — Vendor / Citizen
// // ══════════════════════════════════════════════

// export async function sendOtp(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/sendOtp", { mobileNo });
//     return { success: data.success, message: data.message };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Failed to send OTP." };
//   }
// }

// // fullName is only needed the first time a mobile number logs in (auto-registers as vendor)
// export async function verifyOtpLogin({ mobileNo, otp, fullName }) {
//   try {
//     const { data } = await apiClient.post("/users/verifyOtpLogin", { mobileNo, otp, fullName });
//     if (!data.success) return { success: false, message: data.message };

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "OTP verification failed." };
//   }
// }

// // ══════════════════════════════════════════════
// //  PASSWORD LOGIN — Vendor (mobile / application no. / username + password)
// // ══════════════════════════════════════════════

// export async function loginWithIdentifier({ identifier, password }) {
//   try {
//     const { data } = await apiClient.post("/users/loginWithIdentifier", { identifier, password });
//     if (!data.success) return { success: false, message: data.message };

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Invalid login. Please try again." };
//   }
// }

// // ══════════════════════════════════════════════
// //  SELF-REGISTRATION — Vendor (username + mobile + password)
// // ══════════════════════════════════════════════

// export async function registerVendor({ fullName, userName, mobileNumber, password }) {
//   try {
//     const { data } = await apiClient.post("/users/registerVendor", { fullName, userName, mobileNumber, password });
//     if (!data.success) return { success: false, message: data.message };

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Registration failed. Please try again." };
//   }
// }

// // ══════════════════════════════════════════════
// //  PASSWORD LOGIN — Staff (Counter Officer / Survey Officer / A.M.C. / Super Admin)
// // ══════════════════════════════════════════════

// // `expectedRole` is whatever the user picked in the "Login as" dropdown.
// // We verify it against the role the backend actually returns, so someone can't
// // accidentally (or deliberately) sign in through the wrong role's tab.
// export async function loginWithPassword({ userName, password, expectedRole }) {
//   try {
//     const { data } = await apiClient.post("/users/login", { userName, password });
//     if (!data.success) return { success: false, message: data.message };

//     if (expectedRole && data.user.role !== expectedRole) {
//       const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
//       return {
//         success: false,
//         message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
//       };
//     }

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Invalid username or password." };
//   }
// }

// // ══════════════════════════════════════════════
// //  REGISTER OFFICER — Super Admin only (used on the "Register Officer" page)
// // ══════════════════════════════════════════════

// export async function registerStaff(payload) {
//   try {
//     const { data } = await apiClient.post("/users/register", payload);
//     return { success: data.success, message: data.message, user: data.user };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Could not register this officer." };
//   }
// }




// // Simulated authentication service (no backend, per Phase 1 rules).
// // Replace with a real API call once a backend is available.

// const DUMMY_USERS = [
//   {
//     mobile: "9999999999",
//     password: "admin123",
//     name: "Survey Officer",
//     role: "Survey Officer",
//     ward: "Ward 12 Office",
//   },
//   {
//     mobile: "8888888888",
//     password: "approver123",
//     name: "Approval Authority",
//     role: "Approval Authority",
//     ward: "Zone A Office",
//   },
// ];

// const STORAGE_KEY = "svms_auth";

// export function login({ mobile, password }) {
//   const user = DUMMY_USERS.find((u) => u.mobile === mobile && u.password === password);
//   if (!user) {
//     return { success: false, message: "Invalid mobile number or password." };
//   }
//   const { password: _pw, ...safeUser } = user;
//   const token = `dummy-token-${safeUser.mobile}-${Date.now()}`;
//   const session = { token, user: safeUser };
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
//   return { success: true, session };
// }

// export function logout() {
//   localStorage.removeItem(STORAGE_KEY);
// }

// export function getSession() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// =========================================================================

// Real backend-integrated auth service (replaces the old dummy/localStorage-only version).
// import apiClient from "../api/Apiclient";

// const STORAGE_KEY = "svms_auth";

// // ── Roles shown in the "Login as" dropdown on the Password Login tab ──
// export const STAFF_ROLES = [
//   { value: "counter_officer", label: "Counter Officer" },
//   { value: "survey_officer", label: "Survey Officer" },
//   { value: "A.M.C.", label: "A.M.C." },
//   { value: "super_admin", label: "Super Admin" },
// ];

// function saveSession(session) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
// }

// export function getSession() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// export function logout() {
//   localStorage.removeItem(STORAGE_KEY);
// }

// // ══════════════════════════════════════════════
// //  OTP LOGIN — Vendor / Citizen
// // ══════════════════════════════════════════════

// export async function sendOtp(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/sendOtp", { mobileNo });
//     return { success: data.success, message: data.message };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Failed to send OTP." };
//   }
// }

// // fullName is only needed the first time a mobile number logs in (auto-registers as vendor)
// export async function verifyOtpLogin({ mobileNo, otp, fullName }) {
//   try {
//     const { data } = await apiClient.post("/users/verifyOtpLogin", { mobileNo, otp, fullName });
//     if (!data.success) return { success: false, message: data.message };

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "OTP verification failed." };
//   }
// }

// // ══════════════════════════════════════════════
// //  PASSWORD LOGIN — Staff (Counter Officer / Survey Officer / A.M.C. / Super Admin)
// // ══════════════════════════════════════════════

// // `expectedRole` is whatever the user picked in the "Login as" dropdown.
// // We verify it against the role the backend actually returns, so someone can't
// // accidentally (or deliberately) sign in through the wrong role's tab.
// export async function loginWithPassword({ userName, password, expectedRole }) {
//   try {
//     const { data } = await apiClient.post("/users/login", { userName, password });
//     if (!data.success) return { success: false, message: data.message };

//     if (expectedRole && data.user.role !== expectedRole) {
//       const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
//       return {
//         success: false,
//         message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
//       };
//     }

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Invalid username or password." };
//   }
// }


// =========================================================================================

// Real backend-integrated auth service (replaces the old dummy/localStorage-only version).
// import apiClient from "../../../lib/apiClient";
// import apiClient from "../api/Apiclient";

// const STORAGE_KEY = "svms_auth";

// // ── Roles shown in the "Login as" dropdown on the Password Login tab ──
// export const STAFF_ROLES = [
//   { value: "counter_officer", label: "Counter Officer" },
//   { value: "survey_officer", label: "Survey Officer" },
//   { value: "A.M.C.", label: "A.M.C." },
//   { value: "super_admin", label: "Super Admin" },
// ];

// function saveSession(session) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
// }

// export function getSession() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// export function logout() {
//   localStorage.removeItem(STORAGE_KEY);
// }

// // ══════════════════════════════════════════════
// //  CHECK MOBILE — used before sending OTP, to know if this is a new or existing user
// // ══════════════════════════════════════════════

// export async function checkMobile(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/checkMobile", { mobileNo });
//     return { success: data.success, exists: data.exists, message: data.message };
//   } catch (err) {
//     return { success: false, exists: false, message: err.response?.data?.message || "Could not verify this number." };
//   }
// }

// // ══════════════════════════════════════════════
// //  OTP LOGIN — Vendor / Citizen
// // ══════════════════════════════════════════════

// export async function sendOtp(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/sendOtp", { mobileNo });
//     return { success: data.success, message: data.message };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Failed to send OTP." };
//   }
// }

// // fullName is only needed the first time a mobile number logs in (auto-registers as vendor)
// export async function verifyOtpLogin({ mobileNo, otp, fullName }) {
//   try {
//     const { data } = await apiClient.post("/users/verifyOtpLogin", { mobileNo, otp, fullName });
//     if (!data.success) return { success: false, message: data.message };

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "OTP verification failed." };
//   }
// }

// // ══════════════════════════════════════════════
// //  PASSWORD LOGIN — Staff (Counter Officer / Survey Officer / A.M.C. / Super Admin)
// // ══════════════════════════════════════════════

// // `expectedRole` is whatever the user picked in the "Login as" dropdown.
// // We verify it against the role the backend actually returns, so someone can't
// // accidentally (or deliberately) sign in through the wrong role's tab.
// export async function loginWithPassword({ userName, password, expectedRole }) {
//   try {
//     const { data } = await apiClient.post("/users/login", { userName, password });
//     if (!data.success) return { success: false, message: data.message };

//     if (expectedRole && data.user.role !== expectedRole) {
//       const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
//       return {
//         success: false,
//         message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
//       };
//     }

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Invalid username or password." };
//   }
// }

// ============================================================

// // Real backend-integrated auth service (replaces the old dummy/localStorage-only version).
// import apiClient from "../api/Apiclient";

// const STORAGE_KEY = "svms_auth";

// // ── Roles shown in the "Login as" dropdown on the Password Login tab ──
// export const STAFF_ROLES = [
//   { value: "counter_officer", label: "Counter Officer" },
//   { value: "survey_officer", label: "Survey Officer" },
//   { value: "A.M.C.", label: "A.M.C." },
//   { value: "super_admin", label: "Super Admin" },
// ];


// // ── Combined list for the single "Login as" dropdown on the Login page ──
// // Vendor uses OTP login; everything else uses username + password.
// export const LOGIN_ROLES = [...STAFF_ROLES];

// function saveSession(session) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
// }

// export function getSession() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// export function logout() {
//   localStorage.removeItem(STORAGE_KEY);
// }

// // ══════════════════════════════════════════════
// //  CHECK MOBILE — used before sending OTP, to know if this is a new or existing user
// // ══════════════════════════════════════════════

// export async function checkMobile(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/checkMobile", { mobileNo });
//     return { success: data.success, exists: data.exists, message: data.message };
//   } catch (err) {
//     return { success: false, exists: false, message: err.response?.data?.message || "Could not verify this number." };
//   }
// }

// // ══════════════════════════════════════════════
// //  OTP LOGIN — Vendor / Citizen
// // ══════════════════════════════════════════════

// export async function sendOtp(mobileNo) {
//   try {
//     const { data } = await apiClient.post("/users/sendOtp", { mobileNo });
//     return { success: data.success, message: data.message };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Failed to send OTP." };
//   }
// }

// // fullName is only needed the first time a mobile number logs in (auto-registers as vendor).
// // `expectedRole` is optional — pass it when this is being used from a role-specific tab
// // (e.g. staff logging in via OTP) so the returned account's role is verified.
// export async function verifyOtpLogin({ mobileNo, otp, fullName, expectedRole }) {
//   try {
//     const { data } = await apiClient.post("/users/verifyOtpLogin", { mobileNo, otp, fullName });
//     if (!data.success) return { success: false, message: data.message };

//     if (expectedRole && data.user.role !== expectedRole) {
//       const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
//       return {
//         success: false,
//         message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
//       };
//     }

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "OTP verification failed." };
//   }
// }

// // ══════════════════════════════════════════════
// //  PASSWORD LOGIN — Vendor (mobile / application no. / username + password)
// // ══════════════════════════════════════════════

// export async function loginWithIdentifier({ identifier, password, expectedRole }) {
//   try {
//     const { data } = await apiClient.post("/users/loginWithIdentifier", { identifier, password });
//     if (!data.success) return { success: false, message: data.message };

//     if (expectedRole && data.user.role !== expectedRole) {
//       const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
//       return {
//         success: false,
//         message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
//       };
//     }
    

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Invalid login. Please try again." };
//   }
// }

// // ══════════════════════════════════════════════
// //  SELF-REGISTRATION — Vendor (username + mobile + password)
// // ══════════════════════════════════════════════

// export async function registerVendor({ fullName, userName, mobileNumber, password }) {
//   try {
//     const { data } = await apiClient.post("/users/registerVendor", { fullName, userName, mobileNumber, password });
//     if (!data.success) return { success: false, message: data.message };

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Registration failed. Please try again." };
//   }
// }

// // ══════════════════════════════════════════════
// //  PASSWORD LOGIN — Staff (Counter Officer / Survey Officer / A.M.C. / Super Admin)
// // ══════════════════════════════════════════════

// // `expectedRole` is whatever the user picked in the "Login as" dropdown.
// // We verify it against the role the backend actually returns, so someone can't
// // accidentally (or deliberately) sign in through the wrong role's tab.
// export async function loginWithPassword({ userName, password, expectedRole }) {
//   try {
//     const { data } = await apiClient.post("/users/login", { userName, password });
//     if (!data.success) return { success: false, message: data.message };

//     if (expectedRole && data.user.role !== expectedRole) {
//       const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
//       return {
//         success: false,
//         message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
//       };
//     }

//     const session = { token: data.token, user: data.user };
//     saveSession(session);
//     return { success: true, session };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Invalid username or password." };
//   }
// }

// // ══════════════════════════════════════════════
// //  REGISTER OFFICER — Super Admin only (used on the "Register Officer" page)
// // ══════════════════════════════════════════════

// export async function registerStaff(payload) {
//   try {
//     const { data } = await apiClient.post("/users/register", payload);
//     return { success: data.success, message: data.message, user: data.user };
//   } catch (err) {
//     return { success: false, message: err.response?.data?.message || "Could not register this officer." };
//   }
// }
















import apiClient from "../api/Apiclient";

const STORAGE_KEY = "svms_auth";

// ── Roles shown in the "Login as" dropdown on the Password Login tab ──
export const STAFF_ROLES = [
  { value: "counter_officer", label: "Counter Officer" },
  { value: "survey_officer", label: "Survey Officer" },
  { value: "A.M.C.", label: "A.M.C." },
  { value: "super_admin", label: "Super Admin" },
];

// ── Combined list for the single "Login as" dropdown on the Login page ──
export const LOGIN_ROLES = [...STAFF_ROLES];

function saveSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

// ══════════════════════════════════════════════
//  CHECK MOBILE — used before sending OTP, to know if this is a new or existing user
// ══════════════════════════════════════════════

export async function checkMobile(mobileNo) {
  try {
    const { data } = await apiClient.post("/users/checkMobile", { mobileNo });
    return { success: data.success, exists: data.exists, message: data.message };
  } catch (err) {
    return { success: false, exists: false, message: err.response?.data?.message || "Could not verify this number." };
  }
}

// ══════════════════════════════════════════════
//  OTP LOGIN — Vendor / Citizen
// ══════════════════════════════════════════════

export async function sendOtp(mobileNo) {
  try {
    const { data } = await apiClient.post("/users/sendOtp", { mobileNo });
    return { success: data.success, message: data.message };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to send OTP." };
  }
}

// fullName is only needed the first time a mobile number logs in (auto-registers as vendor).
// `expectedRole` is optional — pass it when this is being used from a role-specific tab
// (e.g. staff logging in via OTP) so the returned account's role is verified.
export async function verifyOtpLogin({ mobileNo, otp, fullName, expectedRole }) {
  try {
    const { data } = await apiClient.post("/users/verifyOtpLogin", { mobileNo, otp, fullName });
    if (!data.success) return { success: false, message: data.message };

    if (expectedRole && data.user.role !== expectedRole) {
      const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
      return {
        success: false,
        message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
      };
    }

    const session = { token: data.token, user: data.user };
    saveSession(session);
    return { success: true, session };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "OTP verification failed." };
  }
}

// ══════════════════════════════════════════════
//  PASSWORD LOGIN — Vendor (mobile / application no. / username + password)
// ══════════════════════════════════════════════

export async function loginWithIdentifier({ identifier, password, expectedRole }) {
  try {
    const { data } = await apiClient.post("/users/loginWithIdentifier", { identifier, password });
    if (!data.success) return { success: false, message: data.message };

    if (expectedRole && data.user.role !== expectedRole) {
      const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
      return {
        success: false,
        message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
      };
    }

    const session = { token: data.token, user: data.user };
    saveSession(session);
    return { success: true, session };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Invalid login. Please try again." };
  }
}

// ══════════════════════════════════════════════
//  SELF-REGISTRATION — Vendor (username + mobile + password)
// ══════════════════════════════════════════════

export async function registerVendor({ fullName, userName, mobileNumber, password }) {
  try {
    const { data } = await apiClient.post("/users/registerVendor", { fullName, userName, mobileNumber, password });
    if (!data.success) return { success: false, message: data.message };

    const session = { token: data.token, user: data.user };
    saveSession(session);
    return { success: true, session };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Registration failed. Please try again." };
  }
}

// ══════════════════════════════════════════════
//  PASSWORD LOGIN — Staff (Counter Officer / Survey Officer / A.M.C. / Super Admin)
// ══════════════════════════════════════════════

export async function loginWithPassword({ userName, password, expectedRole }) {
  try {
    const { data } = await apiClient.post("/users/login", { userName, password });
    if (!data.success) return { success: false, message: data.message };

    if (expectedRole && data.user.role !== expectedRole) {
      const expectedLabel = STAFF_ROLES.find((r) => r.value === expectedRole)?.label || expectedRole;
      return {
        success: false,
        message: `This account is not registered as ${expectedLabel}. Please pick the correct role.`,
      };
    }

    const session = { token: data.token, user: data.user };
    saveSession(session);
    return { success: true, session };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Invalid username or password." };
  }
}

// ══════════════════════════════════════════════
//  REGISTER OFFICER — Super Admin only (used on the "Register Officer" page)
// ══════════════════════════════════════════════

export async function registerStaff(payload) {
  try {
    const { data } = await apiClient.post("/users/register", payload);
    return { success: data.success, message: data.message, user: data.user };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Could not register this officer." };
  }
}