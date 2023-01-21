import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useAllListings } from '../utils/hooks/useAllListings'
import { SearchListingItem } from '../components/listingItem/searchListingItem'
import { LoaderElement } from '../utils/loader/loader'
import { Pagination } from '../components/pagination'

export const Search = () => {
	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [postPerPage] = useState(12)
	const { allListings, loading } = useAllListings()
	const paginate = pageNumber => setCurrentPage(pageNumber)
	let currentListing
	if (allListings) {
		const indexOfLastListing = currentPage * postPerPage
		const indexOfFirstListing = indexOfLastListing - postPerPage
		currentListing = allListings.slice(indexOfFirstListing, indexOfLastListing)
	}

	return !loading ? (
		<div className='search'>
			<section className='offersPreview'>
				<div className='ph'>
					<img src='/assets/svg/search.svg' alt='' className='previewPh' />
					<div className='previewText'>
						<FaSearch className=' w-[70px] h-[70px]' />
						Поиск
					</div>
				</div>
			</section>
			<section className='searchBlock'>
				<form className='inputBlock'>
					<input
						type='text'
						placeholder='Поиск по адресу'
						onChange={event => setSearchValue(event.target.value)}
					/>
				</form>
			</section>
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
										<SearchListingItem
											searchValue={searchValue}
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
							Ничего не найдено(
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
