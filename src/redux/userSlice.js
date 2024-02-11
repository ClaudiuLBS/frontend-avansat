import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  uid: null,
  email: null,

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer