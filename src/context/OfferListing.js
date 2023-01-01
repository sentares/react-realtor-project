import {
	collection,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from 'firebase/firestore'
import { useContext, useEffect } from 'react'
import { OfferListingContext } from '../App'
import { db } from '../firebase'

export const OfferListing = () => {
	const { offerListings, setOfferListings } = useContext(OfferListingContext)
	console.log(offerListings)
	useEffect(() => {
		async function fetchListings() {
			try {
				// get reference
				const listingsRef = collection(db, 'listings')
				// create the query
				const q = query(
					listingsRef,
					where('offer', '==', true),
					orderBy('timestamp', 'desc'),
					limit(4)
				)
				// execute the query
				const querySnap = await getDocs(q)
				const listings = []
				querySnap.forEach(doc => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					})
				})
				setOfferListings(listings)
			} catch (error) {
				console.log(error)
			}
		}
		fetchListings()
	}, [])
}
