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

export const CardUpdate = ({ open, setOpen, updateUser, item, type }) => {
  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
    description: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log("teste", item);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newStatus) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };

  const [title, setTitle] = useState(item.title);
  const [status, setStatus] = useState(item.status);
  const [description, setDescription] = useState(item.description);

  const handleUpdate = (id) => {
    const data =
      type === "techs"
        ? { status: status }
        : { title: title, description: description };
    const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
    api
      .put(`/users/${type}/${id}`, data, {
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
      .delete(`/users/${type}/${id}`, {
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
      <Box
        component="div"
        sx={{
          minWidth: "394px",
          padding: 2,
        }}
      >
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography component="h4" variant="h4">
              {type === "techs" ? "Atualizar Tecnologia" : "Atualizar Trabalho"}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <Typography color={"gray"}> X </Typography>
            </IconButton>
          </Grid>
        </Grid>
        <TextField
          margin="normal"
          fullWidth
          disabled={type === "techs"}
          label={type === "techs" ? "Nome da Tecnologia" : "Nome do Trabalho"}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          helperText={errors.title?.message}
          error={!!errors.title?.message}
        />
        {type === "techs" ? (
          <>
            <FormLabel component="legend">Selecionar status:</FormLabel>
            <ToggleButtonGroup
              exclusive
              color="primary"
              fullWidth
              onChange={handleChange}
              value={status}
            >
              <ToggleButton value="Iniciante">Iniciante</ToggleButton>
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
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            helperText={errors.description?.message}
            error={!!errors.description?.message}
          />
        )}
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Button
              onClick={() => handleUpdate(item.id)}
              variant="contained"
              color="secondary"
              sx={{
                backgroundColor: "#11995E",
                width: "100%",
              }}
            >
              Salvar Alterações
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => deleteTech(item.id)}
              variant="contained"
              sx={{
                width: "100%",
              }}
            >
              Excluir
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};
