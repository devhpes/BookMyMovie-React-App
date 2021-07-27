import React, { useState, useEffect } from "react";
import "../showcase/Showcase.css"
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
});

const Showcase = (props) => {
  const { classes } = props;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8085/api/v1/movies?status=PUBLISHED", {
      mode: "no-cors",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.movies);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading, Please wait...</div>;
  } else {
    return (
      <div>
        <div className="upcoming-movies">Upcoming movies</div>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={6} cellHeight={250}>
            {items.map((movies) => (
              <GridListTile key={movies.id}>
                <img src={movies.poster_url} alt={movies.title} />
                <GridListTileBar title={movies.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
};


export default withStyles(styles)(Showcase);
