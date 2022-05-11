import { Box, Button } from "@mui/material";
import { Apple, Facebook, Google } from "@mui/icons-material";
import { useCallback, VFC } from "react";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider as Providers } from "@aws-amplify/auth";

const providers = [
  { name: "Apple", provider: Providers.Apple, Icon: <Apple /> },
  { name: "Facebook", provider: Providers.Facebook, Icon: <Facebook /> },
  { name: "Google", provider: Providers.Google, Icon: <Google /> },
];

export const FederatedSignIn: VFC = () => {
  const handleFederatedSignIn = useCallback(
    (provider: Providers) => () => Auth.federatedSignIn({ provider }),
    []
  );

  return (
    <Box display="flex" flexDirection="column" mt={2} gap={1}>
      {providers.map(({ name, provider, Icon }) => (
        <Button
          key={provider}
          data-testid={`sign-in-button-${name}`}
          variant="outlined"
          color="inherit"
          startIcon={Icon}
          fullWidth
          onClick={handleFederatedSignIn(provider)}
        >
          Sign In with {name}
        </Button>
      ))}
    </Box>
  );
};
