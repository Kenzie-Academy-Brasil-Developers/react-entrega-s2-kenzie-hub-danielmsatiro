import { Redirect } from "react-router-dom";
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
import { Technologies } from "../../components/Technologies";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { api } from "../../services/api";
import { CardTechCreate } from "../../components/CardTechCreate";
import Logo from "../../assets/logo.svg";
import { CardTechUpdate } from "../../components/CardTechUpdate";

export const Dashboard = ({ authenticated, setAuthenticated }) => {
  const [user, setUser] = useState({});

  /* Abre o CardTechCreate */
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  /* Abre o CardTechUpdate */
  const [tech, setTech] = useState({});
  const [openTech, setOpenTech] = useState(false);
  const handleUpdate = (tech_id, title, status) => {
    setTech({ tech_id, title, status });
    setOpenTech(true);
    /* aqui eu abro o cardTechUpdate e lá dentro eu faço a requisição */
  };

  /* Atualiza o state user */
  const updateUser = () => {
    const userId = JSON.parse(
      localStorage.getItem("@Kenziehub:id", JSON.stringify("@kenziehub:id"))
    );
    api.get(`/users/${userId}`).then((response) => {
      setUser(response.data);
    });
  };

  /* ciclo de via de montagem */
  useEffect(() => {
    updateUser();
  }, []);

  if (!authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main">
      <Grid container spacing={4} alignItems={"stretch"}>
        <Grid item xs={12}>
          <Paper>
            <Grid container justifyContent="space-between">
              <Grid item>
                <img width={150} alt="logo" src={Logo} />
              </Grid>
              <Grid item>
                <Avatar alt="" src={user.avatar_url} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              height: "100%",
            }}
          >
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
            <Grid container spacing={1}>
              {user.techs?.map((item) => (
                <Grid key={item.id} item sx={{ width: "100%" }}>
                  <Technologies
                    title={item.title}
                    status={item.status}
                    id={item.id}
                    handleUpdate={handleUpdate}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              height: "100%",
            }}
          >
            Meus Trabalhos
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              height: "100%",
            }}
          >
            aside
          </Paper>
        </Grid>
      </Grid>
      <CardTechCreate open={open} setOpen={setOpen} updateUser={updateUser} />
      {openTech && (
        <CardTechUpdate
          open={openTech}
          setOpen={setOpenTech}
          tech={tech}
          updateUser={updateUser}
        />
      )}
    </Container>
  );
};
