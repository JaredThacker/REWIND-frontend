import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserComments } from './types';

interface PostCommentBoxProps {
    onCommentPosted: (newComment: UserComments) => void;
}

const PostCommentBox: React.FC<PostCommentBoxProps> = ({ onCommentPosted }) => {
    const [commentBody, setCommentBody] = useState("");
    const [authorUserName, setAuthorUserName] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setAuthorUserName(storedUsername);
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    commentBody: commentBody,
                    authorUserName: localStorage.getItem("username"),
                    likes: 0,
                    dislikes: 0,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response for posting comment was not ok :(');
            }

            const newComment: UserComments = await response.json();
            onCommentPosted(newComment); // new comment coming through!
            setCommentBody("");
        } catch (error) {
            console.log("There was a problem with the fetch operation for posting comments :(", error);
        }
    };

    return (
        <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "75ch" } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div>
                <TextField
                    id="comment-body"
                    label="Comment"
                    variant="outlined"
                    multiline
                    maxRows={4}
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "white",
                            },
                            "&:hover fieldset": {
                                borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "white",
                            },
                        },
                        "& .MuiInputBase-input": {
                            color: "white",
                        },
                        "& .MuiFormLabel-root": {
                            color: "white",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "white",
                        },
                    }}
                />
            </div>
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Share your opinion
            </Button>
        </Box>
    );
};

export default PostCommentBox;
