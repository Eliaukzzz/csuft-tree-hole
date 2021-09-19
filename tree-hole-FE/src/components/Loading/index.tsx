import React from "react";
import "./index.css";

export const Loading = () => {
  return (
    <div className="flex z-50 flex-col justify-center items-center fixed top-0 left-0 bottom-0 right-0 bg-white bg-opacity-80">
      <div className="spinner"></div>
      <h2 className="text-green-theme-green text-3xl">Loading......</h2>
    </div>
  );
};
