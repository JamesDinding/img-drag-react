import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "../components/Upload/Upload";
import Test from "./Test";
import { Fragment } from "react";
const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Upload />} />
      <Route path="test" element={<Test />} />
      <Route path="test2" element={<Test name={2} />} />
      <Route path="test3" element={<Test name={3} />} />
      <Route path="test4" element={<Test name={4} />} />
      <Route path="test5" element={<Test name={5} />} />
    </Routes>
  );
};

export default AppRoute;
