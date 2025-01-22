import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import {logo} from "./data/data";
import AddList from "./AddList"; // Import AddList
// In Header.js
import { DashboardContext } from './Content'; // Case-sensitive and correct path



const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    [theme.breakpoints.up("sm")]: {
      zIndex: theme.zIndex.drawer + 1
    }
  },
  rightIcons: {
    marginLeft: theme.spacing(0.5)
  },
  spacer: {
    flexGrow: 1
  }
}));

export default function Header({
  handleDrawerToggle,
  toggleDarkMode,
  darkMode
}) {
  const { items, onRemoveItem, onAddItem, originalItems } = useContext(DashboardContext);
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar>
        {/*<IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
        >
          <MenuIcon />
       
        </IconButton>*/}
        <Button >
          <img src={logo} alt="NorthEcaps" width="100" height="25" className="logo-shadow"/>
        </Button>
        <Typography variant="h6" noWrap>
          Responsive Dashboard
        </Typography>
        <div className={classes.spacer} />
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDarkMode}
          edge="start"
          className={classes.rightIcons}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          className={classes.rightIcons}
        >
          {/* <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge> */}
        </IconButton>
        {originalItems && originalItems.length > 0 && (
         <IconButton
           color="inherit"
           aria-label="open drawer"
           edge="start"
         >
           <AddList 
             items={items} 
             onRemoveItem={onRemoveItem} 
             onAddItem={onAddItem} 
             originalItems={originalItems} 
           />
         </IconButton>
        )}
        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          className={classes.rightIcons}
        >
          <AccountCircleIcon />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
}
