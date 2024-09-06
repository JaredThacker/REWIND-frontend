import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const PostCommentBox: React.FC = () => {
    const [commentBody, setCommentBody] = useState("");
    const [authorUserName, setAuthorUserName] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username"); // Get username from localStorage
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
                    commentBody,
                    authorUserName,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response for posting comment was not ok :(');
            }

            const data = await response.json();
            console.log("Comment post was successful", data);
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
                                borderColor: "white", // outline colour
                            },
                            "&:hover fieldset": {
                                borderColor: "white", // colour on hover
                            },
                        },
                        "& .MuiInputBase-input": {
                            color: "white", // colour of text
                        },
                        "& .MuiFormLabel-root": {
                            color: "white", // colour of label
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
