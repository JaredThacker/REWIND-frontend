import React from "react";
import useFetchComments from "./fetchUserComments";
import { UserComments } from './types';

const userCommentsDisplay: React.FC = () => {
    const { comments, loading, error } = useFetchComments();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="comments-section">
            {comments.length === 0 && <div className="no-comments">No comments yet</div>}
            {comments.map((comment) => (
                <div key={comment.id} className="comment">
                    <div className="comment-avatar">
                        <img src="/genericpfp.jpg" alt={comment.authorUserName} />
                    </div>
                    <div className="comment-content">
                        <div className="comment-header">
                            <span className="comment-author">{comment.authorUserName}</span>
                            <span className="comment-time">2 hours ago</span> {/* Add real timestamp */}
                        </div>
                        <div className="comment-body">
                            {comment.commentBody}
                        </div>
                        <div className="comment-actions">
                            <button className="comment-action">Like ({comment.likes})</button>
                            <button className="comment-action">Dislike ({comment.dislikes})</button>
                            <button className="comment-action">Reply</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default userCommentsDisplay;
