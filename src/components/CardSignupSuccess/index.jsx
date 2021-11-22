import {
  Box,
  Button,
  Dialog,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { useHistory } from "react-router";

export const CardSignupSuccess = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
          minWidth: "394px",
          padding: 3,
          textAlign: "center",
        }}
        component="form"
      >
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography component="h4" variant="h4">
              Sucesso
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <Typography color={"gray"}> X </Typography>
            </IconButton>
          </Grid>
        </Grid>
        <Box>
          <Typography sx={{ mt: 7 }} component="h2" variant="h2">
            Yeess!
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography component="subtitle1" variant="subtitle1">
            Tudo certinho, seu cadastro deu bom demais
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography component="body1" variant="body1">
            Agora basta fazer o seu login e começar a sua jornada...
          </Typography>
        </Box>

        <Button
          onClick={() => history.push(`/`)}
          variant="contained"
          color="secondary"
          sx={{
            backgroundColor: "#11995E",
            width: "100%",
            mt: 5,
            mb: 6,
          }}
        >
          Login
        </Button>
      </Box>
    </Dialog>
  );
};
