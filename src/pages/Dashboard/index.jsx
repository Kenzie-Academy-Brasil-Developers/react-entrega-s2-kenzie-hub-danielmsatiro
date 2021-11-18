import { Redirect } from "react-router";
import { Container, Grid, Paper, Box, Avatar, Typography } from "@mui/material";
import Logo from "../../assets/logo.svg";
import { Technologys } from "../../components/Technologys";
import { BsFillPlusSquareFill } from "react-icons/bs"

export const Dashboard = ({ authenticated }) => {
  if (!authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Paper>Logo</Paper>
              </Grid>
              <Grid item>
                <Avatar alt="" src="" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography>Minhas Tecnologias</Typography>
              </Grid>
              <Grid item>
                <BsFillPlusSquareFill />
              </Grid>
            </Grid>
            <Technologys title={"Javascript"} status={"intermediário"} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>Meus Trabalhos</Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>aside</Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
