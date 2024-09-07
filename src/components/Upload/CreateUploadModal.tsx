import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface CreateUploadModalProps {
    show: boolean;
    onHide: () => void;
    onSubmit: () => void; 
}

const CreateUploadModal: React.FC<CreateUploadModalProps> = ({ show, onHide, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState<string | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setThumbnail(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        if (thumbnail) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('username', username || '');
            formData.append('thumbnail', thumbnail);
            onSubmit(); 
        } else {
            alert("Please select an image to upload.");
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Upload Video</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter video title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter video description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="mt-3">
                                <img src={imagePreview} alt="Image preview" style={{ maxWidth: '100%' }} />
                            </div>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Create Post
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateUploadModal;

