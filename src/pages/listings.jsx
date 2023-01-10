import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../firebase'
import { LoaderElement } from '../utils/loader/loader'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
	EffectFade,
	Autoplay,
	Navigation,
	Pagination,
} from 'swiper'
import { FaMapMarkerAlt, FaUserCircle } from 'react-icons/fa'
import { IoMdPricetag } from 'react-icons/io'
import { Contact } from '../components/contact'
import { Maps } from '../components/Maps/maps'
import { Actions } from '../components/listings/actions'
import { Comments } from '../components/listings/comments/comments'
import { ShortInfoBlock } from '../components/listings/blocks/shortInfoBlock'
import 'swiper/css/bundle'
import { RiWhatsappFill } from 'react-icons/ri'

export const Listing = () => {
	const [discountProfit, setDiscountProfit] = useState(false)

	const params = useParams()
	const [listing, setListing] = useState(null)
	const [loading, setLoading] = useState(true)
	const [openMaps, setOpenMaps] = useState(false)
	const [id, setHouseId] = useState(null)
	const [userNumber, setUserNumber] = useState(false)

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
				<ShortInfoBlock listing={listing} />
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
								<div
									className='user'
									onClick={() => setUserNumber(!userNumber)}
								>
									<FaUserCircle className='iconPh' />
									{userNumber ? (
										<div className='phoneNumber'>
											{listing.phoneNumber}
											<RiWhatsappFill className=' text-2xl' />
										</div>
									) : (
										<Contact userRef={listing.userRef} />
									)}
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
