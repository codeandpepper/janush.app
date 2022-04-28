import { lazy, VFC } from "react";
import { Route, Switch } from "react-router-dom";
import { Paths } from "@routing/paths";

const IndexPage = lazy(() => import("./routes/Index/IndexPage"));
const SignIn = lazy(() => import("./routes/SignIn/SignIn"));
const SignUp = lazy(() => import("./routes/SignUp/SignUp"));
const VerifyEmail = lazy(() => import("./routes/VerifyEmail/VerifyEmail"));

export const Routes: VFC = () => {
  return (
    <Switch>
      <Route path={Paths.SIGN_IN_PATH} component={SignIn} />
      <Route path={Paths.SIGN_UP_PATH} component={SignUp} />
      <Route path={Paths.VERIFY_EMAIL_PATH} component={VerifyEmail} />
      <Route path="/" component={IndexPage} />
    </Switch>
  );
};
