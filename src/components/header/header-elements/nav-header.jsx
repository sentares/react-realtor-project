import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

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
				setPageState('Мой профиль')
			} else {
				setPageState('Войти')
			}
		})
	}, [auth])

	return (
		<div>
			<ul>
				<li onClick={() => navigate('/')}>
					<button
						className={`text-black ${
							pathMatchRoute('/') && 'shadow-xl bg-white text-[#2c3a61]'
						}`}
					>
						Домашняя
					</button>
				</li>
				<li onClick={() => navigate('/offers')}>
					<button
						className={`text-black ${
							pathMatchRoute('/offers') && 'shadow-xl bg-white text-[#2c3a61]'
						}`}
					>
						Предложения
					</button>
				</li>
				<li onClick={() => navigate('/profile')}>
					<button
						className={`text-black ${
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
