import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	IFilterState,
	SetActiveDescAndAscAction,
	SetActiveOfferAction,
	SetActiveSortAction,
	SetActiveTagAction,
	SetActiveTypeAction,
} from './types/sortTypes'

const initialState: IFilterState = {
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
		setActiveType: (state: IFilterState, action: SetActiveTypeAction) => {
			state.activeType = action.payload
		},
		setActiveOffer: (state: IFilterState, action: SetActiveOfferAction) => {
			state.activeOffer = action.payload
		},
		setActiveTag: (state: IFilterState, action: SetActiveTagAction) => {
			state.activeTag = action.payload
		},
		setActiveSort: (state: IFilterState, action: SetActiveSortAction) => {
			state.activeSort = action.payload
		},
		setActiveDescAndAsc: (
			state: IFilterState,
			action: SetActiveDescAndAscAction
		) => {
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
