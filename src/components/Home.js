import Header from "./Header";
import Box from "@mui/material/Box";
import Intro from "./Intro";
import MovieCollection from "./MovieCollection";
import { useState, useEffect } from "react";
import axios from "axios";
import token from "./token";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import Pagination from "./Pagination";
const Home = () => {
  const tokenLocal = localStorage.getItem("token");
  const [movieCollection, setMovieCollection] = useState([]);

  const [pagenumber, setpagenumber] = useState(1);

  let rowPerpage = 8;
  const endDataIndex = pagenumber * rowPerpage;
  const startDataIndex = endDataIndex - rowPerpage;

  let jumpButtonscount;
  let paginationArray;

  jumpButtonscount = Math.ceil(movieCollection.length / rowPerpage);

  paginationArray = Array(jumpButtonscount)
    .fill(0)
    .map((e, i) => i + 1);

  const fetchMovieColection = async () => {
    try {
      const movies = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=025e2d8b1a2b665ad499bc1179bb0d38"
      );
      if (movies.status == 200) {
        setMovieCollection(movies.data.results);
      } else {
        throw new Error("problem in fetchMovieColection");
      }
    } catch (e) {
      toast.error(e, { position: toast.POSITION.TOP_RIGHT });
    }
  };

  const handleSearch = async (value) => {
    try {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=025e2d8b1a2b665ad499bc1179bb0d38`,
        {
          params: {
            query: value
          }
        }
      );
      if (movies.status == 200) {
        setMovieCollection(movies.data.results);
      } else {
        throw new Error("problem in fetchMovieColection");
      }
    } catch (e) {
      toast.error(e, { position: toast.POSITION.TOP_RIGHT });
    }
  };
  const handlePagination = (e, value) => {
    if (value == "previous") {
      if (pagenumber > paginationArray[0]) {
        setpagenumber(pagenumber - 1);
      }
    } else if (value == "next") {
      if (pagenumber < paginationArray[paginationArray.length - 1]) {
        setpagenumber(pagenumber + 1);
      }
    } else {
      setpagenumber(e.target.value);
    }
  };
  useEffect(() => {
    const handleapi = async () => {
      await fetchMovieColection();
    };
    handleapi();
  }, []);
  return (
    <Box>
      <Header
        handleSearch={handleSearch}
        fixedOrRelative="fixed"
        token={token}
      />
      <Intro />
      {tokenLocal == token && movieCollection ? (
        <>
          <MovieCollection
            startDataIndex={startDataIndex}
            endDataIndex={endDataIndex}
            movieCollection={movieCollection}
          />
          {console.log(paginationArray)}
          <Pagination
            className="pagination"
            pagenumber={pagenumber}
            handlePagination={handlePagination}
            paginationArray={paginationArray}
          />
        </>
      ) : (
        <div>No Videos</div>
      )}

      <ToastContainer />
    </Box>
  );
};
export default Home;
