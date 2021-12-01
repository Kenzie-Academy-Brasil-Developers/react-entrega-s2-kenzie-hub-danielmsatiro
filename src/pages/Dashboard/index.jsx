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
import { MdOutlineMail, MdStayPrimaryLandscape } from "react-icons/md";
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
        height: "100vh",
        backgroundColor: "#f5f5f5",
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
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <img width={150} alt="logo" src={Logo} />
              </Grid>
              <Grid item>
                <Avatar
                  sx={{ width: "50px", height: "50px" }}
                  alt=""
                  src={user.avatar_url}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              padding: "22px",
              boxShadow: "none",
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
              boxShadow: "none",
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
              boxShadow: "none",
            }}
          >
            <Grid
              container
              alignItems="center"
              sx={{
                paddingLeft: "22px",
                backgroundColor: "#403CAA",
                width: "100%",
                height: "104px",
                flexWrap: "noWrap",
              }}
            >
              <Grid item>
                <Avatar
                  sx={{ height: 80, width: 80 }}
                  alt=""
                  src={user.avatar_url}
                />
              </Grid>
              <Grid item sx={{ paddingLeft: 1 }}>
                <Typography variant={"h4"} color="white">
                  {user.name}
                </Typography>
                <Typography variant={"caption"} color="white">
                  {user.course_module}
                </Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ padding: "22px" }}>
              <Grid container sx={{ mt: 2 }}>
                <Grid
                  item
                  sx={{
                    width: "50px",
                    height: "45px",
                    borderRadius: "2px",
                    backgroundColor: "#403CAA",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FiSmartphone color="white" size="20" />
                </Grid>
                <Grid item sx={{ paddingLeft: 1, paddingRight: 1 }}>
                  <Typography fontWeight="bold" variant={"body1"}>
                    Contato
                  </Typography>
                  <Typography>{user.contact}</Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 2 }}>
                <Grid
                  item
                  sx={{
                    width: "50px",
                    height: "45px",
                    borderRadius: "2px",
                    backgroundColor: "#11995E",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MdOutlineMail color="white" size="20" />
                </Grid>
                <Grid item sx={{ paddingLeft: 1 }}>
                  <Typography fontWeight="bold" variant={"body1"}>
                    E-mail
                  </Typography>
                  <Typography>{user.email}</Typography>
                </Grid>
              </Grid>
              <Button
                onClick={() => logOut()}
                fullWidth
                variant="contained"
                color="grey"
                sx={{ mt: 2 }}
              >
                Sair
              </Button>
            </Grid>
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
