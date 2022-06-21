import { lazy, VFC } from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "@routing/paths";

const IndexPage = lazy(() => import("./routes/Index/IndexPage"));
const SignIn = lazy(() => import("./routes/SignIn/SignIn"));
const SignUp = lazy(() => import("./routes/SignUp/SignUp"));
const SignUpSuccess = lazy(() =>
  import("./routes/SignUpSuccess/SignUpSuccess")
);
const VerifyEmail = lazy(() => import("./routes/VerifyEmail/VerifyEmail"));
const ForgotPassword = lazy(() =>
  import("./routes/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./routes/ResetPassword/ResetPassword")
);

export const Router: VFC = () => {
  return (
    <Routes>
      <Route path={Paths.SIGN_IN_PATH} element={<SignIn />} />
      <Route path={Paths.SIGN_UP_PATH} element={<SignUp />} />
      <Route path={Paths.SIGN_UP_PATH_SUCCESS} element={<SignUpSuccess />} />
      <Route path={Paths.VERIFY_EMAIL_PATH} element={<VerifyEmail />} />
      <Route path={Paths.FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
      <Route path={Paths.RESET_PASSWORD_PATH} element={<ResetPassword />} />
      <Route path="/" element={<IndexPage />} />
    </Routes>
  );
};
