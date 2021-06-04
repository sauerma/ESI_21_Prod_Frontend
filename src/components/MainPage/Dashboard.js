/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team production members
  // Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
  // Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
  //          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
  // File: Dashboard Layout
/*-----------------------------------------------------------------------*/

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Auslastung from './Auslastung';
import Orders from './Orders';
import Fortschritt from './Fortschritt';
import PrivatKundenAnteil from './Privatkundenanteil';

//Set Style
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  container: {
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

          <Grid container spacing={2}>

            <Grid item xs={12} md={6} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Paper className={classes.paper} style={{  padding: 0, marginBottom: 3, flexDirection: "revert"}}>
                <Auslastung /> <h2>&nbsp; Auslastung</h2>
              </Paper>
              <Paper className={classes.paper} style={{  padding: 0, marginBottom: 3, flexDirection: "revert" }}>
                <Fortschritt /> <h2>&nbsp; Fortschritt</h2>
              </Paper>
              <Paper className={classes.paper} style={{  padding: 0, margin: 1, flexDirection: "revert" }}>
                <PrivatKundenAnteil /> <h2>&nbsp; Privatkunden</h2>
              </Paper>
            </Grid>  

            <Grid item xs={12} md={12}>
              <Paper className={classes.paper}>
                <Orders /> 
              </Paper>
            </Grid>

          </Grid>

        </Container>
      </main>
    </div>
  );
}