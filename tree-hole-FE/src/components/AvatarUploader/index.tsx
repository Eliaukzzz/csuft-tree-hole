import React, { useState } from "react";

export const AvatarUploader = () => {
  const [img, setImg] = useState<string>("");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    var reader = new FileReader();
    reader.onload = () => {
      // console.log(reader.result);
      setImg(reader.result as string);
    };
    // @ts-ignore
    reader.readAsDataURL(e.target.files[0] as Blob);
  };
  return (
    <div className="border-2 relative w-14 h-14 my-2 inline-block float-right rounded-full hover:border-green-theme-green">
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={(event) => {
          handleImageChange(event);
        }}
      />
      <label
        htmlFor="avatar"
        className="h-full w-full rounded-full absolute block"
      ></label>
      {img ? (
        <div
          className="w-full h-full bg-cover rounded-full"
          style={{
            backgroundImage: `url(${img})`,
          }}
        ></div>
      ) : (
        <div
          className="w-full h-full bg-cover rounded-full"
          style={{
            backgroundImage: `url(https://z3.ax1x.com/2021/09/18/41Grw9.png)`,
          }}
        ></div>
      )}
    </div>
  );
};
