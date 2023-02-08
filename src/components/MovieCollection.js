import { Link } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import Rating from "@material-ui/lab/Rating";
import "./MovieCollection.css";
const MovieCollection = ({ movieCollection, endDataIndex, startDataIndex }) => {
  return (
    <Box className="movies">
      <Grid container className="grid">
        {movieCollection.slice(startDataIndex, endDataIndex).map((movie) => {
          return (
            <Grid
              item
              xs={12}
              md={4}
              sm={6}
              lg={3}
              key={movie.original_title}
              style={{ padding: "5px" }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    style={{
                      width: "100%",
                      height: "250px"
                    }}
                  />
                </Grid>
                <Grid item xs={12} className="cardDetail">
                  <span>
                    <p>{movie.original_title}</p>
                    <Rating
                      name="disabled"
                      value={movie.vote_average - 5}
                      disabled
                    />
                  </span>
                  <span>
                    <Link to={`/video/${movie.id}`}>
                      <img src="https://github.com/GouthamParthi/cinema-image/blob/main/Vector.png?raw=true" />
                    </Link>
                  </span>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MovieCollection;
