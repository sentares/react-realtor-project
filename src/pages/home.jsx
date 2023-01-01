import React, { useContext } from 'react'
import { OfferListingContext } from '../App'
import { BlueZone } from '../components/homePage/BlueZone'

export const Home = () => {
	const { offerListings } = useContext(OfferListingContext)
	console.log(offerListings)
	return (
		<div className='homePage'>
			<div className='container'>
				{/* превьюшка */}
				<section className='preview'>
					<div className='text'>
						<div className=' items-center flex justify-center mt-[-25px] mb-6'>
							<img src='/assets/svg/logo-white.svg' alt='logo' />
						</div>
						<div className='mainText'>Найди Дом Своей Мечты</div>
						<div className='secondText'>
							Публикуйте свои объявления аренды или продажи абсолютно бесплатно.
							Также мы поможем вам найти именно то, что вы ищете.
						</div>
					</div>
				</section>
				{/* блок инфо */}
				<section className='blocks'>
					<div className='block'>
						<div>Выбор городов</div>
						<div>Продажа / Аренда</div>
						<div className='dop'>Дополнительное </div>
					</div>
				</section>
				{/* инфо */}
				<section className='info'>
					<div>Более 1000+ объявлении</div>
				</section>
				{/* синяя зона  */}
				<BlueZone />
				{/* свайпер */}
				<section></section>
			</div>
		</div>
	)
}
