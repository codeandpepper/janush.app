import { FC } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { Button } from "@components/Button/Button";
import { rgbaColors } from "@themes/palette";

interface Props {
  showModal: boolean;
  closeModal: () => void;
  title: string;
  buttonTitle: string;
  isButtonDisabled: boolean;
  onSubmit?: () => void;
}

export const FormModalLayout: FC<Props> = ({
  children,
  showModal,
  closeModal,
  title,
  buttonTitle,
  isButtonDisabled,
  onSubmit,
}) => {
  return (
    <Dialog
      onClose={closeModal}
      open={showModal}
      sx={{
        "& .MuiPaper-root": {
          width: "444px",
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 24, lineHeight: "24px", pt: 5.5, pb: 1.5 }}>
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
        onClick={closeModal}
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
