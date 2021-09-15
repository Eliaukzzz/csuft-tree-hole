import React, { useState } from "react";
import "animate.css";
/**
 * ! header还需要添加菜单
 */
export const Header = () => {
  const [showNav, setShowNav] = useState<boolean>(false);
  return (
    <div
      className={`${
        showNav ? "h-44" : "h-20"
      } transition-h duration-500 overflow-hidden text-3xl relative bg-gary-theme-gary text-white`}
    >
      <h2 className="py-6 px-6 border-b-2">林科大树洞</h2>
      <div className="flex justify-center flex-col items-center transition">
        <a className="py-2 px-6 min-w-full text-base border-b-2 text-center">
          个人信息
        </a>
        <a className="py-2 px-6 min-w-full text-base border-b-2 text-center">
          个人信息
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
