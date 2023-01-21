import { IFilterState } from '../types/sortTypes'

export const selectFilter = (state: { filter: IFilterState }): IFilterState =>
	state.filter
