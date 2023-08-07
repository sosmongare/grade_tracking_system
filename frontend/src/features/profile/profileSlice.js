import { createSlice } from "@reduxjs/toolkit"

import { profileNamespace } from "./profileActionTypes"
import { getProfileAction, putProfileAction } from "./profileAsyncActions"

/* profile state */

export const initialState = {
  profile: {},
  loading: false,
  error: ""
}

/* profile store */
export const profileSlice = createSlice({
  /*
   name: is your feature or also called module, or namespace,
   or context, etc. The terminologies here can be interchangeable.
   This is required.
  */
  name: profileNamespace,

  /*initialState is the default value of this namespace/module and it is required.*/
  initialState, // same as initialState: initialState,

  /*Non asynchronous actions. Does not require Axios.*/
  reducers: {},

  /*Asynchronous actions. Actions that require Axios.*/
  extraReducers: builder => {
    builder.addCase(getProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload
    })

    builder.addCase(putProfileAction.pending, (state, action) => {
      state.loading = true
      state.error = ""
    })
    builder.addCase(putProfileAction.fulfilled, (state, action) => {
      state.loading = false
      state.profile = action.payload
    })
    builder.addCase(putProfileAction.rejected, (state, action) => {
      state.loading = false
      state.error = "Something wrong happened"
      console.log(action?.payload)
    })
  }
})

export default profileSlice.reducer
export const profileSelector = state => state.profile;


