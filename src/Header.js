/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  AppBar,
  Container,
  makeStyles,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import logo from "./dollar.png";
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import { Link } from "react-router-dom";
const clientId =
  "442049684509-e79a22cfj7md87kfbgjk6ae3ogehgfv9.apps.googleusercontent.com";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "black",
    fontFamily: "Poppins",
    fontWeight: "bold",
    cursor: "pointer",
  },
  logo: {
    marginRight: 20,
    maxWidth: 40,
    transition: "transform 0.3s ease-in-out",
  },
  logoHover: {
    transform: "rotate(720deg)",
  },
  root: {
    background: "gold",
    border: 0,
    borderRadius: 10,
    color: "black",
    height: 38,
    padding: "0 30px",
    fontFamily: "Poppins",
    fontWeight: "600",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.55)",
    marginBottom: "20px",
  },
  headerstyle: {
    background: "#F5F5F5",
    color: "white",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.55)", // add shadow
    borderRadius: "0 0 25px 25px", // add curved style to the bottom
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    background: "gold",
    color: "black",
    fontFamily: "Poppins",
    fontWeight: "600",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.55)",
    borderRadius: 20,
    height: 38,
    width: "200px",
    padding: "0 20px",
    marginLeft: 20,
    transition: "background-color 0.3s ease-in-out",
    border: "none",
    "&:hover": {
      backgroundColor: "darkgoldenrod",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userState, setUserState] = useState({});
  useEffect(() => {
    function start() {
      gapi.client
        .init({
          clientId: clientId,
          scope: "",
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();

          setIsSignedIn(authInstance.isSignedIn.get());

          authInstance.isSignedIn.listen(setIsSignedIn);
        });
    }
    gapi.load("client:auth2", start);
  }, []);

  const handleLoginClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleLogoutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };
  return (
    <AppBar className={classes.headerstyle}>
      <Container>
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            className={`${classes.logo}`}
            onMouseEnter={(e) =>
              (e.currentTarget.className += ` ${classes.logoHover}`)
            }
            onMouseLeave={(e) => (e.currentTarget.className = classes.logo)}
          />
          <Typography className={classes.title} variant="h6">
            StockMan
          </Typography>
          {isSignedIn ? (
            <>
              <LogoutButton onClick={handleLogoutClick} func={setUserState} />{" "}
              <div className="profile1">
                <Link to={"/profile"}>
                  <img src={userState.imageUrl} className="profile-pic" />
                </Link>
                <Link to={"/profile"} target="_blank">
                  <p className="profile-name">{userState.name}</p>
                </Link>
              </div>
            </>
          ) : (
            <>
              <LoginButton onClick={handleLoginClick} func={setUserState} />
              {isSignedIn && console.log(userState)}
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
