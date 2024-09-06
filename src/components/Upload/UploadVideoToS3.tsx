"use client";

import React, { useState } from "react";
import { uploadFile } from "react-s3";

const S3_BUCKET = "rewinduploads";
const REGION = "us-east-1";
const ACCESS_KEY = `${process.env.NEXT_PUBLIC_AWS_ACCESS_KEY}`;
const SECRET_ACCESS_KEY = `${process.env.NEXT_PUBLIC_AWS_SECRET_KEY}`;

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

export const UploadVideoToS3 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col gap-9 animate-fadeIn">
      <input type="file" onChange={handleFileInput} />
      <button
        className="btn btn-ghost btn-outline"
        onClick={() => handleUpload(selectedFile)}
      >
        {" "}
        Upload!{" "}
      </button>
    </div>
  );
};

export default UploadVideoToS3;
