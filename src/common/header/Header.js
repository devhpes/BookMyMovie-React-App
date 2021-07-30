import React, { useState, useEffect } from "react";
import "../header/Header.css";
import Button from "@material-ui/core/Button";
import logo from "../../assets/logo.svg";
import Modal from "react-modal";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
};

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

const styles = (theme) => ({
  Paper: {
    borderRadius: 5,
    padding: 5,
    border: "0.1px solid 	#D3D3D3",
  },
});

Modal.setAppElement(document.getElementById("root"));

const Header = (props) => {
  const { classes } = props;

  const [value, setValue] = useState(0);

  const history = useHistory();

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setErrorForUsername(false);
    setErrorForPassword(false);
    setErrorForFirstName(false);
    setErrorForLastName(false);
    setErrorForEmail(false);
    setErrorForRegPassword(false);
    setErrorForContact(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [regpassword, setRegPassword] = useState("");
  const [contact, setContact] = useState("");

  const [registrationSucces, setRegistrationSucces] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const [requiredUsername, setErrorForUsername] = useState(false);
  const [requiredPassword, setErrorForPassword] = useState(false);
  const [requiredFirstName, setErrorForFirstName] = useState(false);
  const [requiredLastName, setErrorForLastName] = useState(false);
  const [requiredEmail, setErrorForEmail] = useState(false);
  const [requiredRegPassword, setErrorForRegPassword] = useState(false);
  const [requiredContact, setErrorForContact] = useState(false);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = (e) => {
    if (e) e.preventDefault();

    if (username === "" || password === "") {
      setErrorForUsername(true);
      setErrorForPassword(true);
    } else {
      setErrorForUsername(false);
      setErrorForPassword(false);
    }

    const encodeUsernameAndPassword = window.btoa(`${username}:${password}`);

    fetch("http://localhost:8085/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json;Charset=UTF-8",
        Authorization: `Basic ${encodeUsernameAndPassword}`,
      },
    }).then((response) => {
      if (response.ok) {
        setLoggedIn(true);
        sessionStorage.setItem(
          "access-token",
          response.headers.get("access-token")
        );
        // Setting timeout to hold login screen for 1sec
        setTimeout(() => {
          closeModal();
        }, 1000);
      } else {
        (error) => {
          setError(error);
        };
      }
    });
  };

  const firstNameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameChangeHandler = (e) => {
    setLastName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const regPasswordChangeHandler = (e) => {
    setRegPassword(e.target.value);
  };

  const contactChangeHandler = (e) => {
    setContact(e.target.value);
  };

  const registerHandler = (e) => {
    if (e) e.preventDefault();

    firstname === "" ? setErrorForFirstName(true) : setErrorForFirstName(false);
    lastname === "" ? setErrorForLastName(true) : setErrorForLastName(false);
    email === "" ? setErrorForEmail(true) : setErrorForEmail(false);
    regpassword === ""
      ? setErrorForRegPassword(true)
      : setErrorForRegPassword(false);
    contact === "" ? setErrorForContact(true) : setErrorForContact(false);

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        first_name: firstname,
        last_name: lastname,
        mobile_number: contact,
        password: regpassword,
      }),
    };

    fetch("http://localhost:8085/api/v1/signup", requestOptions).then(
      (response) => {
        if (response.ok) {
          setRegistrationSucces(true);
        } else {
          (error) => {
            setError(error);
          };
        }
      }
    );
  };

  useEffect(() => {
    loginHandler();
    registerHandler();
  }, []);

  const logoutHandler = (e) => {
    sessionStorage.removeItem("CurrentUser");
    sessionStorage.removeItem("access-token");
    //console.log(history.push("/"))
    setLoggedIn({
      loggedIn: false,
    });
    //Just a hack
    window.location.reload();
  };

  return (
    <div>
      <header className="header">
        <img src={logo} className="logo" alt="Movies App Logo" />
        {!loggedIn ? (
          <div className="topnav-right">
            <Button variant="contained" color="default" onClick={openModal}>
              Login
            </Button>
          </div>
        ) : (
          <div className="topnav-right">
            <Button variant="contained" color="default" onClick={logoutHandler}>
              Logout
            </Button>
          </div>
        )}
        .
      </header>

      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Login"
        aria-labelledby="Modal"
        aria-describedby="Modal for Login and Registration"
        style={customStyles}
      >
        <Paper className={classes.Paper}>
          <CardContent>
            <Tabs value={value} onChange={handleTabChange} centered>
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
            {value === 0 && (
              <TabContainer>
                <br />
                <form onSubmit={loginHandler} noValidate className="form">
                  <FormControl required>
                    <InputLabel
                      htmlFor="username"
                      className={classes.inputLable}
                    >
                      Username
                    </InputLabel>
                    <Input
                      className={classes.Input}
                      id="username"
                      type="text"
                      username={username}
                      onChange={usernameChangeHandler}
                    />
                    {requiredUsername === true && (
                      <FormHelperText>
                        <span className="red">required</span>
                      </FormHelperText>
                    )}
                  </FormControl>

                  <br />
                  <br />

                  <FormControl required>
                    <InputLabel
                      htmlFor="loginPassword"
                      className={classes.inputLable}
                    >
                      Password
                    </InputLabel>
                    <Input
                      className={classes.Input}
                      id="loginPassword"
                      type="password"
                      password={password}
                      onChange={passwordChangeHandler}
                    />
                    {requiredPassword === true && (
                      <FormHelperText>
                        <span className="red">required</span>
                      </FormHelperText>
                    )}
                  </FormControl>
                  <br />
                  <br />

                  {loggedIn === true && (
                    <FormControl>
                      <span className="registrationSuccess">
                        Login Successful!
                      </span>
                    </FormControl>
                  )}

                  <br />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={loginHandler}
                  >
                    LOGIN
                  </Button>
                </form>
              </TabContainer>
            )}

            {value === 1 && (
              <TabContainer>
                <br />
                <form onSubmit={registerHandler} noValidate>
                  <FormControl required>
                    <InputLabel
                      htmlFor="firstname"
                      className={classes.inputLable}
                    >
                      First Name
                    </InputLabel>
                    <Input
                      className={classes.Input}
                      id="firstname"
                      type="text"
                      firstname={firstname}
                      onChange={firstNameChangeHandler}
                    />
                    {requiredFirstName === true && (
                      <FormHelperText>
                        <span className="red">required</span>
                      </FormHelperText>
                    )}
                  </FormControl>
                  <br />

                  <FormControl required>
                    <InputLabel
                      htmlFor="lastname"
                      className={classes.inputLable}
                    >
                      Last Name
                    </InputLabel>
                    <Input
                      className={classes.Input}
                      id="lastname"
                      type="text"
                      lastname={lastname}
                      onChange={lastNameChangeHandler}
                    />
                    {requiredLastName === true && (
                      <FormHelperText>
                        <span className="red">required</span>
                      </FormHelperText>
                    )}
                  </FormControl>
                  <br />

                  <FormControl required>
                    <InputLabel htmlFor="email" className={classes.inputLable}>
                      Email
                    </InputLabel>
                    <Input
                      className={classes.Input}
                      id="email"
                      type="text"
                      email={email}
                      onChange={emailChangeHandler}
                    />
                    {requiredEmail === true && (
                      <FormHelperText>
                        <span className="red">required</span>
                      </FormHelperText>
                    )}
                  </FormControl>
                  <br />

                  <FormControl required>
                    <InputLabel
                      htmlFor="registerPassword"
                      className={classes.inputLable}
                    >
                      Password
                    </InputLabel>
                    <Input
                      className={classes.Input}
                      id="registerPassword"
                      type="password"
                      regpassword={regpassword}
                      onChange={regPasswordChangeHandler}
                    />
                    {requiredRegPassword === true && (
                      <FormHelperText>
                        <span className="red">required</span>
                      </FormHelperText>
                    )}
                  </FormControl>
                  <br />

                  <FormControl required>
                    <InputLabel
                      htmlFor="contact"
                      className={classes.inputLable}
                    >
                      Contact No.
                    </InputLabel>
                    <Input
                      className={classes.Input}
                      id="contact"
                      type="text"
                      contact={contact}
                      onChange={contactChangeHandler}
                    />
                    {requiredContact === true && (
                      <FormHelperText>
                        <span className="red">required</span>
                      </FormHelperText>
                    )}
                  </FormControl>
                  <br />

                  {registrationSucces === true && (
                    <FormControl>
                      <span className="registrationSuccess">
                        Registration Successful. Please Login!
                      </span>
                    </FormControl>
                  )}
                  <br />
                  <br />

                  <Button type="submit" variant="contained" color="primary">
                    REGISTER
                  </Button>
                </form>
              </TabContainer>
            )}
          </CardContent>
        </Paper>
      </Modal>
    </div>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(Header);
