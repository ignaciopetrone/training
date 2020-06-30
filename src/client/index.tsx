import * as React from "react";
import * as ReactDom from "react-dom";
import CustomMessage from "./components/custom-message";

ReactDom.render(
  <CustomMessage compiler="typescript" message="hello world" />,
  document.getElementById("root")
);
