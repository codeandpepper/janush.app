import { S3 } from "aws-sdk";

import { EmailTemplate } from "../../../../enums/EmailTemplate";

/**
 * Helper function, which grabs email template and translation from S3 and supplies data to it
 * @param s3 - S3 instance for api calls
 * @param templateName  - Name of the template in S3
 * @param reformedReplacements - Array of [replaceFrom, replaceTo] tuples
 */
export const generateEmailFromS3Template = async (
  s3: S3,
  templateName: EmailTemplate,
  reformedReplacements: [RegExp, string][]
): Promise<string> => {
  const { emailTemplatesBucketName } = process.env;

  const templateParams = {
    Bucket: emailTemplatesBucketName!,
    Key: `emailTemplates/${templateName}.html`,
  };

  console.log(`Trying to grab ${templateName} template`);
  const emailTemplateRaw = await s3.getObject(templateParams).promise();

  console.log("Replacing values in the template");

  let emailContent = emailTemplateRaw.Body!.toString();

  for (const [key, value] of reformedReplacements) {
    emailContent = emailContent.replace(key, value);
  }

  return emailContent;
};