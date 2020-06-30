import React from "react";
import ReactDom from "react-dom";
import CustomMessage from "./components/custom-message";

ReactDom.render(
  <CustomMessage compiler="typescript" message="hello world" />,
  document.getElementById("root")
);
