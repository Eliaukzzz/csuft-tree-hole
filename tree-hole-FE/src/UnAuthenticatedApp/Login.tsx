import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router";
import { useUser } from "../context/UserContext";
export const Login = ({
  setIsLogin,
}: {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // useHistory 允许访问可能用于导航的历史实例
  const history = useHistory();
  const [errMessage, setErrMessage] = useState<string>("");
  // 获取登录的函数
  const { login, setCurrentUser } = useUser();
  // 处理表单提交
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // 阻止默认行为
    event.preventDefault();
    // 获取邮箱
    const email: string = (
      event.currentTarget.elements[0] as HTMLInputElement
    ).value.trim();
    // 获取密码
    const password: string = (
      event.currentTarget.elements[1] as HTMLInputElement
    ).value.trim();
    // 登录后获取返回的用户信息 设置当前用户
    login({ email, password })
      .then((user) => {
        // 设置当前登录的用户
        setCurrentUser({ ...user, isLogin: true });
        // 跳转到主页面
        history.push("/");
      })
      .catch((err) => setErrMessage(err.message)); // 如果请求失败 报错
  };
  return (
    <div className="flex flex-col justify-center items-center rounded-xl bg-white shadow-lg p-10">
      <h2 className="text-3xl text-green-theme-green pb-3">林科大树洞</h2>
      <h2 className="text-2xl text-green-theme-green">用户登录</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            className="border-2 rounded m-2 p-2"
            placeholder="请输入邮箱"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            className="border-2 rounded m-2 p-2"
            placeholder="请输入密码"
          />
        </div>
        <div className="flex items-center h-8 pl-3 text-red-600">
          <p>{errMessage}</p>
        </div>
        <div className="grid gap-3 grid-rows-1 grid-cols-2">
          <button
            type="submit"
            className="px-4 py-1 bg-green-theme-green rounded border text-white"
          >
            登录
          </button>
          <input
            onClick={() => setIsLogin(false)}
            type="reset"
            value="注册"
            className="px-4 py-1 bg-white rounded border"
          />
        </div>
      </form>
    </div>
  );
};
