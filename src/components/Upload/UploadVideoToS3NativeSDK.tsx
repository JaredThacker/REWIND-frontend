"use client";

import React, { useState } from "react";
import AWS from "aws-sdk";
import { Button } from 'react-bootstrap';
import CreateUploadModal from "./CreateUploadModal";

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
  const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
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


  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

   const handleModalSubmit = () => {
    if (selectedFile) {
      uploadFile(selectedFile);
    }
    handleHideModal();
  };


  return (
    <div className="flex flex-col gap-9">
      <input type="file" onChange={handleFileInput} />
      <div>
        <progress className="" value={progress} max={100}>
          {progress}
        </progress>
      </div>
        <Button variant="primary" onClick={handleShowModal}>
        Video Information
      </Button>

        <CreateUploadModal 
          show={showModal} 
          onHide={handleHideModal} 
          onSubmit={handleModalSubmit} 
          />
    </div>

  );
};

export default UploadVideoToS3WithNativeSdk;
