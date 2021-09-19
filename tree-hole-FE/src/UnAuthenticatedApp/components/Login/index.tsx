import React, { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ValidateInput } from "../ValidateInput";
import { useUser } from "../../../context/UserContext";
export const Login = ({
  setIsLogin,
}: {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // useHistory 允许访问可能用于导航的历史实例
  const history = useHistory();

  // 判断表单是否第一次渲染
  const [isInit, setIsInit] = useState<boolean>(true);

  // 表单总体验证是否通过
  const [fromPassStatus, setFromPassStatus] = useState<boolean>(false);

  // 错误信息
  const [errMessage, setErrMessage] = useState<string>("");

  // 邮箱 和 判断邮箱通过属性
  const [email, setEmail] = useState<string>("");
  const [emailPass, setEmailPass] = useState<boolean>(false);

  // 密码 和 判断密码通过属性
  const [password, setPassword] = useState<string>("");
  const [passwordPass, setPasswordPass] = useState<boolean>(false);

  // 监听邮箱密码pass变化，当邮箱或密码未能通过时总体表单不能通过
  useEffect(() => {
    if (isInit) {
      // 表单初次加载时把初次加载设为false
      // 表单不是初次加载时再开始显示错误信息
      setIsInit(false);
    } else if (emailPass && passwordPass) {
      // email和password都通过时
      setFromPassStatus(true);
      setErrMessage("");
    } else {
      // 有表单项未通过
      setFromPassStatus(false);
    }
  }, [emailPass, passwordPass]);

  // 获取登录的函数
  const { login, setCurrentUser } = useUser();
  // 处理表单提交
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // 阻止默认行为
    event.preventDefault();
    // 如果表单验证不通过
    if (!fromPassStatus) {
      setErrMessage("输入信息格式有误");
      return;
    }
    // 登录后获取返回的用户信息 设置当前用户
    login({ email: email.trim(), password: password.trim() })
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
        <ValidateInput
          type="text"
          name="email"
          className="border-2 rounded m-2 p-2"
          placeholder="请输入邮箱"
          validateType="email"
          value={email}
          thisPass={emailPass}
          model={setEmail}
          setThisPass={setEmailPass}
        />
        <ValidateInput
          type="password"
          name="password"
          className="border-2 rounded m-2 p-2"
          placeholder="请输入密码"
          validateType="password"
          value={password}
          thisPass={passwordPass}
          model={setPassword}
          setThisPass={setPasswordPass}
        />
        <div className="flex items-center h-8 pl-3 text-red-600">
          <p>{errMessage}</p>
        </div>
        <div className="grid gap-3 grid-rows-1 grid-cols-2">
          <button
            type="submit"
            disabled={!fromPassStatus}
            className="px-4 py-1 bg-green-theme-green rounded border text-white disabled:opacity-50"
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
