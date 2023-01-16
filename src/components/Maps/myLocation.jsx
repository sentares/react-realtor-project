import { useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

export const MyLocation = () => {
	const [latitude, setLatitude] = useState('')
	const [longitude, setLongitude] = useState('')
	const [openTextPopup, setOpenTextPopup] = useState(true)

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			setLatitude(position.coords.latitude)
			setLongitude(position.coords.longitude)
		})
	}, [])

	return (
		<>
			{openTextPopup && (
				<div className='generateTextPopup'>
					<div className='content'>
						<div className='close'>
							<button
								className='closeIcon'
								onClick={() => setOpenTextPopup(false)}
							>
								<MdOutlineClose />
							</button>
						</div>
						<div className='map'>
							<MapContainer
								center={['42.869335', '74.586145']}
								zoom={12}
								scrollWheelZoom={false}
								style={{ height: '100%', width: '100%' }}
							>
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
								/>
								<Marker position={[latitude, longitude]} draggable={true}>
									<Popup>Ваш дом</Popup>
								</Marker>
							</MapContainer>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
