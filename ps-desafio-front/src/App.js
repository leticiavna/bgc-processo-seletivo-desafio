import React, { useState, useEffect, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { Auth } from "aws-amplify";

// propriedades parametro
function App(props) {
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
    <div className="App">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
            
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            {isAuthenticated
            ?
            <Nav className="justify-content-center" activeKey="/home">
            <Fragment>
              <LinkContainer to="/">
                <NavItem>Active</NavItem>
              </LinkContainer>
              <LinkContainer to="/">
                <NavItem>Active</NavItem>
              </LinkContainer>
              <LinkContainer to="/">
                <NavItem>Active</NavItem>
              </LinkContainer>
              <NavItem onClick={handleLogout}>Logout</NavItem>
            </Fragment>
            </Nav>
            : // TODO: por alguma razão a <> (short syntax) não funciona aqui (talvez seja o c9?), logo tem que usar o Fragment
             <Nav className="justify-content-center" activeKey="/home">
              <Fragment> 
                <LinkContainer to="/signup">
                  <NavItem>Cadastre-se</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </Fragment>
          </Nav>
            }
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

// withRouter
export default withRouter(App);