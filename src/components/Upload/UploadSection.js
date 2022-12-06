import { useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadSection = ({ onUploadFile }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      onUploadFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: Math.random().toString(),
          })
        )
      );
    },
  });

  return (
    <div
      {...getRootProps({
        className: "w-full p-4 border-dashed border-2 border-slate-900",
      })}
    >
      <input {...getInputProps()} />
      <p>Drag & drop some files here, or click to select files</p>
    </div>
  );
};

export default UploadSection;
