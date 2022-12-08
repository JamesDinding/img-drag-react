import { useState } from "react";
import { Router } from "react-router-dom";
import Upload from "../components/Upload/Upload";

const UploadPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <Upload />
    </div>
  );
};

export default UploadPage;
