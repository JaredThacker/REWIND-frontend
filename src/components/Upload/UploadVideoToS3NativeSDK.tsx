"use client";

import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { Button, Modal, Form } from 'react-bootstrap';

const S3_BUCKET = "rewinduploads";
const REGION = "us-east-1";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const UploadVideoToS3WithNativeSdk = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files ? e.target.files[0] : null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setThumbnail(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadFile = (file: File) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  const handleSubmit = () => {
    if (selectedFile && thumbnail) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('username', username || '');
      formData.append('thumbnail', thumbnail);

      uploadFile(selectedFile);
      setShowModal(false); 
    } else {
      alert("Please select a video file and a thumbnail image.");
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Upload Video
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter video description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Upload Image: </Form.Label>
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

            <Form.Group>
              <Form.Label>Select Video File: </Form.Label>
              <Form.Control
                type="file"
                accept="video/*"
                onChange={handleFileInput}
              />
              {progress > 0 && (
                <div>
                  <progress value={progress} max={100}>
                    {progress}%
                  </progress>
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadVideoToS3WithNativeSdk;
