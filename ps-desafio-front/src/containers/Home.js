import React from "react";
import "./Home.css";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Container, TextField } from '@material-ui/core';

// For later
// eslint-disable-next-line
const minionsNames = [
  'stuart',
  'kevin',
  'bob',
  'dave',
  'phil',
  'jerry',
];

// Aqui pode usar a função pra alterar o css
// Pra não ficar uma coisa enorme, seria legal cada section ter seu arquivo direitinho
// E  virar um componente, q aí podia chamar na home, fica como TODO
const useStyles = makeStyles(theme => ({
  lander: {
    backgroundColor: "#0A75BC",
    color: "#FAFAFA",
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '80vh',
      minHeight: 500,
      maxHeight: 1300,
    },
  },
  seeMore: {
    color: "#0A75BC",
    backgroundColor: "#231F20"
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    opacity: 0.8,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    transition: "0.3s",
    '&:hover': {
      backgroundColor: "#F4F4F4",
      opacity: 1
    }
  },
}));


export default function Home() {
  const classes = useStyles();

  return (
    <div className="Home container">
      
      <section className={classes.lander} id="lander">
        <Container>
          <h1>sempre quis ter um <b>minion</b>?</h1>
          <p>aqui na minions boutique você pode. é rápido, fácil e simples reservar o seu.</p>
          <Button variant="contained" className={classes.seeMore}> veja mais </Button>
        </Container>
      </section>
      
      { 
      // TODO: isso deveria ser um componente; propriedades img, nome e p
      }
      <section id="choose">
        <Container>
          <h1> escolha o seu! </h1>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <div className={classes.paper}>
                  <img src="/images/stuart_transparent.png" alt="minion"/>
                  <h3> Stuart </h3>
                  <p> minion </p>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.paper}>
                  <img src="/images/stuart_transparent.png" alt="minion"/>
                  <h3> Kevin </h3>
                  <p> minion </p>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.paper}>
                  <img src="/images/stuart_transparent.png" alt="minion"/>
                  <h3> Bob </h3>
                  <p> minion </p>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.paper}>
                  <img src="/images/stuart_transparent.png" alt="minion"/>
                  <h3> Dave </h3>
                  <p> minion </p>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.paper}>
                  <img src="/images/stuart_transparent.png" alt="minion"/>
                  <h3> Phil </h3>
                  <p> minion </p>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.paper}>
                  <img src="/images/stuart_transparent.png" alt="minion"/>
                  <h3> Jerry </h3>
                  <p> minion </p>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </section>
    
      <section>
        <Container className={classes.container}>
          <h1> faça já sua reserva. </h1>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="name" label="seu nome" />
            <TextField id="email" label="seu email" />
          </form>
        </Container>
      </section>
    </div>
  );
}