import { FC } from "react";

import {
  Select as MuiSelect,
  MenuItem,
  SxProps,
  SelectChangeEvent,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Option {
  name: string;
  label: string;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  sx?: SxProps;
}

export const Select: FC<Props> = ({ options, value, onChange, sx }) => {
  return (
    <MuiSelect
      value={value}
      onChange={onChange}
      variant="standard"
      sx={sx}
      // TODO: change to icon from Figma
      IconComponent={KeyboardArrowDownIcon}
    >
      {options.map((option) => (
        <MenuItem value={option.name} key={option.name}>
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};
