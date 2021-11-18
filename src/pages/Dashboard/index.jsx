import { Redirect } from "react-router";
import { Container, Grid, Paper, Box, Avatar } from "@mui/material";
import Logo from "../../assets/logo.svg";

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
                <Paper>
                   Logo
                </Paper>
              </Grid>
              <Grid item>
                <Avatar alt="" src="" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>Minhas Tecnologias</Paper>
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
