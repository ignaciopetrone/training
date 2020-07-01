import React from "react";

interface AppProps {
  compiler: string;
  message: string;
}

const App = (props: AppProps) => {
  return (
    <div>
      <h1>{props.message}</h1>
      <p>This filejhb compiled with {props.compiler}</p>
    </div>
  );
};
export default App;
