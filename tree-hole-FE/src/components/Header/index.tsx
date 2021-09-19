import React from "react";
import { NavLink } from "react-router-dom";
import { useShowNav } from "../../context/ShowNav";
import { useUser } from "../../context/UserContext";
export const Header = () => {
  // 从ShowNavContext获取控制导航栏是否展开的状态
  const { showNav, setShowNav } = useShowNav();
  // 从UserContext获取当前用户状态
  const { currentUser } = useUser();
  return (
    <div
      // 动态className实现展开导航栏
      className={`${
        showNav ? "h-items lg:h-lg-items" : " h-header"
      } transition-h duration-500 overflow-hidden text-3xl sticky top-0 bg-gary-theme-gary text-white`}
    >
      <NavLink
        onClick={() => {
          setShowNav(false);
        }}
        className="py-6 px-6 border-gary-theme-gary border-b-2 block"
        to={"/"}
      >
        林科大树洞
      </NavLink>
      {/* 折叠导航栏 */}
      <div className="overflow-hidden border-b-2 flex justify-center flex-col lg:flex-row items-center transition z-50">
        <NavLink
          onClick={() => {
            setShowNav(false);
          }}
          className="py-2 px-6 border-gary-theme-gary border-b-2 lg:border-b-2 lg:border-r-2 text-base w-full text-center bg-gray-600 hover:bg-green-theme-green transition-colors duration-500"
          to={`/account/${currentUser.id}`}
        >
          个人信息
        </NavLink>
        <a
          onClick={() => {
            setShowNav(false);
          }}
          className="py-2 px-6 border-gary-theme-gary border-b-2 lg:border-b-2 lg:border-r-2 text-base w-full text-center bg-gray-600 hover:bg-green-theme-green transition-colors duration-500"
        >
          我发布的
        </a>
        <a
          onClick={() => {
            setShowNav(false);
          }}
          className="py-2 px-6 border-gary-theme-gary border-b-2 lg:border-b-2 lg:border-r-2 text-base w-full text-center bg-gray-600 hover:bg-green-theme-green transition-colors duration-500"
        >
          我的收藏
        </a>
        <a
          onClick={() => {
            setShowNav(false);
          }}
          className="py-2 px-6 border-gary-theme-gary text-base border-b-2 w-full text-center bg-gray-600 hover:bg-green-theme-green transition-colors duration-500"
        >
          板块分类
        </a>
      </div>
      <button
        id="openNav"
        onClick={() => {
          setShowNav(!showNav);
        }}
        className="iconfont text-3xl inline-block absolute right-5 top-6"
      >
        &#xe6e5;
      </button>
    </div>
  );
};
