export const validateMaxStringLength = (value = "", max: number): boolean => {
  return typeof value === "undefined" || value.length <= max;
};
