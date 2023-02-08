import Box from "@mui/material/Box";
import "./Intro.css";
import { Button } from "@mui/material/";

const Intro = () => {
  return (
    <Box className="intro">
      <Box>
        <p className="welcome">Welcome to Our movie site</p>
        <p className="special">
          OUR SPECIAL <span className="">MOVIES</span>
        </p>
        <p className="description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industrioy. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown.
        </p>
        <Button className="readMore" style={{ color: "rgb(255, 255, 255)" }}>
          Read More
        </Button>
      </Box>
    </Box>
  );
};

export default Intro;
