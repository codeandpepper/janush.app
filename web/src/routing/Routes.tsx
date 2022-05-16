import { lazy, FC } from "react";

import { Paths } from "@routing/paths";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const IndexPage = lazy(() => import("./routes/Index/IndexPage"));
const SignIn = lazy(() => import("./routes/SignIn/SignIn"));
const SignUp = lazy(() => import("./routes/SignUp/SignUp"));
const VerifyEmail = lazy(() => import("./routes/VerifyEmail/VerifyEmail"));
const Users = lazy(() => import("./routes/UsersAdministration/Users/Users"));
const UserDetails = lazy(() =>
  import("./routes/UsersAdministration/Users/UserDetails/UserDetails")
);
const Groups = lazy(() => import("./routes/UsersAdministration/Groups/Groups"));
const GroupDetails = lazy(() =>
  import("./routes/UsersAdministration/Groups/GroupDetails/GroupDetails")
);

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.SIGN_IN_PATH} element={<SignIn />} />
        <Route path={Paths.SIGN_UP_PATH} element={<SignUp />} />
        <Route path={Paths.VERIFY_EMAIL_PATH} element={<VerifyEmail />} />
        <Route path={Paths.USERS_ADMINISTRATION_PATH}>
          <Route
            path={Paths.USERS_ADMINISTRATION_USERS_PATH}
            element={<Users />}
          />
          <Route
            path={Paths.USERS_ADMINISTRATION_USERS_USER_DETAILS_PATH}
            element={<UserDetails />}
          />
          <Route
            path={Paths.USERS_ADMINISTRATION_GROUPS_PATH}
            element={<Groups />}
          />
          <Route
            path={Paths.USERS_ADMINISTRATION_GROUPS_GROUP_DETAILS_PATH}
            element={<GroupDetails />}
          />
        </Route>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  );
};
