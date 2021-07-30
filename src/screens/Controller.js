import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../../src/common/header/Header";
import BookShow from "./bookshow/BookShow";
import Details from "./moviedetails/Details";
import Home from "./home/Home";
import { useHistory } from "react-router-dom";

const Controller = () => {

  return (
    <div>
      <Header />
      <Router history={useHistory}>
      <Switch>
        <div>
          <Route exact path={["/", "/home"]} component={Home}>
          </Route>
          <Route
            path="/details"
            render={(props) => <Details {...props}></Details>}
          ></Route>
          <Route
            path="/bookshow"
            render={(props) => <BookShow {...props}></BookShow>}
          ></Route>
          </div>
          </Switch>
      </Router>
    </div>
  );
};

export default Controller;
