import { Container, Box, TextField, Button, Typography } from "@mui/material";
import Logo from "../../assets/logo.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { signInThunk } from "../../store/modules/user/thunks";

export const Login = () => {
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

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignIn = (data) => {
    dispatch(signInThunk(data, history));
  };

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
