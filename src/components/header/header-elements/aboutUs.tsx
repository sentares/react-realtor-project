import { FC } from 'react'
import { Link } from 'react-router-dom'

export const AboutUs: FC = (): JSX.Element => {
	return (
		<div className='about'>
			<Link to='/'>About Us</Link>
		</div>
	)
}
