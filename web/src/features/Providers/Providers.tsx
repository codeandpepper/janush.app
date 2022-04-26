import React from "react";
import { BrowserRouter } from "react-router-dom";

import { SuspenseProvider } from "@features/SuspenseProvider/SuspenseProvider";
import { ThemeProvider } from "@features/ThemeProvider/ThemeProvider";
import { UserProvider } from "@features/UserProvider/UserProvider";

export const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <SuspenseProvider>{children}</SuspenseProvider>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
};
