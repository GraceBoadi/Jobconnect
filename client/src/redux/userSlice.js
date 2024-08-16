import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "./store";
import { users } from "../utils/data";

const initialState = {
  // user: {},
  user:
    {
      ...JSON.parse(window?.localStorage.getItem("userInfo")),
      token: window?.localStorage.getItem("token"),
    } ?? users[1],
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action) {
      state.user =
        {
          ...JSON.parse(window?.localStorage.getItem("userInfo")),
          token: window?.localStorage.getItem("token"),
        } ?? {};
    },
    logout(state) {
      state.user = null;
      localStorage?.clear();
    },
  },
});

export default userSlice.reducer;

export function Login(user) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.login(user));
  };
}

export function Logout() {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.logout());
  };
}
