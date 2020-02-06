import React from "react";
import MinionItem from './MinionItem';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    opacity: 0.8,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    transition: "0.4s",
    '&:hover': {
      backgroundColor: "#F4F4F4",
      opacity: 1
    }
  },
}));


export default function ChooseMinion() {
  const classes = useStyles();
  return (      
    <section id="choose">
      <Container>
        <h1> escolha o seu! </h1>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <MinionItem img="/images/stuart_transparent.png" altText="minion" title="Stuart" description=""  />
            <MinionItem img="/images/kevin_transparent.png" altText="minion" title="Kevin" description="minion legal no componente"  />
            <MinionItem img="/images/bob_transparent.png" altText="minion" title="Bob" description="minion legal no componente"  />
            <MinionItem img="/images/dave_transparent.png" altText="minion" title="Dave" description="minion legal no componente"  />
            <MinionItem img="/images/phil_transparent.png" altText="minion" title="Phil" description="minion legal no componente"  />
            <MinionItem img="/images/jerry_transparent.png" altText="minion" title="Jerry" description="minion legal no componente"  />
          </Grid>
        </div>
      </Container>
    </section>
  );
}
