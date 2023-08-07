import { createSlice } from "@reduxjs/toolkit"

const authNamespace = "auth"

export const initialState = {
  accessToken: '',
  //token: null, 
  //refreshToken: null, 
  //account: null,
  claims: null
}

export const authSlice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: authNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  /*Non asynchronous actions. Does not require Axios.*/
  reducers: {
    saveTokenAction: (state, action) => {
      state.accessToken = action?.payload
      //state.refreshToken = action?.payload
      //state.refreshToken = action.payload.refreshToken
     // state.token = action?.payload
    },
    saveClaimsAction: (state, action) => {
      state.claims = action?.payload
    }
  },

  /*Asynchronous actions. Actions that require Axios.*/
  extraReducers: builder => {}
})

/* export all non-async actions */
export const { saveClaimsAction, saveTokenAction } = authSlice.actions

export default authSlice.reducer
