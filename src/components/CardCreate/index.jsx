import {
  Box,
  TextField,
  Button,
  FormLabel,
  Dialog,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { api } from "../../services/api";
import { useState } from "react";

export const CardCreate = ({ open, setOpen, updateUser, type }) => {
  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
    description: yup.string().required("Campo Obrigatório"),
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
    if (newStatus !== null) {
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
      <Box
        sx={{
          minWidth: "394px",
          padding: 2,
        }}
        onSubmit={handleSubmit(handleSignUp)}
        component="form"
      >
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography component="h4" variant="h4">
              {type === "tech" ? "Cadastrar Tecnologia" : "Cadastrar Trabalho"}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <Typography color={"gray"}> X </Typography>
            </IconButton>
          </Grid>
        </Grid>
        <TextField
          {...register("title")}
          margin="normal"
          fullWidth
          label={type === "tech" ? "Nome da Tech" : "Nome do Trabalho"}
          helperText={errors.title?.message}
          error={!!errors.title?.message}
        />
        {type === "tech" ? (
          <>
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
          </>
        ) : (
          <TextField
            {...register("description")}
            margin="normal"
            fullWidth
            multiline
            rows={4}
            label="Descrição do Trabalho"
            helperText={errors.description?.message}
            error={!!errors.description?.message}
          />
        )}

        <Button sx={{ mt: 2 }} type="submit" fullWidth variant="contained">
          Cadastrar
        </Button>
      </Box>
    </Dialog>
  );
};
