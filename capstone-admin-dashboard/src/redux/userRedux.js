import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state, action) => {
      state.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.isFetching = false
      state.currentUser = action.payload
    },
    loginFailure: (state, action) => {
      state.isFetching = false
      state.error = true
    },
    logoutStart: (state, action) => {
      state.isFetching = true
    },
    logoutSuccess: (state, action) => {
      state.isFetching = false
      state.currentUser = action.payload
    },
    logoutFailure: (state, action) => {
      state.isFetching = false
      state.error = true
    },
  },
})
export const { loginStart, loginSuccess, loginFailure, logoutStart, logoutSuccess, logoutFailure } = userSlice.actions
export default userSlice.reducer
