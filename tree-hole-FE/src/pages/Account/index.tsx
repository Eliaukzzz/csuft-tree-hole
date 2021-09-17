import React from "react";

export const Account = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col pt-10 min-w-account-mw">
      <table className="grid grid-cols-1 w-2/3 auto-rows-auto">
        <tr className="grid grid-cols-2 items-center border-b-2 py-3 px-3">
          <td>头像</td>
          <td>
            <img
              className="w-12 h-12 rounded-full float-right"
              src="https://z3.ax1x.com/2021/09/05/hReKSA.jpg"
              alt=""
            />
          </td>
        </tr>
        <tr className="grid grid-cols-2 items-center border-b-2 py-3 px-3">
          <td>昵称</td> <td className="text-right">这里不卖八宝粥</td>
        </tr>
        <tr className="grid grid-cols-2 items-center border-b-2 py-3 px-3">
          <td>id</td> <td className="text-right">1</td>
        </tr>
        <tr className="grid grid-cols-2 items-center border-b-2 py-3 px-3">
          <td>性别</td> <td className="text-right">男</td>
        </tr>
      </table>
      <button className="px-4 py-1 my-11 w-30 bg-green-theme-green rounded text-white">
        退出登录
      </button>
    </div>
  );
};
