import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	userUid: null,
}

export const uidSlice = createSlice({
	name: 'userUid',
	initialState,
	reducers: {
		setUserUid: (state, action) => {
			state.userUid = action.payload
		},
	},
})

export const { setUserUid } = uidSlice.actions

export default uidSlice.reducer
