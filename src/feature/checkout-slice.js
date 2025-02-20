import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    address: {},
    payment: {},
  },
  reducers: {
    UpdateAddress(state, action) {
      const { payload } = action;
      state.address = { ...state.address, ...payload };
    },
    UpdatePayment(state, action) {
      const { payload } = action;
      state.payment = { ...state.payment, ...payload };
    },

    clearCheckoutInformation(state) {
      state.address = {};
      state.payment = {};
    },
  },
});

export const { UpdateAddress, UpdatePayment, clearCheckoutInformation } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
