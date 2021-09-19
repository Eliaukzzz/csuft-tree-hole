import React, { FormEvent, useState } from "react";
import { AvatarUploader } from "../AvatarUploader";
import { ValidateInput } from "../ValidateInput";
import { useUser } from "../../../context/UserContext";
export const Register = ({
  setIsLogin,
}: {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // 表单验证是否通过
  const [fromPassStatus, setFromPassStatus] = useState<boolean>(true);
  // 昵称
  const [nickname, setNickname] = useState<string>("");

  // 邮箱
  const [email, setEmail] = useState<string>("");
  // 密码
  const [password, setPassword] = useState<string>("");
  // 重复密码
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  // 处理表单提交
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const email: string = (event.currentTarget.elements[0] as HTMLInputElement)
    //   .value;
    // const password: string = (
    //   event.currentTarget.elements[1] as HTMLInputElement
    // ).value;
  };
  // 拖拽文件
  return (
    <div className="flex flex-col justify-center items-center rounded-xl bg-white shadow-lg p-10">
      <h2 className="text-2xl text-green-theme-green">新用户注册</h2>
      <form onSubmit={handleSubmit}>
        {/* 上传头像 */}
        <div className="flex flex-row items-center px-2 text-gary-theme-gary">
          <label htmlFor="avatar" className="w-1/2">
            请上传头像
          </label>
          <div className="w-1/2">
            <AvatarUploader />
          </div>
        </div>
        {/* 上传昵称 */}
        {/* <ValidateInput
          type="text"
          name="nickname"
          className="border-2 rounded m-2 p-2"
          placeholder="请输入昵称"
          validateType="nickname"
          model={setNickname}
          value={nickname}
          setThisPass={}
          setFromPassStatus={setFromPassStatus}
        /> */}
        {/* 上传邮箱 */}
        {/* <ValidateInput
          type="text"
          name="email"
          className="border-2 rounded m-2 p-2"
          placeholder="请输入邮箱"
          validateType="email"
          model={setEmail}
          value={email}
          setFromPassStatus={setFromPassStatus}
        /> */}
        {/* 上传密码 */}
        {/* <ValidateInput
          type="password"
          name="password"
          className="border-2 rounded m-2 p-2"
          placeholder="请输入密码"
          validateType="password"
          model={setPassword}
          value={password}
          setFromPassStatus={setFromPassStatus}
        /> */}
        {/* <ValidateInput
          type="verify-password"
          name="verify-password"
          className="border-2 rounded m-2 p-2"
          placeholder="请再次输入密码"
          validateType="password"
          model={setVerifyPassword}
          value={verifyPassword}
          setFromPassStatus={setFromPassStatus}
        /> */}
        <div className="grid gap-3 grid-rows-1 grid-cols-2 mt-3">
          <button
            type="submit"
            className="px-4 py-1 bg-green-theme-green rounded border text-white"
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
