export const getOptionsFromEnum = (passedEnum: any) =>
  Object.keys(passedEnum).map((item) => ({
    name: item.toLocaleLowerCase(),
    label: item,
  }));
