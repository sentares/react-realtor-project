import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const NavHeader = () => {
	const location = useLocation()
	const navigate = useNavigate()

	function pathMatchRoute(route) {
		if (route === location.pathname) {
			return true
		}
	}

	return (
		<div>
			<ul>
				<li onClick={() => navigate('/')}>
					<button
						className={`text-white ${
							pathMatchRoute('/') && 'shadow-xl bg-white text-[#2c3a61]'
						}`}
					>
						Home
					</button>
				</li>
				<li onClick={() => navigate('/offers')}>
					<button
						className={`text-white ${
							pathMatchRoute('/offers') && 'shadow-xl bg-white text-[#2c3a61]'
						}`}
					>
						Offers
					</button>
				</li>
				<li onClick={() => navigate('/sign-in')}>
					<button
						className={`text-white ${
							pathMatchRoute('/sign-in') && 'shadow-xl bg-white text-[#2c3a61]'
						}`}
					>
						Sign-in
					</button>
				</li>
			</ul>
		</div>
	)
}
