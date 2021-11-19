import { Grid, Typography, styled, ButtonBase, Box } from "@mui/material";
import { useState } from "react";
import { FiCodesandbox } from "react-icons/fi";

export const Technologies = ({ id, title, status, handleUpdate }) => {
  const [color, setColor] = useState("#E7F5EF");
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
  }));
  return (
    <ButtonBase
      onMouseOver={() => setColor("#11995E")}
      onMouseOut={() => setColor("#E7F5EF")}
      onClick={() => handleUpdate(id, title, status)}
      sx={{
        width: "100%",
        /* "&:hover": ()=>setColor("green")  */
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Icon>
            <FiCodesandbox
              size={30}
              color={color === "#E7F5EF" ? "#11995E" : "white"}
            />
          </Icon>
        </Grid>
        <Grid item xs>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography component="h4" variant="h4">
                {title}
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#E7F5EF",
                  padding: 1,
                  borderRadius: 1,
                  width: "99px",
                }}
              >
                <Typography variant="body1" color="#11995E">
                  {status}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Border></Border>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ButtonBase>
  );
};
