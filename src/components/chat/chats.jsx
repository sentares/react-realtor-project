import React, { useState } from 'react'

export const Chats = () => {
	const [chats, setChats] = useState([])
	return (
		<div className='chats'>
			<div className='userChat'>
				<div className='userChatInfo'>
					<span>Jane</span>
					<p>hello</p>
				</div>
			</div>
		</div>
	)
}
