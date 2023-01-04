import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	activeType: 0,
	activeOffer: 0,
	activeTag: 0,
	activeSort: {
		name: 'Дате',
		sortProperty: 'timestamp',
	},
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setActiveType: (state, action) => {
			state.activeType = action.payload
		},
		setActiveOffer: (state, action) => {
			state.activeOffer = action.payload
		},
		setActiveTag: (state, action) => {
			state.activeTag = action.payload
		},
		setActiveSort: (state, action) => {
			state.activeSort = action.payload
		},
	},
})

export const { setActiveType, setActiveOffer, setActiveTag, setActiveSort } =
	filterSlice.actions

export default filterSlice.reducer
