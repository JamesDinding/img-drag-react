import React, { useState } from "react";
import AppRoute from "./pages/AppRouter";
import { Link, BrowserRouter } from "react-router-dom";
import { RouterLink, RouterView } from "vue-router";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <ul className="flex flex-col px-4 py-2 cursor-pointer">
          <Link to="/">upload</Link>
          <Link to="test">test1</Link>
          <Link to="test2">test2</Link>
          <Link to="test3">test3</Link>
          <Link to="test4">test4</Link>
          <Link to="test5">test5</Link>
        </ul>
      </div>
      <AppRoute />
    </BrowserRouter>
  );
};

export default App;
