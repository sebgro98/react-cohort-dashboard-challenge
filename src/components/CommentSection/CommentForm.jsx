import { CommentContext } from "../PostFeed/Post";
import { useContext, useState } from "react";
import { MyContext } from '../../ApiProvider';

function CommentForm() {
    const [commentContent, setCommentContent] = useState('');
    const {post} = useContext(CommentContext)
    const { addComment } = useContext(MyContext);

    const handleChange = (e) => {
        setCommentContent(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(commentContent.trim()) {
            addComment(post.id, commentContent);
            setCommentContent('');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
            value={commentContent}
            onChange={handleChange}
            placeholder="Add a comment..."
            rows={4}
            required

            />
            <button type="submit">submit comment </button>

            
        </form>
    
    )
}
export default CommentForm