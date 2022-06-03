/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as fs from "fs";

const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const component = (name) => {
  const capitalizedName = capitalize(name);
  return `import React, { FC }  from "react";

export interface ${capitalizedName}Props {}

const ${capitalizedName}: FC<${capitalizedName}Props> = ({}) => {
  return <div>${capitalizedName} component.</div>;
};
export default ${capitalizedName};
`;
};

export const testFile = (name) => {
  const capitalizedName = capitalize(name);
  return `import React from "react";
import { render } from "@testing-library/react";
import ${capitalizedName} from "./${name}";

describe("${capitalizedName} Component", () => {
  test("it should render component", () => {
    const input = render(<${capitalizedName} />);
    input.getByText("${capitalizedName} component.");
  });
});
`;
};

export const barrel = (name) => {
  const capitalizedName = capitalize(name);
  return `import ${capitalizedName} from "./${name}";
export default ${capitalizedName};
`;
};

const [args] = process.argv.slice(2);

const name = args.split("/").slice(-1)[0];
if (!args) throw new Error("You must include a component name.");

const dir = `./src/${args}/`;

// throw an error if the file already exists
if (fs.existsSync(dir))
  throw new Error("A component with that name already exists.");

// create the folder
fs.mkdirSync(dir, { recursive: true });

function writeFileErrorHandler(err) {
  if (err) throw err;
}

// component.tsx
fs.writeFile(`${dir}/${name}.tsx`, component(name), writeFileErrorHandler);
// test.tsx
fs.writeFile(`${dir}/${name}.test.tsx`, testFile(name), writeFileErrorHandler);
// index.tsx
fs.writeFile(`${dir}/index.ts`, barrel(name), writeFileErrorHandler);
