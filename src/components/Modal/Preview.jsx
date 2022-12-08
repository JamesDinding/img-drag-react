import { Fragment, useState } from "react";

const Preview = ({
  file,
  fileList,
  onClose,
  onPreview,
  previewIndex,
  onPreviewIndex,
}) => {
  return (
    <Fragment>
      <button
        className="absolute right-20 top-1/2 tranlsate-y-[-50%] text-center text-white border-solid border-2 w-10 h-10 leading-[2.25rem] rounded-full"
        onClick={() => {
          if (previewIndex === fileList.length - 1) return;
          onPreview(fileList[previewIndex + 1]);
          onPreviewIndex((prev) => prev + 1);
        }}
      >
        &rarr;
      </button>
      <button
        className="absolute left-20 top-1/2 tranlsate-y-[-50%] text-center text-white border-solid border-2 w-10 h-10 leading-[2.25rem] rounded-full"
        onClick={() => {
          if (previewIndex === 0) return;
          onPreview(fileList[previewIndex - 1]);
          console.log("previewIndex", previewIndex, "fileList", fileList);
          onPreviewIndex((prev) => prev - 1);
        }}
      >
        &larr;
      </button>
      <div className="absolute top-4 left-1/2 translate-x-[-50%] w-1/2 h-full">
        <div className="text-center text-white mb-1">{file.name}</div>
        <div className="max-h-[90%] w-full overflow-y-auto">
          <img src={file?.preview} alt="file.preview" />
        </div>
      </div>
    </Fragment>
  );
};

export default Preview;
