import { FC, useState } from 'react'

interface IPaginate {
	postPerPage: number
	totalPosts: number
	paginate: any
}

export const Pagination: FC<IPaginate> = ({
	postPerPage,
	totalPosts,
	paginate,
}) => {
	const [currentPage, setCurrentPage] = useState(1)

	const pageNumbers = []
	for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<div className='pagination'>
			<ul className='paginationList'>
				{pageNumbers.map(number => (
					<li
						key={number}
						onClick={() => {
							setCurrentPage(number)
							paginate(number)
						}}
						className={`pageLink ${currentPage === number ? 'active' : ''}`}
					>
						{number}
					</li>
				))}
			</ul>
		</div>
	)
}
