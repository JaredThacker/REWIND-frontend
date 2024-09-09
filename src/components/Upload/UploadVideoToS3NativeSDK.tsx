"use client";

import React, { useState } from "react";
import AWS from "aws-sdk";
import { LinearProgress, TextField } from "@mui/material";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  if (({ progress } as any as number) === 100) {
    router.push("upload/watch");
  }

  return (
    <div className="flex flex-col gap-9">
      <form className="flex flex-col gap-4">
        {/* <TextField variant="filled" label="Title" color="secondary" />
        <TextField
          variant="filled"
          label="Description"
          color="secondary"
          multiline
        /> */}
      </form>
      <input className="" type="file" onChange={handleFileInput} />
      <div>
        {/* <progress
          className="flex grow justify-center"
          value={progress}
          max={100}
        >
          {progress}
        </progress> */}
        <LinearProgress
          variant="determinate"
          value={progress}
          color="secondary"
        />
      </div>
      <button
        className="btn btn-ghost"
        onClick={() => uploadFile(selectedFile)}
      >
        {" "}
        Upload
      </button>
      <button
        className="btn btn-ghost"
        onClick={() => router.push("/upload/w")}
      >
        Watch Video
      </button>
    </div>
  );
};

export default UploadVideoToS3WithNativeSdk;
