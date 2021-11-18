import { Redirect } from "react-router";
import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
/* import Logo from "../../assets/logo.svg"; */
import { Technologies } from "../../components/Technologies";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { api } from "../../services/api";

export const Dashboard = ({ authenticated }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("@Kenziehub:id"));
    console.log(`/users/${userId}`);
    api.get(`/users/${userId}`).then((response) => setUser(response.data));
  }, []);
  console.log(user);
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
              <Typography item>Minhas Tecnologias</Typography>
              <IconButton /* onClick={} */ item>
                <BsFillPlusSquareFill color={"green"} />
              </IconButton>
            </Grid>
            {user.techs?.map((item) => <Technologies title={"item.title"} status={"item.status"} />
            )}
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
