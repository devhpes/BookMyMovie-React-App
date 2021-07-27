import React from "react";
import Movies from "../movies/Movies";
import Showcase from "../showcase/Showcase";
import Details from "../moviedetails/Details";


const Homepage = () => {

    return(
        <div>
            <Showcase/>
            <Movies/>
            <Details/>
        </div>
    )

}

export default Homepage;