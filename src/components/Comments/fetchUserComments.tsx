import React from 'react';

// Define the Comment interface based on your API response
interface Comment {
  id: number;
  commentBody: string;
  authorUserName: string;
  likes: number;
  dislikes: number;
}

const useFetchUserComments = () => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchComments = async () => {
      try {
        // Fetch comments from your API
        const response = await fetch('http://localhost:8080/api/comments'); // Adjust URL as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Comment[] = await response.json();

        // Update state with the fetched comments
        setComments(data);
      } catch (error) {
        setError('Failed to fetch comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return { comments, loading, error };
};

export default useFetchUserComments;
