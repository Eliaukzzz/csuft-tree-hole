import React, { createContext, ReactNode, useContext, useState } from "react";
import { apiUrl } from "../utils/apiUrl";
import { useLoad } from "./Load";

// 用户信息接口
export interface UserProps {
  isLogin?: boolean;
  id?: number;
  nickname?: string;
  email?: string;
  favorite?: number[];
  hate?: number[];
  gender?: string;
  token?: string;
}

// UserContext定义
const UserContext = createContext<
  | {
      // todo register: () => void; 注册
      // 当前用户
      currentUser: UserProps;
      // 修改当前用户
      setCurrentUser: (user: UserProps) => void;
      // 登录
      login: (data: { email: string; password: string }) => Promise<UserProps>;
      // 获取指定id的用户信息
      getUserInfo: (id: number) => Promise<UserProps>;
      logout: () => void;
    }
  | undefined
>(undefined);

// UserContext别名
UserContext.displayName = "UserContext";

// UserContextProvider
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  // 当前用户状态，默认未登录
  const [currentUser, setCurrentUser] = useState<UserProps>({ isLogin: false });
  // 引入修改加载状态的方法，判断当前是否在ajax请求
  const { setIsLoading } = useLoad();
  // 登录
  const login = (data: { email: string; password: string }) => {
    // 登录的第一时间先将loading状态设置为true
    setIsLoading(true);
    return fetch(`${apiUrl}users`, {
      method: "POST",
      headers: {
        // body类型为json
        "Content-Type": "application/json",
      },
      // body为邮箱和密码组成的对象
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (response.ok) {
        // 请求成功时
        const data = await response.json();
        setIsLoading(false); // loading状态设为false
        const user = data.users as UserProps;
        // 把token 储存在localStorage的__CSUFTTreeHoleToken__中
        localStorage.setItem("__CSUFTTreeHoleToken__", user.token as string);
        // 返回携带用户数据的Promise
        return Promise.resolve(user);
      } else {
        // 请求失败时，loading状态设为false
        setIsLoading(false);
        // 返回携带错误信息的Promise
        return Promise.reject(await response.json());
      }
    });
  };
  // 获取指定用户信息
  const getUserInfo = (id: number) => {
    // 开始获取信息时Loading设为true
    setIsLoading(true);
    return fetch(`${apiUrl}users/?id=${id}`).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        // 获取到信息时 Loading设为false
        setIsLoading(false);
        const pageUser = data[0] as UserProps;
        return Promise.resolve(pageUser);
      } else {
        // 获取失败时，loading设为false
        setIsLoading(false);
        return Promise.reject();
      }
    });
  };
  // 登出
  const logout = () => {
    // 把token清除
    localStorage.removeItem("__CSUFTTreeHoleToken__");
    // 将登录用户清空，登录状态设置为false
    setCurrentUser({ isLogin: false });
  };
  return (
    <UserContext.Provider
      children={children}
      value={{ currentUser, setCurrentUser, login, getUserInfo, logout }}
    />
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser必须在UserContextProvider中使用");
  }
  return context;
};
