import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button, } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import { Dashboard } from '@material-ui/icons';

import Dashboard from './Dashboard';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function App() {

  const classes = useStyles();


  return (
    <div className="App">

      <Dashboard />

      {/* <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            NTD Ingredientes
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar> */}

    </div>
  );
}

export default App;
