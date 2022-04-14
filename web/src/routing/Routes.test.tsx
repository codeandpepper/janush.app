import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/styles";
import { MemoryRouter } from "react-router-dom";

import { Paths } from "@routing/paths";
import { Routes } from "@routing/Routes";
import { createDefaultTheme } from "@themes/defaultTheme";

describe("<Routes />", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should render routes properly with React.Suspense", async () => {
    const suspenseTitle = "test";
    const indexPageTitle = "Index page";

    render(
      <ThemeProvider theme={createDefaultTheme()}>
        <MemoryRouter initialEntries={[Paths.BASE]}>
          <React.Suspense fallback={<div>{suspenseTitle}</div>}>
            <Routes />
          </React.Suspense>
        </MemoryRouter>
      </ThemeProvider>
    );

    const suspenseFallback = await screen.findByText(suspenseTitle);
    expect(suspenseFallback).toBeInTheDocument();

    jest.advanceTimersByTime(500);

    const indexContent = await screen.findByText(indexPageTitle);
    expect(indexContent).toBeInTheDocument();
  });
});
