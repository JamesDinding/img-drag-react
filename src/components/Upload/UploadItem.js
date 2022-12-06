import { useState } from "react";

const UploadItem = ({ file }) => {
  return (
    <div
      className="flex flex-col items-center w-20 h-[400px] m-2 mt-5"
      key={file.name + Math.random()}
    >
      <div className="flex overflow-hidden min-w-[0px]">
        <img src={file.preview} className="block w-auto h-full" alt="" />
      </div>
      <div>{file.name}</div>
    </div>
  );
};

export default UploadItem;
