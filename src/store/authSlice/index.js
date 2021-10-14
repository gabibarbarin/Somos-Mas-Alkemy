import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  isLogged: !!localStorage.getItem("token_id"),
  user: {
    isAdmin: false,
    id: null,
    firstName: null,
    lastName: null,
    image: null,
    email: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    fillUserData: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },
    resetUserData: (state ) => {
      state.user = authInitialState.user;
      state.isLogged = false;
    }
  },
});



export default authSlice.reducer;
export const { fillUserData, resetUserData } = authSlice.actions;
