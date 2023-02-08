import { Box } from "@mui/material";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material/";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Pagination = ({ paginationArray, pagenumber, handlePagination }) => {
  return (
    <Stack
      direction="row"
      spacing={5}
      style={{ backgroundColor: "rgb(13, 17, 28)" }}
    >
      <Stack direction="row" className="jump-buttons" spacing={2}>
        <Button
          variant="contained"
          xs={1}
          md={2}
          lg={3}
          name="previous"
          size="small"
          onClick={(e) => handlePagination(e, "previous")}
        >
          <KeyboardArrowLeftIcon />
        </Button>

        {paginationArray.length
          ? paginationArray.map((page) => {
              return (
                <Button
                  key={page}
                  name={page}
                  variant="contained"
                  style={
                    page == pagenumber
                      ? { backgroundColor: "rgb(45, 221, 204)" }
                      : null
                  }
                  xs={1}
                  md={2}
                  lg={3}
                  size="small"
                  value={page}
                  onClick={(e) => handlePagination(e, page)}
                >
                  {page}
                </Button>
              );
            })
          : null}
        <Button
          variant="contained"
          xs={1}
          md={2}
          lg={3}
          name="next"
          size="small"
          onClick={(e) => handlePagination(e, "next")}
        >
          <KeyboardArrowRightIcon />
        </Button>
      </Stack>
    </Stack>
  );
};
export default Pagination;
