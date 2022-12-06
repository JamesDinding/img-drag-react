import { Fragment, useState, useEffect } from "react";
import UploadSection from "./UploadSection";
import UploadList from "./UploadList";
import UploadItem from "./UploadItem";
import ReactGridLayout from "react-grid-layout";

const Upload = () => {
  // upload from local
  const [files, setFiles] = useState([]);
  // uploat to DB
  const [saveFiles, setSaveFiles] = useState([]);

  return (
    <Fragment>
      <UploadSection onUploadFile={setFiles} />
      <UploadList
        uploadFiles={files}
        onUploadFile={setFiles}
        saveFiles={saveFiles}
        onSaveFiles={setSaveFiles}
      />
    </Fragment>
  );
};

export default Upload;
