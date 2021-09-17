import React, { FormEvent } from "react";
import { useUser } from "../context/UserContext";

// 未登录时显示的界面
export const UnAuthenticatedApp = () => {
  const { login, setCurrentUser } = useUser();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email: string = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password: string = (
      event.currentTarget.elements[1] as HTMLInputElement
    ).value;
    login({ email, password }).then((user) => {
      setCurrentUser({ ...user, isLogin: true });
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">邮箱</label>
        <input type="text" name="email" className="border-2" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" name="password" className="border-2" />
      </div>
      <p>
        <button
          type="submit"
          className="px-4 py-1 bg-green-theme-green rounded text-white"
        >
          登录
        </button>
        <input
          type="reset"
          value="注册"
          className="px-4 py-1 bg-white rounded border ml-3"
        />
      </p>
    </form>
  );
};
