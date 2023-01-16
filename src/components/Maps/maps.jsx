import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { LoaderElement } from '../../utils/loader/loader'

export const Maps = () => {
	const [openMaps, setOpenMaps] = useState(true)
	const [listing, setListing] = useState(null)
	const [loading, setLoading] = useState(true)
	const params = useParams()

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
	return (
		<>
			{openMaps && (
				<div className='modal'>
					<div className='content'>
						<div className='close'>
							<button className='closeIcon' onClick={() => setOpenMaps(false)}>
								<MdOutlineClose />
							</button>
						</div>
						<div className='map'>
							<MapContainer
								center={[listing.geolocation.lat, listing.geolocation.lng]}
								zoom={13}
								scrollWheelZoom={false}
								style={{ height: '100%', width: '100%' }}
							>
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
								/>
								<Marker
									position={[listing.geolocation.lat, listing.geolocation.lng]}
								>
									<Popup>Здесь Дом</Popup>
								</Marker>
							</MapContainer>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
