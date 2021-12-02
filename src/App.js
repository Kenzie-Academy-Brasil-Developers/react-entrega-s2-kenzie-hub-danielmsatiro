import { Routes } from "./routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { theme } from "./theme/theme";

import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
};
