import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { BiSend } from 'react-icons/bi'
import { AuthContext } from '../../../context/authContext'
import { useAddComment } from '../../../utils/hooks/comments/useComments'
import CommentList from './commentList'

export const Comments = listing => {
	const { currentUser } = useContext(AuthContext)
	const uid = currentUser?.uid
	const { id } = listing
	const { register, reset, handleSubmit } = useForm()

	const postId = id
	const { addComment, isLoading } = useAddComment({
		postId,
		uid,
	})

	function handleAddComment(data) {
		addComment(data.text)
		reset()
	}

	return (
		<div className='comments'>
			<div className='addComment'>
				<div className='comms'>Комментарии</div>
				<form className='newComment' onSubmit={handleSubmit(handleAddComment)}>
					<div className='textWrite'>
						<input
							placeholder='Напишите комментарии'
							autoComplete='off'
							{...register('text', { required: true })}
						/>
					</div>
					<div className='addButton'>
						<button type='submit'>
							<BiSend />
						</button>
					</div>
				</form>
			</div>
			<CommentList postId={postId} />
		</div>
	)
}
