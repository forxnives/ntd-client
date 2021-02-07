import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';



import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Dashboard from './Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as LinkRoute,
  withRouter 
} from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));



function App(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>

          </Typography>
          <IconButton color="inherit">
            {/* <Badge badgeContent={4} color="secondary"> */}
              {/* <NotificationsIcon /> */}
              <img src='https://www.ntdingredientes.com.jm/wp-content/uploads/2019/10/NTD-Ingredientes_Logoblanco150px.png' style={{width: 100 + 'px'}}></img>
            {/* </Badge> */}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Router>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>

        <div>
          <LinkRoute style={{ textDecoration: 'none', color: 'black' }} to="/dashboard">
            <ListItem button>
              <ListItemIcon>
                <Badge badgeContent={4} color="secondary">
                  <DashboardIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </LinkRoute>
          
          <LinkRoute style={{ textDecoration: 'none', color: 'black' }} to="/neworder">
            <ListItem button>
              <ListItemIcon>
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="New Order" />
            </ListItem>
          </LinkRoute>
          
          <LinkRoute style={{ textDecoration: 'none', color: 'black' }} to="/vieworders">
            <ListItem button>
              <ListItemIcon>
                <Badge badgeContent={0} color="secondary">
                  <BarChartIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="View Orders" />
            </ListItem>
          </LinkRoute>

          <LinkRoute style={{ textDecoration: 'none', color: 'black' }} to="/viewinvoices">
            <ListItem button>
              <ListItemIcon>
                <Badge badgeContent={0} color="secondary">
                  <LayersIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="View Invoices" />
            </ListItem>
          </LinkRoute>
        </div>

        </List>
        <Divider />
        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

      <div>

        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/neworder">
            <h1>New Order</h1>
          </Route>
          <Route path="/vieworders">
            <h1>View Orders</h1>
          </Route>
          <Route path="/viewinvoices">
            <h1>View Invoices</h1>
          </Route>
        </Switch>
      </div>

        <Box pt={4}>
          <Copyright />
        </Box>

      </main>

      </Router>
    </div>
  );
}

export default App