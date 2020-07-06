import React from "react";

interface AppProps {
  compiler: string;
  message: string;
}

const App = (props: AppProps) => (
  <div>
    <h1>{props.message}</h1>
    <p>This filejhb compiled with {props.compiler}</p>
  </div>
);
export default App;
