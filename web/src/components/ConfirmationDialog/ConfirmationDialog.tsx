import { FC, ReactNode } from "react";

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
  children: ReactNode;
  isOpen: boolean;
  onSubmit: () => void;
  onCancelClick: () => void;
  submitButtonTitle: string;
}

const ConfirmationDialogTitle: FC = ({ children }) => {
  const theme = useTheme<Theme>();

  return (
    <DialogTitle
      sx={{ fontSize: 24, lineHeight: theme.spacing(3), pt: 2.5, pb: 1.75 }}
    >
      {children}
    </DialogTitle>
  );
};

const ConfirmationDialogContent: FC = ({ children }) => {
  const theme = useTheme<Theme>();

  return (
    <DialogContent sx={{ pb: 7.5, color: theme.palette.secondary.dark }}>
      {children}
    </DialogContent>
  );
};

export const ConfirmationDialog = ({
  children,
  isOpen,
  onSubmit,
  onCancelClick,
  submitButtonTitle,
}: Props) => {
  const theme = useTheme<Theme>();

  return (
    <Dialog
      onClose={onCancelClick}
      open={isOpen}
      sx={{
        "& .MuiPaper-root": {
          // TODO: Static width need to be removed while implementing RWD
          width: "560px",
        },
      }}
    >
      {children}
      <DialogActions sx={{ px: 1, pb: 1 }}>
        <Button
          sx={{ lineHeight: theme.spacing(2), p: 1 }}
          variant="text"
          onClick={onCancelClick}
        >
          Cancel
        </Button>
        <Button
          sx={{ lineHeight: theme.spacing(2), p: 1 }}
          variant="text"
          onClick={onSubmit}
        >
          {submitButtonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.Title = ConfirmationDialogTitle;
ConfirmationDialog.Content = ConfirmationDialogContent;
