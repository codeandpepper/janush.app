import { render, fireEvent, waitFor } from "@testing-library/react";

import { SignUpForm } from "./SignUpForm";

describe("Form", () => {
  it("should show error message if passwords do not match", async () => {
    const form = render(
      <SignUpForm loading={false} error={null} onSubmit={() => true} />
    );

    fireEvent.change(form.getByTestId("password-input-field"), {
      target: { value: "P4ssw0rd" },
    });
    fireEvent.change(form.getByTestId("confirm-password-input-field"), {
      target: { value: "dummy" },
    });
    form.getByTestId("sign-up-button").click();

    await waitFor(() =>
      expect(form.getByTestId("confirm-password")).toHaveTextContent(
        "Passwords must match"
      )
    );
  });

  it('should show error message if "Confirm Password" is empty', async () => {
    const form = render(
      <SignUpForm loading={false} error={null} onSubmit={() => true} />
    );

    fireEvent.change(form.getByTestId("password-input-field"), {
      target: { value: "P4ssw0rd" },
    });
    form.getByTestId("sign-up-button").click();

    await waitFor(() =>
      expect(form.getByTestId("confirm-password")).toHaveTextContent(
        "Password is a required field"
      )
    );
  });
});
