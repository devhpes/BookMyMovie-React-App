import React, { useState, useEffect } from "react";
import "./Details.css";
import Header from "../../common/header/Header";
import {
  withStyles,
  Typography,
  Grid,
  GridListTile,
  GridListTileBar,
  GridList,
} from "@material-ui/core/";
import { Link, BrowserRouter } from "react-router-dom";
import YouTube from "react-youtube";
import { Rating } from "@material-ui/lab/";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const styles = () => ({
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "left",
  },
  leftDetails: {
    width: "20%",
    textAlign: "center",
  },
  middleDetails: {
    width: "60%",
  },
  rightDetails: {
    width: "20%",
  },
});

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const StyledRating = withStyles({
  icon: {
    color: "black",
  },
  iconFilled: {
    color: "yellow",
  },
  iconHover: {
    color: "yellow",
  },
})(Rating);

const Details = (props) => {
  
  const { classes } = props;

  const [movies, setmovies] = useState({
    genres: "",
    artist: "",
    trailer_url: "",
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const URL = "http://localhost:8085/api/v1/";

  const Movies = () => {
    fetch(`${URL}movies/009ae262-a234-11e8-b475-720006ceb890`, {
      mode: "no-cors",
      "Cache-Control": "no-cache",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setmovies(result);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    Movies();
  }, []);

  const artistClickHandler = (url) => {
    window.location = url;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading, Please wait...</div>;
  } else {
    return (
      <div>
        <div className="details">
          <div className="back">
            <Typography>
              <BrowserRouter>
                <Link to="/"> &#60; Back to Home</Link>
              </BrowserRouter>
            </Typography>
          </div>

          <div className="flex-container">
            <Grid item xs={2}>
              <div className={classes.leftDetails}>
                <img src={movies.poster_url} alt={movies.title} />
              </div>
            </Grid>

            <Grid item xs={7} className={classes.middleDetails}>
              <div className="marginTop">
                <div>
                  <Typography variant="headline" component="h2">
                    {movies.title}
                  </Typography>
                </div>
                <br />
                <div>
                  <Typography>
                    <span className="bold">Genres: </span>
                    {movies.genres}
                  </Typography>
                </div>
                <div>
                  <Typography>
                    <span className="bold">Duration:</span> {movies.duration}
                  </Typography>
                </div>
                <div>
                  <Typography>
                    <span className="bold">Release Date:</span>
                    {new Date(movies.release_date).toDateString()}
                  </Typography>
                </div>
                <div>
                  <Typography>
                    <span className="bold"> Rating:</span> {movies.rating}
                  </Typography>
                </div>
                <div className="marginTop">
                  <Typography>
                    <span className="bold">Plot:</span>{" "}
                    <a href={movies.wiki_url} target="_blank">
                      (Wiki Link)
                    </a>
                    {movies.storyline}
                  </Typography>
                </div>
                <div className="trailerContainer">
                  <Typography>
                    <span className="bold">Trailer:</span>
                  </Typography>
                  <YouTube
                    //react-youtube
                    videoId={movies.trailer_url.split("?v=")[1]}
                    opts={opts}
                    onReady={this._onReady}
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={2} className={classes.rightDetails}>
              <div>
                <Typography>
                  <span className="bold">Rate this movies: </span>
                </Typography>
                <StyledRating
                  name="customized-color"
                  defaultValue={0}
                  getLabelText={(value) =>
                    `${value} Heart${value !== 1 ? "s" : ""}`
                  }
                  precision={1.0}
                  icon={<StarBorderIcon color="black" fontSize="inherit" />}
                />

                <div className="bold marginBottom marginTop">
                  <Typography>
                    <span className="bold">Artists:</span>
                  </Typography>
                </div>
                <div className="paddingRight">
                  <GridList cellHeight={160} cols={2}>
                    {movies.artists != null &&
                      movies.artists.map((artist) => (
                        <GridListTile
                          className="gridTile"
                          onClick={() => artistClickHandler(artist.wiki_url)}
                          key={artist.id}
                        >
                          <img
                            src={artist.profile_url}
                            alt={artist.first_name + " " + artist.last_name}
                          />
                          <GridListTileBar
                            title={artist.first_name + " " + artist.last_name}
                          />
                        </GridListTile>
                      ))}
                  </GridList>
                </div>
              </div>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
};

export default withStyles(styles)(Details);
