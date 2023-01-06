import React from 'react'

export const Input = () => {
	return (
		<div className='input'>
			<input type='text' placeholder='...' />
			<div className='send'>
				<input type='file' style={{ display: 'none' }} id='file' />
				<button>Send</button>
			</div>
		</div>
	)
}
