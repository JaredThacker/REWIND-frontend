import React from "react";
import useFetchComments from "./fetchUserComments";
import { UserComments } from './types';
import "./userCommentsDisplay.css"
import { ThumbsDown, ThumbsUp } from "lucide-react";

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
                        </div>
                        <div className="comment-body">
                            {comment.commentBody}
                        </div>
                        <div className="comment-actions">
                            <button className="comment-action">
                               <ThumbsUp className="w-6" /> 
                                ({comment.likes})</button>
                            <button className="comment-action">
                                 <ThumbsDown className="w-6"/> 
                                ({comment.dislikes})</button>
                            <button className="comment-action">Reply</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default userCommentsDisplay;
