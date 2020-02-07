import React from "react";
import "./Home.css";
import ChooseMinion from "./ChooseMinion";
import PurchaseForm from "./PurchaseForm.js";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';

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
    color: "#231F20",
    backgroundColor: "#FCE029"
  },
}));

export default function Home() {
  const classes = useStyles();
  
  return (
    <div className="Home container">
      <section className={classes.lander} id="lander">
        <Container>
          <h1>sempre quis ter um <b>minion</b>?</h1>
          <p>aqui na minions boutique você pode.</p>
          <p> é rápido, fácil e simples reservar o seu.</p>
          <Button variant="contained" className={classes.seeMore}> veja mais </Button>
        </Container>
      </section>
      <ChooseMinion />
      <PurchaseForm />
    </div>
  );
}