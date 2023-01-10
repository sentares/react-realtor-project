import { configureStore } from '@reduxjs/toolkit'
import { filterSlice } from './slices/filterSlice'
import uidSlice from './slices/uidSlice'

export const store = configureStore({
	reducer: {
		filter: filterSlice.reducer,
		userUid: uidSlice.reducer,
	},
})
