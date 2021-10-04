import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserProps, useUser } from "../../context/UserContext";

export const Account = () => {
  // 获取当前登录的用户信息
  const { currentUser, logout } = useUser();
  // 接收对应的用户id
  const { id }: { id: string } = useParams();
  // 获取对应用户信息
  const [pageUser, setPageUser] = useState<UserProps>({});
  // 挂载该页面的时候获得对应的用户信息
  useEffect(() => {
    if (currentUser._id === id) {
      // 如果是当前登录用户自己的信息页面
      setPageUser(currentUser);
    }
    //  else {
    //   // 如果是其他用户的信息页面
    //   // 使用getUserInfo获取对应用户id的信息
    //   getUserInfo(+id).then((result) => {
    //     setPageUser(result);
    //   });
    // }
  }, []);
  return (
    <div className="flex items-center flex-col pt-10 min-w-account-mw">
      <table className="grid grid-cols-1 w-2/3 max-w-md auto-rows-auto">
        <tbody>
          <tr className="grid grid-cols-2 items-center border-b-2 py-3 px-3">
            <td>昵称</td>
            <td className="text-right">{pageUser.nickname}</td>
          </tr>
          <tr className="grid grid-cols-2 items-center border-b-2 py-3 px-3">
            <td>id</td>
            <td className="text-right">{pageUser._id}</td>
          </tr>
          <tr className="grid grid-cols-2 items-center border-b-2 py-3 px-3">
            <td>邮箱</td>
            <td className="text-right">{pageUser.email}</td>
          </tr>
          <tr className="grid grid-cols-2 items-center border-b-2 py-3 px-3">
            <td>性别</td>
            <td className="text-right">{pageUser.gender}</td>
          </tr>
        </tbody>
      </table>
      {currentUser._id === id ? (
        <button
          onClick={logout}
          className="px-4 py-1 my-11 w-30 bg-green-theme-green rounded text-white"
        >
          退出登录
        </button>
      ) : null}
    </div>
  );
};
