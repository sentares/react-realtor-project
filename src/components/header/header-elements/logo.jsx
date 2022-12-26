import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Logo = () => {
	const navigate = useNavigate()
	return (
		<div className=' ml-7 '>
			<img
				src='/assets/svg/logo-sky.svg'
				alt='logo'
				className='w-[100px] h-[60px] cursor-pointer p-[-50px]  '
				onClick={() => navigate('/')}
			/>
		</div>
	)
}
