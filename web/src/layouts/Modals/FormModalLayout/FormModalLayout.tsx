import { FC } from "react";

import { Button } from "@components/Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Theme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { rgbaColors } from "@themes/palette";

interface Props {
  isOpen: boolean;
  title: string;
  buttonTitle: string;
  isButtonDisabled?: boolean;
  onSubmit?: () => void;
  onModalClose: () => void;
}

export const FormModalLayout: FC<Props> = ({
  children,
  isOpen,
  title,
  buttonTitle,
  isButtonDisabled = false,
  onSubmit,
  onModalClose,
}) => {
  const theme = useTheme<Theme>();

  return (
    <Dialog
      onClose={onModalClose}
      open={isOpen}
      sx={{
        "& .MuiPaper-root": {
          // TODO: Static width need to be removed while implementing RWD
          width: "444px",
        },
      }}
    >
      <DialogTitle
        sx={{ fontSize: 24, lineHeight: theme.spacing(3), pt: 5.5, pb: 1.5 }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ pb: 2 }}>{children}</DialogContent>
      <DialogActions sx={{ px: 3, pb: 6 }}>
        <Button
          sx={{ width: "100%" }}
          disabled={isButtonDisabled}
          onSubmit={onSubmit}
        >
          {buttonTitle}
        </Button>
      </DialogActions>
      <IconButton
        onClick={onModalClose}
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          color: rgbaColors.grey.dark,
        }}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
};
