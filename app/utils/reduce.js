export const maxBoolean = (prev, curr) => {
  return curr
    ? 1
    : prev;
};

export const maxFloat = (prev, curr) => {
  let value = parseFloat(curr);
  return value > prev
  ? value
  : prev;
};

export const maxInt = (prev, curr) => {
  let value = parseInt(curr);
  return value > prev
    ? value
    : prev;
};
