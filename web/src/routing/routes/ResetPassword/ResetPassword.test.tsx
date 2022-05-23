import { Router } from "react-router-dom";
import { ThemeProvider } from "@features/ThemeProvider/ThemeProvider";
import ResetPassword from "./ResetPassword";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Auth } from "aws-amplify";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

const renderWithHistory = (
  initialEntries: string[] = [],
  Component: JSX.Element
) => {
  const history = createMemoryHistory({
    initialEntries,
  });

  return {
    ...render(
      <ThemeProvider>
        <Router history={history}>{Component}</Router>
      </ThemeProvider>
    ),
    history,
  };
};

const expectDocumentElements = () => {
  const heading = screen.getByRole("heading", {
    name: "Create new password",
  });
  expect(heading).toBeInTheDocument();

  const passwordInput = screen.getByText("Password");
  expect(passwordInput).toBeInTheDocument();

  const confirmPasswordInput = screen.getByText("Confirm Password");
  expect(confirmPasswordInput).toBeInTheDocument();

  const saveButton = screen.getByRole("button", { name: /Save/i });
  expect(saveButton).toBeInTheDocument();

  return {
    heading,
    passwordInput,
    confirmPasswordInput,
    saveButton,
  };
};

describe("ResetPassword", () => {
  it("should show reset password view", () => {
    renderWithHistory(
      ["/create-new-password?username=test%40test.com&code=165582"],
      <ResetPassword />
    );
    expectDocumentElements();
  });
  it("shoud redirect when no verification code in query params", () => {
    const { history } = renderWithHistory(
      ["/create-new-password"],
      <ResetPassword />
    );
    expect(history.location.pathname).toBe("/");
  });
  it("should call reset password function on submit", async () => {
    Auth.forgotPasswordSubmit = jest.fn();

    renderWithHistory(
      ["/create-new-password?username=test%40test.com&code=165582"],
      <ResetPassword />
    );

    const { passwordInput, confirmPasswordInput, saveButton } =
      expectDocumentElements();

    await act(async () => {
      userEvent.type(passwordInput, "TestPassword00");
      userEvent.type(confirmPasswordInput, "TestPassword00");
      userEvent.click(saveButton);
    });

    expect(Auth.forgotPasswordSubmit).toBeCalled();
  });
  it("should validate password properly", async () => {
    renderWithHistory(
      ["/create-new-password?username=test%40test.com&code=165582"],
      <ResetPassword />
    );

    const { passwordInput, confirmPasswordInput, saveButton } =
      expectDocumentElements();

    await act(async () => {
      userEvent.click(saveButton);
    });
    expect(
      screen.getAllByText(/Password is a required field/i)[0]
    ).toBeInTheDocument();

    await act(async () => {
      userEvent.type(passwordInput, "test");
      userEvent.click(saveButton);
    });
    expect(
      screen.getByText(/Your password should contain upper case letters/i)
    ).toBeInTheDocument();

    await act(async () => {
      userEvent.type(passwordInput, "Test");
      userEvent.type(confirmPasswordInput, "test");
    });
    expect(
      screen.getByText(/Your password should contain digits/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Passwords must match/i)).toBeInTheDocument();
  });
});
