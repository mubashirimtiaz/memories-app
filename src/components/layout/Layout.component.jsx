import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
// import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { useHistory, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar.component";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  active: {
    background: "#FAFAFA",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
    paddingLeft: 10,
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const menuItems = [
    {
      text: "Memories",
      icon: <SubjectOutlined color="secondary" />,
      path: "/posts",
    },
    {
      text: "Create Memory",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];
  const handleDrawerOpen = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(!state);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar handleDrawerOpen={handleDrawerOpen} open={state} />
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={state}
        onClose={handleDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          className={`bg-gray-50 ${classes.drawerHeader}`}
          role="presentation"
          onClick={handleDrawerOpen}
          onKeyDown={handleDrawerOpen}
        >
          {/* <Typography variant="h5" component="h1" color="secondary" noWrap>
            Ninja Memories
          </Typography> */}
          <div className="my-2">
            <img src="/memory.svg" alt="memory" />
          </div>
          <IconButton onClick={handleDrawerOpen}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={(event) => {
                history.push(item.path);
                handleDrawerOpen(event);
              }}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={clsx(classes.content, classes.contentShift)}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
}
