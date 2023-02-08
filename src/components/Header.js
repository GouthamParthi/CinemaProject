import Box from "@mui/material/Box";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material/";
import { useState } from "react";

const Header = ({ token, handleSearch, hideSearchBox, fixedOrRelative }) => {
  const navigate = useNavigate();
  const [debounceTimeout, setDebounceTimeout] = useState();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const debounce = (value, debounceTimeout) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const timeout = setTimeout(() => {
      handleSearch(value);
    }, 500);
    setDebounceTimeout(timeout);
  };
  return (
    <Box className="header" style={{ position: { fixedOrRelative } }}>
      <Link to="/">
        <img src="https://github.com/GouthamParthi/cinema-image/blob/main/toppng%201.png?raw=true" />
      </Link>

      {token == localStorage.getItem("token") ? (
        <Box>
          {!hideSearchBox ? (
            <TextField
              name="search"
              placeholder="Search"
              variant="outlined"
              onKeyUp={(e) => {
                debounce(e.target.value, debounceTimeout);
              }}
              className="searchBox"
            />
          ) : null}
          <Button
            onClick={handleLogOut}
            style={{ color: "rgb(255, 255, 255)", margin: "15px" }}
          >
            LOGOUT
          </Button>
        </Box>
      ) : (
        <Link to="/login">
          <Button style={{ color: "rgb(255, 255, 255)", margin: "15px" }}>
            Login
          </Button>
        </Link>
      )}
    </Box>
  );
};
export default Header;
