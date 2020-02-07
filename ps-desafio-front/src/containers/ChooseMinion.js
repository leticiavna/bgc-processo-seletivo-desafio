import React from "react";
import MinionItem from '../components/MinionItem';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center",
  },
  root: {
    flexGrow: 1,
  },
}));


export default function ChooseMinion() {
  const classes = useStyles();
  return (      
      <Container>
        <h1 className={classes.title}> escolha o seu! </h1>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <MinionItem img="/images/stuart_transparent.png" altText="Stuart, minion com apenas um olho, cabelo liso, repartido ao meio e magro." title="Stuart" description="Super sincero."  />
            <MinionItem img="/images/kevin_transparent.png" altText="Kevin, minion alto com dois olhos, uma pequena moita de cabelo e magro." title="Kevin" description="É um lider nato."  />
            <MinionItem img="/images/bob_transparent.png" altText="Bob, minion baixinho com dois olhos - um olho verde e outro castanho - careca e gordinho." title="Bob" description="Possui um bichinho de pelúcia (é tão fofinho!)."  />
            <MinionItem img="/images/dave_transparent.png" altText="Dave, minion de altura média com dois olhos, cabelo liso, repartido ao meio e magro." title="Dave" description="Ama foguetes e mísseis."  />
            <MinionItem img="/images/phil_transparent.png" altText="Phil, minion de altura média, com um olho, uma pequena moita de cabelo." title="Phil" description="Ri de qualquer coisa."  />
            <MinionItem img="/images/jerry_transparent.png" altText="Jerry, minion com dois olhos e cabelos espetados" title="Jerry" description="Brincalhão e alegre."  />
          </Grid>
        </div>
      </Container>
  );
}
