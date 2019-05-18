export const maxBoolean = (prev: number, curr: any) => {
  return curr
    ? 1
    : prev;
};

export const maxFloat = (prev: number, curr: string) => {
  let value = parseFloat(curr);
  return value > prev
  ? value
  : prev;
};

export const maxInt = (prev: number, curr: string) => {
  let value = parseInt(curr);
  return value > prev
    ? value
    : prev;
};
