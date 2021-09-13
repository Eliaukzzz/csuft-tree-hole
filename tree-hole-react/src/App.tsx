import React from "react";

function App() {
  return (
    <div className="App">
      <main className="p-4 bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl my-6">林科大树洞</h2>
          <form action="" className="grid">
            <textarea
              name="comment"
              id=""
              placeholder="在树洞里宣泄你的情感，留下你的吐槽吧"
              className="bg-gray-50 p-2 rounded"
            ></textarea>
            <fieldset className="py-4">
              <input
                type="submit"
                className="px-4 py-1 bg-blue-500 rounded text-white"
                value="发布"
              />
              <input
                type="submit"
                className="px-4 py-1 bg-white rounded border ml-3"
                value="取消"
              />
            </fieldset>
          </form>
          <div className="border-b border-gray-300 my-2 mb-4"></div>
          <div>
            <div className="flex">
              <img
                src="https://z3.ax1x.com/2021/09/05/hRZzi4.jpg"
                alt=""
                className="w-12 h-12 mr-4 rounded-full"
              />
              <div>
                <p>苍术</p>
                <p className="text-gray-600 text-sm">9天前</p>
              </div>
              <span className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
              </span>
            </div>
            <p className="text-gray-600 py-4">啊我是猪</p>
            <div className="pl-8 border-l-2 border-gray-200">
              <div className="flex">
                <img
                  src="https://z3.ax1x.com/2021/09/05/hReKSA.jpg"
                  alt=""
                  className="w-12 h-12 mr-4 rounded-full"
                />
                <div>
                  <p>若谷</p>
                  <p className="text-gray-600 text-sm">9天前</p>
                </div>
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </span>
              </div>
              <p className="text-gray-600 py-4">你真是个铸币</p>
              <div className="flex">
                <img
                  src="https://z3.ax1x.com/2021/09/05/hReDmV.jpg"
                  alt=""
                  className="w-12 h-12 mr-4 rounded-full"
                />
                <div>
                  <p>poise</p>
                  <p className="text-gray-600 text-sm">9天前</p>
                </div>
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </span>
              </div>
              <p className="text-gray-600 py-4">涛宝，yyds</p>
            </div>
            <button className="pt-4 text-blue-600 pb-10"> 回复 </button>
          </div>
          <div>
            <div className="flex">
              <img
                src="https://z3.ax1x.com/2021/09/05/hRenWd.jpg"
                alt=""
                className="w-12 h-12 mr-4 rounded-full"
              />
              <div>
                <p>恶魔小丑</p>
                <p className="text-gray-600 text-sm">9天前</p>
              </div>
              <span className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
              </span>
            </div>
            <p className="text-gray-600 py-4">来次魔术戏法，怎么样？</p>
            <div className="pl-8 border-l-2 border-gray-200"></div>
            <button className="pt-4 text-blue-600 pb-10"> 回复 </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
