import { useFetchGetAuthProfile } from "@/service/user";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserProfile = createAsyncThunk('user/getUserProfile', async () => {
  const result = await useFetchGetAuthProfile()
  return result.data.profile
});

interface Profile {
  username: string
  email: string
  nickname: string
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {
      username: '',
      email: '',
      nickname: ''
    } as Profile
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