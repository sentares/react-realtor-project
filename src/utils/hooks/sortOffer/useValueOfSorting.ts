export function useTrueType(activeType: number) {
	if (activeType === 0) {
		return ''
	} else if (activeType === 1) {
		return 'sale'
	} else {
		return 'rent'
	}
}

export function useTrueOffer(activeOffer: number) {
	if (activeOffer === 0) {
		return true
	} else {
		return false
	}
}

export function useTrueSort(activeSort: { sortProperty: string }) {
	if (activeSort.sortProperty === 'timestamp') {
		return 'timestamp'
	} else if (activeSort.sortProperty === 'regularPrice') {
		return 'regularPrice'
	} else if (activeSort.sortProperty === 'area') {
		return 'area'
	}
}

export function useTrueIcon(activeDescAndAsc: number) {
	if (activeDescAndAsc === 0) {
		return 'desc'
	} else {
		return 'asc'
	}
}

export function useTrueTag(activeTag: number) {
	if (activeTag === 0) {
		return ''
	} else if (activeTag === 1) {
		return 'Дом'
	} else {
		return 'Квартира'
	}
}
