import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLoad } from "./Load";
// 用户信息接口
export interface UserProps {
  isLogin?: boolean;
  _id?: string;
  nickname?: string;
  gender?: string;
  email?: string;
  likes?: string[];
  disLikes?: string[];
  token?: string;
}

// UserContext定义
const UserContext = createContext<
  | {
      // 当前用户
      currentUser: UserProps;
      // 修改当前用户
      setCurrentUser: (user: UserProps) => void;
      // 注册
      register: (data: {
        nickname: string;
        gender: string;
        email: string;
        password: string;
      }) => Promise<UserProps>;
      // 登录
      login: (data: { email: string; password: string }) => Promise<UserProps>;
      // 获取指定id的用户信息
      // getUserInfo: (id: number) => Promise<UserProps>;
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
    return fetch(`/api/user/login`, {
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
        const user = data as UserProps;
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
  // 刷新时 保存登录状态 jwttoken
  const bootstrapUser = () => {
    // 开始获取信息时Loading设为true
    setIsLoading(true);
    // 拿出token
    const token = localStorage.getItem("__CSUFTTreeHoleToken__");
    if (!token) {
      setIsLoading(false);
      return Promise.reject("本地没有token");
    }
    return fetch(`/api/user/me`, {
      method: "GET",
      headers: {
        // 如果有token 携带token
        Authorization: token,
      },
    }).then(async (response) => {
      if (response.ok) {
        // 请求成功时
        const data = await response.json();
        setIsLoading(false); // loading状态设为false
        const user = data as UserProps;
        // 把token 储存在localStorage的__CSUFTTreeHoleToken__中
        localStorage.setItem("__CSUFTTreeHoleToken__", user.token as string);
        // 返回携带用户数据的Promise
        return Promise.resolve(user);
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
  // 注册
  const register = (data: {
    nickname: string;
    gender: string;
    email: string;
    password: string;
  }) => {
    // 登录的第一时间先将loading状态设置为true
    setIsLoading(true);
    return fetch(`/api/user/register`, {
      method: "POST",
      headers: {
        // body类型为json
        "Content-Type": "application/json",
      },
      // body为昵称性别邮箱密码组成的对象
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (response.ok) {
        // 请求成功时
        const data = await response.json();
        setIsLoading(false); // loading状态设为false
        const user = data as UserProps;
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
  useEffect(() => {
    bootstrapUser()
      .then((user) => {
        setCurrentUser({ ...user, isLogin: true });
      })
      .catch((err) => {});
  }, []);
  return (
    <UserContext.Provider
      children={children}
      value={{
        currentUser,
        setCurrentUser,
        register,
        login,
        logout,
      }}
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
