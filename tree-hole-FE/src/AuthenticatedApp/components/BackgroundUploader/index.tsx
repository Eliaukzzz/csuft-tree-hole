import React, { useState } from "react";
import imgURL from "../../../assets/img/default-card.jpg";
export const BackgroundUploader = () => {
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
    <div className="w-card-bg-w-m h-card-bg-w-m mx-auto">
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
        className="w-card-bg-w-m h-card-bg-w-m rounded-full absolute block"
      ></label>
      {img ? (
        <img src={img} className="h-full w-full object-cover" />
      ) : (
        <img src={imgURL} className="h-full w-full object-cover" />
      )}
    </div>
  );
};
