import { AboutUs } from './header-elements/aboutUs'
import { Logo } from './header-elements/logo'
import { NavHeader } from './header-elements/nav-header'

export const Header = (): JSX.Element => {
	return (
		<div className='header shadow-md'>
			<header className='header-component'>
				<Logo />
				<NavHeader />
				<AboutUs />
			</header>
		</div>
	)
}
