import {
  FakeUserData,
  generateFakeUserData,
} from "../support/methods/generate-data";
import { authSelectors } from "../support/selectors/auth-selectors";

const user: FakeUserData = generateFakeUserData();

describe("Sign in page test suite", () => {
  before(() => {
    cy.visitPageCheckURL("sign-in");
  });

  it("User is able to see password after clicking show password icon", () => {
    cy.typeText(authSelectors.inputs.password, user.password.correct);
    cy.clickOn(authSelectors.buttons.showPassword);
    cy.checkIfPasswordIsVisible(authSelectors.inputs.password, true);
    cy.clickOn(authSelectors.buttons.showPassword);
    cy.checkIfPasswordIsVisible(authSelectors.inputs.password, false);
  });

  it("User is not able to sign in when email is missing", () => {
    cy.clickOn(authSelectors.buttons.signIn);
    cy.checkValidation("Email is a required field");
    cy.checkThatURLContains("/sign-in");
  });

  it("User is not able to sign in when password is missing", () => {
    cy.typeText(authSelectors.inputs.email, user.email.correct);
    cy.clearElement(authSelectors.inputs.password);
    cy.clickOn(authSelectors.buttons.signIn);
    cy.checkValidation("Password is a required field");
    cy.checkThatURLContains("/sign-in");
  });

  it("User is not able to sign in when email address is incorrect", () => {
    cy.typeText(authSelectors.inputs.password, user.password.correct);
    cy.clearElement(authSelectors.inputs.email);
    cy.typeText(authSelectors.inputs.email, user.email.withoutAtSign);
    cy.clickOn(authSelectors.buttons.signIn);
    cy.checkValidation("Email is not correct");
    cy.clearElement(authSelectors.inputs.email);
    cy.typeText(authSelectors.inputs.email, user.email.withoutDomain);
    cy.clickOn(authSelectors.buttons.signIn);
    cy.checkValidation("Email is not correct");
    cy.checkThatURLContains("/sign-in");
  });

  it("User is not able to sign in with non existing user data", () => {
    cy.clearElement(authSelectors.inputs.email);
    cy.typeText(authSelectors.inputs.email, user.email.correct);
    cy.clickOn(authSelectors.buttons.signIn);
    cy.checkThatURLContains("/sign-in");
    cy.checkIfTextIsShown(
      authSelectors.containers.incorrectEmailOrPassword,
      "Incorrect email or password"
    );
  });
});
