import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'

export function useAllListings() {
	const [loading, setLoading] = useState(true)
	const [allListings, setAllListings] = useState(null)

	useEffect(() => {
		async function fetchListings() {
			try {
				const listingsRef = collection(db, 'listings')
				const q = query(listingsRef, orderBy('timestamp', 'asc'))
				const querySnap = await getDocs(q)
				const listings = []

				querySnap.forEach(doc => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					})
				})
				setAllListings(listings)
				setLoading(false)
			} catch (error) {
				console.log(error)
			}
		}
		fetchListings()
	}, [])
	return { allListings, loading }
}
