import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../../src/common/header/Header";
import BookShow from "./bookshow/BookShow";
import Details from "./moviedetails/Details";
import Home from "./home/Home";

const Controller = () => {

  return (
    <div>
      <Header/>
      <Router>
        <div>
          <Route exact path={["/", "/home"]}
          render={(props) => <Home {...props}></Home>}
          ></Route>
          <Route
            path="/details"
            render={(props) => <Details {...props} ></Details>}
          ></Route>
          <Route
            path="/bookshow"
            render={(props) => <BookShow {...props}></BookShow>}
          ></Route>
          </div>
      </Router>
    </div>
  );
};

export default Controller;
