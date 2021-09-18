import React, { FormEvent } from "react";
import { AvatarUploader } from "../components/AvatarUploader";
import { useUser } from "../context/UserContext";
export const Register = ({
  setIsLogin,
}: {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
        <div>
          <input
            type="text"
            name="nickname"
            className="border-2 rounded m-2 p-2"
            placeholder="请输入昵称"
          />
        </div>
        {/* 上传邮箱 */}
        <div>
          <input
            type="text"
            name="email"
            className="border-2 rounded m-2 p-2"
            placeholder="请输入邮箱"
          />
        </div>
        {/* 上传密码 */}
        <div>
          <input
            type="password"
            name="password"
            className="border-2 rounded m-2 p-2"
            placeholder="请输入密码"
          />
        </div>
        <div>
          <input
            type="password"
            name="verify-password"
            className="border-2 rounded m-2 p-2"
            placeholder="请再次输入密码"
          />
        </div>
        <div className="grid gap-3 grid-rows-1 grid-cols-2">
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
