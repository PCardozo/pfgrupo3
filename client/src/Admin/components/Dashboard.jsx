import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { mainListItems } from "./listItems";
import Chart from "./Chart";
import Inqueries from "./Inqueries";
import AdoptionPetitions from "./AdoptionPetitions";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Modal, Stack, Card } from "@mui/material";
import { UserCard } from "./UserTable";
import { AnimalCard } from "./AnimalTable";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  textAlign: "center",
  p: 4,
  borderRadius: "20px",
};

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  let notifications = useSelector((state) => state.petitions.notifications);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {}, [notifications]);

  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))?.data?.name
  );
  console.log(user);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <h2>Welcome {user}</h2>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Outlet />
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export function ModalAdmin({ item, setOpen, open }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onLoad={() => handleOpen(true)}
    >
      <Card
        sx={{
          width: "fit-content",
          height: "15em",
          zIndex: "2",
          borderRadius: "20px",
          justifyItems: "center",
        }}
      >
        <Paper>
          <Box sx={style}>
            {item.isImportant ? <PriorityHighIcon /> : null}
            <Stack direction={"row"}>
              <UserCard userDetail={item.user} setShow={setOpen} />
              {item.animal ? <AnimalCard animal={item.animal} /> : null}
            </Stack>
            <Stack sx={{ margin: "auto" }}>
              <Typography sx={{ margin: "auto" }}>
                <h3>Topic: </h3> {item.topic}
              </Typography>
              <Typography sx={{ margin: "auto" }}>
                <h3>Description: </h3> {item.description}
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Card>
    </Modal>
  );
}

export function DashboardLanding() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={8}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      <Grid item xs={24} md={12} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
            overflowY: "auto",
          }}
        >
          <Inqueries />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <AdoptionPetitions />
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
