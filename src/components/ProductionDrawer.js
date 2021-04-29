import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import Event from '@material-ui/icons/Event';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import './ProductionDrawer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    color: 'white',
    backgroundColor: 'gray',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
     
    }),
    color: 'white',
    backgroundColor: 'gray',
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root} >
     <CssBaseline /> 
      <AppBar style={{ background: '#66c3f2' }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="#00000"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <h2 style={{ color: 'black'}}>Produktion</h2>
  
        </Toolbar>
      </AppBar>
    
     
      <Drawer 
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider style={{ backgroundColor: 'white' }}/>
        <List >
        <ListItem button key="Home">
            <ListItemIcon >
              <HomeIcon style={{fill: "white"}} />
            </ListItemIcon >
            <ListItemText primary="Home" />   
         </ListItem>
         <ListItem button key="Planung">
            <ListItemIcon>
              <Event style={{fill: "white"}}/>
            </ListItemIcon>
            <ListItemText primary="Planung" />   
         </ListItem>
         <ListItem button key="Produktion">
            <ListItemIcon>
              <SettingsApplicationsIcon style={{fill: "white"}}/>
            </ListItemIcon>
            <ListItemText primary="Produktion" />   
         </ListItem>
         <ListItem button key="Material">
            <ListItemIcon>
              <ShoppingCartIcon style={{fill: "white"}} />
            </ListItemIcon>
            <ListItemText primary="Material" />   
         </ListItem>
        </List>

        <List>
        <ListItem button key="Hilfebereich">
            <ListItemIcon>
              <HelpIcon style={{fill: "white"}} />
            </ListItemIcon>
            <ListItemText primary="Hilfebereich" />   
         </ListItem>
        <ListItem button key="Einstellungen">
            <ListItemIcon>
              <SettingsIcon style={{fill: "white"}} />
            </ListItemIcon>
            <ListItemText primary="Einstellungen" />   
         </ListItem>     
        </List>

        <Divider />
      
      </Drawer>
   
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography>

        -- Startseite --

        </Typography>

        <Typography paragraph>     
       
                          
          - Auf der Startseite werden relevante Kennzahlen angezeigt. -- Auf Basis des Mockups implementieren. 
          - Idee: Liniendigramm -- Y-Achse: Anzahl der produzierten Artikel. -- X-Achse: Zeit  
          Weitere relevante Kennzahlen evenutell in KPI-Diagrammen: Produktionsauslastungsgrad, Produzierte Artikel letzter Tag/WocheMontag/Jahr,
          Produktionsvolumen, Produktionsausfälle, Produktionsmängel 

        </Typography>
          <img src="https://www.datapine.com/de/images/production-volume.png" alt="Beispielbild"/>
        <Typography paragraph>

        </Typography>
      </main>
    </div>
  );
}