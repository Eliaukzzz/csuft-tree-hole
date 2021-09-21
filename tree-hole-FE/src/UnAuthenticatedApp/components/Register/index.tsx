import React, { FormEvent, useEffect, useState } from "react";
import { AvatarUploader } from "../AvatarUploader";
import { ValidateInput } from "../ValidateInput";
import { useUser } from "../../../context/UserContext";
export const Register = ({
  setIsLogin,
}: {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // 判断表单总体是否验证通过
  const [fromPassStatus, setFromPassStatus] = useState<boolean>(false);

  // 错误信息
  const [errMessage, setErrMessage] = useState<string>("");

  //  判断表单是否第一次渲染
  const [isInit, setIsInit] = useState<boolean>(true);

  // 昵称 和 判断昵称通过属性
  const [nickname, setNickname] = useState<string>("");
  const [nicknamePass, setNicknamePass] = useState<boolean>(false);

  // 邮箱 和 判断邮箱通过属性
  const [email, setEmail] = useState<string>("");
  const [emailPass, setEmailPass] = useState<boolean>(false);

  // 密码 和 判断密码通过属性
  const [password, setPassword] = useState<string>("");
  const [passwordPass, setPasswordPass] = useState<boolean>(false);

  // 重复密码 和 判断重复密码通过属性
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [verifyPasswordPass, setVerifyPasswordPass] = useState<boolean>(false);

  // 判断重复密码是否通过属性
  const [verifyPass, setVerifyPass] = useState<boolean>(false);

  // 判断重复密码验证是否通过
  useEffect(() => {
    if (passwordPass && verifyPasswordPass && password === verifyPassword) {
      setVerifyPass(true);
      setErrMessage("");
    } else if (verifyPassword === "") {
      setErrMessage("");
    } else {
      setVerifyPass(false);
      setErrMessage("重复密码不通过");
    }
  }, [passwordPass, verifyPasswordPass]);

  // 判断表单总体是否通过
  useEffect(() => {
    if (isInit) {
      // 表单初次加载时把初次加载设为false
      // 表单不是初次加载时再开始显示错误信息
      setIsInit(false);
    } else if (
      emailPass &&
      passwordPass &&
      nicknamePass &&
      verifyPasswordPass &&
      verifyPass
    ) {
      // email和password都通过时
      setFromPassStatus(true);
      setErrMessage("");
    } else {
      // 有表单项未通过
      setFromPassStatus(false);
    }
  }, [emailPass, passwordPass, nicknamePass, verifyPasswordPass, verifyPass]);

  // 处理表单提交
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  // 拖拽文件
  return (
    <div className="flex flex-col justify-center items-center rounded-xl bg-white shadow-lg p-10">
      <h2 className="text-2xl text-green-theme-green">新用户注册</h2>
      <form onSubmit={handleSubmit}>
        {/* 上传头像 */}
        <div className="flex flex-row items-center px-2 text-gary-theme-gary">
          <label htmlFor="avatar" className="w-1/2 pl-3">
            请上传头像
          </label>
          <div className="w-1/2">
            <AvatarUploader />
          </div>
        </div>
        {/* 上传昵称 */}
        <ValidateInput
          type="text"
          name="nickname"
          className="border-2 rounded m-2 p-2"
          placeholder="请输入昵称"
          validateType="nickname"
          value={nickname}
          thisPass={nicknamePass}
          model={setNickname}
          setThisPass={setNicknamePass}
        />
        {/* 上传邮箱 */}
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
        {/* 上传密码 */}
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
        {/* 重复输入密码 */}
        <ValidateInput
          type="password"
          name="verify-password"
          className="border-2 rounded m-2 p-2"
          placeholder="请再次输入密码"
          validateType="password"
          value={verifyPassword}
          thisPass={verifyPasswordPass}
          model={setVerifyPassword}
          setThisPass={setVerifyPasswordPass}
        />
        <div className="flex items-center h-8 pl-3 text-red-600">
          <p>{errMessage}</p>
        </div>
        <div className="grid gap-3 grid-rows-1 grid-cols-2 mt-3">
          <button
            type="submit"
            disabled={!fromPassStatus}
            className="px-4 py-1 bg-green-theme-green rounded border text-white disabled:opacity-50"
          >
            注册
          </button>
          <button
            onClick={() => setIsLogin(true)}
            type="reset"
            className="px-4 py-1 bg-white rounded border"
          >
            返回登录
          </button>
        </div>
      </form>
    </div>
  );
};
