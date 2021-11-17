import { Container, Box, TextField, Button, Typography } from "@mui/material";
import Logo from "../../assets/logo.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const Login = () => {
    const schema = yup.object().shape({
        login: yup.string().required("Campo obrigatório"),
        password: yup.string().required("Campo obrigatório")
    })

    
  return (
    <Container component="main" sx={{ maxWidth: 500 }}>
      <Box
        component="div"
        sx={{
          display: "flex",
          background: `url(${Logo}) no-repeat center`,
          height: 40,
        }}
      ></Box>
      <Box component="form">
        <TextField margin="normal" fullWidth label="Login" />
        <TextField margin="normal" fullWidth label="Senha" type="password" />
        <Button type="submit" fullWidth variant="contained">
          Logar
        </Button>
        <Typography>
          Criar uma página para mostrar suas habilidades metas e progresso
        </Typography>
        <Button fullWidth variant="contained" sx={{ mt: 2 }}>
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
};
