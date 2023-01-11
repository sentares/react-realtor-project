import { FC } from 'react'
import { Slider } from '../components/homePage/slider'
import { BlueZone } from '../components/homePage/BlueZone'

export const Home: FC = (): JSX.Element => {
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
				<section className='slider'>
					<div className='content'>
						<div className='name'>Недавние</div>
						<Slider />
					</div>
				</section>
			</div>
		</div>
	)
}
