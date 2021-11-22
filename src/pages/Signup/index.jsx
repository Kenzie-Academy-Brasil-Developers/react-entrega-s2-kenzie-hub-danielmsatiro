import {
  Container,
  Box,
  TextField,
  Button,
  FormLabel,
  Tooltip,
} from "@mui/material";
import Logo from "../../assets/logo.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { api } from "../../services/api";
import { useState } from "react";
import { toast } from "react-hot-toast";
/* import { useHistory } from "react-router"; */
import { CardSignupSuccess } from "../../components/CardSignupSuccess";

export const Signup = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("Campo obrigatório"),
    bio: yup.string(),
    contact: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Digite no mínimo 6 caracteres")
      .required("Campo obrigatório"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [module, setModule] = useState(
    "Primeiro módulo (Introdução ao Frontend)"
  );

  const handleChange = (event, newModule) => {
    if (newModule !== null) {
      setModule(newModule);
    }
  };

  /* Abre o CardSignupSuccess */
  const [open, setOpen] = useState(false);

  const handleSignUp = (data) => {
    const newData = { ...data, course_module: module };
    delete newData.confirm_password;
    console.log(newData);
    api
      .post("/users", newData)
      .then((response) => {
        /* toast.success("Yeesss! Tudo certinho!"); */
        setOpen(true);
        /* return history.push(`/`); */
      })
      .catch((err) => {
        /* Incluir resposta para o usuário caso dê errado */
        toast.error("Ops! Alguém já deve ter esse E-mail...");
      });
  };

  /* const history = useHistory(); */

  return (
    <Container component="main" maxWidth="sm">
      <Box
        component="div"
        sx={{
          background: `url(${Logo}) no-repeat center`,
          height: 40,
        }}
      ></Box>
      <Box onSubmit={handleSubmit(handleSignUp)} component="form">
        <TextField
          {...register("name")}
          margin="normal"
          fullWidth
          label="Nome"
          helperText={errors.name?.message}
          error={!!errors.name?.message}
        />
        <TextField
          {...register("email")}
          margin="normal"
          fullWidth
          label="Email"
          helperText={errors.email?.message}
          error={!!errors.email?.message}
        />
        <TextField
          {...register("bio")}
          margin="normal"
          fullWidth
          label="Bio"
          helperText={errors.bio?.message}
          error={!!errors.bio?.message}
        />
        <TextField
          {...register("contact")}
          margin="normal"
          fullWidth
          label="Contato"
          helperText={errors.contact?.message}
          error={!!errors.contact?.message}
        />

        <FormLabel component="legend">Selecionar módulo:</FormLabel>
        <ToggleButtonGroup
          exclusive
          color="primary"
          fullWidth
          onChange={handleChange}
          value={module}
        >
          {/*  <Tooltip title="Primeiro módulo (Introdução ao Frontend)"> */}
          <ToggleButton value="Primeiro módulo (Introdução ao Frontend)">
            Primeiro
          </ToggleButton>
          {/* </Tooltip> */}

          <ToggleButton value="Segundo módulo (Frontend Avançado)">
            Segundo
          </ToggleButton>
          <ToggleButton value="Terceiro módulo (Introdução ao Backend)">
            Terceiro
          </ToggleButton>
          <ToggleButton value="Quarto módulo (Backend Avançado)">
            Quarto
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          {...register("password")}
          margin="normal"
          fullWidth
          label="Senha"
          type="password"
          helperText={errors.password?.message}
          error={!!errors.password?.message}
        />
        <TextField
          {...register("confirm_password")}
          margin="normal"
          fullWidth
          label="Confirmar Senha"
          type="password"
          helperText={errors.confirm_password?.message}
          error={!!errors.confirm_password?.message}
        />
        <Button type="submit" color="secondary" fullWidth variant="contained">
          Cadastrar
        </Button>
      </Box>
      <CardSignupSuccess open={open} setOpen={setOpen} />
    </Container>
  );
};
