import { Route, Routes } from 'react-router-dom'
import { ForgotPassword } from './pages/forgotPassword'
import { Offers } from './pages/offers'
import { Profile } from './pages/profile'
import { SignUp } from './pages/signUp'
import { Home } from './pages/home'
import { SignIn } from './pages/signIn'
import { Header } from './components/header/header'
import './scss/app.scss'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/offers' element={<Offers />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/register' element={<SignUp />} />
				<Route path='/sign-in' element={<SignIn />} />
			</Routes>
		</>
	)
}

export default App
