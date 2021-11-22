import {
  Grid,
  Typography,
  /* styled, */ ButtonBase,
  Chip,
  Box,
} from "@mui/material";
/* import { useState } from "react"; */
import { FiCodesandbox } from "react-icons/fi";

export const Technologies = ({ id, title, status, handleUpdate }) => {
  /*   const [color, setColor] = useState("#E7F5EF");
  const Border = styled("div")(() => ({
    width: 4,
    height: 77,
    backgroundColor: color,
  }));

  const Icon = styled("div")(() => ({
    width: 71,
    height: 77,
    borderRadius: 5,
    backgroundColor: color,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })); */
  return (
    <ButtonBase
      /* onMouseOver={() => setColor("#11995E")}
      onMouseOut={() => setColor("#E7F5EF")} */
      onClick={() => handleUpdate(id, title, status)}
      sx={{
        width: "100%",
        /* "&:hover .hover-tech": {
          backgroundColor: "#11995E"
        }, */
        "&:hover .hover-tech--light": {
          color: "#E7F5EF",
          backgroundColor: "#11995E",
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Box
            sx={{
              width: 71,
              height: 77,
              borderRadius: 5,
              backgroundColor: "#E7F5EF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="hover-tech"
          >
            <FiCodesandbox
              className="hover-tech--light"
              size={30}
              sx={{
                color: "#11995E",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography
                sx={{ textAlign: "left" }}
                component="h4"
                variant="h4"
              >
                {title}
              </Typography>
              <Chip
                label={status}
                sx={{
                  backgroundColor: "#E7F5EF",
                  padding: 1,
                  borderRadius: 1,
                  width: "99px",
                  color: "#11995E",
                }}
              />
            </Grid>
            <Grid item>
              <Box
                className="hover-tech"
                sx={{ width: 4, height: 77, backgroundColor: "#E7F5EF" }}
              ></Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ButtonBase>
  );
};
