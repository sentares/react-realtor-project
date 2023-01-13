import { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { LikeListingItem } from '../components/listingItem/likeListingItem'
import { Pagination } from '../components/pagination'

import { useAllListings } from '../utils/hooks/useAllListings'
import { useAuthStatus } from '../utils/hooks/useAuthStatus'
import { LoaderElement } from '../utils/loader/loader'

export const Likes = () => {
	const isUserAuth = useAuthStatus()
	const res = isUserAuth.loggedIn

	const { allListings, loading } = useAllListings()

	const [currentPage, setCurrentPage] = useState(1)
	// const [postPerPage] = useState(6)
	// const paginate = pageNumber => setCurrentPage(pageNumber)
	// let currentListing
	// if (allListings) {
	// 	const indexOfLastListing = currentPage * postPerPage
	// 	const indexOfFirstListing = indexOfLastListing - postPerPage
	// 	currentListing = allListings.slice(indexOfFirstListing, indexOfLastListing)
	// }

	return !loading ? (
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
						{!loading ? (
							<div className='selBlock'>
								<div className='text'>
									<h1>Все объявления</h1>
								</div>
								{allListings && allListings.length > 0 ? (
									<div>
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
										{/* <div>
											<Pagination
												paginate={paginate}
												postPerPage={postPerPage}
												totalPosts={allListings.length}
											/>
										</div> */}
									</div>
								) : (
									<div className='mt-14 text-2xl font-semibold'>
										По таким критериям ничего не найдено(
									</div>
								)}
							</div>
						) : (
							<LoaderElement />
						)}
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
	) : (
		<div>
			<LoaderElement />
		</div>
	)
}
