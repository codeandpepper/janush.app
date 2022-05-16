import { VFC } from "react";

import { useUserContext } from "@features/UserProvider/useUserContext";
import { Logo } from "@layouts/Logo/Logo";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Paths } from "@routing/paths";
import { Auth } from "aws-amplify";
import { NavLink } from "react-router-dom";

interface Props {
  showLogo?: boolean;
}

export const TopAppBar: VFC<Props> = ({ showLogo = true }) => {
  const { user } = useUserContext();

  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex" }}>
        {showLogo && <Logo />}
        {user ? (
          <Button
            data-testid="sign-out-button-in-top-app-bar"
            onClick={signOut}
            color="inherit"
          >
            Sign out
          </Button>
        ) : (
          <Button
            data-testid="sign-in-button-in-top-app-bar"
            component={NavLink}
            to={Paths.SIGN_IN_PATH}
            color="inherit"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
