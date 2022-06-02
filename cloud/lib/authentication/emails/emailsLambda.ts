import { CustomMessageTriggerHandler } from "aws-lambda";
import { S3 } from "aws-sdk";

import { CognitoMessageTriggerSource } from "../../../enums/CognitoMessageTriggerSource";
import { EmailTemplate } from "../../../enums/EmailTemplate";
import { generateEmailFromS3Template } from "./utils";

const s3 = new S3();

/**
 * Helper function, which generates link with email & code
 * @param eventType   - Type of event to handle
 * @param email       - Email address
 */
export const generateCodeLink = (
  eventType: CognitoMessageTriggerSource,
  email: string
): string => {
  const defaultDomain = "https://janush.app";

  console.log(`Forming URL for event: ${eventType}`);

  const path = (() => {
    switch (eventType) {
      case CognitoMessageTriggerSource.ForgotPassword:
        return "create-new-password";
      case CognitoMessageTriggerSource.SignUp:
      case CognitoMessageTriggerSource.SignUpAdmin:
      case CognitoMessageTriggerSource.ResendCode:
        return "confirm-signup";
    }
  })();

  return `${defaultDomain}/${path}?username=${encodeURIComponent(
    email
  )}&code={####}`;
};

export const handler: CustomMessageTriggerHandler = async (
  event,
  context,
  callback
) => {
  try {
    const triggerSource = event.triggerSource as CognitoMessageTriggerSource;

    if (
      [
        CognitoMessageTriggerSource.SignUp,
        CognitoMessageTriggerSource.SignUpAdmin,
        CognitoMessageTriggerSource.ResendCode,
      ].includes(triggerSource)
    ) {
      if (event.request.userAttributes.email_verified === "true") {
        callback(new Error("User already verified"), event);
        return;
      }

      const {
        request: {
          userAttributes: { email },
        },
      } = event;

      const activationLink = generateCodeLink(triggerSource, email);

      event.response.emailSubject = "JanushAutoGeneratedApp | Verify account";
      event.response.emailMessage = await generateEmailFromS3Template(
        s3,
        EmailTemplate.EMAIL_VERIFICATION,
        [[/%ACTIVATION%/g, activationLink]]
      );
    } else if (triggerSource === CognitoMessageTriggerSource.ForgotPassword) {
      const {
        request: {
          userAttributes: { email },
        },
      } = event;

      const resetLink = generateCodeLink(triggerSource, email);

      event.response.emailSubject = "JanushAutoGeneratedApp | Reset password";
      event.response.emailMessage = await generateEmailFromS3Template(
        s3,
        EmailTemplate.RESET_PASSWORD,
        [[/%RESETPASSWORD%/g, resetLink]]
      );
    }
  } catch (e) {
    console.log(
      `Error occurred while fetching event ${event.triggerSource}. I am going to send default Email message!`
    );
    console.error(e);
  }

  callback(null, event);
};

exports.customMessageTriggerHandler = handler;
