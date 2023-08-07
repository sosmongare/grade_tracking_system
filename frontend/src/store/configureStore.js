/**
 * Create the store with dynamic reducers
 */

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
//import { forceReducerReload } from "redux-injectors"

import { createReducer } from "./reducers"

export function configureAppStore() {
  const store = configureStore({
    reducer: createReducer(),
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false
      })
    ],
    devTools: process.env.NODE_ENV !== "production"
  })

  // Make reducers hot reloadable
  /* istanbul ignore next */
 

  return store
}
