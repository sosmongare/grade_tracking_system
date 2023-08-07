import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

import { ProfileActionTypes } from "./profileActionTypes"
import {
  putUserFromDbAxios
} from '../../services/userDbService'

export const getProfileAction = createAsyncThunk(
  ProfileActionTypes.FETCH_AND_SAVE_PROFILE,
  async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/apis/users/${id}`);
    return response.data;
  }
);

export const putProfileAction = createAsyncThunk(
  ProfileActionTypes.UPDATE_PROFILE,
  async user => {
    return (await putUserFromDbAxios(user)).data
  }
)
