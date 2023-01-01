import React from 'react'

export const BlueZone = () => {
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
							<div className='nameText'>Продать</div>
							<div>Поможем найти клиента...</div>
							<div className='next'>Читать дальше</div>
						</div>
					</div>
					<div className='blog'>
						<div className='iconHouse'>
							<img src='/assets/svg/rent.svg' alt='' />
						</div>
						<div className='text'>
							<div className='nameText'>Сдать</div>
							<div>Поможем найти клиента...</div>
							<div className='next'>Читать дальше</div>
						</div>
					</div>
					<div className='blog'>
						<div className='iconHouse'>
							<img src='/assets/svg/buy.svg' alt='' />
						</div>
						<div className='text'>
							<div className='nameText'>Купить</div>
							<div>Поможем найти клиента...</div>
							<div className='next'>Читать дальше</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}