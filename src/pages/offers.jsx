import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { MdSell } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { ListingItem } from '../components/listingItem/listingItem'
import { Sorting } from '../components/offers/sorting'
import { Pagination } from '../components/pagination'
import { db } from '../firebase'
import {
	setActiveOffer,
	setActiveTag,
	setActiveType,
} from '../redux/slices/filterSlice'
import { selectFilter } from '../redux/slices/reducers/filterReducer'
import {
	useTrueIcon,
	useTrueOffer,
	useTrueSort,
	useTrueTag,
	useTrueType,
} from '../utils/hooks/sortOffer/useValueOfSorting'
import { LoaderElement } from '../utils/loader/loader'

export const Offers = () => {
	const dispatch = useDispatch()

	const { activeSort } = useSelector(selectFilter)
	const { activeOffer } = useSelector(selectFilter)
	const { activeType } = useSelector(selectFilter)
	const { activeDescAndAsc } = useSelector(selectFilter)
	const { activeTag } = useSelector(selectFilter)

	const onChangeActiveType = id => {
		dispatch(setActiveType(id))
	}
	const onChangeActiveOffer = id => {
		dispatch(setActiveOffer(id))
	}
	const onChangeActiveTag = id => {
		dispatch(setActiveTag(id))
	}

	let typeValue = useTrueType(activeType)

	let offerValue = useTrueOffer(activeOffer)

	let sortValue = useTrueSort(activeSort)

	let sortIcon = useTrueIcon(activeDescAndAsc)

	let tagValue = useTrueTag(activeTag)

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

	const [currentPage, setCurrentPage] = useState(1)
	const [postPerPage] = useState(6)
	const paginate = pageNumber => setCurrentPage(pageNumber)
	let currentListing
	if (allListings) {
		const indexOfLastListing = currentPage * postPerPage
		const indexOfFirstListing = indexOfLastListing - postPerPage
		currentListing = allListings.slice(indexOfFirstListing, indexOfLastListing)
	}

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
			/>
			<div className='choseBlock'>
				<div className='nameBlock'>
					<h1 className='whatChose'>Найдено {allListings.length}</h1>
				</div>
			</div>
			<section className='mySel'>
				<div className='selBlock'>
					<div className='text'>
						<h1>Все объявления</h1>
					</div>
					{allListings && allListings.length > 0 ? (
						<div>
							<div className='yourSel'>
								<ul className='selHouse'>
									{currentListing.map(listing => (
										<ListingItem
											key={listing.id}
											listing={listing.data}
											id={listing.id}
										/>
									))}
								</ul>
							</div>
							<div>
								<Pagination
									paginate={paginate}
									postPerPage={postPerPage}
									totalPosts={allListings.length}
								/>
							</div>
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
