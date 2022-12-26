import { Route, Routes } from 'react-router-dom'
import { ForgotPassword } from './pages/forgotPassword'
import { Offers } from './pages/offers'
import { Profile } from './pages/profile'
import { SignUp } from './pages/signUp'
import { Home } from './pages/home'
import { SignIn } from './pages/signIn'
import { Header } from './components/header/header'
import { PrivateRoute } from './components/privateRoute/privateRoute'
import './scss/app.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LoaderElement } from './utils/loader/loader'
import { CreateSel } from './pages/createSel'

function App() {
	return (
		<>
			<div className='wrapper'>
				<Header />
				<div className='content'>
					<div className='container'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/' element={<PrivateRoute />}>
								<Route path='/profile' element={<Profile />} />
								<Route path='/createsel' element={<CreateSel />} />
							</Route>
							<Route path='/forgot-password' element={<ForgotPassword />} />
							<Route path='/offers' element={<Offers />} />
							<Route path='/profile' element={<Profile />} />
							<Route path='/register' element={<SignUp />} />
							<Route path='/sign-in' element={<SignIn />} />
							<Route path='/test' element={<LoaderElement />} />
						</Routes>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	)
}

export default App
