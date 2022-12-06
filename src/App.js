import React, { useState } from "react";
import Upload from "./components/Upload/Upload";
import Sample from "./components/Upload/multiple_sample";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <Upload />
    </div>
  );
};

export default App;
