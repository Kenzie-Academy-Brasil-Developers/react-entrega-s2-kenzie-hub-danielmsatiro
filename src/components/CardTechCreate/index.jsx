import {
  Box,
  TextField,
  Button,
  FormLabel,
  Dialog,
  DialogActions,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { api } from "../../services/api";
import { useState } from "react";

export const CardTechCreate = ({open, handleClose, user}) => {
  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [status, setStatus] = useState("Iniciante");
  const handleChange = (event, newStatus) => {
    setStatus(newStatus);
  };

  const handleSignUp = (data) => {
    const newData = { ...data, status: status };
    handleClose()
    console.log(newData); 
  };

  /* const createTech = () => {
    api
      .post(`/users/techs`, { title: "React", status: "Iniciante" })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  }; */

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box onSubmit={handleSubmit(handleSignUp)} component="form">
        <TextField
          {...register("title")}
          margin="normal"
          fullWidth
          label="Nome da Tech"
          helperText={errors.title?.message}
          error={!!errors.title?.message}
        />

        <FormLabel component="legend">Selecionar status:</FormLabel>
        <ToggleButtonGroup
          exclusive
          color="primary"
          fullWidth
          onChange={handleChange}
          value={status}
        >
          {/*  <Tooltip title="Primeiro módulo (Introdução ao Frontend)"> */}
          <ToggleButton value="Iniciante">Iniciante</ToggleButton>
          {/* </Tooltip> */}

          <ToggleButton value="Intermediário">Intermediário</ToggleButton>
          <ToggleButton value="Avançado">Avançado</ToggleButton>
        </ToggleButtonGroup>

        <Button type="submit" fullWidth variant="contained">
          Cadastrar
        </Button>
      
        <Button onClick={handleClose}>Cancel</Button>
      
      </Box>
    </Dialog>
  );
};
