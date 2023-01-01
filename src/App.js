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
import { createContext, useState } from 'react'
import { OfferListing } from './context/OfferListing'

export const ListingContext = createContext()
export const OfferListingContext = createContext()
function App() {
	const [listings, setListings] = useState(null)
	const [offerListings, setOfferListings] = useState(null)

	return (
		<>
			<div className='wrapper'>
				<ListingContext.Provider value={{ listings, setListings }}>
					<OfferListingContext.Provider
						value={{ offerListings, setOfferListings }}
					>
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
									<Route
										path='/category/:categoryName/:listingId'
										element={<Listing />}
									/>
									<Route path='/register' element={<SignUp />} />
									<Route path='/sign-in' element={<SignIn />} />
									<Route path='/test' element={<LoaderElement />} />
									<Route path='/tester' element={<OfferListing />} />
								</Routes>
							</div>
						</div>
					</OfferListingContext.Provider>
				</ListingContext.Provider>
			</div>
			<ToastContainer />
		</>
	)
}

export default App
