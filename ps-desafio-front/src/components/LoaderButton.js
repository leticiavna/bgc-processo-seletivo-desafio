import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import "./LoaderButton.css";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <CircularProgress className={"spinner"} size={9} />}
      {props.children}
    </Button>
  );
}