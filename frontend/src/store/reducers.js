/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../features/auth/authSlice"
import profileReducer from '../features/profile/profileSlice'

const injectedReducers = {
  auth: authReducer,
  profile: profileReducer,
}

const rootReducer = combineReducers({
  ...injectedReducers
})


export const createReducer = () => rootReducer
