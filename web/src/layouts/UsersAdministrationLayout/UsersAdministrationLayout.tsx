import { FC, ReactNode } from "react";

import { ArrowLeftIcon } from "@components/icons/ArrowLeftIcon/ArrowLeftIcon";
import { Link } from "@components/Link/Link";
import { PageLayout } from "@layouts/PageLayout/PageLayout";
import { TopAppBar } from "@layouts/TopAppBar/TopAppBar";
import { Box, Theme, Button as MuiButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Paths } from "@routing/paths";
import { rgbaColors } from "@themes/palette";
import { checkIsThisCurrentTab } from "@utils/checkIsThisCurrentTab/checkIsThisCurrentTab";
import { useLocation } from "react-router-dom";

interface UsersAdministrationLayoutProps {
  onBackClick?: () => void;
  buttons: ReactNode;
}

interface TabProps {
  linkTo: string;
  isActive: boolean;
}

const Tab: FC<TabProps> = ({ children, linkTo, isActive }) => {
  const theme = useTheme<Theme>();

  const getTabStyles = () => ({
    color: isActive ? theme.palette.primary.main : theme.palette.common.black,
    opacity: isActive ? 1 : 0.6,
    fontWeight: 600,
    lineHeight: theme.spacing(2),
    height: "100%",
    borderBottom: isActive
      ? `1px solid ${theme.palette.primary.main}`
      : `1px solid ${theme.palette.common.white}`,
    borderRadius: 0,
  });

  return (
    <Link
      to={linkTo}
      underline="none"
      sx={{
        display: "block",
        borderBottom: isActive
          ? `1px solid ${theme.palette.primary.main}`
          : `1px solid ${rgbaColors.grey.lighter}`,
      }}
    >
      <MuiButton variant="text" sx={getTabStyles()}>
        {children}
      </MuiButton>
    </Link>
  );
};

export const UsersAdministrationLayout: FC<UsersAdministrationLayoutProps> = ({
  children,
  onBackClick,
  buttons,
}) => {
  const theme = useTheme<Theme>();
  const location = useLocation();

  const isUsersTab = checkIsThisCurrentTab(location, "users");

  return (
    <>
      <TopAppBar showLogo={false} />
      <PageLayout
        py={5}
        px={2}
        mt={0}
        maxWidth={false}
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
              <Tab
                linkTo={Paths.USERS_ADMINISTRATION_USERS_PATH}
                isActive={isUsersTab}
              >
                Users
              </Tab>
              <Tab
                linkTo={Paths.USERS_ADMINISTRATION_GROUPS_PATH}
                isActive={!isUsersTab}
              >
                Groups
              </Tab>
            </Box>
          )}
          <Box mb={1.5}>{buttons}</Box>
        </Box>
        <Box bgcolor="common.white">{children}</Box>
      </PageLayout>
    </>
  );
};
