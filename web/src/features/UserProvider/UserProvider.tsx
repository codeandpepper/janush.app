import { Auth, Hub } from "aws-amplify";
import { createContext, FC, useEffect, useState } from "react";

import { User } from "@interfaces/User";
import { HubEvent } from "@janush-types/enums/HubEvent";
import { Nullable } from "@janush-types/useful";

export interface UserContextValue {
  user?: Nullable<User>;
}

export const UserContext = createContext<UserContextValue>({
  user: undefined,
});

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<Nullable<User>>(null);

  const refreshUser = async () => {
    try {
      const {
        payload: {
          email,
          email_verified: emailVerified,
          sub,
          "cognito:groups": groups,
        },
      } = (await Auth.currentSession()).getIdToken();
      setUser({
        email,
        emailVerified,
        sub,
        groups: groups || [],
      });
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    (async () => {
      Hub.listen("auth", async ({ payload: { event } }) => {
        switch (event as HubEvent) {
          case HubEvent.SignIn:
          case HubEvent.TokenRefresh:
            await refreshUser();
            break;
          case HubEvent.SignOut:
            setUser(null);
            break;
          default:
            break;
        }
      });

      await refreshUser();
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
