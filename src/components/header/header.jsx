import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Logo } from './header-elements/logo'
import { NavHeader } from './header-elements/nav-header'
import { Search } from './header-elements/search'

export const Header = () => {
	return (
		<div className='header shadow-md'>
			<header className='header-component'>
				<Logo />
				<Search />
				<NavHeader />
			</header>
		</div>
	)
}
