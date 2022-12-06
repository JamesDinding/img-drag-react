import { useState } from "react";

const Backdrop = ({ onClose }) => {
  return (
    <div
      className="fixed w-full h-full bg-[rgba(0,0,0,.4)]"
      onClick={onClose}
    ></div>
  );
};

export default Backdrop;
