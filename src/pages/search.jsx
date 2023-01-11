import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useAllListings } from '../utils/hooks/useAllListings'
import React from 'react'
import { SearchListingItem } from '../components/listingItem/searchListingItem'
import { LoaderElement } from '../utils/loader/loader'

export const Search = () => {
	const [searchValue, setSearchValue] = useState('')
	const { allListings, loading } = useAllListings()

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
						<div className='yourSel'>
							<ul className='selHouse'>
								{allListings.map(listing => (
									<SearchListingItem
										searchValue={searchValue}
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
