import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import { Auth } from "aws-amplify";
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Montserrat',
      '"Helvetica Neue"',
      'sans-serif'
    ].join(','),
  }
});

const useStyles = makeStyles(theme => ({
  appbar: {
    backgroundColor: "#FFF",
  }
}));

// propriedades parametro
function App(props) {
  const classes = useStyles();
  
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  
  async function handleLogout() {
    await Auth.signOut();
    console.log("user has logged out");
    userHasAuthenticated(false);
    // só é possivel usar aqui por causa do withrouter
    props.history.push("/login");
  }
  
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating &&
    <ThemeProvider theme={theme}>
    <div className="App">
    <AppBar className={classes.appbar} position="static">
        <Toolbar>
        {isAuthenticated
          ?
          <Fragment>
            <Link href="/">
              <Button color="inherit" >
                HOME
              </Button>
            </Link>
            <Link>
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            </Link>
          </Fragment>
          :
          <Fragment>
            <Link href="/signup">
              <Typography variant="h6">
              Cadastre-se
              </Typography>
            </Link>
            <Link href="/login">
              <Typography variant="h6">
              Login
              </Typography>
            </Link>
          </Fragment>
        }
        </Toolbar>
      </AppBar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
    </ThemeProvider>
  );
}

// withRouter
export default withRouter(App);