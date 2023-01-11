import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { MdSell } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { ListingItem } from '../components/listingItem/listingItem'
import { Sorting } from '../components/offers/sorting'
import { db } from '../firebase'
import {
	setActiveDescAndAsc,
	setActiveOffer,
	setActiveTag,
	setActiveType,
} from '../redux/slices/filterSlice'
import { LoaderElement } from '../utils/loader/loader'

export const Offers = () => {
	const dispatch = useDispatch()

	const activeSort = useSelector(state => state.filter.activeSort)
	const activeOffer = useSelector(state => state.filter.activeOffer)
	const activeType = useSelector(state => state.filter.activeType)
	const activeDescAndAsc = useSelector(state => state.filter.activeDescAndAsc)
	const activeTag = useSelector(state => state.filter.activeTag)

	const onChangeActiveType = id => {
		dispatch(setActiveType(id))
	}
	const onChangeActiveOffer = id => {
		dispatch(setActiveOffer(id))
	}
	const onChangeActiveTag = id => {
		dispatch(setActiveTag(id))
	}

	const onChangeActiveIcon = id => {
		dispatch(setActiveDescAndAsc(id))
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
			return true
		} else {
			return false
		}
	}

	let sortValue = trueSort()
	function trueSort() {
		if (activeSort.sortProperty === 'timestamp') {
			return 'timestamp'
		} else if (activeSort.sortProperty === 'regularPrice') {
			return 'regularPrice'
		} else if (activeSort.sortProperty === 'area') {
			return 'area'
		}
	}

	let sortIcon = trueIcon()
	function trueIcon() {
		if (activeDescAndAsc === 0) {
			return 'desc'
		} else {
			return 'asc'
		}
	}

	let tagValue = trueTag()
	function trueTag() {
		if (activeTag === 0) {
			return ''
		} else if (activeTag === 1) {
			return 'Дом'
		} else {
			return 'Квартира'
		}
	}

	const [loading, setLoading] = useState(true)
	const [allListings, setAllListings] = useState(null)

	useEffect(() => {
		async function fetchListings() {
			try {
				const listingsRef = collection(db, 'listings')

				const q = query(
					listingsRef,
					activeType > 0 && where('type', '==', typeValue),

					activeOffer >= 0 && where('offer', '==', offerValue),
					activeTag
						? where('name', '==', tagValue)
						: where('offer', '==', offerValue),
					orderBy(sortValue, sortIcon)
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
	}, [activeType, activeOffer, activeSort, activeDescAndAsc, activeTag])

	return !loading ? (
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
				onChangeActiveTag={onChangeActiveTag}
				onChangeActiveIcon={onChangeActiveIcon}
			/>

			<section className='mySel'>
				<div className='selBlock'>
					<div className='text'>
						<h1>Все объявления</h1>
					</div>
					{allListings && allListings.length > 0 ? (
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
					) : (
						<div className='mt-14 text-2xl font-semibold'>
							По таким критериям ничего не найдено(
						</div>
					)}
				</div>
			</section>
		</div>
	) : (
		<div>
			<LoaderElement />
		</div>
	)
}
