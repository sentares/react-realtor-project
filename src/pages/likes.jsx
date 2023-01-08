import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { LikeListingItem } from '../components/likesListing/likeListingItem'
import { AuthContext } from '../context/authContext'
import { db } from '../firebase'
import { useAuthStatus } from '../utils/hooks/useAuthStatus'

export const Likes = () => {
	const isUserAuth = useAuthStatus()
	const res = isUserAuth.loggedIn

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

	return (
		<div className='likes'>
			<section className='offersPreview'>
				<div className='ph'>
					<img src='/assets/svg/likePage.svg' alt='' className='previewPh' />
					<div className='previewText'>
						<FaHeart className=' w-[70px] h-[70px]' />
						Вам понравилось
					</div>
				</div>

				{res ? (
					<div className='mySel'>
						<div className='selBlock'>
							<div className='text'>
								<h1>Все объявления</h1>
							</div>
							{allListings && allListings.length > 0 ? (
								<div className='yourSel'>
									<ul className='selHouse'>
										{allListings.map(listing => (
											<LikeListingItem
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
					</div>
				) : (
					<div className='register'>
						Пройдите регистрацию
						<div>
							<Link to='/register'>
								<button>Регистрация</button>
							</Link>
						</div>
					</div>
				)}
			</section>
		</div>
	)
}
