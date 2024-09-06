import React from "react";
import { UserComments } from './types';
import "./userCommentsDisplay.css";
import { ThumbsDown, ThumbsUp } from "lucide-react";

interface UserCommentsDisplayProps {
    comments: UserComments[];
    loading: boolean;
    error: string | null;
}

const UserCommentsDisplay: React.FC<UserCommentsDisplayProps> = ({ comments, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
     console.log(comments)

     const sortedComments = [...comments].sort((a, b) => b.id - a.id);

    return (
        <div className="comments-section">
            {sortedComments.length === 0 && <div className="no-comments">No comments yet</div>}
            {sortedComments.map((comment, index) => (
                <div key={index} className="comment">
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

export default UserCommentsDisplay;
