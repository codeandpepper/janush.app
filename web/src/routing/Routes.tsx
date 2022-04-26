import { lazy, FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "@routing/paths";

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

export const RouterRoutes: FC = () => {
  return (
    <Routes>
      <Route
        key={Paths.SIGN_IN_PATH}
        path={Paths.SIGN_IN_PATH}
        element={<SignIn />}
      />
      <Route
        key={Paths.SIGN_UP_PATH}
        path={Paths.SIGN_UP_PATH}
        element={<SignUp />}
      />
      <Route
        key={Paths.VERIFY_EMAIL_PATH}
        path={Paths.VERIFY_EMAIL_PATH}
        element={<VerifyEmail />}
      />
      <Route path={Paths.USERS_ADMINISTRATION_PATH}>
        <Route
          path={Paths.USERS_ADMINISTRATION_USERS_PATH}
          key={Paths.USERS_ADMINISTRATION_USERS_PATH}
          element={<Users />}
        />
        <Route
          path={Paths.USERS_ADMINISTRATION_USERS_USER_DETAILS_PATH}
          key={Paths.USERS_ADMINISTRATION_USERS_USER_DETAILS_PATH}
          element={<UserDetails />}
        />
        <Route
          path={Paths.USERS_ADMINISTRATION_GROUPS_PATH}
          key={Paths.USERS_ADMINISTRATION_GROUPS_PATH}
          element={<Groups />}
        />
        <Route
          path={Paths.USERS_ADMINISTRATION_GROUPS_GROUP_DETAILS_PATH}
          key={Paths.USERS_ADMINISTRATION_GROUPS_GROUP_DETAILS_PATH}
          element={<GroupDetails />}
        />
      </Route>
      <Route path="/" key="index" element={<IndexPage />} />
    </Routes>
  );
};
