import { useContext, useState } from 'react'
import { RiShareLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/authContext'
import { useToggleLike } from '../../utils/hooks/likes/useLike'
import { FaComment, FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa'
import { useComments } from '../../utils/hooks/comments/useComments'

export const Actions = listing => {
	const [shareLinkCopied, setShareLinkCopied] = useState(false)
	const { currentUser } = useContext(AuthContext)

	const { likes } = listing
	const { id } = listing

	const isLiked = likes.includes(currentUser?.uid)
	const config = {
		id,
		isLiked,
		uid: currentUser?.uid,
	}
	const { toggleLike, isLoading: likeLoading } = useToggleLike(config)
	const { comments, isLoading } = useComments(id)

	return (
		<>
			<div className='likes'>
				<button className='save' onClick={() => toggleLike()}>
					{isLiked ? (
						<FaHeart className='likeOn' />
					) : (
						<FaRegHeart className='likeOff' />
					)}
					{likes.length}
				</button>
				<div className='save'>
					{comments?.length === 0 ? (
						<FaRegComment className='commentOff' />
					) : (
						<FaComment className='commentOff' />
					)}
					{comments?.length}
				</div>
				<div>
					<RiShareLine
						className='icon'
						onClick={() => {
							navigator.clipboard.writeText(window.location.href)
							setShareLinkCopied(true)
							setTimeout(() => {
								setShareLinkCopied(false)
							}, 2000)
							toast.success('Страница скопирована')
						}}
					/>
				</div>
			</div>
		</>
	)
}
