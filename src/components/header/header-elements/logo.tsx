import { useNavigate } from 'react-router-dom'

export const Logo = (): JSX.Element => {
	const navigate = useNavigate()
	return (
		<div className=' ml-9 rounded-lg bg-white px-2 shadow-lg'>
			<img
				src='/assets/svg/logo-sky.svg'
				alt='logo'
				className='w-[100px] h-[60px] cursor-pointer p-[-50px]  '
				onClick={() => navigate('/')}
			/>
		</div>
	)
}
