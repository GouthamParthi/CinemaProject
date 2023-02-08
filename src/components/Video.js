import Header from "./Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";
import { token } from "./token";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import "react-toastify/dist/ReactToastify.css";
import "./Video.css";
import Modal from "@mui/material/Modal";
const Video = () => {
  const tokenLocal = localStorage.getItem("token");
  const [movieVideo, setMovieVideo] = useState();
  const param = useParams();
  const [movieContent, setMovieContent] = useState();
  const youtube = "https://www.youtube.com/embed/";
  const vimeo = "https://vimeo.com/";
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchMovieDetails = async () => {
    try {
      const movies = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=025e2d8b1a2b665ad499bc1179bb0d38"
      );
      if (movies.status == 200) {
        const filteredMovie = movies.data.results.filter((movie) => {
          return movie.id == param.movieId;
        });
        setMovieContent(filteredMovie);
      } else {
        throw new Error("problem in fetchMovieColection");
      }
    } catch (e) {
      toast.error(e, { position: toast.POSITION.TOP_RIGHT });
    }
  };
  const fetchVideoForMovie = async () => {
    //try and catch implementation
    try {
      const movie = await axios.get(
        `https://api.themoviedb.org/3/movie/${param.movieId}/videos?api_key=025e2d8b1a2b665ad499bc1179bb0d38  `
      );
      if (movie.status == 200) {
        setMovieVideo(movie.data);
      } else {
        throw new Error("problem in fetchMovieColection");
      }
    } catch (e) {
      toast.error(e, { position: toast.POSITION.TOP_RIGHT });
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchVideoForMovie();
  }, []);
  return (
    <Box>
      {token == localStorage.getItem("token") ? (
        <>
          <Box>
            <Header
              fixedOrRelative="relative"
              token={localStorage.getItem("token")}
              hideSearchBox
            />
          </Box>
          {movieContent ? (
            <Box>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box style={{}}>
                  {movieVideo ? (
                    <iframe
                      width="92%"
                      height="80%"
                      src={
                        movieVideo.results[0].site == "YouTube"
                          ? `${youtube + movieVideo.results[0].key}`
                          : `${vimeo + movieVideo.results[0].key}`
                      }
                      style={{ position: "absolute", top: 0, left: 0 }}
                      allowFullScreen
                    ></iframe>
                  ) : null}
                </Box>
              </Modal>
              <Stack
                sx={{ flexDirection: { xs: "column", md: "row" } }}
                className="content"
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "30px"
                  }}
                >
                  <p className="title">{movieContent[0].original_title}</p>
                  <p className="rating">
                    Rating:{movieContent[0].vote_average}/10
                  </p>
                  <p className="overview">{movieContent[0].overview}</p>
                  <p className="release">
                    Release Date:{movieContent[0].release_date}
                  </p>
                  <p className="release">
                    OriginLanguage:
                    {movieContent[0].original_language[0].toUpperCase() +
                      movieContent[0].original_language[1]}
                  </p>
                </Box>
                <Box
                  onClick={handleOpen}
                  style={{
                    position: "relative",
                    margin: "20px",
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieContent[0].poster_path})`,
                    width: "100%",
                    height: "500px",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                >
                  <img
                    className="playImg"
                    src="https://github.com/GouthamParthi/cinema-image/blob/main/Vector.png?raw=true"
                  />
                </Box>
              </Stack>
            </Box>
          ) : null}
        </>
      ) : (
        <Box>LOGIN TO ACCESS THIS PAGE</Box>
      )}

      <ToastContainer />
    </Box>
  );
};
export default Video;
