export interface IFilterState {
	activeType: number
	activeOffer: number
	activeTag: number
	activeDescAndAsc: number
	activeSort: {
		name: string
		sortProperty: string
	}
}
export interface SetActiveTypeAction {
	type: string
	payload: number
}
export interface SetActiveOfferAction {
	type: string
	payload: number
}
export interface SetActiveTagAction {
	type: string
	payload: number
}
export interface SetActiveSortAction {
	type: string
	payload: { name: string; sortProperty: string }
}
export interface SetActiveDescAndAscAction {
	type: string
	payload: number
}
