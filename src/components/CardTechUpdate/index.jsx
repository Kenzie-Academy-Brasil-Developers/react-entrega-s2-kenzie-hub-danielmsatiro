import { Box, TextField, Button, FormLabel, Dialog } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { api } from "../../services/api";
import { useEffect, useState } from "react";

export const CardTechUpdate = ({ open, setOpen, updateUser, tech }) => {
  /* const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
  }); */

  /* const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  }); */

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newStatus) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };

  const [status, setStatus] = useState(tech.status);

  const handleUpdate = (id) => {
    const data = { status: status };
    const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
    api
      .put(`/users/techs/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        updateUser();
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  /* Exclui tecnologia */
  const deleteTech = (id) => {
    const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
    api
      .delete(`/users/techs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        updateUser();
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="div">
        <TextField margin="normal" fullWidth disabled label={tech.title} />

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

        <Button onClick={() => handleUpdate(tech.tech_id)} variant="contained">
          Salvar Alterações
        </Button>
        <Button onClick={() => deleteTech(tech.tech_id)} variant="contained">
          Excluir
        </Button>

        <Button onClick={handleClose}>Cancel</Button>
      </Box>
    </Dialog>
  );
};
