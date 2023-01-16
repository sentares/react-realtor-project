import { useComments } from '../../../utils/hooks/comments/useComments'
import { LoaderElement } from '../../../utils/loader/loader'
import { Comment } from './comment'

export default function CommentList({ postId }) {
	const { comments, isLoading } = useComments(postId)
	if (isLoading) return <LoaderElement />
	return (
		<div>
			{comments.map(comment => (
				<Comment key={comment.id} comment={comment} />
			))}
		</div>
	)
}
