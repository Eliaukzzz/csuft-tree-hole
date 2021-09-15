import React from "react";
import "./index.css";

export const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center fixed top-0 left-0 bottom-0 right-0 bg-gary-theme-gary bg-opacity-80">
      <h2 className="text-white text-3xl">Loading......</h2>
      <div className="spinner"></div>
    </div>
  );
};
