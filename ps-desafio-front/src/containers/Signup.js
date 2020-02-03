import React, { useState, Fragment } from "react";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";
import { Auth } from "aws-amplify";
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Signup(props) {
  const classes = useStyles();
  
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
      <Fragment>
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
      <Grid container>
       <Grid item xs={12}>
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
          </Grid>
        <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
          >
            Cadastrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                já tem uma conta? entre aqui 
              </Link>
            </Grid>
          </Grid>
      </form>
      </Fragment>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
    <div className="Signup container">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
    </div>
    </Container>
  );
}