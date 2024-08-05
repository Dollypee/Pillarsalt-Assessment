import { createSlice } from "@reduxjs/toolkit"

const initialWalletState = {
  walletdata: [],
};

const walletSlice = createSlice({
  name: "Wallet",
  initialState: initialWalletState,
  reducers: {
    getWallet: (state, action) => {
      state.walletdata = action.payload
    },
  
  },
  // extraReducers: (builder) => {
  
  // },
});

export default walletSlice.reducer;

export const { getWallet } = walletSlice.actions;

export const selectWallet = (state) => state.Wallet.walletdata;