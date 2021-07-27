import React from "react";
import Header from "../../common/header/Header";
import Movies from "../movies/Movies";
import Showcase from "../showcase/Showcase";
import Details from "../moviedetails/Details";


const Homepage = () => {

    return(
        <div>
            <Header/>
            <Showcase/>
            <Movies/>
            <Details/>
        </div>
    )

}

export default Homepage;