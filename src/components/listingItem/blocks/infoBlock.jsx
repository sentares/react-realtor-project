import { BiBath } from 'react-icons/bi'
import { FaMapMarkerAlt, FaParking } from 'react-icons/fa'
import { MdOutlineBed } from 'react-icons/md'
import Moment from 'react-moment'

export const InfoBlock = listing => {
	return (
		<>
			<div className='information'>
				<div className='type'>
					{listing.type === 'sale' ? (
						<p className='sale'>Продажа</p>
					) : (
						<p className='rent'>Аренда</p>
					)}
				</div>
				<div className='tag'>
					<p>#{listing.name}</p>
				</div>
				<div className='date'>
					<Moment fromNow>{listing.timestamp?.toDate()}</Moment>
				</div>

				<div className='address'>
					<FaMapMarkerAlt className=' text-[#4a60a1]' />
					<p>{listing.address}</p>
				</div>

				<div className='bedBath'>
					<div className='bedrooms'>
						<MdOutlineBed className=' w-5' /> {listing.bedrooms}
					</div>
					<div className='bathrooms'>
						<BiBath className=' w-5' />
						{listing.bathrooms}
					</div>
					{listing.parking && (
						<div className='parking'>
							<FaParking />
						</div>
					)}
					<div className='area'>{listing.area}м²</div>
				</div>
				<div className='price'>
					<div className='totalPrice'>
						$
						{listing.offer
							? listing.discountedPrice
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							: listing.regularPrice
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						{listing.offer && (
							<p className='oldPrice'>
								$
								{listing.regularPrice
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							</p>
						)}
						{listing.type === 'rent' && ' / месяц'}
					</div>
				</div>
			</div>
		</>
	)
}
