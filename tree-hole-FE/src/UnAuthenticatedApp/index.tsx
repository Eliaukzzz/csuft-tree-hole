import React, { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

// 未登录时显示的界面
export const UnAuthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <div className="fixed top-4 left-4 right-4 bottom-4">
      <div className="flex flex-col h-full justify-center items-center bg-bg">
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Register setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
};
