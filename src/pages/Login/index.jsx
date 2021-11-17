import { Container, Box, TextField } from "@mui/material";

export const Login = () => {
  return (
    <Container component="main" sx={{maxWidth:500}} >
        <Box component="form">
            <TextField margin="normal" fullWidth label="Login"/>
            <TextField margin="normal" fullWidth label="Senha"/>
        </Box>
        </Container>
  )
};
