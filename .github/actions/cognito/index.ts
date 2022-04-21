import { exportVariable, setFailed } from '@actions/core';
import { exec, getExecOutput } from '@actions/exec';

const deployCognito = async () => {
	try {
		await exec(
			'npm run cdk deploy JanushAutoGeneratedAppStack -- --require-approval never',
			null,
			{ cwd: './cloud' }
		);
		const identityPoolId = await getExecOutput(
			'aws cloudformation describe-stacks --stack-name JanushAutoGeneratedAppStack --query "Stacks[0].Outputs[?ExportName==\'cognitoIdentityPoolIdJanushAutoGeneratedApp\'].OutputValue" --output text',
			null,
			{ cwd: './cloud' }
		);
		const userPoolId = await getExecOutput(
			'aws cloudformation describe-stacks --stack-name JanushAutoGeneratedAppStack --query "Stacks[0].Outputs[?ExportName==\'cognitoUserPoolIdJanushAutoGeneratedApp\'].OutputValue" --output text',
			null,
			{ cwd: './cloud' }
		);
		const userPoolWebClientId = await getExecOutput(
			'aws cloudformation describe-stacks --stack-name JanushAutoGeneratedAppStack --query "Stacks[0].Outputs[?ExportName==\'cognitoUserPoolClientIdJanushAutoGeneratedApp\'].OutputValue" --output text',
			null,
			{ cwd: './cloud' }
		);
		exportVariable('identityPoolId', identityPoolId.stdout.trim());
		exportVariable('userPoolId', userPoolId.stdout.trim());
		exportVariable('userPoolWebClientId', userPoolWebClientId.stdout.trim());
	} catch (error) {
		setFailed(error.message);
	}
};

deployCognito();