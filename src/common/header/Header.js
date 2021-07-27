import React, { useState, useEffect } from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import logo from "../../assets/logo.svg";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";

const styles = (theme) => ({
  Container: {
    display: "flex",
    flexWrap: "wrap",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
  },
  Input: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
  },
  Button: {
    marginTop: "50px",
  },
  inputLable: {
    marginLeft: "8px",
    marginTop: "12px",
  },
});

const Header = (props) => {
  const { classes } = props;

  const [value, setValue] = useState(0);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [contact, setContact] = useState("");

  const [registrationSucces, setRegistrationSucces] = useState(false);

  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("access-token") == null ? false : true
  );

  const handleTabChange = (newValue) => {
    setValue({ newValue });
  };

  const loginHandler = () => {
    const encodeUsernameAndPassword = window.btoa(`${username}:${password}`);
    console.log(encodeUsernameAndPassword);

    fetch("http://localhost:8085/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json;Charset=UTF-8",
        Authorization: `Basic ${encodeUsernameAndPassword}`,
      },
    })
      .then((res) => res.json())
      .then(
        (response) => {
          setLoggedIn(response)
        },
        (error) => {
          setError(error);
        }
      );
  };

  const usernameChangeHandler = (e) => {
    setUsername({ username: e.target.value });
  };

  const passwordChangeHandler = (e) => {
    setPassword({ password: e.target.value });
  };

  const registerHandler = () => {

    fetch("http://localhost:8085/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json;Charset=UTF-8",
        Accept: "application/json;Charset=UTF-8",
        body: JSON.stringify({
          email_address: email,
          first_name: firstname,
          last_name: lastname,
          mobile_number: contact,
          password: regPassword,
        }),
      },
    })
      .then((res) => res.json())
      .then(
        (response) => {
          setRegistrationSucces(response);
        },
        (error) => {
          setError(error);
        }
      );
  };

  useEffect(() => {
    loginHandler();
    registerHandler();
  }, []);

  const firstNameChangeHandler = (e) => {
    setFirstName({ firstname: e.target.value });
  };

  const lastNameChangeHandler = (e) => {
    setLastName({ lastname: e.target.value });
  };

  const emailChangeHandler = (e) => {
    setEmail({ email: e.target.value });
  };

  const regPasswordChangeHandler = (e) => {
    setRegPassword({ regPassword: e.target.value });
  };

  const contactChangeHandler = (e) => {
    setContact({ contact: e.target.value });
  };

  const logoutHandler = (e) => {
    sessionStorage.removeItem("uuid");
    sessionStorage.removeItem("access-token");

    setLoggedIn({
      loggedIn: false,
    });
  };

  return (
    <div>
      <div className="topnav">
        <img src={logo} className="logo" alt="Movies App Logo" />
        <div className="topnav-right">
          <Button variant="contained" color="default" onClick={handleOpen}>
            Login
          </Button>
        </div>

        <div className="topnav-right">
          <Button variant="contained" color="default" onClick={logoutHandler}>
            Logout
          </Button>
        </div>
      </div>

      <Modal
       open={open}
        ariaHideApp={false}
        contentLabel="Login"
        className={classes.Container}
        aria-labelledby="Modal"
        aria-describedby="Modal for Login and Registration"
      >
        <DialogContent>
          <Paper>
            <CardContent>
              <Tabs value={value} onChange={handleTabChange} centered>
                <Tab label="Login" />
                <Tab label="Register" />
              </Tabs>

              {value === 0 && (
                <div>
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
                    <FormHelperText>
                      <span className="red">required</span>
                    </FormHelperText>
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
                      regPassword={regPassword}
                      onChange={passwordChangeHandler}
                    />
                    <FormHelperText>
                      <span className="red">required</span>
                    </FormHelperText>
                  </FormControl>
                  <br />
                  <br />
                  {loggedIn === true && (
                    <FormControl>
                      <span className="success-text">Login Successful!</span>
                    </FormControl>
                  )}

                  <br />
                  <br />

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={loginHandler}
                  >
                    LOGIN
                  </Button>
                </div>
              )}

              {value === 1 && (
                <div>
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
                    <FormHelperText>
                      <span className="red">required</span>
                    </FormHelperText>
                  </FormControl>

                  <br />
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
                    <FormHelperText>
                      <span className="red">required</span>
                    </FormHelperText>
                  </FormControl>
                  <br />
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
                    <FormHelperText>
                      <span className="red">required</span>
                    </FormHelperText>
                  </FormControl>
                  <br />
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
                      regpassword={regPassword}
                      onChange={regPasswordChangeHandler}
                    />
                    <FormHelperText>
                      <span className="red">required</span>
                    </FormHelperText>
                  </FormControl>
                  <br />
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
                    <FormHelperText>
                      <span className="red">required</span>
                    </FormHelperText>
                  </FormControl>
                  <br />
                  <br />
                  {registrationSucces === true && (
                    <FormControl>
                      <span className="success">
                        Registration Successful. Please Login!
                      </span>
                    </FormControl>
                  )}
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={registerHandler}
                  >
                    REGISTER
                  </Button>
                </div>
              )}
            </CardContent>
          </Paper>
        </DialogContent>
      </Modal>
    </div>
  );
};

export default withStyles(styles)(Header);
