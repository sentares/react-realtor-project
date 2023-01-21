import { doc, getDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { FC } from 'react'

export const Contact = ({ userRef }) => {
	const [landlord, setLandlord] = useState(null)
	useEffect(() => {
		async function getLandlord() {
			const docRef = doc(db, 'users', userRef)
			const docSnap = await getDoc(docRef)
			if (docSnap.exists()) {
				setLandlord(docSnap.data())
			} else {
				toast.error('Could not get landlord data')
			}
		}
		getLandlord()
	}, [userRef])

	return (
		<>
			{landlord !== null && <div className='contactInfo'>{landlord.name}</div>}
		</>
	)
}
