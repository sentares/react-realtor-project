import { uuidv4 } from '@firebase/util'
import {
	collection,
	deleteDoc,
	doc,
	orderBy,
	query,
	setDoc,
	where,
} from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../../firebase'

export function useAddComment({
	postId,
	uid,
}: {
	postId: string
	uid: string
}) {
	const [isLoading, setLoading] = useState(false)
	async function addComment(text: string) {
		try {
			setLoading(true)
			const id = uuidv4()
			const date = Date.now()
			const docRef = doc(db, 'comments', id)
			await setDoc(docRef, { text, id, postId, date, uid })
			toast.success('Комментарии добавлен')
		} catch (error) {
			toast('Пройдите регистрацию')
			console.log(error)
			console.log(uid)
		}
		setLoading(false)
	}
	return { addComment, isLoading }
}

export function useComments(postId: string) {
	const q = query(
		collection(db, 'comments'),
		where('postId', '==', postId),
		orderBy('date', 'desc')
	)
	const [comments, isLoading, error] = useCollectionData(q)
	if (error) {
		console.log(error)
	}

	return { comments, isLoading }
}

export function useDeleteComment(id: string) {
	async function deleteComment() {
		const res = window.confirm('Вы уверены, что хотите удалить комментарии?')

		if (res) {
			const docRef = doc(db, 'comments', id)
			await deleteDoc(docRef)
			toast.success('Комментарий удален')
		}
	}
	return { deleteComment }
}
