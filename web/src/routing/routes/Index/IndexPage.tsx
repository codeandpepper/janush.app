import React from "react";

import { PageLayout } from "@layouts/PageLayout/PageLayout";
import { TopAppBar } from "@layouts/TopAppBar/TopAppBar";
import { Typography } from "@mui/material";

const IndexPage: React.VFC = () => (
  <>
    <TopAppBar />
    <PageLayout pb={5}>
      <Typography variant="h1">Index page</Typography>
    </PageLayout>
  </>
);

export default IndexPage;
