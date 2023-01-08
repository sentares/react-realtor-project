import React, { useContext, useState } from 'react'
import {
	collection,
	query,
	where,
	getDocs,
	setDoc,
	doc,
	updateDoc,
	serverTimestamp,
	getDoc,
	addDoc,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from '../../context/authContext'
import { FaUserCircle } from 'react-icons/fa'

export const Search = () => {
	const [username, setUsername] = useState('')
	const [user, setUser] = useState(null)
	const [err, setErr] = useState(false)

	const { currentUser } = useContext(AuthContext)

	const handleSearch = async () => {
		const q = query(collection(db, 'users'), where('name', '==', username))

		try {
			const querySnapshot = await getDocs(q)
			querySnapshot.forEach(doc => {
				setUser(doc.data())
			})
		} catch (err) {
			setErr(true)
		}
	}
	const handleKey = e => {
		e.code === 'Enter' && handleSearch()
	}
	console.log(user)

	const handleSelect = async () => {
		const combinedId =
			currentUser.uid > user.uid
				? currentUser.uid + user.uid
				: user.uid + currentUser.uid

		try {
			// const res = await getDoc(doc(db, 'chats', combinedId))
			// if (!res.exists()) {
			const formData = { combinedId, messages: [] }
			await addDoc(collection(db, 'chats'), formData)
			// await setDoc(doc(db, 'userChats', currentUser.uid), {
			// 	[combinedId + '.userInfo']: {
			// 		uid: user.uid,
			// 		name: user.name,
			// 	},
			// 	[combinedId + '.date']: serverTimestamp(),
			// })

			// await setDoc(doc(db, 'userChats', user.uid), {
			// 	[combinedId + '.userInfo']: {
			// 		uid: currentUser.uid,
			// 		name: currentUser.name,
			// 	},
			// 	[combinedId + '.date']: serverTimestamp(),
			// })
			// }
		} catch (err) {
			console.log('err')
		}

		console.log(combinedId)
	}

	return (
		<div className='search'>
			<div className='searchForm'>
				<input
					type='text'
					placeholder='Найти пользователя'
					onKeyDown={handleKey}
					onChange={e => setUsername(e.target.value)}
					value={username}
				/>
			</div>
			{err && <span>Пользователь не найден(</span>}
			{user && (
				<div className='userChat' onClick={handleSelect}>
					<FaUserCircle className='text-2xl text-sky-900' />
					<div className='userChatInfo'>
						<span>{user.name}</span>
					</div>
				</div>
			)}
		</div>
	)
}
