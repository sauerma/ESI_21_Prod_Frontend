/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team production members
  // Julia Jillich, David Krieg, Evgeniya Puchkova, Max Sauer
  // Contact: jjilich@stud.hs-offenburg.de, dkrieg@stud.hs-offenburg.de,
  //          epuchkova@stud.hs-offenburg.de, www.maxsauer.com
  // File: Basis App
/*-----------------------------------------------------------------------*/

import React, {useEffect} from "react";
import clsx from 'clsx';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo_transp from './img/logo_transparent.png';
import Icon from '@material-ui/core/Icon';
import yourshirt_transp from './img/farbkreis_transparent.png';
import Footer from './footer'

// Import Pages
import MainPage from './components/MainPage';
import Planung from './components/Planung';
import Produktion from './components/Produktion';
import Material from './components/Material';
import Hilfebereich from './components/Hilfebereich';
import Einstellungen from './components/Einstellungen';


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

  activeTab:{
    "&$selected": {
      backgroundColor: "#90caf9",
      color: "white"
    },
    "&:hover": {
      backgroundColor: "#90caf9",
      color: "white"
    },
    "&$selected:hover": {
      backgroundColor: "#90caf9",
      color: "black"
    } 
},
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    color: '#fff6e5',
    backgroundColor: '#6b6969',
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
    color: '#fff6e5',
    backgroundColor: '#6b6969',
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
    color:'#fff6e5',
    backgroundColor:'#2e2e2e'
  },

  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  },
  selected: {}
}));


function App() {

  useEffect(() => {
    console.log("Sicherheitsprüfungs-Loop - Wenn Endlosschleife, dann in App.js prüfen.");
      
    if(window.location.href.endsWith(".com")){
      setSelectedIndex(0);
    }
    else if(window.location.href.endsWith("Planung")){

       setSelectedIndex(1);
     } 
     else if(window.location.href.endsWith("Produktion")){

      setSelectedIndex(2);
    } 
    else if(window.location.href.endsWith("Material")){

      setSelectedIndex(3);
    } 
    else if(window.location.href.endsWith("Hilfebereich")){

      setSelectedIndex(4);
    } 
    else if(window.location.href.endsWith("Einstellungen")){

      setSelectedIndex(5);
    } 
    }, []);

  const classes = useStyles();
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)};

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root} >
      <Router>
     <CssBaseline /> 
      <AppBar style={{ background: '#90caf9' }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
          <Footer>
      </Footer>
        <Toolbar>
          <IconButton
            style={{ color: '#121212'}}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <h2 style={{ color: '#121212'}}>Produktion</h2>
  
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

        <img height="50"  src={logo_transp} alt="Logo" onClick={(e) => {
            e.preventDefault();
            window.location.href='http://yourshirt.epizy.com/';
            }}/>

          <IconButton onClick={handleDrawerClose} style={{ color: '#fff6e5'}}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>

        </div>
        <Divider />

        <List >
        <ListItem  button component={Link} to="/" key="MainPage" className={classes.activeTab} selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
        >
            <ListItemIcon >
              <HomeIcon style={{fill: "#fff6e5"}} />
            </ListItemIcon >
            <ListItemText primary="Home" />   
         </ListItem>
         <ListItem button component={Link} to="/Planung" key="Planung" className={classes.activeTab} selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}>
            <ListItemIcon>
              <Event style={{fill: "#fff6e5"}}/>
            </ListItemIcon>
            <ListItemText primary="Planung" />   
         </ListItem>
         <ListItem button component={Link} to="/Produktion" key="Produktion" className={classes.activeTab} selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}>
            <ListItemIcon>
              <SettingsApplicationsIcon style={{fill: "#fff6e5"}}/>
            </ListItemIcon>
            <ListItemText primary="Produktion" />   
         </ListItem>
         <ListItem button component={Link} to="/Material" key="Material" className={classes.activeTab} selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3)}>
            <ListItemIcon>
              <ShoppingCartIcon style={{fill: "#fff6e5"}} />
            </ListItemIcon>
            <ListItemText primary="Material" />   
         </ListItem>
        </List>

        <List>
        <ListItem button component={Link} to="/Hilfebereich" key="Hilfebereich" className={classes.activeTab} selected={selectedIndex === 4}
          onClick={event => handleListItemClick(event, 4)}>
            <ListItemIcon>
              <HelpIcon style={{fill: "#fff6e5"}} />
            </ListItemIcon>
            <ListItemText primary="Hilfebereich" />   
         </ListItem>
        <ListItem button component={Link} to="/Einstellungen" key="Einstellungen" className={classes.activeTab} selected={selectedIndex === 5}
          onClick={event => handleListItemClick(event, 5)}>
            <ListItemIcon>
              <SettingsIcon style={{fill: "#fff6e5"}} />
            </ListItemIcon>
            <ListItemText primary="Einstellungen" />   
         </ListItem>     
        </List>  
        <Divider />
   
        <List>
       
        <ListItem button onClick={(e) => {
      e.preventDefault();
      window.location.href='http://yourshirt.epizy.com/';
      }}>
            <ListItemIcon>
              <Icon classes={{root: classes.iconRoot}}>
                <img className={classes.imageIcon} src={yourshirt_transp} alt="Icon"/>
          </Icon>
            </ListItemIcon>
            <ListItemText primary="YourShirt" />   
         </ListItem>  
      
        </List>
  
      </Drawer>
   
      <main className={classes.content} >
        <div className={classes.toolbar} />
        <Switch >
            <Route exact path="/" >
              <MainPage />
            </Route>
            <Route exact path="/Planung">
              <Planung />
            </Route>
            <Route exact path="/Produktion">
              <Produktion />
            </Route>
            <Route exact path="/Material">
              <Material />
            </Route>
            <Route exact path="/Hilfebereich">
              <Hilfebereich />
            </Route>
            <Route exact path="/Einstellungen">
              <Einstellungen />
            </Route>
          </Switch>
      </main>
      </Router>
    </div>
  );
}

export default App;