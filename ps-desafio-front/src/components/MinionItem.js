import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
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


export default function MinionItem({
  title,
  img,
  description,
  altText,
  ...props
}) {
  const classes = useStyles();
  return (
      <Grid item xs={12} sm={4}>
        <div className={classes.paper}>
          <img src={img} alt={altText}/>
          <h3> {title} </h3>
          <p> {description} </p>
        </div>
      </Grid>
  );
}