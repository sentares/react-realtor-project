export interface ISorting {
	activeType: number
	activeOffer: number
	activeTag: number
	activeDescAndAsc: number
	activeSort: Sort
}

export interface Sort {
	name: string | number
	sortProperty: number | string
}
