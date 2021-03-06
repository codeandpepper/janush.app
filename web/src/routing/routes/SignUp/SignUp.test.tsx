import { Auth } from "aws-amplify";
import { MemoryHistory } from "history";
import { MemoryRouter, Router } from "react-router-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { ThemeProvider } from "@features/ThemeProvider/ThemeProvider";
import { Paths } from "@routing/paths";

import SignUp from "./SignUp";

const setup = async (history?: MemoryHistory) => {
  const innerContent = <SignUp />;

  render(
    <ThemeProvider>
      {history ? (
        <Router location={Paths.SIGN_UP_PATH} navigator={history}>
          {innerContent}
        </Router>
      ) : (
        <MemoryRouter>{innerContent}</MemoryRouter>
      )}
    </ThemeProvider>
  );

  const emailInput = await screen.findByPlaceholderText(/Email/i);
  expect(emailInput).toBeInTheDocument();

  const passwordInput = await screen.findByPlaceholderText(/^Password/i);
  expect(passwordInput).toBeInTheDocument();

  const confirmPasswordInput = await screen.findByPlaceholderText(
    /Confirm password/i
  );
  expect(confirmPasswordInput).toBeInTheDocument();

  const signUpButton = await screen.findByText(/Sign Up/i);
  expect(signUpButton).toBeInTheDocument();

  return {
    emailInput,
    passwordInput,
    confirmPasswordInput,
    signUpButton,
  };
};

describe("<SignUp />", () => {
  it("should call Auth.signUp() function on form submit", async () => {
    Auth.signUp = jest.fn();

    const { emailInput, passwordInput, confirmPasswordInput, signUpButton } =
      await setup();

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test123456" } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "Test123456" },
      });

      fireEvent.click(signUpButton);
    });

    expect(Auth.signUp).toBeCalled();
  });

  it("should handle error form Auth.signUp() UsernameExistsException", async () => {
    Auth.signUp = jest.fn().mockImplementation(() => {
      // eslint-disable-next-line
      throw {
        code: "UsernameExistsException",
        message: "User with this email already exists",
      };
    });

    const push = jest.fn();

    const { emailInput, passwordInput, confirmPasswordInput, signUpButton } =
      await setup({
        push,
        createHref: jest.fn(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        location: {},
        listen: jest.fn(),
      });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test123456" } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "Test123456" },
      });
      fireEvent.click(signUpButton);
    });

    screen.getByText("User with this email already exists");
  });

  it("should handle different error form Auth.signUp()", async () => {
    Auth.signUp = jest.fn().mockImplementation(() => {
      // eslint-disable-next-line
      throw new Error("OtherCode");
    });

    const push = jest.fn();

    const { emailInput, passwordInput, confirmPasswordInput, signUpButton } =
      await setup({
        push,
        createHref: jest.fn(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        location: {},
        listen: jest.fn(),
      });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test123456" } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "Test123456" },
      });

      fireEvent.click(signUpButton);
    });

    expect(Auth.signUp).toHaveBeenCalled();
    expect(Auth.signUp).toThrow("OtherCode");
  });

  it("should not call signup 2nd time while loading", async () => {
    Auth.signUp = jest
      .fn()
      .mockImplementation(
        () => new Promise<void>((res) => setTimeout(() => res(), 5000))
      );

    const { emailInput, passwordInput, confirmPasswordInput, signUpButton } =
      await setup({
        push: jest.fn(),
        createHref: jest.fn(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        location: {},
        listen: jest.fn(),
      });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test123456" } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "Test123456" },
      });

      fireEvent.click(signUpButton);
      await new Promise<void>((res) => setTimeout(() => res(), 500));
      fireEvent.click(signUpButton);
    });

    expect(Auth.signUp).toBeCalledTimes(1);
  });
});
