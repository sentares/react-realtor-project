import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'

export function useUserUid() {
	const [uid, setUid] = useState<string | null>(null)
	const auth = getAuth()
	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				setUid(user.uid)
			}
		})
	}, [])
	return { uid }
}
