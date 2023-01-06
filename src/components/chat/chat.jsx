import React from 'react'
import { Input } from './input'
import { Messages } from './messages'

export const Chat = () => {
	return (
		<div className='chat'>
			<div className='chatInfo'>
				<span>Jane</span>
				<div className='chatIcons'></div>
			</div>
			<Messages />
			<Input />
		</div>
	)
}
