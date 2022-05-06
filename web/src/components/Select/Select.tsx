import { FC } from "react";

import { Select as MuiSelect, MenuItem, SelectProps } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Option {
  name: string;
  label: string;
}

interface Props extends SelectProps {
  options: Option[];
}

export const Select: FC<Props> = ({ options, ...selectProps }) => {
  return (
    <MuiSelect
      variant="standard"
      // TODO: change to icon from Figma
      IconComponent={KeyboardArrowDownIcon}
      {...selectProps}
    >
      {options.map((option) => (
        <MenuItem value={option.name} key={option.name}>
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};
