// import { useDispatch, useSelector } from "react-redux";
// import { performLogin, logout, selectAuth } from "../redux/authSlice";

// export function useAuth() {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user, error } = useSelector(selectAuth);

//   return {
//     isAuthenticated,
//     user,
//     error,
//     login: (credentials) => dispatch(performLogin(credentials)),
//     logout: () => dispatch(logout()),
//   };
// }


// import { useDispatch, useSelector } from "react-redux";
// import {
//   sendOtp,
//   verifyOtp,
//   loginWithPassword,
//   logout,
//   resetOtpFlow,
//   selectAuth,
// } from "../redux/authSlice";

// export function useAuth() {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user, error, otpSent, loading } = useSelector(selectAuth);

//   return {
//     isAuthenticated,
//     user,
//     error,
//     otpSent,
//     loading,
//     sendOtp: (mobileNo) => dispatch(sendOtp(mobileNo)),
//     verifyOtp: (payload) => dispatch(verifyOtp(payload)),
//     loginWithPassword: (payload) => dispatch(loginWithPassword(payload)),
//     resetOtpFlow: () => dispatch(resetOtpFlow()),
//     logout: () => dispatch(logout()),
//   };
// }





// import { useDispatch, useSelector } from "react-redux";
// import { performLogin, logout, selectAuth } from "../redux/authSlice";

// export function useAuth() {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user, error } = useSelector(selectAuth);

//   return {
//     isAuthenticated,
//     user,
//     error,
//     login: (credentials) => dispatch(performLogin(credentials)),
//     logout: () => dispatch(logout()),
//   };
// }


import { useDispatch, useSelector } from "react-redux";
import {
  sendOtp,
  verifyOtp,
  loginWithPassword,
  loginWithIdentifier,
  registerVendor,
  logout,
  resetOtpFlow,
  selectAuth,
} from "../redux/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, error, otpSent, loading } = useSelector(selectAuth);

  return {
    isAuthenticated,
    user,
    error,
    otpSent,
    loading,
    sendOtp: (mobileNo) => dispatch(sendOtp(mobileNo)),
    verifyOtp: (payload) => dispatch(verifyOtp(payload)),
    loginWithPassword: (payload) => dispatch(loginWithPassword(payload)),
    loginWithIdentifier: (payload) => dispatch(loginWithIdentifier(payload)),
    registerVendor: (payload) => dispatch(registerVendor(payload)),
    resetOtpFlow: () => dispatch(resetOtpFlow()),
    logout: () => dispatch(logout()),
  };
}
