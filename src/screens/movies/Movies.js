import React, { useState, useEffect } from "react";
import "../movies/Movies.css";
import { withStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Grid,
  FormControl,
  Checkbox,
  InputLabel,
  Card,
  CardContent,
  Button,
  Typography,
  Input,
  MenuItem,
  TextField,
  ListItemText,
} from "@material-ui/core";
import { Select } from "@material-ui/core";
import { useHistory } from "react-router";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
  },

  GridListTile: {
    width: "76%",
    margin: "16px",
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  formControl: {
    color: theme.palette.primary.light,
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240,
  },
  Typography: {
    color: theme.palette.primary.light,
  },
  gridMargin: {
    margin: "16px",
  },
});

const Movies = (props) => {
  const { classes } = props;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movies, setmovies] = useState([]);
  const [moviesList, setmoviesList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [releaseStartDate, setReleaseStartDate] = useState("");
  const [releaseEndDate, setReleaseEndDate] = useState("");
  const [genresList, setGenreslist] = useState([]);
  const [artistsList, setArtistsList] = useState([]);

  const URL = "http://localhost:8085/api/v1/";

  const releasedMovies = () => {
    fetch(`${URL}movies?status=RELEASED`, {
      mode: "no-cors",
      "Cache-Control": "no-cache",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setmoviesList(result.movies);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const movieGenres = () => {
    fetch(`${URL}genres`, {
      mode: "no-cors",
      "Cache-Control": "no-cache",
    })
      .then((res) => res.json())
      .then(
        (genres) => {
          setIsLoaded(true);
          setGenreslist(genres.genres);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const movieArtists = () => {
    fetch(`${URL}artists`, {
      mode: "no-cors",
      "Cache-Control": "no-cache",
    })
      .then((res) => res.json())
      .then(
        (artists) => {
          setIsLoaded(true);
          setArtistsList(artists.artists);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    releasedMovies();
    movieGenres();
    movieArtists();
  }, []);

  const movieNamehandler = (event) => {
    setmovies(event.target.value);
  };

  const genreSelectHandler = (event) => {
    setGenres(event.target.value);
  };

  const artistSelectHandler = (event) => {
    setArtists(event.target.value);
  };

  const releaseDateHandler = (event) => {
    setReleaseStartDate(event.target.value);
  };

  const releaseEndDateHandler = (event) => {
    setReleaseEndDate(event.target.value);
  };

  const history = useHistory();
  const openDetailsPage = (movies) => {
    history.push("/details", { details: movies });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading, Please wait...</div>;
  } else {
    return (
      <div className={classes.flexContainer}>
        <Grid item xs={9}>
          <GridList cols={4} cellHeight={350}>
            {moviesList.map((movies) => (
              <GridListTile
                key={movies.id}
                className={classes.GridListTile}
                cols={1}
                onClick={() => openDetailsPage(movies)}
              >
                <img
                  src={movies.poster_url}
                  alt={movies.title}
                  style={{ cursor: "pointer" }}
                />
                <GridListTileBar
                  title={movies.title}
                  subtitle={
                    <span>
                      Released Date:
                      {new Date(movies.release_date).toDateString()}
                    </span>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </Grid>

        <Grid item xs={3}>
          <Card variant="outlined" className={classes.gridMargin}>
            <CardContent>
              <FormControl className={classes.formControl}>
                <Typography
                  className={classes.Typography}
                  color="textSecondary"
                >
                  FIND MOVIES BY:
                </Typography>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                <Input id="movieName" onChange={movieNamehandler} />
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="genreCheckbox">Genres</InputLabel>
                <Select
                  input={<Input id="genreCheckbox" />}
                  value={genres}
                  onChange={genreSelectHandler}
                >
                  {genresList.map((genre) => (
                    <MenuItem
                      key={genre.id}
                      value={genre.genre}
                      insetChildren={true}
                    >
                      <Checkbox />
                      {genres.indexOf(genre.genre) > -1}
                      <ListItemText primary={genre.genre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="artistsCheckbox">Artists</InputLabel>
                <Select
                  multiple={true}
                  input={<Input id="artistsCheckbox" />}
                  value={artists}
                  onChange={artistSelectHandler}
                >
                  {artistsList.map((artist) => (
                    <MenuItem
                      key={artist.id}
                      value={artists.first_name + " " + artist.last_name}
                    >
                      <Checkbox
                        value={artist.first_name + " " + artist.last_name > -1}
                      />
                      <ListItemText
                        primary={artist.first_name + " " + artist.last_name}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  id="releaseDateStart"
                  label="Release Start Date"
                  type="date"
                  defaultValue={releaseStartDate}
                  InputLabelProps={{ shrink: true }}
                  onChange={releaseDateHandler}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  id="releaseDateEnd"
                  label="Release End Date"
                  type="date"
                  defaultValue={releaseEndDate}
                  InputLabelProps={{ shrink: true }}
                  onChange={releaseEndDateHandler}
                />
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControl}>
                <Button
                  variant="contained"
                  color="primary"
                  //onClick={filterHandler}
                >
                  APPLY
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
};

export default withStyles(styles)(Movies);
