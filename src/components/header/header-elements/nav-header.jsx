import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { AiFillHome } from 'react-icons/ai'
import { MdSell } from 'react-icons/md'
import { FaHeart, FaUserCircle } from 'react-icons/fa'
import { GoSignIn } from 'react-icons/go'

export const NavHeader = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [pagesState, setPageState] = useState('Войти')
	const auth = getAuth()

	function pathMatchRoute(route) {
		if (route === location.pathname) {
			return true
		}
	}

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setPageState(
					<>
						<FaUserCircle />
					</>
				)
			} else {
				setPageState(
					<>
						<GoSignIn />
					</>
				)
			}
		})
	}, [auth])

	return (
		<div>
			<ul>
				<li onClick={() => navigate('/')}>
					<button
						className={`stateButton ${pathMatchRoute('/') && 'activeButton'}`}
					>
						<AiFillHome />
					</button>
				</li>
				<li onClick={() => navigate('/offers')}>
					<button
						className={`stateButton ${
							pathMatchRoute('/offers') && 'activeButton'
						}`}
					>
						<MdSell />
					</button>
				</li>
				<li onClick={() => navigate('/likes')}>
					<button
						className={`stateButton ${
							pathMatchRoute('/likes') && 'activeButton'
						}`}
					>
						<FaHeart />
					</button>
				</li>
				<li onClick={() => navigate('/profile')}>
					<button
						className={`stateButton ${
							(pathMatchRoute('/sign-in') || pathMatchRoute('/profile')) &&
							'shadow-xl bg-white text-[#2c3a61]'
						}`}
					>
						{pagesState}
					</button>
				</li>
			</ul>
		</div>
	)
}
