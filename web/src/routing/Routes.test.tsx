import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/styles";
import { MemoryRouter } from "react-router-dom";

import { Paths } from "@routing/paths";
import { Routes } from "@routing/Routes";
import { createDefaultTheme } from "@themes/defaultTheme";

describe("<Routes />", () => {
  it("should render routes properly", async () => {
    render(
      <ThemeProvider theme={createDefaultTheme()}>
        <MemoryRouter initialEntries={[Paths.BASE]}>
          <React.Suspense fallback={<div>test</div>}>
            <Routes />
          </React.Suspense>
        </MemoryRouter>
      </ThemeProvider>
    );

    /**
     * TODO: Checkout the reason for the timeout and get rid of it if possible
     */
    const indexContent = await screen.findByText(
      "Index page",
      {},
      { timeout: 10000 }
    );

    expect(indexContent).toBeInTheDocument();
  });
});
