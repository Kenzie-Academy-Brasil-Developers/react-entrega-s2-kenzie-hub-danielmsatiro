import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Card,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { TechOrWork } from "../../components/TechOrWork";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { FiSmartphone } from "react-icons/fi";
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
  const [item, setItem] = useState({});
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdate = (id, title, status, description, type) => {
    setItem({ id, title, status, description });
    setType(type);
    setOpenUpdate(true);
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
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card
            sx={{
              padding: "22px",
              marginTop: "10px",
              boxShadow: "0px 4px 40px -10px rgba(0, 0, 0, 0.25)",
            }}
          >
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
                <IconButton onClick={() => handleClickOpen("techs")}>
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
                  <TechOrWork
                    title={item.title}
                    status={item.status}
                    id={item.id}
                    handleUpdate={handleUpdate}
                    type="techs"
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
                <IconButton onClick={() => handleClickOpen("works")}>
                  <BsFillPlusSquareFill
                    sx={{ lineHeight: "2" }}
                    color={"#403CAA"}
                  />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              {user.works?.map((item) => (
                <Grid key={item.id} item sx={{ width: "100%" }}>
                  <TechOrWork
                    title={item.title}
                    description={item.description}
                    id={item.id}
                    handleUpdate={handleUpdate}
                    type="works"
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
              borderRadius: "10px",
            }}
          >
            <Grid container>
              <Grid item>
                <Avatar alt="" src={user.avatar_url} />
              </Grid>
              <Grid item>
                <Typography>{user.name}</Typography>
                <Typography>{user.course_module}</Typography>
              </Grid>
            </Grid>
            <Box>
              <Grid container>
                <Grid item>
                  <FiSmartphone />
                </Grid>
                <Grid item>
                  <Typography>contato</Typography>
                  <Typography>{user.contact}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <MdOutlineMail />
                </Grid>
                <Grid item>
                  <Typography>E-mail</Typography>
                  <Typography>{user.email}</Typography>
                </Grid>
              </Grid>
            </Box>
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
      {openUpdate && (
        <CardUpdate
          open={openUpdate}
          setOpen={setOpenUpdate}
          item={item}
          updateUser={updateUser}
          type={type}
        />
      )}
    </Container>
  );
};
