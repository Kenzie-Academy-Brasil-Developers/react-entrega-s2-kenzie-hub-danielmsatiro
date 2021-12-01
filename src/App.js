import { Routes } from "./routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { theme } from "./theme/theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <CssBaseline />
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
};
