import html2canvas from "html2canvas";

const saveAs = (blob: string, fileName: string) => {
  var elem = window.document.createElement("a");
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

export const useCapture = () => {};
