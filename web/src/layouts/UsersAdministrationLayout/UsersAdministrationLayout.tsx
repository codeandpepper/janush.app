import { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { Box, Theme, Button as MuiButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Link } from "@components/Link/Link";
import { ArrowLeftIcon } from "@components/icons/ArrowLeftIcon/ArrowLeftIcon";
import { PageLayout } from "@layouts/PageLayout/PageLayout";
import { TopAppBar } from "@layouts/TopAppBar/TopAppBar";

import { Paths } from "@routing/paths";

interface Props {
  onBackClick?: () => void;
  buttons: ReactNode;
}

export const UsersAdministrationLayout: FC<Props> = ({
  children,
  onBackClick,
  buttons,
}) => {
  const theme = useTheme<Theme>();
  const location = useLocation();

  const isUsersTab = location.pathname.split("/")[2] === "users";

  const getTabStyles = (isTabActive: boolean) => ({
    color: isTabActive
      ? theme.palette.primary.main
      : theme.palette.common.black,
    opacity: isTabActive ? 1 : 0.6,
    fontWeight: 600,
    lineHeight: "16px",
    height: "100%",
    borderBottom: isTabActive
      ? `1px solid ${theme.palette.primary.main}`
      : `1px solid ${theme.palette.common.white}`,
    borderRadius: 0,
  });

  return (
    <>
      <TopAppBar showLogo={false} />
      <PageLayout
        py={5}
        px={2}
        mt={0}
        maxWidth="xl"
        sx={{
          backgroundColor: theme.palette.secondary.main,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box display="flex" justifyContent="space-between">
          {onBackClick ? (
            <Box
              sx={{
                height: "24px",
                cursor: "pointer",
                ml: 2,
              }}
            >
              <ArrowLeftIcon onClick={onBackClick} />
            </Box>
          ) : (
            <Box
              bgcolor="common.white"
              sx={{
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                display: "flex",
              }}
            >
              <Link
                to={Paths.USERS_ADMINISTRATION_USERS_PATH}
                underline="none"
                sx={{
                  display: "block",
                  borderBottom: isUsersTab
                    ? `1px solid ${theme.palette.primary.main}`
                    : "1px solid rgba(0, 0, 0, 0.12)",
                }}
              >
                <MuiButton variant="text" sx={getTabStyles(isUsersTab)}>
                  Users
                </MuiButton>
              </Link>
              <Link
                to={Paths.USERS_ADMINISTRATION_GROUPS_PATH}
                underline="none"
                sx={{
                  display: "block",
                  borderBottom: !isUsersTab
                    ? `1px solid ${theme.palette.primary.main}`
                    : "1px solid rgba(0, 0, 0, 0.12)",
                }}
              >
                <MuiButton variant="text" sx={getTabStyles(!isUsersTab)}>
                  Groups
                </MuiButton>
              </Link>
            </Box>
          )}
          <Box mb={1.5}>{buttons}</Box>
        </Box>
        <Box bgcolor="common.white">{children}</Box>
      </PageLayout>
    </>
  );
};
