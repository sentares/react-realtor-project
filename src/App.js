import { Route, Routes } from 'react-router-dom'
import { Offers } from './pages/offers'
import { Profile } from './pages/profile'
import { SignUp } from './pages/signUp'
import { Home } from './pages/home'
import { SignIn } from './pages/signIn'
import { Header } from './components/header/header'
import { PrivateRoute } from './components/privateRoute/privateRoute'
import { ToastContainer } from 'react-toastify'
import { LoaderElement } from './utils/loader/loader'
import { CreateSel } from './pages/createSel'
import { EditListing } from './pages/editListing'
import { Listing } from './pages/listings'
import './scss/app.scss'
import 'react-toastify/dist/ReactToastify.css'

import { useContext } from 'react'
import { AuthContext } from './context/authContext'
import { Likes } from './pages/likes'
import { Search } from './pages/search'

function App() {
	const { currentUser } = useContext(AuthContext)

	return (
		<>
			<div className='wrapper'>
				<div className='content'>
					<div className='container'>
						<Header />
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/' element={<PrivateRoute />}>
								<Route path='/profile' element={<Profile />} />
								<Route path='/createsel' element={<CreateSel />} />
								<Route
									path='/edit-listing/:listingId'
									element={<EditListing />}
								/>
							</Route>
							<Route path='/offers' element={<Offers />} />
							<Route path='/likes' element={<Likes />} />
							<Route path='search' element={<Search />} />
							<Route
								path='/category/:categoryName/:listingId'
								element={<Listing />}
							/>
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
