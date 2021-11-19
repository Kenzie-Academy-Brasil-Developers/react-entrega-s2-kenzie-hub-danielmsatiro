import { Redirect, useParams } from "react-router-dom";
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
import { CardTechCreate } from "../../components/CardTechCreate";

export const Dashboard = ({ authenticated }) => {
  const [user, setUser] = useState({})
  
  /* Abre o FormDialog */
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const params = useParams();

  useEffect(() => {
    api
      .get(`/users/${params.user_id}`)
      .then((response) => setUser(response.data));
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
              <Grid item>
                <Typography>Minhas Tecnologias</Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleClickOpen}>
                  <BsFillPlusSquareFill color={"green"} />
                </IconButton>
              </Grid>
            </Grid>
            {user.techs?.map((item) => (
              <Technologies title={item.title} status={item.status} />
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>Meus Trabalhos</Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>aside</Paper>
        </Grid>
      </Grid>
      <CardTechCreate
        open={open}
        handleClose={handleClose}
        user={user}
      />
    </Container>
  );
};
