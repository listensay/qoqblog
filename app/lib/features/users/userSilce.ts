import { useFetchGetAuthProfile } from "@/service/user";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserProfile = createAsyncThunk('user/getUserProfile', async () => {
  const result = await useFetchGetAuthProfile()
  return result.data.profile
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload
      })
  }
})

export default userSlice.reducer