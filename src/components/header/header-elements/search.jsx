import { BiSearch } from 'react-icons/bi'

export const Search = () => {
	return (
		<div className='search'>
			<form>
				<div className='search_block'>
					<BiSearch className='lupa' />
					<input placeholder='what do u search?' />
				</div>
			</form>
		</div>
	)
}
