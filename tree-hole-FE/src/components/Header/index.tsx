import React from "react";
import { NavLink } from "react-router-dom";
import { useShowNav } from "../../context/ShowNav";
export const Header = () => {
  const { showNav, setShowNav } = useShowNav();
  return (
    <div
      className={`${
        showNav ? "h-items lg:h-lg-items" : " h-header"
      } transition-h duration-500 overflow-hidden text-3xl sticky top-0 bg-gary-theme-gary text-white`}
    >
      {/* navbar遮罩 */}
      {showNav ? (
        <div
          onClick={() => {
            setShowNav(false);
          }}
          className="fixed top-0 left-0 bottom-0 right-0"
        />
      ) : null}
      <NavLink
        className="py-6 px-6 border-gary-theme-gary border-b-2 block"
        to={"/"}
      >
        林科大树洞
      </NavLink>
      <div className="overflow-hidden border-b-2 flex justify-center flex-col lg:flex-row items-center transition">
        <NavLink
          onClick={() => {
            setShowNav(false);
          }}
          className="py-2 px-6 border-gary-theme-gary border-b-2 lg:border-b-2 lg:border-r-2 text-base w-full text-center bg-gray-600 hover:bg-green-theme-green transition-colors duration-500"
          to={"/account"}
        >
          个人信息
        </NavLink>
        <a className="py-2 px-6 border-gary-theme-gary border-b-2 lg:border-b-2 lg:border-r-2 text-base w-full text-center bg-gray-600 hover:bg-green-theme-green transition-colors duration-500">
          我的留言
        </a>
        <a className="py-2 px-6 border-gary-theme-gary border-b-2 lg:border-b-2 lg:border-r-2 text-base w-full text-center bg-gray-600 hover:bg-green-theme-green transition-colors duration-500">
          我的收藏
        </a>
        <a className="py-2 px-6 border-gary-theme-gary text-base border-b-2 w-full text-center bg-gray-600 hover:bg-green-theme-green transition-colors duration-500">
          板块分类
        </a>
      </div>
      <div
        id="openNav"
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
