const handleScroll = (event: TouchEvent | WheelEvent) => {
  event.preventDefault();
};
export const useBanScroll = () => {
  document.body.addEventListener("touchmove", handleScroll, {
    passive: false,
  });
  document.body.addEventListener("wheel", handleScroll, {
    passive: false,
  });
};
export const useCancelBanScroll = () => {
  // @ts-ignore
  document.body.removeEventListener("touchmove", handleScroll, {
    passive: true,
  });
  // @ts-ignore
  document.body.removeEventListener("wheel", handleScroll, {
    passive: true,
  });
};
