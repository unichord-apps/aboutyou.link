import React, { useState, useEffect } from "react";
import { useUser } from "../hooks";
import {
  Button,
  CircularProgress,
  TextField,
  Toolbar,
  AppBar,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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

export default function Profile() {
  const classes = useStyles();
  const { users, logout, createLink } = useUser();
  const [userData, setUserData] = useState();
  const [newLinkData, setNewLinkData] = useState({});
  const [showNewLink, setShowNewLink] = useState(false);

  function handleChangeFormField(e) {
    const tempUserData = newLinkData;
    newLinkData[e.target.name] = e.target.value;
    setNewLinkData(tempUserData);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    createLink(newLinkData).then(() => {
      getLinks();
    });
  }

  function getLinks() {
    users().then((res) => {
      setUserData(res.data.user);
    });
  }

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div />
            <Typography variant="h6" className={classes.title}>
              AboutYou
            </Typography>
            <Button onClick={logout} color="inherit">
              logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Box pt={1} px={2}>
        {userData ? (
          <div>
            <Grid container>
              <Grid item>
                <Box
                  alignContent={"center"}
                  bgcolor="white"
                  py={2}
                  px={4}
                  borderRadius={16}
                >
                  <Typography variant="h4">
                    <AccountCircleIcon color="primary" fontSize={"large"} />
                    {userData.username}
                  </Typography>
                  <Typography gutterBottom>{userData.bio}</Typography>
                  <Typography variant="body2">email: {userData.email}</Typography>
                  <Typography variant="body2">
                    {" "}
                    joined {new Date(userData.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid container justifyContent="center">
              <Grid item>
                <Box alignContent={"center"} bgcolor="white" borderRadius={16} p={1}>
                  <Typography variant="caption">links</Typography>
                  <Box py={1} px={3}>
                    {userData.links.map((link) => (
                      <div key={link._id}>
                        <a href={link.link}>{link.name}</a> - {link.description}
                      </div>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <br />

            <Button onClick={() => setShowNewLink(!showNewLink)}>Add New Link</Button>

            {showNewLink && (
              <div>
                <div>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Link Name"
                    name="name"
                    onChange={handleChangeFormField}
                  />
                </div>
                <div>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="description"
                    label="Link Description"
                    name="description"
                    onChange={handleChangeFormField}
                  />
                </div>
                <div>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="link"
                    label="Link Url"
                    name="link"
                    onChange={handleChangeFormField}
                  />
                </div>
                <div>
                  <Button onClick={handleSubmitForm}>submit</Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </div>
  );
}
