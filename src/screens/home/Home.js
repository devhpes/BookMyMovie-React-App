import React from "react";
import Movies from "../movies/Movies";
import Showcase from "../showcase/Showcase";

const Homepage = () => {
  return (
    <div>
      <div className="upcoming-movies">Upcoming movies</div>
      <Showcase />
      <Movies />
    </div>
  );
};

export default Homepage;
