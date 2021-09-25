import React from "react";
import { Route, Switch } from "react-router";
import { Header } from "./components/Header";
import { Account } from "../pages/Account";
import { Home } from "../pages/Home";
import { Comments } from "../pages/Comments";
import { Favorites } from "../pages/Favorites";
// 状态为已经登录的界面
export const AuthenticatedApp = () => {
  return (
    <div>
      <div className="relative mx-auto min-h-main-h bg-white rounded-lg shadow-2xl max-w-screen-md">
        {/* 导航栏 */}
        <Header />
        {/* Routes */}
        <Switch>
          {/* 树洞主页 */}
          <Route path="/" exact component={Home} />
          {/* 用户信息页面 */}
          <Route path="/account/:id" component={Account} />
          {/* 用户发布页面 */}
          <Route path="/comments/:id" component={Comments} />
          {/* 用户喜欢页面 */}
          <Route path="/favorites/:id" component={Favorites} />
        </Switch>
      </div>
    </div>
  );
};
