import React from "react";
import { useFormFields } from "../libs/hooksLib";
import { API } from "aws-amplify"; // faz as chamadas da API
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Checkbox, Container, FormControl, Input, InputLabel, ListItemText, MenuItem, Select, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
    transition: "0.4s",
    '&:hover': {
      backgroundColor: "#F4F4F4",
      opacity: 1
    }
  },
  formControl: {
    margin: theme.spacing(1),
  },
  purchaseSubmit: {
    backgroundColor: "#0A75BC",
    color: "#FFFFFF",
    marginTop: "10px",
    transition: "0.3s",
    '&:hover': {
      backgroundColor: "#231F20"
    }
  }
}));

// Material UI properties
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const minionsNames = [
  'Stuart',
  'Kevin',
  'Bob',
  'Dave',
  'Phil',
  'Jerry',
];

export default function PurchaseForm() {
  const classes = useStyles();
  
  // hook: keeps input data
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    email: ""
  });
  
  // UseState é um React Hook q deixa usar state sem estar numa classe
  // from docs: useState returns a pair — an array with two items. 
  // The first item is the current value, and the second is a function that lets us update it.
  const [chosenMinion, setChosenMinion] = React.useState([]);
  
  const handleChange = event => {
    setChosenMinion(event.target.value);
  };

  function validateForm() {
    return fields.name.length > 0 && fields.email.length > 0 && chosenMinion.length > 0;
  }
  
  async function sendMailPurchase(body) {
    await API.post("purchases", "/mail", { body: {
       clientMail: body.email,
       clientName: body.name,
       content: body.minions
    }});
  }
  
  async function handleSubmit(event) {
    event.preventDefault(); // ????
    const body = {
      name: fields.name,
      email: fields.email,
      minions: chosenMinion
    }
    // chama a api 
    await API.post("purchases", "/purchases", { body: body
    }).then(response => {
      console.log(response);
      sendMailPurchase(body);
      alert("minion purchased!");
    }).catch(error => {
      alert(error.response)
    });
  }
  
  return (
    <section id="purchase">
      <Container className={classes.container}>
        <h1> faça já sua reserva. </h1>
        <div className={classes.root}>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField id="name" label="seu nome" value={fields.name} onChange={handleFieldChange} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField id="email" label="seu email" type="email" value={fields.email} onChange={handleFieldChange} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="minions-label">minions que eu quero:</InputLabel>
                  <Select
                    labelId="minions-label"
                    id="minions"
                    autoWidth
                    multiple
                    value={chosenMinion}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {minionsNames.map(name => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={chosenMinion.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button disabled={!validateForm()} className={classes.purchaseSubmit} variant="contained" type="submit">reservar</Button>
          </form>
        </div>
      </Container>
    </section>
  );
}