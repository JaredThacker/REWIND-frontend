import React from 'react';
import { UserComments } from './types';

const useFetchUserComments = () => {
  const [commentBody, setCommentBody] = React.useState<UserComments[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/comments'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: UserComments[] = await response.json();
        setCommentBody(data);
      } catch (error) {
        setError('Failed to fetch comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const addComment = (newComment: UserComments) => {
    setCommentBody(prevComments => [...prevComments, newComment]);
  };

  return { commentBody, loading, error, addComment };
};

export default useFetchUserComments;
