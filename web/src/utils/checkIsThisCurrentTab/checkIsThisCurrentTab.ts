import { Location } from "react-router-dom";

export const checkIsThisCurrentTab = (
  location: Location,
  tabName: string
): boolean => location.pathname.split("/")[2] === tabName;
