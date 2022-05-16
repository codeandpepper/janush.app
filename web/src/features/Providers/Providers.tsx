import React from "react";

import { SuspenseProvider } from "@features/SuspenseProvider/SuspenseProvider";
import { ThemeProvider } from "@features/ThemeProvider/ThemeProvider";
import { UserProvider } from "@features/UserProvider/UserProvider";

export const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <SuspenseProvider>{children}</SuspenseProvider>
      </UserProvider>
    </ThemeProvider>
  );
};
