import React, { useState } from 'react'
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
} from 'firebase/firestore'
import { db } from '../../firebase'

export const Search = () => {
	const [username, setUsername] = useState('')
	const [user, setUser] = useState(null)
	const [err, setErr] = useState(false)

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
	return (
		<div className='search'>
			<div className='searchForm'>
				<input
					type='text'
					placeholder='Найти пользователя'
					onKeyDown={handleKey}
					onChange={e => setUsername(e.target.value)}
				/>
			</div>
			{err && <span>Пользователь не найден(</span>}{' '}
			{user && (
				<div className='userChat'>
					<div className='userChatInfo'>
						<span>{user.name}</span>
					</div>
				</div>
			)}
		</div>
	)
}
