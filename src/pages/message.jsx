import { Chat } from '../components/chat/chat'
import { Sidebar } from '../components/chat/sidebar'

export const Message = () => {
	return (
		<div className='messagePage'>
			<div className='container'>
				<Sidebar />
				<Chat />
			</div>
		</div>
	)
}
