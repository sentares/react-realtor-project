import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
import { HiOutlineChatAlt } from 'react-icons/hi'
import { RiShareLine } from 'react-icons/ri'
import { IoMdPricetag } from 'react-icons/io'
import { GiSofa } from 'react-icons/gi'
import { toast } from 'react-toastify'
import { Contact } from '../components/contact'
import { Maps } from '../components/Maps/maps'

export const Listing = () => {
	const [likeButton, setLikeButton] = useState(false)
	const [discountProfit, setDiscountProfit] = useState(false)
	const [shareLinkCopied, setShareLinkCopied] = useState(false)

	const auth = getAuth()
	const params = useParams()
	const [listing, setListing] = useState(null)
	const [loading, setLoading] = useState(true)
	const [contactLandlord, setContactLandlord] = useState(false)
	const [openMaps, setOpenMaps] = useState(false)

	SwiperCore.use([Autoplay, Navigation, Pagination])
	console.log(shareLinkCopied)

	useEffect(() => {
		async function fetchListing() {
			const docRef = doc(db, 'listings', params.listingId)
			const docSnap = await getDoc(docRef)
			if (docSnap.exists()) {
				setListing(docSnap.data())
				setLoading(false)
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
						<li>
							<div className='tag'>#{listing.name}</div>
						</li>
						<li>
							<div className='userAndLikes'>
								<div className='user'>
									<FaUserCircle className='iconPh' />
									<Contact userRef={listing.userRef} listing={listing} />
								</div>
								<div className='likes'>
									<div
										className='save'
										onClick={() => setLikeButton(!likeButton)}
									>
										{likeButton === true ? (
											<MdFavorite className='likeOn' />
										) : (
											<MdFavoriteBorder className='likeOff' />
										)}
									</div>
									<div>
										<HiOutlineChatAlt className='icon' />
									</div>
									<div>
										<RiShareLine
											className='icon'
											onClick={() => {
												navigator.clipboard.writeText(window.location.href)
												setShareLinkCopied(true)
												setTimeout(() => {
													setShareLinkCopied(false)
												}, 2000)
												toast.success('Страница скопирована')
											}}
										/>
									</div>
								</div>
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
					{listing.userRef === !auth.currentUser?.uid && !contactLandlord && (
						<div className=' mt-[15px]'>
							<button className='messageUser'>Написать владельцу</button>
						</div>
					)}
				</div>
			</section>
		</div>
	)
}
