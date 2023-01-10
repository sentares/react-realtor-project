import React, { useState } from 'react'
import { BiCategory } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import {
	setActiveDescAndAsc,
	setActiveSort,
} from '../../redux/slices/filterSlice'
import { TbSortAscending2, TbSortDescending2 } from 'react-icons/tb'

export const Sorting = ({
	activeType,
	onChangeActiveType,
	activeOffer,
	onChangeActiveOffer,
	onChangeActiveTag,
}) => {
	const activeSort = useSelector(state => state.filter.activeSort)
	const activeDescAndAsc = useSelector(state => state.filter.activeDescAndAsc)
	const activeTag = useSelector(state => state.filter.activeTag)
	const [opened, setOpened] = useState(false)
	const [openedIcon, setOpenedIcon] = useState(false)

	const setOpenedListItem = obj => {
		dispatch(setActiveSort(obj))
		setOpened(false)
	}

	const setOpenedIconItem = obj => {
		dispatch(setActiveDescAndAsc(obj))
		setOpenedIcon(false)
	}

	const dispatch = useDispatch()
	const type = ['Все', 'Продажа', 'Аренда']
	const offer = ['Со скидкой', 'Без скидки']
	const tag = ['Все', 'Дом', 'Квартира']

	const sortList = [
		{ name: 'Дате', sortProperty: 'timestamp' },
		{ name: 'Цене', sortProperty: 'regularPrice' },
		{ name: 'Площади', sortProperty: 'area' },
	]

	const iconList = [
		{ icon: <TbSortDescending2 />, property: 'desc' },
		{ icon: <TbSortAscending2 />, property: 'asc' },
	]

	let nameType = typeNumber()
	function typeNumber() {
		if (activeType === 0) {
			return 'Продажа/Аренда'
		} else if (activeType === 1) {
			return 'Продажа'
		} else {
			return 'Аренда'
		}
	}

	let nameTag = nameNumber()
	function nameNumber() {
		if (activeTag === 0) {
			return 'Домов/Квартир'
		} else if (activeTag === 1) {
			return 'Домов'
		} else {
			return 'Квартир'
		}
	}

	let nameOffer = offerNumber()
	function offerNumber() {
		if (activeOffer === 0) {
			return 'Со скидкой'
		} else {
			return 'Без скидки'
		}
	}

	return (
		<section className='options'>
			<div className='optionsBlock'>
				<div className='sortBlock'>
					<BiCategory />
					<div className='sortSet'>Сортировка по:</div>
					<button onClick={() => setOpened(!opened)} className='font-semibold'>
						{activeSort.name}
					</button>
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
					<div className='sortIcons'>
						<button
							onClick={() => setOpenedIcon(!openedIcon)}
							className='font-semibold'
						>
							{activeDescAndAsc.icon}
						</button>
						{openedIcon && (
							<div className='sort__popup__icons'>
								<ul>
									{iconList.map((obj, i) => (
										<li
											key={i}
											onClick={() => setOpenedIconItem(obj)}
											className={
												activeDescAndAsc.property === obj.property
													? 'active'
													: ''
											}
										>
											{obj.icon}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>

				{/* {activeSort.name === 'Цене' && (
					<div className='bedAndBath'>
						<div>
							<p>От</p>
							<input
								type='number'
								id='bedrooms'
								min='100'
								max='4000000'
								required
								className='numbers'
							/>
						</div>
						<div>
							<p>До</p>
							<input
								type='number'
								id='bathrooms'
								min='1000'
								max='5000000'
								required
								className='numbers'
							/>
						</div>
					</div>
				)} */}

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
			<div className='secondContainer'>
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
				<div className='tagBlock'>
					<ul>
						{tag.map((value, i) => (
							<li
								key={value}
								className={activeTag === i ? 'active' : ''}
								onClick={() => onChangeActiveTag(i)}
							>
								{value}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className='choseBlock'>
				<div className='nameBlock'>
					<h1 className='whatChose'>{nameType}</h1>
				</div>
				<div className='nameBlock'>
					<h1 className='whatChose'>{nameTag}</h1>
				</div>
				<div className='nameBlockOffer'>
					<h1 className='whatChose'>{nameOffer}</h1>
				</div>
				<div className='lastNameBlock'>
					<h1 className='whatChose'>По: {activeSort.name}</h1>
				</div>
			</div>
		</section>
	)
}
