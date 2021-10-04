import React, { useEffect } from "react";
import { CommentProp } from "../../../context/CommentsListContext";
import { useBanScroll, useCancelBanScroll } from "../../../utils/useScroll";
import { BackgroundUploader } from "../BackgroundUploader";
import html2canvas from "html2canvas";

export const CaptureItem = ({
  comment,
  setOnCapture,
}: {
  comment: CommentProp;
  setOnCapture: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const saveAs = (blob: string, fileName: string) => {
    let elem = window.document.createElement("a");
    elem.href = blob;
    elem.download = fileName;
    elem.style.display = "none";
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === "function") {
      elem.click();
    } else {
      elem.target = "_blank";
      elem.dispatchEvent(
        new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
    }
    URL.revokeObjectURL(elem.href);
    elem.remove();
  };

  const exportAsPicture = () => {
    let data = document.getElementById("card") as HTMLElement;
    html2canvas(data, {
      scale: 4,
    }).then((canvas) => {
      let image = canvas.toDataURL("image/png", 1.0);
      let fileName = `comment-card-${comment._id}`;
      saveAs(image, fileName);
    });
  };

  // 组件挂载时阻止滚动
  useEffect(() => {
    useBanScroll();
    return () => {
      useCancelBanScroll();
    };
  }, []);
  return (
    <div className="z-50 flex justify-center items-center flex-col py-10 px-10 fixed top-0 left-0 bottom-0 right-0 bg-bg">
      <button
        onClick={() => {
          setOnCapture(false);
        }}
        className="iconfont absolute text-gary-theme-gary top-3 left-3 text-2xl"
      >
        &#xe667;
      </button>
      <button
        onClick={exportAsPicture}
        className="iconfont absolute bottom-3 right-3 text-gary-theme-gary text-2xl"
      >
        &#xe66c;
      </button>
      <p className="bg-white text-green-theme-green shadow-2xl absolute top-6 py-2 px-4 rounded-xl">
        点击图片以切换背景图片
      </p>

      <div
        id="card"
        className="bg-white min-w-app-mw min-h-card-mh pt-3 shadow-2xl"
      >
        <BackgroundUploader />
        <div className="w-card-bg-w-m pt-3 relative min-h-app-mh mx-auto">
          <p className="text-lg w-full overflow-hidden pb-4">
            {comment.content}
          </p>
          <p className="absolute bottom-0 right-0 pb-2 pr-2">
            ——{comment.posterInfo.nickname}
          </p>
        </div>
      </div>
    </div>
  );
};
