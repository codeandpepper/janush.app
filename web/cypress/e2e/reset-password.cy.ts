import { authSelectors } from "../support/selectors/auth-selectors";
import {
  FakeUserData,
  generateFakeUserData,
} from "../support/methods/generate-data";

const user: FakeUserData = generateFakeUserData();

describe("Forgot password test suite", () => {
  before(() => {
    cy.visitPageCheckURL("sign-in");
  });

  it("User is able to go to the forgot password page and go back", () => {
    cy.get(authSelectors.buttons.forgotPassword).click();
    cy.checkThatURLContains("/forgot-password");
    cy.get(authSelectors.buttons.goBack).click();
    cy.checkThatURLContains("/sign-in");
  });

  it("User is not able to send reset password form when email is missing", () => {
    cy.get(authSelectors.buttons.forgotPassword).click();
    cy.get(authSelectors.buttons.send).click();
    cy.checkValidation("Email is a required field");
    cy.checkThatURLContains("/forgot-password");
  });

  it("User is not able to send reset password form when email doesn't contain @ sign", () => {
    cy.get(authSelectors.inputs.forgotEmail).type(user.email.withoutAtSign);
    cy.get(authSelectors.buttons.send).click();
    cy.checkValidation("Email is not correct");
    cy.checkThatURLContains("/forgot-password");
  });

  it("User is not able to send reset password form when email doesn't contain a proper domain", () => {
    cy.get(authSelectors.inputs.forgotEmail).clear();
    cy.get(authSelectors.inputs.forgotEmail).type(user.email.withoutDomain);
    cy.get(authSelectors.buttons.send).click();
    cy.checkValidation("Email is not correct");
    cy.checkThatURLContains("/forgot-password");
  });

  it("User is able to send reset password form when email is correct", () => {
    cy.get(authSelectors.inputs.forgotEmail).clear();
    cy.get(authSelectors.inputs.forgotEmail).type(user.email.correct);
    cy.get(authSelectors.buttons.send).click();
    cy.contains("Resetting your password").should("be.visible");
    cy.checkThatURLContains("/forgot-password");
  });

  it("User is able to get back to sign in page after getting reset password confirmation screen", () => {
    cy.get(authSelectors.buttons.goBack).click();
    cy.checkThatURLContains("/sign-in");
  });
});