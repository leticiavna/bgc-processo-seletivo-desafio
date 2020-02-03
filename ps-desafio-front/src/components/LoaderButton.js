import React from "react";
import "./LoaderButton.css";
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';

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
      {isLoading && <AutorenewIcon className="spinning" />}
      {props.children}
    </Button>
  );
}