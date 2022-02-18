import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { Paths } from "@routing/paths";

const IndexPage = lazy(() => import("./routes/Index/IndexPage"));
const ConfirmSignUp = lazy(() =>
  import("./routes/ConfirmSignUp/ConfirmSignUp")
);
const SignIn = lazy(() => import("./routes/SignIn/SignIn"));
const SignUp = lazy(() => import("./routes/SignUp/SignUp"));
const VerifyEmail = lazy(() => import("./routes/VerifyEmail/VerifyEmail"));

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={Paths.SIGN_IN_PATH} component={SignIn} />
      <Route path={Paths.SIGN_UP_PATH} component={SignUp} />
      <Route path={Paths.VERIFY_EMAIL_PATH} component={VerifyEmail} />
      <Route path={Paths.CONFIRM_SIGN_UP} component={ConfirmSignUp} />
      <Route path="/" component={IndexPage} />
    </Switch>
  );
};
