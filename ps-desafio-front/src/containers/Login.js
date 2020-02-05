import React, { useState } from "react";
// import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import { Auth } from "aws-amplify";
import { useFormFields } from "../libs/hooksLib";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
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
    backgroundColor: "#FCE029",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Login(props) {
  
  const classes = useStyles();
  // eslint-disable-next-line
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
    <div className="Login container">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
      
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
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
          >
            Entrar
            </Button>
      <Grid container>
        <Grid item xs>
          <Link href="/signup">
            {"não tem conta? cadastre-se"}
          </Link>
        </Grid>
      </Grid>
      
      </form>
      </div>
    </Container>
    </div>
  );
}