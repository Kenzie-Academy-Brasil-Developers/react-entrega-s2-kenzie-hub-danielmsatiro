import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Technologies } from "../../components/Technologies";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { api } from "../../services/api";
import { CardCreate } from "../../components/CardCreate";
import Logo from "../../assets/logo.svg";
import { CardUpdate } from "../../components/CardUpdate";

export const Dashboard = ({ authenticated, setAuthenticated }) => {
  const [user, setUser] = useState({});

  /* Abre o CardCreate */
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const handleClickOpen = (type) => {
    setOpen(true);
    setType(type);
  };

  /* Abre o CardUpdate */
  const [tech, setTech] = useState({});
  const [openTech, setOpenTech] = useState(false);
  const handleUpdate = (tech_id, title, status) => {
    setTech({ tech_id, title, status });
    setOpenTech(true);
    /* aqui eu abro o cardUpdate e lá dentro eu faço a requisição */
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

  const logOut = () => {
    localStorage.clear();
    setAuthenticated(false);
  };

  return (
    <Container
      component="main"
      sx={{
        minWidth: "428px",
      }}
    >
      {/* header */}
      <Grid container spacing={4} alignItems={"stretch"}>
        <Grid item xs={12}>
          <Card sx={{ padding: "22px" }}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <img width={150} alt="logo" src={Logo} />
              </Grid>
              <Grid item>
                <Avatar alt="" src={user.avatar_url} />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              padding: "22px",
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  sx={{ lineHeight: "2" }}
                  component="h3"
                  variant="h3"
                >
                  Minhas Tecnologias
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={() => handleClickOpen("tech")}>
                  <BsFillPlusSquareFill
                    sx={{ lineHeight: "2" }}
                    color={"#11995E"}
                  />
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
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              padding: "22px",
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  sx={{ lineHeight: "2" }}
                  component="h3"
                  variant="h3"
                >
                  Meus Trabalhos
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={() => handleClickOpen("job")}>
                  <BsFillPlusSquareFill
                    sx={{ lineHeight: "2" }}
                    color={"#403CAA"}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
            }}
          >
            <Typography>{user.name}</Typography>
            <Typography>{user.course_module}</Typography>
            <Typography>contato</Typography>
            <Typography>{user.contact}</Typography>
            <Typography>E-mail</Typography>
            <Typography>{user.email}</Typography>
            <Button onClick={() => logOut()}>Sair</Button>
          </Card>
        </Grid>
      </Grid>
      <CardCreate
        open={open}
        setOpen={setOpen}
        updateUser={updateUser}
        type={type}
      />
      {openTech && (
        <CardUpdate
          open={openTech}
          setOpen={setOpenTech}
          tech={tech}
          updateUser={updateUser}
        />
      )}
    </Container>
  );
};
