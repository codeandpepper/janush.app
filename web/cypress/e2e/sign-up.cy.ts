import { authSelectors } from "../support/selectors/auth-selectors";
import {
  FakeUserData,
  generateFakeUserData,
} from "../support/methods/generate-data";
import { indexPageSelectors } from "../support/selectors/index-page";

const user: FakeUserData = generateFakeUserData();

describe("Sign up page test suite", () => {
  before(() => {
    cy.visitPageCheckURL("sign-up");
  });

  it("User is able to see password after clicking show password icon", () => {
    cy.typeText(authSelectors.inputs.password, user.password.correct);
    cy.clickOn(authSelectors.buttons.showPassword);
    cy.checkIfPasswordIsVisible(authSelectors.inputs.password, true);
    cy.clickOn(authSelectors.buttons.showPassword);
    cy.checkIfPasswordIsVisible(authSelectors.inputs.password, false);
  });

  it("User is able to see confirm password after clicking show confirm password icon", () => {
    cy.typeText(authSelectors.inputs.confirmPassword, user.password.correct);
    cy.clickOn(authSelectors.buttons.showConfirmPassword);
    cy.checkIfPasswordIsVisible(authSelectors.inputs.confirmPassword, true);
    cy.clickOn(authSelectors.buttons.showConfirmPassword);
    cy.checkIfPasswordIsVisible(authSelectors.inputs.confirmPassword, false);
  });

  it("User is not able to sign up when email is missing", () => {
    cy.clickOn(authSelectors.buttons.signUp);
    cy.checkValidation("Email is a required field");
  });

  it("User is not able to sign up when email address is incorrect", () => {
    cy.typeText(authSelectors.inputs.email, user.email.withoutAtSign);
    cy.clickOn(authSelectors.buttons.signUp);
    cy.checkValidation("Email is not correct");
    cy.clearElement(authSelectors.inputs.email);
    cy.typeText(authSelectors.inputs.email, user.email.withoutDomain);
    cy.clickOn(authSelectors.buttons.signUp);
    cy.checkValidation("Email is not correct");
  });

  it("User is not able to sign up when password is missing", () => {
    cy.typeText(authSelectors.inputs.email, user.email.correct);
    cy.clearElement(authSelectors.inputs.password);
    cy.clickOn(authSelectors.buttons.signUp);
    cy.checkValidation("Password is a required field");
  });

  it("User is not able to sign up when confirm password is missing", () => {
    cy.typeText(authSelectors.inputs.password, user.password.correct);
    cy.clearElement(authSelectors.inputs.confirmPassword);
    cy.clickOn(authSelectors.buttons.signUp);
    cy.checkValidation("Password is a required field");
  });

  it("User is not able to sign up when password is too short", () => {
    cy.typeText(authSelectors.inputs.confirmPassword, user.password.correct);
    cy.clearElement(authSelectors.inputs.password);
    cy.typeText(authSelectors.inputs.password, user.password.tooShort);
    cy.checkValidation("Your password should contain at least 10 characters");
  });

  it("User is not able to sign up when password is too long", () => {
    cy.clearElement(authSelectors.inputs.password);
    cy.typeText(authSelectors.inputs.password, user.password.tooLong);
    cy.checkValidation("Your password is too long, max. 80 characters");
  });

  it("User is not able to sign up when password contains only lower case letters", () => {
    cy.clearElement(authSelectors.inputs.password);
    cy.typeText(
      authSelectors.inputs.password,
      user.password.onlyLowerCaseLetters
    );
    cy.checkValidation("Your password should contain upper case letters");
  });

  it("User is not able to sign up when password contains only upper case letters", () => {
    cy.clearElement(authSelectors.inputs.password);
    cy.typeText(
      authSelectors.inputs.password,
      user.password.onlyUpperCaseLetters
    );
    cy.checkValidation("Your password should contain lower case letters");
  });

  it("User is not able to sign up when password does not contain digits", () => {
    cy.clearElement(authSelectors.inputs.password);
    cy.typeText(authSelectors.inputs.password, user.password.withoutDigits);
    cy.checkValidation("Your password should contain digits");
  });

  it("User is not able to sign up when passwords are not the same", () => {
    cy.clearElement(authSelectors.inputs.password);
    cy.typeText(authSelectors.inputs.password, "Qwerty12345");
    cy.clickOn(authSelectors.buttons.signUp);
    cy.checkValidation("Passwords must match");
  });

  it("User is able to sign up correctly and go back to the home page", () => {
    cy.clearElement(authSelectors.inputs.password);
    cy.typeText(authSelectors.inputs.password, user.password.correct);
    cy.clickOn(authSelectors.buttons.signUp);
    cy.checkThatURLContains("/sign-up/success");
    cy.checkIfTextIsShown(
      authSelectors.texts.signUpSuccessPageTitle,
      "Account creation"
    );
    cy.clickOn(authSelectors.buttons.signUpSuccessPageBackButton);
    cy.checkTheStateOfElement(indexPageSelectors.buttons.logo, "visible");
  });

  it("User is not able to create two accounts with the same email address", () => {
    cy.clickOn(indexPageSelectors.buttons.signIn);
    cy.clickOn(authSelectors.buttons.goToSignUpPage);
    cy.checkThatURLContains("/sign-up");
    cy.fillSignUpForm(user.email.correct, user.password.correct);
    cy.clickOn(authSelectors.buttons.signUp);
    cy.checkValidation("An account with the given email already exists");
  });
});
