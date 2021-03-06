/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team production members
  // Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
  // Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
  //          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
  // File: Tab-Elemente
/*-----------------------------------------------------------------------*/

import React from 'react';
import { Typography, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArchiveIcon from '@material-ui/icons/Archive';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Box from '@material-ui/core/Box';

import Faerbung from './Faerbung.js';
import Druck from './Druck.js';
import ProduzierteAuft from'./ProduzierteAuft.js'; 

//Set style
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    textColor: "green",
    textAlign: 'center',
    color: theme.palette.text.secondary,

  },  
}));

//Change tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          TabIndicatorProps={{style: {backgroundColor: "#006064"}}}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example" >
          <Tab label="F??rbeauftr??ge" icon={<ColorLensIcon />} {...a11yProps(2)} />
          <Tab label="Druckauftr??ge" icon={<ArchiveIcon />} {...a11yProps(3)} />
          <Tab label= "Produzierte Auftr??ge" icon={<AssignmentTurnedInIcon />} {...a11yProps(4)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <div className={classes.root}>
          <Grid item xs={12}>
            <Faerbung/>
          </Grid>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className={classes.root}>
            <Grid item xs={12}>   
            <Druck/> 
            </Grid>
        </div> 
      </TabPanel> 

      <TabPanel value={value} index={2}>
        <div className={classes.root}>
          <Grid item xs={12}>      
            <ProduzierteAuft/>
          </Grid>
        </div> 
    </TabPanel> 
       
    </div>
)
}