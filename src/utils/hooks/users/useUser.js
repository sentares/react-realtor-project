import { doc, query } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { db } from '../../../firebase'

export function useUser(id) {
	const q = query(doc(db, 'users', id))
	const [user, isLoading] = useDocumentData(q)
	return { user, isLoading }
}
