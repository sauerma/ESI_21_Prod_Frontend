import './Style/Material.css';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import MatBestellTable from './Material/MatBestellTable.js';
import ShirtTable from './Material/ShirtTable.js';
import ColorTable from './Material/ColorTable.js';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
 
 /*    fixedHeight: {
      minHeight: 240
    }, */
  }));

  const Material = () => {

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.fixedHeight);
    return (
     
        <div style={{ padding: '0px'}}>
            <Typography paragraph>
            Materialmanagement
            </Typography>
        
        <main >
   <div /> 

     <Grid container spacing={2}>
       {/* MatBestellTable */}
       <Grid item xs={12} md={8} lg={10}>
        
           <MatBestellTable />
      
       </Grid>
       {/* ShirtTable */}
       <Grid item xs={7} md={6} lg={6}>
         <Paper className={fixedHeightPaper}>
           <ShirtTable />
         </Paper>
       </Grid>
       {/* ColorTable */}
       <Grid item xs={7} md={6}>
         <Paper className={fixedHeightPaper}>
           <ColorTable />
         </Paper>
       </Grid>
     </Grid>

 </main>
     </div>
    )
}

export default Material