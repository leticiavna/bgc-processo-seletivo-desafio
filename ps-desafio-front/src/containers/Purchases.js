import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { API } from "aws-amplify"; // faz as chamadas da API

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Purchases(props) {
  
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const classes = useStyles();
  
  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
    
      try {
        const purchases = await getPurchases();
        setPurchases(purchases);
      } catch (e) {
        alert(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [props.isAuthenticated]);


  function getPurchases() {
    return API.get("purchases", "/purchases");
  }
  
  return (
    <div className="">
      <Container>
        <section>
          <h1> histórico de reservas </h1>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table of purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Minions</TableCell>
                  <TableCell align="right">Nome</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Data da reserva</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                 {purchases.map(row => (
                  <TableRow key={row.purchaseId}>
                  <TableCell component="th" scope="row"> 
                      {row.minions.map(a => " "+a.toString()).toString()}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{new Date(row.createdAt).toLocaleString()}</TableCell>
                  </TableRow> ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </Container>
    </div>
  );
}