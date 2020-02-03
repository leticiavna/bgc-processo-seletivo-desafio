import React, { useState } from "react";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";
import { Auth } from "aws-amplify";
import TextField from '@material-ui/core/TextField';



export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);
      console.log("new user created")
    } catch (e) {
      setIsLoading(false);
      if (e.name === 'UsernameExistsException') {
        console.log(newUser);
        setNewUser(true);
        alert('Opa! Vimos aqui que você já se cadastrou. Por favor, confirme o código enviado por email.');
        renderConfirmationForm();
        await Auth.resendSignUp(fields.email);
      }
      else {
        alert(e.message);
        console.log(e);
      }
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      
      console.log("user confirmed");
      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      console.log(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmationCode"
            label="Código de Confirmação"
            name="confirmationCode"
            type="tel"
            autoFocus
            value={fields.confirmationCode}
            onChange={handleFieldChange}
          />
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verificar
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            value={fields.email}
            onChange={handleFieldChange}
          />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirme a Senha"
            type="password"
            id="confirmPassword"
            value={fields.confirmPassword}
            onChange={handleFieldChange}
          />  
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="Signup container">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}