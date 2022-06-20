import { AppBar, Toolbar, Button } from "@mui/material";
import { VFC } from "react";

import { Logo } from "@layouts/Logo/Logo";
import { Auth } from "aws-amplify";
import { useUserContext } from "@features/UserProvider/useUserContext";
import { NavLink } from "react-router-dom";
import { Paths } from "@routing/paths";

export const TopAppBar: VFC = () => {
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
      <Toolbar>
        <Logo />
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
