import { VFC } from "react";

import { Theme, Snackbar, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  content?: string;
  show: boolean;
  onClose: () => void;
}

export const ErrorNotification: VFC<Props> = ({ content, show, onClose }) => {
  const theme = useTheme<Theme>();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={show}
      onClose={onClose}
      // TODO: Static width need to be removed while implementing RWD
      sx={{ width: "764px", "& .MuiPaper-root": { py: 0.75 } }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        sx={{
          width: "100%",
          backgroundColor: theme.palette.error.main,
          color: "common.white",
        }}
        icon={false}
      >
        {content || "Something went wrong. Please try again."}
      </Alert>
    </Snackbar>
  );
};
