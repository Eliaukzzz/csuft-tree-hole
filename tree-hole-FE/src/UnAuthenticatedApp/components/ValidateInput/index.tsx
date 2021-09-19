import React, { useEffect, useState } from "react";

export const ValidateInput = ({
  type,
  name,
  className = "border-2 rounded m-2 p-2",
  placeholder,
  validateType,
  value,
  thisPass,
  setThisPass,
  model,
}: {
  type: string;
  name: string;
  className: string;
  placeholder?: string;
  validateType: "email" | "password" | "nickname";
  value: string;
  thisPass: boolean;
  setThisPass: React.Dispatch<React.SetStateAction<boolean>>;
  model: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // 错误信息
  const [message, setMessage] = useState<string>("");
  const validate = (value: string) => {
    switch (validateType) {
      case "email":
        if (emailReg.test(value)) {
          setThisPass(true);
          setMessage("邮箱格式正确");
        } else if (value === "") {
          setMessage("");
        } else {
          setThisPass(false);
          setMessage("请输入正确的邮箱链接");
        }
        return;
      case "password":
        if (passwordReg.test(value)) {
          setThisPass(true);
          setMessage("密码格式正确");
        } else if (value === "") {
          setMessage("");
        } else {
          setThisPass(false);
          setMessage("密码长度过短");
        }
        return;
      default:
        setThisPass(false);
        return;
    }
  };
  // 当表单项里面值改变了 就验证值是否符合对应的规矩
  useEffect(() => {
    validate(value);
  }, [value]);
  return (
    <div>
      <input
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          model(event.target.value);
        }}
      />
      <div
        className={`flex items-center pl-3 h-6 ${
          thisPass ? "text-green-theme-green" : "text-red-500"
        }`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

const emailReg =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordReg = /.{6,}/;
