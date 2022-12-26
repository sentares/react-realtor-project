import { useState } from 'react'
import { toast } from 'react-toastify'
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { v4 as uuidv4 } from 'uuid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

export const CreateSel = () => {
	const navigate = useNavigate()
	const auth = getAuth()
	const [geolocationEnabled, setGeolocationEnabled] = useState(true)
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		type: 'rent',
		name: '',
		bedrooms: 1,
		bathrooms: 1,
		parking: false,
		furnished: false,
		address: '',
		description: '',
		offer: false,
		regularPrice: 0,
		discountedPrice: 0,
		latitude: 0,
		longitude: 0,
		images: {},
	})
	const {
		type,
		name,
		bedrooms,
		bathrooms,
		parking,
		address,
		furnished,
		description,
		offer,
		regularPrice,
		discountedPrice,
		latitude,
		longitude,
		images,
	} = formData
	function onChange(e) {
		let boolean = null
		if (e.target.value === 'true') {
			boolean = true
		}
		if (e.target.value === 'false') {
			boolean = false
		}
		if (e.target.files) {
			setFormData(prevState => ({
				...prevState,
				images: e.target.files,
			}))
		}
		if (!e.target.files) {
			setFormData(prevState => ({
				...prevState,
				[e.target.id]: boolean ?? e.target.value,
			}))
		}
	}
	async function onSubmit(e) {
		e.preventDefault()
		setLoading(true)
		if (+discountedPrice >= +regularPrice) {
			setLoading(false)
			toast.error('Скидочная цена должна быть меньше начальной цены')
			return
		}
		if (images.length > 6) {
			setLoading(false)
			toast.error('Максимум 6 фотографии можно добавить')
			return
		}
		let geolocation = {}
		let location
		if (geolocationEnabled) {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
			)
			const data = await response.json()
			console.log(data)
			geolocation.lat = data.results[0]?.geometry.location.lat ?? 0
			geolocation.lng = data.results[0]?.geometry.location.lng ?? 0

			location = data.status === 'ZERO_RESULTS' && undefined

			if (location === undefined) {
				setLoading(false)
				toast.error('Напишите правильный адрес')
				return
			}
		} else {
			geolocation.lat = latitude
			geolocation.lng = longitude
		}

		async function storeImage(image) {
			return new Promise((resolve, reject) => {
				const storage = getStorage()
				const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
				const storageRef = ref(storage, filename)
				const uploadTask = uploadBytesResumable(storageRef, image)
				uploadTask.on(
					'state_changed',
					snapshot => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100
						console.log('Upload is ' + progress + '% done')
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused')
								break
							case 'running':
								console.log('Upload is running')
								break
						}
					},
					error => {
						reject(error)
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
							resolve(downloadURL)
						})
					}
				)
			})
		}

		const imgUrls = await Promise.all(
			[...images].map(image => storeImage(image))
		).catch(error => {
			setLoading(false)
			toast.error('Изображения не загружены')
			return
		})

		const formDataCopy = {
			...formData,
			imgUrls,
			geolocation,
			timestamp: serverTimestamp(),
			userRef: auth.currentUser.uid,
		}
		delete formDataCopy.images
		!formDataCopy.offer && delete formDataCopy.discountedPrice
		delete formDataCopy.latitude
		delete formDataCopy.longitude
		const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
		setLoading(false)
		toast.success('Оюъявление создано')
		navigate(`/category/${formDataCopy.type}/${docRef.id}`)
	}

	if (loading) {
		return 'loading'
	}
	return (
		<main>
			<h1>Создайте обьявление</h1>
			<form onSubmit={onSubmit}>
				<p>Продажа / Аренда</p>
				<div className='flex'>
					<button
						type='button'
						id='type'
						value='sale'
						onClick={onChange}
						className={` ${
							type === 'rent'
								? 'bg-white text-black'
								: 'bg-[#2c3a61] text-white'
						}`}
					>
						Продажа
					</button>
					<button
						type='button'
						id='type'
						value='rent'
						onClick={onChange}
						className={`${
							type === 'sale'
								? 'bg-white text-black'
								: 'bg-[#2c3a61] text-white'
						}`}
					>
						Аренда
					</button>
				</div>
				<p>Название</p>
				<input
					type='text'
					id='name'
					value={name}
					onChange={onChange}
					placeholder='Придумайте название'
					maxLength='32'
					minLength='10'
					required
				/>
				<div className='bedAndBath'>
					<div>
						<p>Спален</p>
						<input
							type='number'
							id='bedrooms'
							value={bedrooms}
							onChange={onChange}
							min='1'
							max='50'
							required
							className='numbers'
						/>
					</div>
					<div>
						<p>Ванные</p>
						<input
							type='number'
							id='bathrooms'
							value={bathrooms}
							onChange={onChange}
							min='1'
							max='50'
							required
							className='numbers'
						/>
					</div>
				</div>
				<p className=' '>Парковка</p>
				<div className='flex'>
					<button
						type='button'
						id='parking'
						value={true}
						onClick={onChange}
						className={` ${
							!parking ? 'bg-white text-black' : 'bg-[#2c3a61] text-white'
						}`}
					>
						Да
					</button>
					<button
						type='button'
						id='parking'
						value={false}
						onClick={onChange}
						className={`${
							parking ? 'bg-white text-black' : 'bg-[#2c3a61] text-white'
						}`}
					>
						Нет
					</button>
				</div>
				<p className='mt-14'>Мебель</p>
				<div className='flex'>
					<button
						type='button'
						id='furnished'
						value={true}
						onClick={onChange}
						className={` ${
							!furnished ? 'bg-white text-black' : 'bg-[#2c3a61] text-white'
						}`}
					>
						Да
					</button>
					<button
						type='button'
						id='furnished'
						value={false}
						onClick={onChange}
						className={` ${
							furnished ? 'bg-white text-black' : 'bg-[#2c3a61] text-white'
						}`}
					>
						Нет
					</button>
				</div>
				<p className='mt-14 '>Адрес</p>
				<textarea
					type='text'
					id='address'
					value={address}
					onChange={onChange}
					placeholder='Адрес'
					required
				/>
				{!geolocationEnabled && (
					<div className='flex space-x-6 justify-start mb-6'>
						<div className=''>
							<p>Широта</p>
							<input
								type='number'
								id='latitude'
								value={latitude}
								onChange={onChange}
								required
								min='-90'
								max='90'
							/>
						</div>
						<div className=''>
							<p>Долгота</p>
							<input
								type='number'
								id='longitude'
								value={longitude}
								onChange={onChange}
								required
								min='-180'
								max='180'
							/>
						</div>
					</div>
				)}
				<p>Описание</p>
				<textarea
					type='text'
					id='description'
					value={description}
					onChange={onChange}
					placeholder='Опишите дом/квартиру'
					required
				/>
				<p>Cкидка</p>
				<div className=' flex justify-between'>
					<button
						type='button'
						id='offer'
						value={true}
						onClick={onChange}
						className={`max-w-[260px] ${
							!offer ? 'bg-white text-black' : 'bg-[#2c3a61] text-white'
						}`}
					>
						Да
					</button>
					<button
						type='button'
						id='offer'
						value={false}
						onClick={onChange}
						className={`max-w-[260px] ${
							offer ? 'bg-white text-black' : 'bg-[#2c3a61] text-white'
						}`}
					>
						Нет
					</button>
				</div>
				<div className='flex items-center '>
					<div className=' items-center'>
						<p className='text-lg font-semibold'>Цена $</p>
						<div className='flex w-full justify-center items-center space-x-6'>
							<input
								type='number'
								id='regularPrice'
								value={regularPrice}
								onChange={onChange}
								min='50'
								max='100000000'
								required
							/>
						</div>
					</div>
				</div>
				{offer && (
					<div className='flex items-center mb-6'>
						<div className=''>
							<p className='text-lg font-semibold'>Цена со скидкой</p>
							<div className='flex w-full justify-center items-center space-x-6'>
								<input
									type='number'
									id='discountedPrice'
									value={discountedPrice}
									onChange={onChange}
									min='50'
									max='100000000'
									required={offer}
								/>
							</div>
						</div>
					</div>
				)}
				<div className='mb-6'>
					<p className='text-lg font-semibold'>Фотографии</p>
					<p className='text-gray-600'>Максимум 6 фотографии</p>
					<input
						type='file'
						id='images'
						onChange={onChange}
						accept='.jpg,.png,.jpeg'
						multiple
						required
						className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600'
					/>
				</div>
				<button type='submit' className='addSel'>
					Создать обьявление
				</button>
			</form>
		</main>
	)
}
