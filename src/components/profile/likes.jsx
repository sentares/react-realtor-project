export const Likes = () => {
	return (
		<section className='mySel'>
			<div className='selBlock'>
				<div className='text'>
					<h1>Вам понравилось</h1>
				</div>
				<div className='yourSel'>
					<ul className='selHouse'>
						{/* {listings.map(listing => (
							<ListingItem
								key={listing.id}
								id={listing.id}
								listing={listing.data}
								onDelete={() => onDelete(listing.id)}
								onEdit={() => onEdit(listing.id)}
							/>
						))} */}
					</ul>
				</div>
			</div>
		</section>
	)
}
