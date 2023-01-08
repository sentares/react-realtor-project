import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase'
import { LoaderElement } from '../utils/loader/loader'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
	EffectFade,
	Autoplay,
	Navigation,
	Pagination,
} from 'swiper'
import 'swiper/css/bundle'
import { MdFavorite, MdFavoriteBorder, MdOutlineBed } from 'react-icons/md'
import { BiBath } from 'react-icons/bi'
import { FaMapMarkerAlt, FaParking, FaUserCircle } from 'react-icons/fa'
import { TbParkingOff } from 'react-icons/tb'

import { IoMdPricetag } from 'react-icons/io'
import { GiSofa } from 'react-icons/gi'
import { Contact } from '../components/contact'
import { Maps } from '../components/Maps/maps'
import { Actions } from '../components/listings/actions'
import { Comments } from '../components/listings/comments/comments'

export const Listing = () => {
	const [discountProfit, setDiscountProfit] = useState(false)

	const params = useParams()
	const [listing, setListing] = useState(null)
	const [loading, setLoading] = useState(true)
	const [openMaps, setOpenMaps] = useState(false)
	const [id, setHouseId] = useState(null)

	SwiperCore.use([Autoplay, Navigation, Pagination])

	useEffect(() => {
		async function fetchListing() {
			const docRef = doc(db, 'listings', params.listingId)
			const docSnap = await getDoc(docRef)
			if (docSnap.exists()) {
				setListing(docSnap.data())
				setLoading(false)
				setHouseId(params.listingId)
			}
		}
		fetchListing()
	}, [params.listingId])
	if (loading) {
		return <LoaderElement />
	}

	const totalDiscount = Math.ceil(
		((listing.discountedPrice - listing.regularPrice) / listing.regularPrice) *
			100
	)

	const { likes } = listing

	return (
		<div className='listingPage'>
			{openMaps && <Maps />}

			<section className='listingPhoto'>
				<div className='photo'>
					<Swiper
						slidesPerView={1}
						navigation
						pagination={{ type: 'progressbar' }}
						effect='fade'
						modules={[EffectFade]}
						autoplay={{ delay: 3500 }}
					>
						{listing.imgUrls.map((url, index) => (
							<SwiperSlide key={index}>
								<div
									className='mainPh'
									style={{
										background: `url(${listing.imgUrls[index]}) center no-repeat`,
										backgroundSize: 'cover',
									}}
								></div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				{listing.offer && (
					<div
						className='discount'
						onClick={() => setDiscountProfit(!discountProfit)}
					>
						<IoMdPricetag />
						{discountProfit && (
							<div className='discountPrice'>{totalDiscount}%</div>
						)}
					</div>
				)}
				<div className='priceBlock'>
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
							<div className='oldPrice'>
								<strike>
									$
									{listing.regularPrice
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</strike>
							</div>
						)}
						{listing.type === 'rent' && ' / месяц'}
					</div>
				</div>
				<div className='shortInfo'>
					<div className='infoElements shadow-xl'>
						<div className='infoBlock'>
							{listing.furnished ? (
								<div className='sofa'>
									<GiSofa />
								</div>
							) : (
								<div className='noSofa'>
									<GiSofa />
								</div>
							)}
							<div className='beds'>
								<MdOutlineBed /> {listing.bedrooms}
							</div>
							<div>
								<BiBath />
								{listing.bathrooms}
							</div>
							{listing.parking ? (
								<div className='parking'>
									<FaParking />
								</div>
							) : (
								<div className='parking'>
									<TbParkingOff />
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			<section className='textInfo'>
				<div className='textGlobal'>
					<div className='type'>
						{listing.type === 'sale' ? (
							<div className='sale'>Продажа</div>
						) : (
							<div className='rent'>Аренда</div>
						)}
					</div>
					<ul>
						<li className='flex justify-between'>
							<div className='tag'>#{listing.name}</div>
							<div className=' text-lg font-medium pr-2'>{listing.area}м²</div>
						</li>
						<li>
							<div className='userAndLikes'>
								<div className='user'>
									<FaUserCircle className='iconPh' />
									<Contact userRef={listing.userRef} />
								</div>
								<Actions listing={listing} likes={likes} id={id} />
							</div>
						</li>
						<li>
							<div className='address' onClick={() => setOpenMaps(!openMaps)}>
								<FaMapMarkerAlt />
								{listing.address.toUpperCase()}
							</div>
						</li>
						<li>
							<div className='info'>{listing.description}</div>
						</li>
					</ul>
					<Comments listing={listing} id={id} />
				</div>
			</section>
		</div>
	)
}
