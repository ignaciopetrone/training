import React from "react";

interface CustomMessageProps {
  compiler: string;
  message: string;
}

const CustomMessage = (props: CustomMessageProps) => (
  <div>
    <h1>{props.message}</h1>
    <p>This file was vevo wacho with {props.compiler}</p>
  </div>
);

export default CustomMessage;
