import React from "react";

import { Providers } from "@features/Providers/Providers";
import { Router } from "@routing/Routes";

const App: React.VFC = () => (
  <Providers>
    <Router />
  </Providers>
);

export default App;
