import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: null,
  order: null,
  orders: [],
  product: null,
  products: [],
  manager: null,
  managers: [],
  phoneSignIn: null,
  businesses: [],
  business: null,
  riders: [],
  rider: null,
  payments: [],
  payment: null,
  stripePayload: null,
  signUpData: null,
  updated: false,
};

export const navSlice = createSlice({
  name: "palo",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setBusinesses: (state, action) => {
      state.businesses = action.payload;
    },
    setBusiness: (state, action) => {
      state.business = action.payload;
    },
    setPhoneSignIn: (state, action) => {
      state.phoneSignIn = action.payload;
    },
    setStripePayload: (state, action) => {
      state.stripePayload = action.payload;
    },
    setSignUpData: (state, action) => {
      state.signUpData = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setManager: (state, action) => {
      state.manager = action.payload;
    },
    setManagers: (state, action) => {
      state.managers = action.payload;
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    setRider: (state, action) => {
      state.rider = action.payload;
    },
    setRiders: (state, action) => {
      state.riders = action.payload;
    },
    setUpdated: (state, action) => {
      state.updated = action.payload;
    },
  },
});

//export the actions that will bring in the data
export const {
  setAccount,
  setOrder,
  setOrders,
  setBusinesses,
  setBusiness,
  setPhoneSignIn,
  setCart,
  setStripePayload,
  setSignUpData,
  setProducts,
  setProduct,
  setManagers,
  setManager,
  setPayments,
  setPayment,
  setRiders,
  setRider,
  setUpdated,
} = navSlice.actions;

//Selectors, makes the data available
export const selectAccount = (state) => state.nav.account;
export const selectOrder = (state) => state.nav.order;
export const selectOrders = (state) => state.nav.orders;
export const selectBusinesses = (state) => state.nav.businesses;
export const selectBusiness = (state) => state.nav.business;
export const selectPhoneSignIn = (state) => state.nav.phoneSignIn;
export const selectSignUpData = (state) => state.nav.signUpData;
export const selectStripePayload = (state) => state.nav.stripePayload;
export const selectProduct = (state) => state.nav.product;
export const selectProducts = (state) => state.nav.products;
export const selectManager = (state) => state.nav.manager;
export const selectMangers = (state) => state.nav.managers;
export const selectPayment = (state) => state.nav.payment;
export const selectPayments = (state) => state.nav.payments;
export const selectRider = (state) => state.nav.rider;
export const selectRiders = (state) => state.nav.riders;
export const selectUpdated = (state) => state.nav.updated;

export default navSlice.reducer;
