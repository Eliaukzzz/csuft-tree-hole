import React, { useState } from "react";
import "animate.css";
export const Header = () => {
  const [showNav, setShowNav] = useState<boolean>(false);
  return (
    <div
      className={`${
        showNav ? "h-items lg:h-lg-items" : " h-header"
      } transition-h duration-500 overflow-hidden text-3xl sticky top-0 bg-gary-theme-gary text-white`}
    >
      <h2 className="py-6 px-6 border-b-2">林科大树洞</h2>
      <div className="overflow-hidden border-b-2 flex justify-center flex-col lg:flex-row items-center transition bg-white">
        <a className="py-2 px-6 border-b-2 lg:border-b-2 lg:border-r-2 text-base w-full text-center bg-gary-theme-gary hover:bg-green-theme-green transition-colors duration-500">
          个人信息
        </a>
        <a className="py-2 px-6 border-b-2 lg:border-b-2 lg:border-r-2 text-base w-full text-center bg-gary-theme-gary hover:bg-green-theme-green transition-colors duration-500">
          我的收藏
        </a>
        <a className="py-2 px-6 text-base border-b-2 w-full text-center bg-gary-theme-gary hover:bg-green-theme-green transition-colors duration-500">
          板块分类
        </a>
      </div>
      <div
        onClick={() => {
          setShowNav(!showNav);
        }}
        className="iconfont text-3xl inline-block absolute right-5 top-6"
      >
        &#xe6e5;
      </div>
    </div>
  );
};
