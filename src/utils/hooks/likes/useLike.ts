import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../../firebase'

export function useToggleLike({
	id,
	isLiked,
	uid,
}: {
	id: string
	isLiked: boolean
	uid: string
}) {
	const [isLoading, setLoading] = useState(false)
	async function toggleLike() {
		setLoading(true)
		try {
			const docRef = doc(db, 'listings', id)
			await updateDoc(docRef, {
				likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
			})
			toast.success('Все ок')
		} catch (error) {
			toast('Пройдите регистрацию')
			console.log(error)
		}
	}
	return { toggleLike, isLoading, isLiked }
}
