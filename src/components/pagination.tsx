import { FC } from 'react'

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
	const pageNumbers = []
	for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<div className='pagination'>
			<ul className='paginationList'>
				{pageNumbers.map(number => (
					<a
						onClick={() => paginate(number)}
						className={paginate ? 'active' : 'pageLink'}
					>
						<li key={number} className='pageItem'>
							{number}
						</li>
					</a>
				))}
			</ul>
		</div>
	)
}
