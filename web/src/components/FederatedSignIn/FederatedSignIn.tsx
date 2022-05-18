import { Box, Button, Typography } from "@mui/material";
import { useCallback, VFC } from "react";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider as Providers } from "@aws-amplify/auth";
import { FacebookIcon, GoogleIcon, AppleIcon } from "@components/icons";
import { rgbaColors } from "@themes/palette";

const providers = [
  { name: "Facebook", provider: Providers.Facebook, Icon: <FacebookIcon /> },
  { name: "Google", provider: Providers.Google, Icon: <GoogleIcon /> },
  { name: "Apple", provider: Providers.Apple, Icon: <AppleIcon /> },
];

export const FederatedSignIn: VFC = () => {
  const handleFederatedSignIn = useCallback(
    (provider: Providers) => () => Auth.federatedSignIn({ provider }),
    []
  );

  return (
    <Box display="flex" flexDirection="column" mt={4} gap={1}>
      <Typography align="center">Or continue with...</Typography>
      <Box display="flex" mt={2} gap={2}>
        {providers.map(({ name, provider, Icon }) => (
          <Button
            key={provider}
            data-testid={`sign-in-button-${name}`}
            variant="outlined"
            color="inherit"
            startIcon={Icon}
            fullWidth
            onClick={handleFederatedSignIn(provider)}
            sx={{
              textTransform: "capitalize",
              borderColor: rgbaColors.grey.lighter,
            }}
          >
            {name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
