import { FC } from 'react'
import { Link } from 'react-router-dom'

export const BlueZone: FC = (): JSX.Element => {
	return (
		<section className='blueZone'>
			<div className='mainText'>
				<div className='flex items-center justify-center'>
					<h1> Как мы вам поможем</h1>
				</div>
				<div className='blogs'>
					<div className='blog'>
						<div className='iconHouse'>
							<img src='/assets/svg/63-home 1.svg' alt='' />
						</div>
						<div className='text'>
							<Link to={'/profile'}>
								<div className='nameText'>Продать</div>
								<div>Поможем найти клиента...</div>
								<div className='next'>Читать дальше</div>
							</Link>
						</div>
					</div>
					<div className='blog'>
						<div className='iconHouse'>
							<img src='/assets/svg/rent.svg' alt='' />
						</div>
						<div className='text'>
							<Link to={'/profile'}>
								<div className='nameText'>Сдать</div>
								<div>Поможем найти клиента...</div>
								<div className='next'>Читать дальше</div>
							</Link>
						</div>
					</div>
					<div className='blog'>
						<div className='iconHouse'>
							<img src='/assets/svg/buy.svg' alt='' />
						</div>
						<div className='text'>
							<Link to={'/offers'}>
								<div className='nameText'>Купить</div>
								<div>Поможем найти клиента...</div>
								<div className='next'>Читать дальше</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
