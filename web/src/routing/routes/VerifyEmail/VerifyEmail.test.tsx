import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Auth } from "aws-amplify";
import { MemoryRouter, Route } from "react-router-dom";

import { ThemeProvider } from "@features/ThemeProvider/ThemeProvider";
import VerifyEmail from "./VerifyEmail";

describe("<VerifyEmail />", () => {
  it("should render email if provided in location state", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Route
            path="/"
            component={VerifyEmail}
            location={{
              key: "tempKey",
              pathname: "/",
              search: "",
              state: { email: "test@test.com" },
              hash: "",
            }}
          />
        </MemoryRouter>
      </ThemeProvider>
    );
    const element = screen.getByText("test@test.com");
    expect(element).toBeInTheDocument();
  });

  it("should call Auth.resendSignUp() on button click", async () => {
    jest.useFakeTimers();
    Auth.resendSignUp = jest.fn();

    render(
      <ThemeProvider>
        <MemoryRouter>
          <Route
            path="/"
            component={VerifyEmail}
            location={{
              key: "tempKey",
              pathname: "/",
              search: "",
              state: { email: "test@test.com" },
              hash: "",
            }}
          />
        </MemoryRouter>
      </ThemeProvider>
    );
    const buttonText = screen.getByText("Resend email");
    expect(buttonText).toBeInTheDocument();

    await act(async () => {
      jest.runAllTimers();
      fireEvent.click(buttonText);
    });

    const button = buttonText.closest("button");
    expect(button).toBeDisabled();
  });
});