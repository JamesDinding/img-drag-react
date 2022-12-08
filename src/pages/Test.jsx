import { useState } from "react";

const Test = ({ name = 1 }) => {
  return <div className="p-5 bg-amber-200">test {name}</div>;
};

export default Test;
