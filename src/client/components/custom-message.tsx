import * as React from "react";

interface CustomMessageProps {
  compiler: string;
  message: string;
}

console.log(React);

const CustomMessage = (props: CustomMessageProps) => (
  <div>
    <h1>{props.message}</h1>
    <p>This file was compaasdsdasdiled asdusiasdasng {props.compiler}</p>
  </div>
);

export default CustomMessage;
