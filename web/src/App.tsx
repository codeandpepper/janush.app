import React from "react";

import { Providers } from "@features/Providers/Providers";
import { RouterRoutes } from "@routing/Routes";

const App: React.VFC = () => (
  <Providers>
    <RouterRoutes />
  </Providers>
);

export default App;
