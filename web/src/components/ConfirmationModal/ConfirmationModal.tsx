import { FC } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Theme,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  showModal: boolean;
  closeModal: () => void;
  title: string;
  onSubmit: () => void;
}

export const ConfirmationModal: FC<Props> = ({
  children,
  showModal,
  closeModal,
  title,
  onSubmit,
}) => {
  const theme = useTheme<Theme>();

  return (
    <Dialog
      onClose={closeModal}
      open={showModal}
      sx={{
        "& .MuiPaper-root": {
          width: "560px",
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 24, lineHeight: "24px", pt: 2.5, pb: 1.75 }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ pb: 7.5, color: theme.palette.secondary.dark }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ px: 1, pb: 1 }}>
        <Button
          sx={{ lineHeight: "16px", p: 1 }}
          variant="text"
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          sx={{ lineHeight: "16px", p: 1 }}
          variant="text"
          onClick={onSubmit}
        >
          Remove user
        </Button>
      </DialogActions>
    </Dialog>
  );
};
