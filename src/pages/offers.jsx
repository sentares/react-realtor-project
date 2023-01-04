import { type } from '@testing-library/user-event/dist/type'
import {
	collection,
	getDoc,
	getDocs,
	orderBy,
	query,
	where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { MdSell } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { ListingItem } from '../components/listingItem/listingItem'
import { Sorting } from '../components/offers/sorting'
import { db } from '../firebase'
import { setActiveOffer, setActiveType } from '../redux/slices/filterSlice'

export const Offers = () => {
	const dispatch = useDispatch()

	const activeSort = useSelector(state => state.filter.activeSort)
	const activeOffer = useSelector(state => state.filter.activeOffer)
	const activeType = useSelector(state => state.filter.activeType)

	const onChangeActiveType = id => {
		dispatch(setActiveType(id))
	}
	const onChangeActiveOffer = id => {
		dispatch(setActiveOffer(id))
	}

	let typeValue = trueType()
	function trueType() {
		if (activeType === 0) {
			return ''
		} else if (activeType === 1) {
			return 'sale'
		} else {
			return 'rent'
		}
	}

	let offerValue = trueOffer()
	function trueOffer() {
		if (activeOffer === 0) {
			return
		} else if (activeOffer === 1) {
			return true
		} else {
			return false
		}
	}

	let sortValue = activeSort.sortProperty
	console.log(sortValue)

	const [loading, setLoading] = useState(true)
	const [allListings, setAllListings] = useState(null)

	useEffect(() => {
		async function fetchListings() {
			try {
				const listingsRef = collection(db, 'listings')

				const q = query(
					listingsRef,
					activeType > 0 && where('type', '==', typeValue),
					activeOffer > 0 ? where('offer', '==', offerValue) : '',
					orderBy('timestamp', 'desc')
				)
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
	}, [activeType, activeOffer, activeSort])

	console.log(allListings)

	return (
		<div className='offers'>
			<section className='offersPreview'>
				<div className='ph'>
					<img src='/assets/svg/crop.svg' alt='' className='previewPh' />
					<div className='previewText'>
						<MdSell className=' w-[70px] h-[70px]' />
						Объявления
					</div>
				</div>
			</section>
			<Sorting
				activeType={activeType}
				activeOffer={activeOffer}
				onChangeActiveType={onChangeActiveType}
				onChangeActiveOffer={onChangeActiveOffer}
			/>
			<section className='mySel'>
				<div className='selBlock'>
					<div className='text'>
						<h1>Все объявления</h1>
					</div>
					{allListings && allListings.length > 0 && (
						<div className='yourSel'>
							<ul className='selHouse'>
								{allListings.map(listing => (
									<ListingItem
										key={listing.id}
										listing={listing.data}
										id={listing.id}
									/>
								))}
							</ul>
						</div>
					)}
				</div>
			</section>
		</div>
	)
}
