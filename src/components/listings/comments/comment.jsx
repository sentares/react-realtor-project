import { formatDistanceToNow } from 'date-fns'
import { FaTrash, FaUserCircle } from 'react-icons/fa'
import { useDeleteComment } from '../../../utils/hooks/comments/useComments'
import { useUser } from '../../../utils/hooks/users/useUser'
import { useUserUid } from '../../../utils/hooks/userUid'

export function Comment({ comment }) {
	const { text, uid, date, id } = comment
	const { user, isLoading } = useUser(uid)
	const { deleteComment } = useDeleteComment(id)

	const myUid = useUserUid()

	if (isLoading) return 'Загрузка'
	return (
		<div
			className={myUid.uid === uid ? 'allComments bg-green-50' : 'allComments'}
		>
			<div className='userComment'>
				<div className='userInfo'>
					<div className={myUid.uid === uid ? 'user text-[#115d59]' : 'user'}>
						<FaUserCircle className='userIcon' />
						{user.name}
					</div>
					<div className='data'>{formatDistanceToNow(date)} ago</div>
				</div>
				<div className='textBlock'>
					<div className='text'>{text}</div>
					{myUid.uid === uid && (
						<FaTrash className='trash' onClick={deleteComment} />
					)}
				</div>
			</div>
		</div>
	)
}
