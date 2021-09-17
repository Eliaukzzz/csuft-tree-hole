import React from "react";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { Loading } from "./components/Loading";
import { useLoad } from "./context/Load";
import { useUser } from "./context/UserContext";
import { UnAuthenticatedApp } from "./UnAuthenticatedApp";

function App() {
  // 从LoadProvider中获取isLoading
  const { isLoading } = useLoad();
  // 获取登录用户信息
  const { currentUser } = useUser();
  return (
    <>
      <main className="p-4 bg-gray-50 min-h-screen mx-auto min-w-app-mw">
        {/* loading组件 */}
        {isLoading ? <Loading /> : null}
        {currentUser.isLogin ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </main>
    </>
  );
}

export default App;
