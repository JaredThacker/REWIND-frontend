import React from "react";
import UploadVideoToS3 from "./UploadVideoToS3";
import UploadVideoToS3WithNativeSdk from "./UploadVideoToS3NativeSDK";

export const Upload = () => {
  return (
    <div className="h-full w-full">
      <div className="pt-64 flex flex-col align-middle items-center">
        <UploadVideoToS3WithNativeSdk />
      </div>
    </div>
  );
};
