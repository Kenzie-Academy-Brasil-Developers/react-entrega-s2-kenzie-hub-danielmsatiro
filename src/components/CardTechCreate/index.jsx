import { Box, TextField, Button, FormLabel, Dialog } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { api } from "../../services/api";
import { useState } from "react";

export const CardTechCreate = ({ open, setOpen, updateUser }) => {
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newStatus) => {
    if(newStatus !==null) {
      setStatus(newStatus);
    }
  };

  const handleSignUp = (data) => {
    const newData = { ...data, status: status };
    const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
    api
      .post(`/users/techs`, newData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => updateUser())
      .catch((err) => console.log(err));

    handleClose();
  };

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
