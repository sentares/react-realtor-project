import React, { useState } from 'react'
import { BiCategory } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveSort } from '../../redux/slices/filterSlice'

export const Sorting = ({
	activeType,
	onChangeActiveType,
	activeOffer,
	onChangeActiveOffer,
}) => {
	const activeSort = useSelector(state => state.filter.activeSort)
	const [opened, setOpened] = useState(false)

	const setOpenedListItem = obj => {
		dispatch(setActiveSort(obj))
		setOpened(false)
	}

	const dispatch = useDispatch()
	const type = ['Все', 'Продажа', 'Аренда']
	const offer = ['Все', 'Со скидкой', 'Без скидки']

	const sortList = [
		{ name: 'Дате', sortProperty: 'timestamp' },
		{ name: 'Цене', sortProperty: 'price' },
		{ name: 'Площади', sortProperty: 'area' },
	]

	return (
		<section className='options'>
			<div className='optionsBlock'>
				<div className='sortBlock'>
					<BiCategory />
					<div className='sortSet'>Сортировка по:</div>
					<button onClick={() => setOpened(!opened)}>{activeSort.name}</button>
					{opened && (
						<div className='sort__popup'>
							<ul>
								{sortList.map((obj, i) => (
									<li
										key={i}
										onClick={() => setOpenedListItem(obj)}
										className={
											activeSort.sortProperty === obj.sortProperty
												? 'active'
												: ''
										}
									>
										{obj.name}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
				<div className='typeBlock'>
					<ul>
						{type.map((value, i) => (
							<li
								key={value}
								className={activeType === i ? 'active' : ''}
								onClick={() => onChangeActiveType(i)}
							>
								{value}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className='discountBlock'>
				<ul>
					{offer.map((value, i) => (
						<li
							key={value}
							className={activeOffer === i ? 'active' : ''}
							onClick={() => onChangeActiveOffer(i)}
						>
							{value}
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
