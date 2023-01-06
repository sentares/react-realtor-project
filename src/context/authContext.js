import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createContext } from 'react'

export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({})
	const auth = getAuth()

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			setCurrentUser(user)
			console.log(user)
		})
	}, [])

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	)
}
