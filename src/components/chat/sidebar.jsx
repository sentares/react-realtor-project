import React from 'react'
import { Chats } from './chats'
import { NavBar } from './navBar'
import { Search } from './search'

export const Sidebar = () => {
	return (
		<div className='sidebar'>
			<NavBar />
			<Search />
			<Chats />
		</div>
	)
}
