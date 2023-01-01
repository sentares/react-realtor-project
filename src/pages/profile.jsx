import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { getAuth } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { MdSell } from 'react-icons/md'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	where,
} from 'firebase/firestore'
import { data } from 'autoprefixer'
import { ListingItem } from '../components/listingItem/listingItem'

export const Profile = () => {
	const [listings, setListings] = useState(null)
	const [loading, setLoading] = useState(true)
	const [open, setOpen] = useState(true)
	const navigate = useNavigate()
	const auth = getAuth()
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	})
	const { name, email } = formData

	function onLogOut() {
		auth.signOut()
		navigate('/')
	}
	useEffect(() => {
		async function fetchUserSel() {
			const listingRef = collection(db, 'listings')
			const q = query(
				listingRef,
				where('userRef', '==', auth.currentUser.uid),
				orderBy('timestamp', 'desc')
			)
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
		fetchUserSel()
	}, [auth.currentUser.uid])

	async function onDelete(listingID) {
		if (window.confirm('Вы уверены что хотите удалить объявление?')) {
			await deleteDoc(doc(db, 'listings', listingID))
			const updatedListings = listings.filter(
				listing => listing.id !== listingID
			)
			setListings(updatedListings)
			toast.success('Успешно удалено')
		}
	}
	function onEdit(listingID) {
		navigate(`/edit-listing/${listingID}`)
	}
	return (
		<div className='profile'>
			<section className='profile_userData'>
				<div className='userDataContent'>
					<img src='/assets/svg/Rectangle-profile.svg' alt='' />
					<div className='profileText'>
						<FaUserCircle className=' w-[90px] h-[90px]' />
						{name}
					</div>
				</div>
			</section>
			<section className='navProfile'>
				<div>
					<button
						onClick={() => setOpen(!open)}
						className={open ? 'active' : ''}
					>
						Мои объявления
					</button>
				</div>
				<div>
					<button>Понравившиеся</button>
				</div>
				<div>
					<button onClick={onLogOut}>Выйти с профиля</button>
				</div>
			</section>
			{open && (
				<section className='ribbonProfile'>
					<div className='button_block'>
						<Link to='/createsel'>
							<button>
								<MdSell />
								Создать новое объявление
							</button>
						</Link>
					</div>
				</section>
			)}

			{open && !loading && listings.length > 0 && (
				<section className='mySel'>
					<div className='selBlock'>
						<div className='text'>
							<h1>Созданные объявления</h1>
						</div>
						<div className='yourSel'>
							<ul className='selHouse'>
								{listings.map(listing => (
									<ListingItem
										key={listing.id}
										id={listing.id}
										listing={listing.data}
										onDelete={() => onDelete(listing.id)}
										onEdit={() => onEdit(listing.id)}
									/>
								))}
							</ul>
						</div>
					</div>
				</section>
			)}
		</div>
	)
}
