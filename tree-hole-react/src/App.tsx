import React from "react";
import { Route, Switch } from "react-router";
import { Header } from "./components/Header";
import { Loading } from "./components/Loading";
import { useLoad } from "./context/Load";
import { useShowNav } from "./context/ShowNav";
import { Account } from "./pages/Account";
import { Home } from "./pages/Home";

function App() {
  // 从LoadProvider中获取isLoading
  const { isLoading } = useLoad();
  return (
    <div className="App">
      {/* loading组件 */}
      {isLoading ? <Loading /> : null}
      <main className="p-4 bg-gray-50 min-h-screen mx-auto min-w-app-mw">
        <div className="relative max-w-screen-xl mx-auto min-h-main-h bg-white rounded-lg shadow-2xl">
          {/* 导航栏 */}
          <Header />
          {/* Routes */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/account/" component={Account} />
            <Route path="/account/:id" component={Account} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default App;
