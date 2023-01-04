import React from 'react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper'
import { useNavigate } from 'react-router-dom'
import { LoaderElement } from '../../utils/loader/loader'
import 'swiper/css/bundle'

export const Slider = () => {
	const [listings, setListings] = useState(null)
	const [loading, setLoading] = useState(true)

	SwiperCore.use([Autoplay, Navigation, Pagination])
	const navigate = useNavigate()

	useEffect(() => {
		async function fetchListings() {
			const listingsRef = collection(db, 'listings')
			const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
			const querySnap = await getDocs(q)
			let listings = []
			querySnap.forEach(doc => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				})
			})
			setListings(listings)
			setLoading(false)
		}
		fetchListings()
	}, [])
	if (loading) {
		return <LoaderElement />
	}
	if (listings.length === 0) {
		return <></>
	}

	return (
		listings && (
			<div className='swiperPh'>
				<Swiper slidesPerView={1} pagination={{ clickable: true }}>
					{listings.map(({ data, id }) => (
						<SwiperSlide
							key={id}
							onClick={() => navigate(`/category/${data.type}/${id}`)}
						>
							<div
								className='swiperSlidePh'
								style={{
									background: `url(${data.imgUrls[0]}) center no-repeat`,
									backgroundSize: 'cover',
								}}
							>
								<div className='info'>
									<p className='text'>{data.name}</p>
									<p className='price'>
										${data.discountedPrice ?? data.regularPrice}
										{data.type === 'rent' && '/ Мес'}
									</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		)
	)
}
