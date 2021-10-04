// 时间戳转换为具体时间
export const conversionTimestamp = (timestamp: number) => {
  // 当前时间
  const currentInMs = new Date().getTime();
  // 留言发布时间
  const timeInMs = new Date(timestamp).getTime();
  // 时间换算
  const minuteInMs = 60 * 1000;
  const hourInMs = 60 * minuteInMs;
  const dayInMs = 24 * hourInMs;
  const monthInMs = 30 * dayInMs;
  const yearInMs = 365 * dayInMs;

  const relativeTime = currentInMs - timeInMs;
  if (relativeTime < minuteInMs) {
    return `${Math.ceil(relativeTime / 1000)}秒前`;
  } else if (relativeTime < hourInMs) {
    return `${Math.ceil(relativeTime / minuteInMs)}分钟前`;
  } else if (relativeTime < dayInMs) {
    return `${Math.ceil(relativeTime / hourInMs)}小时前`;
  } else if (relativeTime < monthInMs) {
    return `${Math.ceil(relativeTime / dayInMs)}天前`;
  } else if (relativeTime < yearInMs) {
    return `${Math.ceil(relativeTime / monthInMs)}月前`;
  } else {
    return `${Math.ceil(relativeTime / yearInMs)}年前`;
  }
};
