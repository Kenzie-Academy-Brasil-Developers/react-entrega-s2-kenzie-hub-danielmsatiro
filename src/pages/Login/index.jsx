import { Container, Box, TextField, Button, Typography } from "@mui/material";
import Logo from "../../assets/logo.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { Redirect, useHistory } from "react-router";

export const Login = ({ authenticated, setAuthenticated }) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Digite no mínimo 6 caracteres")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignIn = (data) => {
    api
      .post("/sessions", data)
      .then((response) => {
        const { token, user } = response.data;

        localStorage.clear();

        localStorage.setItem("@Kenziehub:token", JSON.stringify(token));
        localStorage.setItem("@Kenziehub:id", JSON.stringify(user.id));

        setAuthenticated(true);

        return history.push(`/dashboard`);
      })
      .catch((err) => console.log(err));
  };

  const history = useHistory();

  if (authenticated) {
    return <Redirect to={`/dashboard`} />;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        component="div"
        sx={{
          background: `url(${Logo}) no-repeat center`,
          height: 40,
        }}
      ></Box>
      <Box onSubmit={handleSubmit(handleSignIn)} component="form">
        <TextField
          {...register("email")}
          margin="normal"
          fullWidth
          label="Login"
          type="email"
          helperText={errors.email?.message}
          error={!!errors.email?.message}
        />
        <TextField
          {...register("password")}
          margin="normal"
          fullWidth
          label="Senha"
          type="password"
          helperText={errors.password?.message}
          error={!!errors.password?.message}
        />
        <Button type="submit" fullWidth variant="contained">
          Logar
        </Button>
        <Typography>
          Criar uma página para mostrar suas habilidades metas e progresso
        </Typography>
        <Button
          onClick={() => history.push("/signup")}
          fullWidth
          variant="contained"
          color="grey"
          sx={{ mt: 2 }}
        >
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
};
