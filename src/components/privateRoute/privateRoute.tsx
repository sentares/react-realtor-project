import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../../utils/hooks/useAuthStatus'
import { LoaderElement } from '../../utils/loader/loader'

export const PrivateRoute = () => {
	const { loggedIn, checkingStatus } = useAuthStatus()
	if (checkingStatus) {
		return <LoaderElement />
	}
	return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}
