import React from "react";

const Modal = ({ isOpen, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{ zIndex: 1001 }}
      className="fixed inset-0 Geist p-6 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="rounded-lg bg-white p-6 shadow-lg w-full md:w-96">
        <h2 className="text-lg font-medium">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
