import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useShowNav } from "../../../context/ShowNav";
import { useUser } from "../../../context/UserContext";
import "./index.css";
import { useAnimate } from "./useAnimate";
export const Header = () => {
  // 从ShowNavContext获取控制导航栏是否展开的状态
  const { showNav, setShowNav } = useShowNav();
  // 从UserContext获取当前用户状态
  const { currentUser } = useUser();
  const [animateClass, setAnimateClass] = useState<"start" | "end">("end");
  // 标题动画效果
  useAnimate(animateClass, setAnimateClass);
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
        className="my-6 mx-6 border-gary-theme-gary border-b-2 inline-block"
        to={"/"}
      >
        <div className="flex justify-center items-center h-10">
          <h1>
            <span className="font end">林</span>
            <span className="font end">科</span>
            <span className="font end">大</span>
            <span className="font end">树</span>
            <span className="font end">洞</span>
          </h1>
        </div>
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
        <NavLink
          onClick={() => {
            setShowNav(false);
          }}
          className="py-2 px-6 border-gary-theme-gary border-b-2 lg:border-b-2 lg:border-r-2 text-base w-full text-center bg-gray-600 hover:bg-green-theme-green transition-colors duration-500"
          to={`/comments/${currentUser.id}`}
        >
          我发布的
        </NavLink>
        <NavLink
          onClick={() => {
            setShowNav(false);
          }}
          className="py-2 px-6 border-gary-theme-gary border-b-2 lg:border-b-2 lg:border-r-2 text-base w-full text-center bg-gray-600 hover:bg-green-theme-green transition-colors duration-500"
          to={`/favorites/${currentUser.id}`}
        >
          我喜欢的
        </NavLink>
        <a
          onClick={() => {
            setShowNav(false);
          }}
          className="py-2 px-6 border-gary-theme-gary text-base border-b-2 w-full text-center bg-gray-600 hover:bg-green-theme-green transition-colors duration-500"
        >
          关于树洞
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
