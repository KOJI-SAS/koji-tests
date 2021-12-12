export const unixToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return `${new Date(timestamp * 1000).toDateString()} ${
    date.getHours() +
    ':' +
    ('0' + date.getMinutes()).substr(-2) +
    ':' +
    ('0' + date.getSeconds()).substr(-2)
  }`;
};
