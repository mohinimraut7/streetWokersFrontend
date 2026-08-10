// import { createSlice } from "@reduxjs/toolkit";
// import { getSession, login as loginRequest, logout as logoutRequest } from "../services/authService";

// const session = getSession();

// const initialState = {
//   isAuthenticated: !!session,
//   user: session?.user ?? null,
//   token: session?.token ?? null,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginSuccess(state, action) {
//       state.isAuthenticated = true;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.error = null;
//     },
//     loginFailure(state, action) {
//       state.error = action.payload;
//     },
//     logout(state) {
//       logoutRequest();
//       state.isAuthenticated = false;
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { loginSuccess, loginFailure, logout } = authSlice.actions;

// export const performLogin = (credentials) => (dispatch) => {
//   const result = loginRequest(credentials);
//   if (result.success) {
//     dispatch(loginSuccess(result.session));
//     return { success: true };
//   }
//   dispatch(loginFailure(result.message));
//   return { success: false, message: result.message };
// };

// export const selectAuth = (state) => state.auth;
// export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
// export const selectCurrentUser = (state) => state.auth.user;

// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import {
  getSession,
  logout as logoutRequest,
  sendOtp as sendOtpRequest,
  verifyOtpLogin as verifyOtpRequest,
  loginWithPassword as loginWithPasswordRequest,
} from "../services/authService";

const session = getSession();

const initialState = {
  isAuthenticated: !!session,
  user: session?.user ?? null,
  token: session?.token ?? null,
  error: null,
  otpSent: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    otpRequestStart(state) {
      state.loading = true;
      state.error = null;
    },
    otpSentSuccess(state) {
      state.loading = false;
      state.otpSent = true;
    },
    otpRequestFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.otpSent = false;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetOtpFlow(state) {
      state.otpSent = false;
      state.error = null;
    },
    logout(state) {
      logoutRequest();
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.otpSent = false;
    },
  },
});

export const {
  otpRequestStart,
  otpSentSuccess,
  otpRequestFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  resetOtpFlow,
  logout,
} = authSlice.actions;

// ── Thunks ──

export const sendOtp = (mobileNo) => async (dispatch) => {
  dispatch(otpRequestStart());
  const result = await sendOtpRequest(mobileNo);
  if (result.success) {
    dispatch(otpSentSuccess());
    return { success: true };
  }
  dispatch(otpRequestFailure(result.message));
  return { success: false, message: result.message };
};

export const verifyOtp = ({ mobileNo, otp, fullName }) => async (dispatch) => {
  dispatch(loginStart());
  const result = await verifyOtpRequest({ mobileNo, otp, fullName });
  if (result.success) {
    dispatch(loginSuccess(result.session));
    return { success: true };
  }
  dispatch(loginFailure(result.message));
  return { success: false, message: result.message };
};

export const loginWithPassword = ({ userName, password, expectedRole }) => async (dispatch) => {
  dispatch(loginStart());
  const result = await loginWithPasswordRequest({ userName, password, expectedRole });
  if (result.success) {
    dispatch(loginSuccess(result.session));
    return { success: true };
  }
  dispatch(loginFailure(result.message));
  return { success: false, message: result.message };
};

export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;