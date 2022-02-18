import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { SuspenseProvider } from "@features/SuspenseProvider/SuspenseProvider";
import { ThemeProvider } from "@features/ThemeProvider/ThemeProvider";
import { UserProvider } from "@features/UserProvider/UserProvider";

export const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <SuspenseProvider>{children}</SuspenseProvider>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};
