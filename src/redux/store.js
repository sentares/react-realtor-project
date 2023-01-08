import { configureStore } from '@reduxjs/toolkit'
import { filterSlice } from './slices/filterSlice'
import postSlice from './slices/postSlice'
import listingSlice from './slices/postSlice'
import uidSlice from './slices/uidSlice'

export const store = configureStore({
	reducer: {
		filter: filterSlice.reducer,
		userUid: uidSlice.reducer,
		// post: postSlice.reducer,
		// descAsc: descAscSlice.reducer,
		// listings: listingSlice.reducer,
	},
})
