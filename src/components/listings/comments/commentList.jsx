import { useComments } from '../../../utils/hooks/comments/useComments'
import { Comment } from './comment'

export default function CommentList({ postId }) {
	const { comments, isLoading } = useComments(postId)
	if (isLoading) return 'Загрузка'
	return (
		<div>
			{comments.map(comment => (
				<Comment key={comment.id} comment={comment} />
			))}
		</div>
	)
}
