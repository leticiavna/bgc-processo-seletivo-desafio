import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import { Auth } from "aws-amplify";
import { useFormFields } from "../libs/hooksLib";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  // hook: keeps input data
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 8;
  }

  async function handleSubmit(event) {
  event.preventDefault();
  
  setIsLoading(true);
  
  // login com o cognito
  try {
    await Auth.signIn(fields.email, fields.password);
    console.log("user authenticated");
    props.userHasAuthenticated(true);
  } catch (e) {
    alert(e.message); // TODO: trocar os alerts para algo mais bonitinho
    setIsLoading(false);
  }
}

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Senha</ControlLabel>
          <FormControl
            value={fields.password}
            onChange={handleFieldChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
          >
          Entrar
          </LoaderButton>
      </form>
    </div>
  );
}