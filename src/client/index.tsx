import React from "react";
import ReactDom from "react-dom";
import App from "./app";

ReactDom.render(
  <App compiler="vevo" message="hello world" />,
  document.getElementById("root")
);
