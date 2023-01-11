import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISorting, Sort } from './types/sortTypes'

const initialState = {
	activeType: 0,
	activeOffer: 0,
	activeTag: 0,
	activeDescAndAsc: 0,
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
		setActiveDescAndAsc: (state, action) => {
			state.activeDescAndAsc = action.payload
		},
	},
})

export const {
	setActiveType,
	setActiveOffer,
	setActiveTag,
	setActiveSort,
	setActiveDescAndAsc,
} = filterSlice.actions

export default filterSlice.reducer
