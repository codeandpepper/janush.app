import React from "react";

import { PageLayout } from "@layouts/PageLayout/PageLayout";
import { render } from "@testing-library/react";

describe("<PageLayout />", () => {
  it("should render", async () => {
    const shell = render(<PageLayout withTopPadding withBottomPadding />);

    expect(shell).toBeDefined();
  });
});
