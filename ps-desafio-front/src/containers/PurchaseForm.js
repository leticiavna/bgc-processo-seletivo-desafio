import React from "react";
import { useFormFields } from "../libs/hooksLib";
import { API } from "aws-amplify"; // faz as chamadas da API
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Chip, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import LoaderButton from "../components/LoaderButton";

function getStyles(name, chosenMinion, theme) {
  return {
    fontWeight:
      chosenMinion.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 500,
      maxHeight: 1300,
    },
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
    minWidth: 120,
    marginBottom: "30px"
  },
  purchaseSubmit: {
    backgroundColor: "#0A75BC",
    color: "#FFFFFF",
    transition: "0.3s",
    '&:hover': {
      backgroundColor: "#231F20"
    }
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
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
  const [isLoading, setIsLoading] = React.useState(false);
  const theme = useTheme();
  
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
    event.preventDefault(); // ??
    setIsLoading(true);
    const body = {
      name: fields.name,
      email: fields.email,
      minions: chosenMinion
    };
    // chama a api 
    await API.post("purchases", "/purchases", { body: body
    }).then(response => {
      sendMailPurchase(body);
      alert("Reserva realizada com sucesso!");
      setIsLoading(false);
    }).catch(error => {
      alert(error.response);
      setIsLoading(false);
    });
  }

  return (
    <section id="purchase">
      <div>
        <h1> faça já sua reserva. </h1>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField id="name" label="seu nome" value={fields.name} onChange={handleFieldChange} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField id="email" label="seu email" type="email" value={fields.email} onChange={handleFieldChange} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel id="minions-label">minions que eu quero:</InputLabel>
                  <Select
                    labelId="minions-label"
                    id="minions"
                    multiple
                    value={chosenMinion}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={selected => (
                      <div className={classes.chips}>
                        {selected.map(value => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}
                    MenuProps={MenuProps}
                  >
                    {minionsNames.map(name => (
                      <MenuItem key={name} value={name} 
                      style={getStyles(name, chosenMinion, theme)}> {name} 
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <LoaderButton isLoading={isLoading} className={classes.purchaseSubmit} disabled={!validateForm()} variant="contained" type="submit">reservar</LoaderButton>
          </form>
        </div>
    </section>
  );
}